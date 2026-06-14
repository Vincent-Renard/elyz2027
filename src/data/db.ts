import { candidates as staticCandidates } from "./candidates";
import { parties as staticParties } from "./parties";
import { articles as staticArticles } from "./articles";
import { polls as staticPolls } from "./polls";
import { timelineEvents as staticTimeline } from "./timeline";

type DbStatus = "mongodb" | "static";

let status: DbStatus = "static";
let ready = false;

async function initMongo() {
  try {
    const { PrismaClient } = await import("../generated/prisma/client");
    const client = new PrismaClient();
    await client.$connect();
    const count = await client.candidate.count();
    if (count === 0) {
      console.warn("MongoDB connected but empty. Run seed first.");
      return null;
    }
    console.log(`MongoDB connected: ${count} candidates found.`);
    return client;
  } catch {
    console.warn("MongoDB unavailable, using static data.");
    return null;
  }
}

let mongoClient: any = null;

export async function getDb() {
  if (!ready) {
    mongoClient = await initMongo();
    status = mongoClient ? "mongodb" : "static";
    ready = true;
  }
  return { client: mongoClient, status };
}

export async function getCandidates() {
  const { client } = await getDb();
  if (client) {
    return client.candidate.findMany({
      include: { previousElections: true },
      orderBy: { name: "asc" },
    });
  }
  return staticCandidates;
}

export async function getCandidateById(id: string) {
  const { client } = await getDb();
  if (client) {
    return client.candidate.findUnique({
      where: { id },
      include: { previousElections: true },
    });
  }
  return staticCandidates.find((c) => c.id === id) ?? null;
}

export async function getParties() {
  const { client } = await getDb();
  if (client) {
    return client.party.findMany({ orderBy: { name: "asc" } });
  }
  return Object.values(staticParties);
}

export async function getPartyByShortName(shortName: string) {
  const { client } = await getDb();
  if (client) {
    return client.party.findUnique({ where: { shortName } });
  }
  return Object.values(staticParties).find(
    (p) => p.shortName.toLowerCase() === shortName.toLowerCase(),
  );
}

export async function getArticles() {
  const { client } = await getDb();
  if (client) {
    return client.article.findMany({ orderBy: { date: "desc" } });
  }
  return staticArticles;
}

export async function getPolls() {
  const { client } = await getDb();
  if (client) {
    return client.poll.findMany({
      include: { candidates: true },
      orderBy: { date: "desc" },
    });
  }
  return staticPolls;
}

export async function getTimelineEvents() {
  const { client } = await getDb();
  if (client) {
    return client.timelineEvent.findMany({ orderBy: { date: "asc" } });
  }
  return staticTimeline;
}
