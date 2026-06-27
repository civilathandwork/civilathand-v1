import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

export async function POST(request: Request) {
  try {
    const { email, password, isGoogle, name } = await request.json();

    if (!email || (!password && !isGoogle)) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("users");

    let user;
    if (isGoogle) {
      user = await collection.findOne({ email: email.toLowerCase() });
      if (!user) {
        user = {
          id: `user-${Date.now()}`,
          name: name || "Google User",
          email: email.toLowerCase(),
          password: "google-oauth-linked",
          createdAt: new Date().toISOString()
        };
        await collection.insertOne(user);
      }
    } else {
      user = await collection.findOne({ 
        email: email.toLowerCase(),
        password: password 
      });
    }

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Return user without password
    const { password: _, _id, ...safeUser } = user as any;
    return NextResponse.json(safeUser, { status: 200 });
  } catch (error) {
    console.error("Error in signin:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
