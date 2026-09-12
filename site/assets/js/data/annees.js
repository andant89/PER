/* ==========================================================================
   Repères par année scolaire (1P à 11P)
   --------------------------------------------------------------------------
   ⚠️  Le PER fixe des attentes fondamentales EN FIN DE CYCLE, pas année par
   année. Les repères ci-dessous sont donc une lecture indicative, utile aux
   parents pour situer leur enfant — ils ne constituent pas une norme et ne
   remplacent pas le bulletin ni l'avis de l'enseignant·e.
   Le rythme réel varie fortement d'un enfant à l'autre, surtout en 1P–2P.
   ========================================================================== */

export const ANNEES = [
  {
    id: "1P",
    nom: "1re année (1P)",
    age: "4–5 ans",
    cycle: 1,
    ancienNom: "1re enfantine",
    resume:
      "L'année de l'entrée à l'école. L'essentiel se joue dans le langage oral, la vie de groupe et " +
      "l'envie d'apprendre. Tout passe par le jeu, la manipulation et le corps : on n'attend ni lecture, ni écriture.",
    priorites: [
      "Devenir élève : écouter une consigne, attendre son tour, ranger",
      "Parler : nommer, raconter, poser des questions",
      "Entrer dans le nombre jusqu'à 5–10 par la manipulation",
      "Développer la motricité fine : découper, tracer, tenir un crayon",
      "Se repérer dans l'espace proche et dans la journée"
    ],
    reperes: [
      {
        domaine: "langues",
        objectifs: ["L1 13-14", "L1 16-17", "L1 18", "L1 15"],
        items: [
          "Comprendre et exécuter une consigne simple en une ou deux étapes",
          "Raconter un petit événement vécu de manière compréhensible",
          "Écouter une histoire jusqu'au bout et en reparler",
          "Repérer des mots qui riment, taper les syllabes d'un mot",
          "Reconnaître les lettres de son prénom, l'écrire en majuscules (en fin d'année)"
        ]
      },
      {
        domaine: "msn",
        objectifs: ["MSN 11", "MSN 12", "MSN 13", "MSN 14", "MSN 18"],
        items: [
          "Réciter la comptine numérique jusqu'à 10 environ",
          "Dénombrer une collection jusqu'à 5–6 sans se tromper (un objet = un mot)",
          "Reconnaître les chiffres de 1 à 10",
          "Comparer deux quantités : plus, moins, autant",
          "Reconnaître le rond, le carré, le triangle",
          "Utiliser sur, sous, devant, derrière, à côté",
          "Trier et classer selon une propriété (couleur, taille, forme)"
        ]
      },
      {
        domaine: "shs",
        objectifs: ["SHS 11", "SHS 12"],
        items: [
          "Situer les moments de la journée et les jours de la semaine",
          "Se repérer dans l'école et décrire le chemin de la maison",
          "Parler de sa famille et de son entourage"
        ]
      },
      {
        domaine: "arts",
        objectifs: ["A 11 AV / A 11 AC&M / A 11 MU"],
        items: [
          "Dessiner un bonhomme de plus en plus complet",
          "Chanter des comptines en groupe, marquer un rythme",
          "Découper, coller, modeler"
        ]
      },
      {
        domaine: "cm",
        objectifs: ["CM 11", "CM 12", "CM 14-15"],
        items: [
          "Courir, sauter, grimper, tenir en équilibre",
          "Lancer et attraper un ballon",
          "S'habiller et se déshabiller seul, aller aux toilettes de façon autonome"
        ]
      }
    ],
    astucesMaison: [
      "Lire une histoire chaque soir : c'est le meilleur prédicteur de l'entrée en lecture.",
      "Compter les vraies choses : marches d'escalier, couverts à table, pièces de monnaie.",
      "Parler de la journée avec un vocabulaire précis plutôt que « truc » et « machin ».",
      "Laisser découper, verser, visser : la motricité fine prépare l'écriture.",
      "Des sessions de jeu éducatif de 10 à 15 minutes suffisent largement à cet âge."
    ],
    vigilance: [
      "Grande variabilité : certains enfants comptent jusqu'à 30, d'autres jusqu'à 5. C'est normal.",
      "Aucune attente de lecture ou d'écriture cursive en 1P.",
      "Si la parole reste très difficile à comprendre par des inconnus, en parler à l'enseignant·e."
    ]
  },
  {
    id: "2P",
    nom: "2e année (2P)",
    age: "5–6 ans",
    cycle: 1,
    ancienNom: "2e enfantine",
    resume:
      "On consolide la 1P et on entre franchement dans la conscience phonologique et le nombre. " +
      "L'enfant commence à faire le lien entre les lettres et les sons.",
    priorites: [
      "Découper les mots en syllabes et repérer les sons",
      "Compter et dénombrer jusqu'à 10–20",
      "Écrire son prénom, copier des mots simples",
      "Tenir son crayon correctement, maîtriser le geste graphique"
    ],
    reperes: [
      { domaine: "langues", objectifs: ["L1 16-17", "L1 18"], items: ["Isoler le premier son d'un mot", "Reconnaître la plupart des lettres de l'alphabet", "Copier son prénom et quelques mots"] },
      { domaine: "msn", objectifs: ["MSN 12", "MSN 13"], items: ["Dénombrer jusqu'à 12–20", "Ajouter et enlever de petites quantités avec du matériel", "Ranger des nombres du plus petit au plus grand"] }
    ],
    astucesMaison: ["Jeux de rimes et de « chasse au son » dans la voiture.", "Jeux de dés et de plateau : déplacer un pion, c'est compter."],
    vigilance: ["La lecture n'est toujours pas exigible : elle démarre en 3P."]
  },
  {
    id: "3P",
    nom: "3e année (3P)",
    age: "6–7 ans",
    cycle: 1,
    resume: "L'année de l'apprentissage formel de la lecture et de l'écriture, et du nombre jusqu'à 100.",
    priorites: ["Décoder et lire des mots puis des phrases", "Écrire en cursive", "Additionner et soustraire dans le domaine numérique jusqu'à 20 puis 100"],
    reperes: [
      { domaine: "langues", objectifs: ["L1 11-12", "L1 18"], items: ["Lire à voix haute une phrase simple", "Écrire une phrase dictée", "Entrer dans l'écriture cursive"] },
      { domaine: "msn", objectifs: ["MSN 12", "MSN 13", "MSN 14"], items: ["Compter, lire et écrire les nombres jusqu'à 100", "Additionner et soustraire", "Mesurer avec une règle"] }
    ],
    astucesMaison: ["Lire à deux : une phrase l'adulte, une phrase l'enfant.", "Jeux de calcul mental courts et quotidiens."],
    vigilance: ["Les différences de rythme en lecture restent importantes toute l'année."]
  },
  {
    id: "4P",
    nom: "4e année (4P)",
    age: "7–8 ans",
    cycle: 1,
    resume: "Fin du cycle 1 : les attentes fondamentales du cycle doivent être atteintes.",
    priorites: ["Lire seul un texte court et le comprendre", "Écrire un texte de quelques phrases", "Maîtriser l'addition et la soustraction jusqu'à 100, découvrir la multiplication"],
    reperes: [
      { domaine: "langues", objectifs: ["L1 11-12", "L1 16-17"], items: ["Comprendre un texte lu seul", "Produire un court récit", "Repérer le verbe, le nom, le singulier et le pluriel"] },
      { domaine: "msn", objectifs: ["MSN 12", "MSN 13", "MSN 11"], items: ["Nombres jusqu'à 1000 (selon les cantons)", "Premiers livrets", "Reconnaître et décrire des figures géométriques"] }
    ],
    astucesMaison: ["Faire lire les recettes, les modes d'emploi, les panneaux.", "Rendre la monnaie au magasin."],
    vigilance: ["C'est l'année où d'éventuelles difficultés durables en lecture doivent être investiguées."]
  },
  {
    id: "5P",
    nom: "5e année (5P)",
    age: "8–9 ans",
    cycle: 2,
    resume: "Entrée dans le cycle 2 : lire pour apprendre, et début de l'allemand.",
    priorites: ["Lire des textes documentaires", "Multiplication et division", "Débuts de l'allemand (L2)"],
    reperes: [
      { domaine: "langues", objectifs: ["L1 21-22", "L2 21-24"], items: ["Repérer l'information dans un texte", "Premiers mots et phrases en allemand"] },
      { domaine: "msn", objectifs: ["MSN 22", "MSN 23"], items: ["Livrets, multiplication posée", "Grands nombres"] }
    ],
    astucesMaison: ["Documentaires, bandes dessinées, magazines jeunesse."],
    vigilance: []
  },
  {
    id: "6P",
    nom: "6e année (6P)",
    age: "9–10 ans",
    cycle: 2,
    resume: "Consolidation : textes plus longs, fractions et décimaux, démarche scientifique.",
    priorites: ["Produire des textes structurés", "Fractions et nombres décimaux", "Mener une expérience et la décrire"],
    reperes: [
      { domaine: "langues", objectifs: ["L1 21-22", "L1 26"], items: ["Accords dans le groupe nominal et avec le verbe", "Rédiger un texte en plusieurs paragraphes"] },
      { domaine: "msn", objectifs: ["MSN 22", "MSN 26"], items: ["Fractions simples, décimaux", "Observation et hypothèse"] }
    ],
    astucesMaison: [],
    vigilance: []
  },
  {
    id: "7P",
    nom: "7e année (7P)",
    age: "10–11 ans",
    cycle: 2,
    resume: "Début de l'anglais et exigences renforcées en production écrite.",
    priorites: ["Anglais (L3)", "Proportionnalité", "Argumenter à l'écrit"],
    reperes: [
      { domaine: "langues", objectifs: ["L3 31-34"], items: ["Se présenter et échanger en anglais"] },
      { domaine: "msn", objectifs: ["MSN 23", "MSN 24"], items: ["Proportionnalité, pourcentages", "Aires et périmètres"] }
    ],
    astucesMaison: [],
    vigilance: ["Les notes commencent à compter pour l'orientation dans plusieurs cantons."]
  },
  {
    id: "8P",
    nom: "8e année (8P)",
    age: "11–12 ans",
    cycle: 2,
    resume: "Fin du cycle 2 et préparation de l'orientation vers le cycle 3.",
    priorites: ["Autonomie de travail", "Consolidation des acquis du cycle", "Orientation"],
    reperes: [
      { domaine: "langues", objectifs: ["L1 21-22"], items: ["Lire et résumer un texte long"] },
      { domaine: "msn", objectifs: ["MSN 22", "MSN 25"], items: ["Opérations sur les décimaux et les fractions", "Résolution de problèmes en plusieurs étapes"] }
    ],
    astucesMaison: ["Aider à planifier les révisions plutôt qu'à faire les exercices."],
    vigilance: ["Année décisive pour l'orientation dans la plupart des cantons romands."]
  },
  {
    id: "9P",
    nom: "9e année (9P)",
    age: "12–13 ans",
    cycle: 3,
    resume: "Entrée au cycle d'orientation : nouveaux enseignants, nouvelle organisation, niveaux ou sections selon les cantons.",
    priorites: ["S'adapter au CO", "Méthodes de travail", "Algèbre et fonctions"],
    reperes: [
      { domaine: "langues", objectifs: ["L1 31-32"], items: ["Textes argumentatifs"] },
      { domaine: "msn", objectifs: ["MSN 32", "MSN 33"], items: ["Calcul littéral, équations"] }
    ],
    astucesMaison: [],
    vigilance: ["Le changement d'établissement est souvent plus déstabilisant que le programme lui-même."]
  },
  {
    id: "10P",
    nom: "10e année (10P)",
    age: "13–14 ans",
    cycle: 3,
    resume: "Approfondissement disciplinaire et premiers choix d'options.",
    priorites: ["Approfondir", "Explorer les métiers", "Autonomie"],
    reperes: [
      { domaine: "msn", objectifs: ["MSN 36-38"], items: ["Physique, chimie, biologie comme disciplines distinctes"] }
    ],
    astucesMaison: [],
    vigilance: []
  },
  {
    id: "11P",
    nom: "11e année (11P)",
    age: "14–15 ans",
    cycle: 3,
    resume: "Dernière année obligatoire : certification et transition vers l'apprentissage ou le gymnase.",
    priorites: ["Projet de formation", "Postulations et examens d'admission", "Bilan des acquis"],
    reperes: [
      { domaine: "shs", objectifs: ["SHS 33-35"], items: ["Citoyenneté et institutions suisses"] }
    ],
    astucesMaison: ["Visiter des salons des métiers, organiser des stages."],
    vigilance: ["Les délais de postulation pour les apprentissages tombent très tôt dans l'année."]
  }
];

export function anneeParId(id) {
  return ANNEES.find((a) => a.id.toLowerCase() === String(id).toLowerCase()) || null;
}
