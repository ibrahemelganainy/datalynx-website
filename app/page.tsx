import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import PrivacySection from './components/PrivacySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans" dir="rtl">
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
  );
}