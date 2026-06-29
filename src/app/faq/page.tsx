"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ChevronDown, ArrowRight, MessageCircle } from "lucide-react";

const categories = [
  {
    label: "Engineering Services",
    color: "bg-orange-500",
    faqs: [
      { q: "What civil engineering services does Civil At Hand provide?", a: "We provide structural design (RCC and steel), BOQ estimation, quantity surveying, BIM coordination (LOD 300–400), PDF to AutoCAD conversion, and interior design services. All deliverables are IS code and CPWD DSR 2023 compliant." },
      { q: "How long does a typical structural design project take?", a: "Standard structural design for a G+2 residential building takes 3–5 working days. Industrial sheds and commercial structures take 5–10 working days depending on complexity. We provide a timeline after reviewing your drawings." },
      { q: "Do you work with clients outside India?", a: "Yes. We serve clients across India, the Middle East, and Southeast Asia. Our digital-first, remote-capable workflow makes international collaboration seamless. Deliverables are shared via secure cloud platforms." },
      { q: "What IS codes do you follow for structural design?", a: "We follow IS 456:2000 (RCC), IS 800:2007 (Steel Structures), IS 1786:2008 (Rebar), IS 875 (Loads), IS 1893 (Seismic), and NBC 2016. All designs include calculation sheets referencing the applicable code clauses." },
      { q: "What file formats do you deliver in?", a: "We deliver AutoCAD DWG files, PDF drawings, Excel sheets (BOQ, estimates), Revit files (BIM), and MS Word or PDF calculation reports — as required by the project scope." },
      { q: "Can you provide stamped/signed structural drawings?", a: "Yes. For projects requiring licensed engineer signatures, we can arrange stamped structural drawings. Please mention this requirement at the time of enquiry as it may affect the delivery timeline." },
    ],
  },
  {
    label: "Pricing & Payment",
    color: "bg-slate-700",
    faqs: [
      { q: "How is pricing determined for engineering services?", a: "Pricing depends on the scope, built-up area, structural complexity, and turnaround time required. We provide a fixed-price quote after reviewing your project drawings or brief. No hidden charges." },
      { q: "Do you offer payment in installments?", a: "For large projects, we offer a 50% advance and 50% on delivery model. Standard small projects are billed in full upfront. We currently accept bank transfer, UPI, and online payment methods." },
      { q: "Can we pay via online payment gateway?", a: "Yes. We are integrating a secure online payment system. Currently payments are accepted via UPI (PhonePe, Google Pay, Paytm), NEFT/RTGS bank transfer, and cheque for corporate clients." },
      { q: "Is there a refund policy?", a: <span>If work has not commenced, we offer a full refund. Once work is in progress, a partial refund based on work completed may be issued at our discretion. Please refer to our <Link href="/terms-and-conditions" className="text-orange-500 hover:text-orange-600 underline font-semibold">Terms & Conditions</Link> for full details.</span> },
    ],
  },
  {
    label: "BOQ & Estimation",
    color: "bg-orange-400",
    faqs: [
      { q: "What is a BOQ and why do I need one?", a: "A Bill of Quantities (BOQ) is a detailed document listing all materials, labour, and work items needed to complete a construction project with quantities and rates. It is essential for cost control, contractor tendering, and bank loan approval." },
      { q: "What rate schedule do you use for BOQ estimation?", a: "We use CPWD DSR 2023 (Central Public Works Department Data Schedule of Rates) as the base for rate analysis. We can also adapt to state-specific DSR (MPWD, PWD Haryana, etc.) as required by the client." },
      { q: "Can you prepare a BOQ from just an architectural drawing?", a: "Yes. We regularly prepare BOQs from architectural drawings, site plans, and structural drawings. If only architectural drawings are available, we prepare a preliminary BOQ with reasonable structural assumptions noted clearly." },
    ],
  },
  {
    label: "BIM Services",
    color: "bg-slate-600",
    faqs: [
      { q: "What BIM software do you use?", a: "We use Autodesk Revit for BIM modelling, Navisworks for clash detection and coordination, AutoCAD for 2D detailing, and BIM 360 for cloud collaboration. We can deliver files compatible with your project's BIM Execution Plan (BEP)." },
      { q: "What LOD (Level of Detail) do you deliver?", a: "We deliver BIM models at LOD 300 (design development) and LOD 400 (construction documentation including fabrication details). LOD 500 as-built models can also be prepared on request." },
      { q: "Do you provide clash detection reports?", a: "Yes. Clash detection using Navisworks is included in all BIM coordination projects. We provide a clash report in PDF and NWD format, with a clash matrix and resolution recommendations." },
    ],
  },
  {
    label: "Education — CAH Education",
    color: "bg-emerald-600",
    faqs: [
      { q: "What is Civil At Hand Education?", a: "Civil At Hand Education is our dedicated learning platform for civil engineering students and professionals. We offer GATE, ESE, and SSC-JE test series, 1-on-1 mentorship sessions with industry professionals, and practical software courses — all at the lowest prices in India." },
      { q: "Are the test series based on actual GATE and ESE exam patterns?", a: "Yes. All test series are designed by civil engineering professionals and exam toppers who have studied the actual GATE, ESE, and SSC-JE question patterns, difficulty levels, and mark distributions. Each test includes a detailed solution with concept explanation." },
      { q: "How does the 1-on-1 mentorship work?", a: "You select a mentor based on your goal (GATE preparation, career guidance, job interview prep, M.Tech admission, etc.) and book a 45-minute video session. The mentor sends you a pre-session questionnaire so your time is used effectively." },
      { q: "Will payment and enrollment be available online?", a: "Yes. We are building a complete online payment and enrollment system for all Education products. You will be able to purchase test series access, book mentorship sessions, and enroll in courses directly from the website using UPI, credit/debit cards, or net banking." },
      { q: "Are the software courses suitable for beginners?", a: "Yes. Our upcoming courses on AutoCAD, Revit, STAAD Pro, ETABS, and MS Project are designed for beginners to intermediate learners. Each course starts from the basics and builds up to real project workflows used in the industry." },
    ],
  },
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">

        {/* Hero */}
        <section className="bg-wix-dark py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest block mb-3">Help Center</span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white uppercase leading-tight">
              Frequently Asked <span className="text-orange-500">Questions</span>
            </h1>
            <p className="mt-4 text-sm text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
              Everything you need to know about Civil At Hand engineering services, pricing, BOQ, BIM, and our Education platform.
            </p>
          </div>
        </section>

        {/* Category pills */}
        <section className="py-8 bg-wix-gray border-b border-slate-200 sticky top-0 z-10">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <a key={cat.label} href={`#${cat.label.replace(/\s+/g, "-").toLowerCase()}`}
                  className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-slate-300 text-slate-600 hover:border-orange-500 hover:text-orange-500 transition-all bg-white">
                  {cat.label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 md:py-20 bg-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-16">
            {categories.map((cat) => (
              <div key={cat.label} id={cat.label.replace(/\s+/g, "-").toLowerCase()}>
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-2 h-8 ${cat.color} rounded-full`} />
                  <h2 className="font-display text-xl font-extrabold text-wix-dark uppercase tracking-tight">{cat.label}</h2>
                </div>
                <div className="space-y-3">
                  {cat.faqs.map((faq, i) => {
                    const key = `${cat.label}-${i}`;
                    const isOpen = openItems[key];
                    return (
                      <div key={key} className={`border rounded-md overflow-hidden transition-all ${isOpen ? "border-orange-400 shadow-sm" : "border-slate-200 hover:border-slate-300"}`}>
                        <button
                          onClick={() => toggle(key)}
                          className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-wix-gray transition-colors"
                        >
                          <span className="text-sm font-bold text-wix-dark leading-snug">{faq.q}</span>
                          <ChevronDown className={`h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-5 bg-white border-t border-slate-100">
                            <p className="text-sm text-slate-600 font-medium leading-relaxed pt-4">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Still have questions CTA */}
        <section className="py-16 bg-wix-gray border-t border-slate-200">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
              <MessageCircle className="h-7 w-7 text-orange-500" />
            </div>
            <h2 className="font-display text-2xl font-extrabold text-wix-dark uppercase mb-3">Still Have Questions?</h2>
            <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed">
              Our team is available Mon–Sat, 9 AM to 7 PM IST. Reach us via WhatsApp for the fastest response.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/917703977002" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                WhatsApp Us
              </a>
              <Link href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-wix-dark hover:bg-orange-500 text-white font-bold px-7 py-3.5 text-[11px] uppercase tracking-widest rounded-md transition-all">
                Contact Form <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
