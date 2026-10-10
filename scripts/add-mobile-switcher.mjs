/*
 * Adds the mobile language switcher to the target Navbar's mobile panel.
 *
 * CRLF-aware. Inserts a locale chip at the end of the mobile menu, right
 * before the panel closes, so it sits with the other mobile nav items.
 *
 * Usage: node scripts/add-mobile-switcher.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
const file = path.join(target, 'app/components/Navbar.jsx');

let src = fs.readFileSync(file, 'utf8');

if (src.includes('data-lang-switcher="mobile"')) {
  console.log('mobile switcher already present');
  process.exit(0);
}

const ANCHOR = '        </div>\r\n      </div>\r\n\r\n      {/* CSS';

if (!src.includes(ANCHOR)) {
  console.log('ANCHOR MISS - no change written');
  process.exit(1);
}

const MOBILE = `          {/* مبدّل اللغة (الجوال) */}
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
`;

src = src.replace(
  ANCHOR,
  `${MOBILE}        </div>\r\n      </div>\r\n\r\n      {/* CSS`
);

fs.writeFileSync(file, src, 'utf8');

console.log({
  mobile: src.includes('data-lang-switcher="mobile"'),
  desktop: src.includes('data-lang-switcher="desktop"'),
});
