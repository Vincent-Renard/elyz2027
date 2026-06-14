import { candidates } from "./candidates";

export interface TimelineEvent {
  id: string;
  date: string;
  label: string;
  description: string;
  type: "candidature" | "election" | "event";
  candidateId?: string;
  highlight?: boolean;
}

const electionEvents: TimelineEvent[] = [
  {
    id: "depot-parrainages",
    date: "2027-01-15",
    label: "Dépôt des parrainages",
    description:
      "Date limite pour le dépôt des 500 parrainages d'élus requis auprès du Conseil constitutionnel.",
    type: "event",
  },
  {
    id: "liste-officielle",
    date: "2027-02-01",
    label: "Publication de la liste officielle des candidats",
    description:
      "Le Conseil constitutionnel publie la liste officielle des candidats habilités à se présenter.",
    type: "event",
  },
  {
    id: "campagne-officielle",
    date: "2027-03-29",
    label: "Début de la campagne officielle",
    description:
      "Ouverture de la campagne électorale officielle, deux semaines avant le premier tour.",
    type: "event",
  },
  {
    id: "elec-1-tour",
    date: "2027-04-11",
    label: "Premier tour",
    description:
      "Premier tour de l'élection présidentielle. Les deux dates possibles sont le 11 ou le 18 avril.",
    type: "election",
    highlight: true,
  },
  {
    id: "elec-2-tour",
    date: "2027-04-25",
    label: "Second tour",
    description:
      "Second tour de l'élection présidentielle entre les deux candidats arrivés en tête. Soit le 25 avril soit le 2 mai.",
    type: "election",
    highlight: true,
  },
  {
    id: "fin-mandat",
    date: "2027-05-14",
    label: "Fin du mandat d'Emmanuel Macron",
    description:
      "Expiration officielle du second mandat d'Emmanuel Macron. Le nouveau président doit être investi avant cette date.",
    type: "event",
  },
  {
    id: "legislatives",
    date: "2027-06-06",
    label: "Élections législatives anticipées (possibles)",
    description:
      "Premier tour des législatives possibles si le nouveau président dissout l'Assemblée nationale.",
    type: "event",
  },
  {
    id: "primaire-gauche",
    date: "2026-10-11",
    label: "Primaire de la gauche unitaire",
    description:
      "Primaire organisée par les Écologistes, le PS, L'Après et Debout ! pour désigner un candidat commun de la gauche non insoumise.",
    type: "event",
    highlight: true,
  },
  {
    id: "decision-le-pen",
    date: "2026-07-07",
    label: "Décision judiciaire Marine Le Pen",
    description:
      "La cour d'appel de Paris rend son délibéré sur la condamnation de Marine Le Pen dans l'affaire des assistants parlementaires européens. Son éligibilité en dépend.",
    type: "event",
    highlight: true,
  },
];

const candidateEvents: TimelineEvent[] = candidates
  .filter((c) => c.status === "declared" || c.status === "designated")
  .map(
    (c): TimelineEvent => ({
      id: `cand-${c.id}`,
      date: c.announcedDate,
      label: `${c.name}`,
      description: `${c.party} — ${c.description}`,
      type: "candidature",
      candidateId: c.id,
    }),
  )
  .filter((e) => e.date.length > 0);

const primaryEvents: TimelineEvent[] = candidates
  .filter((c) => c.status === "primary")
  .map(
    (c): TimelineEvent => ({
      id: `cand-${c.id}`,
      date: c.announcedDate,
      label: `${c.name} (primaire)`,
      description: `${c.party} — ${c.description}`,
      type: "candidature",
      candidateId: c.id,
    }),
  )
  .filter((e) => e.date.length > 0);

export const timelineEvents: TimelineEvent[] = [
  ...electionEvents,
  ...candidateEvents,
  ...primaryEvents,
].sort((a, b) => a.date.localeCompare(b.date));
