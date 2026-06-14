import { MongoClient, type Db } from "mongodb";
import { candidates as staticCandidates } from "./candidates";
import { parties as staticParties } from "./parties";
import { articles as staticArticles } from "./articles";
import { polls as staticPolls } from "./polls";
import { timelineEvents as staticTimeline } from "./timeline";

const MONGO_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/elyz2027";

let client: MongoClient | null = null;
let db: Db | null = null;
let status: "mongodb" | "static" = "static";
let ready = false;

function getDbName(url: string) {
  const match = url.match(/\/([^/?]+)(\?|$)/);
  return match?.[1] ?? "elyz2027";
}

async function connect() {
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    const dbName = getDbName(MONGO_URL);
    db = client.db(dbName);
    const count = await db.collection("Candidate").countDocuments();
    if (count === 0) {
      console.warn("MongoDB connected but empty. Run seed first.");
      client.close();
      client = null;
      db = null;
      return;
    }
    status = "mongodb";
    console.log(`MongoDB connected: ${count} candidates found.`);
  } catch (e) {
    console.warn("MongoDB unavailable, using static data.", (e as Error).message);
    client = null;
    db = null;
  }
}

async function init() {
  if (!ready) {
    await connect();
    ready = true;
  }
  return { db, status };
}

export async function getCandidates() {
  const { db } = await init();
  if (db) {
    return db.collection("Candidate").find().sort({ name: 1 }).toArray();
  }
  return staticCandidates;
}

export async function getCandidateById(id: string) {
  const { db } = await init();
  if (db) {
    return db.collection("Candidate").findOne({ id });
  }
  return staticCandidates.find((c) => c.id === id) ?? null;
}

export async function getParties() {
  const { db } = await init();
  if (db) {
    return db.collection("Party").find().sort({ name: 1 }).toArray();
  }
  return Object.values(staticParties);
}

export async function getPartyByShortName(shortName: string) {
  const { db } = await init();
  if (db) {
    return db
      .collection("Party")
      .findOne({ shortName: { $regex: new RegExp(`^${shortName}$`, "i") } });
  }
  return Object.values(staticParties).find(
    (p) => p.shortName.toLowerCase() === shortName.toLowerCase(),
  );
}

export async function getArticles() {
  const { db } = await init();
  if (db) {
    return db.collection("Article").find().sort({ date: -1 }).toArray();
  }
  return staticArticles;
}

export async function getPolls() {
  const { db } = await init();
  if (db) {
    return db.collection("Poll").find().sort({ date: -1 }).toArray();
  }
  return staticPolls;
}

export async function getTimelineEvents() {
  const { db } = await init();
  if (db) {
    return db.collection("TimelineEvent").find().sort({ date: 1 }).toArray();
  }
  return staticTimeline;
}
