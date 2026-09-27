# Werkzeuge

Hilfsskripte für die Entwürfe. Sie gehören **nicht** zur Website und werden nur
beim Arbeiten gebraucht. Einmalig einrichten:

```sh
cd werkzeuge && npm install
```

Vorausgesetzt werden Node.js ab Version 18 und Google Chrome. Auf macOS wird
Chrome automatisch gefunden, sonst den Pfad in `CHROME_PFAD` angeben.

| Befehl | Zweck |
|---|---|
| `node werkzeuge/pruefen.mjs entwuerfe/01-nah-an-referenz` | Prüft einen Entwurf wie auf GitHub Pages: Links, Barrierefreiheit (axe-core, WCAG 2.2 AA), Schriftgrößen, Klickflächen, Tastaturfokus, Überlauf von 320 bis 1440 px, Bedienung ohne JavaScript, externe Anfragen, erfundene E-Mail- oder Faxangaben, Sprechzeiten, Parkhinweis. Mit `--bilder <ordner>` entstehen Bildschirmfotos. |
| `node werkzeuge/favicons.mjs <icon.svg> entwuerfe/<entwurf> --farbe "#…"` | Erzeugt `favicon.ico`, `site.webmanifest` und die Icons unter `assets/icons/` |
| `node werkzeuge/svg2png.mjs <ein.svg> <aus.png> 1200 630` | Wandelt das Open-Graph-Vorschaubild von SVG in PNG um |
| `node werkzeuge/kontrast.mjs "#ffffff" "#275895"` | Misst das Kontrastverhältnis zweier Farben |

Das Prüfskript endet mit Exit-Code 1, sobald es einen FEHLER findet. Ziel ist
0 FEHLER und 0 WARNUNGEN.
