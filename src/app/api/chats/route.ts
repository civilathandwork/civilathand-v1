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

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("chats");
    const settingsCollection = db.collection("settings");

    const seedFlag = await settingsCollection.findOne({ key: "chats_seeded" });

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    if (!seedFlag) {
      await collection.insertMany(initialChatMessages);
      await settingsCollection.insertOne({ key: "chats_seeded", value: true });
      return NextResponse.json(initialChatMessages, { headers });
    }

    const chats = await collection.find({}).toArray();
    const formattedChats = chats.map(({ _id, ...rest }) => rest);

    // Sort by chronological order
    formattedChats.sort((a, b) => a.id.localeCompare(b.id));

    return NextResponse.json(formattedChats, { headers });
  } catch (error) {
    console.error("Error in GET /api/chats:", error);
    return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 });
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
      timestamp: timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    await collection.insertOne(newMsg);

    const { _id, ...responseChat } = newMsg as any;
    return NextResponse.json(responseChat, { status: 201 });
  } catch (error) {
    console.error("Error creating chat message:", error);
    return NextResponse.json({ error: "Failed to create chat message" }, { status: 500 });
  }
}
