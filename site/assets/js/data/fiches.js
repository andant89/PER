/* Catalogue des fiches imprimables pour la 1re année (1P).
   Chaque fiche est reliée à un ou plusieurs objectifs du PER et décrite pour
   l'adulte : ce qui est travaillé, et ce qu'il faut regarder pendant l'exercice. */

export const FICHES = [
  {
    id: "denombrer",
    titre: "Combien y en a-t-il ?",
    domaine: "msn",
    objectifs: ["MSN 12"],
    description: "Compter une collection et entourer le bon chiffre.",
    competence: "Dénombrer et associer la quantité au chiffre écrit.",
    aObserver: "L'enfant touche-t-il chaque objet une seule fois ? Sait-il que le dernier mot dit est la réponse ?",
    options: { niveau: true },
    charger: () => import("../fiches/denombrer.js")
  },
  {
    id: "colorier-quantite",
    titre: "Colorie autant de cases",
    domaine: "msn",
    objectifs: ["MSN 12"],
    description: "Construire une collection du bon cardinal.",
    competence: "S'arrêter au bon nombre — plus difficile que compter.",
    aObserver: "S'arrête-t-il tout seul, ou colorie-t-il jusqu'au bout de la bande ?",
    options: { niveau: true },
    charger: () => import("../fiches/colorier-quantite.js")
  },
  {
    id: "relier-quantite",
    titre: "Relie au bon chiffre",
    domaine: "msn",
    objectifs: ["MSN 12"],
    description: "Associer une collection au chiffre correspondant.",
    competence: "Lire les chiffres et les relier à une quantité.",
    aObserver: "Reconnaît-il les chiffres sans les compter sur ses doigts ?",
    options: { niveau: true },
    charger: () => import("../fiches/relier-quantite.js")
  },
  {
    id: "plus-moins",
    titre: "Le plus / le moins",
    domaine: "msn",
    objectifs: ["MSN 12"],
    description: "Comparer deux collections.",
    competence: "Comparer des quantités sans se laisser tromper par la taille des dessins.",
    aObserver: "Compte-t-il les deux groupes, ou juge-t-il « à l'œil » ?",
    options: { niveau: true },
    charger: () => import("../fiches/plus-moins.js")
  },
  {
    id: "formes",
    titre: "Le code des formes",
    domaine: "msn",
    objectifs: ["MSN 11", "MSN 12"],
    description: "Colorier les formes selon un code, puis les compter.",
    competence: "Reconnaître rond, carré, triangle et étoile, quelles que soient leur taille et leur couleur.",
    aObserver: "Confond-il le carré et le rectangle ? le triangle posé sur la pointe ?",
    options: { niveau: true },
    charger: () => import("../fiches/formes.js")
  },
  {
    id: "suites",
    titre: "Continue la suite",
    domaine: "msn",
    objectifs: ["MSN 15"],
    description: "Repérer une régularité et la poursuivre.",
    competence: "Percevoir un rythme (algorithme) et l'anticiper.",
    aObserver: "Verbalise-t-il le motif avant de dessiner ?",
    options: { niveau: true },
    charger: () => import("../fiches/suites.js")
  },
  {
    id: "intrus",
    titre: "Cherche l'intrus",
    domaine: "msn",
    objectifs: ["MSN 18", "MSN 16"],
    description: "Barrer, dans chaque ligne, le dessin qui ne va pas avec les autres.",
    competence: "Classer selon une propriété commune et justifier son choix.",
    aObserver: "Sait-il expliquer pourquoi ? Une justification inattendue mais cohérente est une réussite.",
    options: {},
    charger: () => import("../fiches/intrus.js")
  },
  {
    id: "points-a-relier",
    titre: "Relie les points",
    domaine: "msn",
    objectifs: ["MSN 12", "L1 18"],
    description: "Relier les points de 1 à 15 pour faire apparaître un dessin.",
    competence: "Ordre des nombres et contrôle du geste, en même temps.",
    aObserver: "Cherche-t-il le nombre suivant, ou relie-t-il le point le plus proche ?",
    options: {},
    charger: () => import("../fiches/points-a-relier.js")
  },
  {
    id: "labyrinthe",
    titre: "Le chemin",
    domaine: "msn",
    objectifs: ["MSN 11", "L1 18"],
    description: "Traverser un labyrinthe, du doigt puis au crayon.",
    competence: "Anticiper un trajet, se repérer dans l'espace de la feuille.",
    aObserver: "Anticipe-t-il du regard, ou avance-t-il au hasard ?",
    options: { niveau: true },
    charger: () => import("../fiches/labyrinthe.js")
  },
  {
    id: "graphisme",
    titre: "Repasse sur les pointillés",
    domaine: "langues",
    objectifs: ["L1 18", "CM 12"],
    description: "Traits, ponts, vagues, boucles et ronds à repasser.",
    competence: "Contrôler son geste : la base matérielle de l'écriture.",
    aObserver: "Tenue du crayon, sens du tracé (toujours de gauche à droite), fatigue de la main.",
    options: { niveau: true },
    charger: () => import("../fiches/graphisme.js")
  },
  {
    id: "prenom",
    titre: "Mon prénom",
    domaine: "langues",
    objectifs: ["L1 18", "L1 16-17"],
    description: "Repasser puis écrire son prénom en majuscules.",
    competence: "Reconnaître et tracer les lettres de son prénom — objectif phare de la 1P.",
    aObserver: "Nomme-t-il les lettres ? Respecte-t-il l'ordre ?",
    options: { prenom: true },
    charger: () => import("../fiches/prenom.js")
  },
  {
    id: "chasse-lettres",
    titre: "La chasse aux lettres",
    domaine: "langues",
    objectifs: ["L1 16-17", "L1 18"],
    description: "Entourer toutes les occurrences d'une lettre dans une grille.",
    competence: "Discriminer visuellement les lettres majuscules.",
    aObserver: "Confond-il des lettres proches (M/N, P/R, E/F) ?",
    options: { niveau: true, prenom: true },
    charger: () => import("../fiches/chasse-lettres.js")
  },
  {
    id: "son-initial",
    titre: "Le son du début",
    domaine: "langues",
    objectifs: ["L1 16-17"],
    description: "Colorier les dessins qui commencent par un son donné.",
    competence: "Conscience phonologique — le meilleur prédicteur de l'entrée en lecture.",
    aObserver: "Entend-il le son, ou cherche-t-il la lettre ? À cet âge, tout passe par l'oreille.",
    options: { niveau: true },
    charger: () => import("../fiches/son-initial.js")
  },
  {
    id: "rimes",
    titre: "Les mots qui riment",
    domaine: "langues",
    objectifs: ["L1 16-17", "L1 15"],
    description: "Relier les dessins dont le nom finit par le même son.",
    competence: "Percevoir la rime, jouer avec les sons de la langue.",
    aObserver: "Traîne-t-il sur la fin du mot pour comparer ?",
    options: {},
    charger: () => import("../fiches/rimes.js")
  },
  {
    id: "syllabes",
    titre: "Tape les syllabes",
    domaine: "langues",
    objectifs: ["L1 16-17"],
    description: "Colorier une case par syllabe entendue.",
    competence: "Segmenter un mot en syllabes orales.",
    aObserver: "Tape-t-il en même temps qu'il parle ? Le geste soutient l'écoute.",
    options: { niveau: true },
    charger: () => import("../fiches/syllabes.js")
  },
  {
    id: "cartes-a-decouper",
    titre: "Cartes à découper",
    domaine: "transversal",
    objectifs: ["L1 13-14", "MSN 12"],
    description: "Une planche de cartes pour jouer au memory ou associer chiffres et quantités.",
    competence: "Mémoire, vocabulaire, et découpage — la motricité fine se travaille aussi aux ciseaux.",
    aObserver: "Le découpage fait partie de l'exercice : laissez-le couper lui-même, même imparfaitement.",
    options: { variante: [{ id: "images", nom: "Memory des images" }, { id: "nombres", nom: "Chiffres et quantités" }] },
    charger: () => import("../fiches/cartes-a-decouper.js")
  }
];

export function ficheParId(id) {
  return FICHES.find((f) => f.id === id) || null;
}

export function fichesParObjectif(code) {
  return FICHES.filter((f) => f.objectifs.includes(code));
}

/** Parcours conseillé : une séance équilibrée de six fiches. */
export const SEANCE_TYPE = ["graphisme", "denombrer", "son-initial", "suites", "prenom", "labyrinthe"];
