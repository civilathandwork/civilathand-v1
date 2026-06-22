"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  source: string; // e.g., "Cost Calculator", "Contact Form", etc.
  details: string;
  status: "new" | "contacted" | "converted" | "archived";
  date: string;
}

export interface Project {
  id: string;
  title: string;
  clientName: string;
  service: string;
  areaSqFt: number;
  location: string;
  status: "Uploaded" | "Under Review" | "Designing" | "Completed";
  progress: number; // percentage
  drawings: string[]; // drawing file names
  quoteAmount?: number;
  invoicePaid?: boolean;
  dateStarted: string;
}

export interface DrawingFile {
  id: string;
  name: string;
  size: string;
  uploadDate: string;
  status: "Processed" | "Analyzing" | "Ready";
  serviceType: string;
}

export interface Invoice {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  dueDate: string;
  status: "Unpaid" | "Paid";
  dateGenerated: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  timestamp: string;
  read: boolean;
  isAdmin: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: "client" | "system" | "admin";
  timestamp: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: "Structural" | "Architecture" | "Estimation" | "BIM" | "General";
  date: string;
  author: string;
  image: string;
  status: "draft" | "published";
}

interface ProjectContextType {
  leads: Lead[];
  projects: Project[];
  drawings: DrawingFile[];
  invoices: Invoice[];
  notifications: Notification[];
  chatMessages: ChatMessage[];
  blogs: BlogPost[];
  addLead: (lead: Omit<Lead, "id" | "date" | "status">) => Promise<void>;
  addProject: (project: Omit<Project, "id" | "dateStarted" | "progress" | "status">) => Promise<void>;
  updateProjectStatus: (id: string, status: Project["status"]) => Promise<void>;
  uploadDrawing: (file: Omit<DrawingFile, "id" | "uploadDate" | "status">) => Promise<void>;
  payInvoice: (id: string) => Promise<void>;
  generateInvoice: (projectId: string, amount: number) => Promise<void>;
  addNotification: (title: string, message: string, type: Notification["type"], isAdmin: boolean) => Promise<void>;
  markNotificationsAsRead: (isAdmin: boolean) => Promise<void>;
  sendChatMessage: (text: string, sender: ChatMessage["sender"]) => Promise<void>;
  addBlog: (blog: Omit<BlogPost, "id" | "date">) => Promise<void>;
  updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  updateLeadStatus: (id: string, status: Lead["status"]) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;
  isLoaded: boolean; // true once all API fetches have settled (success or fallback)
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Initial Sample Data
const initialLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Rohan Sharma",
    email: "rohan@gmail.com",
    phone: "+91 98765 43210",
    service: "Architectural Design",
    source: "Cost Calculator",
    details: "Built-up area: 2400 sq.ft, Luxury quality requested.",
    status: "new",
    date: "2026-06-04",
  },
  {
    id: "lead-2",
    name: "Priya Patel",
    email: "priya.p@yahoo.com",
    phone: "+91 91234 56789",
    service: "BOQ Estimation",
    source: "Contact Form",
    details: "Need quick quantity takeoff for G+1 residential structure.",
    status: "contacted",
    date: "2026-06-03",
  }
];

const initialProjects: Project[] = [
  {
    id: "proj-1",
    title: "G+2 Residential Villa",
    clientName: "Rahul Verma",
    service: "Architectural & Structural Design",
    areaSqFt: 3200,
    location: "Kalyani Nagar, Pune",
    status: "Designing",
    progress: 65,
    drawings: ["SiteLayout_V1.pdf", "StructuralDraft_Rev2.dwg"],
    quoteAmount: 75000,
    invoicePaid: true,
    dateStarted: "2026-05-15",
  },
  {
    id: "proj-2",
    title: "Industrial Warehouse Shed",
    clientName: "Sun Infrastructure",
    service: "BIM & Structural Design",
    areaSqFt: 15000,
    location: "Chakan MIDC, Pune",
    status: "Under Review",
    progress: 25,
    drawings: ["WarehouseGeneralArrangement.pdf"],
    quoteAmount: 240000,
    invoicePaid: false,
    dateStarted: "2026-06-01",
  }
];

const initialDrawings: DrawingFile[] = [
  {
    id: "draw-1",
    name: "SiteLayout_V1.pdf",
    size: "4.2 MB",
    uploadDate: "2026-05-15",
    status: "Processed",
    serviceType: "Architectural Design",
  },
  {
    id: "draw-2",
    name: "StructuralDraft_Rev2.dwg",
    size: "18.5 MB",
    uploadDate: "2026-05-20",
    status: "Processed",
    serviceType: "Structural Design",
  },
  {
    id: "draw-3",
    name: "WarehouseGeneralArrangement.pdf",
    size: "8.1 MB",
    uploadDate: "2026-06-01",
    status: "Ready",
    serviceType: "BIM Services",
  }
];

const initialInvoices: Invoice[] = [
  {
    id: "inv-1",
    projectId: "proj-1",
    projectTitle: "G+2 Residential Villa",
    amount: 35000,
    dueDate: "2026-05-30",
    status: "Paid",
    dateGenerated: "2026-05-15",
  },
  {
    id: "inv-2",
    projectId: "proj-2",
    projectTitle: "Industrial Warehouse Shed",
    amount: 120000,
    dueDate: "2026-06-15",
    status: "Unpaid",
    dateGenerated: "2026-06-01",
  }
];

const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    title: "Project Status Updated",
    message: "Your G+2 Residential Villa project status is now 'Designing'.",
    type: "info",
    timestamp: "2026-05-20 14:30",
    read: false,
    isAdmin: false,
  },
  {
    id: "notif-2",
    title: "New Lead Received",
    message: "Rohan Sharma submitted a cost calculation request.",
    type: "success",
    timestamp: "2026-06-04 11:15",
    read: false,
    isAdmin: true,
  }
];

const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-1",
    text: "Welcome to Civil At Hand Support. Let us know if you have any questions regarding your engineering drawings or quotations.",
    sender: "system",
    timestamp: "2026-06-05 10:00",
  },
  {
    id: "msg-2",
    text: "Hello, when can I expect the final structural design for the G+2 Villa?",
    sender: "client",
    timestamp: "2026-06-05 10:05",
  },
  {
    id: "msg-3",
    text: "Hi! Our structural engineers are currently detailing the column schedules. We should upload the revised drawing by tomorrow evening.",
    sender: "admin",
    timestamp: "2026-06-05 10:10",
  }
];

const initialBlogs: BlogPost[] = [
  {
    id: "blog-1",
    title: "Understanding Soil Bearing Capacity in Foundation Design",
    summary: "A deep dive into soil investigation reports, standard penetration tests (SPT), and how structural engineers calculate safe bearing capacity.",
    content: `Structural stability begins at the foundation. Before laying a single cubic meter of concrete, civil engineers must understand the mechanical behaviors of the sub-soil.

### What is Soil Bearing Capacity?
Bearing capacity is the capacity of soil to support the loads applied to the ground. The maximum pressure that the soil can support safely without undergoing shear failure or excessive settlement is called the Ultimate Bearing Capacity.

### The Role of SPT (Standard Penetration Test)
The SPT value (N-value) is a critical parameter. During exploration:
1. A split-spoon sampler is driven into the soil.
2. The number of blows required to drive the sampler through three successive 150mm intervals is recorded.
3. The sum of blow counts for the last two intervals is the N-value.

Higher N-values correspond to denser sandy soils or stiffer cohesive clays, indicating superior bearing strength.

### Engineering Best Practices
- **Never skip soil testing:** Designing foundations on assumed parameters often results in uneven settlement, wall cracking, or structural failure.
- **Factor of Safety (FoS):** In residential and commercial structural designs, a minimum FoS of 2.5 to 3.0 should be applied to calculate Safe Bearing Capacity (SBC).`,
    category: "Structural",
    date: "2026-06-05",
    author: "Er. Amit Wagh",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    status: "published",
  },
  {
    id: "blog-2",
    title: "A Complete Guide to Modern Glassmorphism in Architecture",
    summary: "Exploring the aesthetic evolution of glass facade engineering, acoustic properties of triple-glazed structures, and visual design parameters.",
    content: `Glassmorphism isn't just a trend in digital UI design; it has deep roots in modern architectural facades. Premium high-rises and executive offices leverage frosted, fluted, and translucent glass sheets to create breathtaking architectural elements that play with light and depth.

### Visual Depth & Ambient Lighting
By using low-iron frosted glass, designers can capture light without creating sharp, blinding reflections. This allows interior spaces to benefit from natural daylighting while maintaining thermal barriers and private workspaces.

### Triple-Glazing & Acoustical Comfort
To achieve a premium glassmorphic facade, engineers must account for environmental dynamics:
- **Acoustic Dampening:** Triple-glazed configurations with vacuum chambers reduce exterior decibel levels by up to 45dB, essential for city centers.
- **U-Value Management:** Implementing low-E metallic oxide coatings ensures that heat is reflected, maintaining comfortable internal HVAC load settings.`,
    category: "Architecture",
    date: "2026-06-03",
    author: "Ar. Sneha Patel",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    status: "published",
  },
  {
    id: "blog-3",
    title: "AI Takeoffs: The Future of Quantity Surveying & BOQ",
    summary: "How deep learning visual engines are automating coordinate mapping and volume estimation directly from structural DWG and PDF files.",
    content: `Traditional quantity takeoffs require structural estimators to manually scale blueprints, measure linear feet, and manually count reinforcement bars. This process is time-consuming and prone to human error. AI-assisted takeoffs are transforming the engineering industry.

### How AI BOQ Takeoffs Work
1. **Object Detection:** Machine learning algorithms identify standard symbols (rebar shapes, columns, footing dimensions, wall lengths) on 2D drawings.
2. **Dynamic Scaling:** By recognizing scale legends (e.g. 1:100), the engine calculates concrete volumes and brickwork counts automatically.
3. **Rebar Estimation:** Rebar schedules are extracted directly from schedule tables, multiplying lengths by unit weights to generate steel summaries in seconds.

At Civil At Hand, our automated AI engine reduces manual takeoff prep time by over 80%, giving engineers more time to focus on value engineering.`,
    category: "Estimation",
    date: "2026-06-01",
    author: "Er. Nitin Shinde",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
    status: "published",
  }
];

// Helper functions defined outside of the component to bypass purity warnings on Date/Time functions during render
function generateLeadId(): string {
  return `lead-${Date.now()}`;
}

function generateProjId(): string {
  return `proj-${Date.now()}`;
}

function generateNotifId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
}

function generateMsgId(): string {
  return `msg-${Date.now() + 1}`;
}

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function getFutureDateString(daysAhead: number): string {
  return new Date(Date.now() + daysAhead * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
}

function getNotificationTimestamp(): string {
  return new Date().toISOString().replace("T", " ").substring(0, 16);
}

function getLocaleTimeString(): string {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [drawings, setDrawings] = useState<DrawingFile[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from database API
  useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([
        fetch("/api/leads", { cache: "no-store" })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch leads");
            return res.json();
          })
          .catch((err) => {
            console.error("Failed to fetch leads, using fallback:", err);
            return initialLeads;
          }),
        fetch("/api/blogs", { cache: "no-store" })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch blogs");
            return res.json();
          })
          .catch((err) => {
            console.error("Failed to fetch blogs, using fallback:", err);
            return initialBlogs;
          }),
        fetch("/api/projects", { cache: "no-store" })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch projects");
            return res.json();
          })
          .catch((err) => {
            console.error("Failed to fetch projects, using fallback:", err);
            return initialProjects;
          }),
        fetch("/api/drawings", { cache: "no-store" })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch drawings");
            return res.json();
          })
          .catch((err) => {
            console.error("Failed to fetch drawings, using fallback:", err);
            return initialDrawings;
          }),
        fetch("/api/invoices", { cache: "no-store" })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch invoices");
            return res.json();
          })
          .catch((err) => {
            console.error("Failed to fetch invoices, using fallback:", err);
            return initialInvoices;
          }),
        fetch("/api/notifications", { cache: "no-store" })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch notifications");
            return res.json();
          })
          .catch((err) => {
            console.error("Failed to fetch notifications, using fallback:", err);
            return initialNotifications;
          }),
        fetch("/api/support-messages", { cache: "no-store" })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to fetch chats");
            return res.json();
          })
          .catch((err) => {
            console.error("Failed to fetch chats, using fallback:", err);
            return initialChatMessages;
          })
      ])
        .then(([leadsData, blogsData, projectsData, drawingsData, invoicesData, notificationsData, chatsData]) => {
          setLeads(Array.isArray(leadsData) ? leadsData : initialLeads);
          setBlogs(Array.isArray(blogsData) ? blogsData : initialBlogs);
          setProjects(Array.isArray(projectsData) ? projectsData : initialProjects);
          setDrawings(Array.isArray(drawingsData) ? drawingsData : initialDrawings);
          setInvoices(Array.isArray(invoicesData) ? invoicesData : initialInvoices);
          setNotifications(Array.isArray(notificationsData) ? notificationsData : initialNotifications);
          setChatMessages(Array.isArray(chatsData) ? chatsData : initialChatMessages);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    }
  }, []);

  // Methods
  const addLead = async (newLeadData: Omit<Lead, "id" | "date" | "status">) => {
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLeadData)
      });
      if (!res.ok) throw new Error("Failed to persist lead in DB");
      const createdLead: Lead = await res.json();
      setLeads((prev) => [createdLead, ...prev]);
      await addNotification(
        "New Lead Received",
        `${createdLead.name} requested a quote for ${createdLead.service}.`,
        "success",
        true
      );
    } catch (err) {
      console.error("Error adding lead:", err);
      // Fallback local memory lead insertion
      const fallbackLead: Lead = {
        ...newLeadData,
        id: generateLeadId(),
        date: getTodayDateString(),
        status: "new"
      };
      setLeads((prev) => [fallbackLead, ...prev]);
      await addNotification(
        "New Lead Received (Local Mode)",
        `${fallbackLead.name} requested a quote for ${fallbackLead.service}.`,
        "success",
        true
      );
    }
  };

  const updateLeadStatus = async (id: string, status: Lead["status"]) => {
    try {
      const targetLead = leads.find(l => l.id === id);
      if (!targetLead) return;

      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...targetLead, status })
      });
      if (!res.ok) throw new Error("Failed to update lead status in DB");
      const updatedLead: Lead = await res.json();
      setLeads((prev) => prev.map(l => l.id === id ? updatedLead : l));
    } catch (err) {
      console.error("Error updating lead status:", err);
      setLeads((prev) => prev.map(l => l.id === id ? { ...l, status } : l));
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete lead in DB");
      setLeads((prev) => prev.filter(l => l.id !== id));
    } catch (err) {
      console.error("Error deleting lead:", err);
      setLeads((prev) => prev.filter(l => l.id !== id));
    }
  };

  const addProject = async (projData: Omit<Project, "id" | "dateStarted" | "progress" | "status">) => {
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projData)
      });
      if (!res.ok) throw new Error("Failed to create project in DB");
      const createdProj: Project = await res.json();
      setProjects((prev) => [createdProj, ...prev]);

      await addNotification(
        "Project Created",
        `New project "${createdProj.title}" initialized under review.`,
        "info",
        false
      );
      await addNotification(
        "New Project Initialized",
        `Project "${createdProj.title}" created by client ${createdProj.clientName}.`,
        "info",
        true
      );
    } catch (err) {
      console.error("Error adding project:", err);
      // Fallback
      const fallbackProj: Project = {
        ...projData,
        id: generateProjId(),
        dateStarted: getTodayDateString(),
        status: "Uploaded",
        progress: 10,
      };
      setProjects((prev) => [fallbackProj, ...prev]);
    }
  };

  const updateProjectStatus = async (id: string, status: Project["status"]) => {
    let progress = 10;
    if (status === "Under Review") progress = 25;
    if (status === "Designing") progress = 60;
    if (status === "Completed") progress = 100;

    try {
      const targetProj = projects.find((p) => p.id === id);
      if (!targetProj) return;

      const res = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...targetProj, status, progress })
      });
      if (!res.ok) throw new Error("Failed to update project status in DB");
      const updatedProj: Project = await res.json();

      setProjects((prev) => prev.map((p) => p.id === id ? updatedProj : p));

      await addNotification(
        "Project Status Updated",
        `Your project "${updatedProj.title}" status is now "${status}".`,
        status === "Completed" ? "success" : "info",
        false
      );
    } catch (err) {
      console.error("Error updating project status:", err);
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === id ? { ...proj, status, progress } : proj
        )
      );
    }
  };

  const uploadDrawing = async (drawMeta: Omit<DrawingFile, "id" | "uploadDate" | "status">) => {
    try {
      const res = await fetch("/api/drawings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(drawMeta)
      });
      if (!res.ok) throw new Error("Failed to save drawing in DB");
      const createdDrawing: DrawingFile = await res.json();
      setDrawings((prev) => [createdDrawing, ...prev]);

      // Add to project files if matching service or create a mock project
      const matchProj = projects.find((p) => p.service === createdDrawing.serviceType);
      if (matchProj) {
        const updatedDrawings = [...matchProj.drawings, createdDrawing.name];
        const projRes = await fetch(`/api/projects/${matchProj.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...matchProj, drawings: updatedDrawings })
        });
        if (projRes.ok) {
          const updatedProj: Project = await projRes.json();
          setProjects((prev) => prev.map((p) => p.id === matchProj.id ? updatedProj : p));
        }
      } else {
        // Auto create a mock project when a user uploads drawings
        await addProject({
          title: `Design Request: ${createdDrawing.serviceType}`,
          clientName: "Guest Client",
          service: createdDrawing.serviceType,
          areaSqFt: 2000,
          location: "Mumbai, MH",
          drawings: [createdDrawing.name],
        });
      }

      await addNotification(
        "Drawing Uploaded",
        `File "${createdDrawing.name}" is being analyzed by our CAD/BIM engine.`,
        "info",
        false
      );

      await addNotification(
        "New File Uploaded",
        `Client uploaded drawing: ${createdDrawing.name} for ${createdDrawing.serviceType}.`,
        "info",
        true
      );

      // Simulate AI analysis complete after 5 seconds
      setTimeout(async () => {
        try {
          const readyRes = await fetch(`/api/drawings/${createdDrawing.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...createdDrawing, status: "Ready" })
          });
          if (readyRes.ok) {
            const readyDrawing: DrawingFile = await readyRes.json();
            setDrawings((prev) => prev.map((d) => d.id === createdDrawing.id ? readyDrawing : d));
          }
        } catch (err) {
          console.error("Error updating drawing status to Ready:", err);
          setDrawings((prev) =>
            prev.map((d) => (d.id === createdDrawing.id ? { ...d, status: "Ready" } : d))
          );
        }
      }, 5000);
    } catch (err) {
      console.error("Error uploading drawing:", err);
    }
  };

  const payInvoice = async (id: string) => {
    try {
      const targetInv = invoices.find((i) => i.id === id);
      if (!targetInv) return;

      const res = await fetch(`/api/invoices/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...targetInv, status: "Paid" })
      });
      if (!res.ok) throw new Error("Failed to pay invoice in DB");
      const paidInv: Invoice = await res.json();
      setInvoices((prev) => prev.map((inv) => inv.id === id ? paidInv : inv));

      const targetProj = projects.find((p) => p.id === paidInv.projectId);
      if (targetProj) {
        const projRes = await fetch(`/api/projects/${targetProj.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...targetProj, invoicePaid: true })
        });
        if (projRes.ok) {
          const updatedProj: Project = await projRes.json();
          setProjects((prev) => prev.map((p) => p.id === targetProj.id ? updatedProj : p));
        }
      }

      await addNotification(
        "Payment Confirmed",
        `Receipt generated for Invoice #${paidInv.id.toUpperCase()}. Amount: ₹${paidInv.amount.toLocaleString("en-IN")}.`,
        "success",
        false
      );

      await addNotification(
        "Payment Received",
        `Client paid ₹${paidInv.amount.toLocaleString("en-IN")} for ${paidInv.projectTitle}.`,
        "success",
        true
      );
    } catch (err) {
      console.error("Error paying invoice:", err);
    }
  };

  const generateInvoice = async (projectId: string, amount: number) => {
    try {
      const proj = projects.find((p) => p.id === projectId);
      if (!proj) return;

      const newInvData = {
        projectId,
        projectTitle: proj.title,
        amount,
        dueDate: getFutureDateString(10)
      };

      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newInvData)
      });
      if (!res.ok) throw new Error("Failed to create invoice in DB");
      const createdInv: Invoice = await res.json();
      setInvoices((prev) => [createdInv, ...prev]);

      const projRes = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...proj, quoteAmount: amount, invoicePaid: false })
      });
      if (projRes.ok) {
        const updatedProj: Project = await projRes.json();
        setProjects((prev) => prev.map((p) => p.id === projectId ? updatedProj : p));
      }

      await addNotification(
        "Invoice Generated",
        `A new quotation and invoice of ₹${amount.toLocaleString("en-IN")} is ready for "${proj.title}".`,
        "warning",
        false
      );
    } catch (err) {
      console.error("Error generating invoice:", err);
    }
  };

  const addNotification = async (
    title: string,
    message: string,
    type: Notification["type"],
    isAdmin: boolean
  ) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, message, type, isAdmin })
      });
      if (!res.ok) throw new Error("Failed to add notification in DB");
      const createdNotif: Notification = await res.json();
      setNotifications((prev) => [createdNotif, ...prev]);
    } catch (err) {
      console.error("Error adding notification:", err);
      const fallbackNotif: Notification = {
        id: generateNotifId(),
        title,
        message,
        type,
        timestamp: getNotificationTimestamp(),
        read: false,
        isAdmin,
      };
      setNotifications((prev) => [fallbackNotif, ...prev]);
    }
  };

  const markNotificationsAsRead = async (isAdmin: boolean) => {
    try {
      const res = await fetch("/api/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAdmin })
      });
      if (!res.ok) throw new Error("Failed to mark notifications as read in DB");
      setNotifications((prev) =>
        prev.map((n) => (n.isAdmin === isAdmin ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error("Error marking notifications as read:", err);
      setNotifications((prev) =>
        prev.map((n) => (n.isAdmin === isAdmin ? { ...n, read: true } : n))
      );
    }
  };

  const sendChatMessage = async (text: string, sender: ChatMessage["sender"]) => {
    try {
      const res = await fetch("/api/support-messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, sender })
      });
      if (!res.ok) throw new Error("Failed to save chat message in DB");
      const createdMsg: ChatMessage = await res.json();
      setChatMessages((prev) => [...prev, createdMsg]);

      if (sender === "client") {
        await addNotification("New Support Message", "Client sent a support message.", "info", true);

        setTimeout(async () => {
          const replyText =
            text.toLowerCase().includes("quote") || text.toLowerCase().includes("cost")
              ? "We offer automated estimations using our Construction Cost Calculator on the homepage. If you upload your floor plan PDF, our engineering experts will audit and return a detailed custom quotation within 24 hours."
              : text.toLowerCase().includes("drawing") || text.toLowerCase().includes("upload")
              ? "You can upload PDF, DWG, or DXF files directly in the 'Upload Drawings' tab on your dashboard. Once uploaded, they go through our automated analyzer, followed by expert audit review."
              : "Thank you for reaching out to Civil At Hand. One of our structural engineers will review your request and get back to you shortly.";

          try {
            const replyRes = await fetch("/api/support-messages", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: replyText, sender: "admin" })
            });
            if (replyRes.ok) {
              const replyMsg: ChatMessage = await replyRes.json();
              setChatMessages((prev) => [...prev, replyMsg]);
              await addNotification("New Message Received", "Support engineer responded to your message.", "info", false);
            }
          } catch (replyErr) {
            console.error("Error sending assistant reply:", replyErr);
            const fallbackReply: ChatMessage = {
              id: generateMsgId(),
              text: replyText,
              sender: "admin",
              timestamp: getLocaleTimeString(),
            };
            setChatMessages((prev) => [...prev, fallbackReply]);
            await addNotification("New Message Received", "Support engineer responded to your message.", "info", false);
          }
        }, 1500);
      }
    } catch (err) {
      console.error("Error sending chat message:", err);
    }
  };

  const addBlog = async (blogData: Omit<BlogPost, "id" | "date">) => {
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      if (!res.ok) throw new Error("Failed to add blog post");
      const newBlog = await res.json();
      setBlogs((prev) => [newBlog, ...prev]);
      await addNotification(
        "New Blog Post Created",
        `Blog post "${newBlog.title}" is now available.`,
        "success",
        true
      );
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
  };

  const updateBlog = async (id: string, blogData: Partial<BlogPost>) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blogData),
      });
      if (!res.ok) throw new Error("Failed to update blog post");
      const updatedBlog = await res.json();
      setBlogs((prev) =>
        prev.map((b) => (b.id === id ? updatedBlog : b))
      );
    } catch (error) {
      console.error("Error updating blog post:", error);
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete blog post");
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{
        leads,
        projects,
        drawings,
        invoices,
        notifications,
        chatMessages,
        blogs,
        addLead,
        addProject,
        updateProjectStatus,
        uploadDrawing,
        payInvoice,
        generateInvoice,
        addNotification,
        markNotificationsAsRead,
        sendChatMessage,
        addBlog,
        updateBlog,
        deleteBlog,
        updateLeadStatus,
        deleteLead,
        isLoaded,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
};
