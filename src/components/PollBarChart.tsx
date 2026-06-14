import Link from "next/link";
import { polls } from "@/data/polls";
import { candidates } from "@/data/candidates";
import { parties } from "@/data/parties";

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function normalize(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findCandidate(pollName: string) {
  const normalized = normalize(pollName);
  return candidates.find((c) => normalize(c.name) === normalized);
}

function partyColor(short: string) {
  return Object.values(parties).find(
    (p) => p.shortName === short,
  )?.color;
}

export default function PollBarChart() {
  if (polls.length === 0) {
    return (
      <p className="py-12 text-center text-zinc-500">
        Aucun sondage disponible.
      </p>
    );
  }

  const maxScore = Math.max(
    ...polls.flatMap((p) => p.candidates.map((c) => c.score)),
  );

  return (
    <div className="space-y-8">
      {polls.map((poll) => (
        <div
          key={poll.id}
          className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
        >
          <div className="mb-1 flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-zinc-900">
              {poll.source}
            </h2>
            <span className="text-sm text-zinc-400">
              n={poll.sampleSize.toLocaleString("fr-FR")}
            </span>
          </div>
          <p className="mb-4 text-sm text-zinc-500">
            {formatDate(poll.date)}
          </p>

          <ul className="space-y-2">
            {poll.candidates
              .sort((a, b) => b.score - a.score)
              .map((pc) => {
                const match = findCandidate(pc.name);
                const color = partyColor(pc.partyShort) || pc.color;
                return (
                  <li
                    key={pc.name}
                    className="flex items-center gap-3 border-l-4 pl-3"
                    style={{ borderColor: color }}
                  >
                    <Link
                      href={match ? `/candidats/${match.id}` : "#"}
                      className="w-36 truncate text-right text-sm font-medium text-zinc-700 hover:text-elyz-blue hover:underline"
                    >
                      {pc.name}
                    </Link>
                    <Link
                      href={match ? `/candidats/${match.id}` : "#"}
                      className="flex flex-shrink-0 items-center gap-2"
                    >
                      {match?.photo ? (
                        <img
                          src={match.photo}
                          alt={pc.name}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                          style={{ backgroundColor: color }}
                        >
                          {pc.name.charAt(0)}
                        </div>
                      )}
                    </Link>
                    <span className="w-8 flex-shrink-0 text-right text-xs font-semibold text-zinc-500">
                      {pc.score}%
                    </span>
                    <div className="h-5 flex-1 rounded-full bg-zinc-100">
                      <div
                        className="h-5 rounded-full transition-all"
                        style={{
                          width: `${(pc.score / maxScore) * 100}%`,
                          backgroundColor: color,
                        }}
                      />
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      ))}
    </div>
  );
}
