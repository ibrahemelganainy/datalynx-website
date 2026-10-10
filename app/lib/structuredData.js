/*
 * مُنشئو بيانات JSON-LD المنظمة.
 *
 * لماذا ملف مشترك: صفحات "من نحن" و"اتصل بنا" في اللغتين تحتاج نفس
 * الكيانات (WebSite وOrganization وBreadcrumbList)، وتكرارها في
 * أربعة ملفات يعرّضها للتباعد. هنا تُبنى من نقطة واحدة.
 *
 * مبادئ ملتزم بها:
 *
 * 1. لا تُخترع أي بيانات. الحقول المذكورة هنا كلها إما مأخوذة من
 *    metadata الموجودة فعلاً في layout الجذر (الاسم، العنوان،
 *    الشعار) أو من روابط عامة موجودة في الموقع.
 * 2. لا يوجد LocalBusiness ولا عنوان بريدي ولا ساعات عمل، لأن
 *    المشروع لا يثبت أيًّا منها.
 * 3. لم يُضف أي تاريخ نشر أو تحديث لم يُتحقق منه.
 * 4. كيان Organization واحد فقط، يُشار إليه بالـ@id من الصفحتين،
 *    فلا تتعارض الكيانات.
 */

export const SITE_URL = 'https://datalynx.space';

/* النطاق الفرعي للأدوات: كيان فرعي مرتبط بالمنظمة. */
export const TOOLS_URL = 'https://tools.datalynx.space';

/*
 * المُعرّفات الدائمة للكيانات.
 *
 * استخدام @id هو الطريقة الصحيحة لربط الكيانات بدل إعادة تعريف
 * Organization بعنوان مختلف في كل صفحة.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const TOOLS_WEBSITE_ID = `${TOOLS_URL}/#website`;

/**
 * كيان المنظمة. مطابق لـopenGraph.siteName وmetadataBase في
 * layout الجذر.
 */
export function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Data Lynx',
    alternativeName: 'Data Lynx Software Solutions',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      'وكالة برمجية متكاملة لتطوير المواقع والمتاجر الإلكترونية وأنظمة إدارة الشركات وتخصيص أنظمة Odoo ERP.',
    /*
     * النطاق الفرعي للأدوات يُعرَّف كمشروع/منتج تابع للمنظمة، فيربط
     * كيان الأدوات بالشركة في نتائج البحث بدل أن يظهر كموقع منفصل.
     */
    subjectOf: [
      {
        '@type': 'WebSite',
        '@id': TOOLS_WEBSITE_ID,
        url: TOOLS_URL,
        name: 'Data Lynx Tools',
      },
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'lexoffice.datalynx@proton.me',
        telephone: '+20-150-707-1671',
        availableLanguage: ['Arabic', 'English'],
      },
    ],
  };
}

/**
 * كيان الموقع نفسه، مربوط بكيان المنظمة.
 *
 * نطاقان منفصلان (datalynx.space و tools.datalynx.space) = كيانان
 * منفصلان بـ@id مختلف، وكلاهما مربوط بالمنظمة نفسها.
 */
export function websiteNode(locale) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: locale === 'en' ? `${SITE_URL}/en` : SITE_URL,
    name: locale === 'en' ? 'Data Lynx' : 'Data Lynx',
    inLanguage: locale === 'en' ? 'en' : 'ar',
    publisher: { '@id': ORGANIZATION_ID },
  };
}

/**
 * مسار التنقل (BreadcrumbList).
 *
 * @param {Array<{name: string, url: string}>} items العناصر بالترتيب
 *        من الجذر إلى الصفحة الحالية.
 */
export function breadcrumbNode(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * يبني كائن @graph واحدًا للصفحة، وهو الشكل الموصى به عند وجود أكثر
 * من كيان مترابط في مستند واحد.
 */
export function buildGraph(nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

/**
 * يُسلسل JSON-LD بأمان داخل <script>.
 *
 * إستبدال `<` بـ\u003c يمنع أي إمكانية لكسر وسم <script> أو إدخال
 * HTML من نص يأتي من المحتوى (نفس الاعتبار المذكور في توثيق Next.js
 * لـJSON-LD).
 */
export function serializeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
