# 01 – Stammdaten der Praxis

Alle Angaben stammen von der **Visitenkarte** (`quellen/visitenkarte-vera-christoph.jpg`)
und wurden gegen mehrere Arztverzeichnisse geprüft. Die Visitenkarte ist die
führende Quelle – die Ärztin hat ausdrücklich gesagt, dass die Online-Angaben
teilweise veraltet sind.

> **Stand der Prüfung:** 26.09.2026

---

## Kontakt

| Feld | Wert | Quelle |
|---|---|---|
| Name | **Dr. med. Vera Christoph** | Visitenkarte |
| Titel/Zusatz | Fachärztin für Augenheilkunde | Visitenkarte |
| Straße | Plessenstraße 13 | Visitenkarte, alle Verzeichnisse |
| PLZ / Ort | 24837 Schleswig | Visitenkarte, alle Verzeichnisse |
| Telefon | 04621 / 2 23 50 | Visitenkarte |
| Telefon (international) | +49 4621 22350 | abgeleitet |
| Telefax | **unbekannt – erfragen** | – |
| E-Mail | **unbekannt – erfragen** | – |
| Website | existiert bisher nicht | Recherche |

> Auf der Visitenkarte steht **keine** E-Mail-Adresse und **kein** Fax.
> Beides muss vor dem Livegang erfragt werden – eine Kontaktseite ohne
> E-Mail wirkt unvollständig. Siehe [03-online-recherche.md](03-online-recherche.md).

---

## Sprechzeiten

So stehen sie auf der Visitenkarte:

```
Sprechzeiten
Montag – Freitag          9.00 – 12.00 Uhr
Montag                   14.00 – 16.00 Uhr
Dienstag und Donnerstag  15.00 – 17.00 Uhr
und nach Vereinbarung
```

Aufgelöst als Tabelle – so gehört es auf die Website:

| Wochentag | Vormittag | Nachmittag |
|---|---|---|
| Montag | 9.00 – 12.00 Uhr | 14.00 – 16.00 Uhr |
| Dienstag | 9.00 – 12.00 Uhr | 15.00 – 17.00 Uhr |
| Mittwoch | 9.00 – 12.00 Uhr | — |
| Donnerstag | 9.00 – 12.00 Uhr | 15.00 – 17.00 Uhr |
| Freitag | 9.00 – 12.00 Uhr | — |

… **sowie nach Vereinbarung.**

**Wichtig:** Diese Aufschlüsselung deckt sich exakt mit den Angaben auf Doctolib,
docinsider, qimeda und portal-der-augenmedizin. Die Online-Zeiten sind also
inhaltlich korrekt. Wenn die Ärztin sagt, die Angaben seien veraltet, meint sie
vermutlich etwas anderes (z. B. Urlaub, Vertretung oder eine geplante Änderung)
– **das bitte gezielt nachfragen**, siehe [04-offene-fragen.md](04-offene-fragen.md).

---

## Was auf der Visitenkarte **nicht** steht

Alles Folgende fehlt noch und muss von der Ärztin kommen, bevor die Seite live geht:

- E-Mail-Adresse und Fax
- Gesprochene Sprachen
- Leistungsspektrum (welche Untersuchungen, welche IGeL)
- Angaben zum Team
- Terminbuchungssystem (Telefon? Doctolib? anderes?)
- Barrierefreiheit der Praxisräume, Aufzug, Parkmöglichkeit am Haus
- Angaben fürs Impressum: zuständige Ärztekammer, Approbationsstaat,
  Berufsbezeichnung + Verleihungsstaat, Aufsichtsbehörde (KV Schleswig-Holstein),
  Berufsordnung, ggf. USt-IdNr.
- Datenschutz: Verantwortliche Stelle, ggf. Datenschutzbeauftragter

---

## Wortlaut für die Website (Vorschlag)

Direkt verwendbar, sobald die Ärztin bestätigt:

**Praxisname:** Augenarztpraxis Dr. med. Vera Christoph
**Untertitel:** Fachärztin für Augenheilkunde · Schleswig
**Adresse einzeilig:** Plessenstraße 13, 24837 Schleswig
**Telefon-Link:** `tel:+49462122350`
**Anzeige der Nummer:** 04621 / 2 23 50 (wie auf der Visitenkarte)

---

## Strukturierte Daten (schema.org)

Für die SEO der neuen Seite – Werte sind bereits eingesetzt, `email` und
`openingHours` bei Bedarf anpassen:

```json
{
  "@context": "https://schema.org",
  "@type": "Physician",
  "name": "Dr. med. Vera Christoph – Fachärztin für Augenheilkunde",
  "medicalSpecialty": "Ophthalmologic",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Plessenstraße 13",
    "postalCode": "24837",
    "addressLocality": "Schleswig",
    "addressRegion": "Schleswig-Holstein",
    "addressCountry": "DE"
  },
  "telephone": "+49-4621-22350",
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
      "opens": "09:00", "closes": "12:00" },
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Monday", "opens": "14:00", "closes": "16:00" },
    { "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday","Thursday"], "opens": "15:00", "closes": "17:00" }
  ]
}
```
