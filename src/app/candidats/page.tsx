import { candidates } from "@/data/candidates";
import { articles } from "@/data/articles";
import Link from "next/link";

const statusLabels: Record<string, string> = {
  declared: "Déclaré",
  primary: "Primaire",
  designated: "Désigné",
  possible: "Possible",
};

const statusColors: Record<string, string> = {
  declared: "bg-blue-100 text-blue-700",
  primary: "bg-amber-100 text-amber-700",
  designated: "bg-green-100 text-green-700",
  possible: "bg-zinc-100 text-zinc-500",
};

function getCandidateArticles(candidateName: string) {
  const nameParts = candidateName.toLowerCase().split(" ");
  return articles.filter((a) =>
    nameParts.some((part) => part.length > 3 && a.title.toLowerCase().includes(part)),
  );
}

export default function CandidatsPage() {
  const sorted = [...candidates].sort((a, b) => {
    const order = ["declared", "designated", "primary", "possible"];
    return order.indexOf(a.status) - order.indexOf(b.status);
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Candidats <span className="text-elyz-blue">2027</span>
        </h1>
        <p className="mt-2 text-zinc-500">
          {candidates.filter((c) => c.status !== "possible").length} candidats
          déclarés · {candidates.filter((c) => c.status === "possible").length}{" "}
          candidats possibles
        </p>
      </div>

      <div className="space-y-8">
        {sorted.map((candidate) => {
          const candidateArticles = getCandidateArticles(candidate.name);
          return (
            <div
              key={candidate.id}
              className="rounded-xl border border-zinc-200 bg-white shadow-sm"
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
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                      style={{
                        backgroundColor: candidate.color + "18",
                        color: candidate.color,
                      }}
                    >
                      {candidate.partyShort}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[candidate.status]}`}
                    >
                      {statusLabels[candidate.status]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {candidate.description}
                  </p>

                  {candidate.mandates && candidate.mandates.length > 0 && (
                    <div className="mt-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                        Mandats
                      </h3>
                      <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                        {candidate.mandates.map((m) => (
                          <li
                            key={m}
                            className="text-sm text-zinc-500 before:mr-2 before:text-zinc-300 before:content-['·']"
                          >
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {candidateArticles.length > 0 && (
                    <div className="mt-3">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                        Actualités liées
                      </h3>
                      <ul className="mt-1 space-y-1">
                        {candidateArticles.slice(0, 3).map((a) => (
                          <li key={a.id}>
                            <Link
                              href={a.url}
                              className="text-sm text-elyz-blue underline underline-offset-2 hover:text-blue-800"
                            >
                              {a.source} &mdash; {a.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
