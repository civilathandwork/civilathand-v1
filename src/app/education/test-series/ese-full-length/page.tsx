import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Trophy, Clock } from "lucide-react";

export default function EseFullLengthComingSoon() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-100">
        <div style={{ background: "linear-gradient(135deg, #0f2244 0%, #1a3a6b 100%)" }}>
          <div className="max-w-5xl mx-auto px-4 py-10">
            <Link href="/education/test-series" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors">
              <ArrowLeft size={16} /> Back to Test Series
            </Link>
            <div className="inline-flex items-center gap-2 bg-orange-500/90 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 uppercase tracking-wider">
              <Trophy size={12} /> Civil At Hand Education
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">ESE / IES — Full Length Tests</h1>
            <p className="text-white/75 text-sm max-w-xl leading-relaxed">Full-length ESE (IES) Prelims mock tests built to the official Civil pattern.</p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-orange-500/10 flex items-center justify-center">
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Coming Soon</h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-8">
              ESE / IES full-length mock tests are being prepared and will be available here shortly.
              In the meantime, you can practise full-length GATE and SSC-JE tests.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/education/test-series/gate-full-length" className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 text-xs uppercase tracking-widest rounded-md transition-all">
                Try GATE Tests
              </Link>
              <Link href="/education/test-series/ssc-full-length" className="inline-flex items-center justify-center bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold px-5 py-2.5 text-xs uppercase tracking-widest rounded-md transition-all">
                Try SSC-JE Tests
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
