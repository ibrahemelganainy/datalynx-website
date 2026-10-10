/*
 * نصوص قسم الخدمات (Services) باللغتين.
 *
 * الأيقونات والألوان والأصناف (Tailwind) بقيت داخل المكوّن لأنها لا
 * تتغير بين اللغتين؛ هنا النصوص فقط، مفهرسة بنفس ترتيب services في
 * المكوّن.
 */
export const servicesContent = {
  ar: {
    badge: 'ماذا نقدم لعملائنا',
    titleLine1: 'حلول برمجية شاملة تُلبي',
    titleLine2: 'طموحات مؤسستك أو مشروعك',
    intro:
      'سواء كنت تبحث عن موقع إلكتروني يعكس هويتك، أو سيستم مخصص لإدارة منشأتك، أو تطوير لنظام Odoo؛ نحن في Data Lynx نقدم لك البرمجيات بأحدث المعايير العالمية.',
    items: [
      {
        id: 'web-dev',
        title: 'تصميم وتطوير المواقع والصفحات',
        subtitle: 'مواقع شخصية ومهنية، صفحات هبوط تسويقية، ومتاجر إلكترونية',
        description:
          'نصمم ونطور مواقع ويب فائقة السرعة ومتجاوبة مع كافة الشاشات، مخصصة للعيادات، المكاتب القانونية، الشركات، والمتاجر الإلكترونية مع أفضل تجربة مستخدم (UI/UX).',
        tags: ['صفحات هبوط', 'متاجر E-Commerce', 'مواقع عيادات وأطباء', 'مواقع تعريفية'],
        badge: 'الأكثر طلباً',
        cta: 'طلب هذه الخدمة',
      },
      {
        id: 'erp-systems',
        title: 'أنظمة إدارة المنشآت والشركات',
        subtitle: 'حلول برمجية وانظمة مخصصة لكل نشاط تجاري',
        description:
          'نبني أنظمة إدارة مكتبية وسحابية متكاملة تضمن الأتمتة الكاملة لإدارة عملائك، المواعيد، الفواتير، والبيانات الحساسة بأعلى مستويات الأمان والسرعة.',
        tags: ['إدارة المكاتب', 'سيستم عيادات وصيدليات', 'أنظمة محاسبية', 'لوحات تحكم ذكية'],
        badge: 'أنظمة مخصصة',
        cta: 'طلب هذه الخدمة',
      },
      {
        id: 'odoo-dev',
        title: 'برمجة وتخصيص أنظمة Odoo ERP',
        subtitle: 'تطوير وتعديل موديولات أودو حسب احتياجك',
        description:
          'خبرة متعمقة في تخصيص نظام Odoo بكافة إصدارته، بناء الموديولات المخصصة، تصميم الثيمات والـ Dark Mode، وربط النظام بإضافات المجمتع (OCA) وبوابات الدفع.',
        tags: ['Odoo 18 Customization', 'تطوير Custom Modules', 'تصميم ثيمات Odoo', 'ربط وتكامل النظام'],
        badge: 'تخصص ERP',
        cta: 'طلب هذه الخدمة',
      },
      {
        id: 'mobile-apis',
        title: 'تطبيقات الهواتف والربط البرمجي',
        subtitle: 'تطبيقات Cross-Platform وتكامل الـ APIs',
        description:
          'نبتكر تطبيقات موبايل تعمل على أندرويد و iOS باستخدام أحدث التقنيات مثل React Native و Flutter، مع خدمات ربط واجهات البرمجة (APIs) والدفع الإلكتروني.',
        tags: ['تطبيقات Android & iOS', 'React Native / Flutter', 'تكامل APIs', 'قواعد بيانات سحابية'],
        badge: 'حلول ذكية',
        cta: 'طلب هذه الخدمة',
      },
    ],
    toolsTitle: 'محتاج مهمة سريعة على ملف؟',
    toolsText:
      'أدوات Data Lynx المجانية تعمل فورًا داخل المتصفح: ضغط الصور وملفات PDF، تحويل الصيغ، وتجهيز الملفات للبوابات الإلكترونية.',
    toolsCta: 'افتح tools.datalynx.space',
    ctaTitle: 'لديك مشروع خاص أو فكرة تحتاج استشارة تقنية؟',
    ctaText:
      'فريقنا جاهز لدراسة متطلباتك وتحويلها إلى نظام برمجي متكامل يعمل بكفاءة عالية.',
    ctaButton: 'تحدث معنا مباشرة',
  },
  en: {
    badge: 'What we offer our clients',
    titleLine1: 'Complete software solutions that meet',
    titleLine2: 'the ambitions of your business',
    intro:
      'Whether you need a website that reflects your identity, a custom system to run your business, or Odoo development; at Data Lynx we deliver software built to current global standards.',
    items: [
      {
        id: 'web-dev',
        title: 'Website and page design and development',
        subtitle: 'Personal and business sites, landing pages and online stores',
        description:
          'We design and build very fast, fully responsive websites for clinics, law firms, companies and online stores, with a strong focus on user experience (UI/UX).',
        tags: ['Landing pages', 'E-commerce stores', 'Clinic and doctor sites', 'Corporate websites'],
        badge: 'Most requested',
        cta: 'Request this service',
      },
      {
        id: 'erp-systems',
        title: 'Business and company management systems',
        subtitle: 'Software solutions and systems tailored to each business',
        description:
          'We build integrated desktop and cloud management systems that fully automate clients, appointments, invoices and sensitive data, at the highest levels of security and speed.',
        tags: ['Office management', 'Clinic and pharmacy systems', 'Accounting systems', 'Smart dashboards'],
        badge: 'Custom systems',
        cta: 'Request this service',
      },
      {
        id: 'odoo-dev',
        title: 'Odoo ERP development and customisation',
        subtitle: 'Building and modifying Odoo modules to fit your needs',
        description:
          'Deep experience customising Odoo across its versions: building custom modules, designing themes and dark mode, and integrating the system with OCA add-ons and payment gateways.',
        tags: ['Odoo 18 customisation', 'Custom module development', 'Odoo theme design', 'System integration'],
        badge: 'ERP specialists',
        cta: 'Request this service',
      },
      {
        id: 'mobile-apis',
        title: 'Mobile apps and software integration',
        subtitle: 'Cross-platform apps and API integration',
        description:
          'We build Android and iOS apps using current technologies such as React Native and Flutter, together with API integration and electronic payment services.',
        tags: ['Android & iOS apps', 'React Native / Flutter', 'API integration', 'Cloud databases'],
        badge: 'Smart solutions',
        cta: 'Request this service',
      },
    ],
    toolsTitle: 'Need a quick task done on a file?',
    toolsText:
      'The free Data Lynx tools run immediately in your browser: compress images and PDFs, convert formats, and prepare files for online portals.',
    toolsCta: 'Open tools.datalynx.space',
    ctaTitle: 'Have a special project or an idea that needs technical advice?',
    ctaText:
      'Our team is ready to study your requirements and turn them into a complete software system that performs at a high level.',
    ctaButton: 'Talk to us directly',
  },
};
