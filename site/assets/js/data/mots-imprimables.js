/* Mots illustrables par un picto, avec leurs propriétés phonologiques.
   son  : premier son ENTENDU (phonème, pas la lettre)
   syll : nombre de syllabes orales — `null` quand le découpage est ambigu
          (mots terminés par un « e » muet : lune, pomme, tasse…), pour ne
          jamais piéger l'enfant sur un cas que les adultes découpent déjà
          de deux façons.
   rime : groupe de rime ; `null` si le mot n'appartient à aucun groupe utile. */

export const MOTS = [
  { mot: "arbre", picto: "arbre", son: "a", syll: null, rime: null },
  { mot: "avion", picto: "avion", son: "a", syll: 2, rime: "on" },
  { mot: "ananas", picto: "ananas", son: "a", syll: 3, rime: null },

  { mot: "ballon", picto: "ballon", son: "b", syll: 2, rime: "on" },
  { mot: "banane", picto: "banane", son: "b", syll: 2, rime: null },
  { mot: "bateau", picto: "bateau", son: "b", syll: 2, rime: "o" },

  { mot: "chat", picto: "chat", son: "ch", syll: 1, rime: null },
  { mot: "chapeau", picto: "chapeau", son: "ch", syll: 2, rime: "o" },
  { mot: "champignon", picto: "champignon", son: "ch", syll: 3, rime: "on" },

  { mot: "citron", picto: "citron", son: "s", syll: 2, rime: "on" },
  { mot: "soleil", picto: "soleil", son: "s", syll: 2, rime: null },
  { mot: "souris", picto: "souris", son: "s", syll: 2, rime: null },
  { mot: "sapin", picto: "sapin", son: "s", syll: 2, rime: "in" },
  { mot: "cerise", picto: "cerise", son: "s", syll: 2, rime: null },

  { mot: "lapin", picto: "lapin", son: "l", syll: 2, rime: "in" },
  { mot: "lune", picto: "lune", son: "l", syll: null, rime: null },
  { mot: "livre", picto: "livre", son: "l", syll: null, rime: null },

  { mot: "maison", picto: "maison", son: "m", syll: 2, rime: "on" },
  { mot: "montagne", picto: "montagne", son: "m", syll: 2, rime: null },
  { mot: "moto", picto: "moto", son: "m", syll: 2, rime: "o" },

  { mot: "papillon", picto: "papillon", son: "p", syll: 3, rime: "on" },
  { mot: "poisson", picto: "poisson", son: "p", syll: 2, rime: "on" },
  { mot: "pomme", picto: "pomme", son: "p", syll: null, rime: null },
  { mot: "parapluie", picto: "parapluie", son: "p", syll: 3, rime: null },
  { mot: "pain", picto: "pain", son: "p", syll: 1, rime: "in" },

  { mot: "tortue", picto: "tortue", son: "t", syll: 2, rime: null },
  { mot: "train", picto: "train", son: "t", syll: 1, rime: "in" },
  { mot: "tasse", picto: "tasse", son: "t", syll: null, rime: null },

  { mot: "fleur", picto: "fleur", son: "f", syll: 1, rime: "eur" },
  { mot: "fraise", picto: "fraise", son: "f", syll: null, rime: null },
  { mot: "fourchette", picto: "fourchette", son: "f", syll: 2, rime: null },

  { mot: "carotte", picto: "carotte", son: "k", syll: 2, rime: null },
  { mot: "clé", picto: "cle", son: "k", syll: 1, rime: null },
  { mot: "cœur", picto: "coeur", son: "k", syll: 1, rime: "eur" },
  { mot: "coccinelle", picto: "coccinelle", son: "k", syll: 3, rime: null },

  { mot: "escargot", picto: "escargot", son: "e", syll: 3, rime: "o" },
  { mot: "étoile", picto: "etoile", son: "e", syll: 2, rime: null },
  { mot: "échelle", picto: "echelle", son: "e", syll: 2, rime: null },

  { mot: "vélo", picto: "velo", son: "v", syll: 2, rime: "o" },
  { mot: "voiture", picto: "voiture", son: "v", syll: 2, rime: null },

  { mot: "gâteau", picto: "gateau", son: "g", syll: 2, rime: "o" },
  { mot: "glace", picto: "glace", son: "g", syll: null, rime: null },

  { mot: "robot", picto: "robot", son: "r", syll: 2, rime: "o" },
  { mot: "râteau", picto: "rateau", son: "r", syll: 2, rime: "o" },

  { mot: "nuage", picto: "nuage", son: "n", syll: null, rime: null },
  { mot: "oiseau", picto: "oiseau", son: "oi", syll: 2, rime: "o" },
  { mot: "dé", picto: "de", son: "d", syll: 1, rime: null }
];

/** Comment prononcer un son isolé, pour la consigne orale de l'adulte. */
export const SON_ORAL = {
  a: "aaa", b: "bbb", ch: "chhh", d: "ddd", e: "éé", f: "fff", g: "gue",
  k: "que", l: "lll", m: "mmm", n: "nnn", oi: "oi", p: "ppp", r: "rrr",
  s: "sss", t: "ttt", v: "vvv"
};

/** Sons pour lesquels on a assez de mots pour construire une fiche. */
export function sonsUtilisables(minimum = 3) {
  const compte = {};
  for (const m of MOTS) compte[m.son] = (compte[m.son] || 0) + 1;
  return Object.keys(compte).filter((son) => compte[son] >= minimum);
}

/** Groupes de rimes exploitables (au moins deux mots). */
export function rimesUtilisables(minimum = 2) {
  const compte = {};
  for (const m of MOTS) if (m.rime) compte[m.rime] = (compte[m.rime] || 0) + 1;
  return Object.keys(compte).filter((rime) => compte[rime] >= minimum);
}

export const MOTS_SYLLABES = MOTS.filter((m) => m.syll !== null);
