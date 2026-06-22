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
  Briefcase, 
  Calculator, 
  User, 
  Settings, 
  Check, 
  Info, 
  AlertTriangle 
} from "lucide-react";

// Custom Social SVG Components for Header Top Utility Bar
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
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z" />
  </svg>
);

export const Header: React.FC = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially to check scroll on mount/refresh
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomeDark = isHome && !scrolled;
  const { notifications, markNotificationsAsRead } = useProjects();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const isAdminView = pathname.startsWith("/cah-expert-control");
  const isDashboardView = pathname.startsWith("/dashboard");

  // Filter notifications based on view
  const currentNotifs = notifications
    .filter((n) => n.isAdmin === isAdminView)
    .slice(0, 5);
  const unreadCount = notifications.filter((n) => n.isAdmin === isAdminView && !n.read).length;

  const handleNotifClick = () => {
    setNotifDropdownOpen(!notifDropdownOpen);
    if (!notifDropdownOpen && unreadCount > 0) {
      markNotificationsAsRead(isAdminView);
    }
  };

  const navLinks = [
    { name: "Services", href: "/#services" },
    { name: "Calculators", href: "/#calculators" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className={`z-50 w-full transition-all duration-300 ${
      isHome 
        ? scrolled 
          ? "fixed top-0 left-0 bg-white/95 border-b border-slate-200/60 text-wix-dark shadow-sm backdrop-blur-md" 
          : "absolute top-0 left-0 bg-transparent border-b border-white/5 text-white"
        : "sticky top-0 bg-white/95 border-b border-slate-200/60 text-wix-dark"
    }`}>
      {/* Upper Utility Bar (Dual-Tier) */}
      <div className={`bg-slate-900 border-b border-slate-800 text-slate-300 text-[10px] hidden md:block transition-all duration-300 overflow-hidden ${
        scrolled ? "max-h-0 py-0 border-b-0 opacity-0" : "max-h-10 py-1.5 opacity-100"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white uppercase tracking-wider">Civil At Hand Group</span>
            <span className="text-slate-700">|</span>
            <Link href="/" className="hover:text-orange-500 transition-colors">Corporate Home</Link>
          </div>
          <div className="flex items-center gap-3">
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
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Partner Portal</span>
            <span className="text-slate-700">|</span>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 ml-1">
              <a href="https://x.com/CivilAtHand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors" title="X (Twitter)"><TwitterIcon className="h-3.5 w-3.5" /></a>
              <a href="https://www.linkedin.com/company/civil-at-hand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors" title="LinkedIn"><LinkedinIcon className="h-3.5 w-3.5" /></a>
              <a href="https://www.instagram.com/civilathand/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors" title="Instagram"><InstagramIcon className="h-3.5 w-3.5" /></a>
              <a href="https://www.youtube.com/@civilathand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors" title="YouTube"><YoutubeIcon className="h-3.5 w-3.5" /></a>
              <a href="https://t.me/civilathand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors" title="Telegram"><TelegramIcon className="h-3.5 w-3.5" /></a>
              <a href="https://in.pinterest.com/civilathand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors" title="Pinterest"><PinterestIcon className="h-3.5 w-3.5" /></a>
              <a href="https://www.threads.com/@civilathand" target="_blank" rel="noopener noreferrer" className="hover:text-orange-500 text-slate-400 transition-colors" title="Threads"><ThreadsIcon className="h-3.5 w-3.5" /></a>
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
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative text-xs font-bold uppercase tracking-widest transition-colors duration-200 group py-1 ${
                  isHomeDark ? "text-slate-300 hover:text-white" : "text-wix-dark hover:text-orange-500"
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-4">
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
                <Bell className="h-5.5 w-5.5" />
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-1.5 right-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white shadow-orange-glow ring-2 ring-white"
                    >
                      {unreadCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Notification Dropdown */}
              <AnimatePresence>
                {notifDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-80 rounded-xl bg-white p-2 shadow-premium-lg ring-1 ring-slate-200 border border-slate-100 z-50 origin-top-right"
                  >
                    <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100">
                      <span className="font-display font-bold text-sm text-navy-950">
                        Notifications
                      </span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                          {unreadCount} New
                        </span>
                      )}
                    </div>
                    <div className="mt-1 divide-y divide-slate-50 max-h-72 overflow-y-auto">
                      {currentNotifs.length === 0 ? (
                        <div className="py-6 text-center text-xs text-navy-600">
                          No new notifications
                        </div>
                      ) : (
                        currentNotifs.map((notif) => (
                          <div key={notif.id} className="p-3 hover:bg-slate-50 transition-colors rounded-lg flex items-start gap-2.5">
                            <div className="mt-0.5">
                              {notif.type === "success" ? (
                                <Check className="h-4 w-4 text-emerald-500" />
                              ) : notif.type === "warning" ? (
                                <AlertTriangle className="h-4 w-4 text-amber-500" />
                              ) : (
                                <Info className="h-4 w-4 text-sky-500" />
                              )}
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-navy-950">{notif.title}</p>
                              <p className="text-[11px] text-navy-600 leading-tight mt-0.5">{notif.message}</p>
                              <span className="text-[9px] text-navy-600 mt-1 block">{notif.timestamp}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="mt-1 border-t border-slate-100 pt-1.5 flex justify-end">
                      <button
                        onClick={() => setNotifDropdownOpen(false)}
                        className="text-[10px] text-navy-600 hover:text-navy-950 font-bold px-3 py-1"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Client Dashboard Link */}
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

            {/* Admin Panel Link */}
            {isAdminView && (
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/cah-expert-control"
                  className={`flex items-center gap-1.5 border px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all duration-300 bg-transparent ${
                    isHomeDark 
                      ? "border-white text-white hover:bg-white hover:text-wix-dark" 
                      : "border-wix-dark text-wix-dark hover:bg-wix-dark hover:text-white"
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
              className={`relative rounded-full p-2 transition-all ${isHomeDark ? "text-white hover:bg-white/10" : "text-navy-950 hover:bg-slate-100"}`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[8px] font-bold text-white ring-2 ring-white">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`rounded-lg p-2 transition-all focus:outline-none ${isHomeDark ? "text-white hover:bg-white/10" : "text-navy-950 hover:bg-slate-100"}`}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden border-t overflow-hidden px-4 py-4 shadow-premium-lg ${
              isHomeDark 
                ? "bg-wix-dark border-white/10 text-white" 
                : "bg-white border-slate-100 text-wix-dark"
            }`}
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-semibold transition-colors ${
                    isHomeDark ? "text-slate-300 hover:text-white" : "text-navy-950 hover:text-orange-500"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100" />
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold transition-all ${
                  isHomeDark ? "bg-white text-wix-dark hover:bg-slate-200" : "bg-navy-950 text-white hover:bg-slate-800"
                }`}
              >
                <User className="h-4 w-4" />
                Client Portal
              </Link>
              {isAdminView && (
                <Link
                  href="/cah-expert-control"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-bold transition-all ${
                    isHomeDark 
                      ? "border-white text-white hover:bg-white hover:text-wix-dark" 
                      : "border-navy-950 text-navy-950 hover:bg-slate-100"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Admin Panel
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
