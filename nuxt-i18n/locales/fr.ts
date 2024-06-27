
export default defineI18nLocale(async locale => {
  // Simulate fetching translations from an API
  return {
    "welcome": "Bienvenue!",
    "message": "Ce tutoriel vous est proposé par {name}",
    "home": "Accueil",
    "about": "À propos",
    "aboutTitle": "À propos de nous",
    "aboutDescription": "Ceci est la page à propos de notre application.",
    "buttonPressed": "Vous avez appuyé sur le bouton {count} fois | Vous avez appuyé sur le bouton {count} fois",
    "currentDate": "Date actuelle: {date}",
    "deadline": "Date limite: {dateTime}",
    "unitsPrice": "{units} unités coûtent {price}",
    "meta": {
      "title": "Bienvenue sur notre site",
      "description": "C'est le meilleur site jamais créé pour les tutoriels."
    }
  }
})