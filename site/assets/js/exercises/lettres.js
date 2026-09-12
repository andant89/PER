/* Chasse aux lettres — L1 16-17 / L1 18 (reconnaître les lettres majuscules). */

import { h } from "../lib/dom.js";
import { entier, hasard, melanger, echantillon } from "../lib/random.js";
import { LETTRES_FREQUENTES, ALPHABET, NOM_LETTRE } from "../data/banque.js";
import { profil } from "../lib/store.js";

export const manches = 7;

/** Les lettres du prénom de l'enfant passent en priorité : ce sont les siennes. */
function lettresPrioritaires() {
  const prenom = (profil().prenom || "").toUpperCase().normalize("NFD").replace(/[^A-Z]/g, "");
  const duPrenom = [...new Set(prenom.split(""))];
  return duPrenom.length ? melanger([...duPrenom, ...duPrenom, ...LETTRES_FREQUENTES]) : melanger(LETTRES_FREQUENTES);
}

export function jouer(ctx) {
  const cible = hasard(lettresPrioritaires());
  const combien = entier(2, 3);
  const intrus = echantillon(ALPHABET.filter((l) => l !== cible), 6);

  const cases = melanger([...Array.from({ length: combien }, () => cible), ...intrus]);
  let trouvees = 0;

  ctx.consigne(`Touche toutes les lettres ${NOM_LETTRE[cible] || cible}. Il y en a ${combien}.`);

  const grille = h("div", { class: "choix" });
  for (const lettre of cases) {
    const bouton = h(
      "button",
      { type: "button", class: "pastille-choix", "aria-label": `lettre ${NOM_LETTRE[lettre] || lettre}` },
      lettre
    );
    bouton.addEventListener("click", () => {
      if (bouton.disabled) return;
      if (lettre === cible) {
        bouton.disabled = true;
        bouton.classList.add("juste");
        trouvees++;
        if (trouvees === combien) ctx.juste(`Tu as trouvé les ${combien} lettres !`);
        else ctx.info(`${trouvees} sur ${combien}…`);
      } else {
        bouton.classList.add("faux");
        bouton.disabled = true;
        setTimeout(() => bouton.classList.replace("faux", "effacee"), 400);
        ctx.faux(`Non, ça c'est la lettre ${NOM_LETTRE[lettre] || lettre}.`);
      }
    });
    grille.append(bouton);
  }

  ctx.scene.append(
    h("div", { style: { fontSize: "clamp(3rem, 2rem + 5vw, 5rem)", fontWeight: "800", color: "var(--violet)" } }, cible),
    grille
  );
}
