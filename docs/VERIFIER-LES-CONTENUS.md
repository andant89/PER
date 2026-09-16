# Vérifier les contenus PER

## Pourquoi cette page

Les textes du PER présents dans l'application ont été rédigés **de mémoire**, sans
accès au site officiel au moment de la création du projet (l'environnement de
développement n'avait pas d'accès réseau vers `plandetudes.ch`).

Concrètement :

- la **structure** (3 cycles, 5 domaines, Formation générale, capacités transversales,
  logique des codes) est fiable ;
- les **codes d'objectifs** (`L1 11-12`, `MSN 12`, `SHS 11`, …) sont vraisemblables
  mais certains peuvent être inexacts, en particulier pour les domaines Arts et
  Corps et mouvement, et pour les cycles 2 et 3 ;
- les **intitulés** sont des reformulations pour parents, volontairement plus courtes
  et plus simples que le texte officiel ; ce ne sont pas des citations ;
- les **repères par année** sont une interprétation : le PER fixe ses attentes
  fondamentales *en fin de cycle*, pas année par année.

## Procédure de relecture

1. Ouvrir <https://www.plandetudes.ch>, choisir le cycle puis le domaine.
2. Ouvrir `site/assets/js/data/per.js`.
3. Pour chaque objectif, comparer :
   - le **code** (le plus important : c'est la clé de recherche) ;
   - l'**intitulé** — le reformuler si nécessaire, sans recopier intégralement le
     texte officiel (il est protégé par le droit d'auteur de la CIIP) ;
   - les **composantes**, qui sont ici résumées en trois ou quatre lignes.
4. Passer le drapeau de l'objectif à `verifie: true` :

```js
{
  code: "MSN 12",
  titre: "Construire et structurer des représentations des nombres naturels",
  composantes: [...],
  verifie: true      // ← un ✓ s'affiche alors dans l'application
}
```

5. Une fois un domaine entier relu, renseigner la date dans `META` :

```js
export const META = {
  ...
  derniereRelecture: "2026-09-20"
};
```

6. Redéployer : `docker compose up -d --build`.

## Ordre de priorité conseillé

| Priorité | Quoi | Pourquoi |
|---|---|---|
| 1 | Objectifs du **cycle 1** (`objectifs[1]`) de **Langues** et **MSN** | Ce sont ceux auxquels les exercices 1P sont rattachés. |
| 2 | Repères de la **1P** dans `annees.js` | C'est la page la plus consultée pour un enfant de cet âge. |
| 3 | Cycle 1 des autres domaines (SHS, Arts, CM) | Complètent la vue d'ensemble. |
| 4 | La page **canton de Vaud** (`site/assets/js/data/vaud.js`) | Évaluation, orientation et services : à confronter à vd.ch. |
| 5 | Cycles 2 et 3 | Utiles plus tard, volontairement résumés pour l'instant. |

## Sources utiles

- Plan d'études romand : <https://www.plandetudes.ch>
- CIIP (éditeur du PER) : <https://www.ciip.ch>
- État de Vaud, scolarité obligatoire :
  <https://www.vd.ch/themes/formation/scolarite-obligatoire> — c'est la source à
  utiliser pour tout ce qui touche l'évaluation, l'orientation et les services
  (PPLS, santé scolaire) mentionnés dans la page « Vaud » de l'application.

## Droits d'auteur

Le PER est protégé. Pour une application familiale, la reformulation et la citation
de codes ne posent pas de difficulté. En cas de diffusion publique, mieux vaut :

- ne pas recopier les textes officiels intégralement,
- citer clairement la CIIP comme source,
- renvoyer vers `plandetudes.ch` pour le texte de référence.
