/* Planche de cartes à découper — sert au memory, au loto des sons, au tri.
   Une fiche qui se transforme en matériel de jeu réutilisable. */

import { h } from "../lib/dom.js";
import { vignette } from "../lib/fiche.js";
import { picto } from "../lib/pictos.js";
import { MOTS } from "../data/mots-imprimables.js";

export function creer(alea, { variante = "images" } = {}) {
  if (variante === "nombres") return planchesNombres(alea);

  const choisis = alea.plusieurs(MOTS, 8);
  const cartes = alea.melange([...choisis, ...choisis]);

  return {
    titre: "Cartes à découper — memory",
    consigne: "Découpe les cartes. Retourne-les et retrouve les paires.",
    pourAdulte:
      "Commencez avec 4 paires seulement, puis ajoutez-en. Nommez la carte à voix haute à chaque retournement : " +
      "le memory devient aussi un jeu de vocabulaire. Coller sur du carton léger les rend plus solides.",
    objectifs: ["L1 13-14"],
    corps: [
      h(
        "div",
        { class: "planche-cartes", style: { "--colonnes": "4" } },
        ...cartes.map((m) => h("div", { class: "carte-papier" }, vignette(m.picto, m.mot, { taille: 74 })))
      )
    ]
  };
}

function planchesNombres(alea) {
  const objets = ["pomme", "etoile", "poisson", "fleur", "coeur"];
  const cartes = [];
  for (let n = 1; n <= 10; n++) {
    cartes.push({ type: "chiffre", valeur: n });
    cartes.push({ type: "collection", valeur: n, picto: objets[n % objets.length] });
  }

  return {
    titre: "Cartes à découper — les nombres",
    consigne: "Découpe les cartes, puis associe chaque chiffre à la bonne quantité.",
    pourAdulte:
      "Ces cartes servent longtemps : association chiffre/quantité, rangement de 1 à 10, bataille, memory des " +
      "nombres. Commencez avec les nombres 1 à 5.",
    objectifs: ["MSN 12"],
    corps: [
      h(
        "div",
        { class: "planche-cartes", style: { "--colonnes": "5" } },
        ...alea.melange(cartes).map((carte) =>
          carte.type === "chiffre"
            ? h("div", { class: "carte-papier" }, h("span", { class: "carte-chiffre" }, String(carte.valeur)))
            : h(
                "div",
                { class: "carte-papier" },
                h("div", { class: "carte-collection" }, ...Array.from({ length: carte.valeur }, () => picto(carte.picto, { taille: 17, trait: 6 })))
              )
        )
      )
    ]
  };
}
