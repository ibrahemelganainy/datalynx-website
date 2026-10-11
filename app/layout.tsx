import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://datalynx.space"),

  /*
   * العنوان هنا هو الافتراضي لكل صفحة لا تُصدّر title خاصًا بها.
   * الصفحات الأخرى (/, /en, /about, /en/about, /contact, /en/contact,
   * /privacy, /en/privacy) تُصدّر metadata خاصة بها بعنوان وكلمات
   * مفتاحية مناسبة لمحتواها.
   */
  title: {
    default: "Data Lynx | حلول برمجية وتطوير المواقع والمتاجر وأنظمة Odoo",
    template: "%s",
  },
  description:
    "وكالة Data Lynx لتطوير المواقع والمتاجر الإلكترونية وأنظمة إدارة الشركات وتخصيص أنظمة Odoo ERP، مع أدوات ويب مجانية على tools.datalynx.space.",

  applicationName: "Data Lynx",
  authors: [{ name: "Data Lynx", url: "https://datalynx.space" }],
  creator: "Data Lynx",
  publisher: "Data Lynx",

  keywords: [
    "Data Lynx",
    "تصميم مواقع",
    "تطوير مواقع",
    "شركة برمجة",
    "متجر إلكتروني",
    "أنظمة إدارة",
    "Odoo ERP",
    "تطبيقات موبايل",
    "حلول برمجية",
    "web development",
    "software company",
    "Odoo ERP",
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

  /*
   * robots: فهرسة كاملة + بيانات وصفية كبيرة مسموح بها حتى تُقرأ
   * عناوين الصور الكبيرة (max-image-preview:large) وهذا مفيد في نتائج
   * البحث العربية.
   */
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    siteName: "Data Lynx",
    locale: "ar_AR",
    alternateLocale: ["en_US"],
    url: "https://datalynx.space",
    title: "Data Lynx | حلول برمجية وتطوير المواقع وأنظمة Odoo ERP",
    description:
      "وكالة Data Lynx لتطوير المواقع والمتاجر الإلكترونية وأنظمة إدارة الشركات وتخصيص Odoo ERP، مع أدوات ويب مجانية.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Data Lynx | حلول برمجية وتطوير المواقع وأنظمة Odoo ERP",
    description:
      "تطوير المواقع والمتاجر الإلكترونية وأنظمة إدارة الشركات وتخصيص Odoo ERP.",
  },

  category: "technology",

  /*
   * علامة التحقق من ملكية الموقع في Google AdSense.
   * تُحقن كـ <meta name="google-adsense-account" content="ca-pub-1270749804293495">
   * داخل وسم <head>، وهي مطلوبة لقبول الموقع وإثبات ملكيته.
   */
  other: {
    "google-adsense-account": "ca-pub-1270749804293495",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* الجذر عربي (RTL): كان lang="en" بدون dir، وهو ما يجعل الصفحة
       تُقرأ كإنجليزية من اليسار لليمين. تصحيحه لا يغيّر الشكل
       المرئي إطلاقًا. */
      <html
        lang="ar"
        dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
