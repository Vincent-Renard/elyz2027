import * as fs from "fs";
import * as path from "path";
import { MongoClient } from "mongodb";
import sources, { type MediaSource } from "./sources";

// ── Config ─────────────────────────────────────────────────────────────────
const CONCURRENCY = 5;
const FETCH_TIMEOUT_MS = 8_000;
const USER_AGENT = "ElyZ2027/2.0 (media monitor; +https://elyz2027.app)";

const KEYWORDS = [
  "présidentielle", "présidentiel", "présidentielle 2027",
  "candidat", "candidature", "candidats", "déclaré",
  "programme", "meeting", "discours", "intervention",
  "sondage", "intention de vote", "baromètre",
  "élection", "scrutin", "vote", "élysée",
  "primaire", "campagne", "désignation", "investiture",
  "débat", "interview", "plateau télé",
  "réunion publique", "rassemblement",
];

const CANDIDATE_NAMES = [
  "Nathalie Arthaud", "François Asselineau", "Gabriel Attal",
  "Clémentine Autain", "Delphine Batho", "Karim Bouamrane",
  "Nicolas Dupont-Aignan", "Jérôme Guedj", "Anasse Kazib",
  "Marine Le Pen", "Jordan Bardella", "David Lisnard",
  "Lydie Massard", "Jean-Luc Mélenchon", "Édouard Philippe",
  "Florian Philippot", "Bruno Retailleau", "François Ruffin",
  "Marine Tondelier", "Éric Zemmour", "Raphaël Glucksmann",
  "François Hollande",
];

const LOG_FILE = path.join(__dirname, "..", "src", "data", "collected", "fetch-errors.log");

// ── Candidate campaign URLs (added as sources) ────────────────────────────
const CAMPAIGN_SOURCES: MediaSource[] = [
  // Search these via RSS if available, otherwise skip gracefully
  { name: "Rassemblement National", url: "https://rassemblementnational.fr", rss: "https://rassemblementnational.fr/feed", type: "news" },
  { name: "La France Insoumise", url: "https://lafranceinsoumise.fr", rss: "https://lafranceinsoumise.fr/feed", type: "news" },
  { name: "Horizons", url: "https://horizonsleparti.fr", rss: "https://horizonsleparti.fr/feed", type: "news" },
  { name: "Les Républicains", url: "https://republicains.fr", rss: "https://republicains.fr/feed", type: "news" },
  { name: "Reconquête", url: "https://reconquete.fr", rss: "https://reconquete.fr/feed", type: "news" },
  { name: "Parti Socialiste", url: "https://parti-socialiste.fr", rss: "https://parti-socialiste.fr/feed", type: "news" },
  { name: "Les Écologistes", url: "https://lesecologistes.fr", rss: "https://lesecologistes.fr/feed", type: "news" },
  { name: "Parti Communiste", url: "https://pcf.fr", rss: "https://pcf.fr/feed", type: "news" },
  { name: "Union Populaire Républicaine", url: "https://upr.fr", rss: "https://upr.fr/feed", type: "news" },
  { name: "Résistons", url: "https://resistons-france.fr", rss: "https://resistons-france.fr/feed", type: "news" },
  { name: "Nouveau Cap", url: "https://nouveaucap.fr", rss: "https://nouveaucap.fr/feed", type: "news" },
  { name: "Génération.s", url: "https://generations.fr", rss: "https://generations.fr/feed", type: "news" },
];

// ── Types ──────────────────────────────────────────────────────────────────
interface RawArticle {
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
}

interface CollectedArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
  category: string;
  mentions: string[];
}

interface AgendaHint {
  source: string;
  candidateId: string;
  candidateName: string;
  label: string;
  description: string;
  date: string;
  type: "meeting" | "conference" | "media" | "declaration";
  location?: string;
  channel?: string;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function logToFile(msg: string) {
  const dir = path.dirname(LOG_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

function matchesAny(text: string, terms: string[]): boolean {
  const lower = text.toLowerCase();
  return terms.some((t) => lower.includes(t.toLowerCase()));
}

function parseDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) return d.toISOString().split("T")[0];
  } catch {}
  const m = dateStr.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (m) return m[0];
  return new Date().toISOString().split("T")[0];
}

function extractSummary(desc: string, maxLen = 300): string {
  return desc
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLen);
}

function slugCandidate(name: string): string {
  return name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
}

// ── RSS parsing (multi-format) ─────────────────────────────────────────────

function parseItemsFromXML(xml: string, sourceName: string): RawArticle[] {
  const items: RawArticle[] = [];

  // Try RSS 2.0 <item>
  const rssItemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = rssItemRegex.exec(xml)) !== null) {
    const block = m[1];
    const title = extractTag(block, "title");
    const link = extractTag(block, "link");
    if (!title || !link) continue;

    const pubDate = extractTag(block, "pubDate") || extractTag(block, "dc:date");
    const desc = extractTag(block, "description") || extractTag(block, "content:encoded");

    items.push({
      title: decodeHtml(title.trim()),
      source: sourceName,
      date: parseDate(pubDate),
      url: link.trim(),
      summary: extractSummary(decodeHtml(desc)),
    });
  }
  if (items.length > 0) return items;

  // Try Atom <entry>
  const atomEntryRegex = /<entry>([\s\S]*?)<\/entry>/gi;
  while ((m = atomEntryRegex.exec(xml)) !== null) {
    const block = m[1];
    const title = extractTag(block, "title");
    const linkMatch = block.match(/<link[^>]*href="([^"]+)"/);
    const link = linkMatch?.[1] ?? "";
    if (!title || !link) continue;

    const published = extractTag(block, "published") || extractTag(block, "updated");
    const content = extractTag(block, "content") || extractTag(block, "summary");

    items.push({
      title: decodeHtml(title.trim()),
      source: sourceName,
      date: parseDate(published),
      url: link,
      summary: extractSummary(decodeHtml(content)),
    });
  }
  if (items.length > 0) return items;

  // Try RDF <item>
  const rdfItemRegex = /<rdf:li[^>]*rdf:resource="([^"]+)"\/?>|<item[^>]*rdf:about="([^"]+)"([\s\S]*?)<\/item>/gi;
  while ((m = rdfItemRegex.exec(xml)) !== null) {
    const title = extractTag(m[3] ?? "", "title");
    const link = m[1] ?? m[2] ?? "";
    if (!title || !link) continue;
    const desc = extractTag(m[3] ?? "", "description");
    items.push({
      title: decodeHtml(title.trim()),
      source: sourceName,
      date: parseDate(""),
      url: link,
      summary: extractSummary(decodeHtml(desc)),
    });
  }

  return items;
}

function extractTag(block: string, tag: string): string {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[(.*?)\\]\\]><\\/${tag}>`, "i"),
    new RegExp(`<${tag}[^>]*>(.*?)<\\/${tag}>`, "i"),
    new RegExp(`<${tag}[^>]*\\/>`, "i"),
  ];
  for (const p of patterns) {
    const m = p.exec(block);
    if (m?.[1]) return decodeHtml(m[1].trim());
  }
  return "";
}

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

// ── Fetch single source ────────────────────────────────────────────────────

async function fetchRSS(source: MediaSource): Promise<RawArticle[]> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);

    const res = await fetch(source.rss, {
      signal: ctrl.signal,
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
    });
    clearTimeout(timer);

    if (!res.ok) {
      const msg = `  ${source.name}: HTTP ${res.status}`;
      console.warn(msg);
      logToFile(msg);
      return [];
    }

    const xml = await res.text();
    if (!xml || xml.length < 50) {
      const msg = `  ${source.name}: empty response (${xml?.length ?? 0} chars)`;
      console.warn(msg);
      logToFile(msg);
      return [];
    }

    const items = parseItemsFromXML(xml, source.name);

    const filtered = items.filter((it) =>
      matchesAny(it.title + " " + it.summary, KEYWORDS)
    );

    if (items.length > 0 && filtered.length === 0) {
      // source is alive but no election-related articles — normal
    }

    return filtered;
  } catch (err) {
    const msg = `  ${source.name}: ${(err as Error).message}`;
    console.warn(msg);
    logToFile(msg);
    return [];
  }
}

// ── Concurrent fetching ────────────────────────────────────────────────────

async function fetchAll(sourcesList: MediaSource[]): Promise<RawArticle[]> {
  const all: RawArticle[] = [];
  const queue = [...sourcesList];

  const worker = async () => {
    while (queue.length > 0) {
      const src = queue.shift()!;
      process.stdout.write(`  ${src.name}... `);
      const items = await fetchRSS(src);
      console.log(`${items.length} article(s)`);
      all.push(...items);
    }
  };

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);

  return all;
}

// ── Categorization ─────────────────────────────────────────────────────────

function categorizeItem(item: RawArticle): string {
  const text = (item.title + " " + item.summary).toLowerCase();
  if (matchesAny(text, ["sondage", "intention de vote", "baromètre"])) return "sondage";
  if (matchesAny(text, ["candidat", "candidature", "déclaré", "déclarée", "annonce sa candidature", "se présente"])) return "candidature";
  if (matchesAny(text, ["calendrier", "date", "scrutin", "décret", "élection"])) return "calendrier";
  if (matchesAny(text, ["judiciaire", "inéligibilité", "procès", "condamnation", "justice"])) return "judiciaire";
  if (matchesAny(text, ["programme", "proposition", "mesure", "réforme"])) return "programme";
  if (matchesAny(text, ["meeting", "rassemblement", "réunion publique", "déplacement"])) return "meeting";
  if (matchesAny(text, ["interview", "télévision", "radio", "plateau", "invité", "débat"])) return "media";
  if (matchesAny(text, ["discours", "prise de parole", "allocution"])) return "discours";
  if (matchesAny(text, ["primaire", "désignation", "investiture", "congrès"])) return "interne";
  return "analyse";
}

function extractMentions(text: string): string[] {
  return CANDIDATE_NAMES.filter((n) => text.includes(n));
}

// ── Agenda extraction ──────────────────────────────────────────────────────

function extractAgendaHints(item: RawArticle): AgendaHint[] {
  const hints: AgendaHint[] = [];
  const text = (item.title + " " + item.summary).toLowerCase();

  for (const name of CANDIDATE_NAMES) {
    if (!text.includes(name.toLowerCase())) continue;
    const cid = slugCandidate(name);

    if (matchesAny(text, ["meeting", "rassemblement", "réunion publique"])) {
      let location: string | undefined;
      const locMatch = item.summary.match(/(?:à|au|aux|dans)\s+([A-Z][a-zéèêëàâîïôûùçÆŒ -]+?)(?:[,.]|\s+pour|\s+où|\s+devant|\s+le\s+\d)/);
      if (locMatch) location = locMatch[1].trim();
      hints.push({
        source: item.source,
        candidateId: cid, candidateName: name,
        label: `Meeting — ${name}`, description: item.summary,
        date: item.date, type: "meeting", location,
      });
    }
    if (matchesAny(text, ["interview", "télévision", "radio", "plateau", "invité"])) {
      let channel: string | undefined;
      const channelMatch = item.summary.match(/(?:invité\s+(?:de|sur)\s+|sur\s+)([\w\séèêëàâîïôûùç]+?)(?:[,.]|\s+pour|\s+à\s+\d)/i);
      if (channelMatch) channel = channelMatch[1].trim();
      if (!channel) {
        const ch2 = item.title.match(/(?:sur|de|dans)\s+(LCI|CNews|BFM\s*TV|France\s*\d+|Europe\s*1|RTL|France\s*Inter|Sud\s*Radio|RMC)/i);
        if (ch2) channel = ch2[1].trim();
      }
      hints.push({
        source: item.source,
        candidateId: cid, candidateName: name,
        label: `Média — ${name}`, description: item.summary,
        date: item.date, type: "media", channel,
      });
    }
    if (matchesAny(text, ["conférence", "discours", "prise de parole", "allocution", "déclaration"])) {
      let location: string | undefined;
      const locMatch = item.summary.match(/(?:à|au|aux|depuis)\s+([A-Z][a-zéèêëàâîïôûùçÆŒ -]+?)(?:[,.]|\s+pour|\s+devant|\s+sur)/);
      if (locMatch) location = locMatch[1].trim();
      hints.push({
        source: item.source,
        candidateId: cid, candidateName: name,
        label: `Discours — ${name}`, description: item.summary,
        date: item.date, type: "conference", location,
      });
    }
    if (matchesAny(text, ["déplacement", "visite", "se rend"])) {
      let location: string | undefined;
      const locMatch = item.summary.match(/(?:à|au|aux|en|dans)\s+([A-Z][a-zéèêëàâîïôûùçÆŒ -]+?)(?:[,.]|$)/);
      if (locMatch) location = locMatch[1].trim();
      hints.push({
        source: item.source,
        candidateId: cid, candidateName: name,
        label: `Déplacement — ${name}`, description: item.summary,
        date: item.date, type: "declaration", location,
      });
    }
  }

  return hints;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const startTime = Date.now();
  console.log(`\n📡 Collecte médias — ${sources.length + CAMPAIGN_SOURCES.length} sources (concurrency ${CONCURRENCY}, timeout ${FETCH_TIMEOUT_MS}ms)`);
  console.log("=".repeat(50));

  // Clear previous error log
  const errDir = path.dirname(LOG_FILE);
  if (!fs.existsSync(errDir)) fs.mkdirSync(errDir, { recursive: true });
  fs.writeFileSync(LOG_FILE, "");

  // 1. Fetch all sources
  console.log("\n📰 RSS:");
  const mediaArticles = await fetchAll(sources);

  console.log("\n🏛️ Sites de campagne:");
  const campaignArticles = await fetchAll(CAMPAIGN_SOURCES);

  const allArticles = [...mediaArticles, ...campaignArticles];

  // 2. Deduplicate
  const deduped = new Map<string, RawArticle>();
  for (const a of allArticles) {
    const key = a.title.toLowerCase().replace(/\s+/g, " ").slice(0, 100);
    if (!deduped.has(key)) deduped.set(key, a);
  }

  const unique = [...deduped.values()].sort((a, b) => b.date.localeCompare(a.date));
  console.log(`\n📊 Total brut: ${allArticles.length} → après dédoublonnage: ${unique.length}`);

  // 3. Build categorized collection
  const categorized: CollectedArticle[] = unique.map((a) => ({
    id: `col-${a.date}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title: a.title,
    source: a.source,
    date: a.date,
    url: a.url,
    summary: a.summary,
    category: categorizeItem(a),
    mentions: extractMentions(a.title + " " + a.summary),
  }));

  // 4. Save to JSON
  const collectionsDir = path.join(__dirname, "..", "src", "data", "collected");
  if (!fs.existsSync(collectionsDir)) fs.mkdirSync(collectionsDir, { recursive: true });

  const timestamp = new Date().toISOString().split("T")[0];
  const reportPath = path.join(collectionsDir, `collection-${timestamp}.json`);
  fs.writeFileSync(reportPath, JSON.stringify({
    collectedAt: new Date().toISOString(),
    total: categorized.length,
    articles: categorized,
  }, null, 2));
  console.log(`💾 JSON: ${reportPath}`);

  // 5. Save agenda hints
  const allAgendaHints: AgendaHint[] = [];
  for (const a of unique) {
    allAgendaHints.push(...extractAgendaHints(a));
  }
  const agendaPath = path.join(collectionsDir, `agenda-hints-${timestamp}.json`);
  fs.writeFileSync(agendaPath, JSON.stringify({
    collectedAt: new Date().toISOString(),
    hints: allAgendaHints,
  }, null, 2));
  console.log(`📅 Agenda hints: ${allAgendaHints.length} trouvés → ${agendaPath}`);

  // 6. Save to MongoDB
  try {
    const dbUrl = process.env.DATABASE_URL || "mongodb://localhost:27017/elyz2027";
    const client = new MongoClient(dbUrl);
    await client.connect();
    const dbName = dbUrl.match(/\/([^/?]+)(\?|$)/)?.[1] ?? "elyz2027";
    const db = client.db(dbName);

    // Upsert articles (by url unique — but no unique index, so just insert with dedup check)
    const col = db.collection("Article");
    let inserted = 0;
    for (const a of categorized) {
      const existing = await col.findOne({ url: a.url });
      if (!existing) {
        await col.insertOne({
          title: a.title,
          source: a.source,
          date: a.date,
          url: a.url,
          summary: a.summary,
          category: a.category,
          mentions: a.mentions,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        inserted++;
      }
    }
    console.log(`🍃 MongoDB: ${inserted} nouveaux articles insérés`);

    // Save agenda hints to a separate collection
    if (allAgendaHints.length > 0) {
      const agendaCol = db.collection("AgendaHint");
      // Clear old hints and re-insert
      await agendaCol.deleteMany({});
      await agendaCol.insertMany(allAgendaHints.map((h) => ({
        ...h,
        createdAt: new Date(),
        updatedAt: new Date(),
      })));
      console.log(`📅 Agenda hints en base: ${allAgendaHints.length}`);
    }

    await client.close();
  } catch (err) {
    const msg = `Erreur MongoDB: ${(err as Error).message}`;
    console.warn(`  ⚠️  ${msg}`);
    logToFile(msg);
  }

  // 7. Summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log("\n" + "=".repeat(50));

  console.log(`\n📈 Stats (${elapsed}s) :`);
  const byCategory: Record<string, number> = {};
  for (const a of categorized) {
    byCategory[a.category] = (byCategory[a.category] ?? 0) + 1;
  }
  for (const [cat, count] of Object.entries(byCategory).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${cat}: ${count}`);
  }

  console.log("\n🏷️ Mentions par candidat:");
  const mentionCount: Record<string, number> = {};
  for (const a of categorized) {
    for (const m of a.mentions) {
      mentionCount[m] = (mentionCount[m] ?? 0) + 1;
    }
  }
  for (const [name, count] of Object.entries(mentionCount).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${name}: ${count}`);
  }

  // 8. Detect new candidates
  console.log("\n🔍 Nouveaux candidats détectés ?");
  const allMentionedNames = new Set(categorized.flatMap((a) => a.mentions));
  // Load known candidate IDs from data
  const { candidates: knownCandidates } = await import("../src/data/candidates");
  const knownIds = new Set(knownCandidates.map((c: { id: string }) => c.id));
  for (const name of allMentionedNames) {
    const slug = slugCandidate(name);
    if (!knownIds.has(slug)) {
      console.log(`  ⚠️  Nom non référencé: ${name} (slug: ${slug}) — possible nouveau candidat`);
    }
  }

  // 9. New categories check
  console.log("\n💡 Nouvelles rubriques à afficher ?");
  const allCategories = Object.keys(byCategory);
  const existingCategories = ["sondage", "candidature", "calendrier", "judiciaire", "analyse"];
  for (const cat of allCategories) {
    if (cat === "analyse") continue; // default
    if (!existingCategories.includes(cat)) {
      console.log(`  ➕ Nouvelle rubrique: "${cat}" (${byCategory[cat]} articles) — à ajouter dans l'UI`);
    }
  }
  // Suggest from current
  const suggCategories = ["programme", "meeting", "media", "discours", "interne"];
  const missing = suggCategories.filter((c) => allCategories.includes(c) && !existingCategories.includes(c));
  if (missing.length > 0) {
    console.log(`  Ces rubriques existent dans les articles et méritent un onglet: ${missing.join(", ")}`);
  }

  console.log(`\n✅ Collecte terminée en ${elapsed}s. Voir les erreurs: ${LOG_FILE}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  logToFile(`FATAL: ${err.message}`);
  process.exit(1);
});
