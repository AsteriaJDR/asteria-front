# Asteria — Front

Front du site vitrine et de l'espace joueur d'Asteria, développé avec Angular 20 (composants standalone, signals).

## Prérequis

- Node 22
- L'API [asteria-back](https://github.com/AsteriaJDR/asteria-back) démarrée en local (voir son README) pour les fonctionnalités liées aux comptes, aux règles et aux tables.

## Installation

```bash
npm ci
```

## Lancement en local

```bash
npm run dev
```

Démarre le serveur de développement Angular (`ng serve --host 0.0.0.0`) sur `http://localhost:4200`. Le front appelle l'API sur `http://localhost:3000` (voir `src/environments/environment.ts`) ; démarrez `asteria-back` avant d'utiliser les pages qui dépendent de données serveur (authentification, règles, tables).

## Tests

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Build

```bash
npm run build
```

Compile l'application en mode production dans `dist/asteria-front/`. Les pages publiques qui ne dépendent pas de l'API (`/`, `/rules`, `/contacts`, `/auth`) sont pré-rendues à la compilation (`dist/asteria-front/browser/<route>/index.html`) ; les autres routes (`/rules/classes`, `/rules/races`, `/tables`, `/profile`, `/settings`) restent en rendu client et sont servies via `index.csr.html`.

## Configuration du site (`src/site.config.json`)

Nom du site, locale, couleur de thème, description par défaut et `siteUrl`. `siteUrl` reste vide jusqu'à ce qu'un nom de domaine de production existe : tant qu'il est vide, aucune URL absolue n'est générée (pas de `canonical`, `og:url`, `og:image` ni `sitemap.xml`).

## Sitemap

```bash
npm run sitemap
```

Lit `src/site.config.json` et, si `siteUrl` est renseigné, écrit `sitemap.xml` dans `dist/asteria-front/browser/` (routes publiques indexables uniquement) et ajoute la ligne `Sitemap:` à son `robots.txt`. Si `siteUrl` est vide, ne génère rien. Ce script tourne après le build (voir `Dockerfile`) et ne modifie jamais `public/robots.txt`.

## Docker

```bash
docker build -t asteria-front .
docker run -p 80:80 asteria-front
```

L'image compile l'application, génère le sitemap, puis sert le résultat via nginx (voir `nginx.conf`) — aucun serveur Node en production.

## Structure des dossiers

```
src/app/
├── core/            # guards, interfaces et services partagés (auth, règles, notifications)
├── components/      # composants transverses (navbar, navigation mobile)
└── pages/           # une page par route (accueil, règles, tables, auth, profil, contacts)
```

## Images

On commite les images déjà optimisées (WebP, redimensionnées) dans `public/`.
Les fichiers sources d'origine (non compressés) restent sur le Drive de l'équipe.

## Workflow git

- Branche de travail : `dev`. Jamais de commit ni de push direct sur `main`.
- Nouvelles branches depuis `dev` : `feat/<sujet>`, `fix/<sujet>`, `chore/<sujet>` ou `perf/<sujet>`.
- Pull requests vers `dev`.
- Commits : [conventional commits](https://www.conventionalcommits.org/) en anglais, un sujet par commit.
