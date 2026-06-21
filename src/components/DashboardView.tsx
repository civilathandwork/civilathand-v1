"use client";

import React, { useState, useRef } from "react";
import { useProjects } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  UploadCloud, 
  CreditCard, 
  MessageSquare, 
  Send, 
  Activity, 
  MapPin, 
  Calendar, 
  FileText, 
  Loader2, 
  CheckCircle2, 
  ChevronRight 
} from "lucide-react";

export const DashboardView: React.FC = () => {
  const { 
    projects, 
    drawings, 
    invoices, 
    chatMessages, 
    uploadDrawing, 
    payInvoice, 
    sendChatMessage 
  } = useProjects();

  const [activeTab, setActiveTab] = useState<"projects" | "upload" | "payments" | "chat">("projects");
  
  // State for Drawing Upload
  const [file, setFile] = useState<File | null>(null);
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
  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setTimeout(() => {
      uploadDrawing({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
        serviceType
      });
      setUploading(false);
      setUploadSuccess(true);
      setFile(null);
      setTimeout(() => setUploadSuccess(false), 3000);
    }, 2000);
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Dashboard Sidebar Navigation */}
      <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
        {[
          { id: "projects", title: "Project Tracking", icon: Activity },
          { id: "upload", title: "Upload Drawings", icon: UploadCloud },
          { id: "payments", title: "Invoices & Payments", icon: CreditCard },
          { id: "chat", title: "Support Chat", icon: MessageSquare }
        ].map((btn) => (
          <motion.button
            key={btn.id}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(btn.id as any)}
            className={`flex-shrink-0 flex items-center gap-3 w-full px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
              activeTab === btn.id
                ? "bg-navy-950 text-white shadow-premium"
                : "bg-white text-navy-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <btn.icon className="h-4.5 w-4.5 text-orange-500" />
            {btn.title}
          </motion.button>
        ))}
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
              <div>
                <h3 className="font-display font-extrabold text-xl text-navy-950">Active Projects</h3>
                <p className="text-xs text-navy-600 mt-1">Real-time status updates and execution progress of your designs.</p>
              </div>

              {projects.length === 0 ? (
                <div className="border border-dashed border-slate-200 rounded-xl p-12 text-center text-navy-600 text-sm">
                  No active projects found. Go to 'Upload Drawings' to initialize a new design request.
                </div>
              ) : (
                <div className="space-y-6">
                  {projects.map((project, idx) => (
                    <motion.div 
                      key={project.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      className="border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Project Meta Header */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
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
                          <span className="block text-[10px] text-navy-600 mt-1.5 flex items-center gap-1 sm:justify-end">
                            <Calendar className="h-3 w-3" />
                            Started: {project.dateStarted}
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
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

                      {/* Technical Specifications Timeline */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-slate-100 text-xs">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="h-4.5 w-4.5 text-navy-600 mt-0.5" />
                          <div>
                            <span className="block font-bold text-navy-950 uppercase tracking-wide text-[10px]">Location</span>
                            <span className="text-navy-600">{project.location}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Briefcase className="h-4.5 w-4.5 text-navy-600 mt-0.5" />
                          <div>
                            <span className="block font-bold text-navy-950 uppercase tracking-wide text-[10px]">Project Scope</span>
                            <span className="text-navy-600">{project.areaSqFt.toLocaleString("en-IN")} sq.ft built area</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <FileText className="h-4.5 w-4.5 text-navy-600 mt-0.5" />
                          <div>
                            <span className="block font-bold text-navy-950 uppercase tracking-wide text-[10px]">Uploaded Drawings</span>
                            <span className="text-navy-600 leading-snug">
                              {project.drawings.length === 0 
                                ? "No files linked" 
                                : project.drawings.join(", ")}
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
              <div>
                <h3 className="font-display font-extrabold text-xl text-navy-950">Engineering Drawing Desk</h3>
                <p className="text-xs text-navy-600 mt-1">Upload files and get them verified by our automated pipelines and engineering auditors.</p>
              </div>

              {/* Upload form */}
              <form onSubmit={handleUploadSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="border-2 border-dashed border-slate-200 hover:border-orange-500 rounded-xl p-8 bg-slate-50 text-center transition-colors flex flex-col items-center justify-center min-h-60">
                  <UploadCloud className="h-10 w-10 text-slate-400 mb-3" />
                  <span className="block text-sm font-bold text-navy-950">Drag & Drop drawings here</span>
                  <span className="block text-[11px] text-navy-600 mt-1 mb-4">PDF, DWG, DXF formats (Up to 25MB)</span>
                  
                  <div className="space-y-3 w-full max-w-xs">
                    <input
                      type="file"
                      required
                      accept=".pdf,.dwg,.dxf"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setFile(e.target.files[0]);
                        } else {
                          setFile(null);
                        }
                      }}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 shadow-sm transition-all"
                    />
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
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs font-semibold focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 shadow-sm transition-all"
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
                      <CheckCircle2 className="h-4.5 w-4.5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <p className="text-[11px] text-navy-600 leading-normal">
                        Once uploaded, files will be processed by our CAD boundary parser and assigned to an expert structural/civil surveyor for validation. Detailed quotations will follow.
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={uploading || !file}
                    className="w-full bg-navy-950 hover:bg-orange-600 disabled:bg-slate-300 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-premium"
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
                      <>
                        Upload Drawing File
                      </>
                    )}
                  </motion.button>
                </div>
              </form>

              {/* List of uploaded drawings */}
              <div>
                <h4 className="font-display font-extrabold text-sm text-navy-950 mb-4 uppercase tracking-wider">File Vault Status</h4>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  {drawings.map((draw, idx) => (
                    <motion.div 
                      key={draw.id} 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      className="flex justify-between items-center p-4 bg-white hover:bg-slate-50 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-slate-100 p-2 rounded-lg text-navy-700">
                          <FileText className="h-5.5 w-5.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-navy-950">{draw.name}</p>
                          <p className="text-[10px] text-navy-600">{draw.size} • Uploaded on {draw.uploadDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-navy-600 font-medium bg-slate-100 px-2 py-0.5 rounded">
                          {draw.serviceType}
                        </span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          draw.status === "Ready" ? "bg-emerald-100 text-emerald-700" :
                          draw.status === "Analyzing" ? "bg-amber-100 text-amber-700 flex animate-pulse" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {draw.status === "Analyzing" && <Loader2 className="h-3 w-3 animate-spin" />}
                          {draw.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
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
              <div>
                <h3 className="font-display font-extrabold text-xl text-navy-950">Invoices & Quotations</h3>
                <p className="text-xs text-navy-600 mt-1">Review active design estimations, download receipts, and complete milestones payments.</p>
              </div>

              <div className="space-y-4">
                {invoices.length === 0 ? (
                  <div className="border border-dashed border-slate-200 rounded-xl p-12 text-center text-navy-600 text-sm">
                    No invoices generated yet. Invoices will be created after our engineers audit your uploaded plans.
                  </div>
                ) : (
                  invoices.map((inv, idx) => (
                    <motion.div 
                      key={inv.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: idx * 0.05 }}
                      className="border border-slate-200 rounded-xl p-5 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-sm transition-shadow text-xs"
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
                            className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-4 py-2 rounded-lg"
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
              {/* Header info */}
              <div className="pb-4 border-b border-slate-200 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-extrabold text-base text-navy-950">Civil Engineering Support Helpdesk</h3>
                  <span className="block text-[10px] text-emerald-500 font-semibold flex items-center gap-1 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                    Active support engineers online
                  </span>
                </div>
              </div>

              {/* Chat message space */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4 my-4 bg-slate-50 rounded-xl border border-slate-100 max-h-[300px]">
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
                        className={`flex flex-col ${
                          isClient ? "items-end" : isSystem ? "items-center" : "items-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] rounded-xl px-4 py-3 text-xs leading-relaxed ${
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
                          <span className="text-[9px] text-navy-600 mt-1 px-1">
                            {msg.timestamp}
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>

              {/* Input field */}
              <form onSubmit={handleChatSubmit} className="mt-auto flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask support about blueprints, layouts, or estimates..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim()}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-slate-300 text-white rounded-lg px-4 py-3 flex items-center justify-center shadow-orange-glow transition-all"
                >
                  <Send className="h-4.5 w-4.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
