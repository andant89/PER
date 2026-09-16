/* Graphisme : repasser sur les pointillés — L1 18.
   C'est l'exercice le plus directement utile en 1P : le contrôle du geste
   précède l'écriture. Les tracés vont toujours de la gauche vers la droite. */

import { h } from "../lib/dom.js";
import { svg } from "../lib/fiche.js";

const L = 320; // largeur du tracé, en unités SVG
const H = 34;  // hauteur : c'est elle qui fixe la taille réelle des motifs

const TRACES = {
  verticaux: {
    nom: "les traits debout",
    conseil: "de haut en bas, sans lever le crayon",
    chemin: () => suite(16, (x) => `M${x} 4v26`)
  },
  horizontaux: {
    nom: "les traits couchés",
    conseil: "de gauche à droite",
    chemin: () => [8, 17, 26].map((y) => `M8 ${y}h${L - 20}`).join("")
  },
  zigzag: {
    nom: "les montagnes",
    conseil: "en pointe, sans arrondir",
    chemin: () => {
      let d = "M8 30";
      for (let x = 8; x < L - 28; x += 24) d += "l12-24 12 24";
      return d;
    }
  },
  ponts: {
    nom: "les ponts",
    conseil: "on monte, on tourne, on redescend",
    chemin: () => {
      let d = "M8 30";
      for (let x = 8; x < L - 28; x += 24) d += "a12 12 0 0 1 24 0";
      return d;
    }
  },
  vagues: {
    nom: "les vagues",
    conseil: "sans s'arrêter, comme la mer",
    chemin: () => {
      let d = "M8 17";
      for (let x = 8; x < L - 28; x += 24) d += "q6-13 12 0 q6 13 12 0";
      return d;
    }
  },
  boucles: {
    nom: "les boucles",
    conseil: "la boucle du « l », on tourne vers la gauche",
    chemin: () => {
      let d = "";
      for (let x = 10; x < L - 32; x += 24) {
        d += `M${x} 30C${x} 2 ${x + 26} 4 ${x + 17} 21C${x + 12} 31 ${x + 24} 32 ${x + 24} 30`;
      }
      return d;
    }
  },
  ronds: {
    nom: "les ronds",
    conseil: "on part en haut et on tourne vers la gauche",
    chemin: () => suite(26, (x) => `M${x + 11} 17a11 11 0 1 1-0.1 0`)
  },
  creneaux: {
    nom: "les marches",
    conseil: "on s'arrête à chaque angle",
    chemin: () => {
      let d = "M8 30";
      for (let x = 8; x < L - 28; x += 24) d += "v-20h12v20h12";
      return d;
    }
  }
};

function suite(pas, fabrique) {
  let d = "";
  for (let x = 10; x < L - 12; x += pas) d += fabrique(x);
  return d;
}

export function creer(alea) {
  const cles = Object.keys(TRACES);
  // Quatre tracés au maximum : au-delà, la main se fatigue et la page déborde.
  const choisis = alea.plusieurs(cles, 4);

  const lignes = choisis.map((cle) => {
    const trace = TRACES[cle];
    const d = trace.chemin();
    return h(
      "div",
      { class: "ligne-graphisme" },
      h(
        "div",
        { class: "graphisme-titre" },
        h("strong", {}, trace.nom),
        h("small", {}, trace.conseil)
      ),
      h(
        "div",
        { class: "graphisme-piste" },
        svg(
          L,
          H,
          `<path d="${d}" class="trace-pointille"/><circle cx="8" cy="30" r="2.6" fill="currentColor" stroke="none"/>`,
          { classe: "piste-graphisme" }
        ),
        svg(L, H, `<path d="${d}" class="trace-pointille" stroke-dasharray="2 6"/>`, { classe: "piste-graphisme" })
      )
    );
  });

  return {
    titre: "Repasse sur les pointillés",
    consigne: "Suis les pointillés avec ton doigt, puis avec le crayon. Pars toujours du gros point.",
    pourAdulte:
      "Vérifiez la tenue du crayon (pouce et index, le crayon posé sur le majeur) et que l'enfant tourne la " +
      "feuille s'il en a besoin. Cinq minutes suffisent : la main se fatigue vite.",
    objectifs: ["L1 18", "CM 12"],
    corps: lignes
  };
}
