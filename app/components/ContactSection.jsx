'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot, 
  faPaperPlane, 
  faClock,
  faCheckCircle,
  faCode,
  faLaptopCode,
  faStore,
  faFileCode
} from '@fortawesome/free-solid-svg-icons';

export default function ContactSection() {
  // حالات حقول الإدخال لتجميع البيانات وإرسالها للواتساب
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'موقع تجاري متكامل',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // رقم الواتساب الخاص بك
    const whatsappNumber = '201507071671';

    // تنسيق الرسالة بشكل احترافي وجذاب
    const text = `السلام عليكم، أرغب في طلب خدمة برمجية:\n\n` +
      `👤 *الاسم:* ${formData.name}\n` +
      `📞 *رقم الهاتف:* ${formData.phone}\n` +
      `🛠 *نوع الخدمة:* ${formData.service}\n` +
      `💬 *التفاصيل:* ${formData.message}`;

    // ترميز النص ليتوافق مع روابط الواتساب
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    // إظهار حالة النجاح مؤقتاً ثم الانتقال للواتساب
    setIsSubmitted(true);
    
    // فتح رابط الواتساب في تبويب جديد بعد جزء من الثانية لضمان سلاسة التجربة
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  const contactInfo = [
    {
      title: 'الهاتف / واتساب',
      value: '+20 150 707 1671',
      href: 'https://wa.me/201507071671',
      icon: <FontAwesomeIcon icon={faPhone} />,
      colorClass: 'text-datalynx-primary bg-datalynx-primary/10 border-datalynx-primary/20',
    },
    {
      title: 'البريد الإلكتروني',
      value: 'lexoffice.datalynx@proton.me',
      href: 'mailto:lexoffice.datalynx@proton.me',
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'مقر العمل',
      value: 'القاهرة، مصر',
      href: '#',
      icon: <FontAwesomeIcon icon={faLocationDot} />,
      colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'ساعات العمل',
      value: 'السبت - الخميس: ٩ صباحاً - ٦ مساءً',
      href: '#',
      icon: <FontAwesomeIcon icon={faClock} />,
      colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <section id="contact" dir="rtl" className="relative min-h-screen py-28 bg-[#020617] text-right overflow-hidden flex items-center">
      
      {/* خلفية الشبكة البرمجية والإضاءات */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-datalynx-primary/15 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">

        {/* العنوان الرئيسي */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4 font-mono text-xs tracking-[0.2em] text-datalynx-primary/90 px-4 py-1.5 rounded-full border border-datalynx-primary/30 bg-datalynx-primary/10 shadow-lg shadow-datalynx-primary/5">
            <span>٠٤</span>
            <span className="w-8 h-px bg-datalynx-primary/40" />
            <span>START YOUR PROJECT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
            جاهز لتحويل فكرتك إلى <span className="bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary via-blue-400 to-indigo-300">واقع رقمي احترافي؟</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            اختر نوع الخدمة المطلوبة واملأ التفاصيل، وسيتم تحويلك مباشرة عبر الواتساب لمناقشة مشروعك مع فريق <strong className="text-white">Data Lynx</strong> فوراً.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* بطاقات معلومات التواصل (اليمين) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-datalynx-primary/5 rounded-full blur-2xl pointer-events-none"></div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">قنوات التواصل المباشر</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  نحن نفضل سرعة الاستجابة، تواصل معنا عبر الواتساب أو البريد في أي وقت.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group p-3.5 rounded-2xl transition-all border border-transparent hover:border-white/10 hover:bg-white/[0.03]"
                  >
                    <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-lg shrink-0 transition-transform group-hover:scale-110 shadow-md ${item.colorClass}`}>
                      {item.icon}
                    </div>
                    <div>
                      <span className="block text-slate-400 text-xs font-medium mb-1">{item.title}</span>
                      <span className="block text-white font-bold text-sm md:text-base group-hover:text-datalynx-primary transition-colors">
                        {item.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* نموذج الطلب وتحديد الخدمات (اليسار) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center space-y-5"
                >
                  <div className="w-20 h-20 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">جاري تحويلك إلى واتساب...</h3>
                  <p className="text-slate-400 max-w-md mx-auto text-sm md:text-base">
                    تم تجهيز تفاصيل طلبك بنجاح. إذا لم يتم فتح واتساب تلقائياً، يمكنك النقر على الزر أدناه.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 px-8 py-3 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-700 transition-colors border border-white/10"
                  >
                    تعديل البيانات أو إرسال جديد
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">اختر خدمتك واطلبها فوراً</h3>
                    <p className="text-slate-400 text-sm">حدد نوع المشروع المناسب لك وسنتولى الباقي.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-300">الاسم الكريم</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="أدخل اسمك أو اسم شركتك" 
                        className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-datalynx-primary transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-300">رقم الهاتف / الواتساب</label>
                      <input 
                        required
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01xxxxxxxxx" 
                        className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-datalynx-primary transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">نوع الخدمة المطلوبة</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-datalynx-primary transition-all shadow-inner cursor-pointer"
                    >
                      <option value="موقع تجاري متكامل" className="bg-slate-900">🛒 موقع تجاري متكامل (متجر إلكتروني)</option>
                      <option value="موقع تعريفى / شركة" className="bg-slate-900">🏢 موقع تعريفي للشركات والأعمال</option>
                      <option value="موقع شخصي (بورتفوليو)" className="bg-slate-900">👤 موقع شخصي أو معرض أعمال (Portfolio)</option>
                      <option value="صفحة هبوط / صفحة واحدة" className="bg-slate-900">🚀 صفحة هبوط تسويقية (Landing Page)</option>
                      <option value="برمجيات وحلول قانونية (Lex Office)" className="bg-slate-900">⚖️ برمجيات وحلول قانونية (Lex Office)</option>
                      <option value="تخصيص أنظمة Odoo ERP" className="bg-slate-900">⚙️ تخصيص أنظمة إدارة الموارد Odoo ERP</option>
                      <option value="تطبيق موبايل (React Native)" className="bg-slate-900">📱 تطبيق موبايل (أندرويد / آيفون)</option>
                      <option value="برمجيات مخصصة أخرى" className="bg-slate-900">💻 برمجيات سطح مكتب أو حلول مخصصة</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-300">تفاصيل إضافية عن فكرتك أو مشروعك</label>
                    <textarea 
                      required
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="اخبرنا باختصار عن أهدافك، الميزات التي ترغب بها، أو أي تفاصيل أخرى..." 
                      className="w-full bg-slate-950/80 border border-slate-800/80 rounded-2xl px-4 py-3.5 text-white text-sm focus:outline-none focus:border-datalynx-primary transition-all resize-none shadow-inner"
                    ></textarea>
                  </div>

                  <button 
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-datalynx-primary to-blue-600 hover:from-blue-600 hover:to-datalynx-primary text-white font-bold rounded-2xl transition-all shadow-[0_0_25px_rgba(59,130,246,0.4)] flex items-center justify-center gap-3 text-base group"
                  >
                    <span>إرسال الطلب والانتقال للواتساب</span>
                    <FontAwesomeIcon icon={faPaperPlane} className="text-sm transition-transform group-hover:-translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}