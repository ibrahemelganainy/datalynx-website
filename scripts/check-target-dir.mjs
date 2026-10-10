/*
 * Checks the effective text direction of the English pages.
 *
 * The root layout sets dir="rtl" (correct for the Arabic site), and the
 * ported page components set dir="ltr" on their own wrapper. What matters
 * is the COMPUTED direction of the actual content, not the first [dir]
 * attribute found in the document.
 *
 * Usage: node scripts/check-target-dir.mjs <targetDir> <port>
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

import playwright, { executablePath } from './_pw.mjs';

const target = process.argv[2];
const port = Number(process.argv[3] || 4401);
const out = path.join(target, 'out');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent((req.url || '/').split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';

  const found = [
    path.join(out, rel),
    path.join(out, `${rel}.html`),
    path.join(out, rel, 'index.html'),
  ].find((f) => f.startsWith(out) && fs.existsSync(f) && fs.statSync(f).isFile());

  if (!found) {
    res.writeHead(404);
    res.end('nf');
    return;
  }

  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(found).toLowerCase()] || 'application/octet-stream',
  });
  fs.createReadStream(found).pipe(res);
});

await new Promise((r) => server.listen(port, r));

const browser = await playwright.chromium.launch({ executablePath, headless: true });

for (const [url, expect] of [
  ['/about', 'rtl'],
  ['/en/about', 'ltr'],
  ['/en/contact', 'ltr'],
  ['/en/privacy', 'ltr'],
  ['/', 'rtl'],
]) {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}${url}`, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  const info = await page.evaluate(() => {
    const main = document.querySelector('main');
    const h1 = document.querySelector('h1');
    const wrapper = main?.closest('[dir]');

    return {
      htmlLang: document.documentElement.getAttribute('lang'),
      htmlDir: document.documentElement.getAttribute('dir'),
      mainComputedDir: main ? getComputedStyle(main).direction : null,
      h1ComputedDir: h1 ? getComputedStyle(h1).direction : null,
      wrapperDir: wrapper ? wrapper.getAttribute('dir') : null,
      wrapperLang: wrapper ? wrapper.getAttribute('lang') : null,
      /* the <html> element cannot be per-route in a static export */
      note: 'html dir comes from the root layout; content wrapper overrides it',
    };
  });

  console.log(
    `${url}\n  expected=${expect} mainComputed=${info.mainComputedDir} ` +
      `h1Computed=${info.h1ComputedDir} wrapper=${info.wrapperLang}/${info.wrapperDir} ` +
      `html=${info.htmlLang}/${info.htmlDir}  ->  ` +
      `${info.mainComputedDir === expect ? 'PASS' : 'FAIL'}`
  );

  await page.close();
}

await browser.close();
await new Promise((r) => server.close(r));
