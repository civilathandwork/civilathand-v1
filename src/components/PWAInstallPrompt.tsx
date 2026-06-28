"use client";

import React, { useState, useEffect } from "react";
import { X, Download, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);

  useEffect(() => {
    // Don't show if already installed as PWA
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }
    if ((window.navigator as { standalone?: boolean }).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS (Safari doesn't support beforeinstallprompt)
    const ua = window.navigator.userAgent;
    const ios = /iphone|ipad|ipod/i.test(ua);
    setIsIOS(ios);

    // Check if user already dismissed banner (don't nag them)
    const dismissed = localStorage.getItem("cah-pwa-dismissed");
    const dismissedAt = dismissed ? parseInt(dismissed, 10) : 0;
    const daysSinceDismiss = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);

    // Show iOS banner after 3 seconds (they can't get beforeinstallprompt)
    if (ios && daysSinceDismiss > 7) {
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // Chrome / Android: capture the install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Only show banner if not dismissed within last 3 days
      if (daysSinceDismiss > 3) {
        setTimeout(() => setShowBanner(true), 3000);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setShowBanner(false);
    });

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    setInstalling(true);
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setIsInstalled(true);
      setShowBanner(false);
    }
    setDeferredPrompt(null);
    setInstalling(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem("cah-pwa-dismissed", Date.now().toString());
  };

  if (!showBanner || isInstalled) return null;

  return (
    <>
      {/* Backdrop on mobile */}
      <div
        className="fixed inset-0 bg-black/40 z-[998] md:hidden"
        onClick={handleDismiss}
      />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] md:bottom-6 md:left-auto md:right-6 md:max-w-sm">
        <div className="bg-wix-dark border border-white/10 rounded-t-2xl md:rounded-xl shadow-2xl overflow-hidden">

          {/* Orange top accent */}
          <div className="h-1 bg-gradient-to-r from-orange-500 to-orange-400" />

          <div className="p-5">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white overflow-hidden flex-shrink-0 shadow-sm">
                  <img src="/logo.jpg" alt="Civil At Hand" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-white font-display uppercase tracking-wide leading-tight">
                    Civil At Hand
                  </p>
                  <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest">
                    Engineering & Education
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-slate-500 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10 flex-shrink-0"
                aria-label="Dismiss"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Message */}
            {isIOS ? (
              <div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                  Install Civil At Hand on your iPhone — open in Safari, tap{" "}
                  <span className="font-bold text-white">Share</span>, then{" "}
                  <span className="font-bold text-white">Add to Home Screen</span>.
                </p>
                {/* iOS share icon visual */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 mb-4">
                  <svg className="h-4 w-4 text-blue-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Tap the Share icon → Add to Home Screen
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                Install our app for faster load, offline access to calculators & blogs, and a native app feel.
              </p>
            )}

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {["Offline Access", "Faster Load", "No App Store", "Free"].map((f) => (
                <span key={f} className="text-[10px] font-bold text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                  {f}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            {!isIOS && (
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  disabled={installing}
                  className="flex-1 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest transition-all"
                >
                  {installing ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Installing…
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Install App
                    </>
                  )}
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-3 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/30 text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Later
                </button>
              </div>
            )}

            {isIOS && (
              <button
                onClick={handleDismiss}
                className="w-full py-3 rounded-lg border border-white/10 text-slate-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all"
              >
                Got It
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
