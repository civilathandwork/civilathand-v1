// ============================================================
// PLACE THIS FILE AT:
//   src/data/ese/questions.ts
// ============================================================
// ESE / IES (Civil) demo question bank.
// These are ORIGINAL sample questions written to the ESE pattern
// so you can see the system working today. REPLACE them with your
// real extracted questions whenever you are ready.
//
// ── HOW TO ADD A QUESTION ───────────────────────────────────
// Find the subject array below and paste an object like this:
//
//   {
//     id: 4,                         // next number in this subject
//     type: "MCQ",                   // "MCQ" | "MSQ" | "NAT"
//     marks: 2,                      // ESE = 2 marks each
//     neg: "1/3",                    // ESE negative = 1/3
//     year: "ESE-2022",             // shown as a small badge
//     question: "Your question. <sub>2</sub>/<sup>2</sup> allowed.",
//     options: ["(a) ...", "(b) ...", "(c) ...", "(d) ..."],
//     correct: 0,                    // 0 = first option is right
//     solution: "Why the answer is correct.",
//   },
//
// For NAT questions: set type:"NAT", options:[], and use
//   natAnswer:"12.5"   instead of correct.
// ============================================================

export interface EseQuestion {
  id: number;
  type: "MCQ" | "MSQ" | "NAT";
  marks: 1 | 2;
  neg: string;
  year: string;
  question: string;
  options: string[];
  correct: number;
  natAnswer?: string;
  solution: string;
}

// Helper to keep ESE rows short (all 2-mark, neg 1/3, MCQ).
const Q = (
  id: number, year: string, question: string,
  options: string[], correct: number, solution: string
): EseQuestion => ({ id, type: "MCQ", marks: 2, neg: "1/3", year, question, options, correct, solution });

export const ESE_QUESTIONS: Record<string, EseQuestion[]> = {

  structural: [
    Q(1, "ESE — Demo", "The static indeterminacy of a propped cantilever beam (no internal hinge) is:",
      ["(a) 1", "(b) 0", "(c) 2", "(d) 3"], 0,
      "A propped cantilever has 4 support reactions (3 at the fixed end + 1 at the prop) and only 3 equilibrium equations, so static indeterminacy = 4 − 3 = 1."),
    Q(2, "ESE — Demo", "For a fixed beam of span L carrying a central point load W, the magnitude of the fixed-end moment is:",
      ["(a) WL/8", "(b) WL/12", "(c) WL/4", "(d) WL/2"], 0,
      "For a central point load on a fixed beam, the fixed-end moment is WL/8 at each support."),
    Q(3, "ESE — Demo", "In the moment distribution method, the carry-over factor for a prismatic member with the far end fixed is:",
      ["(a) 0.5", "(b) 1.0", "(c) 0.75", "(d) 0"], 0,
      "For a prismatic (uniform) member with the far end fixed, the carry-over factor is 1/2 = 0.5."),
  ],

  rcc: [
    Q(1, "ESE — Demo", "As per IS 456:2000, the maximum strain in concrete at the outermost compression fibre in flexure is taken as:",
      ["(a) 0.0035", "(b) 0.0020", "(c) 0.0050", "(d) 0.0010"], 0,
      "IS 456:2000 limits the maximum compressive strain in concrete in bending to 0.0035."),
    Q(2, "ESE — Demo", "The minimum percentage of tension steel in an RCC beam using Fe415 (As/bd) as per IS 456 is about:",
      ["(a) 0.20%", "(b) 0.85%", "(c) 0.12%", "(d) 0.30%"], 0,
      "Minimum tension steel = 0.85/fy × 100 = 0.85/415 × 100 ≈ 0.205% ≈ 0.20%."),
    Q(3, "ESE — Demo", "In limit state design, the partial safety factor for concrete (γm) is:",
      ["(a) 1.5", "(b) 1.15", "(c) 1.0", "(d) 1.25"], 0,
      "IS 456 uses a partial safety factor of 1.5 for concrete and 1.15 for steel."),
  ],

  soil: [
    Q(1, "ESE — Demo", "The coefficient of active earth pressure (Rankine) for a cohesionless soil with φ = 30° is:",
      ["(a) 1/3", "(b) 3", "(c) 1/2", "(d) 2"], 0,
      "Ka = (1 − sinφ)/(1 + sinφ) = (1 − 0.5)/(1 + 0.5) = 0.5/1.5 = 1/3."),
    Q(2, "ESE — Demo", "Quick sand condition occurs when the effective stress in the soil becomes:",
      ["(a) zero", "(b) maximum", "(c) equal to total stress", "(d) negative"], 0,
      "Quick sand occurs when upward seepage reduces effective stress to zero, so the soil loses shear strength."),
    Q(3, "ESE — Demo", "The phreatic line (top seepage line) in a homogeneous earthen dam is approximately a:",
      ["(a) parabola", "(b) straight line", "(c) circular arc", "(d) hyperbola"], 0,
      "The phreatic line in an earthen dam is taken as a base parabola (Casagrande's solution)."),
  ],

  fluid: [
    Q(1, "ESE — Demo", "The upper limit of Reynolds number for laminar flow in a circular pipe is approximately:",
      ["(a) 2000", "(b) 4000", "(c) 500", "(d) 10000"], 0,
      "Flow in a pipe is generally laminar up to Re ≈ 2000, transitional between 2000–4000, and turbulent above."),
    Q(2, "ESE — Demo", "For a vertical submerged plane surface, the centre of pressure lies:",
      ["(a) below the centroid", "(b) above the centroid", "(c) at the centroid", "(d) at the free surface"], 0,
      "Because pressure increases with depth, the centre of pressure is always below the centroid of the submerged area."),
    Q(3, "ESE — Demo", "The continuity equation in fluid mechanics is based on the conservation of:",
      ["(a) mass", "(b) momentum", "(c) energy", "(d) force"], 0,
      "The continuity equation expresses conservation of mass for a flowing fluid."),
  ],

  environmental: [
    Q(1, "ESE — Demo", "The permissible (acceptable) pH range of drinking water as per IS 10500 is:",
      ["(a) 6.5 – 8.5", "(b) 5.0 – 7.0", "(c) 7.0 – 9.5", "(d) 8.0 – 10.0"], 0,
      "IS 10500 specifies an acceptable pH range of 6.5 to 8.5 for drinking water."),
    Q(2, "ESE — Demo", "The standard BOD test is conducted at 20 °C for a period of:",
      ["(a) 5 days", "(b) 3 days", "(c) 7 days", "(d) 1 day"], 0,
      "The standard BOD₅ test measures oxygen demand over 5 days of incubation at 20 °C."),
    Q(3, "ESE — Demo", "Hardness of water is conventionally expressed in terms of an equivalent amount of:",
      ["(a) CaCO₃", "(b) NaCl", "(c) MgSO₄", "(d) Ca(OH)₂"], 0,
      "Total hardness is reported as an equivalent concentration of calcium carbonate (CaCO₃)."),
  ],

  transport: [
    Q(1, "ESE — Demo", "The maximum superelevation on highways in plain and rolling terrain as per IRC is limited to:",
      ["(a) 7%", "(b) 10%", "(c) 4%", "(d) 12%"], 0,
      "IRC limits maximum superelevation to 7% (0.07) for plain and rolling terrain."),
    Q(2, "ESE — Demo", "The shape of a vertical summit curve recommended by IRC is a:",
      ["(a) square parabola", "(b) circular arc", "(c) spiral", "(d) ellipse"], 0,
      "IRC recommends a simple (square) parabola for summit curves because of its constant rate of change of grade."),
    Q(3, "ESE — Demo", "The California Bearing Ratio (CBR) test is primarily used in the design of:",
      ["(a) flexible pavements", "(b) rigid pavements", "(c) retaining walls", "(d) steel bridges"], 0,
      "The CBR value of the subgrade is used to design the thickness of flexible pavements."),
  ],

  geomatics: [
    Q(1, "ESE — Demo", "The combined correction for curvature and refraction in levelling (d in km) is:",
      ["(a) −0.0673 d²", "(b) +0.0785 d²", "(c) −0.0112 d²", "(d) zero"], 0,
      "Curvature correction = −0.0785 d² and refraction = +0.0112 d²; combined = −0.0673 d² metres."),
    Q(2, "ESE — Demo", "The contour interval of a map depends mainly on:",
      ["(a) scale of the map and nature of the terrain", "(b) only the scale", "(c) only the terrain", "(d) rainfall of the area"], 0,
      "Contour interval is chosen based on the map scale, the ruggedness of the ground, and the purpose of the survey."),
    Q(3, "ESE — Demo", "The principle of working from whole to part in surveying is followed mainly to:",
      ["(a) control accumulation of errors", "(b) save time", "(c) reduce instruments", "(d) increase detail"], 0,
      "Establishing a framework of control points first limits the accumulation and propagation of errors into the detail survey."),
  ],

  irrigation: [
    Q(1, "ESE — Demo", "Duty (D) and delta (Δ) of water are related (B = base period in days) by Δ = 8.64B/D. Hence duty is:",
      ["(a) inversely proportional to delta", "(b) directly proportional to delta", "(c) independent of delta", "(d) proportional to delta²"], 0,
      "From Δ = 8.64B/D, for a fixed base period, delta is inversely proportional to duty, so duty is inversely proportional to delta."),
    Q(2, "ESE — Demo", "The most suitable method of irrigation for undulating (uneven) terrain is:",
      ["(a) sprinkler irrigation", "(b) flooding", "(c) basin irrigation", "(d) wild flooding"], 0,
      "Sprinkler irrigation applies water uniformly regardless of ground slope, making it suitable for undulating land."),
    Q(3, "ESE — Demo", "Lacey's silt factor (f) for standard silt is taken as:",
      ["(a) 1.0", "(b) 0.5", "(c) 2.0", "(d) 1.5"], 0,
      "In Lacey's regime theory, the silt factor for standard silt is taken as 1.0."),
  ],

  "const-mat": [
    Q(1, "ESE — Demo", "The initial setting time of ordinary Portland cement should not be less than:",
      ["(a) 30 minutes", "(b) 10 minutes", "(c) 60 minutes", "(d) 600 minutes"], 0,
      "IS specifications require the initial setting time of OPC to be at least 30 minutes (final setting time not more than 600 minutes)."),
    Q(2, "ESE — Demo", "The nominal size of a modular brick (including mortar joint) is:",
      ["(a) 200 × 100 × 100 mm", "(b) 190 × 90 × 90 mm", "(c) 230 × 110 × 70 mm", "(d) 250 × 120 × 80 mm"], 0,
      "The actual modular brick is 190×90×90 mm; including a 10 mm mortar joint the nominal size becomes 200×100×100 mm."),
    Q(3, "ESE — Demo", "The slump test on fresh concrete is used to measure its:",
      ["(a) workability", "(b) compressive strength", "(c) durability", "(d) density"], 0,
      "The slump test is a simple field measure of the workability (consistency) of fresh concrete."),
  ],
};
