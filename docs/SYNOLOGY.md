# Installer sur un NAS Synology, derrière le reverse proxy DSM

Procédure testée sur le principe, pas sur votre machine : les noms de menus
correspondent à **DSM 7.2**. Sur DSM 6, « Container Manager » s'appelle
« Docker » et « Login Portal » s'appelle « Portail des applications ».

Le plan d'ensemble :

```
Internet ─► routeur (443) ─► DSM reverse proxy ─► conteneur mon-per (port 8087)
            per.mondomaine.ch                      nginx, fichiers statiques
```

---

## 1. Déposer les fichiers sur le NAS

Créez un dossier dans le partage `docker` : `/volume1/docker/mon-per`.

**En SSH** (Control Panel → Terminal & SNMP → activer SSH) :

```bash
ssh votrecompte@ip-du-nas
cd /volume1/docker
git clone https://github.com/andant89/PER.git mon-per
cd mon-per
git checkout claude/per-educational-app-pg4e2t
```

**Sans SSH** : téléchargez le dépôt en ZIP depuis GitHub, puis déposez son contenu
dans `/volume1/docker/mon-per` avec File Station. Le dossier doit contenir au
minimum `site/`, `nginx.conf` et `docker-compose.synology.yml`.

---

## 2. Lancer le conteneur

### Option A — Container Manager (sans ligne de commande)

1. **Container Manager** → **Projet** → **Créer**.
2. Nom du projet : `mon-per`. Chemin : `/volume1/docker/mon-per`.
3. Source : **Utiliser un fichier docker-compose.yml existant**, et désignez
   `docker-compose.synology.yml`.
4. Suivant → Terminé. Container Manager télécharge `nginx:1.27-alpine` et démarre.

> Si Container Manager n'accepte que le nom `docker-compose.yml`, renommez le
> fichier ou copiez-le : `cp docker-compose.synology.yml docker-compose.yml`.

### Option B — SSH

```bash
cd /volume1/docker/mon-per
sudo docker compose -f docker-compose.synology.yml up -d
```

### Vérifier

Depuis un navigateur du réseau local : `http://ip-du-nas:8087`.
L'application doit s'afficher. Si ce n'est pas le cas :

```bash
sudo docker logs mon-per
```

**Le port 8087 est-il libre ?** Les ports 80, 443, 5000 et 5001 sont pris par DSM.
Pour vérifier : `sudo netstat -tulpn | grep 8087`. S'il est occupé, changez les
deux chiffres de gauche dans `ports:` (`"8088:80"`) et relancez — ne touchez
jamais au `80` de droite, c'est le port interne de nginx.

---

## 3. Le certificat HTTPS

Control Panel → **Sécurité** → **Certificat** → **Ajouter** → *Obtenir un
certificat de Let's Encrypt*.

- Nom de domaine : `per.mondomaine.ch`
- Courriel : le vôtre

Deux conditions pour que l'émission réussisse :

- le domaine pointe bien sur votre IP publique (enregistrement A, ou DDNS Synology) ;
- le **port 80** est redirigé de votre routeur vers le NAS pendant la validation.

Si vous utilisez un domaine `synology.me` via DDNS Synology, le certificat
s'obtient sans ouvrir le port 80.

---

## 4. Le reverse proxy

Control Panel → **Portail de connexion** (*Login Portal*) → onglet **Avancé**
→ **Reverse Proxy** → **Créer**.

**Source**

| Champ | Valeur |
|---|---|
| Protocole | HTTPS |
| Nom d'hôte | `per.mondomaine.ch` |
| Port | 443 |
| Activer HSTS | optionnel, recommandé |

**Destination**

| Champ | Valeur |
|---|---|
| Protocole | HTTP |
| Nom d'hôte | `localhost` |
| Port | 8087 |

Onglet **En-tête personnalisé** : **rien à ajouter**. L'application est statique,
sans WebSocket ni API — la configuration par défaut suffit.

Enfin, Control Panel → Sécurité → Certificat → **Paramètres** : associez
`per.mondomaine.ch` au certificat créé à l'étape 3.

---

## 5. Ouvrir l'accès

- **Routeur** : redirigez le port **443** (et **80** si vous voulez la redirection
  automatique et le renouvellement Let's Encrypt) vers l'IP du NAS.
- **Pare-feu DSM** (Control Panel → Sécurité → Pare-feu), s'il est actif :
  autorisez 443 et 80.
- **Usage uniquement local** : pas de redirection de port ; ajoutez simplement une
  entrée dans votre DNS local, ou dans le fichier `hosts` de vos machines.

Testez : `https://per.mondomaine.ch`.

---

## Points d'attention

**Utilisez un sous-domaine dédié**, pas un sous-chemin. `https://per.mondomaine.ch`
fonctionne ; `https://nas.mondomaine.ch/per` ne fonctionnera pas tel quel, car le
reverse proxy DSM ne retire pas le préfixe `/per` et les fichiers CSS et JavaScript
seraient introuvables. Servir l'application dans un sous-chemin demanderait de
modifier les chemins dans `index.html`.

**L'impression est locale.** Les fiches sont générées dans votre navigateur et
imprimées depuis lui. Le NAS ne fait que servir des fichiers : il n'imprime rien,
et n'a besoin d'aucune imprimante configurée.

**Aucune donnée n'est stockée sur le NAS.** Prénom, difficulté et sélection de
fiches vivent dans le navigateur qui consulte le site. Il n'y a donc rien à
sauvegarder côté serveur — et rien à protéger d'autre que l'accès lui-même.

**Faut-il exposer le site sur Internet ?** L'application ne contient aucune donnée
personnelle et n'a pas de formulaire de connexion. Si vous ne l'utilisez qu'à la
maison, restez en local : c'est plus simple et il n'y a rien à sécuriser. Si vous
l'exposez, le portail de connexion DSM permet d'ajouter une authentification
devant le reverse proxy.

---

## Mettre à jour

```bash
cd /volume1/docker/mon-per
git pull
sudo docker restart mon-per
```

Avec la variante `docker-compose.synology.yml`, le dossier `site/` est monté
directement : un `git pull` (ou un simple remplacement de fichiers via File
Station) suffit, il n'y a **aucune image à reconstruire**. Le redémarrage n'est
même nécessaire que si vous avez modifié `nginx.conf`.

Pensez à vider le cache du navigateur (Ctrl+Maj+R) après une mise à jour : les
fichiers du dossier `assets/` sont mis en cache une heure.
