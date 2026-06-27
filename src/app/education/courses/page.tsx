import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  BookOpen, CheckCircle2, ArrowRight, Clock, Star,
  Lock, GraduationCap, Play, MessageCircle, Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Civil Engineering Software Courses | AutoCAD, Revit, STAAD, ETABS — Civil At Hand Education",
  description:
    "Practical civil engineering software courses — AutoCAD, Revit Structure, STAAD Pro, ETABS, MS Project. Project-based, taught by working professionals, at India's lowest price. Civil At Hand Education.",
};

const courses = [
  {
    name: "AutoCAD for Civil Engineers",
    sub: "2D Drafting + 3D Civil Basics",
    status: "launching-soon",
    badge: "Most Demanded",
    badgeColor: "bg-orange-500",
    duration: "20 hours",
    level: "Beginner to Advanced",
    price: "₹799",
    desc: "Master AutoCAD from scratch — floor plans, site layouts, structural drawings, rebar detailing, and 3D basics. Learn the exact workflows used in real civil engineering offices.",
    outcomes: [
      "Draw civil drawings from scratch",
      "Site plans, floor plans, structural drawings",
      "Rebar detailing and BOQ extraction",
      "Dimension, annotation, plotting to PDF",
      "Industry-standard layer and file management",
    ],
  },
  {
    name: "Revit Structure — BIM Modelling",
    sub: "Structural BIM from Scratch",
    status: "launching-soon",
    badge: "High Demand",
    badgeColor: "bg-slate-700",
    duration: "25 hours",
    level: "Beginner to Intermediate",
    price: "₹1,199",
    desc: "Learn Revit Structure used in real BIM projects. Model columns, beams, slabs, foundations, and generate structural drawings automatically — with full project walkthrough.",
    outcomes: [
      "Set up Revit Structure project templates",
      "Model RCC and steel structural elements",
      "Generate structural drawings from BIM",
      "Create schedules and quantities from model",
      "Basic clash detection with Navisworks",
    ],
  },
  {
    name: "STAAD Pro — Structural Analysis",
    sub: "Analysis & Design of Structures",
    status: "coming-soon",
    badge: "Coming Soon",
    badgeColor: "bg-emerald-600",
    duration: "18 hours",
    level: "Beginner to Intermediate",
    price: "₹999",
    desc: "Learn STAAD Pro for RCC and steel structural analysis. Model frames, apply loads per IS codes, run analysis, and generate design outputs used in real engineering projects.",
    outcomes: [
      "Build structural models in STAAD Pro",
      "Apply IS 875 dead, live, and wind loads",
      "Run structural analysis and read results",
      "Design beams, columns, slabs per IS 456",
      "Generate STAAD design reports",
    ],
  },
  {
    name: "ETABS — Building Design",
    sub: "Seismic Analysis & RCC Design",
    status: "coming-soon",
    badge: "Coming Soon",
    badgeColor: "bg-emerald-600",
    duration: "20 hours",
    level: "Intermediate",
    price: "₹1,099",
    desc: "ETABS is the industry standard for high-rise building analysis. Learn modelling, seismic design per IS 1893, response spectrum analysis, and design of structural members.",
    outcomes: [
      "Model multi-storey buildings in ETABS",
      "Apply IS 1893 seismic loads",
      "Run response spectrum analysis",
      "Design RCC members per IS 456",
      "Generate professional design reports",
    ],
  },
  {
    name: "MS Project for Construction",
    sub: "Planning, Scheduling & Monitoring",
    status: "coming-soon",
    badge: "Coming Soon",
    badgeColor: "bg-emerald-600",
    duration: "10 hours",
    level: "Beginner",
    price: "₹499",
    desc: "Construction planning made practical. Learn to create project schedules, Gantt charts, critical path analysis, resource management, and progress tracking using MS Project.",
    outcomes: [
      "Create a complete construction schedule",
      "Build WBS and assign resources",
      "Identify critical path and float",
      "Track actual vs planned progress",
      "Generate standard project reports",
    ],
  },
  {
    name: "Civil Engineering Interview Prep",
    sub: "500+ Questions + Model Answers",
    status: "launching-soon",
    badge: "New",
    badgeColor: "bg-orange-400",
    duration: "Self-paced",
    level: "All Levels",
    price: "₹399",
    desc: "500+ civil engineering interview questions with detailed model answers across all subjects. Quiz format, downloadable PDFs, and topic-wise organisation. Essential for job seekers.",
    outcomes: [
      "500+ questions across 12 subjects",
      "Detailed answers with code references",
      "Quiz format for self-assessment",
      "Downloadable PDF cheat sheets",
      "Company HR + technical HR questions",
    ],
  },
];

export default function CoursesPage() {
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
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Courses Launching Soon</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white uppercase leading-tight mb-5">
                Software & Skill<br />
                <span className="text-orange-500">Courses for Civil Engineers</span>
              </h1>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8 max-w-xl">
                Project-based courses on AutoCAD, Revit, STAAD Pro, ETABS, MS Project, and more — taught by working civil engineering professionals, not just instructors. Learn what actually matters in the industry, at India's lowest price.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#courses" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                  <BookOpen className="h-4 w-4" /> View Courses
                </a>
                <a href="https://wa.me/917703977002" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                  <MessageCircle className="h-4 w-4" /> Get Notified
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why our courses */}
        <section className="py-14 bg-orange-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
              {[
                { icon: Play, val: "Project-Based", label: "Real workflow, not theory" },
                { icon: Star, val: "By Professionals", label: "Working civil engineers teach" },
                { icon: Zap, val: "Lowest Price", label: "Guaranteed in India" },
                { icon: Clock, val: "Self-Paced", label: "Learn at your own time" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-2">
                  <s.icon className="h-6 w-6 text-white/80" />
                  <p className="font-display font-extrabold text-sm uppercase tracking-wide">{s.val}</p>
                  <p className="text-[10px] text-orange-100 font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Grid */}
        <section id="courses" className="py-20 md:py-28 bg-wix-gray">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">All Courses</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase">
                6 Courses. <span className="text-orange-500">Unlimited Growth.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div key={course.name} className={`bg-white rounded-md overflow-hidden flex flex-col border ${course.status === "launching-soon" ? "border-orange-300" : "border-slate-200"} hover:shadow-md transition-all`}>
                  {/* Status banner */}
                  <div className={`${course.badgeColor} text-white text-[9px] font-bold uppercase tracking-widest text-center py-2`}>
                    {course.badge}
                  </div>

                  {/* Top content */}
                  <div className="p-7 border-b border-slate-100 flex-grow">
                    <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center mb-4">
                      <BookOpen className="h-5 w-5 text-orange-500" />
                    </div>
                    <h3 className="font-display text-base font-extrabold text-wix-dark uppercase tracking-tight mb-1">{course.name}</h3>
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">{course.sub}</p>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                        <Clock className="h-3.5 w-3.5" /> {course.duration}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                        <Star className="h-3.5 w-3.5 text-orange-400" /> {course.level}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-5">{course.desc}</p>
                    <p className="text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-3">What You Will Learn</p>
                    <ul className="space-y-2">
                      {course.outcomes.map((o) => (
                        <li key={o} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-[11px] text-slate-600 font-medium">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price + CTA */}
                  <div className="p-7 bg-wix-gray border-t border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-display text-2xl font-extrabold text-wix-dark">{course.price}</p>
                        <p className="text-[10px] text-slate-400 font-medium">One-time · Lifetime access</p>
                      </div>
                      {course.status === "launching-soon" && (
                        <span className="text-[9px] font-bold text-orange-500 bg-orange-50 border border-orange-200 px-2.5 py-1 rounded-full uppercase">Early bird</span>
                      )}
                    </div>
                    {course.status === "launching-soon" ? (
                      <a href="https://wa.me/917703977002" target="_blank" rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-wix-dark hover:bg-orange-500 text-white font-bold py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                        <MessageCircle className="h-4 w-4" /> Get Early Access
                      </a>
                    ) : (
                      <div className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 border border-slate-200 text-slate-400 font-bold py-3 text-[11px] uppercase tracking-widest rounded-md cursor-not-allowed">
                        <Lock className="h-4 w-4" /> Coming Soon
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Early Access CTA */}
        <section className="py-16 bg-wix-dark">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-3">Don't Wait</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase mb-4">
              Register Interest Now<br /><span className="text-orange-500">Get Early Access + Best Price</span>
            </h2>
            <p className="text-sm text-slate-400 font-medium mb-8 leading-relaxed">
              Early registrants get launch-day discount pricing and priority access. WhatsApp us with "COURSES" to be added to the waitlist.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/917703977002?text=Hi%2C%20I%20want%20early%20access%20to%20Civil%20At%20Hand%20Education%20Courses" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all">
                <MessageCircle className="h-4 w-4" /> Join Waitlist via WhatsApp
              </a>
              <Link href="/education"
                className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white text-white font-bold px-8 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all">
                All Programs <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
