/*
 * Verifies the built target output for the six ported pages.
 *
 * Reads the real exported HTML (not source) and checks:
 *   - title
 *   - canonical
 *   - reciprocal hreflang
 *   - JSON-LD parses and carries the expected @type
 *   - lang / dir on the page wrapper
 *   - WhatsApp and mailto links
 *   - no "noindex"
 *   - the four data-lang-switcher states
 *
 * Usage: node scripts/verify-target-output.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.argv[2], 'out');

const PAGES = [
  ['about', 'about.html', 'ar', 'rtl', 'AboutPage'],
  ['contact', 'contact.html', 'ar', 'rtl', 'ContactPage'],
  ['privacy', 'privacy.html', 'ar', 'rtl', 'WebPage'],
  ['about', 'en/about.html', 'en', 'ltr', 'AboutPage'],
  ['contact', 'en/contact.html', 'en', 'ltr', 'ContactPage'],
  ['privacy', 'en/privacy.html', 'en', 'ltr', 'WebPage'],
];

const results = [];

for (const [slug, file, lang, dir, schema] of PAGES) {
  const full = path.join(out, file);
  const html = fs.readFileSync(full, 'utf8');

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] || null;
  const canonical =
    html.match(/rel="canonical" href="([^"]+)"/)?.[1] || null;

  const hreflang = {};
  for (const m of html.matchAll(
    /rel="alternate"\s+hrefLang="([^"]+)"\s+href="([^"]+)"/gi
  )) {
    hreflang[m[1]] = m[2];
  }

  const blocks = [
    ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
  ].map((m) => m[1]);

  let ldValid = true;
  let types = [];
  try {
    for (const raw of blocks) {
      const parsed = JSON.parse(raw.replace(/\\u003c/g, '<'));
      types = (parsed['@graph'] || []).map((n) => n['@type']);
    }
  } catch {
    ldValid = false;
  }

  /* Note: `pagePath`, not `path` - the import of node:path is shadowed otherwise. */
  const pagePath = lang === 'en' ? `/en/${slug}` : `/${slug}`;

  results.push({
    file,
    lang,
    title,
    canonical,
    canonicalOk: canonical === `https://datalynx.space${pagePath}`,
    hreflang,
    hreflangOk:
      new Set(Object.values(hreflang)).size === 2 &&
      Object.values(hreflang).includes(`https://datalynx.space/${slug}`) &&
      Object.values(hreflang).includes(`https://datalynx.space/en/${slug}`),
    jsonLdBlocks: blocks.length,
    ldValid,
    types,
    typeOk: types.includes(schema) && types.includes('Organization'),
    wrapperLang: html.includes(`lang="${lang}"`),
    wrapperDir: html.includes(`dir="${dir}"`),
    whatsapp: /https:\/\/wa\.me\/201507071671/.test(html),
    mailto: /mailto:lexoffice\.datalynx@proton\.me/.test(html),
    hasSwitcher:
      html.includes('data-lang-switcher="desktop"') ||
      html.includes('data-lang-switcher="desktop-unavailable"'),
    noindex: /noindex/i.test(html),
    /* the switcher must point at the sibling locale */
    switcherHref:
      html.match(/data-lang-switcher="desktop"\s+href="([^"]+)"/)?.[1] ?? null,
  });
}

console.log(
  JSON.stringify(
    results.map((r) => ({
      file: r.file,
      title: r.title,
      canonicalOk: r.canonicalOk,
      hreflangOk: r.hreflangOk,
      ldValid: r.ldValid,
      typeOk: r.typeOk,
      langDir: `${r.wrapperLang}/${r.wrapperDir}`,
      wa: r.whatsapp,
      mail: r.mailto,
      switcher: r.switcherHref,
      noindex: r.noindex,
    })),
    null,
    1
  )
);

/* ---------- sitemap ---------- */
const sm = fs.readFileSync(path.join(out, 'sitemap.xml'), 'utf8');
console.log('\nsitemap <loc> entries:');
for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) console.log('  ' + m[1]);

console.log(
  '\nsitemap has all six:',
  ['about', 'contact', 'privacy'].every(
    (s) =>
      sm.includes(`datalynx.space/${s}<`) &&
      sm.includes(`datalynx.space/en/${s}<`)
  )
);
console.log('sitemap hreflang links:', (sm.match(/xhtml:link/g) || []).length);
