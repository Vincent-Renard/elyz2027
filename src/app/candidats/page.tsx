"use client";

import { useState } from "react";
import { candidates } from "@/data/candidates";
import Link from "next/link";
import { useLocale } from "@/lib/locale";

const statusLabels: Record<string, string> = {
  declared: "candidates.statusDeclared",
  primary: "candidates.statusPrimary",
  designated: "candidates.statusDesignated",
  possible: "candidates.statusPossible",
};

const statusColors: Record<string, string> = {
  declared: "bg-blue-100 text-blue-700",
  primary: "bg-amber-100 text-amber-700",
  designated: "bg-green-100 text-green-700",
  possible: "bg-zinc-100 text-zinc-500",
};

const filterOrder = ["all", "declared", "designated", "primary", "possible"] as const;
type Filter = (typeof filterOrder)[number];

const filterLabels: Record<Filter, string> = {
  all: "candidates.all",
  declared: "candidates.declared",
  designated: "candidates.designated",
  primary: "candidates.primary",
  possible: "candidates.possible",
};

const filterDescriptions: Record<Filter, string> = {
  all: "",
  declared: "candidates.filterDeclared",
  designated: "candidates.filterDesignated",
  primary: "candidates.filterPrimary",
  possible: "candidates.filterPossible",
};

export default function CandidatsPage() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const sorted = [...candidates].sort((a, b) => {
    const order = ["declared", "designated", "primary", "possible"];
    return order.indexOf(a.status) - order.indexOf(b.status);
  });

  const filtered =
    filter === "all" ? sorted : sorted.filter((c) => c.status === filter);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {t("candidates.title")}
        </h1>
        <p className="mt-2 text-zinc-500">
          {candidates.filter((c) => c.status !== "possible").length}{" "}
          {t("candidates.declared").toLowerCase()} ·{" "}
          {candidates.filter((c) => c.status === "possible").length}{" "}
          {t("candidates.possible").toLowerCase()}
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filterOrder.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === f
                ? "bg-elyz-blue text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {t(filterLabels[f])}
            {f !== "all" && (
              <span className="ml-1 opacity-70">
                ({candidates.filter((c) => c.status === f).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filter !== "all" && (
        <p className="-mt-4 mb-8 text-center text-sm text-zinc-400">
          {t(filterDescriptions[filter])}
        </p>
      )}

      <div className="space-y-8">
        {filtered.length === 0 && (
          <p className="py-12 text-center text-zinc-400">
            {t("candidates.none")}
          </p>
        )}
        {filtered.map((candidate) => (
            <div
              key={candidate.id}
              className="rounded-xl border border-zinc-200 bg-white shadow-sm"
              style={{ borderLeft: `5px solid ${candidate.color}` }}
            >
              <div className="flex flex-col gap-6 p-6 sm:flex-row">
                <Link
                  href={`/candidats/${candidate.id}`}
                  className="flex-shrink-0"
                >
                  {candidate.photo ? (
                    <img
                      src={candidate.photo}
                      alt={candidate.name}
                      className="h-32 w-32 rounded-full border-2 object-cover transition-opacity hover:opacity-80"
                      style={{ borderColor: candidate.color }}
                    />
                  ) : (
                    <div
                      className="flex h-32 w-32 items-center justify-center rounded-full text-2xl font-bold text-white"
                      style={{ backgroundColor: candidate.color }}
                    >
                      {candidate.name.charAt(0)}
                    </div>
                  )}
                </Link>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="text-xl font-bold">
                      <Link
                        href={`/candidats/${candidate.id}`}
                        className="text-zinc-900 hover:text-elyz-blue hover:underline"
                      >
                        {candidate.name}
                      </Link>
                    </h2>
                    <Link
                      href={`/parti/${candidate.partyShort.toLowerCase()}`}
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium transition-opacity hover:opacity-80"
                      style={{
                        backgroundColor: candidate.color + "18",
                        color: candidate.color,
                      }}
                    >
                      {candidate.partyShort}
                    </Link>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[candidate.status]}`}
                    >
                      {t(statusLabels[candidate.status])}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {candidate.description}
                  </p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
