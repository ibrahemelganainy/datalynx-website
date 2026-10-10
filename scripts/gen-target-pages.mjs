/*
 * Generates the six route pages for the target project.
 *
 * Each page is a thin wrapper: metadata (canonical + reciprocal hreflang),
 * JSON-LD, then the shared content component at the right locale.
 *
 * Usage: node scripts/gen-target-pages.mjs <targetDir>
 */
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2];

const SITE = 'https://datalynx.space';

/* Per-page config: slug, component, schema type, titles, breadcrumb labels. */
const PAGES = [
  {
    slug: 'about',
    component: 'AboutContent',
    schema: 'AboutPage',
    id: 'aboutpage',
    ar: {
      title: 'من نحن',
      metaTitle: 'من نحن | Data Lynx',
      description:
        'تعرّف على Data Lynx وأدواتها لمعالجة الصور وملفات PDF وتحويل الصيغ وتجهيز الملفات لأغراض عملية.',
      ogDescription:
        'تعرّف على Data Lynx والأدوات التي تقدمها لمعالجة الصور وملفات PDF وتحويل صيغ الملفات.',
      crumb: 'من نحن',
      home: 'الرئيسية',
      locale: 'ar_AR',
      inLanguage: 'ar',
    },
    en: {
      title: 'About Us',
      metaTitle: 'About Us | Data Lynx',
      description:
        'Learn about Data Lynx and the tools it provides for working with images, PDF documents and file formats.',
      ogDescription:
        'Learn about Data Lynx and the tools it provides for images, PDF documents and file conversion.',
      crumb: 'About Us',
      home: 'Home',
      locale: 'en_US',
      inLanguage: 'en',
    },
  },
  {
    slug: 'contact',
    component: 'ContactContent',
    schema: 'ContactPage',
    id: 'contactpage',
    ar: {
      title: 'اتصل بنا',
      metaTitle: 'اتصل بنا | Data Lynx',
      description:
        'تواصل مع Data Lynx عبر واتساب أو البريد الإلكتروني للاستفسارات والملاحظات والدعم الفني.',
      ogDescription:
        'تواصل مع Data Lynx عبر واتساب أو البريد الإلكتروني للاستفسارات والدعم الفني.',
      crumb: 'اتصل بنا',
      home: 'الرئيسية',
      locale: 'ar_AR',
      inLanguage: 'ar',
    },
    en: {
      title: 'Contact Us',
      metaTitle: 'Contact Us | Data Lynx',
      description:
        'Contact Data Lynx by WhatsApp or email for questions, feedback and technical support.',
      ogDescription:
        'Contact Data Lynx by WhatsApp or email for questions and technical support.',
      crumb: 'Contact Us',
      home: 'Home',
      locale: 'en_US',
      inLanguage: 'en',
    },
  },
  {
    slug: 'privacy',
    component: 'PrivacyContent',
    schema: 'WebPage',
    id: 'privacypage',
    ar: {
      title: 'سياسة الخصوصية',
      metaTitle: 'سياسة الخصوصية | Data Lynx',
      description:
        'سياسة الخصوصية الخاصة بموقع Data Lynx وكيفية التعامل مع الملفات والمعلومات التقنية وملفات تعريف الارتباط.',
      ogDescription:
        'سياسة الخصوصية لموقع Data Lynx وكيفية التعامل مع الملفات والمعلومات التقنية.',
      crumb: 'سياسة الخصوصية',
      home: 'الرئيسية',
      locale: 'ar_AR',
      inLanguage: 'ar',
    },
    en: {
      title: 'Privacy Policy',
      metaTitle: 'Privacy Policy | Data Lynx',
      description:
        'The privacy policy of the Data Lynx website and how it handles files, technical information and cookies.',
      ogDescription:
        'The privacy policy of the Data Lynx website and how it handles files and technical information.',
      crumb: 'Privacy Policy',
      home: 'Home',
      locale: 'en_US',
      inLanguage: 'en',
    },
  },
];

function page({ lang, page: p }) {
  const isEn = lang === 'en';
  const c = isEn ? p.en : p.ar;

  /*
   * Depth depends on the locale folder:
   *
   *   app/<slug>/page.jsx     -> one level under app/ -> ".."
   *   app/en/<slug>/page.jsx  -> two levels under app/ -> "../.."
   *
   * `app/en` is a real path segment (not a route group), so it adds a
   * genuine directory level to the import path.
   */
  const depth = isEn ? '../..' : '..';
  const self = isEn ? `${SITE}/en/${p.slug}` : `${SITE}/${p.slug}`;
  const alt = isEn ? `${SITE}/${p.slug}` : `${SITE}/en/${p.slug}`;

  /* Home URL for the breadcrumb: root for Arabic, /en for English. */
  const homeUrl = isEn ? `${SITE}/en` : SITE;

  return `import { LocaleProvider } from '${depth}/components/LocaleProvider';

import {
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '${depth}/lib/structuredData';

import ${p.component} from '${depth}/components/${p.component}';

/*
 * ${isEn ? 'English' : 'Arabic'} ${c.title} page: ${isEn ? `/en/${p.slug}` : `/${p.slug}`}
 *
 * A real, statically generated HTML page (output: 'export'), so it can be
 * opened directly, refreshed and indexed on its own.
 *
 * canonical points at datalynx.space and the hreflang alternatives are
 * reciprocal with ${isEn ? `/${p.slug}` : `/en/${p.slug}`}.
 */
export const metadata = {
  title: '${c.metaTitle}',
  description:
    '${c.description}',

  alternates: {
    canonical: '${self}',
    languages: {
      ar: '${isEn ? alt : self}',
      en: '${isEn ? self : alt}',
      'x-default': '${isEn ? alt : self}',
    },
  },

  openGraph: {
    type: 'website',
    locale: '${c.locale}',
    url: '${self}',
    title: '${c.metaTitle}',
    description:
      '${c.ogDescription}',
    siteName: 'Data Lynx',
  },
};

const jsonLd = buildGraph([
  {
    '@type': '${p.schema}',
    '@id': '${self}#${p.id}',
    url: '${self}',
    name: '${c.metaTitle}',
    inLanguage: '${c.inLanguage}',
    isPartOf: { '@id': '${SITE}/#website' },
    about: { '@id': '${SITE}/#organization' },
  },
  websiteNode('${lang}'),
  organizationNode(),
  breadcrumbNode([
    { name: '${c.home}', url: '${homeUrl}' },
    { name: '${c.crumb}', url: '${self}' },
  ]),
]);

export default function ${isEn ? 'English' : 'Arabic'}${p.component.replace(
    'Content',
    ''
  )}Page() {
  return (
    <LocaleProvider locale="${lang}">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <${p.component} lang="${lang}" />
    </LocaleProvider>
  );
}
`;
}

for (const p of PAGES) {
  /* Arabic: /<slug> */
  fs.writeFileSync(
    path.join(target, `app/${p.slug}/page.jsx`),
    page({ lang: 'ar', page: p }),
    'utf8'
  );

  /* English: /en/<slug> */
  fs.mkdirSync(path.join(target, `app/en/${p.slug}`), { recursive: true });
  fs.writeFileSync(
    path.join(target, `app/en/${p.slug}/page.jsx`),
    page({ lang: 'en', page: p }),
    'utf8'
  );
}

console.log('generated:', PAGES.flatMap((p) => [`/${p.slug}`, `/en/${p.slug}`]));
