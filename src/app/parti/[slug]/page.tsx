import { parties } from "@/data/parties";
import { candidates } from "@/data/candidates";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PartyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const party = Object.values(parties).find(
    (p) => p.id === slug || p.shortName.toLowerCase() === slug.toLowerCase(),
  );

  if (!party) notFound();

  const partyCandidates = candidates.filter(
    (c) => c.partyShort.toLowerCase() === party.shortName.toLowerCase(),
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
        style={{ borderTop: `5px solid ${party.color}` }}
      >
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          {party.logo ? (
            <img
              src={party.logo}
              alt={party.name}
              className="h-24 w-24 flex-shrink-0 rounded-xl border border-zinc-100 object-contain p-2"
            />
          ) : (
            <div
              className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-xl text-3xl font-bold text-white"
              style={{ backgroundColor: party.color }}
            >
              {party.shortName}
            </div>
          )}
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-zinc-900">{party.name}</h1>
            <div className="mt-1 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span
                className="rounded-full px-3 py-0.5 text-sm font-medium"
                style={{
                  backgroundColor: party.color + "18",
                  color: party.color,
                }}
              >
                {party.shortName}
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-0.5 text-sm text-zinc-500">
                {party.position}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Description
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {party.description}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Historique
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              {party.history}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Fondation
              </h2>
              <p className="mt-1 text-sm text-zinc-700">{party.founded}</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Leader
              </h2>
              <p className="mt-1 text-sm text-zinc-700">{party.leader}</p>
            </div>
          </div>
        </div>

        {partyCandidates.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-400">
              Candidats liés
            </h2>
            <ul className="mt-3 space-y-2">
              {partyCandidates.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/candidats/${c.id}`}
                    className="flex items-center gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50"
                  >
                    {c.photo ? (
                      <img
                        src={c.photo}
                        alt={c.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-zinc-900 hover:text-elyz-blue hover:underline">
                        {c.name}
                      </p>
                      <p className="text-xs text-zinc-400">{c.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
