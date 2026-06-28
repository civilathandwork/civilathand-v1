import React from "react";
import type { Metadata, Viewport } from "next";
import { ProjectProvider } from "@/context/ProjectContext";
import { FloatingSocials } from "@/components/FloatingSocials";
import { ServiceWorkerRegistration } from "@/components/ServiceWorkerRegistration";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import Script from "next/script";
import "./globals.css";

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: "Civil At Hand | Engineering Excellence Powered by Smart Automation",
    template: "%s | Civil At Hand",
  },
  description:
    "India's precision civil engineering consultancy — structural design, BOQ estimation, BIM coordination, quantity surveying, and civil engineering education. IS-code compliant. Delivered fast.",
  keywords: [
    "civil engineering services India",
    "structural design consultancy",
    "BOQ estimation",
    "BIM services India",
    "GATE civil engineering",
    "civil engineering courses",
    "quantity surveying India",
    "PDF to AutoCAD",
  ],
  authors: [{ name: "Civil At Hand", url: "https://www.civilathand.in" }],
  creator: "Civil At Hand",
  publisher: "Civil At Hand",
  metadataBase: new URL("https://www.civilathand.in"),
  alternates: { canonical: "https://www.civilathand.in" },

  // ── Open Graph (WhatsApp / LinkedIn / Facebook previews) ──────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.civilathand.in",
    siteName: "Civil At Hand",
    title: "Civil At Hand | Engineering Excellence Powered by Smart Automation",
    description:
      "India's precision civil engineering consultancy — structural design, BOQ, BIM, quantity surveying, and civil engineering education.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Civil At Hand — Engineering Excellence",
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: "@CivilAtHand",
    creator: "@CivilAtHand",
    title: "Civil At Hand | Engineering Excellence",
    description:
      "India's precision civil engineering consultancy — structural design, BOQ, BIM, and education.",
    images: ["/og-image.jpg"],
  },

  // ── PWA / Mobile ──────────────────────────────────────────────────────────
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Civil At Hand",
    startupImage: [
      {
        url: "/icons/apple-splash-2048-2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1668-2388.png",
        media: "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1290-2796.png",
        media: "(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1179-2556.png",
        media: "(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/icons/apple-splash-1080-1920.png",
        media: "(device-width: 360px) and (device-height: 640px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
    ],
  },

  // ── Google AdSense verification ───────────────────────────────────────────
  other: {
    "google-adsense-account": "ca-pub-6032648001379559",
    "mobile-web-app-capable": "yes",
    "application-name": "Civil At Hand",
    "msapplication-TileColor": "#111111",
    "msapplication-TileImage": "/icons/icon-144x144.png",
  },

  // ── Icons ─────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icons/icon-96x96.png",
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ── Viewport (theme-color for browser chrome on mobile) ──────────────────────
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
    { media: "(prefers-color-scheme: light)", color: "#f97316" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

// ── JSON-LD Structured Data ───────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.civilathand.in/#organization",
      name: "Civil At Hand",
      url: "https://www.civilathand.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.civilathand.in/logo.jpg",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-770-39-770-02",
        contactType: "Customer Service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://www.linkedin.com/company/civil-at-hand",
        "https://www.instagram.com/civilathand/",
        "https://x.com/CivilAtHand",
        "https://www.youtube.com/@civilathand",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.civilathand.in/#website",
      url: "https://www.civilathand.in",
      name: "Civil At Hand",
      publisher: { "@id": "https://www.civilathand.in/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://www.civilathand.in/blog?search={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.civilathand.in/#localbusiness",
      name: "Civil At Hand : Design and Consultancy",
      description:
        "India's precision civil engineering consultancy — structural design, BOQ estimation, BIM coordination, and civil engineering education.",
      url: "https://www.civilathand.in",
      telephone: "+91-770-39-770-02",
      email: "info.civilathand@zohomail.in",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Haryana",
        addressCountry: "IN",
      },
      priceRange: "₹₹",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
    },
  ],
};

// ── Root Layout ───────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense verification */}
        <meta name="google-adsense-account" content="ca-pub-6032648001379559" />

        {/* AdSense script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6032648001379559"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body>
        <ProjectProvider>
          {children}
          <FloatingSocials />

          {/* PWA: Service Worker registration (client-side, silent) */}
          <ServiceWorkerRegistration />

          {/* PWA: Install prompt banner */}
          <PWAInstallPrompt />
        </ProjectProvider>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4N1HBTWPR4"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4N1HBTWPR4', { page_path: window.location.pathname });
          `}
        </Script>
      </body>
    </html>
  );
}
