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
    "تصميم مواقع",
    "تطوير مواقع",
    "شركة برمجة",
    "متجر إلكتروني",
    "تصميم متاجر",
    "أنظمة إدارة",
    "Odoo",
    "Odoo ERP",
    "تخصيص Odoo",
    "تطبيقات موبايل",
    "React Native",
    "التحول الرقمي",
    "حلول برمجية",
    "Data Lynx",
    "أدوات مجانية",
    "ضغط الصور",
    "ضغط PDF",
    "تحويل صيغ الملفات",
    "برنامج ادارة مكاتب المحاماه",
    "اجندة المحامي",
    "سيستم ادارة مكاتب المحاماه",
    "النظام المتكامل لإدارة مكتب المحاماة بكفاءة واحترافية عالية",
    "ودّع الأعمال اليدوية، وأدر قضاياك وموكلينك من مكان واحد بكل سهولة",
    "تتبع دقيق لمواعيد الجلسات، المراحل القانونية، وتحديثات القضايا لحظة بلحظة",
    "أرشيف إلكتروني آمن ومنظم لجميع مستندات القضايا والعقود مع بحث فائق السرعة",
    "عزز ثقة موكليك من خلال تقديم تقارير دورية ومتابعة شفافة لحالة قضاياهم",
    "سجل شامل لبيانات الموكلين، ملفاتهم المالية، وسجل التواصل السابق بالكامل",
    "أعلى معايير الأمان وحماية السرية التامة لبيانات العملاء والملفات القانونية الحساسة",
    "مزامنة فورية بين الأجهزة المكتبية وتطبيقات الهواتف الذكية لمتابعة عملك من أي مكان",
    "ضغط الصور اونلاين",
    "تقليل حجم الصور دون فقدان الجودة",
    "موقع ضغط الصور المجاني",
    "تصغير حجم الصور للويب",
    "ضغط صور PNG و JPG",
    "تقليل مساحة الصور للرفع على المواقع",
    "ضغط ملفات PDF اونلاين",
    "تقليل حجم ملف PDF كبير",
    "تصغير حجم ملف PDF للرفع",
    "ضغط ملفات الـ PDF مجاناً",
    "تقليل حجم المستندات والملفات القانونية PDF",
    "تحويل صيغ الصور اونلاين",
    "تحويل الصور من WEBP إلى JPG",
    "تحويل الصور إلى PNG",
    "تحويل صور HEIC إلى JPG",
    "تحويل الصور إلى ملف PDF",
    "The Ultimate Integrated Solution for Managing Law Firms with High Efficiency",
    "Say goodbye to manual work and manage your cases and clients from one place effortlessly.",
    "Precise tracking of court dates, legal stages, and case updates in real-time",
    "Secure and organized digital archive for all case documents and contracts with lightning-fast search.",
    "Enhance client trust by providing periodic reports and transparent tracking of their case status.",
    "Comprehensive database for client profiles, financial records, and complete communication history",
    "Highest security standards and complete confidentiality for client data and sensitive legal files",
    "Instant synchronization between desktop systems and mobile apps to track your work from anywhere",
    "online image compressor",
    "compress images without losing quality",
    "reduce image file size",
    "free image compression tool",
    "PNG and JPEG compressor",
    "shrink image size for web",
    "compress PDF online",
    "reduce PDF file size",
    "free PDF compressor",
    "shrink PDF document for upload",
    "compress large legal PDF files",
    "optimize PDF size",
    "convert image formats online",
    "convert WEBP to JPG",
    "HEIC to JPG converter",
    "image to PDF converter",
    "PNG to JPEG converter",
    "batch image converter",
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