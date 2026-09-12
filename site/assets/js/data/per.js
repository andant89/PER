/* ==========================================================================
   Données PER — Plan d'études romand (CIIP)
   --------------------------------------------------------------------------
   ⚠️  IMPORTANT — À LIRE AVANT DE MODIFIER
   Les intitulés ci-dessous sont des REFORMULATIONS de travail, rédigées pour
   des parents. Elles ne remplacent pas le texte officiel de la CIIP.
   Les codes d'objectifs (L1 11-12, MSN 12, ...) suivent la nomenclature du PER
   mais doivent être vérifiés sur https://www.plandetudes.ch avant de servir de
   référence. Voir docs/VERIFIER-LES-CONTENUS.md.
   Chaque objectif porte un drapeau `verifie` : passez-le à `true` une fois le
   libellé confronté au site officiel (l'app affiche alors un ✓).
   ========================================================================== */

export const META = {
  source: "Plan d'études romand (PER), CIIP — https://www.plandetudes.ch",
  avertissement:
    "Formulations résumées à usage familial. Le texte officiel fait foi et se consulte sur plandetudes.ch.",
  derniereRelecture: null // ex. "2026-09-12" une fois la vérification faite
};

/* ------------------------------------------------------------------ Cycles */

export const CYCLES = [
  {
    id: 1,
    nom: "Cycle 1",
    annees: ["1P", "2P", "3P", "4P"],
    ages: "4 à 8 ans",
    resume:
      "Les deux premières années (1P–2P) correspondent à l'ancienne école enfantine. " +
      "On entre dans l'écrit et dans le nombre par le jeu, la manipulation et le langage oral.",
    priorites: [
      "Entrer dans le langage : parler, écouter, comprendre, raconter",
      "Découvrir le principe de l'écrit : lettres, sons, premiers mots",
      "Construire le nombre jusqu'à 20, puis 100 en fin de cycle",
      "Se repérer dans l'espace et dans le temps",
      "Apprendre à vivre ensemble et à devenir élève"
    ]
  },
  {
    id: 2,
    nom: "Cycle 2",
    annees: ["5P", "6P", "7P", "8P"],
    ages: "8 à 12 ans",
    resume:
      "Les apprentissages fondamentaux se consolident et s'étendent : lecture experte, " +
      "production de textes, quatre opérations, fractions, démarche scientifique, langues étrangères.",
    priorites: [
      "Lire pour apprendre et écrire des textes structurés",
      "Maîtriser les quatre opérations, les fractions et les décimaux",
      "Développer une démarche d'investigation scientifique",
      "Allemand (dès la 5P) puis anglais (dès la 7P)",
      "Se situer dans le temps historique et l'espace géographique"
    ]
  },
  {
    id: 3,
    nom: "Cycle 3",
    annees: ["9P", "10P", "11P"],
    ages: "12 à 15 ans",
    resume:
      "Le cycle d'orientation : approfondissement disciplinaire, autonomie de travail et " +
      "préparation aux choix de formation.",
    priorites: [
      "Approfondir et abstraire les savoirs disciplinaires",
      "Développer l'autonomie et les méthodes de travail",
      "Construire un projet de formation et d'orientation",
      "Exercer l'esprit critique et la citoyenneté"
    ]
  }
];

/* --------------------------------------------------- Présentation du PER  */

export const PRESENTATION = {
  titre: "Qu'est-ce que le PER ?",
  chapeau:
    "Le Plan d'études romand est le programme scolaire commun aux cantons francophones de Suisse. " +
    "Il décrit ce que chaque élève doit apprendre, de la 1re à la 11e année de la scolarité obligatoire.",
  blocs: [
    {
      titre: "Un programme commun à la Suisse romande",
      emoji: "🇨🇭",
      texte:
        "Adopté par la CIIP et entré en vigueur dès 2011, le PER harmonise les contenus enseignés " +
        "dans les cantons de Berne (partie francophone), Fribourg, Genève, Jura, Neuchâtel, Valais et Vaud. " +
        "Une famille qui déménage d'un canton à l'autre retrouve ainsi la même progression d'apprentissages.",
      details: [
        "Il découle du concordat HarmoS et de la Convention scolaire romande.",
        "Il fixe les objectifs, pas les méthodes : chaque enseignant·e choisit ses moyens.",
        "Les moyens d'enseignement romands (MER) en sont la déclinaison concrète en classe."
      ]
    },
    {
      titre: "11 années, 3 cycles",
      emoji: "📐",
      texte:
        "La scolarité obligatoire compte 11 années, numérotées 1P à 11P, réparties en trois cycles. " +
        "La 1P et la 2P correspondent à ce qu'on appelait l'école enfantine : l'enfant y entre vers 4 ans.",
      details: [
        "Cycle 1 : 1P–4P (4–8 ans)",
        "Cycle 2 : 5P–8P (8–12 ans)",
        "Cycle 3 : 9P–11P (12–15 ans), le cycle d'orientation"
      ]
    },
    {
      titre: "Trois entrées complémentaires",
      emoji: "🧩",
      texte:
        "Le PER ne se limite pas aux branches scolaires. Il articule trois entrées qui se travaillent " +
        "ensemble, dans toutes les disciplines.",
      details: [
        "Les 5 domaines disciplinaires : Langues ; Mathématiques et Sciences de la nature ; Sciences humaines et sociales ; Arts ; Corps et mouvement.",
        "La Formation générale : santé, MITIC (médias et numérique), vivre ensemble, choix et projets personnels, interdépendances.",
        "Les Capacités transversales : collaboration, communication, stratégies d'apprentissage, pensée créatrice, démarche réflexive."
      ]
    },
    {
      titre: "Comment lire un objectif",
      emoji: "🔎",
      texte:
        "Chaque objectif d'apprentissage porte un code : les lettres désignent le domaine, le premier " +
        "chiffre le cycle, le second le numéro de l'objectif.",
      details: [
        "MSN 12 → domaine Mathématiques et Sciences de la nature, cycle 1, objectif 2.",
        "L1 13-14 → domaine Langues (français), cycle 1, objectifs 3 et 4 regroupés.",
        "Chaque objectif est décliné en composantes, puis en attentes fondamentales par année.",
        "Les attentes fondamentales indiquent le minimum attendu en fin de cycle, pas en cours d'année."
      ]
    },
    {
      titre: "Ce que le PER n'est pas",
      emoji: "⚖️",
      texte:
        "Le PER est un référentiel d'objectifs, pas un manuel ni un calendrier. Le rythme réel de la " +
        "classe dépend de l'enseignant·e, du canton et du groupe d'élèves.",
      details: [
        "Il ne fixe pas les notes ni les modalités d'évaluation, qui relèvent des cantons.",
        "Il n'impose pas l'ordre des apprentissages à l'intérieur d'un cycle.",
        "En 1P–2P, l'évaluation est avant tout une observation du développement, sans notes."
      ]
    }
  ]
};

/* ----------------------------------------------- Domaines disciplinaires  */
/* objectifs : { code, titre, composantes[], verifie } */

export const DOMAINES = [
  {
    id: "langues",
    nom: "Langues",
    sigle: "L",
    emoji: "📚",
    couleur: "var(--d-langues)",
    disciplines: ["Français (L1)", "Allemand (L2)", "Anglais (L3)", "Latin / Grec (LCA)"],
    viseesPrioritaires:
      "Maîtriser la lecture et l'écriture, développer la capacité de comprendre et de s'exprimer " +
      "à l'oral et à l'écrit, découvrir le fonctionnement de la langue et construire des références culturelles.",
    objectifs: {
      1: [
        {
          code: "L1 11-12",
          titre: "Lire et écrire des textes d'usage familier et scolaire",
          composantes: [
            "Reconnaître que l'écrit transmet du sens",
            "Découvrir la correspondance entre les lettres et les sons",
            "Produire ses premiers mots et ses premières phrases"
          ],
          verifie: false
        },
        {
          code: "L1 13-14",
          titre: "Comprendre et produire des textes oraux d'usage familier et scolaire",
          composantes: [
            "Écouter et comprendre une consigne, une histoire",
            "Raconter, décrire, expliquer devant les autres",
            "Enrichir son vocabulaire"
          ],
          verifie: false
        },
        {
          code: "L1 15",
          titre: "Apprécier des ouvrages littéraires",
          composantes: [
            "Écouter des albums, des contes, des comptines",
            "Réagir à une histoire, en parler, la rejouer"
          ],
          verifie: false
        },
        {
          code: "L1 16-17",
          titre: "Observer le fonctionnement de la langue et s'approprier des outils de base",
          composantes: [
            "Segmenter la parole : phrases, mots, syllabes, sons",
            "Repérer les lettres de l'alphabet",
            "Découvrir d'autres langues présentes dans la classe"
          ],
          verifie: false
        },
        {
          code: "L1 18",
          titre: "Découvrir la technique de l'écriture et les instruments de la communication",
          composantes: [
            "Tenir son crayon, tracer, contrôler son geste",
            "Écrire son prénom en majuscules puis en script",
            "Découvrir le clavier et les outils numériques"
          ],
          verifie: false
        }
      ],
      2: [
        { code: "L1 21-22", titre: "Lire et écrire des textes de genres différents", composantes: [], verifie: false },
        { code: "L1 23-24", titre: "Comprendre et produire des textes oraux variés", composantes: [], verifie: false },
        { code: "L1 25", titre: "Apprécier et analyser des ouvrages littéraires", composantes: [], verifie: false },
        { code: "L1 26", titre: "Construire une représentation de la langue (grammaire, conjugaison, orthographe, vocabulaire)", composantes: [], verifie: false },
        { code: "L2 21-24", titre: "Allemand : comprendre et produire des textes oraux et écrits simples", composantes: [], verifie: false },
        { code: "L3 31-34", titre: "Anglais : premiers échanges oraux et écrits (dès la 7P)", composantes: [], verifie: false }
      ],
      3: [
        { code: "L1 31-32", titre: "Lire et écrire des textes complexes et argumentatifs", composantes: [], verifie: false },
        { code: "L1 33-34", titre: "Comprendre et produire des textes oraux élaborés", composantes: [], verifie: false },
        { code: "L1 35", titre: "Analyser des œuvres littéraires et construire une culture littéraire", composantes: [], verifie: false },
        { code: "L1 36", titre: "Analyser le fonctionnement de la langue et en systématiser l'étude", composantes: [], verifie: false }
      ]
    }
  },
  {
    id: "msn",
    nom: "Mathématiques et Sciences de la nature",
    sigle: "MSN",
    emoji: "🔢",
    couleur: "var(--d-msn)",
    disciplines: ["Mathématiques", "Sciences de la nature"],
    viseesPrioritaires:
      "Se représenter, problématiser et modéliser des situations, puis résoudre des problèmes en " +
      "mobilisant des notions et des raisonnements propres aux mathématiques et aux sciences de la nature.",
    objectifs: {
      1: [
        {
          code: "MSN 11",
          titre: "Explorer l'espace",
          composantes: [
            "Se déplacer et décrire ses déplacements",
            "Situer des objets : sur, sous, devant, derrière, à côté, entre",
            "Reconnaître et nommer les formes simples"
          ],
          verifie: false
        },
        {
          code: "MSN 12",
          titre: "Construire et structurer des représentations des nombres naturels",
          composantes: [
            "Dénombrer une collection (comptine numérique, un objet = un mot)",
            "Associer une quantité, un chiffre et un mot-nombre",
            "Comparer, ordonner, décomposer les petites quantités"
          ],
          verifie: false
        },
        {
          code: "MSN 13",
          titre: "Résoudre des problèmes additifs",
          composantes: [
            "Ajouter, enlever, partager dans des situations concrètes",
            "Anticiper le résultat d'une action sur une collection"
          ],
          verifie: false
        },
        {
          code: "MSN 14",
          titre: "Comparer et sérier des grandeurs",
          composantes: [
            "Comparer des longueurs, des masses, des contenances",
            "Ranger des objets du plus petit au plus grand"
          ],
          verifie: false
        },
        {
          code: "MSN 15",
          titre: "Représenter des phénomènes naturels, techniques ou des situations mathématiques",
          composantes: ["Dessiner, schématiser, symboliser une situation"],
          verifie: false
        },
        {
          code: "MSN 16",
          titre: "Explorer des phénomènes naturels et des technologies à l'aide des sens",
          composantes: ["Observer, toucher, écouter, comparer", "Décrire ce qu'on observe"],
          verifie: false
        },
        {
          code: "MSN 17",
          titre: "Découvrir le corps humain et ses besoins",
          composantes: ["Nommer les parties du corps", "Repérer les cinq sens"],
          verifie: false
        },
        {
          code: "MSN 18",
          titre: "Explorer l'unité et la diversité du vivant",
          composantes: ["Distinguer le vivant du non-vivant", "Observer animaux et plantes"],
          verifie: false
        }
      ],
      2: [
        { code: "MSN 21", titre: "Représenter l'espace et les figures géométriques", composantes: [], verifie: false },
        { code: "MSN 22", titre: "Structurer les nombres naturels, décimaux et les fractions", composantes: [], verifie: false },
        { code: "MSN 23", titre: "Résoudre des problèmes additifs et multiplicatifs", composantes: [], verifie: false },
        { code: "MSN 24", titre: "Utiliser des unités de mesure et comparer des grandeurs", composantes: [], verifie: false },
        { code: "MSN 25", titre: "Modéliser des phénomènes naturels, techniques ou des situations mathématiques", composantes: [], verifie: false },
        { code: "MSN 26", titre: "Explorer des phénomènes naturels et des technologies", composantes: [], verifie: false },
        { code: "MSN 27", titre: "Identifier les parties du corps et leur fonctionnement", composantes: [], verifie: false },
        { code: "MSN 28", titre: "Déterminer des caractéristiques du monde vivant", composantes: [], verifie: false }
      ],
      3: [
        { code: "MSN 31", titre: "Analyser des objets et des transformations géométriques", composantes: [], verifie: false },
        { code: "MSN 32", titre: "Construire des nombres rationnels et le calcul littéral", composantes: [], verifie: false },
        { code: "MSN 33", titre: "Résoudre des problèmes numériques et algébriques", composantes: [], verifie: false },
        { code: "MSN 35", titre: "Modéliser des phénomènes et des situations", composantes: [], verifie: false },
        { code: "MSN 36-38", titre: "Physique, chimie et biologie : mener une démarche scientifique", composantes: [], verifie: false }
      ]
    }
  },
  {
    id: "shs",
    nom: "Sciences humaines et sociales",
    sigle: "SHS",
    emoji: "🌍",
    couleur: "var(--d-shs)",
    disciplines: ["Géographie", "Histoire", "Citoyenneté", "Éthique et cultures religieuses"],
    viseesPrioritaires:
      "Découvrir des cultures et des modes de pensée différents à travers l'espace et le temps, " +
      "et développer des compétences civiques qui conduisent à une citoyenneté active et responsable.",
    objectifs: {
      1: [
        { code: "SHS 11", titre: "Se situer dans son contexte spatial et social", composantes: ["Explorer l'espace vécu : maison, école, quartier", "Représenter un lieu familier"], verifie: false },
        { code: "SHS 12", titre: "Se situer dans son contexte temporel et social", composantes: ["Repérer le déroulement de la journée, de la semaine, des saisons", "Distinguer avant / maintenant / après"], verifie: false },
        { code: "SHS 13", titre: "S'approprier des outils et des démarches de recherche", composantes: ["Observer, questionner, classer"], verifie: false },
        { code: "SHS 15", titre: "Découvrir des appartenances et se situer dans des groupes", composantes: ["Sa famille, sa classe, son village", "Découvrir des fêtes et des récits"], verifie: false }
      ],
      2: [
        { code: "SHS 21", titre: "Identifier les relations entre les activités humaines et l'organisation de l'espace", composantes: [], verifie: false },
        { code: "SHS 22", titre: "Se situer dans son contexte temporel et identifier des traces du passé", composantes: [], verifie: false },
        { code: "SHS 23", titre: "S'approprier des démarches propres aux sciences humaines", composantes: [], verifie: false },
        { code: "SHS 24-25", titre: "Identifier des formes locales d'organisation politique et sociale ; découvrir des cultures et des religions", composantes: [], verifie: false }
      ],
      3: [
        { code: "SHS 31", titre: "Analyser des espaces géographiques et les interactions humaines", composantes: [], verifie: false },
        { code: "SHS 32", titre: "Analyser l'organisation collective des sociétés humaines dans le temps", composantes: [], verifie: false },
        { code: "SHS 33-35", titre: "Démarches de recherche, citoyenneté, éthique et cultures religieuses", composantes: [], verifie: false }
      ]
    }
  },
  {
    id: "arts",
    nom: "Arts",
    sigle: "A",
    emoji: "🎨",
    couleur: "var(--d-arts)",
    disciplines: ["Activités créatrices et manuelles", "Arts visuels", "Musique"],
    viseesPrioritaires:
      "Découvrir et développer des modes d'expression artistiques et leurs langages ; représenter " +
      "et exprimer une idée, un imaginaire, une émotion ; acquérir une culture artistique.",
    remarqueCodes:
      "Dans le PER, les codes du domaine Arts se déclinent par discipline : A 11 AV (arts visuels), " +
      "A 11 AC&M (activités créatrices et manuelles), A 11 MU (musique). Le code de base est utilisé ici.",
    objectifs: {
      1: [
        { code: "A 11", titre: "Représenter et exprimer une idée, un imaginaire, une émotion", composantes: ["Dessiner, peindre, modeler, chanter, danser"], verifie: false },
        { code: "A 12", titre: "Mobiliser ses perceptions sensorielles", composantes: ["Regarder, écouter, toucher, comparer"], verifie: false },
        { code: "A 13", titre: "Explorer diverses techniques plastiques, artisanales et sonores", composantes: ["Découper, coller, assembler, produire des sons"], verifie: false },
        { code: "A 14", titre: "Rencontrer divers domaines et cultures artistiques", composantes: ["Découvrir des œuvres, des chansons, des instruments"], verifie: false }
      ],
      2: [{ code: "A 21-24", titre: "Expression, perception, technique et culture artistiques (cycle 2)", composantes: [], verifie: false }],
      3: [{ code: "A 31-34", titre: "Expression, perception, technique et culture artistiques (cycle 3)", composantes: [], verifie: false }]
    }
  },
  {
    id: "cm",
    nom: "Corps et mouvement",
    sigle: "CM",
    emoji: "🤸",
    couleur: "var(--d-cm)",
    disciplines: ["Éducation physique", "Éducation nutritionnelle"],
    viseesPrioritaires:
      "Connaître son corps, en prendre soin et reconnaître ses besoins physiologiques et nutritionnels ; " +
      "développer ses ressources physiques et motrices ainsi que son capital santé.",
    objectifs: {
      1: [
        { code: "CM 11", titre: "Mobiliser ses capacités physiques pour se maintenir en santé", composantes: ["Courir, sauter, grimper, s'équilibrer"], verifie: false },
        { code: "CM 12", titre: "Développer ses capacités de coordination et son sens créatif", composantes: ["Lancer, attraper, rythmer, danser"], verifie: false },
        { code: "CM 13", titre: "Adapter ses déplacements à différents milieux", composantes: ["Jeux collectifs, milieu aquatique, plein air"], verifie: false },
        { code: "CM 14-15", titre: "Apprécier les besoins de son corps et son alimentation", composantes: ["Hygiène, sommeil, repas équilibrés"], verifie: false }
      ],
      2: [{ code: "CM 21-25", titre: "Condition physique, coordination, pratiques sportives et alimentation (cycle 2)", composantes: [], verifie: false }],
      3: [{ code: "CM 31-35", titre: "Condition physique, coordination, pratiques sportives et santé (cycle 3)", composantes: [], verifie: false }]
    }
  }
];

/* --------------------------------------------------------- Formation générale */

export const FORMATION_GENERALE = {
  emoji: "🧭",
  couleur: "var(--d-fg)",
  intro:
    "La Formation générale traverse toutes les disciplines. Elle prépare l'élève à se situer dans " +
    "le monde et à faire des choix responsables.",
  thematiques: [
    { code: "FG 11", nom: "MITIC", texte: "Découvrir les médias, les images et les outils numériques, et commencer à exercer un regard critique." },
    { code: "FG 12", nom: "Santé et bien-être", texte: "Reconnaître ses besoins fondamentaux : manger, dormir, bouger, se protéger." },
    { code: "FG 13", nom: "Choix et projets personnels", texte: "Choisir une activité, la mener à terme, parler de ce qu'on aime faire." },
    { code: "FG 14-15", nom: "Vivre ensemble et exercice de la démocratie", texte: "Participer à l'élaboration des règles de vie, écouter, attendre son tour, régler un conflit par la parole." },
    { code: "FG 16-17", nom: "Interdépendances sociales, économiques et environnementales", texte: "Prendre conscience de l'effet de ses gestes sur l'environnement : tri, eau, énergie." }
  ]
};

/* ------------------------------------------------------ Capacités transversales */

export const CAPACITES_TRANSVERSALES = {
  emoji: "🔗",
  couleur: "var(--d-ct)",
  intro:
    "Les capacités transversales ne s'enseignent pas comme une branche : elles se développent dans " +
    "toutes les activités, et se travaillent aussi très bien à la maison.",
  liste: [
    { nom: "Collaboration", emoji: "🤝", texte: "Travailler avec les autres, prendre en compte leur point de vue, tenir son rôle dans un groupe.", maison: "Jeux de société, tâches ménagères partagées." },
    { nom: "Communication", emoji: "💬", texte: "Formuler ce qu'on pense, adapter son langage à la situation, écouter pour comprendre.", maison: "Raconter sa journée, expliquer une règle de jeu." },
    { nom: "Stratégies d'apprentissage", emoji: "🎯", texte: "Organiser son travail, persévérer, connaître ses propres façons d'apprendre.", maison: "Préparer son sac, anticiper la semaine." },
    { nom: "Pensée créatrice", emoji: "💡", texte: "Imaginer, oser, chercher plusieurs solutions, accepter le tâtonnement.", maison: "Bricolage libre, inventer une histoire." },
    { nom: "Démarche réflexive", emoji: "🪞", texte: "Prendre du recul sur ce qu'on a fait, se relire, argumenter, changer d'avis.", maison: "« Qu'est-ce qui était difficile aujourd'hui ? »" }
  ]
};

/* ----------------------------------------------------------------- Helpers */

export function domaineParId(id) {
  return DOMAINES.find((d) => d.id === id) || null;
}

export function cycleDeLAnnee(annee) {
  return CYCLES.find((c) => c.annees.includes(annee)) || null;
}

export function objectifParCode(code) {
  for (const domaine of DOMAINES) {
    for (const cycle of Object.keys(domaine.objectifs)) {
      const trouve = domaine.objectifs[cycle].find((o) => o.code === code);
      if (trouve) return { ...trouve, domaine, cycle: Number(cycle) };
    }
  }
  return null;
}
