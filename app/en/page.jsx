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
    'The Ultimate Integrated Solution for Managing Law Firms with High Efficiency',
    'Say goodbye to manual work and manage your cases and clients from one place effortlessly.',
    'Precise tracking of court dates, legal stages, and case updates in real-time',
    'Secure and organized digital archive for all case documents and contracts with lightning-fast search.',
    'Enhance client trust by providing periodic reports and transparent tracking of their case status.',
    'Comprehensive database for client profiles, financial records, and complete communication history',
    'Highest security standards and complete confidentiality for client data and sensitive legal files',
    'Instant synchronization between desktop systems and mobile apps to track your work from anywhere',
    'online image compressor',
    'compress images without losing quality',
    'reduce image file size',
    'free image compression tool',
    'PNG and JPEG compressor',
    'shrink image size for web',
    'compress PDF online',
    'reduce PDF file size',
    'free PDF compressor',
    'shrink PDF document for upload',
    'compress large legal PDF files',
    'optimize PDF size',
    'convert image formats online',
    'convert WEBP to JPG',
    'HEIC to JPG converter',
    'image to PDF converter',
    'PNG to JPEG converter',
    'batch image converter',
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
