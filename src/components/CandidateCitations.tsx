"use client";

import { useState, useEffect } from "react";

interface CollectedArticle {
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
  category: string;
}

export default function CandidateCitations({ candidateName, nameParts }: { candidateName: string; nameParts: string[] }) {
  const [citations, setCitations] = useState<{ text: string; article: CollectedArticle }[]>([]);

  useEffect(() => {
    fetch("/api/collected")
      .then((r) => r.json())
      .then((data) => {
        const arts: CollectedArticle[] = data.articles ?? [];
        const found: typeof citations = [];

        for (const a of arts) {
          const mentions = nameParts.some((part) =>
            part.length > 2 && (a.title + " " + a.summary).toLowerCase().includes(part),
          );
          if (!mentions) continue;

          // Extract quoted text from summary
          const quoteRegex = /[«""][^»""]{20,250}[»""]/g;
          const quotes = a.summary.match(quoteRegex);
          if (quotes) {
            for (const q of quotes) {
              // Only keep quotes mentioning the candidate
              if (nameParts.some((p) => p.length > 2 && q.toLowerCase().includes(p))) continue;
              found.push({ text: q, article: a });
            }
          } else {
            // No direct quote: look for indirect attribution
            const indirectRegex = new RegExp(
              `(${nameParts.filter((p) => p.length > 3).join("|")})\\s*[a estimé|a déclaré|a jugé|a affirmé|a promis|a lancé|a insisté|a prévenu|appelle|plaide|souhaite|veut|propose]\\s*[^.]{40,200}\\.`,
              "i",
            );
            const indirectMatch = a.summary.match(indirectRegex);
            if (indirectMatch) {
              found.push({ text: indirectMatch[0].trim(), article: a });
            }
          }

          // Limit to avoid excessive results
          if (found.length >= 8) break;
        }

        setCitations(found.slice(0, 8));
      })
      .catch(() => {});
  }, [candidateName, nameParts]);

  if (citations.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
        Déclarations & Citations
      </h2>
      <div className="mt-3 space-y-3">
        {citations.map((c, i) => (
          <a
            key={i}
            href={c.article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border border-zinc-100 bg-white p-4 transition-colors hover:bg-zinc-50"
          >
            <p className="text-sm italic leading-relaxed text-zinc-700 before:content-['«'] after:content-['»']">
              {c.text}
            </p>
            <p className="mt-1.5 text-[11px] text-zinc-400">
              {c.article.source} · {c.article.date}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
