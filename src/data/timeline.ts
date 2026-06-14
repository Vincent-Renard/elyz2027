import { candidates } from "./candidates";

export interface TimelineEvent {
  id: string;
  date: string;
  label: string;
  description: string;
  type: "candidature" | "election" | "event";
  candidateId?: string;
}

const electionEvents: TimelineEvent[] = [
  {
    id: "elec-1-tour",
    date: "2027-04-11",
    label: "Premier tour",
    description: "Premier tour de l'élection présidentielle.",
    type: "election",
  },
  {
    id: "elec-2-tour",
    date: "2027-04-25",
    label: "Second tour",
    description: "Second tour de l'élection présidentielle.",
    type: "election",
  },
];

const candidateEvents: TimelineEvent[] = candidates
  .filter((c) => c.status === "declared")
  .map((c) => ({
    id: `cand-${c.id}`,
    date: c.announcedDate,
    label: `${c.name} — ${c.partyShort}`,
    description: c.description,
    type: "candidature" as const,
    candidateId: c.id,
  }));

export const timelineEvents: TimelineEvent[] = [
  ...electionEvents,
  ...candidateEvents,
].sort((a, b) => a.date.localeCompare(b.date));
