/* Routeur minimal à base de fragment (#/...).
   Aucun build, aucune dépendance : le dossier `site/` est servi tel quel. */

import { remplacer } from "./lib/dom.js";
import { stopper } from "./lib/speech.js";

import * as accueil from "./pages/accueil.js";
import * as per from "./pages/per.js";
import * as objectifs from "./pages/objectifs.js";
import * as annees from "./pages/annees.js";
import * as annee from "./pages/annee.js";
import * as exercices from "./pages/exercices.js";
import * as jeu from "./pages/jeu.js";
import * as parents from "./pages/parents.js";
import * as fiches from "./pages/fiches.js";
import * as fiche from "./pages/fiche.js";
import * as cahier from "./pages/cahier.js";
import * as vaud from "./pages/vaud.js";

const ROUTES = [
  { motif: /^\/?$/, page: accueil, titre: "Accueil" },
  { motif: /^\/per$/, page: per, titre: "Le PER" },
  { motif: /^\/objectifs(?:\/(\d))?$/, page: objectifs, params: ["cycle"], titre: "Objectifs" },
  { motif: /^\/annees$/, page: annees, titre: "Par année" },
  { motif: /^\/annee\/([^/]+)$/, page: annee, params: ["id"], titre: "Année" },
  { motif: /^\/fiches$/, page: fiches, titre: "Fiches à imprimer" },
  { motif: /^\/fiche\/([^/]+)$/, page: fiche, params: ["id"], titre: "Fiche" },
  { motif: /^\/cahier$/, page: cahier, titre: "Cahier" },
  { motif: /^\/vaud$/, page: vaud, titre: "Canton de Vaud" },
  { motif: /^\/exercices$/, page: exercices, titre: "Jeux sur écran" },
  { motif: /^\/jeu\/([^/]+)$/, page: jeu, params: ["id"], titre: "Jeu" },
  { motif: /^\/parents$/, page: parents, titre: "Espace parents" }
];

const principal = document.querySelector("main");
const navigation = document.getElementById("nav-principal");
const bouton = document.querySelector(".nav-toggle");

let pagePrecedente = null;

function chemin() {
  const brut = location.hash.replace(/^#/, "");
  return brut || "/";
}

function router() {
  const route = chemin();
  stopper();

  // Laisse la page précédente faire le ménage (arrêt d'une partie en cours, minuteurs…)
  if (pagePrecedente && typeof pagePrecedente.quitter === "function") pagePrecedente.quitter();

  for (const { motif, page, params = [], titre } of ROUTES) {
    const correspondance = route.match(motif);
    if (!correspondance) continue;

    const donnees = {};
    params.forEach((nom, i) => (donnees[nom] = correspondance[i + 1]));

    try {
      remplacer(principal, page.rendre(donnees));
    } catch (err) {
      console.error("Erreur d'affichage", err);
      principal.innerHTML =
        '<div class="page"><h1>Une erreur est survenue</h1><p>Rechargez la page. Si le problème persiste, ouvrez la console du navigateur.</p></div>';
    }

    pagePrecedente = page;
    document.title = `${titre} — Mon PER`;
    majNavigation();
    window.scrollTo(0, 0);
    principal.focus({ preventScroll: true });
    fermerMenu();
    return;
  }

  principal.innerHTML =
    '<div class="page"><h1>Page introuvable</h1><p>Ce lien ne correspond à aucune page.</p><a class="bouton" href="#/">Retour à l\'accueil</a></div>';
  pagePrecedente = null;
}

function majNavigation() {
  const actuel = chemin();
  for (const lien of navigation.querySelectorAll("a")) {
    const cible = lien.getAttribute("href").replace(/^#/, "");
    const actif =
      cible === actuel ||
      (cible !== "/" && actuel.startsWith(cible)) ||
      (cible === "/annees" && actuel.startsWith("/annee/")) ||
      (cible === "/exercices" && actuel.startsWith("/jeu/")) ||
      (cible === "/fiches" && (actuel.startsWith("/fiche/") || actuel === "/cahier"));
    lien.classList.toggle("actif", actif);
  }
}

function fermerMenu() {
  navigation.classList.remove("ouvert");
  bouton.setAttribute("aria-expanded", "false");
}

bouton.addEventListener("click", () => {
  const ouvert = navigation.classList.toggle("ouvert");
  bouton.setAttribute("aria-expanded", String(ouvert));
});

window.addEventListener("hashchange", router);
document.addEventListener("per:maj", majNavigation);
router();
