import { LocaleProvider } from '../components/LocaleProvider';

import {
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../lib/structuredData';

import PrivacyContent from '../components/PrivacyContent';

/*
 * Arabic سياسة الخصوصية page: /privacy
 *
 * A real, statically generated HTML page (output: 'export'), so it can be
 * opened directly, refreshed and indexed on its own.
 *
 * canonical points at datalynx.space and the hreflang alternatives are
 * reciprocal with /en/privacy.
 */
export const metadata = {
  title: 'سياسة الخصوصية | Data Lynx - ملفات تعريف الارتباط وإعلانات AdSense',
  description:
    'سياسة الخصوصية لموقعي Data Lynx (datalynx.space و tools.datalynx.space): البيانات، معالجة الملفات داخل المتصفح، ملفات تعريف الارتباط، وإعلانات Google AdSense.',
  keywords: [
    'سياسة الخصوصية',
    'ملفات تعريف الارتباط',
    'كوكيز',
    'Google AdSense',
    'إعلانات جوجل',
    'خصوصية المستخدم',
    'معالجة الملفات داخل المتصفح',
    'Data Lynx',
    'أدوات Data Lynx',
  ],

  alternates: {
    canonical: 'https://datalynx.space/privacy',
    languages: {
      ar: 'https://datalynx.space/privacy',
      en: 'https://datalynx.space/en/privacy',
      'x-default': 'https://datalynx.space/privacy',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: 'https://datalynx.space/privacy',
    title: 'سياسة الخصوصية | Data Lynx',
    description:
      'كيف تتعامل Data Lynx مع البيانات والملفات وملفات تعريف الارتباط، وإفصاح استخدام إعلانات Google AdSense.',
    siteName: 'Data Lynx',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'سياسة الخصوصية | Data Lynx',
    description:
      'ملفات تعريف الارتباط وإعلانات Google AdSense وكيفية تعامل Data Lynx مع الملفات والبيانات.',
  },
};

const jsonLd = buildGraph([
  {
    '@type': 'WebPage',
    '@id': 'https://datalynx.space/privacy#privacypage',
    url: 'https://datalynx.space/privacy',
    name: 'سياسة الخصوصية | Data Lynx',
    inLanguage: 'ar',
    isPartOf: { '@id': 'https://datalynx.space/#website' },
    about: { '@id': 'https://datalynx.space/#organization' },
  },
  websiteNode('ar'),
  organizationNode(),
  breadcrumbNode([
    { name: 'الرئيسية', url: 'https://datalynx.space' },
    { name: 'سياسة الخصوصية', url: 'https://datalynx.space/privacy' },
  ]),
]);

export default function ArabicPrivacyPage() {
  return (
    <LocaleProvider locale="ar">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <PrivacyContent lang="ar" />
    </LocaleProvider>
  );
}
