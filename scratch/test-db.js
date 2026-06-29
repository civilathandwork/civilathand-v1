const { MongoClient } = require("mongodb");

const uri = "mongodb://pavanwagh111213_db_user:Cah%40v1@ac-hurdwmq-shard-00-00.pyxtj2t.mongodb.net:27017,ac-hurdwmq-shard-00-01.pyxtj2t.mongodb.net:27017,ac-hurdwmq-shard-00-02.pyxtj2t.mongodb.net:27017/?ssl=true&authSource=admin&appName=ClusterCAHV1";

async function run() {
  const start = Date.now();
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log(`Connected in ${Date.now() - start}ms`);
    
    const db = client.db("civil-at-hand");
    const collection = db.collection("blogs");
    
    console.log("Fetching all blogs...");
    const fetchStart = Date.now();
    const blogs = await collection.find({}).toArray();
    console.log(`Fetched ${blogs.length} blogs successfully in ${Date.now() - fetchStart}ms!`);
  } catch (err) {
    console.error("Failed:", err);
  } finally {
    await client.close();
    console.log(`Total time: ${Date.now() - start}ms`);
  }
}

run();
