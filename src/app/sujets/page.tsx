"use client";

import { useState } from "react";
import Link from "next/link";
import { getAllTopics, getCandidateName } from "@/data/topics";
import { candidates } from "@/data/candidates";

function normalize(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function SujetsPage() {
  const topics = getAllTopics();
  const [expanded, setExpanded] = useState<string | null>(null);

  const topicColors: Record<string, string> = {
    "pouvoir-achat": "#e11d48",
    sante: "#0891b2",
    immigration: "#f59e0b",
    securite: "#2563eb",
    education: "#8b5cf6",
    ecologie: "#16a34a",
    retraites: "#dc2626",
  };

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

      <div className="space-y-8">
        {topics.map((topic) => {
          const isOpen = expanded === topic.id;
          const color = topicColors[topic.id] ?? "#6b7280";

          return (
            <div
              key={topic.id}
              className="rounded-xl border border-zinc-200 bg-white shadow-sm"
              style={{ borderLeft: `5px solid ${color}` }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : topic.id)}
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <div>
                  <h2 className="text-lg font-bold text-zinc-900">{topic.label}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{topic.description}</p>
                </div>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="border-t border-zinc-100 px-6 pb-6 pt-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {topic.positions.map((pos) => {
                      const candidate = candidates.find((c) => c.id === pos.candidateId);
                      const color2 = candidate?.color ?? "#6b7280";
                      return (
                        <Link
                          key={pos.candidateId}
                          href={`/candidats/${pos.candidateId}`}
                          className="group rounded-lg border border-zinc-100 bg-zinc-50 p-4 transition-colors hover:bg-zinc-100"
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <div
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: color2 }}
                            />
                            <span className="text-sm font-semibold text-zinc-700 group-hover:text-elyz-blue">
                              {getCandidateName(pos.candidateId)}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-zinc-600">
                            {pos.position}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
