/* Tirage aléatoire reproductible.
   Chaque fiche est générée à partir d'une graine : la même graine redonne
   exactement la même fiche (utile pour réimprimer), une nouvelle graine donne
   une variante inédite. La graine est imprimée en pied de page. */

/** Générateur mulberry32 : court, rapide, suffisant pour des exercices. */
export function creerAlea(graine) {
  let etat = graine >>> 0;
  const suivant = () => {
    etat = (etat + 0x6d2b79f5) >>> 0;
    let t = etat;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  return {
    /** Nombre décimal dans [0, 1[. */
    reel: suivant,
    /** Entier entre min et max inclus. */
    entier(min, max) {
      return Math.floor(suivant() * (max - min + 1)) + min;
    },
    /** Un élément du tableau. */
    un(tableau) {
      return tableau[Math.floor(suivant() * tableau.length)];
    },
    /** Copie mélangée du tableau. */
    melange(tableau) {
      const copie = [...tableau];
      for (let i = copie.length - 1; i > 0; i--) {
        const j = Math.floor(suivant() * (i + 1));
        [copie[i], copie[j]] = [copie[j], copie[i]];
      }
      return copie;
    },
    /** n éléments distincts. */
    plusieurs(tableau, n) {
      return this.melange(tableau).slice(0, Math.min(n, tableau.length));
    },
    /** true avec la probabilité p. */
    chance(p = 0.5) {
      return suivant() < p;
    }
  };
}

/** Graine lisible : 4 chiffres, facile à recopier. */
export function graineAleatoire() {
  return Math.floor(1000 + Math.random() * 9000);
}
