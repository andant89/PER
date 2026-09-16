/* Colorier autant de cases qu'il y a d'objets — MSN 12.
   Construire une collection est plus exigeant que dénombrer : c'est
   l'exercice qui révèle vraiment où en est l'enfant. */

import { h } from "../lib/dom.js";
import { collection, ligne, cases } from "../lib/fiche.js";

const OBJETS = ["poisson", "pomme", "fleur", "etoile", "ballon", "papillon", "sapin", "coeur"];

export function creer(alea, { niveau = 1 } = {}) {
  const max = niveau === 1 ? 5 : niveau === 2 ? 8 : 10;
  const objets = alea.melange(OBJETS);

  const lignes = [];
  for (let i = 0; i < 5; i++) {
    const nombre = alea.entier(1, max);
    lignes.push(
      ligne(
        i + 1,
        collection(objets[i % objets.length], nombre, { taille: 38 }),
        h("div", { style: { marginLeft: "auto" } }, cases(max + 2, { taille: 32 }))
      )
    );
  }

  return {
    titre: "Colorie autant de cases",
    consigne: "Compte les dessins. Colorie le même nombre de cases à droite.",
    pourAdulte:
      "L'enfant doit s'arrêter au bon moment : c'est le cœur de l'objectif. S'il colorie toute la bande, " +
      "reprenez en faisant correspondre un dessin = une case, avec le doigt.",
    objectifs: ["MSN 12"],
    corps: lignes
  };
}
