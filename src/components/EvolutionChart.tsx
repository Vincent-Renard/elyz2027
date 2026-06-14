import { polls } from "@/data/polls";
import { parties } from "@/data/parties";

function partyColor(short: string) {
  return Object.values(parties).find((p) => p.shortName === short)?.color ?? "#6b7280";
}

function shortDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d}/${m}`;
}

type CandidateRow = {
  name: string;
  partyShort: string;
  color: string;
  scores: { pollId: string; date: string; score: number }[];
};

export default function EvolutionChart() {
  const maxScore = Math.max(...polls.flatMap((p) => p.candidates.map((c) => c.score)));

  const candidateMap = new Map<string, CandidateRow>();

  for (const poll of polls) {
    for (const pc of poll.candidates) {
      if (!candidateMap.has(pc.name)) {
        candidateMap.set(pc.name, {
          name: pc.name,
          partyShort: pc.partyShort,
          color: partyColor(pc.partyShort) || pc.color,
          scores: [],
        });
      }
      candidateMap.get(pc.name)!.scores.push({
        pollId: poll.id,
        date: poll.date,
        score: pc.score,
      });
    }
  }

  const sorted = [...candidateMap.entries()]
    .map(([, row]) => ({
      ...row,
      avgScore: row.scores.reduce((s, p) => s + p.score, 0) / row.scores.length,
    }))
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 6);

  const pollLabels = polls.map((p) => ({ id: p.id, date: shortDate(p.date), source: p.source }));
  const chartW = 600;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-zinc-900">
        Évolution par candidat
      </h2>
      <p className="mb-6 text-sm text-zinc-500">
        Scores des principaux candidats dans chaque sondage.
      </p>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartW} ${sorted.length * 48 + 40}`} className="w-full max-w-[600px]">
          {sorted.map((c, ci) => {
            const y = ci * 48 + 24;
            const dots: number[] = [];
            return (
              <g key={c.name}>
                {c.scores.map((s, si) => {
                  const pi = polls.findIndex((p) => p.id === s.pollId);
                  if (pi === -1) return null;
                  const x = (pi / (polls.length - 1 || 1)) * (chartW - 120) + 120;
                  dots.push(x);
                  return (
                    <g key={s.pollId}>
                      <circle cx={x} cy={y} r={5} fill={c.color} stroke="white" strokeWidth={2} />
                      <text x={x} y={y - 12} textAnchor="middle" className="text-[10px] fill-zinc-500">
                        {s.score}%
                      </text>
                    </g>
                  );
                })}
                {dots.length > 1 && (
                  <polyline
                    points={dots.map((x) => `${x},${y}`).join(" ")}
                    fill="none"
                    stroke={c.color}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    opacity={0.5}
                  />
                )}
                <text x={10} y={y + 4} className="text-xs fill-zinc-700 font-medium">
                  {c.name}
                </text>
                <circle cx={114} cy={y} r={4} fill={c.color} />
              </g>
            );
          })}

          {pollLabels.map((p, i) => {
            const x = (i / (polls.length - 1 || 1)) * (chartW - 120) + 120;
            return (
              <g key={p.id}>
                <text x={x} y={sorted.length * 48 + 20} textAnchor="middle" className="text-[10px] fill-zinc-400">
                  {p.date}
                </text>
                <text x={x} y={sorted.length * 48 + 34} textAnchor="middle" className="text-[9px] fill-zinc-300">
                  {p.source.split("/")[0].trim()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
