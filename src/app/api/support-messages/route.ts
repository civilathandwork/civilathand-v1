import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

const initialChatMessages = [
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

let isSeededCached = false;

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("chats");
    const settingsCollection = db.collection("settings");

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    if (!isSeededCached) {
      // Atomic upsert — prevents race condition on simultaneous first requests
      const seedResult = await settingsCollection.findOneAndUpdate(
        { key: "chats_seeded" },
        { $setOnInsert: { key: "chats_seeded", value: true } },
        { upsert: true, returnDocument: "before" }
      );

      if (!seedResult) {
        await collection.insertMany(initialChatMessages);
        isSeededCached = true;
        return NextResponse.json(initialChatMessages, { headers });
      }
      isSeededCached = true;
    }

    const chats = await collection.find({}).toArray();
    const formattedChats = chats.map(({ _id, ...rest }) => rest);

    // Sort chronologically by createdAt (ISO date) ascending — oldest message first
    // Falls back to string ID for legacy records without createdAt
    formattedChats.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return (a.id || "").localeCompare(b.id || "");
    });

    return NextResponse.json(formattedChats, { headers });
  } catch (error) {
    console.error("Error in GET /api/support-messages:", error);
    return NextResponse.json({ error: "Failed to fetch support messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text, sender, timestamp } = body;

    if (!text || !sender) {
      return NextResponse.json({ error: "Text and sender are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("chats");

    const newMsg = {
      id: `msg-${Date.now()}`,
      text,
      sender,
      timestamp: timestamp || new Date().toISOString().replace("T", " ").substring(0, 16),
      // createdAt as ISO string for reliable chronological sorting
      createdAt: new Date().toISOString(),
    };

    await collection.insertOne(newMsg);

    const { _id, ...responseChat } = newMsg as any;
    return NextResponse.json(responseChat, { status: 201 });
  } catch (error) {
    console.error("Error creating support message:", error);
    return NextResponse.json({ error: "Failed to create support message" }, { status: 500 });
  }
}
