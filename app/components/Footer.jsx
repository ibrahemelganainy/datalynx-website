'use client';

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook, 
  faLinkedin, 
  faXTwitter, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';

import {
  faPhone,
  faEnvelope,
  faLocationDot,
  faArrowUp,
  faCaretLeft,
  faCode,
  faServer
} from '@fortawesome/free-solid-svg-icons';

import { useLocale } from './LocaleProvider';
import { TOOLS_SITE_URL } from '../lib/i18n/config';

/*
 * نص التذييل في اللغتين.
 *
 * التذييل يظهر في كل صفحات الموقع (الرئيسية + عن الموقع + اتصل بنا +
 * الخصوصية)، وكان مكتوبًا بالعربية فقط، فيبقى عربيًا حتى في النسخة
 * الإنجليزية من الصفحات. هنا صار يقرأ لغته من LocaleProvider.
 *
 * ومن هنا فقط يتم الوصول إلى سياسة الخصوصية، لأن رابطها أُزيل من
 * النافبار بناءً على الطلب. وأُضيف رابط صريح إلى أدوات النطاق الفرعي.
 */
export default function Footer() {
  const { locale } = useLocale();

  const isEnglish = locale === 'en';

  /* مسار الصفحة الرئيسية داخل اللغة الحالية، لروابط الأقسام. */
  const homeHref = isEnglish ? '/en' : '/';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020617] text-slate-400 pt-20 pb-10 relative overflow-hidden">
      {/* تأثير إضاءة خفي خلف الفوتر */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-datalynx-primary/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">

          {/* العمود الأول: هوية الشركة */}
          <div className="col-span-1 lg:col-span-1 text-right">
            <div className="flex items-center gap-3 mb-6">
              {/* شعار DL بنفس شكل الناف بار (مربع مائل) */}
              <div
                aria-label="Data Lynx logo"
                className="nav-logo relative flex items-center justify-center rounded-xl select-none
              w-10 h-10 md:w-14 md:h-14 p-1 bg-slate-900
                transform -rotate-6 hover:rotate-0 transition-transform duration-500"
                role="img"
              >
                {/* حرف D */}
                <span className="absolute left-1/4 md:left-3/10 text-sm md:text-lg font-extrabold leading-none tracking-tight
              bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary to-blue-400">
                  D
                </span>

                {/* حرف L */}
                <span className="absolute right-1/4 md:right-3/10 text-sm md:text-lg font-extrabold leading-none tracking-tight
              text-white opacity-90 transform rotate-12">
                  L
                </span>
              </div>

              <h2 className="text-2xl font-black text-white tracking-tighter">
                Data<span className="text-datalynx-primary">Lynx</span>
              </h2>
            </div>

            <p className="text-sm leading-relaxed mb-8 opacity-80">
              {isEnglish
                ? 'At Data Lynx we build smart software that goes beyond expectations: website design, business management systems and ERP solutions that speed up your growth and move your business online.'
                : 'نحن في Data Lynx نبتكر حلولاً برمجية ذكية تتجاوز التوقعات. نقدم أحدث التقنيات في تصميم المواقع، وأنظمة إدارة المنشآت، وحلول ERP لتسريع نمو أعمالك وتحويلها رقمياً.'}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61562579024299" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-datalynx-primary hover:text-white hover:border-datalynx-primary transition-all duration-300">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              {/* يمكنك إضافة المزيد من أيقونات السوشيال ميديا هنا مستقبلاً */}
            </div>
          </div>

          {/* العمود الثاني: حلولنا البرمجية */}
          <div>
            <h4 className="text-white font-bold mb-8 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-datalynx-primary rounded-full"></span>
              {isEnglish ? 'Our software services' : 'خدماتنا البرمجية'}
            </h4>
            <ul className="space-y-4">
              <li>
                <a href={`${homeHref}#services`} className="group flex items-center gap-3 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faCaretLeft} className="text-datalynx-primary text-xs opacity-0 group-hover:opacity-100 transition-all" />
                  <div>
                    <span className="block font-bold">{isEnglish ? 'Website design and development' : 'تصميم وتطوير المواقع'}</span>
                    <span className="text-[11px] opacity-60 italic">{isEnglish ? 'Stores, personal sites, marketing landing pages' : 'متاجر، مواقع شخصية، صفحات هبوط تسويقية'}</span>
                  </div>
                </a>
              </li>
              <li>
                <a href={`${homeHref}#services`} className="group flex items-center gap-3 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faCaretLeft} className="text-datalynx-primary text-xs opacity-0 group-hover:opacity-100 transition-all" />
                  <div>
                    <span className="block font-bold">{isEnglish ? 'Integrated management systems' : 'أنظمة الإدارة المتكاملة'}</span>
                    <span className="text-[11px] opacity-60 italic">{isEnglish ? 'For companies, clinics, pharmacies and offices' : 'للشركات، للعيادات، الصيدليات، والمكاتب'}</span>
                  </div>
                </a>
              </li>
              <li>
                <a href={`${homeHref}#services`} className="group flex items-center gap-3 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faCaretLeft} className="text-datalynx-primary text-xs opacity-0 group-hover:opacity-100 transition-all" />
                  <div>
                    <span className="block font-bold">{isEnglish ? 'Odoo development and customisation' : 'تطوير وتخصيص Odoo'}</span>
                    <span className="text-[11px] opacity-60 italic">{isEnglish ? 'Complete ERP solutions for your company' : 'حلول ERP شاملة لشركتك'}</span>
                  </div>
                </a>
              </li>
              <li>
                <a href={`${homeHref}#services`} className="group flex items-center gap-3 hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faCaretLeft} className="text-datalynx-primary text-xs opacity-0 group-hover:opacity-100 transition-all" />
                  <span className="font-bold">{isEnglish ? 'Mobile applications' : 'تطبيقات الهواتف الذكية'}</span>
                </a>
              </li>
              {/* رابط صريح إلى أدوات النطاق الفرعي — القسم الذي يتحدث عن الأدوات */}
              <li>
                <a
                  href={TOOLS_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faCode} className="text-datalynx-primary text-xs opacity-0 group-hover:opacity-100 transition-all" />
                  <div>
                    <span className="block font-bold">{isEnglish ? 'Free web tools' : 'أدوات الويب المجانية'}</span>
                    <span className="text-[11px] opacity-60 italic" dir="ltr">tools.datalynx.space</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* العمود الثالث: الشركة والدعم */}
          <div>
            <h4 className="text-white font-bold mb-8 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-datalynx-primary rounded-full"></span>
              {isEnglish ? 'Important links' : 'روابط هامة'}
            </h4>
            <ul className="space-y-4">
              <li><a href={`${homeHref}#portfolio`} className="hover:text-white transition-colors">{isEnglish ? 'Our work' : 'أعمالنا السابقة'}</a></li>
              <li><a href={isEnglish ? '/en/about' : '/about'} className="hover:text-white transition-colors">{isEnglish ? 'About Us' : 'من نحن'}</a></li>
              <li><a href={isEnglish ? '/en/contact' : '/contact'} className="hover:text-white transition-colors">{isEnglish ? 'Contact Us' : 'اتصل بنا'}</a></li>
              {/*
                سياسة الخصوصية: الرابط الوحيد المتبقي بعد إزالته من النافبار.
                الصفحة نفسها لم تُحذف.
              */}
              <li><a href={isEnglish ? '/en/privacy' : '/privacy'} className="hover:text-white transition-colors">{isEnglish ? 'Privacy Policy' : 'سياسة الخصوصية'}</a></li>
              <li><a href={TOOLS_SITE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{isEnglish ? 'Data Lynx Tools' : 'أدوات Data Lynx'}</a></li>
              <li><a href={`${homeHref}#contact`} className="hover:text-white transition-colors">{isEnglish ? 'Free technical consultation' : 'استشارة تقنية مجانية'}</a></li>
            </ul>
          </div>

          {/* العمود الرابع: بيانات التواصل */}
          <div>
            <h4 className="text-white font-bold mb-8 text-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-datalynx-primary rounded-full"></span>
              {isEnglish ? 'Direct contact' : 'تواصل مباشر'}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-datalynx-primary shrink-0">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">{isEnglish ? 'Call us' : 'اتصل بنا'}</span>
                  <span className="font-bold text-white tracking-widest" dir="ltr">+20 150 707 1671</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-datalynx-primary shrink-0">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <span className="block text-xs text-slate-500 mb-1">{isEnglish ? 'Email us' : 'راسلنا'}</span>
                  {/* قمت بتغيير الإيميل ليكون عاماً لشركة البرمجيات بدل ليكس أوفيس */}
                  <span className="font-bold text-white text-sm">lexoffice.datalynx@proton.me</span>
                </div>
              </li>
              <li className="flex items-start gap-4 text-lex-gold group cursor-pointer">
                {/* أيقونة واتساب مع تأثيرات التمرير */}
                <div className="w-10 h-10 rounded-xl bg-lex-gold/10 flex items-center justify-center shrink-0 group-hover:bg-lex-gold group-hover:text-black transition-all">
                  <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
                </div>

                <div className="flex flex-col">
                  <span className="block text-[10px] uppercase font-bold mb-1 opacity-80">{isEnglish ? 'Available now' : 'متاح الآن'}</span>

                  <a
                    href="https://wa.me/201507071671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <span className="font-bold block group-hover:underline">{isEnglish ? 'Chat on WhatsApp' : 'تحدث عبر واتساب'}</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* الجزء السفلي: حقوق الملكية */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm opacity-60">
            {isEnglish ? (
              <>
                © {new Date().getFullYear()} All rights reserved to{' '}
                <span className="text-white font-bold">Data Lynx</span> Software
                Solutions.
              </>
            ) : (
              <>
                © {new Date().getFullYear()} جميع الحقوق محفوظة لشركة{' '}
                <span className="text-white font-bold">Data Lynx</span> للحلول
                البرمجية.
              </>
            )}
          </div>

          {/* زر العودة للأعلى */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-sm font-bold text-white/50 hover:text-datalynx-primary transition-all"
          >
            {isEnglish ? 'Back to top' : 'العودة للأعلى'}
            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-datalynx-primary group-hover:bg-datalynx-primary group-hover:text-white transition-all">
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}