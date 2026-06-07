"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useProjects } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  User, 
  MapPin, 
  Building2, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Upload, 
  Calculator, 
  FileText,
  FileCheck,
  CheckCircle2,
  HardHat
} from "lucide-react";

type StylePreference = "modern" | "contemporary" | "traditional" | "luxury" | "minimalist";
type BuildingType = "residential" | "commercial" | "industrial";

export default function ArchitecturalDesignPage() {
  const { addLead } = useProjects();
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form States
  // 1. Customer Information
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [cityState, setCityState] = useState("");

  // 2. Plot Information
  const [plotLength, setPlotLength] = useState<number>(50);
  const [plotWidth, setPlotWidth] = useState<number>(30);
  const [plotArea, setPlotArea] = useState<number>(1500);
  const [plotLocation, setPlotLocation] = useState("");
  const [facingDirection, setFacingDirection] = useState<"North" | "East" | "South" | "West">("East");
  const [cornerPlot, setCornerPlot] = useState<"Yes" | "No">("No");
  const [roadWidth, setRoadWidth] = useState<number>(30);

  // Auto-calculate plot area on length/width change
  useEffect(() => {
    setPlotArea(plotLength * plotWidth);
  }, [plotLength, plotWidth]);

  // 3. Building Information
  const [buildingType, setBuildingType] = useState<BuildingType>("residential");
  const [floors, setFloors] = useState<number>(2);
  const [bedrooms, setBedrooms] = useState<number>(3);
  const [bathrooms, setBathrooms] = useState<number>(3);
  const [kitchenType, setKitchenType] = useState<"Standard" | "Open" | "Modular" | "Semi-Modular">("Modular");
  const [livingRoom, setLivingRoom] = useState<"Single" | "Double-height" | "Large Hall">("Single");
  const [parkingRequirement, setParkingRequirement] = useState<"Car + Bike" | "Car Only" | "Multiple Cars" | "None">("Car + Bike");
  const [balcony, setBalcony] = useState<"Yes" | "No">("Yes");
  const [garden, setGarden] = useState<"Yes" | "No">("No");
  const [stairType, setStairType] = useState<"Internal RCC" | "External RCC" | "Spiral Metal" | "Wooden" | "Open Riser">("Internal RCC");

  // 4. Design Preferences
  const [designStyle, setDesignStyle] = useState<StylePreference>("modern");

  // Document states (simulated uploads)
  const [docLayout, setDocLayout] = useState<string>("");
  const [docDeed, setDocDeed] = useState<string>("");
  const [docExisting, setDocExisting] = useState<string>("");
  const [docReference, setDocReference] = useState<string>("");

  // --- Real-time Estimation Engine ---
  // Built-up Area is typically ~80% ground coverage per floor
  const estimatedBuiltUpArea = Math.round(plotArea * 0.8 * floors);

  // Get construction rate per sq.ft based on parameters
  const getConstructionRate = () => {
    let baseRate = 1800; // default residential standard
    
    if (buildingType === "commercial") baseRate = 2400;
    if (buildingType === "industrial") baseRate = 3200;

    // Adjust for Design style
    const styleRates: Record<StylePreference, number> = {
      minimalist: 200,
      modern: 300,
      traditional: 100,
      contemporary: 500,
      luxury: 1200
    };

    return baseRate + styleRates[designStyle];
  };

  // Get architectural design fee rate per sq.ft
  const getDesignRate = () => {
    let baseRate = 15; // standard residential architectural fee per sqft

    if (buildingType === "commercial") baseRate = 22;
    if (buildingType === "industrial") baseRate = 28;

    const styleFees: Record<StylePreference, number> = {
      minimalist: 2,
      modern: 4,
      traditional: 5,
      contemporary: 7,
      luxury: 15
    };

    return baseRate + styleFees[designStyle];
  };

  const constructionRate = getConstructionRate();
  const totalConstructionCost = estimatedBuiltUpArea * constructionRate;

  const designRate = getDesignRate();
  const totalDesignFee = estimatedBuiltUpArea * designRate;

  const isDetailsFilled = 
    fullName.trim() !== "" && 
    mobileNumber.trim() !== "" && 
    email.trim() !== "" && 
    cityState.trim() !== "";

  // Form Navigation Handlers
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Submit Lead
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compile details string
    const details = `ARCHITECTURAL DETAILED SHEET:
- Plot: ${plotLength}x${plotWidth} (${plotArea} sqft), Facing: ${facingDirection}, Corner: ${cornerPlot}, Road: ${roadWidth}ft
- Location: ${plotLocation || "Not specified"}, City/State: ${cityState || "Not specified"}
- Structure: ${buildingType.toUpperCase()}, Floors: ${floors}, Bedrooms: ${bedrooms}, Bathrooms: ${bathrooms}
- Kitchen: ${kitchenType}, Living Room: ${livingRoom}, Stairs: ${stairType}
- Parking: ${parkingRequirement}, Balcony: ${balcony}, Garden: ${garden}
- Style Preference: ${designStyle.toUpperCase()}
- Uploaded Files: ${[
      docLayout && `Layout: ${docLayout}`,
      docDeed && `Deed: ${docDeed}`,
      docExisting && `Existing: ${docExisting}`,
      docReference && `Reference: ${docReference}`
    ].filter(Boolean).join(", ") || "None"}
- Est. Built-Up Area: ${estimatedBuiltUpArea} sqft
- Est. Construction Budget: ₹${totalConstructionCost.toLocaleString("en-IN")}
- Est. Design Fee: ₹${totalDesignFee.toLocaleString("en-IN")}`;

    addLead({
      name: fullName || "Architectural Request User",
      email: email || "no-email@civilathand.com",
      phone: mobileNumber || "+91 00000 00000",
      service: "Architectural Design",
      source: "Detailed Estimation Form",
      details
    });

    setSubmitted(true);
  };

  const formSteps = [
    { num: 1, name: "Customer Info", icon: User },
    { num: 2, name: "Plot details", icon: MapPin },
    { num: 3, name: "Building details", icon: Building2 },
    { num: 4, name: "Design & uploads", icon: Sparkles }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12 relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb / Back Navigation */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-500 hover:text-white transition-colors duration-200">
              <ArrowLeft className="h-4 w-4" /> Back to Services
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Architectural Design <span className="text-orange-500">Estimator</span>
            </h1>
            <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
              Get an instant structural and design estimate by providing your plot specifics, floor plans requirements, and design expectations.
            </p>
          </div>

          {!submitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Wizard */}
              <div className={`${step > 1 ? "lg:col-span-8" : "lg:col-span-8 lg:col-start-3"} bg-glass-dark border border-white/5 rounded-2xl p-6 md:p-8 shadow-premium space-y-8`}>
                
                {/* Step Indicators */}
                <div className="grid grid-cols-4 gap-2 border-b border-white/5 pb-6">
                  {formSteps.map((s) => {
                    const Icon = s.icon;
                    const isActive = step === s.num;
                    const isCompleted = step > s.num;
                    
                    return (
                      <div key={s.num} className="flex flex-col items-center text-center space-y-2">
                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center transition-all ${
                          isActive ? "bg-orange-500 text-white shadow-orange-glow" :
                          isCompleted ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                          "bg-navy-900/40 text-slate-500 border border-white/5"
                        }`}>
                          {isCompleted ? <Check className="h-4.5 w-4.5" /> : <Icon className="h-4.5 w-4.5" />}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wide hidden sm:block ${
                          isActive ? "text-orange-500" :
                          isCompleted ? "text-emerald-400" :
                          "text-slate-500"
                        }`}>
                          {s.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Form Wizard Pages */}
                <form onSubmit={step === 4 ? handleSubmit : handleNext} className="space-y-6 text-xs">
                  <AnimatePresence mode="wait">
                    
                    {/* STEP 1: Customer Info */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        className="space-y-6"
                      >
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <User className="h-4 w-4 text-orange-500" />
                          Step 1: Customer Identification
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Full Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Enter your full name"
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Mobile Number</label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. +91 98765 43210"
                              value={mobileNumber}
                              onChange={(e) => setMobileNumber(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Email Address</label>
                            <input
                              type="email"
                              required
                              placeholder="name@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">City & State</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Pune, Maharashtra"
                              value={cityState}
                              onChange={(e) => setCityState(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 2: Plot Details */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        className="space-y-6"
                      >
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-orange-500" />
                          Step 2: Plot and Geolocation Parameters
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Plot Length (feet)</label>
                            <input
                              type="number"
                              min="10"
                              max="1000"
                              value={plotLength}
                              onChange={(e) => setPlotLength(Number(e.target.value))}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Plot Width (feet)</label>
                            <input
                              type="number"
                              min="10"
                              max="1000"
                              value={plotWidth}
                              onChange={(e) => setPlotWidth(Number(e.target.value))}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Plot Area (sq. ft)</label>
                            <input
                              type="number"
                              disabled
                              value={plotArea}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-slate-400 font-semibold cursor-not-allowed"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Facing Direction</label>
                            <div className="grid grid-cols-4 gap-2">
                              {(["North", "East", "South", "West"] as const).map((dir) => (
                                <button
                                  key={dir}
                                  type="button"
                                  onClick={() => setFacingDirection(dir)}
                                  className={`py-2 text-center rounded-lg border font-bold transition-all ${
                                    facingDirection === dir
                                      ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                                  }`}
                                >
                                  {dir}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Corner Plot</label>
                            <div className="grid grid-cols-2 gap-2">
                              {(["Yes", "No"] as const).map((val) => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setCornerPlot(val)}
                                  className={`py-2 text-center rounded-lg border font-bold transition-all ${
                                    cornerPlot === val
                                      ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                                  }`}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Road Width (feet)</label>
                            <input
                              type="number"
                              min="5"
                              value={roadWidth}
                              onChange={(e) => setRoadWidth(Number(e.target.value))}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Plot Site Address / Location</label>
                            <input
                              type="text"
                              placeholder="e.g. Plot No. 24, Viman Nagar Layout"
                              value={plotLocation}
                              onChange={(e) => setPlotLocation(e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Building Information */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        className="space-y-6"
                      >
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-orange-500" />
                          Step 3: Building Architecture Specifications
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Building Scope Type</label>
                            <select
                              value={buildingType}
                              onChange={(e) => setBuildingType(e.target.value as BuildingType)}
                              className="w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 font-semibold text-white focus:outline-none focus:border-orange-500"
                            >
                              <option value="residential">Residential Home</option>
                              <option value="commercial">Commercial Space</option>
                              <option value="industrial">Industrial Setup</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Number of Floors</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={floors}
                              onChange={(e) => setFloors(Number(e.target.value))}
                              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Staircase Design Type</label>
                            <select
                              value={stairType}
                              onChange={(e) => setStairType(e.target.value as any)}
                              className="w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 font-semibold text-white focus:outline-none focus:border-orange-500"
                            >
                              <option value="Internal RCC">Internal Concrete (RCC)</option>
                              <option value="External RCC">External Concrete (RCC)</option>
                              <option value="Spiral Metal">Spiral Metal Style</option>
                              <option value="Wooden">Traditional Wooden</option>
                              <option value="Open Riser">Modern Open Riser</option>
                            </select>
                          </div>
                        </div>

                        {buildingType === "residential" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-white/5 pt-5">
                            <div className="space-y-2">
                              <label className="block font-bold text-slate-300 uppercase tracking-wide">Number of Bedrooms</label>
                              <input
                                type="number"
                                min="0"
                                value={bedrooms}
                                onChange={(e) => setBedrooms(Number(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block font-bold text-slate-300 uppercase tracking-wide">Number of Bathrooms</label>
                              <input
                                type="number"
                                min="0"
                                value={bathrooms}
                                onChange={(e) => setBathrooms(Number(e.target.value))}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 font-semibold"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="block font-bold text-slate-300 uppercase tracking-wide">Kitchen Style</label>
                              <select
                                value={kitchenType}
                                onChange={(e) => setKitchenType(e.target.value as any)}
                                className="w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 font-semibold text-white focus:outline-none focus:border-orange-500"
                              >
                                <option value="Modular">Modular Layout</option>
                                <option value="Semi-Modular">Semi-Modular Layout</option>
                                <option value="Open">Open Concept Kitchen</option>
                                <option value="Standard">Standard Enclosed</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="block font-bold text-slate-300 uppercase tracking-wide">Living Room Type</label>
                              <select
                                value={livingRoom}
                                onChange={(e) => setLivingRoom(e.target.value as any)}
                                className="w-full bg-navy-900 border border-white/10 rounded-lg px-3 py-2.5 font-semibold text-white focus:outline-none focus:border-orange-500"
                              >
                                <option value="Single">Single Standard Lounge</option>
                                <option value="Double-height">Double-Height Ceiling</option>
                                <option value="Large Hall">Large Multi-use Hall</option>
                              </select>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-white/5 pt-5">
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Parking Needs</label>
                            <select
                              value={parkingRequirement}
                              onChange={(e) => setParkingRequirement(e.target.value as any)}
                              className="w-full bg-navy-900 border border-white/10 rounded-lg px-2 py-2.5 font-semibold text-white focus:outline-none"
                            >
                              <option value="Car + Bike">Car & Bike Space</option>
                              <option value="Car Only">Car Only Space</option>
                              <option value="Multiple Cars">Multiple Garages</option>
                              <option value="None">No Parking Area</option>
                            </select>
                          </div>
                          
                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Balcony Area</label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {(["Yes", "No"] as const).map((val) => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setBalcony(val)}
                                  className={`py-2 text-center rounded-lg border font-bold transition-all ${
                                    balcony === val
                                      ? "bg-orange-500 border-orange-500 text-white"
                                      : "bg-white/5 border-white/10 text-slate-300"
                                  }`}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block font-bold text-slate-300 uppercase tracking-wide">Garden Space</label>
                            <div className="grid grid-cols-2 gap-1.5">
                              {(["Yes", "No"] as const).map((val) => (
                                <button
                                  key={val}
                                  type="button"
                                  onClick={() => setGarden(val)}
                                  className={`py-2 text-center rounded-lg border font-bold transition-all ${
                                    garden === val
                                      ? "bg-orange-500 border-orange-500 text-white"
                                      : "bg-white/5 border-white/10 text-slate-300"
                                  }`}
                                >
                                  {val}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 4: Design Style & Document Uploads */}
                    {step === 4 && (
                      <motion.div
                        key="step4"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        className="space-y-6"
                      >
                        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-orange-500 animate-pulse" />
                          Step 4: Design Aesthetics and Document Takeoffs
                        </h3>

                        {/* Style Choices */}
                        <div className="space-y-3">
                          <label className="block font-bold text-slate-300 uppercase tracking-wide">Architectural Design Style Theme</label>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {([
                              { id: "modern", name: "Modern" },
                              { id: "contemporary", name: "Contemporary" },
                              { id: "traditional", name: "Traditional" },
                              { id: "luxury", name: "Luxury Theme" },
                              { id: "minimalist", name: "Minimalist" }
                            ] as const).map((style) => (
                              <button
                                key={style.id}
                                type="button"
                                onClick={() => setDesignStyle(style.id)}
                                className={`py-3 px-1 text-center rounded-lg border font-bold capitalize transition-all ${
                                  designStyle === style.id
                                    ? "bg-orange-500 border-orange-500 text-white shadow-premium"
                                    : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                                }`}
                              >
                                {style.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* File Upload Grid */}
                        <div className="border-t border-white/5 pt-5 space-y-4">
                          <label className="block font-bold text-slate-300 uppercase tracking-wide">
                            Attach Site Verification Documents (Simulated Upload)
                          </label>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                              { label: "Plot Layout Drawing", val: docLayout, setter: setDocLayout, ph: "villa-layout-sheet.pdf" },
                              { label: "Sale Deed / Land Title", val: docDeed, setter: setDocDeed, ph: "sale-deed-extract.pdf" },
                              { label: "Existing Layout Drawings (if any)", val: docExisting, setter: setDocExisting, ph: "old-floor-layout.dwg" },
                              { label: "Design Reference / Ideas Images", val: docReference, setter: setDocReference, ph: "exterior-facade-concept.jpg" }
                            ].map((doc, idx) => (
                              <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between space-y-3">
                                <span className="font-bold text-slate-200">{doc.label}</span>
                                <div className="flex gap-2">
                                  <input
                                    type="text"
                                    placeholder={`e.g. ${doc.ph}`}
                                    value={doc.val}
                                    onChange={(e) => doc.setter(e.target.value)}
                                    className="bg-navy-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none w-full"
                                  />
                                  <div className="bg-orange-500 hover:bg-orange-600 text-white px-3.5 py-1.5 rounded-lg flex items-center justify-center cursor-pointer shadow-sm">
                                    <Upload className="h-4 w-4" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* Wizard Buttons */}
                  <div className="flex justify-between border-t border-white/5 pt-6 mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="bg-navy-900 border border-white/10 text-slate-300 hover:bg-white/10 rounded-lg px-6 py-2.5 font-bold transition-all uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <ChevronLeft className="h-4.5 w-4.5" /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="submit"
                      className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-8 py-2.5 font-bold transition-all shadow-orange-glow uppercase tracking-wider flex items-center gap-1.5"
                    >
                      {step === 4 ? (
                        <>
                          Generate & Submit <Check className="h-4.5 w-4.5" />
                        </>
                      ) : (
                        <>
                          Continue <ChevronRight className="h-4.5 w-4.5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: Live Estimate Widget */}
              {step > 1 && (
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Cost Dashboard Card */}
                  <div className="bg-glass-dark border border-white/5 rounded-2xl p-5 md:p-6 shadow-premium relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-32 w-32 bg-orange-500 rounded-full blur-3xl opacity-10 pointer-events-none"></div>
                    
                    <h3 className="font-display font-extrabold text-lg text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                      <Calculator className="h-5 w-5 text-orange-500" />
                      Live Estimate Report
                    </h3>

                    <div className="space-y-5 text-xs">
                      
                      {/* Dimension Summary */}
                      <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex justify-between items-center">
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-slate-400">Total Plot Area</span>
                          <span className="text-sm font-extrabold text-white font-display mt-0.5 block">{plotArea.toLocaleString("en-IN")} Sq. Ft.</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[9px] uppercase font-bold text-slate-400">Est. Built-up Area</span>
                          {step >= 3 ? (
                            <span className="text-sm font-extrabold text-orange-500 font-display mt-0.5 block">{estimatedBuiltUpArea.toLocaleString("en-IN")} Sq. Ft.</span>
                          ) : (
                            <span className="text-[10px] font-bold text-slate-500 mt-0.5 block italic">Awaiting Step 3</span>
                          )}
                        </div>
                      </div>

                      {step >= 3 ? (
                        <>
                          {/* Breakdown Items */}
                          <div className="space-y-4">
                            
                            {/* Design Fee */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-slate-200">
                                <span>Architectural Design Fee:</span>
                                <span className="text-white">₹{totalDesignFee.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="flex justify-between text-[10px] text-slate-400">
                                <span>Design fee rate:</span>
                                <span>₹{designRate}/sqft built-up</span>
                              </div>
                              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1.5">
                                <div className="bg-orange-500 h-full w-1/3 rounded-full" />
                              </div>
                            </div>

                            {/* Construction Cost */}
                            <div className="space-y-1">
                              <div className="flex justify-between font-bold text-slate-200">
                                <span>Est. Structural Cost:</span>
                                <span className="text-white">₹{totalConstructionCost.toLocaleString("en-IN")}</span>
                              </div>
                              <div className="flex justify-between text-[10px] text-slate-400">
                                <span>Average build rate:</span>
                                <span>₹{constructionRate}/sqft built-up</span>
                              </div>
                              <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mt-1.5">
                                <div className="bg-orange-500 h-full w-3/4 rounded-full" />
                              </div>
                            </div>

                          </div>

                          <hr className="border-white/5 my-4" />

                          {/* Total Summary */}
                          <div className="bg-navy-900/50 p-4 rounded-xl border border-white/5 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wide">Estimated Design Fee</span>
                              <span className="text-lg font-extrabold text-emerald-400 font-display">₹{totalDesignFee.toLocaleString("en-IN")}</span>
                            </div>
                            <p className="text-[10px] text-slate-400 leading-normal">
                              Includes conceptual blueprint layout, structural load audits, MEP drawings, and standard 3D CAD visualization facade sets.
                            </p>
                          </div>

                          {/* IS Code Compliance Notice */}
                          <div className="bg-orange-500/10 border border-orange-500/20 p-3.5 rounded-lg flex gap-2.5 items-start">
                            <HardHat className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5 animate-pulse" />
                            <div className="space-y-0.5">
                              <span className="block text-[9px] uppercase font-extrabold text-orange-400 tracking-wide">IS-Code Compliance</span>
                              <p className="text-[10px] text-slate-300 leading-normal">
                                Calculations generated using standard Indian Standard boundary coverage coefficients and loading parameters.
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="bg-orange-500/5 border border-orange-500/10 p-5 rounded-xl text-center space-y-2.5">
                          <Calculator className="h-7 w-7 text-orange-500/40 mx-auto animate-pulse" />
                          <div className="space-y-1">
                            <span className="block text-[10px] uppercase font-bold text-slate-300">Estimates Locked</span>
                            <p className="text-[9px] text-slate-500 leading-relaxed max-w-[200px] mx-auto">
                              Please complete Step 2 and proceed to Step 3 (Building Specifications) to calculate architectural fees and structural estimates.
                            </p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              )}

            </div>
          ) : (
            // Form Submitted Success view
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-glass-dark border border-white/5 rounded-2xl p-8 md:p-12 text-center max-w-xl mx-auto shadow-premium space-y-6"
            >
              <div className="h-16 w-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                <CheckCircle2 className="h-10 w-10 animate-bounce" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-extrabold text-2xl text-white">Design Request Received!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your customized plot and architecture details have been recorded. Our chartered engineers and design architects are currently auditing your parameters.
                </p>
              </div>

              <div className="bg-white/5 border border-white/5 rounded-xl p-4 text-xs text-left space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Estimated built-up area:</span>
                  <span className="font-bold text-white">{estimatedBuiltUpArea.toLocaleString("en-IN")} sq. ft</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Architectural Design fee:</span>
                  <span className="font-bold text-emerald-400">₹{totalDesignFee.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Turnaround Time:</span>
                  <span className="font-bold text-orange-400">24-48 Hours</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Link 
                  href="/"
                  className="bg-white/5 hover:bg-white/10 text-white rounded-lg px-6 py-2.5 text-xs font-bold text-center border border-white/10 uppercase tracking-wider"
                >
                  Return to Home
                </Link>
                <Link
                  href="/dashboard"
                  className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg px-6 py-2.5 text-xs font-bold text-center shadow-orange-glow uppercase tracking-wider"
                >
                  Check Portal Status
                </Link>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
