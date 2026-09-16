/* Barrer l'intrus — MSN 18 / MSN 16 (classer selon une propriété). */

import { h } from "../lib/dom.js";
import { ligne, vignette } from "../lib/fiche.js";

const CATEGORIES = [
  { nom: "animaux", membres: ["chat", "lapin", "souris", "poisson", "oiseau", "tortue", "papillon", "coccinelle", "escargot"] },
  { nom: "fruits", membres: ["pomme", "banane", "citron", "cerise", "fraise", "ananas"] },
  { nom: "véhicules", membres: ["voiture", "velo", "moto", "train", "avion", "bateau"] },
  { nom: "nature", membres: ["arbre", "fleur", "sapin", "soleil", "lune", "nuage", "montagne"] },
  { nom: "objets", membres: ["cle", "de", "tasse", "livre", "echelle", "rateau", "fourchette", "parapluie", "robot"] }
];

export function creer(alea) {
  const familles = alea.melange(CATEGORIES);
  const lignes = [];
  const reponses = [];

  for (let i = 0; i < 5; i++) {
    const famille = familles[i % familles.length];
    const autre = alea.un(CATEGORIES.filter((c) => c.nom !== famille.nom));
    const trois = alea.plusieurs(famille.membres, 3);
    const intrus = alea.un(autre.membres);
    const contenu = alea.melange([...trois.map((m) => ({ id: m, intrus: false })), { id: intrus, intrus: true }]);
    reponses.push(`${i + 1}. ${intrus} (les autres sont des ${famille.nom})`);

    lignes.push(
      ligne(
        i + 1,
        h(
          "div",
          { class: "rangee-vignettes" },
          ...contenu.map((item) => vignette(item.id, "", { taille: 52, avecMot: false, classe: "vignette-cadre" }))
        )
      )
    );
  }

  return {
    titre: "Cherche l'intrus",
    consigne: "Dans chaque ligne, barre le dessin qui ne va pas avec les autres.",
    pourAdulte:
      "Demandez toujours « pourquoi ? ». Justifier vaut mieux que trouver : une réponse inattendue mais " +
      "bien argumentée est une bonne réponse. Corrigé : " + reponses.join(" ; ") + ".",
    objectifs: ["MSN 18", "MSN 16"],
    corps: lignes
  };
}
