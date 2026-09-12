/* Compte les syllabes — L1 16-17 (segmentation syllabique : on tape dans les mains). */

import { h } from "../lib/dom.js";
import { hasard, melanger } from "../lib/random.js";
import { MOTS } from "../data/banque.js";
import { choix, carteMot } from "../lib/interactions.js";

export const manches = 8;

export function jouer(ctx) {
  const maxSyllabes = ctx.numeroManche <= 4 ? 2 : 4;
  const candidats = MOTS.filter((m) => m.syll <= maxSyllabes);
  const mot = hasard(candidats);

  ctx.consigne(`Tape dans tes mains : ${mot.mot}. Combien de syllabes ?`);

  const options = melanger([...new Set([mot.syll, Math.max(1, mot.syll - 1), Math.min(4, mot.syll + 1)])]);

  ctx.scene.append(
    h("div", { style: { textAlign: "center", fontSize: "clamp(3rem, 2rem + 5vw, 5rem)" } }, carteMot(mot)),
    choix(ctx, options, { bonne: mot.syll, libelle: (v) => `${v} syllabes` })
  );
}
