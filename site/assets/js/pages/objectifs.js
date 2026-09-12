import { h, remplacer } from "../lib/dom.js";
import { DOMAINES, CYCLES, META } from "../data/per.js";
import { exercicesParObjectif } from "../data/exercices.js";

export function rendre(params = {}) {
  const cycleActif = Number(params.cycle) || 1;

  const contenu = h("div", {});

  const onglets = h(
    "div",
    { class: "choix", style: { justifyContent: "flex-start", marginBottom: "1.5rem" } },
    ...CYCLES.map((cycle) =>
      h(
        "a",
        {
          class: `bouton ${cycle.id === cycleActif ? "" : "bouton-secondaire"}`,
          href: `#/objectifs/${cycle.id}`
        },
        `${cycle.nom} · ${cycle.annees[0]}–${cycle.annees[cycle.annees.length - 1]}`
      )
    )
  );

  remplacer(contenu, ...sectionsDomaines(cycleActif));

  return h(
    "div",
    { class: "page" },
    h("h1", {}, "Les objectifs d'apprentissage"),
    h(
      "p",
      { class: "chapeau" },
      "Chaque domaine fixe des objectifs par cycle. Les codes permettent de retrouver le texte officiel sur plandetudes.ch."
    ),
    h(
      "div",
      { class: "note", style: { marginBottom: "1.5rem" } },
      h("span", { class: "note-icone" }, "📝"),
      h("div", {}, h("strong", {}, "Formulations résumées"), h("p", { style: { margin: ".25rem 0 0" } }, META.avertissement))
    ),
    onglets,
    contenu
  );
}

function sectionsDomaines(cycle) {
  return DOMAINES.map((domaine) => {
    const objectifs = domaine.objectifs[cycle] || [];
    return h(
      "section",
      { class: "carte domaine", style: { "--couleur": domaine.couleur, marginBottom: "1.25rem" } },
      h("span", { class: "etiquette" }, domaine.sigle),
      h("h2", { style: { marginTop: ".6rem" } }, `${domaine.emoji} ${domaine.nom}`),
      h("p", { style: { fontSize: ".95rem", color: "var(--encre-douce)" } }, domaine.viseesPrioritaires),
      domaine.remarqueCodes
        ? h("p", { style: { fontSize: ".88rem", color: "var(--encre-douce)", fontStyle: "italic" } }, "ℹ️ ", domaine.remarqueCodes)
        : null,
      ...objectifs.map((objectif) => ligneObjectif(objectif)),
      objectifs.length === 0 ? h("p", {}, "Aucun objectif renseigné pour ce cycle.") : null
    );
  });
}

function ligneObjectif(objectif) {
  const jeux = exercicesParObjectif(objectif.code);
  return h(
    "div",
    { class: "objectif" },
    h("span", { class: "objectif-code" }, objectif.code),
    h(
      "div",
      {},
      h("div", { class: "objectif-titre" }, objectif.titre, objectif.verifie ? h("span", { title: "Vérifié sur plandetudes.ch" }, " ✓") : null),
      objectif.composantes && objectif.composantes.length
        ? h(
            "ul",
            { class: "liste-propre objectif-detail" },
            ...objectif.composantes.map((c) => h("li", {}, "• ", c))
          )
        : null,
      jeux.length
        ? h(
            "p",
            { class: "objectif-detail", style: { marginTop: ".4rem" } },
            "🎮 ",
            ...jeux.map((jeu, i) => [
              i > 0 ? " · " : "",
              h("a", { href: `#/jeu/${jeu.id}` }, jeu.titre)
            ])
          )
        : null
    )
  );
}
