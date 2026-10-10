import HomeContent from './homeContent';

/*
 * الصفحة الرئيسية العربية: /
 *
 * المحتوى انتقل إلى homeContent.jsx لأن النسخة الإنجليزية /en تحتاج
 * نفس الأقسام بنفس التصميم. هذا الملف يحتفظ ببيانات SEO الخاصة
 * بالعربية فقط، وبالـstructured data للصفحة الرئيسية.
 */
export const metadata = {
  title:
    'Data Lynx | تصميم وتطوير المواقع والمتاجر وأنظمة Odoo ERP',
  description:
    'Data Lynx وكالة برمجية متكاملة: تصميم وتطوير المواقع والمتاجر الإلكترونية، بناء أنظمة إدارة الشركات والعيادات، وتخصيص أنظمة Odoo ERP، مع أدوات ويب مجانية على tools.datalynx.space.',
  keywords: [
    'تصميم مواقع',
    'تطوير مواقع',
    'شركة برمجة',
    'متجر إلكتروني',
    'تصميم متاجر',
    'أنظمة إدارة',
    'Odoo',
    'Odoo ERP',
    'تخصيص Odoo',
    'تطبيقات موبايل',
    'React Native',
    'التحول الرقمي',
    'حلول برمجية',
    'Data Lynx',
    'أدوات مجانية',
    'ضغط الصور',
    'ضغط PDF',
    'تحويل صيغ الملفات',
  ],

  alternates: {
    canonical: 'https://datalynx.space',
    languages: {
      ar: 'https://datalynx.space',
      en: 'https://datalynx.space/en',
      'x-default': 'https://datalynx.space',
    },
  },

  openGraph: {
    type: 'website',
    locale: 'ar_AR',
    url: 'https://datalynx.space',
    title: 'Data Lynx | تصميم وتطوير المواقع وأنظمة Odoo ERP',
    description:
      'وكالة Data Lynx لتطوير المواقع والمتاجر الإلكترونية وأنظمة إدارة الشركات وتخصيص Odoo ERP، مع أدوات ويب مجانية.',
    siteName: 'Data Lynx',
  },
};

export default function HomePage() {
  return <HomeContent lang="ar" />;
}