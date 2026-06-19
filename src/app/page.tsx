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
  Globe, 
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
const AnimatedCounter: React.FC<{ value: number | string; suffix?: string; duration?: number }> = ({ value, suffix = "", duration = 1.5 }) => {
  const [count, setCount] = useState<number | string>(typeof value === "number" ? 0 : value);

  useEffect(() => {
    if (typeof value !== "number") {
      setCount(value);
      return;
    }
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

  return <span>{typeof count === "number" ? count.toLocaleString("en-IN") : count}{suffix}</span>;
};

export default function Home() {
  const { addLead, blogs } = useProjects();
  
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



  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    { name: "Suresh Pillai", role: "VP Projects, InfraCorp Ltd.", review: "Their BIM LOD 400 modeling saved us lakhs in onsite clash resolution. The site supervision audits and digital checklists kept our steel fabrication perfectly aligned with drawings.", rating: 5, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150" },
    { name: "Rahul Mehta", role: "Project Director, Mehta Infrastructure Pvt. Ltd.", review: "We were struggling with delays in estimation and BOQ preparation. Civil At Hand provided a smart and reliable solution that improved both speed and accuracy. Their services have added real value to our workflow.", rating: 5, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150" },
    { name: "Priya Sharma", role: "Senior Civil Engineer, UrbanEdge Consultants", review: "Civil At Hand has become a trusted partner for our estimation and drafting requirements. Their technical expertise, quick delivery, and attention to detail are truly impressive. Highly recommended for civil engineering professionals and firms.", rating: 5, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" }
  ];



  // Framer Motion Animation Variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        <section className="relative min-h-screen flex items-center bg-wix-dark text-white overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
          {/* Background Image with Dark Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1600" 
              alt="Industrial Engineering" 
              className="w-full h-full object-cover opacity-45 object-center"
            />
            <div className="absolute inset-0 bg-wix-dark/65"></div>
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
                  className="inline-flex items-center gap-1.5 rounded-md bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs font-bold text-orange-400 shadow-sm uppercase tracking-widest"
                >
                  <Cpu className="h-3.5 w-3.5" />
                  <span>Next-Gen Engineering Technology</span>
                </motion.div>
                
                <motion.h1 
                  variants={heroItemVariants}
                  className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight uppercase"
                >
                  Engineering Excellence <span className="block text-orange-500 mt-2 font-black">Powered by Automation</span>
                </motion.h1>
                
                <motion.p 
                  variants={heroItemVariants}
                  className="text-sm text-slate-300 max-w-xl leading-relaxed font-medium"
                >
                  Planning, Design, Quantity Estimation, Construction Automation, and Project Management in One Cohesive Platform.
                </motion.p>
                
                <motion.div 
                  variants={heroItemVariants}
                  className="flex flex-wrap gap-4 pt-2"
                >
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <a
                      href="#contact"
                      className="inline-block rounded-md bg-orange-500 hover:bg-orange-600 px-7 py-4 text-xs font-bold text-white transition-all duration-300 uppercase tracking-widest shadow-sm"
                    >
                      Get Free Consultation
                    </a>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                    <a
                      href="#services"
                      className="inline-block rounded-md border border-slate-500 hover:border-white hover:bg-white/10 px-7 py-4 text-xs font-bold text-white transition-all duration-300 uppercase tracking-widest"
                    >
                      Explore Services
                    </a>
                  </motion.div>
                </motion.div>
              </div>

              {/* Animated Statistics */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {[
                  { value: 21, suffix: "+", label: "Projects Completed", desc: "Residential & Commercial Solutions" },
                  { value: 11, suffix: "+", label: "Happy Clients", desc: "Trusted by Homeowners & Businesses" },
                  { value: 100, suffix: "%", label: "Commitment", desc: "Quality, Accuracy & Professional Service" },
                  { value: "FAST", suffix: " DELIVERY", label: "On-Time", desc: "Project Execution" },
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    variants={heroItemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 backdrop-blur-sm p-5 rounded-md border border-white/10 flex flex-col justify-between shadow-sm transition-all duration-300 hover:border-orange-500/50"
                  >
                    <div>
                      <p className="text-2xl font-extrabold font-display text-orange-500 tracking-tight">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </p>
                      <p className="text-xs font-bold mt-1 text-white uppercase tracking-wider">{stat.label}</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-3">{stat.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: TRUST SECTION */}
        <section className="bg-white py-6 md:py-8 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {[
                { title: "Rapid Turnaround", label: "CAD Detailing", icon: Clock, desc: "24-48hr vectorization and structural drawings delivery." },
                { title: "AI-Powered Quantities", label: "Automated Estimations", icon: Cpu, desc: "IS-code standardized material calculations and BOQs." },
                { title: "Global Remote Engineering", label: "Global Delivery", icon: Globe, desc: "Serving builders, architects and contractors worldwide." },
                { title: "Secure Milestone Payments", label: "Secure Payments", icon: ShieldCheck, desc: "Pay project-wise with complete transparency." },
              ].map((badge, idx) => {
                const Icon = badge.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="px-6 py-4 md:py-6 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-5 w-5 text-orange-500" />
                        <h3 className="text-xs font-bold text-wix-dark uppercase tracking-widest">{badge.title}</h3>
                      </div>
                      <p className="text-[10px] text-orange-600 font-extrabold uppercase tracking-widest">{badge.label}</p>
                      <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">{badge.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES SECTION */}
        <section id="services" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Our Capabilities</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-wix-dark sm:text-4xl uppercase">
                End-to-End Civil & Structural Services
              </h2>
              <p className="mt-4 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Combining senior-level human expertise with automated design verification to deliver top-tier drawings, models, and estimations.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, delay: (idx % 3) * 0.05 }}
                    className="group border border-slate-200 hover:border-wix-dark rounded-md p-6 bg-white hover:bg-slate-50/50 transition-all duration-300 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="h-10 w-10 rounded-md bg-slate-50 text-wix-dark group-hover:bg-wix-dark group-hover:text-white flex items-center justify-center mb-4 border border-slate-200 transition-colors">
                        <Icon className="h-5.5 w-5.5 text-orange-500" />
                      </div>
                      <h3 className="font-display font-bold text-sm text-wix-dark mb-2 leading-tight uppercase tracking-wider">
                        {service.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        {service.desc}
                      </p>
                    </div>
                    <div className="pt-5 mt-auto">
                      <Link href={service.href || "#contact"} className="text-[10px] font-extrabold text-orange-500 hover:text-wix-dark uppercase tracking-widest flex items-center gap-1">
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
        <section id="sectors" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Industries We Serve</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-wix-dark sm:text-4xl uppercase">
                Broad Spectrum Engineering Sectors
              </h2>
              <p className="mt-4 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
                From luxury domestic houses to high-tolerance heavy factories, our team delivers optimized structural planning tailored to industry specifications.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sectors.map((sector, idx) => {
                const Icon = sector.icon;
                return (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                    className="group relative h-80 rounded-md overflow-hidden border border-slate-200 flex flex-col justify-end p-6 transition-all duration-300 hover:border-wix-dark shadow-sm hover:shadow-md"
                  >
                    {/* Background image */}
                    <div className="absolute inset-0 z-0">
                      <img 
                        src={sector.image} 
                        alt={sector.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-wix-dark/95 via-wix-dark/60 to-transparent transition-all duration-300 group-hover:from-wix-dark group-hover:via-wix-dark/85"></div>
                    </div>

                    <div className="relative z-10 text-white space-y-2.5 w-full">
                      <div className="flex justify-between items-center">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-orange-500 text-white border border-orange-600">
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                      </div>
                      
                      <h3 className="font-display font-extrabold text-lg tracking-tight uppercase">{sector.title}</h3>
                      <p className="text-xs text-slate-300 leading-normal group-hover:opacity-0 group-hover:h-0 group-hover:overflow-hidden transition-all duration-300">{sector.desc}</p>
                      
                      {/* Floating specs shown on hover */}
                      <div className="opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40 transition-all duration-300 space-y-2">
                        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">Engineering Specs:</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {sector.specs?.map((spec, sIdx) => (
                            <span key={sIdx} className="bg-white/10 backdrop-blur-sm border border-white/10 text-[9px] font-bold text-slate-200 px-2 py-1 rounded-sm">
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
        <section className="py-24 bg-wix-cream border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Service Lifecycle</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-wix-dark sm:text-4xl uppercase">
                Concept to Commissioning: Engineering Pipeline
              </h2>
              <p className="mt-4 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Click through the 6 stages of our integrated engineering and construction verification workflow to see our rigorous standards and deliverable sets.
              </p>
            </motion.div>

            {/* Interactive Step Timeline Headers */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 mb-10">
              {lifecycleSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveLifecycleStep(idx)}
                  className={`p-4 rounded-md border text-left transition-all duration-300 ${
                    activeLifecycleStep === idx 
                      ? "bg-wix-dark border-wix-dark text-white shadow-sm" 
                      : "bg-white border-slate-200 text-wix-dark hover:bg-slate-50"
                  }`}
                  suppressHydrationWarning
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
            <div className="bg-white border border-slate-200 rounded-md p-6 md:p-10 shadow-sm min-h-[350px] flex flex-col justify-between relative overflow-hidden">
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
                      <span className="font-display font-black text-4xl text-orange-500/20 select-none">{lifecycleSteps[activeLifecycleStep].phase}</span>
                      <div>
                        <span className="text-[10px] text-orange-600 uppercase font-bold tracking-widest block">
                          {lifecycleSteps[activeLifecycleStep].subtitle}
                        </span>
                        <h3 className="font-display font-extrabold text-xl text-wix-dark mt-0.5 uppercase tracking-wide">
                          {lifecycleSteps[activeLifecycleStep].title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {lifecycleSteps[activeLifecycleStep].desc}
                    </p>
                    <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 border border-orange-100 px-3 py-1.5 rounded-md text-xs font-bold shadow-sm">
                      <CheckCircle2 className="h-4.5 w-4.5" />
                      <span>{lifecycleSteps[activeLifecycleStep].stat}</span>
                    </div>
                  </div>

                  {/* Right Column: Compliance and Deliverables */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Compliance Box */}
                    <div className="bg-wix-cream border border-slate-200/80 p-4 rounded-md space-y-2">
                      <span className="text-[10px] text-wix-dark font-bold uppercase tracking-widest block">Compliance Codes & Standards</span>
                      <p className="text-xs text-slate-600 font-bold italic">
                        {lifecycleSteps[activeLifecycleStep].codes}
                      </p>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5">
                      <span className="text-[10px] text-wix-dark font-bold uppercase tracking-widest block">Released Deliverables:</span>
                      <div className="space-y-2">
                        {lifecycleSteps[activeLifecycleStep].deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-center gap-2.5 text-xs text-slate-600">
                            <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-bold text-slate-700">{item}</span>
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
        <section id="portfolio" className="py-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Our Work</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-wix-dark sm:text-4xl uppercase">
                Featured Engineering Masterpieces
              </h2>
              <p className="mt-4 text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
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
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (idx % 2) * 0.1 }}
                  className="group border border-slate-200 rounded-md overflow-hidden hover:border-wix-dark transition-all duration-300 flex flex-col md:flex-row shadow-sm bg-white"
                >
                  <div className="md:w-1/2 h-56 md:h-auto overflow-hidden relative">
                    <img 
                      src={proj.img} 
                      alt={proj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-wix-dark text-white font-bold text-[9px] px-3 py-1 rounded-none uppercase tracking-widest">
                      {proj.status}
                    </span>
                  </div>
                  <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] text-orange-500 font-extrabold uppercase tracking-widest">{proj.category}</span>
                      <h3 className="font-display font-extrabold text-base text-wix-dark mt-1.5 leading-snug uppercase tracking-wide">{proj.title}</h3>
                      <div className="space-y-1.5 mt-3 text-xs text-slate-500 font-medium">
                        <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-slate-400" /> {proj.loc}</p>
                        <p className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-slate-400" /> Built Area: {proj.area}</p>
                      </div>
                    </div>
                    <a href="#contact" className="inline-flex items-center gap-1.5 text-xs font-bold text-wix-dark hover:text-orange-500 uppercase tracking-widest transition-colors">
                      View Project Case study <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8: CUSTOMER TESTIMONIALS */}
        <section className="py-24 bg-wix-cream border-y border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={scrollRevealVariants}
              className="text-center mb-16"
            >
              <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Testimonials</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-wix-dark sm:text-4xl uppercase">
                What Our Clients Say
              </h2>
            </motion.div>

            {/* Testimonial Active Display Card with Fade Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="max-w-4xl mx-auto min-h-[220px]"
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white border border-slate-200 rounded-md p-6 md:p-10 shadow-sm flex flex-col md:flex-row items-center gap-8 relative hover:border-wix-dark transition-all duration-300"
                >
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-24 h-24 rounded-md object-cover border border-slate-200 shadow-sm"
                  />
                  <div className="space-y-4 flex-grow text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-wix-dark text-sm md:text-base leading-relaxed italic font-medium">
                      "{testimonials[activeTestimonial].review}"
                    </p>
                    <div>
                      <h4 className="font-display font-extrabold text-base text-wix-dark uppercase tracking-wider">{testimonials[activeTestimonial].name}</h4>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">{testimonials[activeTestimonial].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Selector dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeTestimonial === idx ? "w-6 bg-wix-dark" : "w-2 bg-slate-300"
                  }`}
                  suppressHydrationWarning
                />
              ))}
            </div>
          </div>
        </section>



        {/* SECTION 10: SUSTAINABILITY SECTION */}
        <section className="relative py-24 bg-wix-dark text-white overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0 opacity-15">
            <img
              src="https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&q=80&w=1600"
              alt="Sustainable Infrastructure"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-wix-dark"></div>
          </div>

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainerVariants}
                className="lg:col-span-6 space-y-6"
              >
                <motion.div 
                  variants={heroItemVariants}
                  className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-emerald-400 text-xs font-bold uppercase tracking-widest"
                >
                  <Leaf className="h-3.5 w-3.5" />
                  <span>Green Buildings & Sustainability</span>
                </motion.div>
                <motion.h2 
                  variants={heroItemVariants}
                  className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl uppercase"
                >
                  Eco-Conscious Structural Engineering
                </motion.h2>
                <motion.p 
                  variants={heroItemVariants}
                  className="text-sm text-slate-300 leading-relaxed font-medium"
                >
                  We integrate carbon-footprint reduction, smart materials, energy-efficient HVAC schematics, and rainwater harvesting structures directly into our blueprint designs.
                </motion.p>
                <motion.div 
                  variants={heroItemVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold uppercase tracking-widest text-slate-300"
                >
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
                </motion.div>
              </motion.div>

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
                    className="bg-white/5 border border-white/10 p-6 rounded-md text-center flex flex-col justify-center shadow-sm hover:border-emerald-500/50 transition-all duration-300"
                  >
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.title}</span>
                    <p className="text-4xl font-extrabold font-display text-emerald-400 my-2">
                      -<AnimatedCounter value={item.val} suffix={item.suffix} />
                    </p>
                    <p className="text-[11px] text-slate-300 font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* SECTION 12: CONTACT SECTION */}
        <section id="contact" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Contacts info */}
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainerVariants}
                className="lg:col-span-5 space-y-6"
              >
                <motion.div variants={heroItemVariants}>
                  <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest block mb-2">Get In Touch</span>
                  <h2 className="font-display text-3xl font-extrabold tracking-tight text-wix-dark sm:text-4xl uppercase">
                    Discuss Your Project
                  </h2>
                  <p className="mt-4 text-xs text-slate-600 leading-relaxed font-medium">
                    Have architectural drafts, municipal drawings, or a commercial design concept ready? Connect with our project engineering desk for immediate guidance.
                  </p>
                </motion.div>

                <div className="space-y-4">
                  <motion.a 
                    variants={heroItemVariants}
                    whileHover={{ y: -2 }}
                    href="https://wa.me/message/JNVZ7YY6BQJ3L1" 
                    target="_blank" 
                    className="flex items-center gap-4 bg-white p-4 rounded-md border border-slate-200 hover:border-wix-dark transition-all text-xs text-wix-dark font-bold shadow-sm"
                  >
                    <div className="h-9 w-9 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0 border border-emerald-100">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-widest">WhatsApp Chat</span>
                      <span className="text-[10px] text-slate-400 mt-1 font-semibold">Connect Instantly</span>
                    </div>
                  </motion.a>

                  <motion.a 
                    variants={heroItemVariants}
                    whileHover={{ y: -2 }}
                    href="tel:+917703977002"
                    className="flex items-center gap-4 bg-white p-4 rounded-md border border-slate-200 hover:border-wix-dark transition-all text-xs text-wix-dark font-bold shadow-sm"
                  >
                    <div className="h-9 w-9 rounded-md bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 border border-orange-100">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-widest">Call Engineering Desk</span>
                      <span>+91 770-39-770-02</span>
                    </div>
                  </motion.a>

                  <motion.a 
                    variants={heroItemVariants}
                    whileHover={{ y: -2 }}
                    href="mailto:info.civilathand@zohomail.in"
                    className="flex items-center gap-4 bg-white p-4 rounded-md border border-slate-200 hover:border-wix-dark transition-all text-xs text-wix-dark font-bold shadow-sm"
                  >
                    <div className="h-9 w-9 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-500 tracking-widest">Corporate Email</span>
                      <span>info.civilathand@zohomail.in</span>
                    </div>
                  </motion.a>
                </div>

                {/* Google Map Mockup */}
                <motion.div 
                  variants={heroItemVariants}
                  className="h-44 rounded-md overflow-hidden border border-slate-200 relative shadow-sm"
                >
                  <div className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center text-center p-4">
                    <MapPin className="h-6 w-6 text-orange-500 animate-bounce mb-1" />
                    <span className="text-xs font-bold text-wix-dark uppercase tracking-widest">Civil At Hand Headquarters</span>
                    <span className="text-[10px] text-slate-500 mt-1 font-semibold">Haryana, India</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.form 
                initial={{ opacity: 0, x: 25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                onSubmit={handleContactSubmit} 
                className="lg:col-span-7 bg-white border border-slate-200 rounded-md p-6 md:p-8 shadow-sm space-y-5"
              >
                <h3 className="font-display font-extrabold text-lg text-wix-dark mb-2 uppercase tracking-wide">
                  Schedule Free Technical Consultation
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Patil"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all"
                      suppressHydrationWarning
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all"
                      suppressHydrationWarning
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all"
                    suppressHydrationWarning
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">Required Engineering Service</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all"
                    suppressHydrationWarning
                  >
                    <option value="Architectural Design">Architectural Design & Planning</option>
                    <option value="Structural Design">Structural Design & detailing</option>
                    <option value="BOQ Estimation">BOQ Estimation & Takeoff</option>
                    <option value="BIM Services">BIM LOD Modeling</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">Project Description</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your project built area, location, or upload drawings in the client portal."
                    className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all"
                    suppressHydrationWarning
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full bg-wix-dark hover:bg-orange-500 text-white font-bold py-4 rounded-md text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  suppressHydrationWarning
                >
                  {contactSuccess ? (
                    <>
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-400" />
                      Consultation Request Received!
                    </>
                  ) : (
                    <>
                      Submit Consultation Request
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>
              </motion.form>

            </div>
          </div>
        </section>

        {/* Latest Insights / Blog Section */}
        <section className="py-24 bg-wix-dark text-white border-t border-white/5 relative z-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold text-orange-400 uppercase tracking-widest block mb-2">Our Journal</span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl uppercase">
                Latest Engineering <span className="text-orange-500 font-black">Insights</span>
              </h2>
              <p className="mt-3 text-sm text-slate-300 font-medium">
                Explore tech briefs, building regulations audits, rebar schedules guidelines, and industry news published by our team.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs
                .filter((p) => p.status === "published")
                .slice(0, 3)
                .map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-md overflow-hidden group flex flex-col h-full hover:border-orange-500/50 transition-all duration-300 shadow-sm"
                  >
                    <div className="h-44 overflow-hidden relative bg-slate-900 border-b border-white/10">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] bg-orange-500 text-white px-2 py-0.5 rounded-none font-bold uppercase tracking-widest shadow-sm">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-2 text-xs">
                        <div className="flex gap-3 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.author}</span>
                        </div>
                        <h4 className="font-display font-extrabold text-base text-white group-hover:text-orange-400 transition-colors line-clamp-2 leading-snug uppercase tracking-wide">
                          {post.title}
                        </h4>
                        <p className="text-slate-300 leading-relaxed line-clamp-3 font-medium">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link
                          href={`/blog/${post.id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-400 hover:text-white uppercase tracking-widest transition-colors"
                        >
                          Read Post <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/blog"
                className="inline-block bg-white hover:bg-orange-500 text-wix-dark hover:text-white border border-white/10 font-bold px-8 py-4 text-xs uppercase tracking-widest transition-all rounded-md cursor-pointer"
              >
                View Engineering Blog <ArrowRight className="inline-block h-4 w-4 ml-1.5" />
              </Link>
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
