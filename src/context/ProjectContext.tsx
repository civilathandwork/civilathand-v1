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

interface ProjectContextType {
  leads: Lead[];
  projects: Project[];
  drawings: DrawingFile[];
  invoices: Invoice[];
  notifications: Notification[];
  chatMessages: ChatMessage[];
  addLead: (lead: Omit<Lead, "id" | "date" | "status">) => void;
  addProject: (project: Omit<Project, "id" | "dateStarted" | "progress" | "status">) => void;
  updateProjectStatus: (id: string, status: Project["status"]) => void;
  uploadDrawing: (file: Omit<DrawingFile, "id" | "uploadDate" | "status">) => void;
  payInvoice: (id: string) => void;
  generateInvoice: (projectId: string, amount: number) => void;
  addNotification: (title: string, message: string, type: Notification["type"], isAdmin: boolean) => void;
  markNotificationsAsRead: (isAdmin: boolean) => void;
  sendChatMessage: (text: string, sender: ChatMessage["sender"]) => void;
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

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [drawings, setDrawings] = useState<DrawingFile[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLeads = localStorage.getItem("cah_leads");
      const storedProjects = localStorage.getItem("cah_projects");
      const storedDrawings = localStorage.getItem("cah_drawings");
      const storedInvoices = localStorage.getItem("cah_invoices");
      const storedNotifs = localStorage.getItem("cah_notifications");
      const storedChats = localStorage.getItem("cah_chats");

      setLeads(storedLeads ? JSON.parse(storedLeads) : initialLeads);
      setProjects(storedProjects ? JSON.parse(storedProjects) : initialProjects);
      setDrawings(storedDrawings ? JSON.parse(storedDrawings) : initialDrawings);
      setInvoices(storedInvoices ? JSON.parse(storedInvoices) : initialInvoices);
      setNotifications(storedNotifs ? JSON.parse(storedNotifs) : initialNotifications);
      setChatMessages(storedChats ? JSON.parse(storedChats) : initialChatMessages);
      setIsLoaded(true);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cah_leads", JSON.stringify(leads));
      localStorage.setItem("cah_projects", JSON.stringify(projects));
      localStorage.setItem("cah_drawings", JSON.stringify(drawings));
      localStorage.setItem("cah_invoices", JSON.stringify(invoices));
      localStorage.setItem("cah_notifications", JSON.stringify(notifications));
      localStorage.setItem("cah_chats", JSON.stringify(chatMessages));
    }
  }, [leads, projects, drawings, invoices, notifications, chatMessages, isLoaded]);

  // Methods
  const addLead = (newLead: Omit<Lead, "id" | "date" | "status">) => {
    const lead: Lead = {
      ...newLead,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      status: "new",
    };
    setLeads((prev) => [lead, ...prev]);
    addNotification(
      "New Lead Received",
      `${lead.name} requested a quote for ${lead.service}.`,
      "success",
      true
    );
  };

  const addProject = (projData: Omit<Project, "id" | "dateStarted" | "progress" | "status">) => {
    const project: Project = {
      ...projData,
      id: `proj-${Date.now()}`,
      dateStarted: new Date().toISOString().split("T")[0],
      status: "Uploaded",
      progress: 10,
    };
    setProjects((prev) => [project, ...prev]);
    addNotification(
      "Project Created",
      `New project "${project.title}" initialized under review.`,
      "info",
      false
    );
    addNotification(
      "New Project Initialized",
      `Project "${project.title}" created by client ${project.clientName}.`,
      "info",
      true
    );
  };

  const updateProjectStatus = (id: string, status: Project["status"]) => {
    let progress = 10;
    if (status === "Under Review") progress = 25;
    if (status === "Designing") progress = 60;
    if (status === "Completed") progress = 100;

    setProjects((prev) =>
      prev.map((proj) =>
        proj.id === id ? { ...proj, status, progress } : proj
      )
    );

    const targetProj = projects.find((p) => p.id === id);
    if (targetProj) {
      addNotification(
        "Project Status Updated",
        `Your project "${targetProj.title}" status is now "${status}".`,
        status === "Completed" ? "success" : "info",
        false
      );
    }
  };

  const uploadDrawing = (drawMeta: Omit<DrawingFile, "id" | "uploadDate" | "status">) => {
    const file: DrawingFile = {
      ...drawMeta,
      id: `draw-${Date.now()}`,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "Analyzing",
    };
    setDrawings((prev) => [file, ...prev]);

    // Add to project files if matching service or create a mock project
    const matchProj = projects.find((p) => p.service === file.serviceType);
    if (matchProj) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === matchProj.id
            ? { ...p, drawings: [...p.drawings, file.name] }
            : p
        )
      );
    } else {
      // Auto create a mock project when a user uploads drawings
      addProject({
        title: `Design Request: ${file.serviceType}`,
        clientName: "Guest Client",
        service: file.serviceType,
        areaSqFt: 2000,
        location: "Mumbai, MH",
        drawings: [file.name],
      });
    }

    addNotification(
      "Drawing Uploaded",
      `File "${file.name}" is being analyzed by our CAD/BIM engine.`,
      "info",
      false
    );

    addNotification(
      "New File Uploaded",
      `Client uploaded drawing: ${file.name} for ${file.serviceType}.`,
      "info",
      true
    );

    // Simulate AI analysis complete after 5 seconds
    setTimeout(() => {
      setDrawings((prev) =>
        prev.map((d) => (d.id === file.id ? { ...d, status: "Ready" } : d))
      );
    }, 5000);
  };

  const payInvoice = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: "Paid" } : inv))
    );

    const targetInv = invoices.find((i) => i.id === id);
    if (targetInv) {
      // Mark project invoice paid
      setProjects((prev) =>
        prev.map((p) =>
          p.id === targetInv.projectId ? { ...p, invoicePaid: true } : p
        )
      );

      addNotification(
        "Payment Confirmed",
        `Receipt generated for Invoice #${targetInv.id.toUpperCase()}. Amount: ₹${targetInv.amount.toLocaleString("en-IN")}.`,
        "success",
        false
      );

      addNotification(
        "Payment Received",
        `Client paid ₹${targetInv.amount.toLocaleString("en-IN")} for ${targetInv.projectTitle}.`,
        "success",
        true
      );
    }
  };

  const generateInvoice = (projectId: string, amount: number) => {
    const proj = projects.find((p) => p.id === projectId);
    if (proj) {
      const invoice: Invoice = {
        id: `inv-${Date.now().toString().slice(-4)}`,
        projectId,
        projectTitle: proj.title,
        amount,
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        status: "Unpaid",
        dateGenerated: new Date().toISOString().split("T")[0],
      };

      setInvoices((prev) => [invoice, ...prev]);

      // Set quote amount in project
      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId ? { ...p, quoteAmount: amount, invoicePaid: false } : p
        )
      );

      addNotification(
        "Invoice Generated",
        `A new quotation and invoice of ₹${amount.toLocaleString("en-IN")} is ready for "${proj.title}".`,
        "warning",
        false
      );
    }
  };

  const addNotification = (
    title: string,
    message: string,
    type: Notification["type"],
    isAdmin: boolean
  ) => {
    const notif: Notification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      type,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      read: false,
      isAdmin,
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markNotificationsAsRead = (isAdmin: boolean) => {
    setNotifications((prev) =>
      prev.map((n) => (n.isAdmin === isAdmin ? { ...n, read: true } : n))
    );
  };

  const sendChatMessage = (text: string, sender: ChatMessage["sender"]) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      text,
      sender,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, newMsg]);

    if (sender === "client") {
      // Add notification to admin
      addNotification("New Support Message", "Client sent a support message.", "info", true);

      // Simulate a smart assistant responding after 1.5 seconds
      setTimeout(() => {
        const replyText =
          text.toLowerCase().includes("quote") || text.toLowerCase().includes("cost")
            ? "We offer automated estimations using our Construction Cost Calculator on the homepage. If you upload your floor plan PDF, our engineering experts will audit and return a detailed custom quotation within 24 hours."
            : text.toLowerCase().includes("drawing") || text.toLowerCase().includes("upload")
            ? "You can upload PDF, DWG, or DXF files directly in the 'Upload Drawings' tab on your dashboard. Once uploaded, they go through our automated analyzer, followed by expert audit review."
            : "Thank you for reaching out to Civil At Hand. One of our structural engineers will review your request and get back to you shortly.";

        const systemReply: ChatMessage = {
          id: `msg-${Date.now() + 1}`,
          text: replyText,
          sender: "admin",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setChatMessages((prev) => [...prev, systemReply]);
        addNotification("New Message Received", "Support engineer responded to your message.", "info", false);
      }, 1500);
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
        addLead,
        addProject,
        updateProjectStatus,
        uploadDrawing,
        payInvoice,
        generateInvoice,
        addNotification,
        markNotificationsAsRead,
        sendChatMessage,
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
