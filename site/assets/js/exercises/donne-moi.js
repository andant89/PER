/* Donne-moi N objets — MSN 12 (construction d'une collection de cardinal donné). */

import { h, vider } from "../lib/dom.js";
import { entier, hasard } from "../lib/random.js";
import { OBJETS } from "../data/banque.js";

export const manches = 6;

export function jouer(ctx) {
  const objet = hasard(OBJETS);
  const cible = ctx.numeroManche <= 3 ? entier(2, 5) : entier(4, 9);
  const disponibles = Math.max(cible + 3, 10);
  let dansLePanier = 0;

  ctx.consigne(`Mets ${cible} ${cible > 1 ? objet.pluriel : objet.nom} dans le panier.`);

  const panier = h("div", { class: "panier", "aria-live": "polite", "aria-label": "Panier" });
  const compteur = h("p", { style: { margin: 0, fontWeight: "700", color: "var(--encre-douce)" } }, "Panier : 0");

  function majPanier() {
    vider(panier);
    for (let i = 0; i < dansLePanier; i++) panier.append(h("span", { "aria-hidden": "true" }, objet.emoji));
    compteur.textContent = `Panier : ${dansLePanier}`;
  }

  const reserve = h("div", { class: "objets" });
  const boutons = Array.from({ length: disponibles }, () => {
    const bouton = h(
      "button",
      { type: "button", class: "pastille-choix", style: { minWidth: "auto", minHeight: "auto", padding: ".3rem .5rem", borderWidth: "2px" }, "aria-label": objet.nom },
      objet.emoji
    );
    bouton.addEventListener("click", () => {
      if (bouton.disabled) return;
      bouton.disabled = true;
      bouton.classList.add("effacee");
      dansLePanier++;
      majPanier();
    });
    return bouton;
  });
  reserve.append(...boutons);

  const retirer = h(
    "button",
    { type: "button", class: "bouton bouton-fantome" },
    "↩︎ Enlever un objet"
  );
  retirer.addEventListener("click", () => {
    if (dansLePanier === 0) return;
    dansLePanier--;
    const rendu = boutons.filter((b) => b.disabled).pop();
    if (rendu) {
      rendu.disabled = false;
      rendu.classList.remove("effacee");
    }
    majPanier();
  });

  const valider = h("button", { type: "button", class: "bouton" }, "✅ J'ai fini !");
  valider.addEventListener("click", () => {
    if (dansLePanier === cible) {
      valider.disabled = true;
      boutons.forEach((b) => (b.disabled = true));
      retirer.disabled = true;
      ctx.juste(`Oui ! ${cible} ${cible > 1 ? objet.pluriel : objet.nom}.`);
    } else if (dansLePanier < cible) {
      ctx.faux("Il n'y en a pas assez. Ajoute-en encore.");
    } else {
      ctx.faux("Il y en a trop. Enlève-en.");
    }
  });

  majPanier();
  ctx.scene.append(
    panier,
    compteur,
    reserve,
    h("div", { class: "choix" }, retirer, valider)
  );
}
