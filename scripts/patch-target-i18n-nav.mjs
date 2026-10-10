/*
 * Makes the target Navbar locale-aware and adds a language switcher.
 *
 * The target Navbar was Arabic-only with hardcoded strings. This adds:
 *   - a locale read from LocaleProvider (defaults to 'ar', so the existing
 *     homepage renders exactly as before)
 *   - English labels when on /en
 *   - locale-prefixed hrefs for the three new pages on /en
 *   - a compact AR/EN switcher
 *
 * The language switcher only offers a cross-link when the current page has
 * a translated counterpart. The homepage has NO English version, so on `/`
 * the switcher is shown as a non-link (documented in the final report)
 * rather than pointing at a route that does not exist.
 *
 * Usage: node scripts/patch-target-i18n-nav.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
const file = path.join(target, 'app/components/Navbar.jsx');

let src = fs.readFileSync(file, 'utf8');

const ok = (label) => console.log(`  ok: ${label}`);
const skip = (label) => console.log(`  SKIP: ${label}`);

/* 1. imports + locale wiring */
if (!src.includes("from './LocaleProvider'")) {
  src = src.replace(
    /'use client';?\n/,
    `'use client';\n\nimport { usePathname } from 'next/navigation';\n\nimport { useLocale } from './LocaleProvider';\nimport { getAlternatePath } from '../lib/i18n/config';\n`
  );
  ok('imports');

  src = src.replace(
    /export default function Navbar\(\) \{\n/,
    `export default function Navbar() {\n  const { locale, t } = useLocale();\n\n  const pathname = usePathname();\n\n  /*\n   * مسار الصفحة المكافئة في اللغة الأخرى، أو null عندما لا توجد ترجمة\n   * (مثل الصفحة الرئيسية التي لا نسخة إنجليزية لها). في هذه الحالة\n   * يُعرض الزر كعنصر غير قابل للنقر بدل رابط يؤدي إلى صفحة غير موجودة.\n   */\n  const alternatePath = getAlternatePath(pathname, locale);\n\n  const isEnglish = locale === 'en';\n`
  );
  ok('locale wiring');
} else {
  skip('imports already present');
}

/* 2. bilingual nav links, preserving every existing entry */
src = src.replace(
  /  const navLinks = \[[\s\S]*?\n  \]/,
  `  const navLinks = [
    { name: isEnglish ? 'Home' : 'الرئيسية', href: isEnglish ? '/en' : 'https://datalynx.space' },
    { name: isEnglish ? 'Products' : 'المنتجات', href: isEnglish ? '/en#services' : '#services' },
    { name: isEnglish ? 'Our Work' : 'أعمالنا', href: isEnglish ? '/en#portfolio' : '#portfolio' },
    { name: isEnglish ? 'About Us' : 'من نحن', href: isEnglish ? '/en/about' : '/about' },
    { name: isEnglish ? 'Contact Us' : 'اتصل بنا', href: isEnglish ? '/en/contact' : '/contact' },
    {
      name: isEnglish ? 'Privacy Policy' : 'سياسة الخصوصية',
      href: isEnglish ? '/en/privacy' : '/privacy',
    },
    { name: isEnglish ? 'Privacy' : 'الخصوصية', href: isEnglish ? '/en#privacy' : '#privacy' },
  ]`
);
ok('navLinks (bilingual, all entries preserved)');

/* 3. desktop CTA label follows the locale */
src = src.replace(
  /(\s*<a\s*\n\s*href="#contact"\s*\n[\s\S]*?\n\s*>\s*\n\s*)تواصل معنا الان(\s*\n\s*<\/a>)/,
  (m, pre, post) =>
    `${pre}{isEnglish ? 'Contact us now' : 'تواصل معنا الان'}${post}`
);
ok('desktop CTA label');

/* 4. language switcher in the desktop nav, before the CTA */
if (!src.includes('data-lang-switcher')) {
  /*
   * Insert the switcher right after the desktop links map closes and
   * before the CTA anchor.
   */
  src = src.replace(
    /(\n\s*<\/div>\n\n\s*\{\/\* Mobile Menu Button \*\/)/,
    `
          {/* Language switcher (desktop) */}
          {alternatePath ? (
            <a
              data-lang-switcher="desktop"
              href={alternatePath}
              lang={isEnglish ? 'ar' : 'en'}
              aria-label={isEnglish ? 'التبديل إلى العربية' : 'Switch to English'}
              className={\`px-3.5 py-2 rounded-full border text-xs font-bold transition-colors \${
                isScrolled
                  ? 'border-slate-200 text-slate-600 hover:text-datalynx-primary hover:border-datalynx-primary/40'
                  : 'border-white/20 text-slate-200 hover:text-white hover:border-white/40'
              }\`}
            >
              {isEnglish ? 'AR' : 'EN'}
            </a>
          ) : (
            /* لا توجد ترجمة إنجليزية للصفحة الرئيسية بعد */
            <span
              data-lang-switcher="desktop-unavailable"
              title={isEnglish ? '' : 'English version coming soon'}
              aria-disabled="true"
              className={\`px-3.5 py-2 rounded-full border text-xs font-bold opacity-40 cursor-not-allowed \${
                isScrolled ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400'
              }\`}
            >
              {isEnglish ? 'AR' : 'EN'}
            </span>
          )}
$1`
  );
  ok('desktop language switcher');
} else {
  skip('switcher already present');
}

/* 5. language switcher in the mobile menu */
if (!src.includes('data-lang-switcher="mobile"')) {
  src = src.replace(
    /(\n\s*<\/div>\n\s*<\/div>\n\s*<\/nav>)/,
    `
            {/* Language switcher (mobile) */}
            {alternatePath ? (
              <a
                data-lang-switcher="mobile"
                href={alternatePath}
                lang={isEnglish ? 'ar' : 'en'}
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-datalynx-dark hover:text-datalynx-primary hover:border-datalynx-primary/40 transition-colors"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {isEnglish ? 'AR' : 'EN'}
                </span>
                <span>{isEnglish ? 'العربية' : 'English'}</span>
              </a>
            ) : null}
$1`
  );
  ok('mobile language switcher');
} else {
  skip('mobile switcher already present');
}

fs.writeFileSync(file, src, 'utf8');
console.log('  written: app/components/Navbar.jsx');
