/* Profil et progression, stockés dans le navigateur (localStorage).
   Aucune donnée ne quitte l'appareil : pas de compte, pas de serveur. */

const CLE = "mon-per:v1";

const DEFAUT = {
  profil: { prenom: "", sonActif: true, annee: "1P" },
  progression: {} // { [idExercice]: { etoiles, parties, meilleurScore, dernierePartie } }
};

let cache = null;

function lire() {
  if (cache) return cache;
  try {
    const brut = localStorage.getItem(CLE);
    cache = brut ? { ...DEFAUT, ...JSON.parse(brut) } : structuredClone(DEFAUT);
  } catch (err) {
    console.warn("Stockage local indisponible, mode sans mémoire.", err);
    cache = structuredClone(DEFAUT);
  }
  cache.profil = { ...DEFAUT.profil, ...(cache.profil || {}) };
  cache.progression = cache.progression || {};
  return cache;
}

function ecrire() {
  try {
    localStorage.setItem(CLE, JSON.stringify(cache));
  } catch (err) {
    console.warn("Impossible d'enregistrer la progression.", err);
  }
  document.dispatchEvent(new CustomEvent("per:maj"));
}

export function profil() {
  return { ...lire().profil };
}

export function majProfil(modifs) {
  lire();
  cache.profil = { ...cache.profil, ...modifs };
  ecrire();
  return profil();
}

export function progression() {
  return { ...lire().progression };
}

export function progressionExercice(id) {
  return lire().progression[id] || { etoiles: 0, parties: 0, meilleurScore: 0, dernierePartie: null };
}

export function enregistrerPartie(id, { etoiles, score, total }) {
  lire();
  const actuel = progressionExercice(id);
  cache.progression[id] = {
    etoiles: Math.max(actuel.etoiles, etoiles),
    parties: actuel.parties + 1,
    meilleurScore: Math.max(actuel.meilleurScore, Math.round((score / total) * 100)),
    dernierePartie: new Date().toISOString()
  };
  ecrire();
  return cache.progression[id];
}

export function reinitialiser() {
  cache = structuredClone(DEFAUT);
  ecrire();
}

export function totalEtoiles() {
  return Object.values(lire().progression).reduce((somme, p) => somme + (p.etoiles || 0), 0);
}
