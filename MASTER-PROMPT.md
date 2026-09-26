# Master-Prompt: Drei Website-Entwürfe für die Augenarztpraxis Dr. med. Vera Christoph

## Deine Aufgabe

Entwirf und baue **drei vollständige, eigenständige Website-Entwürfe** für die
Augenarztpraxis von Dr. med. Vera Christoph in Schleswig. Die Ärztin soll sich
anschließend für einen Entwurf entscheiden können.

Die drei Entwürfe unterscheiden sich darin, **wie nah sie an einer Referenzseite
liegen**, die der Ärztin gefällt. Inhaltlich sind alle drei gleichwertig: gleiche
Seiten, gleiche Fakten, gleiche Vorgaben.

---

## Grundregel: Alles auf Deutsch

**Sämtliche Ausgaben sind auf Deutsch.** Das gilt für alle Website-Texte, alle
Dateien, die du schreibst, alle Kommentare im Code, alle Commit-Nachrichten und
alle Erklärungen, die du mir gibst.

Die Ärztin hat ausdrücklich vorgegeben: Die fertige Website wird **ausschließlich
deutschsprachig**. Es gibt **keine** englische Fassung, **keinen** Sprachumschalter
und **keinen** `/en/`-Ordner — auch dann nicht, wenn die Referenzseite so etwas hat.

Technische Bezeichner im Code (Klassennamen, Variablen, Dateinamen) dürfen dem
üblichen englischen Konventionen folgen, wenn das sinnvoller ist. Alles, was ein
Mensch liest, ist Deutsch.

---

## Die Faktengrundlage — zuerst lesen

Im Projekt liegt ein fertig aufbereitetes Briefing. **Lies es vollständig, bevor
du irgendetwas baust.** Es enthält alle gesicherten Fakten; du musst nichts davon
neu recherchieren.

| Datei | Inhalt |
|---|---|
| `praxis-briefing/README.md` | Einstieg und Überblick |
| `praxis-briefing/01-stammdaten.md` | Name, Adresse, Telefon, Sprechzeiten, fertiges schema.org-Snippet |
| `praxis-briefing/02-parken-anfahrt.md` | Parkplätze in Schleswig, ÖPNV, fertiger Textvorschlag |
| `praxis-briefing/03-online-recherche.md` | Was im Netz über die Praxis steht, Bewertungslage |
| `praxis-briefing/04-offene-fragen.md` | Was die Ärztin noch nicht beantwortet hat |
| `praxis-briefing/05-leistungen.md` | Das Leistungsspektrum, von der Ärztin bestätigt |
| `praxis-briefing/quellen/` | Originalquellen: Visitenkarte und Parkplatz-Faltblatt |

**`praxis-briefing/quellen/` ist unveränderlich.** Das sind die Originaldateien
der Ärztin. Lies sie, aber bearbeite, verschiebe oder lösche sie nicht.

### Die wichtigsten Eckdaten auf einen Blick

```
Dr. med. Vera Christoph
Fachärztin für Augenheilkunde
Plessenstraße 13, 24837 Schleswig
Telefon: 04621 / 2 23 50        →  tel:+49462122350

Sprechzeiten
  Montag       9.00–12.00 Uhr   und  14.00–16.00 Uhr
  Dienstag     9.00–12.00 Uhr   und  15.00–17.00 Uhr
  Mittwoch     9.00–12.00 Uhr
  Donnerstag   9.00–12.00 Uhr   und  15.00–17.00 Uhr
  Freitag      9.00–12.00 Uhr
  sowie nach Vereinbarung
```

### Die Referenzseite

Der Ordner `inspiration-augenpraxis-mitte/` enthält die vollständige Referenzseite
(augenpraxis-mitte.de), die der Ärztin gefällt. Der Ordner
`inspiration-konzept-analyse/` enthält eine fertige, ausführliche Analyse von
Aufbau, Design-System, Komponenten und Technik dieser Seite. **Lies beides.**

> **Achtung:** Beide `inspiration-*`-Ordner stehen in der `.gitignore` und landen
> **nicht** auf GitHub Pages. Kein Entwurf darf auf Dateien aus diesen Ordnern
> verweisen. Sie sind reines Recherchematerial für dich.

---

## Die drei Entwürfe

Lege sie unter `entwuerfe/` an. Jeder Entwurf ist **vollständig eigenständig** und
funktioniert ohne die beiden anderen.

### Entwurf 1 — `entwuerfe/01-nah-an-referenz/`

**Sehr nah an der Referenzseite.** Wer beide nebeneinander sieht, erkennt sofort
die Verwandtschaft. Übernimm bewusst:

- den zweiteiligen Kopf: schmaler Infostreifen oben, darunter die schwebende
  Navigation als „Pille" mit kräftiger Kontur und großem Eckradius
- die fünf Hauptseiten und ihre Reihenfolge
- die luftige, weiße Anmutung mit großen, fetten Überschriften
- die Leistungsseite als wiederkehrende Zweispalten-Blöcke (Titel und Grafik
  links, Liste rechts)
- die schlichte Sprechzeiten-Tabelle mit dünnen Linien
- den farbigen Footer mit Claim, Termin-Schaltfläche, Kontakt, Sprechzeiten
  und Rechtslinks
- die vollbreite Kartensektion mit vorgeschaltetem Einwilligungs-Platzhalter

**Aber:** Farben kommen aus dem Logo von Dr. Christoph, nicht aus der Referenz.
Struktur und Layout übernehmen, Farbwelt anpassen. Und die Texte formulierst du
neu — nicht abschreiben (siehe „Nicht wortgleich übernehmen" weiter unten).

Behebe außerdem die Schwächen, die in `inspiration-konzept-analyse/` dokumentiert
sind: aktive Seite in der Navigation markieren, genau eine `<h1>` pro Seite,
Schriften selbst hosten, auf Mobilgeräten keine Inhalte verstecken.

### Entwurf 2 — `entwuerfe/02-eigenstaendig/`

**Erkennbar verwandt, aber eigenständig.** Die Grundhaltung bleibt — ruhig, hell,
seriös, gut lesbar, sachlich strukturiert. Die konkrete Umsetzung ist deine.

Denk dir eine **eigene Navigationslösung** aus (die Pille bleibt Entwurf 1
vorbehalten), ein **eigenes Raster**, eine **eigene Art, die Leistungen zu
gliedern**, einen **eigenen Footer**. Die Ärztin soll beim Vergleich merken:
„Das ist dieselbe Handschrift, aber anders gelöst."

Auch hier: Farben aus dem vorhandenen Logo.

### Entwurf 3 — `entwuerfe/03-frei/`

**Völlig freie Gestaltung.** Keine Anleihen bei der Referenz nötig. Eigene
Bildsprache, eigenes Raster, eigene Struktur — du darfst auch die Seitenaufteilung
anders schneiden, solange alle Pflichtinhalte vorkommen.

Für diesen Entwurf gilt zusätzlich:

- **Entwirf ein komplett neues Logo.** Es muss zu einer Augenarztpraxis passen
  und als SVG umgesetzt sein, in denselben Ausbaustufen wie das vorhandene
  (Marke, einfarbige Fassung, kompaktes Icon fürs Favicon). Ob es wieder ein
  Auge zeigt, entscheidest du.
- **Entwirf ein eigenes Farbschema**, passend zu deinem neuen Logo. Nicht die
  Farben der Visitenkarte, nicht die der Referenz.
- Dokumentiere kurz, warum du dich so entschieden hast.

---

## Harte Vorgaben — gelten für alle drei Entwürfe

Diese Punkte sind nicht verhandelbar. Sie kommen von der Ärztin oder ergeben sich
aus der Recherche.

### 1. Parkhinweis

In **jedem** Entwurf muss ein Hinweis zu den Parkmöglichkeiten vorkommen. Wo genau,
entscheidest du (Kontaktseite, Anfahrtsbereich, eigene Sektion). Grundlage ist
`praxis-briefing/02-parken-anfahrt.md`, dort steht auch ein fertiger Textvorschlag.

Hintergrund, der das wichtig macht: Das städtische Parkhaus in der Innenstadt ist
seit Januar 2026 gesperrt, rund 500 Plätze fallen bis 2028 weg. Für Patienten ist
das eine echte Information, kein Beiwerk.

Wenn du das Faltblatt der Stadt zum Download anbietest, **kopiere die PDF in den
jeweiligen Entwurfsordner**, damit der Entwurf eigenständig bleibt. Nenne
Herausgeber (Stadt Schleswig) und Stand (18.12.2025).

### 2. Leistungen

Übernimm das Leistungsspektrum aus `praxis-briefing/05-leistungen.md` — 53 Punkte
in fünf Blöcken. Die Ärztin hat bestätigt, dass sie **genau diese Leistungen**
anbietet, dieselben wie die Referenzpraxis.

**Nicht wortgleich übernehmen.** Gliederung und Reihenfolge dürfen bleiben, die
Formulierungen variierst du. Sonst entsteht doppelter Inhalt gegenüber der
Referenzseite, was beiden Seiten bei Google schadet. Das gilt genauso für den
Einleitungstext der Leistungsseite.

### 3. Logo

- **Entwürfe 1 und 2** verwenden die fertigen Dateien aus `logo/` unverändert.
  Eine Übersicht mit allen Varianten und den gemessenen Farbwerten findest du in
  `logo/logo.html`. Kopiere die benötigten SVGs in den jeweiligen Entwurfsordner,
  damit er eigenständig bleibt.
- **Entwurf 3** bekommt ein neues, eigenes Logo (siehe oben).

Verfügbare Varianten in `logo/`:

| Datei | Zweck |
|---|---|
| `logo-aquarell.svg` | getreuer Nachbau des Visitenkarten-Auges, für große Flächen |
| `logo-marke.svg` | reduzierte Fassung für die Kopfzeile |
| `logo-wortmarke.svg` | Marke mit Namenszug |
| `logo-marke-mono.svg` | einfarbig über `currentColor`, für Footer und Wasserzeichen |
| `logo-icon.svg` | kompaktes Icon fürs Favicon |

Markenfarben aus dem Logo: Tinte `#615e79`, Wimpern `#89859f`, Irisring `#a5a3bb`,
Iris `#c2c3d6`, Lederhaut `#eef0f6`, Schriftblau `#275895`.

### 4. Termin-Schaltfläche

Jeder Entwurf hat eine gut sichtbare Termin-Schaltfläche auf **jeder** Seite.

Die Online-Terminbuchung der Praxis wird gerade gebaut und läuft später auf einer
**anderen Domain** — also ein externer Link. Bis dahin führt die Schaltfläche auf
eine **eigene Zwischenseite** innerhalb des Entwurfs (z. B. `termin.html`), die
freundlich erklärt, dass die Online-Buchung gerade entsteht, und die
Telefonnummer als Alternative nennt.

Setz das so um, dass sich das Ziel später mit **einer** Änderung umstellen lässt:
Die Ziel-Adresse steht an genau einer zentralen, dokumentierten Stelle. Die Seite
muss aber auch **ohne JavaScript** funktionieren — das `href` im HTML zeigt also
schon auf die Zwischenseite, ein Skript darf es höchstens überschreiben.
Wenn später auf die externe Domain umgestellt wird, gehören
`target="_blank"` und `rel="noopener noreferrer"` dazu.

Halte in der README des Entwurfs fest, wo genau diese Stelle ist.

### 5. Kein Bewertungsbereich

Die Referenzseite hat einen Rezensions-Slider. **Baue so etwas nicht ein** — weder
eigene Zitate noch ein Google-Bewertungs-Widget.

Grund: Über die Praxis existieren online nur zwei Bewertungen, beide negativ. Ein
Bewertungsbereich würde das sichtbar machen statt Vertrauen zu schaffen. Vertrauen
entsteht hier über klare Informationen: verlässliche Sprechzeiten, ein
persönlicher Text, transparente Abläufe, gute Erreichbarkeit.

### 6. Nichts erfinden, was es nicht gibt

Diese Angaben sind **unbekannt** und dürfen nicht ausgedacht werden:

- **E-Mail-Adresse** der Praxis — steht nicht auf der Visitenkarte
- **Faxnummer**
- gesprochene Sprachen, Teamgröße, Namen von Mitarbeitenden
- Angaben zur Barrierefreiheit der Räume
- Kammer-, Aufsichts- und Steuerangaben fürs Impressum

Setz dort klar erkennbare Platzhalter ein (z. B. `[E-Mail-Adresse folgt]`) und
liste am Ende auf, was noch gebraucht wird.

Bei medizinischen Aussagen bleibst du bei dem, was in `05-leistungen.md` steht.
Erfinde keine Behandlungen, keine Erfolgsquoten, keine Heilsversprechen
(Heilmittelwerbegesetz).

Alles andere — Begrüßungstexte, Praxisbeschreibung, Hinweise für Patienten — darfst
du normal und plausibel ausformulieren. Es ist ein Entwurf, nichts geht live, bevor
die Ärztin es freigibt. Schreib also fertige, gut lesbare Praxistexte, keine
Lorem-Ipsum-Füllsel und keine Entwurfsmarkierungen im Text.

### 7. Datenschutz

- **Keine Schriften vom Google-Fonts-CDN.** Schriften werden als `woff2` lokal
  mitgeliefert. Das war ein Mangel der Referenzseite.
- Keine externen Skripte, keine Tracker, kein Analytics.
- **Karte:** entweder OpenStreetMap (datenschutzfreundlich, keine Einwilligung
  nötig) oder Google Maps mit vorgeschaltetem Einwilligungs-Platzhalter wie in der
  Referenz. OpenStreetMap ist die bessere Wahl; das Faltblatt der Stadt nutzt sie
  ebenfalls.
- Impressum und Datenschutzerklärung als eigene Seiten anlegen, mit deutlich
  markierten Platzhaltern für die fehlenden Angaben.

---

## Gestaltung

### Haltung: schlicht und solide

Das ist eine kleine Augenarztpraxis in Schleswig, kein Tech-Startup. Die Entwürfe
sollen **normale, saubere, seriöse Websites** sein. Sie müssen niemanden vom
Stuhl hauen.

Verzichte auf: aufwendige Scroll-Animationen, Parallax, Glasmorphismus,
Farbverläufe über den ganzen Bildschirm, automatisch spielende Videos,
Cursor-Effekte, überladene Hover-Spielereien.

Setz stattdessen auf: klare Typografie, großzügige Weißräume, ruhige Flächen,
gut erkennbare Schaltflächen, eine Navigation, die man sofort versteht.

### Barrierefreiheit — hier besonders wichtig

Die Besucher dieser Seite sind Augenpatienten. Ein Teil von ihnen sieht schlecht.
Das ist kein Nebenaspekt, sondern eine Kernanforderung:

- Fließtext mindestens **18 px**, besser 19–20 px. Keine 14-px-Texte.
- Kontrastverhältnis mindestens **4,5:1** für Text, 3:1 für große Schrift und
  Bedienelemente. Prüf das, schätz es nicht.
- Klickflächen mindestens **44 × 44 px**.
- Sichtbarer Fokusrahmen bei Tastaturbedienung, nirgends `outline: none` ohne
  Ersatz.
- Semantisches HTML: echte Überschriftenhierarchie, `<nav>`, `<main>`, `<footer>`,
  Tabellen mit `<th>`, Formularfelder mit `<label>`.
- Alternativtexte für alle Grafiken, die Inhalt tragen; dekorative Grafiken
  bekommen `alt=""`.
- Die Seite muss sich bis 200 % zoomen lassen, ohne dass Inhalt verloren geht.
- Funktioniert vollständig mit der Tastatur.

### Bilder: ausschließlich eigene SVG-Grafiken

Die Praxis hat keine eigenen Fotos, und Stockfotos bringen Lizenzfragen mit sich.
Deshalb:

- Alle Grafiken und Symbole baust du **selbst als SVG**, im Stil des jeweiligen
  Logos.
- Keine Fotos, keine Bilddatenbanken, keine externen Grafiken.
- Wo später ein echtes Praxisfoto hinkommen soll, setzt du einen dezent
  markierten Platzhalter mit kurzer Beschreibung, was dort hingehört.

Das hat nebenbei den Vorteil, dass die Seiten sehr schnell laden.

### Responsiv, mobile first

- **Mobile first** entwickeln: Grundstil für kleine Bildschirme, per
  `min-width`-Media-Queries erweitern. Das hält das ausgelieferte CSS klein.
- Drei Stufen bedienen: Telefon, Tablet, Desktop.
- **Auf dem Desktop muss es ebenfalls sehr gut aussehen** — kein hochskaliertes
  Telefonlayout. Nutz die Breite sinnvoll, begrenz Textspalten auf angenehme
  Zeilenlängen (etwa 65–75 Zeichen).
- Keine horizontale Scrollleiste, bei keiner Breite.
- Seitlicher Abstand von mindestens 16 px auf dem Telefon.

---

## Technik

### GitHub Pages ist das Ziel

Das Ergebnis muss ich **ohne Nacharbeit auf GitHub Pages hosten** können. Daraus
folgt:

- Am Ende müssen **statische Dateien** im Repository liegen. Ob du sie direkt
  schreibst oder mit einem Build-Werkzeug erzeugst, ist mir gleich — aber das
  **fertige Ergebnis muss eingecheckt** und direkt auslieferbar sein.
- Wenn du ein Build-Werkzeug einsetzt: dokumentiere den Befehl, und lege die
  gebaute Ausgabe mit ab.
- **Nur relative Pfade.** Die Seite läuft unter
  `benutzername.github.io/repo-name/entwuerfe/01-nah-an-referenz/`, also niemals
  Pfade mit führendem `/`.
- Kein serverseitiger Code, keine Datenbank, keine API-Schlüssel.
- Beachte, dass die `inspiration-*`-Ordner nicht mit veröffentlicht werden.

### Performance und SEO

Gute Ladezeiten sind ausdrücklich gewünscht, auch wegen der Suchmaschinen.

- Kein Framework, kein jQuery. Wenn JavaScript nötig ist: wenig, eigenes, ohne
  Abhängigkeiten.
- Die Seite muss **ohne JavaScript grundsätzlich nutzbar** sein. JavaScript
  verbessert, es trägt nicht.
- Schriften: `woff2`, lokal, `font-display: swap`, die wichtigste Schnittzeile
  per `preload`. Beschränke dich auf zwei Schriftschnitte, wenn es geht.
- CSS schlank halten; kritisches CSS darf inline stehen.
- SVGs vor dem Einbinden aufräumen (unnötige Metadaten raus).
- Jede Seite braucht: sprechenden `<title>`, `<meta name="description">`,
  `lang="de"`, Open-Graph-Angaben, `canonical`.
- Genau **eine `<h1>` pro Seite**.
- `sitemap.xml` und `robots.txt` pro Entwurf.
- Strukturierte Daten als JSON-LD: Das fertige `Physician`-Snippet steht in
  `praxis-briefing/01-stammdaten.md`, Abschnitt „Strukturierte Daten".
- Favicon in mehreren Größen aus dem jeweiligen Icon-SVG.

Richtwert: Lighthouse solide im grünen Bereich, Barrierefreiheit möglichst bei 100.
Perfektion ist nicht gefordert, offensichtliche Schnitzer sollen aber weg sein.

---

## Seitenstruktur

Vorschlag in Anlehnung an die Referenz. Entwürfe 1 und 2 halten sich daran,
Entwurf 3 darf anders schneiden, solange alle Inhalte vorkommen:

| Seite | Inhalt |
|---|---|
| Startseite | Begrüßung, Kurzvorstellung, Sprechzeiten auf einen Blick, Weg zur Praxis, Termin-Hinweis |
| Leistungen | die fünf Blöcke aus `05-leistungen.md` |
| Sprechzeiten | die Tabelle, Hinweis „sowie nach Vereinbarung", Erreichbarkeit |
| Wichtige Infos | was mitzubringen ist, Hinweise zur Fahrtüchtigkeit nach Pupillenerweiterung, Begleitperson, Notfälle |
| Kontakt | Kontaktwege, Anfahrt, **Parkhinweis**, Karte |
| Termin | die Baustellen-Zwischenseite |
| Impressum | Pflichtangaben mit Platzhaltern |
| Datenschutz | Datenschutzerklärung mit Platzhaltern |

---

## Deine Freiheiten

- **Recherchier so viel du willst.** Wenn dir Informationen fehlen oder du wissen
  willst, wie vergleichbare Augenarztpraxen ihre Seiten aufbauen — such danach.
- **Du darfst das Projekt umstrukturieren**, Ordner anlegen, Dateien verschieben,
  gemeinsame Bausteine auslagern. Einzige Ausnahme: `praxis-briefing/quellen/`
  bleibt unangetastet, und `logo/` bleibt als Original erhalten (kopieren statt
  verschieben).
- **Sei kreativ**, besonders bei Entwurf 3. Innerhalb der oben genannten Haltung
  („schlicht und solide") hast du freie Hand.
- Wenn du unterwegs merkst, dass eine meiner Vorgaben für die Praxis unklug ist,
  sag es mir, statt sie stillschweigend zu übergehen.

---

## Was du abliefern sollst

1. **Die drei Entwürfe** unter `entwuerfe/01-nah-an-referenz/`,
   `entwuerfe/02-eigenstaendig/` und `entwuerfe/03-frei/`, jeweils eigenständig
   lauffähig.

2. **Eine Übersichtsseite** als `index.html` im Projektstamm, die die drei
   Entwürfe kurz vorstellt und verlinkt. Damit kann die Ärztin auf GitHub Pages
   direkt zwischen ihnen wechseln und vergleichen. Auch diese Seite: schlicht,
   deutsch, responsiv.

3. **Pro Entwurf eine `README.md`** mit:
   - der Gestaltungsidee in zwei, drei Sätzen
   - den verwendeten Farben und Schriften
   - der Stelle, an der die Termin-Ziel-Adresse hinterlegt ist
   - einer Liste der gesetzten Platzhalter
   - bei Entwurf 3 zusätzlich: Begründung für Logo und Farbschema

4. **Eine kurze Schlussmeldung an mich** mit:
   - was du gebaut hast und worin sich die drei Entwürfe unterscheiden
   - was du erfunden bzw. als Platzhalter gesetzt hast
   - was die Ärztin noch liefern muss, bevor etwas live gehen kann
   - allem, was dir aufgefallen ist und wovon ich wissen sollte

---

## Zum Schluss: prüf deine Arbeit

Bevor du fertig meldest, geh die Entwürfe selbst durch:

- Öffnen alle Seiten? Funktionieren alle internen Links?
- Stimmen die Sprechzeiten auf jeder Seite mit der Visitenkarte überein?
- Ist der Parkhinweis in allen drei Entwürfen vorhanden?
- Funktioniert jede Seite auf Telefonbreite ohne horizontales Scrollen?
- Ist die Navigation mit der Tastatur bedienbar, mit sichtbarem Fokus?
- Sind alle Pfade relativ, damit es im Unterordner auf GitHub Pages läuft?
- Steht irgendwo eine erfundene E-Mail-Adresse oder Faxnummer? (Darf nicht sein.)
- Ist wirklich alles auf Deutsch?

Melde ehrlich, was nicht klappt — lieber ein offener Punkt als eine stille Lücke.
