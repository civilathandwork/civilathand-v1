import React from "react";
import type { Metadata } from "next";
import { ProjectProvider } from "@/context/ProjectContext";
import { FloatingSocials } from "@/components/FloatingSocials";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civil At Hand | Engineering Excellence Powered by Smart Automation",
  description: "Enterprise-grade planning, structural design detailing, quantity estimation takeoffs, and BIM LOD coordination tools.",
  other: {
    "google-adsense-account": "ca-pub-6032648001379559",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-6032648001379559" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6032648001379559"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <ProjectProvider>
          {children}
          <FloatingSocials />
        </ProjectProvider>

        {/* Google Analytics (gtag.js) */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-4N1HBTWPR4" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4N1HBTWPR4');
          `}
        </Script>
      </body>
    </html>
  );
}
