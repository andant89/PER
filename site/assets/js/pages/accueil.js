import { h } from "../lib/dom.js";
import { EXERCICES } from "../data/exercices.js";
import { CYCLES } from "../data/per.js";
import { profil, totalEtoiles, progression } from "../lib/store.js";
import { melanger } from "../lib/random.js";

export function rendre() {
  const { prenom } = profil();
  const etoiles = totalEtoiles();
  const jouees = Object.keys(progression()).length;
  const suggestions = melanger(EXERCICES).slice(0, 3);

  return h(
    "div",
    { class: "page" },

    h(
      "section",
      { class: "hero" },
      h(
        "div",
        {},
        h("span", { class: "etiquette", style: { background: "rgba(255,255,255,.2)", color: "#fff" } }, "Plan d'études romand"),
        h("h1", {}, prenom ? `Salut ${prenom} ! On apprend en jouant ?` : "Comprendre le PER, et apprendre en jouant"),
        h(
          "p",
          {},
          "Cette application réunit les explications du Plan d'études romand, ses objectifs par cycle et par année, ",
          "et une série d'exercices ludiques pour accompagner un enfant de 1re année (1P)."
        ),
        h(
          "div",
          { class: "hero-actions" },
          h("a", { class: "bouton", href: "#/exercices" }, "🎮 Jouer maintenant"),
          h("a", { class: "bouton bouton-secondaire", href: "#/per" }, "📘 Découvrir le PER")
        )
      ),
      h("div", { class: "hero-illustration", "aria-hidden": "true" }, "🎒✏️🔢")
    ),

    h(
      "section",
      {},
      h("h2", {}, "Par où commencer ?"),
      h(
        "div",
        { class: "grille grille-3" },
        tuile("📘", "Le PER expliqué", "Ce qu'est le Plan d'études romand, comment il est organisé et comment lire un objectif.", "#/per"),
        tuile("🎯", "Les objectifs", "Les cinq domaines, la formation générale et les capacités transversales, cycle par cycle.", "#/objectifs"),
        tuile("📅", "Par année", "Des repères concrets pour chacune des onze années de la scolarité obligatoire.", "#/annees"),
        tuile("🎮", "Exercices 1P", `${EXERCICES.length} jeux courts reliés aux objectifs du cycle 1.`, "#/exercices")
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, "Trois jeux pour aujourd'hui"),
      h(
        "div",
        { class: "grille grille-3" },
        ...suggestions.map((ex) =>
          h(
            "a",
            { class: "tuile", href: `#/jeu/${ex.id}` },
            h("span", { class: "tuile-icone" }, ex.emoji),
            h("h3", {}, ex.titre),
            h("p", {}, ex.description)
          )
        )
      )
    ),

    etoiles > 0
      ? h(
          "section",
          {},
          h(
            "div",
            { class: "carte grille grille-3" },
            h("div", { class: "stat" }, h("div", { class: "valeur" }, String(etoiles)), h("div", { class: "libelle" }, "étoiles gagnées")),
            h("div", { class: "stat" }, h("div", { class: "valeur" }, `${jouees}/${EXERCICES.length}`), h("div", { class: "libelle" }, "jeux essayés")),
            h(
              "div",
              { class: "stat" },
              h("div", { class: "valeur" }, "1P"),
              h("div", { class: "libelle" }, CYCLES[0].nom + " · " + CYCLES[0].ages)
            )
          )
        )
      : null,

    h(
      "section",
      {},
      h(
        "div",
        { class: "note" },
        h("span", { class: "note-icone" }, "ℹ️"),
        h(
          "div",
          {},
          h("strong", {}, "Application familiale, contenus à vérifier"),
          h(
            "p",
            { style: { margin: ".25rem 0 0" } },
            "Les textes du PER présentés ici sont des résumés rédigés pour des parents, pas le texte officiel de la CIIP. ",
            "Référence : ",
            h("a", { href: "https://www.plandetudes.ch", target: "_blank", rel: "noopener" }, "plandetudes.ch"),
            "."
          )
        )
      )
    )
  );
}

function tuile(emoji, titre, texte, lien) {
  return h(
    "a",
    { class: "tuile", href: lien },
    h("span", { class: "tuile-icone" }, emoji),
    h("h3", {}, titre),
    h("p", {}, texte)
  );
}
