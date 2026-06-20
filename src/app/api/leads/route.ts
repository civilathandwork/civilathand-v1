import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

const initialLeads = [
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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("leads");
    const settingsCollection = db.collection("settings");

    // Check if seeded
    const seedFlag = await settingsCollection.findOne({ key: "leads_seeded" });

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    if (!seedFlag) {
      await collection.insertMany(initialLeads);
      await settingsCollection.insertOne({ key: "leads_seeded", value: true });
      return NextResponse.json(initialLeads, { headers });
    }

    const leads = await collection.find({}).toArray();
    // Convert _id to string or remove it
    const formattedLeads = leads.map(({ _id, ...rest }) => rest);

    return NextResponse.json(formattedLeads, { headers });
  } catch (error) {
    console.error("Error in GET /api/leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, source, details } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("leads");

    const newLead = {
      id: `lead-${Date.now()}`,
      name,
      email,
      phone: phone || "",
      service: service || "General",
      source: source || "Contact Form",
      details: details || "",
      status: "new",
      date: new Date().toISOString().split("T")[0],
    };

    await collection.insertOne(newLead);

    const { _id, ...responseLead } = newLead as any;
    return NextResponse.json(responseLead, { status: 201 });
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json({ error: "Failed to create lead" }, { status: 500 });
  }
}
