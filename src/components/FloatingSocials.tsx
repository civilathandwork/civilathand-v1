"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

// Custom Social SVG Components
const TwitterIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.51a3.002 3.002 0 0 0-2.11 2.108C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.871.51 9.387.51 9.387.51s7.517 0 9.387-.51a3.003 3.003 0 0 0 2.11-2.108c.502-1.87 0-5.837.502-5.837s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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

export const FloatingSocials: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/company/civil-at-hand", icon: LinkedinIcon, color: "text-[#0077B5]" },
    { name: "Instagram", href: "https://www.instagram.com/civilathand/", icon: InstagramIcon, color: "text-[#E1306C]" },
    { name: "YouTube", href: "https://www.youtube.com/@civilathand", icon: YoutubeIcon, color: "text-[#FF0000]" },
    { name: "X (Twitter)", href: "https://x.com/CivilAtHand", icon: TwitterIcon, color: "text-wix-dark" },
    { name: "Telegram", href: "https://t.me/civilathand", icon: TelegramIcon, color: "text-[#24A1DE]" },
    { name: "Pinterest", href: "https://in.pinterest.com/civilathand", icon: PinterestIcon, color: "text-[#BD081C]" },
    { name: "Threads", href: "https://www.threads.com/@civilathand", icon: ThreadsIcon, color: "text-wix-dark" }
  ];

  // Close when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-2.5 pb-2"
          >
            {socials.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  whileHover={{ scale: 1.15, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200/80 text-slate-700 hover:text-white hover:bg-orange-500 shadow-premium flex items-center justify-center transition-colors duration-200"
                  title={social.name}
                  suppressHydrationWarning
                >
                  <Icon className={`w-4.5 h-4.5 ${social.name === "Instagram" ? "" : "fill-current"}`} />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-12 h-12 rounded-full bg-wix-dark text-white flex items-center justify-center shadow-premium-lg border border-white/10 relative cursor-pointer"
        aria-label="Toggle Social Links"
        suppressHydrationWarning
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-5.5 h-5.5 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative flex items-center justify-center"
            >
              <MessageCircle className="w-5.5 h-5.5 text-white" />
              {/* Subtle animated notification ring to draw engagement */}
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
