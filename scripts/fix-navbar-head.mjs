/*
 * Ensures the target Navbar has its imports and locale values.
 *
 * Written as a separate, explicit step because the earlier optimistic
 * patcher reported success without the text actually being present.
 * This version verifies each mutation before writing.
 *
 * Usage: node scripts/fix-navbar-head.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
const file = path.join(target, 'app/components/Navbar.jsx');

let src = fs.readFileSync(file, 'utf8');

/*
 * The file uses CRLF line endings, so every anchor below is written with
 * \r?\n instead of \n. A plain \n pattern silently matches nothing on a
 * CRLF file, which is what made an earlier attempt report success while
 * changing nothing.
 */
const EOL = /\r?\n/;

/* ---- 1. imports ---- */
if (!src.includes("from 'next/navigation'")) {
  const before = src;
  src = src.replace(
    /^'use client';\r?\n/m,
    `'use client';\r\n\r\nimport { usePathname } from 'next/navigation';\r\n\r\nimport { useLocale } from './LocaleProvider';\r\nimport { getAlternatePath } from '../lib/i18n/config';\r\n`
  );
  console.log('imports added:', src !== before);
} else {
  console.log('imports: already present');
}

/* ---- 2. locale values ---- */
if (!src.includes('const isEnglish')) {
  const before = src;

  src = src.replace(
    /export default function Navbar\(\) \{\r?\n/,
    `export default function Navbar() {
  const { locale } = useLocale();

  const pathname = usePathname();

  /*
   * مسار الصفحة المكافئة في اللغة الأخرى، أو null عندما لا توجد ترجمة
   * (مثل الصفحة الرئيسية التي لا نسخة إنجليزية لها). في هذه الحالة
   * يُعرض الزر كعنصر غير قابل للنقر بدل رابط لصفحة غير موجودة.
   */
  const alternatePath = getAlternatePath(pathname, locale);

  const isEnglish = locale === 'en';

`
  );

  console.log('locale values added:', src !== before);
  console.log('EOL is CRLF-based:', EOL.test(src));
} else {
  console.log('locale values: already present');
}

fs.writeFileSync(file, src, 'utf8');

/* ---- verification from what was actually saved ---- */
const saved = fs.readFileSync(file, 'utf8');

console.log({
  hasUseLocaleImport: /import \{ useLocale \} from '\.\/LocaleProvider'/.test(saved),
  hasUsePathname: /from 'next\/navigation'/.test(saved),
  hasGetAlternatePath: /getAlternatePath/.test(saved),
  hasIsEnglish: /const isEnglish/.test(saved),
  hasAlternatePath: /const alternatePath/.test(saved),
});
