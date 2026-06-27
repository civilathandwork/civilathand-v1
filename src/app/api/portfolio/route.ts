import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { portfolioItems as initialPortfolio } from "@/data/portfolio";

export const dynamic = "force-dynamic";

const dbName = process.env.MONGODB_DB || "civil-at-hand";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("portfolio");
    const settingsCollection = db.collection("settings");

    const headers = {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    };

    // Atomic upsert for seeding portfolio
    const seedResult = await settingsCollection.findOneAndUpdate(
      { key: "portfolio_seeded" },
      { $setOnInsert: { key: "portfolio_seeded", value: true } },
      { upsert: true, returnDocument: "before" }
    );

    if (!seedResult) {
      await collection.insertMany(initialPortfolio);
      return NextResponse.json(initialPortfolio, { headers });
    }

    const projects = await collection.find({}).toArray();
    const formattedProjects = projects.map(({ _id, ...rest }) => rest);
    return NextResponse.json(formattedProjects, { headers });
  } catch (error) {
    console.error("Error in GET /api/portfolio:", error);
    return NextResponse.json({ error: "Failed to fetch portfolio" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      category, 
      area, 
      loc, 
      img, 
      status, 
      description, 
      fullDetails, 
      specs, 
      challenges, 
      solutions, 
      gallery 
    } = body;

    if (!title || !category || !description) {
      return NextResponse.json({ error: "Title, category, and description are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(dbName);
    const collection = db.collection("portfolio");

    const newPortfolioItem = {
      id: `port-${Date.now()}`,
      title,
      category,
      area: area || "TBD",
      loc: loc || "TBD",
      img: img || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      status: status || "Ongoing",
      description,
      fullDetails: fullDetails || description,
      specs: Array.isArray(specs) ? specs : [],
      challenges: Array.isArray(challenges) ? challenges : [],
      solutions: Array.isArray(solutions) ? solutions : [],
      gallery: Array.isArray(gallery) ? gallery : [],
    };

    await collection.insertOne(newPortfolioItem);

    const { _id, ...responseItem } = newPortfolioItem as any;
    return NextResponse.json(responseItem, { status: 201 });
  } catch (error) {
    console.error("Error creating portfolio item:", error);
    return NextResponse.json({ error: "Failed to create portfolio item" }, { status: 500 });
  }
}
