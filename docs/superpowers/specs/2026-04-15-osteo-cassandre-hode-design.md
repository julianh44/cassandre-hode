# Site vitrine — Cassandre Hodé, ostéopathe animalier

**Date :** 2026-04-15
**Domaine cible :** `cassandre-hode-osteo.fr`
**Contact destinataire :** `cassandrehode.oa@gmail.com`

## Objectif

Site vitrine single-page présentant l'activité d'ostéopathie animale de Cassandre Hodé. Contenu et textes issus de la maquette PDF fournie par la cliente, disposition inspirée de la maquette IA. Formulaire de contact qui envoie un mail via un backend Node/Express. Déploiement Docker derrière Traefik, sur le même pattern que le projet `la-parenthese` existant.

## Stack

Identique à `la-parenthese` pour rester cohérent avec les autres projets de l'utilisateur :

- **Front** : Vue 3 (vue-cli), `vue-router` (nécessaire pour la page dédiée Politique de confidentialité), fontsource pour les polices.
- **Back** : Express 5, Nodemailer, `express-rate-limit`.
- **Serveur static** : Express sert directement le `dist/` Vue (pas de nginx séparé).
- **Conteneurisation** : Dockerfile multi-stage, `docker-compose.yml` prod + `docker-compose.dev.yml` dev.
- **Reverse proxy** : Traefik externe via le réseau Docker `web` (déjà en place sur le serveur).

## Architecture

```
[Traefik]
   ↓ (TLS, host cassandre-hode-osteo.fr)
[container osteo-cassandre-hode, port 3000]
   ├── Express sert /dist en static
   └── Express expose POST /api/contact → Nodemailer → SMTP
```

Un seul container, un seul process Node. Les variables SMTP et le destinataire viennent d'un `.env` non commité.

## Structure du site (page d'accueil `/`)

Single-page scroll avec 4 sections ancrées, dans cet ordre. Les textes sont repris **mot pour mot** du PDF fourni.

### 1. Header + Hero
- Bandeau sombre bordeaux. Logo à gauche (picto animalier + wordmark `CASSANDRE HODÉ / Ostéopathe animalier`), icône burger à droite.
- Photo principale (Cassandre + cheval) en dessous.
- Carte semi-transparente en surimpression sur la photo : `06 71 30 03 21`, icônes Facebook + Instagram.
- Bande fine sous la photo : *« Inscrite au Registre National d'Aptitudes sous le numéro OA2381 »*.

### 2. Présentation (`#presentation`)
- Titre `PRÉSENTATION` centré, trait horizontal sous le titre.
- Texte : *« Je m'appelle Cassandre Hodé, après 5 années d'études à Biopraxia Rennes j'ai obtenu mon diplôme d'ostéopathe animalier en 2025 puis validé mes compétences auprès du Conseil de l'Ordre National des Vétérinaires en 2026. Je suis installée sur le secteur d'Ancenis et me déplace dans un rayon de 1h aux alentours, comprenant les départements du 44, 49, 85 & 53. Je pratique sur toutes les espèces : cheval, vache, chien, chat, NACS, petits ruminants. »*

### 3. L'ostéopathie animale (`#osteopathie`)
- Titre `L'OSTÉOPATHIE ANIMALE` + trait.
- Texte : *« L'ostéopathie animale est une thérapie manuelle visant à harmoniser les structures du corps via le diagnostic et le traitement de troubles fonctionnels. L'objectif est de restaurer l'équilibre global du corps afin d'améliorer le bien-être de l'animal. »*
- Citation encadrée (guillemets décoratifs) : *« L'ostéopathie ne soigne pas, elle donne les clés au corps pour qu'il s'auto-guérisse. »*
- Grille de 3 photos (vache pattes / veau / cheval dos) — conservées telles que dans le PDF.

### 4. La méthode biomécaniste (`#biomecaniste`)
- Titre `LA MÉTHODE BIOMÉCANISTE` + trait.
- **Texte fluide centré** (pas de carrés ni de cartes, sur demande de la cliente — pourra être retravaillé plus tard).
- Paragraphes : *« C'est une méthode définit par la fusion de deux approches. L'une analytique et précise, l'autre globalisante. »* / *« La méthode biomécaniste me permet ainsi d'avoir une vision précise et clair des phénomènes recrutés, associé à une vision plus étendue et globale afin de prendre en compte l'animal dans sa globalité et en lien avec son environnement. »* / *« Cette complémentarité permet d'élaborer le diagnostic et le projet de prise en charge lors de la consultation. »*

### 5. Comment me contacter ? (`#contact`)
- Titre `COMMENT ME CONTACTER ?` + trait.
- Coordonnées : `Téléphone : 06 71 30 03 21`, `Mail : cassandrehode.oa@gmail.com`.
- Icônes Facebook + Instagram.
- **Formulaire encadré** (voir section Formulaire ci-dessous).
- Photo de fin (main sur dos de cheval).

### Menu burger
Overlay plein écran, fond bordeaux sombre. Liens cliquables qui scrollent vers les ancres :
- Présentation → `#presentation`
- L'ostéopathie animale → `#osteopathie`
- La méthode biomécaniste → `#biomecaniste`
- Comment me contacter ? → `#contact`

Logo animalier en bas de l'overlay. Fermeture en cliquant sur une croix ou sur un lien.

### Footer
Fond beige (même que les sections, `#EAC6B0` approx.).
- **Ligne 1** : logo à gauche, icônes Facebook + Instagram à droite.
- **Ligne 2** (centrée) : lien *Politique de confidentialité* pointant vers `/politique-confidentialite`.
- **Ligne 3** (centrée, petit) : `© 2026 Cassandre Hodé — Ostéopathe animalier`.

## Page dédiée : Politique de confidentialité (`/politique-confidentialite`)

Page accessible via le lien du footer. Contenu texte standard RGPD pour un site vitrine simple :
- Responsable du traitement (Cassandre Hodé, coordonnées).
- Données collectées (via formulaire : nom, téléphone, email, message).
- Finalité (répondre à la demande de contact, aucune newsletter, aucune revente).
- Durée de conservation.
- Droits RGPD (accès, rectification, suppression) et email pour les exercer.
- Mention cookies (le site n'en pose pas hors nécessaire technique, à vérifier à l'implémentation).
- Hébergeur.

Le texte exact sera rédigé à l'implémentation sur ce canevas. Header + footer partagés avec la homepage via `App.vue`.

## Formulaire de contact

### Champs
| Champ       | Type    | Requis | Contraintes                   |
|-------------|---------|--------|-------------------------------|
| `nom`       | text    | oui    | trim, 1–100 caractères        |
| `telephone` | tel     | oui    | trim, 5–30 caractères         |
| `email`     | email   | oui    | regex email, ≤ 150 caractères |
| `message`   | textarea| oui    | trim, 1–2000 caractères       |
| `website`   | text    | honeypot — doit rester vide   |

### UX
- Bouton `ENVOYER` désactivé pendant l'envoi.
- Succès : message vert *« Merci, votre message a bien été envoyé. »* + reset des champs.
- Erreur serveur/validation : message rouge sous le formulaire.
- Erreur 429 : message dédié *« Trop de tentatives, réessayez dans quelques minutes. »*.

### Endpoint
`POST /api/contact`

- Body JSON `{ nom, telephone, email, message, website }`.
- Validation côté serveur (fichier `server/validate.js`) : tous les champs obligatoires présents, longueurs respectées, regex email, honeypot vide.
- Si honeypot rempli → renvoyer `200 { ok: true }` **sans envoyer de mail** (piège silencieux).
- `express-rate-limit` : 5 requêtes / 15 min / IP sur `/api/contact`.
- Envoi via Nodemailer (`server/mailer.js`), SMTP depuis `.env`.
- Mail : destinataire `MAIL_TO`, sujet `Nouveau message — site cassandre-hode-osteo.fr`, corps texte + HTML reprenant les champs.
- Réponses : `200 { ok: true }` / `400 { error }` / `429` / `500`.

## Design / charte

Repris du PDF :
- Fond de sections : beige rosé `#EAC6B0` (à ajuster précisément sur le PDF).
- Bandeaux / texte sombre : bordeaux très foncé `#3B1A1E`.
- Accents : crème clair pour le texte sur fond sombre.
- Titres : serif élégante (ex : *Cormorant Garamond* ou équivalent — à valider à l'implémentation via fontsource).
- Texte courant : sans-serif lisible (ex : *Epilogue*, déjà utilisée dans `la-parenthese`).
- Mobile-first : le PDF est déjà en format mobile, on part de là et on élargit proprement pour tablette/desktop.

## Arborescence du projet

```
osteo-cassandre-hode/
├── Dockerfile
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
├── .gitignore
├── package.json
├── vue.config.js
├── public/
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router.js
│   ├── assets/
│   │   ├── fonts/
│   │   ├── images/
│   │   └── logo/
│   ├── components/
│   │   ├── TheHeader.vue
│   │   ├── BurgerMenu.vue
│   │   ├── HeroSection.vue
│   │   ├── PresentationSection.vue
│   │   ├── OsteopathieSection.vue
│   │   ├── BiomecanisteSection.vue
│   │   ├── ContactSection.vue
│   │   ├── ContactForm.vue
│   │   └── TheFooter.vue
│   └── pages/
│       ├── HomePage.vue
│       └── PolitiqueConfidentialitePage.vue
└── server/
    ├── index.js
    ├── mailer.js
    └── validate.js
```

## Déploiement

### Dockerfile (multi-stage)

1. **Stage `build`** : `node:20-alpine`, copie `package*.json`, `npm ci`, copie sources, `npm run build` → produit `dist/`.
2. **Stage final** : `node:20-alpine`, copie `server/`, `dist/`, `package*.json`, `npm ci --omit=dev`. Lance `node server/index.js`. Expose `3000`.

### docker-compose.yml (prod)

```yaml
services:
  app:
    build: .
    container_name: osteo-cassandre-hode
    env_file: .env
    restart: unless-stopped
    networks: [web]
    labels:
      - traefik.enable=true
      - traefik.docker.network=web
      - traefik.http.routers.osteohode.rule=Host(`cassandre-hode-osteo.fr`) || Host(`www.cassandre-hode-osteo.fr`)
      - traefik.http.routers.osteohode.entrypoints=websecure
      - traefik.http.routers.osteohode.tls=true
      - traefik.http.routers.osteohode.tls.certresolver=resolverhttp
      - traefik.http.services.osteohode.loadbalancer.server.port=3000
      - traefik.http.middlewares.osteohode-wwwredirect.redirectregex.regex=^https://www\.cassandre-hode-osteo\.fr/(.*)
      - traefik.http.middlewares.osteohode-wwwredirect.redirectregex.replacement=https://cassandre-hode-osteo.fr/$${1}
      - traefik.http.middlewares.osteohode-wwwredirect.redirectregex.permanent=true
      - traefik.http.routers.osteohode.middlewares=osteohode-wwwredirect

networks:
  web:
    external: true
```

### docker-compose.dev.yml

Deux services :
- `front` : `npm run serve` sur `:8080`, proxy `/api` → `http://back:3000` configuré dans `vue.config.js`.
- `back` : `nodemon server/index.js` sur `:3000`, monté en volume, reload à chaud.

### Variables d'environnement (`.env.example`)

```
SMTP_HOST=
SMTP_PORT=465
SMTP_USER=
SMTP_PASS=
MAIL_TO=cassandrehode.oa@gmail.com
PORT=3000
```

`.env` ignoré via `.gitignore`.

## Assets fournis par le client

Dossier source : `/Users/julianhusson/Documents/Clients/Osteo Cassandre Hode`

- `Logos/` : 3 variantes du logo Cassandre Hodé (avec/sans texte, HD).
- `Photos/` : 7 photos (hero cheval, vache/veau/cheval pour la section ostéopathie, photo de fin).
- `Documents/identifiants.pages` : probablement les identifiants SMTP à récupérer pour le `.env` au moment du déploiement.

À l'implémentation, les photos et logos seront copiés dans `src/assets/images/` et `src/assets/logo/` avec des noms explicites (ex : `hero-cheval.jpg`, `osteo-vache.jpg`, `logo.svg`…). Le mapping exact photo source → nom de destination sera décidé au moment de l'intégration en regardant les images.

## Hors scope (volontairement)

- Analytics / tracking.
- Prise de rendez-vous en ligne.
- Multi-langue.
- CMS / back-office (tous les textes sont en dur dans les composants Vue).
- Tests automatisés (le projet est petit et figé, la cliente est un particulier).
- Optimisation SEO avancée (on reste sur les basiques : balises `<title>`, `<meta description>`, ancres sémantiques).

## Critères de succès

- Le site s'affiche correctement sur mobile et desktop avec le contenu exact du PDF.
- Le formulaire envoie un mail reçu sur `cassandrehode.oa@gmail.com`.
- Le honeypot et le rate-limit bloquent les soumissions abusives.
- `docker compose up -d` sur le serveur derrière Traefik sert le site sur `https://cassandre-hode-osteo.fr` avec redirection `www` → apex.
- Le lien *Politique de confidentialité* ouvre une vraie page dédiée.
