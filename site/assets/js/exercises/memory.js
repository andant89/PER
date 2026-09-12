/* Memory — capacités transversales (mémoire, attention, stratégie). */

import { h } from "../lib/dom.js";
import { melanger, echantillon } from "../lib/random.js";
import { PAIRES_MEMORY } from "../data/banque.js";

export const manches = 3;

export function jouer(ctx) {
  const nbPaires = ctx.numeroManche === 1 ? 4 : ctx.numeroManche === 2 ? 5 : 6;
  const symboles = echantillon(PAIRES_MEMORY, nbPaires);
  const cartes = melanger([...symboles, ...symboles]);

  ctx.consigne("Retrouve les paires d'animaux identiques.");

  let retournees = [];
  let trouvees = 0;
  let blocage = false;

  const grille = h("div", { class: "grille-memory" });
  if (nbPaires > 4) grille.style.gridTemplateColumns = "repeat(4, minmax(0, 1fr))";

  cartes.forEach((symbole) => {
    const carte = h("button", { type: "button", class: "carte-memory", "aria-label": "carte cachée" }, "❓");
    carte.dataset.symbole = symbole;
    carte.addEventListener("click", () => {
      if (blocage || carte.classList.contains("retournee") || carte.classList.contains("trouvee")) return;
      carte.classList.add("retournee");
      carte.textContent = symbole;
      retournees.push(carte);

      if (retournees.length === 2) {
        const [a, b] = retournees;
        if (a.dataset.symbole === b.dataset.symbole) {
          retournees = [];
          trouvees++;
          [a, b].forEach((c) => {
            c.classList.remove("retournee");
            c.classList.add("trouvee");
          });
          if (trouvees === nbPaires) ctx.juste("Toutes les paires sont trouvées !");
          else ctx.info(`${trouvees} paire${trouvees > 1 ? "s" : ""} sur ${nbPaires}.`);
        } else {
          blocage = true;
          ctx.info("Retiens bien où elles sont…");
          setTimeout(() => {
            [a, b].forEach((c) => {
              c.classList.remove("retournee");
              c.textContent = "❓";
            });
            retournees = [];
            blocage = false;
          }, 900);
        }
      }
    });
    grille.append(carte);
  });

  ctx.scene.append(grille);
}
