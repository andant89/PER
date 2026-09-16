/* Colorier autant de cases que de syllabes — L1 16-17. */

import { h } from "../lib/dom.js";
import { ligne, vignette, cases } from "../lib/fiche.js";
import { MOTS_SYLLABES } from "../data/mots-imprimables.js";

export function creer(alea, { niveau = 1 } = {}) {
  const maxSyllabes = niveau === 1 ? 2 : 3;
  const disponibles = MOTS_SYLLABES.filter((m) => m.syll <= maxSyllabes);
  const choisis = alea.plusieurs(disponibles, 6);

  const lignes = choisis.map((m, i) =>
    ligne(
      i + 1,
      vignette(m.picto, m.mot, { taille: 54 }),
      h("div", { style: { marginLeft: "auto" } }, cases(4, { taille: 30 }))
    )
  );

  return {
    titre: "Tape les syllabes",
    consigne: "Dis le mot en tapant dans tes mains. Colorie une case par syllabe.",
    pourAdulte:
      "Tapez en même temps que lui, lentement. Corrigé : " +
      choisis.map((m) => `${m.mot} = ${m.syll}`).join(", ") + ".",
    objectifs: ["L1 16-17"],
    corps: lignes
  };
}
