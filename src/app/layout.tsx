import type { Metadata } from "next";
import { ProjectProvider } from "@/context/ProjectContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civil At Hand | Engineering Excellence Powered by Smart Automation",
  description: "Enterprise-grade planning, structural design detailing, quantity estimation takeoffs, and BIM LOD coordination tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProjectProvider>
          {children}
        </ProjectProvider>
      </body>
    </html>
  );
}
