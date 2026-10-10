import { LocaleProvider } from '../../components/LocaleProvider';

import {
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../../lib/structuredData';

import ContactContent from '../../components/ContactContent';

/*
 * English Contact Us page: /en/contact
 *
 * A real, statically generated HTML page (output: 'export'), so it can be
 * opened directly, refreshed and indexed on its own.
 *
 * canonical points at datalynx.space and the hreflang alternatives are
 * reciprocal with /contact.
 */
export const metadata = {
  title: 'Contact Us | Data Lynx - Request Your Website or Software',
  description:
    'Contact Data Lynx by WhatsApp or email to request a website, an online store, a management system, Odoo ERP customisation or a mobile app. Free technical consultation.',
  keywords: [
    'contact Data Lynx',
    'request a website',
    'hire web developer',
    'e-commerce development',
    'business management system',
    'Odoo ERP customisation',
    'mobile app development',
    'free technical consultation',
    'software company',
    'WhatsApp',
  ],

  alternates: {
    canonical: 'https://datalynx.space/en/contact',
    languages: {
      ar: 'https://datalynx.space/contact',
      en: 'https://datalynx.space/en/contact',
      'x-default': 'https://datalynx.space/contact',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://datalynx.space/en/contact',
    title: 'Contact Us | Data Lynx - Request Your Website or Software',
    description:
      'Contact Data Lynx to request a website, a management system or Odoo ERP customisation.',
    siteName: 'Data Lynx',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Data Lynx',
    description:
      'Request your website or software from Data Lynx by WhatsApp or email.',
  },
};

const jsonLd = buildGraph([
  {
    '@type': 'ContactPage',
    '@id': 'https://datalynx.space/en/contact#contactpage',
    url: 'https://datalynx.space/en/contact',
    name: 'Contact Us | Data Lynx',
    inLanguage: 'en',
    isPartOf: { '@id': 'https://datalynx.space/#website' },
    about: { '@id': 'https://datalynx.space/#organization' },
  },
  websiteNode('en'),
  organizationNode(),
  breadcrumbNode([
    { name: 'Home', url: 'https://datalynx.space/en' },
    { name: 'Contact Us', url: 'https://datalynx.space/en/contact' },
  ]),
]);

export default function EnglishContactPage() {
  return (
    <LocaleProvider locale="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <ContactContent lang="en" />
    </LocaleProvider>
  );
}
