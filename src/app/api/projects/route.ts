import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

const initialProjects = [
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

let isSeededCached = false;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("projects");
    const settingsCollection = db.collection("settings");

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    if (!isSeededCached) {
      // Atomic upsert — prevents race condition on simultaneous first requests
      const seedResult = await settingsCollection.findOneAndUpdate(
        { key: "projects_seeded" },
        { $setOnInsert: { key: "projects_seeded", value: true } },
        { upsert: true, returnDocument: "before" }
      );

      if (!seedResult) {
        await collection.insertMany(initialProjects);
        isSeededCached = true;
        return NextResponse.json(initialProjects, { headers });
      }
      isSeededCached = true;
    }

    const projects = await collection.find({}).toArray();
    const formattedProjects = projects.map(({ _id, ...rest }) => rest);
    return NextResponse.json(formattedProjects, { headers });
  } catch (error) {
    console.error("Error in GET /api/projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, clientName, service, areaSqFt, location, drawings, quoteAmount } = body;

    if (!title || !clientName) {
      return NextResponse.json({ error: "Title and clientName are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("projects");

    const newProject = {
      id: `proj-${Date.now()}`,
      title,
      clientName,
      service: service || "General",
      areaSqFt: Number(areaSqFt) || 0,
      location: location || "",
      status: "Uploaded",
      progress: 10,
      drawings: drawings || [],
      quoteAmount: quoteAmount !== undefined ? Number(quoteAmount) : undefined,
      invoicePaid: false,
      dateStarted: new Date().toISOString().split("T")[0],
    };

    await collection.insertOne(newProject);

    const { _id, ...responseProject } = newProject as any;
    return NextResponse.json(responseProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
