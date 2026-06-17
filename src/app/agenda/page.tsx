"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useLocale } from "@/lib/locale";
import { candidates } from "@/data/candidates";
import { agendaEvents } from "@/data/agenda";

interface AgendaHint {
  source: string;
  candidateId: string;
  candidateName: string;
  label: string;
  description: string;
  date: string;
  type: "meeting" | "conference" | "media" | "declaration";
}

interface EnrichedEvent extends AgendaHint {
  location?: string;
  channel?: string;
  venue?: string;
  url?: string;
}

const typeConfig = {
  meeting:    { color: "#f59e0b", icon: "🎤", bg: "bg-amber-50" },
  conference: { color: "#8b5cf6", icon: "🎙️", bg: "bg-purple-50" },
  media:      { color: "#2563eb", icon: "📺", bg: "bg-blue-50" },
  declaration:{ color: "#16a34a", icon: "📋", bg: "bg-emerald-50" },
} as const;

type EventType = keyof typeof typeConfig;

function formatDayName(dateStr: string, locale: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    weekday: "long",
  });
}

function formatDateLong(dateStr: string, locale: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatMonthLabel(year: number, month: number, locale: string) {
  return new Date(year, month - 1).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

function formatDayNumber(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const today = new Date();
  const isToday =
    dt.getFullYear() === today.getFullYear() &&
    dt.getMonth() === today.getMonth() &&
    dt.getDate() === today.getDate();
  return { day: d, month: m, isToday };
}

function enrichEvent(e: AgendaHint): EnrichedEvent {
  const label = e.label;
  const desc = e.description;

  // Extract location from " — X" suffix in label
  const locationMatch = label.match(/[—–-]\s*(.+)/);
  let location = locationMatch?.[1]?.trim();

  // For media, extract channel from label or description
  let channel: string | undefined;
  if (e.type === "media") {
    const channelLabel = label.replace(/^Média\s*[—–-]\s*/i, "").trim();
    if (channelLabel && channelLabel !== e.candidateName) {
      channel = channelLabel;
    }
    const channelDesc = desc.match(/(?:invité\s+(?:de|sur)\s+)(\w+\s*\w*)/i);
    if (!channel && channelDesc) channel = channelDesc[1];
  }

  // For meetings, extract venue/city from description
  let venue: string | undefined;
  if (e.type === "meeting" && desc) {
    const venueMatch = desc.match(/(?:à|au|aux|dans)\s+([A-Z][a-zéèêëàâîïôûùçÆŒ -]+?)(?:[,.]|\s+pour|\s+où|\s+devant|\s+le\s+\d)/);
    if (venueMatch) venue = venueMatch[1].trim();
  }

  // For declarations, extract destination
  if (e.type === "declaration" && desc) {
    const declMatch = desc.match(/(?:se rend|visite|déplacement)\s+(?:à|au|aux|en|dans)\s+([A-Z][a-zéèêëàâîïôûùçÆŒ -]+?)(?:[,.]|$)/i);
    if (declMatch) venue = declMatch[1].trim();
  }

  // Get URL from static event if available
  const staticEvent = agendaEvents.find(
    (se) => se.candidateId === e.candidateId && se.label === e.label,
  );

  return {
    ...e,
    location,
    channel,
    venue,
    url: staticEvent?.url ?? e.source,
  };
}

export default function AgendaPage() {
  const { t, locale } = useLocale();
  const [hints, setHints] = useState<AgendaHint[]>([]);
  const [loading, setLoading] = useState(true);
  const [hidePast, setHidePast] = useState(false);
  const [filterType, setFilterType] = useState<EventType | null>(null);
  const [showCandidateFilter, setShowCandidateFilter] = useState(false);

  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth() + 1);

  const [selectedCandidates, setSelectedCandidates] = useState<Set<string>>(
    () => new Set(candidates.map((c) => c.id)),
  );

  useEffect(() => {
    fetch("/api/agenda-hints")
      .then((r) => r.json())
      .then((d) => {
        setHints(d.hints ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const today = new Date();

  const staticEvents: AgendaHint[] = useMemo(
    () =>
      agendaEvents.map((e) => ({
        source: e.url ?? "",
        candidateId: e.candidateId,
        candidateName: candidates.find((c) => c.id === e.candidateId)?.name ?? e.candidateId,
        label: e.label,
        description: e.description,
        date: e.date,
        type: e.type === "conference" ? "conference" : e.type === "media" ? "media" : "meeting",
      })),
    [],
  );

  const all = [...staticEvents, ...hints];

  const seen = new Set<string>();
  const deduped = all.filter((e) => {
    const key = `${e.candidateId}-${e.label}-${e.date}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const enriched: EnrichedEvent[] = deduped.map(enrichEvent);

  const sorted = enriched.sort((a, b) => a.date.localeCompare(b.date));

  const filtered = sorted.filter((e) => {
    if (hidePast && new Date(e.date) < today) return false;
    if (filterType && e.type !== filterType) return false;
    if (!selectedCandidates.has(e.candidateId)) return false;
    const [y, m] = e.date.split("-").map(Number);
    if (y !== viewYear || m !== viewMonth) return false;
    return true;
  });

  const grouped = useMemo(() => {
    const groups: { date: string; events: EnrichedEvent[] }[] = [];
    for (const ev of filtered) {
      const last = groups[groups.length - 1];
      if (last && last.date === ev.date) {
        last.events.push(ev);
      } else {
        groups.push({ date: ev.date, events: [ev] });
      }
    }
    return groups;
  }, [filtered]);

  const toggleCandidate = (id: string) => {
    setSelectedCandidates((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allSelected = selectedCandidates.size === candidates.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedCandidates(new Set());
    } else {
      setSelectedCandidates(new Set(candidates.map((c) => c.id)));
    }
  };

  const prevMonth = () => {
    if (viewMonth === 1) {
      setViewYear(viewYear - 1);
      setViewMonth(12);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 12) {
      setViewYear(viewYear + 1);
      setViewMonth(1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const eventTypes: { key: EventType }[] = [
    { key: "meeting" },
    { key: "media" },
    { key: "conference" },
    { key: "declaration" },
  ];

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-12 text-center text-zinc-400">{t("media.loading")}</div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {t("agenda.title")}
        </h1>
        <p className="mt-2 text-zinc-500">{t("agenda.subtitle")}</p>
      </div>

      {/* ── Contrôles ───────────────────────────────────────── */}
      <div className="mb-8 space-y-4 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Month */}
          <div className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1">
            <button
              onClick={prevMonth}
              title={t("agenda.prevMonth")}
              className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-800"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="min-w-[140px] text-center text-sm font-semibold text-zinc-700">
              {formatMonthLabel(viewYear, viewMonth, locale)}
            </span>
            <button
              onClick={nextMonth}
              title={t("agenda.nextMonth")}
              className="flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-800"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Type pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {eventTypes.map(({ key }) => {
              const cfg = typeConfig[key];
              return (
                <button
                  key={key}
                  onClick={() => setFilterType(filterType === key ? null : key)}
                  className="rounded-full px-3 py-1 text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: filterType === key ? cfg.color : `${cfg.color}12`,
                    color: filterType === key ? "#fff" : cfg.color,
                    border: `1.5px solid ${cfg.color}40`,
                  }}
                >
                  {cfg.icon} {t(`agenda.${key}`)}
                </button>
              );
            })}
          </div>

          {/* Past toggle */}
          <button
            onClick={() => setHidePast(!hidePast)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              hidePast ? "bg-elyz-blue text-white" : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            {hidePast ? t("agenda.showPast") : t("agenda.hidePast")}
          </button>

          {/* Candidate filter toggle */}
          <button
            onClick={() => setShowCandidateFilter(!showCandidateFilter)}
            className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold transition-all ${
              showCandidateFilter
                ? "bg-elyz-blue text-white"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            }`}
          >
            {showCandidateFilter ? t("agenda.hideFilters") : t("agenda.showFilters")}
          </button>
        </div>

        {showCandidateFilter && (
          <div className="border-t border-zinc-100 pt-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                {t("agenda.candidates")}
              </span>
              <button
                onClick={toggleAll}
                className="rounded px-2 py-0.5 text-[10px] font-semibold text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
              >
                {allSelected ? t("agenda.deselectAll") : t("agenda.selectAll")}
              </button>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {candidates.map((c) => (
                <label
                  key={c.id}
                  className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-zinc-600 transition-colors hover:text-zinc-900"
                >
                  <input
                    type="checkbox"
                    checked={selectedCandidates.has(c.id)}
                    onChange={() => toggleCandidate(c.id)}
                    className="h-3.5 w-3.5 rounded border-zinc-300 accent-elyz-blue"
                  />
                  <span className="inline-block h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                  {c.name}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Timeline ────────────────────────────────────────── */}
      {grouped.length === 0 && (
        <p className="py-16 text-center text-sm text-zinc-400">
          {hidePast ? t("agenda.noFuture") : t("agenda.noEvents")}
        </p>
      )}

      <div className="relative">
        <div className="absolute left-[19px] top-0 h-full w-0.5 bg-zinc-200" />

        {grouped.map((group) => {
          const { day, month, isToday } = formatDayNumber(group.date);
          const dayName = formatDayName(group.date, locale);
          const dateLong = formatDateLong(group.date, locale);

          return (
            <div key={group.date} className="mb-8">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`relative z-10 flex h-10 w-10 flex-shrink-0 flex-col items-center justify-center rounded-xl text-xs font-bold shadow-sm ${
                    isToday ? "bg-elyz-blue text-white shadow-blue-200" : "bg-white text-zinc-700"
                  }`}
                >
                  <span>{day}</span>
                  <span className="text-[8px] uppercase leading-none opacity-70">
                    {new Date(0, month - 1).toLocaleDateString(
                      locale === "fr" ? "fr-FR" : "en-US",
                      { month: "short" },
                    )}
                  </span>
                </div>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wide ${isToday ? "text-elyz-blue" : "text-zinc-400"}`}>
                    {dayName}
                  </p>
                  <p className="text-sm text-zinc-500">{dateLong}</p>
                </div>
                {isToday && (
                  <span className="ml-auto rounded-full bg-elyz-blue/10 px-2.5 py-0.5 text-[10px] font-semibold text-elyz-blue">
                    Aujourd&apos;hui
                  </span>
                )}
              </div>

              <div className="ml-[52px] space-y-3">
                {group.events.map((ev, i) => {
                  const cfg = typeConfig[ev.type] ?? typeConfig.meeting;
                  const isPast = new Date(ev.date) < today;
                  const candidate = candidates.find((c) => c.id === ev.candidateId);
                  const linkUrl = ev.url && ev.url.startsWith("http") ? ev.url : undefined;

                  return (
                    <div
                      key={i}
                      className={`relative rounded-xl border bg-white p-4 shadow-sm transition-all ${
                        isPast ? "border-zinc-100 opacity-60" : "border-zinc-200 hover:shadow-md"
                      }`}
                      style={{ borderLeft: `4px solid ${cfg.color}` }}
                    >
                      <div
                        className="absolute -left-[37px] top-5 h-2.5 w-2.5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: cfg.color }}
                      />

                      {/* Badge type */}
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase"
                          style={{ backgroundColor: `${cfg.color}18`, color: cfg.color }}
                        >
                          {cfg.icon} {t(`agenda.${ev.type}`)}
                        </span>
                        {ev.source && (
                          <span className="text-[10px] text-zinc-400">via {ev.source}</span>
                        )}
                      </div>

                      {/* Candidate + Titre */}
                      <div className="mb-1 flex items-center gap-2">
                        {candidate && (
                          <span
                            className="inline-flex items-center gap-1 text-xs font-bold"
                            style={{ color: candidate.color }}
                          >
                            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ backgroundColor: candidate.color }} />
                            {candidate.name}
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-semibold text-zinc-800">{ev.label}</p>

                      {/* Location / Channel / Venue */}
                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
                        {ev.channel && (
                          <span className="inline-flex items-center gap-1">
                            <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {ev.channel}
                          </span>
                        )}
                        {ev.location && !ev.channel && (
                          <span className="inline-flex items-center gap-1">
                            <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {ev.location}
                          </span>
                        )}
                        {ev.venue && (
                          <span className="inline-flex items-center gap-1">
                            <svg className="h-3.5 w-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {ev.venue}
                          </span>
                        )}
                        {linkUrl && (
                          <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-elyz-blue underline underline-offset-2 hover:text-blue-700"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                            Source
                          </a>
                        )}
                      </div>

                      {/* Description */}
                      {ev.description && (
                        <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                          {ev.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
