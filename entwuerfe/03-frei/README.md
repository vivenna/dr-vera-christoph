# Entwurf 3 – „An der Schlei“ (freie Gestaltung)

Website-Entwurf für die Augenarztpraxis Dr. med. Vera Christoph, Plessenstraße 13,
24837 Schleswig. Eigenes Logo, eigenes Farbschema, eigene Seitenaufteilung, ohne
Anleihen bei der Referenzseite.

## 1. Gestaltungsidee

Der Entwurf verbindet das Auge mit dem Ort: Schleswig liegt an der Schlei, und das
ruhige Wasser mit seinen Spiegelungen gibt Farben, Linien und Bildsprache vor.
Petrol und Tiefwasser tragen Struktur und Schaltflächen, ein warmer Sandton gliedert
die Flächen, ein gedecktes Backsteinrot (wie die Altstadt) markiert Hinweise, die
man nicht übersehen soll: Parkhaus, Pupillenerweiterung, Notfall.
Die Seiten sind nach den Fragen einer Patientin geschnitten, nicht nach einem
Menü-Schema: *Was bieten Sie an? Wann sind Sie da und was bringe ich mit? Wie komme
ich hin und wo parke ich?* Große Schrift, klare Schaltflächen, keine Effekte.

## 2. Seitenübersicht

Hauptnavigation: **Start · Leistungen · Sprechzeiten und Besuch · Anfahrt und Kontakt**.
Die Termin-Schaltfläche steht auf jeder Seite im Kopf (auch auf dem Telefon, auch ohne
JavaScript), Impressum und Datenschutz stehen in der Fußzeile.

| Datei | Inhalt | Pflichtinhalt laut Auftrag |
|---|---|---|
| `index.html` | Begrüßung, „Auf einen Blick“ (Sprechzeiten, Adresse mit Parkhinweis, Telefon), Schlei-Horizont, Kurzvorstellung mit Foto-Platzhalter, die fünf Leistungsbereiche als Kacheln, das Wichtigste zum Besuch, Anfahrt mit Parkhinweis | Startseite |
| `leistungen.html` | Einleitung, Sprungliste, fünf nummerierte Bereiche mit **allen 53 Leistungen** (auf jeder Breite vollständig sichtbar), Notfallnummern in voller Breite, Aufruf zum Anruf | Leistungen |
| `besuch.html` | Sprechzeiten-Tabelle mit „sowie nach Vereinbarung“ und telefonischer Erreichbarkeit, **was mitzubringen ist** (sechs Kacheln), **Pupillenerweiterung und Fahrtüchtigkeit**, **Begleitung** und Zugang (Platzhalter), **Notfälle** (Praxis, 116 117, 112, Verätzungen) | Sprechzeiten **und** Wichtige Infos, auf einer Seite zusammengefasst |
| `kontakt.html` | Kontaktwege (Telefon, E-Mail, Fax, Anschrift, Sprachen), Lage und **Karte (Zwei-Klick)**, **Parken** (gesperrtes Parkhaus, drei Empfehlungen, acht Parkplätze in Gehweite, **Faltblatt der Stadt als PDF**), Bus, Park-and-Ride und Smile24 | Kontakt |
| `termin.html` | Zwischenseite, solange die Online-Terminbuchung entsteht: Telefonnummer, Sprechzeiten, „Gut zu wissen“ | Termin |
| `impressum.html` | Angaben nach § 5 DDG, heilberufliche Angaben als Platzhalter, § 18 Abs. 2 MStV, Haftung, Bildnachweis und Schriftlizenz | Impressum |
| `datenschutz.html` | Datenschutzerklärung mit Inhaltsverzeichnis, Stand September 2026 | Datenschutz |

Die Seiten „Sprechzeiten“ und „Wichtige Infos“ aus der Seitenstruktur des Auftrags
sind bewusst eine Seite: Beides beantwortet dieselbe Frage („Ich habe einen Termin –
was muss ich wissen?“). Das spart einen Menüpunkt, der Kopf bleibt auf dem Telefon
kurz.

## 3. Farben

Alle Werte sind mit `node TOOLS/kontrast.mjs` gemessen (WCAG 2.2: Text ≥ 4,5:1,
große Schrift und Bedienelemente ≥ 3:1).

| Farbe | Name | Rolle | Gemessener Kontrast |
|---|---|---|---|
| `#17282d` | Tinte | Fließtext | 15,24:1 auf Weiß · 13,65:1 auf Sand · 13,12:1 auf Hellwasser · 13,49:1 auf Hellbackstein |
| `#4c5d62` | Leise | Nebentext, Beschriftungen | 6,89:1 auf Weiß · 6,17:1 auf Sand · 5,93:1 auf Hellwasser |
| `#14505e` | Petrol (Schleiwasser) | Links, Schaltflächen, Logo, Symbole | 8,98:1 auf Weiß · 8,04:1 auf Sand · 7,73:1 auf Hellwasser · Weiß darauf 8,98:1 |
| `#0e3a44` | Tiefwasser | Überschriften, Fußzeile | 12,30:1 auf Weiß · 11,02:1 auf Sand · Weiß darauf 12,30:1 · Sand darauf 11,02:1 |
| `#2f7f88` | Wasser | Wasserlinien im Logo, Listenzeichen, Haken, große Bereichsnummern „01“–„05“ (36 px) | 4,65:1 auf Weiß · 4,17:1 auf Sand · 2,64:1 auf Tiefwasser (dort nur als Zierlinie) |
| `#a2472a` | Backstein | Dachzeilen, Hinweise, Platzhalter, Fokusrahmen | 6,05:1 auf Weiß · 5,42:1 auf Sand · 5,36:1 auf Hellbackstein · 5,21:1 auf Hellwasser · Weiß darauf 6,05:1 |
| `#f2c879` | Bernstein | Titel und Fokusrahmen in der Fußzeile, Fokus auf Petrol | 7,80:1 auf Tiefwasser · 5,69:1 auf Petrol |
| `#f6f2ea` | Sand (Schilf) | ruhige Flächen, Seitenköpfe | Fläche |
| `#e6f0ef` | Hellwasser | Infokästen, „Auf einen Blick“ | Fläche |
| `#faefe9` | Hellbackstein | Hinweiskästen, Platzhalter-Hintergrund | Fläche |
| `#cad9d8`, `#d9cfbd` | Linien | Haarlinien auf Weiß bzw. Sand | nur Schmuck, nie Text |

Keine dieser Farben stammt von der Visitenkarte (`#615e79`, `#89859f`, `#a5a3bb`,
`#c2c3d6`, `#eef0f6`, `#275895`) oder aus der Referenz (`#4b79ce`, `#7bbd64`).

## 4. Schriften

| Schrift | Datei | Einsatz | Lizenz |
|---|---|---|---|
| Atkinson Hyperlegible Next (variabel, 200–800) | `assets/fonts/atkinson-hyperlegible-next-latin-wght-normal.woff2` | Fließtext, Menü, Schaltflächen | SIL Open Font License 1.1 |
| Literata (variabel, 200–900) | `assets/fonts/literata-latin-wght-normal.woff2` | Überschriften, Uhrzeiten und Telefonnummern | SIL Open Font License 1.1 |

Lizenztext: `assets/fonts/OFL.txt`. Beide Dateien liegen lokal, `font-display: swap`,
beide per `preload`. Kleinste Schrift auf der ganzen Website: 18 px, Fließtext 19 px
(ab 768 px 20 px).

**Die Null in Uhrzeiten und Telefonnummern.** Die Atkinson Hyperlegible Next wurde für
Menschen mit Sehschwäche entwickelt und zeichnet die Null mit einem Schrägstrich,
damit sie nicht mit dem Buchstaben „O“ verwechselt wird. In reinen Zahlenangaben wie
„9.00–12.00 Uhr“ oder „04621 / 2 23 50“ gibt es aber nichts zu verwechseln. Dort
bringt der Strich nur Unruhe: Eine einzige Tabellenzeile der Sprechzeiten enthält bis
zu acht Nullen, und bei getrübter Sicht kann die durchgestrichene Null wie eine „8“
oder ein „Ø“ wirken. Deshalb stehen Uhrzeiten (Tabellen, Listen) und alle Telefonnummern in den
Ziffern der Literata, die ohnehin geladen ist: offene, ruhige Ziffern in gleicher
Breite, sodass die Zeiten in den Tabellen bündig stehen. Im Fließtext bleibt die
Atkinson mit ihrer Null: Dort stehen Zahlen zwischen Buchstaben, und genau dafür ist
die Unterscheidung gedacht. Das Vorschaubild (`og-bild.png`) folgt derselben Regel.

## 5. Termin-Ziel

Die Adresse steht in **`quelltext/gemeinsam/website.mjs`** unter **`terminUrl`**
(zurzeit `'termin.html'`). Nach einer Änderung `node quelltext/bauen.mjs` ausführen,
dann zeigen alle Termin-Schaltflächen aller Seiten (Kopf, Startseite, Leistungen,
Sprechzeiten, Kontakt, Fußzeile) auf die neue Adresse.

- Beginnt die Adresse mit `http://` oder `https://`, setzt das Build-Skript an jedem
  Termin-Link automatisch `target="_blank"` und `rel="noopener noreferrer"`; der
  Entwurf ergänzt für Screenreader „(öffnet in neuem Fenster)“.
- Die Adresse wird beim Bauen fest ins HTML geschrieben. Die Schaltfläche funktioniert
  deshalb **ohne JavaScript**.
- Die Zwischenseite `termin.html` bleibt bestehen. Ist die Buchung extern eingetragen,
  zeigt sie zusätzlich die Schaltfläche „Zur Online-Terminbuchung“, und Start- und
  Kontaktseite sprechen von „online oder telefonisch“ statt „telefonisch“.

**Vor dem Umschalten** in `quelltext/gemeinsam/praxis.mjs` unter `rechtliches.terminAnbieter`
den Anbieter eintragen. Sobald `terminUrl` extern ist, stellen sich die Hinweistexte
(Startseite, Sprechzeiten, Beschreibung der Termin-Seite, Datenschutzerklärung) automatisch
auf „online oder telefonisch“ um. In der Datenschutzerklärung erscheint dann der Platzhalter
„[Angaben zur Datenverarbeitung bei der Online-Terminbuchung folgen …]“. Er muss vor dem
Livegang durch die Angaben des Anbieters ersetzt werden (Anbieter, Daten, Rechtsgrundlage,
Speicherdauer).

## 6. Aufbau und Bauen

| Was | Wo |
|---|---|
| Seitenrahmen (Kopf, Navigation, Fußzeile) | `quelltext/03-frei/layout.mjs` |
| Wiederkehrende Bausteine (Symbole, Sprechzeiten, Notfallwege, Seitenkopf) | `quelltext/03-frei/bausteine.mjs` |
| Seiten | `quelltext/03-frei/seiten/01-start.mjs` … `07-datenschutz.mjs` |
| Einstellungen (Titel, Theme-Farbe, Vorschaubild) | `quelltext/03-frei/entwurf.mjs` |
| Praxisdaten, Sprechzeiten, Parken, Karte (gemeinsam für alle Entwürfe) | `quelltext/gemeinsam/praxis.mjs` |
| Stylesheet (mobile first, Stufen 600 / 768 / 1024 / 1280 px) | `entwuerfe/03-frei/assets/css/stil.css` |
| Skript (Menü, heutiger Tag, Karte) | `entwuerfe/03-frei/assets/js/seite.js` |

```sh
cd <Repository>
node quelltext/bauen.mjs 03-frei
```

Erzeugt werden nur die `*.html`, `sitemap.xml` und `robots.txt` in diesem Ordner;
CSS, Skript, Schriften und Grafiken werden hier direkt gepflegt. Sprechzeiten, Telefon
und Adresse stehen nirgends von Hand im Quelltext, sie kommen aus `praxis.mjs`.

**Ohne JavaScript** ist das Menü als Liste immer offen, der Termin-Link und alle Seiten
sind erreichbar, die Karte bleibt als Link zu OpenStreetMap nutzbar. Das Skript
(unter 3 KB) klappt nur das Menü auf dem Telefon ein (Esc schließt, Fokus kehrt
zurück), markiert in den Sprechzeiten-Tabellen den heutigen Tag und lädt auf Wunsch
die Karte.

## 7. Karte und Datenschutz

Auf `kontakt.html` steht zunächst nur eine eigene, abstrakte SVG-Fläche mit einem
kurzen Hinweis. Beim Laden der Seite geht **keine** Anfrage an fremde Server.
Erst ein Klick auf „Karte laden“ setzt das `<iframe>` von OpenStreetMap ein; danach
erscheint der Quellenhinweis „© OpenStreetMap-Mitwirkende“ mit Link. Der Link
„Karte bei OpenStreetMap öffnen“ und die Adresse sind immer sichtbar, auch ohne
JavaScript. Die Zwei-Klick-Lösung gilt auch für OpenStreetMap, weil die Einbettung
die IP-Adresse an die OpenStreetMap Foundation (Vereinigtes Königreich) überträgt.
Keine Cookies, kein `localStorage`, keine Tracker, keine externen Schriften.

## 8. Platzhalter

Die Platzhalter verschwinden automatisch, sobald der Wert in
`quelltext/gemeinsam/praxis.mjs` eingetragen und neu gebaut ist: Kontaktangaben direkt unter
`praxis` (`email`, `fax`, `sprachen`, `barrierefreiheit`), die Angaben für Impressum und
Datenschutz unter `praxis.rechtliches` (`approbation`, `kammer`, `aufsicht`, `berufsordnung`,
`ustid`, `haftpflicht`, `datenschutzbeauftragter`, `hosting`, `speicherdauerLogs`,
`terminAnbieter`). Der Foto-Platzhalter wird durch ein echtes Bild ersetzt.

| Platzhalter | Seite(n) | Benötigte Angabe |
|---|---|---|
| `[Foto folgt: Porträt von Dr. Christoph in der Praxis]` | `index.html` | Porträtfoto der Ärztin (Querformat oder 4 : 5), mit Nutzungsrecht |
| `[E-Mail-Adresse folgt]` | `kontakt.html`, `impressum.html`, `datenschutz.html` | E-Mail-Adresse der Praxis (in `praxis.mjs` → `email`) |
| `[Faxnummer folgt, falls vorhanden]` | `kontakt.html`, `impressum.html` | Faxnummer oder die Aussage, dass es keine gibt (`fax`) |
| `[Gesprochene Sprachen folgen]` | `kontakt.html` | Sprachen in der Praxis |
| `[Angaben zur Barrierefreiheit der Praxisräume folgen]` | `besuch.html` | Stockwerk, Aufzug, Stufen, Parkplatz am Haus |
| `[Staat der Approbation und Verleihung der Berufsbezeichnung folgt]` | `impressum.html` | z. B. „Bundesrepublik Deutschland“ |
| `[Zuständige Ärztekammer folgt]` | `impressum.html` | Name und Anschrift der Kammer |
| `[Zuständige Aufsichtsbehörde folgt]` | `impressum.html` | z. B. Kassenärztliche Vereinigung, Name und Anschrift |
| `[Anwendbare Berufsordnung folgt]` | `impressum.html` | Berufsordnung mit Link |
| `[Umsatzsteuer-Identifikationsnummer folgt, falls vorhanden]` | `impressum.html` | USt-IdNr. oder Streichung des Abschnitts |
| `[Angaben zur Berufshaftpflichtversicherung folgen]` | `impressum.html` | Versicherer, Anschrift, räumlicher Geltungsbereich |
| `[Datenschutzbeauftragte Person folgt, falls benannt]` | `datenschutz.html` | Name und Kontakt oder Streichung des Abschnitts |
| `[Hosting-Anbieter folgt]` | `datenschutz.html` | Name und Sitz des Hosters |
| `[Speicherdauer der Server-Logdateien folgt]` | `datenschutz.html` | Löschfrist der Server-Logdateien beim Hoster |
| `[Anbieter der Online-Terminbuchung folgt]` | `datenschutz.html` | Anbieter, sobald die Buchung steht; dann den Absatz ausbauen |

## 9. Bekannte Einschränkungen und offene Punkte

- **Seitenzuschnitt:** Sprechzeiten und Wichtige Infos teilen sich `besuch.html`
  (siehe Abschnitt 2). Wer die Seitenstruktur der Referenz erwartet, findet
  „Wichtige Infos“ nicht als eigenen Menüpunkt.
- **Leistungen:** Die Geräte-Leistungen (OCT, GDx, Pachymetrie, Nyktometrie,
  YAG-Laser) und das Führerscheingutachten sollte die Ärztin vor dem Livegang
  noch einmal bestätigen (siehe `praxis-briefing/05-leistungen.md`).
- **Stadtsilhouette:** Der Horizont auf der Startseite deutet Schleswig mit einem
  Kirchturm an. Er ist bewusst abstrakt und kein genaues Abbild.
- **Parkplätze:** Die Liste auf `kontakt.html` folgt dem Faltblatt (Stand 18.12.2025).
  Bis zur Eröffnung des neuen Parkhauses (voraussichtlich 2028) kann sich die Lage
  ändern; die Daten stehen gemeinsam in `praxis.mjs`.
- **Stylesheet-Größe:** `stil.css` ist mit rund 35 KB größer als die Vorgabe von
  30 KB. Die Datei ist von Hand geschrieben, lesbar formatiert und deutsch kommentiert;
  mit gzip, wie GitHub Pages sie ausliefert, werden rund 9 KB übertragen. Wer die
  Grenze streng einhalten will, müsste Kommentare entfernen oder die Datei verkleinern.
- **Sprechzeiten auf dem Telefon:** `besuch.html` enthält die große Sprechzeiten-Tabelle
  in zwei Fassungen: bis 600 px „Tag | Zeiten untereinander“, darüber „Tag | Vormittag |
  Nachmittag“. Es ist immer nur eine sichtbar (`display: none`), Screenreader lesen
  deshalb keine Dopplung vor. Beide entstehen aus `praxis.mjs`.
- **Container-Abfrage:** Die Sprechzeiten-Liste stapelt Tag und Zeiten in sehr
  schmalen Spalten per `@container`. Sehr alte Browser (vor 2023) zeigen stattdessen
  die zweispaltige Form, die dann bei 320 px knapp wird.
- **Vorschau-Indexierung:** Solange `indexierbar: false` in
  `quelltext/gemeinsam/website.mjs` steht, trägt jede Seite `noindex`.

## 10. Logo und Farbschema – Begründung

**Das Logo** ist eine liegende Mandelform, also ein offenes Auge in einer einzigen,
kräftigen Linie. Die Iris ist nur zur oberen Hälfte gezeichnet und steht auf einer
Linie wie eine Sonne über dem Wasser; darunter folgen zwei kürzer werdende Streifen.
Sie lassen sich als Spiegelung auf der Schlei lesen und ebenso als die kleiner
werdenden Zeilen einer Sehprobentafel. Der helle Punkt in der Iris ist der
Lichtreflex, der ein Auge lebendig wirken lässt. Damit erzählt die Marke in drei
Formen Fach, Ort und Tätigkeit, ohne Schnörkel. Sie besteht nur aus Flächen und einer
Linie, funktioniert einfarbig und bleibt als Favicon bei 16 px als Auge erkennbar.

| Datei | Zweck |
|---|---|
| `assets/logo/logo-marke.svg` | Bildmarke in Petrol und Wasser (Kopfzeile) |
| `assets/logo/logo-marke-mono.svg` | einfarbig über `currentColor` (Fußzeile, inline eingebunden) |
| `assets/logo/logo-icon.svg` | kompaktes Icon auf Petrol-Grund (Favicon, App-Symbol) |
| `assets/logo/logo-wortmarke.svg` | Marke mit Namenszug, Text in Pfade umgewandelt (Briefkopf, Schild) |

**Das Farbschema** kommt aus derselben Idee. Petrol und Tiefwasser sind das
Schleiwasser: dunkel genug für sehr hohe Kontraste (bis 12:1), ruhig und seriös,
dabei wärmer als ein Klinikblau. Der Sandton der Flächen erinnert an Schilf und
Uferwege und nimmt der Seite die Härte von reinem Weiß in großen Flächen.
Backsteinrot ist die Farbe der Schleswiger Altstadt und wird sparsam für alles
eingesetzt, was Aufmerksamkeit braucht. Bernstein dient nur auf dunklem Grund als
Akzent und Fokusfarbe. So bleibt die Seite freundlich und hell, ohne bunt zu werden,
und jede Farbe hat genau eine Aufgabe.
