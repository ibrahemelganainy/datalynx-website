/*
 * Shows where Arabic text appears inside the English pages.
 *
 * A few Arabic strings are legitimate there: the language switcher label
 * ("العربية") and the footer, which is shared and still Arabic-only. This
 * prints the distinct strings and their likely location so a real
 * translation leak can be told apart from the shared chrome.
 *
 * Usage: node scripts/find-arabic-in-en.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.argv[2], 'out');
const html = fs.readFileSync(path.join(out, 'en/about.html'), 'utf8');

/* Locate the main content region vs footer vs switcher. */
const mainStart = html.indexOf('<main');
const mainEnd = html.indexOf('</main>', mainStart);
const footerStart = html.indexOf('<footer');

const main = html.slice(mainStart, mainEnd);
const footer = html.slice(footerStart);

const runs = (s) =>
  [...new Set(s.match(/[\u0600-\u06FF][\u0600-\u06FF\s،.:؛]{2,}/g) || [])];

console.log('--- inside <main> (should be EMPTY for English pages) ---');
console.log(JSON.stringify(runs(main), null, 1));

console.log('\n--- inside <footer> (shared footer, still Arabic) ---');
const footerRuns = runs(footer);
console.log('count:', footerRuns.length);
console.log(JSON.stringify(footerRuns.slice(0, 8), null, 1));

console.log('\n--- switcher label occurrences ---');
console.log(
  'data-lang-switcher desktop:',
  html.includes('data-lang-switcher="desktop"')
);
console.log('العربية present:', html.includes('العربية'));
