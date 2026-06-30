import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Clock } from "lucide-react";

export default function EseTestComingSoon() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-500/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Coming Soon</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-8">ESE / IES full-length mock tests are being prepared and will be available here shortly.</p>
          <Link href="/education/test-series" className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 text-xs uppercase tracking-widest rounded-md transition-all">
            <ArrowLeft size={14} /> Back to Test Series
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
