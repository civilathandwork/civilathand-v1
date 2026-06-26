import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  ShieldCheck,
  Cpu,
  Globe,
  Users,
  Award,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Civil At Hand – Engineering Excellence Powered by Smart Automation",
  description:
    "Learn about Civil At Hand – India's precision civil engineering and BIM consultancy. Our team of licensed structural engineers, BIM specialists, and quantity surveyors deliver enterprise-grade solutions across India and globally.",
};

const stats = [
  { value: "500+", label: "Projects Delivered" },
  { value: "150+", label: "Clients Served" },
  { value: "8+", label: "Years of Expertise" },
  { value: "15+", label: "Engineering Specialists" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Precision & Accuracy",
    desc: "Every drawing, estimate, and BIM model is validated against IS codes, CPWD DSR standards, and client specifications before delivery.",
  },
  {
    icon: Cpu,
    title: "Smart Automation",
    desc: "We use AI-powered tools, custom calculation engines, and digital workflows to reduce turnaround time and eliminate human error.",
  },
  {
    icon: Globe,
    title: "Global Standards, Indian Expertise",
    desc: "Our engineers combine international best practices with a deep understanding of Indian regulatory frameworks, market rates, and site conditions.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    desc: "From first consultation to final delivery, we maintain transparent communication, milestone-based updates, and dedicated support for every engagement.",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    desc: "Our structural design and BIM deliverables meet LOD 300–400 standards and are prepared by licensed engineers with proven industry track records.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Innovation",
    desc: "We invest in emerging technologies — including BIM automation, PDF-to-CAD conversion, and AI quantity takeoff — to stay ahead of industry demands.",
  },
];

const team = [
  {
    name: "Ar. Rajiv Mehta",
    role: "Founder & Principal Engineer",
    bio: "Structural engineer with 12+ years in high-rise design, industrial sheds, and BIM coordination across residential and infrastructure projects.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Priya Nair",
    role: "Head of BIM & Coordination",
    bio: "Certified BIM specialist with expertise in LOD 400 modelling, clash detection, and multi-discipline coordination using Revit and Navisworks.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300",
  },
  {
    name: "Suresh Kumar",
    role: "Senior Quantity Surveyor",
    bio: "8+ years in BOQ preparation, CPWD DSR rate analysis, and cost planning for commercial, residential, and government infrastructure projects.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-wix-gray">
      <Header />

      <main className="flex-grow">

        {/* ── Hero / Page Header ── */}
        <section className="bg-wix-dark text-white py-20 md:py-28 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-3">
                Who We Are
              </span>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight uppercase leading-tight">
                Engineering{" "}
                <span className="text-orange-500 font-black">Excellence</span>
                <br />
                Built On Precision
              </h1>
              <p className="mt-6 text-base text-slate-300 font-medium leading-relaxed max-w-2xl">
                Civil At Hand is India's dedicated civil engineering and BIM consultancy — delivering structural design, 
                quantity estimation, BOQ takeoffs, and digital drafting services to architects, developers, and infrastructure firms.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/services/all-services"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-all"
                >
                  Our Services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-transparent border border-white/30 hover:border-white text-white font-bold px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-all"
                >
                  Contact Us <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Strip ── */}
        <section className="bg-orange-500 py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-extrabold tracking-tight">{s.value}</p>
                  <p className="text-xs font-bold uppercase tracking-widest mt-1 text-orange-100">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission & Story ── */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-3">
                  Our Story
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-wix-dark uppercase leading-tight">
                  From Blueprint to{" "}
                  <span className="text-orange-500">Reality</span>
                </h2>
                <div className="mt-6 space-y-4 text-sm text-slate-600 leading-relaxed font-medium">
                  <p>
                    Civil At Hand was founded with one clear mission: to make world-class civil engineering 
                    services accessible, affordable, and fast — without compromising on technical accuracy 
                    or IS code compliance.
                  </p>
                  <p>
                    We began as a structural detailing studio serving local architects in India. Over eight 
                    years, we have grown into a full-spectrum engineering consultancy — serving developers, 
                    EPC contractors, and architectural firms across India, the Middle East, and Southeast Asia.
                  </p>
                  <p>
                    Today, our team of licensed structural engineers, BIM specialists, quantity surveyors, 
                    and CAD drafters works from a digital-first environment — combining engineering knowledge 
                    with smart automation tools to deliver precise, audit-ready outputs on every project.
                  </p>
                </div>
                <div className="mt-8 space-y-3">
                  {[
                    "IS Code & CPWD DSR 2023 Compliant Deliverables",
                    "Licensed Structural Engineers on Every Project",
                    "BIM LOD 300–400 Coordination & Clash Detection",
                    "AI-Powered BOQ & Quantity Takeoff Tools",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="bg-wix-dark rounded-md overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800"
                    alt="Civil engineering blueprints and structural drawings"
                    className="w-full h-80 object-cover opacity-80"
                  />
                  <div className="p-8">
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Our Mission</p>
                    <p className="text-white font-display text-lg font-extrabold uppercase leading-snug">
                      "To deliver engineering precision at the speed of digital innovation."
                    </p>
                    <p className="mt-3 text-sm text-slate-400 font-medium">
                      — Civil At Hand, Engineering Team
                    </p>
                  </div>
                </div>
                {/* Accent block */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-orange-500 rounded-md -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-20 md:py-28 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-3">
                What Drives Us
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-wix-dark uppercase">
                Our Core <span className="text-orange-500">Values</span>
              </h2>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                Every project we take on is guided by these six principles — ensuring consistent quality, 
                transparency, and results for our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="bg-white border border-slate-200 rounded-md p-7 hover:border-orange-400 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors">
                    <v.icon className="h-5 w-5 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-wix-dark uppercase tracking-wide mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Team ── */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-3">
                The Experts
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-wix-dark uppercase">
                Meet Our <span className="text-orange-500">Leadership</span>
              </h2>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                Our senior team brings decades of combined experience in structural engineering, BIM, 
                quantity surveying, and construction management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="bg-wix-gray border border-slate-200 rounded-md overflow-hidden hover:border-orange-400 hover:shadow-md transition-all group"
                >
                  <div className="h-56 overflow-hidden bg-slate-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">
                      {member.role}
                    </p>
                    <h3 className="font-display font-extrabold text-base text-wix-dark uppercase tracking-wide mb-3">
                      {member.name}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Location & Quick Contact ── */}
        <section className="py-20 md:py-28 bg-wix-dark text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-3">
                  Find Us
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase">
                  Based in <span className="text-orange-500">India</span>,<br />Serving Globally
                </h2>
                <p className="mt-5 text-sm text-slate-300 font-medium leading-relaxed">
                  Our engineering team operates from India, delivering projects for clients across the country and internationally. 
                  We work fully online — making collaboration seamless regardless of your location.
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <span className="font-medium">India — Remote-first, serving pan-India & global clients</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <a href="mailto:info@civilathand.in" className="font-medium hover:text-orange-400 transition-colors">
                      info@civilathand.in
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                    <span className="font-medium">Available via WhatsApp & Client Portal</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-md p-8 md:p-10">
                <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2">Ready to Start?</p>
                <h3 className="font-display text-xl font-extrabold text-white uppercase mb-4">
                  Let's Work Together
                </h3>
                <p className="text-sm text-slate-300 font-medium mb-8 leading-relaxed">
                  Submit your project requirements and our engineering team will reach out within 24 hours 
                  with a detailed scope and proposal.
                </p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-4 text-xs uppercase tracking-widest rounded-md transition-all"
                  >
                    Start a Project <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services/all-services"
                    className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white text-white font-bold px-6 py-4 text-xs uppercase tracking-widest rounded-md transition-all"
                  >
                    <Briefcase className="h-4 w-4" />
                    View All Services
                  </Link>
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
