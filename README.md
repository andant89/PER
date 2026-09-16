# Mon PER — fiches à imprimer pour la 1P, et le Plan d'études romand expliqué

Application web familiale, sans compte ni serveur applicatif, à héberger sur votre Docker.

Son cœur : **un générateur de fiches d'exercices à imprimer** pour accompagner un enfant de
1re année (1P) sur papier — crayon, ciseaux, table de cuisine. L'écran est l'outil du parent,
pas celui de l'enfant.

Elle contient :

- **16 fiches A4 à imprimer** pour la 1P, régénérées différemment à chaque fois ;
- **les explications du PER** — organisation, cycles, lecture d'un objectif ;
- **les objectifs** — 5 domaines, formation générale et capacités transversales, pour les 3 cycles ;
- **les objectifs par année** — repères indicatifs pour les 11 années (1P → 11P) ;
- **une page canton de Vaud** — évaluation, orientation, services de soutien ;
- **16 jeux sur écran**, en complément assumé et secondaire.

---

## Démarrage rapide

```bash
git clone <votre-dépôt> mon-per
cd mon-per
docker compose up -d --build
```

L'application est ensuite disponible sur <http://localhost:8080>.

Pour changer le port, modifiez `docker-compose.yml` :

```yaml
ports:
  - "3000:80"   # 3000 = port sur votre machine
```

### Sans docker compose

```bash
docker build -t mon-per .
docker run -d --name mon-per -p 8080:80 --restart unless-stopped mon-per
```

### Derrière un reverse proxy (Traefik, Nginx Proxy Manager, Caddy…)

Le conteneur écoute sur le port **80** et ne demande aucune configuration particulière :
pas de websocket, pas d'API, pas de chemin de base à réécrire.

---

## Imprimer les fiches

1. Ouvrir **Fiches à imprimer**, régler le prénom et la difficulté (une fois pour toutes).
2. Ouvrir une fiche → **Imprimer**, ou cocher plusieurs fiches et ouvrir le **cahier** pour
   tout imprimer d'un coup, une fiche par page.
3. Dans la fenêtre d'impression du navigateur :
   - format **A4**, orientation portrait ;
   - échelle **100 %** (surtout pas « ajuster à la page ») ;
   - **décocher** les en-têtes et pieds de page du navigateur ;
   - « Enregistrer en PDF » fonctionne aussi bien que l'impression directe.

Chaque fiche est en **noir et blanc pur** : aucune couleur n'est nécessaire pour la comprendre,
et les dessins sont faits pour être coloriés par l'enfant.

Le bouton **« Autre variante »** régénère la fiche : mêmes objectifs, contenus différents.
Le numéro imprimé en bas à droite est la graine du tirage — deux fiches portant le même numéro
sont identiques.

---

## Les 16 fiches

| Fiche | Objectif PER | Ce qui est travaillé |
|---|---|---|
| Combien y en a-t-il ? | MSN 12 | Dénombrer et reconnaître le chiffre |
| Colorie autant de cases | MSN 12 | Construire une collection — s'arrêter au bon nombre |
| Relie au bon chiffre | MSN 12 | Associer quantité et chiffre |
| Le plus / le moins | MSN 12 | Comparer deux quantités |
| Le code des formes | MSN 11 | Rond, carré, triangle, étoile, quelles que soient taille et orientation |
| Continue la suite | MSN 15 | Repérer et poursuivre un algorithme |
| Cherche l'intrus | MSN 18 / 16 | Classer et justifier |
| Relie les points | MSN 12 + L1 18 | Ordre des nombres et geste |
| Le chemin (labyrinthe) | MSN 11 + L1 18 | Anticiper un trajet |
| Repasse sur les pointillés | L1 18 | Graphisme : traits, ponts, vagues, boucles, ronds |
| Mon prénom | L1 18 | Écrire son prénom en majuscules |
| La chasse aux lettres | L1 16-17 | Discrimination visuelle des lettres |
| Le son du début | L1 16-17 | Conscience phonologique (phonème initial) |
| Les mots qui riment | L1 16-17 | Conscience phonologique (rime) |
| Tape les syllabes | L1 16-17 | Segmentation syllabique |
| Cartes à découper | L1 13-14 / MSN 12 | Memory, tri, association chiffre-quantité |

Voir [`docs/PEDAGOGIE-1P.md`](docs/PEDAGOGIE-1P.md) pour les principes qui ont guidé leur conception.

---

## Développement local (sans Docker)

Le site est en HTML/CSS/JavaScript natif : **aucun build, aucune dépendance npm**.
Il faut simplement un serveur HTTP, car les modules ES ne se chargent pas en `file://` :

```bash
npx http-server site -p 8099
# ou
python3 -m http.server 8099 --directory site
```

---

## Organisation du projet

```
site/
├── index.html
└── assets/
    ├── css/style.css           styles écran + styles d'impression (@page, @media print)
    └── js/
        ├── app.js              routeur (#/fiches, #/fiche/graphisme, …)
        ├── data/
        │   ├── per.js          ⭐ CONTENU PER : domaines, objectifs, cycles
        │   ├── annees.js       ⭐ repères 1P → 11P
        │   ├── vaud.js         ⭐ spécificités vaudoises
        │   ├── fiches.js       catalogue des fiches ↔ objectifs PER
        │   ├── mots-imprimables.js  mots illustrés : son initial, syllabes, rimes
        │   ├── exercices.js    catalogue des jeux sur écran
        │   └── banque.js       contenus des jeux sur écran
        ├── lib/
        │   ├── pictos.js       50 dessins au trait (SVG), imprimables et coloriables
        │   ├── fiche.js        gabarit A4 + briques (collections, cases, vignettes, lignage)
        │   ├── alea.js         tirage reproductible par graine
        │   ├── jeu.js          moteur des jeux sur écran
        │   ├── speech.js       synthèse vocale (écran uniquement)
        │   ├── store.js        réglages, cahier et progression (localStorage)
        │   ├── dom.js, random.js, interactions.js
        ├── fiches/             un générateur de fiche par fichier
        ├── exercises/          un jeu sur écran par fichier
        └── pages/              une page = un module
```

---

## Modifier les contenus

| Ce que vous voulez changer | Fichier |
|---|---|
| Texte d'explication du PER | `site/assets/js/data/per.js` → `PRESENTATION` |
| Objectifs d'un domaine | `site/assets/js/data/per.js` → `DOMAINES` |
| Repères d'une année | `site/assets/js/data/annees.js` |
| Informations vaudoises | `site/assets/js/data/vaud.js` |
| Mots et images des fiches de sons | `site/assets/js/data/mots-imprimables.js` |
| Dessins | `site/assets/js/lib/pictos.js` |

Après modification : `docker compose up -d --build`.

### Ajouter une fiche

1. Créer `site/assets/js/fiches/ma-fiche.js` :

```js
import { h } from "../lib/dom.js";
import { ligne, collection, cases } from "../lib/fiche.js";

export function creer(alea, { niveau = 1, prenom = "" } = {}) {
  return {
    titre: "Titre imprimé en haut",
    consigne: "Consigne lue par l'adulte à l'enfant.",
    pourAdulte: "Ce qu'il faut observer, imprimé en petit en bas de page.",
    objectifs: ["MSN 12"],
    corps: [ligne(1, collection("pomme", alea.entier(1, 5)), cases(6))]
  };
}
```

`alea` est le tirage reproductible (`entier`, `un`, `melange`, `plusieurs`, `chance`) :
utilisez-le pour tout hasard, jamais `Math.random`, sinon la fiche n'est plus reproductible.

2. L'inscrire dans `site/assets/js/data/fiches.js` avec son domaine, ses objectifs PER,
   la compétence travaillée et ce qu'il faut observer.

Le gabarit se charge du reste : en-tête prénom/date, mise en page A4, pied de page, impression.

**Contrainte à respecter** : une fiche doit tenir sur **une seule page A4**. Le script de
vérification signale tout dépassement (voir ci-dessous).

---

## Choix techniques

- **Pas de build** : le dossier `site/` est servi tel quel. Une correction de contenu = un
  redéploiement de trois secondes.
- **Dessins au trait maison** (`pictos.js`) plutôt que des emoji ou des images : les emoji
  s'impriment mal en noir et blanc, les images posent des questions de droits et de poids.
  Ici, 50 dessins SVG en contours, qui s'impriment net à toute taille et se colorient.
- **Impression pilotée par CSS** (`@page`, `@media print`) : pas de génération PDF côté
  serveur, donc pas de serveur du tout.
- **Tirage par graine** : chaque fiche est reproductible à l'identique, ou renouvelable à
  l'infini.
- **Aucune donnée ne sort de l'appareil** : les réglages sont dans le navigateur.

### Conséquences à connaître

- La progression affichée dans l'Espace parents ne concerne **que les jeux sur écran**.
  Le travail sur papier ne laisse évidemment aucune trace dans l'application.
- Les réglages (prénom, difficulté, cahier) sont liés au **navigateur et à l'appareil**.
- L'impression dépend du navigateur : Chrome, Edge et Firefox donnent de bons résultats ;
  vérifiez toujours l'aperçu avant de lancer une série.

---

## Vérifier que tout tient sur une page

Un petit script Playwright génère chaque fiche, mesure sa hauteur et produit un PDF de
contrôle. Voir [`docs/TESTS.md`](docs/TESTS.md).

---

## Contenus et droits

Le **Plan d'études romand** est la propriété de la [CIIP](https://www.ciip.ch). Les textes de
cette application sont des **reformulations résumées à usage familial**, pas le texte officiel.

⚠️ **Ils n'ont pas été relus contre la source officielle** (voir
[`docs/VERIFIER-LES-CONTENUS.md`](docs/VERIFIER-LES-CONTENUS.md)). Codes et intitulés doivent
être vérifiés sur <https://www.plandetudes.ch>, et les informations vaudoises sur
<https://www.vd.ch>, avant d'être considérés comme fiables.
