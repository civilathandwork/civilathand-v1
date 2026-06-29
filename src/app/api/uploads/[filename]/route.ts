import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    const client = await clientPromise;
    const db = client.db(dbName);
    const filesCollection = db.collection("uploaded_files");

    const fileDoc = await filesCollection.findOne({ filename });
    if (!fileDoc) {
      return new Response("File not found", { status: 404 });
    }

    const buffer = Buffer.from(fileDoc.data, "base64");

    return new Response(buffer, {
      headers: {
        "Content-Type": fileDoc.contentType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    console.error("Error retrieving file from MongoDB:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
