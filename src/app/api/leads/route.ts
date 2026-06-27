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

let isSeededCached = false;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("leads");
    const settingsCollection = db.collection("settings");

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    if (!isSeededCached) {
      // Atomic upsert — prevents race condition on simultaneous first requests
      const seedResult = await settingsCollection.findOneAndUpdate(
        { key: "leads_seeded" },
        { $setOnInsert: { key: "leads_seeded", value: true } },
        { upsert: true, returnDocument: "before" }
      );

      if (!seedResult) {
        await collection.insertMany(initialLeads);
        isSeededCached = true;
        return NextResponse.json(initialLeads, { headers });
      }
      isSeededCached = true;
    }

    const leads = await collection.find({}).toArray();
    const usersCollection = db.collection("users");
    const emails = leads.map((l) => l.email.toLowerCase());
    const users = await usersCollection.find({ email: { $in: emails } }).toArray();
    const usersMap = new Map(users.map((u) => [u.email.toLowerCase(), u]));

    const formattedLeads = leads.map(({ _id, ...rest }) => {
      const matchedUser = usersMap.get(rest.email.toLowerCase()) as any;
      return {
        ...rest,
        profileDetails: matchedUser ? {
          gender: matchedUser.gender || "",
          dob: matchedUser.dob || "",
          company: matchedUser.company || "",
          address: matchedUser.address || ""
        } : null
      };
    });
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
