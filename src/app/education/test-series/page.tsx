import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Trophy, CheckCircle2, ArrowRight, Clock, Target, Star,
  BarChart3, BookOpen, Zap, Lock, GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Civil Engineering Test Series | GATE, ESE, SSC-JE Mock Tests — Civil At Hand Education",
  description:
    "India's most accurate civil engineering test series for GATE CE, ESE (IES), SSC-JE, State JE/AE, and company exams. Full-length mocks, subject-wise tests, detailed solutions, and performance analytics — at the lowest price.",
};

const plans = [
  {
    name: "Subject Pack",
    price: "₹199",
    per: "per subject",
    desc: "Focus on one subject at a time. Ideal for targeted preparation.",
    features: [
      "50+ subject-wise questions",
      "Timed quiz interface",
      "Detailed solutions",
      "Performance score",
      "Access for 6 months",
    ],
    cta: "Buy Subject Pack",
    highlighted: false,
    badge: null,
  },
  {
    name: "GATE CE Full Pack",
    price: "₹999",
    per: "per year",
    desc: "Complete GATE CE preparation — all subjects, full mocks, and analytics.",
    features: [
      "All 12 subjects covered",
      "10 full-length GATE mock tests",
      "Topic-wise tests (200+)",
      "Previous year question bank",
      "Rank & performance analytics",
      "Solution PDFs downloadable",
      "Access for 12 months",
    ],
    cta: "Get GATE Pack",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "All Exam Combo",
    price: "₹1,499",
    per: "per year",
    desc: "GATE + ESE + SSC-JE + Company exams. Ultimate civil engineering test prep.",
    features: [
      "GATE CE — full test series",
      "ESE Civil Paper I & II tests",
      "SSC-JE Civil mocks",
      "State JE/AE tests",
      "Company exam question banks",
      "Interview question quiz",
      "Priority support",
      "Access for 12 months",
    ],
    cta: "Get Combo Pack",
    highlighted: false,
    badge: "Best Value",
  },
];

const subjects = [
  "Structural Analysis", "RCC Design (IS 456)", "Steel Design (IS 800)",
  "Soil Mechanics", "Foundation Engineering", "Fluid Mechanics",
  "Hydraulics", "Transportation Engineering", "Environmental Engineering",
  "Surveying & Geomatics", "Construction Management", "Estimation & Costing",
  "Building Materials", "Irrigation Engineering", "Engineering Mathematics",
  "General Aptitude (GATE)",
];

const exams = [
  { name: "GATE CE", desc: "Graduate Aptitude Test — Civil Engineering", papers: "10 Full Mocks + 200+ Topic Tests" },
  { name: "ESE / IES", desc: "Engineering Services Exam — Civil", papers: "8 Full Mocks + Paper I & II" },
  { name: "SSC-JE Civil", desc: "Staff Selection Commission Junior Engineer", papers: "6 Full Mocks + Topic Tests" },
  { name: "State JE / AE", desc: "MPSC, RPSC, UPPSC, HPSC, HPSC", papers: "4 Mocks per State Board" },
  { name: "ISRO / DRDO", desc: "Government R&D Civil Hiring", papers: "Previous Year + Mock Tests" },
  { name: "Company Exams", desc: "L&T, Tata, NPCIL, RVNL, HPCL", papers: "Company-specific question banks" },
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
              <div>
                <Link href="/education" className="inline-flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-5 hover:text-orange-300 transition-colors">
                  <GraduationCap className="h-3.5 w-3.5" /> Civil At Hand Education
                </Link>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white uppercase leading-tight mb-5">
                  Civil Engineering<br />
                  <span className="text-orange-500">Test Series</span>
                </h1>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-lg">
                  GATE · ESE · SSC-JE · State JE · Company Exams — all in one place. Expert-crafted questions, timed quiz interface, detailed solutions, and real performance analytics. India's most affordable civil engineering test prep.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  {[
                    { val: "200+", label: "Topic Tests" },
                    { val: "GATE to Company", label: "All Exams" },
                    { val: "Detailed", label: "Solutions" },
                    { val: "Lowest", label: "Price" },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-display text-xl font-extrabold text-orange-400">{s.val}</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#pricing" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                    <Trophy className="h-4 w-4" /> View Plans
                  </a>
                  <Link href="/education" className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                    All Programs
                  </Link>
                </div>
              </div>
              {/* Feature chips */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Target, title: "Exam-Pattern Accurate", desc: "Built on actual GATE, ESE, SSC-JE patterns" },
                  { icon: Clock, title: "Timed Interface", desc: "Simulate real exam time pressure" },
                  { icon: BarChart3, title: "Performance Analytics", desc: "Track progress, rank, and weak areas" },
                  { icon: BookOpen, title: "Detailed Solutions", desc: "Every question explained with concept" },
                  { icon: Star, title: "Made by Toppers", desc: "Created by GATE & ESE rank holders" },
                  { icon: Zap, title: "Instant Access", desc: "Start practicing immediately after purchase" },
                ].map((f) => (
                  <div key={f.title} className="bg-white/5 border border-white/10 rounded-md p-5 hover:border-orange-500/30 transition-all">
                    <f.icon className="h-5 w-5 text-orange-400 mb-3" />
                    <p className="text-xs font-extrabold text-white font-display uppercase tracking-wide mb-1">{f.title}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Exams Covered */}
        <section className="py-16 md:py-20 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Coverage</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">
                Exams We <span className="text-orange-500">Cover</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exams.map((e) => (
                <div key={e.name} className="bg-white border border-slate-200 rounded-md p-6 hover:border-orange-400 hover:shadow-md transition-all flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                    <p className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide">{e.name}</p>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mb-1">{e.desc}</p>
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">{e.papers}</p>
                  {e.name === "GATE CE" ? (
                    <Link
                      href="/education/test-series/gate-pyq"
                      className="mt-auto inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-4 py-2 text-[10px] uppercase tracking-widest rounded-md transition-all w-fit"
                    >
                      <BookOpen className="h-3.5 w-3.5" /> Solve PYQ — Free
                    </Link>
                  ) : (
                    <span className="mt-auto inline-flex items-center gap-1.5 border border-slate-200 text-slate-400 font-bold px-4 py-2 text-[10px] uppercase tracking-widest rounded-md w-fit cursor-not-allowed">
                      <Lock className="h-3 w-3" /> Coming Soon
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Full Syllabus</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">All <span className="text-orange-500">Subjects Covered</span></h2>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              {subjects.map((sub) => (
                <div key={sub} className="flex items-center gap-2 bg-wix-gray border border-slate-200 rounded-md px-4 py-2.5 hover:border-orange-400 transition-all">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 flex-shrink-0" />
                  <span className="text-xs font-bold text-wix-dark">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-20 md:py-28 bg-wix-gray">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Pricing</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase">
                Lowest Price. <span className="text-orange-500">Highest Quality.</span>
              </h2>
              <p className="mt-3 text-sm text-slate-500 font-medium">Payment gateway integration coming soon. Contact us to get early access.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div key={plan.name} className={`relative bg-white rounded-md overflow-hidden flex flex-col transition-all ${plan.highlighted ? "border-2 border-orange-500 shadow-xl" : "border border-slate-200 hover:border-slate-300 hover:shadow-md"}`}>
                  {plan.badge && (
                    <div className={`${plan.highlighted ? "bg-orange-500" : "bg-slate-700"} text-white text-[9px] font-bold uppercase tracking-widest text-center py-2`}>
                      {plan.badge}
                    </div>
                  )}
                  <div className="p-7 border-b border-slate-100">
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">{plan.name}</p>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="font-display text-4xl font-extrabold text-wix-dark">{plan.price}</span>
                      <span className="text-xs text-slate-400 font-medium">{plan.per}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{plan.desc}</p>
                  </div>
                  <div className="p-7 flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-600 font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="px-7 pb-7">
                    <div className="w-full inline-flex items-center justify-center gap-2 bg-wix-dark text-white font-bold py-3.5 text-[11px] uppercase tracking-widest rounded-md opacity-70 cursor-not-allowed">
                      <Lock className="h-4 w-4" /> Coming Soon
                    </div>
                    <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">Payment launching soon</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-wix-dark rounded-md p-7 text-center">
              <p className="text-sm font-bold text-white mb-2">Want early access? Contact us directly.</p>
              <p className="text-xs text-slate-400 font-medium mb-5">We are onboarding early users manually before the payment gateway goes live.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="https://wa.me/917703977002" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                  WhatsApp for Early Access
                </a>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white text-white font-bold px-7 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
