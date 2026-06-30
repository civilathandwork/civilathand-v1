import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Trophy, CheckCircle2, Clock, Target, BarChart3,
  BookOpen, Calculator, GraduationCap, ChevronRight, ListChecks,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Civil Engineering Test Series — GATE, ESE, SSC-JE Mock Tests | Civil At Hand Education",
  description:
    "Free civil engineering test series for GATE, ESE (IES), and SSC-JE. Subject-wise practice and full-length mock tests in a real exam interface with timer, calculator, and detailed solutions.",
};

// Each exam shows two real buttons: subject practice (PYQ) + full-length mocks.
const exams = [
  {
    code: "GATE CE",
    name: "GATE — Civil Engineering",
    desc: "65 questions · 100 marks · 3 hours. Practice every subject, then sit a real full-length mock with the exact GATE pattern.",
    accent: "#1a5fb4",
    pyq: "/education/test-series/gate-pyq",
    full: "/education/test-series/gate-full-length",
    live: true,
  },
  {
    code: "ESE / IES",
    name: "ESE — Civil (IES)",
    desc: "150 questions · 300 marks · 3 hours. Subject practice plus full-length Prelims mocks built to the ESE Civil pattern.",
    accent: "#0f2244",
    pyq: "/education/test-series/ese-pyq",
    full: "/education/test-series/ese-full-length",
    live: true,
  },
  {
    code: "SSC-JE",
    name: "SSC-JE — Civil",
    desc: "Paper 1 (200 Q) & Paper 2 (100 Q). Reasoning, GK and Civil Technical — practice by subject or take full-length mocks.",
    accent: "#6a1b9a",
    pyq: "/education/test-series/ssc-pyq",
    full: "/education/test-series/ssc-full-length",
    live: true,
  },
];

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
            <Link href="/education" className="inline-flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-5 hover:text-orange-300 transition-colors">
              <GraduationCap className="h-3.5 w-3.5" /> Civil At Hand Education
            </Link>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white uppercase leading-tight mb-5">
              Civil Engineering <span className="text-orange-500">Test Series</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
              GATE · ESE · SSC-JE — practise in a real exam interface with timer, calculator, question palette, and detailed solutions. Free to start. Pick your exam below.
            </p>
            <div className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Free for now — no login needed to practise</span>
            </div>
          </div>
        </section>

        {/* Exam cards */}
        <section className="py-16 md:py-20 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Choose Your Exam</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">3 Exams. <span className="text-orange-500">One Engine.</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {exams.map((e) => (
                <div key={e.code} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all">
                  <div className="h-1.5" style={{ background: e.accent }} />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="inline-flex items-center gap-2 mb-3 w-fit">
                      <span className="text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded" style={{ background: e.accent }}>{e.code}</span>
                    </div>
                    <h3 className="font-display text-lg font-extrabold text-wix-dark uppercase tracking-tight mb-2">{e.name}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 flex-1">{e.desc}</p>
                    <div className="space-y-2.5">
                      <Link href={e.pyq} className="w-full inline-flex items-center justify-between gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                        <span className="inline-flex items-center gap-2"><BookOpen className="h-4 w-4" /> Practice by Subject</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                      <Link href={e.full} className="w-full inline-flex items-center justify-between gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                        <span className="inline-flex items-center gap-2"><Trophy className="h-4 w-4" /> Full Length Tests</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 font-medium mt-8">
              More mock tests are added regularly. Premium full-length tests unlock with a one-time payment (launching soon).
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Why Students Trust It</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">A Real <span className="text-orange-500">Exam Experience</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title} className="bg-wix-gray border border-slate-200 rounded-lg p-6 hover:border-orange-400 transition-all">
                  <f.icon className="h-5 w-5 text-orange-500 mb-3" />
                  <p className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide mb-1">{f.title}</p>
                  <p className="text-xs text-slate-500 font-medium">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to start */}
        <section className="py-16 bg-wix-dark">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-3">Simple to Use</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase">Start in 3 Steps</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { n: "1", t: "Pick your exam", d: "GATE, ESE, or SSC-JE — choose above." },
                { n: "2", t: "Choose a test", d: "Practise one subject or take a full mock." },
                { n: "3", t: "Solve & review", d: "Get your score and detailed solutions instantly." },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-md flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-base font-extrabold text-white">{s.n}</span>
                  </div>
                  <p className="font-display text-sm font-extrabold text-white uppercase tracking-wide mb-2">{s.t}</p>
                  <p className="text-xs text-slate-400 font-medium">{s.d}</p>
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
