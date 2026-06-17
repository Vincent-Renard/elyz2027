"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/locale";

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

interface CollectionReport {
  collectedAt: string;
  total: number;
  articles: CollectedArticle[];
}

const categoryColors: Record<string, string> = {
  sondage: "#0891b2",
  candidature: "#e11d48",
  calendrier: "#7c3aed",
  judiciaire: "#dc2626",
  programme: "#16a34a",
  meeting: "#f59e0b",
  media: "#2563eb",
  discours: "#9333ea",
  interne: "#a855f7",
  analyse: "#6b7280",
};

export default function VeillePage() {
  const { t } = useLocale();
  const [data, setData] = useState<CollectionReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterCat, setFilterCat] = useState<string | null>(null);
  const [filterName, setFilterName] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/collected")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center text-zinc-400">
        {t("media.loading")}
      </div>
    );
  }

  if (!data || data.articles.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h1 className="mb-4 text-3xl font-bold text-zinc-900">{t("media.title")}</h1>
        <p className="text-zinc-500">{t("media.none")} <code className="rounded bg-zinc-100 px-2 py-0.5 text-sm">npm run media:fetch</code>.</p>
      </div>
    );
  }

  const allNames = [...new Set(data.articles.flatMap((a) => a.mentions))].sort();
  const cats = [...new Set(data.articles.map((a) => a.category))];

  const filtered = data.articles.filter((a) => {
    if (filterCat && a.category !== filterCat) return false;
    if (filterName && !a.mentions.includes(filterName)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {t("media.title")}
        </h1>
        <p className="mt-2 text-zinc-500">
          {data.total} {t("media.subtitle")} {new Date(data.collectedAt).toLocaleDateString("fr-FR")}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button onClick={() => { setFilterCat(null); setFilterName(null); }}
          className="rounded-full px-3 py-1 text-xs font-medium transition-all"
          style={{ backgroundColor: !filterCat && !filterName ? "#2563eb" : "#e4e4e7", color: !filterCat && !filterName ? "#fff" : "#52525b" }}>
          {t("media.all")}
        </button>
        {cats.map((c) => {
          const color = categoryColors[c] ?? "#6b7280";
          return (
            <button key={c} onClick={() => setFilterCat(filterCat === c ? null : c)}
              className="rounded-full px-3 py-1 text-xs font-medium transition-all"
              style={{
                backgroundColor: filterCat === c ? color : `${color}18`,
                color: filterCat === c ? "#fff" : color,
                border: `1px solid ${color}40`,
              }}>
              {t(`media.${c}`) || c}
            </button>
          );
        })}
      </div>

      {allNames.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-1.5">
          <span className="mr-1 self-center text-[11px] font-medium text-zinc-400">Filtrer par candidat:</span>
          {allNames.map((n) => (
            <button key={n} onClick={() => setFilterName(filterName === n ? null : n)}
              className="rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all"
              style={{ backgroundColor: filterName === n ? "#2563eb" : "#f4f4f5", color: filterName === n ? "#fff" : "#52525b" }}>
              {n}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4">
        {filtered.map((a) => {
          const catColor = categoryColors[a.category] ?? "#6b7280";
          return (
            <a key={a.id} href={a.url} target="_blank" rel="noopener noreferrer"
              className="block rounded-xl border border-zinc-200 bg-white p-5 transition-all hover:border-blue-200 hover:shadow-sm"
              style={{ borderLeft: `4px solid ${catColor}` }}>
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                  {a.source}
                </span>
                <span className="text-[11px] text-zinc-400">{a.date}</span>
                <span
                  className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium"
                  style={{
                    backgroundColor: `${catColor}18`,
                    color: catColor,
                  }}>
                  {t(`media.${a.category}`) || a.category}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-zinc-800">{a.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">{a.summary}</p>
              {a.mentions && a.mentions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {a.mentions.map((m) => (
                    <span key={m} className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-600">
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
