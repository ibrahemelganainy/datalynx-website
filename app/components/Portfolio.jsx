'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpRightFromSquare,
  faDesktop,
  faMobileScreenButton,
} from '@fortawesome/free-solid-svg-icons';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
};

const projectVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Tailwind's JIT scanner needs full, static class names — it can't resolve
// `text-${accent}` at runtime. Each accent keeps its complete class strings here.
const accentClasses = {
  'datalynx-primary': {
    hoverBorder: 'hover:border-datalynx-primary/40',
    text: 'text-datalynx-primary',
    bg: 'bg-datalynx-primary',
  },
  'lex-gold': {
    hoverBorder: 'hover:border-lex-gold/40',
    text: 'text-lex-gold',
    bg: 'bg-lex-gold',
  },
};

const projects = [
  {
    code: 'DL / 01',
    key: 'lex-office',
    name: 'Lex Office',
    platformTag: 'Desktop ERP',
    platformIcon: faDesktop,
    accent: accentClasses['datalynx-primary'],
    status: 'نشط ومتاح',
    statusColor: 'bg-emerald-400',
    logo: '/lex_office_logo.png',
    caption: 'Fig. 01 — واجهة Lex Office',
    description:
      'نظام رقمي ذكي متكامل لإدارة مكاتب المحاماة والشركات القانونية. أتمتة كاملة للقضايا والجلسات والمواعيد وحفظ المستندات، مع دعم العمل الأوفلاين وقواعد بيانات محلية بالكامل.',
    specs: [
      { label: 'المنصة', value: 'Windows Desktop' },
      { label: 'قاعدة البيانات', value: 'محلية بالكامل' },
      { label: 'المزامنة', value: 'تطبيق الموبايل' },
      { label: 'الأمان', value: 'تشفير كامل للبيانات' },
    ],
    tags: ['إدارة شاملة للقضايا والأجندة', 'حماية عالية وتشفير للبيانات', 'قواعد بيانات محليّة وسريعة', 'مزامنة مع تطبيق الموبايل'],
    primaryCta: { label: 'إستكشف  Lex Office', href: 'https://lexoffice.datalynx.space' },
    secondaryCta: {
      label: 'طلب تجربة النظام',
      href: 'https://wa.me/201507071671?text=أود%20الاستفسار%20عن%20نظام%20Lex%20Office',
    },
  },
  {
    code: 'DL / 02',
    key: 'lex-calendar',
    name: 'Lex Calendar',
    platformTag: 'Mobile App',
    platformIcon: faMobileScreenButton,
    accent: accentClasses['lex-gold'],
    status: 'نشط ومتاح',
    statusColor: 'bg-emerald-400',
    logo: '/logo1.png',
    caption: 'Fig. 02 — واجهة Lex Calendar',
    description:
      'تطبيق الهواتف المحمولة المخصص لمزامنة الأجندة والمواعيد والجلسات لحظياً. إشعارات فورية بالمواعيد القادمة ومتابعة جدول الجلسات اليومية من أي مكان، مع دعم التخزين أوفلاين.',
    specs: [
      { label: 'المنصة', value: 'Android & iOS' },
      { label: 'المزامنة', value: 'فورية مع Lex Office' },
      { label: 'الإشعارات', value: 'تنبيهات لحظية' },
      { label: 'التقنية', value: 'Expo / React Native' },
    ],
    tags: ['تنبيهات فورية بالمواعيد والجلسات', 'مزامنة فورية مع Lex Office', 'يعمل على أندرويد و iOS', 'واجهة سريعة وسهلة الاستخدام'],
    primaryCta: { label: 'إستكشف Lex Calendar', href: 'https://lexoffice.datalynx.space' },
    secondaryCta: {
      label: 'طلب النسخة التجريبية',
      href: 'https://wa.me/201507071671?text=أود%20الاستفسار%20عن%20تطبيق%20Lex%20Calendar',
    },
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" dir="rtl" className="py-28 bg-[#020617] relative overflow-hidden text-right">

      {/* شبكة خلفية تقنية دقيقة فقط، بدون توهجات زخرفية */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* عنوان القسم بأسلوب فهرس/أرشيف بدل الشارة الدائرية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6 font-mono text-xs tracking-[0.2em] text-datalynx-primary/80">
            <span>٠٢</span>
            <span className="w-8 h-px bg-datalynx-primary/40" />
            <span>ARCHIVE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6">
            نماذج فعلية من أنظمة{' '}
            <span className="text-datalynx-primary">تعمل بالفعل</span> في مكاتب حقيقية
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            مش عرض تقديمي — دي منتجات مطوَّرة وشغّالة فعلياً، وكل نظام منها جزء
            من بنية متكاملة صممناها لخدمة قطاع قانوني حقيقي.
          </p>
        </motion.div>

        {/* ملفات المشاريع */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="space-y-8"
        >
          {projects.map((p) => (
            <motion.div
              key={p.key}
              variants={projectVariants}
              className={`border border-white/10 ${p.accent.hoverBorder} rounded-3xl overflow-hidden bg-white/[0.02] transition-colors duration-500`}
            >
              {/* شريط الترويسة — كود الملف + الحالة */}
              <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/10">
                <div className="flex items-center gap-3 font-mono text-xs tracking-wider text-slate-400">
                  <span className={p.accent.text}>{p.code}</span>
                  <span className="hidden sm:inline text-slate-600">/</span>
                  <span className="hidden sm:inline">{p.name.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${p.statusColor}`} />
                  {p.status}
                </div>
              </div>

              <div className="p-6 md:p-12 grid lg:grid-cols-12 gap-10 items-start">

                {/* المحتوى */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 relative bg-slate-950 rounded-2xl p-2 border border-white/10 shrink-0 flex items-center justify-center">
                      <Image src={p.logo} alt={`${p.name} Logo`} width={44} height={44} className="object-contain" />
                    </div>
                    <div>
                      <span className={`inline-flex items-center gap-1.5 ${p.accent.text} text-xs font-bold mb-1`}>
                        <FontAwesomeIcon icon={p.platformIcon} />
                        {p.platformTag}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-black text-white">{p.name}</h3>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed mb-8 max-w-xl">{p.description}</p>

                  {/* صف المواصفات — بديل الأيقونات المكررة */}
                  <div className="flex flex-wrap gap-x-10 gap-y-5 py-6 mb-8 border-y border-white/10">
                    {p.specs.map((spec, i) => (
                      <div key={i}>
                        <p className="text-[11px] font-bold tracking-wide text-slate-500 mb-1">{spec.label}</p>
                        <p className="text-sm font-bold text-white">{spec.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* المميزات كوسوم مضغوطة بدل بلاطات كبيرة */}
                  <div className="flex flex-wrap gap-2 mb-9">
                    {p.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <a
                      href={p.primaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-3.5 ${p.accent.bg} hover:opacity-90 text-white rounded-xl font-bold text-sm flex items-center gap-2 transition-all group/btn`}
                    >
                      <span>{p.primaryCta.label}</span>
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="text-xs group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                      />
                    </a>
                    <a
                      href={p.secondaryCta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-bold text-sm transition-all"
                    >
                      {p.secondaryCta.label}
                    </a>
                  </div>
                </div>

                {/* لوحة العرض البصري + تعليق توثيقي */}
                <div className="lg:col-span-4">
                  <div className="relative w-full h-56 md:h-64 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center overflow-hidden">
                    <Image
                      src={p.logo}
                      alt={`${p.name} Preview`}
                      width={90}
                      height={90}
                      className="object-contain relative z-10"
                    />
                  </div>
                  <p className="mt-3 text-[11px] font-mono text-slate-500 text-center">{p.caption}</p>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
