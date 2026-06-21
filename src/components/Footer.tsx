"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  FileCheck
} from "lucide-react";

export const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentYear = mounted ? new Date().getFullYear() : "";

  return (
    <footer className="bg-wix-dark text-slate-100 pt-16 pb-8 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-12 mb-12">
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
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-3 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-orange-500 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/#sectors" className="hover:text-orange-500 transition-colors">Market Sectors</Link>
              </li>
              <li>
                <Link href="/#calculators" className="hover:text-orange-500 transition-colors">Design Calculators</Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-orange-500 transition-colors">Project Portfolio</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-orange-500 transition-colors font-bold text-orange-500">Engineering Blog</Link>
              </li>
              <li>
                <Link href="/cah-expert-control" className="hover:text-orange-500 transition-colors text-[10px] mt-4 inline-block text-slate-600">Admin Login</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-bold text-xs text-white uppercase tracking-widest mb-5">Contact Details</h3>
            <ul className="space-y-4 text-xs text-slate-400 font-medium">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Navi Mumbai, Maharashtra, India<br/>Global Remote Services Available</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <a href="tel:+918169128529" className="hover:text-orange-500 transition-colors">+91 8169128529</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info.civilathand@zohomail.in" className="hover:text-orange-500 transition-colors">info.civilathand@zohomail.in</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:support@civilathand.in" className="hover:text-orange-500 transition-colors">support@civilathand.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-slate-500 font-medium">
            &copy; {currentYear} Civil At Hand. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[10px] text-slate-500 font-medium">
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/engineering-disclaimer" className="hover:text-white transition-colors">Engineering Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
