/* Compter et entourer le bon chiffre — MSN 12. */

import { h } from "../lib/dom.js";
import { collection, ligne, pastille } from "../lib/fiche.js";
import { IDS_PICTOS } from "../lib/pictos.js";

const OBJETS = ["pomme", "poisson", "etoile", "fleur", "ballon", "coeur", "papillon", "voiture", "cerise", "sapin", "cle", "champignon"];

export function creer(alea, { niveau = 1 } = {}) {
  const max = niveau === 1 ? 5 : niveau === 2 ? 8 : 10;
  const min = niveau === 1 ? 1 : 3;
  const objets = alea.melange(OBJETS.filter((o) => IDS_PICTOS.includes(o)));

  const lignes = [];
  const dejaVus = new Set();
  for (let i = 0; i < 6; i++) {
    let nombre = alea.entier(min, max);
    // évite de répéter deux fois la même quantité de suite
    while (dejaVus.has(nombre) && dejaVus.size < max - min + 1) nombre = alea.entier(min, max);
    dejaVus.add(nombre);

    const propositions = propositionsAutour(alea, nombre, max);
    lignes.push(
      ligne(
        i + 1,
        collection(objets[i % objets.length], nombre, { taille: 34 }),
        h("div", { style: { marginLeft: "auto", display: "flex", gap: "4mm" } },
          ...propositions.map((n) => pastille(String(n))))
      )
    );
  }

  return {
    titre: "Combien y en a-t-il ?",
    consigne: "Compte les dessins, puis entoure le bon chiffre.",
    pourAdulte:
      "Faites toucher chaque dessin du doigt en comptant à voix haute. Le dernier mot dit est la quantité : " +
      "c'est cela qui est difficile à cet âge, pas la récitation.",
    objectifs: ["MSN 12"],
    corps: lignes
  };
}

function propositionsAutour(alea, bonne, max) {
  const ensemble = new Set([bonne]);
  for (const ecart of alea.melange([1, -1, 2, -2, 3])) {
    if (ensemble.size >= 3) break;
    const candidat = bonne + ecart;
    if (candidat >= 1 && candidat <= max + 2) ensemble.add(candidat);
  }
  return alea.melange([...ensemble]);
}
