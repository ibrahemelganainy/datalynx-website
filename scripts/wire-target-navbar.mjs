/*
 * Wires the locale into the target Navbar.
 *
 * Adds the imports and the locale/pathname/alternatePath values the
 * bilingual navLinks array relies on. Idempotent: safe to re-run.
 *
 * Usage: node scripts/wire-target-navbar.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
const file = path.join(target, 'app/components/Navbar.jsx');

let src = fs.readFileSync(file, 'utf8');

if (src.includes('useLocale')) {
  console.log('already wired');
  process.exit(0);
}

/* 1. imports */
src = src.replace(
  /'use client';\n/,
  `'use client';\n\nimport { usePathname } from 'next/navigation';\n\nimport { useLocale } from './LocaleProvider';\nimport { getAlternatePath } from '../lib/i18n/config';\n`
);

/* 2. locale values, inserted right after the component signature */
const anchor = /export default function Navbar\(\) \{\n/;

src = src.replace(
  anchor,
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

fs.writeFileSync(file, src, 'utf8');

console.log('wired:', {
  hasUseLocale: src.includes('useLocale'),
  hasIsEnglish: src.includes('const isEnglish'),
  hasAlternate: src.includes('alternatePath'),
});
