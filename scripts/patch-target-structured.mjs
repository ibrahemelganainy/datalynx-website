/*
 * Points the ported structured-data helper at the main domain.
 *
 * Three adjustments, all infrastructure (no new claims):
 *   - SITE_URL: tools.datalynx.space -> datalynx.space
 *   - Organization name: "Data Lynx Tools" -> "Data Lynx"
 *   - drop the parentOrganization block, which existed only because the
 *     Tools site was a sub-entity of the main company site. On the main
 *     site itself that would describe the company as its own parent.
 *
 * The @id scheme is kept, so the Organization/WebSite entities stay
 * stable and are referenced rather than duplicated across pages.
 *
 * Usage: node scripts/patch-target-structured.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];
const file = path.join(target, 'app/lib/structuredData.js');

let src = fs.readFileSync(file, 'utf8');

src = src.replace(
  "export const SITE_URL = 'https://tools.datalynx.space';",
  "export const SITE_URL = 'https://datalynx.space';"
);

src = src.replace(/name: 'Data Lynx Tools'/g, "name: 'Data Lynx'");

/* Remove the parentOrganization block (multi-line object). */
src = src.replace(/\n\s*parentOrganization: \{[\s\S]*?\n\s*\},/, '');

fs.writeFileSync(file, src, 'utf8');

console.log(
  'SITE_URL:',
  /export const SITE_URL = '([^']+)'/.exec(src)?.[1]
);
console.log('parentOrganization present:', src.includes('parentOrganization'));
console.log(
  "name occurrences:",
  (src.match(/name: 'Data Lynx'/g) || []).length
);
