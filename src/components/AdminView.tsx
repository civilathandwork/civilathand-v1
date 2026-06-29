"use client";

import React, { useState, useEffect, useRef } from "react";
import { useProjects, Lead, Project, BlogPost, DrawingFile } from "@/context/ProjectContext";
import { generateSlug } from "@/lib/utils";
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
  Edit3,
  Bold,
  Italic,
  Heading,
  List,
  ListOrdered,
  Link2,
  Quote,
  Eraser,
  Sparkles,
  X,

  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Code,
  Subscript,
  Superscript,
  Minus,
  Paintbrush,
  Briefcase,
  MapPin,
  Plus,
  Image as ImageIcon,
  Type,
  FileText,
  Loader2,
  Eye,
  Heart,
  Share2
} from "lucide-react";

export const AdminView: React.FC = () => {
  const {
    leads,
    projects,
    invoices,
    blogs,
    portfolio,
    drawings,
    updateProjectStatus,
    generateInvoice,
    addProject,
    addBlog,
    updateBlog,
    deleteBlog,
    updateLeadStatus,
    deleteLead,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    updateDrawingStatus,
    deleteDrawing
  } = useProjects();

  const [activeTab, setActiveTab] = useState<"analytics" | "leads" | "projects" | "drawings" | "invoices" | "blogs" | "portfolio">("analytics");


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

  const totalBlogViews = blogs.reduce((acc, curr) => acc + ((curr as any).views || 0), 0);
  const totalPortfolioViews = portfolio.reduce((acc, curr) => acc + ((curr as any).views || 0), 0);
  const totalBlogLikes = blogs.reduce((acc, curr) => acc + ((curr as any).likes || 0), 0);
  const totalBlogShares = blogs.reduce((acc, curr) => acc + ((curr as any).shares || 0), 0);

  // Handle Converting Lead to Project
  const handleConvertLead = async (lead: Lead) => {
    addProject({
      title: `${lead.service} - ${lead.name}`,
      clientName: lead.name,
      service: lead.service,
      areaSqFt: 2500,
      location: "Mumbai, MH",
      drawings: [],
    });

    await updateLeadStatus(lead.id, "converted");
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
  const [blogCategory, setBlogCategory] = useState<BlogPost["category"]>("Structure");
  const [blogAuthor, setBlogAuthor] = useState("CivAtHand Admin");
  const [blogImage, setBlogImage] = useState("");
  const [blogStatus, setBlogStatus] = useState<BlogPost["status"]>("published");
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  // State for Portfolio Management
  const [portTitle, setPortTitle] = useState("");
  const [portCategory, setPortCategory] = useState("Industrial");
  const [portArea, setPortArea] = useState("");
  const [portLoc, setPortLoc] = useState("");
  const [portImg, setPortImg] = useState("");
  const [portStatus, setPortStatus] = useState("Completed");
  const [portDescription, setPortDescription] = useState("");
  const [portFullDetails, setPortFullDetails] = useState("");
  const [portSpecs, setPortSpecs] = useState<string[]>([]);
  const [portChallenges, setPortChallenges] = useState<string[]>([]);
  const [portSolutions, setPortSolutions] = useState<string[]>([]);
  const [portGallery, setPortGallery] = useState<string[]>([]);
  const [editingPortId, setEditingPortId] = useState<string | null>(null);
  const [isPortModalOpen, setIsPortModalOpen] = useState(false);
  const [portSearchTerm, setPortSearchTerm] = useState("");

  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: "main" | number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fieldKey = target === "main" ? "main" : `gallery-${target}`;
    setUploadingField(fieldKey);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      
      if (target === "main") {
        setPortImg(data.url);
      } else {
        updateGalleryField(target, data.url);
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploadingField(null);
    }
  };

  const addSpecField = () => setPortSpecs([...portSpecs, ""]);
  const updateSpecField = (index: number, val: string) => {
    const updated = [...portSpecs];
    updated[index] = val;
    setPortSpecs(updated);
  };
  const removeSpecField = (index: number) => {
    setPortSpecs(portSpecs.filter((_, i) => i !== index));
  };

  const addChallengeField = () => setPortChallenges([...portChallenges, ""]);
  const updateChallengeField = (index: number, val: string) => {
    const updated = [...portChallenges];
    updated[index] = val;
    setPortChallenges(updated);
  };
  const removeChallengeField = (index: number) => {
    setPortChallenges(portChallenges.filter((_, i) => i !== index));
  };

  const addSolutionField = () => setPortSolutions([...portSolutions, ""]);
  const updateSolutionField = (index: number, val: string) => {
    const updated = [...portSolutions];
    updated[index] = val;
    setPortSolutions(updated);
  };
  const removeSolutionField = (index: number) => {
    setPortSolutions(portSolutions.filter((_, i) => i !== index));
  };

  const addGalleryField = () => setPortGallery([...portGallery, ""]);
  const updateGalleryField = (index: number, val: string) => {
    const updated = [...portGallery];
    updated[index] = val;
    setPortGallery(updated);
  };
  const removeGalleryField = (index: number) => {
    setPortGallery(portGallery.filter((_, i) => i !== index));
  };

  const handlePortfolioSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!portTitle.trim() || !portDescription.trim()) return;

    const fallbackImg = portImg.trim() || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800";

    const itemMeta = {
      title: portTitle,
      category: portCategory,
      area: portArea || "TBD",
      loc: portLoc || "TBD",
      img: fallbackImg,
      status: portStatus,
      description: portDescription,
      fullDetails: portFullDetails || portDescription,
      specs: portSpecs.filter(s => s.trim() !== ""),
      challenges: portChallenges.filter(c => c.trim() !== ""),
      solutions: portSolutions.filter(s => s.trim() !== ""),
      gallery: portGallery.filter(g => g.trim() !== "")
    };

    if (editingPortId) {
      await updatePortfolioItem(editingPortId, itemMeta);
      alert("Portfolio masterpiece updated successfully!");
      setEditingPortId(null);
    } else {
      await addPortfolioItem(itemMeta);
      alert("Portfolio masterpiece added successfully!");
    }

    setIsPortModalOpen(false);
    resetPortForm();
  };

  const resetPortForm = () => {
    setPortTitle("");
    setPortCategory("Industrial");
    setPortArea("");
    setPortLoc("");
    setPortImg("");
    setPortStatus("Completed");
    setPortDescription("");
    setPortFullDetails("");
    setPortSpecs([]);
    setPortChallenges([]);
    setPortSolutions([]);
    setPortGallery([]);
    setEditingPortId(null);
  };

  const openNewPortModal = () => {
    resetPortForm();
    setIsPortModalOpen(true);
  };

  const startEditPort = (item: any) => {
    setEditingPortId(item.id);
    setPortTitle(item.title);
    setPortCategory(item.category);
    setPortArea(item.area);
    setPortLoc(item.loc);
    setPortImg(item.img);
    setPortStatus(item.status);
    setPortDescription(item.description);
    setPortFullDetails(item.fullDetails);
    setPortSpecs(item.specs || []);
    setPortChallenges(item.challenges || []);
    setPortSolutions(item.solutions || []);
    setPortGallery(item.gallery || []);
    setIsPortModalOpen(true);
  };


  // Formatting Editor States & Helpers
  const [editorMode, setEditorMode] = useState<"write" | "preview">("write");
  const [showTemplates, setShowTemplates] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [showFonts, setShowFonts] = useState(false);
  const [showImageMenu, setShowImageMenu] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBlogModalOpen && editorMode === "write") {
      if (editorRef.current && editorRef.current.innerHTML !== blogContent) {
        editorRef.current.innerHTML = blogContent;
      }
    }
  }, [isBlogModalOpen, editorMode, blogContent]);

  const convertMarkdownToHtml = (markdown: string): string => {
    if (!markdown) return "";
    let html = markdown;
    html = html.replace(/^###\s+(.*?)$/gm, "<h3>$1</h3>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/^\-\s+(.*?)$/gm, "<li>$1</li>");
    html = html.replace(/(<li>.*?<\/li>)+/g, (match) => `<ul>${match}</ul>`);
    return html.split("\n\n").map(p => {
      const trimmed = p.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("<h") || trimmed.startsWith("<ul") || trimmed.startsWith("<ol") || trimmed.startsWith("<li>")) return trimmed;
      return `<p>${trimmed}</p>`;
    }).join("");
  };

  const handleEditorInput = (e: React.FormEvent<HTMLDivElement>) => {
    setBlogContent(e.currentTarget.innerHTML);
  };

  const handleEditorClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target && target.tagName === "IMG") {
      const img = target as HTMLImageElement;
      const currentWidth = img.style.width || img.getAttribute("width") || "auto";
      const newWidth = prompt("Enter new image width (e.g., 50%, 100%, 300px, or 'auto' to reset):", currentWidth);
      if (newWidth !== null) {
        const trimmed = newWidth.trim();
        if (trimmed === "" || trimmed.toLowerCase() === "auto") {
          img.style.width = "";
          img.removeAttribute("width");
        } else {
          img.style.width = trimmed;
        }
        img.style.height = "auto";
        if (editorRef.current) {
          setBlogContent(editorRef.current.innerHTML);
        }
      }
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    const data = await res.json();
    if (!data.url) throw new Error("No URL returned");
    return data.url;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const url = await uploadFile(file);
      runCommand("insertImage", url);
      setShowImageMenu(false);
    } catch (err) {
      console.warn("File upload failed, falling back to Base64:", err);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          runCommand("insertImage", base64Url);
        }
      };
      reader.readAsDataURL(file);
      setShowImageMenu(false);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsBannerUploading(true);
    try {
      const url = await uploadFile(file);
      setBlogImage(url);
    } catch (err) {
      console.warn("Banner file upload failed, falling back to Base64:", err);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target?.result as string;
        if (base64Url) {
          setBlogImage(base64Url);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setIsBannerUploading(false);
      e.target.value = "";
    }
  };

  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const isMod = e.ctrlKey || e.metaKey;
    if (isMod) {
      const key = e.key.toLowerCase();
      if (key === "b") {
        e.preventDefault();
        runCommand("bold");
      } else if (key === "i") {
        e.preventDefault();
        runCommand("italic");
      } else if (key === "u") {
        e.preventDefault();
        runCommand("underline");
      } else if (key === "h") {
        e.preventDefault();
        runCommand("formatBlock", "<h3>");
      } else if (key === "k") {
        e.preventDefault();
        const url = prompt("Enter link URL:", "https://");
        if (url) {
          runCommand("createLink", url);
        }
      }
    }
  };

  const runCommand = (command: string, value: string = "") => {
    if (!editorRef.current) return;
    // Ensure the contenteditable div has focus before running a command
    editorRef.current.focus();
    // execCommand is deprecated but remains the most reliable cross-browser
    // approach for contenteditable formatting. Wrapped in try/catch so the
    // editor degrades gracefully if a browser eventually removes support.
    try {
      document.execCommand(command, false, value || undefined);
    } catch (err) {
      console.warn(`[RichEditor] Command "${command}" is not supported:`, err);
    }
    setBlogContent(editorRef.current.innerHTML);
  };

  const insertTemplateHtml = (templateType: "spec" | "takeoff") => {
    const specTemplate = `<h3>Concrete Quality Spec Sheet</h3><ul><li>Concrete Grade: M25</li><li>Testing Standard: IS 516</li><li>7-Day Target Strength: 16.5 N/mm²</li><li>28-Day Target Strength: 25 N/mm²</li></ul><h3>Site Inspection Checklist</h3><ul><li>Check concrete slump before placing</li><li>Verify rebar clear cover spacing</li><li>Cure with ponding method for 14 days</li></ul><p></p>`;
    const takeoffTemplate = `<h3>Structural Quantity Takeoff</h3><ul><li>Member ID: column-C1-ground-floor</li><li>Cement Grade: OPC 43</li><li>Steel Bar Diameter: 12mm / 16mm / 20mm</li><li>Sand Zone: Zone II River Sand</li></ul><h3>Estimation Details</h3><ul><li>Coarse Aggregate required: 8.5 m³</li><li>Steel reinforcement required: 1.25 Tons</li><li>Total Cement required: 180 Bags</li></ul><p></p>`;
    const templateHtml = templateType === "spec" ? specTemplate : takeoffTemplate;

    if (editorRef.current) {
      editorRef.current.focus();
      // Use the modern Selection + Range API instead of the deprecated
      // execCommand("insertHTML") to insert template HTML at cursor position.
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const fragment = document.createRange().createContextualFragment(templateHtml);
        const lastInserted = fragment.lastChild;
        range.insertNode(fragment);
        // Move cursor to end of inserted content
        if (lastInserted) {
          const newRange = document.createRange();
          newRange.setStartAfter(lastInserted);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);
        }
      } else {
        // Fallback: append to end of editor if no cursor position
        editorRef.current.insertAdjacentHTML("beforeend", templateHtml);
      }
      setBlogContent(editorRef.current.innerHTML);
    }
    setShowTemplates(false);
  };



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
      status: blogStatus,
      slug: generateSlug(blogTitle)
    };

    if (editingBlogId) {
      updateBlog(editingBlogId, blogMeta);
      alert("Blog post updated successfully!");
      setEditingBlogId(null);
    } else {
      addBlog(blogMeta);
      alert("Blog post published successfully!");
    }

    setIsBlogModalOpen(false);

    // Reset Form
    setBlogTitle("");
    setBlogSummary("");
    setBlogContent("");
    setBlogCategory("Structure");
    setBlogAuthor("CivAtHand Admin");
    setBlogImage("");
    setBlogStatus("published");
  };

  const openNewBlogModal = () => {
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogSummary("");
    setBlogContent("");
    setBlogCategory("Structure");
    setBlogAuthor("CivAtHand Admin");
    setBlogImage("");
    setBlogStatus("published");
    setEditorMode("write");
    setIsBlogModalOpen(true);
  };

  const startEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogTitle(post.title);
    setBlogSummary(post.summary);

    const isHtml = post.content.includes("<p>") || post.content.includes("<h3>") || post.content.includes("<ul>");
    const contentHtml = isHtml ? post.content : convertMarkdownToHtml(post.content);
    setBlogContent(contentHtml);

    setBlogCategory(post.category);
    setBlogAuthor(post.author);
    setBlogImage(post.image);
    setBlogStatus(post.status);
    setEditorMode("write");
    setIsBlogModalOpen(true);
  };

  const cancelEditBlog = () => {
    setIsBlogModalOpen(false);
    setEditingBlogId(null);
    setBlogTitle("");
    setBlogSummary("");
    setBlogContent("");
    setBlogCategory("Structure");
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
          { id: "drawings", title: "Drawing Audit Desk", icon: FileText },
          { id: "invoices", title: "Billing & Invoicing", icon: Receipt },
          { id: "blogs", title: "Blog Management", icon: BookOpen },
          { id: "portfolio", title: "Portfolio Management", icon: Briefcase }
        ].map((tab) => {
          const hasNewLeads = tab.badge && leads.filter((l) => l.status === "new").length > 0;
          return (
            <motion.button
              key={tab.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-shrink-0 flex items-center gap-3 w-full px-4 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${activeTab === tab.id
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

              {/* Content Engagement Overview Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                
                {/* Blog Statistics */}
                <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-100 pb-3 gap-2">
                    <h4 className="font-display font-extrabold text-sm text-navy-950 uppercase tracking-wider">
                      Blog Articles Performance
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap text-[9px] font-bold uppercase">
                      <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded flex items-center gap-1" title="Total Blog Views">
                        <Eye className="h-3 w-3" /> {totalBlogViews.toLocaleString()}
                      </span>
                      <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded flex items-center gap-1" title="Total Blog Likes">
                        <Heart className="h-3 w-3 fill-rose-500 stroke-rose-750" /> {totalBlogLikes.toLocaleString()}
                      </span>
                      <span className="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded flex items-center gap-1" title="Total Blog Shares">
                        <Share2 className="h-3 w-3" /> {totalBlogShares.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {[...blogs]
                      .sort((a, b) => ((b as any).views || 0) - ((a as any).views || 0))
                      .slice(0, 5)
                      .map((post) => (
                        <div key={post.id} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg border border-slate-100 gap-2">
                          <div className="truncate font-semibold text-navy-950 max-w-[50%]" title={post.title}>
                            {post.title}
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 text-[9px] text-slate-500 font-bold">
                            <span className="flex items-center gap-0.5" title="Views">
                              <Eye className="h-2.5 w-2.5 text-blue-500" /> {((post as any).views || 0)}
                            </span>
                            <span className="flex items-center gap-0.5" title="Likes">
                              <Heart className="h-2.5 w-2.5 fill-rose-500 stroke-rose-500" /> {((post as any).likes || 0)}
                            </span>
                            <span className="flex items-center gap-0.5" title="Shares">
                              <Share2 className="h-2.5 w-2.5 text-indigo-500" /> {((post as any).shares || 0)}
                            </span>
                          </div>
                        </div>
                      ))}
                    {blogs.length === 0 && (
                      <p className="text-[10px] text-slate-400 italic">No blog posts published yet.</p>
                    )}
                  </div>
                </div>

                {/* Portfolio Statistics */}
                <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h4 className="font-display font-extrabold text-sm text-navy-950 uppercase tracking-wider">
                      Portfolio Case Studies
                    </h4>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2.5 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" /> {totalPortfolioViews.toLocaleString()} Total Views
                    </span>
                  </div>
                  <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                    {[...portfolio]
                      .sort((a, b) => ((b as any).views || 0) - ((a as any).views || 0))
                      .slice(0, 5)
                      .map((item) => (
                        <div key={item.id} className="flex justify-between items-center text-xs p-2 bg-slate-50 rounded-lg border border-slate-100">
                          <div className="truncate font-semibold text-navy-950 max-w-[70%]" title={item.title}>
                            {item.title}
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 flex-shrink-0">
                            <Eye className="h-3 w-3" /> {((item as any).views || 0)} views
                          </span>
                        </div>
                      ))}
                    {portfolio.length === 0 && (
                      <p className="text-[10px] text-slate-400 italic">No portfolio projects published yet.</p>
                    )}
                  </div>
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
                            lead.status === "contacted" ? "bg-blue-100 text-blue-700 border border-blue-200/50" :
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

                    {(lead as any).profileDetails && (
                      <div className="p-3 bg-slate-50/75 rounded-lg border border-slate-200/60 text-[11px] font-medium text-slate-700 space-y-1.5">
                        <span className="block font-bold text-navy-950 text-[9px] uppercase tracking-wider">
                          Registered Client Profile
                        </span>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
                          {(lead as any).profileDetails.company && (
                            <div>
                              <span className="text-slate-400 font-semibold">Company: </span>
                              <span className="text-slate-700 font-bold">{(lead as any).profileDetails.company}</span>
                            </div>
                          )}
                          {(lead as any).profileDetails.address && (
                            <div className="md:col-span-2">
                              <span className="text-slate-400 font-semibold">Location / Address: </span>
                              <span className="text-slate-700 font-bold">{(lead as any).profileDetails.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                      <button
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this lead request?")) {
                            deleteLead(lead.id);
                          }
                        }}
                        className="mr-auto text-red-500 hover:text-red-700 font-bold px-3 py-1.5 rounded-lg text-[10px] cursor-pointer transition-colors"
                      >
                        Delete Request
                      </button>
                      {lead.status === "new" && (
                        <>
                          <button
                            onClick={async () => {
                              await updateLeadStatus(lead.id, "contacted");
                              alert("Lead status marked as Contacted.");
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-3 py-1.5 rounded-lg text-[10px] cursor-pointer"
                          >
                            Mark Contacted
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleConvertLead(lead)}
                            className="bg-navy-950 hover:bg-orange-600 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-1 shadow-sm transition-all cursor-pointer"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                            Convert to Project
                          </motion.button>
                        </>
                      )}
                    </div>
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
                      <span className="text-navy-600 flex flex-wrap gap-1 items-center">
                        Files:{" "}
                        {proj.drawings.length === 0 ? (
                          <span>No files attached</span>
                        ) : (
                          proj.drawings.map((fname, fidx) => {
                            const d = drawings.find((x) => x.name === fname);
                            return (
                              <React.Fragment key={fidx}>
                                {fidx > 0 && ", "}
                                {d?.url ? (
                                  <a
                                    href={d.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-orange-600 hover:text-orange-700 underline font-bold cursor-pointer inline-block"
                                    title={`Open ${fname}`}
                                  >
                                    {fname}
                                  </a>
                                ) : (
                                  <span>{fname}</span>
                                )}
                              </React.Fragment>
                            );
                          })
                        )}
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

          {/* TAB: Drawings Audit Desk */}
          {activeTab === "drawings" && (
            <motion.div
              key="drawings"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 flex-grow"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-navy-950">Drawing Audit Desk</h3>
                  <p className="text-xs text-navy-600 mt-1">Review and manage client design blueprints, model analysis states, and engineering drawings.</p>
                </div>
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2 flex items-center gap-3">
                  <span className="text-xs font-semibold text-navy-600">Total Drawings: <strong className="text-navy-950">{drawings.length}</strong></span>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Analyzing</span>
                    <p className="text-xl font-extrabold text-amber-950 mt-0.5">{drawings.filter(d => d.status === "Analyzing").length}</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
                </div>
                <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">Ready / Approved</span>
                    <p className="text-xl font-extrabold text-emerald-950 mt-0.5">{drawings.filter(d => d.status === "Ready").length}</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="bg-blue-50/50 border border-blue-200/60 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider">Processed</span>
                    <p className="text-xl font-extrabold text-blue-950 mt-0.5">{drawings.filter(d => d.status === "Processed").length}</p>
                  </div>
                  <FileText className="h-5 w-5 text-blue-500" />
                </div>
              </div>

              {/* Drawing Table / Grid */}
              <div className="border border-slate-200 rounded-xl bg-white shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-navy-950 font-bold uppercase tracking-wider text-[10px]">
                        <th className="p-4">Drawing Name</th>
                        <th className="p-4">Service Category</th>
                        <th className="p-4">Size & Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {drawings.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="p-8 text-center text-navy-600">
                            No drawings uploaded yet in the system.
                          </td>
                        </tr>
                      ) : (
                        drawings.map((draw) => (
                          <tr key={draw.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="p-4 font-semibold text-navy-950 max-w-xs truncate">
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                {draw.url ? (
                                  <a
                                    href={draw.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-orange-600 underline transition-colors truncate cursor-pointer font-bold"
                                    title={`Click to open/download ${draw.name}`}
                                  >
                                    {draw.name}
                                  </a>
                                ) : (
                                  <span className="truncate" title={draw.name}>{draw.name}</span>
                                )}
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="bg-slate-100 text-navy-700 px-2 py-0.5 rounded font-medium text-[10px]">
                                {draw.serviceType}
                              </span>
                            </td>
                            <td className="p-4 text-navy-600">
                              <div>{draw.size}</div>
                              <div className="text-[9px] text-slate-400 mt-0.5">Uploaded {draw.uploadDate}</div>
                            </td>
                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                                draw.status === "Ready" ? "bg-emerald-100 text-emerald-700" :
                                draw.status === "Analyzing" ? "bg-amber-100 text-amber-700 flex animate-pulse" :
                                "bg-blue-100 text-blue-700"
                              }`}>
                                {draw.status}
                              </span>
                            </td>
                            <td className="p-4 text-right space-x-2">
                              <select
                                value={draw.status}
                                onChange={(e) => updateDrawingStatus(draw.id, e.target.value as any)}
                                className="bg-white border border-slate-200 rounded px-2 py-1 text-[11px] font-bold text-navy-950 focus:outline-none cursor-pointer focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                              >
                                <option value="Analyzing">Set Analyzing</option>
                                <option value="Ready">Set Ready</option>
                                <option value="Processed">Set Processed</option>
                              </select>
                              <button
                                onClick={() => {
                                  if (confirm(`Are you sure you want to delete "${draw.name}"?`)) {
                                    deleteDrawing(draw.id);
                                  }
                                }}
                                className="inline-flex items-center justify-center p-1 rounded hover:bg-red-50 text-slate-400 hover:text-red-600 border border-transparent hover:border-red-100 transition-all cursor-pointer"
                                title="Delete Drawing"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
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
                        <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${inv.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
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
              {/* Tab Header with Create button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-navy-950">Engineering Blog & Content Management</h3>
                  <p className="text-xs text-navy-600 mt-1">Write, edit, and publish engineering technical articles and site news update logs.</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={openNewBlogModal}
                  className="self-start sm:self-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-premium cursor-pointer"
                >
                  <FilePlus className="h-4.5 w-4.5 text-white" />
                  Create New Article
                </motion.button>
              </div>

              {/* Active Blog Listing in 2-Column Grid */}
              <div className="space-y-4">
                <h4 className="font-display font-extrabold text-sm text-navy-950 uppercase tracking-wider">
                  Active Blog Articles ({blogs.length})
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[580px] pr-1 animate-fadeIn">
                  {blogs.length === 0 ? (
                    <div className="col-span-2 text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-500">
                      <BookOpen className="h-10 w-10 mx-auto text-slate-300 mb-3 animate-pulse" />
                      No articles found. Start publishing!
                    </div>
                  ) : (
                    blogs.map((post) => (
                      <div key={post.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:bg-slate-50/50 hover:border-slate-300 transition-all shadow-sm flex gap-4 items-start">
                        <div className="h-16 w-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative border border-slate-100">
                          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                        </div>

                        <div className="flex-grow space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[8px] bg-navy-100 text-navy-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                              {post.category}
                            </span>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${post.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                              }`}>
                              {post.status}
                            </span>
                            <span className="text-[8px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {(post as any).views || 0} views
                            </span>
                            <span className="text-[8px] bg-rose-50 text-rose-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide flex items-center gap-1">
                              <Heart className="h-3 w-3 fill-rose-500 stroke-rose-500" /> {(post as any).likes || 0} likes
                            </span>
                            <span className="text-[8px] bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide flex items-center gap-1">
                              <Share2 className="h-3 w-3" /> {(post as any).shares || 0} shares
                            </span>
                            <span className="text-[9px] text-navy-500 ml-auto font-medium">{post.date}</span>
                          </div>
                          <h5 className="font-display font-extrabold text-xs text-navy-950 truncate" title={post.title}>{post.title}</h5>
                          <p className="text-[10px] text-navy-600 line-clamp-1 italic">"{post.summary}"</p>
                          <p className="text-[9px] text-navy-600 font-semibold">Author: {post.author}</p>

                          <div className="flex gap-2 items-center pt-2 border-t border-slate-100 mt-2">
                            <button
                              onClick={() => {
                                const nextStatus = post.status === "published" ? "draft" : "published";
                                updateBlog(post.id, { status: nextStatus });
                              }}
                              className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-2.5 py-1.5 rounded-lg text-[9px] uppercase tracking-wide transition-colors"
                            >
                              {post.status === "published" ? "Unpublish" : "Publish"}
                            </button>

                            <div className="flex gap-1.5 ml-auto">
                              <button
                                onClick={() => startEditBlog(post)}
                                className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 p-1.5 rounded-lg transition-colors"
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
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-600 p-1.5 rounded-lg transition-colors"
                                title="Delete Article"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Popup Editor Modal */}
              <AnimatePresence>
                {isBlogModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-2xl shadow-premium-lg border border-slate-200 w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col"
                    >
                      {/* Modal Header */}
                      <div className="px-6 py-4 bg-navy-950 text-white flex justify-between items-center rounded-t-2xl border-b border-white/5 select-none">
                        <div>
                          <h4 className="font-display font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 text-white">
                            <BookOpen className="h-5 w-5 text-orange-500" />
                            {editingBlogId ? "Edit Blog Article" : "Create New Blog Article"}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Write and preview your engineering blog post in a spacious dedicated window.</p>
                        </div>
                        <button
                          type="button"
                          onClick={cancelEditBlog}
                          className="h-8 w-8 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Modal Form */}
                      <form onSubmit={handleBlogSubmit} className="p-6 md:p-8 space-y-6 flex-grow">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                          {/* Left Half: Metadata */}
                          <div className="lg:col-span-5 space-y-4">
                            <div>
                              <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Article Title</label>
                              <input
                                type="text"
                                required
                                value={blogTitle}
                                onChange={(e) => setBlogTitle(e.target.value)}
                                placeholder="e.g. Modern Rebar Placement Guide"
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Category</label>
                                <select
                                  value={blogCategory}
                                  onChange={(e) => setBlogCategory(e.target.value as any)}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                >
                                  <option value="Structure">Structure</option>
                                  <option value="Educational">Educational</option>
                                  <option value="Transportation">Transportation</option>
                                  <option value="General tech">General Tech</option>
                                  <option value="Architecture">Architecture</option>
                                  <option value="Case studies">Case Studies</option>
                                  <option value="Civil engineering">Civil Engineering</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Status</label>
                                <select
                                  value={blogStatus}
                                  onChange={(e) => setBlogStatus(e.target.value as any)}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                >
                                  <option value="published">Published</option>
                                  <option value="draft">Draft (Private)</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Author Name</label>
                                <input
                                  type="text"
                                  required
                                  value={blogAuthor}
                                  onChange={(e) => setBlogAuthor(e.target.value)}
                                  placeholder="e.g. Er. Amit Wagh"
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                />
                              </div>
                            </div>

                             {/* Banner Image URL — stores only a URL, never base64, to avoid MongoDB document-size limits */}
                             <div>
                               <div className="flex justify-between items-center mb-1.5">
                                 <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider">Banner Image URL</label>
                                 <div className="flex items-center gap-2">
                                   <input
                                     type="file"
                                     id="bannerImageUploadInput"
                                     accept="image/*"
                                     onChange={handleBannerUpload}
                                     style={{ display: "none" }}
                                   />
                                   <button
                                     type="button"
                                     disabled={isBannerUploading}
                                     onClick={() => document.getElementById("bannerImageUploadInput")?.click()}
                                     className="bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold px-2 py-1 rounded text-[9px] uppercase tracking-wide cursor-pointer transition-colors"
                                   >
                                     {isBannerUploading ? "Uploading..." : "Upload Device File"}
                                   </button>
                                 </div>
                               </div>
                               <div className="flex items-center gap-3">
                                 {blogImage && (
                                   <div className="relative h-11 w-16 rounded-lg overflow-hidden border border-slate-300 bg-slate-50 group flex-shrink-0">
                                     <img src={blogImage} alt="Banner Preview" className="h-full w-full object-cover" />
                                     <button
                                       type="button"
                                       onClick={() => setBlogImage("")}
                                       className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[8px] font-bold transition-all uppercase tracking-wide cursor-pointer"
                                     >
                                       Remove
                                     </button>
                                   </div>
                                 )}
                                 <input
                                   type="url"
                                   value={blogImage}
                                   onChange={(e) => setBlogImage(e.target.value)}
                                   placeholder="https://images.unsplash.com/photo-..."
                                   className="flex-grow bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                 />
                               </div>
                               <p className="text-[9px] text-slate-400 mt-1">Select a local device file to upload it, or paste any public image URL. Only the URL path is stored in the database.</p>
                             </div>

                            <div>
                              <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Brief Summary</label>
                              <textarea
                                required
                                rows={3}
                                value={blogSummary}
                                onChange={(e) => setBlogSummary(e.target.value)}
                                placeholder="A short snippet shown on card preview..."
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm resize-none transition-all"
                              />
                            </div>
                          </div>

                          {/* Right Half: Editor Textarea & Formatting toolbar */}
                          <div className="lg:col-span-7 space-y-4">
                            <div>
                              <div className="flex justify-between items-center mb-1.5">
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider">
                                  Full Article Content
                                </label>
                                {/* Editor Mode Tabs */}
                                <div className="flex bg-slate-200 p-0.5 rounded-lg border border-slate-300">
                                  <button
                                    type="button"
                                    onClick={() => setEditorMode("write")}
                                    className={`px-3 py-0.5 rounded-md text-[9px] font-bold uppercase transition-all ${editorMode === "write" ? "bg-white text-navy-950 shadow-sm" : "text-navy-600 hover:text-navy-950"
                                      }`}
                                  >
                                    Write
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setEditorMode("preview")}
                                    className={`px-3 py-0.5 rounded-md text-[9px] font-bold uppercase transition-all ${editorMode === "preview" ? "bg-white text-navy-950 shadow-sm" : "text-navy-600 hover:text-navy-950"
                                      }`}
                                  >
                                    Preview
                                  </button>
                                </div>
                              </div>

                              {editorMode === "write" ? (
                                <div className="border border-slate-300 rounded-lg bg-white shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-all">
                                  {/* Rich Formatting Toolbar */}
                                  <div className="flex flex-wrap items-center gap-1 bg-slate-50 border-b border-slate-200 px-2 py-1.5 text-slate-600 select-none rounded-t-lg">
                                    {/* Group 1: Text Styles */}
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("bold")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Bold (Ctrl+B)"
                                    >
                                      <Bold className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("italic")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Italic (Ctrl+I)"
                                    >
                                      <Italic className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("underline")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Underline (Ctrl+U)"
                                    >
                                      <Underline className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("strikeThrough")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Strikethrough"
                                    >
                                      <Strikethrough className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("subscript")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Subscript"
                                    >
                                      <Subscript className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("superscript")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Superscript"
                                    >
                                      <Superscript className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => {
                                        try {
                                          const current = document.queryCommandValue("fontSize") || "3";
                                          const next = Math.min(7, parseInt(current) + 1);
                                          runCommand("fontSize", next.toString());
                                        } catch (err) {
                                          console.warn(err);
                                        }
                                      }}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors flex items-center justify-center font-display font-extrabold text-[10px] w-6 h-6 select-none"
                                      title="Increase Font Size"
                                    >
                                      A+
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => {
                                        try {
                                          const current = document.queryCommandValue("fontSize") || "3";
                                          const next = Math.max(1, parseInt(current) - 1);
                                          runCommand("fontSize", next.toString());
                                        } catch (err) {
                                          console.warn(err);
                                        }
                                      }}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors flex items-center justify-center font-display font-extrabold text-[10px] w-6 h-6 select-none"
                                      title="Decrease Font Size"
                                    >
                                      A-
                                    </button>
                                    <div className="h-4 w-[1px] bg-slate-300 mx-1 flex-shrink-0" />

                                    {/* Group 2: Headings & Block Formats */}
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("formatBlock", "<h3>")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="H3 Heading"
                                    >
                                      <Heading className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("formatBlock", "<pre>")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Code Block"
                                    >
                                      <Code className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("formatBlock", "<blockquote>")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Blockquote"
                                    >
                                      <Quote className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("insertHorizontalRule")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Horizontal Divider"
                                    >
                                      <Minus className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="h-4 w-[1px] bg-slate-300 mx-1 flex-shrink-0" />

                                    {/* Group 3: Lists */}
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("insertUnorderedList")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Bullet List"
                                    >
                                      <List className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("insertOrderedList")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Numbered List"
                                    >
                                      <ListOrdered className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="h-4 w-[1px] bg-slate-300 mx-1 flex-shrink-0" />

                                    {/* Group 4: Alignments */}
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("justifyLeft")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Align Left"
                                    >
                                      <AlignLeft className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("justifyCenter")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Align Center"
                                    >
                                      <AlignCenter className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("justifyRight")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Align Right"
                                    >
                                      <AlignRight className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("justifyFull")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Justify Text"
                                    >
                                      <AlignJustify className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="h-4 w-[1px] bg-slate-300 mx-1 flex-shrink-0" />

                                    {/* Group 5: Insert actions & Color */}
                                     <button
                                       type="button"
                                       onMouseDown={(e) => e.preventDefault()}
                                       onClick={() => {
                                         const url = prompt("Enter link URL:", "https://");
                                         if (url) runCommand("createLink", url);
                                       }}
                                       className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                       title="Insert Link (Ctrl+K)"
                                     >
                                       <Link2 className="h-3.5 w-3.5" />
                                     </button>

                                     {/* Insert Image Dropdown */}
                                     <div className="relative">
                                       <button
                                         type="button"
                                         onMouseDown={(e) => e.preventDefault()}
                                         onClick={() => setShowImageMenu(!showImageMenu)}
                                         className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors flex items-center"
                                         title="Insert Image Options"
                                       >
                                         <ImageIcon className="h-3.5 w-3.5" />
                                       </button>
                                       {showImageMenu && (
                                         <div className="absolute right-0 mt-1.5 p-3.5 bg-white border border-slate-200 rounded-xl shadow-premium-lg z-25 flex flex-col gap-3.5 animate-fadeIn select-none w-56">
                                           <div className="space-y-1.5">
                                             <label className="block text-[9px] font-bold text-navy-950 uppercase tracking-wider">Upload from Device</label>
                                             <input
                                               type="file"
                                               accept="image/*"
                                               disabled={isUploading}
                                               onChange={handleImageUpload}
                                               className="w-full text-[10px] text-slate-600 file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[9px] file:font-bold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer file:cursor-pointer"
                                             />
                                             {isUploading && (
                                               <span className="text-[8px] text-orange-600 font-semibold animate-pulse block mt-0.5">Uploading...</span>
                                             )}
                                           </div>
                                           <div className="border-t border-slate-100 pt-2.5 space-y-1.5">
                                             <label className="block text-[9px] font-bold text-navy-950 uppercase tracking-wider">Insert from URL</label>
                                             <div className="flex gap-1.5">
                                               <input
                                                 type="url"
                                                 placeholder="https://example.com/image.png"
                                                 value={urlInput}
                                                 onChange={(e) => setUrlInput(e.target.value)}
                                                 className="flex-grow bg-slate-50 border border-slate-300 rounded px-2 py-1 text-[10px] focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                               />
                                               <button
                                                 type="button"
                                                 onClick={() => {
                                                   if (urlInput.trim()) {
                                                     runCommand("insertImage", urlInput.trim());
                                                     setUrlInput("");
                                                     setShowImageMenu(false);
                                                   }
                                                 }}
                                                 className="bg-navy-950 hover:bg-orange-600 text-white font-bold px-2.5 py-1 rounded text-[9px] uppercase tracking-wide cursor-pointer transition-colors"
                                               >
                                                 Insert
                                               </button>
                                             </div>
                                           </div>
                                         </div>
                                       )}
                                     </div>

                                    {/* Text Color Dropdown */}
                                    <div className="relative">
                                      <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => setShowColors(!showColors)}
                                        className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors flex items-center"
                                        title="Text Color"
                                      >
                                        <Paintbrush className="h-3.5 w-3.5" />
                                      </button>
                                      {showColors && (
                                        <div className="absolute right-0 mt-1.5 p-2 bg-white border border-slate-200 rounded-xl shadow-premium-lg z-25 grid grid-cols-6 gap-1.5 animate-fadeIn select-none w-44">
                                          {[
                                            { name: "Red", hex: "#721126ff" },
                                            { name: "Pink", hex: "#df1c1cff" },
                                            { name: "Purple", hex: "#6b1bb5ff" },
                                            { name: "Blue", hex: "#2525ebff" },
                                            { name: "Sky Blue", hex: "#026bc7e7" },
                                            { name: "Teal", hex: "#1b940dff" },
                                            { name: "Green", hex: "#16a34a" },
                                            { name: "Yellow", hex: "#ca8a04" },
                                            { name: "Orange", hex: "#dff021ff" },
                                            { name: "Gray", hex: "#1c2634ff" },
                                            { name: "Navy", hex: "#1e3a8a" },
                                            { name: "Black", hex: "#000000" }
                                          ].map((color) => (
                                            <button
                                              key={color.hex}
                                              type="button"
                                              onMouseDown={(e) => e.preventDefault()}
                                              onClick={() => {
                                                runCommand("foreColor", color.hex);
                                                setShowColors(false);
                                              }}
                                              className="w-5 h-5 rounded-full border border-slate-300 cursor-pointer shadow-sm hover:scale-110 transition-transform"
                                              style={{ backgroundColor: color.hex }}
                                              title={color.name}
                                            />
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Font Family Dropdown */}
                                    <div className="relative">
                                      <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => setShowFonts(!showFonts)}
                                        className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors flex items-center"
                                        title="Font Family"
                                      >
                                        <Type className="h-3.5 w-3.5" />
                                      </button>
                                      {showFonts && (
                                        <div className="absolute right-0 mt-1.5 w-40 bg-white border border-slate-200 rounded-lg shadow-premium-lg z-25 py-1 text-slate-800 text-[10px] font-semibold divide-y divide-slate-100 max-h-48 overflow-y-auto">
                                          {[
                                            { name: "Default", family: "system-ui, sans-serif" },
                                            { name: "Times New Roman", family: "Times New Roman, Georgia, serif" },
                                            { name: "Arial", family: "Arial, Helvetica, sans-serif" },
                                            { name: "Georgia", family: "Georgia, serif" },
                                            { name: "Courier New", family: "Courier New, Courier, monospace" },
                                            { name: "Verdana", family: "Verdana, Geneva, sans-serif" },
                                            { name: "Impact", family: "Impact, Charcoal, sans-serif" }
                                          ].map((font) => (
                                            <button
                                              key={font.family}
                                              type="button"
                                              onMouseDown={(e) => e.preventDefault()}
                                              onClick={() => {
                                                runCommand("fontName", font.family);
                                                setShowFonts(false);
                                              }}
                                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors block text-[10px]"
                                              style={{ fontFamily: font.family }}
                                            >
                                              {font.name}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    <button
                                      type="button"
                                      onMouseDown={(e) => e.preventDefault()}
                                      onClick={() => runCommand("removeFormat")}
                                      className="p-1 rounded hover:bg-slate-200 hover:text-navy-950 transition-colors"
                                      title="Clear Selection Formatting"
                                    >
                                      <Eraser className="h-3.5 w-3.5" />
                                    </button>
                                    <div className="h-4 w-[1px] bg-slate-300 mx-1 flex-shrink-0" />

                                    {/* Pre-made Templates Dropdown */}
                                    <div className="relative">
                                      <button
                                        type="button"
                                        onMouseDown={(e) => e.preventDefault()}
                                        onClick={() => setShowTemplates(!showTemplates)}
                                        className="flex items-center gap-1 px-2 py-1 bg-orange-50 hover:bg-orange-100 text-orange-700 rounded text-[9px] font-bold uppercase transition-all"
                                        title="Insert Engineering Templates"
                                      >
                                        <Sparkles className="h-3 w-3" />
                                        Templates
                                      </button>
                                      {showTemplates && (
                                        <div className="absolute right-0 mt-1.5 w-48 bg-white border border-slate-200 rounded-lg shadow-premium-lg z-20 py-1 text-slate-800 text-[10px] font-semibold divide-y divide-slate-100">
                                          <button
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => insertTemplateHtml("spec")}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors block"
                                          >
                                            Concrete Grade & Spec Sheet
                                          </button>
                                          <button
                                            type="button"
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => insertTemplateHtml("takeoff")}
                                            className="w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors block"
                                          >
                                            Material Quantity Takeoff (BOQ)
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="relative w-full">
                                    <style dangerouslySetInnerHTML={{
                                      __html: `
                                      #blogContentTextarea:empty::before {
                                        content: attr(data-placeholder);
                                        color: #94a3b8;
                                        font-style: italic;
                                        position: absolute;
                                        left: 12px;
                                        top: 10px;
                                        pointer-events: none;
                                      }
                                      #blogContentTextarea h3 {
                                        font-size: 1.15em;
                                        font-weight: 800;
                                        margin-top: 12px;
                                        margin-bottom: 6px;
                                        color: #0f172a;
                                      }
                                      #blogContentTextarea ul {
                                        list-style-type: disc;
                                        padding-left: 20px;
                                        margin-top: 6px;
                                        margin-bottom: 6px;
                                      }
                                      #blogContentTextarea ol {
                                        list-style-type: decimal;
                                        padding-left: 20px;
                                        margin-top: 6px;
                                        margin-bottom: 6px;
                                      }
                                      #blogContentTextarea blockquote {
                                        border-left: 4px solid #ff6b00;
                                        padding-left: 12px;
                                        font-style: italic;
                                        color: #64748b;
                                        margin-top: 10px;
                                        margin-bottom: 10px;
                                      }
                                      #blogContentTextarea pre {
                                        background-color: #f1f5f9;
                                        padding: 8px 12px;
                                        border-radius: 6px;
                                        font-family: monospace;
                                        margin-top: 8px;
                                        margin-bottom: 8px;
                                        overflow-x: auto;
                                      }
                                      #blogContentTextarea hr {
                                        border: none;
                                        border-top: 2px dashed #cbd5e1;
                                        margin: 16px 0;
                                      }
                                      #blogContentTextarea img {
                                        max-width: 100%;
                                        height: auto;
                                        border-radius: 8px;
                                        margin: 12px auto;
                                        display: block;
                                        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
                                        cursor: pointer;
                                        transition: outline 0.1s ease;
                                      }
                                      #blogContentTextarea img:hover {
                                        outline: 3px solid #ff6b00;
                                      }
                                    `}} />
                                    <div
                                      ref={editorRef}
                                      id="blogContentTextarea"
                                      contentEditable={true}
                                      onInput={handleEditorInput}
                                      onKeyDown={handleEditorKeyDown}
                                      onClick={handleEditorClick}
                                      data-placeholder="Write full article body. Supports visual editing: Bold, Italic, Headings, and Lists. Click on an image to resize it."
                                      className="w-full bg-transparent border-none px-3 py-2.5 text-xs focus:outline-none text-slate-800 font-semibold overflow-y-auto min-h-[220px] max-h-[350px] outline-none prose prose-slate"
                                      style={{ minHeight: "220px" }}
                                    />
                                  </div>

                                  {/* Stats footer */}
                                  <div className="bg-slate-50 border-t border-slate-100 px-3 py-1 flex justify-between text-[9px] font-bold text-slate-500 uppercase tracking-wider select-none rounded-b-lg">
                                    <span>Words: {blogContent.trim() === "" ? 0 : blogContent.trim().split(/\s+/).length}</span>
                                    <span>Chars: {blogContent.length}</span>
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className="border border-slate-300 rounded-lg p-4 bg-slate-50 min-h-[305px] overflow-y-auto max-h-[380px] prose prose-slate text-xs leading-relaxed font-medium"
                                  dangerouslySetInnerHTML={{ __html: blogContent || '<span class="text-slate-400 italic">Nothing to preview. Start writing!</span>' }}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={cancelEditBlog}
                            className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="bg-navy-950 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-premium cursor-pointer"
                          >
                            {editingBlogId ? "Save Updates" : "Publish Post"}
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* TAB 6: Portfolio Management */}
          {activeTab === "portfolio" && (
            <motion.div
              key="portfolio"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-6 flex-grow text-xs text-navy-950"
            >
              {/* Tab Header with Create button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-navy-950">Engineering Portfolio Management</h3>
                  <p className="text-xs text-navy-600 mt-1">Publish and manage case studies, technical specifications, design challenges, and blueprints.</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={portSearchTerm}
                    onChange={(e) => setPortSearchTerm(e.target.value)}
                    className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-600 focus:bg-white text-slate-800 font-semibold"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={openNewPortModal}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-premium cursor-pointer"
                  >
                    <Plus className="h-4.5 w-4.5 text-white" />
                    Add Masterpiece
                  </motion.button>
                </div>
              </div>

              {/* Active Portfolio Listing */}
              <div className="space-y-4">
                <h4 className="font-display font-extrabold text-sm text-navy-950 uppercase tracking-wider">
                  Masterpiece Projects ({portfolio.length})
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto max-h-[580px] pr-1 animate-fadeIn">
                  {portfolio.filter(item => 
                    item.title.toLowerCase().includes(portSearchTerm.toLowerCase()) ||
                    item.category.toLowerCase().includes(portSearchTerm.toLowerCase()) ||
                    item.loc.toLowerCase().includes(portSearchTerm.toLowerCase())
                  ).length === 0 ? (
                    <div className="col-span-2 text-center py-20 bg-slate-50 border border-dashed border-slate-200 rounded-xl text-slate-500">
                      <Briefcase className="h-10 w-10 mx-auto text-slate-300 mb-3 animate-pulse" />
                      No portfolio projects found. Click 'Add Masterpiece' to begin.
                    </div>
                  ) : (
                    portfolio.filter(item => 
                      item.title.toLowerCase().includes(portSearchTerm.toLowerCase()) ||
                      item.category.toLowerCase().includes(portSearchTerm.toLowerCase()) ||
                      item.loc.toLowerCase().includes(portSearchTerm.toLowerCase())
                    ).map((item) => (
                      <div key={item.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:bg-slate-50/50 hover:border-slate-300 transition-all shadow-sm flex gap-4 items-start">
                        <div className="h-20 w-28 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative border border-slate-100">
                          <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                        </div>
                        
                        <div className="flex-grow space-y-1.5 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[8px] bg-navy-100 text-navy-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide">
                              {item.category}
                            </span>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${
                              item.status === "Completed" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                            }`}>
                              {item.status}
                            </span>
                            <span className="text-[8px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wide flex items-center gap-1">
                              <Eye className="h-3 w-3" /> {(item as any).views || 0} views
                            </span>
                            <span className="text-[9px] text-navy-500 ml-auto font-bold">{item.area}</span>
                          </div>
                          <h5 className="font-display font-extrabold text-xs text-navy-950 truncate" title={item.title}>{item.title}</h5>
                          <p className="text-[10px] text-navy-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                          <p className="text-[9px] text-slate-500 font-semibold flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-slate-400" /> {item.loc}
                          </p>
                          
                          <div className="flex gap-2 items-center pt-2 border-t border-slate-100 mt-2">
                            <div className="flex gap-1.5 ml-auto">
                              <button
                                type="button"
                                onClick={() => startEditPort(item)}
                                className="bg-orange-500/10 hover:bg-orange-500/20 text-orange-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                                title="Edit Masterpiece"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm("Are you sure you want to delete this portfolio masterpiece?")) {
                                    deletePortfolioItem(item.id);
                                  }
                                }}
                                className="bg-red-500/10 hover:bg-red-500/20 text-red-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                                title="Delete Masterpiece"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Popup Editor Modal */}
              <AnimatePresence>
                {isPortModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 15 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white rounded-2xl shadow-premium-lg border border-slate-200 w-full max-w-5xl max-h-[90vh] overflow-y-auto flex flex-col"
                    >
                      {/* Modal Header */}
                      <div className="px-6 py-4 bg-navy-950 text-white flex justify-between items-center rounded-t-2xl border-b border-white/5 select-none">
                        <div>
                          <h4 className="font-display font-extrabold text-sm uppercase tracking-wider flex items-center gap-2 text-white">
                            <Briefcase className="h-5 w-5 text-orange-500" />
                            {editingPortId ? "Edit Portfolio Masterpiece" : "Add Portfolio Masterpiece"}
                          </h4>
                          <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Define detailed engineering profiles, structural specifications, challenges, and solutions.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsPortModalOpen(false)}
                          className="h-8 w-8 rounded-full hover:bg-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Modal Form */}
                      <form onSubmit={handlePortfolioSubmit} className="p-6 md:p-8 space-y-6 flex-grow">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                          
                          {/* Left Half: Metadata */}
                          <div className="lg:col-span-5 space-y-4">
                            <div>
                              <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Project Title</label>
                              <input
                                type="text"
                                required
                                value={portTitle}
                                onChange={(e) => setPortTitle(e.target.value)}
                                placeholder="e.g. Tata Projects Industrial Shed"
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Category</label>
                                <select
                                  value={portCategory}
                                  onChange={(e) => setPortCategory(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                >
                                  <option value="Industrial">Industrial</option>
                                  <option value="Commercial">Commercial</option>
                                  <option value="Residential">Residential</option>
                                  <option value="PEB Steel">PEB Steel</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Status</label>
                                <select
                                  value={portStatus}
                                  onChange={(e) => setPortStatus(e.target.value)}
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                >
                                  <option value="Completed">Completed</option>
                                  <option value="Ongoing">Ongoing</option>
                                  <option value="Under Review">Under Review</option>
                                </select>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Built Area</label>
                                <input
                                  type="text"
                                  required
                                  value={portArea}
                                  onChange={(e) => setPortArea(e.target.value)}
                                  placeholder="e.g. 45,000 sq.ft"
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Location</label>
                                <input
                                  type="text"
                                  required
                                  value={portLoc}
                                  onChange={(e) => setPortLoc(e.target.value)}
                                  placeholder="e.g. Taloja MIDC, Mumbai"
                                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Main Image or PDF File (URL / Local Upload)</label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={portImg}
                                  onChange={(e) => setPortImg(e.target.value)}
                                  placeholder="Paste image/PDF URL or upload from local gallery..."
                                  className="flex-grow bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm transition-all"
                                />
                                <label className="bg-slate-900 hover:bg-orange-500 text-white font-bold px-4 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer shadow-sm shrink-0">
                                  {uploadingField === "main" ? "Uploading..." : "Upload File"}
                                  <input
                                    type="file"
                                    accept="image/*,application/pdf"
                                    onChange={(e) => handleFileUpload(e, "main")}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Short Card Description</label>
                              <textarea
                                required
                                rows={2}
                                value={portDescription}
                                onChange={(e) => setPortDescription(e.target.value)}
                                placeholder="A concise dynamic summary shown in project cards..."
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm resize-none transition-all"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider mb-1.5">Full Case Study Narrative</label>
                              <textarea
                                required
                                rows={5}
                                value={portFullDetails}
                                onChange={(e) => setPortFullDetails(e.target.value)}
                                placeholder="Write the complete design scope, structural context, and workflow narrative..."
                                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2.5 text-xs focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 focus:bg-white text-slate-800 font-semibold shadow-sm resize-none transition-all"
                              />
                            </div>
                          </div>

                          {/* Right Half: Dynamic String Arrays */}
                          <div className="lg:col-span-7 space-y-5">
                            
                            {/* Specifications Array */}
                            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                              <div className="flex justify-between items-center mb-3">
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider">Technical Specifications</label>
                                <button
                                  type="button"
                                  onClick={addSpecField}
                                  className="text-[9px] bg-navy-950 hover:bg-orange-500 text-white font-bold px-2.5 py-1 rounded transition-colors uppercase tracking-wider"
                                >
                                  + Add Spec
                                </button>
                              </div>
                              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                {portSpecs.map((spec, index) => (
                                  <div key={index} className="flex gap-2 items-center">
                                    <input
                                      type="text"
                                      value={spec}
                                      onChange={(e) => updateSpecField(index, e.target.value)}
                                      placeholder="e.g. Design Code: IS 800:2007"
                                      className="flex-grow bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-600 text-slate-800 font-semibold shadow-sm"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeSpecField(index)}
                                      className="text-red-500 hover:text-red-700 font-bold p-1 cursor-pointer"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                                {portSpecs.length === 0 && (
                                  <p className="text-[10px] text-slate-400 italic">No specifications defined yet.</p>
                                )}
                              </div>
                            </div>

                            {/* Challenges Array */}
                            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                              <div className="flex justify-between items-center mb-3">
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider">Engineering Challenges</label>
                                <button
                                  type="button"
                                  onClick={addChallengeField}
                                  className="text-[9px] bg-navy-950 hover:bg-orange-500 text-white font-bold px-2.5 py-1 rounded transition-colors uppercase tracking-wider"
                                >
                                  + Add Challenge
                                </button>
                              </div>
                              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                {portChallenges.map((challenge, index) => (
                                  <div key={index} className="flex gap-2 items-center">
                                    <input
                                      type="text"
                                      value={challenge}
                                      onChange={(e) => updateChallengeField(index, e.target.value)}
                                      placeholder="e.g. Controlling dynamic vibration stresses"
                                      className="flex-grow bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-600 text-slate-800 font-semibold shadow-sm"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeChallengeField(index)}
                                      className="text-red-500 hover:text-red-700 font-bold p-1 cursor-pointer"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                                {portChallenges.length === 0 && (
                                  <p className="text-[10px] text-slate-400 italic">No challenges listed yet.</p>
                                )}
                              </div>
                            </div>

                            {/* Solutions Array */}
                            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                              <div className="flex justify-between items-center mb-3">
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider">Solutions Implemented</label>
                                <button
                                  type="button"
                                  onClick={addSolutionField}
                                  className="text-[9px] bg-navy-950 hover:bg-orange-500 text-white font-bold px-2.5 py-1 rounded transition-colors uppercase tracking-wider"
                                >
                                  + Add Solution
                                </button>
                              </div>
                              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                {portSolutions.map((sol, index) => (
                                  <div key={index} className="flex gap-2 items-center">
                                    <input
                                      type="text"
                                      value={sol}
                                      onChange={(e) => updateSolutionField(index, e.target.value)}
                                      placeholder="e.g. Built-up plate box column configuration"
                                      className="flex-grow bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-600 text-slate-800 font-semibold shadow-sm"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => removeSolutionField(index)}
                                      className="text-red-500 hover:text-red-700 font-bold p-1 cursor-pointer"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                                {portSolutions.length === 0 && (
                                  <p className="text-[10px] text-slate-400 italic">No solutions listed yet.</p>
                                )}
                              </div>
                            </div>

                            {/* Gallery Image URLs Array */}
                            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                              <div className="flex justify-between items-center mb-3">
                                <label className="block text-[10px] font-bold text-navy-950 uppercase tracking-wider">Gallery Images (URLs)</label>
                                <button
                                  type="button"
                                  onClick={addGalleryField}
                                  className="text-[9px] bg-navy-950 hover:bg-orange-500 text-white font-bold px-2.5 py-1 rounded transition-colors uppercase tracking-wider"
                                >
                                  + Add Image URL
                                </button>
                              </div>
                              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                                {portGallery.map((gal, index) => (
                                  <div key={index} className="flex gap-2 items-center">
                                    <input
                                      type="text"
                                      value={gal}
                                      onChange={(e) => updateGalleryField(index, e.target.value)}
                                      placeholder="Paste URL or upload local file..."
                                      className="flex-grow bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-600 text-slate-800 font-semibold shadow-sm"
                                    />
                                    <label className="bg-slate-900 hover:bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center cursor-pointer shadow-sm shrink-0">
                                      {uploadingField === `gallery-${index}` ? "..." : "Upload"}
                                      <input
                                        type="file"
                                        accept="image/*,application/pdf"
                                        onChange={(e) => handleFileUpload(e, index)}
                                        className="hidden"
                                      />
                                    </label>
                                    <button
                                      type="button"
                                      onClick={() => removeGalleryField(index)}
                                      className="text-red-500 hover:text-red-700 font-bold p-1 cursor-pointer shrink-0"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  </div>
                                ))}
                                {portGallery.length === 0 && (
                                  <p className="text-[10px] text-slate-400 italic">No gallery images added yet.</p>
                                )}
                              </div>
                            </div>

                          </div>
                        </div>

                        {/* Modal Action Buttons */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setIsPortModalOpen(false)}
                            className="bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold px-5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Cancel
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="bg-navy-950 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-premium cursor-pointer"
                          >
                            {editingPortId ? "Save Updates" : "Publish Masterpiece"}
                          </motion.button>
                        </div>
                      </form>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
