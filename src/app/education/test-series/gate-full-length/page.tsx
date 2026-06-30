"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/app/education/test-series/gate-full-length/page.tsx
// ============================================================
// Lists every GATE full-length mock (Full Length Test 1, 2, 3 …).
// To add more tests, just raise the count in GATE_FULL_TESTS in
// src/data/testseries/blueprints.ts — this page updates itself.
// ============================================================

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Clock, FileText, Lock, ChevronRight, Trophy } from "lucide-react";
import { GATE_FULL_TESTS } from "@/data/testseries/blueprints";
import { GATE_QUESTIONS } from "@/data/gate/questions";
import { assembleTest } from "@/lib/assembleTest";

export default function GateFullLengthList() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100">
        <div style={{ background: "linear-gradient(135deg, #0f2244 0%, #1a5fb4 100%)" }}>
          <div className="max-w-5xl mx-auto px-4 py-10">
            <Link href="/education/test-series" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Test Series
            </Link>
            <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              <Trophy size={12} /> Civil At Hand Education
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">GATE CE — Full Length Tests</h1>
            <p className="text-white/75 text-sm max-w-xl leading-relaxed">
              65 questions · 100 marks · 3 hours — built to the exact GATE Civil pattern
              (General Aptitude + Engineering Maths + Core Civil). Real CBT-style interface,
              timer, calculator, and detailed solutions.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 grid gap-4 sm:grid-cols-2">
          {GATE_FULL_TESTS.map((t) => {
            const assembled = assembleTest(t, GATE_QUESTIONS);
            const ready = assembled.questions.length;
            return (
              <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col hover:border-orange-400 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-bold text-slate-800">{t.name}</h2>
                  {t.free
                    ? <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded uppercase tracking-wider">Free</span>
                    : <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider"><Lock size={10} /> Premium</span>}
                </div>
                <p className="text-xs text-slate-500 mb-3">{t.subtitle}</p>
                <div className="flex items-center gap-4 text-xs text-slate-600 mb-4">
                  <span className="inline-flex items-center gap-1"><FileText size={13} className="text-orange-500" /> {t.totalQuestions} Q</span>
                  <span className="inline-flex items-center gap-1"><Clock size={13} className="text-orange-500" /> {Math.round(t.durationSec / 3600)} hr</span>
                  <span className="inline-flex items-center gap-1"><Trophy size={13} className="text-orange-500" /> {t.totalMarks} marks</span>
                </div>
                {ready < t.totalQuestions && (
                  <p className="text-[11px] text-yellow-700 bg-yellow-50 border border-yellow-200 rounded px-2 py-1 mb-3">
                    {ready} of {t.totalQuestions} questions ready — bank is still being expanded.
                  </p>
                )}
                {t.free ? (
                  <Link href={`/education/test-series/gate-full-length/${t.id}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 text-xs uppercase tracking-widest rounded-md transition-all">
                    Start Test <ChevronRight size={14} />
                  </Link>
                ) : (
                  <span className="mt-auto inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-400 font-bold px-4 py-2.5 text-xs uppercase tracking-widest rounded-md cursor-not-allowed">
                    <Lock size={12} /> Unlock Soon
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
