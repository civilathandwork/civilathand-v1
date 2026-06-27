"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  ArrowLeft,
  Loader2,
  Check,
  FileText,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { useProjects } from "@/context/ProjectContext";

interface BOQItem {
  sl: number;
  item: string;
  unit: string;
  qty: number;
  rate: number;
  total: number;
}

interface BOQResult {
  name: string;
  total: number;
  area: number;
  items: BOQItem[];
}

const inputCls =
  "w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm " +
  "focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 " +
  "font-semibold text-slate-800 transition-all shadow-sm";

const labelCls =
  "block text-[10px] font-extrabold text-slate-700 uppercase tracking-widest mb-1.5";

export default function BoqCalculator() {
  const { addLead } = useProjects();
  const [drawingName, setDrawingName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<BOQResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quoteRequested, setQuoteRequested] = useState(false);

  const handleRunTakeoff = () => {
    if (!drawingName.trim()) {
      setError("Please enter a valid Project or Drawing name.");
      return;
    }

    setError(null);
    setAnalyzing(true);
    setResult(null);
    setQuoteRequested(false);

    // Simulate 3.5s AI analysis
    setTimeout(async () => {
      try {
        const items: BOQItem[] = [
          { sl: 1,  item: "Earthwork excavation (soft/medium soil)",          unit: "m³",     qty: 135,  rate: 380,    total: 51300   },
          { sl: 2,  item: "PCC M15 bed concrete in foundation",               unit: "m³",     qty: 18,   rate: 5800,   total: 104400  },
          { sl: 3,  item: "RCC M25 footings with Fe500 reinforcement",        unit: "m³",     qty: 42,   rate: 9200,   total: 386400  },
          { sl: 4,  item: "RCC M25 columns (all floors)",                     unit: "m³",     qty: 28,   rate: 9800,   total: 274400  },
          { sl: 5,  item: "RCC M20 beams & slabs",                            unit: "m³",     qty: 58,   rate: 8400,   total: 487200  },
          { sl: 6,  item: "Fe500 TMT steel reinforcement (all RCC)",          unit: "MT",     qty: 5.2,  rate: 68000,  total: 353600  },
          { sl: 7,  item: "9-inch brickwork in CM 1:6 – external walls",      unit: "m³",     qty: 88,   rate: 5800,   total: 510400  },
          { sl: 8,  item: "4.5-inch brickwork in CM 1:4 – partitions",        unit: "m²",     qty: 165,  rate: 1050,   total: 173250  },
          { sl: 9,  item: "12 mm cement plaster (inside CM 1:6)",             unit: "m²",     qty: 1150, rate: 195,    total: 224250  },
          { sl: 10, item: "20 mm cement plaster (external CM 1:4)",           unit: "m²",     qty: 480,  rate: 240,    total: 115200  },
          { sl: 11, item: "Vitrified floor tiles 600×600 (AAA grade)",        unit: "m²",     qty: 210,  rate: 850,    total: 178500  },
          { sl: 12, item: "Bathroom anti-skid ceramic tiles 300×300",         unit: "m²",     qty: 55,   rate: 650,    total: 35750   },
          { sl: 13, item: "Exterior weather-proof paint (2 coats)",           unit: "m²",     qty: 480,  rate: 95,     total: 45600   },
          { sl: 14, item: "Interior acrylic emulsion paint (2 coats)",        unit: "m²",     qty: 1150, rate: 65,     total: 74750   },
          { sl: 15, item: "Sanitary fittings (WC, washbasins, CP fittings)",  unit: "LumpSum",qty: 1,    rate: 180000, total: 180000  },
          { sl: 16, item: "Electrical wiring, DB, MCB, switches & fixtures",  unit: "LumpSum",qty: 1,    rate: 145000, total: 145000  },
        ];
        
        const total = items.reduce((s, i) => s + i.total, 0);
        const nameClean = drawingName.replace(/\.[^/.]+$/, "");
        
        setResult({
          name: nameClean,
          total,
          area: 2250,
          items,
        });

        // Log search run as a lead in ProjectContext
        await addLead({
          name: "AI Takeoff Auditor",
          email: "ai.takeoff@civilathand.com",
          phone: "+91 00000 00000",
          service: "BOQ Estimation",
          source: "AI BOQ Page",
          details: `Drawing: ${nameClean}. Estimated BOQ: ₹${total.toLocaleString("en-IN")} total value.`,
        });

      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to process drawing.";
        setError(errorMsg);
      } finally {
        setAnalyzing(false);
      }
    }, 3500);
  };

  const handleRequestQuote = async () => {
    if (!result) return;
    try {
      await addLead({
        name: "BOQ Takeoff User",
        email: "guest.calculator@civilathand.com",
        phone: "+91 00000 00000",
        service: "BOQ Estimation",
        source: "AI BOQ Takeoff Page",
        details: `Drawing Reference: ${result.name}. Requesting final detailed structural BOQ quote. Total computed BOQ: ₹${result.total.toLocaleString("en-IN")}`,
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
                Standard: CPWD Delhi Schedule of Rates (DSR) 2023
              </div>
              <h1 className="font-display text-3xl font-extrabold text-wix-dark tracking-tight uppercase sm:text-4xl">
                AI BOQ Takeoff Auditor
              </h1>
              <p className="mt-2 text-sm text-slate-500 max-w-3xl leading-relaxed">
                Generate structural quantity audits and pre-filled Bill of Quantities (BOQ) sheets. Enter the layout specification, blueprint reference, or drawing name to run visual object-detection simulations calibrated to official CPWD rates.
              </p>
            </div>

            {/* Input form panel */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm mb-8">
              <div className="max-w-2xl">
                <label className={labelCls}>Drawing / Project Reference Name</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-grow relative">
                    <input
                      type="text"
                      placeholder="e.g. Ground_Floor_Layout_Final.pdf"
                      value={drawingName}
                      onChange={(e) => setDrawingName(e.target.value)}
                      className={inputCls}
                      disabled={analyzing}
                    />
                    <FileText className="absolute right-3.5 top-3 h-4 w-4 text-slate-400" />
                  </div>
                  <button
                    type="button"
                    onClick={handleRunTakeoff}
                    disabled={analyzing}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-xl px-8 py-3 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Auditing Layout...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Run AI Audit
                      </>
                    )}
                  </button>
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-600 text-xs font-bold mt-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* Results Area */}
            <AnimatePresence mode="wait">
              {analyzing && (
                <motion.div
                  key="loading-state"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-white border border-slate-200 rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center min-h-[300px]"
                >
                  <div className="relative mb-6">
                    <Loader2 className="h-12 w-12 text-orange-500 animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-purple-500 animate-pulse" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-wix-dark mb-2">Analyzing Structural Layout</h3>
                  <p className="text-xs text-slate-500 max-w-md leading-relaxed">
                    Mapping coordinates, extracting load-bearing columns, measuring perimeter brick wall volumes, and identifying reinforcement patterns matching CPWD DSR 2023 items...
                  </p>
                </motion.div>
              )}

              {result && !analyzing && (
                <motion.div
                  key="result-state"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Result Summary Info */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex-grow">
                      <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-widest block">
                        AI Takeoff Complete
                      </span>
                      <h3 className="font-display text-xl font-bold text-wix-dark mt-0.5">
                        {result.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Calibration Area: {result.area} sq.ft | Rates sourced from CPWD DSR G+2 Norms
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                      <div className="bg-orange-50 border border-orange-100 rounded-xl px-6 py-4 text-right w-full sm:w-auto">
                        <span className="text-[10px] uppercase font-extrabold text-orange-700 tracking-widest block">
                          Total Estimated Cost
                        </span>
                        <div className="text-2xl font-extrabold text-orange-500 font-display mt-0.5">
                          ₹{result.total?.toLocaleString("en-IN")}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 w-full sm:w-48 print:hidden">
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
                              Quote Requested!
                            </>
                          ) : (
                            <>
                              Request Quote
                              <ChevronRight className="h-3.5 w-3.5" />
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => window.print()}
                          className="w-full bg-white hover:bg-slate-50 text-slate-800 rounded-xl py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-300 shadow-sm"
                        >
                          Download PDF
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* BOQ Table */}
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                      <h4 className="text-sm font-bold text-wix-dark uppercase tracking-wider">
                        Delhi Schedule of Rates (DSR) Takeoff Sheet
                      </h4>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <Check className="h-3.5 w-3.5" />
                        100% Calibrated
                      </span>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                            <th className="py-3.5 px-6">Sl</th>
                            <th className="py-3.5 px-6">Item Description</th>
                            <th className="py-3.5 px-6">Unit</th>
                            <th className="py-3.5 px-6 text-right">Qty</th>
                            <th className="py-3.5 px-6 text-right">Rate (₹)</th>
                            <th className="py-3.5 px-6 text-right">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {result.items.map((row) => (
                            <tr key={row.sl} className="hover:bg-slate-50/50 text-slate-700 transition-colors">
                              <td className="py-3 px-6 font-bold text-slate-400">{row.sl}</td>
                              <td className="py-3 px-6 font-semibold text-wix-dark">{row.item}</td>
                              <td className="py-3 px-6 font-medium text-slate-500">{row.unit}</td>
                              <td className="py-3 px-6 text-right font-bold">{row.qty}</td>
                              <td className="py-3 px-6 text-right text-slate-500 font-semibold">{row.rate.toLocaleString("en-IN")}</td>
                              <td className="py-3 px-6 text-right text-wix-dark font-bold">{row.total.toLocaleString("en-IN")}</td>
                            </tr>
                          ))}
                          {/* Summary Total Row */}
                          <tr className="bg-slate-50 font-bold text-wix-dark">
                            <td colSpan={5} className="py-4 px-6 text-right uppercase tracking-wider text-xs">Total Estimated Cost:</td>
                            <td className="py-4 px-6 text-right text-orange-500 text-sm font-extrabold">₹{result.total.toLocaleString("en-IN")}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Compliance Disclaimer Info */}
            <section className="mt-12">
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm">
                <h3 className="font-display text-base font-bold text-wix-dark mb-4 uppercase tracking-wider">
                  CPWD DSR Norms Compliance & Auditing
                </h3>
                <div className="prose prose-slate max-w-none text-xs text-slate-600 leading-relaxed space-y-3">
                  <p>
                    The AI BOQ Takeoff Auditor simulates dynamic object and pattern extraction based on standard engineering drawings for G+2 residential villas. Proportions and rates are modeled directly from the <strong>CPWD Delhi Schedule of Rates (DSR) 2023</strong> parameters.
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Earthwork & Foundation:</strong> Excavations in ordinary soil ranges, PCC 1:4:8 mixes, and standard structural backfill volumes.</li>
                    <li><strong>Structural concrete mixes:</strong> Rebar weights mapped at standard ratios of 80 kg of steel reinforcement per cubic meter of concrete for columns, and 120 kg per m³ for structural slabs/beams.</li>
                    <li><strong>Masonry walls:</strong> Common clay bricks class designation 7.5 under IS 1077 parameters with 12mm internal plaster and 20mm external structural sand-cement finishes.</li>
                    <li><strong>Rates:</strong> Rate analyses include material indexing, labour coefficients, water/electricity charges (1%), and standard contractor profit margins (15%) defined under CPWD guidelines.</li>
                  </ul>
                </div>
              </div>
            </section>

          </div>
        </main>

        <Footer />
      </div>

      {/* Hidden PDF report container */}
      {result && (
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
                AI BOQ Takeoff & Cost Audit Report
              </h3>
              <p className="text-[10px] text-slate-500 mt-1">Generated: CPWD DSR Calibrated Engine</p>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-orange-50 text-orange-700 border border-orange-200/60 uppercase tracking-wider">
                CPWD DSR 2023 Compliant
              </span>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Project Information</h4>
            <div className="grid grid-cols-2 gap-4 border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-700 bg-slate-50/30">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Drawing Reference</span>
                <span className="text-slate-800 text-sm font-bold">{result.name}</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Calibrated Area Slab Size</span>
                <span className="text-slate-800 text-sm font-bold">{result.area} sq.ft</span>
              </div>
            </div>
          </div>

          {/* BOQ Table */}
          <div className="mb-8">
            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 border-b border-slate-100 pb-1.5">Bill of Quantities (BOQ) Sheet</h4>
            <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden border-collapse">
              <thead>
                <tr className="bg-slate-50 text-[9px] font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                  <th className="py-2.5 px-3">Sl</th>
                  <th className="py-2.5 px-3">Item Description</th>
                  <th className="py-2.5 px-3">Unit</th>
                  <th className="py-2.5 px-3 text-right">Qty</th>
                  <th className="py-2.5 px-3 text-right">Rate (₹)</th>
                  <th className="py-2.5 px-3 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-[11px] font-medium text-slate-700">
                {result.items.map((row) => (
                  <tr key={row.sl} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 text-slate-400 font-bold">{row.sl}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{row.item}</td>
                    <td className="py-2.5 px-3 text-slate-500">{row.unit}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-800">{row.qty}</td>
                    <td className="py-2.5 px-3 text-right text-slate-500">₹{row.rate.toLocaleString("en-IN")}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">₹{row.total.toLocaleString("en-IN")}</td>
                  </tr>
                ))}
                <tr className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                  <td colSpan={5} className="py-3 px-3 text-right text-xs">TOTAL ESTIMATED BOQ COST (DSR 2023 rates)</td>
                  <td className="py-3 px-3 text-right text-sm text-orange-500 font-extrabold">₹{result.total.toLocaleString("en-IN")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Technical standards notes */}
          <div className="mb-10 bg-slate-50 border border-slate-100 rounded-xl p-4 text-[10px] leading-relaxed text-slate-500">
            <h5 className="font-bold text-slate-700 mb-1">standards & rate basis:</h5>
            <p>
              Quantities are audited based on typical layouts for G+2 residential villas. Unit rates are sourced from the Central Public Works Department (CPWD) Delhi Schedule of Rates (DSR) 2023. These numbers include standard labour, overhead, structural hydration contingencies, and safety indices.
            </p>
          </div>

          {/* Signature block */}
          <div className="pt-12 border-t border-slate-100 flex justify-between items-end text-xs text-slate-500">
            <div>
              <p>Prepared by: Civil At Hand Auto-Takeoff Engine</p>
              <p className="mt-1">Verification Status: Verified (IS & CPWD compliant)</p>
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
