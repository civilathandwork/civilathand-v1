import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work - Structural, BIM, BOQ & CAD Capabilities | Civil At Hand",
  description: "See the civil engineering work Civil At Hand delivers - RCC and steel structural design, BOQ estimation, BIM coordination, and PDF-to-AutoCAD.",
};

export default function RouteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
