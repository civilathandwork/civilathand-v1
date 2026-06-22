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
};

export default nextConfig;
