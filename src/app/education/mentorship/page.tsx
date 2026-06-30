"use client";
// ============================================================
// PLACE THIS FILE AT:
//   src/app/education/mentorship/page.tsx
// ============================================================
// Mentorship page. Students APPLY by filling the Google Form
// (embedded on the page + linked on every button). Price shows
// ₹999 but is FREE for now. When you are ready to charge, paste
// your Cashfree link into PAYMENT_LINKS.mentorship in
// src/data/education/site.ts — the buttons switch automatically.
//
// TO CHANGE MENTOR DETAILS: edit the MENTORS array below.
// (Names here are demo placeholders — replace with real ones.)
// ============================================================

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Trophy, CheckCircle2, GraduationCap, Star, Award,
  Target, ClipboardList, Video, Medal, ArrowRight,
} from "lucide-react";
import MentorshipForm from "@/components/education/MentorshipForm";
import EnrollButton from "@/components/education/EnrollButton";
import {
  MENTORSHIP_FORM_URL, MENTORSHIP_PRICE, MENTORSHIP_PRICE_NOTE, PAYMENT_LINKS,
} from "@/data/education/site";

// ── DEMO MENTORS — replace names/photos with real ones later ──
const MENTORS = [
  {
    initials: "NK",
    name: "Naveen Kumar",
    role: "GATE · IES · SSC-JE Topper",
    creds: [
      "GATE qualified 10 times — under AIR 50",
      "ESE / IES topper — under AIR 100",
      "SSC-JE topper",
    ],
    tag: "Lead Mentor",
  },
  // Add more mentors here in the same format when you have them.
];

const helpAreas = [
  { icon: Target, title: "GATE / ESE Strategy", desc: "A clear, personalised study plan from someone who has topped the exam — what to study, in what order, and what to skip." },
  { icon: ClipboardList, title: "Doubt Solving", desc: "Bring your toughest subjects and questions. Get them explained simply until they finally click." },
  { icon: Award, title: "Rank Improvement", desc: "Already preparing? Get a focused plan to push your score and rank higher in the time you have left." },
  { icon: Video, title: "1-on-1 Guidance", desc: "Career advice, exam selection, and motivation — a real conversation tailored to your situation." },
];

export default function MentorshipPage() {
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
              Learn From a <span className="text-orange-500">Real Topper</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-2xl mx-auto">
              Get personal 1-on-1 mentorship from a GATE, IES and SSC-JE topper. A focused study plan, doubt solving, and honest guidance — built around your goal.
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl font-extrabold text-orange-400">{MENTORSHIP_PRICE}</span>
                <span className="text-xs text-slate-400 font-medium">/ mentorship</span>
              </div>
              <span className="inline-flex items-center gap-2 bg-green-500/15 border border-green-500/30 rounded-full px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">{MENTORSHIP_PRICE_NOTE}</span>
              </span>
              <a href={MENTORSHIP_FORM_URL} target="_blank" rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-[12px] uppercase tracking-widest rounded-md transition-all">
                <ClipboardList className="h-4 w-4" /> Apply for Mentorship <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Mentor card */}
        <section className="py-16 md:py-20 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Your Mentor</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">Proven <span className="text-orange-500">Results</span></h2>
            </div>
            {MENTORS.map((m) => (
              <div key={m.name} className="bg-white border border-slate-200 rounded-xl p-7 md:p-9 shadow-sm max-w-2xl mx-auto">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 bg-wix-dark rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xl font-extrabold text-white">{m.initials}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-display text-xl font-extrabold text-wix-dark uppercase tracking-tight">{m.name}</p>
                      <span className="bg-orange-500 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">{m.tag}</span>
                    </div>
                    <p className="text-[11px] font-bold text-orange-500 uppercase tracking-widest mb-4">{m.role}</p>
                    <ul className="space-y-2.5">
                      {m.creds.map((c) => (
                        <li key={c} className="flex items-start gap-2.5">
                          <Medal className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700 font-medium">{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What you get */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">What You Get</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">Real Help, <span className="text-orange-500">Not Generic Advice</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
              {helpAreas.map((h) => (
                <div key={h.title} className="bg-wix-gray border border-slate-200 rounded-lg p-6 hover:border-orange-400 transition-all">
                  <h.icon className="h-6 w-6 text-orange-500 mb-3" />
                  <p className="font-display text-base font-extrabold text-wix-dark uppercase tracking-wide mb-2">{h.title}</p>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Simple Process</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-wix-dark uppercase">How to Join</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { n: "1", t: "Fill the form", d: "Tell us your exam, goal, and current level in the short form below." },
                { n: "2", t: "We match you", d: "Your mentor reviews it and we confirm your session over WhatsApp/email." },
                { n: "3", t: "Get your plan", d: "Meet 1-on-1 and walk away with a clear, personalised roadmap." },
              ].map((s) => (
                <div key={s.n} className="text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-md flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-base font-extrabold text-white">{s.n}</span>
                  </div>
                  <p className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide mb-2">{s.t}</p>
                  <p className="text-xs text-slate-500 font-medium">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The form itself */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Apply Now</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-wix-dark uppercase mb-2">
                Fill This <span className="text-orange-500">Short Form</span>
              </h2>
              <p className="text-sm text-slate-500 font-medium">
                Takes 2 minutes. It's free to apply right now — limited early seats.
              </p>
            </div>

            <MentorshipForm />

            <div className="mt-8 max-w-sm mx-auto">
              <EnrollButton
                paymentLink={PAYMENT_LINKS.mentorship}
                price={MENTORSHIP_PRICE}
                freeHref={MENTORSHIP_FORM_URL}
                freeLabel="Apply Free — Fill the Form"
              />
              <p className="text-[11px] text-slate-400 text-center mt-3 font-medium">
                Currently free. When paid mentorship goes live, this button will take you to secure Cashfree payment.
              </p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
