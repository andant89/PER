/* Banque de contenus pour les exercices 1P.
   Tout est en emoji : aucune image à héberger, aucun problème de droits,
   et le rendu reste net sur toutes les tailles d'écran. */

/* --- Objets à dénombrer ------------------------------------------------- */
export const OBJETS = [
  { emoji: "🍎", nom: "pomme", pluriel: "pommes" },
  { emoji: "🐟", nom: "poisson", pluriel: "poissons" },
  { emoji: "🦋", nom: "papillon", pluriel: "papillons" },
  { emoji: "⚽", nom: "ballon", pluriel: "ballons" },
  { emoji: "🌸", nom: "fleur", pluriel: "fleurs" },
  { emoji: "🚗", nom: "voiture", pluriel: "voitures" },
  { emoji: "🐞", nom: "coccinelle", pluriel: "coccinelles" },
  { emoji: "⭐", nom: "étoile", pluriel: "étoiles" },
  { emoji: "🍓", nom: "fraise", pluriel: "fraises" },
  { emoji: "🐸", nom: "grenouille", pluriel: "grenouilles" },
  { emoji: "🎈", nom: "ballon de baudruche", pluriel: "ballons" },
  { emoji: "🐣", nom: "poussin", pluriel: "poussins" }
];

/* --- Formes géométriques ------------------------------------------------ */
export const FORMES = [
  { id: "rond", nom: "rond", article: "un rond", pluriel: "les ronds", variantes: ["🔴", "🟡", "🔵", "🟢", "🟠", "🟣"] },
  { id: "carre", nom: "carré", article: "un carré", pluriel: "les carrés", variantes: ["🟥", "🟨", "🟦", "🟩", "🟧", "🟪"] },
  { id: "triangle", nom: "triangle", article: "un triangle", pluriel: "les triangles", variantes: ["🔺", "🔻"] },
  { id: "etoile", nom: "étoile", article: "une étoile", pluriel: "les étoiles", variantes: ["⭐", "🌟"] },
  { id: "coeur", nom: "cœur", article: "un cœur", pluriel: "les cœurs", variantes: ["❤️", "💙", "💚", "💛", "🧡", "💜"] }
];

/* --- Couleurs ----------------------------------------------------------- */
export const COULEURS = [
  { id: "rouge", nom: "rouge", rond: "🔴", carre: "🟥" },
  { id: "bleu", nom: "bleu", rond: "🔵", carre: "🟦" },
  { id: "vert", nom: "vert", rond: "🟢", carre: "🟩" },
  { id: "jaune", nom: "jaune", rond: "🟡", carre: "🟨" },
  { id: "orange", nom: "orange", rond: "🟠", carre: "🟧" },
  { id: "violet", nom: "violet", rond: "🟣", carre: "🟪" },
  { id: "brun", nom: "brun", rond: "🟤", carre: "🟫" },
  { id: "noir", nom: "noir", rond: "⚫", carre: "⬛" }
];

/* --- Lettres ------------------------------------------------------------ */
export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
/* Lettres travaillées en priorité en 1P (prénoms, mots fréquents). */
export const LETTRES_FREQUENTES = "AEIOULMRSTPBCDFNV".split("");

/** Nom oral de la lettre, pour la synthèse vocale. */
export const NOM_LETTRE = {
  A: "a", B: "bé", C: "cé", D: "dé", E: "euh", F: "effe", G: "gé", H: "ache",
  I: "i", J: "ji", K: "ka", L: "elle", M: "emme", N: "enne", O: "o", P: "pé",
  Q: "ku", R: "erre", S: "esse", T: "té", U: "u", V: "vé", W: "double vé",
  X: "iks", Y: "i grec", Z: "zède"
};

/* --- Mots illustrés : son initial, syllabes, rimes ---------------------- */
/* son   : son entendu au début du mot (phonème, pas la lettre)
   syll  : nombre de syllabes ORALES (on tape dans les mains)
   rime  : groupe de rime (les mots d'un même groupe riment entre eux) */
export const MOTS = [
  { mot: "avion", emoji: "✈️", son: "a", syll: 2, rime: "on" },
  { mot: "arbre", emoji: "🌳", son: "a", syll: 2, rime: null },
  { mot: "ananas", emoji: "🍍", son: "a", syll: 3, rime: null },
  { mot: "ballon", emoji: "🎈", son: "b", syll: 2, rime: "on" },
  { mot: "banane", emoji: "🍌", son: "b", syll: 2, rime: null },
  { mot: "bateau", emoji: "⛵", son: "b", syll: 2, rime: "o" },
  { mot: "canard", emoji: "🦆", son: "k", syll: 2, rime: null },
  { mot: "cadeau", emoji: "🎁", son: "k", syll: 2, rime: "o" },
  { mot: "carotte", emoji: "🥕", son: "k", syll: 2, rime: null },
  { mot: "chat", emoji: "🐱", son: "ch", syll: 1, rime: "a" },
  { mot: "chien", emoji: "🐕", son: "ch", syll: 1, rime: null },
  { mot: "chapeau", emoji: "🎩", son: "ch", syll: 2, rime: "o" },
  { mot: "dauphin", emoji: "🐬", son: "d", syll: 2, rime: "in" },
  { mot: "dé", emoji: "🎲", son: "d", syll: 1, rime: null },
  { mot: "éléphant", emoji: "🐘", son: "e", syll: 3, rime: null },
  { mot: "escargot", emoji: "🐌", son: "e", syll: 3, rime: "o" },
  { mot: "étoile", emoji: "⭐", son: "e", syll: 2, rime: null },
  { mot: "fleur", emoji: "🌸", son: "f", syll: 1, rime: null },
  { mot: "fraise", emoji: "🍓", son: "f", syll: 1, rime: null },
  { mot: "fromage", emoji: "🧀", son: "f", syll: 2, rime: null },
  { mot: "gâteau", emoji: "🎂", son: "g", syll: 2, rime: "o" },
  { mot: "guitare", emoji: "🎸", son: "g", syll: 2, rime: null },
  { mot: "lapin", emoji: "🐰", son: "l", syll: 2, rime: "in" },
  { mot: "lune", emoji: "🌙", son: "l", syll: 1, rime: null },
  { mot: "livre", emoji: "📖", son: "l", syll: 1, rime: null },
  { mot: "maison", emoji: "🏠", son: "m", syll: 2, rime: "on" },
  { mot: "main", emoji: "✋", son: "m", syll: 1, rime: "in" },
  { mot: "montagne", emoji: "⛰️", son: "m", syll: 2, rime: null },
  { mot: "nuage", emoji: "☁️", son: "n", syll: 2, rime: null },
  { mot: "nez", emoji: "👃", son: "n", syll: 1, rime: null },
  { mot: "orange", emoji: "🍊", son: "o", syll: 2, rime: null },
  { mot: "poisson", emoji: "🐟", son: "p", syll: 2, rime: "on" },
  { mot: "pomme", emoji: "🍎", son: "p", syll: 1, rime: null },
  { mot: "papillon", emoji: "🦋", son: "p", syll: 3, rime: "on" },
  { mot: "pain", emoji: "🥖", son: "p", syll: 1, rime: "in" },
  { mot: "robot", emoji: "🤖", son: "r", syll: 2, rime: "o" },
  { mot: "renard", emoji: "🦊", son: "r", syll: 2, rime: null },
  { mot: "rat", emoji: "🐀", son: "r", syll: 1, rime: "a" },
  { mot: "soleil", emoji: "☀️", son: "s", syll: 2, rime: null },
  { mot: "souris", emoji: "🐭", son: "s", syll: 2, rime: null },
  { mot: "serpent", emoji: "🐍", son: "s", syll: 2, rime: null },
  { mot: "sapin", emoji: "🌲", son: "s", syll: 2, rime: "in" },
  { mot: "tortue", emoji: "🐢", son: "t", syll: 2, rime: null },
  { mot: "tomate", emoji: "🍅", son: "t", syll: 2, rime: null },
  { mot: "train", emoji: "🚂", son: "t", syll: 1, rime: "in" },
  { mot: "vache", emoji: "🐮", son: "v", syll: 1, rime: null },
  { mot: "voiture", emoji: "🚗", son: "v", syll: 2, rime: "ur" },
  { mot: "vélo", emoji: "🚲", son: "v", syll: 2, rime: "o" },
  { mot: "mouton", emoji: "🐑", son: "m", syll: 2, rime: "on" },
  { mot: "citron", emoji: "🍋", son: "s", syll: 2, rime: "on" },
  { mot: "cochon", emoji: "🐷", son: "k", syll: 2, rime: "on" },
  { mot: "crayon", emoji: "✏️", son: "k", syll: 2, rime: "on" },
  { mot: "confiture", emoji: "🍯", son: "k", syll: 3, rime: "ur" },
  { mot: "crocodile", emoji: "🐊", son: "k", syll: 3, rime: null },
  { mot: "parapluie", emoji: "☂️", son: "p", syll: 3, rime: null },
  { mot: "champignon", emoji: "🍄", son: "ch", syll: 3, rime: "on" },
  { mot: "ordinateur", emoji: "💻", son: "o", syll: 4, rime: null },
  { mot: "hélicoptère", emoji: "🚁", son: "e", syll: 4, rime: null },
  { mot: "télévision", emoji: "📺", son: "t", syll: 4, rime: "on" },
  { mot: "loup", emoji: "🐺", son: "l", syll: 1, rime: null },
  { mot: "ours", emoji: "🐻", son: "ou", syll: 1, rime: null },
  { mot: "œuf", emoji: "🥚", son: "eu", syll: 1, rime: null },
  { mot: "pied", emoji: "🦶", son: "p", syll: 1, rime: null }
];

/** Comment prononcer un son isolé (pour la consigne orale). */
export const SON_ORAL = {
  a: "aaa", b: "bbb", ch: "chhh", d: "ddd", e: "éé", f: "fff", g: "gue",
  k: "que", l: "lll", m: "mmm", n: "nnn", o: "ooo", p: "ppp", r: "rrr",
  s: "sss", t: "ttt", v: "vvv", ou: "ouou", eu: "euh"
};

/* --- Tri : catégories --------------------------------------------------- */
export const CATEGORIES = [
  {
    id: "vivant",
    question: "Est-ce que c'est vivant ?",
    boites: [
      { nom: "Vivant", emoji: "🌱", elements: ["🐶", "🐱", "🌳", "🌻", "🐟", "🦋", "🐰", "🌵", "🐦", "🍀"] },
      { nom: "Pas vivant", emoji: "🪨", elements: ["🚗", "⚽", "🪑", "📚", "🥄", "🔑", "🧸", "🪨", "👟", "☎️"] }
    ]
  },
  {
    id: "animaux-fruits",
    question: "Range chaque image au bon endroit.",
    boites: [
      { nom: "Animaux", emoji: "🐾", elements: ["🐶", "🐱", "🐘", "🦁", "🐸", "🐧", "🐴", "🐝"] },
      { nom: "Fruits", emoji: "🍇", elements: ["🍎", "🍌", "🍓", "🍇", "🍊", "🍐", "🍒", "🍉"] }
    ]
  },
  {
    id: "air-eau-terre",
    question: "Où vit cet animal ?",
    boites: [
      { nom: "Dans l'eau", emoji: "🌊", elements: ["🐟", "🐬", "🐳", "🦈", "🐙", "🦀"] },
      { nom: "Dans le ciel", emoji: "☁️", elements: ["🐦", "🦅", "🦋", "🐝", "🦉"] },
      { nom: "Sur la terre", emoji: "🌳", elements: ["🐶", "🐱", "🐘", "🦁", "🐰", "🐴"] }
    ]
  }
];

/* --- Paires pour le memory ---------------------------------------------- */
export const PAIRES_MEMORY = ["🐶", "🐱", "🐰", "🦊", "🐸", "🐵", "🐷", "🐼", "🦁", "🐯", "🐨", "🐮", "🐔", "🦉"];
