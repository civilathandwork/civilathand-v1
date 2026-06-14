"use client";

import React, { useState } from "react";
import { useProjects, Lead, Project, BlogPost } from "@/context/ProjectContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Settings, 
  BarChart3, 
  FolderKanban, 
  FileSpreadsheet, 
  Receipt, 
  TrendingUp, 
  FilePlus, 
  UserCheck, 
  ArrowUpRight, 
  Clock, 
  CheckCircle,
  AlertCircle,
  BookOpen,
  Trash2,
  Edit3
} from "lucide-react";

export const AdminView: React.FC = () => {
  const { 
    leads, 
    projects, 
    invoices, 
    blogs,
    updateProjectStatus, 
    generateInvoice, 
    addProject,
    addBlog,
    updateBlog,
    deleteBlog
  } = useProjects();

  const [activeTab, setActiveTab] = useState<"analytics" | "leads" | "projects" | "invoices" | "blogs">("analytics");

  // State for Invoice Generation
  const [selectedProjId, setSelectedProjId] = useState("");
  const [invoiceAmount, setInvoiceAmount] = useState<number>(50000);
  const [invoiceSuccess, setInvoiceSuccess] = useState(false);

  // --- Calculations ---
  const totalRevenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const pendingRevenue = invoices
    .filter((i) => i.status === "Unpaid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const conversionRate = leads.length > 0 
    ? ((leads.filter(l => l.status === "converted").length / leads.length) * 100).toFixed(0)
    : "35";

  // Handle Converting Lead to Project
  const handleConvertLead = (lead: Lead) => {
    addProject({
      title: `${lead.service} - ${lead.name}`,
      clientName: lead.name,
      service: lead.service,
      areaSqFt: 2500,
      location: "Mumbai, MH",
      drawings: [],
    });

    lead.status = "converted";
    alert(`Lead "${lead.name}" has been converted to an active project! Check the Project tab.`);
  };

  // Handle Invoice Submit
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjId || invoiceAmount <= 0) return;

    generateInvoice(selectedProjId, invoiceAmount);
    setInvoiceSuccess(true);
    setSelectedProjId("");
    setInvoiceAmount(50000);
    setTimeout(() => setInvoiceSuccess(false), 3000);
  };

  // State for Blog Management
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSummary, setBlogSummary] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState<BlogPost["category"]>("General");
  const [blogAuthor, setBlogAuthor] = useState("CivAtHand Admin");
  const [blogImage, setBlogImage] = useState("");
  const [blogStatus, setBlogStatus] = useState<BlogPost["status"]>("published");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // Handle Blog Submit
  const handleBlogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim()) return;

    const fallbackImage = blogImage.trim() || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80";

    const blogMeta = {
      title: blogTitle,
      summary: blogSummary,
      content: blogContent,
      category: blogCategory,
      author: blogAuthor || "CivAtHand Admin",
      image: fallbackImage,
      status: blogStatus
    };

    if (editingBlogId) {
      updateBlog(editingBlogId, blogMeta);
      alert("Blog post updated successfully!");
      setEditingBlogId(null);
    } else {
      addBlog(blogMeta);
      alert("Blog post published successfully!");
    }

    // Reset Form
    setBlogTitle("");
    setBlogSummary("");
    setBlogContent("");
    setBlogCategory("General");
    setBlogAuthor("CivAtHand Admin");
    setBlogImage("");
    setBlogStatus("published");
  };

  const startEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogTitle(post.title);
    setBlogSummary(post.summary);
    setBlogContent(post.content);
    setBlogCategory(post.category);
    setBlogAuthor(post.author);
    setBlogImage(post.image);
    setBlogStatus(post.status);
  };

  const cancelEditBlog = () => {
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogSummary("");
    setBlogContent("");
    setBlogCategory("General");
    setBlogAuthor("CivAtHand Admin");
    setBlogImage("");
    setBlogStatus("published");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sidebar Navigation */}
      <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-2 lg:pb-0 scrollbar-none">
        {[
          { id: "analytics", title: "Analytics Dashboard", icon: BarChart3 },
          { id: "leads", title: "Lead & CRM Management", icon: Users, badge: true },
          { id: "projects", title: "Project Control Center", icon: FolderKanban },
          { id: "invoices", title: "Billing & Invoicing", icon: Receipt },
          { id: "blogs", title: "Blog Management", icon: BookOpen }
        ].map((tab) => {
          const hasNewLeads = tab.badge && leads.filter((l) => l.status === "new").length > 0;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 flex items-center gap-3 w-full px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-navy-950 text-white shadow-premium"
                  : "bg-white text-navy-700 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              <tab.icon className="h-4.5 w-4.5 text-orange-500" />
              {tab.title}
              {hasNewLeads && (
                <span className="ml-auto flex h-2 w-2 rounded-full bg-orange-500 animate-ping"></span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Main Panel Content */}
      <div className="lg:col-span-9 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-premium min-h-[500px] overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* TAB 1: Analytics */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8 flex-grow"
            >
              <div>
                <h3 className="font-display font-extrabold text-xl text-navy-950">Analytics Dashboard</h3>
                <p className="text-xs text-navy-600 mt-1">Global engineering sales KPIs, pipeline conversions, and cashflow charts.</p>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: "Total Sales Invoiced", val: `₹${(totalRevenue + pendingRevenue).toLocaleString("en-IN")}`, desc: "+12% vs last month", isTrend: true },
                  { title: "Collected Revenue", val: `₹${totalRevenue.toLocaleString("en-IN")}`, desc: "Invoiced payments received", isTrend: false },
                  { title: "Active Leads", val: `${leads.length} Leads`, desc: `${leads.filter(l => l.status === "new").length} New requests`, isTrend: false },
                  { title: "Sales Conversion", val: `${conversionRate}%`, desc: "Leads to project conversion", isTrend: false }
                ].map((kpi, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-slate-50 border border-slate-200 rounded-xl p-4 shadow-sm"
                  >
                    <span className="block text-[10px] uppercase font-bold text-navy-600 tracking-wider">{kpi.title}</span>
                    <p className="text-xl font-extrabold text-navy-950 mt-1">{kpi.val}</p>
                    {kpi.isTrend ? (
                      <span className="text-[10px] text-emerald-600 flex items-center gap-0.5 mt-1 font-semibold">
                        <TrendingUp className="h-3 w-3" /> {kpi.desc}
                      </span>
                    ) : (
                      <span className="text-[10px] text-navy-600 mt-1 block">{kpi.desc}</span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* SVG Visual Sales Chart */}
              <div className="border border-slate-200 rounded-xl p-5 md:p-6 bg-white shadow-sm">
                <h4 className="font-display font-extrabold text-sm text-navy-950 mb-4 uppercase tracking-wider">
                  Monthly Revenue Growth Trend
                </h4>
                
                {/* Responsive SVG Container */}
                <div className="w-full h-60">
                  <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <line x1="0" y1="50" x2="500" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="100" x2="500" y2="100" stroke="#f1f5f9" strokeWidth="1" />
                    <line x1="0" y1="150" x2="500" y2="150" stroke="#f1f5f9" strokeWidth="1" />

                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ff6b00" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Chart Path Area with Delay */}
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      d="M 0 170 Q 100 130 200 140 T 300 90 T 400 60 T 500 40 L 500 200 L 0 200 Z"
                      fill="url(#chartGradient)"
                    />

                    {/* Chart Line with Self-Drawing path */}
                    <motion.path
                      initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d="M 0 170 Q 100 130 200 140 T 300 90 T 400 60 T 500 40"
                      fill="none"
                      stroke="#ff6b00"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Data Point Circles */}
                    {[
                      { cx: 100, cy: 148 },
                      { cx: 200, cy: 140 },
                      { cx: 300, cy: 90 },
                      { cx: 400, cy: 60 },
                      { cx: 500, cy: 40 }
                    ].map((pt, index) => (
                      <motion.circle 
                        key={index}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 * index + 0.8 }}
                        cx={pt.cx} 
                        cy={pt.cy} 
                        r="4.5" 
                        fill="#0a192f" 
                        stroke="#ff6b00" 
                        strokeWidth="2" 
                      />
                    ))}
                  </svg>
                </div>

                {/* Labels Footer */}
                <div className="flex justify-between text-[10px] text-navy-600 font-bold uppercase tracking-wider pt-3 border-t border-slate-100">
                  <span>Jan (₹1.2L)</span>
                  <span>Feb (₹2.4L)</span>
                  <span>Mar (₹3.5L)</span>
                  <span>Apr (₹5.8L)</span>
                  <span>May (₹7.6L)</span>
                  <span>Jun (₹12.0L)</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Leads & CRM */}
          {activeTab === "leads" && (
            <motion.div
              key="leads"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 flex-grow"
            >
              <div>
                <h3 className="font-display font-extrabold text-xl text-navy-950">Lead & Sales CRM</h3>
                <p className="text-xs text-navy-600 mt-1">Review contact requests and calculator quotes. Qualify them into active design projects.</p>
              </div>

              <div className="space-y-4">
                {leads.map((lead, idx) => (
                  <motion.div 
                    key={lead.id} 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="border border-slate-200 rounded-xl p-5 hover:bg-slate-50 transition-colors text-xs space-y-4 bg-white"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <span className="text-[10px] bg-navy-100 text-navy-700 px-2 py-0.5 rounded font-bold uppercase tracking-wide">
                          {lead.source}
                        </span>
                        <h4 className="font-display font-extrabold text-base text-navy-950 mt-1.5">{lead.name}</h4>
                        <p className="text-[10px] text-navy-600 mt-0.5">{lead.email} • {lead.phone}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] capitalize ${
                          lead.status === "new" ? "bg-orange-100 text-orange-700" :
                          lead.status === "converted" ? "bg-emerald-100 text-emerald-700" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {lead.status}
                        </span>
                        <span className="text-[10px] text-navy-600 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lead.date}
                        </span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <p className="font-semibold text-navy-950">Requested Pipeline: {lead.service}</p>
                      <p className="text-navy-600 mt-1 italic leading-relaxed">"{lead.details}"</p>
                    </div>

                    {lead.status === "new" && (
                      <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                        <button
                          onClick={() => {
                            lead.status = "contacted";
                            alert("Lead status marked as Contacted.");
                          }}
                          className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-3 py-1.5 rounded-lg text-[10px]"
                        >
                          Mark Contacted
                        </button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleConvertLead(lead)}
                          className="bg-navy-950 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-1 shadow-sm transition-all"
                        >
                          <UserCheck className="h-3.5 w-3.5" />
                          Convert to Project
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 3: Projects Control Center */}
          {activeTab === "projects" && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 flex-grow"
            >
              <div>
                <h3 className="font-display font-extrabold text-xl text-navy-950">Project Control Center</h3>
                <p className="text-xs text-navy-600 mt-1">Audit active client requests, link CAD files, and update milestones progress status.</p>
              </div>

              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <motion.div 
                    key={proj.id} 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="border border-slate-200 rounded-xl p-5 hover:shadow-sm transition-shadow text-xs space-y-4 bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-display font-extrabold text-base text-navy-950">{proj.title}</h4>
                        <p className="text-[10px] text-navy-600 mt-0.5">Client: {proj.clientName} • Area: {proj.areaSqFt} SqFt • Started: {proj.dateStarted}</p>
                      </div>
                      <div className="text-right">
                        <span className="block text-[10px] uppercase font-bold text-navy-600 tracking-wide">Status</span>
                        <select
                          value={proj.status}
                          onChange={(e) => updateProjectStatus(proj.id, e.target.value as Project["status"])}
                          className="mt-1 bg-slate-50 border border-slate-200 rounded px-2.5 py-1 font-bold text-[11px] focus:outline-none focus:border-orange-500 text-navy-950"
                        >
                          <option value="Uploaded">Uploaded</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Designing">Designing</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <span className="text-navy-600">
                        Files: {proj.drawings.length === 0 ? "No files attached" : proj.drawings.join(", ")}
                      </span>
                      <span className="font-bold text-navy-950">
                        Progress: {proj.progress}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* TAB 4: Invoices & Invoicing */}
          {activeTab === "invoices" && (
            <motion.div
              key="invoices"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 flex-grow"
            >
              <div>
                <h3 className="font-display font-extrabold text-xl text-navy-950">Invoicing & Milestone Billing</h3>
                <p className="text-xs text-navy-600 mt-1">Issue new quotations and invoices for structural layouts. View collection summaries.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Form to issue invoice */}
                <form onSubmit={handleCreateInvoice} className="border border-slate-200 rounded-xl p-5 md:p-6 space-y-4 bg-slate-50">
                  <h4 className="font-display font-extrabold text-sm text-navy-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <FilePlus className="h-4.5 w-4.5 text-orange-500" />
                    Create Project Quotation
                  </h4>

                  <div>
                    <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-2">
                      Target Project
                    </label>
                    <select
                      required
                      value={selectedProjId}
                      onChange={(e) => setSelectedProjId(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                    >
                      <option value="">-- Select Active Project --</option>
                      {projects.map((proj) => (
                        <option key={proj.id} value={proj.id}>
                          {proj.title} (Status: {proj.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-2">
                      Invoiced Amount (INR - ₹)
                    </label>
                    <input
                      type="number"
                      required
                      min="1000"
                      step="500"
                      value={invoiceAmount}
                      onChange={(e) => setInvoiceAmount(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!selectedProjId}
                    className="w-full bg-navy-950 hover:bg-orange-600 disabled:bg-slate-400 text-white font-bold py-3 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-premium"
                  >
                    {invoiceSuccess ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-emerald-400" />
                        Invoice Issued Successfully!
                      </>
                    ) : (
                      <>
                        Issue Invoice & Notify Client
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Invoices List */}
                <div className="space-y-4">
                  <h4 className="font-display font-extrabold text-sm text-navy-950 uppercase tracking-wider">Billing History</h4>
                  <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                    {invoices.map((inv) => (
                      <div key={inv.id} className="border border-slate-200 rounded-lg p-3 bg-white hover:bg-slate-50 transition-colors flex justify-between items-center text-xs">
                        <div>
                          <p className="font-semibold text-navy-950">{inv.projectTitle}</p>
                          <p className="text-[10px] text-navy-600">ID: #{inv.id.toUpperCase()} • ₹{inv.amount.toLocaleString("en-IN")}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${
                          inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                        }`}>
                          {inv.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: Blog Management */}
          {activeTab === "blogs" && (
            <motion.div
              key="blogs"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 flex-grow text-xs text-navy-950"
            >
              <div>
                <h3 className="font-display font-extrabold text-xl text-navy-950">Engineering Blog & Content Management</h3>
                <p className="text-xs text-navy-600 mt-1">Write, edit, and publish engineering technical articles and site news update logs.</p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Form Col */}
                <div className="xl:col-span-5 border border-slate-200 rounded-xl p-5 md:p-6 bg-slate-50 space-y-4">
                  <h4 className="font-display font-extrabold text-sm text-navy-950 flex items-center gap-1.5 uppercase tracking-wide">
                    <FilePlus className="h-4.5 w-4.5 text-orange-500" />
                    {editingBlogId ? "Edit Blog Article" : "Create New Blog Article"}
                  </h4>

                  <form onSubmit={handleBlogSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1">Article Title</label>
                      <input
                        type="text"
                        required
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g. Modern Rebar Placement Guide"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1">Category</label>
                        <select
                          value={blogCategory}
                          onChange={(e) => setBlogCategory(e.target.value as any)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                        >
                          <option value="Structural">Structural</option>
                          <option value="Architecture">Architecture</option>
                          <option value="Estimation">Estimation</option>
                          <option value="BIM">BIM Services</option>
                          <option value="General">General Tech</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1">Status</label>
                        <select
                          value={blogStatus}
                          onChange={(e) => setBlogStatus(e.target.value as any)}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft (Private)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1">Author Name</label>
                        <input
                          type="text"
                          required
                          value={blogAuthor}
                          onChange={(e) => setBlogAuthor(e.target.value)}
                          placeholder="e.g. Er. Amit Wagh"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1">Banner Image URL</label>
                        <input
                          type="text"
                          value={blogImage}
                          onChange={(e) => setBlogImage(e.target.value)}
                          placeholder="Optional image link"
                          className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1">Brief Summary</label>
                      <input
                        type="text"
                        required
                        value={blogSummary}
                        onChange={(e) => setBlogSummary(e.target.value)}
                        placeholder="A short snippet shown on card preview..."
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1">Full Article Content (Markdown/Text)</label>
                      <textarea
                        required
                        rows={6}
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        placeholder="Write full article body. Supports standard formatting."
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 text-slate-800 font-semibold shadow-sm resize-y transition-all"
                      />
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="flex-grow bg-navy-950 hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-premium"
                      >
                        {editingBlogId ? "Save Updates" : "Publish Post"}
                      </motion.button>
                      {editingBlogId && (
                        <button
                          type="button"
                          onClick={cancelEditBlog}
                          className="bg-slate-200 hover:bg-slate-300 text-navy-950 font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                {/* Listing Col */}
                <div className="xl:col-span-7 space-y-4">
                  <h4 className="font-display font-extrabold text-sm text-navy-950 uppercase tracking-wider">Active Blog Articles ({blogs.length})</h4>
                  
                  <div className="space-y-3.5 max-h-[550px] overflow-y-auto pr-1">
                    {blogs.length === 0 ? (
                      <div className="text-center py-12 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-500">
                        <BookOpen className="h-8 w-8 mx-auto text-slate-300 mb-2" />
                        No articles found. Start publishing!
                      </div>
                    ) : (
                      blogs.map((post) => (
                        <div key={post.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:bg-slate-50/50 transition-colors space-y-3 flex flex-col md:flex-row md:items-center gap-4">
                          <div className="h-16 w-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative border border-slate-100">
                            <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                          </div>
                          
                          <div className="flex-grow space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] bg-navy-100 text-navy-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                                {post.category}
                              </span>
                              <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${
                                post.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                              }`}>
                                {post.status}
                              </span>
                              <span className="text-[10px] text-navy-600 ml-auto">{post.date}</span>
                            </div>
                            <h5 className="font-display font-extrabold text-sm text-navy-950">{post.title}</h5>
                            <p className="text-[10px] text-navy-600 line-clamp-1 italic">"{post.summary}"</p>
                            <p className="text-[9px] text-navy-600 font-semibold">Author: {post.author}</p>
                          </div>

                          <div className="flex md:flex-col gap-1.5 justify-end md:items-end flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 md:pl-2">
                            <button
                              onClick={() => {
                                const nextStatus = post.status === "published" ? "draft" : "published";
                                updateBlog(post.id, { status: nextStatus });
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-2.5 py-1.5 rounded-lg text-[9px] uppercase tracking-wide"
                            >
                              {post.status === "published" ? "Unpublish" : "Publish"}
                            </button>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => startEditBlog(post)}
                                className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 p-1.5 rounded-lg"
                                title="Edit Article"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Are you sure you want to delete this blog post?")) {
                                    deleteBlog(post.id);
                                  }
                                }}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-600 p-1.5 rounded-lg"
                                title="Delete Article"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
