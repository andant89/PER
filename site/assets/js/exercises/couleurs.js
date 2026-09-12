/* Les couleurs — vocabulaire et perception (A 12, L1 13-14). */

import { h } from "../lib/dom.js";
import { hasard, melanger, echantillon } from "../lib/random.js";
import { COULEURS } from "../data/banque.js";

export const manches = 8;

export function jouer(ctx) {
  const forme = Math.random() < 0.5 ? "rond" : "carre";
  const nomForme = forme === "rond" ? "rond" : "carré";
  const proposees = echantillon(COULEURS, 5);
  const cible = hasard(proposees);

  ctx.consigne(`Touche le ${nomForme} ${cible.nom}.`);

  const ligne = h("div", { class: "choix" });
  for (const couleur of melanger(proposees)) {
    const bouton = h(
      "button",
      { type: "button", class: "pastille-choix", "aria-label": `${nomForme} ${couleur.nom}` },
      couleur[forme]
    );
    bouton.addEventListener("click", () => {
      if (bouton.disabled) return;
      if (couleur.id === cible.id) {
        bouton.classList.add("juste");
        ctx.juste(`Oui, c'est ${cible.nom} !`);
      } else {
        bouton.classList.add("faux");
        bouton.disabled = true;
        setTimeout(() => bouton.classList.replace("faux", "effacee"), 400);
        ctx.faux(`Non, celui-là est ${couleur.nom}.`);
      }
    });
    ligne.append(bouton);
  }

  ctx.scene.append(ligne);
}
