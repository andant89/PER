/* Aperçu et impression d'une fiche. */

import { h, remplacer } from "../lib/dom.js";
import { ficheParId } from "../data/fiches.js";
import { creerFiche } from "../lib/fiche.js";
import { creerAlea, graineAleatoire } from "../lib/alea.js";
import { profil, cahier, basculerDansCahier } from "../lib/store.js";

export function rendre(params = {}) {
  const fiche = ficheParId(params.id);
  if (!fiche) {
    return h("div", { class: "page" }, h("h1", {}, "Fiche introuvable"), h("a", { class: "bouton", href: "#/fiches" }, "Retour aux fiches"));
  }

  const page = h("div", { class: "page page-large" });
  let graine = graineAleatoire();
  let variante = fiche.options.variante ? fiche.options.variante[0].id : null;

  const apercu = h("div", { class: "apercu-fiches" }, h("p", {}, "Génération…"));

  function regenerer() {
    fiche
      .charger()
      .then((module) => {
        const p = profil();
        const alea = creerAlea(graine);
        const donnees = module.creer(alea, { niveau: p.niveau || 1, prenom: p.prenom, variante });
        const { element, corps } = creerFiche({ ...donnees, graine });
        corps.append(...donnees.corps);
        remplacer(apercu, element);
      })
      .catch((err) => {
        console.error(err);
        remplacer(apercu, h("p", {}, "Cette fiche n'a pas pu être générée."));
      });
  }

  const boutonVariante = h("button", { class: "bouton bouton-secondaire", type: "button" }, "🎲 Autre variante");
  boutonVariante.addEventListener("click", () => {
    graine = graineAleatoire();
    regenerer();
  });

  const boutonImprimer = h("button", { class: "bouton", type: "button" }, "🖨️ Imprimer");
  boutonImprimer.addEventListener("click", () => window.print());

  const dansCahier = cahier().includes(fiche.id);
  const boutonCahier = h("button", { class: `bouton ${dansCahier ? "" : "bouton-fantome"}`, type: "button" },
    dansCahier ? "✓ dans le cahier" : "+ ajouter au cahier");
  boutonCahier.addEventListener("click", () => {
    const liste = basculerDansCahier(fiche.id);
    const dedans = liste.includes(fiche.id);
    boutonCahier.textContent = dedans ? "✓ dans le cahier" : "+ ajouter au cahier";
    boutonCahier.className = `bouton ${dedans ? "" : "bouton-fantome"}`;
  });

  let selecteurVariante = null;
  if (fiche.options.variante) {
    const select = h("select", {}, ...fiche.options.variante.map((v) => h("option", { value: v.id }, v.nom)));
    select.addEventListener("change", () => {
      variante = select.value;
      regenerer();
    });
    selecteurVariante = h("label", { class: "champ", style: { margin: 0 } }, h("span", {}, "Variante"), select);
  }

  remplacer(
    page,
    h("p", { class: "fil-ariane sans-impression" }, h("a", { href: "#/fiches" }, "Fiches à imprimer"), " › ", fiche.titre),
    h("h1", { class: "sans-impression" }, fiche.titre),

    h(
      "div",
      { class: "reglages-fiche sans-impression" },
      selecteurVariante,
      boutonImprimer,
      boutonVariante,
      boutonCahier,
      h(
        "p",
        { style: { margin: 0, fontSize: ".85rem", color: "var(--encre-douce)", maxWidth: "36ch" } },
        "A4, échelle 100 %, sans en-tête ni pied de page du navigateur. Les réglages de prénom et de " +
          "difficulté se trouvent sur la page ",
        h("a", { href: "#/fiches" }, "Fiches à imprimer"),
        "."
      )
    ),

    apercu,

    h(
      "section",
      { class: "sans-impression" },
      h("h2", {}, "Pour l'adulte"),
      h(
        "div",
        { class: "carte" },
        h("p", {}, h("strong", {}, "Compétence travaillée : "), fiche.competence),
        h("p", {}, h("strong", {}, "À observer pendant l'exercice : "), fiche.aObserver),
        h(
          "p",
          { style: { margin: 0 } },
          h("strong", {}, "Objectifs du PER : "),
          ...fiche.objectifs.map((code, i) => [i ? " · " : "", h("code", {}, code)])
        )
      )
    )
  );

  regenerer();
  return page;
}
