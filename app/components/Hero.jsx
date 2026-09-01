'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faArrowLeft, 
  faCode, 
  faLaptopMedical,
  faMicrochip
} from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  // إعدادات الحركة (Framer Motion Variants)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] pt-20">
      
      {/* خلفية جمالية (إضاءات وشبكة) */}
      <div className="absolute inset-0 w-full h-full">
        {/* شبكة برمجية خفيفة */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
        {/* إضاءة زرقاء */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-datalynx-primary/20 rounded-full blur-[120px] mix-blend-screen"></div>
        {/* إضاءة ذهبية/برتقالية */}
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto flex flex-col items-center"
          >
            {/* شارة صغيرة علوية */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="px-4 py-1.5 rounded-full border border-datalynx-primary/30 bg-datalynx-primary/10 text-datalynx-primary text-sm font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-datalynx-primary animate-pulse"></span>
                وكالة برمجيات شاملة
              </span>
            </motion.div>

            {/* العنوان الرئيسي */}
            <motion.div variants={itemVariants} className="mb-6 relative">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight md:leading-tight">
                نبني مستقبلك الرقمي <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary to-blue-300">
                  بحلول برمجية متكاملة
                </span>
              </h1>
            </motion.div>

            {/* الوصف */}
            <motion.p variants={itemVariants} className="text-slate-400 text-base md:text-xl mb-10 max-w-2xl leading-relaxed">
              من تصميم المواقع والمتاجر الإلكترونية، إلى بناء أنظمة إدارة شاملة وتخصيص أنظمة Odoo. نحن في <strong className="text-white">Data Lynx</strong> نحول أفكارك إلى واقع رقمي يتجاوز طموحاتك.
            </motion.p>

            {/* الأزرار */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="#contact" className="group relative px-8 py-4 bg-datalynx-primary text-white rounded-xl font-bold text-lg overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-3">
                <span className="relative z-10">ابدأ مشروعك الآن</span>
                <FontAwesomeIcon icon={faRocket} className="relative z-10 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#services" className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                استكشف خدماتنا
                <FontAwesomeIcon icon={faArrowLeft} className="text-sm" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* الكروت العائمة (Floating Cards) التي تعطي لمسة احترافية وتوضح تخصصاتكم */}
        
        {/* كارت 1: العيادات والمنشآت (يمين الشاشة) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex absolute top-1/3 right-4 bg-slate-900/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl items-center gap-4 float-animation"
        >
          <div className="w-12 h-12 bg-lex-success/20 rounded-xl flex items-center justify-center text-lex-success text-xl shrink-0">
            <FontAwesomeIcon icon={faLaptopMedical} />
          </div>
          <div>
            <span className="block text-white font-bold text-sm mb-1">أنظمة متكاملة</span>
            <span className="block text-slate-400 text-xs w-40 leading-relaxed">
             نبني لك حلولاً برمجية مخصصة ومواقع احترافية تدعم نمو وتطوير نشاطك التجاري.
            </span>
          </div>
        </motion.div>

        {/* كارت 2: ليكس أوفيس (يسار الشاشة) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex absolute bottom-1/3 left-4 bg-slate-900/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-2xl items-center gap-4 float-animation"
          style={{ animationDelay: '1s' }} // تأخير الأنيميشن العائم قليلاً ليكونوا غير متطابقين في الحركة
        >
          <div className="w-12 h-12 bg-lex-gold/20 rounded-xl flex items-center justify-center text-lex-gold text-xl shrink-0">
            <FontAwesomeIcon icon={faMicrochip} />
          </div>
          <div>
            <span className="block text-white font-bold text-sm mb-1">التحول الرقمي</span>
            <span className="block text-slate-400 text-xs w-48 leading-relaxed">
             حوّل فكرتك إلى منصة رقمية ذكية.
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}