import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

const initialInvoices = [
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

let isSeededCached = false;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("invoices");
    const settingsCollection = db.collection("settings");

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    if (!isSeededCached) {
      // Atomic upsert — prevents race condition on simultaneous first requests
      const seedResult = await settingsCollection.findOneAndUpdate(
        { key: "invoices_seeded" },
        { $setOnInsert: { key: "invoices_seeded", value: true } },
        { upsert: true, returnDocument: "before" }
      );

      if (!seedResult) {
        await collection.insertMany(initialInvoices);
        isSeededCached = true;
        return NextResponse.json(initialInvoices, { headers });
      }
      isSeededCached = true;
    }

    const invoices = await collection.find({}).toArray();
    const formattedInvoices = invoices.map(({ _id, ...rest }) => rest);
    return NextResponse.json(formattedInvoices, { headers });
  } catch (error) {
    console.error("Error in GET /api/invoices:", error);
    return NextResponse.json({ error: "Failed to fetch invoices" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { projectId, projectTitle, amount, dueDate } = body;

    if (!projectId || !amount) {
      return NextResponse.json({ error: "projectId and amount are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("invoices");

    const newInvoice = {
      // Use full timestamp to prevent ID collision (last-4-digits would repeat every ~10s)
      id: `inv-${Date.now()}`,
      projectId,
      projectTitle: projectTitle || "General Engineering Service",
      amount: Number(amount),
      dueDate: dueDate || new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      status: "Unpaid",
      dateGenerated: new Date().toISOString().split("T")[0],
    };

    await collection.insertOne(newInvoice);

    const { _id, ...responseInvoice } = newInvoice as any;
    return NextResponse.json(responseInvoice, { status: 201 });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}
