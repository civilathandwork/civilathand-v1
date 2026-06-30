import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Briefcase, CheckCircle2, ArrowRight, ExternalLink, Clock,
  TrendingUp, Users, HeartHandshake, GraduationCap, MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Work With Us — Careers at Civil At Hand | Civil Engineering Jobs & Internships",
  description:
    "Join Civil At Hand. We're looking for civil engineers, CAD/BIM specialists, quantity surveyors, and interns who care about quality. Apply online in 2 minutes.",
};

// One place to change the careers form link.
const CAREERS_FORM_URL = "https://forms.gle/oBZ9ced7fS23jYfH9";

const roles = [
  { title: "Structural Design Engineer", type: "Full-time / Freelance", desc: "RCC & steel design and detailing to IS codes, using STAAD Pro / ETABS." },
  { title: "CAD / BIM Specialist", type: "Full-time / Freelance", desc: "AutoCAD drafting, Revit BIM modelling, and PDF-to-CAD conversions." },
  { title: "Quantity Surveyor / Estimator", type: "Full-time / Freelance", desc: "BOQ preparation, quantity take-offs, and rate analysis." },
  { title: "Civil Engineering Intern", type: "Internship", desc: "Learn on real projects with mentorship — drafting, estimation, and BIM basics." },
];

const whyJoin = [
  { icon: TrendingUp, title: "Real Project Work", desc: "Work on live civil engineering projects, not just theory." },
  { icon: GraduationCap, title: "Learn & Grow", desc: "Mentorship from experienced engineers and exposure to modern tools." },
  { icon: MapPin, title: "Work Online", desc: "Remote-friendly roles — contribute from anywhere in India." },
  { icon: HeartHandshake, title: "Quality Culture", desc: "We value accuracy, honesty, and doing engineering the right way." },
];

const steps = [
  { n: "1", t: "Fill the form", d: "Tell us about yourself and attach your resume — it takes about 2 minutes." },
  { n: "2", t: "We review it", d: "If your skills match an open role, our team reaches out to you." },
  { n: "3", t: "Quick chat", d: "A short call or task to understand your strengths and goals." },
];

export default function WorkWithUsPage() {
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
              <Briefcase className="h-3.5 w-3.5" /> Careers at Civil At Hand
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white uppercase leading-tight mb-5">
              Build Your Career <span className="text-orange-500">With Us</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed mb-9 max-w-2xl mx-auto">
              We're a growing civil engineering design firm looking for people who care about quality work — engineers, CAD/BIM specialists, estimators, and interns. If that's you, we'd love to hear from you.
            </p>
            <a href={CAREERS_FORM_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-[12px] uppercase tracking-widest rounded-md transition-all">
              <Briefcase className="h-4 w-4" /> Apply Now <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* Why join */}
        <section className="py-16 md:py-20 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Why Join</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">Why Work <span className="text-orange-500">With Us</span></h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {whyJoin.map((w) => (
                <div key={w.title} className="bg-white border border-slate-200 rounded-lg p-6 text-center hover:border-orange-400 transition-all">
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

        {/* Open roles */}
        <section className="py-16 md:py-20 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Open Positions</span>
              <h2 className="font-display text-3xl font-extrabold text-wix-dark uppercase">Roles We're <span className="text-orange-500">Hiring For</span></h2>
              <p className="mt-3 text-sm text-slate-500 font-medium">Don't see your exact role? Apply anyway — we're always glad to meet good people.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {roles.map((r) => (
                <div key={r.title} className="bg-wix-gray border border-slate-200 rounded-lg p-6 hover:border-orange-400 hover:shadow-md transition-all flex flex-col">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-base font-extrabold text-wix-dark uppercase tracking-tight">{r.title}</h3>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-orange-600 bg-orange-50 border border-orange-200 px-2 py-1 rounded-full flex-shrink-0 uppercase tracking-widest">
                      <Clock className="h-3 w-3" /> {r.type}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 flex-1">{r.desc}</p>
                  <a href={CAREERS_FORM_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest">
                    Apply for this role <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to apply */}
        <section className="py-16 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Simple Process</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-wix-dark uppercase">How to Apply</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {steps.map((s) => (
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

        {/* Application form */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Apply Now</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-wix-dark uppercase mb-2">
                Fill The <span className="text-orange-500">Application Form</span>
              </h2>
              <p className="text-sm text-slate-500 font-medium">It takes about 2 minutes. Make sure to add your resume link.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 bg-wix-gray">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-orange-500" />
                  <p className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide">Job Application</p>
                </div>
                <a href={CAREERS_FORM_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-widest">
                  Open in new tab <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <iframe
                src={CAREERS_FORM_URL}
                title="Civil At Hand — Job Application Form"
                className="w-full"
                style={{ minHeight: 720, border: 0 }}
                loading="lazy"
              >
                Loading…
              </iframe>
              <div className="px-5 py-3 border-t border-slate-100 bg-wix-gray text-center">
                <p className="text-[11px] text-slate-500 font-medium">
                  Form not showing?{" "}
                  <a href={CAREERS_FORM_URL} target="_blank" rel="noopener noreferrer" className="text-orange-600 font-bold underline">
                    Tap here to open it.
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a href={CAREERS_FORM_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all">
                <Users className="h-4 w-4" /> Submit Your Application
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
