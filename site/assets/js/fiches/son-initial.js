/* Colorier les images qui commencent par un son donné — L1 16-17.
   La conscience phonologique est le meilleur prédicteur de l'entrée en lecture. */

import { h } from "../lib/dom.js";
import { vignette } from "../lib/fiche.js";
import { MOTS, SON_ORAL, sonsUtilisables } from "../data/mots-imprimables.js";

export function creer(alea, { niveau = 1 } = {}) {
  const son = alea.un(sonsUtilisables(3));
  const bons = alea.plusieurs(MOTS.filter((m) => m.son === son), niveau === 1 ? 3 : 4);
  const total = niveau === 1 ? 9 : 12;
  const intrus = alea.plusieurs(MOTS.filter((m) => m.son !== son), total - bons.length);
  const melange = alea.melange([...bons, ...intrus]);

  const grille = h(
    "div",
    { class: "grille-vignettes", style: { "--colonnes": "3" } },
    ...melange.map((m) => vignette(m.picto, m.mot, { taille: 76, classe: "vignette-cadre" }))
  );

  return {
    titre: `Le son « ${SON_ORAL[son] || son} »`,
    consigne: `Colorie les dessins dont le nom commence par le son « ${SON_ORAL[son] || son} ». Il y en a ${bons.length}.`,
    pourAdulte:
      "Nommez chaque dessin à voix haute avant de commencer (l'enfant ne lit pas). Insistez sur le SON, pas sur " +
      `la lettre : « ${SON_ORAL[son] || son}… ${bons[0].mot} ». Réponses : ` +
      bons.map((m) => m.mot).join(", ") + ".",
    objectifs: ["L1 16-17"],
    corps: [grille]
  };
}
