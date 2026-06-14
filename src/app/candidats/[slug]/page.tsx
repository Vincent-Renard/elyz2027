import { candidates } from "@/data/candidates";
import { articles } from "@/data/articles";
import Link from "next/link";
import { notFound } from "next/navigation";

const statusLabels: Record<string, string> = {
  declared: "Déclaré",
  primary: "Primaire",
  designated: "Désigné",
  possible: "Possible",
};

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function CandidatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const candidate = candidates.find((c) => c.id === slug);

  if (!candidate) notFound();

  const nameParts = candidate.name.toLowerCase().split(" ");
  const candidateArticles = articles.filter((a) =>
    nameParts.some((part) => part.length > 3 && a.title.toLowerCase().includes(part)),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/candidats"
        className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Retour aux candidats
      </Link>

      <div
        className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm"
        style={{ borderTop: `5px solid ${candidate.color}` }}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          {candidate.photo ? (
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="h-40 w-40 flex-shrink-0 rounded-full border-4 object-cover"
              style={{ borderColor: candidate.color }}
            />
          ) : (
            <div
              className="flex h-40 w-40 flex-shrink-0 items-center justify-center rounded-full text-4xl font-bold text-white"
              style={{ backgroundColor: candidate.color }}
            >
              {candidate.name.charAt(0)}
            </div>
          )}

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-zinc-900">
              {candidate.name}
            </h1>
            <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Link
                href={`/parti/${candidate.partyShort.toLowerCase()}`}
                className="rounded-full px-3 py-1 text-sm font-medium transition-opacity hover:opacity-80"
                style={{
                  backgroundColor: candidate.color + "18",
                  color: candidate.color,
                }}
              >
                {candidate.party} ({candidate.partyShort})
              </Link>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-500">
                {statusLabels[candidate.status]}
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              {candidate.description}
            </p>

            {candidate.announcedDate && (
              <p className="mt-2 text-sm text-zinc-400">
                Candidature annoncée le {formatDate(candidate.announcedDate)}
              </p>
            )}
          </div>
        </div>

        {candidate.mandates && candidate.mandates.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Mandats
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {candidate.mandates.map((m) => (
                <li
                  key={m}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
                >
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}

        {candidate.previousElections && candidate.previousElections.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Historique présidentielle
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {candidate.previousElections.map((e, i) => (
                <li
                  key={i}
                  className="rounded-lg border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
                >
                  <span className="font-semibold">{e.year}</span> —{" "}
                  {e.round} tour —{" "}
                  <span className="font-bold text-zinc-900">{e.score}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {candidateArticles.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Actualités
            </h2>
            <ul className="mt-3 space-y-3">
              {candidateArticles.map((a) => (
                <li key={a.id}>
                  <a
                    href={a.url}
                    className="block rounded-lg border border-zinc-100 p-4 transition-colors hover:bg-zinc-50"
                  >
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-400">
                      {a.source} · {formatDate(a.date)}
                    </span>
                    <p className="mt-1 text-sm font-medium text-elyz-blue underline underline-offset-2">
                      {a.title}
                    </p>
                    <p className="mt-1 text-sm text-zinc-500">{a.summary}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="mt-8 text-xs text-zinc-400">
          Source :{" "}
          <a href={candidate.source} className="underline underline-offset-2 hover:text-elyz-blue">
            {candidate.source}
          </a>
        </p>
      </div>
    </div>
  );
}
