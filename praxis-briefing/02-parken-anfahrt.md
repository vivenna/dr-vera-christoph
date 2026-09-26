# 02 – Parken & Anfahrt

Die Ärztin möchte einen **Parkplatzhinweis** auf der Website. Grundlage ist das
offizielle Faltblatt der Stadt Schleswig:
`quellen/parkplatz-faltblatt-schleswig-2025-12-18.pdf`
(Herausgeber: Stadt Schleswig – Der Bürgermeister, Rathausmarkt 1, Stand 18.12.2025)

> **Warum das Thema gerade wichtig ist:** Das städtische Parkhaus in der
> Innenstadt **und der ZOB sind seit Mitte Januar 2026 gesperrt** und werden
> abgerissen. Rund **500 Parkplätze fallen währenddessen weg**. Der Neubau mit
> ca. 520 Plätzen soll erst **2028** in Betrieb gehen. Patientinnen und Patienten
> brauchen deshalb konkrete Alternativen – ein Satz „Parkplätze finden Sie in der
> Nähe" reicht nicht.

---

## Lage der Praxis

Die Praxis liegt in der **Plessenstraße 13**, mitten in der Schleswiger Altstadt,
zwischen **Stadtweg** (Fußgängerzone/Ladenstraße) im Norden und **Königstraße**
im Süden. Auf der Karte des Faltblatts verläuft die Plessenstraße senkrecht
durch die Bildmitte.

---

## Parkplätze in Gehweite (aus dem Faltblatt)

Sortiert nach Nähe zur Plessenstraße 13. Die Nummern entsprechen denen auf der
offiziellen Karte.

| Nr. | Name | Adresse | Art |
|---|---|---|---|
| **P4** | ID Sievers | Schwarzer Weg 10 | Kundenparken |
| **P5** | alte Feuerwache | Königstraße 16 | Kurzzeitparken |
| **P3** | SchleiCenter | Schwarzer Weg 16–18 | Kurzzeitparken |
| **P20** | Amalienplatz / Am Kornmarkt | Michaelisstr. 6 & Faulstr. 7 | Kurzzeitparken |
| **P13** | Kleiner Baumhofsgang I | Kleiner Baumhofsgang 7–9 | Dauerparken |
| **P14** | Kleiner Baumhofsgang II | Kleiner Baumhofsgang 4–10 | Dauerparken |
| **P15** | alter Kreisbahnhof | Wiesenstraße 8 | Kurzzeitparken |
| **P15a** | VR-Bank Nord | Wiesenstraße 8 | Kurzzeitparken |
| **P11** | Klosterhofer Straße | Klosterhofer Straße 3 | Dauerparken |
| **P12** | Gallberg | Gallberg 10 | Dauerparken |
| **P16** | Rathaus | Rathausmarkt 1 | Dauerparken |
| **P6** | GEWOBA-Parkhaus (überdacht, E-Ladesäulen) | Moltkestraße 34 | Dauerparken |
| **P1** | altes Theater | Theaterstraße 1 | Dauerparken |
| **P2** | Königswiesen | Strandweg 3 | Kurzzeitparken |

**Kategorien laut Faltblatt:** Dauerparken · Kurzparken (2 h kostenfrei) ·
Kundenparken · Parken nach Geschäftsschluss · Parken kostenpflichtig.
Das neue digitale Parkleitsystem führt zu freien Plätzen; die Nutzung ist
**häufig für mindestens zwei Stunden kostenfrei**.

---

## Öffentlich & Park-and-Ride

- **Park & Ride:** Große Flächen am **Stadtfeld**, am **Schleihallen-Parkplatz**
  (an der Shell-Tankstelle) und am **Theaterparkplatz**.
  Buslinien fahren im **15-Minuten-Takt** in die Innenstadt,
  Haltestelle **Capitolplatz**. Einzelfahrschein oder Deutschlandticket genügt.
- **Smile24** (`smile24.nah.sh`): Bus, Shuttle und Bike auf Abruf per App
  in der gesamten Schleiregion, Deutschlandticket gilt.
- **Weitere Infos der Stadt:** `www.ladenstrasse-schleswig.de`
- **GEWOBA-Parkhaus:** `www.gewoba-nord.de/parkhaus`

---

## Formulierungsvorschlag für die Website

Kurzfassung für eine Info-Box auf „Kontakt" oder „Anfahrt":

> **Mit dem Auto**
> In unmittelbarer Nähe der Praxis stehen mehrere Parkplätze zur Verfügung –
> u. a. am **SchleiCenter** (Schwarzer Weg 16–18) und an der
> **alten Feuerwache** (Königstraße 16), beide mit zwei Stunden kostenfreiem
> Kurzzeitparken. Für längere Aufenthalte eignet sich das überdachte
> **GEWOBA-Parkhaus** in der Moltkestraße 34.
>
> **Bitte beachten:** Das städtische Parkhaus in der Innenstadt ist wegen
> Umbaus geschlossen. Die Stadt Schleswig hat alle Alternativen in einem
> Faltblatt zusammengestellt: `→ Link auf das PDF einsetzen`
>
> **Mit Bus & Bahn**
> Haltestelle **Capitolplatz**, von den Park-and-Ride-Plätzen Stadtfeld,
> Schleihallen und Theater alle 15 Minuten erreichbar.

---

## Umsetzungshinweise

1. **Das PDF mitliefern.** Es ist die offizielle Quelle und enthält die Karte.
   Als Download verlinken (`praxis-briefing/quellen/…` später nach `assets/`
   verschieben) und Herausgeber + Stand nennen.
2. **Nicht abschreiben, sondern verlinken.** Die Parkplatzlage ändert sich bis
   2028 mehrfach. Ein kurzer eigener Text plus Link auf
   `ladenstrasse-schleswig.de` bleibt länger aktuell als eine lange Tabelle.
3. **Karte einbetten** – aber wie in der Referenz mit vorgeschaltetem
   Einwilligungs-Platzhalter, sonst fließen Daten ohne Zustimmung zu Google.
   Alternative ohne Einwilligungsproblem: **OpenStreetMap** statt Google Maps.
   Das Faltblatt selbst nutzt OSM (© OpenStreetMap contributors).
4. **Datum sichtbar machen.** „Stand: Dezember 2025" o. ä., damit klar ist,
   wie aktuell die Angaben sind.
5. **Urheberrecht:** Die Karte aus dem Faltblatt ist ein Werk der Stadt Schleswig
   auf OSM-Basis. Vor einer Übernahme als Bild die Nutzung mit der Stadt klären –
   ein Link auf das PDF ist unkritisch.
