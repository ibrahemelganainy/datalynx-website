'use client';

import React from 'react';
import Link from 'next/link';

import Navbar from './Navbar';
import Footer from './Footer';

import { useLocale } from './LocaleProvider';
import { TOOLS_SITE_URL } from '../lib/i18n/config';
import {
  privacySections as sectionsAr,
  privacyHeader as headerAr,
  privacyScope as scopeAr,
} from '../lib/i18n/content/privacyAr';
import {
  privacySections as sectionsEn,
  privacyHeader as headerEn,
  privacyScope as scopeEn,
} from '../lib/i18n/content/privacyEn';

/*
 * Privacy Policy page (Arabic + English).
 *
 * The page now covers BOTH domains:
 *
 *   datalynx.space        - the corporate site and its software services
 *   tools.datalynx.space  - the free browser-based file tools
 *
 * The original tools wording is preserved inside the relevant sections,
 * and the main-site sections were added around it. Section 6 explicitly
 * discloses the use of cookies and of Google AdSense as a third-party
 * vendor, which is what a Google Ads review looks for in a privacy policy.
 *
 * The scope badges at the top make it unambiguous which domains the
 * policy applies to.
 */
export default function PrivacyContent({ lang = 'ar' }) {
  const { lhref } = useLocale();

  const isEnglish = lang === 'en';

  const sections = isEnglish ? sectionsEn : sectionsAr;
  const header = isEnglish ? headerEn : headerAr;
  const scope = isEnglish ? scopeEn : scopeAr;

  return (
    <div
      className="min-h-screen bg-[#020617] text-slate-100 font-sans"
      lang={lang}
      dir={isEnglish ? 'ltr' : 'rtl'}
    >
      <Navbar />

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-datalynx-primary/10 blur-[150px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
          </div>

          <div className="max-w-5xl mx-auto px-5 sm:px-6 relative z-10">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                {header.badge}
              </div>

              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
                {header.title}
              </h1>

              <p className="text-base md:text-lg text-white max-w-2xl mx-auto leading-relaxed">
                {header.description}
              </p>

              <div className="mt-6 text-sm text-white/70">{header.lastUpdated}</div>
            </div>

            {/*
              النطاقات التي تغطيها السياسة. هذا هو الجزء الذي يوضح أن
              المحتوى الخاص بالأدوات ما زال قائمًا لكنه يخص
              tools.datalynx.space، بينما بقية البنود تخص الموقع
              الرئيسي datalynx.space.
            */}
            <div className="mb-8 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
              <h2 className="text-xl md:text-2xl font-black text-white mb-5">
                {header.scopeTitle}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scope.map((item) => (
                  <a
                    key={item.host}
                    href={`https://${item.host}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-datalynx-primary/50 transition-all"
                  >
                    <span className="block font-bold text-white mb-1">
                      {item.label}
                    </span>

                    <span
                      className="block text-sm text-datalynx-primary font-mono mb-2"
                      dir="ltr"
                    >
                      {item.host}
                    </span>

                    <span className="block text-sm text-white/70 leading-relaxed">
                      {item.description}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Important notice */}
            <div className="mb-8 p-6 rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-slate-800">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-datalynx-primary/10 text-datalynx-primary flex items-center justify-center font-black">
                  DL
                </div>

                <div>
                  <h2 className="text-xl font-black text-white mb-2">
                    {header.noticeTitle}
                  </h2>

                  <p className="text-sm md:text-base text-white leading-relaxed">
                    {header.noticeDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32 p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800"
                >
                  <h2 className="text-xl md:text-2xl font-black text-white mb-5">
                    {section.title}
                  </h2>

                  <div className="space-y-4 text-sm md:text-base text-white leading-8">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.blocks &&
                      section.blocks.map((block) => (
                        <div
                          key={block.title}
                          className="my-6 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                              ✓
                            </div>

                            <div>
                              <h3 className="text-white font-bold mb-2">
                                {block.title}
                              </h3>

                              <p className="text-sm text-white/80 leading-relaxed">
                                {block.text}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                    {section.links && (
                      <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {section.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-datalynx-primary/50 transition-all cursor-pointer"
                          >
                            <h3 className="font-bold text-white mb-2">
                              {link.title}
                            </h3>

                            <p className="text-sm text-white/70 leading-relaxed">
                              {link.text}
                            </p>
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Contact section: clickable mailto */}
                    {section.id === 'contact' && (
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <a
                          href="mailto:lexoffice.datalynx@proton.me"
                          className="inline-flex items-center px-5 py-3 rounded-xl bg-datalynx-primary/10 border border-datalynx-primary/20 text-datalynx-primary font-bold hover:bg-datalynx-primary/20 transition-all cursor-pointer"
                        >
                          lexoffice.datalynx@proton.me
                        </a>

                        {/* رابط النطاق الفرعي: حتى يصل القارئ إلى الأدوات من السياسة. */}
                        <a
                          href={TOOLS_SITE_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
                        >
                          {isEnglish
                            ? 'Open tools.datalynx.space'
                            : 'افتح tools.datalynx.space'}
                        </a>
                      </div>
                    )}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer disclaimer */}
            <div className="mt-8 p-5 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white leading-relaxed">
              {header.disclaimer}
            </div>

            {/* Back */}
            <div className="mt-8 text-center">
              <Link
                href={lhref('')}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-bold hover:bg-slate-700 transition-all cursor-pointer"
              >
                {header.backHome}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
