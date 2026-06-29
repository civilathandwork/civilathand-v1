"use client";

import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DashboardView } from "@/components/DashboardView";
import { useProjects } from "@/context/ProjectContext";
import { User, Activity, Clock, FileCheck } from "lucide-react";

export default function DashboardPage() {
  const { projects, drawings, invoices } = useProjects();
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem("cah_user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    }
  }, []);

  const userProjects = user 
    ? projects.filter((p) => p.clientName.toLowerCase() === user.name.toLowerCase()) 
    : [];

  const userInvoices = user 
    ? invoices.filter((inv) => userProjects.some((p) => p.id === inv.projectId))
    : [];

  // Basic stats
  const activeProjectsCount = userProjects.filter((p) => p.status !== "Completed").length;
  const pendingPaymentsCount = userInvoices.filter((i) => i.status === "Unpaid").length;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />

      <main className="flex-grow py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-slate-900 text-white p-6 md:p-8 rounded-2xl border border-slate-800 relative overflow-hidden shadow-premium">
            {/* Background design accents */}
            <div className="absolute top-0 right-0 h-40 w-40 bg-orange-500 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h1 className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">
                Welcome Back, <span className="text-orange-500">{user ? user.name : "Guest"}</span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                Access your blueprints, monitor active engineering pipelines, and complete milestone billing.
              </p>
              <p className="text-xs text-slate-300 mt-1">
  Project Email :-{" "}
  <a
    href="mailto:Project.civilathand@gmail.com"
    className="text-blue-400 hover:text-blue-300 underline"
  >
    Project.civilathand@gmail.com
  </a>
</p>
            </div>

            {/* Quick stats widgets */}
            <div className="flex gap-4 relative z-10">
              <div className="bg-slate-800/80 border border-slate-700/50 px-4 py-2.5 rounded-xl text-center min-w-28 shadow-sm">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Active Designs</span>
                <span className="text-lg font-extrabold text-white font-display mt-0.5 block">
                  {activeProjectsCount}
                </span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/50 px-4 py-2.5 rounded-xl text-center min-w-28 shadow-sm">
                <span className="block text-[9px] uppercase font-bold text-slate-400">Due Invoices</span>
                <span className="text-lg font-extrabold text-orange-500 font-display mt-0.5 block">
                  {pendingPaymentsCount}
                </span>
              </div>
            </div>
          </div>

          {/* Main Dashboard Tabs */}
          <DashboardView />

        </div>
      </main>

      <Footer />
    </div>
  );
}
