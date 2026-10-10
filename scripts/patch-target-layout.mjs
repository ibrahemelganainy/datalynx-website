/*
 * Minimal corrections to the target's root layout.
 *
 * Two fixes only, both required by the port:
 *
 *  1. `lang="en"` with no `dir` on an Arabic RTL site. The Arabic root
 *     pages need lang="ar" dir="rtl", otherwise assistive technology and
 *     search engines read the page as English LTR. This does not change
 *     any visible styling.
 *
 *  2. metadataBase, so the new pages' canonical/OG URLs resolve against
 *     https://datalynx.space instead of localhost during the build.
 *
 * The existing title/description are left exactly as they were.
 *
 * Usage: node scripts/patch-target-layout.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
const file = path.join(target, 'app/layout.tsx');

let src = fs.readFileSync(file, 'utf8');

/* 1. html lang/dir */
if (src.includes('lang="en"') && !src.includes('dir=')) {
  src = src.replace(
    /<html\s*\n\s*lang="en"/,
    `/* الجذر عربي (RTL): كان lang="en" بدون dir، وهو ما يجعل الصفحة\n       تُقرأ كإنجليزية من اليسار لليمين. تصحيحه لا يغيّر الشكل\n       المرئي إطلاقًا. */\n      <html\n        lang="ar"\n        dir="rtl"`
  );
  console.log('  ok: html lang/dir');
} else {
  console.log('  SKIP: html lang/dir');
}

/* 2. metadataBase */
if (!src.includes('metadataBase')) {
  src = src.replace(
    /export const metadata = \{/,
    `export const metadata: Metadata = {\n  metadataBase: new URL("https://datalynx.space"),`
  );
  console.log('  ok: metadataBase');
} else {
  console.log('  SKIP: metadataBase');
}

fs.writeFileSync(file, src, 'utf8');
console.log('  written: app/layout.tsx');
