import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Users, CheckCircle2, ArrowRight, Calendar, Clock,
  Video, Star, Lock, GraduationCap, MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "1-on-1 Civil Engineering Mentorship | Book a Session — Civil At Hand Education",
  description:
    "Book a personal 1-on-1 mentorship session with top civil engineering professionals. Get guidance on GATE preparation, career planning, job interviews, M.Tech admissions, and more. Civil At Hand Education.",
};

const mentors = [
  {
    initials: "RM",
    name: "Ar. Rajiv M.",
    role: "Structural Engineer",
    exp: "12 years · IIT background · Design Consultancy",
    tag: "Structural",
    tagColor: "bg-orange-500",
    topics: ["GATE CE Strategy", "Structural Design Career", "M.Tech Admission", "IES Preparation"],
    rating: "4.9",
    sessions: "120+",
  },
  {
    initials: "PN",
    name: "Priya N.",
    role: "BIM & CAD Specialist",
    exp: "9 years · BIM Lead · International Projects",
    tag: "BIM",
    tagColor: "bg-slate-700",
    topics: ["Revit / BIM Career", "Software Skills", "Global Opportunities", "Freelancing"],
    rating: "4.8",
    sessions: "85+",
  },
  {
    initials: "SK",
    name: "Suresh K.",
    role: "Senior Quantity Surveyor",
    exp: "10 years · CPWD Projects · BOQ Expert",
    tag: "Quantity Surveying",
    tagColor: "bg-orange-400",
    topics: ["BOQ Career Path", "SSC-JE Preparation", "Estimation Skills", "Government Jobs"],
    rating: "5.0",
    sessions: "60+",
  },
  {
    initials: "AM",
    name: "Amit S.",
    role: "Project & Site Manager",
    exp: "15 years · L&T, Tata Projects",
    tag: "Site & Management",
    tagColor: "bg-emerald-600",
    topics: ["Site Career Advice", "Job Switch Strategy", "Interview Coaching", "PSU Preparation"],
    rating: "4.9",
    sessions: "100+",
  },
];

const sessionTypes = [
  { title: "GATE / ESE Strategy", desc: "Get a personalised study plan, resource list, and exam strategy from a GATE ranker.", duration: "45 min" },
  { title: "Career Guidance", desc: "Confused about jobs, PSU, M.Tech, or startup? Get clear direction from an industry professional.", duration: "45 min" },
  { title: "Resume & Interview Prep", desc: "Get your resume reviewed and practise real civil engineering interview questions with expert feedback.", duration: "45 min" },
  { title: "BIM & Software Career", desc: "Learn how to transition into BIM, what software to master, and how to land international projects.", duration: "45 min" },
  { title: "PSU Preparation", desc: "ONGC, BHEL, NTPC, AAI, RVNL — strategy, syllabus, and preparation roadmap from a PSU professional.", duration: "45 min" },
  { title: "Startup & Consultancy", desc: "Planning to start your own civil engineering firm? Get a practical roadmap from someone who has done it.", duration: "45 min" },
];

const howItWorks = [
  { step: "01", title: "Choose Your Goal", desc: "Select what you want to achieve — GATE prep, career guidance, interview coaching, or software skills." },
  { step: "02", title: "Pick a Mentor", desc: "Browse mentors by specialisation and experience. Read their background and topics they cover." },
  { step: "03", title: "Book a Session", desc: "Choose a date and time that works for you. Pay securely online (payment gateway launching soon)." },
  { step: "04", title: "Get Your Roadmap", desc: "Attend a focused 45-minute video session and walk away with a clear, personalised action plan." },
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-3xl">
              <Link href="/education" className="inline-flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-5 hover:text-orange-300 transition-colors">
                <GraduationCap className="h-3.5 w-3.5" /> Civil At Hand Education
              </Link>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white uppercase leading-tight mb-5">
                1-on-1 Civil Engineering<br />
                <span className="text-orange-500">Mentorship Sessions</span>
              </h1>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-xl">
                Sometimes 45 minutes with the right professional changes your entire direction. Book a personal session with an experienced civil engineer — for GATE strategy, career planning, interview prep, or life guidance.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { val: "45 Min", label: "Per Session" },
                  { val: "Video Call", label: "Format" },
                  { val: "4.9★", label: "Avg Rating" },
                  { val: "Lowest Price", label: "Guaranteed" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/5 border border-white/10 rounded-md px-5 py-3 text-center">
                    <p className="font-display text-base font-extrabold text-orange-400">{s.val}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="#mentors" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                  <Users className="h-4 w-4" /> Meet Our Mentors
                </a>
                <a href="https://wa.me/917703977002" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                  <MessageCircle className="h-4 w-4" /> Book via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Simple Process</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">
                How It <span className="text-orange-500">Works</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {howItWorks.map((step, i) => (
                <div key={step.step} className="relative">
                  {i < howItWorks.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-full w-full h-px bg-orange-200 z-0" style={{ width: "calc(100% - 2rem)" }} />
                  )}
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-orange-500 rounded-md flex items-center justify-center mb-4">
                      <span className="font-display text-base font-extrabold text-white">{step.step}</span>
                    </div>
                    <h3 className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide mb-2">{step.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Session Types */}
        <section className="py-16 md:py-20 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">What You Can Book</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">
                Session <span className="text-orange-500">Types</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {sessionTypes.map((s) => (
                <div key={s.title} className="bg-white border border-slate-200 rounded-md p-6 hover:border-orange-400 hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide">{s.title}</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-orange-500 bg-orange-50 border border-orange-200 px-2 py-1 rounded-full flex-shrink-0 ml-2">
                      <Clock className="h-3 w-3" /> {s.duration}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mentor Cards */}
        <section id="mentors" className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Mentors</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase">
                Real Professionals. <span className="text-orange-500">Real Advice.</span>
              </h2>
              <p className="mt-3 text-sm text-slate-500 font-medium">Every mentor is a practising civil engineer with proven industry or exam experience.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mentors.map((m) => (
                <div key={m.name} className="bg-wix-gray border border-slate-200 rounded-md p-7 hover:border-orange-400 hover:shadow-md transition-all">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-14 h-14 bg-wix-dark rounded-md flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-lg font-extrabold text-white">{m.initials}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-display text-base font-extrabold text-wix-dark uppercase tracking-tight">{m.name}</p>
                          <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{m.role}</p>
                          <p className="text-[10px] text-slate-400 font-medium mt-0.5">{m.exp}</p>
                        </div>
                        <span className={`${m.tagColor} text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0`}>{m.tag}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {m.topics.map((t) => (
                      <span key={t} className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                      <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-orange-400" />{m.rating} Rating</div>
                      <div className="flex items-center gap-1"><Video className="h-3.5 w-3.5 text-slate-400" />{m.sessions} Sessions</div>
                    </div>
                    <a href="https://wa.me/917703977002" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-wix-dark hover:bg-orange-500 text-white font-bold px-4 py-2 text-[10px] uppercase tracking-widest rounded-md transition-all">
                      <Calendar className="h-3.5 w-3.5" /> Book Session
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing / CTA */}
        <section className="py-20 bg-wix-dark">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-3">Pricing</span>
            <h2 className="font-display text-3xl font-extrabold text-white uppercase mb-4">
              Session Pricing — <span className="text-orange-500">India's Lowest</span>
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-md p-8 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="text-center">
                  <p className="font-display text-4xl font-extrabold text-orange-400 mb-1">₹499</p>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">Single Session</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">One 45-minute video call</p>
                </div>
                <div className="text-center">
                  <p className="font-display text-4xl font-extrabold text-orange-400 mb-1">₹1,799</p>
                  <p className="text-xs font-bold text-white uppercase tracking-widest">4-Session Pack</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-1">Best for GATE / full guidance</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-slate-400 font-medium mb-4">Payment gateway launching soon. Book via WhatsApp now for immediate access.</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a href="https://wa.me/917703977002" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                    <MessageCircle className="h-4 w-4" /> Book via WhatsApp
                  </a>
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-slate-400 font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md cursor-not-allowed">
                    <Lock className="h-4 w-4" /> Online Payment Soon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
