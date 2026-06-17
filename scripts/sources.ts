export interface MediaSource {
  name: string;
  url: string;
  rss: string;
  type: "news" | "tv" | "radio";
}

const sources: MediaSource[] = [
  // ── Nationaux (20 originaux) ────────────────────────────────────────────
  { name: "Le Monde", url: "https://www.lemonde.fr", rss: "https://www.lemonde.fr/politique/rss_full.xml", type: "news" },
  { name: "Le Figaro", url: "https://www.lefigaro.fr", rss: "https://www.lefigaro.fr/rss/figaro_politique.xml", type: "news" },
  { name: "France Info", url: "https://www.francetvinfo.fr", rss: "https://www.francetvinfo.fr/titres.rss", type: "news" },
  { name: "Le Parisien", url: "https://www.leparisien.fr", rss: "https://www.leparisien.fr/politique/rss.xml", type: "news" },
  { name: "Libération", url: "https://www.liberation.fr", rss: "https://www.liberation.fr/politique/rss.xml", type: "news" },
  { name: "Les Échos", url: "https://www.lesechos.fr", rss: "https://www.lesechos.fr/rss/politique.xml", type: "news" },
  { name: "Le Point", url: "https://www.lepoint.fr", rss: "https://www.lepoint.fr/politique/rss.xml", type: "news" },
  { name: "L'Express", url: "https://www.lexpress.fr", rss: "https://www.lexpress.fr/rss/politique.xml", type: "news" },
  { name: "Ouest-France", url: "https://www.ouest-france.fr", rss: "https://www.ouest-france.fr/rss/politique.xml", type: "news" },
  { name: "20 Minutes", url: "https://www.20minutes.fr", rss: "https://www.20minutes.fr/politique/rss.xml", type: "news" },
  { name: "Le Nouvel Obs", url: "https://www.nouvelobs.com", rss: "https://www.nouvelobs.com/politique/rss.xml", type: "news" },
  { name: "Mediapart", url: "https://www.mediapart.fr", rss: "https://www.mediapart.fr/articles/feed", type: "news" },
  { name: "Marianne", url: "https://www.marianne.net", rss: "https://www.marianne.net/rss/politique.xml", type: "news" },
  { name: "La Dépêche", url: "https://www.ladepeche.fr", rss: "https://www.ladepeche.fr/rss/politique.xml", type: "news" },
  { name: "La Croix", url: "https://www.la-croix.com", rss: "https://www.la-croix.com/RSS/politique", type: "news" },
  { name: "Paris Match", url: "https://www.parismatch.com", rss: "https://www.parismatch.com/rss/politique.xml", type: "news" },
  { name: "Le JDD", url: "https://www.lejdd.fr", rss: "https://www.lejdd.fr/rss/politique.xml", type: "news" },
  { name: "TF1 Info", url: "https://www.tf1info.fr", rss: "https://www.tf1info.fr/politique/rss.xml", type: "tv" },
  { name: "BFM TV", url: "https://www.bfmtv.com", rss: "https://www.bfmtv.com/politique/rss.xml", type: "tv" },
  { name: "France 24", url: "https://www.france24.com", rss: "https://www.france24.com/fr/politique/rss", type: "tv" },

  // ── Radios ──────────────────────────────────────────────────────────────
  { name: "RTL", url: "https://www.rtl.fr", rss: "https://www.rtl.fr/actu/politique/rss.xml", type: "radio" },
  { name: "Europe 1", url: "https://www.europe1.fr", rss: "https://www.europe1.fr/politique/rss.xml", type: "radio" },
  { name: "France Inter", url: "https://www.franceinter.fr", rss: "https://www.franceinter.fr/politique/rss.xml", type: "radio" },
  { name: "France Culture", url: "https://www.franceculture.fr", rss: "https://www.franceculture.fr/politique/rss.xml", type: "radio" },
  { name: "RMC", url: "https://rmc.bfmtv.com", rss: "https://rmc.bfmtv.com/politique/rss.xml", type: "radio" },
  { name: "Sud Radio", url: "https://www.sudradio.fr", rss: "https://www.sudradio.fr/feed/podcast/politique", type: "radio" },

  // ── Régionaux ───────────────────────────────────────────────────────────
  { name: "Sud Ouest", url: "https://www.sudouest.fr", rss: "https://www.sudouest.fr/politique/rss.xml", type: "news" },
  { name: "Le Dauphiné Libéré", url: "https://www.ledauphine.com", rss: "https://www.ledauphine.com/politique/rss.xml", type: "news" },
  { name: "La Voix du Nord", url: "https://www.lavoixdunord.fr", rss: "https://www.lavoixdunord.fr/politique/rss.xml", type: "news" },
  { name: "Le Télégramme", url: "https://www.letelegramme.fr", rss: "https://www.letelegramme.fr/politique/rss.xml", type: "news" },
  { name: "Le Progrès", url: "https://www.leprogres.fr", rss: "https://www.leprogres.fr/politique/rss.xml", type: "news" },
  { name: "Midi Libre", url: "https://www.midilibre.fr", rss: "https://www.midilibre.fr/politique/rss.xml", type: "news" },
  { name: "La Provence", url: "https://www.laprovence.com", rss: "https://www.laprovence.com/politique/rss.xml", type: "news" },
  { name: "Le Maine Libre", url: "https://www.lemainelibre.fr", rss: "https://www.lemainelibre.fr/politique/rss.xml", type: "news" },
  { name: "Paris-Normandie", url: "https://www.paris-normandie.fr", rss: "https://www.paris-normandie.fr/politique/rss.xml", type: "news" },
  { name: "L'Est Républicain", url: "https://www.estrepublicain.fr", rss: "https://www.estrepublicain.fr/politique/rss.xml", type: "news" },
  { name: "Le Républicain Lorrain", url: "https://www.republicain-lorrain.fr", rss: "https://www.republicain-lorrain.fr/politique/rss.xml", type: "news" },
  { name: "La Nouvelle République", url: "https://www.lanouvellerepublique.fr", rss: "https://www.lanouvellerepublique.fr/politique/rss.xml", type: "news" },
  { name: "Le Populaire du Centre", url: "https://www.lepopulaire.fr", rss: "https://www.lepopulaire.fr/politique/rss.xml", type: "news" },
  { name: "L'Yonne Républicaine", url: "https://www.lyonne.fr", rss: "https://www.lyonne.fr/politique/rss.xml", type: "news" },

  // ── Magazines ───────────────────────────────────────────────────────────
  { name: "Courrier International", url: "https://www.courrierinternational.com", rss: "https://www.courrierinternational.com/feed/politique/rss.xml", type: "news" },
  { name: "Le Grand Continent", url: "https://legrandcontinent.eu", rss: "https://legrandcontinent.eu/fr/feed", type: "news" },
  { name: "Politique Magazine", url: "https://www.politiquemagazine.fr", rss: "https://www.politiquemagazine.fr/feed", type: "news" },
  { name: "Causeur", url: "https://www.causeur.fr", rss: "https://www.causeur.fr/feed", type: "news" },
  { name: "Valeurs Actuelles", url: "https://www.valeursactuelles.com", rss: "https://www.valeursactuelles.com/politique/rss.xml", type: "news" },
  { name: "L'Humanité", url: "https://www.humanite.fr", rss: "https://www.humanite.fr/politique/rss.xml", type: "news" },
  { name: "Politis", url: "https://www.politis.fr", rss: "https://www.politis.fr/feed", type: "news" },
  { name: "Le Canard Enchaîné", url: "https://www.canardenchaine.com", rss: "https://www.canardenchaine.com/feed", type: "news" },
  { name: "Charlie Hebdo", url: "https://charliehebdo.fr", rss: "https://charliehebdo.fr/feed", type: "news" },
  { name: "Society Magazine", url: "https://www.societymag.fr", rss: "https://www.societymag.fr/feed", type: "news" },
];


export default sources;
