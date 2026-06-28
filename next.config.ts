import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Give every build a unique ID so browsers never serve stale chunks
  generateBuildId: async () => `cah-${Date.now()}`,

  async headers() {
    return [
      {
        // Service worker: never cache so the self-destruct SW fires immediately
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, max-age=0" },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: "/calculator/construction-cost-estimator",
        destination: "/calculator/all-calculators/construction-cost-estimator",
        permanent: true,
      },
      {
        source: "/calculator/concrete-volumetrics",
        destination: "/calculator/all-calculators/concrete-volumetrics",
        permanent: true,
      },
      {
        source: "/calculator/steel-rebar-weight",
        destination: "/calculator/all-calculators/steel-rebar-weight",
        permanent: true,
      },
      {
        source: "/calculator/brick-masonry-wall",
        destination: "/calculator/all-calculators/brick-masonry-wall",
        permanent: true,
      },
      {
        source: "/calculator/ai-boq-takeoff",
        destination: "/calculator/all-calculators/ai-boq-takeoff",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/services",
        destination: "/",
      },
      {
        source: "/calculator",
        destination: "/",
      },
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
