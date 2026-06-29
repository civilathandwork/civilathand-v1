import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique name
    const fileName = file.name || "drawing.pdf";
    const ext = path.extname(fileName) || ".pdf";
    const baseName = path.basename(fileName, ext).replace(/[^a-zA-Z0-9]/g, "_");
    const filename = `${Date.now()}-${baseName}${ext}`;

    // Try local filesystem first (for local dev speed)
    try {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      
      const fileUrl = `/uploads/${filename}`;
      return NextResponse.json({ url: fileUrl });
    } catch (fsError: any) {
      console.warn("Local filesystem write failed, falling back to MongoDB storage:", fsError);

      // Save to MongoDB uploaded_files collection
      const client = await clientPromise;
      const db = client.db(dbName);
      const filesCollection = db.collection("uploaded_files");

      await filesCollection.insertOne({
        filename,
        contentType: file.type || "application/octet-stream",
        data: buffer.toString("base64"),
        createdAt: new Date()
      });

      const fileUrl = `/api/uploads/${filename}`;
      return NextResponse.json({ url: fileUrl });
    }
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: `Failed to upload file: ${error.message || error}` }, { status: 500 });
  }
}
