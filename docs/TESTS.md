# Vérifier les fiches

Les fiches sont générées dans le navigateur : la seule façon sérieuse de les vérifier est de
les rendre pour de vrai. Le script ci-dessous ouvre chaque fiche, mesure sa hauteur, signale
tout dépassement de la page A4, capture une image, et produit un PDF du cahier complet.

## Prérequis

- Node 20+
- Playwright et un Chromium : `npm install playwright && npx playwright install chromium`

## Lancer

```bash
# 1. servir le site
npx http-server site -p 8099 &

# 2. lancer la vérification
node outils/verifier-fiches.mjs
```

Sortie attendue :

```
✅ denombrer            hauteur=1024px erreurs=0
✅ graphisme            hauteur=1024px erreurs=0
...
cahier : 16 fiches → cahier.pdf
erreurs totales : 0
```

- `hauteur=1024px` correspond exactement à une page A4 utile (271 mm à 96 dpi).
  Toute valeur supérieure est signalée `⚠️ DÉBORDE LA PAGE` : la fiche s'imprimerait sur deux feuilles.
- `erreurs` compte les erreurs JavaScript survenues pendant la génération.
- Les images sont écrites dans `sortie/fiche-<id>.png`, le PDF dans `sortie/cahier.pdf`.

## Ce qu'il faut regarder en plus, à l'œil

Le script vérifie la mécanique, pas la pédagogie. Avant d'ajouter une fiche, relisez-la sur
papier (imprimez-la vraiment) et vérifiez :

- **une seule réponse correcte** — c'est le piège le plus courant : deux paires issues du même
  groupe de rimes, ou un intrus qui pourrait appartenir aux deux catégories ;
- **la taille des tracés** : un enfant de 1P a besoin de motifs d'au moins 1 cm ;
- **la place pour écrire** : il écrit gros et déborde ;
- **le rendu en noir et blanc**, sans niveau de gris indispensable ;
- **la consigne** : elle s'adresse à l'enfant, elle est lue par l'adulte, elle tient en une phrase.
