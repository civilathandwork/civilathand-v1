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
  Target,
  Eye,
  Heart,
  Zap,
  Clock,
  Briefcase,
  Code2,
  PenTool,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Civil At Hand — India's Engineering & BIM Consultancy",
  description:
    "Civil At Hand is India's precision civil engineering consultancy. Licensed structural engineers, BIM specialists, and quantity surveyors delivering IS-code compliant structural design, BOQ estimation, and BIM LOD 400 coordination across India and globally.",
};

const milestones = [
  { year: "2024", title: "Founded", desc: "Started as a structural detailing studio serving local architects in Haryana, India." },
  { year: "2025", title: "Digital Tools Launched", desc: "Released proprietary AI-powered calculation engines — concrete, steel, brick, cost estimation, and BOQ takeoff." },
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
  { icon: Star, label: "15+ Projects", desc: "Trusted by 10+ clients across residential, commercial, and infrastructure sectors." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">

        {/* HERO BANNER - Centered like Homepage */}
        <section className="relative min-h-[70vh] flex items-center justify-center bg-wix-dark text-white overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1600" 
              alt="Civil Engineering" 
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-wix-dark/70"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">
                  Civil At Hand — Est. 2024
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-tight tracking-tight">
                About <span className="text-orange-500">Civil At Hand</span>
              </h1>

              <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
                India's premier civil engineering consultancy — delivering IS-code compliant structural design, 
                BOQ estimation, BIM coordination, and AI-powered quantity surveying to architects, developers, 
                and contractors across India and globally.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  href="/services/all-services"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all"
                >
                  Explore Services <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all"
                >
                  Start a Project
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS BANNER */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-x divide-slate-200">
              {[
                { value: "15+", label: "Projects Delivered", sub: "Residential, Commercial, Industrial" },
                { value: "10+", label: "Clients Served", sub: "Architects, Developers, EPC Firms" },
                { value: "2+", label: "Years of Expertise", sub: "Since 2024 — Fast Growth" },
                { value: "24-72h", label: "Turnaround Time", sub: "Standard Project Delivery" },
              ].map((s, idx) => (
                <div key={idx} className="px-6 text-center">
                  <p className="font-display text-3xl font-extrabold text-orange-500 mb-1">{s.value}</p>
                  <p className="text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-1">{s.label}</p>
                  <p className="text-[9px] text-slate-400 font-medium">{s.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMPANY STORY */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Story</span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight mb-6">
                  How <span className="text-orange-500">Civil At Hand</span> Was Born
                </h2>
                <div className="space-y-4 text-sm text-slate-600 font-medium leading-relaxed">
                  <p>
                    Civil At Hand was founded in 2024 by a team of experienced civil engineers who recognized a critical gap in the Indian construction industry: <strong>the lack of fast, accurate, and code-compliant engineering design services</strong> accessible to architects, developers, and contractors.
                  </p>
                  <p>
                    What started as a small structural detailing studio in Haryana has evolved into a full-spectrum engineering consultancy with a digital-first approach. Our founders—licensed structural engineers with years of experience in residential, commercial, and infrastructure projects—decided to build a firm that combines <strong>technical excellence with operational speed</strong>.
                  </p>
                  <p>
                    Today, Civil At Hand serves clients across India, the Middle East, and Southeast Asia, delivering everything from structural design and BOQ estimation to BIM LOD 400 coordination and AI-powered quantity takeoffs.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full border border-orange-100">
                      🚀 Founded 2024
                    </span>
                    <span className="text-[10px] font-bold bg-slate-50 text-slate-600 px-3 py-1.5 rounded-full border border-slate-200">
                      📍 Haryana, India
                    </span>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full border border-blue-100">
                      🌐 Global Delivery
                    </span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-wix-gray rounded-md p-8 border border-slate-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 bg-orange-500 rounded-md flex items-center justify-center">
                      <Heart className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Founded With Passion</p>
                      <p className="text-sm font-extrabold text-wix-dark uppercase">2024 — Haryana, India</p>
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-orange-500 pl-5 py-2">
                    <p className="font-display text-base font-extrabold text-wix-dark uppercase leading-snug">
                      "We built Civil At Hand because we believed that engineering design should be both <span className="text-orange-500">structurally perfect</span> and <span className="text-orange-500">delivered on time</span>."
                    </p>
                    <p className="text-xs text-slate-400 font-medium mt-2">— Founders, Civil At Hand</p>
                  </blockquote>
                  <div className="mt-6 pt-6 border-t border-slate-200 flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">AK</div>
                      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">RS</div>
                      <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">PM</div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Founding Team</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION, VISION, WHY WE STARTED */}
        <section className="py-20 md:py-28 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Purpose</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight">
                Mission. Vision. <span className="text-orange-500">Why We Exist.</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white border border-slate-200 rounded-md p-8 hover:border-orange-500/40 transition-all shadow-sm group">
                <div className="w-14 h-14 bg-orange-500/10 rounded-md flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-all">
                  <Target className="h-7 w-7 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-wix-dark uppercase mb-3">Our Mission</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  To deliver <strong>precision civil engineering solutions</strong> that are structurally sound, code-compliant, and delivered at the speed of modern construction. We empower architects, developers, and contractors with <strong>AI-powered design tools, licensed engineering oversight, and seamless digital delivery</strong>.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-md p-8 hover:border-orange-500/40 transition-all shadow-sm group">
                <div className="w-14 h-14 bg-orange-500/10 rounded-md flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-all">
                  <Eye className="h-7 w-7 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-wix-dark uppercase mb-3">Our Vision</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  To become <strong>India's most trusted remote engineering consultancy</strong>, known for technical accuracy, IS-code compliance, and rapid turnaround. We envision a future where every construction project—from residential villas to industrial complexes—has access to <strong>world-class engineering design</strong> regardless of location.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-md p-8 hover:border-orange-500/40 transition-all shadow-sm group">
                <div className="w-14 h-14 bg-orange-500/10 rounded-md flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-all">
                  <Zap className="h-7 w-7 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-extrabold text-lg text-wix-dark uppercase mb-3">Why We Started</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  We started Civil At Hand because we saw <strong>too many projects delayed</strong> by slow engineering reviews, <strong>too many errors</strong> caused by manual calculations, and <strong>too many firms struggling</strong> to find reliable, code-compliant engineering partners. We built a solution that is <strong>fast, accurate, and accessible</strong> to everyone.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* OUR TEAM */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our People</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight">
                Meet the <span className="text-orange-500">Team</span>
              </h2>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                Our multidisciplinary team brings together 12+ engineering specialists covering
                structural design, quantity surveying, BIM coordination, drafting, and project management.
                We work as an extension of your team — not as a vendor.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Team Roles */}
              <div className="space-y-4">
                {[
                  { role: "Structural Engineers", skills: ["RCC Design", "Steel Structure", "Foundation Design", "IS 456 / IS 800"], color: "bg-orange-500", count: "4 Engineers" },
                  { role: "BIM Specialists", skills: ["Revit Modelling", "LOD 300-400", "Clash Detection", "Coordination"], color: "bg-slate-800", count: "3 Specialists" },
                  { role: "Quantity Surveyors", skills: ["BOQ Preparation", "Rate Analysis", "Cost Planning", "Material Takeoff"], color: "bg-orange-400", count: "2 Surveyors" },
                  { role: "CAD & Drafting Team", skills: ["AutoCAD", "PDF to DWG", "Shop Drawings", "Rebar Detailing"], color: "bg-slate-600", count: "3 Drafters" },
                ].map((team) => (
                  <div key={team.role} className="bg-white border border-slate-200 rounded-md p-5 flex items-start gap-4 hover:border-orange-500/40 transition-all shadow-sm">
                    <div className={`w-1 self-stretch rounded-full ${team.color} flex-shrink-0`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-extrabold text-wix-dark font-display uppercase tracking-wide">{team.role}</p>
                        <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full">{team.count}</span>
                      </div>
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

              {/* Leadership & Experience */}
              <div className="space-y-6">
                <div className="bg-wix-dark rounded-md p-8 text-white">
                  <h3 className="font-display font-extrabold text-lg text-white uppercase mb-4">Leadership Team</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-md flex items-center justify-center">
                        <Users className="h-6 w-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-white uppercase">Founders</p>
                        <p className="text-xs text-slate-400">Licensed Structural Engineers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-md flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-white uppercase">Technical Team</p>
                        <p className="text-xs text-slate-400">15+ Years Combined Experience</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-500/20 rounded-md flex items-center justify-center">
                        <Globe className="h-6 w-6 text-orange-400" />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-white uppercase">Global Delivery Team</p>
                        <p className="text-xs text-slate-400">Remote-first, Pan-India + International</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-wix-gray border border-slate-200 rounded-md p-6">
                  <h3 className="font-display font-extrabold text-sm text-wix-dark uppercase mb-4">Team Experience</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-md p-4 text-center">
                      <p className="font-display text-2xl font-extrabold text-orange-500">15+</p>
                      <p className="text-[10px] font-bold text-wix-dark uppercase tracking-widest">Combined Years</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-md p-4 text-center">
                      <p className="font-display text-2xl font-extrabold text-orange-500">15+</p>
                      <p className="text-[10px] font-bold text-wix-dark uppercase tracking-widest">Projects Executed</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-md p-4 text-center">
                      <p className="font-display text-2xl font-extrabold text-orange-500">10+</p>
                      <p className="text-[10px] font-bold text-wix-dark uppercase tracking-widest">Cities Served</p>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-md p-4 text-center">
                      <p className="font-display text-2xl font-extrabold text-orange-500">6</p>
                      <p className="text-[10px] font-bold text-wix-dark uppercase tracking-widest">Core Disciplines</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & PROJECT TYPES */}
        <section className="py-20 md:py-28 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Experience</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight">
                Projects We've <span className="text-orange-500">Delivered</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Residential Projects", count: "6+", desc: "Structural design for villas, apartments, and high-rise towers across India." },
                { title: "Commercial Complexes", count: "4+", desc: "BIM coordination and structural detailing for malls, offices, and mixed-use." },
                { title: "Industrial Structures", count: "3+", desc: "PEB sheds, warehouses, and factory buildings with steel and RCC systems." },
                { title: "Infrastructure Projects", count: "2+", desc: "Bridge foundations, retaining walls, and water treatment plant structures." },
              ].map((exp) => (
                <div key={exp.title} className="bg-white border border-slate-200 rounded-md p-6 hover:border-orange-500/40 transition-all shadow-sm group">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-extrabold text-wix-dark font-display uppercase">{exp.title}</h3>
                    <span className="text-[10px] font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{exp.count}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STANDARDS & CODES WE FOLLOW */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Standards</span>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-wix-dark uppercase leading-tight">
                Codes & Standards We <span className="text-orange-500">Follow</span>
              </h2>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {["IS 456:2000", "IS 800:2007", "IS 1786:2008", "IS 1077:1992", "CPWD DSR 2023", "BIM LOD 400", "NBC 2016", "IS 1893", "IS 6403"].map((std) => (
                <div key={std} className="bg-white border border-slate-200 rounded-full px-4 py-2 flex items-center gap-2 text-[11px] font-bold text-wix-dark hover:border-orange-500/40 transition-all shadow-sm">
                  <CheckCircle2 className="h-3.5 w-3.5 text-orange-500" />
                  {std}
                </div>
              ))}
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
                    href="/services/all-services"
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

        {/* JOURNEY TIMELINE */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Evolution</span>
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
                    We have worked on residential towers, industrial sheds, commercial complexes,
                    and villa communities across India. Every project receives the same standard:
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
