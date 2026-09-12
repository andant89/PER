/* Le son du début — L1 16-17 (conscience phonologique : phonème initial). */

import { h } from "../lib/dom.js";
import { hasard, melanger, echantillon } from "../lib/random.js";
import { MOTS, SON_ORAL } from "../data/banque.js";
import { choix, carteMot } from "../lib/interactions.js";

export const manches = 8;

const SONS_TRAVAILLES = [...new Set(MOTS.map((m) => m.son))].filter(
  (son) => MOTS.filter((m) => m.son === son).length >= 2
);

export function jouer(ctx) {
  const son = hasard(SONS_TRAVAILLES);
  const bon = hasard(MOTS.filter((m) => m.son === son));
  const intrus = echantillon(MOTS.filter((m) => m.son !== son), 2);
  const options = melanger([bon, ...intrus]);

  const prononce = SON_ORAL[son] || son;
  const liste = options.map((m) => m.mot).join(", ");
  ctx.consigne(`Quel mot commence par le son « ${prononce} » ? ${liste} ?`);

  ctx.scene.append(
    h("div", { style: { fontSize: "clamp(2rem, 1.4rem + 3vw, 3.2rem)", fontWeight: "800", color: "var(--violet)" } }, `« ${prononce} »`),
    choix(ctx, options, {
      bonne: (m) => m.mot === bon.mot,
      classe: "pastille-large",
      rendu: (m) => carteMot(m),
      libelle: (m) => m.mot
    })
  );
}
