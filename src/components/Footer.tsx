"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  FileCheck
} from "lucide-react";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.29 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const TelegramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 8.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.24 2C6.59 2 2 6.58 2 12.23c0 4.33 2.71 8.01 6.6 9.43-.1-.83-.19-2.07.04-2.96.21-.8 1.37-5.81 1.37-5.81s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.48.75 1.48 1.65 0 1-.64 2.51-.97 3.9-.28 1.17.59 2.12 1.74 2.12 2.09 0 3.7-2.2 3.7-5.38 0-2.81-2.02-4.78-4.91-4.78-3.35 0-5.32 2.51-5.32 5.11 0 1 .39 2.09.88 2.68.1.12.11.22.08.34l-.33 1.33c-.05.22-.17.27-.4.16-1.5-.7-2.43-2.88-2.43-4.63 0-3.77 2.74-7.24 7.92-7.24 4.16 0 7.39 2.96 7.39 6.91 0 4.13-2.6 7.45-6.22 7.45-1.21 0-2.36-.63-2.75-1.37l-.75 2.84c-.27 1.04-.99 2.34-1.48 3.13C10.74 21.84 11.48 22 12.24 22 17.89 22 22.48 17.41 22.48 11.77 22.48 6.12 17.89 2 12.24 2z" />
  </svg>
);

const ThreadsIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
  </svg>
);

const LinktreeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z" />
  </svg>
);

export const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const currentYear = mounted ? new Date().getFullYear() : "";

  return (
    <>
      {/* Connect With Us Section */}
      <section className="bg-wix-cream py-16 border-t border-slate-200/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-wix-dark tracking-tight text-center mb-10">
            Connect <span className="text-amber-500 italic font-serif font-medium">With Us</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/company/civil-at-hand"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-[#0077b5]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">LinkedIn</span>
            </a>

            <a
              href="https://www.instagram.com/civilathand/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-[#e1306c]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">Instagram</span>
            </a>

            <a
              href="https://x.com/CivilAtHand"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-slate-900">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">Twitter / X</span>
            </a>

            {/*
            <a
              href="https://www.threads.com/@civilathand"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-slate-900">
                <ThreadsIcon className="h-4 w-4" />
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">Threads</span>
            </a>
            */}

            <a
              href="https://www.youtube.com/@civilathand"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-[#ff0000]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.73 3.56 12 3.56 12 3.56s-7.73 0-9.388.495a3.003 3.003 0 0 0-2.11 2.108C0 7.822 0 12 0 12s0 4.178.495 5.837a3.003 3.003 0 0 0 2.11 2.108C4.27 20.44 12 20.44 12 20.44s7.73 0 9.388-.495a3.003 3.003 0 0 0 2.11-2.108C24 16.178 24 12 24 12s0-4.178-.495-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">YouTube</span>
            </a>

            {/*
            <a
              href="https://in.pinterest.com/civilathand"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-[#bd081c]">
                <PinterestIcon className="h-4 w-4" />
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">Pinterest</span>
            </a>
            */}

            {/*
            <a
              href="https://t.me/civilathand"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-[#0088cc]">
                <TelegramIcon className="h-4 w-4" />
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">Telegram</span>
            </a>
            */}

            <a
              href="https://whatsapp.com/channel/0029VbD0UJw3mFYFp3tWzF2X"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-[#25d366]">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.464L0 24zm6.59-4.846c1.6.95 3.18 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.905-6.99C16.546 1.876 14.067 1.05 11.433 1.05 6.002 1.05 1.575 5.473 1.571 10.908c-.001 1.764.477 3.486 1.385 5.017l-.952 3.478 3.565-.935zM17.487 14.39c-.3-.15-1.782-.88-2.062-.98-.28-.1-.486-.15-.69.15-.204.3-.788 1-.965 1.2-.178.2-.355.22-.655.07-1.35-.67-2.4-1.19-3.35-2.82-.25-.43.25-.4.72-1.35.07-.15.03-.28-.02-.38-.05-.1-.486-1.18-.666-1.61-.176-.42-.37-.36-.5-.36-.13 0-.28-.02-.43-.02-.15 0-.39.06-.59.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.56 2.39 3.79 3.36 1.07.47 1.9.76 2.54.96.85.27 1.62.23 2.23.14.68-.1 1.782-.73 2.032-1.4.25-.67.25-1.25.17-1.37-.08-.12-.28-.2-.58-.35z" />
                </svg>
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">WhatsApp Channel</span>
            </a>

            <a
              href="https://linktr.ee/civilathand"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-[#39E09B]">
                <LinktreeIcon className="h-4 w-4" />
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">Linktree</span>
            </a>

            {/*
            <a
              href="mailto:info.civilathand@zohomail.in"
              className="bg-slate-100/60 border border-slate-200/80 rounded-full px-5 py-2.5 flex items-center gap-3 text-xs font-bold text-wix-dark hover:bg-white hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
            >
              <div className="h-7 w-7 rounded-lg bg-slate-200/50 flex items-center justify-center text-blue-600">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <span className="font-display tracking-wide text-[11px] text-slate-700">Email Me</span>
            </a>
            */}
          </div>
        </div>
      </section>

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
                  <Link href="/services" className="hover:text-orange-500 transition-colors">Our Services</Link>
                </li>

                <li>
                  <Link href="/calculator" className="hover:text-orange-500 transition-colors">Design Calculators</Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-orange-500 transition-colors">Project Portfolio</Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-orange-500 transition-colors font-bold text-orange-500">Engineering Blog</Link>
                </li>
                <li>
                  <Link href="/#contact" className="hover:text-orange-500 transition-colors">Contact Us</Link>
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
                    Civil At Hand : Design and consultancy,<br />
                    Haryana, India
                  </span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-orange-500 flex-shrink-0" />
                  <a href="tel:+917703977002" className="hover:text-orange-500 transition-colors">+91 770-39-770-02</a>
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
    </>
  );
};
