/* Catalogue des fiches imprimables. */

import { h, remplacer } from "../lib/dom.js";
import { FICHES, SEANCE_TYPE } from "../data/fiches.js";
import { domaineParId } from "../data/per.js";
import { profil, majProfil, cahier, basculerDansCahier, definirCahier, viderCahier } from "../lib/store.js";

const LIBELLE_DOMAINE = {
  msn: "Nombres, formes et logique",
  langues: "Langage, sons et écriture",
  transversal: "Matériel à fabriquer"
};

export function rendre() {
  const page = h("div", { class: "page page-large" });
  dessiner(page);
  return page;
}

function dessiner(page) {
  const p = profil();
  const choisies = cahier();

  remplacer(
    page,
    h("h1", {}, "Fiches à imprimer — 1re année (1P)"),
    h(
      "p",
      { class: "chapeau" },
      "Chaque fiche tient sur une page A4, en noir et blanc, et se régénère différemment à chaque fois : " +
        "le même exercice peut être réimprimé indéfiniment sans jamais être identique."
    ),

    reglages(page, p),

    h(
      "div",
      { class: "note", style: { margin: "1.25rem 0 2rem" } },
      h("span", { class: "note-icone" }, "🖨️"),
      h(
        "div",
        {},
        h("strong", {}, "Comment imprimer"),
        h(
          "p",
          { style: { margin: ".25rem 0 0" } },
          "Ouvrez une fiche, puis « Imprimer ». Dans la fenêtre d'impression : format A4, échelle 100 % " +
            "(pas « ajuster à la page »), et décochez les en-têtes et pieds de page du navigateur. " +
            "Vous pouvez aussi choisir « Enregistrer en PDF » pour imprimer plus tard."
        )
      )
    ),

    barreCahier(page, choisies),

    ...groupes().map(([cle, liste]) =>
      h(
        "section",
        {},
        h("h2", {}, LIBELLE_DOMAINE[cle] || cle),
        h("div", { class: "grille-jeux" }, ...liste.map((fiche) => carteFiche(page, fiche, choisies)))
      )
    )
  );
}

function reglages(page, p) {
  const champPrenom = h("input", { type: "text", value: p.prenom || "", maxlength: "14", placeholder: "Prénom de l'enfant" });
  champPrenom.addEventListener("change", () => majProfil({ prenom: champPrenom.value.trim() }));
  champPrenom.addEventListener("blur", () => majProfil({ prenom: champPrenom.value.trim() }));

  const champNiveau = h(
    "select",
    {},
    h("option", { value: "1" }, "Début de 1P — quantités jusqu'à 5"),
    h("option", { value: "2" }, "Milieu de 1P — jusqu'à 8"),
    h("option", { value: "3" }, "Fin de 1P — jusqu'à 10")
  );
  champNiveau.value = String(p.niveau || 1);
  champNiveau.addEventListener("change", () => {
    majProfil({ niveau: Number(champNiveau.value) });
  });

  return h(
    "div",
    { class: "reglages-fiche" },
    h("label", { class: "champ" }, h("span", {}, "Prénom"), champPrenom),
    h("label", { class: "champ" }, h("span", {}, "Difficulté"), champNiveau),
    h(
      "p",
      { style: { margin: 0, fontSize: ".88rem", color: "var(--encre-douce)", maxWidth: "34ch" } },
      "Ces réglages s'appliquent à toutes les fiches. Le prénom sert aux fiches d'écriture."
    )
  );
}

function barreCahier(page, choisies) {
  const boutonSeance = h("button", { class: "bouton bouton-secondaire", type: "button" }, "✨ Séance type (6 fiches)");
  boutonSeance.addEventListener("click", () => {
    definirCahier(SEANCE_TYPE);
    dessiner(page);
  });

  const boutonVider = h("button", { class: "bouton bouton-fantome", type: "button" }, "Vider");
  boutonVider.addEventListener("click", () => {
    viderCahier();
    dessiner(page);
  });

  return h(
    "div",
    { class: "carte", style: { display: "flex", gap: ".75rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2rem" } },
    h("span", { class: "pastille-compteur" }, String(choisies.length)),
    h(
      "div",
      { style: { flex: "1 1 240px" } },
      h("strong", {}, "Cahier à imprimer"),
      h(
        "p",
        { style: { margin: 0, fontSize: ".9rem", color: "var(--encre-douce)" } },
        choisies.length
          ? "Ces fiches seront imprimées d'un seul coup, une par page."
          : "Cochez « + cahier » sur les fiches à regrouper, ou partez de la séance type."
      )
    ),
    boutonSeance,
    choisies.length ? boutonVider : null,
    choisies.length ? h("a", { class: "bouton", href: "#/cahier" }, "📕 Ouvrir le cahier") : null
  );
}

function groupes() {
  const ordre = ["msn", "langues", "transversal"];
  const par = new Map(ordre.map((c) => [c, []]));
  for (const fiche of FICHES) {
    if (!par.has(fiche.domaine)) par.set(fiche.domaine, []);
    par.get(fiche.domaine).push(fiche);
  }
  return [...par.entries()].filter(([, liste]) => liste.length);
}

function carteFiche(page, fiche, choisies) {
  const domaine = domaineParId(fiche.domaine);
  const dedans = choisies.includes(fiche.id);

  const bascule = h(
    "button",
    { class: `bouton ${dedans ? "" : "bouton-fantome"}`, type: "button" },
    dedans ? "✓ dans le cahier" : "+ cahier"
  );
  bascule.addEventListener("click", () => {
    basculerDansCahier(fiche.id);
    dessiner(page);
  });

  return h(
    "article",
    { class: `carte-fiche${dedans ? " choisie" : ""}`, style: { "--couleur": domaine ? domaine.couleur : "var(--violet)" } },
    h("h3", {}, fiche.titre),
    h("p", {}, fiche.description),
    h("p", { style: { fontSize: ".88rem" } }, h("strong", {}, "Travaille : "), fiche.competence),
    h(
      "div",
      { style: { display: "flex", gap: ".35rem", flexWrap: "wrap", marginTop: ".4rem" } },
      ...fiche.objectifs.map((code) => h("span", { class: "etiquette" }, code))
    ),
    h(
      "div",
      { class: "actions" },
      h("a", { class: "bouton", href: `#/fiche/${fiche.id}` }, "Aperçu"),
      bascule
    )
  );
}
