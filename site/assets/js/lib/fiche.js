/* Gabarit d'une fiche A4 à imprimer.
   Contraintes d'impression : noir sur blanc uniquement (aucune couleur n'est
   nécessaire pour comprendre la consigne), traits épais, zones de réponse
   généreuses — un enfant de 1P écrit gros et hors des lignes. */

import { h } from "./dom.js";
import { picto } from "./pictos.js";

/**
 * @param conf { titre, consigne, pourAdulte, objectifs[], graine, format }
 * @returns { element, corps } — `corps` reçoit le contenu de l'exercice.
 */
export function creerFiche({ titre, consigne, pourAdulte, objectifs = [], graine, paysage = false }) {
  const corps = h("div", { class: "fiche-corps" });

  const element = h(
    "article",
    { class: `fiche${paysage ? " fiche-paysage" : ""}` },

    h(
      "header",
      { class: "fiche-entete" },
      h("span", {}, "Prénom : ", h("span", { class: "pointille" })),
      h("span", {}, "Date : ", h("span", { class: "pointille pointille-court" }))
    ),

    h("h2", { class: "fiche-titre" }, titre),
    consigne ? h("p", { class: "fiche-consigne" }, consigne) : null,

    corps,

    h(
      "footer",
      { class: "fiche-pied" },
      h(
        "div",
        { class: "fiche-pied-gauche" },
        pourAdulte ? h("p", {}, h("strong", {}, "Pour l'adulte : "), pourAdulte) : null
      ),
      h(
        "div",
        { class: "fiche-pied-droite" },
        objectifs.length ? h("div", {}, "PER ", objectifs.join(" · ")) : null,
        h("div", {}, "1P · fiche ", String(graine))
      )
    )
  );

  return { element, corps };
}

/* --------------------------------------------------------------- Briques */

/** Une collection d'objets identiques à dénombrer, rangée en ligne(s). */
export function collection(nomPicto, nombre, { taille = 46, colonnes = 5 } = {}) {
  const zone = h("div", { class: "collection", style: { "--colonnes": String(colonnes) } });
  for (let i = 0; i < nombre; i++) zone.append(picto(nomPicto, { taille, trait: 4.5 }));
  return zone;
}

/** Suite de cases vides à colorier ou à cocher. */
export function cases(nombre, { taille = 34 } = {}) {
  return h(
    "div",
    { class: "cases" },
    ...Array.from({ length: nombre }, () =>
      h("span", { class: "case", style: { width: `${taille}px`, height: `${taille}px` } })
    )
  );
}

/** Encadré avec un trait épais — sert de zone de réponse ou de regroupement. */
export function cadre(contenu, { classe = "" } = {}) {
  return h("div", { class: `cadre ${classe}`.trim() }, contenu);
}

/** Ligne d'exercice numérotée, avec une puce à gauche. */
export function ligne(numero, ...contenu) {
  return h(
    "div",
    { class: "fiche-ligne" },
    h("span", { class: "fiche-numero" }, String(numero)),
    h("div", { class: "fiche-ligne-contenu" }, ...contenu)
  );
}

/** Grand chiffre ou grande lettre à entourer. */
export function pastille(texte, { classe = "" } = {}) {
  return h("span", { class: `pastille-papier ${classe}`.trim() }, texte);
}

/** Étiquette : un dessin, et le mot écrit dessous (pour l'adulte). */
export function vignette(nomPicto, mot, { taille = 60, avecMot = true, classe = "" } = {}) {
  return h(
    "div",
    { class: `vignette ${classe}`.trim() },
    picto(nomPicto, { taille, trait: 4.5, titre: mot }),
    avecMot && mot ? h("span", { class: "vignette-mot" }, mot) : null
  );
}

/** Lignage d'écriture (deux interlignes de 12 mm, comme en 1P). */
export function lignesEcriture(nombre = 2) {
  return h(
    "div",
    { class: "lignage" },
    ...Array.from({ length: nombre }, () => h("div", { class: "lignage-ligne" }))
  );
}

/** Élément SVG générique, pratique pour les tracés (labyrinthes, pointillés). */
export function svg(largeur, hauteur, contenu, { classe = "", alignement = "" } = {}) {
  const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  el.setAttribute("viewBox", `0 0 ${largeur} ${hauteur}`);
  el.setAttribute("class", classe);
  if (alignement) el.setAttribute("preserveAspectRatio", alignement);
  el.setAttribute("fill", "none");
  el.setAttribute("stroke", "currentColor");
  el.setAttribute("stroke-linecap", "round");
  el.setAttribute("stroke-linejoin", "round");
  el.innerHTML = contenu;
  return el;
}
