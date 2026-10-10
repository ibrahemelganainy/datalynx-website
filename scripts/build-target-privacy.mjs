/*
 * Generates the target project's Privacy content modules.
 *
 * The Arabic policy lives inline in the source page file as JSX, so its
 * section text is extracted from that file's string literals and regrouped
 * into a data module with the same wording. The English policy already
 * exists as a data module and is copied through as-is.
 *
 * Nothing is reworded: both outputs carry the source sentences verbatim.
 *
 * Usage: node scripts/build-target-privacy.mjs <sourceDir> <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const [sourceDir, targetDir] = process.argv.slice(2);

/* ---------- Arabic: extract sections from the source page ---------- */

const arPage = fs.readFileSync(
  path.join(sourceDir, 'app/(ar)/privacy/page.jsx'),
  'utf8'
);

/*
 * Pull every `{ id: 'x', title: '...', content: (...) }` section and keep
 * the text nodes inside its JSX. Tags are stripped because the target
 * renders paragraphs itself.
 */
const sectionRegex =
  /id:\s*'([a-z-]+)',\s*\n\s*title:\s*'([^']+)',\s*\n\s*content:\s*\(\s*\n([\s\S]*?)\n\s*\),\s*\n\s*\},/g;

const arSections = [];

for (const match of arPage.matchAll(sectionRegex)) {
  const [, id, title, body] = match;

  /*
   * Only <p> ... </p> runs become paragraphs.
   *
   * Splitting on every tag would cut a sentence wherever an inline
   * <strong> appears ("... in <strong>Data Lynx Tools</strong>, a
   * platform ...") and turn one paragraph into three fragments. So the
   * paragraph boundaries are taken from the real block element, and
   * inline tags are then removed from the text with their content kept.
   */
  const texts = [];

  for (const p of body.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)) {
    const cleaned = p[1]
      /* drop any nested inline tag but keep its inner text */
      .replace(/<[^>]+>/g, '')
      /* drop JSX expression containers (attribute values, etc.) */
      .replace(/\{[^{}]*\}/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (cleaned.length > 2) texts.push(cleaned);
  }

  /*
   * The callout inside the "files" section is a real content block in
   * the source (heading + body), so it is captured separately and
   * rendered as the highlighted notice it is designed to be.
   */
  const blocks = [];

  for (const h3 of body.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)) {
    const heading = h3[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

    const after = body.slice(h3.index + h3[0].length);
    const p = after.match(/<p[^>]*>([\s\S]*?)<\/p>/);

    if (heading && p) {
      blocks.push({
        title: heading,
        text: p[1]
          .replace(/<[^>]+>/g, '')
          .replace(/\{[^{}]*\}/g, '')
          .replace(/\s+/g, ' ')
          .trim(),
      });
    }
  }

  arSections.push({
    id,
    title,
    paragraphs: texts,
    ...(blocks.length ? { blocks } : {}),
  });
}

/* ---------- English: reuse the source data module ---------- */

const privacyEn = await import(
  `file:///${path.join(sourceDir, 'app/lib/i18n/content/privacyEn.js').replace(/\\/g, '/')}`
);

const enSections = privacyEn.privacySections.map((s) => ({
  id: s.id,
  title: s.title,
  paragraphs: s.paragraphs || [],
  ...(s.blocks ? { blocks: s.blocks } : {}),
  ...(s.links ? { links: s.links } : {}),
}));

/* ---------- Header text for both pages ---------- */

const arHeaderText = {
  badge: 'خصوصيتك مهمة لدينا',
  title: 'سياسة الخصوصية',
  description:
    'توضح هذه الصفحة كيفية تعامل Data Lynx Tools مع الملفات والمعلومات التقنية وملفات تعريف الارتباط عند استخدام خدمات الموقع.',
  lastUpdated: 'آخر تحديث: 8 أكتوبر 2026',
  noticeTitle: 'معالجة الملفات محليًا',
  noticeDescription:
    'أدوات Data Lynx Tools مصممة لمعالجة الصور وملفات PDF داخل متصفح المستخدم. لا نطلب منك رفع ملفاتك إلى خادم Data Lynx من أجل ضغطها أو تحويلها.',
  disclaimer:
    'هذه السياسة تصف طريقة تشغيل Data Lynx Tools والبيانات التي قد تتم معالجتها من خلال الخدمات المستخدمة على الموقع. وهي ليست استشارة قانونية، وقد تحتاج إلى تحديثها عندما تتم إضافة خدمات أو تقنيات جديدة إلى الموقع.',
  backHome: 'العودة إلى Data Lynx Tools',
};

const enHeaderText = {
  badge: 'Your privacy matters to us',
  title: 'Privacy Policy',
  description:
    'This page explains how Data Lynx Tools handles files, technical information and cookies when you use the services on this site.',
  lastUpdated: 'Last updated: 8 October 2026',
  noticeTitle: 'Files are processed locally',
  noticeDescription:
    'Data Lynx Tools is designed to process images and PDF files inside the user\u2019s browser. We never ask you to upload your files to a Data Lynx server in order to compress or convert them.',
  disclaimer:
    'This policy describes how Data Lynx Tools operates and what data may be processed through the services used on the site. It is not legal advice and may need to be updated when new services or technologies are added to the site.',
  backHome: 'Back to Data Lynx Tools',
};

const header = `/*
 * Privacy policy content for the ported page.
 *
 * IMPORTANT - content applicability (reported, not silently changed):
 *
 * The wording below describes Data Lynx TOOLS specifically: browser-based
 * image/PDF processing and the absence of server-side file storage. The
 * main datalynx.space site is a corporate site, so some statements apply
 * to the tools product rather than to every service offered by the
 * company. The original wording was preserved as instructed. Only
 * technical references (canonical URL, language alternatives) were
 * pointed at the main domain.
 */`;

fs.writeFileSync(
  path.join(targetDir, 'app/lib/i18n/content/privacyAr.js'),
  `${header}\nexport const privacySections = ${JSON.stringify(
    arSections,
    null,
    2
  )};\n\nexport const privacyHeader = ${JSON.stringify(
    arHeaderText,
    null,
    2
  )};\n`,
  'utf8'
);

fs.writeFileSync(
  path.join(targetDir, 'app/lib/i18n/content/privacyEn.js'),
  `${header}\nexport const privacySections = ${JSON.stringify(
    enSections,
    null,
    2
  )};\n\nexport const privacyHeader = ${JSON.stringify(
    enHeaderText,
    null,
    2
  )};\n`,
  'utf8'
);

console.log(
  'ar sections:',
  arSections.map((s) => `${s.id}(${s.paragraphs.length}p)`)
);
console.log(
  'en sections:',
  enSections.map((s) => `${s.id}(${s.paragraphs.length}p)`)
);
