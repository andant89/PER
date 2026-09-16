/* Points à relier de 1 à N — MSN 12 (ordre des nombres) + graphisme. */

import { h } from "../lib/dom.js";
import { svg } from "../lib/fiche.js";

const FIGURES = {
  etoile: {
    nom: "une étoile",
    points: [[50, 10], [59, 37], [88, 38], [65, 55], [73, 82], [50, 66], [27, 82], [35, 55], [12, 38], [41, 37]]
  },
  maison: {
    nom: "une maison",
    points: [[18, 92], [18, 48], [8, 48], [50, 12], [92, 48], [82, 48], [82, 92], [62, 92], [62, 66], [38, 66], [38, 92]]
  },
  poisson: {
    nom: "un poisson",
    points: [[10, 50], [30, 26], [58, 24], [74, 36], [94, 16], [88, 50], [94, 84], [74, 64], [58, 76], [30, 74]]
  },
  sapin: {
    nom: "un sapin",
    points: [[50, 6], [37, 32], [45, 32], [30, 56], [40, 56], [20, 82], [43, 82], [43, 94], [57, 94], [57, 82], [80, 82], [60, 56], [70, 56], [55, 32], [63, 32]]
  }
};

export function creer(alea) {
  const cle = alea.un(Object.keys(FIGURES));
  const figure = FIGURES[cle];
  const points = figure.points;

  const centreX = points.reduce((s, p) => s + p[0], 0) / points.length;
  const centreY = points.reduce((s, p) => s + p[1], 0) / points.length;

  let contenu = "";
  points.forEach(([x, y], i) => {
    const dx = x - centreX;
    const dy = y - centreY;
    const norme = Math.hypot(dx, dy) || 1;
    const lx = x + (dx / norme) * 7;
    const ly = y + (dy / norme) * 7;
    contenu += `<circle cx="${x}" cy="${y}" r="1.3" fill="currentColor" stroke="none"/>`;
    contenu += `<text x="${lx}" y="${ly}" font-size="5" font-weight="700" text-anchor="middle" dominant-baseline="middle" fill="currentColor" stroke="none">${i + 1}</text>`;
  });

  const dessin = svg(100, 100, contenu, { classe: "dessin-points" });

  return {
    titre: "Relie les points",
    consigne: `Relie les points dans l'ordre, de 1 jusqu'à ${points.length}. Tu découvriras ${figure.nom} !`,
    pourAdulte:
      "Deux apprentissages en même temps : l'ordre des nombres et le contrôle du geste. Faites nommer chaque " +
      "nombre à voix haute avant de tracer. L'enfant peut ensuite colorier son dessin.",
    objectifs: ["MSN 12", "L1 18"],
    corps: [h("div", { class: "zone-dessin" }, dessin)]
  };
}
