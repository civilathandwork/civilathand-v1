"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProjects } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Menu,
  X,
  User,
  Settings,
  Check,
  Info,
  AlertTriangle,
  GraduationCap,
  ChevronDown,
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
const LinktreeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="m13.73635 5.85251 4.00467-4.11665 2.3248 2.3808-4.20064 4.00466h5.9085v3.30473h-5.9365l4.22865 4.10766-2.3248 2.3338L12.0005 12.099l-5.74052 5.76852-2.3248-2.3248 4.22864-4.10766h-5.9375V8.12132h5.9085L3.93417 4.11666l2.3248-2.3808 4.00468 4.11665V0h3.4727zm-3.4727 10.30614h3.4727V24h-3.4727z" />
  </svg>
);

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [eduDropdownOpen, setEduDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomeDark = isHome && !scrolled;
  const { notifications, markNotificationsAsRead } = useProjects();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const isAdminView = pathname.startsWith("/cah-expert-control");
  const isDashboardView = pathname.startsWith("/dashboard");
  const isEducationActive = pathname.startsWith("/education");

  const currentNotifs = notifications
    .filter((n) => n.isAdmin === isAdminView)
    .slice(0, 5);
  const unreadCount = notifications.filter(
    (n) => n.isAdmin === isAdminView && !n.read
  ).length;

  const handleNotifClick = () => {
    setNotifDropdownOpen(!notifDropdownOpen);
    if (!notifDropdownOpen && unreadCount > 0) markNotificationsAsRead(isAdminView);
  };

  // FIXED: All nav links now point to correct routes
  const navLinks = [
    { name: "Services", href: "/services/all-services" },
    { name: "Calculators", href: "/calculators" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const educationLinks = [
    { name: "Education Home", href: "/education", desc: "Overview of all programs" },
    { name: "Test Series", href: "/education/test-series", desc: "GATE, ESE, SSC-JE mocks" },
    { name: "1-on-1 Mentorship", href: "/education/mentorship", desc: "Book a session" },
    { name: "Courses", href: "/education/courses", desc: "Software & skill courses" },
    { name: "FAQ", href: "/faq", desc: "Common questions answered" },
  ];

  return (
    <header
      className={`z-50 w-full transition-all duration-300 ${
        isHome
          ? scrolled
            ? "fixed top-0 left-0 bg-white/95 border-b border-slate-200/60 text-wix-dark shadow-sm backdrop-blur-md"
            : "absolute top-0 left-0 bg-transparent border-b border-white/5 text-white"
          : "sticky top-0 bg-white/95 border-b border-slate-200/60 text-wix-dark"
      }`}
    >
      {/* Upper Utility Bar */}
      <div
        className={`bg-slate-900 border-b border-slate-800 text-slate-300 text-[10px] hidden md:block transition-all duration-300 overflow-hidden ${
          scrolled ? "max-h-0 py-0 border-b-0 opacity-0" : "max-h-10 py-1.5 opacity-100"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white uppercase tracking-wider">Civil At Hand Group</span>
            <span className="text-slate-700">|</span>
            <Link href="/" className="hover:text-orange-500 transition-colors">Corporate Home</Link>
            <span className="text-slate-700">|</span>
            <Link href="/education" className="hover:text-orange-500 transition-colors font-bold text-orange-400">
              CAH Education
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:+917703977002" className="hover:text-orange-500 transition-colors font-bold text-slate-300">
              +91 770-39-770-02
            </a>
            <span className="text-slate-700">|</span>
            <Link href="/dashboard" className="hover:text-orange-500 transition-colors font-bold">
              Customer Connect
            </Link>
            {isAdminView && (
              <>
                <span className="text-slate-700">|</span>
                <Link href="/cah-expert-control" className="hover:text-orange-500 transition-colors font-bold">
                  Expert Connect
                </Link>
              </>
            )}
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2.5 ml-1">
              <a href="https://x.com/CivilAtHand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors"><TwitterIcon className="h-3.5 w-3.5" /></a>
              <a href="https://www.linkedin.com/company/civil-at-hand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors"><LinkedinIcon className="h-3.5 w-3.5" /></a>
              <a href="https://www.instagram.com/civilathand/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors"><InstagramIcon className="h-3.5 w-3.5" /></a>
              <a href="https://www.youtube.com/@civilathand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors"><YoutubeIcon className="h-3.5 w-3.5" /></a>
              <a href="https://linktr.ee/civilathand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors"><LinktreeIcon className="h-3.5 w-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ scale: 1.05, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-wix-dark overflow-hidden shadow-sm border border-slate-100"
              >
                <img src="/logo.jpg" alt="Civil At Hand Logo" className="h-full w-full object-cover" />
              </motion.div>
              <div>
                <span className={`font-display text-xl font-extrabold tracking-tight ${isHomeDark ? "text-white" : "text-wix-dark"}`}>
                  CIVIL <span className="text-orange-500 font-bold">AT HAND</span>
                </span>
                <span className={`block text-[10px] font-bold uppercase tracking-widest ${isHomeDark ? "text-slate-400" : "text-slate-500"}`}>
                  Design and consultancy
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 group py-1 ${
                  isHomeDark ? "text-slate-300 hover:text-white" : "text-wix-dark hover:text-orange-500"
                } ${pathname === link.href ? "text-orange-500" : ""}`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Education Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setEduDropdownOpen(true)}
              onMouseLeave={() => setEduDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 py-1 ${
                  isHomeDark ? "text-slate-300 hover:text-white" : "text-wix-dark hover:text-orange-500"
                } ${isEducationActive ? "text-orange-500" : ""}`}
              >
                <GraduationCap className="h-3.5 w-3.5" />
                Education
                <ChevronDown className={`h-3 w-3 transition-transform ${eduDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {eduDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg border border-slate-200 z-50 overflow-hidden"
                  >
                    <div className="bg-wix-dark px-4 py-3">
                      <p className="text-[9px] font-bold text-orange-400 uppercase tracking-widest">Civil At Hand</p>
                      <p className="text-xs font-extrabold text-white font-display uppercase">Education Platform</p>
                    </div>
                    {educationLinks.map((el) => (
                      <Link
                        key={el.name}
                        href={el.href}
                        className="flex flex-col px-4 py-3 hover:bg-orange-50 border-b border-slate-100 last:border-0 transition-colors group"
                      >
                        <span className="text-[11px] font-bold text-wix-dark group-hover:text-orange-500 uppercase tracking-wide transition-colors">{el.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5">{el.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-3">
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/917703977002"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all ${
                isHomeDark
                  ? "bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500 hover:text-white"
                  : "bg-green-50 border border-green-200 text-green-700 hover:bg-green-500 hover:text-white hover:border-green-500"
              }`}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.464L0 24zm6.59-4.846c1.6.95 3.18 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.115-2.905-6.99C16.546 1.876 14.067 1.05 11.433 1.05 6.002 1.05 1.575 5.473 1.571 10.908c-.001 1.764.477 3.486 1.385 5.017l-.952 3.478 3.565-.935zM17.487 14.39c-.3-.15-1.782-.88-2.062-.98-.28-.1-.486-.15-.69.15-.204.3-.788 1-.965 1.2-.178.2-.355.22-.655.07-1.35-.67-2.4-1.19-3.35-2.82-.25-.43.25-.4.72-1.35.07-.15.03-.28-.02-.38-.05-.1-.486-1.18-.666-1.61-.176-.42-.37-.36-.5-.36-.13 0-.28-.02-.43-.02-.15 0-.39.06-.59.28-.2.22-.78.76-.78 1.86s.8 2.16.91 2.31c.11.15 1.56 2.39 3.79 3.36 1.07.47 1.9.76 2.54.96.85.27 1.62.23 2.23.14.68-.1 1.782-.73 2.032-1.4.25-.67.25-1.25.17-1.37-.08-.12-.28-.2-.58-.35z"/>
              </svg>
              WhatsApp
            </a>

            {/* Notification Bell */}
            <div className="relative">
              <motion.button
                onClick={handleNotifClick}
                animate={unreadCount > 0 && !notifDropdownOpen ? { rotate: [0, -15, 15, -15, 15, 0] } : {}}
                transition={{ repeat: Infinity, repeatDelay: 3, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`relative rounded-full p-2 transition-all duration-200 focus:outline-none ${
                  isHomeDark ? "text-slate-300 hover:bg-white/10 hover:text-white" : "text-wix-dark hover:bg-slate-100 hover:text-orange-500"
                }`}
                suppressHydrationWarning
              >
                <Bell className="h-5 w-5" />
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white ring-2 ring-white"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {notifDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-80 rounded-xl bg-white p-2 shadow-lg ring-1 ring-slate-200 border border-slate-100 z-50 origin-top-right"
                  >
                    <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                      <span className="font-display font-bold text-sm text-wix-dark">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">{unreadCount} New</span>
                      )}
                    </div>
                    <div className="mt-1 divide-y divide-slate-50 max-h-72 overflow-y-auto">
                      {currentNotifs.length === 0 ? (
                        <div className="py-6 text-center text-xs text-slate-400">No new notifications</div>
                      ) : (
                        currentNotifs.map((notif) => (
                          <div key={notif.id} className="p-3 hover:bg-slate-50 transition-colors rounded-lg flex items-start gap-2.5">
                            <div className="mt-0.5">
                              {notif.type === "success" ? <Check className="h-4 w-4 text-emerald-500" /> : notif.type === "warning" ? <AlertTriangle className="h-4 w-4 text-amber-500" /> : <Info className="h-4 w-4 text-sky-500" />}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-wix-dark">{notif.title}</p>
                              <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{notif.message}</p>
                              <span className="text-[9px] text-slate-400 mt-1 block">{notif.timestamp}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="mt-1 border-t border-slate-100 pt-1.5 flex justify-end">
                      <button onClick={() => setNotifDropdownOpen(false)} className="text-[10px] text-slate-400 hover:text-wix-dark font-bold px-3 py-1">Close</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Client Portal */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/dashboard"
                className={`flex items-center gap-1.5 border px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 ${
                  isDashboardView
                    ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                    : isHomeDark
                    ? "bg-white border-white text-wix-dark hover:bg-transparent hover:text-white"
                    : "bg-wix-dark border-wix-dark text-white hover:bg-transparent hover:text-wix-dark"
                }`}
              >
                <User className="h-3.5 w-3.5" />
                Client Portal
              </Link>
            </motion.div>

            {isAdminView && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/cah-expert-control"
                  className={`flex items-center gap-1.5 border px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 bg-transparent ${
                    isHomeDark ? "border-white text-white hover:bg-white hover:text-wix-dark" : "border-wix-dark text-wix-dark hover:bg-wix-dark hover:text-white"
                  }`}
                >
                  <Settings className="h-3.5 w-3.5" />
                  Admin Panel
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={handleNotifClick}
              className={`relative rounded-full p-2 transition-all ${isHomeDark ? "text-white hover:bg-white/10" : "text-wix-dark hover:bg-slate-100"}`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[8px] font-bold text-white ring-2 ring-white">{unreadCount}</span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`rounded-lg p-2 transition-all focus:outline-none ${isHomeDark ? "text-white hover:bg-white/10" : "text-wix-dark hover:bg-slate-100"}`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-t overflow-hidden px-4 py-4 shadow-lg ${
              isHomeDark ? "bg-wix-dark border-white/10 text-white" : "bg-white border-slate-100 text-wix-dark"
            }`}
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold py-2.5 px-2 rounded-md transition-colors ${
                    isHomeDark ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-wix-dark hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className={`border-t my-2 ${isHomeDark ? "border-white/10" : "border-slate-100"}`} />
              <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest px-2 mb-1">Education</p>
              {educationLinks.map((el) => (
                <Link
                  key={el.name}
                  href={el.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold py-2.5 px-2 rounded-md transition-colors ${
                    isHomeDark ? "text-slate-300 hover:text-white hover:bg-white/5" : "text-wix-dark hover:text-orange-500 hover:bg-orange-50"
                  }`}
                >
                  {el.name}
                </Link>
              ))}
              <div className={`border-t my-2 ${isHomeDark ? "border-white/10" : "border-slate-100"}`} />
              <a
                href="https://wa.me/917703977002"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold bg-green-500 text-white mb-2"
              >
                WhatsApp Us
              </a>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-xs font-bold transition-all ${
                  isHomeDark ? "bg-white text-wix-dark" : "bg-wix-dark text-white"
                }`}
              >
                <User className="h-4 w-4" />
                Client Portal
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
