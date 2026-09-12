/* Catalogue des exercices de 1re année (1P).
   Chaque entrée relie un jeu à un ou plusieurs objectifs du PER, et donne
   aux parents la compétence réellement travaillée. */

export const EXERCICES = [
  {
    id: "compter",
    titre: "Compte les objets",
    emoji: "🍎",
    domaine: "msn",
    objectifs: ["MSN 12"],
    description: "Combien y en a-t-il ? Touche le bon chiffre.",
    competence: "Dénombrer une collection et l'associer au chiffre écrit.",
    conseil: "Si l'enfant se trompe, faites-lui toucher chaque objet en comptant à voix haute.",
    charger: () => import("../exercises/compter.js")
  },
  {
    id: "donne-moi",
    titre: "Remplis le panier",
    emoji: "🧺",
    domaine: "msn",
    objectifs: ["MSN 12", "MSN 13"],
    description: "Mets exactement le bon nombre d'objets dans le panier.",
    competence: "Construire une collection d'un cardinal donné (plus difficile que compter).",
    conseil: "C'est l'exercice clé du nombre en 1P : savoir s'arrêter au bon moment.",
    charger: () => import("../exercises/donne-moi.js")
  },
  {
    id: "plus-moins",
    titre: "Plus ou moins ?",
    emoji: "⚖️",
    domaine: "msn",
    objectifs: ["MSN 12"],
    description: "Quel groupe en a le plus ? Ou le moins ?",
    competence: "Comparer deux quantités.",
    conseil: "Au début, l'enfant se fie à la place occupée : l'inviter à compter les deux groupes.",
    charger: () => import("../exercises/plus-moins.js")
  },
  {
    id: "ordre-nombres",
    titre: "Range les nombres",
    emoji: "🔢",
    domaine: "msn",
    objectifs: ["MSN 12"],
    description: "Touche les nombres du plus petit au plus grand.",
    competence: "Ordonner les nombres et maîtriser la comptine numérique.",
    conseil: "Bon indicateur de la solidité de la suite des nombres.",
    charger: () => import("../exercises/ordre-nombres.js")
  },
  {
    id: "formes",
    titre: "La chasse aux formes",
    emoji: "🔺",
    domaine: "msn",
    objectifs: ["MSN 11"],
    description: "Trouve tous les ronds, les carrés ou les triangles.",
    competence: "Reconnaître les formes géométriques simples, quelle que soit leur couleur.",
    conseil: "Poursuivre le jeu à la maison : trouver des ronds dans la cuisine.",
    charger: () => import("../exercises/formes.js")
  },
  {
    id: "position",
    titre: "Où est l'animal ?",
    emoji: "📦",
    domaine: "msn",
    objectifs: ["MSN 11"],
    description: "Sur, sous, dans ou à côté ?",
    competence: "Se repérer dans l'espace et utiliser le vocabulaire de position.",
    conseil: "À rejouer avec un vrai objet et une vraie boîte, c'est encore plus parlant.",
    charger: () => import("../exercises/position.js")
  },
  {
    id: "suite-logique",
    titre: "Continue la suite",
    emoji: "🔁",
    domaine: "msn",
    objectifs: ["MSN 15"],
    description: "Quel symbole vient après ?",
    competence: "Repérer une régularité (algorithme) et la poursuivre.",
    conseil: "Faire verbaliser : « rouge, bleu, rouge, bleu… donc ? »",
    charger: () => import("../exercises/suite-logique.js")
  },
  {
    id: "tri",
    titre: "Range au bon endroit",
    emoji: "🗂️",
    domaine: "msn",
    objectifs: ["MSN 18", "MSN 16"],
    description: "Vivant ou pas vivant ? Animal ou fruit ?",
    competence: "Classer selon une propriété, distinguer le vivant du non-vivant.",
    conseil: "La notion de « vivant » se construit lentement : les plantes surprennent souvent.",
    charger: () => import("../exercises/tri.js")
  },
  {
    id: "couleurs",
    titre: "Les couleurs",
    emoji: "🎨",
    domaine: "arts",
    objectifs: ["A 12 …", "L1 13-14"],
    description: "Touche la bonne couleur.",
    competence: "Nommer et distinguer les couleurs de base.",
    conseil: "Utile aussi pour repérer un éventuel trouble de la vision des couleurs.",
    charger: () => import("../exercises/couleurs.js")
  },
  {
    id: "lettres",
    titre: "La chasse aux lettres",
    emoji: "🔤",
    domaine: "langues",
    objectifs: ["L1 16-17", "L1 18"],
    description: "Trouve toutes les lettres demandées.",
    competence: "Reconnaître les lettres majuscules (les lettres du prénom en priorité).",
    conseil: "Renseignez le prénom dans l'Espace parents : le jeu s'adapte.",
    charger: () => import("../exercises/lettres.js")
  },
  {
    id: "son-initial",
    titre: "Le son du début",
    emoji: "👂",
    domaine: "langues",
    objectifs: ["L1 16-17"],
    description: "Quel mot commence par ce son ?",
    competence: "Conscience phonologique : isoler le premier son d'un mot.",
    conseil: "Compétence la plus prédictive de la réussite en lecture. Écouter le son, pas la lettre.",
    charger: () => import("../exercises/son-initial.js")
  },
  {
    id: "rimes",
    titre: "Les rimes",
    emoji: "🎵",
    domaine: "langues",
    objectifs: ["L1 16-17", "L1 15"],
    description: "Quel mot rime avec le mot montré ?",
    competence: "Percevoir la rime, entrer dans le jeu avec les sons.",
    conseil: "Prolonger avec des comptines et des chansons.",
    charger: () => import("../exercises/rimes.js")
  },
  {
    id: "syllabes",
    titre: "Tape les syllabes",
    emoji: "👏",
    domaine: "langues",
    objectifs: ["L1 16-17"],
    description: "Combien de syllabes dans le mot ?",
    competence: "Segmenter un mot en syllabes orales.",
    conseil: "Taper réellement dans les mains avec l'enfant pendant qu'il écoute.",
    charger: () => import("../exercises/syllabes.js")
  },
  {
    id: "mon-prenom",
    titre: "Mon prénom",
    emoji: "✍️",
    domaine: "langues",
    objectifs: ["L1 18"],
    description: "Remets les lettres de ton prénom dans l'ordre.",
    competence: "Reconnaître et ordonner les lettres de son prénom — un objectif phare de la 1P.",
    conseil: "Nécessite d'avoir renseigné le prénom dans l'Espace parents.",
    exigePrenom: true,
    charger: () => import("../exercises/mon-prenom.js")
  },
  {
    id: "trace",
    titre: "Trace le chemin",
    emoji: "🖍️",
    domaine: "langues",
    objectifs: ["L1 18", "CM 12"],
    description: "Suis le tracé avec ton doigt.",
    competence: "Contrôler son geste graphique — la base de l'écriture.",
    conseil: "Bien meilleur sur tablette ou écran tactile qu'à la souris.",
    charger: () => import("../exercises/trace.js")
  },
  {
    id: "memory",
    titre: "Memory des animaux",
    emoji: "🃏",
    domaine: "transversal",
    objectifs: [],
    description: "Retrouve les paires identiques.",
    competence: "Mémoire visuelle, attention et stratégie — capacités transversales.",
    conseil: "Jouer à deux en alternant les tours développe aussi l'attente de son tour.",
    charger: () => import("../exercises/memory.js")
  }
];

export function exerciceParId(id) {
  return EXERCICES.find((e) => e.id === id) || null;
}

export function exercicesParObjectif(code) {
  return EXERCICES.filter((e) => e.objectifs.includes(code));
}
