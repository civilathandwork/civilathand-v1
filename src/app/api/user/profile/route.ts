import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

export async function PUT(request: Request) {
  try {
    const { id, name, email, phone, gender, dob, company, address } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("users");

    // Update user profile in MongoDB
    const updateResult = await collection.findOneAndUpdate(
      { id: id },
      { 
        $set: { 
          name, 
          email: email?.toLowerCase(), 
          phone, 
          gender, 
          dob, 
          company, 
          address,
          updatedAt: new Date().toISOString()
        } 
      },
      { returnDocument: "after" }
    );

    if (!updateResult) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Extract updated user safely (removing password and MongoDB ID)
    const { password: _, _id, ...safeUser } = updateResult as any;
    return NextResponse.json(safeUser, { status: 200 });
  } catch (error) {
    console.error("Error in updating profile:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
