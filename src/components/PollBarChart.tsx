import { polls } from "@/data/polls";

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
              .map((candidate) => (
                <li key={candidate.name} className="flex items-center gap-3">
                  <span className="w-36 truncate text-right text-sm font-medium text-zinc-700">
                    {candidate.name}
                  </span>
                  <span className="w-8 text-right text-xs font-semibold text-zinc-500">
                    {candidate.score}%
                  </span>
                  <div className="h-5 flex-1 rounded-full bg-zinc-100">
                    <div
                      className="h-5 rounded-full transition-all"
                      style={{
                        width: `${(candidate.score / maxScore) * 100}%`,
                        backgroundColor: candidate.color,
                      }}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
