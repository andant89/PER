/* Trace le chemin — L1 18 (graphisme, motricité fine, contrôle du geste).
   L'enfant suit un tracé avec le doigt ou la souris : tous les points de
   passage doivent être touchés dans l'ordre. */

import { h } from "../lib/dom.js";
import { hasard } from "../lib/random.js";

export const manches = 5;

export const PARCOURS = [
  {
    nom: "la ligne droite",
    consigne: "Suis la route avec ton doigt, de la voiture jusqu'à la maison.",
    depart: "🚗",
    arrivee: "🏠",
    points: (l, h2) => Array.from({ length: 12 }, (_, i) => [0.1 * l + (i / 11) * 0.8 * l, h2 / 2])
  },
  {
    nom: "les vagues",
    consigne: "Fais des vagues avec ton doigt jusqu'au poisson.",
    depart: "🌊",
    arrivee: "🐟",
    points: (l, h2) =>
      Array.from({ length: 24 }, (_, i) => {
        const t = i / 23;
        return [0.1 * l + t * 0.8 * l, h2 / 2 + Math.sin(t * Math.PI * 3) * h2 * 0.28];
      })
  },
  {
    nom: "la montagne",
    consigne: "Monte et descends la montagne avec ton doigt.",
    depart: "🥾",
    arrivee: "🚩",
    points: (l, h2) =>
      Array.from({ length: 20 }, (_, i) => {
        const t = i / 19;
        const zig = Math.abs(((t * 2) % 1) - 0.5) * 2;
        return [0.1 * l + t * 0.8 * l, h2 * 0.8 - zig * h2 * 0.55];
      })
  },
  {
    nom: "le rond",
    consigne: "Fais un beau rond avec ton doigt.",
    depart: "🖍️",
    arrivee: "⭐",
    points: (l, h2) =>
      Array.from({ length: 26 }, (_, i) => {
        const angle = -Math.PI / 2 + (i / 25) * Math.PI * 2;
        const r = Math.min(l, h2) * 0.34;
        return [l / 2 + Math.cos(angle) * r, h2 / 2 + Math.sin(angle) * r];
      })
  },
  {
    nom: "l'escalier",
    consigne: "Monte les marches avec ton doigt.",
    depart: "👟",
    arrivee: "🎁",
    points: (l, h2) => {
      const liste = [];
      const marches = 4;
      for (let m = 0; m < marches; m++) {
        const x0 = 0.1 * l + (m / marches) * 0.8 * l;
        const x1 = 0.1 * l + ((m + 0.5) / marches) * 0.8 * l;
        const y = h2 * 0.85 - (m / marches) * h2 * 0.7;
        liste.push([x0, y], [x1, y], [x1, y - h2 * 0.175]);
      }
      liste.push([0.9 * l, h2 * 0.15]);
      return liste;
    }
  }
];

export function jouer(ctx) {
  const parcours = hasard(PARCOURS);
  ctx.consigne(parcours.consigne);

  const largeur = 640;
  const hauteur = 300;
  const toile = h("canvas", { class: "piste", width: largeur, height: hauteur, "aria-label": `Tracé : ${parcours.nom}` });
  const dessin = toile.getContext("2d");
  const points = parcours.points(largeur, hauteur).map(([x, y]) => ({ x, y, atteint: false }));
  /* Tolérance du tracé, exprimée dans le repère interne du canevas.
     Sur un petit écran le canevas est réduit : on élargit la tolérance pour
     qu'un doigt d'enfant garde la même marge d'erreur à l'écran. */
  const rayon = () => 34 * Math.max(1, largeur / (toile.clientWidth || largeur));
  let suivant = 0;
  let trace = false;
  let termine = false;

  function redessiner() {
    dessin.clearRect(0, 0, largeur, hauteur);

    // Le chemin à suivre, en pointillés larges
    dessin.setLineDash([14, 14]);
    dessin.lineWidth = 26;
    dessin.lineCap = "round";
    dessin.lineJoin = "round";
    dessin.strokeStyle = "#E6E1F5";
    dessin.beginPath();
    points.forEach((p, i) => (i === 0 ? dessin.moveTo(p.x, p.y) : dessin.lineTo(p.x, p.y)));
    dessin.stroke();

    // La partie déjà parcourue
    dessin.setLineDash([]);
    dessin.strokeStyle = "#6C5CE7";
    dessin.lineWidth = 18;
    dessin.beginPath();
    const faits = points.filter((p) => p.atteint);
    faits.forEach((p, i) => (i === 0 ? dessin.moveTo(p.x, p.y) : dessin.lineTo(p.x, p.y)));
    if (faits.length > 1) dessin.stroke();

    // Le prochain point à toucher
    if (suivant < points.length) {
      const p = points[suivant];
      dessin.fillStyle = "#FF6B9D";
      dessin.beginPath();
      dessin.arc(p.x, p.y, 11, 0, Math.PI * 2);
      dessin.fill();
    }

    dessin.font = "34px system-ui, sans-serif";
    dessin.textAlign = "center";
    dessin.textBaseline = "middle";
    dessin.fillText(parcours.depart, points[0].x, points[0].y - 42);
    dessin.fillText(parcours.arrivee, points[points.length - 1].x, points[points.length - 1].y - 42);
  }

  function coordonnees(evenement) {
    const boite = toile.getBoundingClientRect();
    return {
      x: ((evenement.clientX - boite.left) / boite.width) * largeur,
      y: ((evenement.clientY - boite.top) / boite.height) * hauteur
    };
  }

  function avancer(position) {
    if (termine) return;
    while (suivant < points.length) {
      const cible = points[suivant];
      if (Math.hypot(position.x - cible.x, position.y - cible.y) > rayon()) break;
      cible.atteint = true;
      suivant++;
    }
    redessiner();
    if (suivant >= points.length) {
      termine = true;
      ctx.juste("Superbe tracé !");
    }
  }

  toile.addEventListener("pointerdown", (e) => {
    trace = true;
    toile.setPointerCapture(e.pointerId);
    avancer(coordonnees(e));
  });
  toile.addEventListener("pointermove", (e) => {
    if (!trace) return;
    e.preventDefault();
    avancer(coordonnees(e));
  });
  toile.addEventListener("pointerup", () => {
    trace = false;
    if (!termine && suivant > 0 && suivant < points.length) {
      ctx.info("Continue depuis le point rose.");
    }
  });

  const recommencer = h("button", { type: "button", class: "bouton bouton-fantome" }, "↺ Recommencer le tracé");
  recommencer.addEventListener("click", () => {
    if (termine) return;
    points.forEach((p) => (p.atteint = false));
    suivant = 0;
    redessiner();
  });

  redessiner();
  ctx.scene.append(toile, recommencer);
}
