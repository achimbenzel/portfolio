# Deployment

Die App ist fuer einen normalen Webserver mit Vite `base: "/"` gebaut. Projektbilder liegen unter festen Public-Pfaden wie:

```text
/Projects/01/thumbnail.jpg
/Projects/01/image-01.jpg
```

Da React Router mit `BrowserRouter` schoene URLs nutzt, muss der Server direkte Links wie `/work/gute-stube-freisen` auf `index.html` zurueckfallen lassen.

## Nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Projekt-Workflow

Neue Projekte werden unter `public/Projects/<nummer>/project.json` hinzugefuegt. Danach:

```bash
npm run generate:projects
npm run build
```

Die generierte Datei `src/data/projects.generated.ts` ist absichtlich Build-Zeit-Datenquelle, weil Vite im Browser keine Public-Ordner zur Laufzeit scannen kann.
