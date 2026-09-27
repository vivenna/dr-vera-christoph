# Entwurf 2 – eigenständig

Website-Entwurf für die Augenarztpraxis Dr. med. Vera Christoph, Plessenstraße 13,
24837 Schleswig. Erkennbar verwandt mit der Referenzseite, aber eigenständig gelöst.

## 1. Gestaltungsidee

Ruhig, hell und sachlich wie die Referenz, aber mit eigener Handschrift: Eine linksbündige
Kopfzeile mit Augenmarke, sichtbarer Telefonnummer und einer Textnavigation, bei der ein
Balken in Tinte unter der aktiven Seite steht. Auf großen Bildschirmen trägt jede Seite eine
schmale Randspalte mit Stichwort und Kurzfakten (etwa „5 Bereiche – von der Vorsorge bis zur Hilfe im Notfall“), daneben
steht der Inhalt; Überschriften in Source Serif 4 erinnern an die Visitenkarte. Leitfarbe ist
die Tinte aus dem Logo, das Schriftblau bleibt Links und Schaltflächen vorbehalten, die helle
Lederhaut trägt ruhige Flächen und den Fuß.

**Was es von Entwurf 1 unterscheidet:** keine Pillen-Navigation, sondern Textnavigation mit
Unterstrich-Balken; auf dem Telefon eine feste Aktionsleiste „Anrufen · Termin vereinbaren“
am unteren Rand plus Menü-Knopf; ein asymmetrisches 12-Spalten-Raster mit Randspalte; die
Leistungen als Übersicht mit Sprungzielen und darunter gut scanbare, zweispaltige Listen mit
hervorgehobenen Fachbegriffen; ein heller, mehrspaltiger Fuß; die Sprechzeiten auf der
Startseite als Wochenleiste mit Stundenbalken; die Karte nur auf der Kontaktseite.

## 2. Seitenübersicht

| Datei | Inhalt |
|---|---|
| `index.html` | Begrüßung mit Praxiskarte im Stil der Visitenkarte, Sprechzeiten als Wochenleiste, Kurzvorstellung mit Foto-Platzhalter, die fünf Leistungsbereiche als Kacheln, Anfahrt mit Parkhinweis |
| `leistungen.html` | Übersicht der fünf Bereiche mit Sprungzielen, danach alle 53 Leistungen in fünf Abschnitten (nichts ausgeblendet, auf jeder Breite vollständig); im Bereich Notfälle die drei Notrufnummern |
| `sprechzeiten.html` | Tabelle (Wochentag · Vormittag · Nachmittag), „sowie nach Vereinbarung“, Erreichbarkeit, Hilfe außerhalb der Sprechzeiten, Weg zur Praxis mit Parkhinweis |
| `wichtige-infos.html` | Checkliste zum Mitbringen, Fahrtüchtigkeit nach Pupillenerweiterung, Begleitperson, Notfälle mit Hinweis zu Verätzungen |
| `kontakt.html` | Kontaktwege, Anschrift, Karte (Zwei-Klick-Lösung), ausführlicher Parkhinweis mit Faltblatt der Stadt Schleswig, Park-and-Ride, Bus und Smile24 |
| `termin.html` | Zwischenseite: Die Online-Terminbuchung entsteht gerade; Telefonnummer als Schaltfläche, Sprechzeiten, was man beim Anruf bereithält, akute Beschwerden |
| `impressum.html` | Angaben nach § 5 DDG, berufsrechtliche Angaben (Platzhalter), Verantwortlich nach § 18 Abs. 2 MStV, Haftung, Bild- und Schriftnachweis |
| `datenschutz.html` | Datenschutzerklärung mit Inhaltsverzeichnis in der Randspalte, Stand September 2026 |

## 3. Farben

Alle Farben stammen aus dem Praxislogo (`logo/logo.html`); zwei dunklere Abstufungen für Text
und Hover sind aus Tinte bzw. Schriftblau abgeleitet. Gemessen mit `kontrast.mjs`
(WCAG-Formel). Anforderung: Text 4,5:1, große Schrift und Bedienelemente 3:1.

| Hex | Rolle | Kontrast (gemessen) |
|---|---|---|
| `#25232f` | Fließtext, `<h1>` (dunkle Abstufung der Tinte) | 15,44:1 auf Weiß · 13,55:1 auf Lederhaut |
| `#4b4860` | Nebentexte, Platzhaltertext, Randspalte | 8,77:1 auf Weiß · 7,70:1 auf Lederhaut |
| `#615e79` | **Tinte – Leitfarbe:** Überschriften `<h2>`/`<h3>`, Stichworte, aktive Navigation, Balken, Notruf-Kachel | 6,20:1 auf Weiß · 5,44:1 auf Lederhaut · Weiß auf Tinte 6,20:1 |
| `#275895` | **Schriftblau:** Links, Schaltflächen, Telefonnummern, Fokusrahmen | 7,20:1 auf Weiß · 6,32:1 auf Lederhaut · Weiß auf Schriftblau 7,20:1 |
| `#1d4477` | Hover von Links und Schaltflächen | 9,79:1 auf Weiß · 8,59:1 auf Lederhaut · Weiß darauf 9,79:1 |
| `#eef0f6` | **Lederhaut:** ruhige Flächen, Hinweiskästen, Fuß | Fläche (1,14:1 zu Weiß) |
| `#89859f` | Wimpern: gestrichelter Rand der Platzhalter, Foto-Symbol | 3,55:1 auf Weiß – nur Grafik, nie Text |
| `#a5a3bb` | Irisring: gestrichelter Rand der Foto-Platzhalter | 2,15:1 auf Lederhaut – nur Dekor |
| `#c2c3d6` | Iris: Flächen in Symbolen, Hover-Balken der Navigation, Trennlinien im Fuß | 1,74:1 auf Weiß – nur Dekor |
| `#d9dbe7` | Haarlinien | 1,38:1 auf Weiß – nur Dekor |
| `#ffffff` | Grundfläche, Schrift auf Schaltflächen | siehe oben |

Die Wochenleiste auf der Startseite ist reine Grafik (für Screenreader ausgeblendet); dieselben
Zeiten stehen daneben als Text.

## 4. Schriften

| Schrift | Datei | Einsatz | Lizenz |
|---|---|---|---|
| Source Sans 3 (variabel, 200–900) | `assets/fonts/source-sans-3-latin-wght-normal.woff2` | Fließtext, Navigation, Schaltflächen; per `preload` vorgeladen | SIL Open Font License 1.1 |
| Source Serif 4 (variabel, 200–900) | `assets/fonts/source-serif-4-latin-wght-normal.woff2` | Überschriften, Name in der Marke, Nummern | SIL Open Font License 1.1 |

Beide Dateien liegen im Entwurf (keine Anfrage an Google Fonts), `font-display: swap`.
Der Lizenztext steht in `assets/fonts/OFL.txt`. Schriftgröße: Fließtext 19 px (ab 1100 px
20 px), nirgends unter 18 px.

## 5. Termin-Ziel

Die Adresse steht in `quelltext/gemeinsam/website.mjs` unter `terminUrl`. Nach einer Änderung
`node quelltext/bauen.mjs` ausführen – danach zeigen alle Termin-Schaltflächen dieses Entwurfs
(Kopf, Aktionsleiste auf dem Telefon, Fuß, Startseite, Leistungen, Sprechzeiten, Kontakt) auf
die neue Adresse.

- Zurzeit steht dort `termin.html`: Die Schaltflächen führen auf die Zwischenseite dieses Entwurfs.
- Beginnt die Adresse mit `http://` oder `https://`, setzt das Build-Skript an jedem
  Termin-Link automatisch `target="_blank"` und `rel="noopener noreferrer"` und ergänzt für
  Screenreader „(öffnet in neuem Fenster)“. Die Zwischenseite bleibt bestehen und zeigt dann
  eine Schaltfläche „Zur Online-Terminbuchung“.
- Das funktioniert **ohne JavaScript**, weil die Adresse beim Bauen fest ins `href` geschrieben
  wird. In den Seitenvorlagen steht sie nirgends von Hand, alle Links nutzen
  `ctx.termin.href` und `ctx.termin.attribute` (Baustein `terminKnopf` in
  `quelltext/02-eigenstaendig/bausteine.mjs`).

**Vor dem Umschalten** in `quelltext/gemeinsam/praxis.mjs` unter `rechtliches.terminAnbieter`
den Anbieter eintragen. Sobald `terminUrl` extern ist, stellen sich die Hinweistexte
(Startseite, Sprechzeiten, Beschreibung der Termin-Seite, Datenschutzerklärung) automatisch
auf „online oder telefonisch“ um. In der Datenschutzerklärung erscheint dann der Platzhalter
„[Angaben zur Datenverarbeitung bei der Online-Terminbuchung folgen …]“. Er muss vor dem
Livegang durch die Angaben des Anbieters ersetzt werden (Anbieter, Daten, Rechtsgrundlage,
Speicherdauer).

## 6. Aufbau und Bauen

```sh
cd <Repository>
node quelltext/bauen.mjs 02-eigenstaendig
```

| Ort | Inhalt |
|---|---|
| `quelltext/02-eigenstaendig/entwurf.mjs` | Einstellungen: Titel, Browserfarbe (`#615e79`), Vorschaubild |
| `quelltext/02-eigenstaendig/layout.mjs` | Seitenrahmen: `<head>`, Kopf mit Navigation und Aktionsleiste, Fuß |
| `quelltext/02-eigenstaendig/bausteine.mjs` | Wiederkehrende Bausteine: Symbole, Termin-Knopf, Sprechzeiten (Tabelle, Wochenleiste, Kurzfassung), Parkhinweis, Karte, Trennstellen für Überschriften |
| `quelltext/02-eigenstaendig/seiten/*.mjs` | Eine Datei je Seite |
| `quelltext/gemeinsam/` | Praxisdaten, Sprechzeiten, Leistungen, Termin-Ziel – für alle Entwürfe gemeinsam |
| `entwuerfe/02-eigenstaendig/assets/` | CSS (`css/stil.css`), JavaScript (`js/seite.js`), Schriften, Logo-Kopien, Grafiken, Faltblatt, Icons |

Erzeugt werden nur die `*.html`, `sitemap.xml` und `robots.txt`. CSS, JavaScript und Grafiken
werden direkt unter `assets/` bearbeitet. Sprechzeiten, Telefon und Adresse kommen immer aus
`quelltext/gemeinsam/praxis.mjs`; ändert sich dort etwas, folgen Tabelle, Wochenleiste, Fuß,
Termin-Seite und JSON-LD nach dem nächsten Bau automatisch.

Weitere Dateien:

- `assets/logo/` – unveränderte Kopien von `logo-marke.svg`, `logo-marke-mono.svg` (im Fuß als
  CSS-Maske in Tinte) und `logo-icon.svg`.
- `favicon.ico`, `site.webmanifest`, `assets/icons/` – mit dem Favicon-Skript aus `logo-icon.svg`
  erzeugt (16/32/48 px, 180 px, 192 px, 512 px, maskierbar).
- `assets/bilder/og-bild.png` (1200 × 630) – Vorschaubild für Messenger und soziale Netze,
  Quelle `og-bild.svg` (Schrift in Pfade umgewandelt, damit das Bild überall gleich aussieht).
- `assets/bilder/karte-platzhalter.svg` – abstrakte Fläche vor dem Laden der Karte (keine
  nachgezeichneten Straßen).
- `assets/downloads/parkplatz-faltblatt-schleswig-2025-12-18.pdf` – unveränderte Kopie des
  Faltblatts der Stadt Schleswig.

**Ohne JavaScript:** Alle Seiten sind vollständig nutzbar. Das Menü steht dann als umbrechende
Liste offen im Kopf, die Termin-Schaltfläche ist ein normaler Link, die Karte lässt sich über den
Link zu OpenStreetMap öffnen. JavaScript (`assets/js/seite.js`, 2 KB, ohne Abhängigkeiten) klappt
nur das Menü auf dem Telefon ein (Esc schließt, Fokus kehrt zurück) und lädt die Karte nach Klick.

## 7. Karte und Datenschutz

Die Karte steht nur auf der Kontaktseite. Beim Aufruf wird **keine** Verbindung zu
OpenStreetMap aufgebaut: Zu sehen ist eine eigene, abstrakte SVG-Fläche mit einem kurzen
Hinweis (IP-Adresse geht an die OpenStreetMap Foundation im Vereinigten Königreich) und der
Schaltfläche „Karte laden“. Erst der Klick setzt das `<iframe>` mit der OSM-Einbettung ein
(`title="Karte: Lage der Praxis, Plessenstraße 13"`, `loading="lazy"`) und blendet den
Quellenhinweis „© OpenStreetMap-Mitwirkende“ ein. Die Schaltfläche erscheint nur, wenn
JavaScript läuft; die Adresse und der Link „Karte bei OpenStreetMap öffnen“ (neues Fenster)
sind immer sichtbar. Die Datenschutzerklärung beschreibt das im Abschnitt „Karte von
OpenStreetMap“ (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG, Angemessenheitsbeschluss).

Sonst gibt es keine externen Anfragen: keine Cookies, kein `localStorage`, keine Tracker,
Schriften lokal. Deshalb braucht die Seite kein Einwilligungsbanner.

## 8. Gesetzte Platzhalter

Alle Platzhalter stehen in eckigen Klammern und sind gestrichelt umrandet. Sie verschwinden
automatisch, sobald der Wert in `quelltext/gemeinsam/praxis.mjs` eingetragen und neu gebaut ist:
Kontaktangaben direkt unter `praxis` (`email`, `fax`, `sprachen`, `barrierefreiheit`), die
Angaben für Impressum und Datenschutz unter `praxis.rechtliches` (`approbation`, `kammer`,
`aufsicht`, `berufsordnung`, `ustid`, `haftpflicht`, `datenschutzbeauftragter`, `hosting`,
`speicherdauerLogs`, `terminAnbieter`, `bildrechte`). Die Foto-Platzhalter werden durch
echte Bilder ersetzt.

| Platzhalter | Seite(n) | Benötigte Angabe |
|---|---|---|
| [E-Mail-Adresse folgt] | Fuß jeder Seite; Kontakt, Sprechzeiten, Impressum, Datenschutz | E-Mail-Adresse der Praxis (`praxis.email`) |
| [Faxnummer folgt, falls vorhanden] | Kontakt, Impressum | Faxnummer, falls es eine gibt (`praxis.fax`) |
| [Gesprochene Sprachen folgen] | Kontakt | Sprachen in der Praxis (`praxis.sprachen`) |
| [Angaben zur Barrierefreiheit der Praxisräume folgen] | Kontakt („Zugang zur Praxis“) | Stufen, Aufzug, Stockwerk, Parkplatz am Haus (`praxis.barrierefreiheit`) |
| [Foto folgt: Porträt von Dr. Christoph in der Praxis] | Startseite | Porträtfoto der Ärztin (Nutzungsrecht klären) |
| [Foto folgt: Hauseingang der Praxis in der Plessenstraße] | Kontakt | Foto des Hauseingangs |
| [Staat der Approbation und Verleihung der Berufsbezeichnung folgt] | Impressum | Staat, in dem Approbation und Facharztbezeichnung erteilt wurden |
| [Zuständige Ärztekammer folgt] | Impressum | Zuständige Ärztekammer mit Anschrift |
| [Zuständige Aufsichtsbehörde folgt] | Impressum | Aufsichtsbehörde (z. B. Kassenärztliche Vereinigung) |
| [Anwendbare Berufsordnung folgt] | Impressum | Berufsordnung mit Fundstelle bzw. Link |
| [Umsatzsteuer-Identifikationsnummer folgt, falls vorhanden] | Impressum | USt-IdNr., falls vorhanden – sonst Zeile streichen |
| [Angaben zur Berufshaftpflichtversicherung folgen] | Impressum | Versicherer mit Anschrift und räumlichem Geltungsbereich |
| [Datenschutzbeauftragte Person folgt, falls benannt] | Datenschutz | Name und Kontakt oder Streichung des Abschnitts |
| [Hosting-Anbieter folgt] | Datenschutz | Hosting-Anbieter der späteren Website |
| [Speicherdauer der Server-Logdateien folgt] | Datenschutz | Speicherdauer der Server-Logdateien |
| [Anbieter der Online-Terminbuchung folgt] | Datenschutz | Anbieter der künftigen Online-Terminbuchung |
| [Urheberin oder Urheber des Aquarell-Auges und Nutzungsrecht folgen] | Impressum (Bildnachweis) | Wer das Auge der Visitenkarte gezeichnet hat und ob die Marke davon abgeleitet werden darf |

## 9. Bekannte Einschränkungen und offene Punkte

- **Stylesheet größer als vorgegeben:** `assets/css/stil.css` hat rund 35 KB (komprimiert
  übertragen etwa 8,3 KB), die Bauvorgabe nennt höchstens 30 KB. Eine Abdeckungsmessung über
  alle Seiten, sechs Breiten sowie mit und ohne JavaScript zeigt: Jede Regel wird gebraucht;
  ungenutzt sind nur Hover-, Fokus-, Druck- und Bewegungsregeln. Selbst ohne Kommentare und
  Leerzeichen blieben gut 30 KB. Unter 30 KB käme man nur, indem man Bausteine streicht (etwa die
  Wochenleiste oder die Telefon-Darstellung der Sprechzeiten-Tabelle). Die Startseite lädt
  insgesamt rund 173 KB (Ziel ≤ 300 KB).
- **Suchmaschinen:** Die Vorschau trägt `noindex`. Für den Livegang in
  `quelltext/gemeinsam/website.mjs` `indexierbar: true` und `basisUrl` setzen. Die
  `robots.txt` im Unterordner wirkt erst im Wurzelverzeichnis einer Domain.
- **Leistungen:** Einzelne gerätegebundene Punkte (OCT, GDx, Pachymetrie, Nyktometrie,
  YAG-Laser, Führerscheingutachten) sollte die Ärztin vor dem Livegang noch einmal bestätigen.
- **Sprechzeiten:** Die Ärztin sagte, Online-Angaben seien veraltet; Visitenkarte und alle
  Portale stimmen aber überein. Gezielt nachfragen (Akutsprechstunde, Urlaub, Vertretung).
- **Kopfzeile auf dem Telefon:** Unter 480 px Breite zeigt der Kopf nur Augenmarke und Namen,
  die Fachrichtung steht dann in der Seite selbst. Unter etwa 420 px bricht der Name auf zwei
  Zeilen um, weil daneben der Menü-Knopf mit Beschriftung steht. Bewusst so gelassen: Die
  Beschriftung „Menü“ ist für ältere Menschen verständlicher als ein Symbol allein.
- **Silbentrennung:** Fließtext wird automatisch getrennt, Überschriften nicht (sonst entstehen
  Brüche wie „Schles-wiger“). Damit lange Wörter auch bei 320 px passen, setzt
  `bausteine.mjs` (Funktion `trennen`) weiche Trennstellen (`&shy;`), etwa zwischen „Datenschutz“ und „erklärung“.
  Neue lange Wörter in Überschriften dort ergänzen. Eigennamen wie „OpenStreetMap“ werden
  im Layout vor falscher automatischer Trennung geschützt.
- **Parkplätze:** Die Angaben geben das Faltblatt vom 18.12.2025 wieder. Die Lage ändert sich
  bis 2028 mehrfach; der Link auf ladenstrasse-schleswig.de bleibt länger aktuell.
- **Vorschaubild:** Das Open-Graph-Bild zeigt Name, Fachrichtung, Anschrift und Telefon; es wird
  nicht vom Build-Skript erzeugt. Ändert sich eine dieser Angaben, `assets/bilder/og-bild.svg`
  anpassen (die Schrift ist dort in Pfade umgewandelt, am einfachsten in einem Vektorprogramm
  neu setzen) und als PNG mit 1200 × 630 Pixeln nach `og-bild.png` exportieren. Der
  Alternativtext in `entwurf.mjs` folgt den Praxisdaten automatisch.
- **Urheberrecht am Auge-Motiv:** Die Logo-Dateien sind eine Nachzeichnung der Visitenkarte;
  die Nutzungsrechte am Original sind noch zu klären (siehe `praxis-briefing/04-offene-fragen.md`).
