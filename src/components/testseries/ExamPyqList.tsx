"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/components/testseries/ExamPyqList.tsx
// ============================================================
// A reusable subject-list page for PYQ practice. ESE and SSC-JE
// PYQ pages both use this — just pass the exam's name, subjects,
// question bank, and the base URL. No layout is duplicated.
// ============================================================

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, BookOpen, ChevronRight, Lock, Zap } from "lucide-react";
import type { ExamSubjectMeta } from "@/data/testseries/examTypes";

interface BankLike { [k: string]: { length: number }[] | unknown[] }

interface ExamPyqListProps {
  examName: string;          // "ESE / IES — Civil"
  examTagline: string;       // one-line description
  subjects: ExamSubjectMeta[];
  bank: Record<string, unknown[]>;  // the question bank (for counts)
  basePath: string;          // e.g. "/education/test-series/ese-pyq"
}

export default function ExamPyqList({
  examName, examTagline, subjects, bank, basePath,
}: ExamPyqListProps) {
  const totalQ = Object.values(bank).reduce((s, arr) => s + arr.length, 0);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100">
        {/* Hero */}
        <div style={{ background: "linear-gradient(135deg, #0f2244 0%, #1a5fb4 100%)" }}>
          <div className="max-w-6xl mx-auto px-4 py-10">
            <Link href="/education/test-series"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Test Series
            </Link>
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              <Zap size={12} /> Civil At Hand Education
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {examName} — Practice by Subject
            </h1>
            <p className="text-white/75 text-sm max-w-xl leading-relaxed">{examTagline}</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 rounded-lg px-4 py-2 text-white text-sm">
              <BookOpen size={15} className="text-white/80" />
              <span className="font-bold">{totalQ}</span> practice questions ready · {subjects.length} subjects
            </div>
          </div>
        </div>

        {/* Subject grid */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subjects.map((s) => {
              const count = (bank[s.id]?.length) ?? 0;
              const disabled = !s.free || count === 0;
              return (
                <div key={s.id}
                  className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col hover:shadow-md hover:border-blue-300 transition-all">
                  <div className="h-1.5" style={{ background: s.color }} />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-md flex items-center justify-center text-white text-xs font-bold"
                          style={{ background: s.color }}>{s.num}</div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm leading-tight">{s.name}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{s.short}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-4">
                      {count > 0 ? `${count} questions` : "Questions coming soon"}
                    </p>
                    {disabled ? (
                      <span className="mt-auto inline-flex items-center justify-center gap-1.5 border border-slate-200 text-slate-400 font-bold px-4 py-2.5 text-xs uppercase tracking-widest rounded-md cursor-not-allowed">
                        <Lock size={12} /> {count === 0 ? "Coming Soon" : "Premium"}
                      </span>
                    ) : (
                      <Link href={`${basePath}/${s.id}`}
                        className="mt-auto inline-flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2.5 text-xs uppercase tracking-widest rounded-md transition-all">
                        Start Practice <ChevronRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
