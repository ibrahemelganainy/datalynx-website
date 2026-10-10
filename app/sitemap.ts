import type { MetadataRoute } from 'next';

import { absoluteUrl } from './lib/i18n/config';

/*
 * Sitemap for datalynx.space.
 *
 * Now covers every public route in BOTH languages, the home page
 * included: / and /en, /about and /en/about, /contact and /en/contact,
 * /privacy and /en/privacy.
 *
 * The home page used to be listed once, Arabic-only, because /en did not
 * exist. It does now, so both are listed and each pair carries
 * reciprocal hreflang alternatives with x-default pointing at Arabic.
 * That is what stops Google treating the two languages as duplicate
 * pages.
 *
 * The tools product lives on tools.datalynx.space. It is a separate
 * origin with its own sitemap, so it is deliberately NOT listed here:
 * mixing origins in one sitemap is invalid.
 *
 * `dynamic = 'force-static'` is required with `output: 'export'` so
 * /sitemap.xml is emitted as a real file at build time.
 */
export const dynamic = 'force-static';

/*
 * كل مسار موجود باللغتين، مع أولويته وتكرار تحديثه المتوقع.
 * السلسلة الفارغة هي الصفحة الرئيسية.
 */
const ROUTES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: 'about', priority: 0.8, changeFrequency: 'monthly' },
  { path: 'contact', priority: 0.9, changeFrequency: 'monthly' },
  { path: 'privacy', priority: 0.4, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap(({ path, priority, changeFrequency }) => {
    const ar = absoluteUrl('ar', path);
    const en = absoluteUrl('en', path);

    const languages = {
      ar,
      en,
      'x-default': ar,
    };

    return [
      {
        url: ar,
        changeFrequency,
        priority,
        alternates: { languages },
      },
      {
        url: en,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];
  });
}
