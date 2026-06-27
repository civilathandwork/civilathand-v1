"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, GraduationCap, ArrowRight } from "lucide-react";

const SocialLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="h-9 w-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-all">
    {children}
  </a>
);

export const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const currentYear = mounted ? new Date().getFullYear() : "2026";

  return (
    <>
      {/* Pre-footer CTA */}
      <section className="bg-orange-500 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold text-orange-100 uppercase tracking-widest mb-1">Ready to Start?</p>
              <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white uppercase">
                Let's Build Something Together
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <a href="https://wa.me/917703977002" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-orange-500 hover:bg-wix-dark hover:text-white font-bold px-6 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.464L0 24zm6.59-4.846c1.6.95 3.18 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.905-6.99C16.546 1.876 14.067 1.05 11.433 1.05 6.002 1.05 1.575 5.473 1.571 10.908c-.001 1.764.477 3.486 1.385 5.017l-.952 3.478 3.565-.935z"/>
                </svg>
                WhatsApp Now
              </a>
              <Link href="/contact"
                className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-bold px-6 py-3 text-[11px] uppercase tracking-widest rounded-md transition-all">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-wix-dark text-slate-100 pt-16 pb-8 border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white overflow-hidden">
                  <img src="/logo.jpg" alt="Civil At Hand Logo" className="h-full w-full object-cover" />
                </div>
                <span className="font-display text-lg font-extrabold tracking-tight text-white">
                  CIVIL <span className="text-orange-500">AT HAND</span>
                </span>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                India's precision civil engineering consultancy. Structural design, BOQ estimation, BIM coordination, and digital drafting — IS-code compliant, delivered fast.
              </p>
              {/* Social Icons */}
              <div className="flex items-center gap-2">
                <SocialLink href="https://www.linkedin.com/company/civil-at-hand" label="LinkedIn">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </SocialLink>
                <SocialLink href="https://www.instagram.com/civilathand/" label="Instagram">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </SocialLink>
                <SocialLink href="https://x.com/CivilAtHand" label="X / Twitter">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </SocialLink>
                <SocialLink href="https://www.youtube.com/@civilathand" label="YouTube">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.73 3.56 12 3.56 12 3.56s-7.73 0-9.388.495a3.003 3.003 0 0 0-2.11 2.108C0 7.822 0 12 0 12s0 4.178.495 5.837a3.003 3.003 0 0 0 2.11 2.108C4.27 20.44 12 20.44 12 20.44s7.73 0 9.388-.495a3.003 3.003 0 0 0 2.11-2.108C24 16.178 24 12 24 12s0-4.178-.495-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </SocialLink>
                <SocialLink href="https://wa.me/917703977002" label="WhatsApp">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.464L0 24zm6.59-4.846c1.6.95 3.18 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.905-6.99C16.546 1.876 14.067 1.05 11.433 1.05 6.002 1.05 1.575 5.473 1.571 10.908c-.001 1.764.477 3.486 1.385 5.017l-.952 3.478 3.565-.935z"/></svg>
                </SocialLink>
              </div>
            </div>

            {/* Engineering Services */}
            <div>
              <h3 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-5">Engineering Services</h3>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                {[
                  ["Structural Design", "/services/all-services"],
                  ["BOQ Estimation", "/services/all-services"],
                  ["Quantity Surveying", "/services/all-services"],
                  ["BIM Services", "/services/all-services"],
                  ["PDF to AutoCAD", "/services/all-services"],
                  ["Interior Design", "/services/all-services"],
                  ["Free Calculators", "/calculators"],
                ].map(([name, href]) => (
                  <li key={name}>
                    <Link href={href} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-orange-500/50 flex-shrink-0" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <GraduationCap className="h-4 w-4 text-orange-400" />
                <h3 className="font-display font-bold text-xs text-white uppercase tracking-widest">CAH Education</h3>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
                {[
                  ["Education Home", "/education"],
                  ["Test Series — GATE", "/education/test-series"],
                  ["Test Series — ESE", "/education/test-series"],
                  ["Test Series — SSC-JE", "/education/test-series"],
                  ["1-on-1 Mentorship", "/education/mentorship"],
                  ["Software Courses", "/education/courses"],
                  ["Interview Prep", "/education/test-series"],
                ].map(([name, href]) => (
                  <li key={name}>
                    <Link href={href} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-orange-500/50 flex-shrink-0" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company + Contact */}
            <div>
              <h3 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-5">Company</h3>
              <ul className="space-y-2.5 text-xs text-slate-400 font-medium mb-7">
                {[
                  ["About Us", "/about"],
                  ["Portfolio", "/portfolio"],
                  ["Blog", "/blog"],
                  ["Contact Us", "/contact"],
                  ["FAQ", "/faq"],
                  ["Client Portal", "/dashboard"],
                  ["Privacy Policy", "/privacy-policy"],
                  ["Terms & Conditions", "/terms-and-conditions"],
                  ["Engineering Disclaimer", "/engineering-disclaimer"],
                ].map(([name, href]) => (
                  <li key={name}>
                    <Link href={href} className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-orange-500/50 flex-shrink-0" />
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="space-y-3">
                <a href="tel:+917703977002" className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-orange-400 transition-colors">
                  <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  +91 770-39-770-02
                </a>
                <a href="mailto:info.civilathand@zohomail.in" className="flex items-center gap-2.5 text-xs text-slate-400 hover:text-orange-400 transition-colors">
                  <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  info.civilathand@zohomail.in
                </a>
                <div className="flex items-start gap-2.5 text-xs text-slate-400">
                  <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  Haryana, India — Remote-first, Global Delivery
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-800 mb-6" />

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <p>© {currentYear} Civil At Hand : Design & Consultancy. All rights reserved.</p>
              <span className="hidden sm:block text-slate-700">|</span>
              <p className="text-slate-600">Made in India 🇮🇳</p>
            </div>
            <div className="flex gap-5">
              <Link href="/privacy-policy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="hover:text-slate-300 transition-colors">Terms</Link>
              <Link href="/engineering-disclaimer" className="hover:text-slate-300 transition-colors">Disclaimer</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
