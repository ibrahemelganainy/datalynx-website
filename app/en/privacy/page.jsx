import { LocaleProvider } from '../../components/LocaleProvider';

import {
  buildGraph,
  breadcrumbNode,
  organizationNode,
  serializeJsonLd,
  websiteNode,
} from '../../lib/structuredData';

import PrivacyContent from '../../components/PrivacyContent';

/*
 * English Privacy Policy page: /en/privacy
 *
 * A real, statically generated HTML page (output: 'export'), so it can be
 * opened directly, refreshed and indexed on its own.
 *
 * canonical points at datalynx.space and the hreflang alternatives are
 * reciprocal with /privacy.
 */
export const metadata = {
  title: 'Privacy Policy | Data Lynx - Cookies and Google AdSense',
  description:
    'Privacy policy for both Data Lynx sites (datalynx.space and tools.datalynx.space): data, in-browser file processing, cookies and Google AdSense advertising.',
  keywords: [
    'privacy policy',
    'cookies',
    'Google AdSense',
    'third-party vendor',
    'advertising cookies',
    'user privacy',
    'in-browser file processing',
    'Data Lynx',
    'Data Lynx Tools',
  ],

  alternates: {
    canonical: 'https://datalynx.space/en/privacy',
    languages: {
      ar: 'https://datalynx.space/privacy',
      en: 'https://datalynx.space/en/privacy',
      'x-default': 'https://datalynx.space/privacy',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://datalynx.space/en/privacy',
    title: 'Privacy Policy | Data Lynx',
    description:
      'How Data Lynx handles data, files and cookies, and its disclosure of Google AdSense advertising.',
    siteName: 'Data Lynx',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | Data Lynx',
    description:
      'Cookies and Google AdSense, and how Data Lynx handles files and data.',
  },
};

const jsonLd = buildGraph([
  {
    '@type': 'WebPage',
    '@id': 'https://datalynx.space/en/privacy#privacypage',
    url: 'https://datalynx.space/en/privacy',
    name: 'Privacy Policy | Data Lynx',
    inLanguage: 'en',
    isPartOf: { '@id': 'https://datalynx.space/#website' },
    about: { '@id': 'https://datalynx.space/#organization' },
  },
  websiteNode('en'),
  organizationNode(),
  breadcrumbNode([
    { name: 'Home', url: 'https://datalynx.space/en' },
    { name: 'Privacy Policy', url: 'https://datalynx.space/en/privacy' },
  ]),
]);

export default function EnglishPrivacyPage() {
  return (
    <LocaleProvider locale="en">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <PrivacyContent lang="en" />
    </LocaleProvider>
  );
}
