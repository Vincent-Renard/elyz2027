"use client";

import { useState } from "react";
import type { AgendaEvent } from "@/data/agenda";

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const typeLabels = {
  meeting: { label: "Meeting", class: "bg-amber-100 text-amber-700" },
  conference: { label: "Conférence", class: "bg-purple-100 text-purple-700" },
  media: { label: "Média", class: "bg-blue-100 text-blue-700" },
};

export default function AgendaSection({ events }: { events: AgendaEvent[] }) {
  const [hidePast, setHidePast] = useState(false);
  const today = new Date();

  const filtered = hidePast
    ? events.filter((e) => new Date(e.date) >= today)
    : events;

  if (events.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
          Agenda
        </h2>
        <button
          onClick={() => setHidePast(!hidePast)}
          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
            hidePast ? "bg-elyz-blue" : "bg-zinc-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
              hidePast ? "translate-x-4" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
      {hidePast && (
        <p className="mt-1 text-[11px] text-zinc-400">
          Masquer les événements passés
        </p>
      )}

      <ul className="mt-3 space-y-3">
        {filtered.map((e) => {
          const t = typeLabels[e.type];
          const isPast = new Date(e.date) < today;
          return (
            <li
              key={e.id}
              className={`rounded-lg border border-zinc-100 p-4 ${isPast ? "opacity-50" : ""}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${t.class}`}>
                  {t.label}
                </span>
                <span className={`text-xs ${isPast ? "text-zinc-300" : "text-zinc-400"}`}>
                  {formatDate(e.date)}
                </span>
              </div>
              <p className="mt-1 text-sm font-medium text-zinc-900">{e.label}</p>
              <p className="mt-0.5 text-xs text-zinc-500">{e.description}</p>
              {e.location && (
                <p className="mt-1 text-xs text-zinc-400">📍 {e.location}</p>
              )}
              {e.url && (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-xs text-elyz-blue underline underline-offset-2"
                >
                  En savoir plus
                </a>
              )}
            </li>
          );
        })}
      </ul>

      {hidePast && filtered.length === 0 && (
        <p className="mt-3 text-sm italic text-zinc-400">
          Aucun événement à venir.
        </p>
      )}
    </div>
  );
}
