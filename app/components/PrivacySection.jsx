'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldHalved, 
  faUserShield, 
  faHandshake, 
  faServer 
} from '@fortawesome/free-solid-svg-icons';

const privacyPoints = [
  {
    id: '01',
    title: 'حماية شاملة وتشفير متقدم',
    description:
      'نطبق أحدث بروتوكولات الأمان والتشفير في جميع منتجاتنا البرمجية، لضمان بقاء بيانات نشاطك التجاري ومعلوماتك في بيئة آمنة تماماً ضد أي وصول غير مصرح به.',
    icon: <FontAwesomeIcon icon={faShieldHalved} />,
    colorClass: 'text-datalynx-primary bg-datalynx-primary/10 border-datalynx-primary/20',
  },
  {
    id: '02',
    title: 'السيادة التامة على بياناتك',
    description:
      'نؤمن بأن بياناتك هي ملكك وحدك. لا نقوم في Data Lynx بجمع أو تحليل أو استخدام بيانات عملائنا لأي أغراض تجارية أو تدريبية، ونمنحك التحكم الكامل في إدارتها.',
    icon: <FontAwesomeIcon icon={faUserShield} />,
    colorClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  },
  {
    id: '03',
    title: 'الشفافية وعدم المشاركة',
    description:
      'نلتزم التزاماً قاطعاً بعدم بيع أو مشاركة أي معلومات تخص عملائنا مع أي أطراف ثالثة أو جهات إعلانية. علاقتنا مبنية على الثقة والوضوح التام.',
    icon: <FontAwesomeIcon icon={faHandshake} />,
    colorClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    id: '04',
    title: 'الموثوقية واستمرارية الأعمال',
    description:
      'نصمم بنية أنظمتنا لتكون مستقرة وموثوقة، مع توفير آليات قوية لحفظ واسترجاع البيانات لضمان استمرارية أعمالك دون أي قلق من فقدان المعلومات.',
    icon: <FontAwesomeIcon icon={faServer} />,
    colorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
];

function ClauseRow({ point, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="relative flex gap-6 md:gap-8 pb-14 last:pb-0"
    >
      {/* نقطة على خط الثقة */}
      <div className="relative shrink-0 w-9 flex justify-center">
        <motion.span
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: index * 0.05 + 0.15 }}
          className="mt-1 w-3 h-3 rounded-full bg-datalynx-primary ring-4 ring-datalynx-primary/20 z-10"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className={`w-10 h-10 rounded-xl border flex items-center justify-center text-base ${point.colorClass}`}>
            {point.icon}
          </span>
          <span className="font-mono text-xs font-bold text-slate-400 tracking-wider">
            المادة {point.id}
          </span>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{point.title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm md:text-base max-w-xl">
          {point.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function PrivacySection() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.75', 'end 0.6'],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="privacy" dir="rtl" className="relative min-h-screen py-24 bg-[#020617] text-right overflow-hidden flex items-center">
      
      {/* نفس خلفية الهيرو تماماً (إضاءات وشبكة برمجية) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* شبكة برمجية خفيفة */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25"></div>
        {/* إضاءة زرقاء */}
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-datalynx-primary/15 rounded-full blur-[120px] mix-blend-screen"></div>
        {/* إضاءة ذهبية/برتقالية */}
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 w-full">

        {/* العناوين الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-[0.2em] text-datalynx-primary/90">
            <span>٠٣</span>
            <span className="w-8 h-px bg-datalynx-primary/40" />
            <span>TRUST &amp; SECURITY</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
            الثقة هي أساس <span className="bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary to-blue-300">حلولنا البرمجية</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            في <strong className="text-white">Data Lynx</strong>، نضع خصوصية وأمان معلومات
            عملائنا في مقدمة أولوياتنا. سواء كنت تستخدم أنظمتنا السحابية، تطبيقات
            الهواتف، أو برمجيات سطح المكتب، فإننا نضمن لك بيئة تقنية آمنة ومستقلة.
          </p>
        </motion.div>

        {/* قائمة المواد */}
        <div ref={listRef} className="relative">
          {/* الخط الأساسي الداكن */}
          <div className="absolute top-2 bottom-2 right-[17px] w-px bg-slate-800" aria-hidden="true" />
          {/* خط الثقة الأزرق — يمتلئ مع تقدّم القراءة */}
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute top-2 bottom-2 right-[17px] w-px bg-datalynx-primary origin-top"
            aria-hidden="true"
          />

          <div className="pt-1">
            {privacyPoints.map((point, i) => (
              <ClauseRow key={point.id} point={point} index={i} />
            ))}
          </div>
        </div>

        {/* صندوق الالتزام الختامي */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-slate-900/60 backdrop-blur-md border border-white/10 text-white rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl"
        >
          <div className="space-y-2 text-center md:text-right">
            <h4 className="text-xl font-bold text-white">
              هل لديك استفسارات حول أمان أنظمتنا؟
            </h4>
            <p className="text-slate-400 text-sm md:text-base">
              فريقنا التقني مستعد دائماً للإجابة على كافة تساؤلاتك حول معايير
              الأمان والتشفير التي نعتمدها في منتجاتنا.
            </p>
          </div>
          <a
            href="https://wa.me/201507071671"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-datalynx-primary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all whitespace-nowrap text-sm md:text-base shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
          >
            تواصل مع الدعم الفني
          </a>
        </motion.div>
      </div>
    </section>
  );
}