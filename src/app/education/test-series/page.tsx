import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Trophy, Clock, Target, BarChart3, BookOpen, Calculator,
  ChevronRight, ListChecks,
} from "lucide-react";
import { EXAMS } from "@/data/exams/registry";

export const metadata: Metadata = {
  title: "Civil Engineering Test Series — GATE, ESE, SSC-JE Full-Length Mock Tests | Civil At Hand Education",
  description:
    "Free full-length mock tests for GATE, ESE (IES) and SSC-JE Civil Engineering in a real exam interface with timer, scientific calculator and detailed solutions.",
};

const features = [
  { icon: Target, title: "Real Exam Pattern", desc: "Built to the actual GATE, ESE and SSC-JE blueprints." },
  { icon: Clock, title: "Timed Interface", desc: "Practise under real exam time pressure." },
  { icon: Calculator, title: "Built-in Calculator", desc: "Scientific calculator, just like the real CBT." },
  { icon: BookOpen, title: "Detailed Solutions", desc: "Every question explained, step by step." },
  { icon: BarChart3, title: "Instant Scoring", desc: "Negative marking and your score, right away." },
  { icon: ListChecks, title: "Question Palette", desc: "Mark for review and jump between questions." },
];

export default function TestSeriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        {/* Hero */}
        <section className="relative bg-wix-dark overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-5">
              <Trophy className="h-3.5 w-3.5" /> Civil At Hand Education
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white uppercase leading-tight mb-5">
              Full-Length <span className="text-orange-500">Mock Tests</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
              Sit real, full-length mock tests for GATE, ESE and SSC-JE Civil in a CBT-style
              interface — timer, scientific calculator, question palette and detailed solutions.
            </p>
          </div>
        </section>

        {/* Exam cards */}
        <section className="py-16 md:py-20 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {EXAMS.map((ex) => (
                <div key={ex.id} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-white px-2.5 py-1 rounded uppercase tracking-widest" style={{ background: ex.accent }}>
                      {ex.code}
                    </span>
                    {ex.comingSoon
                      ? <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-widest">Coming Soon</span>
                      : <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded uppercase tracking-widest">{ex.tests.length} Test{ex.tests.length !== 1 ? "s" : ""}</span>}
                  </div>
                  <h2 className="font-display text-lg font-extrabold text-wix-dark uppercase tracking-tight mb-1">{ex.name}</h2>
                  <p className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mb-3">{ex.patternLabel}</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5 flex-1">{ex.desc}</p>
                  {ex.comingSoon ? (
                    <span className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-400 font-bold px-4 py-2.5 text-[11px] uppercase tracking-widest rounded-md cursor-not-allowed">
                      Coming Soon
                    </span>
                  ) : (
                    <Link href={ex.fullHref}
                      className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                      Start Full-Length Tests <ChevronRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Why Practise Here</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">A Real Exam <span className="text-orange-500">Experience</span></h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className="bg-wix-gray border border-slate-200 rounded-lg p-6">
                  <div className="w-11 h-11 bg-orange-500/10 rounded-md flex items-center justify-center mb-3">
                    <f.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <p className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide mb-1">{f.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
