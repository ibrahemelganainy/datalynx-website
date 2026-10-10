import { LocaleProvider } from '../components/LocaleProvider';

import {
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../lib/structuredData';

import ContactContent from '../components/ContactContent';

/*
 * Arabic اتصل بنا page: /contact
 *
 * A real, statically generated HTML page (output: 'export'), so it can be
 * opened directly, refreshed and indexed on its own.
 *
 * canonical points at datalynx.space and the hreflang alternatives are
 * reciprocal with /en/contact.
 */
export const metadata = {
  title: 'اتصل بنا | Data Lynx - اطلب موقعك أو نظامك البرمجي',
  description:
    'تواصل مع Data Lynx عبر واتساب أو البريد الإلكتروني لطلب تصميم موقع أو متجر إلكتروني أو نظام إدارة أو تخصيص Odoo ERP أو تطبيق موبايل. استشارة تقنية مجانية.',
  keywords: [
    'اتصل بنا',
    'تواصل معنا',
    'طلب تصميم موقع',
    'طلب متجر إلكتروني',
    'تطوير نظام إدارة',
    'تخصيص Odoo',
    'تطبيق موبايل',
    'استشارة تقنية مجانية',
    'شركة برمجة',
    'Data Lynx',
    'واتساب',
  ],

  alternates: {
    canonical: 'https://datalynx.space/contact',
    languages: {
      ar: 'https://datalynx.space/contact',
      en: 'https://datalynx.space/en/contact',
      'x-default': 'https://datalynx.space/contact',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: 'https://datalynx.space/contact',
    title: 'اتصل بنا | Data Lynx - اطلب موقعك أو نظامك البرمجي',
    description:
      'تواصل مع Data Lynx لطلب تصميم موقع أو متجر إلكتروني أو نظام إدارة أو تخصيص Odoo ERP.',
    siteName: 'Data Lynx',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'اتصل بنا | Data Lynx',
    description:
      'اطلب تصميم موقعك أو نظامك البرمجي من Data Lynx عبر واتساب أو البريد الإلكتروني.',
  },
};

const jsonLd = buildGraph([
  {
    '@type': 'ContactPage',
    '@id': 'https://datalynx.space/contact#contactpage',
    url: 'https://datalynx.space/contact',
    name: 'اتصل بنا | Data Lynx',
    inLanguage: 'ar',
    isPartOf: { '@id': 'https://datalynx.space/#website' },
    about: { '@id': 'https://datalynx.space/#organization' },
  },
  websiteNode('ar'),
  organizationNode(),
  breadcrumbNode([
    { name: 'الرئيسية', url: 'https://datalynx.space' },
    { name: 'اتصل بنا', url: 'https://datalynx.space/contact' },
  ]),
]);

export default function ArabicContactPage() {
  return (
    <LocaleProvider locale="ar">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <ContactContent lang="ar" />
    </LocaleProvider>
  );
}
