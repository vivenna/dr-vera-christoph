# Entwurf 1 – nah an der Referenz

Website-Entwurf für die Augenarztpraxis Dr. med. Vera Christoph, Plessenstraße 13,
24837 Schleswig.

## 1. Gestaltungsidee

Dieser Entwurf übernimmt Aufbau und Anmutung der Referenzseite augenpraxis-mitte.de so
genau, dass die Verwandtschaft sofort auffällt. Dazu gehören der schmale Infostreifen
mit der schwebenden Navigations-„Pille“ darunter (5 px Kontur, 50 px Radius), die weiße,
sehr luftige Fläche mit großen, fetten Überschriften, die Sprechzeiten-Tabelle mit
dünnen Linien, die Leistungsseite mit mitlaufender linker Spalte, die vollbreite Karte
und der farbige Fuß mit Claim und angeschnittenem Logo-Wasserzeichen.
Die Farben stammen aus dem Logo von Dr. Christoph, alle Texte sind neu geschrieben.
Gegenüber der Referenz sind folgende Schwächen behoben: Die aktive Seite ist markiert,
jede Seite hat genau eine `<h1>`, die Schrift liegt lokal, mobil wird nichts
ausgeblendet, die Spalte klebt nativ mit `position: sticky`, und es gibt ein
gemeinsames Stylesheet und einen einheitlichen Einwilligungstext.

## 2. Seitenübersicht

| Datei | Inhalt |
|---|---|
| `index.html` | Begrüßung mit Aquarell-Auge, Sprechzeiten, „Anfahrt und Parken“ (statt Rezensionen), Karte |
| `leistungen.html` | Einleitung mit Grafik, Sprungliste, fünf Zweispalten-Blöcke mit allen 53 Leistungen, Notrufnummern im Block „Notfälle“, Karte |
| `sprechzeiten.html` | Sprechzeiten-Tabelle, „sowie nach Vereinbarung“, Erreichbarkeit und Lage, Karte |
| `wichtige-infos.html` | Acht Icon-Zeilen: Versichertenkarte und Überweisung, Befunde und Medikamente, Brille und Kontaktlinsen, Pupillenerweiterung, Fahrtüchtigkeit, Begleitung, Notfall, Termine. Wie in der Referenz ohne Karte |
| `kontakt.html` | Kontaktwege, Lage und ÖPNV, ausführlicher Parkhinweis mit Faltblatt der Stadt (PDF), Karte |
| `termin.html` | Zwischenseite, solange die Online-Terminbuchung entsteht: Anruf-Schaltfläche, Sprechzeiten, Hinweise |
| `impressum.html` | Angaben nach § 5 DDG und § 18 Abs. 2 MStV, heilberufliche Angaben als Platzhalter |
| `datenschutz.html` | Datenschutzerklärung, Stand September 2026 |

Die Hauptnavigation (Pille) enthält Startseite · Leistungen · Sprechzeiten ·
Wichtige Infos · Kontakt. Impressum und Datenschutz stehen im Fuß, die
Termin-Schaltfläche steht im Kopf und im Fuß jeder Seite.

**Responsives Verhalten**

- **Unter 768 px:** Kopf mit Logo, „Termin vereinbaren“ und Menü-Schaltfläche. Der
  Kopf bleibt beim Scrollen oben stehen. Das Menü klappt als Tafel auf, Esc schließt
  es, der Fokus springt zurück.
- **Ohne JavaScript:** Alle fünf Menüpunkte stehen als umbrechende Reihe unter dem
  Kopf.
- **Ab 768 px:** Die Pille, dazu die Telefonnummer im Streifen.
- **Ab 900 px:** Zusätzlich „Tel.“ und die Adresse, außerdem die Leistungen zweispaltig
  mit mitlaufender linker Spalte (nur bei mindestens 720 px Fensterhöhe).

## 3. Farben

Alle Farben stammen aus dem Logo (`logo/logo.html`). Die Kontraste sind mit
`TOOLS/kontrast.mjs` gemessen.

| Hex | Name / Rolle | Gemessener Kontrast |
|---|---|---|
| `#275895` | Schriftblau – Struktur: Pillen-Kontur, Schaltflächen, Tabellenlinien, Links, Fuß, Fokusrahmen | 7,20:1 auf Weiß · Weiß darauf 7,20:1 · 6,32:1 auf Lederhaut |
| `#615e79` | Tinte – Reaktion: Hover, aktive Seite in der Pille, „Herzlich willkommen“, Zusatz im Logo-Text | 6,20:1 auf Weiß · Weiß darauf 6,20:1 · 5,44:1 auf Lederhaut |
| `#eef0f6` | Lederhaut – Flächen der Listenkarten, Kacheln, Hinweiskästen | Hintergrund; Text `#1c2130` darauf 14,07:1 |
| `#c2c3d6` | Iris – 1-px-Rand der Karten, Grafik | 1,74:1, nur Dekor, nie Text |
| `#89859f`, `#a5a3bb` | Wimpern, Irisring – nur in den Grafiken | 3,55:1 bzw. 2,45:1, nie Text |
| `#1c2130` | Fließtext und Überschriften | 16,04:1 auf Weiß |
| `#3f4452` | Leiser Text (Einleitungen, Hinweise) | 9,72:1 auf Weiß · 8,53:1 auf Lederhaut |
| `#dfe6f1` | Schlusszeile im Fuß | 5,74:1 auf Schriftblau |
| `#e3e6ef` | Fläche des Karten-Platzhalters | Schriftblau darauf 5,77:1, Text 12,85:1 |
| `#4d3a00` auf `#fdf3d8` | Sichtbare Platzhalter `[…]` | 9,89:1 |

Auf dem Telefon kann der große, fette Claim im Fuß das Logo-Wasserzeichen berühren
(Weiß mit 20 % Deckkraft über Schriftblau). Weiße Schrift hat dort im ungünstigsten
Fall 4,45:1, für große Schrift genügen 3:1. Ab 900 px liegt das Wasserzeichen neben
dem Text und darf deshalb mit 26 % etwas kräftiger sein.

## 4. Schriften

| Schrift | Datei | Lizenz |
|---|---|---|
| Source Sans 3 (variabel, 200–900) | `assets/fonts/source-sans-3-latin-wght-normal.woff2` (28 KB, per `preload` geladen, `font-display: swap`) | SIL Open Font License 1.1, `assets/fonts/OFL.txt` |

Es ist nur eine Datei für alle Schriftstärken. Source Sans 3 passt zur Schrift der
Visitenkarte. Die Größen: Fließtext 19–20 px, Tabellen und Einleitungen bis 24 px,
nirgends unter 18 px.

## 5. Termin-Ziel

Die Adresse steht in **`quelltext/gemeinsam/website.mjs` unter `terminUrl`**.
Derzeit ist das `'termin.html'`, die Zwischenseite dieses Entwurfs.

Sobald die Online-Terminbuchung auf ihrer eigenen Domain läuft:

1. In `quelltext/gemeinsam/website.mjs` zum Beispiel
   `terminUrl: 'https://termine.beispiel.de/dr-christoph'` eintragen.
2. Im Projektstamm `node quelltext/bauen.mjs` ausführen (baut alle Entwürfe) oder
   `node quelltext/bauen.mjs 01-nah-an-referenz`.
3. Die geänderten Dateien unter `entwuerfe/` einchecken.

Das Build-Skript schreibt die Adresse direkt ins `href` jeder Termin-Schaltfläche
(Kopf, Fuß, Kontakt, Sprechzeiten, Wichtige Infos). Deshalb funktioniert sie auch
**ohne JavaScript**. Bei einer externen Adresse (beginnt mit `http://` oder
`https://`) setzt das Skript automatisch `target="_blank"` und
`rel="noopener noreferrer"`. Für Screenreader hängt dieser Entwurf dann
„(öffnet in neuem Fenster)“ an. Die Zwischenseite `termin.html` bleibt bestehen. Sie
zeigt dann automatisch eine Schaltfläche „Zur Online-Terminbuchung“ und
weiterhin die Telefonnummer.

**Vor dem Umschalten** in `quelltext/gemeinsam/praxis.mjs` unter `rechtliches.terminAnbieter`
den Anbieter eintragen. Sobald `terminUrl` extern ist, stellen sich die Hinweistexte
(Startseite, Sprechzeiten, Beschreibung der Termin-Seite, Datenschutzerklärung) automatisch
auf „online oder telefonisch“ um. In der Datenschutzerklärung erscheint dann der Platzhalter
„[Angaben zur Datenverarbeitung bei der Online-Terminbuchung folgen …]“. Er muss vor dem
Livegang durch die Angaben des Anbieters ersetzt werden (Anbieter, Daten, Rechtsgrundlage,
Speicherdauer).

## 6. Aufbau und Bauen

| Ort | Inhalt |
|---|---|
| `quelltext/01-nah-an-referenz/entwurf.mjs` | Titel, Farbe der Browserleiste, Vorschaubild |
| `quelltext/01-nah-an-referenz/layout.mjs` | Seitenrahmen: `<head>`, Infostreifen, Pille, Karte, Fuß |
| `quelltext/01-nah-an-referenz/bausteine.mjs` | Sprechzeiten-Tabelle, Termin-Link, Faltblatt-Link, Symbole |
| `quelltext/01-nah-an-referenz/seiten/*.mjs` | Eine Datei je Seite (Titel, Beschreibung, Inhalt) |
| `quelltext/gemeinsam/*.mjs` | Praxisdaten, Sprechzeiten, Leistungen, Termin-Ziel (für alle Entwürfe) |
| `entwuerfe/01-nah-an-referenz/assets/` | CSS (`css/stil.css`, ein Stylesheet), JS (`js/seite.js`), Schrift, Logos, Grafiken, Faltblatt, Favicons |

```sh
cd <Projektstamm>
node quelltext/bauen.mjs 01-nah-an-referenz
```

Voraussetzung ist Node.js ab Version 18, weitere Abhängigkeiten gibt es nicht. Erzeugt
werden nur die `*.html`-Dateien, `sitemap.xml` und `robots.txt`. Die HTML-Dateien
bitte nicht von Hand ändern, sondern im Quelltext. CSS, JS und Grafiken werden direkt
in `assets/` gepflegt. Alle Pfade sind relativ, der Ordner läuft so wie er ist auf
GitHub Pages in einem Unterordner.

Sprechzeiten, Telefon und Adresse kommen auf jeder Seite aus
`quelltext/gemeinsam/praxis.mjs`. Dort geänderte Werte stehen nach dem Bauen überall
(Tabelle, Fuß, Kopf, strukturierte Daten).

## 7. Karte und Datenschutz

Die vollbreite Kartensektion über dem Fuß (auf Startseite, Leistungen, Sprechzeiten
und Kontakt) zeigt zunächst nur eine eigene, abstrakte SVG-Fläche. Darauf liegt ein
Hinweiskasten mit Adresse, einem einheitlichen Einwilligungstext und zwei Aktionen:

- **„Karte laden“** erscheint nur mit JavaScript. Erst dieser Klick setzt ein
  `<iframe>` mit der OpenStreetMap-Einbettung ein (`loading="lazy"`,
  `referrerpolicy="no-referrer"`). Vorher geht keine Anfrage an fremde Server. Nach dem
  Laden stehen unter der Karte weiter die Adresse, der Link zu OpenStreetMap und der
  Quellenhinweis „© OpenStreetMap-Mitwirkende“.
- **„Karte bei OpenStreetMap öffnen“** ist immer sichtbar, auch ohne JavaScript, und
  öffnet openstreetmap.org in einem neuen Fenster.

Auch die OSM-Einbettung überträgt die IP-Adresse an die OpenStreetMap Foundation
(Vereinigtes Königreich). Deshalb gilt die Zwei-Klick-Lösung, und die
Datenschutzerklärung beschreibt sie in Abschnitt 6. Es gibt keine Cookies, kein
`localStorage`, keine Tracker und keine externen Schriften oder Skripte.

## 8. Gesetzte Platzhalter

Alle Platzhalter erscheinen als gelb hinterlegte `[…]`-Markierung.

| Platzhalter | Seite(n) | Benötigte Angabe | Wo eintragen |
|---|---|---|---|
| `[E-Mail-Adresse folgt]` | Fuß aller Seiten, Kontakt, Impressum, Datenschutz | E-Mail-Adresse der Praxis | `praxis.mjs` → `email` |
| `[Faxnummer folgt, falls vorhanden]` | Kontakt, Impressum | Faxnummer oder Bestätigung, dass es keine gibt | `praxis.mjs` → `fax` |
| `[Gesprochene Sprachen folgen]` | Kontakt | Sprachen in der Sprechstunde | `praxis.mjs` → `sprachen` |
| `[Angaben zur Barrierefreiheit der Praxisräume folgen]` | Kontakt | Stockwerk, Aufzug, Stufen, Parkplatz am Haus | `praxis.mjs` → `barrierefreiheit` |
| `[Staat der Approbation und Verleihung der Berufsbezeichnung folgt]` | Impressum | z. B. Deutschland | `praxis.mjs` → `rechtliches.approbation` |
| `[Zuständige Ärztekammer folgt]` | Impressum | Ärztekammer mit Anschrift und Website | `rechtliches.kammer` |
| `[Zuständige Aufsichtsbehörde folgt]` | Impressum | Aufsichtsbehörde (z. B. Kassenärztliche Vereinigung) | `rechtliches.aufsicht` |
| `[Anwendbare Berufsordnung folgt]` | Impressum | Berufsordnung mit Link | `rechtliches.berufsordnung` |
| `[Umsatzsteuer-Identifikationsnummer folgt, falls vorhanden]` | Impressum | USt-IdNr. oder Streichung der Zeile | `rechtliches.ustid` |
| `[Angaben zur Berufshaftpflichtversicherung folgen]` | Impressum | Versicherer, Anschrift, räumlicher Geltungsbereich | `rechtliches.haftpflicht` |
| `[Datenschutzbeauftragte Person folgt, falls benannt]` | Datenschutz | Name und Kontakt oder Streichung des Abschnitts | `rechtliches.datenschutzbeauftragter` |
| `[Hosting-Anbieter folgt]` | Datenschutz | Name und Sitz des Hosters | `rechtliches.hosting` |
| `[Speicherdauer der Server-Logdateien folgt]` | Datenschutz | Frist laut Hoster | `rechtliches.speicherdauerLogs` |
| `[Anbieter der Online-Terminbuchung folgt]` | Datenschutz | Anbieter der künftigen Buchung | `rechtliches.terminAnbieter` |
| `[Urheberin oder Urheber des Aquarell-Auges und Nutzungsrecht folgen]` | Impressum (Bildnachweis) | Wer das Auge der Visitenkarte gezeichnet hat und ob es digital nachgebaut werden darf | `rechtliches.bildrechte` |

Nach jeder Änderung `node quelltext/bauen.mjs` ausführen.

## 9. Bekannte Einschränkungen und offene Punkte

- **Das Aquarell-Auge** (`logo-aquarell.svg`) ist ein Nachbau vom Foto der Visitenkarte
  und wirkt aus der Nähe etwas stufig. Mit der Originaldatei der Druckerei würde es
  deutlich feiner. Die Rechte am Motiv sind noch zu klären (offene Frage 14 im Briefing).
- **Kein Praxis- oder Porträtfoto.** Wie in der Referenz kommt der Entwurf ohne Fotos
  aus. Möchte die Ärztin ein Porträt, passt es in die Begrüßung der Startseite statt
  oder neben das Aquarell.
- **Leistungen mit Gerätebezug** (OCT, GDx, Pachymetrie, Nyktometrie, YAG-Laser,
  Führerscheingutachten) stehen so, wie die Ärztin sie bestätigt hat. Vor dem
  Livegang sollten sie stichprobenartig gegengeprüft werden (Heilmittelwerbegesetz,
  Irreführungsverbot).
- **Vorschaubild** (`assets/bilder/og-bild.png`) enthält Telefonnummer und Claim als
  Grafik. Ändert sich die Nummer, muss es neu erzeugt werden (Vorlage
  `og-bild.svg`, Umwandlung mit dem Werkzeug `svg2png.mjs`).
- **Karte:** Die Einbettung von openstreetmap.org ist nicht für hohen Verkehr gedacht.
  Für eine kleine Praxisseite ist das unkritisch.
- **Suchmaschinen:** Solange `indexierbar: false` in `website.mjs` steht, trägt jede
  Seite `noindex`. Die `robots.txt` wirkt erst im Wurzelverzeichnis der eigenen Domain.
- **Fuß-Schlusszeile:** Anders als in der Referenz steht dort kein Hinweis auf die
  Webagentur. Soll einer hinein, bitte Wortlaut liefern.
- `assets/logo/logo-wortmarke.svg` liegt als unveränderte Kopie bei, wird auf den
  Seiten aber nicht verwendet.
