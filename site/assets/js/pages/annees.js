import { h } from "../lib/dom.js";
import { ANNEES } from "../data/annees.js";
import { CYCLES } from "../data/per.js";

export function rendre() {
  return h(
    "div",
    { class: "page" },
    h("h1", {}, "Les objectifs, année par année"),
    h(
      "p",
      { class: "chapeau" },
      "Le PER fixe ses attentes en fin de cycle. Les repères ci-dessous répartissent ces attentes " +
        "année par année, à titre indicatif, pour aider les parents à situer leur enfant."
    ),
    h(
      "div",
      { class: "note", style: { margin: "1.25rem 0 2rem" } },
      h("span", { class: "note-icone" }, "⚠️"),
      h(
        "div",
        {},
        h("strong", {}, "Ce ne sont pas des normes"),
        h(
          "p",
          { style: { margin: ".25rem 0 0" } },
          "Le rythme varie beaucoup d'un enfant à l'autre, surtout en 1P et 2P. Ces repères ne remplacent " +
            "ni le bulletin scolaire, ni l'avis de l'enseignant·e."
        )
      )
    ),
    ...CYCLES.map((cycle) =>
      h(
        "section",
        {},
        h("h2", {}, `${cycle.nom} — ${cycle.ages}`),
        h("p", { class: "chapeau" }, cycle.resume),
        h(
          "div",
          { class: "grille grille-2" },
          ...ANNEES.filter((a) => a.cycle === cycle.id).map((annee) =>
            h(
              "a",
              { class: "tuile annee-carte", href: `#/annee/${annee.id}` },
              h(
                "div",
                { style: { display: "flex", alignItems: "center", gap: ".85rem", marginBottom: ".5rem" } },
                h("span", { class: "annee-pastille" }, annee.id),
                h(
                  "div",
                  {},
                  h("h3", { style: { margin: 0 } }, annee.nom),
                  h("small", { style: { color: "var(--encre-douce)" } }, annee.age + (annee.ancienNom ? ` · ${annee.ancienNom}` : ""))
                )
              ),
              h("p", {}, annee.resume)
            )
          )
        )
      )
    )
  );
}
