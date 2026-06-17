import * as fs from "fs";
import * as path from "path";

const USER_AGENT = "ElyZ2027/3.0 (program scraper; +https://elyz2027.app)";
const TIMEOUT_MS = 15_000;
const MAX_CONCURRENCY = 3;

const COLLECTED_DIR = path.join(__dirname, "..", "src", "data", "collected");
const LOG_FILE = path.join(COLLECTED_DIR, "program-errors.log");

interface FetchedPage {
  url: string;
  html: string;
  text: string;
}

interface ScraperConfig {
  /** CSS selectors for content extraction, tried in order */
  contentSelectors?: string[];
  /** If true, crawl subpages from links on the page */
  crawlSubpages?: { selector: string; maxPages: number };
  /** If true, fetch and extract PDF */
  isPdf?: boolean;
  /** Custom text extraction function */
  extract?: (page: FetchedPage) => Promise<string[]>;
}

type Adapter = "generic" | "astroupr" | "citipo" | "wordpress" | "elementor" | "squarespace" | "blocks" | "custom";

let logFd: fs.WriteStream | null = null;

function log(msg: string) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  if (!logFd) {
    if (!fs.existsSync(COLLECTED_DIR)) fs.mkdirSync(COLLECTED_DIR, { recursive: true });
    logFd = fs.createWriteStream(LOG_FILE, { flags: "a" });
  }
  logFd.write(line);
  process.stderr.write(line);
}

async function fetchPage(url: string): Promise<FetchedPage | null> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { "User-Agent": USER_AGENT },
      redirect: "follow",
    });
    if (!res.ok) {
      log(`HTTP ${res.status} ${url}`);
      return null;
    }
    const html = await res.text();
    let text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
      .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
      .replace(/<[^>]*>/g, " ")
      .replace(/&[a-z]+;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return { url, html, text };
  } catch (err) {
    log(`Error ${url}: ${(err as Error).message}`);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function extractSections(text: string, keywords: string[]): string[] {
  const lines = text
    .split(/[.;!?\n]+/)
    .map((l) => l.trim())
    .filter((l) => l.length > 40 && l.length < 500);

  const scored = lines.map((l) => {
    const score = keywords.filter((k) => l.toLowerCase().includes(k)).length;
    return { line: l, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 50)
    .map((s) => s.line);
}

async function fetchPdfText(url: string): Promise<string[]> {
  log(`PDF download: ${url}`);
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) return [];
  const buffer = Buffer.from(await res.arrayBuffer());
  const outputPath = path.join(COLLECTED_DIR, "temp.pdf");
  fs.writeFileSync(outputPath, buffer);
  try {
    // Try pdftotext if available
    const { execSync } = require("child_process");
    const out = execSync(`pdftotext "${outputPath}" - 2>/dev/null || cat "${outputPath}"`, {
      encoding: "utf-8",
      timeout: 30_000,
    });
    fs.unlinkSync(outputPath);
    const lines = out
      .split(/\n+/)
      .map((l: string) => l.trim())
      .filter((l: string) => l.length > 40);
    return lines.slice(0, 100);
  } catch {
    // Fallback: extract raw text from buffer
    fs.unlinkSync(outputPath);
    const raw = buffer.toString("utf-8");
    const lines = raw
      .replace(/[^\w\sàâçéèêëîïôûùüÿœæ]/gi, " ")
      .split(/\s+/)
      .join(" ")
      .split(/[.;!?\n]+/)
      .map((l) => l.trim())
      .filter((l) => l.length > 40);
    return lines.slice(0, 50);
  }
}

// --- Adapter: Astro UPR (multi-edition) ---
async function adaptUpr(url: string): Promise<string[]> {
  const page = await fetchPage(url);
  if (!page) return [];
  // Find links to specific program editions
  const links: string[] = [];
  const linkRegex = /href="(\/notre-programme\/[^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = linkRegex.exec(page.html)) !== null) {
    const link = m[1];
    if (!links.includes(link)) links.push(link);
  }
  // Follow each edition link
  const results: string[] = [];
  for (const link of links.slice(0, 3)) {
    const fullUrl = new URL(link, url).href;
    const sub = await fetchPage(fullUrl);
    if (sub && sub.text.length > 200) {
      const proposals = extractSections(sub.text, [
        "programme", "propos", "mesure", "suppression", "création",
        "retour", "sortir", "frexit", "réforme", "instauration",
        "voulons", "nous", "engagement", "proposons",
      ]);
      results.push(...proposals);
    }
  }
  return [...new Set(results)].slice(0, 60);
}

// --- Adapter: Citipo (Gabriel Attal / ensemble-2024) ---
async function adaptCitipo(url: string): Promise<string[]> {
  const page = await fetchPage(url);
  if (!page) return [];
  let text = page.text;
  // Try to find a link to full program
  const programLinkMatch = page.html.match(/href="(https?:\/\/ensemble-2024\.fr[^"]+)"/i);
  if (programLinkMatch) {
    const fullProgram = await fetchPage(programLinkMatch[1]);
    if (fullProgram) text += " " + fullProgram.text;
  }
  // Also try to find PDF links and extract from them
  const pdfLinks: string[] = [];
  const pdfRegex = /href="([^"]+\.pdf)"/gi;
  let pm: RegExpExecArray | null;
  while ((pm = pdfRegex.exec(page.html)) !== null) {
    const pdfUrl = pm[1].startsWith("http") ? pm[1] : new URL(pm[1], url).href;
    if (!pdfLinks.includes(pdfUrl)) pdfLinks.push(pdfUrl);
  }
  for (const pdf of pdfLinks.slice(0, 2)) {
    const pdfText = await fetchPdfText(pdf);
    if (pdfText.length > 0) text += " " + pdfText.join(" ");
  }
  return extractSections(text, [
    "programme", "propos", "engagement", "travail", "pouvoir d'achat",
    "écologie", "autorité", "valeurs", "réforme", "investissement",
    "création", "augmentation", "baisse", "protection", "sécurité",
    "éducation", "santé", "retraite", "plein-emploi",
  ]);
}

// --- Adapter: WordPress Elementor ---
async function adaptElementor(url: string): Promise<string[]> {
  const page = await fetchPage(url);
  if (!page) return [];
  // Elementor stores content in .elementor-widget-container or .elementor-section or .entry-content
  // Strip inline JSON/CSS blobs that Elementor adds
  let content = page.html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, "")
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, "")
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, "")
    .replace(/<form[^>]*>[\s\S]*?<\/form>/gi, "")
    .replace(/role="(tab|menu|navigation)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, "")
    .replace(/<[^>]+data-element_type[^>]*>[\s\S]*?<\/div>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&[a-z]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return extractSections(content, [
    "programme", "propos", "mesure", "réforme", "création",
    "augmentation", "baisse", "suppression", "instauration",
    "investissement", "plan", "loi", "droit", "obligation",
    "interdiction", "réduction", "renforcement", "généralisation",
    "voulons", "proposons", "engag", "retraite", "smic",
    "écologie", "éducation", "santé", "sécurité", "justice",
    "fiscalité", "impôt", "service public",
  ]);
}

// --- Adapter: Squarespace ---
async function adaptSquarespace(url: string): Promise<string[]> {
  const page = await fetchPage(url);
  if (!page) return [];
  // Squarespace stores content in .sqs-block-content or .sqs-html-content
  return extractSections(page.text, [
    "programme", "propos", "mesure", "réforme", "création",
    "augmentation", "baisse", "suppression", "instauration",
    "voulons", "proposons", "engag", "manifeste", "primaire",
    "gauche", "écologie", "justice", "solidarité",
  ]);
}

// --- Adapter: WordPress Blocks (Ruffin - Ollie theme) ---
async function adaptBlocks(url: string): Promise<string[]> {
  const page = await fetchPage(url);
  if (!page) return [];
  // Block themes: content is in .entry-content, .wp-block-post-content, .wp-block-group, .wp-block-cover
  return extractSections(page.text, [
    "programme", "propos", "mesure", "réforme", "création",
    "augmentation", "baisse", "suppression", "instauration",
    "voulons", "proposons", "engag", "retraite", "smic",
    "travail", "salaire", "écologie", "éducation", "santé",
    "sécurité", "justice", "fiscalité", "impôt", "service public",
    "solidarité", "logement", "transition",
  ]);
}

// --- Custom adapters per candidate ---
const adapters: Record<string, (url: string) => Promise<string[]>> = {
  // Asselineau - UPR Astro site with multi-edition
  "francois-asselineau": async (url) => {
    const page = await fetchPage(url);
    if (!page) return [];
    const links: string[] = [];
    const linkRegex = /href="(\/notre-programme\/[^"]+)"/g;
    let m: RegExpExecArray | null;
    while ((m = linkRegex.exec(page.html)) !== null) {
      if (!links.includes(m[1])) links.push(m[1]);
    }
    const results: string[] = [];
    for (const link of links) {
      const sub = await fetchPage(new URL(link, url).href);
      if (sub && sub.text.length > 200) {
        results.push(...extractSections(sub.text, [
          "frexit", "retour au franc", "sortir", "europe", "ue",
          "programme", "mesure", "suppression", "création",
          "voulons", "proposons", "réforme", "indépendance",
          "souveraineté", "nation", "référendum",
        ]));
      }
    }
    return [...new Set(results)].slice(0, 60);
  },

  // Attal - Citipo platform with PDF links
  "gabriel-attal": adaptCitipo,

  // Autain - WordPress Elementor
  "clementine-autain": async (url) => {
    const page = await fetchPage(url);
    if (!page) return [];
    return extractSections(page.text, [
      "manifeste", "programme", "propos", "gauche", "écologie",
      "justice", "solidarité", "retraite", "salaire", "service public",
      "éducation", "santé", "logement", "féminisme", "antiracisme",
      "planification", "transition", "voulons", "proposons", "mesure",
    ]);
  },

  // Batho - custom site
  "delphine-batho": async (url) => {
    const page = await fetchPage(url);
    if (!page) return [];
    return extractSections(page.text, [
      "écologie", "beauté", "programme", "propos", "environnement",
      "climat", "nature", "transition", "urgence", "gouverner",
      "espérance", "politique", "mesure", "voulons", "présidentielle",
      "santé", "alimentation", "eau", "pollution",
    ]);
  },

  // Dupont-Aignan - 404, try different URL
  "nicolas-dupont-aignan": async (_url) => {
    // The current URL returns 404. Try alternative URLs
    const altUrls = [
      "https://www.debout-la-france.fr/notre-programme/",
      "https://www.debout-la-france.fr/programme/",
      "https://www.debout-la-france.fr/actualite/",
    ];
    for (const alt of altUrls) {
      const page = await fetchPage(alt);
      if (page && page.text.length > 200) {
        return extractSections(page.text, [
          "programme", "propos", "mesure", "réforme", "souveraineté",
          "france", "nation", "voulons", "proposons", "europe", "frexit",
          "retraite", "sécurité", "immigration", "autorité",
        ]);
      }
    }
    return [];
  },

  // Guedj - minimal site
  "jerome-guedj": async (url) => {
    const page = await fetchPage(url);
    if (!page) return [];
    return extractSections(page.text, [
      "programme", "propos", "gauche", "justice", "solidarité",
      "réforme", "mesure", "voulons", "proposons", "engagement",
      "député", "essonne", "républicain",
    ]);
  },

  // Kazib - custom campaign site
  "anasse-kazib": async (url) => {
    const page = await fetchPage(url);
    if (!page) return [];
    // Content is directly in the page
    let text = page.text;
    // Try to find subpage /notre-programme
    const progPage = await fetchPage(new URL("notre-programme", url).href);
    if (progPage) text += " " + progPage.text;
    return extractSections(text, [
      "programme", "propos", "travailleur", "ouvrier", "classe",
      "retraite", "salaire", "smic", "syndical", "grève",
      "révolution", "capitalisme", "patronat", "état",
      "voulons", "proposons", "mesure", "justice", "égalité",
    ]);
  },

  // Lisnard - Nouvelle Énergie custom site
  "david-lisnard": async (url) => {
    const page = await fetchPage(url);
    if (!page) return [];
    // The site has 9 thematic sections with "En savoir plus" links
    const results = extractSections(page.text, [
      "liberté", "ordre", "dignité", "programme", "propos",
      "réforme", "état", "décentralisation", "souveraineté",
      "éducation", "sécurité", "santé", "immigration",
      "fiscalité", "dette", "dépense", "libéral", "régalien",
      "voulons", "proposons", "refondation", "économie",
    ]);
    // Try to crawl subpages for more detail
    const links: string[] = [];
    const linkRegex = /href="([^"]+(?:notre-programme|maitre-destin|ambition|renouveau)[^"]*)"/gi;
    let m: RegExpExecArray | null;
    while ((m = linkRegex.exec(page.html)) !== null) {
      const href = m[1];
      if (!href.startsWith("http") && !href.startsWith("#")) {
        links.push(href);
      }
    }
    for (const link of [...new Set(links)].slice(0, 5)) {
      const sub = await fetchPage(new URL(link, url).href);
      if (sub && sub.text.length > 200) {
        results.push(...extractSections(sub.text, [
          "propos", "mesure", "réforme", "liberté", "voulons",
          "création", "suppression", "instauration", "plan",
        ]));
      }
    }
    return [...new Set(results)].slice(0, 60);
  },

  // Mélenchon - WordPress Elementor with custom post type
  "jean-luc-melenchon": async (url) => {
    const page = await fetchPage(url);
    if (!page) return [];
    // The program is a book/AEC — get the full text content
    let text = page.text;
    // Try to find the "programme" subpages
    const subUrls = [
      "https://melenchon2027.fr/programme2025/livre/",
      "https://melenchon2027.fr/construction-programme/",
    ];
    for (const su of subUrls) {
      if (su === url) continue;
      const sub = await fetchPage(su);
      if (sub) text += " " + sub.text;
    }
    return extractSections(text, [
      "programme", "avenir en commun", "propos", "mesure", "réforme",
      "retraite", "smic", "planification", "écologie", "république",
      "souveraineté", "justice", "solidarité", "service public",
      "éducation", "santé", "fiscalité", "impôt", "transition",
      "droit", "liberté", "voulons", "proposons", "melenchon",
      "insoumise", "constituante",
    ]);
  },

  // Philippot - PDF
  "florian-philippot": async (url) => {
    return fetchPdfText(url);
  },

  // Ruffin - WordPress Blocks (Ollie theme)
  "francois-ruffin": async (url) => {
    const page = await fetchPage(url);
    if (!page) return [];
    let text = page.text;
    // Try subpages for program content
    const subPages = [
      "/notre-programme",
      "/programme",
      "/propositions",
    ];
    for (const sp of subPages) {
      const sub = await fetchPage(new URL(sp, url).href);
      if (sub) text += " " + sub.text;
    }
    return extractSections(text, [
      "programme", "propos", "mesure", "réforme", "création",
      "augmentation", "baisse", "suppression", "instauration",
      "voulons", "proposons", "engag", "retraite", "smic",
      "travail", "salaire", "écologie", "éducation", "santé",
      "sécurité", "justice", "fiscalité", "service public",
      "solidarité", "logement", "transition", "ruffin",
    ]);
  },

  // Tondelier - Squarespace
  "marine-tondelier": adaptSquarespace,

  // Candidates without programUrl — try heuristic search
  "marine-le-pen": async () => searchProgram("Marine Le Pen", "rassemblement national", "rn"),
  "jordan-bardella": async () => searchProgram("Jordan Bardella", "rassemblement national", "rn"),
  "edouard-philippe": async () => searchProgram("Édouard Philippe", "horizons"),
  "bruno-retailleau": async () => searchProgram("Bruno Retailleau", "les républicains", "lr"),
  "eric-zemmour": async () => searchProgram("Éric Zemmour", "reconquête"),
  "raphael-glucksmann": async () => searchProgram("Raphaël Glucksmann", "place publique", "ps"),
  "francois-hollande": async () => searchProgram("François Hollande"),
};

async function searchProgram(..._terms: string[]): Promise<string[]> {
  // Placeholder — could use Google search or known URLs
  // For now, return empty and log a hint
  const candidateName = _terms[0];
  log(`No program URL for ${candidateName}. Search terms: ${_terms.join(", ")}`);
  return [];
}

const candidateNames: Record<string, string> = {
  "nathalie-arthaud": "Nathalie Arthaud",
  "francois-asselineau": "François Asselineau",
  "gabriel-attal": "Gabriel Attal",
  "clementine-autain": "Clémentine Autain",
  "delphine-batho": "Delphine Batho",
  "karim-bouamrane": "Karim Bouamrane",
  "nicolas-dupont-aignan": "Nicolas Dupont-Aignan",
  "jerome-guedj": "Jérôme Guedj",
  "anasse-kazib": "Anasse Kazib",
  "marine-le-pen": "Marine Le Pen",
  "jordan-bardella": "Jordan Bardella",
  "david-lisnard": "David Lisnard",
  "lydie-massard": "Lydie Massard",
  "jean-luc-melenchon": "Jean-Luc Mélenchon",
  "edouard-philippe": "Édouard Philippe",
  "florian-philippot": "Florian Philippot",
  "bruno-retailleau": "Bruno Retailleau",
  "francois-ruffin": "François Ruffin",
  "marine-tondelier": "Marine Tondelier",
  "eric-zemmour": "Éric Zemmour",
  "raphael-glucksmann": "Raphaël Glucksmann",
  "francois-hollande": "François Hollande",
};

async function main() {
  // Load candidates from data file
  const { candidates } = await import("../src/data/candidates");
  const startTime = Date.now();

  if (!fs.existsSync(COLLECTED_DIR)) fs.mkdirSync(COLLECTED_DIR, { recursive: true });

  console.log(`\n📋 Scraping programmes — ${candidates.filter((c) => c.programUrl).length} with URLs, ${candidates.length} total`);
  console.log("=".repeat(60));

  interface Result {
    url: string | undefined;
    proposals: string[];
    method: string;
    error?: string;
  }
  const results: Record<string, Result> = {};

  const toProcess = [...candidates];
  let i = 0;

  async function processNext(): Promise<void> {
    if (i >= toProcess.length) return;
    const c = toProcess[i++];
    const adapter = adapters[c.id];
    const name = candidateNames[c.id] || c.name;

    process.stdout.write(`  ${(i + "/" + toProcess.length).padStart(7)} ${name.padEnd(28)} `);

    try {
      if (adapter && c.programUrl) {
        const proposals = await adapter(c.programUrl);
        results[c.id] = { url: c.programUrl, proposals, method: "custom" };
        console.log(`${proposals.length} proposals`.padStart(10));
      } else if (adapter && !c.programUrl) {
        const proposals = await adapter("");
        results[c.id] = { url: undefined, proposals, method: "search" };
        console.log(`${proposals.length} proposals (search)`.padStart(10));
      } else if (c.programUrl) {
        // Generic fallback
        const page = await fetchPage(c.programUrl);
        if (page) {
          const proposals = extractSections(page.text, [
            "programme", "propos", "mesure", "réforme",
            "voulons", "proposons", "engag", "création",
          ]);
          results[c.id] = { url: c.programUrl, proposals, method: "generic" };
          console.log(`${proposals.length} proposals`.padStart(10));
        } else {
          results[c.id] = { url: c.programUrl, proposals: [], method: "generic", error: "fetch failed" };
          console.log("FETCH FAILED".padStart(10));
        }
      } else {
        results[c.id] = { url: undefined, proposals: [], method: "none" };
        console.log("no URL".padStart(10));
      }
    } catch (err) {
      const method = typeof adapter === "function" ? "custom" : "generic";
      results[c.id] = { url: c.programUrl, proposals: [], method, error: (err as Error).message };
      log(`${c.id}: ${(err as Error).message}`);
      console.log("ERROR".padStart(10));
    }

    process.nextTick(processNext);
  }

  // Process with limited concurrency
  const workers = Array.from({ length: MAX_CONCURRENCY }, () => processNext());
  await Promise.all(workers);

  // Save results
  const outputPath = path.join(COLLECTED_DIR, "programs-scraped.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 Saved: ${outputPath}`);

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const total = Object.values(results).reduce((s, r) => s + r.proposals.length, 0);
  const totalCustom = Object.values(results).filter((r) => r.method === "custom").length;
  const totalSearch = Object.values(results).filter((r) => r.method === "search").length;

  console.log(`\n✅ Done in ${elapsed}s — ${total} proposals from ${candidates.length} candidates`);
  console.log(`   Custom adapters: ${totalCustom} | Search fallback: ${totalSearch} | Generic: ${Object.values(results).filter((r) => r.method === "generic").length}`);
}

main().catch((err) => {
  log(`FATAL: ${err.message}`);
  process.exit(1);
});
