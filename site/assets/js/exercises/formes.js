/* Les formes — MSN 11 (reconnaître rond, carré, triangle, étoile, cœur). */

import { h } from "../lib/dom.js";
import { entier, hasard, melanger } from "../lib/random.js";
import { FORMES } from "../data/banque.js";

export const manches = 7;

export function jouer(ctx) {
  const cible = hasard(FORMES);
  const autres = FORMES.filter((f) => f.id !== cible.id);
  const combienCibles = entier(2, 4);
  const combienAutres = entier(4, 6);

  ctx.consigne(`Touche tous ${cible.pluriel}.`);

  const cases = [
    ...Array.from({ length: combienCibles }, () => ({ forme: cible, emoji: hasard(cible.variantes) })),
    ...Array.from({ length: combienAutres }, () => {
      const f = hasard(autres);
      return { forme: f, emoji: hasard(f.variantes) };
    })
  ];

  let trouvees = 0;
  const grille = h("div", { class: "choix" });

  for (const item of melanger(cases)) {
    const bouton = h(
      "button",
      { type: "button", class: "pastille-choix", "aria-label": item.forme.nom },
      item.emoji
    );
    bouton.addEventListener("click", () => {
      if (bouton.disabled) return;
      if (item.forme.id === cible.id) {
        bouton.disabled = true;
        bouton.classList.add("juste");
        trouvees++;
        if (trouvees === combienCibles) {
          ctx.juste(`Tu as trouvé ${combienCibles} ${combienCibles > 1 ? cible.nom + "s" : cible.nom} !`);
        } else {
          ctx.info(`${trouvees} sur ${combienCibles}… continue !`);
        }
      } else {
        bouton.classList.add("faux");
        setTimeout(() => bouton.classList.remove("faux"), 450);
        ctx.faux(`Ça, c'est ${item.forme.article}. Cherche ${cible.article}.`);
      }
    });
    grille.append(bouton);
  }

  ctx.scene.append(grille);
}
