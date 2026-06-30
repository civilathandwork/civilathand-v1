import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Clock, FileText, ChevronRight, Trophy, Lock } from "lucide-react";
import { getExam } from "@/data/exams/registry";

export default function GateFullLengthList() {
  const exam = getExam("gate");
  const tests = exam ? exam.tests : [];
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
              Built to the GATE Civil pattern (General Aptitude + Engineering Maths + Core Civil).
              Real CBT-style interface with timer, scientific calculator and detailed solutions.
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 grid gap-4 sm:grid-cols-2">
          {tests.map((t) => (
            <div key={t.id} className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col hover:border-orange-400 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-slate-800">{t.name}</h2>
                {t.free
                  ? <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded uppercase tracking-wider">Free</span>
                  : <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider"><Lock size={10} /> Premium</span>}
              </div>
              <p className="text-xs text-slate-500 mb-3">{t.subtitle}</p>
              <div className="flex items-center gap-4 text-xs text-slate-600 mb-4">
                <span className="inline-flex items-center gap-1"><FileText size={13} className="text-orange-500" /> {t.questions.length} Q</span>
                <span className="inline-flex items-center gap-1"><Clock size={13} className="text-orange-500" /> {Math.round(t.durationSec / 3600)} hr</span>
                <span className="inline-flex items-center gap-1"><Trophy size={13} className="text-orange-500" /> {t.totalMarks} marks</span>
              </div>
              <Link href={`/education/test-series/gate-full-length/${t.id}`}
                className="mt-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 text-xs uppercase tracking-widest rounded-md transition-all">
                Start Test <ChevronRight size={14} />
              </Link>
            </div>
          ))}
          {tests.length === 0 && (
            <p className="text-sm text-slate-500">No tests available yet.</p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
