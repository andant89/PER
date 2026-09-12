/* Suites logiques — MSN 15 / pensée créatrice (repérer et poursuivre un algorithme). */

import { h } from "../lib/dom.js";
import { hasard, melanger, echantillon } from "../lib/random.js";
import { choix } from "../lib/interactions.js";

export const manches = 7;

const SYMBOLES = ["🔴", "🔵", "🟡", "🟢", "🟣", "🟠", "🐱", "🐶", "⭐", "❤️", "🍎", "🍌"];

/** Modèles de suites, du plus simple au plus complexe. */
const MODELES = [
  { motif: [0, 1], longueur: 7, symboles: 2 },
  { motif: [0, 0, 1], longueur: 7, symboles: 2 },
  { motif: [0, 1, 1], longueur: 7, symboles: 2 },
  { motif: [0, 1, 2], longueur: 7, symboles: 3 },
  { motif: [0, 1, 0, 2], longueur: 8, symboles: 3 }
];

export function jouer(ctx) {
  const modele = ctx.numeroManche <= 3 ? hasard(MODELES.slice(0, 2)) : hasard(MODELES);
  const palette = echantillon(SYMBOLES, modele.symboles);
  const suite = Array.from({ length: modele.longueur }, (_, i) => palette[modele.motif[i % modele.motif.length]]);
  const reponse = suite[suite.length - 1];
  const visible = suite.slice(0, -1);

  ctx.consigne("Que vient-il après ? Continue la suite.");

  const bande = h(
    "div",
    { class: "suite-logique" },
    ...visible.map((s) => h("span", { "aria-hidden": "true" }, s)),
    h("span", { class: "suite-trou", "aria-label": "case à compléter" }, "?")
  );

  const options = melanger([...new Set([reponse, ...palette])]);

  ctx.scene.append(
    bande,
    choix(ctx, options, { bonne: reponse, libelle: () => "proposition" })
  );
}
