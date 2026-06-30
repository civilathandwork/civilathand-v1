"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/app/education/courses/[course]/page.tsx
// ============================================================
// One page that shows the full details of ANY course from
// src/data/education/courses.ts. The "Coming Soon" button becomes
// a real Cashfree pay button automatically once you set
// comingSoon:false on the course AND paste your Cashfree link into
// PAYMENT_LINKS.course in src/data/education/site.ts.
// ============================================================

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowLeft, CheckCircle2, Clock, Star, GraduationCap,
  ListChecks, Users, Headphones, BookOpen, MessageCircle,
} from "lucide-react";
import { getCourse } from "@/data/education/courses";
import EnrollButton from "@/components/education/EnrollButton";
import { PAYMENT_LINKS, whatsapp } from "@/data/education/site";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.course as string;
  const course = getCourse(slug);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-sm">
          <p className="text-lg font-bold text-slate-700 mb-3">Course not found.</p>
          <Link href="/education/courses" className="text-orange-600 underline font-bold">
            ← Back to all courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">

        {/* Hero */}
        <section className="relative overflow-hidden" style={{ background: course.accent }}>
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
            <Link href="/education/courses" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Courses
            </Link>
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{course.badge}</span>
              {course.mode === "Live" && (
                <span className="inline-flex items-center gap-1.5 bg-white text-red-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live Classes
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase leading-tight mb-3">{course.name}</h1>
            <p className="text-white/90 text-sm font-medium mb-6 max-w-2xl">{course.summary}</p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Clock, label: course.duration },
                { icon: Star, label: course.level },
                { icon: GraduationCap, label: course.mode === "Live" ? "Live + Doubt Support" : "Self-Paced" },
              ].map((m, i) => (
                <div key={i} className="inline-flex items-center gap-2 bg-white/15 rounded-lg px-4 py-2 text-white text-xs font-bold">
                  <m.icon size={14} /> {m.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Body */}
        <section className="py-14 md:py-20 bg-wix-gray">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left: details */}
            <div className="lg:col-span-2 space-y-10">
              {/* What you'll learn */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <ListChecks className="h-5 w-5 text-orange-500" />
                  <h2 className="font-display text-xl font-extrabold text-wix-dark uppercase tracking-tight">What You Will Learn</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {course.learn.map((l) => (
                    <div key={l} className="flex items-start gap-2.5 bg-white border border-slate-200 rounded-lg p-4">
                      <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600 font-medium">{l}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course outline */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="h-5 w-5 text-orange-500" />
                  <h2 className="font-display text-xl font-extrabold text-wix-dark uppercase tracking-tight">Course Outline</h2>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
                  {course.modules.map((m, i) => (
                    <div key={m} className="flex items-center gap-4 p-4">
                      <span className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: course.accent }}>{i + 1}</span>
                      <span className="text-sm text-slate-700 font-medium">{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who it's for */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Users className="h-5 w-5 text-orange-500" />
                  <h2 className="font-display text-xl font-extrabold text-wix-dark uppercase tracking-tight">Who This Is For</h2>
                </div>
                <ul className="space-y-2.5">
                  {course.whoFor.map((w) => (
                    <li key={w} className="flex items-start gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: enroll card (sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm lg:sticky lg:top-6">
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">Enrolment</p>
                <p className="font-display text-3xl font-extrabold text-wix-dark mb-1">{course.priceLabel}</p>
                <p className="text-[11px] text-slate-400 font-medium mb-5">One-time · Lifetime access</p>

                {course.mode === "Live" && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-lg p-3 mb-5">
                    <Headphones className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-[11px] text-red-700 font-bold">Live classes with full doubt support</span>
                  </div>
                )}

                <EnrollButton
                  paymentLink={PAYMENT_LINKS.course}
                  price={course.priceLabel}
                  comingSoon={course.comingSoon}
                />

                <a href={whatsapp(`Hi, I'm interested in the ${course.name} course. Please notify me when it launches.`)}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 border border-slate-200 hover:border-green-400 text-slate-600 hover:text-green-600 font-bold py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                  <MessageCircle className="h-4 w-4" /> Notify Me on WhatsApp
                </a>

                <p className="text-[10px] text-slate-400 text-center mt-4 font-medium leading-relaxed">
                  Enrolment opens soon. Tap "Notify Me" and we'll message you with the launch price first.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
