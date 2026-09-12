/* Où est l'animal ? — MSN 11 (se repérer dans l'espace : sur, sous, dans, à côté). */

import { h } from "../lib/dom.js";
import { hasard, melanger } from "../lib/random.js";
import { choix } from "../lib/interactions.js";

export const manches = 7;

const ANIMAUX = [
  { emoji: "🐱", nom: "le chat" },
  { emoji: "🐶", nom: "le chien" },
  { emoji: "🐭", nom: "la souris" },
  { emoji: "🐰", nom: "le lapin" },
  { emoji: "🐸", nom: "la grenouille" },
  { emoji: "🐦", nom: "l'oiseau" }
];
const SUPPORTS = [
  { emoji: "📦", nom: "la boîte" },
  { emoji: "🪑", nom: "la chaise" },
  { emoji: "🛏️", nom: "le lit" },
  { emoji: "🚗", nom: "la voiture" }
];

const POSITIONS = [
  { id: "sur", libelle: "sur" },
  { id: "sous", libelle: "sous" },
  { id: "dans", libelle: "dans" },
  { id: "a-cote", libelle: "à côté de" }
];

function scene(animal, support, position) {
  const cellule = (contenu) =>
    h("div", { style: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "1.3em" } }, contenu);

  const grille = h("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr 1fr",
      fontSize: "clamp(2.4rem, 1.6rem + 4vw, 4rem)",
      gap: ".2rem",
      width: "min(100%, 360px)"
    },
    role: "img",
    "aria-label": `${animal.nom} ${position.libelle} ${support.nom}`
  });

  const vides = () => cellule("");
  const cases = [vides(), vides(), vides(), vides(), vides(), vides(), vides(), vides(), vides()];

  if (position.id === "sur") {
    cases[1] = cellule(animal.emoji);
    cases[4] = cellule(support.emoji);
  } else if (position.id === "sous") {
    cases[4] = cellule(support.emoji);
    cases[7] = cellule(animal.emoji);
  } else if (position.id === "dans") {
    cases[4] = cellule(
      h("span", { style: { position: "relative", display: "inline-block" } },
        support.emoji,
        h("span", { style: { position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".55em" } }, animal.emoji))
    );
  } else {
    cases[4] = cellule(support.emoji);
    cases[5] = cellule(animal.emoji);
  }

  grille.append(...cases);
  return grille;
}

export function jouer(ctx) {
  const animal = hasard(ANIMAUX);
  const support = hasard(SUPPORTS);
  const position = hasard(POSITIONS);

  ctx.consigne(`Où est ${animal.nom} ?`);

  ctx.scene.append(
    scene(animal, support, position),
    choix(ctx, melanger(POSITIONS), {
      bonne: (p) => p.id === position.id,
      classe: "pastille-mot pastille-large",
      rendu: (p) => `${p.libelle} ${support.nom}`,
      libelle: (p) => `${p.libelle} ${support.nom}`
    })
  );
}
