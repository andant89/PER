/* Entourer le groupe qui en a le plus (ou le moins) — MSN 12. */

import { h } from "../lib/dom.js";
import { collection, ligne } from "../lib/fiche.js";

const OBJETS = ["pomme", "poisson", "etoile", "fleur", "ballon", "coeur", "papillon", "cerise"];

export function creer(alea, { niveau = 1 } = {}) {
  const max = niveau === 1 ? 6 : 10;
  const chercheLePlus = alea.chance();
  const objets = alea.melange(OBJETS);

  const lignes = [];
  for (let i = 0; i < 5; i++) {
    let a = alea.entier(1, max);
    let b = alea.entier(1, max);
    while (a === b) b = alea.entier(1, max);

    lignes.push(
      ligne(
        i + 1,
        h("div", { class: "cadre cadre-pointille groupe-comparaison" }, collection(objets[i % objets.length], a, { taille: 22 })),
        h("span", { class: "vs" }, "ou"),
        h("div", { class: "cadre cadre-pointille groupe-comparaison" }, collection(objets[i % objets.length], b, { taille: 22 }))
      )
    );
  }

  return {
    titre: chercheLePlus ? "Où y en a-t-il le plus ?" : "Où y en a-t-il le moins ?",
    consigne: chercheLePlus
      ? "Entoure à chaque fois le groupe où il y a LE PLUS de dessins."
      : "Entoure à chaque fois le groupe où il y a LE MOINS de dessins.",
    pourAdulte:
      "Au début, l'enfant se fie à la place occupée plutôt qu'au nombre. Faites compter les deux groupes " +
      "à voix haute avant de choisir.",
    objectifs: ["MSN 12"],
    corps: lignes
  };
}
