'use client';

import React, { createContext, useContext, useMemo } from 'react';

import {
  DEFAULT_LOCALE,
  getDictionary,
  localePath,
  localizedHref,
  translate,
} from '../lib/i18n/config';

/*
 * Minimal locale provider for datalynx.space.
 *
 * The main site had no localization at all. This provides just the three
 * ported pages with: the active locale, its direction, the dictionary,
 * a translate() helper and locale-aware link builders (href / lhref).
 *
 * The existing homepage does not use this provider, so its behaviour and
 * appearance are unaffected.
 */

const LocaleContext = createContext(null);

function createLocaleValue(locale) {
  const dictionary = getDictionary(locale);

  return {
    locale,
    dir: locale === 'en' ? 'ltr' : 'rtl',
    dictionary,

    t: (path, fallback = '') => translate(dictionary, path, fallback),

    href: (path = '') => localePath(locale, path),

    lhref: (to = '') => localizedHref(locale, to),
  };
}

export function LocaleProvider({ locale = DEFAULT_LOCALE, children }) {
  const value = useMemo(() => createLocaleValue(locale), [locale]);

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (context) return context;

  return createLocaleValue(DEFAULT_LOCALE);
}
