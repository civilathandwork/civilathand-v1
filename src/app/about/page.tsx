import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/data/site";
import {
  ArrowRight, ShieldCheck, Globe, Clock, BadgeIndianRupee,
  Target, Eye, Building2, FileText, Ruler, Layers, FileType2,
  GraduationCap, CheckCircle2, MessageCircle, Phone, Mail, MapPin,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Civil At Hand — Civil Engineering Design & Consultancy",
  description:
    "Civil At Hand is an engineering-led civil design and consultancy delivered online across India — structural design, BOQ estimation, BIM modelling, quantity surveying and PDF-to-CAD — with code-compliant accuracy, plus a free GATE / ESE / SSC-JE test series.",
  alternates: { canonical: `${SITE.url}/about` },
};

const pillars = [
  { icon: ShieldCheck, title: "IS-Code Compliant", desc: "Designs and estimates follow Indian Standard codes for safe, accurate, defensible output." },
  { icon: Globe, title: "PAN-India, Online", desc: "Serving builders, architects and contractors anywhere — fully remote, no location limits." },
  { icon: Clock, title: "Fast Turnaround", desc: "Drawing vectorization and detailing typically delivered in 24–48 hours." },
  { icon: BadgeIndianRupee, title: "Transparent Payments", desc: "Pay project-wise with clear milestones — no hidden costs, no surprises." },
];

const services = [
  { icon: Building2, title: "Structural Design", desc: "RCC and steel detailing, frame analysis and code-compliant structural drawings." },
  { icon: FileText, title: "BOQ Estimation", desc: "Detailed bills of quantities and cost projections with IS-code standard accuracy." },
  { icon: Ruler, title: "Quantity Surveying", desc: "Pre-construction quantity audits, concrete takeoffs and rebar scheduling." },
  { icon: Layers, title: "BIM Modelling", desc: "Coordinated BIM models and MEP coordination for clash-free execution." },
  { icon: FileType2, title: "PDF to AutoCAD", desc: "Clean vectorization of blueprints into fully editable DWG / DXF files." },
  { icon: GraduationCap, title: "Education Vertical", desc: "Free GATE, ESE and SSC-JE test series in a real exam interface with solutions." },
];

const values = [
  { title: "Accuracy First", desc: "Every number is traceable to a code clause or a standard method — not guesswork." },
  { title: "Honest & Transparent", desc: "Clear scope, clear pricing, realistic timelines. We say what we can deliver, and deliver it." },
  { title: "Client-Led", desc: "We work to your drawings, your standards and your deadlines — with revisions until it's right." },
  { title: "Always Improving", desc: "We build our own tools and keep refining them so you get faster, sharper output." },
];

const steps = [
  { n: "01", title: "Share Your Requirement", desc: "Send drawings, drafts or a brief over WhatsApp or email." },
  { n: "02", title: "Review & Quote", desc: "We confirm scope, timeline and a transparent, milestone-based price." },
  { n: "03", title: "Design & Deliver", desc: "Our engineering desk produces code-compliant drawings, BOQs or models." },
  { n: "04", title: "Revisions & Support", desc: "We refine until it's right and stay available for follow-up changes." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">

        {/* ───────── HERO ───────── */}
        <section className="relative bg-wix-dark overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-24 md:py-28 relative z-10">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-5">
              <ShieldCheck className="h-3.5 w-3.5" /> About Civil At Hand
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white uppercase leading-[1.05] mb-6 max-w-3xl">
              Engineering, <span className="text-orange-500">Delivered with Precision</span>
            </h1>
            <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed max-w-2xl mb-8">
              Civil At Hand is a civil engineering design and consultancy built for the modern,
              remote-first construction industry. We turn drawings, drafts and ideas into
              code-compliant structural designs, accurate estimates and coordinated BIM models —
              delivered online, anywhere in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-all">
                Get Consultancy <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/services"
                className="inline-flex items-center justify-center gap-2 border border-white/25 text-white hover:bg-white/10 font-bold px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-all">
                Explore Services
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── PILLARS ───────── */}
        <section className="py-16 md:py-20 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {pillars.map((p) => (
                <div key={p.title} className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="w-11 h-11 bg-orange-500/10 rounded-md flex items-center justify-center mb-4">
                    <p.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <h3 className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide mb-1">{p.title}</h3>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── WHO WE ARE ───────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Who We Are</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight mb-6">
                A Modern Engineering Desk for Builders & Architects
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Founded in {SITE.foundingYear} in Haryana, India, Civil At Hand began as a structural
                detailing studio for local architects. Today we work with builders, contractors and
                design firms across the country, handling the technical heavy-lifting so they can move
                projects forward faster.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Our work is grounded in Indian Standard codes and practical site experience. We pair
                that engineering discipline with our own digital tools — calculators, estimators and
                takeoff engines — to deliver output that is fast, consistent and dependable.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="space-y-5">
              <div className="bg-wix-dark rounded-xl p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-5 w-5 text-orange-500" />
                  <h3 className="font-display text-lg font-extrabold text-white uppercase tracking-wide">Our Mission</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  To make professional, code-compliant civil engineering accessible to every builder
                  and architect — quickly, transparently and online — without compromising on accuracy.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-orange-500" />
                <div className="flex items-center gap-3 mb-3">
                  <Eye className="h-5 w-5 text-orange-500" />
                  <h3 className="font-display text-lg font-extrabold text-wix-dark uppercase tracking-wide">Our Vision</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  To become India's most trusted online civil engineering partner — and to grow the
                  next generation of engineers through our free GATE, ESE and SSC-JE education vertical.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ───────── WHAT WE DO ───────── */}
        <section className="py-16 md:py-20 bg-wix-gray border-y border-slate-200">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">What We Do</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase">End-to-End Engineering Services</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map((s) => (
                <div key={s.title} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:border-orange-300 transition-all">
                  <div className="w-11 h-11 bg-orange-500/10 rounded-md flex items-center justify-center mb-4">
                    <s.icon className="h-5 w-5 text-orange-500" />
                  </div>
                  <h3 className="font-display text-base font-extrabold text-wix-dark uppercase tracking-wide mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-bold text-xs uppercase tracking-widest">
                View All Services <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ───────── VALUES ───────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">What We Stand For</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase">Our Values</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              {values.map((v) => (
                <div key={v.title} className="flex items-start gap-4 bg-wix-gray border border-slate-200 rounded-xl p-6">
                  <CheckCircle2 className="h-6 w-6 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-base font-extrabold text-wix-dark uppercase tracking-wide mb-1">{v.title}</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── HOW WE WORK ───────── */}
        <section className="py-16 md:py-20 bg-wix-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-3">Simple Process</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase">How We Work</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((s) => (
                <div key={s.n} className="bg-white/[0.04] border border-white/10 rounded-xl p-6">
                  <div className="font-display text-3xl font-extrabold text-orange-500 mb-3">{s.n}</div>
                  <h3 className="font-display text-sm font-extrabold text-white uppercase tracking-wide mb-2">{s.title}</h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── EDUCATION BAND ───────── */}
        <section className="py-14 bg-orange-500">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <GraduationCap className="h-10 w-10 text-white flex-shrink-0" />
              <div>
                <h2 className="font-display text-xl md:text-2xl font-extrabold text-white uppercase tracking-tight">Free Civil Engineering Test Series</h2>
                <p className="text-sm text-white/90 font-medium mt-1">Full-length GATE, ESE and SSC-JE mock tests in a real exam interface — with solutions.</p>
              </div>
            </div>
            <Link href="/education" className="inline-flex items-center justify-center gap-2 bg-white text-orange-600 hover:bg-slate-100 font-bold px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-all flex-shrink-0">
              Explore Education <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ───────── CONTACT CTA ───────── */}
        <section className="py-16 md:py-24 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Let's Build Together</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase mb-4">Have a Project in Mind?</h2>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
              Share your architectural drafts, municipal drawings or a design concept, and connect
              with our project engineering desk for immediate guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-all">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-wix-dark hover:bg-black text-white font-bold px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-all">
                Contact the Engineering Desk
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 font-medium">
              <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 hover:text-orange-600 transition-colors">
                <Phone className="h-4 w-4 text-orange-500" /> {SITE.phoneDisplay}
              </a>
              <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-2 hover:text-orange-600 transition-colors">
                <Mail className="h-4 w-4 text-orange-500" /> {SITE.email}
              </a>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" /> {SITE.address.region}, {SITE.address.countryName}
              </span>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
