/* Plus ou moins — MSN 12 (comparaison de quantités). */

import { h } from "../lib/dom.js";
import { entier, hasard } from "../lib/random.js";
import { OBJETS } from "../data/banque.js";
import { objets } from "../lib/interactions.js";

export const manches = 8;

export function jouer(ctx) {
  const objet = hasard(OBJETS);
  const max = ctx.numeroManche <= 4 ? 6 : 10;
  let a = entier(1, max);
  let b = entier(1, max);
  while (a === b) b = entier(1, max);

  const chercheLePlus = Math.random() < 0.5;
  ctx.consigne(chercheLePlus ? "Touche le groupe où il y a le PLUS." : "Touche le groupe où il y a le MOINS.");

  const gagnant = chercheLePlus ? Math.max(a, b) : Math.min(a, b);

  function groupe(nombre) {
    const bloc = h(
      "button",
      {
        type: "button",
        class: "pastille-choix",
        style: { minWidth: "min(42vw, 230px)", minHeight: "150px", flexDirection: "column", padding: "1rem" },
        "aria-label": `groupe de ${nombre}`
      },
      objets(objet.emoji, nombre, { classe: "objets" })
    );
    bloc.querySelector(".objets").style.fontSize = "clamp(1.4rem, 1rem + 2vw, 2.2rem)";
    bloc.addEventListener("click", () => {
      if (bloc.disabled) return;
      if (nombre === gagnant) {
        bloc.classList.add("juste");
        ctx.juste(`Oui, ${gagnant} c'est ${chercheLePlus ? "plus" : "moins"} que ${nombre === a ? b : a}.`);
      } else {
        bloc.classList.add("faux");
        setTimeout(() => bloc.classList.remove("faux"), 500);
        ctx.faux("Regarde bien : compte les deux groupes.");
      }
    });
    return bloc;
  }

  ctx.scene.append(h("div", { class: "choix" }, groupe(a), groupe(b)));
}
