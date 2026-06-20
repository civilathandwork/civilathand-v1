import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("invoices");

    const invoice = await collection.findOne({ id });
    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    const updatedInvoiceData = {
      ...body,
      id: invoice.id,
      dateGenerated: invoice.dateGenerated,
    };

    delete (updatedInvoiceData as any)._id;

    await collection.updateOne({ id }, { $set: updatedInvoiceData });

    const { _id, ...originalInvoiceWithoutId } = invoice;
    return NextResponse.json({ ...originalInvoiceWithoutId, ...updatedInvoiceData });
  } catch (error) {
    console.error("Error updating invoice:", error);
    return NextResponse.json({ error: "Failed to update invoice" }, { status: 500 });
  }
}
