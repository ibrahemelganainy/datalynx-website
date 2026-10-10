import { LocaleProvider } from './components/LocaleProvider';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import PrivacySection from './components/PrivacySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

/*
 * الصفحة الرئيسية بمحتواها المشترك.
 *
 * كانت أقسام الصفحة الرئيسية مكتوبة بالعربية داخل JSX مباشرة، فلم تكن
 * قابلة للترجمة. الآن تُغلَّف كلها في LocaleProvider الذي يقرأ منه كل
 * قسم لغته ونصوصه، فتُبنى العربية على "/" والإنجليزية على "/en" من نفس
 * هذا المكوّن بنفس التصميم تمامًا.
 *
 * لم يتغير أي صنف تصميمي أو ترتيب أقسام؛ الفرق الوحيد أن النصوص تأتي
 * من ملفات المحتوى بدل أن تكون مكتوبة في المكوّنات.
 */
export default function HomeContent({ lang = 'ar' }) {
  const isEnglish = lang === 'en';

  return (
    <LocaleProvider locale={lang}>
      <div
        className="min-h-screen bg-slate-900 text-slate-100 font-sans"
        lang={lang}
        dir={isEnglish ? 'ltr' : 'rtl'}
      >
        {/* شريط التنقل العلوي */}
        <Navbar />

        {/* محتوى الصفحة الرئيسي */}
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <PrivacySection />
          <ContactSection />
        </main>

        {/* التذييل */}
        <Footer />
      </div>
    </LocaleProvider>
  );
}
