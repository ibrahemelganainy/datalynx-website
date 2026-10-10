import HomeContent from '../homeContent';

import {
  buildGraph,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../lib/structuredData';

/*
 * English home page: /en
 *
 * This route did not exist, and that was the real reason the language
 * switcher did nothing on the landing page: getAlternatePath returned
 * null, so the button was rendered disabled.
 *
 * It reuses the exact same sections as "/" through homeContent.jsx, so
 * both languages share one design and one source of truth.
 */
export const metadata = {
  title: 'Data Lynx | Web Development, E-Commerce & Odoo ERP Solutions',
  description:
    'Data Lynx is a full-service software agency: website and e-commerce development, business and clinic management systems, Odoo ERP customisation, and free browser-based file tools at tools.datalynx.space.',
  keywords: [
    'web development',
    'website design',
    'software company',
    'e-commerce development',
    'online store',
    'business management system',
    'Odoo',
    'Odoo ERP',
    'Odoo customisation',
    'mobile app development',
    'React Native',
    'digital transformation',
    'software solutions',
    'Data Lynx',
    'free online tools',
    'image compression',
    'PDF compression',
    'file format conversion',
  ],

  alternates: {
    canonical: 'https://datalynx.space/en',
    languages: {
      ar: 'https://datalynx.space',
      en: 'https://datalynx.space/en',
      'x-default': 'https://datalynx.space',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://datalynx.space/en',
    title: 'Data Lynx | Web Development & Odoo ERP Solutions',
    description:
      'Data Lynx builds websites, online stores, business management systems and Odoo ERP customisations, with free browser-based tools.',
    siteName: 'Data Lynx',
  },
};

const jsonLd = buildGraph([
  {
    '@type': 'WebPage',
    '@id': 'https://datalynx.space/en#webpage',
    url: 'https://datalynx.space/en',
    name: 'Data Lynx | Web Development, E-Commerce & Odoo ERP Solutions',
    inLanguage: 'en',
    isPartOf: { '@id': 'https://datalynx.space/#website' },
    about: { '@id': 'https://datalynx.space/#organization' },
  },
  websiteNode('en'),
  organizationNode(),
]);

export default function EnglishHomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <HomeContent lang="en" />
    </>
  );
}
