/* Compter les objets — MSN 12 (dénombrement, association quantité ↔ chiffre). */

import { h } from "../lib/dom.js";
import { entier, hasard, melanger } from "../lib/random.js";
import { choix, objets } from "../lib/interactions.js";
import { OBJETS } from "../data/banque.js";

export const manches = 8;

/** La difficulté monte doucement au fil de la partie. */
function quantite(manche) {
  if (manche <= 3) return entier(1, 5);
  if (manche <= 6) return entier(3, 8);
  return entier(5, 10);
}

function propositions(bonne) {
  const ensemble = new Set([bonne]);
  const ecarts = melanger([1, 2, -1, -2, 3, -3]);
  for (const ecart of ecarts) {
    if (ensemble.size >= 3) break;
    const candidat = bonne + ecart;
    if (candidat >= 1 && candidat <= 12) ensemble.add(candidat);
  }
  return melanger([...ensemble]);
}

export function jouer(ctx) {
  const objet = hasard(OBJETS);
  const nombre = quantite(ctx.numeroManche);

  ctx.consigne(`Combien y a-t-il de ${objet.pluriel} ?`);
  ctx.scene.append(
    objets(objet.emoji, nombre),
    choix(ctx, propositions(nombre), {
      bonne: nombre,
      libelle: (v) => `${v}`
    }),
    h("p", { style: { margin: 0, color: "var(--encre-douce)", fontSize: ".95rem" } },
      "Astuce : touche chaque objet avec le doigt en comptant.")
  );
}
