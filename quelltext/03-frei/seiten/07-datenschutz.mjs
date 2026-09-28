// Datenschutzerklärung – Stand September 2026, fehlende Angaben als Platzhalter.
import { seitenkopf } from '../bausteine.mjs';

export const seite = {
  datei: 'datenschutz.html',
  nav: 'datenschutz',
  titel: 'Datenschutzerklärung – Augenarztpraxis Dr. med. Vera Christoph',
  beschreibung: 'Datenschutzerklärung der Augenarztpraxis Dr. med. Vera Christoph in Schleswig: keine Cookies, keine Tracker, Karte erst nach Klick.',
};

export default function inhalt(ctx) {
  const { praxis, esc, PLATZHALTER: P } = ctx;
  const extern = (href, text) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${text}<span class="nur-sr"> (öffnet in neuem Fenster)</span></a>`;

  const abschnitte = [
    ['verantwortlich', 'Verantwortliche Stelle', `
      <p>Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:</p>
      <p>${esc(praxis.aerztin)}<br>${esc(praxis.adresse.strasse)}<br>${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}<br>Telefon: ${ctx.telefonLink()}</p>`],
    ['beauftragte', 'Datenschutzbeauftragte Person', `
      <p>${ctx.angabe('datenschutzbeauftragter')}</p>`],
    ['hosting', 'Bereitstellung der Website und Server-Logdateien', `
      <p>Diese Website wird bei ${ctx.angabe('hosting')} betrieben. Der Anbieter verarbeitet die Daten in unserem Auftrag (Auftragsverarbeitung nach Art. 28 DSGVO). Bei jedem Aufruf übermittelt Ihr Browser technisch notwendige Daten an den Server, die dort in sogenannten Logdateien gespeichert werden:</p>
      <ul>
        <li>IP-Adresse des anfragenden Geräts,</li>
        <li>Datum und Uhrzeit des Abrufs,</li>
        <li>aufgerufene Seite oder Datei und übertragene Datenmenge,</li>
        <li>zuvor besuchte Seite, sofern Ihr Browser sie übermittelt,</li>
        <li>Browsertyp und Betriebssystem.</li>
      </ul>
      <p>Diese Daten sind nötig, um die Website auszuliefern und ihre Sicherheit zu gewährleisten. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und funktionsfähigen Angebot (Art. 6 Abs. 1 lit. f DSGVO). Die Logdateien werden nicht mit anderen Daten zusammengeführt und nach Ablauf der Speicherfrist gelöscht: ${ctx.angabe('speicherdauerLogs')}</p>`],
    ['cookies', 'Keine Cookies, keine Analyse, keine Werbung', `
      <p>Diese Website setzt keine Cookies und speichert nichts in Ihrem Browser. Wir verwenden keine Analyse- oder Trackingdienste, keine Werbenetzwerke und keine eingebetteten Inhalte sozialer Netzwerke.</p>`],
    ['schriften', 'Schriften', `
      <p>Die Schriften dieser Website liegen auf unserem eigenen Server. Beim Laden der Seiten wird keine Verbindung zu Schriftanbietern wie Google Fonts aufgebaut.</p>`],
    ['karte', 'Karte von Google Maps', `
      <p>Auf der Seite „Anfahrt und Kontakt“ können Sie eine Karte von Google Maps einblenden, einem Angebot der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Karte wird <strong>erst geladen, wenn Sie auf „Karte laden“ klicken</strong>. Vorher werden keine Daten an Google übertragen.</p>
      <p>Nach Ihrem Klick stellt Ihr Browser eine Verbindung zu den Servern von Google her. Dabei werden Ihre IP-Adresse sowie technische Angaben zu Ihrem Browser übertragen; diese Verarbeitung kann auch auf Servern von Google LLC in den USA stattfinden. Für Übermittlungen in die USA hat sich Google dem EU-US Data Privacy Framework unterworfen; ergänzend werden Standardvertragsklauseln eingesetzt.</p>
      <p>Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie gilt nur für den jeweiligen Seitenaufruf; beim nächsten Besuch wird die Karte nicht automatisch geladen. Weitere Informationen: ${extern('https://policies.google.com/privacy', 'Datenschutzerklärung von Google')}.</p>`],
    ['kontakt', 'Kontakt per Telefon oder E-Mail', `
      <p>Wenn Sie uns anrufen oder schreiben, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu bearbeiten, etwa um einen Termin zu vereinbaren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO; soweit Gesundheitsdaten betroffen sind, Art. 9 Abs. 2 lit. h DSGVO. Wir speichern Ihre Angaben nur so lange, wie es für Ihr Anliegen nötig ist. Werden sie Teil Ihrer Behandlungsdokumentation, gelten die gesetzlichen Aufbewahrungsfristen (in der Regel zehn Jahre nach Abschluss der Behandlung, § 630f Abs. 3 BGB). Bitte senden Sie uns Befunde oder andere Gesundheitsdaten nicht per unverschlüsselter E-Mail.</p>`],
    // Solange die Terminbuchung lokal bleibt (ctx.termin.extern === false), findet
    // dabei keine Verarbeitung statt, die hier zu nennen wäre – der Abschnitt
    // erscheint erst, sobald in gemeinsam/website.mjs eine externe `terminUrl` steht.
    ...(ctx.termin.extern ? [['terminbuchung', 'Online-Terminbuchung', `
      <p>Termine können Sie online buchen. Die Buchung wird von einem externen Dienstleister (${ctx.angabe('terminAnbieter')}) auf einer eigenen Internetadresse betrieben. ${ctx.platzhalter(P.terminDatenschutz)}</p>`]] : []),
    ['links', 'Links zu anderen Websites', `
      <p>Diese Website enthält Links zu anderen Angeboten, zum Beispiel zur Stadt Schleswig oder zu Google Maps. Erst wenn Sie einem solchen Link folgen, werden Daten an den jeweiligen Anbieter übertragen. Für dessen Datenverarbeitung ist er selbst verantwortlich.</p>`],
    ['rechte', 'Ihre Rechte', `
      <p>Sie haben nach der Datenschutz-Grundverordnung das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Wenden Sie sich dazu einfach an uns.</p>`],
    ['beschwerde', 'Beschwerderecht', `
      <p>Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Für uns zuständig ist das Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein (ULD): ${extern('https://www.datenschutzzentrum.de', 'datenschutzzentrum.de')}.</p>`],
  ];

  const inhaltsliste = abschnitte.map(([id, titel]) => `<li><a href="#${id}">${titel}</a></li>`).join('\n        ');
  const texte = abschnitte.map(([id, titel, text]) => `
    <section id="${id}" aria-labelledby="${id}-titel">
      <h2 id="${id}-titel">${titel}</h2>${text}
    </section>`).join('\n');

  return `
${seitenkopf({ dach: 'Rechtliches', titel: 'Datenschutz&shy;erklärung', einleitung: 'Der Schutz Ihrer Daten ist uns wichtig – gerade in einer Arztpraxis. Diese Website kommt deshalb ohne Cookies, ohne Tracking und ohne Inhalte fremder Server aus, solange Sie die Karte nicht selbst laden.' })}

<div class="abschnitt abschnitt--knapp">
  <div class="rahmen rechtstext rechtstext--mit-liste">
    <nav class="inhaltsliste" aria-label="Inhalt der Datenschutzerklärung">
      <p class="inhaltsliste__titel" aria-hidden="true">Inhalt</p>
      <ol>
        ${inhaltsliste}
      </ol>
    </nav>
    <div class="rechtstext__spalte">
${texte}
      <p class="stand">Stand: September 2026</p>
    </div>
  </div>
</div>
`;
}
