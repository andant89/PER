/* Relier une collection au bon chiffre — MSN 12. */

import { h } from "../lib/dom.js";
import { collection, pastille } from "../lib/fiche.js";

const OBJETS = ["pomme", "etoile", "poisson", "fleur", "coeur", "ballon", "cerise", "papillon"];

export function creer(alea, { niveau = 1 } = {}) {
  const max = niveau === 1 ? 5 : niveau === 2 ? 8 : 10;
  const quantites = alea.plusieurs(
    Array.from({ length: max }, (_, i) => i + 1),
    5
  );
  const objets = alea.melange(OBJETS);
  const chiffres = alea.melange(quantites);

  const gauche = h(
    "div",
    { class: "colonne-relier" },
    ...quantites.map((n, i) =>
      h(
        "div",
        { class: "case-relier" },
        collection(objets[i % objets.length], n, { taille: 30 }),
        h("span", { class: "point-relier" })
      )
    )
  );

  const droite = h(
    "div",
    { class: "colonne-relier colonne-relier-droite" },
    ...chiffres.map((n) =>
      h("div", { class: "case-relier case-relier-droite" }, h("span", { class: "point-relier" }), pastille(String(n)))
    )
  );

  return {
    titre: "Relie au bon chiffre",
    consigne: "Compte les dessins, puis trace un trait jusqu'au bon chiffre.",
    pourAdulte:
      "Faites barrer chaque chiffre déjà utilisé : cela évite de relier deux fois le même et apprend à s'organiser.",
    objectifs: ["MSN 12"],
    corps: [h("div", { class: "relier" }, gauche, droite)]
  };
}
