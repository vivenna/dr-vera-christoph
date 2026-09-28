// Stammdaten der Praxis – die einzige Quelle für Name, Adresse, Telefon und
// Sprechzeiten in allen drei Entwürfen.
//
// Grundlage: praxis-briefing/01-stammdaten.md und 02-parken-anfahrt.md,
// geprüft gegen die Visitenkarte (praxis-briefing/quellen/visitenkarte-vera-christoph.jpg).
//
// Unbekannte Angaben stehen hier als `null`. Die Entwürfe zeigen dafür
// automatisch einen sichtbaren Platzhalter (siehe `PLATZHALTER` unten).
// Sobald die Ärztin eine Angabe liefert: hier eintragen, `node quelltext/bauen.mjs`
// ausführen – fertig, alle Seiten aller Entwürfe sind aktualisiert.

export const praxis = {
  aerztin: 'Dr. med. Vera Christoph',
  praxisname: 'Augenarztpraxis Dr. med. Vera Christoph',
  fachrichtung: 'Fachärztin für Augenheilkunde',
  ort: 'Schleswig',

  adresse: {
    strasse: 'Plessenstraße 13',
    plz: '24837',
    stadt: 'Schleswig',
    region: 'Schleswig-Holstein',
    land: 'DE',
  },
  adresseEinzeilig: 'Plessenstraße 13, 24837 Schleswig',

  telefon: {
    anzeige: '04621 / 2 23 50', // Schreibweise wie auf der Visitenkarte
    href: 'tel:+49462122350',
    schema: '+49-4621-22350',
  },

  // ── Noch unbekannt – NICHT ausdenken. `null` erzeugt einen Platzhalter. ──
  email: null,
  fax: null,
  sprachen: null,
  barrierefreiheit: null,

  // Pflichtangaben für Impressum und Datenschutzerklärung. Sobald bekannt,
  // den Text eintragen (z. B. kammer: 'Ärztekammer …, Anschrift'); die Seiten
  // zeigen ihn dann über ctx.angabe('kammer') statt des Platzhalters an.
  rechtliches: {
    kammer: null,
    aufsicht: null,
    berufsordnung: null,
    approbation: null,
    ustid: null,
    haftpflicht: null,
    hosting: null,
    datenschutzbeauftragter: null,
    speicherdauerLogs: null,
    terminAnbieter: null,
    bildrechte: null,
  },

  // Sprechzeiten laut Visitenkarte. Uhrzeiten in der Schreibweise der Karte.
  sprechzeiten: [
    { tag: 'Montag',     kurz: 'Mo', schema: 'Monday',    zeiten: [['9.00', '12.00'], ['14.00', '16.00']] },
    { tag: 'Dienstag',   kurz: 'Di', schema: 'Tuesday',   zeiten: [['9.00', '12.00'], ['15.00', '17.00']] },
    { tag: 'Mittwoch',   kurz: 'Mi', schema: 'Wednesday', zeiten: [['9.00', '12.00']] },
    { tag: 'Donnerstag', kurz: 'Do', schema: 'Thursday',  zeiten: [['9.00', '12.00'], ['15.00', '17.00']] },
    { tag: 'Freitag',    kurz: 'Fr', schema: 'Friday',    zeiten: [['9.00', '12.00']] },
  ],
  sprechzeitenZusatz: 'sowie nach Vereinbarung',

  // Koordinaten des Gebäudes Plessenstraße 13 laut OpenStreetMap (Nominatim, Abruf 27.09.2026).
  geo: { lat: 54.5158282, lon: 9.5660097 },
};

// ── Sichtbare Platzhalter für fehlende Angaben ─────────────────────────────
// Die eckigen Klammern sind Absicht: so fallen die Lücken beim Durchsehen auf.
export const PLATZHALTER = {
  email: '[E-Mail-Adresse folgt]',
  fax: '[Faxnummer folgt, falls vorhanden]',
  sprachen: '[Gesprochene Sprachen folgen]',
  barrierefreiheit: '[Angaben zur Barrierefreiheit der Praxisräume folgen]',
  kammer: '[Zuständige Ärztekammer folgt]',
  aufsicht: '[Zuständige Aufsichtsbehörde folgt]',
  berufsordnung: '[Anwendbare Berufsordnung folgt]',
  approbation: '[Staat der Approbation und Verleihung der Berufsbezeichnung folgt]',
  ustid: '[Umsatzsteuer-Identifikationsnummer folgt, falls vorhanden]',
  haftpflicht: '[Angaben zur Berufshaftpflichtversicherung folgen]',
  hosting: '[Hosting-Anbieter folgt]',
  datenschutzbeauftragter: '[Datenschutzbeauftragte Person folgt, falls benannt]',
  speicherdauerLogs: '[Speicherdauer der Server-Logdateien folgt]',
  terminAnbieter: '[Anbieter der Online-Terminbuchung folgt]',
  terminDatenschutz: '[Angaben zur Datenverarbeitung bei der Online-Terminbuchung folgen: Anbieter, verarbeitete Daten, Rechtsgrundlage, Speicherdauer]',
  bildrechte: '[Urheberin oder Urheber des Aquarell-Auges und Nutzungsrecht folgen]',
  praxisfoto: '[Foto folgt]',
};

// Hinweis neben der E-Mail-Adresse im Impressum: dort muss sie stehen (§ 5 DDG),
// überall sonst zeigen wir sie gar nicht erst an (siehe README).
export const emailHinweis = 'Hinweis: keine Kontaktoption für medizinische Anfragen von Patientinnen und Patienten – bitte rufen Sie uns dafür an.';

// ── Karte (Google Maps) ────────────────────────────────────────────────────
// Einbettung von Google Maps (My Business-Eintrag „Dr.med. Vera Christoph“),
// von der Ärztin selbst aus Google Maps exportiert (Abruf 28.09.2026).
export const karte = {
  // Direktlink – öffnet die Google-Maps-Suche in einem neuen Tab, keine Einbettung.
  link: 'https://www.google.com/maps/search/?api=1&query=Dr.+med.+Vera+Christoph%2C+Plessenstra%C3%9Fe+13%2C+24837+Schleswig',
  // Einbettung – nur nach Klick laden (Zwei-Klick-Lösung), siehe Entwurfs-READMEs.
  einbettung: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d578.9988966723266!2d9.566448253242996!3d54.51593921507757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43df531f0cef19f5%3A0x24cc13b766a8d373!2sDr.med.%20Vera%20Christoph!5e0!3m2!1sde!2sde!4v1790570275561!5m2!1sde!2sde',
  quellenhinweis: '© Google Maps',
  lizenzLink: 'https://www.google.com/intl/de/help/terms_maps/',
};

// ── Parken & Anfahrt (Faltblatt der Stadt Schleswig) ───────────────────────
export const faltblatt = {
  datei: 'parkplatz-faltblatt-schleswig-2025-12-18.pdf',
  titel: 'Parkplatz frei!',
  herausgeber: 'Stadt Schleswig – Der Bürgermeister',
  stand: '18.12.2025',
  groesse: 'PDF, ca. 950 KB',
};

// Nach Nähe zur Plessenstraße 13 sortiert; Nummern wie auf der Karte des Faltblatts.
// Reine Kundenparkplätze von Geschäften (z. B. P4) sind bewusst nicht aufgeführt.
export const parkplaetze = [
  { nr: 'P5',  name: 'Alte Feuerwache',            adresse: 'Königstraße 16',              art: 'Kurzzeitparken' },
  { nr: 'P3',  name: 'SchleiCenter',               adresse: 'Schwarzer Weg 16–18',         art: 'Kurzzeitparken' },
  { nr: 'P20', name: 'Amalienplatz / Am Kornmarkt', adresse: 'Michaelisstraße 6 und Faulstraße 7', art: 'Kurzzeitparken' },
  { nr: 'P13', name: 'Kleiner Baumhofsgang I',     adresse: 'Kleiner Baumhofsgang 7–9',    art: 'Dauerparken' },
  { nr: 'P14', name: 'Kleiner Baumhofsgang II',    adresse: 'Kleiner Baumhofsgang 4–10',   art: 'Dauerparken' },
  { nr: 'P15', name: 'Alter Kreisbahnhof',         adresse: 'Wiesenstraße 8',              art: 'Kurzzeitparken' },
  { nr: 'P6',  name: 'GEWOBA-Parkhaus (überdacht, mit E-Ladesäulen)', adresse: 'Moltkestraße 34', art: 'Dauerparken' },
];

export const anfahrt = {
  // Kernaussagen, frei umformulierbar – die Fakten bitte nicht verändern.
  parkhausGesperrt: 'Das städtische Parkhaus in der Innenstadt und der ZOB sind seit Januar 2026 gesperrt und werden abgerissen. Rund 500 Parkplätze fallen dadurch weg; der Neubau soll voraussichtlich 2028 öffnen.',
  kurzparken: 'Auf vielen Plätzen ist das Parken für mindestens zwei Stunden kostenfrei. Ein digitales Parkleitsystem zeigt freie Plätze an.',
  parkAndRide: 'Park-and-Ride-Flächen gibt es am Stadtfeld, am Schleihallen-Parkplatz (an der Shell-Tankstelle) und am Theaterparkplatz. Von dort fahren Busse im 15-Minuten-Takt in die Innenstadt.',
  // Capitolplatz ist laut Faltblatt die Innenstadt-Haltestelle der Park-and-Ride-Busse –
  // ob sie die nächstgelegene Haltestelle zur Praxis ist, ist nicht bestätigt.
  haltestelle: 'Capitolplatz',
  bus: 'Mit dem Bus erreichen Sie die Innenstadt über die Haltestelle Capitolplatz. Ein Einzelfahrschein oder das Deutschlandticket genügt.',
  smile24: 'Mit Smile24 fahren Bus, Shuttle und Leihrad auf Abruf per App in der ganzen Schleiregion; das Deutschlandticket gilt.',
  lage: 'Die Praxis liegt mitten in der Schleswiger Altstadt, zwischen der Fußgängerzone Stadtweg und der Königstraße.',
  links: {
    ladenstrasse: { href: 'https://www.ladenstrasse-schleswig.de', text: 'ladenstrasse-schleswig.de' },
    gewoba: { href: 'https://www.gewoba-nord.de/parkhaus', text: 'gewoba-nord.de/parkhaus' },
    smile24: { href: 'https://smile24.nah.sh', text: 'smile24.nah.sh' },
  },
};

// ── Hilfsfunktionen ────────────────────────────────────────────────────────

/** „9.00–12.00 Uhr" */
export function spanne([von, bis], { uhr = true } = {}) {
  return `${von}–${bis}${uhr ? ' Uhr' : ''}`;
}

/** Sprechzeiten eines Tages als Text, z. B. „9.00–12.00 Uhr und 14.00–16.00 Uhr" */
export function zeitenText(tag, trenner = ' und ') {
  return tag.zeiten.map((z) => spanne(z)).join(trenner);
}

/** "9.00" → "09:00" für schema.org */
const iso = (t) => t.replace('.', ':').padStart(5, '0');

/**
 * Strukturierte Daten (schema.org/Physician) für JSON-LD.
 * Grundlage ist das Snippet aus praxis-briefing/01-stammdaten.md – mit einer
 * Korrektur: "Ophthalmologic" ist kein gültiger schema.org-Wert, richtig ist
 * "Ophthalmology" (https://schema.org/Ophthalmology).
 */
export function strukturierteDaten({ url, bild }) {
  const oeffnung = [];
  for (const tag of praxis.sprechzeiten) {
    for (const [von, bis] of tag.zeiten) {
      const vorhanden = oeffnung.find((o) => o.opens === iso(von) && o.closes === iso(bis));
      if (vorhanden) vorhanden.dayOfWeek.push(tag.schema);
      else oeffnung.push({ '@type': 'OpeningHoursSpecification', dayOfWeek: [tag.schema], opens: iso(von), closes: iso(bis) });
    }
  }
  const daten = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: `${praxis.aerztin} – ${praxis.fachrichtung}`,
    medicalSpecialty: 'https://schema.org/Ophthalmology',
    url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: praxis.adresse.strasse,
      postalCode: praxis.adresse.plz,
      addressLocality: praxis.adresse.stadt,
      addressRegion: praxis.adresse.region,
      addressCountry: praxis.adresse.land,
    },
    geo: { '@type': 'GeoCoordinates', latitude: praxis.geo.lat, longitude: praxis.geo.lon },
    telephone: praxis.telefon.schema,
    openingHoursSpecification: oeffnung,
  };
  if (bild) daten.image = bild;
  if (praxis.email) daten.email = praxis.email;
  if (praxis.fax) daten.faxNumber = praxis.fax;
  return daten;
}
