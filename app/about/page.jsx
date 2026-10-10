import { LocaleProvider } from '../components/LocaleProvider';

import {
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../lib/structuredData';

import AboutContent from '../components/AboutContent';

/*
 * Arabic من نحن page: /about
 *
 * A real, statically generated HTML page (output: 'export'), so it can be
 * opened directly, refreshed and indexed on its own.
 *
 * canonical points at datalynx.space and the hreflang alternatives are
 * reciprocal with /en/about.
 */
export const metadata = {
  title: 'من نحن | Data Lynx - وكالة تطوير مواقع وأنظمة Odoo',
  description:
    'تعرّف على Data Lynx: وكالة برمجية متكاملة لتطوير المواقع والمتاجر الإلكترونية وأنظمة إدارة الشركات والعيادات وتخصيص Odoo ERP، مع أدوات ويب مجانية على tools.datalynx.space.',
  keywords: [
    'من نحن',
    'Data Lynx',
    'وكالة برمجية',
    'شركة تطوير مواقع',
    'تطوير متاجر إلكترونية',
    'أنظمة إدارة الشركات',
    'تخصيص Odoo',
    'Odoo ERP',
    'تطبيقات موبايل',
    'حلول برمجية',
    'Lex Office',
    'أدوات Data Lynx',
  ],

  alternates: {
    canonical: 'https://datalynx.space/about',
    languages: {
      ar: 'https://datalynx.space/about',
      en: 'https://datalynx.space/en/about',
      'x-default': 'https://datalynx.space/about',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: 'https://datalynx.space/about',
    title: 'من نحن | Data Lynx - وكالة تطوير مواقع وأنظمة Odoo',
    description:
      'وكالة برمجية متكاملة لتطوير المواقع والمتاجر وأنظمة الإدارة وتخصيص Odoo ERP، مع أدوات ويب مجانية.',
    siteName: 'Data Lynx',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'من نحن | Data Lynx',
    description:
      'وكالة برمجية متكاملة لتطوير المواقع وأنظمة الإدارة وتخصيص Odoo ERP.',
  },
};

const jsonLd = buildGraph([
  {
    '@type': 'AboutPage',
    '@id': 'https://datalynx.space/about#aboutpage',
    url: 'https://datalynx.space/about',
    name: 'من نحن | Data Lynx',
    inLanguage: 'ar',
    isPartOf: { '@id': 'https://datalynx.space/#website' },
    about: { '@id': 'https://datalynx.space/#organization' },
  },
  websiteNode('ar'),
  organizationNode(),
  breadcrumbNode([
    { name: 'الرئيسية', url: 'https://datalynx.space' },
    { name: 'من نحن', url: 'https://datalynx.space/about' },
  ]),
]);

export default function ArabicAboutPage() {
  return (
    <LocaleProvider locale="ar">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <AboutContent lang="ar" />
    </LocaleProvider>
  );
}
