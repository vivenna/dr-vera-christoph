// Datenschutzerklärung – Stand September 2026.
// Keine Cookies, keine Tracker, Schrift lokal, Karte erst nach Klick (Zwei-Klick-Lösung).
// Hosting, Speicherdauer, Datenschutzbeauftragte Person und Anbieter der künftigen
// Online-Terminbuchung sind noch unbekannt und stehen als sichtbare Platzhalter da.

import { fremdLink } from '../bausteine.mjs';

export const seite = {
  datei: 'datenschutz.html',
  titel: 'Datenschutzerklärung – Augenarztpraxis Dr. med. Vera Christoph, Schleswig',
  beschreibung: 'Datenschutzerklärung der Website der Augenarztpraxis Dr. med. Vera Christoph: keine Cookies, keine Tracker, Karte erst nach Ihrer Zustimmung.',
  nav: 'datenschutz',
  karte: false,
};

export default function inhalt(ctx) {
  const { praxis, esc, PLATZHALTER } = ctx;

  return `
  <article class="textseite abschnitt-erster">
    <h1>Datenschutz&shy;erklärung</h1>
    <p class="abschnitt-lead">Hier erfahren Sie, welche personenbezogenen Daten beim Besuch dieser Website verarbeitet werden, zu welchem Zweck das geschieht und welche Rechte Sie haben.</p>

    <h2>1. Verantwortliche</h2>
    <p>${esc(praxis.aerztin)}<br>${esc(praxis.adresse.strasse)}<br>${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}</p>
    <p>Telefon: ${ctx.telefonLink()}<br>E-Mail: ${ctx.email()}</p>

    <h2>2. Datenschutzbeauftragte Person</h2>
    <p>${ctx.angabe('datenschutzbeauftragter')}</p>

    <h2>3. Hosting und Server-Logdateien</h2>
    <p>Diese Website wird bei ${ctx.angabe('hosting')} betrieben. Der Anbieter verarbeitet die Daten in unserem Auftrag (Auftragsverarbeitung nach Art. 28 DSGVO). Wenn Sie eine Seite aufrufen, übermittelt Ihr Browser automatisch technische Daten an den Server. Dort werden sie in sogenannten Server-Logdateien gespeichert: Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, die aufgerufene Seite, die übertragene Datenmenge, Browser und Betriebssystem sowie gegebenenfalls die zuvor besuchte Seite.</p>
    <p>Diese Daten sind nötig, um die Website auszuliefern und ihren sicheren, störungsfreien Betrieb zu gewährleisten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt im sicheren Betrieb der Website. Die Logdateien werden nicht mit anderen Daten zusammengeführt und nach Ablauf der Speicherfrist gelöscht: ${ctx.angabe('speicherdauerLogs')}</p>

    <h2>4. Keine Cookies, keine Analyse</h2>
    <p>Diese Website setzt keine Cookies und speichert nichts in Ihrem Browser. Wir verwenden keine Analyse-, Statistik- oder Trackingdienste, keine Werbenetzwerke und keine eingebetteten Inhalte sozialer Netzwerke.</p>

    <h2>5. Schriften</h2>
    <p>Die Schrift „Source Sans 3“ ist auf dem Server dieser Website gespeichert und wird von dort geladen. Beim Laden der Schrift entsteht keine Verbindung zu Servern von Google oder anderen Anbietern.</p>

    <h2 id="karte">6. Karte von OpenStreetMap</h2>
    <p>Auf mehreren Seiten können Sie eine Karte mit der Lage der Praxis anzeigen lassen. Sie wird vom Kartendienst OpenStreetMap bereitgestellt, den die OpenStreetMap Foundation im Vereinigten Königreich betreibt.</p>
    <p>Die Karte wird <strong>erst geladen, wenn Sie auf „Karte laden“ klicken</strong>. Vorher werden keine Daten an OpenStreetMap übertragen. Nach dem Klick stellt Ihr Browser eine Verbindung zu den Servern der OpenStreetMap Foundation her; dabei werden insbesondere Ihre IP-Adresse sowie Datum und Uhrzeit des Abrufs übermittelt.</p>
    <p>Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, die Sie mit dem Klick erteilen. Die Einwilligung gilt nur für den jeweiligen Seitenaufruf; beim nächsten Aufruf wird die Karte nicht automatisch geladen. Für das Vereinigte Königreich hat die Europäische Kommission einen Angemessenheitsbeschluss erlassen (Art. 45 DSGVO). Mehr dazu in der ${fremdLink('https://osmfoundation.org/wiki/Privacy_Policy', 'Datenschutzerklärung der OpenStreetMap Foundation')}.</p>
    <p>Der Link „Karte bei OpenStreetMap öffnen“ führt auf die Website openstreetmap.org. Dort gelten die Datenschutzbestimmungen der OpenStreetMap Foundation.</p>

    <h2>7. Kontakt per Telefon oder E-Mail</h2>
    <p>Wenn Sie uns anrufen oder schreiben, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu bearbeiten, zum Beispiel um einen Termin zu vereinbaren. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO; soweit dabei Gesundheitsdaten betroffen sind, Art. 9 Abs. 2 lit. h DSGVO. Wir speichern Ihre Angaben nur so lange, wie es für Ihr Anliegen nötig ist. Werden sie Teil Ihrer Behandlungsdokumentation, gelten die gesetzlichen Aufbewahrungsfristen (in der Regel zehn Jahre nach Abschluss der Behandlung, § 630f Abs. 3 BGB). Bitte senden Sie Befunde oder andere Gesundheitsdaten möglichst nicht per unverschlüsselter E-Mail.</p>

    <h2>8. Online-Terminbuchung</h2>
    ${ctx.termin.extern
      ? `<p>Termine können Sie online buchen. Die Buchung wird von ${ctx.angabe('terminAnbieter')} betrieben und läuft auf einer eigenen Internetadresse. ${ctx.platzhalter(PLATZHALTER.terminDatenschutz)}</p>`
      : `<p>Wir bereiten eine Online-Terminbuchung vor. Sie wird von ${ctx.angabe('terminAnbieter')} betrieben und läuft auf einer eigenen Internetadresse. Bevor sie freigeschaltet wird, ergänzen wir hier, welche Daten dabei verarbeitet werden und wer dafür verantwortlich ist.</p>`}

    <h2>9. Links zu anderen Websites</h2>
    <p>Diese Website enthält Links zu Angeboten anderer Anbieter, etwa der Stadt Schleswig. Erst wenn Sie einen solchen Link anklicken, verlassen Sie unsere Website. Für die Verarbeitung Ihrer Daten dort ist der jeweilige Anbieter verantwortlich.</p>

    <h2>10. Ihre Rechte</h2>
    <p>Sie haben das Recht auf Auskunft über Ihre bei uns gespeicherten Daten (Art. 15 DSGVO), auf Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen (Art. 7 Abs. 3 DSGVO).</p>

    <h2>11. Beschwerderecht</h2>
    <p>Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig für uns ist das Unabhängige Landeszentrum für Datenschutz Schleswig-Holstein (ULD), ${fremdLink('https://www.datenschutzzentrum.de', 'www.datenschutzzentrum.de')}.</p>

    <p class="textseite-stand">Stand: September 2026</p>
  </article>`;
}
