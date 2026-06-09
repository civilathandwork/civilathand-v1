import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

const initialBlogs = [
  {
    id: "blog-1",
    title: "Understanding Soil Bearing Capacity in Foundation Design",
    summary: "A deep dive into soil investigation reports, standard penetration tests (SPT), and how structural engineers calculate safe bearing capacity.",
    content: "Structural stability begins at the foundation. Before laying a single cubic meter of concrete, civil engineers must understand the mechanical behaviors of the sub-soil.\n\n### What is Soil Bearing Capacity?\nBearing capacity is the capacity of soil to support the loads applied to the ground. The maximum pressure that the soil can support safely without undergoing shear failure or excessive settlement is called the Ultimate Bearing Capacity.\n\n### The Role of SPT (Standard Penetration Test)\nThe SPT value (N-value) is a critical parameter. During exploration:\n1. A split-spoon sampler is driven into the soil.\n2. The number of blows required to drive the sampler through three successive 150mm intervals is recorded.\n3. The sum of blow counts for the last two intervals is the N-value.\n\nHigher N-values correspond to denser sandy soils or stiffer cohesive clays, indicating superior bearing strength.\n\n### Engineering Best Practices\n- **Never skip soil testing:** Designing foundations on assumed parameters often results in uneven settlement, wall cracking, or structural failure.\n- **Factor of Safety (FoS):** In residential and commercial structural designs, a minimum FoS of 2.5 to 3.0 should be applied to calculate Safe Bearing Capacity (SBC).",
    category: "Structural",
    date: "2026-06-05",
    author: "Er. Amit Wagh",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    status: "published"
  },
  {
    id: "blog-2",
    title: "A Complete Guide to Modern Glassmorphism in Architecture",
    "summary": "Exploring the aesthetic evolution of glass facade engineering, acoustic properties of triple-glazed structures, and visual design parameters.",
    content: "Glassmorphism isn't just a trend in digital UI design; it has deep roots in modern architectural facades. Premium high-rises and executive offices leverage frosted, fluted, and translucent glass sheets to create breathtaking architectural elements that play with light and depth.\n\n### Visual Depth & Ambient Lighting\nBy using low-iron frosted glass, designers can capture light without creating sharp, blinding reflections. This allows interior spaces to benefit from natural daylighting while maintaining thermal barriers and private workspaces.\n\n### Triple-Glazing & Acoustical Comfort\nTo achieve a premium glassmorphic facade, engineers must account for environmental dynamics:\n- **Acoustic Dampening:** Triple-glazed configurations with vacuum chambers reduce exterior decibel levels by up to 45dB, essential for city centers.\n- **U-Value Management:** Implementing low-E metallic oxide coatings ensures that heat is reflected, maintaining comfortable internal HVAC load settings.",
    category: "Architecture",
    date: "2026-06-03",
    author: "Ar. Sneha Patel",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    status: "published"
  },
  {
    id: "blog-3",
    title: "AI Takeoffs: The Future of Quantity Surveying & BOQ",
    "summary": "How deep learning visual engines are automating coordinate mapping and volume estimation directly from structural DWG and PDF files.",
    content: "Traditional quantity takeoffs require structural estimators to manually scale blueprints, measure linear feet, and manually count reinforcement bars. This process is time-consuming and prone to human error. AI-assisted takeoffs are transforming the engineering industry.\n\n### How AI BOQ Takeoffs Work\n1. **Object Detection:** Machine learning algorithms identify standard symbols (rebar shapes, columns, footing dimensions, wall lengths) on 2D drawings.\n2. **Dynamic Scaling:** By recognizing scale legends (e.g. 1:100), the engine calculates concrete volumes and brickwork counts automatically.\n3. **Rebar Estimation:** Rebar schedules are extracted directly from schedule tables, multiplying lengths by unit weights to generate steel summaries in seconds.\n\nAt Civil At Hand, our automated AI engine reduces manual takeoff prep time by over 80%, giving engineers more time to focus on value engineering.",
    category: "Estimation",
    date: "2026-06-01",
    author: "Er. Nitin Shinde",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
    status: "published"
  }
];

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("blogs");

    // Fetch all blogs
    const blogs = await collection.find({}).toArray();

    // If database is empty, seed it with the default blogs
    if (blogs.length === 0) {
      await collection.insertMany(initialBlogs);
      return NextResponse.json(initialBlogs);
    }

    // Convert _id to string or remove it to match client expectations
    const formattedBlogs = blogs.map(({ _id, ...rest }) => rest);

    return NextResponse.json(formattedBlogs);
  } catch (error) {
    console.error("Error in GET /api/blogs:", error);
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

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("blogs");

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

    await collection.insertOne(newBlog);

    // Return without MongoDB's _id
    const { _id, ...responseBlog } = newBlog as any;
    return NextResponse.json(responseBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}
