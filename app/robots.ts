import type { MetadataRoute } from 'next';

/*
 * robots.txt for datalynx.space.
 *
 * The site has no robots route today, so this adds the least invasive
 * version: allow everything (all pages are public and must stay
 * crawlable) and point at the sitemap. No existing policy is changed
 * because there was none.
 */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://datalynx.space/sitemap.xml',
    host: 'https://datalynx.space',
  };
}
