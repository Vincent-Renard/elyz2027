export interface TopicPosition {
  candidateId: string;
  position: string;
}

export interface Topic {
  id: string;
  label: string;
  description: string;
  positions: TopicPosition[];
}

const positions: Record<string, Record<string, string>> = {
  "pouvoir-achat": {
    "francois-asselineau": "Augmentation du SMIC de +24%, baisse de 50% des charges patronales pour les PME, sortie de l'euro pour restaurer la compétitivité et le pouvoir d'achat.",
    "gabriel-attal": "Aller « droit au brut » : réduire l'écart entre salaire brut et net. Plan de formation de 20M de salariés à l'IA. Investissement dans l'innovation.",
    "clementine-autain": "Grande réforme fiscale : mise à contribution des très hauts patrimoines et des grandes entreprises. Revalorisation des salaires et des minimas sociaux.",
    "delphine-batho": "Plan de transition écologique de 150Mds€ pour créer des emplois verts. Taxation des transactions financières. ISF renforcé pour financer la bifurcation.",
    "nicolas-dupont-aignan": "Baisse massive des charges pour les entreprises qui relocalisent. Droits de douane sur les importations. Réduction de 30% de la facture d'électricité.",
    "jerome-guedj": "Hausse du SMIC à 1 690€ net. Réindustrialisation et nationalisations ciblées. CSG progressive pour rapprocher brut et net.",
    "anasse-kazib": "Salaire minimum à 2 000€ net par mois avec indexation sur l'inflation. Interdiction des licenciements dans les entreprises bénéficiaires. Abolition de la TVA.",
    "david-lisnard": "Réduction drastique de la dépense publique et baisse des impôts. Choc de débureaucratisation pour libérer l'économie.",
    "jean-luc-melenchon": "Partage des richesses : mise au pas de la finance, révolution fiscale. Blocage des prix sur les produits de première nécessité.",
    "florian-philippot": "Augmentation générale des salaires et des retraites. Baisse immédiate de la fiscalité sur l'énergie. Sortie de l'euro.",
    "francois-ruffin": "Taxe Zucman sur les superprofits. États généraux de la fiscalité. Abolition des privilèges des hauts fonctionnaires.",
    "marine-tondelier": "Renforcement des services publics. Justice sociale et lutte contre les inégalités. Transition écologique créatrice d'emplois.",
    "nathalie-arthaud": "Salaire minimum à 2 000€ net pour tous. Indexation sur l'inflation. Abolition de la TVA et de l'impôt sur le revenu.",
    "edouard-philippe": "Politique de l'offre massive. Introduction de 15% de capitalisation dans les retraites. Investissement dans l'éducation et la santé.",
    "bruno-retailleau": "Plafonnement des aides sociales à 70% du SMIC. Suppression de 250 000 postes de fonctionnaires. Économies budgétaires drastiques.",
  },
  "sante": {
    "francois-asselineau": "Renationalisation du système de santé. Rétablissement des services publics de proximité. Sortie des traités européens pour retrouver une marge de manœuvre budgétaire.",
    "gabriel-attal": "Investissement massif dans la santé et l'éducation. Réforme du système pour garantir l'accès aux soins et réduire les déserts médicaux.",
    "clementine-autain": "Grande réforme de la Sécurité sociale. Création d'une Sécurité sociale de l'alimentation. Lutte contre les déserts médicaux.",
    "delphine-batho": "Priorité à la santé environnementale : lutte contre les pollutions chimiques. Plan de 150Mds€ pour la transition écologique bénéfique à la santé.",
    "nicolas-dupont-aignan": "Réduction des charges pour les professionnels de santé. Rétablissement de la souveraineté sanitaire et pharmaceutique.",
    "jerome-guedj": "Défense d'une « grande Sécu » pour mieux financer la protection sociale. Lutte contre les déserts médicaux.",
    "anasse-kazib": "Gratuité des soins. Nationalisation des banques et des grandes entreprises pour financer la santé. Retraite à 60 ans.",
    "david-lisnard": "Recentrage de l'État sur ses missions régaliennes incluant la santé. Décentralisation pour donner plus de pouvoir aux territoires.",
    "jean-luc-melenchon": "Planification sanitaire. Mise au pas de la finance pour dégager des moyens. Annulation de la dette publique pour financer la santé.",
    "florian-philippot": "Augmentation des moyens pour l'hôpital public. Sortie de l'UE pour retrouver des marges budgétaires.",
    "francois-ruffin": "Création d'un statut des travailleurs essentiels dont les soignants, avec salaires revalorisés.",
    "marine-tondelier": "Renforcement des services publics de santé. Justice sociale et écologique pour améliorer la santé publique.",
    "nathalie-arthaud": "Gratuité des soins. Nationalisation des grandes entreprises pharmaceutiques. Levée du secret bancaire pour financer.",
    "edouard-philippe": "Pilier santé du programme : investissement massif. Réforme du système pour garantir l'accès aux soins.",
    "bruno-retailleau": "Économies sur les dépenses sociales. Recentrage sur l'efficacité du système. Suppression de postes de fonctionnaires administratifs.",
  },
  "immigration": {
    "francois-asselineau": "Rétablissement du contrôle des frontières nationales. Sortie de l'UE et de Schengen. Régulation souveraine de l'immigration.",
    "gabriel-attal": "Préférence travail : durcissement du regroupement familial, priorité à l'immigration économique choisie. Expulsions des délinquants étrangers.",
    "clementine-autain": "Liberté de circulation. Accueil digne des migrants. Régularisation des sans-papiers. Politique d'intégration renforcée.",
    "delphine-batho": "Position républicaine : fermeté sur les valeurs de la République et la laïcité. Contrôle des flux migratoires dans le respect du droit international.",
    "nicolas-dupont-aignan": "Arrêt de l'immigration. Rétablissement des frontières avec déploiement de l'armée. Expulsion des délinquants étrangers. Fin du regroupement familial.",
    "jerome-guedj": "Gauche républicaine et laïque. Contrôle des flux mais dans le respect des valeurs humanistes. Lutte contre les filières d'immigration clandestine.",
    "anasse-kazib": "Liberté de circulation et d'installation. Régularisation des sans-papiers. Abolition des frontières. Défense des travailleurs migrants.",
    "david-lisnard": "État régalien fort. Contrôle strict des frontières et de l'immigration. Priorité à l'intégration républicaine.",
    "jean-luc-melenchon": "Liberté de circulation. Régularisation des sans-papiers. Abrogation des lois restrictives. Accueil inconditionnel.",
    "florian-philippot": "Fin du regroupement familial. Rétablissement des frontières nationales. Expulsion des délinquants étrangers. Sortie de Schengen.",
    "francois-ruffin": "Politique d'accueil humaine et digne. Lutte contre les causes de l'immigration. Priorité à la justice sociale ici et ailleurs.",
    "marine-tondelier": "Accueil des migrants dans le respect des droits humains. Politique d'intégration renforcée. Coopération européenne sur l'asile.",
    "nathalie-arthaud": "Liberté de circulation et d'installation. Régularisation des sans-papiers. Abolition des frontières. Solidarité internationale.",
    "edouard-philippe": "Immigration de travail choisie et contrôlée. Durcissement du regroupement familial. Expulsions des personnes en situation irrégulière.",
    "bruno-retailleau": "Référendum sur l'immigration. Révision constitutionnelle pour reprendre le contrôle. Priorité nationale. Tolérance zéro.",
  },
  "securite": {
    "francois-asselineau": "Rétablissement de l'autorité de l'État. Renforcement des moyens de la justice et de la police. Recentrage sur la souveraineté nationale.",
    "gabriel-attal": "Rétablissement de l'ordre. Justice ferme et efficace. Soutien aux forces de l'ordre. Lutte contre le narcotrafic.",
    "clementine-autain": "Prévention et justice sociale. Lutte contre les racines de l'insécurité. Refus de la surenchère sécuritaire et du tout-répressif.",
    "delphine-batho": "Autorité républicaine ferme. Réaffirmation de l'État de droit. Lutte contre les violences et les trafics. Position nuancée sur le régalien.",
    "nicolas-dupont-aignan": "État autoritaire. Rétablissement de la peine plancher. Tolérance zéro. Renforcement massif de la police et de la gendarmerie.",
    "jerome-guedj": "Gauche républicaine : fermeté sur les questions de sécurité dans le respect de l'État de droit. Prévention et sanctions.",
    "anasse-kazib": "Lutte contre la délinquance économique et financière. Refus de la répression des classes populaires. Contrôle citoyen de la police.",
    "david-lisnard": "Priorité absolue à la sécurité comme mission régalienne. Renforcement des moyens de la police et de la justice. Tolérance zéro.",
    "jean-luc-melenchon": "Refus de la surenchère sécuritaire. Lutte contre les causes sociales de l'insécurité. Contrôle démocratique des forces de l'ordre.",
    "florian-philippot": "Rétablissement de l'ordre : peines planchers, tolérance zéro. Renforcement des moyens de la police. Priorité à la sécurité des Français.",
    "francois-ruffin": "Lutte contre la délinquance financière des puissants. Justice sociale comme rempart à l'insécurité. Police de proximité.",
    "marine-tondelier": "Prévention et justice sociale. Lutte contre les discriminations dans la police. Refus de la surenchère sécuritaire.",
    "nathalie-arthaud": "Lutte contre la délinquance des puissants et des grandes entreprises. Justice égale pour tous. Police au service des travailleurs.",
    "edouard-philippe": "Rétablissement de l'ordre. Justice ferme. Soutien aux forces de l'ordre. Lutte contre le narcotrafic avec des moyens accrus.",
    "bruno-retailleau": "État d'urgence anti-trafics : bouclage 24h/24 des quartiers touchés. Tolérance zéro. Peines planchers. Révision constitutionnelle.",
  },
  "education": {
    "francois-asselineau": "Renationalisation du système éducatif. Retour aux fondamentaux. Réévaluation des salaires des enseignants.",
    "gabriel-attal": "Brevet obligatoire pour passer au lycée. Intégration de l'IA dès le collège. Baisse du nombre d'élèves par classe.",
    "clementine-autain": "Grand plan d'investissement dans l'éducation. Réduction des effectifs par classe. Revalorisation des enseignants.",
    "delphine-batho": "Éducation à l'écologie et au vivant. Réaffirmation de la laïcité à l'école. Investissement dans l'enseignement public.",
    "nicolas-dupont-aignan": "Retour aux fondamentaux : lecture, écriture, calcul. Autorité des enseignants. Défense de la culture française.",
    "jerome-guedj": "Défense de l'école républicaine, laïque et universaliste. Investissement dans l'éducation prioritaire. Revalorisation des enseignants.",
    "anasse-kazib": "École gratuite et émancipatrice pour tous. Lutte contre les inégalités scolaires. Investissement massif dans l'éducation publique.",
    "david-lisnard": "Refondation du système éducatif pour faire de la France une superpuissance éducative. Excellence et mérite.",
    "jean-luc-melenchon": "Planification éducative. École gratuite et émancipatrice. Investissement massif. Réduction des effectifs par classe.",
    "florian-philippot": "Retour aux fondamentaux. Respect de l'autorité des enseignants. Défense de la culture et de l'histoire de France.",
    "francois-ruffin": "École émancipatrice et égalitaire. Investissement dans l'éducation prioritaire. Revalorisation du métier d'enseignant.",
    "marine-tondelier": "Éducation à l'écologie et au développement durable. École inclusive et égalitaire. Investissement dans le service public d'éducation.",
    "nathalie-arthaud": "École gratuite et émancipatrice pour tous. Égalité des chances. Investissement massif dans l'enseignement public.",
    "edouard-philippe": "Pilier éducation du programme. Investissement dans l'école. Mérite et excellence. Réforme du système éducatif.",
    "bruno-retailleau": "Autorité à l'école. Retour aux fondamentaux. Réforme du système éducatif. Investissement ciblé.",
  },
  "ecologie": {
    "francois-asselineau": "Sortie du marché européen de l'électricité. Renationalisation d'EDF. Investissement dans le nucléaire existant.",
    "gabriel-attal": "Transition écologique pragmatique. Mix énergétique incluant le nucléaire. Innovation verte. Compétitivité et écologie.",
    "clementine-autain": "Planification écologique avec réindustrialisation verte. Sécurité sociale de l'alimentation. Sortie des énergies fossiles.",
    "delphine-batho": "Décroissance et sobriété. Transition écologique de 150Mds€. Sortie de l'OTAN et du nucléaire. VIe République écologique.",
    "nicolas-dupont-aignan": "Sortie du marché européen de l'électricité (-30%). Relance du nucléaire. Arrêt des subventions aux énergies renouvelables.",
    "jerome-guedj": "Bifurcation écologique et sociale. Réindustrialisation verte. Soutien au nucléaire comme énergie de transition.",
    "anasse-kazib": "Planification écologique sous contrôle populaire. Gratuité des transports. Interdiction des élevages intensifs. Sortie du nucléaire.",
    "david-lisnard": "Indépendance énergétique. Nucléaire comme pilier. Écologie pragmatique et réaliste. Souveraineté énergétique.",
    "jean-luc-melenchon": "Bifurcation écologique. Sortie des énergies fossiles et du nucléaire. Planification verte. Investissement massif.",
    "florian-philippot": "Arrêt des éoliennes. Réinvestissement massif dans le nucléaire nouvelle génération. Sortie du marché européen de l'électricité.",
    "francois-ruffin": "Transition écologique juste. Planification démocratique. Investissement dans les énergies renouvelables. Rénovation thermique.",
    "marine-tondelier": "Bifurcation énergétique vers le 100% renouvelable. Planification écologique. Prospérité écologique. 478 propositions citoyennes.",
    "nathalie-arthaud": "Planification écologique sous contrôle des travailleurs. Nationalisation des grandes entreprises polluantes. Gratuité des transports.",
    "edouard-philippe": "Transition écologique pragmatique. Nucléaire comme énergie de base. Innovation verte. Compétitivité et écologie.",
    "bruno-retailleau": "Relance du nucléaire (au moins 6 EPR). Arrêt des subventions aux énergies renouvelables. Fin du ZAN.",
  },
  "retraites": {
    "francois-asselineau": "Retraite à 60 ans. Maintien du système par répartition. Revalorisation des petites retraites.",
    "gabriel-attal": "Introduction d'un système de capitalisation. Fin de l'âge légal. Système mixte par répartition et capitalisation.",
    "clementine-autain": "Retraite à 60 ans. Abrogation de la réforme des retraites. Retour à un système basé sur la durée de cotisation.",
    "delphine-batho": "Retraite à 60 ans. Défense du système par répartition. Abrogation de la réforme Macron.",
    "nicolas-dupont-aignan": "Retraite à 60 ans pour les carrières longues. Maintien du système par répartition. Défense des retraites agricoles.",
    "jerome-guedj": "Abrogation de la réforme à 64 ans. Retour à un système basé sur la durée de cotisation et la pénibilité. Retraite à 60 ans.",
    "anasse-kazib": "Retraite à 60 ans avec une pension minimale de 2 000€. Retour à 37,5 années de cotisation.",
    "david-lisnard": "Réforme du système pour assurer sa viabilité. Allongement de la durée de cotisation. Capitalisation complémentaire.",
    "jean-luc-melenchon": "Retraite à 60 ans. Abrogation des réformes. Maintien du système par répartition. Revalorisation des pensions.",
    "florian-philippot": "Retraite à 60 ans. Maintien du système par répartition. Défense des retraites du secteur public.",
    "francois-ruffin": "Retraite à 60 ans. Abrogation de la réforme Macron. Revalorisation des petites retraites. Retraite avancée pour les travailleurs essentiels.",
    "marine-tondelier": "Retraite à 60 ans. Abrogation des réformes injustes. Système par répartition. Justice intergénérationnelle.",
    "nathalie-arthaud": "Retraite à 60 ans avec un minimum de 2 000€. Retour aux 37,5 années de cotisation. Abrogation des réformes.",
    "edouard-philippe": "15% de capitalisation complémentaire. Report au-delà de 64 ans. Système mixte pour garantir la viabilité.",
    "bruno-retailleau": "Maintien de l'âge légal à 64 ans. Réforme du système pour assurer sa viabilité. Capitalisation complémentaire.",
  },
};

const topicMeta: { id: string; label: string; description: string }[] = [
  {
    id: "pouvoir-achat",
    label: "Pouvoir d'achat",
    description: "Salaires, inflation, fiscalité, coût de la vie. 36% des Français en font la priorité numéro un de la présidentielle (sondage YouGov).",
  },
  {
    id: "sante",
    label: "Santé",
    description: "Préservation du système de santé, déserts médicaux, accès aux soins. Sujet le plus déterminant pour 76% des électeurs (Ipsos).",
  },
  {
    id: "immigration",
    label: "Immigration",
    description: "Contrôle des flux, intégration, frontières, politique d'asile. 16% des Français en font la priorité (YouGov).",
  },
  {
    id: "securite",
    label: "Sécurité",
    description: "Lutte contre la délinquance, narcotrafic, justice, forces de l'ordre. 14% en font la priorité (YouGov).",
  },
  {
    id: "education",
    label: "Éducation",
    description: "École, programme scolaire, condition enseignante, numérique éducatif. 7e thème le plus déterminant (YouGov).",
  },
  {
    id: "ecologie",
    label: "Écologie",
    description: "Transition énergétique, climat, nucléaire, renouvelables. 7% des Français en font la priorité (YouGov).",
  },
  {
    id: "retraites",
    label: "Retraites",
    description: "Âge de départ, système par répartition, capitalisation, réforme. Sujet clivant entre les candidats.",
  },
];

const candidateNames: Record<string, string> = {
  "francois-asselineau": "François Asselineau",
  "gabriel-attal": "Gabriel Attal",
  "clementine-autain": "Clémentine Autain",
  "delphine-batho": "Delphine Batho",
  "nicolas-dupont-aignan": "Nicolas Dupont-Aignan",
  "jerome-guedj": "Jérôme Guedj",
  "anasse-kazib": "Anasse Kazib",
  "david-lisnard": "David Lisnard",
  "jean-luc-melenchon": "Jean-Luc Mélenchon",
  "florian-philippot": "Florian Philippot",
  "francois-ruffin": "François Ruffin",
  "marine-tondelier": "Marine Tondelier",
  "nathalie-arthaud": "Nathalie Arthaud",
  "edouard-philippe": "Édouard Philippe",
  "bruno-retailleau": "Bruno Retailleau",
};

export function getAllTopics(): Topic[] {
  return topicMeta.map((meta) => ({
    ...meta,
    positions: Object.entries(positions[meta.id] ?? {}).map(([candidateId, position]) => ({
      candidateId,
      position,
    })),
  }));
}

export function getCandidateName(id: string): string {
  return candidateNames[id] ?? id;
}
