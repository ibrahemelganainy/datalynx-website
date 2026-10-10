/*
 * نصوص قسم التواصل في الصفحة الرئيسية باللغتين.
 *
 * هذا القسم هو المصدر الأصلي لمحتوى صفحة "اتصل بنا"، وقد وُحّد محتوى
 * الصفحتين في القواميس (ar.js / en.js). هنا نصوص القسم المرئي في
 * الصفحة الرئيسية، مع نفس قائمة الخدمات وقنوات التواصل نفسها.
 */
export const contactSectionContent = {
  ar: {
    index: '٠٤',
    label: 'START YOUR PROJECT',
    titleLine1: 'جاهز لتحويل فكرتك إلى',
    titleLine2: 'واقع رقمي احترافي؟',
    description:
      'اختر نوع الخدمة المطلوبة واملأ التفاصيل، وسيتم تحويلك مباشرة عبر الواتساب لمناقشة مشروعك مع فريق Data Lynx فوراً.',
    infoTitle: 'قنوات التواصل المباشر',
    infoText: 'نحن نفضل سرعة الاستجابة، تواصل معنا عبر الواتساب أو البريد في أي وقت.',
    formTitle: 'اختر خدمتك واطلبها فوراً',
    formText: 'حدد نوع المشروع المناسب لك وسنتولى الباقي.',
    fields: {
      name: 'الاسم الكريم',
      namePlaceholder: 'أدخل اسمك أو اسم شركتك',
      phone: 'رقم الهاتف / الواتساب',
      phonePlaceholder: '01xxxxxxxxx',
      service: 'نوع الخدمة المطلوبة',
      message: 'تفاصيل إضافية عن فكرتك أو مشروعك',
      messagePlaceholder:
        'اخبرنا باختصار عن أهدافك، الميزات التي ترغب بها، أو أي تفاصيل أخرى...',
      submit: 'إرسال الطلب والانتقال للواتساب',
    },
    sentTitle: 'جاري تحويلك إلى واتساب...',
    sentText:
      'تم تجهيز تفاصيل طلبك بنجاح. إذا لم يتم فتح واتساب تلقائياً، يمكنك النقر على الزر أدناه.',
    sentButton: 'تعديل البيانات أو إرسال جديد',
    serviceOptions: [
      'موقع تجاري متكامل',
      'موقع تعريفى / شركة',
      'موقع شخصي (بورتفوليو)',
      'صفحة هبوط / صفحة واحدة',
      'برمجيات وحلول قانونية (Lex Office)',
      'تخصيص أنظمة Odoo ERP',
      'تطبيق موبايل (React Native)',
      'برمجيات مخصصة أخرى',
    ],
    whatsappHeading: 'السلام عليكم، أرغب في طلب خدمة برمجية:',
    messageLabels: { name: 'الاسم', phone: 'رقم الهاتف', service: 'نوع الخدمة', details: 'التفاصيل' },
    contactInfo: {
      phoneTitle: 'الهاتف / واتساب',
      emailTitle: 'البريد الإلكتروني',
      locationTitle: 'مقر العمل',
      locationValue: 'القاهرة، مصر',
      hoursTitle: 'ساعات العمل',
      hoursValue: 'السبت - الخميس: ٩ صباحاً - ٦ مساءً',
    },
  },
  en: {
    index: '04',
    label: 'START YOUR PROJECT',
    titleLine1: 'Ready to turn your idea into',
    titleLine2: 'a professional digital product?',
    description:
      'Choose the service you need and fill in the details. You will be taken straight to WhatsApp to discuss your project with the Data Lynx team.',
    infoTitle: 'Direct contact channels',
    infoText: 'We favour fast replies. Reach us on WhatsApp or by email at any time.',
    formTitle: 'Choose your service and request it now',
    formText: 'Select the type of project you need and we will take care of the rest.',
    fields: {
      name: 'Your name',
      namePlaceholder: 'Enter your name or company name',
      phone: 'Phone / WhatsApp number',
      phonePlaceholder: '+20 100 000 0000',
      service: 'Service required',
      message: 'Extra details about your idea or project',
      messagePlaceholder:
        'Briefly tell us about your goals, the features you want, or anything else...',
      submit: 'Send request via WhatsApp',
    },
    sentTitle: 'Taking you to WhatsApp...',
    sentText:
      'Your request details are ready. If WhatsApp did not open automatically, use the button below.',
    sentButton: 'Edit the details or send another',
    serviceOptions: [
      'Full online store',
      'Corporate / business website',
      'Personal site or portfolio',
      'Landing page',
      'Legal software (Lex Office)',
      'Odoo ERP customisation',
      'Mobile app (React Native)',
      'Other custom software',
    ],
    whatsappHeading: 'Hello, I would like to request a software service:',
    messageLabels: { name: 'Name', phone: 'Phone', service: 'Service', details: 'Details' },
    contactInfo: {
      phoneTitle: 'Phone / WhatsApp',
      emailTitle: 'Email',
      locationTitle: 'Location',
      locationValue: 'Cairo, Egypt',
      hoursTitle: 'Working hours',
      hoursValue: 'Saturday - Thursday: 9 AM - 6 PM',
    },
  },
};
