/* Reconnaître les formes et appliquer un code couleur — MSN 11. */

import { h } from "../lib/dom.js";
import { picto } from "../lib/pictos.js";

const FORMES = [
  { id: "rond", nom: "les ronds", couleur: "en ROUGE" },
  { id: "carre", nom: "les carrés", couleur: "en BLEU" },
  { id: "triangle", nom: "les triangles", couleur: "en VERT" },
  { id: "etoile", nom: "les étoiles", couleur: "en JAUNE" }
];

export function creer(alea, { niveau = 1 } = {}) {
  const retenues = niveau === 1 ? FORMES.slice(0, 3) : FORMES;
  const total = 20;

  const tirage = [];
  for (let i = 0; i < total; i++) tirage.push(alea.un(retenues));
  // garantit au moins deux exemplaires de chaque forme
  for (const forme of retenues) {
    if (tirage.filter((f) => f.id === forme.id).length < 2) {
      tirage[alea.entier(0, tirage.length - 1)] = forme;
      tirage[alea.entier(0, tirage.length - 1)] = forme;
    }
  }

  /* Tailles et orientations variées : reconnaître un triangle posé sur la
     pointe est justement ce qui pose problème à cet âge. */
  const grille = h(
    "div",
    { class: "grille-formes" },
    ...alea.melange(tirage).map((forme) => {
      const taille = alea.entier(40, 66);
      const rotation = forme.id === "rond" ? 0 : alea.un([0, 0, 15, 30, 45, 180, -25]);
      return h(
        "div",
        { class: "case-forme", style: { transform: `rotate(${rotation}deg)` } },
        picto(forme.id, { taille, trait: 4.5, titre: forme.nom })
      );
    })
  );

  const code = h(
    "div",
    { class: "code-couleur cadre" },
    ...retenues.map((forme) =>
      h(
        "div",
        { class: "code-couleur-item" },
        picto(forme.id, { taille: 30, trait: 5 }),
        h("span", {}, forme.nom, " → ", h("strong", {}, forme.couleur))
      )
    )
  );

  const compte = h(
    "div",
    { class: "compte-formes" },
    ...retenues.map((forme) =>
      h(
        "div",
        { class: "compte-item" },
        h("span", {}, "Combien de "),
        picto(forme.id, { taille: 24, trait: 5 }),
        h("span", { class: "reponse-vide" })
      )
    )
  );

  return {
    titre: "Le code des formes",
    consigne: "Colorie chaque forme selon le code. Puis compte-les.",
    pourAdulte:
      "Ce qui compte : reconnaître la forme quelles que soient sa taille et son orientation. " +
      "Prolongez en cherchant des ronds et des carrés dans la cuisine.",
    objectifs: ["MSN 11", "MSN 12"],
    corps: [code, grille, compte]
  };
}
