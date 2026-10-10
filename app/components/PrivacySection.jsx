'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShieldHalved,
  faUserShield,
  faHandshake,
  faServer
} from '@fortawesome/free-solid-svg-icons';

import { useLocale } from './LocaleProvider';
import { privacySectionContent as sectionContent } from '../privacySectionContent';

/* الأيقونات لا تُترجم، فتبقى بترتيب النقاط نفسه. */
const pointIcons = [
  <FontAwesomeIcon icon={faShieldHalved} key="shield" />,
  <FontAwesomeIcon icon={faUserShield} key="user" />,
  <FontAwesomeIcon icon={faHandshake} key="handshake" />,
  <FontAwesomeIcon icon={faServer} key="server" />,
];

function ClauseRow({ point, index, clauseLabel }) {
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
            {clauseLabel} {point.id}
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
  const { locale, lhref } = useLocale();

  const content = sectionContent[locale] || sectionContent.ar;

  const privacyPoints = content.points.map((point, index) => ({
    ...point,
    icon: pointIcons[index],
  }));

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
            <span>{content.index}</span>
            <span className="w-8 h-px bg-datalynx-primary/40" />
            <span>{content.label}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
            {content.titleLine1}{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-datalynx-primary to-blue-300">
              {content.titleHighlight}
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            {content.intro}
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
              <ClauseRow
                key={point.id}
                point={point}
                index={i}
                clauseLabel={content.clauseLabel}
              />
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
              {content.ctaTitle}
            </h4>
            <p className="text-slate-400 text-sm md:text-base">
              {content.ctaText}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="https://wa.me/201507071671"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 bg-datalynx-primary hover:bg-blue-600 text-white font-bold rounded-2xl transition-all whitespace-nowrap text-sm md:text-base shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              {content.ctaButton}
            </a>
            {/*
              رابط سياسة الخصوصية. أُزيل من النافبار بناءً على الطلب،
              وهذا الرابط داخل قسم الثقة والخصوصية يبقى لأنه في صميم
              موضوعه، ويقود إلى الصفحة الكاملة /privacy أو /en/privacy.
            */}
            <Link
              href={lhref('privacy')}
              className="px-6 py-3.5 bg-slate-800 border border-slate-700 text-white font-bold rounded-2xl text-sm md:text-base hover:bg-slate-700 transition-all whitespace-nowrap cursor-pointer"
            >
              {locale === 'en' ? 'Read the full policy' : 'اقرأ السياسة كاملة'}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}