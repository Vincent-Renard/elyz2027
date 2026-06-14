export interface Article {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
  category: "sondage" | "candidature" | "analyse" | "calendrier" | "judiciaire";
}

export const articles: Article[] = [
  {
    id: "art-20260613-figaro",
    title:
      "Présidentielle 2027 : la multiplication des candidatures, symbole d'une course désordonnée pour l'Élysée",
    source: "Le Figaro",
    date: "2026-06-13",
    url: "https://www.lefigaro.fr/elections/presidentielles/presidentielle-2027-la-multiplication-des-candidatures-symbole-d-une-course-desordonnee-pour-l-elysee-20260613",
    summary:
      "À moins d'un an de la présidentielle, une trentaine de personnalités ont fait part d'ambitions élyséennes. Le nombre de prétendants pourrait battre des records.",
    category: "analyse",
  },
  {
    id: "art-20260612-tf1",
    title: "Élection présidentielle 2027 : qui sont les candidats déjà déclarés ?",
    source: "TF1 Info",
    date: "2026-06-12",
    url: "https://www.tf1info.fr/politique/election-presidentielle-2027-liste-des-candidats-deja-declares-2447104.html",
    summary:
      "À un peu moins d'un an de la présidentielle, le nombre de candidats est déjà pléthorique. TF1info en a compté 23. La liste complète par bords politiques.",
    category: "candidature",
  },
  {
    id: "art-20260609-nouvelobs",
    title:
      "Quels sont les 25 candidats déjà officiellement déclarés à la présidentielle de 2027 ?",
    source: "Le Nouvel Obs",
    date: "2026-06-09",
    url: "https://www.nouvelobs.com/politique/20260609.OBS115649/quels-sont-les-25-candidats-deja-officiellement-declares-a-la-presidentielle-de-2027.html",
    summary:
      "25 personnalités, de l'extrême gauche à l'extrême droite, ont d'ores et déjà annoncé leur souhait de concourir. Infographie animée mise à jour.",
    category: "candidature",
  },
  {
    id: "art-20260609-cnews",
    title: "Présidentielle 2027 : qui sont les candidats déjà en lice ?",
    source: "CNews",
    date: "2026-06-09",
    url: "https://www.cnews.fr/france/2026-06-09/presidentielle-2027-qui-sont-les-candidats-deja-en-lice-1621746",
    summary:
      "Plusieurs personnalités politiques ont déjà fait part de leur intention de se présenter. Tour d'horizon des candidats déclarés.",
    category: "candidature",
  },
  {
    id: "art-20260601-ipsos",
    title:
      "Présidentielle 2027 : les candidats du Rassemblement National largement en tête au premier tour",
    source: "Ipsos",
    date: "2026-06-01",
    url: "https://www.ipsos.com/fr-fr/presidentielle-2027-les-candidats-du-rassemblement-national-largement-en-tete-au-premier-tour",
    summary:
      "Sondage exclusif : Jordan Bardella ou Marine Le Pen oscillent entre 31% et 36%. Édouard Philippe et Jean-Luc Mélenchon au coude-à-coude pour la deuxième place.",
    category: "sondage",
  },
  {
    id: "art-20260529-rtl",
    title:
      "Présidentielle 2027 : Mélenchon qualifié pour le second tour en cas de duel fratricide Attal-Philippe",
    source: "RTL",
    date: "2026-05-29",
    url: "https://www.rtl.fr/actu/politique/sondage-rtl-presidentielle-2027-melenchon-qualifie-pour-le-second-tour-en-cas-de-duel-fratricide-attal-philippe-au-premier-7900640072",
    summary:
      "Baromètre Toluna Harris Interactive : Jean-Luc Mélenchon pourrait accéder au second tour grâce à la division du bloc central. Le RN l'emporterait largement au second tour.",
    category: "sondage",
  },
  {
    id: "art-20260529-tf1-sondage",
    title:
      "Présidentielle 2027 : Gabriel Attal progresse, le RN toujours largement en tête",
    source: "TF1 Info",
    date: "2026-05-29",
    url: "https://www.tf1info.fr/politique/presidentielle-2027-gabriel-attal-progresse-le-rn-toujours-largement-en-tete-les-resultats-de-notre-sondage-exclusif-2444318.html",
    summary:
      "Sondage Ifop-Fiducial : Testé pour la première fois depuis l'annonce de sa candidature, Gabriel Attal se hisserait au second tour sans la concurrence d'Édouard Philippe.",
    category: "sondage",
  },
  {
    id: "art-20260528-tf1-verif",
    title:
      "Présidentielle 2027 : est-il normal qu'Emmanuel Macron n'ait pas encore annoncé la date ?",
    source: "TF1 Info",
    date: "2026-05-28",
    url: "https://www.tf1info.fr/politique/verif-presidentielle-2027-est-il-normal-qu-emmanuel-macron-n-ait-pas-encore-annonce-la-date-2444087.html",
    summary:
      "Moins d'un an avant le scrutin, les dates butoirs n'ont toujours pas été fixées. Le président doit convoquer les électeurs au moins 10 semaines avant le premier tour.",
    category: "calendrier",
  },
  {
    id: "art-20260526-odoxa",
    title:
      "Sondage présidentielle 2027 : bond de Mélenchon qui se retrouve au coude-à-coude avec Philippe",
    source: "Public Sénat",
    date: "2026-05-26",
    url: "https://www.publicsenat.fr/actualites/politique/presidentielle-2027-melenchon-et-philippe-au-coude-a-coude-pour-la-qualification-au-second-tour-bardella-toujours-largement-en-tete-selon-le-sondage-odoxa",
    summary:
      "Baromètre Odoxa : Jordan Bardella à 32%, Édouard Philippe chute à 17% et Jean-Luc Mélenchon progresse à 16%. Un écart désormais dans la marge d'erreur pour la deuxième place.",
    category: "sondage",
  },
  {
    id: "art-20260526-franceinfo-dates",
    title: "Quelles sont les dates de la prochaine élection présidentielle ?",
    source: "France Info",
    date: "2026-05-26",
    url: "https://www.franceinfo.fr/elections/presidentielle/quelles-sont-les-dates-des-prochaines-elections-presidentielles-le-dossier-est-sur-le-bureau-d-emmanuel-macron_8028674.html",
    summary:
      "Premier tour le 11 ou le 18 avril 2027. Le dossier est sur le bureau d'Emmanuel Macron depuis avril. Deux options sur la table.",
    category: "calendrier",
  },
  {
    id: "art-20260526-lesechos",
    title: "Présidentielle 2027 : calendrier, candidats… ce qui se prépare",
    source: "Les Echos",
    date: "2026-05-26",
    url: "https://www.lesechos.fr/elections/presidentielle/presidentielle-2027-calendrier-candidats-ce-qui-se-prepare-2231403",
    summary:
      "Les dates de la présidentielle n'ont pas encore été fixées. Le décret est en préparation à Matignon. Le sort de Marine Le Pen se joue le 7 juillet 2026.",
    category: "calendrier",
  },
  {
    id: "art-20260524-france24",
    title: "Présidentielle 2027 : qui sont les candidats officiellement déclarés ?",
    source: "France 24",
    date: "2026-05-24",
    url: "https://www.france24.com/fr/france/20260524-france-presidentielle-2027-qui-sont-les-candidats-officiellement-declares",
    summary:
      "Ils sont désormais vingt à prétendre conquérir l'Élysée. Tour d'horizon des candidates et candidats officiellement déclarés par ordre alphabétique.",
    category: "candidature",
  },
  {
    id: "art-20260423-figaro",
    title: "Présidentielle 2027 : qui sont les candidats potentiels et déclarés ?",
    source: "Le Figaro",
    date: "2026-04-23",
    url: "https://www.lefigaro.fr/politique/presidentielle-2027-qui-sont-les-candidats-potentiels-et-declares-20260423",
    summary:
      "Le Figaro liste les candidats potentiels et déjà déclarés à la succession d'Emmanuel Macron, dans l'attente d'éventuelles primaires à droite comme à gauche.",
    category: "candidature",
  },
  {
    id: "art-20260411-sudouest",
    title:
      "Présidentielle 2027 : quand se déroulera le premier tour ? Le calendrier électoral se précise",
    source: "Sud Ouest",
    date: "2026-04-11",
    url: "https://www.sudouest.fr/elections/presidentielle/presidentielle-2027-quand-se-deroulera-le-premier-tour-le-calendrier-electoral-se-precise-28647424.php",
    summary:
      "Le premier tour de l'élection présidentielle se déroulera nécessairement le dimanche 11 ou le dimanche 18 avril 2027.",
    category: "calendrier",
  },
  {
    id: "art-20260326-franceinfo",
    title:
      "De LFI au RN : qui sont les candidats déclarés ou pressentis pour la présidentielle 2027 ?",
    source: "France Info",
    date: "2026-03-26",
    url: "https://www.franceinfo.fr/elections/presidentielle/de-lfi-au-rn-qui-sont-les-candidats-declares-ou-pressentis-pour-la-presidentielle-2027-a-un-an-de-l-echeance_7893704.html",
    summary:
      "À un an de l'échéance, les candidats se multiplient. Le sort judiciaire de Marine Le Pen et les primaires à gauche structurent la campagne.",
    category: "candidature",
  },
  {
    id: "art-20260206-publicsenat",
    title:
      "Présidentielle de 2027 : qui sont les candidats déclarés, ou presque, à l'élection ?",
    source: "Public Sénat",
    date: "2026-02-06",
    url: "https://www.publicsenat.fr/actualites/politique/presidentielle-de-2027-qui-sont-les-candidats-declares-ou-presque-a-lelection",
    summary:
      "Les candidatures s'empilent à gauche. Une primaire est organisée le 11 octobre 2026. À droite, la situation est également fragmentée.",
    category: "analyse",
  },
];
