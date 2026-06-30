"use client";

import React, { useState, useRef } from "react";
import { useProjects } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, UploadCloud, CreditCard, MessageSquare, Send, Activity,
  MapPin, Calendar, FileText, Loader2, CheckCircle2, ChevronRight,
  LayoutDashboard, FolderKanban, Wallet, FileStack, ShieldCheck,
} from "lucide-react";

export const DashboardView: React.FC = () => {
  const {
    projects,
    drawings,
    invoices,
    leads,
    chatMessages,
    uploadDrawing,
    payInvoice,
    sendChatMessage,
  } = useProjects();

  const [activeTab, setActiveTab] = useState<"projects" | "upload" | "payments" | "chat">("projects");
  const [user, setUser] = useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const userJson = localStorage.getItem("cah_user");
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    }
  }, []);

  // Filter lists based on logged-in user
  const userProjects = user
    ? projects.filter((p) => p.clientName.toLowerCase() === user.name.toLowerCase())
    : [];

  const userLeads = user && leads
    ? leads.filter((l) => l.email.toLowerCase() === user.email.toLowerCase())
    : [];

  const userDrawings = user
    ? drawings.filter((d) => {
        const linkedToProject = userProjects.some((p) => p.drawings.includes(d.name));
        const matchesService = userProjects.some((p) => p.service === d.serviceType) || userLeads.some((l) => l.service === d.serviceType);
        return linkedToProject || matchesService;
      })
    : [];

  const userInvoices = user
    ? invoices.filter((inv) => userProjects.some((p) => p.id === inv.projectId))
    : [];

  // Derived summary stats (computed from the same data — no new sources)
  const pendingInvoices = userInvoices.filter((inv) => inv.status !== "Paid");
  const totalDue = pendingInvoices.reduce((sum, inv) => sum + (inv.amount || 0), 0);

  // State for Drawing Upload
  const [files, setFiles] = useState<File[]>([]);
  const [serviceType, setServiceType] = useState("Structural Design");
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // State for Support Chat
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // State for Payments
  const [payingInvId, setPayingInvId] = useState<string | null>(null);

  // Scroll chat to bottom
  React.useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle Drawing Submit
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const f of files) {
        // Upload the actual file content to /api/upload
        const formData = new FormData();
        formData.append("file", f);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadRes.ok) {
          const errData = await uploadRes.json().catch(() => ({}));
          throw new Error(errData.error || `Server responded with status ${uploadRes.status}`);
        }
        const uploadData = await uploadRes.json();
        const fileUrl = uploadData.url;

        await uploadDrawing({
          name: f.name,
          size: (f.size / (1024 * 1024)).toFixed(1) + " MB",
          serviceType,
          url: fileUrl,
        });
      }
      setUploading(false);
      setUploadSuccess(true);
      setFiles([]);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: any) {
      console.error("Error uploading drawings:", err);
      setUploading(false);
      alert(`Failed to upload drawings: ${err.message || err}`);
    }
  };

  // Handle Payment Submit
  const handlePayClick = (invId: string) => {
    setPayingInvId(invId);
    setTimeout(() => {
      payInvoice(invId);
      setPayingInvId(null);
    }, 2000);
  };

  // Handle Chat Submit
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    sendChatMessage(chatInput.trim(), "client");
    setChatInput("");
  };

  const navItems = [
    { id: "projects", title: "Project Tracking", icon: Activity },
    { id: "upload", title: "Upload Drawings", icon: UploadCloud },
    { id: "payments", title: "Invoices & Payments", icon: CreditCard },
    { id: "chat", title: "Support Chat", icon: MessageSquare },
  ];

  const stats = [
    { label: "Active Projects", value: userProjects.length, icon: FolderKanban },
    { label: "Open Requests", value: userLeads.length, icon: FileStack },
    { label: "Drawings", value: userDrawings.length, icon: FileText },
    { label: "Pending Dues", value: `₹${totalDue.toLocaleString("en-IN")}`, icon: Wallet },
  ];

  return (
    <div className="space-y-6">
      {/* ───────── WELCOME HEADER ───────── */}
      <div className="bg-navy-950 rounded-2xl px-6 py-6 md:px-8 md:py-7 shadow-premium relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest">Client Portal</span>
              <h2 className="font-display font-extrabold text-xl md:text-2xl text-white leading-tight">
                Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : " back"}
              </h2>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                Track projects, upload drawings, manage invoices and reach support — all in one place.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure Session
          </div>
        </div>
      </div>

      {/* ───────── SUMMARY STAT CARDS ───────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-premium flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
              <s.icon className="h-5 w-5 text-orange-500" />
            </div>
            <div className="min-w-0">
              <div className="font-display font-extrabold text-xl md:text-2xl text-navy-950 truncate">{s.value}</div>
              <div className="text-[10px] font-bold text-navy-600 uppercase tracking-wider">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ───────── MAIN GRID ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-slate-200 p-3 shadow-premium">
            <p className="px-3 pt-2 pb-3 text-[10px] font-bold text-navy-600 uppercase tracking-widest">Menu</p>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 scrollbar-none">
              {navItems.map((btn) => (
                <motion.button
                  key={btn.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(btn.id as any)}
                  className={`flex-shrink-0 flex items-center gap-3 w-full px-4 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                    activeTab === btn.id
                      ? "bg-navy-950 text-white shadow-premium"
                      : "bg-transparent text-navy-700 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                  }`}
                >
                  <btn.icon className={`h-4 w-4 ${activeTab === btn.id ? "text-orange-400" : "text-orange-500"}`} />
                  <span className="whitespace-nowrap">{btn.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-premium min-h-[500px] flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">

            {/* TAB 1: Projects Tracking */}
            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="flex-grow space-y-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Activity className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-navy-950">Active Projects</h3>
                    <p className="text-xs text-navy-600 mt-0.5">Real-time status and execution progress of your designs.</p>
                  </div>
                </div>

                {userProjects.length === 0 && userLeads.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center bg-slate-50">
                    <FolderKanban className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-navy-600 text-sm font-medium">Nothing requested yet.</p>
                    <p className="text-navy-600 text-xs mt-1">Use &apos;Upload Drawings&apos; to start a new design request.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Service Requests (Leads) */}
                    {userLeads.map((lead, idx) => (
                      <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="border border-slate-200 rounded-2xl p-5 md:p-6 bg-slate-50/60 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500"></div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 pl-2">
                          <div>
                            <span className="text-[9px] bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                              Requested Service
                            </span>
                            <h4 className="font-display font-extrabold text-lg text-navy-950 mt-1">{lead.service}</h4>
                            <p className="text-[10px] text-navy-600 font-medium">Source: {lead.source}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${
                              lead.status === "new" ? "bg-amber-50 text-amber-700 border-amber-200" :
                              lead.status === "contacted" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                              "bg-emerald-50 text-emerald-700 border-emerald-200"
                            }`}>
                              {lead.status === "new" ? "Under Review" :
                               lead.status === "contacted" ? "Contacted" : "Active Project"}
                            </span>
                            <span className="text-[10px] text-navy-600 mt-1.5 flex items-center gap-1 sm:justify-end">
                              <Calendar className="h-3 w-3" />
                              Submitted: {lead.date}
                            </span>
                          </div>
                        </div>
                        <div className="pl-2">
                          <span className="block font-bold text-navy-950 uppercase tracking-wide text-[9px] mb-1">Scope details</span>
                          <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white p-3 rounded-lg border border-slate-100">
                            {lead.details}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {/* Active Projects */}
                    {userProjects.map((project, idx) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: (userLeads.length + idx) * 0.05 }}
                        className="border border-slate-200 rounded-2xl p-5 md:p-6 hover:shadow-md transition-all duration-300 relative overflow-hidden bg-white"
                      >
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500"></div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5 pl-2">
                          <div>
                            <span className="text-[10px] bg-slate-100 text-navy-950 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                              ID: {project.id.toUpperCase()}
                            </span>
                            <h4 className="font-display font-extrabold text-lg text-navy-950 mt-1">{project.title}</h4>
                            <p className="text-xs text-navy-600 font-medium">{project.service}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              project.status === "Completed" ? "bg-emerald-100 text-emerald-700" :
                              project.status === "Designing" ? "bg-sky-100 text-sky-700" :
                              project.status === "Under Review" ? "bg-amber-100 text-amber-700" :
                              "bg-slate-100 text-slate-700"
                            }`}>
                              {project.status}
                            </span>
                            <span className="text-[10px] text-navy-600 mt-1.5 flex items-center gap-1 sm:justify-end">
                              <Calendar className="h-3 w-3" />
                              Started: {project.dateStarted}
                            </span>
                          </div>
                        </div>

                        <div className="mb-6 pl-2">
                          <div className="flex justify-between text-xs font-bold mb-1.5">
                            <span className="text-navy-600">Milestone Progress</span>
                            <span className="text-navy-950">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${project.progress}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="bg-orange-500 h-2 rounded-full shadow-orange-glow"
                            ></motion.div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-slate-100 text-xs pl-2">
                          <div className="flex items-start gap-2.5">
                            <MapPin className="h-4 w-4 text-navy-600 mt-0.5" />
                            <div>
                              <span className="block font-bold text-navy-950 uppercase tracking-wide text-[10px]">Location</span>
                              <span className="text-navy-600">{project.location}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Briefcase className="h-4 w-4 text-navy-600 mt-0.5" />
                            <div>
                              <span className="block font-bold text-navy-950 uppercase tracking-wide text-[10px]">Project Scope</span>
                              <span className="text-navy-600">{project.areaSqFt.toLocaleString("en-IN")} sq.ft built area</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <FileText className="h-4 w-4 text-navy-600 mt-0.5" />
                            <div>
                              <span className="block font-bold text-navy-950 uppercase tracking-wide text-[10px]">Uploaded Drawings</span>
                              <span className="text-navy-600 leading-snug">
                                {project.drawings.length === 0 ? "No files linked" : project.drawings.join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: Upload Drawings */}
            {activeTab === "upload" && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="flex-grow space-y-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <UploadCloud className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-navy-950">Engineering Drawing Desk</h3>
                    <p className="text-xs text-navy-600 mt-0.5">Upload files for review by our automated pipelines and engineering auditors.</p>
                  </div>
                </div>

                <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  <div className="border-2 border-dashed border-slate-200 hover:border-orange-500 rounded-2xl p-8 bg-slate-50 text-center transition-colors flex flex-col items-center justify-center min-h-60">
                    <UploadCloud className="h-10 w-10 text-slate-400 mb-3" />
                    <span className="block text-sm font-bold text-navy-950">Drag &amp; drop drawings here</span>
                    <span className="block text-[11px] text-navy-600 mt-1 mb-4">PDF, DWG, DXF formats (up to 25MB)</span>
                    <div className="space-y-3 w-full max-w-xs">
                      <input
                        type="file"
                        required
                        multiple
                        accept=".pdf,.dwg,.dxf"
                        onChange={(e) => {
                          if (e.target.files) {
                            setFiles(Array.from(e.target.files));
                          } else {
                            setFiles([]);
                          }
                        }}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs file:mr-3 file:rounded file:border-0 file:bg-navy-950 file:text-white file:px-3 file:py-1.5 file:text-[11px] file:font-bold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 shadow-sm transition-all"
                      />
                      {files.length > 0 && (
                        <p className="text-[11px] text-emerald-600 font-bold">{files.length} file(s) ready to upload</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-navy-950 uppercase tracking-wider mb-2">
                        Service Pipeline Requirements
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 shadow-sm transition-all"
                      >
                        <option value="Structural Design">Structural Design</option>
                        <option value="BOQ Estimation">BOQ Estimation</option>
                        <option value="Quantity Surveying">Quantity Surveying</option>
                        <option value="PDF to AutoCAD">PDF to AutoCAD</option>
                        <option value="BIM Services">BIM Services</option>
                        <option value="Interior Design">Interior Design</option>
                      </select>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <div className="flex gap-2">
                        <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-[11px] text-navy-600 leading-normal">
                          Once uploaded, files are processed by our CAD boundary parser and assigned to an expert structural/civil surveyor for validation. Detailed quotations will follow.
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={uploading || files.length === 0}
                      className="w-full bg-navy-950 hover:bg-orange-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-premium"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analyzing blueprints...
                        </>
                      ) : uploadSuccess ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          Successfully Uploaded!
                        </>
                      ) : (
                        <>Upload Drawing File</>
                      )}
                    </motion.button>
                  </div>
                </form>

                <div>
                  <h4 className="font-display font-extrabold text-sm text-navy-950 mb-4 uppercase tracking-wider">File Vault Status</h4>
                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                    {userDrawings.length === 0 ? (
                      <div className="p-8 text-center text-navy-600 text-xs font-semibold bg-white">
                        <FileStack className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                        No drawings uploaded yet.
                      </div>
                    ) : (
                      userDrawings.map((draw, idx) => (
                        <motion.div
                          key={draw.id}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.25, delay: idx * 0.05 }}
                          className="flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors text-xs gap-3"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="bg-slate-100 p-2 rounded-lg text-navy-700 flex-shrink-0">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              {draw.url ? (
                                <a
                                  href={draw.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-semibold text-navy-950 hover:text-orange-500 underline transition-colors cursor-pointer truncate block"
                                  title="Click to view/download file"
                                >
                                  {draw.name}
                                </a>
                              ) : (
                                <p className="font-semibold text-navy-950 truncate">{draw.name}</p>
                              )}
                              <p className="text-[10px] text-navy-600">{draw.size} • Uploaded on {draw.uploadDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <span className="text-[10px] text-navy-600 font-medium bg-slate-100 px-2 py-0.5 rounded hidden sm:inline">
                              {draw.serviceType}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              draw.status === "Ready" ? "bg-emerald-100 text-emerald-700" :
                              draw.status === "Analyzing" ? "bg-amber-100 text-amber-700 animate-pulse" :
                              "bg-slate-100 text-slate-700"
                            }`}>
                              {draw.status === "Analyzing" && <Loader2 className="h-3 w-3 animate-spin" />}
                              {draw.status}
                            </span>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: Invoices & Payments */}
            {activeTab === "payments" && (
              <motion.div
                key="payments"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="flex-grow space-y-8"
              >
                <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-navy-950">Invoices &amp; Quotations</h3>
                    <p className="text-xs text-navy-600 mt-0.5">Review estimations, download receipts and complete milestone payments.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {userInvoices.length === 0 ? (
                    <div className="border border-dashed border-slate-200 rounded-2xl p-12 text-center bg-slate-50">
                      <Wallet className="h-10 w-10 text-slate-300 mx-auto mb-3" />
                      <p className="text-navy-600 text-sm font-medium">No invoices generated yet.</p>
                      <p className="text-navy-600 text-xs mt-1">Invoices are created after our engineers audit your uploaded plans.</p>
                    </div>
                  ) : (
                    userInvoices.map((inv, idx) => (
                      <motion.div
                        key={inv.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, delay: idx * 0.05 }}
                        className="border border-slate-200 rounded-2xl p-5 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-sm transition-shadow text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-navy-950 text-sm">Invoice #{inv.id.toUpperCase()}</span>
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                            }`}>
                              {inv.status}
                            </span>
                          </div>
                          <p className="font-semibold text-navy-950">{inv.projectTitle}</p>
                          <p className="text-[10px] text-navy-600">Generated: {inv.dateGenerated} • Due: {inv.dueDate}</p>
                        </div>

                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 pt-3 sm:pt-0 border-slate-100">
                          <div className="text-left sm:text-right">
                            <span className="block text-[10px] uppercase font-bold text-navy-600 tracking-wide">Amount Due</span>
                            <span className="text-base font-extrabold text-navy-950">₹{inv.amount.toLocaleString("en-IN")}</span>
                          </div>

                          {inv.status === "Paid" ? (
                            <button
                              onClick={() => alert("Downloading receipt (simulated)...")}
                              className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-4 py-2 rounded-lg transition-colors"
                            >
                              Receipt
                            </button>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePayClick(inv.id)}
                              disabled={payingInvId !== null}
                              className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white font-bold px-5 py-2.5 rounded-lg shadow-orange-glow transition-all flex items-center gap-1.5"
                            >
                              {payingInvId === inv.id ? (
                                <>
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  Pay Now
                                  <ChevronRight className="h-3.5 w-3.5" />
                                </>
                              )}
                            </motion.button>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 4: Support Chat */}
            {activeTab === "chat" && (
              <motion.div
                key="chat"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="flex-grow flex flex-col h-[500px]"
              >
                <div className="pb-4 border-b border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-base text-navy-950">Support Helpdesk</h3>
                      <span className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                        Support engineers online
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow overflow-y-auto p-4 space-y-4 my-4 bg-slate-50 rounded-2xl border border-slate-100 max-h-[300px]">
                  <AnimatePresence initial={false}>
                    {chatMessages.map((msg) => {
                      const isClient = msg.sender === "client";
                      const isSystem = msg.sender === "system";
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, scale: 0.95, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.25 }}
                          className={`flex flex-col ${isClient ? "items-end" : isSystem ? "items-center" : "items-start"}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                              isClient
                                ? "bg-navy-950 text-white rounded-br-none"
                                : isSystem
                                ? "bg-slate-200 text-navy-600 text-[10px] uppercase font-bold py-1 px-3 rounded-full"
                                : "bg-white text-navy-950 border border-slate-200 rounded-bl-none shadow-sm"
                            }`}
                          >
                            {!isClient && !isSystem && (
                              <span className="block text-[9px] font-bold text-orange-500 uppercase tracking-wide mb-1">
                                Support Desk
                              </span>
                            )}
                            {msg.text}
                          </div>
                          {!isSystem && (
                            <span className="text-[9px] text-navy-600 mt-1 px-1">{msg.timestamp}</span>
                          )}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleChatSubmit} className="mt-auto flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask support about blueprints, layouts, or estimates..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-slate-800 font-semibold shadow-sm transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim()}
                    className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-lg px-4 py-3 flex items-center justify-center shadow-orange-glow transition-all"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
