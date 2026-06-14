import { MongoClient } from "mongodb";
import { candidates } from "../src/data/candidates";
import { parties } from "../src/data/parties";
import { articles } from "../src/data/articles";
import { polls } from "../src/data/polls";
import { timelineEvents } from "../src/data/timeline";

const url = process.env.DATABASE_URL || "mongodb://localhost:27017/elyz2027";

async function main() {
  const client = new MongoClient(url);
  await client.connect();
  const dbName = url.match(/\/([^/?]+)(\?|$)/)?.[1] ?? "elyz2027";
  const db = client.db(dbName);

  console.log("Seeding database...");

  await db.collection("Candidate").deleteMany({});
  for (const c of candidates) {
    const { previousElections, ...rest } = c as any;
    await db.collection("Candidate").insertOne({
      ...rest,
      previousElections: previousElections ?? [],
    });
  }
  console.log(`  ${candidates.length} candidates inserted.`);

  await db.collection("Party").deleteMany({});
  for (const p of Object.values(parties)) {
    await db.collection("Party").insertOne(p);
  }
  console.log(`  ${Object.values(parties).length} parties inserted.`);

  await db.collection("Article").deleteMany({});
  await db.collection("Article").insertMany(articles);
  console.log(`  ${articles.length} articles inserted.`);

  await db.collection("Poll").deleteMany({});
  for (const p of polls) {
    await db.collection("Poll").insertOne(p);
  }
  console.log(`  ${polls.length} polls inserted.`);

  await db.collection("TimelineEvent").deleteMany({});
  await db.collection("TimelineEvent").insertMany(timelineEvents);
  console.log(`  ${timelineEvents.length} timeline events inserted.`);

  await client.close();
  console.log("Database seeded successfully!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
