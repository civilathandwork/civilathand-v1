import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

const initialDrawings = [
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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("drawings");
    const settingsCollection = db.collection("settings");

    const seedFlag = await settingsCollection.findOne({ key: "drawings_seeded" });

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    if (!seedFlag) {
      await collection.insertMany(initialDrawings);
      await settingsCollection.insertOne({ key: "drawings_seeded", value: true });
      return NextResponse.json(initialDrawings, { headers });
    }

    const drawings = await collection.find({}).toArray();
    const formattedDrawings = drawings.map(({ _id, ...rest }) => rest);

    return NextResponse.json(formattedDrawings, { headers });
  } catch (error) {
    console.error("Error in GET /api/drawings:", error);
    return NextResponse.json({ error: "Failed to fetch drawings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, size, serviceType } = body;

    if (!name) {
      return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("drawings");

    const newDrawing = {
      id: `draw-${Date.now()}`,
      name,
      size: size || "Unknown Size",
      uploadDate: new Date().toISOString().split("T")[0],
      status: "Analyzing",
      serviceType: serviceType || "General Design",
    };

    await collection.insertOne(newDrawing);

    const { _id, ...responseDrawing } = newDrawing as any;
    return NextResponse.json(responseDrawing, { status: 201 });
  } catch (error) {
    console.error("Error creating drawing:", error);
    return NextResponse.json({ error: "Failed to create drawing" }, { status: 500 });
  }
}
