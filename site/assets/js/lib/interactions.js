/* Briques d'interface réutilisées par les exercices. */

import { h } from "./dom.js";

/**
 * Rangée de gros boutons de réponse.
 * @param ctx contexte de jeu (fourni par jeu.js)
 * @param options tableau de valeurs
 * @param conf { bonne, rendu, classe, libelle }
 *   - bonne  : valeur attendue ou prédicat (valeur) => boolean
 *   - rendu  : (valeur) => contenu du bouton (texte ou Node), défaut : la valeur
 *   - libelle: (valeur) => texte lu par les lecteurs d'écran
 */
export function choix(ctx, options, { bonne, rendu, classe = "", libelle } = {}) {
  const estBonne = typeof bonne === "function" ? bonne : (v) => v === bonne;
  const conteneur = h("div", { class: "choix" });

  const boutons = options.map((valeur) => {
    const bouton = h(
      "button",
      {
        type: "button",
        class: `pastille-choix ${classe}`.trim(),
        "aria-label": libelle ? libelle(valeur) : undefined
      },
      rendu ? rendu(valeur) : String(valeur)
    );
    bouton.addEventListener("click", () => {
      if (bouton.disabled) return;
      if (estBonne(valeur)) {
        bouton.classList.add("juste");
        boutons.forEach((b) => (b.disabled = true));
        ctx.juste();
      } else {
        bouton.classList.add("faux");
        bouton.disabled = true;
        setTimeout(() => bouton.classList.replace("faux", "effacee"), 400);
        ctx.faux();
      }
    });
    return bouton;
  });

  conteneur.append(...boutons);
  return conteneur;
}

/** Groupe d'objets identiques à dénombrer. */
export function objets(emoji, nombre, { classe = "objets" } = {}) {
  return h(
    "div",
    { class: classe, role: "img", "aria-label": `${nombre} objets` },
    ...Array.from({ length: nombre }, () => h("span", { "aria-hidden": "true" }, emoji))
  );
}

/** Grand titre visuel au centre de la scène (mot, lettre, chiffre…). */
export function vedette(contenu, { taille = "clamp(3rem, 2rem + 6vw, 6rem)" } = {}) {
  return h("div", { style: { fontSize: taille, lineHeight: "1.1", textAlign: "center" } }, contenu);
}

/** Étiquette illustrée : emoji + mot, utilisée dans les jeux de langage. */
export function carteMot(mot, { avecTexte = true } = {}) {
  return h(
    "span",
    { style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: ".2rem" } },
    h("span", { style: { fontSize: "1em" }, "aria-hidden": "true" }, mot.emoji),
    avecTexte ? h("small", { style: { fontSize: ".38em", fontWeight: "700", color: "var(--encre-douce)" } }, mot.mot) : null
  );
}
