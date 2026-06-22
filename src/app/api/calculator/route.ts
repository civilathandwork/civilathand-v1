import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

// ─────────────────────────────────────────────────────────────────────────────
// IS-CODE CONSTANTS  (IS 456:2000, IS 1077, IS 1786, IS 383)
// ─────────────────────────────────────────────────────────────────────────────

const DRY_VOLUME_FACTOR   = 1.54;           // IS 456: wet→dry conversion
const CEMENT_BAG_VOLUME   = 0.03472;        // m³ per 50 kg bag  (50 ÷ 1440)
const BRICK_NOMINAL_VOL   = 0.002;          // m³  (200×100×100 mm nominal)
const MORTAR_FRACTION     = 0.2295;         // fraction of brickwork that is mortar
const MORTAR_DRY_FACTOR   = 1.33;          // wet→dry mortar expansion
const BRICK_WASTAGE       = 1.07;           // IS recommendation: 7% wastage
const SAND_DENSITY        = 1.6;            // T/m³  (dry river sand)
const AGG_DENSITY         = 1.5;            // T/m³  (coarse aggregate, IS 383)
const M3_TO_CFT           = 35.3147;        // 1 m³ = 35.3147 CFT
const STEEL_DENSITY       = 7850;           // kg/m³ (IS 1786)
const STEEL_FORMULA_DIV   = 162.2;          // D²/162.2 = kg/m  (derived constant)

// IS 1786 nominal wall thicknesses
const WALL_9IN_M   = 0.230;   // 9-inch = 230 mm
const WALL_4_5IN_M = 0.115;   // 4.5-inch = 115 mm

// Cost rates (India 2026)
const COST_RATES: Record<string, number> = {
  economy:  1800,
  standard: 2500,
  premium:  3800,
  luxury:   5500,
};

// IS 456 Nominal Mix ratios
const CONCRETE_MIXES: Record<string, { c: number; s: number; a: number; sum: number; use: string }> = {
  M15: { c: 1, s: 2,    a: 4,   sum: 7,    use: "PCC footings, levelling course" },
  M20: { c: 1, s: 1.5,  a: 3,   sum: 5.5,  use: "RCC slabs, beams, staircases" },
  M25: { c: 1, s: 1,    a: 2,   sum: 4,    use: "Columns, shear walls, water tanks" },
  M30: { c: 1, s: 0.75, a: 1.5, sum: 3.25, use: "High-rise columns, prestressed elements" },
};

// IS 1786 nominal weights (kg/m)
const IS_1786: Record<number, number> = {
  8: 0.395, 10: 0.617, 12: 0.888, 16: 1.578,
  20: 2.466, 25: 3.853, 32: 6.313, 40: 9.865,
};

// ─────────────────────────────────────────────────────────────────────────────
// CALCULATION FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────

function calcCost(area: number, quality: string) {
  const rate = COST_RATES[quality];
  if (!rate) throw new Error(`Invalid quality tier: ${quality}`);
  const total = area * rate;
  return {
    area,
    quality,
    ratePerSqft: rate,
    totalCost: total,
    breakdown: {
      civil:     { pct: 35, amount: Math.round(total * 0.35) },
      finishes:  { pct: 20, amount: Math.round(total * 0.20) },
      mep:       { pct: 15, amount: Math.round(total * 0.15) },
      carpentry: { pct: 10, amount: Math.round(total * 0.10) },
      labour:    { pct: 20, amount: Math.round(total * 0.20) },
    },
    standard: "India 2026 Market Rates | NBO / Industry Survey",
  };
}

function calcConcrete(volumeM3: number, grade: string) {
  const mix = CONCRETE_MIXES[grade];
  if (!mix) throw new Error(`Invalid concrete grade: ${grade}`);

  const dryVol  = volumeM3 * DRY_VOLUME_FACTOR;
  const cVol    = (mix.c / mix.sum) * dryVol;
  const sVol    = (mix.s / mix.sum) * dryVol;
  const aVol    = (mix.a / mix.sum) * dryVol;

  return {
    wetVolumeM3:  volumeM3,
    dryVolumeM3:  parseFloat(dryVol.toFixed(4)),
    grade,
    mixRatio:     `1 : ${mix.s} : ${mix.a}`,
    use:          mix.use,
    cement: {
      volumeM3:   parseFloat(cVol.toFixed(4)),
      bags50kg:   Math.ceil(cVol / CEMENT_BAG_VOLUME),
      totalKg:    Math.ceil((cVol / CEMENT_BAG_VOLUME) * 50),
    },
    sand: {
      volumeM3:   parseFloat(sVol.toFixed(4)),
      weightTons: parseFloat((sVol * SAND_DENSITY).toFixed(3)),
      volumeCFT:  parseFloat((sVol * M3_TO_CFT).toFixed(2)),
    },
    aggregate: {
      volumeM3:   parseFloat(aVol.toFixed(4)),
      weightTons: parseFloat((aVol * AGG_DENSITY).toFixed(3)),
      volumeCFT:  parseFloat((aVol * M3_TO_CFT).toFixed(2)),
    },
    standard: "IS 456:2000 Nominal Mix | Dry volume factor 1.54 | Cement bag 50 kg (0.0347 m³)",
  };
}

function calcSteel(diameterMm: number, lengthM: number, qty: number) {
  const validDiameters = [8, 10, 12, 16, 20, 25, 32, 40];
  if (!validDiameters.includes(diameterMm)) {
    throw new Error(`Invalid diameter: ${diameterMm}. Valid: ${validDiameters.join(", ")}`);
  }

  const unitWeightKgM   = parseFloat(((diameterMm * diameterMm) / STEEL_FORMULA_DIV).toFixed(4));
  const nominalWeight   = IS_1786[diameterMm] || unitWeightKgM;
  const weightPerBar    = parseFloat((unitWeightKgM * lengthM).toFixed(4));
  const totalKg         = parseFloat((unitWeightKgM * lengthM * qty).toFixed(3));
  const totalTons       = parseFloat((totalKg / 1000).toFixed(5));
  const marketRatePer75 = 68; // ₹/kg approx market rate
  const estimatedValue  = Math.round(totalKg * marketRatePer75);

  return {
    diameterMm,
    lengthM,
    qty,
    formula: `W = D² / ${STEEL_FORMULA_DIV} = ${diameterMm}² / ${STEEL_FORMULA_DIV} = ${unitWeightKgM} kg/m`,
    unitWeightKgPerM:     unitWeightKgM,
    is1786NominalKgPerM:  nominalWeight,
    weightPerBarKg:       weightPerBar,
    totalWeightKg:        totalKg,
    totalWeightTons:      totalTons,
    estimatedMarketValue: `₹${estimatedValue.toLocaleString("en-IN")} (@ ₹${marketRatePer75}/kg)`,
    standard: "IS 1786 | Formula W = D²/162.2 | ρ_steel = 7850 kg/m³ | Grade-independent (Fe415/Fe500/Fe500D)",
  };
}

function calcBrick(lengthM: number, heightM: number, thicknessIn: number, mortarRatio: string) {
  if (![9, 4.5].includes(thicknessIn)) {
    throw new Error(`Invalid wall thickness: ${thicknessIn}. Must be 9 or 4.5 inches.`);
  }
  if (!["1:4", "1:6"].includes(mortarRatio)) {
    throw new Error(`Invalid mortar ratio: ${mortarRatio}. Must be 1:4 or 1:6.`);
  }

  const tMeter   = thicknessIn === 9 ? WALL_9IN_M : WALL_4_5IN_M;
  const wallVol  = lengthM * heightM * tMeter;

  const rawBricks  = wallVol / BRICK_NOMINAL_VOL;
  const bricks     = Math.ceil(rawBricks * BRICK_WASTAGE);

  const mortarWet = wallVol * MORTAR_FRACTION;
  const mortarDry = mortarWet * MORTAR_DRY_FACTOR;

  const [cPart, sPart] = mortarRatio === "1:4" ? [1, 4] : [1, 6];
  const sumParts = cPart + sPart;

  const cVol     = (cPart / sumParts) * mortarDry;
  const sVol     = (sPart / sumParts) * mortarDry;

  return {
    wallLengthM: lengthM,
    wallHeightM: heightM,
    thicknessInches: thicknessIn,
    thicknessM: tMeter,
    wallVolumeM3: parseFloat(wallVol.toFixed(4)),
    mortarRatio,
    bricks: {
      theoretical:       Math.ceil(rawBricks),
      withWastage7pct:   bricks,
      size:              "IS 1077: 190×90×90 mm (nominal 200×100×100 with 10mm joint)",
    },
    cement: {
      volumeM3:          parseFloat(cVol.toFixed(4)),
      bags50kg:          Math.ceil(cVol / CEMENT_BAG_VOLUME),
    },
    sand: {
      volumeM3:          parseFloat(sVol.toFixed(4)),
      weightTons:        parseFloat((sVol * SAND_DENSITY).toFixed(3)),
      volumeCFT:         parseFloat((sVol * M3_TO_CFT).toFixed(2)),
    },
    standard: "IS 1077:1992 | Mortar fraction = 1 - (500 × 0.19×0.09×0.09) | Dry mortar = wet × 1.33",
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/calculator
// Body: { type: "cost"|"concrete"|"steel"|"brick", ...params }
// ─────────────────────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, ...params } = body;

    if (!type) {
      return NextResponse.json(
        { error: "Missing required field: type. Must be one of: cost, concrete, steel, brick." },
        { status: 400 }
      );
    }

    let result: Record<string, any>;
    const timestamp = new Date().toISOString();

    switch (type) {
      case "cost": {
        const { area, quality } = params;
        if (!area || !quality)
          return NextResponse.json({ error: "cost requires: area (number), quality (economy|standard|premium|luxury)" }, { status: 400 });
        if (area <= 0 || area > 10_000_000)
          return NextResponse.json({ error: "area must be between 1 and 10,000,000 sq.ft" }, { status: 400 });
        result = calcCost(Number(area), quality);
        break;
      }

      case "concrete": {
        const { volumeM3, grade } = params;
        if (!volumeM3 || !grade)
          return NextResponse.json({ error: "concrete requires: volumeM3 (number), grade (M15|M20|M25|M30)" }, { status: 400 });
        if (volumeM3 <= 0 || volumeM3 > 1_000_000)
          return NextResponse.json({ error: "volumeM3 must be between 0.1 and 1,000,000" }, { status: 400 });
        result = calcConcrete(Number(volumeM3), grade);
        break;
      }

      case "steel": {
        const { diameterMm, lengthM, qty } = params;
        if (!diameterMm || !lengthM || !qty)
          return NextResponse.json({ error: "steel requires: diameterMm (8|10|12|16|20|25|32|40), lengthM (number), qty (number)" }, { status: 400 });
        if (lengthM <= 0 || qty <= 0)
          return NextResponse.json({ error: "lengthM and qty must be positive numbers" }, { status: 400 });
        result = calcSteel(Number(diameterMm), Number(lengthM), Number(qty));
        break;
      }

      case "brick": {
        const { lengthM, heightM, thicknessIn, mortarRatio } = params;
        if (!lengthM || !heightM || !thicknessIn || !mortarRatio)
          return NextResponse.json({ error: "brick requires: lengthM, heightM, thicknessIn (9|4.5), mortarRatio (1:4|1:6)" }, { status: 400 });
        if (lengthM <= 0 || heightM <= 0)
          return NextResponse.json({ error: "lengthM and heightM must be positive numbers" }, { status: 400 });
        result = calcBrick(Number(lengthM), Number(heightM), Number(thicknessIn), mortarRatio);
        break;
      }

      default:
        return NextResponse.json(
          { error: `Unknown calculator type: "${type}". Valid types: cost, concrete, steel, brick.` },
          { status: 400 }
        );
    }

    // ── Log to MongoDB (non-blocking — don't fail the response if DB is down) ──
    try {
      const client = await clientPromise;
      const db     = client.db(dbName);
      await db.collection("calculator_logs").insertOne({
        type,
        params,
        result,
        timestamp,
        ip: request.headers.get("x-forwarded-for") ?? "unknown",
      });
    } catch (dbErr) {
      console.warn("[calculator] MongoDB log failed (non-fatal):", dbErr);
    }

    return NextResponse.json(
      { success: true, type, timestamp, result },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    console.error("[POST /api/calculator] Error:", err);

    // Distinguish validation errors from unexpected crashes
    const isValidation = err.message && !err.stack?.includes("at calcCost") === false;
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: isValidation ? 422 : 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/calculator — return schema / usage guide
// ─────────────────────────────────────────────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    name: "Civil At Hand — Engineering Calculator API",
    version: "2.0",
    standards: ["IS 456:2000", "IS 1077:1992", "IS 1786:2008", "IS 383:2016"],
    endpoints: {
      "POST /api/calculator": {
        description: "Run any of the four IS-code calculators server-side",
        types: {
          cost: {
            params: { area: "number (sq.ft)", quality: "economy | standard | premium | luxury" },
            example: { type: "cost", area: 1500, quality: "premium" },
          },
          concrete: {
            params: { volumeM3: "number (m³)", grade: "M15 | M20 | M25 | M30" },
            example: { type: "concrete", volumeM3: 10, grade: "M20" },
          },
          steel: {
            params: { diameterMm: "8|10|12|16|20|25|32|40", lengthM: "number", qty: "number" },
            example: { type: "steel", diameterMm: 12, lengthM: 12, qty: 50 },
          },
          brick: {
            params: {
              lengthM: "number", heightM: "number",
              thicknessIn: "9 | 4.5", mortarRatio: "1:4 | 1:6",
            },
            example: { type: "brick", lengthM: 20, heightM: 3, thicknessIn: 9, mortarRatio: "1:6" },
          },
        },
      },
    },
  });
}
