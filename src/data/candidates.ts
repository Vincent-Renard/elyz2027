export interface PreviousElection {
  year: number;
  round: "1er" | "2nd";
  score: string;
}

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
  photo?: string;
  mandates?: string[];
  previousElections?: PreviousElection[];
  programUrl?: string;
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/6/6b/Nathalie_Arthaud_%28LO%29_19-05-2024.jpg",
    mandates: [],
    previousElections: [
      { year: 2012, round: "1er", score: "0,56%" },
      { year: 2017, round: "1er", score: "0,64%" },
      { year: 2022, round: "1er", score: "0,56%" },
    ],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/b/b4/Fran%C3%A7ois_ASSELINEAU.jpg",
    mandates: [
      "Conseiller de Paris (2008-2014)",
      "Conseiller régional d'Île-de-France (2010-2015)",
    ],
    previousElections: [
      { year: 2017, round: "1er", score: "0,92%" },
      { year: 2022, round: "1er", score: "0,06%" },
    ],
    programUrl: "https://upr.fr/notre-programme",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/c/c4/Gabriel_Attal_2025_%28close_crop%29.jpg",
    mandates: [
      "Premier ministre (2024)",
      "Ministre de l'Éducation nationale (2022-2024)",
      "Ministre délégué aux Comptes publics (2020-2022)",
      "Secrétaire d'État auprès du ministre de l'Éducation (2018-2020)",
      "Député des Hauts-de-Seine (2017-2018, 2024-2026)",
    ],
    programUrl: "https://gabrielattal.fr/pages/1FEfzGXN5ynz28wiZ1970b/programme",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/7/7e/20210821_autin.c_6679_%28cropped%29.jpg",
    mandates: [
      "Députée de Seine-Saint-Denis (depuis 2017)",
      "Conseillère régionale d'Île-de-France (2010-2017)",
      "Conseillère municipale de Paris (2001-2008)",
    ],
    programUrl: "https://clementine-autain.fr/mon-manifeste/",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/c/c2/Delphine_Batho_%28cropped-2%29.png",
    mandates: [
      "Ministre de l'Écologie (2012-2013)",
      "Députée des Deux-Sèvres (2007-2012, 2013-2022)",
    ],
    programUrl: "https://www.delphinebatho.fr/",
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
    mandates: [
      "Maire de Saint-Ouen (depuis 2014)",
      "Conseiller départemental de Seine-Saint-Denis (depuis 2015)",
    ],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/1/13/Nicolas_Dupont-Aignan%2C_homme_politique_fran%C3%A7ais.jpg",
    mandates: [
      "Député de l'Essonne (1997-2017, depuis 2022)",
      "Maire de Yerres (1995-2017)",
      "Président de Debout la France (depuis 2008)",
    ],
    previousElections: [
      { year: 2012, round: "1er", score: "1,79%" },
      { year: 2017, round: "1er", score: "4,70%" },
      { year: 2022, round: "1er", score: "2,06%" },
    ],
    programUrl: "https://www.debout-la-france.fr/actualite/decouvrez-nos-livrets-du-programme-mis-a-jour/",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/2/27/J%C3%A9r%C3%B4me_Guedj_2010.jpg",
    mandates: [
      "Député de l'Essonne (depuis 2024)",
      "Conseiller départemental de l'Essonne (2011-2024)",
      "Président du Conseil départemental de l'Essonne (2011-2017)",
    ],
    programUrl: "https://www.jerome-guedj.fr/",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Anasse_Kazib%2C_d%C3%A9cembre_2021.jpg",
    mandates: [],
    programUrl: "https://anasse2027.fr/",
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
      "Triple candidate à la présidentielle (2017, 2022). Sa candidature est suspendue à la décision de la cour d'appel le 7 juillet 2026 sur sa peine d'inéligibilité. Favorite des sondages si elle peut se présenter.",
    source: "https://www.lefigaro.fr/politique/presidentielle-2027-qui-sont-les-candidats-potentiels-et-declares-20260423",
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/8/81/Marine_Le_Pen_2025_%28cropped%29.jpg",
    mandates: [
      "Députée du Pas-de-Calais (depuis 2017)",
      "Députée européenne (2004-2017)",
      "Présidente du Rassemblement National (depuis 2011)",
      "Conseillère régionale du Nord-Pas-de-Calais (1998-2004)",
      "Conseillère municipale d'Hénin-Beaumont (2008-2011)",
    ],
    previousElections: [
      { year: 2012, round: "1er", score: "17,90%" },
      { year: 2017, round: "1er", score: "21,30%" },
      { year: 2017, round: "2nd", score: "33,90%" },
      { year: 2022, round: "1er", score: "23,15%" },
      { year: 2022, round: "2nd", score: "41,45%" },
    ],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/1/13/MEP_Jordan_Bardella.jpg",
    mandates: [
      "Député européen (depuis 2019)",
      "Président du Rassemblement National (depuis 2022)",
      "Conseiller régional d'Île-de-France (2015-2020)",
    ],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/David_Lisnard_-_2013.jpg",
    mandates: [
      "Maire de Cannes (depuis 2014)",
      "Président de l'Association des Maires de France (depuis 2021)",
      "Conseiller départemental des Alpes-Maritimes (depuis 2021)",
    ],
    programUrl: "https://www.unenouvelleenergie.fr/notre-programme/",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Member_of_the_European_Parliament_for_France_Lydie_Massard.jpg",
    mandates: ["Députée européenne (2017-2019)"],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/f/f5/Portrait_officiel_JLM_20-01-2026.jpg",
    mandates: [
      "Député des Bouches-du-Rhône (2017-2022)",
      "Sénateur de l'Essonne (1986-2010)",
      "Député européen (2009-2017)",
      "Ministre délégué à l'Enseignement professionnel (2000-2002)",
      "Conseiller général de l'Essonne (1985-2004)",
      "Sénateur (2004-2010)",
    ],
    previousElections: [
      { year: 2012, round: "1er", score: "11,10%" },
      { year: 2017, round: "1er", score: "19,58%" },
      { year: 2022, round: "1er", score: "21,95%" },
    ],
    programUrl: "https://melenchon2027.fr/programme2025/livre/",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Edouard_Philippe_3x4_crop.jpg",
    mandates: [
      "Premier ministre (2017-2020)",
      "Maire du Havre (2010-2017, depuis 2020)",
      "Député de la Seine-Maritime (2012-2017)",
      "Président d'Horizons (depuis 2021)",
      "Conseiller régional de Haute-Normandie (2004-2008)",
      "Conseiller général de la Seine-Maritime (2008-2012)",
    ],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/5/5c/2022-04-16_16-49-26_MAM-Paris_02.jpg",
    mandates: [
      "Député européen (2014-2019)",
      "Vice-président du Front National (2012-2017)",
      "Conseiller régional du Grand Est (2015-2021)",
    ],
    programUrl: "https://les-patriotes.fr/wp-content/uploads/2025/09/lespatriotes_projet.pdf",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/6/61/Bruno_Retailleau_-_Ministre_de_l%27Int%C3%A9rieur_fran%C3%A7ais_%28cropped%29.jpg",
    mandates: [
      "Ministre de l'Intérieur (2024-2026)",
      "Président des Républicains (depuis 2025)",
      "Sénateur de la Vendée (2004-2024)",
      "Président du Conseil régional des Pays de la Loire (2015-2017)",
      "Président du Conseil général de la Vendée (2010-2015)",
    ],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Fran%C3%A7ois_Ruffin_%28cropped%29.jpg",
    mandates: [
      "Député de la Somme (depuis 2017)",
      "Journaliste et réalisateur",
      "Fondateur du journal Fakir",
    ],
    programUrl: "https://nouspresident.fr/",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/a/ac/20210819_tondelier.m-cr3.jpg",
    mandates: [
      "Secrétaire nationale des Écologistes (depuis 2022)",
      "Conseillère municipale d'Hénin-Beaumont (depuis 2014)",
      "Conseillère régionale des Hauts-de-France (2021-2022)",
    ],
    programUrl: "https://marinetondelier.fr/manifeste",
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/8/8c/Portrait_d%27%C3%89ric_Zemmour%2C_avril_2022.jpg",
    mandates: [],
    previousElections: [
      { year: 2022, round: "1er", score: "7,07%" },
    ],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/1/1f/1720448398743_20240708_GLUCKSMANN_Raphael_FR_006.jpg",
    mandates: ["Député européen (depuis 2019)", "Co-fondateur de Place Publique (2018)"],
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
    photo:
      "https://upload.wikimedia.org/wikipedia/commons/f/fd/Fran%C3%A7ois_Hollande_-_Ceremony_of_Honour_for_Jacques_Delors_-_2024.jpg",
    mandates: [
      "Président de la République (2012-2017)",
      "Député de la Corrèze (1988-1993, 1997-2012)",
      "Premier secrétaire du PS (1997-2008)",
      "Maire de Tulle (2001-2008)",
      "Président du Conseil général de la Corrèze (2008-2012)",
      "Député européen (1999-2000)",
    ],
    previousElections: [
      { year: 2012, round: "1er", score: "28,63%" },
      { year: 2012, round: "2nd", score: "51,64%" },
    ],
  },
];
