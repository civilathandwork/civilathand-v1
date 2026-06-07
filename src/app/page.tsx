"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calculators } from "@/components/Calculators";
import { useProjects } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  MapPin, 
  DraftingCompass, 
  Warehouse, 
  Building2, 
  Factory, 
  Home as HomeIcon, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronDown, 
  UserCheck, 
  Award, 
  Leaf, 
  Compass, 
  ArrowRight,
  Star
} from "lucide-react";

// Custom Bridge Icon
const BridgeIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 12a9 9 0 0 1 18 0M6 12v4M10 12v6M14 12v6M18 12v4" />
  </svg>
);

// Custom Download Icon
const DownloadIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

// Custom Animated Counter Component
const AnimatedCounter: React.FC<{ value: number; suffix?: string; duration?: number }> = ({ value, suffix = "", duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    
    const totalMiliseconds = duration * 1000;
    // Calculate increment time based on value size to ensure smooth rendering
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    const step = Math.ceil(end / 50); // Divide into 50 steps

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString("en-IN")}{suffix}</span>;
};

export default function Home() {
  const { addLead } = useProjects();
  
  // Interactive Lifecycle Step State
  const [activeLifecycleStep, setActiveLifecycleStep] = useState(0);

  // Custom Toast State for simulated PDF blueprints downloads
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerDownload = (fileName: string) => {
    setToastMessage(`Initializing secure download: ${fileName}...`);
    setTimeout(() => {
      setToastMessage(`Success: ${fileName} downloaded successfully!`);
      setTimeout(() => setToastMessage(null), 3000);
    }, 1500);
  };

  // Contact Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Architectural Design");
  const [message, setMessage] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);

  // FAQ Active State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addLead({
      name,
      email,
      phone,
      service,
      source: "Contact Form",
      details: message
    });
    setContactSuccess(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setTimeout(() => setContactSuccess(false), 3000);
  };

  const services = [
    { title: "Architectural Design", desc: "Premium master plans, structural elevation blueprints, and space layout calculations.", icon: DraftingCompass, href: "/services/architectural-design" },
    { title: "Structural Design", desc: "High-grade structural detailing and frame analysis using state-of-the-art computer automation.", icon: Cpu },
    { title: "BOQ Estimation", desc: "Detailed Material bills and cost projections computed automatically with IS-code standard accuracies.", icon: FileTextIcon },
    { title: "Quantity Surveying", desc: "Professional pre-construction quantity audits, concrete takeoffs, and rebar scheduling.", icon: Briefcase },
    { title: "PDF to AutoCAD", desc: "Seamless vectorization of blueprint drawings to fully editable DWG/DXF files.", icon: FileTextIcon },
    { title: "BIM Services", desc: "Virtual design coordination and 3D modeling up to LOD 400 specification standards.", icon: Compass },
    { title: "Interior Design", desc: "Ergonomic workspace designs, custom interior layouts, and wood-finish specifications.", icon: HomeIcon },
    { title: "Industrial Planning", desc: "Heavy machinery layouts, warehouse logistics routing, and manufacturing floor design.", icon: Factory },
    { title: "Project Management", desc: "Complete end-to-end design-build execution timeline audit, tasking, and cost tracking.", icon: ShieldCheck },
  ];

  const sectors = [
    { 
      title: "Residential", 
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800", 
      desc: "Luxury villas, high-rise apartments, and modular townships.", 
      icon: HomeIcon,
      specs: ["Design Code: IS 456", "BIM Target: LOD 300", "Load Type: Gravity & Wind", "Typical Foundation: Isolated/Raft"]
    },
    { 
      title: "Commercial", 
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", 
      desc: "Corporate office spaces, shopping complexes, and retail centers.", 
      icon: Building2,
      specs: ["Design Code: IS 1893", "BIM Target: LOD 400", "Structure: RCC Frame/Composite", "Typical Foundation: Deep Pile/Raft"]
    },
    { 
      title: "Industrial", 
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", 
      desc: "Processing units, heavy manufacturing complexes, and power installations.", 
      icon: Factory,
      specs: ["Design Code: IS 800", "BIM Target: LOD 400", "Structure: Heavy Steel Trusses", "Load Type: Heavy Dynamic Vibrations"]
    },
    { 
      title: "Infrastructure", 
      image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=800", 
      desc: "Bridges, flyovers, highways, and transport terminals.", 
      icon: BridgeIcon,
      specs: ["Design Code: IRC 112", "BIM Target: LOD 400+", "Structure: Prestressed Concrete/Steel", "Typical Foundation: Well/Pile Foundations"]
    },
    { 
      title: "Warehouses", 
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", 
      desc: "Logistic hubs, cold storages, and prefabricated steel storage sheds.", 
      icon: Warehouse,
      specs: ["Design Code: IS 800:2007", "BIM Target: LOD 350", "Structure: PEB Portal Frame", "Wind Speed Limit: Up to 50 m/s"]
    },
    { 
      title: "Manufacturing", 
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800", 
      desc: "Smart production floors, cleanrooms, and engineering assembly bays.", 
      icon: SettingsIcon,
      specs: ["Design Code: NBC 2016", "BIM Target: LOD 400", "Structure: RCC Flat Slabs/Steel", "Typical Floor: Epoxy Industrial Flooring"]
    },
  ];

  const lifecycleSteps = [
    {
      phase: "01",
      title: "Feasibility & Site Survey",
      subtitle: "Surveying & Geotechnical Auditing",
      desc: "Perform comprehensive site boundary studies, soil load-bearing capacity analysis, and topographical mapping. We verify environmental constraints and municipal setbacks before drafting starts.",
      codes: "IS 1892 (Subsurface investigation), IS 6403 (Bearing capacity)",
      deliverables: ["Soil Investigation Report", "Topographical Contour Map", "Site Zoning & Layout Plan"],
      stat: "40+ Soil Parameters Audited"
    },
    {
      phase: "02",
      title: "BIM Coordination & Layouts",
      subtitle: "Virtual Design Coordination",
      desc: "Compile spatial layouts and master plan architectures into an integrated 3D model. We use Revit/BIM LOD 400 models to locate and resolve potential MEP plumbing and structural beam clashes.",
      codes: "LOD 400 Standards, NBC 2016 (National Building Code)",
      deliverables: ["Clash Detection Matrix", "3D BIM Coordination Model", "Architectural Elevation Set"],
      stat: "Zero Field Clashes Guaranteed"
    },
    {
      phase: "03",
      title: "Structural Detailing",
      subtitle: "FEM Structural Analysis",
      desc: "Analyse slab, beam, column, and foundation loadings under standard seismic and wind pressures. We optimize structural safety while reducing steel reinforcement weights.",
      codes: "IS 456:2000 (Reinforced Concrete), IS 1893 (Seismic Design)",
      deliverables: ["STAAD.Pro Frame Report", "Structural Detailing Schematics", "PEB Portal Frame Design"],
      stat: "Optimized Steel Weight: -15%"
    },
    {
      phase: "04",
      title: "AI BOQ & Material Takeoff",
      subtitle: "Automated Quantity Surveying",
      desc: "Extract boundary volumes automatically from design sheets to generate precise schedules of concrete grades, aggregate weights, and rebar sizing lists.",
      codes: "IS 1200 (Measurement of building works)",
      deliverables: ["Itemized BOQ Spreadsheet", "Bar Bending Schedule (BBS)", "Material Procurement Planner"],
      stat: "98%+ Quantity Precision"
    },
    {
      phase: "05",
      title: "Construction Quality Audit",
      subtitle: "Supervision & Milestone Checks",
      desc: "Review construction standards remotely or onsite via our engineering checklists. We double-check formwork alignments, concrete grade pour tests, and rebar covers before casting.",
      codes: "IS 456 (Curing guidelines), IS 1199 (Concrete Slump Test)",
      deliverables: ["Pour Release Certificate", "On-site Alignment Report", "Quality Checklist Logs"],
      stat: "100+ Inspection Checkpoints"
    },
    {
      phase: "06",
      title: "GFC Drawings & Commissioning",
      subtitle: "As-Built Verification & Handover",
      desc: "Approve and lock Good-For-Construction drawings. Deliver full editable DWG vectors, high-res layouts, and final certified calculations sheets straight to your customer dashboard.",
      codes: "SP 34 (Concrete reinforcement detailing Handbook)",
      deliverables: ["Certified GFC blueprints", "As-Built CAD drawings set", "Structural Safety Certificate"],
      stat: "GFC Handover within 24 Hrs"
    }
  ];

  const testimonials = [
    { name: "Anand Sen", role: "CEO, Sen & Co. Builders", review: "Civil At Hand completely revolutionized our quantity takeoff process. Their AI BOQ tool reduced our estimation turnaround from 5 days to just 3 hours, with absolute structural precision.", rating: 5, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" },
    { name: "Meera Deshmukh", role: "Principal Architect, Atelier M", review: "The integration between the client dashboard and their structural engineers is seamless. I uploaded my floor plan PDFs, received CAD conversions, and coordinated the column schedules in real-time.", rating: 5, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150" },
    { name: "Suresh Pillai", role: "VP Projects, InfraCorp Ltd.", review: "Their BIM LOD 400 modeling saved us lakhs in onsite clash resolution. The site supervision audits and digital checklists kept our steel fabrication perfectly aligned with drawings.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" }
  ];

  const faqs = [
    { q: "How accurate are your construction cost estimations?", a: "Our calculators use regional material rates and standard IS (Indian Standard) code equations. For customized blueprints, our engineering audit verifies structural tolerances, concrete grade adjustments, and reinforcement steel ratios, achieving over 98% accuracy." },
    { q: "What formats do you support for drawing uploads?", a: "We support PDF drawings, scans, hand-drawn schematics, and vector CAD files (.DWG, .DXF). Our automated analyzer parses PDF boundaries, and our engineering team manually audits the CAD file structure to deliver verified designs." },
    { q: "How long does it take to get a detailed Bill of Quantities (BOQ)?", a: "Our automated AI BOQ Takeoff provides an initial estimate in minutes. An expert engineering audit review and certified GFC (Good For Construction) quotation is returned to your dashboard within 24 hours." },
    { q: "Can I coordinate project milestones and release payments through the platform?", a: "Yes. The Client Portal tracks design progress in real-time, displays itemized invoices for each milestone (e.g. Architectural, Structural, MEP), and supports secure payment completions. Verified structural blueprints are unlocked upon payment." }
  ];

  // Framer Motion Animation Variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 15 } }
  };

  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const cardHoverVariants = {
    hover: { 
      y: -6,
      scale: 1.01,
      transition: { duration: 0.25, ease: "easeOut" as const }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* SECTION 1: HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center bg-navy-950 text-white overflow-hidden py-20">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1600" 
              alt="Industrial Engineering" 
              className="w-full h-full object-cover opacity-25 object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-transparent"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div 
              variants={heroContainerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
            >
              {/* Hero text */}
              <div className="lg:col-span-7 space-y-6">
                <motion.div 
                  variants={heroItemVariants}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy-900 border border-navy-800 px-3 py-1 text-xs font-semibold text-orange-400 shadow-sm"
                >
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Next-Gen Engineering Technology</span>
                </motion.div>
                
                <motion.h1 
                  variants={heroItemVariants}
                  className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight"
                >
                  Engineering Excellence <span className="block text-orange-500 mt-2">Powered by Automation</span>
                </motion.h1>
                
                <motion.p 
                  variants={heroItemVariants}
                  className="text-base text-slate-300 max-w-xl leading-relaxed"
                >
                  Planning, Design, Quantity Estimation, Construction Automation, and Project Management in One Cohesive Platform.
                </motion.p>
                
                <motion.div 
                  variants={heroItemVariants}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <a
                      href="#contact"
                      className="inline-block rounded-lg bg-orange-500 hover:bg-orange-600 px-6 py-3.5 text-xs font-bold text-white shadow-orange-glow transition-all duration-300 uppercase tracking-wider"
                    >
                      Get Free Consultation
                    </a>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <a
                      href="#services"
                      className="inline-block rounded-lg border border-slate-500 hover:border-white hover:bg-white/5 px-6 py-3.5 text-xs font-bold text-white transition-all duration-300 uppercase tracking-wider"
                    >
                      Explore Services
                    </a>
                  </motion.div>
                </motion.div>
              </div>

              {/* Animated Statistics */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {[
                  { value: 1200, suffix: "+", label: "Projects Delivered", desc: "Industrial & residential" },
                  { value: 450, suffix: "+", label: "Clients Served", desc: "Builders & architects" },
                  { value: 15, suffix: "+", label: "Years of Experience", desc: "Expert senior engineers" },
                  { value: 25, suffix: "M+", label: "Square Feet Designed", desc: "Structural space audits" },
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    variants={heroItemVariants}
                    whileHover={{ scale: 1.02, border: "1px solid rgba(255,107,0,0.3)" }}
                    className="bg-glass-dark p-5 rounded-xl border border-white/5 flex flex-col justify-between shadow-premium transition-all duration-300"
                  >
                    <div>
                      <p className="text-2xl font-extrabold font-display text-orange-500 tracking-tight">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs font-bold mt-1 text-white">{stat.label}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: TRUST SECTION */}
        <section className="bg-slate-50 py-16 border-b border-slate-200 shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                { title: "ISO 9001:2015", label: "Quality Standards", icon: Award, desc: "Certified engineering design quality management systems." },
                { title: "Rapid Turnaround", label: "CAD Detailing", icon: Clock, desc: "24-48hr vectorization and structural drawings delivery." },
                { title: "AI-Powered Quantities", label: "Automated Estimations", icon: Cpu, desc: "IS-code standardized material calculations and BOQs." },
                { title: "Chartered SE / BIM", label: "Expert Auditors", icon: UserCheck, desc: "Double-checked reviews by senior structural engineers." },
                { title: "Milestone Escrow", label: "Secure Payments", icon: ShieldCheck, desc: "Payments split by project phase and unlocked on file delivery." },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    className="bg-white border border-slate-200/80 rounded-xl p-5 hover:shadow-premium transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
                  >
                    {/* Hover Orange Accent Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-50 text-navy-950 mb-4 border border-navy-100/50 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-sm">
                        <Icon className="h-5.5 w-5.5 text-orange-500 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <h3 className="text-xs font-extrabold text-navy-950 uppercase tracking-wider">{badge.title}</h3>
                      <p className="text-[10px] text-orange-600 font-bold uppercase tracking-wider mt-0.5">{badge.label}</p>
                      <p className="text-[10px] text-slate-500 mt-2.5 leading-relaxed">{badge.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES SECTION */}
        <section id="services" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Our Capabilities</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                End-to-End Civil & Structural Services
              </h2>
              <p className="mt-4 text-sm text-navy-600 max-w-2xl mx-auto leading-relaxed">
                Combining senior-level human expertise with automated design verification to deliver top-tier drawings, models, and estimations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: (idx % 3) * 0.08 }}
                    variants={cardHoverVariants}
                    whileHover="hover"
                    className="group border border-slate-200 hover:border-navy-950 rounded-xl p-5 hover:bg-slate-50 transition-all duration-300 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-10 w-10 rounded-lg bg-slate-50 text-navy-950 group-hover:bg-navy-950 group-hover:text-white flex items-center justify-center mb-4 border border-slate-100 transition-colors shadow-sm">
                        <Icon className="h-5.5 w-5.5 text-orange-500" />
                      </div>
                      <h3 className="font-display font-extrabold text-sm text-navy-950 mb-2 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-navy-600 leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-auto">
                      <Link href={service.href || "#contact"} className="text-[10px] font-bold text-orange-500 hover:text-navy-950 uppercase tracking-wider flex items-center gap-1">
                        Get Estimate <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 4: AUTOMATION TOOLS */}
        <Calculators />

        {/* SECTION 5: MARKET SECTORS */}
        <section id="sectors" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Industries We Serve</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Broad Spectrum Engineering Sectors
              </h2>
              <p className="mt-4 text-sm text-navy-600 max-w-2xl mx-auto leading-relaxed">
                From luxury domestic houses to high-tolerance heavy factories, our team delivers optimized structural planning tailored to industry specifications.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector, idx) => {
                const Icon = sector.icon;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                    className="group relative h-80 rounded-2xl overflow-hidden shadow-premium border border-slate-200 flex flex-col justify-end p-6 transition-all duration-300"
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={sector.image} 
                        alt={sector.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-transparent transition-all duration-300 group-hover:from-navy-950 group-hover:via-navy-950/90"></div>
                    </div>

                    <div className="relative z-10 text-white space-y-2.5 w-full">
                      <div className="flex justify-between items-center">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-orange-500 text-white shadow-premium">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      </div>
                      
                      <h3 className="font-display font-extrabold text-lg tracking-tight">{sector.title}</h3>
                      <p className="text-xs text-slate-300 leading-normal group-hover:hidden transition-all duration-200">{sector.desc}</p>
                      
                      {/* Floating specs shown on hover */}
                      <div className="hidden group-hover:block transition-all duration-300 space-y-2">
                        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">Engineering Specs:</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {sector.specs?.map((spec, sIdx) => (
                            <span key={sIdx} className="bg-white/10 backdrop-blur-sm border border-white/5 text-[9px] font-bold text-slate-200 px-2 py-1 rounded">
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6: CONCEPT TO COMMISSIONING INTERACTIVE LIFECYCLE */}
        <section className="py-20 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Service Lifecycle</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Concept to Commissioning: Engineering Pipeline
              </h2>
              <p className="mt-4 text-sm text-navy-600 max-w-2xl mx-auto leading-relaxed">
                Click through the 6 stages of our integrated engineering and construction verification workflow to see our rigorous standards and deliverable sets.
              </p>
            </motion.div>

            {/* Interactive Step Timeline Headers */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-10">
              {lifecycleSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLifecycleStep(idx)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                    activeLifecycleStep === idx 
                      ? "bg-navy-950 border-navy-950 text-white shadow-premium" 
                      : "bg-white border-slate-200 text-navy-950 hover:bg-slate-50"
                  }`}
                >
                  <span className={`block font-display text-xs font-extrabold uppercase tracking-wider ${
                    activeLifecycleStep === idx ? "text-orange-400" : "text-orange-600"
                  }`}>
                    Phase {step.phase}
                  </span>
                  <span className="block text-xs font-extrabold mt-1 truncate">{step.title}</span>
                </button>
              ))}
            </div>

            {/* Interactive Details Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-premium min-h-[350px] flex flex-col justify-between relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLifecycleStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                >
                  {/* Left Column: Description & Statistics */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="font-display font-black text-4xl text-orange-500/25 select-none">{lifecycleSteps[activeLifecycleStep].phase}</span>
                      <div>
                        <span className="text-[10px] text-orange-600 uppercase font-bold tracking-widest block">
                          {lifecycleSteps[activeLifecycleStep].subtitle}
                        </span>
                        <h3 className="font-display font-extrabold text-xl text-navy-950 mt-0.5">
                          {lifecycleSteps[activeLifecycleStep].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-navy-600 leading-relaxed">
                      {lifecycleSteps[activeLifecycleStep].desc}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                      <span>{lifecycleSteps[activeLifecycleStep].stat}</span>
                    </div>
                  </div>

                  {/* Right Column: Compliance and Deliverables */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Compliance Box */}
                    <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                      <span className="text-[10px] text-navy-950 font-bold uppercase tracking-wider block">Compliance Codes & Standards</span>
                      <p className="text-xs text-navy-600 font-semibold italic">
                        {lifecycleSteps[activeLifecycleStep].codes}
                      </p>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] text-navy-950 font-bold uppercase tracking-wider block">Released Deliverables:</span>
                      <div className="space-y-2">
                        {lifecycleSteps[activeLifecycleStep].deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2.5 text-xs text-navy-600">
                            <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-semibold">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 7: PROJECT PORTFOLIO */}
        <section id="portfolio" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Our Work</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Featured Engineering Masterpieces
              </h2>
              <p className="mt-4 text-sm text-navy-600 max-w-2xl mx-auto leading-relaxed">
                Browse our recent design-build consultations, structural drawings, and BIM layouts validated and executed successfully.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Tata Projects Industrial Shed", category: "Industrial Plan / BIM Model", area: "45,000 sq.ft", loc: "Taloja MIDC, Mumbai", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800", status: "Completed" },
                { title: "G+3 Smart Commercial Hub", category: "Architectural & Structural Detailing", area: "12,400 sq.ft", loc: "Viman Nagar, Pune", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", status: "Completed" },
                { title: "Residential Villa complex", category: "Architectural Planning & Interior", area: "18,500 sq.ft (5 units)", loc: "Whitefield, Bengaluru", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800", status: "Ongoing" },
                { title: "Steel Portal Frame Warehouse", category: "PEB Steel Structural Design", area: "60,000 sq.ft", loc: "Sanand GIDC, Gujarat", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800", status: "Completed" },
              ].map((proj, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group border border-slate-200 rounded-2xl overflow-hidden hover:shadow-premium-lg transition-all duration-300 flex flex-col md:flex-row shadow-sm bg-white"
                >
                  <div className="md:w-1/2 h-56 md:h-auto overflow-hidden relative">
                    <img 
                      src={proj.img} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-navy-950 text-white font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {proj.status}
                    </span>
                  </div>
                  <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] text-orange-500 font-extrabold uppercase tracking-wide">{proj.category}</span>
                      <h3 className="font-display font-extrabold text-base text-navy-950 mt-1.5 leading-snug">{proj.title}</h3>
                      <div className="space-y-1.5 mt-3 text-xs text-navy-600">
                        <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {proj.loc}</p>
                        <p className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Built Area: {proj.area}</p>
                      </div>
                    </div>
                    <a href="#contact" className="inline-flex items-center gap-1 text-xs font-bold text-navy-950 hover:text-orange-500 uppercase tracking-wider">
                      View Project Case study <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: CUSTOMER TESTIMONIALS */}
        <section className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Testimonials</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                What Our Clients Say
              </h2>
            </div>

            {/* Testimonial Active Display Card with Fade Animation */}
            <div className="max-w-4xl mx-auto min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-premium flex flex-col md:flex-row items-center gap-8 relative"
                >
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-24 h-24 rounded-2xl object-cover shadow-premium border border-slate-100"
                  />
                  <div className="space-y-4 flex-grow text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-navy-950 text-sm md:text-base leading-relaxed italic">
                      "{testimonials[activeTestimonial].review}"
                    </p>
                    <div>
                      <h4 className="font-display font-extrabold text-base text-navy-950">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-xs text-navy-600 font-medium">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Selector dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === idx ? "w-6 bg-orange-500 shadow-orange-glow" : "w-2 bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: BLOGS AND INSIGHTS */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Technical Journal</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Engineering & Quantity Survey Insights
              </h2>
              <p className="mt-4 text-sm text-navy-600 max-w-2xl mx-auto leading-relaxed">
                Stay updated with the latest technological strides in BIM LOD modeling, smart materials, and structural cost optimizations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  title: "Modern Cost Optimizations in G+3 Construction Foundations", 
                  desc: "How smart steel rebar scheduling and structural aggregate design mix ratios can save up to 15% on your foundation's engineering budget.", 
                  date: "June 2, 2026", 
                  category: "Cost Engineering", 
                  img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=600",
                  tag: "Technical Note",
                  file: "Foundation_Detail_G3.pdf"
                },
                { 
                  title: "BIM Coordination: LOD 300 vs LOD 400 Standards in Commercial Sites", 
                  desc: "Evaluating spatial tolerances and Level of Development coordinate structures to eliminate MEP clashes prior to ground breaking.", 
                  date: "May 28, 2026", 
                  category: "BIM Modeling", 
                  img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
                  tag: "White Paper",
                  file: "BIM_LOD_400_Matrix.pdf"
                },
                { 
                  title: "Design Principles for PEB Industrial Steel Truss Warehouses", 
                  desc: "Calculating portal frame stresses, dynamic wind loads, and seismic displacements for long-span pre-engineered steel storage structures.", 
                  date: "May 15, 2026", 
                  category: "Industrial Design", 
                  img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600",
                  tag: "Design Standard",
                  file: "PEB_Steel_Truss_Specs.dwg"
                },
              ].map((blog, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group border border-slate-200 hover:border-navy-950 rounded-2xl overflow-hidden hover:shadow-premium-lg transition-all duration-300 flex flex-col justify-between bg-white shadow-sm"
                >
                  <div>
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={blog.img} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 right-3 bg-navy-950/80 backdrop-blur-sm text-white font-bold text-[9px] px-2.5 py-1 rounded uppercase tracking-wider">
                        {blog.tag}
                      </span>
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-bold text-navy-600 uppercase tracking-wide">
                        <span>{blog.category}</span>
                        <span>{blog.date}</span>
                      </div>
                      <h3 className="font-display font-extrabold text-sm text-navy-950 leading-snug group-hover:text-orange-500 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-[11px] text-navy-600 leading-relaxed">
                        {blog.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-slate-50 mt-4 pt-4">
                    <a href="#contact" className="inline-flex items-center gap-1 text-[10px] font-extrabold text-navy-950 hover:text-orange-500 uppercase tracking-widest">
                      Read Article <ArrowRight className="h-3 w-3" />
                    </a>
                    <button
                      onClick={() => triggerDownload(blog.file)}
                      className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded text-[10px] uppercase tracking-wider transition-all shadow-sm"
                    >
                      <DownloadIcon className="h-3.5 w-3.5" />
                      Get Blueprint
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10: SUSTAINABILITY SECTION */}
        <section className="relative py-24 bg-navy-950 text-white overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1600"
              alt="Sustainable Infrastructure"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy-950"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-900 text-emerald-400 text-xs font-semibold">
                  <Leaf className="h-3.5 w-3.5" />
                  <span>Green Buildings & Sustainability</span>
                </div>
                <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Eco-Conscious Structural Engineering
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  We integrate carbon-footprint reduction, smart materials, energy-efficient HVAC schematics, and rainwater harvesting structures directly into our blueprint designs.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                    <span>Smart Concrete Recyclables</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                    <span>MEP Solar Grid Integrations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                    <span>LID Water Runoff Drainage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                    <span>Optimized Steel Truss Weights</span>
                  </div>
                </div>
              </div>

              {/* Graphic cards */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Carbon Auditing", val: 18, suffix: "%", desc: "Embedded carbon load in footings" },
                  { title: "Water Savings", val: 30, suffix: "%", desc: "Rainwater structures designed" },
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.15 }}
                    className="bg-glass-dark border border-white/5 p-6 rounded-2xl text-center flex flex-col justify-center"
                  >
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">{item.title}</span>
                    <p className="text-4xl font-extrabold font-display text-emerald-400 my-2">
                      -<AnimatedCounter value={item.val} suffix={item.suffix} />
                    </p>
                    <p className="text-[11px] text-slate-300">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 11: FAQ SECTION */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">FAQ Desk</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-slate-200 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center p-5 bg-white hover:bg-slate-50 transition-colors font-bold text-sm text-navy-950 text-left"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4.5 w-4.5 text-navy-600 transition-transform duration-300 ${
                        isOpen ? "transform rotate-180" : ""
                      }`} />
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-5 bg-slate-50 border-t border-slate-100 text-xs text-navy-600 leading-relaxed">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 12: CONTACT SECTION */}
        <section id="contact" className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Contacts info */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Get In Touch</span>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">
                    Discuss Your Project
                  </h2>
                  <p className="mt-4 text-xs text-navy-600 leading-relaxed">
                    Have architectural drafts, municipal drawings, or a commercial design concept ready? Connect with our project engineering desk for immediate guidance.
                  </p>
                </div>

                <div className="space-y-4">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="https://wa.me/912067345000" 
                    target="_blank" 
                    className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 hover:border-orange-500 transition-all text-xs text-navy-950 font-bold"
                  >
                    <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-navy-600">WhatsApp Chat</span>
                      <span>+91 20 6734 5000</span>
                    </div>
                  </motion.a>

                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs text-navy-950 font-bold">
                    <div className="h-9 w-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-navy-600">Call Engineering Desk</span>
                      <span>+91 20 6734 5000</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs text-navy-950 font-bold">
                    <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-navy-600">Corporate Email</span>
                      <span>projects@civilathand.com</span>
                    </div>
                  </div>
                </div>

                {/* Google Map Mockup */}
                <div className="h-44 rounded-xl overflow-hidden border border-slate-200 relative">
                  <div className="absolute inset-0 bg-slate-200 flex flex-col items-center justify-center text-center p-4">
                    <MapPin className="h-6 w-6 text-orange-500 animate-bounce mb-1" />
                    <span className="text-xs font-bold text-navy-950">Civil At Hand Headquarters</span>
                    <span className="text-[10px] text-navy-600 mt-0.5">Synergy Business Park, Kalyani Nagar, Pune</span>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <form onSubmit={handleContactSubmit} className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-premium space-y-4">
                <h3 className="font-display font-extrabold text-lg text-navy-950 mb-2 uppercase tracking-wide">
                  Schedule Free Technical Consultation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Patil"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 font-semibold text-navy-950"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 font-semibold text-navy-950"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 font-semibold text-navy-950"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-2">Required Engineering Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 font-semibold text-navy-950"
                  >
                    <option value="Architectural Design">Architectural Design & Planning</option>
                    <option value="Structural Design">Structural Design & detialing</option>
                    <option value="BOQ Estimation">BOQ Estimation & Takeoff</option>
                    <option value="BIM Services">BIM LOD Modeling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-2">Project Description</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your project built area, location, or upload drawings in the client portal."
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 font-semibold text-navy-950"
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-orange-glow"
                >
                  {contactSuccess ? (
                    <>
                      <CheckCircle2 className="h-4.5 w-4.5" />
                      Consultation Request Received!
                    </>
                  ) : (
                    <>
                      Submit Consultation Request
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </form>

            </div>
          </div>
        </section>

      </main>

      <Footer />

      {/* Floating Blueprint Download Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl border shadow-premium-lg flex items-center gap-3 backdrop-blur-md ${
              toastMessage.startsWith("Success")
                ? "bg-emerald-950/90 border-emerald-800 text-emerald-400"
                : "bg-navy-950/90 border-navy-800 text-slate-300"
            }`}
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
              toastMessage.startsWith("Success") ? "bg-emerald-900/50 text-emerald-400" : "bg-orange-500/20 text-orange-500"
            }`}>
              {toastMessage.startsWith("Success") ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <svg className="animate-spin h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
            </div>
            <div className="text-xs font-bold font-display tracking-tight">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Custom Helper Icons to replace missing lucide icons
const FileTextIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

const SettingsIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.828c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.43l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);
