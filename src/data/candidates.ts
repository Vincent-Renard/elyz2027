export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyShort: string;
  color: string;
  announcedDate: string;
  status: "declared" | "primary" | "possible" | "designated";
  description: string;
  source: string;
}

export const candidates: Candidate[] = [
  {
    id: "nathalie-arthaud",
    name: "Nathalie Arthaud",
    party: "Lutte Ouvrière",
    partyShort: "LO",
    color: "#dc2626",
    announcedDate: "2025-12-08",
    status: "declared",
    description:
      "Porte-parole de Lutte Ouvrière, candidate à la présidentielle pour la quatrième fois consécutive (2012, 2017, 2022, 2027).",
    source: "https://www.tf1info.fr/politique/election-presidentielle-2027-liste-des-candidats-deja-declares-2447104.html",
  },
  {
    id: "francois-asselineau",
    name: "François Asselineau",
    party: "Union Populaire Républicaine",
    partyShort: "UPR",
    color: "#1d4ed8",
    announcedDate: "2023-08-31",
    status: "declared",
    description:
      "Fondateur et président de l'UPR. Premier à s'être déclaré pour 2027. Candidat en 2017 et 2022.",
    source: "https://www.nouvelobs.com/politique/20260609.OBS115649/quels-sont-les-25-candidats-deja-officiellement-declares-a-la-presidentielle-de-2027.html",
  },
  {
    id: "gabriel-attal",
    name: "Gabriel Attal",
    party: "Renaissance",
    partyShort: "RE",
    color: "#f59e0b",
    announcedDate: "2026-05-22",
    status: "declared",
    description:
      "Ancien Premier ministre, chef de Renaissance. Candidat déclaré le 22 mai 2026 dans l'Aveyron. Envisage un désistement au profit d'un candidat mieux placé ou une primaire.",
    source: "https://www.tf1info.fr/politique/election-presidentielle-2027-liste-des-candidats-deja-declares-2447104.html",
  },
  {
    id: "clementine-autain",
    name: "Clémentine Autain",
    party: "L'Après",
    partyShort: "Après",
    color: "#e11d48",
    announcedDate: "2025-06-16",
    status: "primary",
    description:
      "Députée de Seine-Saint-Denis, ex-LFI. Candidate à la primaire de la gauche pour incarner une gauche solide et sociale-écologiste.",
    source: "https://www.cnews.fr/france/2026-06-09/presidentielle-2027-qui-sont-les-candidats-deja-en-lice-1621746",
  },
  {
    id: "delphine-batho",
    name: "Delphine Batho",
    party: "Les Écologistes",
    partyShort: "EELV",
    color: "#16a34a",
    announcedDate: "2025-11-25",
    status: "declared",
    description:
      "Ancienne ministre de l'Écologie. Candidate pour 'reconstruire une écologie capable de gouverner'. Opposée à une primaire de la gauche unitaire.",
    source: "https://www.franceinfo.fr/elections/presidentielle/de-lfi-au-rn-qui-sont-les-candidats-declares-ou-pressentis-pour-la-presidentielle-2027-a-un-an-de-l-echeance_7893704.html",
  },
  {
    id: "karim-bouamrane",
    name: "Karim Bouamrane",
    party: "Parti Socialiste",
    partyShort: "PS",
    color: "#e11d48",
    announcedDate: "2026-06-09",
    status: "declared",
    description:
      "Maire PS de Saint-Ouen. Candidat déclaré comme candidat 'qui fédère' la gauche non mélenchoniste. Figure montante, jamais candidat à un scrutin national.",
    source: "https://www.tf1info.fr/politique/election-presidentielle-2027-liste-des-candidats-deja-declares-2447104.html",
  },
  {
    id: "nicolas-dupont-aignan",
    name: "Nicolas Dupont-Aignan",
    party: "Debout la France",
    partyShort: "DLF",
    color: "#2563eb",
    announcedDate: "2024-02-03",
    status: "declared",
    description:
      "Fondateur et président de Debout la France. Candidat pour la quatrième fois (2012, 2017, 2022, 2027).",
    source: "https://www.nouvelobs.com/politique/20260609.OBS115649/quels-sont-les-25-candidats-deja-officiellement-declares-a-la-presidentielle-de-2027.html",
  },
  {
    id: "jerome-guedj",
    name: "Jérôme Guedj",
    party: "Parti Socialiste",
    partyShort: "PS",
    color: "#e11d48",
    announcedDate: "2026-02-05",
    status: "declared",
    description:
      "Député PS de l'Essonne. Candidat déclaré refusant de participer à la primaire de la gauche, qu'il juge 'baroque'.",
    source: "https://www.cnews.fr/france/2026-06-09/presidentielle-2027-qui-sont-les-candidats-deja-en-lice-1621746",
  },
  {
    id: "anasse-kazib",
    name: "Anasse Kazib",
    party: "Révolution Permanente",
    partyShort: "RP",
    color: "#dc2626",
    announcedDate: "2026-06-01",
    status: "declared",
    description:
      "Cheminot, syndicaliste SUD-Rail et ex-chroniqueur des 'Grandes Gueules' sur RMC. Candidat d'extrême gauche après avoir échoué aux 500 parrainages en 2022.",
    source: "https://www.tf1info.fr/politique/election-presidentielle-2027-liste-des-candidats-deja-declares-2447104.html",
  },
  {
    id: "marine-le-pen",
    name: "Marine Le Pen",
    party: "Rassemblement National",
    partyShort: "RN",
    color: "#1e3a8a",
    announcedDate: "2024-11-06",
    status: "possible",
    description:
      "Triple candidate à la présidentielle (2017, 2022, 2027). Sa candidature est suspendue à la décision de la cour d'appel le 7 juillet 2026 sur sa peine d'inéligibilité. Favorite des sondages si elle peut se présenter.",
    source: "https://www.lefigaro.fr/politique/presidentielle-2027-qui-sont-les-candidats-potentiels-et-declares-20260423",
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
      "Président du RN et plan B du parti si Marine Le Pen est déclarée inéligible. Testé dans les sondages, il obtient des scores légèrement supérieurs à ceux de Marine Le Pen (31-36%).",
    source: "https://www.ipsos.com/fr-fr/presidentielle-2027-les-candidats-du-rassemblement-national-largement-en-tete-au-premier-tour",
  },
  {
    id: "david-lisnard",
    name: "David Lisnard",
    party: "Nouvelle Énergie",
    partyShort: "NE",
    color: "#2563eb",
    announcedDate: "2026-03-01",
    status: "declared",
    description:
      "Maire de Cannes depuis 2014, président de l'Association des Maires de France. Candidat déclaré, prêt à participer à une primaire de la droite.",
    source: "https://www.cnews.fr/france/2026-06-09/presidentielle-2027-qui-sont-les-candidats-deja-en-lice-1621746",
  },
  {
    id: "lydie-massard",
    name: "Lydie Massard",
    party: "Union Démocratique Bretonne",
    partyShort: "UDB",
    color: "#0891b2",
    announcedDate: "2026-04-02",
    status: "primary",
    description:
      "Ancienne députée européenne, cuisinière dans un lycée breton. Candidate à la primaire de la gauche pour l'UDB.",
    source: "https://www.tf1info.fr/politique/election-presidentielle-2027-liste-des-candidats-deja-declares-2447104.html",
  },
  {
    id: "jean-luc-melenchon",
    name: "Jean-Luc Mélenchon",
    party: "La France Insoumise",
    partyShort: "LFI",
    color: "#dc2626",
    announcedDate: "2026-05-03",
    status: "declared",
    description:
      "Leader de La France Insoumise. Candidat pour la quatrième fois. Officialisé le 3 mai 2026 sur TF1. Crédité de 13-16% des intentions de vote, au coude-à-coude avec Édouard Philippe.",
    source: "https://www.france24.com/fr/france/20260524-france-presidentielle-2027-qui-sont-les-candidats-officiellement-declares",
  },
  {
    id: "edouard-philippe",
    name: "Édouard Philippe",
    party: "Horizons",
    partyShort: "HOR",
    color: "#6b21a8",
    announcedDate: "2024-09-03",
    status: "declared",
    description:
      "Ancien Premier ministre, maire du Havre réélu en mars 2026. Candidat déclaré dès septembre 2024. Crédité de 13-25% selon les configurations. Personnalité politique préférée des Français.",
    source: "https://www.tf1info.fr/politique/election-presidentielle-2027-liste-des-candidats-deja-declares-2447104.html",
  },
  {
    id: "florian-philippot",
    name: "Florian Philippot",
    party: "Les Patriotes",
    partyShort: "LP",
    color: "#1e3a8a",
    announcedDate: "2026-05-09",
    status: "declared",
    description:
      "Ancien vice-président du FN, président des Patriotes. Candidat déclaré le 9 mai 2026. N'a jamais réussi à obtenir les 500 parrainages.",
    source: "https://www.cnews.fr/france/2026-06-09/presidentielle-2027-qui-sont-les-candidats-deja-en-lice-1621746",
  },
  {
    id: "bruno-retailleau",
    name: "Bruno Retailleau",
    party: "Les Républicains",
    partyShort: "LR",
    color: "#2563eb",
    announcedDate: "2026-02-12",
    status: "designated",
    description:
      "Ministre de l'Intérieur, président des Républicains. Désigné candidat LR par 73,8% des adhérents le 19 avril 2026. Crédité de 7,5-11% des intentions de vote.",
    source: "https://www.lefigaro.fr/politique/presidentielle-2027-qui-sont-les-candidats-potentiels-et-declares-20260423",
  },
  {
    id: "francois-ruffin",
    name: "François Ruffin",
    party: "Debout !",
    partyShort: "Debout!",
    color: "#e11d48",
    announcedDate: "2026-01-26",
    status: "primary",
    description:
      "Député-journaliste, ex-LFI. Candidat à la primaire de la gauche dite 'Front populaire'. Figure de la gauche sociale et citoyenne.",
    source: "https://www.france24.com/fr/france/20260524-france-presidentielle-2027-qui-sont-les-candidats-officiellement-declares",
  },
  {
    id: "marine-tondelier",
    name: "Marine Tondelier",
    party: "Les Écologistes",
    partyShort: "EELV",
    color: "#16a34a",
    announcedDate: "2025-10-22",
    status: "primary",
    description:
      "Secrétaire nationale des Écologistes. Candidate à la primaire de la gauche, opposée à l'idée d'une primaire unitaire, privilégiant la reconstruction de l'écologie politique.",
    source: "https://www.publicsenat.fr/actualites/politique/presidentielle-de-2027-qui-sont-les-candidats-declares-ou-presque-a-lelection",
  },
  {
    id: "eric-zemmour",
    name: "Éric Zemmour",
    party: "Reconquête !",
    partyShort: "REC",
    color: "#8b5cf6",
    announcedDate: "",
    status: "possible",
    description:
      "Fondateur de Reconquête ! et candidat en 2022 (7,07%). N'a pas encore officiellement déclaré sa candidature mais se dit 'en préparation' et favorable à une alliance avec la droite et le centre.",
    source: "https://www.lefigaro.fr/politique/presidentielle-2027-qui-sont-les-candidats-potentiels-et-declares-20260423",
  },
  {
    id: "raphael-glucksmann",
    name: "Raphaël Glucksmann",
    party: "Place Publique",
    partyShort: "PP",
    color: "#e11d48",
    announcedDate: "",
    status: "possible",
    description:
      "Fondateur de Place Publique, député européen. Candidature non officiellement déclarée ; refuse la primaire de la gauche et privilégie une 'plateforme commune' sociale-démocrate. Crédité de 9-14% des intentions de vote.",
    source: "https://www.publicsenat.fr/actualites/politique/presidentielle-de-2027-qui-sont-les-candidats-declares-ou-presque-a-lelection",
  },
  {
    id: "francois-hollande",
    name: "François Hollande",
    party: "Parti Socialiste",
    partyShort: "PS",
    color: "#e11d48",
    announcedDate: "",
    status: "possible",
    description:
      "Ancien président de la République (2012-2017). Pressenti pour une candidature de fédération de la gauche réformiste. Crédité de 7-11% dans les sondages.",
    source: "https://www.publicsenat.fr/actualites/politique/presidentielle-de-2027-qui-sont-les-candidats-declares-ou-presque-a-lelection",
  },
];
