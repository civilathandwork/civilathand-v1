"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  FileCheck, 
  ArrowRight, 
  ShieldCheck 
} from "lucide-react";

const FacebookIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wix-dark text-slate-100 pt-16 pb-8 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white overflow-hidden shadow-sm border border-slate-700">
                <img src="/logo.jpg" alt="Civil At Hand Logo" className="h-full w-full object-cover" />
              </div>
              <span className="font-display text-lg font-extrabold tracking-tight text-white">
                CIVIL <span className="text-orange-500 font-bold">AT HAND</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Engineering excellence powered by smart automation. We deliver enterprise-grade structural design, quantity surveying, and BIM modeling to builders, architects, and industrial clients worldwide.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="#" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-5">Services & Tools</h3>
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/#services" className="hover:text-orange-500 transition-colors">Architectural Design</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-orange-500 transition-colors">Structural Detailing</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-orange-500 transition-colors">BIM Modelling & Coordination</Link>
              </li>
              <li>
                <Link href="/#calculators" className="hover:text-orange-500 transition-colors">Construction Cost Estimator</Link>
              </li>
              <li>
                <Link href="/#calculators" className="hover:text-orange-500 transition-colors">Steel & Concrete Calculators</Link>
              </li>
              <li>
                <Link href="/#calculators" className="hover:text-orange-500 transition-colors">AI BOQ Takeoffs</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-500 transition-colors font-bold text-orange-500">Engineering Blog</Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-5">Corporate Office</h3>
            <ul className="space-y-4 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>
                  Civil At Hand Design and consultancy,<br />
                  Synergy Business Park, Kalyani Nagar,<br />
                  Pune, MH, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>+91 770-39-770-02</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <span>info@civilathand.in</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Credentials */}
          <div>
            <div className="flex items-center gap-2 mb-4 bg-slate-800/40 p-3 rounded border border-slate-700">
              <ShieldCheck className="h-7 w-7 text-orange-500 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">ISO 9001:2015 Certified</p>
                <p className="text-[10px] text-slate-400">Quality Management Systems</p>
              </div>
            </div>
            
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe to our weekly civil engineering design and tech newsletter.
            </p>
            {subscribed ? (
              <p className="text-xs text-emerald-500 font-semibold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex border-b border-slate-700 focus-within:border-orange-500 transition-colors duration-300 pb-1">
                <input
                  type="email"
                  required
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-none px-1 py-2 text-xs text-slate-100 placeholder-slate-600 focus:outline-none"
                  suppressHydrationWarning
                />
                <button
                  type="submit"
                  className="text-slate-400 hover:text-white px-2 flex items-center justify-center transition-colors"
                  suppressHydrationWarning
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        <hr className="border-slate-800 mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© {currentYear} Civil At Hand : Design & Consultancy All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Engineering Disclaimers</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
