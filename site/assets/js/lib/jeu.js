/* Moteur commun à tous les exercices.
   Un exercice décrit seulement une manche ; la barre de progression, la voix,
   les étoiles, l'écran de fin et l'enregistrement sont gérés ici. */

import { h, remplacer, vider } from "./dom.js";
import { dire, sons, stopper } from "./speech.js";
import { enregistrerPartie, profil } from "./store.js";

const PAUSE_REUSSITE = 950;

const ENCOURAGEMENTS = ["Bravo !", "Super !", "Bien joué !", "Oui, c'est juste !", "Parfait !", "Tu as trouvé !"];
const RELANCES = ["Essaie encore.", "Presque ! Regarde bien.", "Non, réessaie.", "Pas tout à fait."];

function etoilesPour(reussitesDuPremierCoup, total) {
  const taux = total ? reussitesDuPremierCoup / total : 0;
  if (taux >= 0.85) return 3;
  if (taux >= 0.6) return 2;
  if (taux > 0) return 1;
  return 0;
}

/**
 * @param {HTMLElement} racine conteneur de page
 * @param {object} def définition de l'exercice
 *   { id, titre, emoji, couleur, manches, objectifs:[codes], jouer(ctx): Promise<void> }
 */
export function demarrerJeu(racine, def) {
  const total = def.manches || 8;
  let manche = 0;
  let reussitesDuPremierCoup = 0;
  let essaisManche = 0;
  let arrete = false;

  const consigneTexte = h("p", {}, "…");
  const boutonRepeter = h(
    "button",
    { class: "icone-bouton", type: "button", title: "Répéter la consigne", "aria-label": "Répéter la consigne" },
    "🔊"
  );
  const consigne = h("div", { class: "consigne" }, boutonRepeter, consigneTexte);

  const scene = h("div", { class: "scene" });
  const retour = h("div", { class: "retour-jeu", role: "status", "aria-live": "polite" });
  const pointsProgres = h("div", { class: "jeu-progres", "aria-hidden": "true" });

  const barre = h(
    "div",
    { class: "jeu-barre" },
    h("a", { class: "icone-bouton", href: "#/exercices", title: "Retour aux exercices", "aria-label": "Retour aux exercices" }, "←"),
    h("h1", {}, `${def.emoji} ${def.titre}`),
    h("div", { class: "pousse" }, pointsProgres)
  );

  const conteneur = h("div", { class: "jeu" }, barre, consigne, scene, retour);
  remplacer(racine, conteneur);

  let dernierTexteConsigne = "";
  boutonRepeter.addEventListener("click", () => dire(dernierTexteConsigne, { force: true }));

  function majProgres() {
    remplacer(
      pointsProgres,
      ...Array.from({ length: total }, (_, i) =>
        h("span", { class: i < manche - 1 ? "faite" : i === manche - 1 ? "courante" : "" })
      )
    );
  }

  const ctx = {
    scene,
    get numeroManche() { return manche; },
    get totalManches() { return total; },
    prenom: profil().prenom,

    /** Affiche et lit la consigne à voix haute. */
    consigne(texte, { parle = true } = {}) {
      dernierTexteConsigne = texte;
      consigneTexte.textContent = texte;
      if (parle) dire(texte);
    },

    dire(texte) { dire(texte); },

    /** À appeler sur une bonne réponse : termine la manche. */
    juste(message) {
      if (arrete) return;
      if (essaisManche === 0) reussitesDuPremierCoup++;
      sons.reussite();
      const texte = message || ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)];
      retour.className = "retour-jeu ok";
      retour.textContent = `🎉 ${texte}`;
      dire(texte);
      ctx._resoudre();
    },

    /** À appeler sur une erreur : la manche continue, sans pénalité. */
    faux(message) {
      if (arrete) return;
      essaisManche++;
      sons.erreur();
      const texte = message || RELANCES[Math.floor(Math.random() * RELANCES.length)];
      retour.className = "retour-jeu ko";
      retour.textContent = texte;
      dire(texte);
    },

    /** Message libre sans effet sur le score. */
    info(texte) {
      retour.className = "retour-jeu";
      retour.textContent = texte;
    },

    _resoudre: () => {}
  };

  async function boucle() {
    for (manche = 1; manche <= total && !arrete; manche++) {
      essaisManche = 0;
      retour.textContent = "";
      retour.className = "retour-jeu";
      vider(scene);
      scene.classList.remove("anim-entree");
      void scene.offsetWidth;
      scene.classList.add("anim-entree");
      majProgres();

      await new Promise((resoudre) => {
        ctx._resoudre = () => setTimeout(resoudre, PAUSE_REUSSITE);
        try {
          def.jouer(ctx);
        } catch (err) {
          console.error("Erreur dans l'exercice", def.id, err);
          resoudre();
        }
      });
    }
    if (!arrete) finir();
  }

  function finir() {
    const etoiles = etoilesPour(reussitesDuPremierCoup, total);
    enregistrerPartie(def.id, { etoiles, score: reussitesDuPremierCoup, total });
    sons.fanfare();
    const prenom = profil().prenom;
    const felicitations = prenom ? `Bravo ${prenom} !` : "Bravo !";
    dire(`${felicitations} Tu as gagné ${etoiles} étoile${etoiles > 1 ? "s" : ""}.`);

    remplacer(
      scene,
      h(
        "div",
        { class: "fin-partie anim-entree" },
        h("div", { class: "grosses-etoiles" }, "⭐".repeat(etoiles) + "☆".repeat(3 - etoiles)),
        h("h2", {}, felicitations),
        h("p", {}, `${reussitesDuPremierCoup} bonne${reussitesDuPremierCoup > 1 ? "s" : ""} réponse${reussitesDuPremierCoup > 1 ? "s" : ""} du premier coup sur ${total}.`),
        h(
          "div",
          { class: "actions" },
          h("button", { class: "bouton", type: "button", onclick: () => location.reload() }, "🔁 Rejouer"),
          h("a", { class: "bouton bouton-secondaire", href: "#/exercices" }, "Autres jeux")
        )
      )
    );
    consigneTexte.textContent = "Partie terminée !";
    retour.textContent = "";
    remplacer(pointsProgres, ...Array.from({ length: total }, () => h("span", { class: "faite" })));
  }

  boucle();

  return {
    arreter() {
      arrete = true;
      stopper();
    }
  };
}
