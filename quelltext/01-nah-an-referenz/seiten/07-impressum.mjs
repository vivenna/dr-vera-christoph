// Impressum – Angaben nach § 5 DDG. Die heilberuflichen Pflichtangaben sind
// noch unbekannt und erscheinen als sichtbare Platzhalter (gemeinsam/praxis.mjs).
// Bewusst kein Hinweis auf die EU-Streitschlichtungsplattform (eingestellt seit Juli 2025).

export const seite = {
  datei: 'impressum.html',
  titel: 'Impressum – Augenarztpraxis Dr. med. Vera Christoph, Schleswig',
  beschreibung: 'Impressum der Augenarztpraxis Dr. med. Vera Christoph, Fachärztin für Augenheilkunde, Plessenstraße 13, 24837 Schleswig.',
  nav: 'impressum',
  karte: false,
};

export default function inhalt(ctx) {
  const { praxis, esc } = ctx;
  // Angabe aus gemeinsam/praxis.mjs (rechtliches) oder sichtbarer Platzhalter
  const p = (schluessel) => ctx.angabe(schluessel);

  return `
  <article class="textseite abschnitt-erster">
    <h1>Impressum</h1>

    <h2>Angaben gemäß § 5 DDG</h2>
    <p>${esc(praxis.praxisname)}<br>
    ${esc(praxis.aerztin)}<br>
    ${esc(praxis.adresse.strasse)}<br>
    ${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}</p>

    <h2>Kontakt</h2>
    <dl class="angaben angaben-schmal">
      <div><dt>Telefon</dt><dd>${ctx.telefonLink('link-gross')}</dd></div>
      <div><dt>Telefax</dt><dd>${ctx.fax()}</dd></div>
      <div><dt>E-Mail</dt><dd>${ctx.email()}</dd></div>
    </dl>

    <h2>Berufsrechtliche Angaben</h2>
    <dl class="angaben angaben-schmal">
      <div><dt>Gesetzliche Berufsbezeichnung</dt><dd>Ärztin, ${esc(praxis.fachrichtung)}</dd></div>
      <div><dt>Verliehen in</dt><dd>${p('approbation')}</dd></div>
      <div><dt>Zuständige Ärztekammer</dt><dd>${p('kammer')}</dd></div>
      <div><dt>Zuständige Aufsichtsbehörde</dt><dd>${p('aufsicht')}</dd></div>
      <div><dt>Berufsrechtliche Regelungen</dt><dd>${p('berufsordnung')}</dd></div>
      <div><dt>Umsatzsteuer-ID</dt><dd>${p('ustid')}</dd></div>
      <div><dt>Berufshaftpflicht&shy;versicherung</dt><dd>${p('haftpflicht')}</dd></div>
    </dl>

    <h2>Verantwortlich für den Inhalt</h2>
    <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: ${esc(praxis.aerztin)}, ${esc(praxis.adresseEinzeilig)}.</p>

    <h2>Haftung für Inhalte</h2>
    <p>Wir erstellen die Inhalte dieser Website mit großer Sorgfalt. Sie dienen der allgemeinen Information und ersetzen keine persönliche Untersuchung oder Beratung. Eine Gewähr dafür, dass alle Angaben richtig, vollständig und aktuell sind, übernehmen wir trotz sorgfältiger Prüfung nicht. Als Diensteanbieterin ist ${esc(praxis.aerztin)} nach den allgemeinen Gesetzen für eigene Inhalte auf diesen Seiten verantwortlich.</p>

    <h2>Haftung für Links</h2>
    <p>Diese Website enthält Links zu Websites anderer Anbieter, etwa der Stadt Schleswig. Auf deren Inhalte haben wir keinen Einfluss; verantwortlich ist stets der jeweilige Anbieter. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Werden uns Rechtsverletzungen bekannt, entfernen wir den betreffenden Link umgehend.</p>

    <h2>Bildnachweis und Schriften</h2>
    <p>Alle Symbole und Grafiken dieser Website sind eigene Gestaltungen. Das Logo und das Aquarell-Auge sind dem Motiv auf der Visitenkarte der Praxis nachgebildet. Urheberschaft und Nutzungsrecht des Motivs: ${p('bildrechte')}</p>
    <p>Die Schrift „Source Sans 3“ steht unter der SIL Open Font License 1.1 (<a href="assets/fonts/OFL.txt">Lizenztext</a>) und wird vom Server dieser Website geladen.</p>
  </article>`;
}
