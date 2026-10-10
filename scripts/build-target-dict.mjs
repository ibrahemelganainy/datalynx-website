/*
 * Builds the target project's scoped dictionaries from the source ones.
 *
 * It imports the source dictionaries (real ES modules, so no text
 * parsing) and writes out ONLY the keys the three ported pages need:
 *
 *   nav      -> the labels for the new links
 *   about    -> About Us page content
 *   contact  -> Contact Us page content
 *   privacy  -> Privacy Policy page content
 *   languages-> switcher labels
 *
 * Wording is passed through untouched. Nothing is translated, reworded
 * or summarised here.
 *
 * Usage: node scripts/build-target-dict.mjs <sourceDir> <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const [sourceDir, targetDir] = process.argv.slice(2);

const { ar } = await import(
  `file:///${path.join(sourceDir, 'app/lib/i18n/ar.js').replace(/\\/g, '/')}`
);
const { en } = await import(
  `file:///${path.join(sourceDir, 'app/lib/i18n/en.js').replace(/\\/g, '/')}`
);

/* Only the nav keys this integration needs. */
const NAV_KEYS = ['about', 'contact'];

function pick(source) {
  const nav = {};

  for (const key of NAV_KEYS) {
    if (source.nav?.[key] !== undefined) nav[key] = source.nav[key];
  }

  return {
    nav,

    /*
     * The three page payloads, copied verbatim. Serialised with
     * JSON.stringify so every quote, escape and Arabic character is
     * preserved exactly as authored.
     */
    about: source.about,
    contact: source.contact,
    privacy: source.privacy,

    languages: source.languages,
  };
}

function render(name, data, header) {
  const body = JSON.stringify(data, null, 2);

  return `${header}\nexport const ${name} = ${body};\n`;
}

const arHeader = `/*
 * Arabic dictionary for the ported pages on datalynx.space.
 *
 * Generated from the Data Lynx Tools Arabic dictionary. The wording of
 * the About, Contact and Privacy content is copied verbatim from the
 * source project - nothing here is rewritten or reworded.
 *
 * Only the keys these three pages and their navigation links need are
 * included. The existing homepage sections are not represented here
 * because they were not part of this port.
 */`;

const enHeader = `/*
 * English dictionary for the ported pages on datalynx.space.
 *
 * Generated from the Data Lynx Tools English dictionary, which is an
 * independent English text (not a machine translation of the Arabic).
 * The About, Contact and Privacy wording is copied verbatim.
 */`;

fs.writeFileSync(
  path.join(targetDir, 'app/lib/i18n/ar.js'),
  render('ar', pick(ar), arHeader),
  'utf8'
);

fs.writeFileSync(
  path.join(targetDir, 'app/lib/i18n/en.js'),
  render('en', pick(en), enHeader),
  'utf8'
);

console.log(
  'ar keys:',
  JSON.stringify({
    about: Object.keys(pick(ar).about || {}),
    contact: Object.keys(pick(ar).contact || {}),
    privacy: Object.keys(pick(ar).privacy || {}),
  })
);
console.log('en about/contact/privacy present:', {
  about: Boolean(en.about),
  contact: Boolean(en.contact),
  privacy: Boolean(en.privacy),
});
