import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("users");

    // Check if user already exists
    const existingUser = await collection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email: email.toLowerCase(),
      password, // In a real production system, hash the password (e.g., bcrypt). For demo simplicity, stored plain.
      createdAt: new Date().toISOString(),
    };

    await collection.insertOne(newUser);

    // Return user without password
    const { password: _, _id, ...safeUser } = newUser as any;
    return NextResponse.json(safeUser, { status: 201 });
  } catch (error) {
    console.error("Error in signup:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
