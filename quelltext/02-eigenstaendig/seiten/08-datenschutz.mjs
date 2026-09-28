// Datenschutzerklärung. Fehlende Angaben (Hosting, Datenschutzbeauftragte,
// Anbieter der künftigen Online-Terminbuchung) erscheinen als Platzhalter.

import { praxis } from '../../gemeinsam/praxis.mjs';
import { seitenkopf, externerLink, trennen } from '../bausteine.mjs';

export const seite = {
  datei: 'datenschutz.html',
  titel: `Datenschutz – Augenarztpraxis ${praxis.aerztin}, ${praxis.ort}`,
  beschreibung: 'Datenschutzerklärung der Augenarztpraxis: keine Cookies, keine Tracker, Karte erst nach Klick, Ihre Rechte nach der DSGVO und die zuständige Aufsichtsbehörde.',
  nav: 'datenschutz',
};

export default function inhalt(ctx) {
  const { esc } = ctx;
  const p = ctx.praxis;
  const a = p.adresse;
  // Angabe aus gemeinsam/praxis.mjs (rechtliches) oder sichtbarer Platzhalter
  const ph = (k) => ctx.angabe(k);

  const abschnitte = [
    ['verantwortliche', 'Verantwortliche Stelle', `<p>Verantwortlich für die Verarbeitung personenbezogener Daten auf dieser Website ist:</p>
<p>${esc(p.aerztin)}<br>${esc(p.praxisname)}<br>${esc(a.strasse)}<br>${esc(a.plz)} ${esc(a.stadt)}</p>
<dl class="angaben">
<div><dt>Telefon</dt><dd><a href="${p.telefon.href}">${esc(p.telefon.anzeige)}</a></dd></div>
</dl>`],
    ['beauftragte', 'Datenschutzbeauftragte Person', `<p>${ph('datenschutzbeauftragter')}</p>`],
    ['ueberblick', 'Das Wichtigste in Kürze', `<ul class="punkt-liste">
<li>Diese Website setzt <strong>keine Cookies</strong> und speichert nichts auf Ihrem Gerät.</li>
<li>Es gibt <strong>keine Analyse- oder Trackingdienste</strong> und keine eingebundenen Inhalte sozialer Netzwerke.</li>
<li>Schriften und Grafiken liegen auf demselben Server wie diese Website. Beim Aufruf der Seiten wird <strong>keine Verbindung zu fremden Servern</strong> aufgebaut.</li>
<li>Die Karte von Google Maps wird <strong>erst nach Ihrem Klick</strong> geladen.</li>
</ul>`],
    ['hosting', 'Hosting und Server-Logdateien', `<p>Diese Website wird betrieben bei: ${ph('hosting')}. Der Anbieter verarbeitet die Daten in unserem Auftrag (Auftragsverarbeitung nach Art. 28 DSGVO).</p>
<p>Beim Aufruf einer Seite verarbeitet der Webserver technisch notwendige Angaben, die Ihr Browser automatisch übermittelt: IP-Adresse, Datum und Uhrzeit des Abrufs, die aufgerufene Adresse, die übertragene Datenmenge, die zuvor besuchte Seite sowie Angaben zu Browser und Betriebssystem. Diese Daten dienen ausschließlich dazu, die Website sicher und zuverlässig auszuliefern und Störungen zu erkennen. Sie werden nicht mit anderen Daten zusammengeführt.</p>
<p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und stabilen Betrieb der Website. Die Logdateien werden gelöscht, sobald sie für diesen Zweck nicht mehr erforderlich sind: ${ph('speicherdauerLogs')}</p>`],
    ['cookies', 'Keine Cookies, keine Analyse', `<p>Wir setzen keine Cookies und nutzen weder den lokalen Speicher Ihres Browsers noch vergleichbare Techniken. Wir verwenden keine Dienste zur Reichweitenmessung, keine Werbung und kein Tracking. Deshalb erscheint auch kein Einwilligungsbanner.</p>`],
    ['schriften', 'Schriften', `<p>Die Schriften Source Sans 3 und Source Serif 4 liegen auf demselben Server wie diese Website. Beim Laden der Seiten wird keine Verbindung zu Google oder anderen Schriftanbietern hergestellt.</p>`],
    ['karte', 'Karte von Google Maps', `<p>Auf der Kontaktseite können Sie eine Karte von Google Maps anzeigen lassen, einem Angebot der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Sie wird erst geladen, wenn Sie auf „Karte laden“ klicken. Erst dann stellt Ihr Browser eine Verbindung zu Servern von Google her und überträgt dabei Ihre IP-Adresse und technische Angaben zu Ihrem Browser; diese Verarbeitung kann auch auf Servern von Google LLC in den USA stattfinden.</p>
<p>Für Übermittlungen in die USA hat sich Google dem EU-US Data Privacy Framework unterworfen; ergänzend werden Standardvertragsklauseln eingesetzt.</p>
<p>Rechtsgrundlage ist Ihre Einwilligung durch den Klick (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG). Sie können sie jederzeit für die Zukunft widerrufen, indem Sie die Seite neu laden – die Karte wird dann nicht mehr angezeigt. Weitere Informationen: ${externerLink(ctx, 'https://policies.google.com/privacy', 'Datenschutzerklärung von Google')}.</p>
<p>Ohne Einbettung können Sie die Karte über den Link „Karte bei Google Maps öffnen“ direkt auf google.com/maps ansehen. Dort gelten die Datenschutzbestimmungen von Google.</p>`],
    ['kontakt', 'Kontakt per Telefon oder E-Mail', `<p>Wenn Sie uns anrufen oder eine E-Mail schreiben, verarbeiten wir Ihre Angaben – etwa Name, Telefonnummer, Ihr Anliegen und gegebenenfalls Angaben zu Ihrer Gesundheit –, um Ihre Anfrage zu beantworten und Termine zu vergeben.</p>
<p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Soweit Gesundheitsdaten betroffen sind, verarbeiten wir sie auf Grundlage von Art. 9 Abs. 2 lit. h DSGVO. Alle Angaben unterliegen der ärztlichen Schweigepflicht.</p>
<p>Wir speichern Ihre Angaben nur so lange, wie es für Ihr Anliegen nötig ist. Werden sie Teil Ihrer Behandlungsdokumentation, gelten die gesetzlichen Aufbewahrungsfristen (in der Regel zehn Jahre nach Abschluss der Behandlung, § 630f Abs. 3 BGB).</p>
<p>Bitte beachten Sie: Unverschlüsselte E-Mails können auf dem Übertragungsweg von Dritten gelesen werden. Für vertrauliche Angaben ist das Telefon besser geeignet.</p>`],
    // Solange die Terminbuchung lokal bleibt (ctx.termin.extern === false), findet
    // dabei keine Verarbeitung statt, die hier zu nennen wäre – der Abschnitt
    // erscheint erst, sobald in gemeinsam/website.mjs eine externe `terminUrl` steht.
    ...(ctx.termin.extern ? [['terminbuchung', 'Online-Terminbuchung', `<p>Termine können Sie online buchen. Die Buchung wird von ${ph('terminAnbieter')} betrieben und läuft auf einer eigenen Internetadresse. ${ctx.platzhalter(ctx.PLATZHALTER.terminDatenschutz)}</p>`]] : []),
    ['links', 'Links zu anderen Websites', `<p>Diese Website enthält Links zu Angeboten anderer Anbieter, etwa der Stadt Schleswig oder von Google Maps. Erst wenn Sie einen solchen Link anklicken, verlassen Sie unsere Website; für die Datenverarbeitung dort ist der jeweilige Anbieter verantwortlich.</p>`],
    ['rechte', 'Ihre Rechte', `<p>Sie haben gegenüber uns jederzeit das Recht auf</p>
<ul class="punkt-liste">
<li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO),</li>
<li>Berichtigung unrichtiger Daten (Art. 16 DSGVO),</li>
<li>Löschung (Art. 17 DSGVO) und Einschränkung der Verarbeitung (Art. 18 DSGVO),</li>
<li>Datenübertragbarkeit (Art. 20 DSGVO),</li>
<li>Widerspruch gegen eine Verarbeitung auf Grundlage berechtigter Interessen (Art. 21 DSGVO).</li>
</ul>
<p>Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO). Wenden Sie sich dafür einfach an uns.</p>`],
    ['beschwerde', 'Beschwerderecht bei der Aufsichtsbehörde', `<p>Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns zuständig ist das Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein (ULD): ${externerLink(ctx, 'https://www.datenschutzzentrum.de', 'www.datenschutzzentrum.de')}.</p>`],
  ];

  return `
${seitenkopf({
  stichwort: 'Rechtliches',
  titel: 'Datenschutzerklärung',
  einleitung: 'Ihre Daten gehören Ihnen. Diese Website ist deshalb bewusst sparsam gebaut. Hier erfahren Sie, welche Daten beim Besuch anfallen und welche Rechte Sie haben.',
})}

<div class="rechtstext raster">
<nav class="rand inhaltsverzeichnis" aria-label="Inhalt dieser Seite">
<div class="rand-kleber">
<p class="stichwort">Inhalt</p>
<ol>
${abschnitte.map(([id, titel]) => `<li><a href="#${id}">${trennen(esc(titel))}</a></li>`).join('\n')}
</ol>
</div>
</nav>
<div class="haupt">
${abschnitte.map(([id, titel, html]) => `<section id="${id}" aria-labelledby="${id}-titel">
<h2 id="${id}-titel">${trennen(esc(titel))}</h2>
${html}
</section>`).join('\n')}
<p class="stand">Stand: September 2026</p>
</div>
</div>
`;
}
