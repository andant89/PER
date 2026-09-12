/* Les rimes — L1 16-17 (conscience phonologique : rime finale). */

import { h } from "../lib/dom.js";
import { hasard, melanger, echantillon } from "../lib/random.js";
import { MOTS } from "../data/banque.js";
import { choix, carteMot } from "../lib/interactions.js";

export const manches = 7;

const GROUPES = [...new Set(MOTS.filter((m) => m.rime).map((m) => m.rime))].filter(
  (rime) => MOTS.filter((m) => m.rime === rime).length >= 2
);

export function jouer(ctx) {
  const rime = hasard(GROUPES);
  const famille = melanger(MOTS.filter((m) => m.rime === rime));
  const [modele, bon] = famille;
  const intrus = echantillon(MOTS.filter((m) => m.rime !== rime), 2);
  const options = melanger([bon, ...intrus]);

  const liste = options.map((m) => m.mot).join(", ");
  ctx.consigne(`Quel mot rime avec « ${modele.mot} » ? ${liste} ?`);

  ctx.scene.append(
    h(
      "div",
      { style: { textAlign: "center", fontSize: "clamp(2.6rem, 2rem + 4vw, 4.5rem)" } },
      carteMot(modele)
    ),
    choix(ctx, options, {
      bonne: (m) => m.mot === bon.mot,
      classe: "pastille-large",
      rendu: (m) => carteMot(m),
      libelle: (m) => m.mot
    })
  );
}
