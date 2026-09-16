/* Écrire son prénom — L1 18. Objectif phare de la 1P. */

import { h } from "../lib/dom.js";
import { lignesEcriture, svg } from "../lib/fiche.js";

export function creer(alea, { prenom = "" } = {}) {
  const propre = nettoyer(prenom) || "LÉO";
  const lettres = [...propre];
  const tailleTexte = propre.length <= 4 ? 46 : propre.length <= 7 ? 40 : 34;
  // La zone de tracé s'ajuste au prénom : un prénom court est écrit plus grand.
  const largeurTrace = Math.max(120, Math.round(0.78 * tailleTexte * propre.length + 16));

  const modele = h(
    "div",
    { class: "prenom-modele" },
    ...lettres.map((lettre) => h("span", { class: "prenom-lettre" }, lettre))
  );

  const pointilles = (opacite) =>
    h(
      "div",
      { class: "prenom-trace" },
      svg(
        largeurTrace,
        60,
        `<text x="8" y="47" font-size="${tailleTexte}" font-family="system-ui, sans-serif" font-weight="700"
           letter-spacing="5" fill="none" stroke="currentColor" stroke-width="1.1"
           stroke-dasharray="${opacite}">${echapper(propre)}</text>`,
        { classe: "piste-prenom", alignement: "xMinYMid meet" }
      )
    );

  const melangees = alea.melange(lettres);

  return {
    titre: "Mon prénom",
    consigne: "Repasse sur ton prénom, puis écris-le tout seul sur la ligne.",
    pourAdulte:
      "Le prénom en majuscules d'imprimerie est la première écriture attendue en 1P — la cursive viendra en 3P. " +
      "Nommez chaque lettre en la traçant : c'est ainsi que l'enfant les mémorise.",
    objectifs: ["L1 18", "L1 16-17"],
    corps: [
      h("div", { class: "prenom-bloc" }, h("span", { class: "prenom-etiquette" }, "Le modèle"), modele),
      h("div", { class: "prenom-bloc" }, h("span", { class: "prenom-etiquette" }, "Repasse"), pointilles("3 3"), pointilles("2 6")),
      h(
        "div",
        { class: "prenom-bloc" },
        h("span", { class: "prenom-etiquette" }, "À toi d'écrire"),
        lignesEcriture(2)
      ),
      h(
        "div",
        { class: "prenom-bloc" },
        h("span", { class: "prenom-etiquette" }, "Entoure les lettres de ton prénom, dans l'ordre"),
        h("div", { class: "prenom-lettres-melangees" }, ...melangees.map((l) => h("span", { class: "case-lettre-papier" }, l)))
      )
    ]
  };
}

function nettoyer(valeur) {
  return String(valeur || "")
    .toUpperCase()
    .replace(/[^A-ZÀ-ÖØ-Þ\-' ]/g, "")
    .trim()
    .slice(0, 12);
}

function echapper(texte) {
  return texte.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
