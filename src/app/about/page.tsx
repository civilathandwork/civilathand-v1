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
  Shield,
  Cpu,
  Globe,
  Users,
  Award,
  TrendingUp,
  HardHat,
  Ruler,
  Building2,
  FileText,
  Layers,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Civil At Hand — India's Engineering & BIM Consultancy",
  description:
    "Civil At Hand is India's precision civil engineering consultancy. Licensed structural engineers, BIM specialists, and quantity surveyors delivering IS-code compliant structural design, BOQ estimation, and BIM LOD 400 coordination across India and globally.",
};

const milestones = [
  { year: "2024", title: "Founded", desc: "Started as a structural detailing studio serving local architects in Haryana, India." },
  { year: "2026", title: "Digital Tools", desc: "Released proprietary AI-powered calculation engines — concrete, steel, brick, cost estimation, and BOQ takeoff." },
  { year: "2026", title: "Global Delivery", desc: "Expanded to serve clients across India, Middle East, and Southeast Asia through a remote-first model." },
  { year: "2026", title: "Education Vertical", desc: "Launched Civil At Hand Education — offering courses, test series, and mentorship for civil engineering aspirants." },
];

const services = [
  { icon: Building2, title: "Structural Design", desc: "IS 456, IS 800, IS 1786 compliant RCC & steel structural design with drawings and calculations." },
  { icon: FileText, title: "BOQ Estimation", desc: "CPWD DSR 2023 based detailed bill of quantities with material takeoff and cost analysis." },
  { icon: Ruler, title: "Quantity Surveying", desc: "Accurate quantity calculation, rate analysis, and cost planning for all project types." },
  { icon: Layers, title: "BIM Services", desc: "LOD 300–400 BIM modeling, clash detection, 4D scheduling, and coordination reports." },
  { icon: HardHat, title: "PDF to AutoCAD", desc: "High-accuracy conversion of PDF drawings to fully dimensioned AutoCAD DWG files." },
  { icon: Globe, title: "Interior Design", desc: "Space planning, 3D visualization, and detailed interior drawings for residential and commercial spaces." },
];

const whyUs = [
  { icon: Shield, label: "IS Code Compliant", desc: "Every output validated against IS 456, IS 800, IS 1786, CPWD DSR 2023 before delivery." },
  { icon: Cpu, label: "AI-Powered Tools", desc: "Custom calculation engines reduce errors and turnaround time significantly." },
  { icon: Award, label: "Licensed Engineers", desc: "All structural outputs signed off by licensed, experienced civil engineers." },
  { icon: Users, label: "Client First", desc: "Milestone-based updates, transparent communication, dedicated support on every project." },
  { icon: TrendingUp, label: "24-72 Hr Delivery", desc: "Standard projects delivered in 1-3 business days with full technical accuracy." },
  { icon: Star, label: "21+ Projects", desc: "Trusted by 11+ clients across residential, commercial, and infrastructure sectors." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">

        {/* IDENTITY HERO */}
        <section className="relative bg-wix-dark overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                    Civil At Hand - Est. 2024
                  </span>
                </div>
                <h1 className="font-display text-5xl md:text-6xl font-extrabold text-white uppercase leading-tight tracking-tight">
                  India's Precision<br />
                  <span className="text-orange-500">Engineering</span><br />
                  Consultancy
                </h1>
                <p className="mt-6 text-sm text-slate-400 font-medium leading-relaxed max-w-lg">
                  We are a team of licensed structural engineers, BIM specialists, and quantity surveyors
                  delivering IS-code compliant engineering services to architects, developers, and infrastructure
                  firms across India and globally.
                </p>
                <div className="mt-10 flex flex-wrap gap-3">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all"
                  >
                    Our Services <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-bold px-6 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all"
                  >
                    Start a Project
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "21+", label: "Projects Delivered", sub: "Across India and globally" },
                  { value: "11+", label: "Clients Served", sub: "Architects, developers, EPC" },
                  { value: "2+", label: "Years of Expertise", sub: "Since 2024" },
                  { value: "24-72h", label: "Turnaround Time", sub: "Standard projects" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/5 border border-white/10 rounded-md p-6 hover:border-orange-500/40 transition-all"
                  >
                    <p className="font-display text-3xl font-extrabold text-white mb-1">{s.value}</p>
                    <p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{s.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE ARE + TIMELINE */}
        <section className="py-20 md:py-28 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Story</span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight mb-6">
                  From a Drafting Studio<br />to a <span className="text-orange-500">Full-Spectrum</span> Engineering Firm
                </h2>
                <div className="space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
                  <p>
                    Civil At Hand was founded in 2024 in Haryana, India, with a single purpose:
                    to deliver structurally precise, code-compliant engineering outputs at a pace
                    that modern construction projects demand.
                  </p>
                  <p>
                    What began as a two-person structural detailing studio grew into a full-spectrum
                    engineering consultancy. Today, our team includes licensed structural engineers,
                    BIM specialists, quantity surveyors, CAD drafters, and interior designers all
                    operating from a digital-first, remote-capable environment.
                  </p>
                  <p>
                    We have worked on high-rise residential towers, industrial sheds, government
                    infrastructure, commercial complexes, and villa communities across India, the
                    Middle East, and Southeast Asia. Every project receives the same standard:
                    IS code compliance, CPWD rate alignment, and engineer-reviewed deliverables.
                  </p>
                </div>
                <div className="mt-8 border-l-4 border-orange-500 pl-5 py-2">
                  <p className="font-display text-base font-extrabold text-wix-dark uppercase leading-snug">
                    "Precision engineering at the speed of digital innovation."
                  </p>
                  <p className="text-xs text-slate-400 font-medium mt-1">— Civil At Hand, Engineering Team</p>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-6">Our Journey</span>
                <div className="relative pl-8 space-y-0">
                  <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-orange-500 to-slate-200" />
                  {milestones.map((m, i) => (
                    <div key={m.year} className="relative pb-8 last:pb-0">
                      <div className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center ${i === milestones.length - 1 ? "bg-orange-500 border-orange-500" : "bg-white border-orange-400"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${i === milestones.length - 1 ? "bg-white" : "bg-orange-500"}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">{m.year}</span>
                          <span className="h-px flex-1 bg-slate-200" />
                        </div>
                        <p className="text-sm font-extrabold text-wix-dark font-display uppercase tracking-wide">{m.title}</p>
                        <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Capabilities</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight">
                Six Disciplines. <span className="text-orange-500">One Team.</span>
              </h2>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                Every service is delivered by specialists not generalists ensuring
                the technical accuracy your project demands.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-md overflow-hidden">
              {services.map((s) => (
                <div key={s.title} className="bg-white p-8 hover:bg-wix-gray transition-all group">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-all">
                    <s.icon className="h-5 w-5 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-wix-dark uppercase tracking-wide mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{s.desc}</p>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-4 hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CIVIL AT HAND */}
        <section className="py-20 md:py-28 bg-wix-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-3">Why Choose Us</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase leading-tight">
                The Standard We Hold <span className="text-orange-500">On Every Project</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyUs.map((w) => (
                <div key={w.label} className="bg-white/5 border border-white/10 rounded-md p-7 hover:border-orange-500/40 transition-all group">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-all">
                    <w.icon className="h-5 w-5 text-orange-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-white uppercase tracking-wide mb-2">{w.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUR TEAM */}
        <section className="py-20 md:py-28 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our People</span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight mb-6">
                  Engineers Who <span className="text-orange-500">Build With You</span>
                </h2>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6">
                  Our multidisciplinary team brings together 15+ engineering specialists covering
                  structural design, quantity surveying, BIM coordination, drafting, and project management.
                </p>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-8">
                  We work as an extension of your team not as a vendor. Every engineer assigned to
                  your project understands your drawings, your codes, and your deadlines.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { num: "15+", label: "Engineering Specialists" },
                    { num: "6", label: "Core Disciplines" },
                    { num: "IS/CPWD", label: "Code Standards" },
                    { num: "Pan India", label: "+ Global Clients" },
                  ].map((t) => (
                    <div key={t.label} className="bg-white border border-slate-200 rounded-md p-5">
                      <p className="font-display text-2xl font-extrabold text-orange-500 mb-1">{t.num}</p>
                      <p className="text-[10px] font-bold text-wix-dark uppercase tracking-widest">{t.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { role: "Structural Engineers", skills: ["RCC Design", "Steel Structure", "Foundation Design", "IS 456 / IS 800"], color: "bg-orange-500" },
                  { role: "BIM Specialists", skills: ["Revit Modelling", "LOD 400", "Clash Detection", "4D Scheduling"], color: "bg-slate-800" },
                  { role: "Quantity Surveyors", skills: ["BOQ Preparation", "CPWD DSR 2023", "Rate Analysis", "Cost Planning"], color: "bg-orange-400" },
                  { role: "CAD and Drafting Team", skills: ["AutoCAD", "PDF to DWG", "Shop Drawings", "Rebar Detailing"], color: "bg-slate-600" },
                ].map((team) => (
                  <div key={team.role} className="bg-white border border-slate-200 rounded-md p-5 flex items-start gap-4">
                    <div className={`w-1 self-stretch rounded-full ${team.color} flex-shrink-0`} />
                    <div>
                      <p className="text-xs font-extrabold text-wix-dark font-display uppercase tracking-wide mb-2">{team.role}</p>
                      <div className="flex flex-wrap gap-2">
                        {team.skills.map((sk) => (
                          <span key={sk} className="text-[10px] font-bold text-slate-500 bg-wix-gray border border-slate-200 px-2.5 py-1 rounded-full uppercase tracking-wide">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMPLIANCE STRIP */}
        <section className="py-10 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Our standards:</span>
              {["IS 456:2000", "IS 800:2007", "IS 1786:2008", "IS 1077:1992", "CPWD DSR 2023", "BIM LOD 400", "NBC 2016"].map((std) => (
                <div key={std} className="flex items-center gap-2 text-[11px] font-bold text-wix-dark">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-500" />
                  {std}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="py-20 md:py-24 bg-wix-gray">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-wix-dark rounded-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-orange-500 p-10 md:p-14">
                  <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest block mb-3">Get Started</span>
                  <h2 className="font-display text-3xl font-extrabold text-white uppercase leading-tight mb-4">
                    Ready to Work With Us?
                  </h2>
                  <p className="text-sm text-orange-100 font-medium leading-relaxed mb-8">
                    Share your project requirements and our engineering team will respond
                    within 24 hours with a detailed scope and proposal.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white hover:bg-wix-dark text-orange-500 hover:text-white font-bold px-7 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all"
                  >
                    Contact Us <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <div className="space-y-5">
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <Mail className="h-4 w-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Email</p>
                        <a href="mailto:info.civilathand@zohomail.in" className="font-medium hover:text-orange-400 transition-colors text-sm">
                          info.civilathand@zohomail.in
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <Phone className="h-4 w-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Phone / WhatsApp</p>
                        <a href="tel:+917703977002" className="font-medium hover:text-orange-400 transition-colors text-sm">
                          +91 770-39-770-02
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <div className="w-9 h-9 bg-white/5 border border-white/10 rounded-md flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-4 w-4 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Location</p>
                        <span className="font-medium text-sm">Haryana, India — Remote-first, Global Delivery</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-white/10">
                    <Link
                      href="/education"
                      className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 font-bold text-[11px] uppercase tracking-widest transition-all"
                    >
                      Explore Civil At Hand Education <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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
