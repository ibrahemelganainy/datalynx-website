/*
 * Adds the language switcher to the target Navbar (desktop + mobile).
 *
 * CRLF-aware: anchors tolerate \r?\n so they match this file's line
 * endings.
 *
 * The switcher links to getAlternatePath() only when the current page has
 * a translated counterpart. On the Arabic-only homepage that value is
 * null, so the control renders as a disabled chip instead of a link to a
 * route that does not exist.
 *
 * Usage: node scripts/add-target-switcher.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
const file = path.join(target, 'app/components/Navbar.jsx');

let src = fs.readFileSync(file, 'utf8');

const DESKTOP = `          {/*\r
            مبدّل اللغة (سطح المكتب).\r
\r
            لا يظهر كرابط إلا إذا كانت للصفحة الحالية نسخة في اللغة\r
            الأخرى (about / contact / privacy). الصفحة الرئيسية لا\r
            نسخة إنجليزية لها بعد، لذلك يظهر العنصر معطّلًا بدون رابط\r
            بدل إرسال المستخدم إلى صفحة غير موجودة.\r
          */}\r
          {alternatePath ? (\r
            <a\r
              data-lang-switcher="desktop"\r
              href={alternatePath}\r
              lang={isEnglish ? 'ar' : 'en'}\r
              aria-label={isEnglish ? 'التبديل إلى العربية' : 'Switch to English'}\r
              className={\`px-3.5 py-2 rounded-full border text-xs font-bold transition-colors \${\r
                isScrolled\r
                  ? 'border-slate-200 text-slate-600 hover:text-datalynx-primary hover:border-datalynx-primary/40'\r
                  : 'border-white/20 text-slate-200 hover:text-white hover:border-white/40'\r
              }\`}\r
            >\r
              {isEnglish ? 'AR' : 'EN'}\r
            </a>\r
          ) : (\r
            <span\r
              data-lang-switcher="desktop-unavailable"\r
              aria-disabled="true"\r
              className={\`px-3.5 py-2 rounded-full border text-xs font-bold opacity-40 cursor-not-allowed \${\r
                isScrolled ? 'border-slate-200 text-slate-500' : 'border-white/10 text-slate-400'\r
              }\`}\r
            >\r
              {isEnglish ? 'AR' : 'EN'}\r
            </span>\r
          )}\r
`;

const MOBILE = `            {/* مبدّل اللغة (الجوال) */}\r
            {alternatePath ? (\r
              <a\r
                data-lang-switcher="mobile"\r
                href={alternatePath}\r
                lang={isEnglish ? 'ar' : 'en'}\r
                onClick={() => setIsOpen(false)}\r
                className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-datalynx-dark hover:text-datalynx-primary hover:border-datalynx-primary/40 transition-colors"\r
              >\r
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">\r
                  {isEnglish ? 'AR' : 'EN'}\r
                </span>\r
                <span>{isEnglish ? 'العربية' : 'English'}</span>\r
              </a>\r
            ) : null}\r
`;

let changed = 0;

/*
 * Desktop: land immediately before the CTA link.
 *
 * The anchor tolerates the literal trailing space the source has before
 * its CRLF (`<a \r\n            href="#contact"`), which is why a tighter
 * pattern missed it.
 */
if (!src.includes('data-lang-switcher')) {
  const ctaAnchor = /(\r?\n[ \t]*<a[ \t]*\r?\n[ \t]*href="#contact")/;

  if (ctaAnchor.test(src)) {
    src = src.replace(ctaAnchor, `\r\n${DESKTOP}$1`.replace(/^\r\n/, ''));
    changed += 1;
    console.log('desktop switcher inserted');
  } else {
    console.log('desktop anchor NOT found');
  }
} else {
  console.log('desktop switcher already present');
}

/*
 * Mobile: land immediately before the mobile menu panel's closing tags.
 *
 * The panel ends with `</div>\r\n      </div>\r\n    </nav>` here, so the
 * anchor is written against that exact shape.
 */
if (!src.includes('data-lang-switcher="mobile"')) {
  const panelEnd = /(\r?\n[ \t]*<\/div>\r?\n[ \t]*<\/div>\r?\n[ \t]*<\/nav>)/;

  if (panelEnd.test(src)) {
    src = src.replace(panelEnd, `\r\n${MOBILE}$1`);
    changed += 1;
    console.log('mobile switcher inserted');
  } else {
    console.log('mobile anchor NOT found');
  }
} else {
  console.log('mobile switcher already present');
}

fs.writeFileSync(file, src, 'utf8');

console.log({ changed, mobile: src.includes('data-lang-switcher="mobile"'), desktop: src.includes('data-lang-switcher="desktop"') });
