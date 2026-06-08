import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const filePath = path.join(process.cwd(), "src/data/blogs.json");

async function getBlogsFromFile() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeBlogsToFile(blogs: any[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(blogs, null, 2), "utf-8");
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const blogs = await getBlogsFromFile();
    const index = blogs.findIndex((b: any) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const updatedBlog = {
      ...blogs[index],
      ...body,
      id: blogs[index].id,
      date: blogs[index].date,
    };

    blogs[index] = updatedBlog;
    await writeBlogsToFile(blogs);

    return NextResponse.json(updatedBlog);
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
    const blogs = await getBlogsFromFile();
    const filteredBlogs = blogs.filter((b: any) => b.id !== id);

    // If the blog was not found, return success anyway (idempotent delete)
    if (blogs.length === filteredBlogs.length) {
      return NextResponse.json({ success: true, message: "Blog post was already deleted or not found" });
    }

    await writeBlogsToFile(filteredBlogs);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
