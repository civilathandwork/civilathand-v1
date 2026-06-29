import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { invalidateBlogsCache } from "../route";

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
    const collection = db.collection("blogs");

    // Check if the blog post exists
    const blog = await collection.findOne({ id });
    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    // Prepare updated data
    const updatedBlogData = {
      ...body,
      id: blog.id, // Ensure id cannot be changed
      date: blog.date, // Preserve date
    };

    // Remove _id from update payload if it is present
    delete (updatedBlogData as any)._id;

    await collection.updateOne({ id }, { $set: updatedBlogData });
    invalidateBlogsCache();

    const { _id, ...originalBlogWithoutId } = blog;
    return NextResponse.json({ ...originalBlogWithoutId, ...updatedBlogData });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("blogs");

    const deleteResult = await collection.deleteOne({ id });
    invalidateBlogsCache();

    // If no document was deleted, return success anyway (idempotent delete)
    if (deleteResult.deletedCount === 0) {
      return NextResponse.json({ success: true, message: "Blog post was already deleted or not found" });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => ({}));
    const action = body.action || "view";

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("blogs");

    let updateDoc: any = { $inc: { views: 1 } };
    if (action === "like") {
      updateDoc = { $inc: { likes: 1 } };
    } else if (action === "share") {
      updateDoc = { $inc: { shares: 1 } };
    }

    // Atomic increment of the specified field
    const result = await collection.findOneAndUpdate(
      { id },
      updateDoc,
      { returnDocument: "after" }
    );

    if (!result) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    invalidateBlogsCache();

    const { _id, ...responseItem } = result as any;
    return NextResponse.json(responseItem);
  } catch (error) {
    console.error("Error updating blog actions:", error);
    return NextResponse.json({ error: "Failed to update action count" }, { status: 500 });
  }
}
