import { LocaleProvider } from '../../components/LocaleProvider';

import {
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../../lib/structuredData';

import AboutContent from '../../components/AboutContent';

/*
 * English About Us page: /en/about
 *
 * A real, statically generated HTML page (output: 'export'), so it can be
 * opened directly, refreshed and indexed on its own.
 *
 * canonical points at datalynx.space and the hreflang alternatives are
 * reciprocal with /about.
 */
export const metadata = {
  title: 'About Us | Data Lynx - Web Development & Odoo ERP Agency',
  description:
    'Learn about Data Lynx: a full-service software agency for websites, e-commerce stores, business and clinic management systems and Odoo ERP customisation, with free browser-based tools at tools.datalynx.space.',
  keywords: [
    'about Data Lynx',
    'software agency',
    'web development company',
    'website design',
    'e-commerce development',
    'business management system',
    'Odoo ERP customisation',
    'mobile app development',
    'Lex Office',
    'Data Lynx Tools',
  ],

  alternates: {
    canonical: 'https://datalynx.space/en/about',
    languages: {
      ar: 'https://datalynx.space/about',
      en: 'https://datalynx.space/en/about',
      'x-default': 'https://datalynx.space/about',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://datalynx.space/en/about',
    title: 'About Us | Data Lynx - Web Development & Odoo ERP Agency',
    description:
      'A full-service software agency for websites, management systems and Odoo ERP customisation, with free browser-based tools.',
    siteName: 'Data Lynx',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Data Lynx',
    description:
      'A software agency for web development, management systems and Odoo ERP customisation.',
  },
};

const jsonLd = buildGraph([
  {
    '@type': 'AboutPage',
    '@id': 'https://datalynx.space/en/about#aboutpage',
    url: 'https://datalynx.space/en/about',
    name: 'About Us | Data Lynx',
    inLanguage: 'en',
    isPartOf: { '@id': 'https://datalynx.space/#website' },
    about: { '@id': 'https://datalynx.space/#organization' },
  },
  websiteNode('en'),
  organizationNode(),
  breadcrumbNode([
    { name: 'Home', url: 'https://datalynx.space/en' },
    { name: 'About Us', url: 'https://datalynx.space/en/about' },
  ]),
]);

export default function EnglishAboutPage() {
  return (
    <LocaleProvider locale="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <AboutContent lang="en" />
    </LocaleProvider>
  );
}
