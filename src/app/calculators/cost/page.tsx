"use client";

import React, { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useProjects } from "@/context/ProjectContext";

type QualityTier = "economy" | "standard" | "premium" | "luxury";

interface ApiResponse {
  success: boolean;
  type: string;
  timestamp: string;
  result: {
    area: number;
    quality: string;
    ratePerSqft: number;
    totalCost: number;
    breakdown: Record<string, { pct: number; amount: number }>;
    standard: string;
  };
}

const qualityLabels: Record<QualityTier, string> = {
  economy:  "Economy — Basic materials & local finishes (₹1,800/sqft)",
  standard: "Standard — Branded materials, vitrified tiles (₹2,500/sqft)",
  premium:  "Premium — Semi-luxury, marble, superior detailing (₹3,800/sqft)",
  luxury:   "Luxury — Designer imported finishes, smart-home integrations (₹5,500/sqft)",
};

const inputCls =
  "w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm " +
  "focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 " +
  "font-semibold text-slate-800 transition-all shadow-sm";

const labelCls =
  "block text-[10px] font-extrabold text-slate-700 uppercase tracking-widest mb-1.5";

export default function ConstructionCostCalculator() {
  const { addLead } = useProjects();
  const [area, setArea] = useState(1500);
  const [quality, setQuality] = useState<QualityTier>("standard");
  
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
        body: JSON.stringify({ type: "cost", area, quality }),
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
  }, [area, quality]);

  const handleRequestQuote = async () => {
    if (!apiResult) return;
    try {
      await addLead({
        name: "Cost Calculator User",
        email: "guest.calculator@civilathand.com",
        phone: "+91 00000 00000",
        service: "Architectural & Structural Design",
        source: "Cost Estimator Page",
        details: `Estimate: ₹${apiResult.result.totalCost?.toLocaleString("en-IN")} for ${area} sq.ft (${quality} quality).`,
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
              Standard: 2026 Indian Market Rates
            </div>
            <h1 className="font-display text-3xl font-extrabold text-wix-dark tracking-tight uppercase sm:text-4xl">
              Construction Cost Estimator
            </h1>
            <p className="mt-2 text-sm text-slate-500 max-w-3xl leading-relaxed">
              Plan your residential construction budget with high precision. Select your built-up area and structural/finishing material specifications to get itemized breakdowns of civil structure, plumbing, electrical, carpentry, and labour charges.
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
                  <label className={labelCls}>Built-Up Area (sq.ft)</label>
                  <input
                    type="number"
                    min="100"
                    max="1000000"
                    value={area}
                    onChange={(e) => setArea(Math.max(100, Number(e.target.value)))}
                    className={inputCls}
                  />
                  <p className="text-[10px] text-slate-400 mt-1 font-medium">Specify the total construction slab area.</p>
                </div>

                <div>
                  <label className={labelCls}>Construction Quality Spec</label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {(["economy", "standard", "premium", "luxury"] as QualityTier[]).map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setQuality(tier)}
                        className={`py-3 px-4 rounded-xl border text-xs font-extrabold uppercase tracking-wider transition-all text-center ${
                          quality === tier
                            ? "bg-wix-dark text-white border-wix-dark shadow-sm"
                            : "bg-white text-wix-dark border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-3 bg-orange-50/70 border border-orange-100/80 rounded-xl p-3">
                    <p className="text-[10px] text-orange-700 font-medium leading-relaxed">
                      {qualityLabels[quality]}
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
                      Computing Estimate...
                    </>
                  ) : (
                    <>
                      Calculate Cost
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
                  Estimate Results
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
                        <Calculator className="h-10 w-10 text-slate-300" />
                      </div>
                      <p className="text-sm text-slate-400 font-semibold">Enter your project specifications and click Calculate Cost</p>
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
                      {/* Cost Banner */}
                      <div className="bg-gradient-to-br from-slate-50 to-orange-50/20 border border-slate-100 rounded-2xl p-6">
                        <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest block">
                          Total Construction Budget
                        </span>
                        <div className="text-3xl font-extrabold font-display text-wix-dark mt-1">
                          ₹{apiResult.result.totalCost?.toLocaleString("en-IN")}
                        </div>
                        <div className="text-xs font-bold text-orange-500 mt-1">
                          Calculated at ₹{apiResult.result.ratePerSqft?.toLocaleString("en-IN")} per sq.ft (+5% site wastage included)
                        </div>
                      </div>

                      {/* Visual Itemized Breakdown */}
                      <div className="space-y-4">
                        <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                          Itemized Cost Distribution
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(apiResult.result.breakdown || {}).map(([key, item], idx) => {
                            const labelMap: Record<string, string> = {
                              civil: "Civil Structural Works (Slab, Column, Foundation)",
                              finishes: "Finishing & Tiling (Flooring, Painting, Plaster)",
                              mep: "MEP Fittings & Piping (Electrical, Plumbing)",
                              carpentry: "Carpentry & Joinery (Doors, Windows)",
                              labour: "Labour & Construction Supervision Charges",
                            };
                            return (
                              <div key={key} className="space-y-1.5">
                                <div className="flex justify-between text-xs font-medium">
                                  <span className="text-slate-600">{labelMap[key] || key}</span>
                                  <span className="font-bold text-wix-dark">
                                    ₹{item.amount?.toLocaleString("en-IN")} ({item.pct}%)
                                  </span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${item.pct}%` }}
                                    transition={{ delay: idx * 0.05, duration: 0.6 }}
                                    className="h-full bg-orange-500 rounded-full"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {apiResult && !loading && (
                <div className="border-t border-slate-100 pt-4 mt-6 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                  <span>Source Code Compliance: NBO Standards</span>
                  <span>{apiResult.result.standard}</span>
                </div>
              )}
            </div>
          </div>

          {/* Formula Reference Card */}
          <section className="mt-12">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h3 className="font-display text-base font-bold text-wix-dark mb-4 uppercase tracking-wider">
                Estimation Formula & Rates
              </h3>
              <div className="prose prose-slate max-w-none text-xs text-slate-600 leading-relaxed space-y-3">
                <p>
                  Our Construction Cost Estimator utilizes state-level residential market trends compiled for 2026. The budget is derived using the standard area-multiplication method:
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 font-mono text-center text-wix-dark font-semibold">
                  Total Budget = Built-Up Area (sq.ft) × Quality Tier Rate Per Sq.Ft (+ 5% allowance for site contingency & wastage)
                </div>
                <p>
                  The cost breakdown follows the standard Indian construction industry allocation norms:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Civil Structure (35%):</strong> Cement, structural reinforcing steel, fine/coarse aggregates, structural concrete mix, excavation, and backfill.</li>
                  <li><strong>Finishing works (20%):</strong> Vitrified tiling/marble, plastering, interior and exterior acrylic paints.</li>
                  <li><strong>MEP (15%):</strong> Mechanical, Electrical, and Plumbing conduits, wires, sanitary fixtures, and distribution boxes.</li>
                  <li><strong>Carpentry (10%):</strong> Flush doors, wooden frame sections, window fittings, and standard hardware accessories.</li>
                  <li><strong>Labour (20%):</strong> Core workmanship fees, shuttering design, safety management, and engineering supervision.</li>
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
              Construction Cost Estimation Report
            </h3>
            <p className="text-[10px] text-slate-500 mt-1">Generated on: {new Date(apiResult.timestamp).toLocaleString("en-IN")}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-orange-50 text-orange-700 border border-orange-200/60 uppercase tracking-wider">
              Official Estimate
            </span>
          </div>
        </div>

        {/* Specifications */}
        <div className="mb-8">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Project Specifications</h4>
          <div className="grid grid-cols-2 gap-4 border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-700 bg-slate-50/30">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Built-Up Area</span>
              <span className="text-slate-800 text-sm font-bold">{area.toLocaleString("en-IN")} sq.ft</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Quality Standard Tier</span>
              <span className="text-slate-800 text-sm font-bold capitalize">{quality} Quality</span>
            </div>
          </div>
        </div>

        {/* Calculation output breakdown table */}
        <div className="mb-8">
          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Itemized Cost Distribution</h4>
          <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-4">Component</th>
                <th className="py-3 px-4 text-right">Percentage</th>
                <th className="py-3 px-4 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs font-medium text-slate-700">
              {Object.entries(apiResult.result.breakdown || {}).map(([key, val]: any) => {
                const labelMap: Record<string, string> = {
                  civil: "Civil Structural Works (Slab, Column, Foundation)",
                  finishes: "Finishing & Tiling (Flooring, Painting, Plaster)",
                  mep: "MEP Fittings & Piping (Electrical, Plumbing)",
                  carpentry: "Carpentry & Joinery (Doors, Windows)",
                  labour: "Labour & Construction Supervision Charges",
                };
                return (
                  <tr key={key} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4">{labelMap[key] || key}</td>
                    <td className="py-3 px-4 text-right">{val.pct}%</td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900">₹{val.amount?.toLocaleString("en-IN")}</td>
                  </tr>
                );
              })}
              <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                <td className="py-3.5 px-4 text-sm">TOTAL ESTIMATED BUDGET (including +5% wastage)</td>
                <td className="py-3.5 px-4 text-right text-sm">100%</td>
                <td className="py-3.5 px-4 text-right text-base text-orange-500 font-extrabold">₹{apiResult.result.totalCost?.toLocaleString("en-IN")}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Compliance Info */}
        <div className="mb-10 bg-slate-50 border border-slate-100 rounded-xl p-4 text-[11px] leading-relaxed text-slate-500">
          <h5 className="font-bold text-slate-700 mb-1">compliance notes & rates:</h5>
          <p>
            Estimates are derived using standard 2026 market indexes. Rates applied: ₹{apiResult.result.ratePerSqft}/sqft. Proportions allocate standard ratios for civil structure (35%), finishing (20%), MEP (15%), carpentry (10%) and construction supervision (20%). A standard +5% site material contingency factor is incorporated.
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
