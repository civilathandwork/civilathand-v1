"use client";

import React, { useState } from "react";
import { useProjects } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  Sparkles, 
  FileSpreadsheet, 
  FileText, 
  ArrowRight, 
  Check, 
  Loader2, 
  Info 
} from "lucide-react";

export const Calculators: React.FC = () => {
  const { addLead } = useProjects();
  const [activeTab, setActiveTab] = useState<"cost" | "concrete" | "steel" | "brick" | "boq">("cost");

  // State for Cost Calculator
  const [area, setArea] = useState<number>(1500);
  const [quality, setQuality] = useState<"standard" | "premium" | "luxury">("premium");
  const [costSuccess, setCostSuccess] = useState(false);

  // State for Concrete Calculator
  const [volume, setVolume] = useState<number>(10);
  const [concreteMix, setConcreteMix] = useState<"M15" | "M20" | "M25">("M20");

  // State for Steel Calculator
  const [diameter, setDiameter] = useState<number>(12);
  const [steelLength, setSteelLength] = useState<number>(12);
  const [steelQty, setSteelQty] = useState<number>(50);

  // State for Brick Calculator
  const [wallLength, setWallLength] = useState<number>(20);
  const [wallHeight, setWallHeight] = useState<number>(3);
  const [wallThickness, setWallThickness] = useState<9 | 4.5>(9);

  // State for AI BOQ Generator
  const [drawingName, setDrawingName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [boqResult, setBoqResult] = useState<any | null>(null);

  // --- Calculations ---

  // 1. Cost Calculations
  const getRate = () => {
    if (quality === "standard") return 1500;
    if (quality === "luxury") return 3200;
    return 2200; // premium
  };

  const totalCost = area * getRate();
  const costBreakdown = {
    cement: totalCost * 0.16,
    steel: totalCost * 0.12,
    sand: totalCost * 0.08,
    aggregate: totalCost * 0.07,
    finishes: totalCost * 0.22,
    fittings: totalCost * 0.15,
    labor: totalCost * 0.20,
  };

  const costPercentages = {
    cement: 16,
    steel: 12,
    sand: 8,
    aggregate: 7,
    finishes: 22,
    fittings: 15,
    labor: 20
  };

  const handleRequestCostQuote = () => {
    addLead({
      name: "Calculator User",
      email: "guest@civilathand.com",
      phone: "+91 00000 00000",
      service: "Architectural & Structural Design",
      source: "Cost Calculator",
      details: `Calculated quote for ${area} sq.ft, Quality: ${quality}. Est. Total: ₹${totalCost.toLocaleString("en-IN")}`,
    });
    setCostSuccess(true);
    setTimeout(() => setCostSuccess(false), 3000);
  };

  // 2. Concrete Calculations
  const getConcreteDetails = () => {
    const dryVolume = volume * 1.54;
    let cementRatio = 1, sandRatio = 1.5, aggRatio = 3, sum = 5.5;

    if (concreteMix === "M15") {
      cementRatio = 1; sandRatio = 2; aggRatio = 4; sum = 7;
    } else if (concreteMix === "M25") {
      cementRatio = 1; sandRatio = 1; aggRatio = 2; sum = 4;
    }

    const cementVol = (cementRatio / sum) * dryVolume;
    const sandVol = (sandRatio / sum) * dryVolume;
    const aggVol = (aggRatio / sum) * dryVolume;

    const cementBags = Math.ceil(cementVol / 0.035);
    const sandTons = Number((sandVol * 1.6).toFixed(2));
    const aggTons = Number((aggVol * 1.5).toFixed(2));

    return { cementBags, sandTons, aggTons };
  };
  const concreteOutput = getConcreteDetails();

  // 3. Steel Calculations
  const rebarWeightPerM = (diameter * diameter) / 162;
  const totalSteelWeight = Number((rebarWeightPerM * steelLength * steelQty).toFixed(2));

  // 4. Brick Calculations
  const getBrickDetails = () => {
    const tMeter = wallThickness === 9 ? 0.228 : 0.114;
    const wallVol = wallLength * wallHeight * tMeter;
    const brickCount = Math.ceil(wallVol / 0.002);
    const mortarVol = wallVol * 0.3;
    const dryMortarVol = mortarVol * 1.33;
    const cementVol = (1 / 7) * dryMortarVol;
    const sandVol = (6 / 7) * dryMortarVol;

    const cementBags = Math.ceil(cementVol / 0.035);
    const sandTons = Number((sandVol * 1.6).toFixed(2));

    return { brickCount, cementBags, sandTons };
  };
  const brickOutput = getBrickDetails();

  // 5. AI BOQ Analysis (Simulated)
  const handleAiBOQAnalysis = () => {
    if (!drawingName) return;
    setAnalyzing(true);
    setBoqResult(null);

    setTimeout(() => {
      setAnalyzing(false);
      const randomRate = 2200;
      const calcArea = 2250;
      
      const items = [
        { sl: 1, item: "Earthwork excavation for foundation", unit: "m³", qty: 120, rate: 450, total: 54000 },
        { sl: 2, item: "Cement concrete footing (1:1.5:3)", unit: "m³", qty: 45, rate: 6500, total: 292500 },
        { sl: 3, item: "RCC Columns and Beams (M25 mix)", unit: "m³", qty: 38, rate: 8200, total: 311600 },
        { sl: 4, item: "Reinforcement Steel (Fe500)", unit: "MT", qty: 4.8, rate: 62000, total: 297600 },
        { sl: 5, item: "9-inch Brickwork in cement mortar (1:6)", unit: "m³", qty: 85, rate: 5200, total: 442000 },
        { sl: 6, item: "4.5-inch partition wall brickwork", unit: "m²", qty: 150, rate: 950, total: 142500 },
        { sl: 7, item: "Plastering walls (12mm inside, 20mm outside)", unit: "m²", qty: 1120, rate: 220, total: 246400 },
        { sl: 8, item: "Vitrified tiling finishes", unit: "sq.ft", qty: 2200, rate: 160, total: 352000 },
        { sl: 9, item: "Sanitary & Electrical Fittings", unit: "LumpSum", qty: 1, rate: 250000, total: 250000 },
      ];

      const sumTotal = items.reduce((acc, item) => acc + item.total, 0);

      setBoqResult({
        projectName: drawingName.replace(/\.[^/.]+$/, ""),
        totalCost: sumTotal,
        areaSqFt: calcArea,
        items
      });

      addLead({
        name: "AI Takeoff User",
        email: "ai.takeoff@civilathand.com",
        phone: "+91 00000 00000",
        service: "BOQ Estimation",
        source: "AI BOQ Takeoff",
        details: `Uploaded Drawing: ${drawingName}. Generated BOQ Area: ${calcArea} sq.ft. BOQ Estimate: ₹${sumTotal.toLocaleString("en-IN")}`,
      });
    }, 4000);
  };

  return (
    <div id="calculators" className="py-20 bg-slate-50 border-y border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 mb-4 shadow-sm">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive Calculators</span>
          </div>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-wix-dark sm:text-4xl">
            Professional Engineering Estimation Tools
          </h2>
          <p className="mt-4 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Get instant, highly accurate structural and cost calculations backed by standard IS-code algorithms, trusted by engineering experts.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 scrollbar-none">
            {[
              { id: "cost", title: "Construction Cost", desc: "Budget & materials breakdown", icon: Calculator, sparkles: false },
              { id: "concrete", title: "Concrete Volumetrics", desc: "Cement, sand, aggregates", icon: Calculator, sparkles: false },
              { id: "steel", title: "Steel Rebar Weight", desc: "Standard bar weight in KG", icon: Calculator, sparkles: false },
              { id: "brick", title: "Brick & Masonry Wall", desc: "Brick count and mortar mix", icon: Calculator, sparkles: false },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-shrink-0 flex items-center gap-3 w-full text-left px-5 py-4 rounded-md font-bold text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-wix-dark text-white border border-wix-dark shadow-sm"
                    : "bg-white text-wix-dark hover:bg-slate-50 border border-slate-200"
                }`}
                suppressHydrationWarning
              >
                <tab.icon className="h-4.5 w-4.5 text-orange-500" />
                <div>
                  <span>{tab.title}</span>
                  <span className="block text-[10px] font-normal opacity-80 mt-0.5">{tab.desc}</span>
                </div>
              </motion.button>
            ))}

            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab("boq")}
              className={`flex-shrink-0 flex items-center gap-3 w-full text-left px-5 py-4 rounded-md font-bold text-sm transition-all duration-200 ${
                activeTab === "boq"
                  ? "bg-wix-dark text-white border border-wix-dark shadow-sm"
                  : "bg-orange-50 border border-orange-200/50 hover:bg-orange-100/70"
              }`}
              suppressHydrationWarning
            >
              <Sparkles className="h-4.5 w-4.5 text-orange-500 animate-pulse" />
              <div>
                <span className="flex items-center gap-1.5 font-extrabold text-orange-600">
                  AI BOQ Takeoff
                </span>
                <span className="block text-[10px] font-normal text-navy-600 mt-0.5">CAD & PDF Drawing Audit</span>
              </div>
            </motion.button>
          </div>

          {/* Calculator Output Panel */}
          <div className="lg:col-span-8 bg-white rounded-md border border-slate-200 p-6 md:p-8 overflow-hidden min-h-[420px] shadow-sm">
            <AnimatePresence mode="wait">
              {/* T1: Cost Calculator */}
              {activeTab === "cost" && (
                <motion.div
                  key="cost"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-display font-extrabold text-xl text-navy-950 mb-6 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-500" />
                    Construction Cost Estimator
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                          Built-Up Area (Square Feet)
                        </label>
                        <input
                          type="number"
                          min="200"
                          max="200000"
                          value={area}
                          onChange={(e) => setArea(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-800 transition-all shadow-sm"
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                          Quality Specification Tier
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {(["standard", "premium", "luxury"] as const).map((tier) => (
                            <button
                              key={tier}
                              onClick={() => setQuality(tier)}
                              className={`py-2 px-1 text-center rounded-lg border text-xs font-bold capitalize transition-all ${
                                quality === tier
                                  ? "bg-navy-950 text-white border-navy-950 shadow-sm"
                                  : "bg-white text-navy-950 border-slate-200 hover:bg-slate-50"
                              }`}
                              suppressHydrationWarning
                            >
                              {tier}
                            </button>
                          ))}
                        </div>
                        <span className="block text-[10px] text-navy-600 mt-2 leading-tight">
                          {quality === "standard" && "Standard finishes, modular fittings (₹1,500/sqft)"}
                          {quality === "premium" && "Branded materials, semi-luxury fixtures (₹2,200/sqft)"}
                          {quality === "luxury" && "Premium marble, custom fittings, high-end woodwork (₹3,200/sqft)"}
                        </span>
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="bg-wix-cream p-5 rounded-md border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-navy-600 uppercase tracking-wider">Total Estimated Cost</span>
                        <p className="text-3xl font-extrabold font-display text-navy-950 mt-1">
                          ₹{totalCost.toLocaleString("en-IN")}
                        </p>
                        <hr className="border-slate-200 my-4" />
                        <div className="space-y-3.5 text-xs">
                          {[
                            { name: "Cement & Masonry", val: costBreakdown.cement, pct: costPercentages.cement },
                            { name: "Steel Reinforcement", val: costBreakdown.steel, pct: costPercentages.steel },
                            { name: "Finishes & Tiling", val: costBreakdown.finishes, pct: costPercentages.finishes },
                            { name: "Labor Expenses", val: costBreakdown.labor, pct: costPercentages.labor }
                          ].map((item, idx) => (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between font-medium">
                                <span className="text-navy-600">{item.name}:</span>
                                <span className="font-semibold text-navy-950">₹{item.val.toLocaleString("en-IN")} ({item.pct}%)</span>
                              </div>
                              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.pct}%` }}
                                  transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                                  className="h-full bg-navy-900 rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleRequestCostQuote}
                        className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 text-xs font-bold flex items-center justify-center gap-1.5 shadow-orange-glow transition-all duration-300"
                        suppressHydrationWarning
                      >
                        {costSuccess ? (
                          <>
                            <Check className="h-4 w-4" />
                            Quote Request Sent!
                          </>
                        ) : (
                          <>
                            Request Detailed Quote
                            <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* T2: Concrete Calculator */}
              {activeTab === "concrete" && (
                <motion.div
                  key="concrete"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-display font-extrabold text-xl text-navy-950 mb-6 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-500" />
                    Concrete & Cement Volumetrics
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                          Concrete Volume (Cubic Meters - m³)
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="5000"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-800 transition-all shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                          Concrete Design Mix
                        </label>
                        <select
                          value={concreteMix}
                          onChange={(e: any) => setConcreteMix(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-800 transition-all shadow-sm"
                        >
                          <option value="M15">M15 (1 : 2 : 4) - General Foundation</option>
                          <option value="M20">M20 (1 : 1.5 : 3) - Beams & Slabs</option>
                          <option value="M25">M25 (1 : 1 : 2) - Columns & Heavy Load</option>
                        </select>
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="bg-wix-cream p-5 rounded-md border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-navy-600 uppercase tracking-wider font-display">Required Materials</span>
                        <div className="mt-4 space-y-4">
                          {[
                            { title: "Cement Bags", val: `${concreteOutput.cementBags} Bags`, unit: "(50 kg bags)" },
                            { title: "Sand Required", val: `${concreteOutput.sandTons} Tons`, unit: `(${(concreteOutput.sandTons * 20).toFixed(0)} CFT)` },
                            { title: "Coarse Aggregates", val: `${concreteOutput.aggTons} Tons`, unit: `(${(concreteOutput.aggTons * 20).toFixed(0)} CFT)` }
                          ].map((mat, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm"
                            >
                              <div>
                                <span className="block text-[10px] uppercase font-bold text-navy-600 tracking-wide">{mat.title}</span>
                                <span className="text-xl font-extrabold text-navy-950">{mat.val}</span>
                              </div>
                              <span className="text-xs text-navy-600">{mat.unit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* T3: Steel Calculator */}
              {activeTab === "steel" && (
                <motion.div
                  key="steel"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-display font-extrabold text-xl text-navy-950 mb-6 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-500" />
                    Steel Rebar Weight Calculator
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                            Bar Diameter (mm)
                          </label>
                          <select
                            value={diameter}
                            onChange={(e) => setDiameter(Number(e.target.value))}
                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-800 transition-all shadow-sm"
                          >
                            {[8, 10, 12, 16, 20, 25, 32].map((d) => (
                              <option key={d} value={d}>
                                {d} mm
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                            Bar Length (m)
                          </label>
                          <input
                            type="number"
                            value={steelLength}
                            onChange={(e) => setSteelLength(Number(e.target.value))}
                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-800 transition-all shadow-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                          Total Number of Bars (Qty)
                        </label>
                        <input
                          type="number"
                          value={steelQty}
                          onChange={(e) => setSteelQty(Number(e.target.value))}
                          className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-800 transition-all shadow-sm"
                        />
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col justify-center">
                      <div className="text-center py-6">
                        <span className="text-xs font-bold text-navy-600 uppercase tracking-wider block">Estimated Steel Weight</span>
                        <motion.p 
                          key={totalSteelWeight}
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="text-4xl font-extrabold font-display text-navy-950 mt-2"
                        >
                          {totalSteelWeight.toLocaleString("en-IN")} <span className="text-lg font-bold text-navy-600">KG</span>
                        </motion.p>
                        <span className="text-xs font-semibold text-orange-500 mt-2 block">
                          ≈ {(totalSteelWeight / 1000).toFixed(3)} Metric Tons
                        </span>
                        <hr className="border-slate-200 my-5" />
                        <p className="text-[10px] text-navy-600 leading-normal max-w-xs mx-auto">
                          Formula used: <code className="bg-slate-200 px-1 py-0.5 rounded">Weight = (D² / 162) * L * Qty</code> based on standard structural density of Fe500/Fe550 reinforcement rebar.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* T4: Brick Calculator */}
              {activeTab === "brick" && (
                <motion.div
                  key="brick"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-display font-extrabold text-xl text-navy-950 mb-6 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-orange-500" />
                    Brick & Mortar Estimator
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Inputs */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                            Wall Length (meters)
                          </label>
                          <input
                            type="number"
                            value={wallLength}
                            onChange={(e) => setWallLength(Number(e.target.value))}
                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-800 transition-all shadow-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                            Wall Height (meters)
                          </label>
                          <input
                            type="number"
                            value={wallHeight}
                            onChange={(e) => setWallHeight(Number(e.target.value))}
                            className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-semibold text-slate-800 transition-all shadow-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                          Wall Thickness (Inches)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {([9, 4.5] as const).map((thick) => (
                            <button
                              key={thick}
                              onClick={() => setWallThickness(thick)}
                              className={`py-2.5 px-4 text-center rounded-md border text-xs font-bold transition-all ${
                                wallThickness === thick
                                  ? "bg-wix-dark text-white border-wix-dark shadow-sm"
                                  : "bg-white text-wix-dark border-slate-200 hover:bg-slate-50"
                              }`}
                              suppressHydrationWarning
                            >
                              {thick} inch Wall
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Outputs */}
                    <div className="bg-wix-cream p-5 rounded-md border border-slate-200/60 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-navy-600 uppercase tracking-wider font-display">Required Materials</span>
                        <div className="mt-4 space-y-3">
                          {[
                            { title: "Standard Bricks", val: `${brickOutput.brickCount} Pcs`, unit: "(190x90x90 mm)" },
                            { title: "Cement Bags (Mortar)", val: `${brickOutput.cementBags} Bags`, unit: "(Mix 1:6 ratio)" },
                            { title: "Plaster Sand", val: `${brickOutput.sandTons} Tons`, unit: `(${(brickOutput.sandTons * 20).toFixed(0)} CFT)` }
                          ].map((mat, idx) => (
                            <motion.div 
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.1 }}
                              className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center shadow-sm"
                            >
                              <div>
                                <span className="block text-[10px] uppercase font-bold text-navy-600 tracking-wide">{mat.title}</span>
                                <span className="text-lg font-extrabold text-navy-950">{mat.val}</span>
                              </div>
                              <span className="text-xs text-navy-600">{mat.unit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* T5: AI BOQ Generator */}
              {activeTab === "boq" && (
                <motion.div
                  key="boq"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-display font-extrabold text-xl text-navy-950 mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-orange-500 animate-pulse" />
                    AI BOQ Takeoff & Quantity Surveying
                  </h3>
                  <p className="text-xs text-navy-600 mb-6 leading-relaxed">
                    Upload structural drawings, floor plans, or architectural blueprints (PDF, CAD, DWG) and let our intelligent analyzer generate a complete Bill of Quantities (BOQ) estimation.
                  </p>

                  {/* File Upload Simulation */}
                  {!boqResult && (
                    <div className="border border-dashed border-slate-300 rounded-md p-8 text-center bg-slate-50/50 hover:bg-slate-100/70 transition-colors">
                      {analyzing ? (
                        <div className="flex flex-col items-center justify-center py-6">
                          <Loader2 className="h-10 w-10 text-orange-500 animate-spin mb-4" />
                          <h4 className="font-bold text-sm text-wix-dark">Analyzing Blueprint Layout...</h4>
                          <p className="text-xs text-slate-600 mt-2 max-w-xs leading-relaxed">
                            Extracting layout dimensions, concrete footings, slab reinforcement grids, and brickwork boundaries.
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <FileText className="h-12 w-12 text-slate-400 mb-4" />
                          <h4 className="font-bold text-sm text-wix-dark">Upload Floor Plan or CAD File</h4>
                          <p className="text-xs text-slate-600 mt-1 mb-4">PDF, DWG, DXF formats accepted (Max 25MB)</p>
                          
                          <div className="flex gap-2 max-w-md w-full justify-center">
                            <input
                              type="text"
                              placeholder="Type file name (e.g. Villa_Layout_v2.pdf)"
                              value={drawingName}
                              onChange={(e) => setDrawingName(e.target.value)}
                              className="bg-white border border-slate-300 rounded-md px-3 py-2 text-xs focus:outline-none focus:border-orange-500 w-60 text-wix-dark font-semibold shadow-sm"
                            />
                            <motion.button
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleAiBOQAnalysis}
                              disabled={!drawingName}
                              className="bg-wix-dark hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-md px-5 py-2.5 text-xs font-bold transition-all uppercase tracking-wider"
                            >
                              Run AI Audit
                            </motion.button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Analysis Result Table */}
                  {boqResult && (
                    <div className="space-y-6">
                      <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-orange-50 p-5 rounded-md border border-orange-200/50 gap-4"
                      >
                        <div>
                          <h4 className="font-bold text-sm text-wix-dark flex items-center gap-1.5">
                            <Check className="h-4 w-4 text-emerald-500" />
                            BOQ Complete: {boqResult.projectName}
                          </h4>
                          <p className="text-xs text-slate-600 mt-0.5">Calculated built-up area: {boqResult.areaSqFt} sq.ft</p>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wide text-left sm:text-right">Project Estimate</span>
                          <span className="text-xl font-extrabold text-wix-dark font-display">₹{boqResult.totalCost.toLocaleString("en-IN")}</span>
                        </div>
                      </motion.div>

                      <div className="overflow-x-auto rounded-md border border-slate-200">
                        <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                          <thead className="bg-slate-50 font-bold text-wix-dark border-b border-slate-200">
                            <tr>
                              <th className="px-3 py-3 w-10 text-center">S.No</th>
                              <th className="px-4 py-3">Description of Engineering Work</th>
                              <th className="px-3 py-3 text-center">Unit</th>
                              <th className="px-3 py-3 text-center">Qty</th>
                              <th className="px-3 py-3 text-right">Rate (₹)</th>
                              <th className="px-4 py-3 text-right">Total (₹)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 bg-white text-slate-600">
                            {boqResult.items.map((item: any, idx: number) => (
                              <motion.tr 
                                key={item.sl}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: idx * 0.05 }}
                                className="hover:bg-slate-50"
                              >
                                <td className="px-3 py-2.5 text-center font-bold text-navy-950">{item.sl}</td>
                                <td className="px-4 py-2.5 font-medium text-navy-950">{item.item}</td>
                                <td className="px-3 py-2.5 text-center">{item.unit}</td>
                                <td className="px-3 py-2.5 text-center">{item.qty}</td>
                                <td className="px-3 py-2.5 text-right">{item.rate.toLocaleString("en-IN")}</td>
                                <td className="px-4 py-2.5 text-right font-semibold text-navy-950">₹{item.total.toLocaleString("en-IN")}</td>
                              </motion.tr>
                            ))}
                            <tr className="bg-slate-50 font-extrabold text-navy-950">
                              <td colSpan={5} className="px-4 py-3 text-right uppercase tracking-wide">Total Project Sum (INR)</td>
                              <td className="px-4 py-3 text-right text-orange-500">₹{boqResult.totalCost.toLocaleString("en-IN")}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            setBoqResult(null);
                            setDrawingName("");
                          }}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-wix-dark rounded-md py-2.5 text-xs font-bold transition-all text-center border border-slate-200"
                        >
                          Upload Another Drawing
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            alert("Detailed breakdown sheet compiled and downloaded (simulated).");
                          }}
                          className="w-full bg-wix-dark hover:bg-orange-600 text-white rounded-md py-3 text-xs font-bold transition-all flex items-center justify-center gap-1.5 uppercase tracking-widest"
                          suppressHydrationWarning
                        >
                          <FileSpreadsheet className="h-4 w-4" />
                          Export BOQ Sheet (Excel)
                        </motion.button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
