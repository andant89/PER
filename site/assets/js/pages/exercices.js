import { h } from "../lib/dom.js";
import { EXERCICES } from "../data/exercices.js";
import { domaineParId } from "../data/per.js";
import { progressionExercice, profil, totalEtoiles } from "../lib/store.js";

const LIBELLE_DOMAINE = {
  langues: "Langues",
  msn: "Maths & sciences",
  arts: "Arts",
  transversal: "Capacités transversales"
};

export function rendre() {
  const { prenom } = profil();

  return h(
    "div",
    { class: "page page-large" },
    h("h1", {}, prenom ? `Les jeux de ${prenom}` : "Exercices — 1re année (1P)"),
    h(
      "p",
      { class: "chapeau" },
      "Des jeux courts, sans texte à lire : les consignes sont lues à voix haute. " +
        "Comptez 10 à 15 minutes par séance, c'est largement suffisant à cet âge."
    ),

    h(
      "p",
      { style: { color: "var(--encre-douce)" } },
      `⭐ ${totalEtoiles()} étoile${totalEtoiles() > 1 ? "s" : ""} gagnée${totalEtoiles() > 1 ? "s" : ""} · `,
      h("a", { href: "#/parents" }, "Espace parents")
    ),

    ...groupes().map(([cle, liste]) =>
      h(
        "section",
        {},
        h("h2", {}, LIBELLE_DOMAINE[cle] || cle),
        h("div", { class: "grille-jeux" }, ...liste.map(carteJeu))
      )
    )
  );
}

function groupes() {
  const ordre = ["msn", "langues", "arts", "transversal"];
  const par = new Map(ordre.map((c) => [c, []]));
  for (const ex of EXERCICES) {
    if (!par.has(ex.domaine)) par.set(ex.domaine, []);
    par.get(ex.domaine).push(ex);
  }
  return [...par.entries()].filter(([, liste]) => liste.length);
}

function carteJeu(exercice) {
  const domaine = domaineParId(exercice.domaine);
  const suivi = progressionExercice(exercice.id);
  const etoiles = "⭐".repeat(suivi.etoiles) + "☆".repeat(3 - suivi.etoiles);

  return h(
    "a",
    { class: "carte-jeu", href: `#/jeu/${exercice.id}`, style: { "--couleur": domaine ? domaine.couleur : "var(--violet)" } },
    h("span", { class: "carte-jeu-emoji" }, exercice.emoji),
    h("h3", {}, exercice.titre),
    h("p", {}, exercice.description),
    h(
      "div",
      { class: "carte-jeu-pied" },
      h("span", { class: "etoiles", title: `${suivi.etoiles} étoile(s)` }, etoiles),
      ...exercice.objectifs.map((code) => h("span", { class: "etiquette" }, code))
    )
  );
}
