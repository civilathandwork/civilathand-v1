import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

const initialNotifications = [
  {
    id: "notif-1",
    title: "Project Status Updated",
    message: "Your G+2 Residential Villa project status is now 'Designing'.",
    type: "info",
    timestamp: "2026-05-20 14:30",
    read: false,
    isAdmin: false,
  },
  {
    id: "notif-2",
    title: "New Lead Received",
    message: "Rohan Sharma submitted a cost calculation request.",
    type: "success",
    timestamp: "2026-06-04 11:15",
    read: false,
    isAdmin: true,
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("notifications");
    const settingsCollection = db.collection("settings");

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    // Atomic upsert — prevents race condition on simultaneous first requests
    const seedResult = await settingsCollection.findOneAndUpdate(
      { key: "notifications_seeded" },
      { $setOnInsert: { key: "notifications_seeded", value: true } },
      { upsert: true, returnDocument: "before" }
    );

    if (!seedResult) {
      await collection.insertMany(initialNotifications);
      return NextResponse.json(initialNotifications, { headers });
    }

    const notifications = await collection.find({}).toArray();
    const formattedNotifications = notifications.map(({ _id, ...rest }) => rest);

    // Sort by createdAt (ISO date string) descending — most recent first
    // Falls back to string ID comparison for legacy records without createdAt
    formattedNotifications.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      return b.id.localeCompare(a.id);
    });

    return NextResponse.json(formattedNotifications, { headers });
  } catch (error) {
    console.error("Error in GET /api/notifications:", error);
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, type, isAdmin } = body;

    if (!title || !message) {
      return NextResponse.json({ error: "Title and message are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("notifications");

    const newNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      message,
      type: type || "info",
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 16),
      // createdAt as ISO string for reliable chronological sorting
      createdAt: new Date().toISOString(),
      read: false,
      isAdmin: !!isAdmin,
    };

    await collection.insertOne(newNotification);

    const { _id, ...responseNotification } = newNotification as any;
    return NextResponse.json(responseNotification, { status: 201 });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { isAdmin } = body;

    if (isAdmin === undefined) {
      return NextResponse.json({ error: "isAdmin field is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("notifications");

    await collection.updateMany(
      { isAdmin: !!isAdmin, read: false },
      { $set: { read: true } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating notifications status:", error);
    return NextResponse.json({ error: "Failed to update notifications" }, { status: 500 });
  }
}
