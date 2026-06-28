import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Unique build ID so browsers never serve stale JS chunks
  generateBuildId: async () => `cah-${Date.now()}`,

  // ── HTTP Headers ───────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        // Service worker: never cache so updates deploy instantly
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
          { key: "Service-Worker-Allowed", value: "/" },
          { key: "Content-Type", value: "application/javascript" },
        ],
      },
      {
        // Manifest: short cache so icon/name updates reach users quickly
        source: "/manifest.json",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, must-revalidate" },
          { key: "Content-Type", value: "application/manifest+json" },
        ],
      },
      {
        // Icons: long cache, content-addressed filenames
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Security headers on all pages
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self), payment=(self)",
          },
        ],
      },
    ];
  },

  // ── Redirects (permanent 301 for old URLs) ─────────────────────────────────
  async redirects() {
    return [
      {
        source: "/calculator/construction-cost-estimator",
        destination: "/calculators/cost",
        permanent: true,
      },
      {
        source: "/calculator/concrete-volumetrics",
        destination: "/calculators/concrete",
        permanent: true,
      },
      {
        source: "/calculator/steel-rebar-weight",
        destination: "/calculators/steel",
        permanent: true,
      },
      {
        source: "/calculator/brick-masonry-wall",
        destination: "/calculators/brick",
        permanent: true,
      },
      {
        source: "/calculator/ai-boq-takeoff",
        destination: "/calculators/boq",
        permanent: true,
      },
      // Fix broken /services route (old nav link)
      {
        source: "/services",
        destination: "/services/all-services",
        permanent: false,
      },
      // Fix broken /calculator route (old nav link)
      {
        source: "/calculator",
        destination: "/calculators",
        permanent: false,
      },
    ];
  },

  // ── Rewrites (transparent URL mapping) ────────────────────────────────────
  async rewrites() {
    return [
      {
        source: "/calculator/all-calculators",
        destination: "/calculators",
      },
      {
        source: "/calculator/all-calculators/construction-cost-estimator",
        destination: "/calculators/cost",
      },
      {
        source: "/calculator/all-calculators/concrete-volumetrics",
        destination: "/calculators/concrete",
      },
      {
        source: "/calculator/all-calculators/steel-rebar-weight",
        destination: "/calculators/steel",
      },
      {
        source: "/calculator/all-calculators/brick-masonry-wall",
        destination: "/calculators/brick",
      },
      {
        source: "/calculator/all-calculators/ai-boq-takeoff",
        destination: "/calculators/boq",
      },
      {
        source: "/calculator/:path*",
        destination: "/calculators/:path*",
      },
    ];
  },
};

export default nextConfig;
