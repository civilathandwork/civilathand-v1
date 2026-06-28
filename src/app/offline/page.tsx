import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're Offline — Civil At Hand",
  description: "You are currently offline. Please check your internet connection.",
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#111111", color: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>

        {/* Animated offline icon */}
        <div style={{ width: 80, height: 80, borderRadius: 16, background: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
            <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
            <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
            <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
            <line x1="12" y1="20" x2="12.01" y2="20" />
          </svg>
        </div>

        {/* Logo wordmark */}
        <p style={{ fontSize: "0.625rem", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>
          Civil At Hand
        </p>

        <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.5rem)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.02em", margin: "0 0 1rem" }}>
          You're <span style={{ color: "#f97316" }}>Offline</span>
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "0.875rem", maxWidth: 400, lineHeight: 1.7, marginBottom: "2rem" }}>
          No internet connection detected. Some pages you've previously visited are available offline. Check your connection and try again.
        </p>

        {/* Quick links to cached pages */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center", marginBottom: "2rem" }}>
          {[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: "Calculators", href: "/calculators" },
            { label: "Education", href: "/education" },
          ].map(({ label, href }) => (
            <a key={label} href={href}
              style={{ display: "inline-block", border: "1px solid #334155", color: "#94a3b8", padding: "0.5rem 1.25rem", borderRadius: "0.375rem", textDecoration: "none", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* Retry button */}
        <button
          onClick={() => window.location.reload()}
          style={{ background: "#f97316", color: "#fff", border: "none", borderRadius: "0.375rem", padding: "0.875rem 2.5rem", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer" }}
        >
          Try Again
        </button>

        <p style={{ color: "#475569", fontSize: "0.7rem", marginTop: "2rem" }}>
          © {new Date().getFullYear()} Civil At Hand : Design & Consultancy
        </p>
      </body>
    </html>
  );
}
