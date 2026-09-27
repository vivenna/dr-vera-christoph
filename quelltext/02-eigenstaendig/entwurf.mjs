// Entwurf 2 – „eigenständig“: erkennbar verwandt mit der Referenz, aber eigene Lösung.
// Leitfarbe ist die Tinte aus dem Logo (#615e79), Schriftblau (#275895) trägt Links
// und Schaltflächen. Ausgabe nach entwuerfe/02-eigenstaendig/.

import { praxis } from '../gemeinsam/praxis.mjs';

export default {
  titel: 'Entwurf 2 – eigenständig',
  // Farbe der Browserleiste auf dem Telefon (Tinte aus dem Logo)
  themeColor: '#615e79',
  // Vorschaubild für Messenger und soziale Netze (1200 × 630). Es zeigt Name, Fachrichtung,
  // Anschrift und Telefon – ändern sich diese Angaben, das Bild neu erzeugen (siehe README).
  ogBild: 'assets/bilder/og-bild.png',
  ogBildAlt: `Augenmarke der Praxis mit dem Namen ${praxis.aerztin}, ${praxis.fachrichtung}, ${praxis.adresseEinzeilig}, Telefon ${praxis.telefon.anzeige}`,
};
