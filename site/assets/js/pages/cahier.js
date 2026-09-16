/* Cahier : plusieurs fiches générées d'un coup, prêtes pour une seule impression. */

import { h, remplacer } from "../lib/dom.js";
import { FICHES, ficheParId } from "../data/fiches.js";
import { creerFiche } from "../lib/fiche.js";
import { creerAlea, graineAleatoire } from "../lib/alea.js";
import { profil, cahier } from "../lib/store.js";

export function rendre() {
  const page = h("div", { class: "page page-large" });
  const choisies = cahier().map(ficheParId).filter(Boolean);

  if (!choisies.length) {
    return h(
      "div",
      { class: "page" },
      h("h1", {}, "Le cahier est vide"),
      h("p", {}, "Choisissez des fiches à regrouper, ou partez de la séance type proposée."),
      h("a", { class: "bouton", href: "#/fiches" }, "Choisir des fiches")
    );
  }

  const apercu = h("div", { class: "apercu-fiches" }, h("p", {}, "Génération du cahier…"));

  function regenerer() {
    const p = profil();
    Promise.all(choisies.map((fiche) => fiche.charger().then((module) => ({ fiche, module }))))
      .then((modules) => {
        const pages = [];
        for (const { fiche, module } of modules) {
          const graine = graineAleatoire();
          const donnees = module.creer(creerAlea(graine), {
            niveau: p.niveau || 1,
            prenom: p.prenom,
            variante: fiche.options.variante ? fiche.options.variante[0].id : null
          });
          const { element, corps } = creerFiche({ ...donnees, graine });
          corps.append(...donnees.corps);
          pages.push(element);
        }
        remplacer(apercu, ...pages);
      })
      .catch((err) => {
        console.error(err);
        remplacer(apercu, h("p", {}, "Le cahier n'a pas pu être généré."));
      });
  }

  const boutonImprimer = h("button", { class: "bouton", type: "button" }, `🖨️ Imprimer les ${choisies.length} fiches`);
  boutonImprimer.addEventListener("click", () => window.print());

  const boutonRegenerer = h("button", { class: "bouton bouton-secondaire", type: "button" }, "🎲 Tout regénérer");
  boutonRegenerer.addEventListener("click", regenerer);

  remplacer(
    page,
    h("p", { class: "fil-ariane sans-impression" }, h("a", { href: "#/fiches" }, "Fiches à imprimer"), " › Cahier"),
    h("h1", { class: "sans-impression" }, `Cahier de ${choisies.length} fiche${choisies.length > 1 ? "s" : ""}`),
    h(
      "div",
      { class: "reglages-fiche sans-impression" },
      boutonImprimer,
      boutonRegenerer,
      h("a", { class: "bouton bouton-fantome", href: "#/fiches" }, "Modifier la sélection"),
      h(
        "p",
        { style: { margin: 0, fontSize: ".85rem", color: "var(--encre-douce)", maxWidth: "32ch" } },
        "Une fiche par page. Pensez à l'impression recto-verso pour économiser du papier."
      )
    ),
    h(
      "ol",
      { class: "sans-impression", style: { color: "var(--encre-douce)", fontSize: ".92rem" } },
      ...choisies.map((f) => h("li", {}, f.titre))
    ),
    apercu
  );

  regenerer();
  return page;
}
