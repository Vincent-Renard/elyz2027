export interface Party {
  id: string;
  name: string;
  shortName: string;
  color: string;
  logo?: string;
  founded: string;
  position: string;
  description: string;
  history: string;
  leader: string;
}

export const parties: Record<string, Party> = {
  LO: {
    id: "lo",
    name: "Lutte Ouvrière",
    shortName: "LO",
    color: "#dc2626",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Logo_Lutte_Ouvri%C3%A8re.svg",
    founded: "1939 (création), 1968 (refondation)",
    position: "Extrême gauche",
    description:
      "Parti trotskiste français fondé par Robert Barcia et David Korner. Lutte Ouvrière est un parti d'extrême gauche se réclamant du marxisme révolutionnaire et de la lutte des classes.",
    history:
      "Fondé en 1939 sous le nom de 'Union Communiste', le parti prend le nom de 'Lutte Ouvrière' en 1968. Il est resté fidèle à la ligne trotskiste et présente des candidats à toutes les élections présidentielles depuis 1974. Nathalie Arthaud en est la porte-parole depuis 2008.",
    leader: "Nathalie Arthaud",
  },
  UPR: {
    id: "upr",
    name: "Union Populaire Républicaine",
    shortName: "UPR",
    color: "#1d4ed8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/60/Logo_Union_Populaire_R%C3%A9publicaine.svg",
    founded: "2007",
    position: "Souverainisme / euroscepticisme",
    description:
      "Parti politique français fondé par François Asselineau, prônant la sortie de la France de l'Union européenne et de l'OTAN.",
    history:
      "Fondé en 2007 par François Asselineeau, l'UPR milite pour le Frexit (sortie de l'UE) et la sortie de l'OTAN. Le parti a présenté des candidats aux élections présidentielles de 2017 et 2022 sans obtenir les 500 parrainages nécessaires en 2017.",
    leader: "François Asselineau",
  },
  RE: {
    id: "re",
    name: "Renaissance",
    shortName: "RE",
    color: "#f59e0b",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Renaissance-logotype-officiel.svg",
    founded: "2016 (En Marche !), 2022 (Renaissance)",
    position: "Centre / Centre-droit libéral",
    description:
      "Parti présidentiel fondé par Emmanuel Macron en 2016 sous le nom 'En Marche !', devenu Renaissance en 2022. Se positionne comme un parti à la fois social-libéral et progressiste.",
    history:
      "Fondé en avril 2016 par Emmanuel Macron, 'En Marche !' remporte l'élection présidentielle de 2017 puis les législatives. Le parti change de nom pour 'Renaissance' en 2022. Il a connu plusieurs Premiers ministres et reste une force majeure malgré la fin du second mandat de Macron en 2027.",
    leader: "Gabriel Attal",
  },
  EELV: {
    id: "eelv",
    name: "Les Écologistes",
    shortName: "EELV",
    color: "#16a34a",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Europe_Ecologie-Les_Verts_Logo.svg",
    founded: "2010",
    position: "Écologie politique / Gauche",
    description:
      "Parti écologiste français issu de la fusion des Verts et d'Europe Écologie. Il défend une transition écologique et sociale.",
    history:
      "Créé en 2010 sous le nom 'Europe Écologie-Les Verts', le parti devient 'Les Écologistes' en 2024. Il a participé à plusieurs gouvernements et alliances de gauche. Marine Tondelier en est la secrétaire nationale depuis 2022. Le parti a obtenu 4,6% à la présidentielle de 2022 avec Yannick Jadot.",
    leader: "Marine Tondelier",
  },
  PS: {
    id: "ps",
    name: "Parti Socialiste",
    shortName: "PS",
    color: "#e11d48",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Logo_du_Parti_socialiste.png",
    founded: "1969",
    position: "Gauche / Social-démocratie",
    description:
      "Principal parti de gauche français, le Parti Socialiste est un parti social-démocrate membre du Parti Socialiste Européen et de l'Internationale Socialiste.",
    history:
      "Issu de la Section Française de l'Internationale Ouvrière (SFIO), le Parti Socialiste est fondé en 1969. Il connaît son apogée sous François Mitterrand (président de 1981 à 1995) et François Hollande (2012-2017). Depuis 2017, le parti est affaibli mais reste une force locale importante.",
    leader: "Olivier Faure",
  },
  DLF: {
    id: "dlf",
    name: "Debout la France",
    shortName: "DLF",
    color: "#2563eb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Debout_la_France_logo_%282022%29.png",
    founded: "1999 (Debout la République), 2014 (Debout la France)",
    position: "Droite souverainiste / Gaulliste",
    description:
      "Parti politique français souverainiste, gaulliste et conservateur, fondé par Nicolas Dupont-Aignan. Il prône la sortie de l'UE et la défense de la souveraineté nationale.",
    history:
      "Fondé en 1999 sous le nom 'Debout la République', le parti devient 'Debout la France' en 2014. Nicolas Dupont-Aignan en est le président depuis sa création. Le parti obtient 4,7% à la présidentielle de 2017.",
    leader: "Nicolas Dupont-Aignan",
  },
  RN: {
    id: "rn",
    name: "Rassemblement National",
    shortName: "RN",
    color: "#1e3a8a",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Logo_Rassemblement_National.svg",
    founded: "1972 (Front National), 2018 (Rassemblement National)",
    position: "Extrême droite / Nationalisme",
    description:
      "Parti politique français d'extrême droite fondé par Jean-Marie Le Pen. Arrivé au second tour des présidentielles de 2002, 2017 et 2022, il est devenu la première force politique dans les sondages pour 2027.",
    history:
      "Fondé en 1972 sous le nom 'Front National', le parti connaît une ascension progressive. Marine Le Pen prend la présidence en 2011 et le renomme 'Rassemblement National' en 2018 pour le dédiaboliser. Le RN arrive au second tour des présidentielles de 2017 (33,9%) et 2022 (41,45%).",
    leader: "Jordan Bardella (président), Marine Le Pen (députée)",
  },
  LFI: {
    id: "lfi",
    name: "La France Insoumise",
    shortName: "LFI",
    color: "#dc2626",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Logo_France_Insoumise.svg",
    founded: "2016",
    position: "Gauche radicale / Antilibérale",
    description:
      "Mouvement politique français fondé par Jean-Luc Mélenchon, se réclamant de l'écologie politique et de la gauche antilibérale. Il propose une rupture avec les institutions de la Ve République.",
    history:
      "Lancé en 2016 pour la présidentielle de 2017, le mouvement obtient 19,58% au premier tour (2017) puis 21,95% (2022), échouant de peu à se qualifier pour le second tour. LFI est devenu le premier parti de gauche en France, devant le PS.",
    leader: "Jean-Luc Mélenchon",
  },
  HOR: {
    id: "hor",
    name: "Horizons",
    shortName: "HOR",
    color: "#6b21a8",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/55/Logo_Parti_Politique_Horizons_-_2021.svg",
    founded: "2021",
    position: "Centre-droit / Libéral",
    description:
      "Parti politique français fondé par Édouard Philippe, ancien Premier ministre d'Emmanuel Macron. Il représente l'aile droite de la majorité présidentielle.",
    history:
      "Fondé en octobre 2021 par Édouard Philippe, Horizons se positionne comme un parti de centre-droit, allié à Renaissance tout en gardant son autonomie. Le parti obtient 31 sièges aux législatives de 2022. Édouard Philippe,personnalité politique préférée des Français, en est le président.",
    leader: "Édouard Philippe",
  },
  LR: {
    id: "lr",
    name: "Les Républicains",
    shortName: "LR",
    color: "#2563eb",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/00/Les_R%C3%A9publicains_-_logo_%28France%2C_2023%29.svg",
    founded: "2015 (succède à l'UMP)",
    position: "Droite / Gaullisme / Conservatisme",
    description:
      "Parti politique français de droite, héritier du gaullisme et de l'UMP. Il est membre du Parti Populaire Européen.",
    history:
      "Fondé en 2015 pour succéder à l'UMP, Les Républicains ont connu des résultats électoraux en baisse depuis la présidence de Nicolas Sarkozy (2007-2012). Le parti a obtenu 20% à la présidentielle de 2022 avec Valérie Pécresse. Bruno Retailleau en est le président depuis 2025.",
    leader: "Bruno Retailleau",
  },
  REC: {
    id: "rec",
    name: "Reconquête !",
    shortName: "REC",
    color: "#8b5cf6",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Logo_du_parti_Reconqu%C3%AAte.svg",
    founded: "2021",
    position: "Extrême droite / Nationaliste",
    description:
      "Parti politique français fondé par Éric Zemmour, se positionnant à l'extrême droite sur des thèmes identitaires, anti-immigration et souverainistes.",
    history:
      "Lancé en décembre 2021 pour la présidentielle de 2022, Reconquête! obtient 7,07% au premier tour. Le parti peine depuis à trouver sa place face au RN, malgré l'arrivée de Marion Maréchal puis de sa défection.",
    leader: "Éric Zemmour",
  },
  PP: {
    id: "pp",
    name: "Place Publique",
    shortName: "PP",
    color: "#e11d48",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Logo_Place_publique.svg",
    founded: "2018",
    position: "Gauche / Social-démocrate",
    description:
      "Mouvement politique français fondé par Raphaël Glucksmann, se réclamant de la social-démocratie, du progressisme et du fédéralisme européen.",
    history:
      "Fondé en 2018 par Raphaël Glucksmann, Place Publique s'allie au Parti Socialiste pour les élections européennes de 2019 (6,2%) et 2024 (14%). Le mouvement refuse la primaire de la gauche pour 2027 et propose une 'plateforme commune' sociale-démocrate.",
    leader: "Raphaël Glucksmann",
  },
  NE: {
    id: "ne",
    name: "Nouvelle Énergie",
    shortName: "NE",
    color: "#2563eb",
    founded: "2022",
    position: "Droite / Libérale",
    description:
      "Parti politique français fondé par David Lisnard, maire de Cannes. Il se positionne à droite sur une ligne libérale et décentralisatrice.",
    history:
      "Lancé en 2022 par David Lisnard, Nouvelle Énergie vise à renouveler la droite française. Le parti est associé à l'Association des Maires de France que préside également David Lisnard.",
    leader: "David Lisnard",
  },
  UDB: {
    id: "udb",
    name: "Union Démocratique Bretonne",
    shortName: "UDB",
    color: "#0891b2",
    founded: "1964",
    position: "Centre-gauche / Autonomiste breton",
    description:
      "Parti politique breton fédéraliste et autonomiste de centre-gauche, membre de l'Alliance Libre Européenne. Il défend la reconnaissance de la Bretagne et de sa langue.",
    history:
      "Fondé en 1964, l'UDB est le principal parti autonomiste breton. Il est présent dans plusieurs collectivités territoriales et s'allie régulièrement avec la gauche. Lydie Massard, candidate à la primaire de la gauche pour 2027, en est une figure.",
    leader: "Collectif",
  },
  LP: {
    id: "lp",
    name: "Les Patriotes",
    shortName: "LP",
    color: "#1e3a8a",
    founded: "2017",
    position: "Extrême droite / Souverainiste",
    description:
      "Parti politique français fondé par Florian Philippot, ancien vice-président du Front National. Il milite pour le Frexit et le protectionnisme.",
    history:
      "Fondé en 2017 par Florian Philippot après son départ du FN, Les Patriotes prônent la sortie de l'UE et de l'OTAN. Le parti n'a pas réussi à obtenir les 500 parrainages pour les présidentielles de 2022 et 2027.",
    leader: "Florian Philippot",
  },
  RP: {
    id: "rp",
    name: "Révolution Permanente",
    shortName: "RP",
    color: "#dc2626",
    founded: "2018",
    position: "Extrême gauche / Trotskiste",
    description:
      "Parti politique trotskiste français, section française de la IVe Internationale. Il se réclame du marxisme révolutionnaire.",
    history:
      "Issu du courant 'Révolution Permanente', le parti présente des candidats aux élections. Anasse Kazib, son candidat pour 2027, est cheminot et syndicaliste SUD-Rail.",
    leader: "Anasse Kazib",
  },
  "Debout!": {
    id: "debout",
    name: "Debout !",
    shortName: "Debout!",
    color: "#e11d48",
    founded: "2025",
    position: "Gauche / Sociale-écologiste",
    description:
      "Mouvement politique fondé par François Ruffin, député de la Somme et ancien journaliste. Il se positionne à gauche, dans la continuité de son engagement social et citoyen.",
    history:
      "Lancé en 2025 par François Ruffin, Debout ! participe à la primaire de la gauche pour désigner un candidat commun pour 2027. Ruffin, ex-LFI, entend incarner une gauche sociale, populaire et citoyenne.",
    leader: "François Ruffin",
  },
  Après: {
    id: "apres",
    name: "L'Après",
    shortName: "Après",
    color: "#e11d48",
    founded: "2024",
    position: "Gauche / Écologiste et sociale",
    description:
      "Mouvement politique fondé par Clémentine Autain, députée de Seine-Saint-Denis. Il se veut une alternative à LFI tout en restant dans le champ de la gauche radicale.",
    history:
      "Fondé en 2024 par Clémentine Autain après son départ de La France Insoumise, L'Après participe à la primaire de la gauche pour 2027. Le mouvement défend une ligne sociale-écologiste.",
    leader: "Clémentine Autain",
  },
};
