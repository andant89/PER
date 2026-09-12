import { h } from "../lib/dom.js";
import { PRESENTATION, CYCLES, DOMAINES, FORMATION_GENERALE, CAPACITES_TRANSVERSALES } from "../data/per.js";

export function rendre() {
  return h(
    "div",
    { class: "page" },

    h("h1", {}, PRESENTATION.titre),
    h("p", { class: "chapeau" }, PRESENTATION.chapeau),

    h(
      "section",
      { class: "grille grille-2" },
      ...PRESENTATION.blocs.map((bloc) =>
        h(
          "article",
          { class: "carte" },
          h("span", { class: "tuile-icone" }, bloc.emoji),
          h("h3", {}, bloc.titre),
          h("p", {}, bloc.texte),
          bloc.details.length
            ? h("ul", { class: "liste-propre", style: { color: "var(--encre-douce)", fontSize: ".95rem" } },
                ...bloc.details.map((d) => h("li", {}, "• ", d)))
            : null
        )
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, "Les trois cycles"),
      h(
        "div",
        { class: "grille grille-3" },
        ...CYCLES.map((cycle) =>
          h(
            "article",
            { class: "carte" },
            h("span", { class: "etiquette" }, cycle.annees.join(" · ")),
            h("h3", { style: { marginTop: ".6rem" } }, `${cycle.nom} — ${cycle.ages}`),
            h("p", {}, cycle.resume),
            h("ul", { class: "liste-propre", style: { fontSize: ".95rem" } }, ...cycle.priorites.map((p) => h("li", {}, "• ", p))),
            h("a", { class: "bouton bouton-secondaire", href: "#/objectifs", style: { marginTop: ".5rem" } }, "Voir les objectifs")
          )
        )
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, "Les cinq domaines disciplinaires"),
      h("p", { class: "chapeau" }, "Chaque domaine regroupe une ou plusieurs disciplines et poursuit des visées prioritaires communes aux onze années."),
      h(
        "div",
        { class: "grille grille-2" },
        ...DOMAINES.map((domaine) =>
          h(
            "article",
            { class: "carte domaine", style: { "--couleur": domaine.couleur } },
            h("span", { class: "etiquette" }, domaine.sigle),
            h("h3", { style: { marginTop: ".6rem" } }, `${domaine.emoji} ${domaine.nom}`),
            h("p", { style: { fontSize: ".95rem" } }, domaine.viseesPrioritaires),
            h("p", { style: { margin: 0, fontSize: ".9rem", color: "var(--encre-douce)" } },
              h("strong", {}, "Disciplines : "), domaine.disciplines.join(", "))
          )
        )
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, `${FORMATION_GENERALE.emoji} La Formation générale`),
      h("p", { class: "chapeau" }, FORMATION_GENERALE.intro),
      h(
        "div",
        { class: "carte" },
        ...FORMATION_GENERALE.thematiques.map((t) =>
          h(
            "div",
            { class: "objectif", style: { "--couleur": FORMATION_GENERALE.couleur } },
            h("span", { class: "objectif-code" }, t.code),
            h("div", {}, h("div", { class: "objectif-titre" }, t.nom), h("p", { class: "objectif-detail" }, t.texte))
          )
        )
      )
    ),

    h(
      "section",
      {},
      h("h2", {}, `${CAPACITES_TRANSVERSALES.emoji} Les capacités transversales`),
      h("p", { class: "chapeau" }, CAPACITES_TRANSVERSALES.intro),
      h(
        "div",
        { class: "grille grille-3" },
        ...CAPACITES_TRANSVERSALES.liste.map((c) =>
          h(
            "article",
            { class: "carte" },
            h("span", { class: "tuile-icone" }, c.emoji),
            h("h3", {}, c.nom),
            h("p", { style: { fontSize: ".95rem" } }, c.texte),
            h("p", { style: { margin: 0, fontSize: ".9rem", color: "var(--encre-douce)" } }, h("strong", {}, "À la maison : "), c.maison)
          )
        )
      )
    )
  );
}
