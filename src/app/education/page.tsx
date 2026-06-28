import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
  CheckCircle2,
  Star,
  Clock,
  Target,
  GraduationCap,
  Video,
  FileText,
  HardHat,
  Zap,
  Calendar,
  Award,
  TrendingUp,
  PlayCircle,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Civil At Hand Education | Courses, Test Series & Mentorship for Civil Engineers",
  description:
    "Civil At Hand Education — India's dedicated platform for civil engineering learners. Access GATE, ESE, SSC-JE, and company exam test series, software courses, 1-on-1 mentorship, and interview preparation at the lowest prices.",
};

const programs = [
  {
    id: "test-series",
    icon: Trophy,
    badge: "Most Popular",
    badgeColor: "bg-orange-500",
    title: "Test Series",
    subtitle: "GATE · ESE · SSC-JE · Company Exams",
    desc: "Practice with our expertly crafted question banks designed exactly to the exam pattern. Full-length mocks, subject-wise tests, and detailed solutions — all in one place.",
    features: [
      "GATE CE full-length and topic-wise tests",
      "ESE (IES) Civil Engineering paper practice",
      "SSC-JE Civil Technical mock tests",
      "Company-specific civil engineering tests",
      "Detailed solution with concept explanation",
      "Rank and performance analytics",
      "Quiz format with timed interface",
    ],
    cta: "Explore Test Series",
    href: "/education/test-series",
    accent: "border-orange-500",
    iconBg: "bg-orange-500",
  },
  {
    id: "mentorship",
    icon: Users,
    badge: "Limited Seats",
    badgeColor: "bg-slate-800",
    title: "1-on-1 Mentorship",
    subtitle: "Book a Session with Top Professionals",
    desc: "Get personal life and career guidance from experienced civil engineers and industry professionals. Whether it's exam strategy, job hunting, career switch, or higher studies — book a session tailored to your goals.",
    features: [
      "Book a 45-minute 1-on-1 video call",
      "Choose your mentor by specialisation",
      "GATE/ESE strategy and study plan",
      "Career guidance — jobs, PSU, M.Tech",
      "Resume and interview preparation",
      "Site experience and field career advice",
      "Startup and consultancy guidance",
    ],
    cta: "Book a Session",
    href: "/education/mentorship",
    accent: "border-slate-800",
    iconBg: "bg-slate-800",
  },
  {
    id: "courses",
    icon: BookOpen,
    badge: "Coming Soon",
    badgeColor: "bg-emerald-600",
    title: "Software & Skill Courses",
    subtitle: "AutoCAD · Revit · STAAD · ETABS · MS Project",
    desc: "Practical, project-based courses on the most in-demand civil engineering software tools — taught by working professionals, not just instructors. Learn at your own pace, at the lowest price in India.",
    features: [
      "AutoCAD for Civil Engineers — 2D & 3D",
      "Revit Structure — BIM modelling from scratch",
      "STAAD Pro — structural analysis and design",
      "ETABS — building modelling and seismic design",
      "MS Project — construction planning",
      "Civil interview question preparation",
      "Certificate of completion on all courses",
    ],
    cta: "Notify Me",
    href: "/education/courses",
    accent: "border-emerald-600",
    iconBg: "bg-emerald-600",
  },
];

const examsCovered = [
  { name: "GATE CE", desc: "Graduate Aptitude Test in Engineering — Civil", icon: Target },
  { name: "ESE / IES", desc: "Engineering Services Exam — Civil Paper", icon: Award },
  { name: "SSC-JE", desc: "Staff Selection Commission Junior Engineer", icon: FileText },
  { name: "State JE/AE", desc: "MPSC, RPSC, UPPSC, HPSC and more", icon: HardHat },
  { name: "ISRO / DRDO", desc: "Government R&D organisation exams", icon: Zap },
  { name: "Company Exams", desc: "L&T, Tata, NPCIL, RVNL civil hiring tests", icon: TrendingUp },
];

const whyEducation = [
  {
    icon: GraduationCap,
    title: "Made by Civil Engineers",
    desc: "All content is created by practising civil engineers and exam toppers — not generic educators.",
  },
  {
    icon: Target,
    title: "Exam-Pattern Focused",
    desc: "Every test is modelled on actual GATE, ESE, and SSC-JE patterns with real difficulty calibration.",
  },
  {
    icon: Star,
    title: "Lowest Price Guarantee",
    desc: "We believe quality civil engineering education should be affordable. No inflated course fees.",
  },
  {
    icon: Clock,
    title: "Learn at Your Own Pace",
    desc: "All courses and test series are available 24/7. No live-class pressure — study when you want.",
  },
  {
    icon: MessageCircle,
    title: "Real Mentors, Real Advice",
    desc: "Our mentors are working civil engineers with hands-on site, PSU, and consulting experience.",
  },
  {
    icon: Video,
    title: "Quiz + Video + PDF",
    desc: "Multiple learning formats — timed quizzes, video explanations, and downloadable solution PDFs.",
  },
];

const interviewTopics = [
  "Soil Mechanics & Foundation Engineering",
  "RCC Design (IS 456:2000)",
  "Steel Structure Design (IS 800:2007)",
  "Fluid Mechanics & Hydraulics",
  "Transportation Engineering",
  "Environmental Engineering",
  "Surveying & Geomatics",
  "Construction Management",
  "Structural Analysis",
  "Building Materials & Construction",
  "Estimation & Costing",
  "Irrigation Engineering",
];

export default function EducationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">

        {/* ══ HERO ══ */}
        <section className="relative bg-wix-dark overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
            <div className="max-w-4xl mx-auto text-center">

              {/* Brand pill */}
              <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-full px-5 py-2 mb-8">
                <GraduationCap className="h-4 w-4 text-orange-400" />
                <span className="text-[11px] font-bold text-orange-400 uppercase tracking-widest">
                  Civil At Hand Education
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-6xl font-extrabold text-white uppercase leading-tight tracking-tight">
                Learn Civil Engineering.<br />
                <span className="text-orange-500">Crack Every Exam.</span><br />
                Build Your Career.
              </h1>

              <p className="mt-6 text-sm text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                India's dedicated civil engineering education platform — built by civil engineers, for civil engineers.
                Access high-quality test series, software courses, interview prep, and personal mentorship
                at prices that make sense for every student.
              </p>

              {/* Quick stats */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                {[
                  { val: "GATE · ESE · SSC-JE", label: "Exams Covered" },
                  { val: "₹ Lowest Price", label: "Guaranteed" },
                  { val: "1-on-1", label: "Mentorship Sessions" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="font-display text-lg font-extrabold text-orange-400">{s.val}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-3 justify-center">
                <Link
                  href="/education/test-series"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all"
                >
                  Start Test Series <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/education/mentorship"
                  className="inline-flex items-center gap-2 border border-white/20 hover:border-white text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all"
                >
                  Book Mentorship
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHAT WE PROVIDE INTRO ══ */}
        <section className="py-14 bg-orange-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
              {[
                {
                  icon: Trophy,
                  title: "Test Series",
                  desc: "GATE, ESE, SSC-JE, company exam mocks in quiz format with detailed solutions.",
                },
                {
                  icon: Users,
                  title: "1-on-1 Mentorship",
                  desc: "Personal sessions with top civil engineering professionals for life and career guidance.",
                },
                {
                  icon: BookOpen,
                  title: "Software Courses",
                  desc: "AutoCAD, Revit, STAAD, ETABS and more — practical courses at the lowest prices.",
                },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 bg-white/15 rounded-md flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-display font-extrabold text-base uppercase tracking-wide">{item.title}</h3>
                  <p className="text-xs text-orange-100 font-medium leading-relaxed max-w-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ THREE PROGRAM CARDS ══ */}
        <section className="py-20 md:py-28 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Our Programs</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight">
                Three Ways We Help<br />
                <span className="text-orange-500">You Grow</span>
              </h2>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                Each program is built around what civil engineering students and professionals actually need —
                not what looks good on a brochure.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {programs.map((p) => (
                <div
                  key={p.id}
                  className={`bg-white border-2 ${p.accent} rounded-md overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all`}
                >
                  {/* Card header */}
                  <div className="p-7 border-b border-slate-100">
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-12 h-12 ${p.iconBg} rounded-md flex items-center justify-center`}>
                        <p.icon className="h-6 w-6 text-white" />
                      </div>
                      <span className={`${p.badgeColor} text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full`}>
                        {p.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-extrabold text-wix-dark uppercase tracking-tight mb-1">
                      {p.title}
                    </h3>
                    <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-3">{p.subtitle}</p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{p.desc}</p>
                  </div>

                  {/* Features */}
                  <div className="p-7 flex-grow">
                    <p className="text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-4">What's Included</p>
                    <ul className="space-y-3">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-orange-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-slate-600 font-medium">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="px-7 pb-7">
                    <Link
                      href={p.href}
                      className="w-full inline-flex items-center justify-center gap-2 bg-wix-dark hover:bg-orange-500 text-white font-bold py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EXAMS COVERED ══ */}
        <section className="py-20 md:py-28 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Coverage</span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight mb-6">
                  Every Major Civil<br />
                  Engineering <span className="text-orange-500">Exam</span>
                </h2>
                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-8">
                  From GATE to company-specific hiring tests — our test series and courses are designed
                  to prepare you for every competitive exam in the civil engineering domain.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {examsCovered.map((e) => (
                    <div key={e.name} className="bg-wix-gray border border-slate-200 rounded-md p-5 hover:border-orange-400 transition-all">
                      <div className="flex items-center gap-3 mb-2">
                        <e.icon className="h-4 w-4 text-orange-500" />
                        <span className="font-display text-sm font-extrabold text-wix-dark uppercase tracking-wide">{e.name}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">{e.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview prep visual */}
              <div className="bg-wix-dark rounded-md p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-orange-500 rounded-md flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Also Available</p>
                    <p className="font-display text-base font-extrabold text-white uppercase tracking-tight">
                      Civil Interview Prep
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed mb-6">
                  Practice 500+ commonly asked civil engineering interview questions — with model answers
                  written by experienced engineers. Covers all core subjects in quiz format.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {interviewTopics.map((topic) => (
                    <div key={topic} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-orange-500 flex-shrink-0" />
                      <span className="text-[10px] text-slate-400 font-medium">{topic}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <Link
                    href="/education/test-series"
                    className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all w-full justify-center"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Start Practicing Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ WHY CIVIL AT HAND EDUCATION ══ */}
        <section className="py-20 md:py-28 bg-wix-gray border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest block mb-3">Why Choose Us</span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight">
                Different by <span className="text-orange-500">Design</span>
              </h2>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                We are not a generic ed-tech platform. We are civil engineers who know exactly
                what it takes to crack these exams and build a real career in this field.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyEducation.map((w) => (
                <div key={w.title} className="bg-white border border-slate-200 rounded-md p-7 hover:border-orange-400 hover:shadow-md transition-all group">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-all">
                    <w.icon className="h-5 w-5 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-display font-extrabold text-sm text-wix-dark uppercase tracking-wide mb-2">{w.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MENTORSHIP SPOTLIGHT ══ */}
        <section className="py-20 md:py-28 bg-wix-dark relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              <div>
                <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-3">1-on-1 Mentorship</span>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white uppercase leading-tight mb-6">
                  One Session Can<br />
                  <span className="text-orange-500">Change Your Direction</span>
                </h2>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-6">
                  Not everyone needs a full course. Sometimes you need 45 minutes with the right person
                  who has been where you want to go. Our mentors are top civil professionals — from IITs,
                  leading consultancies, PSUs, and private EPC firms.
                </p>
                <p className="text-sm text-slate-400 font-medium leading-relaxed mb-8">
                  Tell us your goal. We match you with the right mentor. You get a personal, focused session
                  with a roadmap you can actually follow.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "GATE / ESE study plan and strategy session",
                    "Career switch — from site to design or vice versa",
                    "M.Tech admission and IIT preparation guidance",
                    "PSU (ONGC, BHEL, NTPC, AAI) preparation advice",
                    "Resume review and job interview coaching",
                    "Civil startup or consultancy launch guidance",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/education/mentorship"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-7 py-4 text-[11px] uppercase tracking-widest rounded-md transition-all"
                >
                  <Calendar className="h-4 w-4" />
                  Book Your Session
                </Link>
              </div>

              {/* Session card visual */}
              <div className="space-y-4">
                {[
                  {
                    mentor: "Senior Structural Engineer",
                    exp: "12 years · IIT Delhi · Design Consultancy",
                    topics: ["GATE Strategy", "Structural Design Career", "MTech Guidance"],
                    tag: "Structural",
                    tagColor: "bg-orange-500",
                  },
                  {
                    mentor: "BIM & CAD Specialist",
                    exp: "9 years · BIM Lead · International Projects",
                    topics: ["Revit / BIM Career", "Software Skills", "Global Opportunities"],
                    tag: "BIM",
                    tagColor: "bg-slate-600",
                  },
                  {
                    mentor: "Quantity Surveyor & Estimator",
                    exp: "10 years · Senior QS · CPWD Projects",
                    topics: ["BOQ Career", "PSU Preparation", "Estimation Skills"],
                    tag: "Quantity Surveying",
                    tagColor: "bg-orange-400",
                  },
                  {
                    mentor: "Site & Project Manager",
                    exp: "15 years · L&T, Tata Projects · Site Leader",
                    topics: ["Site Career", "Job Switch", "Interview Prep"],
                    tag: "Site & Management",
                    tagColor: "bg-emerald-600",
                  },
                ].map((mentor) => (
                  <div key={mentor.mentor} className="bg-white/5 border border-white/10 rounded-md p-5 hover:border-orange-500/30 transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-extrabold text-white font-display uppercase tracking-wide">{mentor.mentor}</p>
                        <p className="text-[10px] text-slate-500 font-medium mt-0.5">{mentor.exp}</p>
                      </div>
                      <span className={`${mentor.tagColor} text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex-shrink-0`}>
                        {mentor.tag}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {mentor.topics.map((t) => (
                        <span key={t} className="text-[10px] text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-slate-500 text-center font-medium pt-2">
                  More mentors available when you book · Slots fill fast
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══ COURSES TEASER ══ */}
        <section className="py-20 md:py-24 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Coming Soon
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark uppercase leading-tight">
                Software Courses<br />
                <span className="text-orange-500">Launching Soon</span>
              </h2>
              <p className="mt-4 text-sm text-slate-500 font-medium">
                Project-based courses on the most in-demand civil engineering tools — taught by
                working professionals. Early access available for registered users.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "AutoCAD", sub: "2D & 3D Civil" },
                { name: "Revit", sub: "BIM Structure" },
                { name: "STAAD Pro", sub: "Structural Analysis" },
                { name: "ETABS", sub: "Building Design" },
                { name: "MS Project", sub: "Construction Planning" },
                { name: "More", sub: "Courses Coming" },
              ].map((course) => (
                <div
                  key={course.name}
                  className="bg-wix-gray border border-slate-200 rounded-md p-5 text-center hover:border-orange-400 transition-all"
                >
                  <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="h-5 w-5 text-orange-500" />
                  </div>
                  <p className="font-display text-xs font-extrabold text-wix-dark uppercase tracking-wide">{course.name}</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-0.5">{course.sub}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link
                href="/education/courses"
                className="inline-flex items-center gap-2 border border-slate-300 hover:border-orange-500 hover:text-orange-500 text-wix-dark font-bold px-7 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all"
              >
                Get Notified When Courses Launch <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══ BOTTOM CTA ══ */}
        <section className="py-20 bg-wix-gray">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="bg-wix-dark rounded-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-orange-500 p-10 md:p-14">
                  <span className="text-[10px] font-bold text-white/70 uppercase tracking-widest block mb-3">Start Today</span>
                  <h2 className="font-display text-3xl font-extrabold text-white uppercase leading-tight mb-4">
                    Your Civil Engineering<br />Journey Starts Here
                  </h2>
                  <p className="text-sm text-orange-100 font-medium leading-relaxed mb-8">
                    Whether you are preparing for GATE, looking for a better job, or want to
                    master engineering software — Civil At Hand Education has the right program for you.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/education/test-series"
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-wix-dark text-orange-500 hover:text-white font-bold px-6 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all"
                    >
                      <Trophy className="h-4 w-4" />
                      Test Series
                    </Link>
                    <Link
                      href="/education/mentorship"
                      className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white font-bold px-6 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all"
                    >
                      <Calendar className="h-4 w-4" />
                      Book Mentorship
                    </Link>
                  </div>
                </div>

                <div className="p-10 md:p-14 flex flex-col justify-center gap-6">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Also from Civil At Hand</p>
                  <Link
                    href="/services/all-services"
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-md p-5 hover:border-orange-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center group-hover:bg-orange-500 transition-all flex-shrink-0">
                      <HardHat className="h-5 w-5 text-orange-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-extrabold text-white uppercase tracking-wide">Engineering Services</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">Structural design, BOQ, BIM, AutoCAD</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-orange-400 ml-auto transition-colors" />
                  </Link>
                  <Link
                    href="/calculators"
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-md p-5 hover:border-orange-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center group-hover:bg-orange-500 transition-all flex-shrink-0">
                      <Zap className="h-5 w-5 text-orange-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-extrabold text-white uppercase tracking-wide">Free Calculators</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">Concrete, steel, BOQ, cost estimation tools</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-orange-400 ml-auto transition-colors" />
                  </Link>
                  <Link
                    href="/blog"
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-md p-5 hover:border-orange-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center group-hover:bg-orange-500 transition-all flex-shrink-0">
                      <FileText className="h-5 w-5 text-orange-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-display text-xs font-extrabold text-white uppercase tracking-wide">Engineering Blog</p>
                      <p className="text-[10px] text-slate-500 font-medium mt-0.5">Technical articles, GATE prep, civil concepts</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-orange-400 ml-auto transition-colors" />
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
