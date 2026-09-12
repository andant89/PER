/* Trier et classer — MSN 18 / MSN 16 (catégoriser selon une propriété). */

import { h } from "../lib/dom.js";
import { hasard, melanger } from "../lib/random.js";
import { CATEGORIES } from "../data/banque.js";

export const manches = 8;

export function jouer(ctx) {
  const categorie = hasard(CATEGORIES);
  const boite = hasard(categorie.boites);
  const element = hasard(boite.elements);

  ctx.consigne(categorie.question);

  const zone = h("div", { class: "zone-tri" });
  for (const candidate of melanger(categorie.boites)) {
    const cible = h(
      "button",
      { type: "button", class: "boite-tri", style: { cursor: "pointer", font: "inherit" } },
      h("div", { style: { fontSize: "2rem" }, "aria-hidden": "true" }, candidate.emoji),
      h("h4", {}, candidate.nom)
    );
    cible.addEventListener("click", () => {
      if (cible.disabled) return;
      if (candidate.nom === boite.nom) {
        cible.style.borderColor = "var(--vert)";
        cible.style.background = "var(--vert-clair)";
        ctx.juste(`Oui, ${candidate.nom.toLowerCase()} !`);
      } else {
        cible.classList.add("faux");
        setTimeout(() => cible.classList.remove("faux"), 450);
        ctx.faux("Réfléchis encore.");
      }
    });
    zone.append(cible);
  }

  ctx.scene.append(
    h("div", { style: { fontSize: "clamp(3.5rem, 2.5rem + 6vw, 6rem)" }, "aria-label": "élément à ranger" }, element),
    zone
  );
}
