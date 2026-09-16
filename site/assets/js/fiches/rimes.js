/* Relier les images qui riment — L1 16-17. */

import { h } from "../lib/dom.js";
import { vignette } from "../lib/fiche.js";
import { MOTS, rimesUtilisables } from "../data/mots-imprimables.js";

export function creer(alea) {
  /* Un groupe de rimes n'est utilisé qu'une seule fois par fiche : deux paires
     issues du même groupe rendraient plusieurs appariements corrects. */
  const groupes = alea.melange(rimesUtilisables(2));
  const paires = [];

  for (const rime of groupes) {
    if (paires.length >= 4) break;
    const famille = alea.melange(MOTS.filter((m) => m.rime === rime));
    if (famille.length >= 2) paires.push([famille[0], famille[1]]);
  }

  const gauche = paires.map((p) => p[0]);
  const droite = alea.melange(paires.map((p) => p[1]));

  return {
    titre: "Les mots qui riment",
    consigne: "Relie les deux dessins dont le nom finit par le même son.",
    pourAdulte:
      "Dites les deux mots à voix haute en traînant sur la fin : « bateau… gâteau ». Les rimes s'entendent, " +
      "elles ne se voient pas. Corrigé : " + paires.map(([a, b]) => `${a.mot} – ${b.mot}`).join(", ") + ".",
    objectifs: ["L1 16-17", "L1 15"],
    corps: [
      h(
        "div",
        { class: "relier" },
        h(
          "div",
          { class: "colonne-relier" },
          ...gauche.map((m) =>
            h("div", { class: "case-relier" }, vignette(m.picto, m.mot, { taille: 64 }), h("span", { class: "point-relier" }))
          )
        ),
        h(
          "div",
          { class: "colonne-relier colonne-relier-droite" },
          ...droite.map((m) =>
            h("div", { class: "case-relier case-relier-droite" }, h("span", { class: "point-relier" }), vignette(m.picto, m.mot, { taille: 64 }))
          )
        )
      )
    ]
  };
}
