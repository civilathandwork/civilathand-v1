import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Trophy, Users, BookOpen, GraduationCap, ChevronRight,
  CheckCircle2, Target, Headphones, Wallet, ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Civil At Hand Education — Test Series, Mentorship & Courses for Civil Engineers",
  description:
    "Civil At Hand Education: free GATE, ESE and SSC-JE test series, 1-on-1 mentorship from a real topper, and practical software courses (AutoCAD, Revit, BIM, STAAD Pro, IITPAVE) at the lowest price.",
};

const programs = [
  {
    icon: Trophy,
    badge: "Free to Start",
    badgeColor: "bg-green-600",
    title: "Test Series",
    sub: "GATE · ESE · SSC-JE",
    desc: "Practise in a real exam interface — timer, calculator, question palette, and detailed solutions. Subject-wise practice and full-length mocks.",
    points: ["Real CBT-style exam screen", "GATE, ESE & SSC-JE covered", "Detailed solution for every question"],
    href: "/education/test-series",
    cta: "Start Practising",
    accent: "#ef6c00",
  },
  {
    icon: Users,
    badge: "Limited Seats",
    badgeColor: "bg-slate-800",
    title: "1-on-1 Mentorship",
    sub: "Learn From a Real Topper",
    desc: "Get a personal study plan, doubt solving, and honest guidance from a GATE, IES and SSC-JE topper. Apply with a short form.",
    points: ["Personalised GATE / ESE strategy", "Doubt solving until it clicks", "Free to apply right now"],
    href: "/education/mentorship",
    cta: "Apply Now",
    accent: "#1a5fb4",
  },
  {
    icon: BookOpen,
    badge: "Launching Soon",
    badgeColor: "bg-emerald-600",
    title: "Software Courses",
    sub: "AutoCAD · Revit · BIM · STAAD · IITPAVE",
    desc: "Project-based courses taught by working professionals, with full doubt support, at the lowest price. Two live courses (Revit & IITPAVE).",
    points: ["Real office workflow, not theory", "Live + self-paced options", "Full doubt support"],
    href: "/education/courses",
    cta: "View Courses",
    accent: "#2e7d32",
  },
];

const whyUs = [
  { icon: Wallet, title: "Lowest Price", desc: "Quality preparation that students can actually afford." },
  { icon: Target, title: "Exam-Accurate", desc: "Built to the real GATE, ESE and SSC-JE patterns." },
  { icon: Headphones, title: "Full Support", desc: "Live doubt solving and mentorship — you're never stuck." },
  { icon: CheckCircle2, title: "Made by Toppers", desc: "Guidance and content from real rank holders." },
];

export default function EducationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative bg-wix-dark overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10 text-center">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-5">
              <GraduationCap className="h-3.5 w-3.5" /> Civil At Hand Education
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white uppercase leading-[1.05] mb-6">
              Crack Your Exam.<br /><span className="text-orange-500">Build Your Career.</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed mb-9 max-w-2xl mx-auto">
              One simple platform for civil engineering students — test series, mentorship from a real topper, and practical software courses. Trusted, affordable, and easy to use.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/education/test-series" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all">
                <Trophy className="h-4 w-4" /> Try Test Series — Free
              </Link>
              <Link href="/education/mentorship" className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all">
                Get Mentorship <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className="py-20 md:py-24 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">What We Offer</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase">Three Ways <span className="text-orange-500">to Grow</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((p) => (
                <div key={p.title} className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition-all">
                  <div className="h-1.5" style={{ background: p.accent }} />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-md flex items-center justify-center" style={{ background: `${p.accent}1a` }}>
                        <p.icon className="h-5 w-5" style={{ color: p.accent }} />
                      </div>
                      <span className={`${p.badgeColor} text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full`}>{p.badge}</span>
                    </div>
                    <h3 className="font-display text-lg font-extrabold text-wix-dark uppercase tracking-tight">{p.title}</h3>
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">{p.sub}</p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5">{p.desc}</p>
                    <ul className="space-y-2 mb-6">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-slate-600 font-medium">{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={p.href} className="mt-auto w-full inline-flex items-center justify-center gap-2 bg-wix-dark hover:bg-orange-500 text-white font-bold py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                      {p.cta} <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Why Civil At Hand</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">Built for <span className="text-orange-500">Students</span></h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {whyUs.map((w) => (
                <div key={w.title} className="bg-wix-gray border border-slate-200 rounded-lg p-6 text-center hover:border-orange-400 transition-all">
                  <div className="w-11 h-11 bg-orange-500/10 rounded-md flex items-center justify-center mx-auto mb-3">
                    <w.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <p className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide mb-1">{w.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-wix-dark">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase mb-4">
              Start Today — <span className="text-orange-500">It's Free to Begin</span>
            </h2>
            <p className="text-sm text-slate-400 font-medium mb-8">
              Practise a test, apply for mentorship, or explore a course. No login needed to start practising.
            </p>
            <Link href="/education/test-series" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all">
              <Trophy className="h-4 w-4" /> Open Test Series
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
