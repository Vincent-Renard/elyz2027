import Link from "next/link";
import { timelineEvents } from "@/data/timeline";
import { candidates } from "@/data/candidates";

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function EventIcon({
  type,
  highlight,
  candidateId,
  candidateSlug,
}: {
  type: string;
  highlight?: boolean;
  candidateId?: string;
  candidateSlug?: string;
}) {
  const candidate = candidates.find((c) => c.id === candidateId);

  if (type === "candidature" && candidate?.photo) {
    const img = (
      <div
        className={`flex-shrink-0 ${highlight ? "h-12 w-12 ring-4 ring-blue-100" : "h-10 w-10 ring-4 ring-white"} overflow-hidden rounded-full transition-opacity hover:opacity-80`}
      >
        <img
          src={candidate.photo}
          alt={candidate.name}
          className="h-full w-full object-cover"
        />
      </div>
    );

    if (candidateSlug) {
      return <Link href={`/candidats/${candidateSlug}`}>{img}</Link>;
    }
    return img;
  }

  const baseClass = highlight
    ? "h-12 w-12 ring-4 ring-blue-100"
    : "h-10 w-10 ring-4 ring-white";

  if (type === "election") {
    return (
      <div
        className={`flex ${baseClass} items-center justify-center rounded-full bg-elyz-blue text-white`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
    );
  }

  if (type === "event") {
    return (
      <div
        className={`flex ${baseClass} items-center justify-center rounded-full bg-zinc-500 text-white`}
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  const color = candidate?.color ?? "#6b7280";
  return (
    <div
      className={`flex ${baseClass} items-center justify-center rounded-full text-white`}
      style={{ backgroundColor: color }}
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    </div>
  );
}

export default function Timeline() {
  if (timelineEvents.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">
        Aucun événement à afficher pour le moment.
      </p>
    );
  }

  const reversed = [...timelineEvents].reverse();

  return (
    <div className="relative">
      <div className="absolute left-6 top-0 h-full w-0.5 bg-zinc-200" />
      <ul className="space-y-6">
        {reversed.map((event) => {
          const isElection = event.type === "election";
          const isEvent = event.type === "event";
          const isCandidate = event.type === "candidature";

          return (
            <li key={event.id} className="relative flex gap-6">
              <div className="relative z-10 flex-shrink-0">
                <EventIcon
                  type={event.type}
                  highlight={event.highlight}
                  candidateId={event.candidateId}
                  candidateSlug={event.candidateId}
                />
              </div>

              {isElection && (
                <div className="min-w-0 flex-1 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <span className="mb-1 inline-block rounded bg-elyz-blue px-2 py-0.5 text-xs font-semibold uppercase text-white">
                    Scrutin
                  </span>
                  <time className="ml-2 text-xs font-medium uppercase tracking-wide text-blue-500">
                    {formatDate(event.date)}
                  </time>
                  <h3 className="mt-1 text-base font-bold text-elyz-blue">
                    {event.label}
                  </h3>
                  <p className="mt-1 text-sm text-blue-700">
                    {event.description}
                  </p>
                </div>
              )}

              {isEvent && (
                <div className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-zinc-50 p-4">
                  <span className="mb-1 inline-block rounded bg-zinc-400 px-2 py-0.5 text-xs font-semibold uppercase text-white">
                    Événement
                  </span>
                  <time className="ml-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                    {formatDate(event.date)}
                  </time>
                  <h3 className="mt-1 text-base font-semibold text-zinc-900">
                    {event.label}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {event.description}
                  </p>
                </div>
              )}

              {isCandidate && (
                <div
                  className="min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm"
                  style={{
                    borderLeft: `4px solid ${candidates.find((c) => c.id === event.candidateId)?.color ?? "#6b7280"}`,
                  }}
                >
                  <span className="mb-1 inline-block rounded bg-zinc-100 px-2 py-0.5 text-xs font-semibold uppercase text-zinc-500">
                    Candidature
                  </span>
                  <time className="ml-2 text-xs font-medium uppercase tracking-wide text-zinc-400">
                    {formatDate(event.date)}
                  </time>
                  <h3
                    className={`mt-1 text-base font-semibold ${event.highlight ? "text-elyz-blue" : "text-zinc-900"}`}
                  >
                    <Link
                      href={`/candidats/${event.candidateId}`}
                      className="hover:text-elyz-blue hover:underline"
                    >
                      {event.label}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500">
                    {event.description}
                  </p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
