import { h } from "../lib/dom.js";
import { FICHES, SEANCE_TYPE } from "../data/fiches.js";
import { EXERCICES } from "../data/exercices.js";
import { CYCLES } from "../data/per.js";
import { profil, cahier } from "../lib/store.js";
import { melanger } from "../lib/random.js";

export function rendre() {
  const { prenom } = profil();
  const suggestions = melanger(FICHES).slice(0, 3);

  return h(
    "div",
    { class: "page" },

    h(
      "section",
      { class: "hero" },
      h(
        "div",
        {},
        h("span", { class: "etiquette", style: { background: "rgba(255,255,255,.2)", color: "#fff" } }, "Plan d'études romand · canton de Vaud"),
        h("h1", {}, prenom ? `Accompagner ${prenom} en 1P` : "Comprendre le PER, et travailler sur papier"),
        h(
          "p",
          {},
          "Les explications du Plan d'études romand, ses objectifs par cycle et par année, et surtout des ",
          h("strong", {}, "fiches d'exercices à imprimer"),
          " pour faire la 1P avec son enfant — crayon, ciseaux et feuille, sans écran."
        ),
        h(
          "div",
          { class: "hero-actions" },
          h("a", { class: "bouton", href: "#/fiches" }, "🖨️ Imprimer des fiches"),
          h("a", { class: "bouton bouton-secondaire", href: "#/per" }, "📘 Découvrir le PER")
        )
      ),
      h("div", { class: "hero-illustration", "aria-hidden": "true" }, "✏️📄✂️")
    ),

    h(
      "section",
      {},
      h("h2", {}, "Par où commencer ?"),
      h(
        "div",
        { class: "grille grille-3" },
        tuile("🖨️", "Fiches à imprimer", `${FICHES.length} fiches A4 pour la 1P, régénérées différemment à chaque impression.`, "#/fiches"),
        tuile("📘", "Le PER expliqué", "Comment le programme romand est organisé et comment lire un objectif.", "#/per"),
        tuile("🎯", "Les objectifs", "Les cinq domaines, la formation générale et les capacités transversales.", "#/objectifs"),
        tuile("📅", "Par année", "Des repères concrets pour chacune des onze années de la scolarité.", "#/annees"),
        tuile("🇨🇭", "Dans le canton de Vaud", "Évaluation, orientation et services de soutien vaudois.", "#/vaud"),
        tuile("🎮", "Jeux sur écran", `${EXERCICES.length} jeux, en complément — à réserver aux moments choisis.`, "#/exercices")
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, "Une séance sur papier, en 20 minutes"),
      h(
        "div",
        { class: "carte" },
        h(
          "p",
          {},
          "Une séance équilibrée mélange le geste, le nombre et les sons. La ",
          h("strong", {}, "séance type"),
          " assemble en un clic ",
          String(SEANCE_TYPE.length),
          " fiches complémentaires, prêtes à imprimer d'un coup."
        ),
        h(
          "ol",
          { style: { color: "var(--encre-douce)", marginBottom: "1.25rem" } },
          h("li", {}, "Un temps de graphisme pour délier la main (5 min)"),
          h("li", {}, "Une fiche de nombres, en manipulant et en comptant à voix haute (5 min)"),
          h("li", {}, "Une fiche de sons, entièrement à l'oreille (5 min)"),
          h("li", {}, "Le prénom, ou un labyrinthe pour finir sur du plaisir (5 min)")
        ),
        h("a", { class: "bouton", href: "#/fiches" }, "Préparer la séance")
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, "Trois fiches au hasard"),
      h(
        "div",
        { class: "grille grille-3" },
        ...suggestions.map((f) =>
          h(
            "a",
            { class: "tuile", href: `#/fiche/${f.id}` },
            h("span", { class: "tuile-icone" }, "📄"),
            h("h3", {}, f.titre),
            h("p", {}, f.description)
          )
        )
      )
    ),

    cahier().length
      ? h(
          "section",
          {},
          h(
            "div",
            { class: "carte", style: { display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" } },
            h("span", { class: "pastille-compteur" }, String(cahier().length)),
            h("div", { style: { flex: "1 1 200px" } }, h("strong", {}, "Un cahier vous attend"), h("p", { style: { margin: 0, color: "var(--encre-douce)" } }, "Des fiches sont déjà sélectionnées pour l'impression.")),
            h("a", { class: "bouton", href: "#/cahier" }, "Ouvrir le cahier")
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
            "Cycle 1 : ", CYCLES[0].annees.join(", "), " · ", CYCLES[0].ages, ". Référence : ",
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
