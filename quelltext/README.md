# Quelltext der Website-Entwürfe

Die fertigen, auslieferbaren Seiten liegen unter [`../entwuerfe/`](../entwuerfe/).
Die HTML-Seiten dort werden aus diesem Ordner **erzeugt**. So stehen Kopf,
Navigation, Fuß, Sprechzeiten und Kontaktdaten nur an einer Stelle und können
nicht auseinanderlaufen.

## Bauen

```sh
node quelltext/bauen.mjs                      # alle Entwürfe
node quelltext/bauen.mjs 01-nah-an-referenz   # nur einen Entwurf
```

Voraussetzung ist nur **Node.js ab Version 18**. Es gibt keine Abhängigkeiten,
kein `npm install`. Nach dem Bauen die Änderungen unter `entwuerfe/` mit
einchecken, GitHub Pages liefert sie direkt aus.

Das Skript bricht mit einer Meldung ab, wenn eine Seite nicht genau eine
`<h1>` hat, einen Pfad mit führendem `/` enthält, auf einen `inspiration-*`-Ordner
verweist oder ein nicht aufgelöster Ausdruck (`undefined`, `${…}`) darin steht.

## Was wo steht

| Datei | Inhalt |
|---|---|
| [`gemeinsam/website.mjs`](gemeinsam/website.mjs) | **Ziel der Termin-Schaltfläche** (`terminUrl`), Adresse der Website, Indexierung |
| [`gemeinsam/praxis.mjs`](gemeinsam/praxis.mjs) | Name, Adresse, Telefon, **Sprechzeiten**, Platzhalter für fehlende Angaben, Karte, Parken |
| [`gemeinsam/leistungen.mjs`](gemeinsam/leistungen.mjs) | Die 53 Leistungen in fünf Blöcken, neu formuliert |
| `NN-name/entwurf.mjs` | Einstellungen eines Entwurfs (Farbe, Vorschaubild) |
| `NN-name/layout.mjs` | Seitenrahmen eines Entwurfs: `<head>`, Kopf, Navigation, Fuß |
| `NN-name/seiten/*.mjs` | Eine Datei je Seite: Titel, Beschreibung, Inhalt |
| [`bauen.mjs`](bauen.mjs) | Das Bauskript |

CSS, JavaScript, Schriften, Grafiken und Downloads liegen **direkt** im
jeweiligen Entwurfsordner unter `entwuerfe/NN-name/assets/` und werden dort
bearbeitet. Erzeugt werden nur `*.html`, `sitemap.xml` und `robots.txt`.

## Häufige Änderungen

**Online-Terminbuchung geht live:** In `gemeinsam/website.mjs` bei `terminUrl`
die Adresse eintragen, zum Beispiel `'https://termine.beispiel.de/christoph'`,
dann bauen. Alle Termin-Schaltflächen aller Entwürfe zeigen danach direkt dorthin
und erhalten automatisch `target="_blank"` und `rel="noopener noreferrer"`.
Das funktioniert ohne JavaScript, weil die Adresse beim Bauen fest ins HTML
geschrieben wird. Die Hinweistexte („telefonisch“ bzw. „online oder telefonisch“)
stellen sich mit um. Die schlichte Zwischenseite `terminbuchung.html`
(„Terminbuchung wird noch eingerichtet“, siehe `seiten/*-terminbuchung.mjs`)
wird dabei nicht mehr verlinkt, bleibt aber erreichbar. Vorher
`praxis.rechtliches.terminAnbieter` eintragen: Erst dann erscheint in der
Datenschutzerklärung automatisch der Abschnitt zur Terminbuchung, mit einem
Platzhalter für die Angaben des Anbieters (siehe die `ctx.termin.extern`-Fallunterscheidung
in den `seiten/*-datenschutz.mjs`).

**E-Mail-Adresse, Fax oder andere fehlende Angaben liegen vor:** In
`gemeinsam/praxis.mjs` den Wert statt `null` eintragen, dann bauen. Kontaktangaben
stehen direkt unter `praxis` (`email`, `fax`, `sprachen`, `barrierefreiheit`), die
Angaben für Impressum und Datenschutzerklärung unter `praxis.rechtliches`
(`kammer`, `aufsicht`, `hosting` …). Die Seiten holen sie mit `ctx.angabe('…')`, die
Platzhalter füllen sich damit überall automatisch. E-Mail und Fax erscheinen
bewusst nur im Impressum (dort gesetzlich vorgeschrieben) und nicht als
allgemeine Kontaktoption; neben der E-Mail-Adresse steht dort zusätzlich der
Hinweis `gemeinsam/praxis.mjs:emailHinweis`, dass sie für medizinische Anfragen
von Patientinnen und Patienten nicht gedacht ist.

**Sprechzeiten ändern sich:** In `gemeinsam/praxis.mjs` unter `sprechzeiten`
anpassen, dann bauen. Tabelle, Fußzeile und strukturierte Daten (JSON-LD)
folgen automatisch.

**Livegang auf eigener Domain:** In `gemeinsam/website.mjs` `basisUrl` auf die
Domain setzen und `indexierbar: true`. Im gewählten Entwurf `pfad: ''` in
`entwurf.mjs` eintragen, damit die Seiten im Wurzelverzeichnis landen.

## Warum die Vorschau nicht in Suchmaschinen erscheint

Solange `indexierbar: false` gesetzt ist, trägt jede Seite
`<meta name="robots" content="noindex, follow">`. Die Entwürfe enthalten
Platzhalter wie „[E-Mail-Adresse folgt]“, sind einander inhaltlich sehr ähnlich
und würden später mit der echten Website um dieselben Suchbegriffe konkurrieren.
Die `robots.txt` in den Entwurfsordnern ist schon für den Livegang vorbereitet.
Sie wirkt aber erst im Wurzelverzeichnis einer Domain, Suchmaschinen lesen sie in
Unterordnern nicht.
