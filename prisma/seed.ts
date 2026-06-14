import { PrismaClient } from "../src/generated/prisma/client.js";
import { candidates } from "../src/data/candidates";
import { parties } from "../src/data/parties";
import { articles } from "../src/data/articles";
import { polls } from "../src/data/polls";
import { timelineEvents } from "../src/data/timeline";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  await prisma.candidate.deleteMany();
  await prisma.party.deleteMany();
  await prisma.article.deleteMany();
  await prisma.poll.deleteMany();
  await prisma.timelineEvent.deleteMany();

  for (const candidate of candidates) {
    await prisma.candidate.create({
      data: {
        name: candidate.name,
        party: candidate.party,
        partyShort: candidate.partyShort,
        color: candidate.color,
        announcedDate: candidate.announcedDate,
        status: candidate.status,
        description: candidate.description,
        source: candidate.source,
        photo: candidate.photo ?? null,
        mandates: candidate.mandates ?? [],
        previousElections: {
          create:
            candidate.previousElections?.map((e) => ({
              year: e.year,
              round: e.round,
              score: e.score,
            })) ?? [],
        },
      },
    });
  }

  for (const party of Object.values(parties)) {
    await prisma.party.create({
      data: {
        shortName: party.shortName,
        name: party.name,
        color: party.color,
        logo: party.logo ?? null,
        founded: party.founded,
        position: party.position,
        description: party.description,
        history: party.history,
        leader: party.leader,
      },
    });
  }

  for (const article of articles) {
    await prisma.article.create({ data: article });
  }

  for (const poll of polls) {
    await prisma.poll.create({
      data: {
        source: poll.source,
        date: poll.date,
        sampleSize: poll.sampleSize,
        url: poll.url,
        candidates: {
          create: poll.candidates.map((c) => ({
            name: c.name,
            partyShort: c.partyShort,
            score: c.score,
            color: c.color,
          })),
        },
      },
    });
  }

  for (const event of timelineEvents) {
    await prisma.timelineEvent.create({ data: event });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
