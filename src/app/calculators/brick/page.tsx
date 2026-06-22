"use client";

import React, { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  BrickWall,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  Check,
  ChevronRight,
} from "lucide-react";
import { useProjects } from "@/context/ProjectContext";

type MortarMix = "1:4" | "1:6";
type WallThickness = 9 | 4.5;

interface ApiResponse {
  success: boolean;
  type: string;
  timestamp: string;
  result: {
    wallLengthM: number;
    wallHeightM: number;
    thicknessInches: number;
    thicknessM: number;
    wallVolumeM3: number;
    mortarRatio: string;
    bricks: {
      theoretical: number;
      withWastage7pct: number;
      size: string;
    };
    cement: {
      volumeM3: number;
      bags50kg: number;
    };
    sand: {
      volumeM3: number;
      weightTons: number;
      volumeCFT: number;
    };
    standard: string;
  };
}

const inputCls =
  "w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm " +
  "focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 " +
  "font-semibold text-slate-800 transition-all shadow-sm";

const labelCls =
  "block text-[10px] font-extrabold text-slate-700 uppercase tracking-widest mb-1.5";

const ResultRow = ({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string | number;
  highlight?: boolean;
}) => (
  <div
    className={`flex justify-between items-center py-2 border-b border-slate-100 last:border-0 ${
      highlight ? "font-extrabold text-wix-dark" : "text-slate-600"
    }`}
  >
    <span className="text-xs">{label}</span>
    <span className={`text-xs font-bold ${highlight ? "text-orange-500" : ""}`}>{value}</span>
  </div>
);

export default function BrickCalculator() {
  const { addLead } = useProjects();
  const [wallLength, setWallLength] = useState(20);
  const [wallHeight, setWallHeight] = useState(3);
  const [wallThick, setWallThick] = useState<WallThickness>(9);
  const [mortarRatio, setMortarRatio] = useState<MortarMix>("1:6");
  
  const [loading, setLoading] = useState(false);
  const [apiResult, setApiResult] = useState<ApiResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [quoteRequested, setQuoteRequested] = useState(false);

  const handleCalculate = useCallback(async () => {
    setLoading(true);
    setApiResult(null);
    setApiError(null);
    setQuoteRequested(false);
    
    try {
      const res = await fetch("/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "brick", lengthM: wallLength, heightM: wallHeight, thicknessIn: wallThick, mortarRatio }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Calculation failed");
      setApiResult(data as ApiResponse);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Calculation failed";
      setApiError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, [wallLength, wallHeight, wallThick, mortarRatio]);

  const handleRequestQuote = async () => {
    if (!apiResult) return;
    try {
      await addLead({
        name: "Brick Masonry User",
        email: "guest.calculator@civilathand.com",
        phone: "+91 00000 00000",
        service: "Architectural & Structural Design",
        source: "Brick Wall Calculator Page",
        details: `Estimate: ${apiResult.result.bricks?.withWastage7pct} bricks, ${apiResult.result.cement?.bags50kg} cement bags, ${apiResult.result.sand?.volumeCFT} CFT sand for ${wallLength}mx${wallHeight}m wall (${wallThick}" thickness).`,
      });
      setQuoteRequested(true);
    } catch (err) {
      console.error("Failed to request quote:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="print:hidden flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <nav className="mb-6">
              <Link
                href="/calculators"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-wider"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Calculators
              </Link>
            </nav>

            {/* Page Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200/60 px-3 py-1 text-[10px] font-extrabold text-orange-700 uppercase tracking-widest mb-3">
                Standard: IS 1077:1992 Common Burnt Clay Bricks
              </div>
              <h1 className="font-display text-3xl font-extrabold text-wix-dark tracking-tight uppercase sm:text-4xl">
                Brick & Masonry Wall Estimator
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-3xl leading-relaxed">
                Calculate bricks and mortar components for load-bearing structures and partition walls. Computes cement bags and fine sand weights automatically based on standard dry mortar swelling factors and 7% material wastage allowances.
              </p>
            </div>

            {/* Calculator Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Input Panel */}
              <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h2 className="text-sm font-bold text-wix-dark uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                  Parameters
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Wall Length (m)</label>
                      <input
                        type="number"
                        min="0.1"
                        max="10000"
                        step="0.5"
                        value={wallLength}
                        onChange={(e) => setWallLength(Math.max(0.1, Number(e.target.value)))}
                        className={inputCls}
                      />
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">Horizontal span in meters.</p>
                    </div>

                    <div>
                      <label className={labelCls}>Wall Height (m)</label>
                      <input
                        type="number"
                        min="0.1"
                        max="100"
                        step="0.1"
                        value={wallHeight}
                        onChange={(e) => setWallHeight(Math.max(0.1, Number(e.target.value)))}
                        className={inputCls}
                      />
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">Vertical height in meters.</p>
                    </div>
                  </div>

                  <div>
                    <label className={labelCls}>Wall Thickness</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {([9, 4.5] as const).map((thick) => (
                        <button
                          key={thick}
                          type="button"
                          onClick={() => setWallThick(thick)}
                          className={`py-3 px-4 rounded-xl border text-left transition-all ${
                            wallThick === thick
                              ? "bg-wix-dark text-white border-wix-dark shadow-sm"
                              : "bg-white text-wix-dark border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <span className="block font-extrabold text-xs">{thick} Inch</span>
                          <span className="block text-[8px] font-normal opacity-70 mt-0.5">
                            {thick === 9 ? "230mm (Double wythe)" : "115mm (Single wythe)"}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">9-inch is load-bearing; 4.5-inch is standard partition.</p>
                  </div>

                  <div>
                    <label className={labelCls}>Mortar Mix (Cement : Sand)</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(["1:4", "1:6"] as MortarMix[]).map((mix) => (
                        <button
                          key={mix}
                          type="button"
                          onClick={() => setMortarRatio(mix)}
                          className={`py-3 px-4 rounded-xl border text-left transition-all ${
                            mortarRatio === mix
                              ? "bg-orange-500 text-white border-orange-500 shadow-sm"
                              : "bg-white text-wix-dark border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <span className="block font-extrabold text-xs">{mix}</span>
                          <span className="block text-[8px] font-normal opacity-85 mt-0.5">
                            {mix === "1:4" ? "Stronger Structural" : "Standard Partition"}
                          </span>
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">Rich mixes resist tensile cracking in masonry joints.</p>
                  </div>

                  <button
                    type="button"
                    onClick={handleCalculate}
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-xl py-3.5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Computing Bricks...
                      </>
                    ) : (
                      <>
                        Calculate Bricks
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>

                  {apiResult && (
                    <div className="space-y-3 print:hidden">
                      <button
                        type="button"
                        onClick={handleRequestQuote}
                        disabled={quoteRequested}
                        className={`w-full text-white rounded-xl py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          quoteRequested
                            ? "bg-emerald-600 cursor-default"
                            : "bg-wix-dark hover:bg-slate-800"
                        }`}
                      >
                        {quoteRequested ? (
                          <>
                            <Check className="h-4 w-4" />
                            Detailed Quote Requested!
                          </>
                        ) : (
                          <>
                            Request Expert Quote
                            <ChevronRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => window.print()}
                        className="w-full bg-white hover:bg-slate-50 text-slate-800 rounded-xl py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-300 shadow-sm"
                      >
                        Download PDF Report
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm min-h-[380px] flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-bold text-wix-dark uppercase tracking-wider mb-6 border-b border-slate-100 pb-3">
                    Material Takeoff
                  </h2>

                  <AnimatePresence mode="wait">
                    {!apiResult && !apiError && !loading && (
                      <motion.div
                        key="empty"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-12 flex flex-col items-center justify-center text-center"
                      >
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-4">
                          <BrickWall className="h-10 w-10 text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-400 font-semibold">Enter wall dimensions and click Calculate Bricks</p>
                      </motion.div>
                    )}

                    {loading && (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="py-12 flex flex-col items-center justify-center text-center"
                      >
                        <Loader2 className="h-8 w-8 text-orange-500 animate-spin mb-4" />
                        <p className="text-xs text-slate-500 font-medium">Running estimations on the server...</p>
                      </motion.div>
                    )}

                    {apiError && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4"
                      >
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-red-700 font-semibold">{apiError}</p>
                      </motion.div>
                    )}

                    {apiResult && !loading && (
                      <motion.div
                        key="results"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        {/* Brick count Banner */}
                        <div className="bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-100 rounded-2xl p-6">
                          <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest block">
                            Total Bricks Required (incl. +7% wastage)
                          </span>
                          <div className="text-3xl font-extrabold font-display text-wix-dark mt-1">
                            {apiResult.result.bricks?.withWastage7pct?.toLocaleString("en-IN")}{" "}
                            <span className="text-lg font-bold text-slate-500">Nos</span>
                          </div>
                          <div className="text-xs font-bold text-orange-500 mt-1">
                            Theoretical count: {apiResult.result.bricks?.theoretical?.toLocaleString("en-IN")} bricks
                          </div>
                        </div>

                        {/* Detail list */}
                        <div className="space-y-1">
                          <ResultRow label="Masonry Volume" value={`${apiResult.result.wallVolumeM3} m³`} highlight />
                          <ResultRow label="Cement Bags (50kg)" value={`${apiResult.result.cement?.bags50kg} Bags`} highlight />
                          <ResultRow label="Fine Sand Volume" value={`${apiResult.result.sand?.volumeM3} m³ = ${apiResult.result.sand?.volumeCFT} CFT`} highlight />
                          <ResultRow label="Fine Sand Weight" value={`${apiResult.result.sand?.weightTons} Tons (@ density 1.6 T/m³)`} />
                          <ResultRow label="Mortar Proportions" value={apiResult.result.mortarRatio} />
                          <ResultRow label="Wall Nominal Dimension" value={`${apiResult.result.wallLengthM}m × ${apiResult.result.wallHeightM}m`} />
                          <ResultRow label="Wall Selected Thickness" value={`${apiResult.result.thicknessInches} Inch (${apiResult.result.thicknessM * 1000} mm)`} />
                          <ResultRow label="Brick Unit Specification" value={apiResult.result.bricks?.size} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {apiResult && !loading && (
                  <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Source Code Compliance: IS 1077:1992</span>
                    <span>{apiResult.result.standard}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Formula Reference Card */}
            <section className="mt-12">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="font-display text-base font-bold text-wix-dark mb-4 uppercase tracking-wider">
                  Brickwork Masonry Calculations Guidelines
                </h3>
                <div className="prose prose-slate max-w-none text-xs text-slate-600 leading-relaxed space-y-3">
                  <p>
                    Masonry takeoffs are defined in compliance with <strong>IS 1077:1992</strong>. A standard modular brick size is 190 mm × 90 mm × 90 mm. When laid in walls with a standard 10 mm mortar joint, the nominal brick size becomes 200 mm × 100 mm × 100 mm:
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-center text-wix-dark font-semibold">
                    Nominal brick volume = 0.2 × 0.1 × 0.1 = 0.002 m³ (giving 500 bricks per m³ of wall volume)
                  </div>
                  <p>
                    Mortar calculations extract the wet mortar volume from the remaining space not occupied by standard brick dimensions:
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-center text-wix-dark font-semibold">
                    Wet Mortar Fraction = 1 - [500 × (0.19 × 0.09 × 0.09)] ≈ 0.2295 (or ~23% of total wall volume)
                  </div>
                  <p>
                    To convert wet mortar volume to dry sand and cement volume (accounting for swelling, settlement, and dry shrinkage during hydration), a standard expansion factor of 1.33 is applied. Standard cement bag volume (50kg) is taken as 0.0347 m³, and river sand bulk density is taken as 1.6 Tons per m³. An industry-standard allowance of 7% is added to cover breakage during transport and masonry cuts.
                  </p>
                </div>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>

      {/* Hidden PDF report container */}
      {apiResult && (
        <div className="hidden print:block bg-white text-slate-800 p-8 font-sans w-full max-w-4xl mx-auto">
          {/* Company header */}
          <div className="flex justify-between items-start border-b-2 border-orange-500 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <a href="https://civilathand.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Civil At Hand Logo" className="h-14 w-14 rounded-lg object-cover border border-slate-200" />
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-slate-900 leading-none">CIVIL AT HAND</h1>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest block mt-1">Design & Consultancy</span>
                </div>
              </a>
            </div>
            <div className="text-right text-xs text-slate-500 space-y-1">
              <h2 className="font-bold text-slate-800 text-sm">CIVIL AT HAND GROUP</h2>
              <p>Email: <a href="mailto:contact@civilathand.com" className="text-orange-500 hover:underline">contact@civilathand.com</a></p>
              <p>Web: <a href="https://civilathand.com" className="text-orange-500 hover:underline">www.civilathand.com</a></p>
              <p>Phone: <a href="tel:+919876543210" className="text-orange-500 hover:underline">+91 98765 43210</a></p>
              <div className="flex justify-end gap-2 pt-1 font-semibold text-[9px] text-slate-400">
                <a href="https://www.linkedin.com/company/civil-at-hand" target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
                <span>•</span>
                <a href="https://www.youtube.com/@civilathand" target="_blank" rel="noopener noreferrer" className="hover:underline">YouTube</a>
                <span>•</span>
                <a href="https://wa.me/message/JNVZ7YY6BQJ3L1" target="_blank" rel="noopener noreferrer" className="hover:underline">WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Document metadata */}
          <div className="mb-6 flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <h3 className="font-display font-extrabold text-lg text-slate-900 uppercase tracking-wide">
                Brickwork Masonry Takeoff Report
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">Generated on: {new Date(apiResult.timestamp).toLocaleString("en-IN")}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-orange-50 text-orange-700 border border-orange-200/60 uppercase tracking-wider">
                IS 1077 Compliant
              </span>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Project Specifications</h4>
            <div className="grid grid-cols-3 gap-4 border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-700 bg-slate-50/30">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Wall Nominal Dimension</span>
                <span className="text-slate-800 text-sm font-bold">{wallLength}m × {wallHeight}m</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Wall Thickness</span>
                <span className="text-slate-800 text-sm font-bold">{wallThick} Inch ({wallThick === 9 ? "230mm" : "115mm"})</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Mortar Proportions</span>
                <span className="text-slate-800 text-sm font-bold">{mortarRatio} (Cement:Sand)</span>
              </div>
            </div>
          </div>

          {/* Takeoff Table */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Masonry Takeoff Details</h4>
            <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Material / Item</th>
                  <th className="py-3 px-4">Specification / Index</th>
                  <th className="py-3 px-4 text-right">Estimated Qty</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">Total Clay Bricks Required</div>
                    <div className="text-[10px] text-slate-400">Theoretical: {apiResult.result.bricks?.theoretical} Nos</div>
                  </td>
                  <td className="py-3 px-4">Standard modular size +7% site wastage</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{apiResult.result.bricks?.withWastage7pct} Nos</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Ordinary Portland Cement</td>
                  <td className="py-3 px-4">Mortar mix ratio {mortarRatio} (@ 50kg bags)</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{apiResult.result.cement?.bags50kg} Bags</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Fine Sand Volume (CFT)</td>
                  <td className="py-3 px-4">Dry Sand Volume Multiplier 1.33</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{apiResult.result.sand?.volumeCFT} CFT</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Fine Sand Weight (Tons)</td>
                  <td className="py-3 px-4">Bulk density standard: 1.6 Tons/m³</td>
                  <td className="py-3 px-4 text-right">{apiResult.result.sand?.weightTons} Tons</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Net Masonry Volume</td>
                  <td className="py-3 px-4">Computed Wall Size Volume</td>
                  <td className="py-3 px-4 text-right">{apiResult.result.wallVolumeM3} m³</td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                  <td className="py-3.5 px-4 text-sm">TOTAL WALL AREA</td>
                  <td className="py-3.5 px-4 text-sm">Length ({wallLength}m) × Height ({wallHeight}m)</td>
                  <td className="py-3.5 px-4 text-right text-base text-orange-500 font-extrabold">{wallLength * wallHeight} m²</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Technical standards notes */}
          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-xl p-4 text-[11px] leading-relaxed text-slate-500">
            <h5 className="font-bold text-slate-700 mb-1">standards & design factors:</h5>
            <p>
              Calculations adhere to IS 1077:1992 (Common burnt clay building bricks - specifications). Wet mortar calculation excludes brick volumes based on standard modular tolerances. Sand dry expansion applies a factor of 1.33. Operation allowances incorporate a standard +7% safety factor for site cuts, breakage, and logistics wastage.
            </p>
          </div>

          {/* Signature block */}
          <div className="pt-12 border-t border-slate-100 flex justify-between items-end text-xs text-slate-500">
            <div>
              <p>Prepared by: Civil At Hand Auto-Takeoff Engine</p>
              <p className="mt-1">Verification Status: Verified (IS-Code compliant)</p>
            </div>
            <div className="text-right">
              <div className="h-10 w-24 border-b border-slate-300 ml-auto mb-1"></div>
              <p className="font-bold text-slate-700">Authorized Estimator</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
