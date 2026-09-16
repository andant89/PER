import { h } from "../lib/dom.js";
import { anneeParId, ANNEES } from "../data/annees.js";
import { domaineParId, objectifParCode, cycleDeLAnnee } from "../data/per.js";
import { FICHES } from "../data/fiches.js";
import { EXERCICES } from "../data/exercices.js";

export function rendre(params = {}) {
  const annee = anneeParId(params.id);
  if (!annee) {
    return h("div", { class: "page" }, h("h1", {}, "Année introuvable"), h("a", { class: "bouton", href: "#/annees" }, "Retour"));
  }

  const cycle = cycleDeLAnnee(annee.id);
  const index = ANNEES.findIndex((a) => a.id === annee.id);
  const precedente = ANNEES[index - 1];
  const suivante = ANNEES[index + 1];
  const materielDisponible = annee.id === "1P";

  return h(
    "div",
    { class: "page" },
    h("p", { class: "fil-ariane" }, h("a", { href: "#/annees" }, "Par année"), " › ", annee.nom),

    h(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" } },
      h("span", { class: "annee-pastille", style: { width: "64px", height: "64px", fontSize: "1.3rem" } }, annee.id),
      h(
        "div",
        {},
        h("h1", { style: { margin: 0 } }, annee.nom),
        h("p", { style: { margin: 0, color: "var(--encre-douce)" } },
          `${annee.age} · ${cycle ? cycle.nom : ""}${annee.ancienNom ? ` · anciennement « ${annee.ancienNom} »` : ""}`)
      )
    ),

    h("p", { class: "chapeau", style: { marginTop: "1rem" } }, annee.resume),

    h(
      "section",
      {},
      h("h2", {}, "Les priorités de l'année"),
      h("div", { class: "carte" }, h("ul", { class: "liste-propre" }, ...annee.priorites.map((p) => h("li", {}, "✅ ", p))))
    ),

    h(
      "section",
      {},
      h("h2", {}, "Repères par domaine"),
      ...annee.reperes.map((repere) => {
        const domaine = domaineParId(repere.domaine);
        return h(
          "details",
          { class: "accordeon", open: true },
          h("summary", { style: { color: domaine ? domaine.couleur : "inherit" } }, `${domaine ? domaine.emoji : "•"} ${domaine ? domaine.nom : repere.domaine}`),
          h(
            "div",
            {},
            h("ul", { class: "liste-propre" }, ...repere.items.map((i) => h("li", {}, "• ", i))),
            repere.objectifs && repere.objectifs.length
              ? h(
                  "p",
                  { style: { marginTop: ".9rem", fontSize: ".9rem", color: "var(--encre-douce)" } },
                  "Objectifs PER : ",
                  ...repere.objectifs.map((code, i) => {
                    const o = objectifParCode(code);
                    return h("span", { title: o ? o.titre : "" }, (i > 0 ? " · " : ""), h("code", {}, code));
                  })
                )
              : null
          )
        );
      })
    ),

    annee.astucesMaison && annee.astucesMaison.length
      ? h(
          "section",
          {},
          h("h2", {}, "🏡 À faire à la maison"),
          h("div", { class: "carte" }, h("ul", { class: "liste-propre" }, ...annee.astucesMaison.map((a) => h("li", {}, "• ", a))))
        )
      : null,

    annee.vigilance && annee.vigilance.length
      ? h(
          "section",
          {},
          h("h2", {}, "👀 Points de vigilance"),
          h(
            "div",
            { class: "note" },
            h("span", { class: "note-icone" }, "💡"),
            h("ul", { class: "liste-propre", style: { margin: 0 } }, ...annee.vigilance.map((v) => h("li", {}, "• ", v)))
          )
        )
      : null,

    materielDisponible
      ? h(
          "section",
          {},
          h("h2", {}, "✏️ Le matériel de cette année"),
          h(
            "p",
            {},
            `${FICHES.length} fiches à imprimer et ${EXERCICES.length} jeux sur écran sont disponibles pour la 1P.`
          ),
          h(
            "div",
            { style: { display: "flex", gap: ".75rem", flexWrap: "wrap" } },
            h("a", { class: "bouton", href: "#/fiches" }, "🖨️ Fiches à imprimer"),
            h("a", { class: "bouton bouton-secondaire", href: "#/exercices" }, "🎮 Jeux sur écran")
          )
        )
      : h(
          "section",
          {},
          h(
            "div",
            { class: "note" },
            h("span", { class: "note-icone" }, "🚧"),
            h("div", {}, h("strong", {}, "Matériel à venir"),
              h("p", { style: { margin: ".25rem 0 0" } }, "Cette version ne propose des fiches et des jeux que pour la 1P. Les autres années suivront."))
          )
        ),

    h(
      "nav",
      { style: { display: "flex", justifyContent: "space-between", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" } },
      precedente ? h("a", { class: "bouton bouton-secondaire", href: `#/annee/${precedente.id}` }, `← ${precedente.nom}`) : h("span", {}),
      suivante ? h("a", { class: "bouton bouton-secondaire", href: `#/annee/${suivante.id}` }, `${suivante.nom} →`) : h("span", {})
    )
  );
}
