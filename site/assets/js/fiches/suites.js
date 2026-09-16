/* Poursuivre une suite (algorithme) — MSN 15. */

import { h } from "../lib/dom.js";
import { picto } from "../lib/pictos.js";

const SYMBOLES = ["rond", "carre", "triangle", "etoile", "coeur", "pomme", "fleur", "poisson", "lune", "sapin"];

const MODELES = [
  { motif: [0, 1], symboles: 2 },
  { motif: [0, 0, 1], symboles: 2 },
  { motif: [0, 1, 1], symboles: 2 },
  { motif: [0, 1, 2], symboles: 3 },
  { motif: [0, 1, 0, 2], symboles: 3 }
];

export function creer(alea, { niveau = 1 } = {}) {
  const modeles = niveau === 1 ? MODELES.slice(0, 3) : MODELES;
  const nbLignes = 4;
  const lignes = [];

  for (let i = 0; i < nbLignes; i++) {
    const modele = alea.un(modeles);
    const palette = alea.plusieurs(SYMBOLES, modele.symboles);
    const longueur = 8;
    const suite = Array.from({ length: longueur }, (_, k) => palette[modele.motif[k % modele.motif.length]]);
    const visibles = suite.slice(0, longueur - 2);

    lignes.push(
      h(
        "div",
        { class: "suite-papier" },
        ...visibles.map((id) => h("span", { class: "case-suite" }, picto(id, { taille: 40, trait: 4.5 }))),
        h("span", { class: "case-suite case-suite-vide" }),
        h("span", { class: "case-suite case-suite-vide" })
      )
    );
  }

  return {
    titre: "Continue la suite",
    consigne: "Regarde bien la suite. Dessine ce qui manque dans les deux cases vides.",
    pourAdulte:
      "Faites d'abord dire la suite à voix haute : « rond, carré, rond, carré… ». Verbaliser le rythme aide " +
      "davantage que regarder.",
    objectifs: ["MSN 15"],
    corps: lignes
  };
}
