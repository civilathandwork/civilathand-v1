import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "civil-at-hand";
  
  const diagnostics = {
    envUriExists: !!uri,
    envUriMasked: uri ? uri.replace(/:([^@]+)@/, ":****@") : null,
    envDbName: dbName,
    connectionStatus: "Not attempted",
    error: null as any,
    collections: [] as string[]
  };

  try {
    diagnostics.connectionStatus = "Attempting connection...";
    const client = await clientPromise;
    diagnostics.connectionStatus = "Connected successfully!";
    
    const db = client.db(dbName);
    const collections = await db.listCollections().toArray();
    diagnostics.collections = collections.map(c => c.name);
  } catch (err: any) {
    diagnostics.connectionStatus = "Failed";
    diagnostics.error = {
      message: err.message,
      code: err.code,
      name: err.name,
      stack: err.stack ? err.stack.split("\n").slice(0, 3) : null
    };
  }

  return NextResponse.json(diagnostics);
}
