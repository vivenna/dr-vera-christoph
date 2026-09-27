// Impressum nach § 5 DDG mit heilberuflichen Pflichtangaben.
// Fehlende Angaben erscheinen als Platzhalter aus ctx.PLATZHALTER.

import { praxis } from '../../gemeinsam/praxis.mjs';
import { seitenkopf, externerLink, trennen } from '../bausteine.mjs';

export const seite = {
  datei: 'impressum.html',
  titel: `Impressum – Augenarztpraxis ${praxis.aerztin}, ${praxis.ort}`,
  beschreibung: `Impressum der Augenarztpraxis ${praxis.aerztin}, ${praxis.adresseEinzeilig}: Anbieterangaben, berufsrechtliche Angaben und Haftungshinweise.`,
  nav: 'impressum',
};

export default function inhalt(ctx) {
  const { esc } = ctx;
  const p = ctx.praxis;
  const a = p.adresse;
  // Angabe aus gemeinsam/praxis.mjs (rechtliches) oder sichtbarer Platzhalter
  const ph = (k) => ctx.angabe(k);

  const abschnitte = [
    ['anbieter', 'Angaben gemäß § 5 DDG', `<p>${esc(p.aerztin)}<br>${esc(p.praxisname)}<br>${esc(a.strasse)}<br>${esc(a.plz)} ${esc(a.stadt)}</p>
<dl class="angaben">
<div><dt>Telefon</dt><dd><a href="${p.telefon.href}">${esc(p.telefon.anzeige)}</a></dd></div>
<div><dt>E-Mail</dt><dd>${ctx.email()}</dd></div>
<div><dt>Fax</dt><dd>${ctx.fax()}</dd></div>
</dl>`],
    ['beruf', 'Berufsrechtliche Angaben', `<dl class="angaben">
<div><dt>Gesetzliche Berufsbezeichnung</dt><dd>Ärztin, ${esc(p.fachrichtung)}</dd></div>
<div><dt>Verliehen in</dt><dd>${ph('approbation')}</dd></div>
<div><dt>Zuständige Ärztekammer</dt><dd>${ph('kammer')}</dd></div>
<div><dt>Zuständige Aufsichtsbehörde</dt><dd>${ph('aufsicht')}</dd></div>
<div><dt>Berufsrechtliche Regelungen</dt><dd>${ph('berufsordnung')}</dd></div>
<div><dt>Umsatzsteuer-Identifikationsnummer</dt><dd>${ph('ustid')}</dd></div>
<div><dt>Berufshaftpflichtversicherung</dt><dd>${ph('haftpflicht')}</dd></div>
</dl>`],
    ['verantwortlich', 'Verantwortlich für den Inhalt', `<p>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:<br>${esc(p.aerztin)}, ${esc(a.strasse)}, ${esc(a.plz)} ${esc(a.stadt)}</p>`],
    ['haftung-inhalte', 'Haftung für Inhalte', `<p>Wir erstellen die Inhalte dieser Website mit großer Sorgfalt. Für Richtigkeit, Vollständigkeit und Aktualität können wir dennoch keine Gewähr übernehmen. Die Informationen auf dieser Website ersetzen keine ärztliche Untersuchung und keine persönliche Beratung.</p>`],
    ['haftung-links', 'Haftung für Links', `<p>Diese Website enthält Links zu Websites anderer Anbieter. Auf deren Inhalte haben wir keinen Einfluss, verantwortlich ist jeweils der Anbieter der verlinkten Seite. Zum Zeitpunkt der Verlinkung waren keine Rechtsverstöße erkennbar. Sollten uns Rechtsverletzungen bekannt werden, entfernen wir den betreffenden Link umgehend.</p>`],
    ['nachweise', 'Bildnachweis und Schriften', `<ul class="punkt-liste">
<li>Logo: Augenmarke der Praxis ${esc(p.aerztin)}, dem Motiv der Praxis-Visitenkarte nachgebildet. Urheberschaft und Nutzungsrecht des Motivs: ${ph('bildrechte')}</li>
<li>Alle übrigen Grafiken und Symbole: eigene Gestaltung für diese Website.</li>
<li>Schriften: Source Sans 3 und Source Serif 4 von Adobe, lizenziert unter der SIL Open Font License 1.1, lokal eingebunden.</li>
<li>Kartendaten (nur nach Ihrem Klick auf „Karte laden“): ${externerLink(ctx, ctx.karte.lizenzLink, ctx.karte.quellenhinweis)}.</li>
<li>Faltblatt „${esc(ctx.faltblatt.titel)}“: ${esc(ctx.faltblatt.herausgeber)}.</li>
</ul>`],
  ];

  return `
${seitenkopf({ stichwort: 'Rechtliches', titel: 'Impressum' })}

<div class="rechtstext raster">
<div class="haupt">
${abschnitte.map(([id, titel, html]) => `<section id="${id}" aria-labelledby="${id}-titel">
<h2 id="${id}-titel">${trennen(esc(titel))}</h2>
${html}
</section>`).join('\n')}
</div>
</div>
`;
}
