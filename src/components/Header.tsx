"use client";

import React, { useState } from "react";
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

export const Header: React.FC = () => {
  const pathname = usePathname();
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
    { name: "Sectors", href: "/#sectors" },
    { name: "Calculators", href: "/#calculators" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-glass shadow-premium transition-all duration-300">
      {/* Upper Utility Bar (Dual-Tier) */}
      <div className="bg-navy-950 border-b border-navy-900 text-slate-300 text-[10px] py-1.5 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white uppercase tracking-wider">Civil At Hand Group</span>
            <span className="text-navy-800">|</span>
            <Link href="/" className="hover:text-orange-500 transition-colors">Corporate Home</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hover:text-orange-500 transition-colors font-bold">
              Customer Connect
            </Link>
            {isAdminView && (
              <>
                <span className="text-navy-800">|</span>
                <Link href="/cah-expert-control" className="hover:text-orange-500 transition-colors font-bold">
                  Expert Connect
                </Link>
              </>
            )}
            <span className="text-navy-800">|</span>
            <span className="hover:text-orange-500 cursor-pointer transition-colors">Partner Portal</span>
            <span className="text-navy-800">|</span>
            {/* Social Icons */}
            <div className="flex items-center gap-2 ml-1">
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors"><FacebookIcon className="h-3.5 w-3.5" /></a>
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors"><TwitterIcon className="h-3.5 w-3.5" /></a>
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors"><LinkedinIcon className="h-3.5 w-3.5" /></a>
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors"><InstagramIcon className="h-3.5 w-3.5" /></a>
              <a href="#" className="hover:text-orange-500 text-slate-400 transition-colors"><YoutubeIcon className="h-3.5 w-3.5" /></a>
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
                className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-950 overflow-hidden shadow-premium"
              >
                <img src="/logo.jpg" alt="Civil At Hand Logo" className="h-full w-full object-cover" />
              </motion.div>
              <div>
                <span className="font-display text-xl font-extrabold tracking-tight text-navy-950">
                  CIVIL <span className="text-orange-500 font-bold">AT HAND</span>
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-navy-600">
                  Engineering Tech
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
                className="relative text-sm font-semibold text-navy-950 hover:text-orange-500 transition-colors duration-200 group py-1"
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
                className="relative rounded-full p-2 text-navy-950 hover:bg-slate-100 hover:text-orange-500 transition-all duration-200 focus:outline-none"
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
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-300 ${
                  isDashboardView
                    ? "bg-orange-500 text-white shadow-orange-glow"
                    : "bg-navy-950 text-white hover:bg-orange-600 hover:shadow-orange-glow"
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
                  className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all duration-300 border bg-navy-950 text-white border-navy-950"
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
              className="relative rounded-full p-2 text-navy-950 hover:bg-slate-100"
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
              className="rounded-lg p-2 text-navy-950 hover:bg-slate-100 focus:outline-none"
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
            className="md:hidden border-t border-slate-100 bg-white px-4 py-4 shadow-premium-lg overflow-hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-navy-950 hover:text-orange-500"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100" />
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-navy-950 px-4 py-2.5 text-xs font-bold text-white"
              >
                <User className="h-4 w-4" />
                Client Portal
              </Link>
              {isAdminView && (
                <Link
                  href="/cah-expert-control"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg border border-navy-950 px-4 py-2.5 text-xs font-bold text-navy-950"
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
