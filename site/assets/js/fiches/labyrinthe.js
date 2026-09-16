/* Labyrinthe — repérage dans l'espace et contrôle du geste (MSN 11, L1 18). */

import { h } from "../lib/dom.js";
import { svg } from "../lib/fiche.js";
import { picto } from "../lib/pictos.js";

const DUOS = [
  ["lapin", "carotte", "le lapin", "la carotte"],
  ["chat", "souris", "le chat", "la souris"],
  ["oiseau", "arbre", "l'oiseau", "son arbre"],
  ["voiture", "maison", "la voiture", "la maison"]
];

export function creer(alea, { niveau = 1 } = {}) {
  const taille = niveau === 1 ? 6 : niveau === 2 ? 8 : 10;
  const duo = alea.un(DUOS);
  const [pictoDepart, pictoArrivee, nomDepart, nomArrivee] = duo;

  const murs = genererLabyrinthe(alea, taille);
  const pas = 100 / taille;
  let contenu = `<rect x="0" y="0" width="100" height="100" fill="none" stroke="none"/>`;

  for (let y = 0; y < taille; y++) {
    for (let x = 0; x < taille; x++) {
      const cellule = murs[y][x];
      const x0 = x * pas;
      const y0 = y * pas;
      // On ne dessine que le mur nord et le mur ouest : les voisins dessinent les autres.
      if (cellule.nord && !(x === 0 && y === 0)) contenu += `<path d="M${x0} ${y0}h${pas}"/>`;
      if (cellule.ouest) contenu += `<path d="M${x0} ${y0}v${pas}"/>`;
    }
  }
  // Bords extérieurs : l'entrée est en haut à gauche, la sortie en bas à droite.
  contenu += `<path d="M${pas} 0H100"/>`;
  contenu += `<path d="M0 0V100"/>`;
  contenu += `<path d="M0 100H${100 - pas}"/>`;
  contenu += `<path d="M100 0V100"/>`;

  const dessin = svg(100, 100, contenu, { classe: "dessin-labyrinthe" });

  return {
    titre: "Le chemin",
    consigne: `Aide ${nomDepart} à rejoindre ${nomArrivee}. Trace le chemin avec ton doigt, puis avec un crayon.`,
    pourAdulte:
      "Le doigt d'abord, le crayon ensuite : anticiper le trajet avant de tracer est justement ce qui se " +
      "construit à cet âge. Une impasse n'est pas une erreur, c'est l'exercice.",
    objectifs: ["MSN 11", "L1 18"],
    corps: [
      h(
        "div",
        { class: "labyrinthe-zone" },
        h("div", { class: "labyrinthe-etiquette" }, picto(pictoDepart, { taille: 40, trait: 4.5 }), h("span", {}, "départ ↓")),
        h("div", { class: "labyrinthe-grille" }, dessin),
        h("div", { class: "labyrinthe-etiquette labyrinthe-etiquette-arrivee" }, h("span", {}, "↑ arrivée"), picto(pictoArrivee, { taille: 40, trait: 4.5 }))
      )
    ]
  };
}

/** Labyrinthe parfait par parcours en profondeur (un seul chemin entre deux cases). */
function genererLabyrinthe(alea, taille) {
  const grille = Array.from({ length: taille }, () =>
    Array.from({ length: taille }, () => ({ nord: true, ouest: true, sud: true, est: true, vu: false }))
  );

  const pile = [[0, 0]];
  grille[0][0].vu = true;

  const OPPOSE = { nord: "sud", sud: "nord", est: "ouest", ouest: "est" };
  const DECALAGE = { nord: [0, -1], sud: [0, 1], ouest: [-1, 0], est: [1, 0] };

  while (pile.length) {
    const [x, y] = pile[pile.length - 1];
    const voisins = alea.melange(["nord", "sud", "est", "ouest"]).filter((direction) => {
      const [dx, dy] = DECALAGE[direction];
      const nx = x + dx;
      const ny = y + dy;
      return nx >= 0 && ny >= 0 && nx < taille && ny < taille && !grille[ny][nx].vu;
    });

    if (!voisins.length) {
      pile.pop();
      continue;
    }

    const direction = voisins[0];
    const [dx, dy] = DECALAGE[direction];
    const nx = x + dx;
    const ny = y + dy;
    grille[y][x][direction] = false;
    grille[ny][nx][OPPOSE[direction]] = false;
    grille[ny][nx].vu = true;
    pile.push([nx, ny]);
  }

  return grille;
}
