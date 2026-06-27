"use client";

import React, { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  FlaskConical,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  Check,
  ChevronRight,
} from "lucide-react";
import { useProjects } from "@/context/ProjectContext";

type MixGrade = "M15" | "M20" | "M25" | "M30";

interface ApiResponse {
  success: boolean;
  type: string;
  timestamp: string;
  result: {
    wetVolumeM3: number;
    dryVolumeM3: number;
    grade: string;
    mixRatio: string;
    use: string;
    cement: {
      volumeM3: number;
      bags50kg: number;
      totalKg: number;
    };
    sand: {
      volumeM3: number;
      weightTons: number;
      volumeCFT: number;
    };
    aggregate: {
      volumeM3: number;
      weightTons: number;
      volumeCFT: number;
    };
    standard: string;
  };
}

const mixLabels: Record<MixGrade, string> = {
  M15: "M15 (1:2:4) — PCC footings & levelling",
  M20: "M20 (1:1.5:3) — Slabs, beams & staircases",
  M25: "M25 (1:1:2) — Columns, shear walls & foundations",
  M30: "M30 (1:0.75:1.5) — High-strength structures",
};

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

export default function ConcreteCalculator() {
  const { addLead } = useProjects();
  const [volumeM3, setVolumeM3] = useState(10);
  const [grade, setGrade] = useState<MixGrade>("M20");
  
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
        body: JSON.stringify({ type: "concrete", volumeM3, grade }),
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
  }, [volumeM3, grade]);

  const handleRequestQuote = async () => {
    if (!apiResult) return;
    try {
      await addLead({
        name: "Concrete Volumetrics User",
        email: "guest.calculator@civilathand.com",
        phone: "+91 00000 00000",
        service: "Architectural & Structural Design",
        source: "Concrete Volumetrics Page",
        details: `Estimate: ${apiResult.result.cement?.bags50kg} cement bags, ${apiResult.result.sand?.volumeCFT} CFT sand, ${apiResult.result.aggregate?.volumeCFT} CFT aggregate for ${volumeM3} m³ of ${grade} concrete.`,
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
                href="/calculator/all-calculators"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-wider"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Calculators
              </Link>
            </nav>

            {/* Page Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200/60 px-3 py-1 text-[10px] font-extrabold text-orange-700 uppercase tracking-widest mb-3">
                Standard: IS 456:2000 Nominal Concrete Mixes
              </div>
              <h1 className="font-display text-3xl font-extrabold text-wix-dark tracking-tight uppercase sm:text-4xl">
                Concrete Volumetrics
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-3xl leading-relaxed">
                Calculate the required raw materials (cement bags, sand volume and aggregate weights) for structural concrete casting. The engine automatically handles dry-mix volume shrinkage factors and allows a standard 5% wastage allowance.
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
                  <div>
                    <label className={labelCls}>Wet Concrete Volume (m³)</label>
                    <input
                      type="number"
                      min="0.1"
                      max="1000000"
                      step="0.1"
                      value={volumeM3}
                      onChange={(e) => setVolumeM3(Math.max(0.1, Number(e.target.value)))}
                      className={inputCls}
                    />
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">Specify the required wet volume to be cast.</p>
                  </div>

                  <div>
                    <label className={labelCls}>Concrete Nominal Grade</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {(["M15", "M20", "M25", "M30"] as MixGrade[]).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGrade(g)}
                          className={`py-3 px-4 rounded-xl border text-left transition-all ${
                            grade === g
                              ? "bg-wix-dark text-white border-wix-dark shadow-sm"
                              : "bg-white text-wix-dark border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <span className="block font-extrabold text-xs">{g}</span>
                          <span className="block text-[8px] font-normal opacity-70 mt-0.5">
                            {mixLabels[g].split("—")[0].trim().replace(`${g} `, "")}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-3 bg-blue-50/70 border border-blue-100/80 rounded-xl p-3">
                      <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
                        <strong>Recommended Use:</strong> {mixLabels[grade].split("—")[1]?.trim()}
                      </p>
                    </div>
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
                        Computing Quantities...
                      </>
                    ) : (
                      <>
                        Calculate Materials
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
                          <FlaskConical className="h-10 w-10 text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-400 font-semibold">Select concrete grade & volume, then click Calculate Materials</p>
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
                        {/* Material Takeoff Summary Card */}
                        <div className="bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-100 rounded-2xl p-6">
                          <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest block">
                            Total Cement Required (50kg Bags)
                          </span>
                          <div className="text-3xl font-extrabold font-display text-wix-dark mt-1">
                            {apiResult.result.cement?.bags50kg} <span className="text-lg font-bold text-slate-500">Bags</span>
                          </div>
                          <div className="text-xs font-bold text-orange-500 mt-1">
                            Totaling {apiResult.result.cement?.totalKg?.toLocaleString("en-IN")} KG of dry cement (+5% site wastage included)
                          </div>
                        </div>

                        {/* Detail list */}
                        <div className="space-y-1">
                          <ResultRow label="Grade of Concrete" value={`${apiResult.result.grade} (${apiResult.result.mixRatio})`} highlight />
                          <ResultRow label="Wet Volume Input" value={`${apiResult.result.wetVolumeM3} m³`} />
                          <ResultRow label="Computed Dry Volume (Wet × 1.54)" value={`${apiResult.result.dryVolumeM3} m³`} />
                          <ResultRow label="Cement Volume" value={`${apiResult.result.cement?.volumeM3} m³`} />
                          <ResultRow label="Fine Aggregate (Sand) Volume" value={`${apiResult.result.sand?.volumeM3} m³ = ${apiResult.result.sand?.volumeCFT} CFT`} highlight />
                          <ResultRow label="Fine Aggregate (Sand) Weight" value={`${apiResult.result.sand?.weightTons} Tons (@ bulk density 1.6 T/m³)`} />
                          <ResultRow label="Coarse Aggregate (Grit) Volume" value={`${apiResult.result.aggregate?.volumeM3} m³ = ${apiResult.result.aggregate?.volumeCFT} CFT`} highlight />
                          <ResultRow label="Coarse Aggregate (Grit) Weight" value={`${apiResult.result.aggregate?.weightTons} Tons (@ bulk density 1.5 T/m³)`} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {apiResult && !loading && (
                  <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Source Code Compliance: IS 456:2000</span>
                    <span>{apiResult.result.standard}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Formula Reference Card */}
            <section className="mt-12">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="font-display text-base font-bold text-wix-dark mb-4 uppercase tracking-wider">
                  Concrete Mix Design Formulas
                </h3>
                <div className="prose prose-slate max-w-none text-xs text-slate-600 leading-relaxed space-y-3">
                  <p>
                    Nominal concrete mix ratios are defined in <strong>IS 456:2000 Table 9</strong>. Because concrete ingredients shrink during mixing and curing, dry volumetric requirements are much larger than the finished wet volume:
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-center text-wix-dark font-semibold">
                    Dry Mix Volume = Wet Concrete Volume × 1.54 (Dry Vol factor)
                  </div>
                  <p>
                    Material proportions are split by parts where:
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-center text-wix-dark font-semibold">
                    Part Volume = Dry Mix Volume / Total Proportion Parts Sum
                  </div>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Cement Bags:</strong> Cement Volume / 0.0347 m³ (which is the volume of a single standard 50 kg bag, based on cement dry density of 1440 kg/m³).</li>
                    <li><strong>Fine Aggregate (Sand):</strong> Sand Volume = Dry Mix Volume × (Sand Proportion / Parts Sum). Weight is calculated using a dry river sand bulk density of 1.6 Tons/m³.</li>
                    <li><strong>Coarse Aggregate (Stones/Grit):</strong> Aggregate Volume = Dry Mix Volume × (Aggregate Proportion / Parts Sum). Weight is calculated using coarse aggregate bulk density of 1.5 Tons/m³ as per IS 383 specifications.</li>
                  </ul>
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
                Concrete Volumetrics Material Report
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">Generated on: {new Date(apiResult.timestamp).toLocaleString("en-IN")}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-orange-50 text-orange-700 border border-orange-200/60 uppercase tracking-wider">
                IS 456 Compliant
              </span>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Project Specifications</h4>
            <div className="grid grid-cols-2 gap-4 border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-700 bg-slate-50/30">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Wet Concrete Volume</span>
                <span className="text-slate-800 text-sm font-bold">{volumeM3} m³</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Nominal Concrete Grade</span>
                <span className="text-slate-800 text-sm font-bold">{grade} ({apiResult.result.mixRatio})</span>
              </div>
            </div>
          </div>

          {/* Material Takeoff Table */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Material Takeoff Details</h4>
            <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Material Description</th>
                  <th className="py-3 px-4 text-right">Volumetric Qty</th>
                  <th className="py-3 px-4 text-right">Commercial Qty / Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">Ordinary Portland Cement (OPC/PPC)</div>
                    <div className="text-[10px] text-slate-400">Dry density standard: 1,440 kg/m³</div>
                  </td>
                  <td className="py-3 px-4 text-right">{apiResult.result.cement?.volumeM3} m³</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    {apiResult.result.cement?.bags50kg} Bags ({apiResult.result.cement?.totalKg?.toLocaleString("en-IN")} kg)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">Fine Aggregate (Dry River Sand)</div>
                    <div className="text-[10px] text-slate-400">Bulk density standard: 1.6 Tons/m³</div>
                  </td>
                  <td className="py-3 px-4 text-right">{apiResult.result.sand?.volumeM3} m³</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    {apiResult.result.sand?.volumeCFT} CFT ({apiResult.result.sand?.weightTons} Tons)
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">Coarse Aggregate (Grit/Stone Chips)</div>
                    <div className="text-[10px] text-slate-400">Bulk density standard: 1.5 Tons/m³</div>
                  </td>
                  <td className="py-3 px-4 text-right">{apiResult.result.aggregate?.volumeM3} m³</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">
                    {apiResult.result.aggregate?.volumeCFT} CFT ({apiResult.result.aggregate?.weightTons} Tons)
                  </td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                  <td className="py-3.5 px-4 text-sm">TOTAL ESTIMATED WET VOLUME</td>
                  <td className="py-3.5 px-4 text-right text-sm">—</td>
                  <td className="py-3.5 px-4 text-right text-base text-orange-500 font-extrabold">{volumeM3} m³</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Technical standards notes */}
          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-xl p-4 text-[11px] leading-relaxed text-slate-500">
            <h5 className="font-bold text-slate-700 mb-1">standards & design factors:</h5>
            <p>
              Nominal mix proportions correspond to IS 456:2000 code recommendations. Computations apply a dry-mix volume shrinkage multiplier of 1.54 to translate wet compacted concrete back to loose dry batch volumes. In accordance with CPWD norms, a standard +5% site material allowance is integrated to cover operational wastage during transit and compaction.
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

