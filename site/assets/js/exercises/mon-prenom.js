/* Mon prénom — L1 18 (reconnaître et reconstituer les lettres de son prénom).
   Nécessite un prénom renseigné dans l'Espace parents. */

import { h } from "../lib/dom.js";
import { melanger, echantillon } from "../lib/random.js";
import { ALPHABET, NOM_LETTRE } from "../data/banque.js";
import { profil } from "../lib/store.js";

export const manches = 5;

export function motCible() {
  const brut = (profil().prenom || "").trim();
  return brut
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^A-Z]/g, "")
    .slice(0, 12);
}

export function jouer(ctx) {
  const prenom = motCible();
  if (!prenom) {
    ctx.scene.append(h("p", {}, "Ajoute d'abord un prénom dans l'Espace parents."));
    return;
  }

  const lettres = prenom.split("");
  let position = 0;

  ctx.consigne(
    ctx.numeroManche === 1
      ? `Écris ton prénom : ${prenom.split("").map((l) => NOM_LETTRE[l] || l).join(", ")}.`
      : "Remets les lettres de ton prénom dans le bon ordre."
  );

  const cases = h("div", { class: "lettres-prenom", "aria-live": "polite" });
  const emplacements = lettres.map(() => h("span", { class: "case-lettre" }, ""));
  cases.append(...emplacements);

  /* Quelques lettres pièges en plus, sauf pour les prénoms très courts. */
  const pieges = lettres.length <= 4 ? echantillon(ALPHABET.filter((l) => !lettres.includes(l)), 2) : [];
  const reserve = h("div", { class: "choix" });

  const boutons = melanger([...lettres, ...pieges]).map((lettre) => {
    const bouton = h(
      "button",
      { type: "button", class: "pastille-choix", "aria-label": `lettre ${NOM_LETTRE[lettre] || lettre}` },
      lettre
    );
    bouton.addEventListener("click", () => {
      if (bouton.disabled) return;
      if (lettre === lettres[position]) {
        bouton.disabled = true;
        bouton.classList.add("juste");
        emplacements[position].textContent = lettre;
        emplacements[position].classList.add("remplie");
        position++;
        if (position === lettres.length) ctx.juste(`Bravo, tu as écrit ${prenom} !`);
        else ctx.dire(NOM_LETTRE[lettre] || lettre);
      } else {
        bouton.classList.add("faux");
        setTimeout(() => bouton.classList.remove("faux"), 450);
        ctx.faux(`Cherche la lettre ${NOM_LETTRE[lettres[position]] || lettres[position]}.`);
      }
    });
    return bouton;
  });

  reserve.append(...boutons);
  ctx.scene.append(cases, reserve);
}
