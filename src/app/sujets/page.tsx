"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllTopics, getCandidateName } from "@/data/topics";
import { candidates } from "@/data/candidates";

const topicColors: Record<string, string> = {
  "pouvoir-achat": "#e11d48",
  sante: "#0891b2",
  immigration: "#f59e0b",
  securite: "#2563eb",
  education: "#8b5cf6",
  ecologie: "#16a34a",
  retraites: "#dc2626",
};

function getCandidateColor(candidateId: string): string {
  return candidates.find((c) => c.id === candidateId)?.color ?? "#6b7280";
}

function getCandidateShort(candidateId: string): string {
  const name = getCandidateName(candidateId);
  const parts = name.split(" ");
  return parts.length > 1 ? parts[parts.length - 1] : name;
}

function getInitials(candidateId: string): string {
  const name = getCandidateName(candidateId);
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function SujetsPage() {
  const topics = getAllTopics();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  const activeTopic = topics.find((t) => t.id === selectedTopic);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Sujets <span className="text-elyz-blue">2027</span>
        </h1>
        <p className="mt-2 text-zinc-500">
          Les thèmes qui préoccupent les Français et les positions des candidats.
        </p>
      </div>

      {/* Topic selection bar */}
      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {topics.map((topic) => {
          const isActive = selectedTopic === topic.id;
          const color = topicColors[topic.id] ?? "#6b7280";
          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(isActive ? null : topic.id);
                setSelectedCandidate(null);
              }}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
              style={{
                backgroundColor: isActive ? color : "transparent",
                color: isActive ? "#fff" : color,
                border: `2px solid ${color}`,
              }}
            >
              {topic.label}
            </button>
          );
        })}
      </div>

      {/* Active topic dot cloud */}
      {activeTopic && (
        <div className="mb-8">
          <div className="mb-2 text-center">
            <p className="text-sm text-zinc-500">{activeTopic.description}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 p-8">
            {activeTopic.positions.map((pos) => {
              const color = getCandidateColor(pos.candidateId);
              const isSelected = selectedCandidate === pos.candidateId;
              return (
                <button
                  key={pos.candidateId}
                  onClick={() =>
                    setSelectedCandidate(
                      isSelected ? null : pos.candidateId
                    )
                  }
                  className="group relative flex flex-col items-center transition-transform hover:scale-110"
                  title={getCandidateName(pos.candidateId)}
                >
                  <div
                    className="flex items-center justify-center rounded-full font-bold text-white shadow-md transition-all"
                    style={{
                      backgroundColor: color,
                      width: isSelected ? 80 : 64,
                      height: isSelected ? 80 : 64,
                      fontSize: isSelected ? 11 : 9,
                      boxShadow: isSelected
                        ? `0 0 0 4px ${color}40, 0 4px 12px ${color}60`
                        : undefined,
                    }}
                  >
                    <span className="text-center leading-tight">
                      {getCandidateShort(pos.candidateId)}
                    </span>
                  </div>
                  <span
                    className="mt-1.5 max-w-20 text-center text-[10px] font-medium leading-tight text-zinc-500 transition-colors group-hover:text-zinc-800"
                    style={{ color: isSelected ? color : undefined }}
                  >
                    {getCandidateName(pos.candidateId)}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected candidate position */}
          {selectedCandidate && (
            <div className="mx-auto max-w-2xl rounded-xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{
                    backgroundColor: getCandidateColor(selectedCandidate),
                  }}
                />
                <Link
                  href={`/candidats/${selectedCandidate}`}
                  className="text-sm font-bold text-zinc-800 underline-offset-2 hover:underline"
                  style={{ color: getCandidateColor(selectedCandidate) }}
                >
                  {getCandidateName(selectedCandidate)}
                </Link>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600">
                {activeTopic.positions.find(
                  (p) => p.candidateId === selectedCandidate
                )?.position ?? ""}
              </p>
            </div>
          )}
        </div>
      )}

      {/* No topic selected */}
      {!selectedTopic && (
        <div className="space-y-8">
          {topics.map((topic) => {
            const color = topicColors[topic.id] ?? "#6b7280";
            return (
              <div
                key={topic.id}
                className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
                style={{ borderLeft: `5px solid ${color}` }}
              >
                <h2 className="mb-2 text-lg font-bold text-zinc-900">
                  {topic.label}
                </h2>
                <p className="mb-4 text-sm text-zinc-500">
                  {topic.description}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {topic.positions.map((pos) => {
                    const c = getCandidateColor(pos.candidateId);
                    return (
                      <Link
                        key={pos.candidateId}
                        href={`/candidats/${pos.candidateId}`}
                        className="group flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all hover:shadow-sm"
                        style={{
                          backgroundColor: `${c}15`,
                          color: c,
                        }}
                      >
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: c }}
                        />
                        {getCandidateShort(pos.candidateId)}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
