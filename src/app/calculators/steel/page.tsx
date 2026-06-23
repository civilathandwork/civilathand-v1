"use client";

import React, { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Weight,
  ArrowLeft,
  ArrowRight,
  Loader2,
  AlertCircle,
  Check,
  ChevronRight,
} from "lucide-react";
import { useProjects } from "@/context/ProjectContext";

interface ApiResponse {
  success: boolean;
  type: string;
  timestamp: string;
  result: {
    diameterMm: number;
    lengthM: number;
    qty: number;
    formula: string;
    unitWeightKgPerM: number;
    is1786NominalKgPerM: number;
    weightPerBarKg: number;
    totalWeightKg: number;
    totalWeightTons: number;
    estimatedMarketValue: string;
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

export default function SteelCalculator() {
  const { addLead } = useProjects();
  const [diameter, setDiameter] = useState(12);
  const [barLength, setBarLength] = useState(12);
  const [barQty, setBarQty] = useState(50);
  
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
        body: JSON.stringify({ type: "steel", diameterMm: diameter, lengthM: barLength, qty: barQty }),
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
  }, [diameter, barLength, barQty]);

  const handleRequestQuote = async () => {
    if (!apiResult) return;
    try {
      await addLead({
        name: "Steel Rebar User",
        email: "guest.calculator@civilathand.com",
        phone: "+91 00000 00000",
        service: "Architectural & Structural Design",
        source: "Steel Rebar Page",
        details: `Estimate: Ø ${diameter}mm, Total weight: ${apiResult.result.totalWeightKg} KG (${apiResult.result.totalWeightTons} Tons) for ${barQty} bars of length ${barLength}m.`,
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
                href="/calculator"
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-orange-500 transition-colors uppercase tracking-wider"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Calculators
              </Link>
            </nav>

            {/* Page Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 border border-orange-200/60 px-3 py-1 text-[10px] font-extrabold text-orange-700 uppercase tracking-widest mb-3">
                Standard: IS 1786:2008 Steel Reinforcing Bars
              </div>
              <h1 className="font-display text-3xl font-extrabold text-wix-dark tracking-tight uppercase sm:text-4xl">
                Steel Rebar Weight Calculator
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-3xl leading-relaxed">
                Determine the total mass of steel reinforcement required for RCC construction beams, columns, and foundations. Proportions are matched to standard nominal weights specified under IS 1786 codes with an added 7% wastage margin.
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
                    <label className={labelCls}>Bar Nominal Diameter (mm)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {[8, 10, 12, 16, 20, 25, 32, 40].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDiameter(d)}
                          className={`py-2.5 rounded-lg border text-xs font-bold transition-all text-center ${
                            diameter === d
                              ? "bg-wix-dark text-white border-wix-dark shadow-sm"
                              : "bg-white text-wix-dark border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          Ø{d}
                        </button>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1.5 font-medium">Select the standard bar diameter size.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Bar Length (m)</label>
                      <input
                        type="number"
                        min="0.1"
                        max="1000"
                        step="0.5"
                        value={barLength}
                        onChange={(e) => setBarLength(Math.max(0.1, Number(e.target.value)))}
                        className={inputCls}
                      />
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">Common length is 12m (40ft).</p>
                    </div>

                    <div>
                      <label className={labelCls}>Number of Bars</label>
                      <input
                        type="number"
                        min="1"
                        max="1000000"
                        value={barQty}
                        onChange={(e) => setBarQty(Math.max(1, Number(e.target.value)))}
                        className={inputCls}
                      />
                      <p className="text-[10px] text-slate-400 mt-1 font-medium">Specify the total count.</p>
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
                        Computing Steel Weight...
                      </>
                    ) : (
                      <>
                        Calculate Weight
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
                    Steel Reinforcement Weight
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
                          <Weight className="h-10 w-10 text-slate-300" />
                        </div>
                        <p className="text-sm text-slate-400 font-semibold">Select diameter, length and count, then click Calculate Weight</p>
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
                        {/* Weight Banner */}
                        <div className="bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-100 rounded-2xl p-6">
                          <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest block">
                            Total Reinforcement Weight
                          </span>
                          <div className="text-3xl font-extrabold font-display text-wix-dark mt-1">
                            {Number(apiResult.result.totalWeightKg).toLocaleString("en-IN")}{" "}
                            <span className="text-lg font-bold text-slate-500">KG</span>
                          </div>
                          <div className="text-xs font-bold text-orange-500 mt-1">
                            ≈ {apiResult.result.totalWeightTons} Metric Tons (includes +7% standard site wastage)
                          </div>
                        </div>

                        {/* Detail list */}
                        <div className="space-y-1">
                          <ResultRow label="Bar Diameter Selected" value={`Ø ${apiResult.result.diameterMm} mm`} highlight />
                          <ResultRow label="Total Length of Steel" value={`${apiResult.result.lengthM * apiResult.result.qty} meters (${apiResult.result.qty} bars × ${apiResult.result.lengthM}m)`} />
                          <ResultRow label="Standard Density of Steel" value="7850 kg/m³" />
                          <ResultRow label="Mathematical Weight (D²/162.2)" value={`${apiResult.result.unitWeightKgPerM} kg/m`} highlight />
                          <ResultRow label="IS 1786 Nominal Weight" value={`${apiResult.result.is1786NominalKgPerM} kg/m`} />
                          <ResultRow label="Weight Per Bar (calc)" value={`${apiResult.result.weightPerBarKg} kg`} />
                          <ResultRow label="Estimated Material Cost" value={apiResult.result.estimatedMarketValue} highlight />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {apiResult && !loading && (
                  <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>Source Code Compliance: IS 1786:2008</span>
                    <span>{apiResult.result.standard}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Formula Reference Card */}
            <section className="mt-12">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="font-display text-base font-bold text-wix-dark mb-4 uppercase tracking-wider">
                  Reinforcement Steel Mathematical Formula
                </h3>
                <div className="prose prose-slate max-w-none text-xs text-slate-600 leading-relaxed space-y-3">
                  <p>
                    As per <strong>IS 1786:2008</strong>, reinforcing steel bar weights are calculated from their cross-sectional area and the standard density of steel:
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-center text-wix-dark font-semibold">
                    Unit Weight (kg/m) = Area (π × D² / 4) × Density (7850 kg/m³) / 10⁶
                  </div>
                  <p>
                    Which simplifies directly to the standard site formula:
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-center text-wix-dark font-semibold">
                    Unit Weight (W) = D² / 162.2  kg/m (where D is Diameter in millimeters)
                  </div>
                  <p>
                    We multiply this unit weight by the individual bar length and the quantity to compute the total steel requirement. A site-level safety coefficient of 7% is added to cover structural lap lengths, hook bending tolerances, cutting scrap, and general rebar wastage.
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
                Steel Reinforcement Takeoff Report
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">Generated on: {new Date(apiResult.timestamp).toLocaleString("en-IN")}</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-orange-50 text-orange-700 border border-orange-200/60 uppercase tracking-wider">
                IS 1786 Compliant
              </span>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Project Specifications</h4>
            <div className="grid grid-cols-3 gap-4 border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-700 bg-slate-50/30">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Nominal Diameter</span>
                <span className="text-slate-800 text-sm font-bold">Ø {diameter} mm</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Bar Unit Length</span>
                <span className="text-slate-800 text-sm font-bold">{barLength} meters</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Quantity of Bars</span>
                <span className="text-slate-800 text-sm font-bold">{barQty} Nos</span>
              </div>
            </div>
          </div>

          {/* Steel Takeoff Table */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Reinforcement Calculations</h4>
            <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4">Parameter</th>
                  <th className="py-3 px-4">Standard Formula / Constant</th>
                  <th className="py-3 px-4 text-right">Computed Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-700">
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Total Steel Length</td>
                  <td className="py-3 px-4">Bar Qty ({barQty}) × Unit Length ({barLength}m)</td>
                  <td className="py-3 px-4 text-right">{barQty * barLength} meters</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Mathematical Unit Weight</td>
                  <td className="py-3 px-4">D² / 162.2</td>
                  <td className="py-3 px-4 text-right">{apiResult.result.unitWeightKgPerM} kg/m</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">IS 1786 Nominal weight</td>
                  <td className="py-3 px-4">Standard Reference Index</td>
                  <td className="py-3 px-4 text-right">{apiResult.result.is1786NominalKgPerM} kg/m</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Single Bar Weight</td>
                  <td className="py-3 px-4">Unit Weight × Length</td>
                  <td className="py-3 px-4 text-right">{apiResult.result.weightPerBarKg} kg</td>
                </tr>
                <tr className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 font-bold text-slate-900">Market Value Range</td>
                  <td className="py-3 px-4">Steel index @ ₹62–70/kg + GST</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900">{apiResult.result.estimatedMarketValue}</td>
                </tr>
                <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                  <td className="py-3.5 px-4 text-sm">TOTAL WEIGHT REQUIRED (including +7% wastage)</td>
                  <td className="py-3.5 px-4 text-sm">Formula + wastage factor</td>
                  <td className="py-3.5 px-4 text-right text-base text-orange-500 font-extrabold">{Number(apiResult.result.totalWeightKg).toLocaleString("en-IN")} KG</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Technical standards notes */}
          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-xl p-4 text-[11px] leading-relaxed text-slate-500">
            <h5 className="font-bold text-slate-700 mb-1">standards & design factors:</h5>
            <p>
              All steel reinforcing bar weights correspond to tolerances specified in IS 1786:2008 (High strength deformed steel bars and wires for concrete reinforcement). A structural safety and operational scrap multiplier of +7% has been applied to account for standard hook bends, lap lengths, joint overlaps, and cutting wastage at site.
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
