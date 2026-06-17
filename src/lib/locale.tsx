"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type Locale = "fr" | "en";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const dict: Record<string, { fr: string; en: string }> = {
  // Navbar
  "nav.home": { fr: "Accueil", en: "Home" },
  "nav.candidates": { fr: "Candidats", en: "Candidates" },
  "nav.topics": { fr: "Sujets", en: "Topics" },
  "nav.polls": { fr: "Sondages", en: "Polls" },
  "nav.games": { fr: "Jeux", en: "Games" },
  "nav.media": { fr: "Veille", en: "Media" },
  "nav.agenda": { fr: "Agenda", en: "Agenda" },

  // Home
  "home.title": { fr: "Présidentielle 2027", en: "2027 Presidential Election" },
  "home.subtitle": { fr: "Suivi indépendant de l'élection présidentielle française", en: "Independent tracking of the French presidential election" },
  "home.frise": { fr: "Frise présidentielle", en: "Campaign Timeline" },
  "home.friseDesc": { fr: "Chronologie des candidatures et événements clés de l'élection.", en: "Timeline of candidacies and key election events." },
  "home.declared": { fr: "Déclarés", en: "Declared" },
  "home.primaryShort": { fr: "Primaire", en: "Primary" },
  "home.possibleShort": { fr: "Possibles", en: "Possible" },
  "home.total": { fr: "Total", en: "Total" },
  "home.candidates": { fr: "candidats", en: "candidates" },
  "home.events": { fr: "Événements", en: "Events" },
  "home.showFuture": { fr: "Afficher les futurs", en: "Show future" },
  "home.hideFuture": { fr: "Masquer les futurs", en: "Hide future" },

  /* Candidates list */
  "candidates.title": { fr: "Candidats 2027", en: "Candidates 2027" },
  "candidates.all": { fr: "Tous", en: "All" },
  "candidates.declared": { fr: "Déclarés", en: "Declared" },
  "candidates.designated": { fr: "Désignés", en: "Designated" },
  "candidates.primary": { fr: "Primaire", en: "Primary" },
  "candidates.possible": { fr: "Possibles", en: "Possible" },
  "candidates.filterDeclared": { fr: "Candidats ayant officiellement annoncé leur candidature à l'élection présidentielle de 2027.", en: "Candidates who have officially announced their candidacy for the 2027 presidential election." },
  "candidates.filterDesignated": { fr: "Candidats désignés officiellement par leur parti à l'issue d'un vote interne ou d'un congrès.", en: "Candidates officially designated by their party following an internal vote or congress." },
  "candidates.filterPrimary": { fr: "Candidats déclarés dans le cadre d'une primaire (notamment la primaire de la gauche du 11 octobre 2026).", en: "Candidates declared as part of a primary (notably the left-wing primary of October 11, 2026)." },
  "candidates.filterPossible": { fr: "Personnalités pressenties ou pressenties comme candidates, mais n'ayant pas encore officialisé leur candidature.", en: "Prominent figures rumored to be candidates, but who have not yet formalized their candidacy." },
  "candidates.none": { fr: "Aucun candidat avec ce statut.", en: "No candidates with this status." },
  "candidates.statusDeclared": { fr: "Déclaré", en: "Declared" },
  "candidates.statusDesignated": { fr: "Désigné", en: "Designated" },
  "candidates.statusPrimary": { fr: "Primaire", en: "Primary" },
  "candidates.statusPossible": { fr: "Possible", en: "Possible" },

  // Topics
  "topics.title": { fr: "Sujets 2027", en: "Topics 2027" },
  "topics.subtitle": { fr: "Les thèmes qui préoccupent les Français et les positions des candidats.", en: "Key issues for French voters and candidate positions." },

  // Polls
  "polls.title": { fr: "Sondages 2027", en: "Polls 2027" },
  "polls.subtitle": { fr: "Intentions de vote pour le premier tour de l'élection présidentielle.", en: "Voting intentions for the first round of the presidential election." },
  "polls.disclaimer": { fr: "Les sondages mesurent un rapport de force à un instant donné. Ils ne sont pas prédictifs du résultat final. Consultez les détails et marges d'erreur sur les sites des instituts. Données collectées depuis", en: "Polls measure the balance of power at a given moment. They are not predictive of the final result. Check details and margins on institute websites. Data collected from" },
  "polls.evolution": { fr: "Évolution des intentions de vote", en: "Poll evolution" },

  // Games
  "games.title": { fr: "Jeux 2027", en: "Games 2027" },
  "games.subtitle": { fr: "Teste tes connaissances sur l'élection présidentielle.", en: "Test your knowledge about the presidential election." },
  "games.quiz": { fr: "Quiz", en: "Quiz" },
  "games.quotes": { fr: "Citations", en: "Quotes" },
  "games.simulator": { fr: "Simulateur", en: "Simulator" },
  "games.memory": { fr: "Memory", en: "Memory" },
  "games.score": { fr: "Score", en: "Score" },
  "games.question": { fr: "Question", en: "Question" },
  "games.next": { fr: "Suivante →", en: "Next →" },
  "games.result": { fr: "Voir le résultat", en: "See results" },
  "games.playAgain": { fr: "Rejouer", en: "Play again" },
  "games.start": { fr: "Commencer", en: "Start" },
  "games.restart": { fr: "Recommencer", en: "Restart" },
  "games.perfect": { fr: "Score parfait !", en: "Perfect score!" },
  "games.notBad": { fr: "Pas mal !", en: "Not bad!" },
  "games.keepTrying": { fr: "Continue de suivre la campagne !", en: "Keep following the campaign!" },
  "games.moves": { fr: "Coups", en: "Moves" },
  "games.pairs": { fr: "Paires", en: "Pairs" },
  "games.congrats": { fr: "Félicitations !", en: "Congratulations!" },
  "games.found": { fr: "Tu as trouvé toutes les paires en", en: "You found all pairs in" },
  "games.memoryDesc": { fr: "Retrouve les paires de candidats identiques.", en: "Find pairs of matching candidates." },
  "games.whoSaid": { fr: "Qui a prononcé cette phrase ?", en: "Who said this?" },
  "games.adjustScores": { fr: "Ajuste les scores pour simuler le 1er tour", en: "Adjust scores to simulate the first round" },
  "games.firstRound": { fr: "Résultat du 1er tour", en: "First round result" },
  "games.over100": { fr: "Le total dépasse 100% !", en: "Total exceeds 100%!" },
  "games.expertQuotes": { fr: "Tu connais toutes les petites phrases !", en: "You know all the quotes!" },
  "games.readMore": { fr: "Relis les programmes !", en: "Read the news more!" },
  "games.youKnowAll": { fr: "Tu es incollable !", en: "You're unstoppable!" },

  // Media
  "media.title": { fr: "Veille Médias", en: "Media Watch" },
  "media.subtitle": { fr: "articles collectés le", en: "articles collected on" },
  "media.all": { fr: "Tous", en: "All" },
  "media.none": { fr: "Aucun article collecté.", en: "No articles collected." },
  "media.run": { fr: "Lance", en: "Run" },
  "media.loading": { fr: "Chargement...", en: "Loading..." },
  "media.sondage": { fr: "Sondages", en: "Polls" },
  "media.candidature": { fr: "Candidatures", en: "Candidacies" },
  "media.calendrier": { fr: "Calendrier", en: "Calendar" },
  "media.judiciaire": { fr: "Judiciaire", en: "Legal" },
  "media.analyse": { fr: "Analyses", en: "Analysis" },
  "media.programme": { fr: "Programmes", en: "Programs" },
  "media.meeting": { fr: "Meetings", en: "Rallies" },
  "media.media": { fr: "Médias", en: "Media" },
  "media.discours": { fr: "Discours", en: "Speeches" },
  "media.interne": { fr: "Interne", en: "Internal" },

  // Footer
  "footer.tagline": { fr: "Suivi indépendant de l'actualité présidentielle", en: "Independent presidential election tracking" },

  // Candidate page
  "candidate.program": { fr: "Programme", en: "Program" },
  "candidate.agenda": { fr: "Agenda", en: "Agenda" },
  "candidate.articles": { fr: "Médias et discours", en: "Media & Speeches" },
  "candidate.polls": { fr: "Sondages", en: "Polls" },
  "candidate.mandates": { fr: "Mandats", en: "Mandates" },
  "candidate.previousElections": { fr: "Historique présidentielle", en: "Presidential history" },
  "candidate.socialMedia": { fr: "Réseaux sociaux", en: "Social Media" },
  "candidate.hidePast": { fr: "Masquer les passés", en: "Hide past" },
  "candidate.showPast": { fr: "Afficher les passés", en: "Show past" },
  "candidate.searchProgram": { fr: "Rechercher dans le programme...", en: "Search program..." },
  "candidate.fullProgram": { fr: "Voir le programme complet", en: "See full program" },

  // Party page
  "party.candidates": { fr: "Candidats", en: "Candidates" },
  "party.history": { fr: "Histoire", en: "History" },
  "party.position": { fr: "Position politique", en: "Political position" },

  // Agenda page
  "agenda.title": { fr: "Agenda 2027", en: "Agenda 2027" },
  "agenda.subtitle": { fr: "Meetings, discours et passages médias des candidats.", en: "Rallies, speeches and media appearances." },
  "agenda.meeting": { fr: "Meeting", en: "Rally" },
  "agenda.conference": { fr: "Conférence", en: "Conference" },
  "agenda.media": { fr: "Média", en: "Media" },
  "agenda.declaration": { fr: "Déplacement", en: "Visit" },
  "agenda.showFilters": { fr: "Filtres", en: "Filters" },
  "agenda.hideFilters": { fr: "Masquer", en: "Hide" },
  "agenda.candidates": { fr: "Candidats", en: "Candidates" },
  "agenda.selectAll": { fr: "Tout cocher", en: "Select all" },
  "agenda.deselectAll": { fr: "Tout décocher", en: "Deselect all" },
  "agenda.prevMonth": { fr: "Mois précédent", en: "Previous month" },
  "agenda.nextMonth": { fr: "Mois suivant", en: "Next month" },
  "agenda.seeAll": { fr: "Tous les événements", en: "All events" },
  "agenda.hidePast": { fr: "Masquer les passés", en: "Hide past" },
  "agenda.showPast": { fr: "Afficher les passés", en: "Show past" },
  "agenda.noFuture": { fr: "Aucun événement à venir.", en: "No upcoming events." },
  "agenda.noEvents": { fr: "Aucun événement pour ce mois.", en: "No events this month." },
  "agenda.source": { fr: "Source", en: "Source" },
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr");

  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const toggle = useCallback(() => setLocaleState((p) => (p === "fr" ? "en" : "fr")), []);
  const t = useCallback(
    (key: string): string => dict[key]?.[locale] ?? key,
    [locale],
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
