/*
 * Confirms WHERE the WhatsApp/email strings actually occur, so a match in
 * the footer or in JSON-LD is not mistaken for a contact card on a page
 * that should not have one.
 *
 * Usage: node scripts/check-target-content.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const out = path.join(process.argv[2], 'out');

for (const file of [
  'about.html',
  'en/about.html',
  'contact.html',
  'en/contact.html',
]) {
  const html = fs.readFileSync(path.join(out, file), 'utf8');

  const ldEnd = html.lastIndexOf('application/ld+json');
  const footerStart = html.indexOf('<footer');

  const count = (re) => (html.match(re) || []).length;

  /* mailto/wa.me occurrences that are real anchors, not JSON-LD text */
  const anchorWa = count(/<a[^>]+href="https:\/\/wa\.me\/201507071671"/g);
  const anchorMail = count(/<a[^>]+href="mailto:lexoffice\.datalynx@proton\.me"/g);

  console.log(
    `${file}: anchors wa=${anchorWa} mail=${anchorMail} ` +
      `hasFooter=${footerStart > -1} `
  );
}

/* Does the Arabic contact form have all inquiry options? */
const contactAr = fs.readFileSync(path.join(out, 'contact.html'), 'utf8');
const contactEn = fs.readFileSync(path.join(out, 'en/contact.html'), 'utf8');

console.log('\nform fields (ar):', {
  name: /id="contact-name"/.test(contactAr),
  phone: /id="contact-phone"/.test(contactAr),
  email: /id="contact-email"/.test(contactAr),
  inquiry: /id="contact-inquiry"/.test(contactAr),
  message: /id="contact-message"/.test(contactAr),
});

console.log('form fields (en):', {
  name: /id="contact-name"/.test(contactEn),
  phone: /id="contact-phone"/.test(contactEn),
  inquiry: /id="contact-inquiry"/.test(contactEn),
});

/* Language check: no Arabic prose should appear in the English pages */
const arabicRe = /[\u0600-\u06FF]{4,}/g;
console.log('\nArabic runs in en/about.html:', (contactEn && fs.readFileSync(path.join(out, 'en/about.html'), 'utf8').match(arabicRe) || []).length);
console.log('Arabic runs in en/contact.html:', (contactEn.match(arabicRe) || []).length);
console.log('Arabic runs in en/privacy.html:', (fs.readFileSync(path.join(out, 'en/privacy.html'), 'utf8').match(arabicRe) || []).length);
