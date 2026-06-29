"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminView } from "@/components/AdminView";
import { useProjects } from "@/context/ProjectContext";
import { Settings, BarChart2, Lock, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const { leads, projects } = useProjects();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [loginError, setLoginError] = useState("");

  // Verify auth session on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = sessionStorage.getItem("cah_admin_authenticated") === "true";
      setIsAdminLoggedIn(isLoggedIn);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctUser = process.env.NEXT_PUBLIC_ADMIN_USER || "civilathand.in@admin.2026";
    const correctPass = process.env.NEXT_PUBLIC_ADMIN_PASS || "CivilAtHand@P@$$2026";

    if (adminUser === correctUser && adminPass === correctPass) {
      sessionStorage.setItem("cah_admin_authenticated", "true");
      setIsAdminLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Invalid admin credentials. Access Denied.");
    }
  };

  const totalLeads = leads.length;
  const activeProjectsCount = projects.filter((p) => p.status !== "Completed").length;

  if (!isAdminLoggedIn) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-900 text-white">
        <Header />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm bg-slate-800/80 border border-slate-700/60 p-8 rounded-2xl shadow-premium-lg space-y-6 backdrop-blur-md"
          >
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-premium-lg mx-auto mb-3">
                <Lock className="h-5 w-5" />
              </div>
              <h2 className="font-display font-extrabold text-xl tracking-tight text-white uppercase">
                Admin <span className="text-orange-500">Access Only</span>
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Please enter the control panel credentials to proceed.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] rounded-xl p-3 flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span className="font-semibold">{loginError}</span>
                </motion.div>
              )}

              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Username</label>
                <input
                  type="text"
                  required
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  placeholder="Enter admin username"
                  className="w-full bg-slate-700/50 border border-slate-650 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 focus:bg-slate-700 text-white font-semibold shadow-sm transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-700/50 border border-slate-650 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-orange-500 focus:bg-slate-700 text-white font-semibold shadow-sm transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 text-[10px] uppercase tracking-widest rounded-lg transition-all shadow-orange-glow mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                Unlock Dashboard <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-grow py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 relative overflow-hidden shadow-premium">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-orange-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-premium-lg">
                <Settings className="h-6 w-6 animate-spin-slow" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
                  Admin <span className="text-orange-500">Control Center</span>
                </h1>
                <p className="text-xs text-slate-300 mt-1">
                  Manage engineering leads, track active structural designs, and issue client invoices.
                </p>
              </div>
            </div>

            {/* Quick stats widgets */}
            <div className="flex gap-4 relative z-10">
              <div className="bg-slate-800/80 border border-slate-700/50 px-4 py-2.5 rounded-xl text-center min-w-28 shadow-sm">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Total Leads</span>
                <span className="text-lg font-extrabold text-white font-display mt-0.5 block">
                  {totalLeads}
                </span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/50 px-4 py-2.5 rounded-xl text-center min-w-28 shadow-sm">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Active Builds</span>
                <span className="text-lg font-extrabold text-orange-500 font-display mt-0.5 block">
                  {activeProjectsCount}
                </span>
              </div>
            </div>
          </div>

          {/* Main Admin Tabs */}
          <AdminView />

        </div>
      </main>

      <Footer />
    </div>
  );
}
