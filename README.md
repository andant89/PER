# Mon PER — le Plan d'études romand expliqué, et des jeux pour la 1P

Application web familiale, sans compte ni serveur applicatif, à héberger sur votre Docker.

Elle contient :

- **Les explications du PER** — ce qu'est le Plan d'études romand, son organisation, comment lire un objectif ;
- **Les objectifs** — les 5 domaines disciplinaires, la Formation générale et les capacités transversales, pour les 3 cycles ;
- **Les objectifs par année** — des repères indicatifs pour chacune des 11 années (1P → 11P) ;
- **16 exercices ludiques pour la 1P** — consignes lues à voix haute, aucune lecture requise de l'enfant.

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

Le conteneur écoute sur le port **80** et ne demande aucune configuration
particulière : pas de websocket, pas de chemin de base à réécrire, pas d'API.
Servir l'application à la racine d'un sous-domaine (`per.mondomaine.ch`) ou dans
un sous-chemin fonctionne, le routage se faisant par fragment d'URL (`#/...`).

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
├── index.html                  coquille de la page (en-tête, navigation, pied de page)
└── assets/
    ├── css/style.css           feuille de styles unique
    └── js/
        ├── app.js              routeur (#/accueil, #/jeu/compter, …)
        ├── data/
        │   ├── per.js          ⭐ CONTENU PER : domaines, objectifs, cycles
        │   ├── annees.js       ⭐ repères 1P → 11P
        │   ├── exercices.js    catalogue des jeux ↔ objectifs PER
        │   └── banque.js       mots, images (emoji), formes, couleurs
        ├── lib/
        │   ├── jeu.js          moteur commun : manches, étoiles, voix, écran de fin
        │   ├── interactions.js briques d'interface des jeux
        │   ├── speech.js       synthèse vocale + sons
        │   ├── store.js        profil et progression (localStorage)
        │   ├── dom.js          helper de création d'éléments
        │   └── random.js       tirages aléatoires
        ├── pages/              une page = un module
        └── exercises/          un jeu = un module
```

---

## Modifier les contenus

| Ce que vous voulez changer | Fichier |
|---|---|
| Texte d'explication du PER | `site/assets/js/data/per.js` → `PRESENTATION` |
| Objectifs d'un domaine | `site/assets/js/data/per.js` → `DOMAINES` |
| Repères d'une année | `site/assets/js/data/annees.js` |
| Mots, images, couleurs des jeux | `site/assets/js/data/banque.js` |
| Ajouter un jeu | voir ci-dessous |

Après modification : `docker compose up -d --build`.

### Ajouter un exercice

1. Créer `site/assets/js/exercises/mon-jeu.js` :

```js
export const manches = 8;                 // nombre de manches d'une partie

export function jouer(ctx) {
  ctx.consigne("Touche le chiffre 3.");   // affiché ET lu à voix haute
  // ctx.scene : la zone de jeu à remplir
  // ctx.juste() : bonne réponse → manche suivante
  // ctx.faux()  : erreur, sans pénalité, l'enfant réessaie
  // ctx.info()  : message neutre
  // ctx.numeroManche / ctx.totalManches / ctx.prenom
}
```

2. L'inscrire dans `site/assets/js/data/exercices.js` avec son domaine, ses
   objectifs PER, la compétence travaillée et un conseil pour les parents.

Le moteur s'occupe du reste : barre de progression, encouragements, étoiles,
écran de fin et enregistrement de la progression.

---

## Choix techniques

- **Pas de build** : le dossier `site/` est servi tel quel. Aucun `node_modules`,
  rien à recompiler, rien qui se périme. Une correction de contenu = un redéploiement de 3 secondes.
- **Pas d'images** : toutes les illustrations sont des emoji. Image Docker d'environ
  50 Mo, aucun problème de droits, rendu net sur tous les écrans.
- **Pas de serveur applicatif ni de base de données** : la progression est stockée
  dans le navigateur (`localStorage`). Rien ne sort de l'appareil.
- **Voix du navigateur** (`SpeechSynthesis`) : indispensable pour des enfants qui ne
  lisent pas, et sans coût ni service externe.

### Conséquences à connaître

- La progression est **liée au navigateur et à l'appareil** : le tableau de bord de
  la tablette ne suit pas sur l'ordinateur, et un effacement des données du site la remet à zéro.
- La qualité de la voix dépend du système (très bonne sur iPad/macOS et Windows,
  plus variable sur Android et Linux). Sur un appareil sans voix française, les
  consignes restent affichées à l'écran.
- Sur iOS, la voix ne démarre qu'après la première interaction de l'utilisateur avec la page.

---

## Contenus et droits

Le **Plan d'études romand** est la propriété de la
[CIIP](https://www.ciip.ch). Les textes de cette application sont des
**reformulations résumées à usage familial**, pas le texte officiel.

⚠️ **Ils n'ont pas été relus contre la source officielle** (voir
[`docs/VERIFIER-LES-CONTENUS.md`](docs/VERIFIER-LES-CONTENUS.md)). Codes et
intitulés doivent être vérifiés sur <https://www.plandetudes.ch> avant d'être
considérés comme fiables, et *a fortiori* avant toute diffusion hors du cercle familial.
