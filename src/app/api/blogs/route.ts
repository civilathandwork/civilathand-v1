import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

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

export async function GET() {
  try {
    const blogs = await getBlogsFromFile();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, summary, category, author, image, status } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
    }

    const blogs = await getBlogsFromFile();

    const newBlog = {
      id: `blog-${Date.now()}`,
      title,
      content,
      summary: summary || "",
      category: category || "General",
      date: new Date().toISOString().split("T")[0],
      author: author || "Admin",
      image: image || "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
      status: status || "draft",
    };

    blogs.unshift(newBlog);
    await writeBlogsToFile(blogs);

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
