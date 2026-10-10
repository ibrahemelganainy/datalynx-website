/*
 * Minimal bilingual foundation for datalynx.space.
 *
 * The main site was Arabic-only. This module adds exactly what the three
 * ported pages need: a locale value, a dictionary lookup, and
 * locale-aware link builders. It does NOT translate or touch the
 * existing homepage sections.
 *
 * Arabic keeps the published root URLs (/, /about, /contact, /privacy)
 * so nothing already indexed changes. English lives under /en.
 */

export const DEFAULT_LOCALE = 'ar';

export const LOCALES = ['ar', 'en'];

export const SITE_URL = 'https://datalynx.space';

/* The tools product lives on a subdomain of its own. */
export const TOOLS_HOST = 'tools.datalynx.space';
export const TOOLS_SITE_URL = `https://${TOOLS_HOST}`;

import { ar } from './ar';
import { en } from './en';

export const dictionaries = { ar, en };

export function getDictionary(locale) {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}

/**
 * Reads a dotted key path, e.g. "about.whatTitle".
 * Returns `fallback` when the key is missing.
 */
export function translate(dictionary, path, fallback = '') {
  if (!dictionary || !path) return fallback;

  const value = String(path)
    .split('.')
    .reduce(
      (accumulator, key) => (accumulator == null ? undefined : accumulator[key]),
      dictionary
    );

  return value == null ? fallback : value;
}

/**
 * Builds a path for a locale.
 *
 *   ar -> /about
 *   en -> /en/about
 *
 * External URLs, mailto: and tel: pass through untouched.
 */
export function localePath(locale, path = '') {
  const raw = String(path || '');

  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(raw) || /^[a-z][a-z0-9+.-]*:/i.test(raw)) {
    return raw;
  }

  const normalized = raw.replace(/^\/+/, '');

  if (locale === 'en') {
    return normalized ? `/en/${normalized}` : '/en';
  }

  return normalized ? `/${normalized}` : '/';
}

/**
 * Absolute URL, used by canonical tags, hreflang and the sitemap.
 */
export function absoluteUrl(locale, path = '') {
  const relative = localePath(locale, path);

  return relative === '/' ? SITE_URL : `${SITE_URL}${relative}`;
}

/**
 * Alias used by the ported components: builds an internal link that
 * stays inside the current language. Foreign links are not prefixed.
 */
export function localizedHref(locale, to = '') {
  const raw = String(to == null ? '' : to);

  if (/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(raw)) return raw;
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) return raw; // mailto:, tel:
  if (raw.startsWith('#')) return raw;

  const [pathPart, hashPart] = raw.split('#');
  const searchIndex = pathPart.indexOf('?');
  const search = searchIndex === -1 ? '' : pathPart.slice(searchIndex);
  const cleanPath = searchIndex === -1 ? pathPart : pathPart.slice(0, searchIndex);

  const normalized = String(cleanPath).replace(/^\/+/, '');

  /* Static files keep their path with no locale prefix. */
  if (
    /\.(?:html?|xml|txt|json|ico|png|jpe?g|svg|webp|avif|gif|bmp|css|js|woff2?)$/i.test(
      normalized
    )
  ) {
    return `/${normalized}${search}${hashPart ? `#${hashPart}` : ''}`;
  }

  const localized = localePath(locale, normalized);

  return `${localized}${search}${hashPart ? `#${hashPart}` : ''}`;
}

/*
 * Pages that exist in BOTH languages. The empty string is the home page:
 * it now has an English counterpart at /en, so "switch to English" works
 * from the landing page too.
 *
 * NOTE: the Privacy Policy page was removed from the navigation, but the
 * route still exists in both languages, so it stays listed here. The
 * switcher in the Navbar no longer depends on this list anyway (see
 * getAlternatePath below); this export is kept for any caller that still
 * wants to know which routes are genuinely translated.
 */
export const TRANSLATED_PATHS = ['', 'about', 'contact', 'privacy'];

/**
 * The equivalent path in the other language.
 *
 * Always returns a path. Every route on the public site exists in both
 * languages (the home page included, at /), so the language switcher must
 * never render as a dead, disabled element. Unknown paths still resolve to
 * the equivalent home page of the other language rather than to a broken
 * link.
 *
 *   ar  /            -> en  /en
 *   ar  /about       -> en  /en/about
 *   en  /en/contact  -> ar  /contact
 */
export function getAlternatePath(pathname, locale) {
  const clean = String(pathname || '/').replace(/\/+$/, '') || '/';

  const withoutLocale =
    locale === 'en'
      ? clean === '/en'
        ? ''
        : clean.replace(/^\/en\//, '')
      : clean === '/'
        ? ''
        : clean.replace(/^\//, '');

  const safePath = TRANSLATED_PATHS.includes(withoutLocale)
    ? withoutLocale
    : '';

  return locale === 'en'
    ? localePath('ar', safePath)
    : localePath('en', safePath);
}

