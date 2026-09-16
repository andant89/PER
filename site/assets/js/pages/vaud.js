import { h } from "../lib/dom.js";
import { VAUD } from "../data/vaud.js";

export function rendre() {
  return h(
    "div",
    { class: "page" },
    h("h1", {}, "Le PER dans le canton de Vaud"),
    h("p", { class: "chapeau" }, VAUD.intro),

    h(
      "div",
      { class: "note", style: { margin: "1.25rem 0 2rem" } },
      h("span", { class: "note-icone" }, "⚠️"),
      h(
        "div",
        {},
        h("strong", {}, "Page à vérifier"),
        h(
          "p",
          { style: { margin: ".25rem 0 0" } },
          "Ces informations n'ont pas encore été confrontées au site officiel de l'État de Vaud. " +
            "Vérifiez-les sur ",
          h("a", { href: "https://www.vd.ch/themes/formation/scolarite-obligatoire", target: "_blank", rel: "noopener" }, "vd.ch"),
          " avant de vous y fier — en particulier les modalités d'évaluation et d'orientation."
        )
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, "Repères vaudois"),
      h(
        "div",
        { class: "grille grille-2" },
        ...VAUD.reperes.map((repere) =>
          h(
            "article",
            { class: "carte" },
            h("span", { class: "tuile-icone" }, repere.emoji),
            h("h3", {}, repere.titre),
            h("p", { style: { margin: 0 } }, repere.texte)
          )
        )
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, "À qui s'adresser"),
      h(
        "div",
        { class: "carte tableau-wrap" },
        h(
          "table",
          { class: "tableau-cycles" },
          h("thead", {}, h("tr", {}, h("th", {}, "Interlocuteur"), h("th", {}, "Pour quoi"))),
          h(
            "tbody",
            {},
            ...VAUD.interlocuteurs.map((i) => h("tr", {}, h("td", {}, h("strong", {}, i.qui)), h("td", {}, i.quand)))
          )
        )
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, "Liens utiles"),
      h(
        "ul",
        { class: "liste-propre" },
        ...VAUD.liens.map((l) => h("li", {}, "→ ", h("a", { href: l.url, target: "_blank", rel: "noopener" }, l.nom)))
      )
    )
  );
}
