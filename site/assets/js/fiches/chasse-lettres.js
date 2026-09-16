/* Entourer toutes les occurrences d'une lettre — L1 16-17. */

import { h } from "../lib/dom.js";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const FREQUENTES = "AEIOULMRSTPBCDFNV".split("");

export function creer(alea, { prenom = "", niveau = 1 } = {}) {
  const duPrenom = [...new Set(
    String(prenom || "").toUpperCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Z]/g, "").split("")
  )];
  const cible = alea.un(duPrenom.length ? [...duPrenom, ...duPrenom, ...FREQUENTES] : FREQUENTES);

  const colonnes = 8;
  const rangees = niveau === 1 ? 5 : 6;
  const total = colonnes * rangees;
  const combien = Math.round(total * 0.22);

  const contenu = [];
  for (let i = 0; i < combien; i++) contenu.push(cible);
  const intrus = ALPHABET.filter((l) => l !== cible);
  while (contenu.length < total) contenu.push(alea.un(intrus));

  const grille = h(
    "div",
    { class: "grille-lettres", style: { "--colonnes": String(colonnes) } },
    ...alea.melange(contenu).map((lettre) => h("span", { class: "case-lettre-papier" }, lettre))
  );

  return {
    titre: `La chasse à la lettre ${cible}`,
    consigne: `Entoure toutes les lettres ${cible}. Il y en a ${combien}.`,
    pourAdulte:
      `Nommez la lettre par son SON autant que par son nom. Comptez ensemble les lettres entourées à la fin : ` +
      `l'enfant vérifie son propre travail, ce qui vaut mieux qu'une correction d'adulte.`,
    objectifs: ["L1 16-17", "L1 18"],
    corps: [
      grille,
      h("p", { class: "question-fin" }, "Combien en as-tu trouvé ? ", h("span", { class: "reponse-vide" }))
    ]
  };
}
