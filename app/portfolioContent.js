/*
 * نصوص قسم الأعمال (Portfolio) باللغتين.
 *
 * روابط المشاريع وأكوادها (DL / 01) لا تُترجم، فبقيت في المكوّن؛ وهنا
 * العناوين والأوصاف والمواصفات والوسوم فقط.
 */
export const portfolioContent = {
  ar: {
    index: '٠٢',
    label: 'ARCHIVE',
    titleBefore: 'نماذج فعلية من أنظمة',
    titleHighlight: 'تعمل بالفعل',
    titleAfter: 'في مكاتب حقيقية',
    intro:
      'مش عرض تقديمي — دي منتجات مطوَّرة وشغّالة فعلياً، وكل نظام منها جزء من بنية متكاملة صممناها لخدمة قطاع قانوني حقيقي.',
    status: 'نشط ومتاح',
    specLabels: {
      platform: 'المنصة',
      database: 'قاعدة البيانات',
      sync: 'المزامنة',
      security: 'الأمان',
      notifications: 'الإشعارات',
      tech: 'التقنية',
    },
    projects: {
      'lex-office': {
        caption: 'Fig. 01 — واجهة Lex Office',
        description:
          'نظام رقمي ذكي متكامل لإدارة مكاتب المحاماة والشركات القانونية. أتمتة كاملة للقضايا والجلسات والمواعيد وحفظ المستندات، مع دعم العمل الأوفلاين وقواعد بيانات محلية بالكامل.',
        specs: [
          { key: 'platform', value: 'Windows Desktop' },
          { key: 'database', value: 'محلية بالكامل' },
          { key: 'sync', value: 'تطبيق الموبايل' },
          { key: 'security', value: 'تشفير كامل للبيانات' },
        ],
        tags: [
          'إدارة شاملة للقضايا والأجندة',
          'حماية عالية وتشفير للبيانات',
          'قواعد بيانات محليّة وسريعة',
          'مزامنة مع تطبيق الموبايل',
        ],
        primaryCta: 'إستكشف  Lex Office',
        secondaryCta: 'طلب تجربة النظام',
      },
      'lex-calendar': {
        caption: 'Fig. 02 — واجهة Lex Calendar',
        description:
          'تطبيق الهواتف المحمولة المخصص لمزامنة الأجندة والمواعيد والجلسات لحظياً. إشعارات فورية بالمواعيد القادمة ومتابعة جدول الجلسات اليومية من أي مكان، مع دعم التخزين أوفلاين.',
        specs: [
          { key: 'platform', value: 'Android & iOS' },
          { key: 'sync', value: 'فورية مع Lex Office' },
          { key: 'notifications', value: 'تنبيهات لحظية' },
          { key: 'tech', value: 'Expo / React Native' },
        ],
        tags: [
          'تنبيهات فورية بالمواعيد والجلسات',
          'مزامنة فورية مع Lex Office',
          'يعمل على أندرويد و iOS',
          'واجهة سريعة وسهلة الاستخدام',
        ],
        primaryCta: 'إستكشف Lex Calendar',
        secondaryCta: 'طلب النسخة التجريبية',
      },
    },
  },
  en: {
    index: '02',
    label: 'ARCHIVE',
    titleBefore: 'Real systems',
    titleHighlight: 'already running',
    titleAfter: 'in real offices',
    intro:
      'This is not a slide deck — these are products we built and that run in production today, and each one is part of a single architecture designed for a real legal practice.',
    status: 'Live and available',
    specLabels: {
      platform: 'Platform',
      database: 'Database',
      sync: 'Sync',
      security: 'Security',
      notifications: 'Notifications',
      tech: 'Stack',
    },
    projects: {
      'lex-office': {
        caption: 'Fig. 01 — Lex Office interface',
        description:
          'A complete digital system for managing law firms and legal departments. Full automation of cases, hearings, appointments and document archiving, with offline support and fully local databases.',
        specs: [
          { key: 'platform', value: 'Windows Desktop' },
          { key: 'database', value: 'Fully local' },
          { key: 'sync', value: 'Mobile app' },
          { key: 'security', value: 'Full data encryption' },
        ],
        tags: [
          'Complete case and agenda management',
          'Strong protection and data encryption',
          'Fast local databases',
          'Sync with the mobile app',
        ],
        primaryCta: 'Explore Lex Office',
        secondaryCta: 'Request a system demo',
      },
      'lex-calendar': {
        caption: 'Fig. 02 — Lex Calendar interface',
        description:
          'The mobile app built to sync your agenda, appointments and hearings in real time. Instant reminders for upcoming appointments and your daily hearing schedule from anywhere, with offline storage support.',
        specs: [
          { key: 'platform', value: 'Android & iOS' },
          { key: 'sync', value: 'Instant with Lex Office' },
          { key: 'notifications', value: 'Real-time alerts' },
          { key: 'tech', value: 'Expo / React Native' },
        ],
        tags: [
          'Instant alerts for appointments and hearings',
          'Real-time sync with Lex Office',
          'Runs on Android and iOS',
          'Fast and easy-to-use interface',
        ],
        primaryCta: 'Explore Lex Calendar',
        secondaryCta: 'Request the trial build',
      },
    },
  },
};
