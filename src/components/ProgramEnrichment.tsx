"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/locale";

interface ScrapedProgram {
  url: string;
  proposals: string[];
}

export default function ProgramEnrichment({ candidateId }: { candidateId: string }) {
  const { t } = useLocale();
  const [data, setData] = useState<ScrapedProgram | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(`/api/programs?candidateId=${candidateId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.proposals?.length > 0) setData(d);
      })
      .catch(() => {});
  }, [candidateId]);

  if (!data || data.proposals.length === 0) return null;

  const filtered = query.trim()
    ? data.proposals.filter((p) => p.toLowerCase().includes(query.toLowerCase()))
    : data.proposals;

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
        {t("candidate.program")}
        <span className="ml-1.5 text-[10px] font-normal text-zinc-400">
          (scrapé du site de campagne)
        </span>
      </h2>

      <div className="relative mt-3">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t("candidate.searchProgram")}
          className="w-full rounded-lg border border-zinc-200 py-2 pl-10 pr-4 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-colors focus:border-elyz-blue focus:ring-1 focus:ring-elyz-blue"
        />
      </div>

      <ul className="mt-3 space-y-2">
        {filtered.map((proposal, i) => (
          <li
            key={i}
            className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
          >
            {proposal}
          </li>
        ))}
        {filtered.length === 0 && query && (
          <li className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm italic text-zinc-400">
            Aucun résultat pour &quot;{query}&quot;
          </li>
        )}
      </ul>

      {data.url && (
        <a
          href={data.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-elyz-blue px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {t("candidate.fullProgram")}
        </a>
      )}
    </div>
  );
}
