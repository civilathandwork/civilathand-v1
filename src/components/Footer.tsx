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

const InstagramIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.29 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const TelegramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 8.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
  </svg>
);

const PinterestIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.24 2C6.59 2 2 6.58 2 12.23c0 4.33 2.71 8.01 6.6 9.43-.1-.83-.19-2.07.04-2.96.21-.8 1.37-5.81 1.37-5.81s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.48.75 1.48 1.65 0 1-.64 2.51-.97 3.9-.28 1.17.59 2.12 1.74 2.12 2.09 0 3.7-2.2 3.7-5.38 0-2.81-2.02-4.78-4.91-4.78-3.35 0-5.32 2.51-5.32 5.11 0 1 .39 2.09.88 2.68.1.12.11.22.08.34l-.33 1.33c-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.63 0-3.77 2.74-7.24 7.92-7.24 4.16 0 7.39 2.96 7.39 6.91 0 4.13-2.6 7.45-6.22 7.45-1.21 0-2.36-.63-2.75-1.37l-.75 2.84c-.27 1.04-.99 2.34-1.48 3.13C10.74 21.84 11.48 22 12.24 22 17.89 22 22.48 17.41 22.48 11.77 22.48 6.12 17.89 2 12.24 2z"/>
  </svg>
);

const ThreadsIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.016 0C5.38 0 0 5.38 0 12.016c0 6.637 5.38 12.017 12.016 12.017c1.378 0 2.715-.226 3.992-.676a1.144 1.144 0 0 0 .763-1.077c0-.493-.314-.94-.783-1.083a1.144 1.144 0 0 0-1.265.342c-.85.834-1.892 1.256-3.09 1.256c-5.275 0-9.569-4.294-9.569-9.569c0-5.275 4.294-9.569 9.569-9.569c5.275 0 9.569 4.294 9.569 9.569c0 1.921-.497 3.527-1.478 4.774c-.982 1.246-2.316 1.879-3.966 1.879c-.838 0-1.569-.214-2.176-.638c-.606-.424-1.01-.986-1.201-1.672h-.056c-.25.864-.727 1.522-1.417 1.954c-.69.432-1.477.653-2.348.653c-1.583 0-2.846-.532-3.759-1.582c-.914-1.05-1.376-2.483-1.376-4.263c0-1.81.474-3.267 1.41-4.332c.937-1.066 2.228-1.609 3.84-1.609c1.025 0 1.9.274 2.595.816c.695.542 1.135 1.263 1.309 2.148h.056c.218-.84.664-1.477 1.328-1.899c.664-.421 1.455-.634 2.355-.634c2.203 0 3.992.83 5.319 2.469c1.328 1.639 2.001 3.864 2.001 6.619c0 6.636-5.38 12.016-12.016 12.016zM8.337 13.916c0 .991.226 1.761.677 2.288c.451.527 1.054.793 1.794.793c.712 0 1.272-.25 1.666-.745c.394-.495.594-1.199.594-2.094v-1.62c-.004-.799-.2-1.428-.59-1.87c-.389-.442-.94-.666-1.64-.666c-.722 0-1.282.253-1.668.752c-.386.499-.583 1.258-.583 2.25v1.212z"/>
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
            <div className="flex flex-wrap items-center gap-2">
              <a href="https://x.com/CivilAtHand" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="X (Twitter)">
                <TwitterIcon className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/civil-at-hand" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="LinkedIn">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com/civilathand/" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="Instagram">
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com/@civilathand" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="YouTube">
                <YoutubeIcon className="h-4 w-4" />
              </a>
              <a href="https://t.me/civilathand" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="Telegram">
                <TelegramIcon className="h-4 w-4" />
              </a>
              <a href="https://in.pinterest.com/civilathand" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="Pinterest">
                <PinterestIcon className="h-4 w-4" />
              </a>
              <a href="https://www.threads.com/@civilathand" target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-md bg-slate-800/60 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="Threads">
                <ThreadsIcon className="h-4 w-4" />
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
                <a href="tel:+917703977002" className="hover:text-orange-500 transition-colors">+91 770-39-770-02</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
                <a href="mailto:info.civilathand@gmail.com" className="hover:text-orange-500 transition-colors">info.civilathand@gmail.com</a>
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
            <Link href="/privacy-policy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-slate-300">Terms & Conditions</Link>
            <Link href="/engineering-disclaimer" className="hover:text-slate-300">Engineering Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
