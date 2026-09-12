/* Tirages aléatoires. */

export function entier(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hasard(tableau) {
  return tableau[Math.floor(Math.random() * tableau.length)];
}

export function melanger(tableau) {
  const copie = [...tableau];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/** n éléments distincts tirés au hasard. */
export function echantillon(tableau, n) {
  return melanger(tableau).slice(0, Math.min(n, tableau.length));
}

/** Choisit un élément différent de `exclu` (utile pour éviter deux manches identiques). */
export function hasardSauf(tableau, exclu) {
  const restants = tableau.filter((x) => x !== exclu);
  return hasard(restants.length ? restants : tableau);
}
