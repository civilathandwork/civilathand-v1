"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/app/education/test-series/gate-pyq/page.tsx
// ============================================================

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BookOpen, Clock, Lock, ChevronRight, ArrowLeft,
  Filter, Zap, Trophy, Target
} from "lucide-react";
import { GATE_SUBJECTS, CATEGORY_LABELS, type CategoryKey } from "@/data/gate/subjects";

export default function GatePYQPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const filtered = GATE_SUBJECTS.filter(
    (s) => activeCategory === "all" || s.category === activeCategory
  );

  const categories: CategoryKey[] = ["all", "struct", "geotech", "fluid", "env", "math"];

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: "#f1f5f9" }}>

        {/* Hero Banner */}
        <div style={{ background: "linear-gradient(135deg, #0f2244 0%, #1a5fb4 100%)" }}>
          <div className="max-w-6xl mx-auto px-4 py-10">
            <Link
              href="/education/test-series"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Test Series
            </Link>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
                  <Zap size={12} /> IES Master GATE PYQ 2026 · 1987–2025 · 39 Years
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  GATE CE — Previous Year Questions
                </h1>
                <p className="text-white/75 text-sm leading-relaxed max-w-xl">
                  Practice 1000+ real GATE Civil Engineering questions in an authentic
                  exam interface — same layout, timer, calculator, and palette as the
                  official GATE CBT portal. All 16 subjects covered.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 flex-shrink-0">
                {[
                  { icon: BookOpen, val: "1000+", label: "Questions" },
                  { icon: Trophy, val: "39 Yrs", label: "1987–2025" },
                  { icon: Target, val: "16", label: "Subjects" },
                ].map(({ icon: Icon, val, label }) => (
                  <div key={label} className="bg-white/10 rounded-lg p-3 text-center">
                    <Icon size={18} className="text-white/80 mx-auto mb-1" />
                    <div className="text-white font-bold text-base">{val}</div>
                    <div className="text-white/60 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="border-b border-slate-200 bg-white sticky top-0 z-30 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
              <Filter size={14} className="text-slate-400 flex-shrink-0 mr-1" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    activeCategory === cat
                      ? "bg-blue-700 text-white border-blue-800"
                      : "bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700"
                  }`}
                >
                  {CATEGORY_LABELS[cat]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Subject grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((subject) => (
              <div
                key={subject.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col transition-all hover:shadow-md hover:border-blue-300 group"
              >
                {/* Top accent */}
                <div
                  style={{ background: subject.color, height: "3px" }}
                />
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                      style={{ background: subject.color + "18", color: subject.color }}
                    >
                      Subject {subject.num}
                    </span>
                    {!subject.free && (
                      <span className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">
                        <Lock size={10} /> Soon
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-800 text-sm leading-tight mb-2 flex-1">
                    {subject.name}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <BookOpen size={11} /> {subject.totalQuestions}+ Qs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} /> {subject.years}
                    </span>
                  </div>

                  {subject.free ? (
                    <Link
                      href={`/education/test-series/gate-pyq/${subject.id}`}
                      className="flex items-center justify-center gap-2 w-full py-2 rounded text-xs font-bold text-white transition-all"
                      style={{ background: subject.color }}
                    >
                      Start Exam <ChevronRight size={13} />
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-2 w-full py-2 rounded text-xs font-bold bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200"
                    >
                      <Lock size={11} /> Unlock Soon
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Admin note */}
          <div className="mt-8 bg-blue-50 border border-blue-200 border-l-4 border-l-blue-600 rounded-lg p-4 text-sm text-slate-700">
            <p className="font-semibold text-blue-800 mb-1">📌 Admin Note</p>
            <p className="text-xs leading-relaxed text-slate-600">
              Each subject currently has 10 real GATE PYQ sample questions. To add all 1000+ questions from your IES Master book,
              add them to <code className="bg-white px-1 rounded text-blue-700">src/data/gate/questions.ts</code> for the respective
              subject ID. Locked subjects can be linked to a payment gateway when ready.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
