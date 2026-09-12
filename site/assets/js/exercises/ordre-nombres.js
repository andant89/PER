/* Range les nombres — MSN 12 (ordre et comptine numérique). */

import { h } from "../lib/dom.js";
import { entier, melanger } from "../lib/random.js";

export const manches = 6;

export function jouer(ctx) {
  const combien = ctx.numeroManche <= 3 ? 4 : 5;
  const depart = ctx.numeroManche <= 3 ? entier(1, 5) : entier(1, 10);
  const suite = Array.from({ length: combien }, (_, i) => depart + i);
  const attendu = [...suite];
  let position = 0;

  ctx.consigne("Touche les nombres du plus petit au plus grand.");

  const ligne = h("div", { class: "choix" });
  const rendus = h("div", { class: "objets", style: { fontSize: "clamp(1.6rem, 1rem + 2.5vw, 2.4rem)", minHeight: "1.6em" }, "aria-live": "polite" });

  const boutons = melanger(suite).map((valeur) => {
    const bouton = h("button", { type: "button", class: "pastille-choix" }, String(valeur));
    bouton.addEventListener("click", () => {
      if (bouton.disabled) return;
      if (valeur === attendu[position]) {
        bouton.disabled = true;
        bouton.classList.add("juste");
        rendus.append(h("span", {}, String(valeur)));
        position++;
        if (position === attendu.length) {
          ctx.juste("Tu as rangé tous les nombres !");
        } else {
          ctx.dire(String(valeur));
        }
      } else {
        bouton.classList.add("faux");
        setTimeout(() => bouton.classList.remove("faux"), 450);
        ctx.faux(`Cherche le nombre juste après ${position === 0 ? "le plus petit" : attendu[position - 1]}.`);
      }
    });
    return bouton;
  });

  ligne.append(...boutons);
  ctx.scene.append(rendus, ligne);
}
