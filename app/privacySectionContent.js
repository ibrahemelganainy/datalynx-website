/*
 * نصوص قسم الثقة والخصوصية في الصفحة الرئيسية باللغتين.
 *
 * هذا القسم قسم عرضي (marketing) يشرح مبادئنا، وليس سياسة الخصوصية
 * القانونية؛ السياسة نفسها على /privacy و/en/privacy. ربط القسم
 * بالسياسة يقع في المكوّن.
 */
export const privacySectionContent = {
  ar: {
    index: '٠٣',
    label: 'TRUST & SECURITY',
    titleLine1: 'الثقة هي أساس',
    titleHighlight: 'حلولنا البرمجية',
    intro:
      'في Data Lynx، نضع خصوصية وأمان معلومات عملائنا في مقدمة أولوياتنا. سواء كنت تستخدم أنظمتنا السحابية، تطبيقات الهواتف، أو برمجيات سطح المكتب، فإننا نضمن لك بيئة تقنية آمنة ومستقلة.',
    clauseLabel: 'المادة',
    points: [
      {
        id: '01',
        title: 'حماية شاملة وتشفير متقدم',
        description:
          'نطبق أحدث بروتوكولات الأمان والتشفير في جميع منتجاتنا البرمجية، لضمان بقاء بيانات نشاطك التجاري ومعلوماتك في بيئة آمنة تماماً ضد أي وصول غير مصرح به.',
        colorClass:
          'text-datalynx-primary bg-datalynx-primary/10 border-datalynx-primary/20',
      },
      {
        id: '02',
        title: 'السيادة التامة على بياناتك',
        description:
          'نؤمن بأن بياناتك هي ملكك وحدك. لا نقوم في Data Lynx بجمع أو تحليل أو استخدام بيانات عملائنا لأي أغراض تجارية أو تدريبية، ونمنحك التحكم الكامل في إدارتها.',
        colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      },
      {
        id: '03',
        title: 'الشفافية وعدم المشاركة',
        description:
          'نلتزم التزاماً قاطعاً بعدم بيع أو مشاركة أي معلومات تخص عملائنا مع أي أطراف ثالثة أو جهات إعلانية. علاقتنا مبنية على الثقة والوضوح التام.',
        colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      },
      {
        id: '04',
        title: 'الموثوقية واستمرارية الأعمال',
        description:
          'نصمم بنية أنظمتنا لتكون مستقرة وموثوقة، مع توفير آليات قوية لحفظ واسترجاع البيانات لضمان استمرارية أعمالك دون أي قلق من فقدان المعلومات.',
        colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      },
    ],
    ctaTitle: 'هل لديك استفسارات حول أمان أنظمتنا؟',
    ctaText:
      'فريقنا التقني مستعد دائماً للإجابة على كافة تساؤلاتك حول معايير الأمان والتشفير التي نعتمدها في منتجاتنا.',
    ctaButton: 'تواصل مع الدعم الفني',
  },
  en: {
    index: '03',
    label: 'TRUST & SECURITY',
    titleLine1: 'Trust is the foundation of',
    titleHighlight: 'our software',
    intro:
      'At Data Lynx, the privacy and security of our clients\u2019 information comes first. Whether you use our cloud systems, mobile apps or desktop software, we give you a secure and independent technical environment.',
    clauseLabel: 'Clause',
    points: [
      {
        id: '01',
        title: 'Comprehensive protection and strong encryption',
        description:
          'We apply current security and encryption protocols across all of our software, keeping your business data in an environment that is fully protected against unauthorised access.',
        colorClass:
          'text-datalynx-primary bg-datalynx-primary/10 border-datalynx-primary/20',
      },
      {
        id: '02',
        title: 'Full ownership of your data',
        description:
          'We believe your data belongs to you alone. Data Lynx does not collect, analyse or use client data for any commercial or training purpose, and you keep full control over it.',
        colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
      },
      {
        id: '03',
        title: 'Transparency and no data sharing',
        description:
          'We are firmly committed to never selling or sharing any information about our clients with third parties or advertising networks. Our relationship is built on trust and complete clarity.',
        colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      },
      {
        id: '04',
        title: 'Reliability and business continuity',
        description:
          'We design our systems to be stable and dependable, with strong backup and recovery mechanisms so your business keeps running without any fear of losing information.',
        colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      },
    ],
    ctaTitle: 'Do you have questions about the security of our systems?',
    ctaText:
      'Our technical team is always ready to answer your questions about the security and encryption standards we use in our products.',
    ctaButton: 'Contact technical support',
  },
};
