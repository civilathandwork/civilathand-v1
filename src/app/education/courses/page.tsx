import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BookOpen, Clock, Star, GraduationCap, ChevronRight,
  Play, Zap, Headphones, ArrowRight,
} from "lucide-react";
import { COURSES } from "@/data/education/courses";

export const metadata: Metadata = {
  title: "Civil Engineering Software Courses — AutoCAD, Revit, BIM, STAAD Pro, IITPAVE | Civil At Hand Education",
  description:
    "Practical, project-based civil engineering courses: AutoCAD, Revit (live), BIM, STAAD Pro, and IITPAVE flexible pavement design (live). Taught by working professionals at the lowest price, with full doubt support.",
};

export default function CoursesPage() {
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
              Software & Skill <span className="text-orange-500">Courses</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
              Practical, project-based courses taught by working civil engineers — not just instructors. Learn the exact tools the industry uses, at the lowest price, with full doubt support.
            </p>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Launching soon — tap a course to see full details</span>
            </div>
          </div>
        </section>

        {/* Trust strip */}
        <section className="py-12 bg-orange-500">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
              {[
                { icon: Play, val: "Project-Based", label: "Real workflow, not theory" },
                { icon: Star, val: "By Professionals", label: "Working engineers teach" },
                { icon: Zap, val: "Lowest Price", label: "Affordable for students" },
                { icon: Headphones, val: "Full Doubt Support", label: "We don't leave you stuck" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <s.icon className="h-6 w-6 text-white/85" />
                  <p className="font-display font-extrabold text-sm uppercase tracking-wide">{s.val}</p>
                  <p className="text-[10px] text-orange-100 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course grid */}
        <section className="py-20 md:py-24 bg-wix-gray">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">All Courses</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase">
                5 Courses. <span className="text-orange-500">Industry-Ready Skills.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COURSES.map((c) => (
                <Link key={c.slug} href={`/education/courses/${c.slug}`}
                  className="group bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <div className="h-1.5" style={{ background: c.accent }} />
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <span className={`${c.badgeColor} text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full`}>{c.badge}</span>
                      {c.mode === "Live" && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-1 rounded-full uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live
                        </span>
                      )}
                    </div>
                    <div className="w-10 h-10 rounded-md flex items-center justify-center mb-4" style={{ background: `${c.accent}1a` }}>
                      <BookOpen className="h-5 w-5" style={{ color: c.accent }} />
                    </div>
                    <h3 className="font-display text-base font-extrabold text-wix-dark uppercase tracking-tight mb-1">{c.name}</h3>
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">{c.sub}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500"><Clock className="h-3.5 w-3.5" /> {c.duration}</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500"><Star className="h-3.5 w-3.5 text-orange-400" /> {c.level}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5 flex-1">{c.summary}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="font-display text-sm font-extrabold text-wix-dark">{c.priceLabel}</span>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 uppercase tracking-widest group-hover:gap-2.5 transition-all">
                        View Details <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-wix-dark">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase mb-4">
              Be First in Line <span className="text-orange-500">When We Launch</span>
            </h2>
            <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
              Open any course to see the full syllabus. Early students get the best launch price.
            </p>
            <Link href="/education"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all">
              See All Programs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
