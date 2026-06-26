"use client";

import React, { useState } from "react";
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
  Clock,
  MessageCircle,
  Briefcase,
  Send,
} from "lucide-react";

const services = [
  "Structural Design",
  "BOQ Estimation",
  "Quantity Surveying",
  "PDF to AutoCAD",
  "BIM Services",
  "Interior Design",
  "Other / General Enquiry",
];

const contactCards = [
  {
    icon: Mail,
    title: "Email Us",
    value: "info@civilathand.in",
    desc: "We respond to all emails within 24 business hours.",
    href: "mailto:info@civilathand.in",
    cta: "Send Email",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+91 — via Client Portal",
    desc: "Fastest way to share drawings and get a quick quote.",
    href: "/dashboard",
    cta: "Open Portal",
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "Mon – Sat, 9 AM – 7 PM IST",
    desc: "Project deliverables dispatched on all working days.",
    href: null,
    cta: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Basic validation
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // Send via the existing leads API that powers the homepage contact form
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          service: form.service || "General Enquiry",
          message: form.message,
          source: "Contact Page",
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setError("Something went wrong. Please email us directly at info@civilathand.in");
      }
    } catch {
      setError("Network error. Please email us directly at info@civilathand.in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-wix-gray">
      <Header />

      <main className="flex-grow">

        {/* ── Page Header ── */}
        <section className="bg-wix-dark text-white py-16 md:py-20 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block mb-3">
              Get In Touch
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight uppercase leading-tight">
              Contact <span className="text-orange-500">Civil At Hand</span>
            </h1>
            <p className="mt-4 text-sm text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Share your project requirements and our engineering team will respond within 24 hours 
              with a detailed scope, timeline, and proposal.
            </p>
          </div>
        </section>

        {/* ── Contact Cards ── */}
        <section className="py-14 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-wix-gray border border-slate-200 rounded-md p-7 hover:border-orange-400 hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-orange-500/10 rounded-md flex items-center justify-center mb-5 group-hover:bg-orange-500 transition-colors">
                    <card.icon className="h-5 w-5 text-orange-500 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">
                    {card.title}
                  </p>
                  <p className="font-display font-extrabold text-base text-wix-dark uppercase tracking-wide mb-2">
                    {card.value}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">{card.desc}</p>
                  {card.href && card.cta && (
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-500 hover:text-wix-dark uppercase tracking-widest transition-colors"
                    >
                      {card.cta} <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact Form + Info ── */}
        <section className="py-20 md:py-28 bg-wix-gray">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-14 items-start">

              {/* Left — Info Panel */}
              <div className="lg:col-span-2">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-3">
                  Why Contact Us
                </span>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-wix-dark uppercase leading-tight mb-6">
                  Your Project,<br />
                  <span className="text-orange-500">Our Priority</span>
                </h2>
                <div className="space-y-4 mb-8">
                  {[
                    "Structural design validated against IS 456, IS 800, IS 1786",
                    "BOQ estimates using CPWD DSR 2023 rates",
                    "BIM deliverables at LOD 300–400 with clash reports",
                    "PDF to AutoCAD conversion with full dimension accuracy",
                    "Turnaround in 24–72 hours for standard projects",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-semibold">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-wix-dark rounded-md p-6 space-y-4">
                  <p className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">
                    Direct Contact
                  </p>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <a
                      href="mailto:info@civilathand.in"
                      className="font-medium hover:text-orange-400 transition-colors"
                    >
                      info@civilathand.in
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <span className="font-medium">India — Remote-first, Global Delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <Clock className="h-4 w-4 text-orange-400 flex-shrink-0" />
                    <span className="font-medium">Mon – Sat · 9 AM – 7 PM IST</span>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-3 text-xs uppercase tracking-widest rounded-md transition-all w-full justify-center"
                    >
                      <Briefcase className="h-4 w-4" />
                      Access Client Portal
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right — Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-white border border-slate-200 rounded-md p-8 md:p-10 shadow-sm">

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-5">
                        <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      </div>
                      <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">
                        Message Received
                      </p>
                      <h3 className="font-display text-xl font-extrabold text-wix-dark uppercase mb-3">
                        Thank You!
                      </h3>
                      <p className="text-sm text-slate-500 font-medium mb-8 leading-relaxed max-w-sm mx-auto">
                        Our engineering team will review your enquiry and get back to you within 24 business hours.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="inline-flex items-center gap-2 bg-wix-dark hover:bg-orange-500 text-white font-bold px-6 py-3 text-xs uppercase tracking-widest rounded-md transition-all"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-8">
                        <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-1">
                          Send a Message
                        </p>
                        <h2 className="font-display text-xl font-extrabold text-wix-dark uppercase tracking-wide">
                          Start a Consultation
                        </h2>
                      </div>

                      <div className="space-y-5">
                        {/* Name & Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">
                              Full Name <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Your full name"
                              className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">
                              Email Address <span className="text-orange-500">*</span>
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all"
                            />
                          </div>
                        </div>

                        {/* Phone & Service */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">
                              Phone / WhatsApp
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={form.phone}
                              onChange={handleChange}
                              placeholder="+91 XXXXXXXXXX"
                              className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">
                              Service Required
                            </label>
                            <select
                              name="service"
                              value={form.service}
                              onChange={handleChange}
                              className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all appearance-none cursor-pointer"
                            >
                              <option value="">Select a service</option>
                              {services.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label className="block text-[10px] font-bold text-wix-dark uppercase tracking-widest mb-2">
                            Project Description <span className="text-orange-500">*</span>
                          </label>
                          <textarea
                            name="message"
                            rows={5}
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Describe your project — built-up area, location, structure type, drawings available, or any specific requirements."
                            className="w-full bg-white border border-slate-300 rounded-md px-3 py-3 text-xs focus:outline-none focus:border-wix-dark focus:ring-0 text-slate-800 font-semibold transition-all resize-none"
                          />
                        </div>

                        {/* Error message */}
                        {error && (
                          <p className="text-xs text-red-500 font-bold bg-red-50 border border-red-200 rounded-md px-4 py-3">
                            {error}
                          </p>
                        )}

                        {/* Submit */}
                        <button
                          onClick={handleSubmit}
                          disabled={loading}
                          className="w-full bg-wix-dark hover:bg-orange-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-md text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4" />
                              Submit Consultation Request
                            </>
                          )}
                        </button>

                        <p className="text-[10px] text-slate-400 text-center font-medium">
                          By submitting this form, you agree to our{" "}
                          <Link href="/privacy-policy" className="text-orange-500 hover:underline">
                            Privacy Policy
                          </Link>
                          . We never share your information with third parties.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Bottom CTA Strip ── */}
        <section className="py-16 bg-orange-500">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight mb-3">
              Need Instant Answers?
            </h2>
            <p className="text-sm text-orange-100 font-medium mb-8 max-w-xl mx-auto">
              Log in to the Client Portal to upload drawings, track your project, and chat directly 
              with our engineers — all in one place.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white hover:bg-wix-dark text-orange-500 hover:text-white font-bold px-8 py-4 text-xs uppercase tracking-widest rounded-md transition-all"
            >
              Open Client Portal <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
