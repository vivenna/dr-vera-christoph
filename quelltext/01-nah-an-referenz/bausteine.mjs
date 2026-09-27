// Wiederkehrende Bausteine von Entwurf 1.
// Werden von layout.mjs und den Seiten unter seiten/ gemeinsam genutzt,
// damit Tabelle, Termin-Link, Symbole und Links überall gleich aussehen.

/** Aufzählung mit „und“ vor dem letzten Glied: „Dienstag und Donnerstag“ */
export function aufzaehlung(teile) {
  if (teile.length < 2) return teile.join('');
  return `${teile.slice(0, -1).join(', ')} und ${teile.at(-1)}`;
}

/**
 * Sprechzeiten-Tabelle im Stil der Referenz: zwei Spalten, nur dünne Linien
 * in Schriftblau. Mehrere Zeitspannen eines Tages stehen auf dem Telefon
 * untereinander, ab Tabletbreite nebeneinander.
 */
export function zeitenTabelle(ctx, { beschriftung = 'Sprechzeiten der Augenarztpraxis Dr. med. Vera Christoph', klasse = '' } = {}) {
  const zeilen = ctx.praxis.sprechzeiten
    .map((tag) => {
      const zeiten = tag.zeiten
        .map((z) => `<span class="zeit">${ctx.esc(ctx.spanne(z))}</span>`)
        .join('<span class="zeit-trenner">, </span>');
      return `      <tr><th scope="row">${ctx.esc(tag.tag)}</th><td>${zeiten}</td></tr>`;
    })
    .join('\n');
  return `<table class="zeiten-tabelle${klasse ? ` ${klasse}` : ''}">
    <caption class="unsichtbar">${ctx.esc(beschriftung)}</caption>
    <thead><tr><th scope="col">Wochentag</th><th scope="col">Sprechzeiten</th></tr></thead>
    <tbody>
${zeilen}
    </tbody>
  </table>`;
}

/** Tage mit gleichen Zeiten zusammenfassen (für die Fußzeile). */
export function zeitenGruppen(ctx) {
  const gruppen = [];
  for (const tag of ctx.praxis.sprechzeiten) {
    const schluessel = JSON.stringify(tag.zeiten);
    const gruppe = gruppen.find((g) => g.schluessel === schluessel);
    if (gruppe) gruppe.tage.push(tag.tag);
    else gruppen.push({ schluessel, tage: [tag.tag], zeiten: tag.zeiten });
  }
  return gruppen.map((g) => ({ tage: aufzaehlung(g.tage), zeiten: g.zeiten.map((z) => ctx.spanne(z)) }));
}

/** Termin-Link – Ziel und Attribute kommen immer aus ctx.termin. */
export function terminLink(ctx, klasse = 'knopf', text = 'Termin vereinbaren') {
  const hinweis = ctx.termin.extern ? '<span class="unsichtbar"> (öffnet in neuem Fenster)</span>' : '';
  return `<a class="${klasse}" href="${ctx.termin.href}"${ctx.termin.attribute}>${text}${hinweis}</a>`;
}

/** Link zu einer fremden Website, öffnet in neuem Fenster. */
export function fremdLink(href, text, klasse = '') {
  return `<a${klasse ? ` class="${klasse}"` : ''} href="${href}" target="_blank" rel="noopener noreferrer">${text}<span class="unsichtbar"> (öffnet in neuem Fenster)</span></a>`;
}

/** Eigenes, dekoratives Symbol aus assets/bilder/ */
export function symbol(name, groesse = 64, klasse = 'symbol') {
  return `<img class="${klasse}" src="assets/bilder/icon-${name}.svg" alt="" width="${groesse}" height="${groesse}">`;
}

/** Download-Link für das Parkplatz-Faltblatt der Stadt (mit Dateityp und Größe im Linktext). */
export function faltblattLink(ctx, klasse = 'download') {
  const f = ctx.faltblatt;
  return `<a class="${klasse}" href="assets/downloads/${f.datei}">${symbol('dokument', 32, 'download-symbol')}<span>Faltblatt „${ctx.esc(f.titel)}“ der Stadt Schleswig <span class="download-info">(${ctx.esc(f.groesse)}, Stand ${ctx.esc(f.stand)})</span></span></a>`;
}

/** Telefonnummer als großer, gut treffbarer Link */
export function telefon(ctx, klasse = 'link-gross') {
  return ctx.telefonLink(klasse);
}
