// Impressum: Angaben nach § 5 DDG, heilberufliche Angaben als Platzhalter.
import { seitenkopf } from '../bausteine.mjs';

export const seite = {
  datei: 'impressum.html',
  nav: 'impressum',
  titel: 'Impressum – Augenarztpraxis Dr. med. Vera Christoph',
  beschreibung: 'Impressum der Augenarztpraxis Dr. med. Vera Christoph, Fachärztin für Augenheilkunde, Plessenstraße 13, 24837 Schleswig.',
};

export default function inhalt(ctx) {
  const { praxis, esc } = ctx;
  // Angabe aus gemeinsam/praxis.mjs (rechtliches) oder sichtbarer Platzhalter
  const ph = (k) => ctx.angabe(k);

  return `
${seitenkopf({ dach: 'Rechtliches', titel: 'Impressum' })}

<div class="abschnitt abschnitt--knapp">
  <div class="rahmen rechtstext">
    <section aria-labelledby="i-anbieter">
      <h2 id="i-anbieter">Angaben gemäß § 5 DDG</h2>
      <p>${esc(praxis.aerztin)}<br>${esc(praxis.fachrichtung)}<br>${esc(praxis.adresse.strasse)}<br>${esc(praxis.adresse.plz)} ${esc(praxis.adresse.stadt)}</p>
    </section>

    <section aria-labelledby="i-kontakt">
      <h2 id="i-kontakt">Kontakt</h2>
      <dl class="angaben">
        <div><dt>Telefon</dt><dd>${ctx.telefonLink()}</dd></div>
        <div><dt>Telefax</dt><dd>${ctx.fax()}</dd></div>
        <div><dt>E-Mail</dt><dd>${ctx.email()}<span class="angaben-hinweis">${esc(ctx.emailHinweis)}</span></dd></div>
      </dl>
    </section>

    <section aria-labelledby="i-beruf">
      <h2 id="i-beruf">Berufsrechtliche Angaben</h2>
      <dl class="angaben">
        <div><dt>Gesetzliche Berufsbezeichnung</dt><dd>Ärztin, ${esc(praxis.fachrichtung)}</dd></div>
        <div><dt>Approbation und Verleihung der Berufsbezeichnung</dt><dd>${ph('approbation')}</dd></div>
        <div><dt>Zuständige Ärztekammer</dt><dd>${ph('kammer')}</dd></div>
        <div><dt>Zuständige Aufsichtsbehörde</dt><dd>${ph('aufsicht')}</dd></div>
        <div><dt>Berufsrechtliche Regelungen</dt><dd>${ph('berufsordnung')}</dd></div>
      </dl>
    </section>

    <section aria-labelledby="i-steuer">
      <h2 id="i-steuer">Umsatzsteuer</h2>
      <p>Umsatzsteuer-Identifikationsnummer: ${ph('ustid')}</p>
    </section>

    <section aria-labelledby="i-haftpflicht">
      <h2 id="i-haftpflicht">Berufshaftpflichtversicherung</h2>
      <p>${ph('haftpflicht')}</p>
    </section>

    <section aria-labelledby="i-verantwortlich">
      <h2 id="i-verantwortlich">Verantwortlich für den Inhalt</h2>
      <p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV: ${esc(praxis.aerztin)}, ${esc(praxis.adresseEinzeilig)}.</p>
    </section>

    <section aria-labelledby="i-inhalte">
      <h2 id="i-inhalte">Haftung für Inhalte</h2>
      <p>Wir erstellen die Inhalte dieser Website mit großer Sorgfalt. Für die Richtigkeit, Vollständigkeit und Aktualität können wir dennoch keine Gewähr übernehmen. Die Informationen ersetzen keine persönliche Untersuchung und Beratung. Als Diensteanbieterin ist ${esc(praxis.aerztin)} nach den allgemeinen Gesetzen für eigene Inhalte verantwortlich. Werden uns Rechtsverletzungen bekannt, entfernen wir die betroffenen Inhalte umgehend.</p>
    </section>

    <section aria-labelledby="i-links">
      <h2 id="i-links">Haftung für Links</h2>
      <p>Diese Website enthält Links zu Angeboten anderer Anbieter, auf deren Inhalte wir keinen Einfluss haben. Für diese Inhalte ist der jeweilige Anbieter verantwortlich. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Sollten uns solche bekannt werden, entfernen wir den betreffenden Link umgehend.</p>
    </section>

    <section aria-labelledby="i-bilder">
      <h2 id="i-bilder">Bildnachweis und Schriften</h2>
      <p>Das Logo, alle Grafiken und Symbole auf dieser Website sind eigene Gestaltungen für die Praxis. Es werden keine Fotos aus Bilddatenbanken verwendet.</p>
      <p>Die verwendeten Schriften stehen unter der SIL Open Font License 1.1 und werden von unserem eigenen Server geladen. <a href="assets/fonts/OFL.txt">Lizenztext der Schriften (Textdatei)</a></p>
      <p>Das Faltblatt „${esc(ctx.faltblatt.titel)}“ zum Parken in der Innenstadt stammt von der Stadt Schleswig und wird unverändert zum Herunterladen angeboten.</p>
    </section>
  </div>
</div>
`;
}
