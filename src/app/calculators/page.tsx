"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  FlaskConical,
  Weight,
  BrickWall,
  Sparkles,
  ArrowRight,
  Info,
  Search,
} from "lucide-react";

// Hub tab definition with links, labels, details and icons
interface CalcHubCard {
  id: string;
  href: string;
  title: string;
  description: string;
  badge: string;
  standard: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const hubCards: CalcHubCard[] = [
  {
    id: "cost",
    href: "/calculator/all-calculators/construction-cost-estimator",
    title: "Construction Cost Estimator",
    description: "Prepare accurate budgets and detailed materials breakdown for 2026 Indian residential structures.",
    badge: "Cost Breakdown",
    standard: "2026 Market Rates",
    icon: Calculator,
    accentColor: "from-orange-500 to-amber-500",
  },
  {
    id: "concrete",
    href: "/calculator/all-calculators/concrete-volumetrics",
    title: "Concrete Volumetrics",
    description: "Calculate dry volume, cement bags, sand, and aggregate requirements using standard mix ratios.",
    badge: "IS 456:2000",
    standard: "Dry factor 1.54 | 5% wastage",
    icon: FlaskConical,
    accentColor: "from-blue-500 to-indigo-500",
  },
  {
    id: "steel",
    href: "/calculator/all-calculators/steel-rebar-weight",
    title: "Steel Rebar Weight",
    description: "Derive unit weights and total reinforcing steel weight in KG and Metric Tons for standard bar sizes.",
    badge: "IS 1786:2008",
    standard: "W = D² / 162.2 | 7% wastage",
    icon: Weight,
    accentColor: "from-slate-700 to-slate-900",
  },
  {
    id: "brick",
    href: "/calculator/all-calculators/brick-masonry-wall",
    title: "Brick & Masonry Wall",
    description: "Estimate bricks, mortar volume, cement bags, and sand count for load-bearing and partition walls.",
    badge: "IS 1077:1992",
    standard: "500 bricks/m³ | 7% wastage",
    icon: BrickWall,
    accentColor: "from-red-500 to-orange-600",
  },
  {
    id: "boq",
    href: "/calculator/all-calculators/ai-boq-takeoff",
    title: "AI BOQ Takeoff",
    description: "Audit layouts, drawings, and prepare a 16-line Bill of Quantities using standard CPWD DSR 2023 rates.",
    badge: "CPWD DSR 2023",
    standard: "Auto CAD & PDF Audit",
    icon: Sparkles,
    accentColor: "from-purple-600 to-pink-600",
  },
];

export default function CalculatorsHubPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCalculators = hubCards.filter((card) =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.badge.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-wix-cream">
      <Header />

      <main className="flex-grow py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Page Heading */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.span 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2"
            >
              IS-Code Engineering Standards
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl uppercase"
            >
              Professional Engineering <span className="text-orange-500">Calculators</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-3 text-sm text-slate-600 leading-relaxed font-medium"
            >
              Select from our suite of professional estimators. All algorithms are calibrated to Indian Standard (IS) codes and CPWD DSR guidelines, including standard material dry-volume factors and site wastage allowances.
            </motion.p>
          </div>

          {/* Search Toolbar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 mb-10 shadow-premium flex flex-col md:flex-row justify-between items-center gap-5">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                Showing {filteredCalculators.length} Core Estimators & Calculators
              </p>
            </div>
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search calculators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 font-semibold placeholder-slate-400 shadow-sm transition-all"
              />
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Cards Section */}
          {filteredCalculators.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm"
            >
              <Info className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm text-slate-400 font-semibold">No calculators found matching your query.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCalculators.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group border border-slate-200 hover:border-wix-dark rounded-md p-6 bg-white hover:bg-slate-50/50 transition-all duration-300 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="h-10 w-10 rounded-md bg-slate-50 text-wix-dark group-hover:bg-wix-dark group-hover:text-white flex items-center justify-center mb-4 border border-slate-200 transition-colors">
                        <Icon className="h-5.5 w-5.5 text-orange-500" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-wix-dark mb-2 leading-tight uppercase tracking-wider group-hover:text-orange-500 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>
                    <div className="pt-5 mt-auto flex items-center justify-between border-t border-slate-100/60">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{card.badge}</span>
                      <Link
                        href={card.href}
                        className="text-[10px] font-extrabold text-orange-500 hover:text-wix-dark uppercase tracking-widest flex items-center gap-1 group/link"
                      >
                        Open Calculator
                        <ArrowRight className="h-3 w-3 transform group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Standards Footer Info */}
          <div className="mt-16 flex flex-col md:flex-row items-center gap-4 bg-orange-50/50 border border-orange-100/80 rounded-2xl p-6 md:p-8">
            <div className="p-3 bg-white rounded-xl shadow-sm border border-orange-100">
              <Info className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-wix-dark uppercase tracking-wider">Engineering Compliance Note</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Formulas comply with <strong>IS 456:2000 (Concrete)</strong>, <strong>IS 1077 (Bricks)</strong>, <strong>IS 1786 (Steel)</strong>, and <strong>CPWD DSR (BOQ Takeoff)</strong>. Dry conversion factors (e.g. 1.54 for concrete, 1.33 for mortar) are applied automatically. Site material wastage allowances of 5% to 10% are added for realistic procurement estimates.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
