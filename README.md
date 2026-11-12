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

Compile l'application en mode production dans `dist/asteria-front/`.

## Docker

```bash
docker build -t asteria-front .
docker run -p 80:80 asteria-front
```

L'image sert le build de production via nginx (voir `nginx.conf`).

## Structure des dossiers

```
src/app/
├── core/            # guards, interfaces et services partagés (auth, règles, notifications)
├── components/      # composants transverses (navbar, navigation mobile)
└── pages/           # une page par route (accueil, règles, tables, auth, profil, contacts)
```

## Workflow git

- Branche de travail : `dev`. Jamais de commit ni de push direct sur `main`.
- Nouvelles branches depuis `dev` : `feat/<sujet>`, `fix/<sujet>`, `chore/<sujet>` ou `perf/<sujet>`.
- Pull requests vers `dev`.
- Commits : [conventional commits](https://www.conventionalcommits.org/) en anglais, un sujet par commit.
