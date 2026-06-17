"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { candidates } from "@/data/candidates";
import { articles } from "@/data/articles";
import { polls } from "@/data/polls";
import { agendaEvents } from "@/data/agenda";
import AgendaSection from "@/components/AgendaSection";
import ProgramSection from "@/components/ProgramSection";
import ProgramEnrichment from "@/components/ProgramEnrichment";
import SocialMediaSection from "@/components/SocialMediaSection";
import CampaignTeamSection from "@/components/CampaignTeamSection";
import CandidateCitations from "@/components/CandidateCitations";
import { useLocale } from "@/lib/locale";

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
}

export default function CandidatePage() {
  const { t } = useLocale();
  const params = useParams();
  const slug = params.slug as string;

  const [collectedArticles, setCollectedArticles] = useState<CollectedArticle[]>([]);
  const [agendaHints, setAgendaHints] = useState<AgendaHint[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [artRes, agRes] = await Promise.all([
          fetch("/api/collected"),
          fetch(`/api/agenda-hints?candidateId=${slug}`),
        ]);
        const artData = await artRes.json();
        const agData = await agRes.json();

        const candidate = candidates.find((c) => c.id === slug);
        const nameParts = candidate?.name.toLowerCase().split(" ") ?? [];

        const filtered = (artData.articles ?? []).filter((a: CollectedArticle) =>
          a.mentions?.some((m: string) =>
            nameParts.some((part) => m.toLowerCase().includes(part)),
          ),
        );

        setCollectedArticles(filtered);
        setAgendaHints(agData.hints ?? []);
      } catch {}
    };
    load();
  }, [slug]);

  const candidate = candidates.find((c) => c.id === slug);
  if (!candidate) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 text-center">
        <h1 className="text-xl font-bold text-zinc-900">Candidat introuvable</h1>
        <Link href="/candidats" className="mt-4 inline-block text-sm text-elyz-blue underline">Retour aux candidats</Link>
      </div>
    );
  }

  const nameParts = candidate.name.toLowerCase().split(" ");
  const staticArticles = articles.filter((a) =>
    nameParts.some((part) => part.length > 3 && a.title.toLowerCase().includes(part)),
  );

  const candidatePolls = polls
    .map((p) => {
      const pc = p.candidates.find(
        (c) => c.name.toLowerCase().includes(candidate.name.split(" ")[0].toLowerCase()),
      );
      return pc ? { source: p.source, date: p.date, score: pc.score } : null;
    })
    .filter(Boolean);

  const maxScore = candidatePolls.length > 0 ? Math.max(...candidatePolls.map((p) => p!.score)) : 0;

  const candidateAgenda = agendaEvents
    .filter((e) => e.candidateId === candidate.id)
    .sort((a, b) => a.date.localeCompare(b.date));

  const mediaArticles = collectedArticles.filter((a) => a.category === "media" || a.category === "discours");

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/candidats" className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux candidats
      </Link>

      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm" style={{ borderTop: `5px solid ${candidate.color}` }}>
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {candidate.photo ? (
            <img src={candidate.photo} alt={candidate.name} className="h-40 w-40 flex-shrink-0 rounded-full border-4 object-cover" style={{ borderColor: candidate.color }} />
          ) : (
            <div className="flex h-40 w-40 flex-shrink-0 items-center justify-center rounded-full text-4xl font-bold text-white" style={{ backgroundColor: candidate.color }}>
              {candidate.name.charAt(0)}
            </div>
          )}

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-zinc-900">{candidate.name}</h1>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Link href={`/parti/${candidate.partyShort.toLowerCase()}`}
                className="rounded-full px-3 py-1 text-sm font-medium transition-opacity hover:opacity-80"
                style={{ backgroundColor: candidate.color + "18", color: candidate.color }}>
                {candidate.party} ({candidate.partyShort})
              </Link>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-500">
                {t(`candidates.status${candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}`)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">{candidate.description}</p>
            {candidate.announcedDate && (
              <p className="mt-2 text-sm text-zinc-400">Candidature annoncée le {formatDate(candidate.announcedDate)}</p>
            )}
          </div>
        </div>

        <SocialMediaSection socialMedia={candidate.socialMedia} />
        <CampaignTeamSection team={candidate.campaignTeam} />
        <CandidateCitations
          candidateName={candidate.name}
          nameParts={candidate.name.toLowerCase().split(" ")}
        />

        {/* Mandats */}
        {candidate.mandates && candidate.mandates.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{t("candidate.mandates")}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {candidate.mandates.map((m) => (
                <li key={m} className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">{m}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Historique */}
        {candidate.previousElections && candidate.previousElections.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{t("candidate.previousElections")}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {candidate.previousElections.map((e, i) => (
                <li key={i} className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                  <span className="font-semibold">{e.year}</span> — {e.round} tour — <span className="font-bold text-zinc-900">{e.score}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sondages */}
        {candidatePolls.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{t("candidate.polls")}</h2>
            <div className="mt-3 space-y-2">
              {candidatePolls.map((p) => {
                const w = maxScore > 0 ? (p!.score / maxScore) * 100 : 0;
                return (
                  <div key={p!.date + p!.source} className="flex items-center gap-3">
                    <span className="w-8 flex-shrink-0 text-right text-xs font-semibold text-zinc-500">{p!.score}%</span>
                    <div className="h-4 flex-1 rounded-full bg-zinc-100">
                      <div className="h-4 rounded-full transition-all" style={{ width: `${w}%`, backgroundColor: candidate.color }} />
                    </div>
                    <span className="w-28 text-right text-[10px] text-zinc-400">{p!.source.split("/")[0].trim()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Médias et discours */}
        {mediaArticles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{t("candidate.articles")}</h2>
            <ul className="mt-3 space-y-3">
              {mediaArticles.slice(0, 5).map((a) => (
                <li key={a.id}>
                  <a href={a.url} className="block rounded-lg border border-zinc-100 p-4 transition-colors hover:bg-zinc-50">
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">{a.source} · {a.date} · {t(`media.${a.category}`)}</span>
                    <p className="mt-1 text-sm font-medium text-elyz-blue underline underline-offset-2">{a.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{a.summary}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Agenda dynamique */}
        {agendaHints.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">{t("candidate.agenda")}</h2>
            <ul className="mt-3 space-y-3">
              {agendaHints.slice(0, 5).map((h, i) => {
                const typeMap: Record<string, string> = { meeting: "Meeting", conference: "Conférence", media: "Média", declaration: "Déplacement" };
                return (
                  <li key={i} className="rounded-lg border border-zinc-100 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-amber-700">{typeMap[h.type] ?? h.type}</span>
                      <span className="text-xs text-zinc-400">{h.date}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium text-zinc-900">{h.label}</p>
                    {h.description && <p className="mt-0.5 text-xs text-zinc-500">{h.description}</p>}
                    <span className="mt-1 inline-block text-[11px] text-zinc-400">Source: {h.source}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {/* Agenda statique */}
        <AgendaSection events={candidateAgenda} />

        {/* Actualités */}
        {staticArticles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">Actualités</h2>
            <ul className="mt-3 space-y-3">
              {staticArticles.map((a) => (
                <li key={a.id}>
                  <a href={a.url} className="block rounded-lg border border-zinc-100 p-4 transition-colors hover:bg-zinc-50">
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">{a.source} · {formatDate(a.date)}</span>
                    <p className="mt-1 text-sm font-medium text-elyz-blue underline underline-offset-2">{a.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{a.summary}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ProgramSection candidateId={candidate.id} programUrl={candidate.programUrl} />
        <ProgramEnrichment candidateId={candidate.id} />

        <p className="mt-8 text-xs text-zinc-400">
          Source : <a href={candidate.source} className="underline underline-offset-2 hover:text-elyz-blue">{candidate.source}</a>
        </p>
      </div>
    </div>
  );
}
