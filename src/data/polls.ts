export interface Poll {
  id: string;
  source: string;
  date: string;
  sampleSize: number;
  candidates: PollCandidate[];
  url: string;
}

export interface PollCandidate {
  name: string;
  partyShort: string;
  score: number;
  color: string;
}

export const polls: Poll[] = [
  {
    id: "ipsos-mai-2026",
    source: "Ipsos bva-CESI / Le Parisien",
    date: "2026-05-28",
    sampleSize: 1500,
    candidates: [
      { name: "Jordan Bardella", partyShort: "RN", score: 33.5, color: "#1e3a8a" },
      { name: "Édouard Philippe", partyShort: "HOR", score: 14, color: "#6b21a8" },
      { name: "Jean-Luc Mélenchon", partyShort: "LFI", score: 13, color: "#dc2626" },
      { name: "Raphaël Glucksmann", partyShort: "PP", score: 11, color: "#e11d48" },
      { name: "Gabriel Attal", partyShort: "RE", score: 8.5, color: "#f59e0b" },
      { name: "Bruno Retailleau", partyShort: "LR", score: 7.5, color: "#2563eb" },
      { name: "Marine Tondelier", partyShort: "EELV", score: 4, color: "#16a34a" },
      { name: "Fabien Roussel", partyShort: "PCF", score: 3, color: "#dc2626" },
      { name: "Éric Zemmour", partyShort: "REC", score: 4, color: "#8b5cf6" },
      { name: "Nicolas Dupont-Aignan", partyShort: "DLF", score: 1.5, color: "#2563eb" },
      { name: "Nathalie Arthaud", partyShort: "LO", score: 1, color: "#dc2626" },
    ],
    url: "https://www.ipsos.com/sites/default/files/ct/news/documents/2026-06/presidentielle-2027-intention-vote-mai26-rapport-complet-web.pdf",
  },
  {
    id: "ifop-mai-2026",
    source: "Ifop-Fiducial / LCI, Le Figaro, Sud Radio",
    date: "2026-05-28",
    sampleSize: 1501,
    candidates: [
      { name: "Jordan Bardella", partyShort: "RN", score: 34, color: "#1e3a8a" },
      { name: "Édouard Philippe", partyShort: "HOR", score: 14, color: "#6b21a8" },
      { name: "Jean-Luc Mélenchon", partyShort: "LFI", score: 13, color: "#dc2626" },
      { name: "Raphaël Glucksmann", partyShort: "PP", score: 9, color: "#e11d48" },
      { name: "Gabriel Attal", partyShort: "RE", score: 9, color: "#f59e0b" },
      { name: "Bruno Retailleau", partyShort: "LR", score: 8, color: "#2563eb" },
      { name: "Marine Tondelier", partyShort: "EELV", score: 4, color: "#16a34a" },
      { name: "Éric Zemmour", partyShort: "REC", score: 4, color: "#8b5cf6" },
      { name: "Fabien Roussel", partyShort: "PCF", score: 2.5, color: "#dc2626" },
      { name: "Nicolas Dupont-Aignan", partyShort: "DLF", score: 2, color: "#2563eb" },
      { name: "Nathalie Arthaud", partyShort: "LO", score: 0.5, color: "#dc2626" },
    ],
    url: "https://www.tf1info.fr/politique/presidentielle-2027-gabriel-attal-progresse-le-rn-toujours-largement-en-tete-les-resultats-de-notre-sondage-exclusif-2444318.html",
  },
  {
    id: "odoxa-mai-2026",
    source: "Odoxa",
    date: "2026-05-26",
    sampleSize: 1500,
    candidates: [
      { name: "Jordan Bardella", partyShort: "RN", score: 32, color: "#1e3a8a" },
      { name: "Édouard Philippe", partyShort: "HOR", score: 17, color: "#6b21a8" },
      { name: "Jean-Luc Mélenchon", partyShort: "LFI", score: 16, color: "#dc2626" },
      { name: "Raphaël Glucksmann", partyShort: "PP", score: 11, color: "#e11d48" },
      { name: "Bruno Retailleau", partyShort: "LR", score: 9, color: "#2563eb" },
      { name: "Gabriel Attal", partyShort: "RE", score: 8, color: "#f59e0b" },
      { name: "Éric Zemmour", partyShort: "REC", score: 4, color: "#8b5cf6" },
      { name: "Marine Tondelier", partyShort: "EELV", score: 3, color: "#16a34a" },
    ],
    url: "https://www.publicsenat.fr/actualites/politique/presidentielle-2027-melenchon-et-philippe-au-coude-a-coude-pour-la-qualification-au-second-tour-bardella-toujours-largement-en-tete-selon-le-sondage-odoxa",
  },
  {
    id: "harris-mai-2026",
    source: "Harris Interactive / M6, RTL",
    date: "2026-05-27",
    sampleSize: 1744,
    candidates: [
      { name: "Jordan Bardella", partyShort: "RN", score: 34, color: "#1e3a8a" },
      { name: "Édouard Philippe", partyShort: "HOR", score: 17, color: "#6b21a8" },
      { name: "Jean-Luc Mélenchon", partyShort: "LFI", score: 15, color: "#dc2626" },
      { name: "Raphaël Glucksmann", partyShort: "PP", score: 10, color: "#e11d48" },
      { name: "Bruno Retailleau", partyShort: "LR", score: 9, color: "#2563eb" },
      { name: "Éric Zemmour", partyShort: "REC", score: 6, color: "#8b5cf6" },
      { name: "Marine Tondelier", partyShort: "EELV", score: 3, color: "#16a34a" },
      { name: "Fabien Roussel", partyShort: "PCF", score: 3, color: "#dc2626" },
      { name: "Nicolas Dupont-Aignan", partyShort: "DLF", score: 2, color: "#2563eb" },
      { name: "Nathalie Arthaud", partyShort: "LO", score: 1, color: "#dc2626" },
    ],
    url: "https://www.rtl.fr/actu/politique/sondage-rtl-presidentielle-2027-melenchon-qualifie-pour-le-second-tour-en-cas-de-duel-fratricide-attal-philippe-au-premier-7900640072",
  },
];
