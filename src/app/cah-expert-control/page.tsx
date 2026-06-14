"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdminView } from "@/components/AdminView";
import { useProjects } from "@/context/ProjectContext";
import { Settings, BarChart2 } from "lucide-react";

export default function AdminPage() {
  const { leads, projects } = useProjects();

  const totalLeads = leads.length;
  const activeProjectsCount = projects.filter((p) => p.status !== "Completed").length;

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
