"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/components/testseries/ExamFullList.tsx
// ============================================================
// A reusable "full-length tests" list page. ESE and SSC-JE use
// this. Pass the exam's tests + bank + base URL.
// ============================================================

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Clock, FileText, Lock, ChevronRight, Trophy } from "lucide-react";
import { assembleTest } from "@/lib/assembleTest";
import type { FullTestBlueprint } from "@/data/testseries/blueprints";
import type { BankQuestion } from "@/lib/assembleTest";

interface ExamFullListProps {
  examName: string;            // "ESE Civil Prelims"
  examTagline: string;
  tests: FullTestBlueprint[];
  bank: Record<string, BankQuestion[]>;
  basePath: string;            // ".../ese-full-length"
}

export default function ExamFullList({
  examName, examTagline, tests, bank, basePath,
}: ExamFullListProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100">
        <div style={{ background: "linear-gradient(135deg, #0f2244 0%, #1a5fb4 100%)" }}>
          <div className="max-w-5xl mx-auto px-4 py-10">
            <Link href="/education/test-series"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Test Series
            </Link>
            <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              <Trophy size={12} /> Civil At Hand Education
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {examName} — Full Length Tests
            </h1>
            <p className="text-white/75 text-sm max-w-xl leading-relaxed">{examTagline}</p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 grid gap-4 sm:grid-cols-2">
          {tests.map((t) => {
            const assembled = assembleTest(t, bank);
            const ready = assembled.questions.length;
            return (
              <div key={t.id}
                className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col hover:border-orange-400 hover:shadow-md transition-all">
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
                    {ready} of {t.totalQuestions} questions ready — bank still being expanded.
                  </p>
                )}
                {t.free && ready > 0 ? (
                  <Link href={`${basePath}/${t.id}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 text-xs uppercase tracking-widest rounded-md transition-all">
                    Start Test <ChevronRight size={14} />
                  </Link>
                ) : (
                  <span className="mt-auto inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-400 font-bold px-4 py-2.5 text-xs uppercase tracking-widest rounded-md cursor-not-allowed">
                    <Lock size={12} /> {ready === 0 ? "Coming Soon" : "Unlock Soon"}
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
