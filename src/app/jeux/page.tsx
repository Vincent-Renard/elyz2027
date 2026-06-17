"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { candidates } from "@/data/candidates";
import { getRandomQuestions } from "@/data/quiz-questions";
import { useLocale } from "@/lib/locale";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const shuffle = <T,>(a: T[]): T[] => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

// ─── Quiz data ────────────────────────────────────────────────────────────────

function buildQuiz() {
  return getRandomQuestions(12);
}

// ─── Quotes data ──────────────────────────────────────────────────────────────

interface QuoteQuestion {
  quote: string;
  answerId: string;
  options: string[];
}

function buildQuotes(): QuoteQuestion[] {
  return [
    {
      quote: "Il faut réduire l'écart entre le salaire brut et le net. Aller droit au brut.",
      answerId: "gabriel-attal",
      options: shuffle(["Gabriel Attal", "Édouard Philippe", "Bruno Retailleau", "David Lisnard"]),
    },
    {
      quote: "Je veux rendre aux Français leur argent, leur liberté et leur sécurité.",
      answerId: "bruno-retailleau",
      options: shuffle(["Bruno Retailleau", "Marine Le Pen", "Nicolas Dupont-Aignan", "Éric Zemmour"]),
    },
    {
      quote: "La planification écologique, c'est sortir des énergies fossiles et du nucléaire.",
      answerId: "jean-luc-melenchon",
      options: shuffle(["Jean-Luc Mélenchon", "Delphine Batho", "Marine Tondelier", "Clémentine Autain"]),
    },
    {
      quote: "Il faut une grande réforme fiscale qui met à contribution les très hauts patrimoines.",
      answerId: "clementine-autain",
      options: shuffle(["Clémentine Autain", "François Ruffin", "Jérôme Guedj", "Nathalie Arthaud"]),
    },
    {
      quote: "Nous devons sortir de l'euro pour restaurer notre compétitivité.",
      answerId: "francois-asselineau",
      options: shuffle(["François Asselineau", "Florian Philippot", "Nicolas Dupont-Aignan", "Anasse Kazib"]),
    },
    {
      quote: "Il faut réduire drastiquement la dépense publique et baisser les impôts.",
      answerId: "david-lisnard",
      options: shuffle(["David Lisnard", "Édouard Philippe", "Bruno Retailleau", "Gabriel Attal"]),
    },
    {
      quote: "La France a besoin d'un choc de décentralisation et de liberté.",
      answerId: "edouard-philippe",
      options: shuffle(["Édouard Philippe", "David Lisnard", "Gabriel Attal", "Bruno Retailleau"]),
    },
    {
      quote: "Salaire minimum à 2000 euros net par mois, indexé sur l'inflation.",
      answerId: "anasse-kazib",
      options: shuffle(["Anasse Kazib", "Nathalie Arthaud", "Jean-Luc Mélenchon", "François Ruffin"]),
    },
    {
      quote: "La retraite à 60 ans, c'est une question de justice sociale.",
      answerId: "clementine-autain",
      options: shuffle(["Clémentine Autain", "Jean-Luc Mélenchon", "François Ruffin", "Nathalie Arthaud"]),
    },
    {
      quote: "Il faut rétablir les frontières nationales et déployer l'armée.",
      answerId: "nicolas-dupont-aignan",
      options: shuffle(["Nicolas Dupont-Aignan", "Florian Philippot", "Marine Le Pen", "Bruno Retailleau"]),
    },
    {
      quote: "La transition écologique doit être une bifurcation, pas un simple ajustement.",
      answerId: "delphine-batho",
      options: shuffle(["Delphine Batho", "Marine Tondelier", "Jean-Luc Mélenchon", "Clémentine Autain"]),
    },
    {
      quote: "La priorité nationale doit être inscrite dans la Constitution.",
      answerId: "bruno-retailleau",
      options: shuffle(["Bruno Retailleau", "Marine Le Pen", "Éric Zemmour", "Nicolas Dupont-Aignan"]),
    },
  ];
}

// ─── Score Simulator ──────────────────────────────────────────────────────────

const topCandidates = candidates.filter((c) =>
  [
    "marine-le-pen",
    "jordan-bardella",
    "jean-luc-melenchon",
    "edouard-philippe",
    "gabriel-attal",
    "bruno-retailleau",
    "raphael-glucksmann",
    "francois-hollande",
    "eric-zemmour",
    "francois-ruffin",
    "nicolas-dupont-aignan",
  ].includes(c.id)
);

// ─── Memory Game ──────────────────────────────────────────────────────────────

interface MemoryCard {
  id: number;
  candidateId: string;
}

const memoryCandidates = candidates.filter((c) => c.photo);

// ─── Component ────────────────────────────────────────────────────────────────

type GameTab = "quiz" | "quotes" | "simulator" | "memory";

export default function JeuxPage() {
  const { t } = useLocale();
  const [tab, setTab] = useState<GameTab>("quiz");

  const tabs: { id: GameTab; label: string; emoji: string }[] = [
    { id: "quiz", label: t("games.quiz"), emoji: "🧠" },
    { id: "quotes", label: t("games.quotes"), emoji: "💬" },
    { id: "simulator", label: t("games.simulator"), emoji: "📊" },
    { id: "memory", label: t("games.memory"), emoji: "🃏" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {t("games.title")}
        </h1>
        <p className="mt-2 text-zinc-500">
          {t("games.subtitle")}
        </p>
      </div>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold transition-all"
            style={{
              backgroundColor: tab === t.id ? "#2563eb" : "transparent",
              color: tab === t.id ? "#fff" : "#52525b",
              border: tab === t.id ? "none" : "2px solid #e4e4e7",
            }}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {tab === "quiz" && <QuizGame />}
      {tab === "quotes" && <QuotesGame />}
      {tab === "simulator" && <SimulatorGame />}
      {tab === "memory" && <MemoryGame />}
    </div>
  );
}

// ─── Quiz Game ────────────────────────────────────────────────────────────────

function QuizGame() {
  const { t } = useLocale();
  const [questions] = useState(buildQuiz);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const q = questions[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === q.answer) setScore((s) => s + 1);
    setAnswers((a) => [...a, idx === q.answer]);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="mb-2 text-5xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</p>
        <p className="text-xl font-bold text-zinc-800">{score} / {questions.length}</p>
        <p className="mt-4 text-zinc-500">
          {pct >= 80 ? t("games.perfect") : pct >= 50 ? t("games.notBad") : t("games.keepTrying")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {answers.map((a, i) => (
            <span
              key={i}
              className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ backgroundColor: a ? "#16a34a" : "#dc2626" }}
            >
              {a ? "✓" : "✗"}
            </span>
          ))}
        </div>
        <button onClick={() => window.location.reload()} className="mt-6 rounded-lg bg-elyz-blue px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
          Rejouer
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-zinc-400">
        <span>Question {current + 1} / {questions.length}</span>
        <span>{t("games.score")}&nbsp;: {score}</span>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full bg-elyz-blue transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <p className="mb-6 text-lg font-semibold text-zinc-800">{q.question}</p>
        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === q.answer;
            let bg = "bg-zinc-50";
            let border = "border-zinc-200";
            if (selected !== null) {
              if (isCorrect) { bg = "bg-green-50"; border = "border-green-400"; }
              else if (isSelected) { bg = "bg-red-50"; border = "border-red-400"; }
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className={`flex w-full items-center gap-4 rounded-lg border px-5 py-3 text-left text-sm font-medium text-zinc-700 transition-all ${bg} ${border}`}
              >
                <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${selected !== null ? (isCorrect ? "bg-green-500 text-white" : isSelected ? "bg-red-500 text-white" : "bg-zinc-200 text-zinc-500") : "bg-zinc-200 text-zinc-500"}`}>
                  {selected !== null ? (isCorrect ? "✓" : isSelected ? "✗" : String.fromCharCode(65 + idx)) : String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <button onClick={next} className="mt-6 w-full rounded-lg bg-elyz-blue py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700">
            {current < questions.length - 1 ? t("games.next") : t("games.result")}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Quotes Game ──────────────────────────────────────────────────────────────

function QuotesGame() {
  const { t } = useLocale();
  const [questions] = useState(buildQuotes);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [shuffledAnswers] = useState(() => questions.map((q) => {
    const correct = candidates.find((c) => c.id === q.answerId)!;
    const others = shuffle(candidates.filter((c) => c.id !== q.answerId)).slice(0, 3);
    return shuffle([correct, ...others]);
  }));

  const q = questions[current];
  const currentOptions = shuffledAnswers[current];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    if (currentOptions[idx].id === q.answerId) setScore((s) => s + 1);
    setAnswers((a) => [...a, currentOptions[idx].id === q.answerId]);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="mb-2 text-5xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</p>
        <p className="text-xl font-bold text-zinc-800">{score} / {questions.length}</p>
        <p className="mt-4 text-zinc-500">
          {pct >= 80 ? t("games.expertQuotes") : pct >= 50 ? t("games.notBad") : t("games.readMore")}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {answers.map((a, i) => (
            <span key={i} className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: a ? "#16a34a" : "#dc2626" }}>
              {a ? "✓" : "✗"}
            </span>
          ))}
        </div>
        <button onClick={() => window.location.reload()} className="mt-6 rounded-lg bg-elyz-blue px-6 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700">
          Rejouer
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-zinc-400">
        <span>Question {current + 1} / {questions.length}</span>
        <span>{t("games.score")}&nbsp;: {score}</span>
      </div>
      <div className="mb-6 h-2 overflow-hidden rounded-full bg-zinc-100">
        <div className="h-full rounded-full bg-elyz-blue transition-all" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>
      <div className="rounded-xl border border-zinc-200 bg-white p-8 shadow-sm">
        <div className="mb-6 rounded-lg bg-zinc-50 p-6">
          <p className="text-center text-lg font-medium italic leading-relaxed text-zinc-700">
            &ldquo;{q.quote}&rdquo;
          </p>
        </div>
        <p className="mb-4 text-sm font-semibold text-zinc-500">{t("games.whoSaid")}</p>
        <div className="space-y-3">
          {currentOptions.map((c, idx) => {
            const isSelected = selected === idx;
            const isCorrect = c.id === q.answerId;
            let bg = "bg-zinc-50";
            let border = "border-zinc-200";
            if (selected !== null) {
              if (isCorrect) { bg = "bg-green-50"; border = "border-green-400"; }
              else if (isSelected) { bg = "bg-red-50"; border = "border-red-400"; }
            }
            return (
              <button
                key={c.id}
                onClick={() => handleAnswer(idx)}
                disabled={selected !== null}
                className={`flex w-full items-center gap-4 rounded-lg border px-5 py-3 text-left text-sm font-medium text-zinc-700 transition-all ${bg} ${border}`}
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full" style={{ backgroundColor: c.color }}>
                  {c.photo ? (
                    <img src={c.photo} alt={c.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-bold text-white">{c.partyShort}</span>
                  )}
                </div>
                <div>
                  <span className="font-semibold">{c.name}</span>
                  <span className="ml-2 text-xs text-zinc-400">{c.partyShort}</span>
                </div>
                {selected !== null && (
                  <span className="ml-auto text-lg">{isCorrect ? "✓" : isSelected ? "✗" : ""}</span>
                )}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <button onClick={next} className="mt-6 w-full rounded-lg bg-elyz-blue py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700">
            {current < questions.length - 1 ? t("games.next") : t("games.result")}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Simulator Game ───────────────────────────────────────────────────────────

function SimulatorGame() {
  const { t } = useLocale();
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const c of topCandidates) init[c.id] = 0;
    return init;
  });

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  const sorted = [...topCandidates]
    .map((c) => ({ ...c, score: scores[c.id] ?? 0 }))
    .sort((a, b) => b.score - a.score);

  const [winner, runnerUp] = sorted;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="mb-4 text-center">
          <p className="text-sm text-zinc-500">{t("games.adjustScores")}</p>
          <p className="mt-1 text-3xl font-bold" style={{ color: total <= 100 ? "#27272a" : "#dc2626" }}>{total.toFixed(1)}%</p>
          <div className="mx-auto mt-2 h-3 w-full max-w-md overflow-hidden rounded-full bg-zinc-100">
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, total)}%`, backgroundColor: total <= 100 ? "#2563eb" : "#dc2626" }} />
          </div>
          {total > 100 && <p className="mt-2 text-sm font-medium text-red-500">{t("games.over100")}</p>}
        </div>

        <div className="space-y-4">
          {sorted.map((c) => (
            <div key={c.id}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
                  <Link href={`/candidats/${c.id}`} className="font-medium text-zinc-700 hover:text-elyz-blue">{c.name}</Link>
                </div>
                <span className="font-semibold tabular-nums text-zinc-600">{(scores[c.id] ?? 0).toFixed(1)}%</span>
              </div>
              <input type="range" min={0} max={50} step={0.5} value={scores[c.id] ?? 0} onChange={(e) => setScores((p) => ({ ...p, [c.id]: parseFloat(e.target.value) }))} className="w-full accent-blue-600" />
            </div>
          ))}
        </div>
      </div>

      {winner && runnerUp && winner.score > 0 && (
        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="mb-4 text-center text-sm font-semibold text-zinc-500">{t("games.firstRound")}</p>
          <div className="flex items-center justify-center gap-6">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white" style={{ backgroundColor: winner.color }}>1er</div>
              <p className="text-sm font-bold text-zinc-800">{winner.name}</p>
              <p className="text-lg font-bold" style={{ color: winner.color }}>{winner.score.toFixed(1)}%</p>
            </div>
            <p className="text-2xl text-zinc-300">vs</p>
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white" style={{ backgroundColor: runnerUp.color }}>2nd</div>
              <p className="text-sm font-bold text-zinc-800">{runnerUp.name}</p>
              <p className="text-lg font-bold" style={{ color: runnerUp.color }}>{runnerUp.score.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Memory Game ──────────────────────────────────────────────────────────────

function MemoryGame() {
  const { t } = useLocale();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [started, setStarted] = useState(false);

  const initGame = useCallback(() => {
    const pool = shuffle(memoryCandidates).slice(0, 6);
    const pairs: MemoryCard[] = [];
    for (const c of pool) {
      pairs.push({ id: pairs.length, candidateId: c.id }, { id: pairs.length + 1, candidateId: c.id });
    }
    setCards(shuffle(pairs));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStarted(true);
  }, []);

  const handleCardClick = (card: MemoryCard) => {
    if (flipped.length >= 2 || flipped.includes(card.id) || matched.includes(card.candidateId)) return;
    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped.map((id) => cards.find((c) => c.id === id)!);
      if (first.candidateId === second.candidateId) {
        setMatched((m) => [...m, first.candidateId]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  const finished = started && matched.length === 6;

  return (
    <div>
      {!started ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-12 text-center shadow-sm">
          <p className="mb-4 text-5xl">🃏</p>
          <p className="mb-2 text-lg font-semibold text-zinc-800">{t("games.memory")}</p>
          <p className="mb-6 text-sm text-zinc-500">{t("games.memoryDesc")}</p>
          <button onClick={initGame} className="rounded-lg bg-elyz-blue px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700">{t("games.start")}</button>
        </div>
      ) : finished ? (
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
          <p className="mb-2 text-5xl">🎉</p>
          <p className="text-xl font-bold text-zinc-800">{t("games.congrats")}</p>
          <p className="mt-2 text-zinc-500">{t("games.found")} {moves} {t("games.moves").toLowerCase()}.</p>
          <button onClick={initGame} className="mt-6 rounded-lg bg-elyz-blue px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700">Rejouer</button>
        </div>
      ) : (
        <div>
          <div className="mb-4 flex items-center justify-between text-sm text-zinc-500">
            <span>Coups&nbsp;: {moves}</span>
            <span>Paires&nbsp;: {matched.length} / 6</span>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {cards.map((card) => {
              const show = flipped.includes(card.id) || matched.includes(card.candidateId);
              const c = candidates.find((cc) => cc.id === card.candidateId)!;
              return (
                <button key={card.id} onClick={() => handleCardClick(card)} disabled={matched.includes(card.candidateId)}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 transition-all ${show ? "border-zinc-300 shadow-sm" : "border-zinc-200 hover:border-blue-300"}`}
                  style={{ backgroundColor: show ? "#fff" : "#e4e4e7", opacity: matched.includes(card.candidateId) ? 0.6 : 1 }}
                >
                  {show ? (
                    <div className="flex h-full flex-col items-center justify-center p-1">
                      <img src={c.photo ?? ""} alt={c.name} className="mb-1 h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16" />
                      <span className="text-[9px] font-semibold leading-tight text-zinc-700 sm:text-[10px]">{c.name}</span>
                      <span className="text-[8px] font-medium sm:text-[9px]" style={{ color: c.color }}>{c.partyShort}</span>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center"><span className="text-2xl text-zinc-400">?</span></div>
                  )}
                </button>
              );
            })}
          </div>
          <button onClick={initGame} className="mt-6 w-full rounded-lg border border-zinc-300 py-2.5 text-sm font-medium text-zinc-600 transition-all hover:bg-zinc-50">Recommencer</button>
        </div>
      )}
    </div>
  );
}
