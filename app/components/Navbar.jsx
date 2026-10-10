'use client';

import { usePathname } from 'next/navigation';

import { useLocale } from './LocaleProvider';
import { getAlternatePath, TOOLS_SITE_URL } from '../lib/i18n/config';
import React, { useState, useEffect } from 'react'

/*
 * الصفحة الرئيسية لا تمرر شيئًا لأن قسم Hero لونه #020617، وهو نفس
 * لون body، فيبدو النافبار شفافًا عليها تلقائيًا. أما الصفحات الداخلية
 * (من نحن، اتصل بنا، الخصوصية) فتمرر transparentAtTop لكي يعمل
 * النافبار بنفس شكل الصفحة الرئيسية: شفاف في الأعلى بخلفية الصفحة
 * الشبكية، ويصبح أبيض عند التمرير.
 */
export default function Navbar({ transparentAtTop = false }) {
  const { locale } = useLocale();

  const pathname = usePathname();

  /*
   * مسار الصفحة المكافئة في اللغة الأخرى.
   *
   * كان يعيد null للصفحة الرئيسية، فكان الزر يظهر معطّلًا (opacity-40)
   * ولا يعمل إطلاقًا. السبب أن النسخة الإنجليزية للصفحة الرئيسية كانت
   * غير موجودة. بعد إضافة /en أصبح المسار متاحًا دائمًا وزر التبديل
   * يعمل من كل صفحة.
   */
  const alternatePath = getAlternatePath(pathname, locale);

  const isEnglish = locale === 'en';

  /*
   * مسار الصفحة الرئيسية داخل اللغة الحالية. الصفحة الرئيسية العربية
   * على الجذر "/" وكانت روابط النافبار تستخدم الرابط المطلق
   * https://datalynx.space مباشرة، وهو ما يخرج من معاينة localhost.
   */
  const homeHref = isEnglish ? '/en' : '/';

  /*
   * قسم التواصل. على الصفحة الرئيسية نكتفي بالمرساة، ومن أي صفحة أخرى
   * نعود أولًا إلى الرئيسية ثم إلى القسم، حتى يعمل الزر في كل الصفحات
   * بدل أن يكون رابطًا ميتًا.
   */
  const contactHref = pathname === homeHref ? '#contact' : `${homeHref}#contact`;

  const [isOpen, setIsOpen] = useState(false)

  /*
   * الحالة الابتدائية دائمًا false = شفاف، وهذا هو السلوك الصحيح لكل
   * الصفحات عند فتحها من أعلى. لا نستخدم lazy initializer يقرأ window
   * لأن الخادم لا يملك window؛ ولذلك نضبط الحالة بعد mount فقط عبر
   * handleScroll داخل useEffect أدناه، فيتفق HTML المُولَّد مع أول رسم
   * في المتصفح ولا يوجد اختلاف يسبب خطأ hydration.
   */
  const [isScrolled, setIsScrolled] = useState(false)

  // تغيير شكل النافبار عند التمرير
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    /*
     * مزامنة فورية مع موضع التمرير الفعلي. ضرورية في الصفحات الداخلية
     * لأن HTML المُولَّد يبدأ شفافًا، فلو فُتحت الصفحة وهي مُمرَّرة
     * مسبقًا (تحديث أو رجوع) يجب أن يصبح النافبار أبيض فورًا.
     */
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [transparentAtTop])

  /*
   * روابط التنقل.
   *
   * قراران مقصودان هنا:
   *
   * 1. حُذف رابط "سياسة الخصوصية" من النافبار بالكامل (هو ورابط
   *    "الخصوصية" الذي كان يقود إلى نفس القسم). الصفحة نفسها ما زالت
   *    موجودة على /privacy و/en/privacy، والوصول إليها متاح من التذييل
   *    (Footer) كما هو مطلوب.
   *
   * 2. روابط الأقسام داخل الصفحة الرئيسية لم تعد تستخدم "#services"
   *    كرابط مطلق يبقى في العنوان؛ بل أصبحت "#services" فقط للروابط
   *    داخل نفس الصفحة، و"/#services" عند الانتقال من صفحة أخرى. النتيجة
   *    أن شريط العنوان لا يعرض علامة # بعد النقر، والعنوان يبقى
   *    /about مثلًا بدل /about#services.
   *
   * الرابط الأول ("/") لا يحتاج # لأنه أعلى الصفحة.
   */
  const navLinks = [
    { name: isEnglish ? 'Home' : 'الرئيسية', href: homeHref },
    {
      name: isEnglish ? 'Services' : 'خدماتنا',
      href: pathname === homeHref ? '#services' : `${homeHref}#services`,
    },
    {
      name: isEnglish ? 'Our Work' : 'أعمالنا',
      href: pathname === homeHref ? '#portfolio' : `${homeHref}#portfolio`,
    },
    { name: isEnglish ? 'About Us' : 'من نحن', href: isEnglish ? '/en/about' : '/about' },
    { name: isEnglish ? 'Contact Us' : 'اتصل بنا', href: isEnglish ? '/en/contact' : '/contact' },
    /*
     * رابط خارجي إلى أدوات Data Lynx على النطاق الفرعي. نطاق مختلف، لذا
     * يُفتح في تبويب جديد مع rel="noopener noreferrer".
     */
    {
      name: isEnglish ? 'Tools' : 'الأدوات',
      href: TOOLS_SITE_URL,
      external: true,
    },
  ]

  return (
    <nav className={`fixed w-full top-0 z-[100] transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo Section (تم استبدال الصورة بحرفي D و L مع تأثير حركي وميل عصري) */}
        <div className="flex items-center gap-3 group cursor-pointer">
          {/* الحاوية الخارجية للشعار - مقاسات متجاوبة */}
          <div
            aria-label="Data Lynx logo"
            className={`nav-logo relative flex items-center justify-center rounded-xl select-none
              w-10 h-10 md:w-14 md:h-14 p-1
              ${isScrolled ? 'bg-slate-800' : 'bg-slate-900' }
              transform -rotate-6 hover:rotate-0 transition-transform duration-500`}
            role="img"
          >
            {/* الحروف D و L متداخلتان لعمل مونوغرام حديث */}
            <span className="absolute left-1/4 md:left-3/10 text-sm md:text-lg font-extrabold leading-none tracking-tight
              bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary to-blue-400"
            >
              D
            </span>
            <span className="absolute right-1/4 md:right-3/10 text-sm md:text-lg font-extrabold leading-none tracking-tight
              text-white opacity-90 transform rotate-12"
            >
              L
            </span>
          </div>

          <div className="flex flex-col">
            <span className={`text-xl font-black tracking-tight leading-none transition-colors duration-300 ${
              isScrolled
                ? 'text-datalynx-dark' // عند السكرول: أسود على الكل
                : 'text-white md:text-white' // الحالة العادية: أبيض على الموبايل وأبيض على الشاشات الكبيرة
            }`}>
              Data<span className="text-datalynx-primary">Lynx</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Software Solutions</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              className={`text-sm font-bold transition-colors hover:text-datalynx-primary ${
                isScrolled ? 'text-slate-600' : 'text-slate-600 md:text-slate-200 md:hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}

          {/*
            مبدّل اللغة (سطح المكتب).

            لكل صفحة على الموقع نسخة في اللغة الأخرى (الصفحة الرئيسية
            أصبحت /en)، لذلك يظهر الزر كرابط فعّال دائمًا ولا يوجد فرع
            "معطّل" بعد الآن.
          */}
          <a
            data-lang-switcher="desktop"
            href={alternatePath}
            lang={isEnglish ? 'ar' : 'en'}
            aria-label={isEnglish ? 'التبديل إلى العربية' : 'Switch to English'}
            className={`px-3.5 py-2 rounded-full border text-xs font-bold transition-colors ${
              isScrolled
                ? 'border-slate-200 text-slate-600 hover:text-datalynx-primary hover:border-datalynx-primary/40'
                : 'border-white/20 text-slate-200 hover:text-white hover:border-white/40'
            }`}
          >
            {isEnglish ? 'AR' : 'EN'}
          </a>

          <a
            href={contactHref}
            className="px-6 py-2.5 bg-datalynx-primary hover:bg-blue-600 text-white text-sm font-bold rounded-full transition-all shadow-md hover:shadow-blue-500/20 transform hover:-translate-y-0.5"
          >
           {isEnglish ? 'Contact us now' : 'تواصل معنا الان'}
          </a>
        </div>

        {/* Mobile Menu Button */}
      <button
        className={`md:hidden p-2 transition-colors duration-300 ${
          isScrolled ? 'text-datalynx-dark' : 'text-white'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* استخدمت bg-current لكي تأخذ الخطوط لون النص المختار في الأعلى */}
        <div className={`w-6 h-0.5 bg-current mb-1.5 transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
        <div className={`w-6 h-0.5 bg-current mb-1.5 ${isOpen ? 'opacity-0' : ''}`}></div>
        <div className={`w-4 h-0.5 bg-current ml-auto ${isOpen ? '-rotate-45 -translate-y-2 w-6' : ''}`}></div>
      </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`absolute top-full left-0 w-full bg-white shadow-xl border-t transition-all duration-300 origin-top ${
        isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
      }`}>
        <div className="p-6 flex flex-col gap-4 text-right">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold text-datalynx-dark hover:text-datalynx-primary"
            >
              {link.name}
            </a>
          ))}
          <hr className="border-slate-100" />
          <a
            href={contactHref}
            onClick={() => setIsOpen(false)}
            className="w-full py-4 bg-datalynx-dark text-white text-center rounded-2xl font-bold"
          >
           {isEnglish ? 'Contact us now' : 'تواصل معنا الان'}
          </a>
          {/* مبدّل اللغة (الجوال) — رابط فعّال في كل الصفحات */}
          <a
            data-lang-switcher="mobile"
            href={alternatePath}
            lang={isEnglish ? 'ar' : 'en'}
            onClick={() => setIsOpen(false)}
            aria-label={isEnglish ? 'التبديل إلى العربية' : 'Switch to English'}
            className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-slate-200 text-sm font-bold text-datalynx-dark hover:text-datalynx-primary hover:border-datalynx-primary/40 transition-colors"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {isEnglish ? 'AR' : 'EN'}
            </span>
            <span>{isEnglish ? 'العربية' : 'English'}</span>
          </a>
        </div>
      </div>

      {/* CSS صغيرة داخل الكمبوننت لتأثير العوم الخفيف (floating) */}
      <style>{`
        .nav-logo { 
          animation: navFloat 4s ease-in-out infinite;
        }
        @keyframes navFloat {
          0% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-4px) rotate(-6deg); }
          100% { transform: translateY(0) rotate(-6deg); }
        }
        /* تعديل مواقع الحروف الدقيقة ليتناسب العرض على breakpoints */
        @media (min-width: 768px) {
          .nav-logo span:first-child { left: 28%; }
          .nav-logo span:last-child { right: 28%; }
        }
      `}</style>
    </nav>
  )
}