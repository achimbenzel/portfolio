# Achim Benzel Portfolio

Reduzierte Portfolio-Webseite mit React, Vite, TypeScript und JSON-basierten Projekten.

## Start

```bash
npm install
npm run dev
```

Der Dev-Start fuehrt automatisch `npm run generate:projects` aus.

## Neue Projekte hinzufuegen

1. Lege einen neuen Ordner an, zum Beispiel `public/Projects/04`.
2. Fuege dort eine `project.json` und die passenden Bilder hinzu.
3. Verweise in der JSON auf Bilder relativ zum Projektordner, zum Beispiel `"thumbnail": "thumbnail.jpg"`.
4. Starte `npm run dev` oder fuehre `npm run generate:projects` aus.

Die Reihenfolge ergibt sich aus den Ordnernamen: `01`, `02`, `03`, `04`.

## Referenzprojekte synchronisieren

Die aktuellen Beispielprojekte koennen aus dem lokalen Referenzordner aktualisiert werden:

```bash
npm run sync:reference-projects
npm run generate:projects
```

Dabei werden Texte aus `Reference/projects/*/project.json` gelesen und die passenden Bilder nach `public/Projects/01`, `02` und `03` kopiert.

## Build

```bash
npm run build
```

Der Build generiert zuerst `src/data/projects.generated.ts` und baut danach die Vite-App.
