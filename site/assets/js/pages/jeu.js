import { h, remplacer } from "../lib/dom.js";
import { exerciceParId } from "../data/exercices.js";
import { demarrerJeu } from "../lib/jeu.js";
import { profil } from "../lib/store.js";
import { domaineParId } from "../data/per.js";

let partieEnCours = null;

export function quitter() {
  if (partieEnCours) {
    partieEnCours.arreter();
    partieEnCours = null;
  }
}

export function rendre(params = {}) {
  quitter();
  const exercice = exerciceParId(params.id);

  if (!exercice) {
    return h("div", { class: "page" }, h("h1", {}, "Jeu introuvable"), h("a", { class: "bouton", href: "#/exercices" }, "Retour aux exercices"));
  }

  if (exercice.exigePrenom && !profil().prenom.trim()) {
    return h(
      "div",
      { class: "page" },
      h("h1", {}, `${exercice.emoji} ${exercice.titre}`),
      h(
        "div",
        { class: "note" },
        h("span", { class: "note-icone" }, "👋"),
        h(
          "div",
          {},
          h("strong", {}, "Il manque le prénom"),
          h("p", { style: { margin: ".25rem 0 .75rem" } }, "Ce jeu utilise le prénom de l'enfant. Ajoutez-le dans l'Espace parents (il reste sur cet appareil)."),
          h("a", { class: "bouton", href: "#/parents" }, "Renseigner le prénom")
        )
      )
    );
  }

  const conteneur = h("div", { class: "page-jeu" }, h("div", { class: "page" }, h("p", {}, "Chargement du jeu…")));

  exercice
    .charger()
    .then((module) => {
      partieEnCours = demarrerJeu(conteneur, {
        id: exercice.id,
        titre: exercice.titre,
        emoji: exercice.emoji,
        couleur: (domaineParId(exercice.domaine) || {}).couleur,
        manches: module.manches || 8,
        jouer: module.jouer
      });
    })
    .catch((err) => {
      console.error(err);
      remplacer(
        conteneur,
        h(
          "div",
          { class: "page" },
          h("h1", {}, "Oups"),
          h("p", {}, "Ce jeu n'a pas pu être chargé."),
          h("a", { class: "bouton", href: "#/exercices" }, "Retour aux exercices")
        )
      );
    });

  return conteneur;
}
