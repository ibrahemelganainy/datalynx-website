/*
 * Browser verification for the six ported pages on the target site.
 *
 * Serves the exported `out/` directory and checks, in a real browser:
 *   - direct access and refresh on each of the six URLs
 *   - the correct language and text direction rendering
 *   - the language switcher cross-linking correctly
 *   - internal navigation staying inside the current language
 *   - the contact form: validation, WhatsApp URL, encoding, fallback
 *   - the existing homepage still renders (regression)
 *
 * Usage: node scripts/qa-target-browser.mjs <targetDir> <port>
 */
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import playwright from './_pw.mjs';

const target = process.argv[2];
const port = Number(process.argv[3] || 4399);
const out = path.join(target, 'out');

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  let rel = decodeURIComponent((req.url || '/').split('?')[0]);
  if (rel.endsWith('/')) rel += 'index.html';

  const candidates = [
    path.join(out, rel),
    path.join(out, `${rel}.html`),
    path.join(out, rel, 'index.html'),
  ];

  const found = candidates.find(
    (f) => f.startsWith(out) && fs.existsSync(f) && fs.statSync(f).isFile()
  );

  if (!found) {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('not found');
    return;
  }

  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(found).toLowerCase()] || 'application/octet-stream',
  });
  fs.createReadStream(found).pipe(res);
});

await new Promise((r) => server.listen(port, r));

const base = `http://localhost:${port}`;
const browser = await playwright.chromium.launch({
  executablePath: process.env.CHROME_PATH,
  headless: true,
});

const report = { routes: [], switcher: [], form: null, regression: null };

/* ---------- 1. direct access + refresh ---------- */
for (const [url, lang, dir, needle] of [
  ['/about', 'ar', 'rtl', 'من نحن'],
  ['/contact', 'ar', 'rtl', 'اتصل بنا'],
  ['/privacy', 'ar', 'rtl', 'سياسة الخصوصية'],
  ['/en/about', 'en', 'ltr', 'About Us'],
  ['/en/contact', 'en', 'ltr', 'Contact Us'],
  ['/en/privacy', 'en', 'ltr', 'Privacy Policy'],
]) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text().slice(0, 160));
  });

  await page.goto(base + url, { waitUntil: 'load' });
  await page.waitForTimeout(500);

  const first = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.innerText?.trim() ?? null,
    wrapperDir:
      document.querySelector('[dir]')?.getAttribute('dir') ?? null,
    bodyText: document.body.innerText.slice(0, 200),
  }));

  /* refresh */
  await page.reload({ waitUntil: 'load' });
  await page.waitForTimeout(400);

  const afterReload = await page.evaluate(() => ({
    title: document.title,
    hasH1: Boolean(document.querySelector('h1')),
  }));

  report.routes.push({
    url,
    title: first.title,
    hasContent: Boolean(first.h1),
    needleFound: first.bodyText.includes(needle),
    dir: first.wrapperDir,
    dirOk: first.wrapperDir === dir,
    reloadOk: afterReload.hasH1 && afterReload.title === first.title,
    errors,
  });

  await page.close();
}

/* ---------- 2. language switcher ---------- */
for (const [from, expectTo] of [
  ['/about', '/en/about'],
  ['/contact', '/en/contact'],
  ['/privacy', '/en/privacy'],
  ['/en/about', '/about'],
  ['/en/contact', '/contact'],
  ['/en/privacy', '/privacy'],
]) {
  const page = await browser.newPage();
  await page.goto(base + from, { waitUntil: 'load' });
  await page.waitForTimeout(400);

  const href = await page.evaluate(() => {
    const a = document.querySelector('[data-lang-switcher="desktop"]');
    return a ? a.getAttribute('href') : null;
  });

  /* Follow it and confirm we land on the sibling page. */
  let landed = null;
  if (href) {
    await page.click('[data-lang-switcher="desktop"]');
    await page.waitForTimeout(700);
    landed = await page.evaluate(() => ({
      url: location.pathname,
      title: document.title,
      hasH1: Boolean(document.querySelector('h1')),
    }));
  }

  report.switcher.push({
    from,
    href,
    correct: href === expectTo,
    landedOk: landed ? landed.hasH1 && landed.url.replace(/\/$/, '') === expectTo : false,
  });

  await page.close();
}

/* ---------- 3. homepage must be unaffected ---------- */
{
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));

  await page.goto(base + '/', { waitUntil: 'load' });
  await page.waitForTimeout(800);

  const home = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('h1')?.innerText?.trim() ?? null,
    sections: document.querySelectorAll('section').length,
    lang: document.documentElement.getAttribute('lang'),
    dir: document.documentElement.getAttribute('dir'),
    /* language switcher present but disabled on the Arabic-only home */
    switcherState: document.querySelector('[data-lang-switcher="desktop-unavailable"]')
      ? 'disabled'
      : document.querySelector('[data-lang-switcher="desktop"]')
        ? 'link'
        : 'absent',
    /* the new nav links exist */
    navAbout: Boolean(document.querySelector('nav a[href="/about"]')),
    navContact: Boolean(document.querySelector('nav a[href="/contact"]')),
    navPrivacy: Boolean(document.querySelector('nav a[href="/privacy"]')),
  }));

  report.regression = { ...home, errors };
  await page.close();
}

/* ---------- 4. contact form ---------- */
{
  const page = await browser.newPage();
  await page.goto(base + '/contact', { waitUntil: 'load' });
  await page.waitForTimeout(500);

  /* empty submit -> validation errors, no false success */
  await page.evaluate(() => document.querySelector('form')?.requestSubmit());
  await page.waitForTimeout(400);

  const validation = await page.evaluate(() => ({
    alerts: Array.from(document.querySelectorAll('[role="alert"]')).map((n) =>
      n.textContent.trim()
    ),
  }));

  await page.fill('#contact-name', 'Test User');
  await page.fill('#contact-phone', '+20 100 000 0000');
  await page.selectOption('#contact-inquiry', 'technical');
  await page.fill('#contact-message', 'Test message body');

  const waUrl = await page.evaluate(() => {
    let captured = null;
    const real = window.open;
    window.open = (u) => {
      captured = u;
      return { closed: false };
    };
    document.querySelector('form').requestSubmit();
    window.open = real;
    return captured;
  });

  await page.waitForTimeout(400);

  const after = await page.evaluate(() => {
    const t = document.body.innerText;
    return {
      successShown: t.includes('تم تجهيز رسالتك'),
      fallbackShown: t.includes('لم تُفتح النافذة'),
      falseDelivery: /تم إرسال|تم استلام|وصلت رسالتك/.test(t),
    };
  });

  let decoded = null;
  try {
    decoded = decodeURIComponent(new URL(waUrl).searchParams.get('text') || '');
  } catch {
    decoded = null;
  }

  /* email link present and independent */
  const email = await page.evaluate(
    () =>
      document.querySelector('a[href^="mailto:"]')?.getAttribute('href') ?? null
  );

  report.form = {
    validationErrors: validation.alerts.length,
    waUrlStartsWith: (waUrl || '').slice(0, 34),
    waOk: typeof waUrl === 'string' && waUrl.startsWith('https://wa.me/201507071671'),
    decoded,
    encodedCorrectly: decoded !== null && decoded.includes('Test User') && decoded.includes('Test message body'),
    ...after,
    email,
  };

  await page.close();
}

await browser.close();
await new Promise((r) => server.close(r));

console.log(JSON.stringify(report, null, 1));
