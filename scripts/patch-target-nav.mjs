/*
 * Adds the three new page links to the target's Navbar and Footer.
 *
 * Surgical: it inserts entries into the existing arrays only. Nothing is
 * removed, reordered or restyled, and the existing #anchor links are
 * left in place.
 *
 * Usage: node scripts/patch-target-nav.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];

function patch(rel, edits) {
  const file = path.join(target, rel);
  let src = fs.readFileSync(file, 'utf8');
  const before = src;

  for (const { find, replace, label } of edits) {
    if (!find.test(src)) {
      console.log(`  SKIP (not found): ${label}`);
      continue;
    }
    src = src.replace(find, replace);
    console.log(`  ok: ${label}`);
  }

  if (src !== before) {
    fs.writeFileSync(file, src, 'utf8');
    console.log(`  written: ${rel}`);
  } else {
    console.log(`  unchanged: ${rel}`);
  }
}

/* ---------------- Navbar ---------------- */
patch('app/components/Navbar.jsx', [
  {
    label: 'navbar: add about + privacy + contact links',
    find: /(\s*\{\s*name:\s*'أعمالنا',\s*href:\s*'#portfolio'\s*\},[^\n]*\n)/,
    replace: (m) =>
      `${m}` +
      `    { name: 'من نحن', href: '/about' },\n` +
      `    { name: 'اتصل بنا', href: '/contact' },\n` +
      `    { name: 'سياسة الخصوصية', href: '/privacy' },\n`,
  },
]);

/* ---------------- Footer ---------------- */
patch('app/components/Footer.jsx', [
  {
    label: 'footer: add about + contact + privacy page links',
    find: /(\s*<li><a href="#portfolio"[^\n]*\n)/,
    replace: (m) =>
      `${m}` +
      `              <li><a href="/about" className="hover:text-white transition-colors">من نحن</a></li>\n` +
      `              <li><a href="/contact" className="hover:text-white transition-colors">اتصل بنا</a></li>\n` +
      `              <li><a href="/privacy" className="hover:text-white transition-colors">سياسة الخصوصية</a></li>\n`,
  },
]);
