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
