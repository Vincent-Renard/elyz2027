export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyShort: string;
  color: string;
  announcedDate: string;
  status: "declared" | "possible" | "withdrawn";
  description: string;
}

export const candidates: Candidate[] = [
  {
    id: "edouard-philippe",
    name: "Édouard Philippe",
    party: "Horizons",
    partyShort: "HOR",
    color: "#6b21a8",
    announcedDate: "2024-09-03",
    status: "declared",
    description:
      "Ancien Premier ministre, maire du Havre. Candidat déclaré représentant l'aile modérée de la majorité présidentielle.",
  },
  {
    id: "marine-le-pen",
    name: "Marine Le Pen",
    party: "Rassemblement National",
    partyShort: "RN",
    color: "#1e3a8a",
    announcedDate: "2024-11-02",
    status: "declared",
    description:
      "Députée du Pas-de-Calais, candidate du Rassemblement National pour la troisième fois après 2017 et 2022.",
  },
  {
    id: "laurent-wauquiez",
    name: "Laurent Wauquiez",
    party: "Les Républicains",
    partyShort: "LR",
    color: "#2563eb",
    announcedDate: "2025-01-15",
    status: "declared",
    description:
      "Président de la région Auvergne-Rhône-Alpes, candidat des Républicains sur une ligne souverainiste et identitaire.",
  },
  {
    id: "jean-luc-melenchon",
    name: "Jean-Luc Mélenchon",
    party: "La France Insoumise",
    partyShort: "LFI",
    color: "#dc2626",
    announcedDate: "2025-03-08",
    status: "declared",
    description:
      "Député des Bouches-du-Rhône, candidat de La France Insoumise pour l'union des gauches.",
  },
  {
    id: "raphael-glucksmann",
    name: "Raphaël Glucksmann",
    party: "Place Publique / PS",
    partyShort: "PP-PS",
    color: "#e11d48",
    announcedDate: "2025-04-20",
    status: "declared",
    description:
      "Député européen, candidat d'une alliance entre Place Publique et le Parti Socialiste.",
  },
  {
    id: "gabriel-attal",
    name: "Gabriel Attal",
    party: "Renaissance",
    partyShort: "RE",
    color: "#f59e0b",
    announcedDate: "2025-06-01",
    status: "declared",
    description:
      "Ancien Premier ministre, candidat de Renaissance pour incarner la continuité du macronisme.",
  },
  {
    id: "jordan-bardella",
    name: "Jordan Bardella",
    party: "Rassemblement National",
    partyShort: "RN",
    color: "#1e3a8a",
    announcedDate: "",
    status: "possible",
    description:
      "Président du Rassemblement National, pressenti pour être candidat si Marine Le Pen se retire.",
  },
  {
    id: "yannick-jadot",
    name: "Yannick Jadot",
    party: "Les Écologistes",
    partyShort: "EELV",
    color: "#16a34a",
    announcedDate: "",
    status: "possible",
    description:
      "Député européen, candidat potentiel des Écologistes pour l'élection présidentielle.",
  },
];
