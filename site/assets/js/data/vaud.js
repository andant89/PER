/* Spécificités vaudoises.
   ⚠️ Rédigé de mémoire, sans accès au site de l'État de Vaud au moment de la
   création. À confronter à vd.ch (Direction générale de l'enseignement
   obligatoire, DGEO) avant de s'y fier — voir docs/VERIFIER-LES-CONTENUS.md. */

export const VAUD = {
  intro:
    "Le PER est commun à toute la Suisse romande, mais son application relève de chaque canton : " +
    "évaluation, orientation, horaires et services de soutien sont vaudois.",
  verifie: false,

  reperes: [
    {
      titre: "Entrée à l'école",
      emoji: "🎒",
      texte:
        "La scolarité est obligatoire dès 4 ans révolus, et dure 11 ans. La 1P et la 2P correspondent à " +
        "l'ancienne école enfantine : l'enfant y apprend d'abord à devenir élève."
    },
    {
      titre: "Évaluation en 1P–2P",
      emoji: "📋",
      texte:
        "Pas de notes au début du cycle 1 : l'évaluation prend la forme d'observations de l'enseignant·e sur " +
        "les progrès de l'enfant, communiquées lors des entretiens avec les parents. Inutile de chercher une " +
        "performance chiffrée à cet âge."
    },
    {
      titre: "Devoirs",
      emoji: "🏡",
      texte:
        "En 1P–2P, il n'y a pas de devoirs à la maison. Ce que vous faites avec votre enfant relève du jeu et " +
        "de l'accompagnement, jamais du rattrapage scolaire — et c'est très bien ainsi."
    },
    {
      titre: "Orientation en fin de 8P",
      emoji: "🧭",
      texte:
        "À la fin du cycle 2, les élèves sont orientés vers la voie générale (VG) ou la voie prégymnasiale (VP) " +
        "pour les trois années du cycle 3."
    },
    {
      titre: "Épreuves cantonales de référence",
      emoji: "📝",
      texte:
        "Le canton fait passer des épreuves communes (ECR) à certaines années du cursus, pour situer les classes " +
        "par rapport aux attentes du PER. Elles ne concernent pas le cycle 1 en début de parcours."
    },
    {
      titre: "Si quelque chose inquiète",
      emoji: "🤝",
      texte:
        "Le service PPLS (psychologie, psychomotricité et logopédie en milieu scolaire) intervient gratuitement " +
        "dans les établissements vaudois. On y accède par l'enseignant·e ou la direction de l'établissement. " +
        "Un retard de langage repéré en 1P se travaille bien plus facilement qu'en 4P."
    }
  ],

  interlocuteurs: [
    { qui: "L'enseignant·e", quand: "Premier interlocuteur pour tout ce qui touche la classe et les apprentissages." },
    { qui: "La direction de l'établissement", quand: "Organisation, absences, transport, situations qui dépassent la classe." },
    { qui: "Le service PPLS", quand: "Langage, motricité, difficultés d'apprentissage ou de comportement." },
    { qui: "L'infirmière scolaire", quand: "Santé, sommeil, vue et audition — un dépistage visuel ou auditif explique parfois beaucoup." },
    { qui: "La DGEO (vd.ch)", quand: "Cadre légal, calendrier scolaire, questions générales sur la scolarité vaudoise." }
  ],

  liens: [
    { nom: "État de Vaud — école obligatoire", url: "https://www.vd.ch/themes/formation/scolarite-obligatoire" },
    { nom: "Plan d'études romand", url: "https://www.plandetudes.ch" },
    { nom: "CIIP", url: "https://www.ciip.ch" }
  ]
};
