const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const EXE = '/root/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome';
const ROOT = '/root/website-build';
const HTML = path.join(ROOT, '.next/server/app/index.html');

const MIME = {
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
};

function resolveLocal(urlPath, search) {
  // urlPath like /site/_next/static/...  or /site/hero-photo.png
  let p = urlPath.replace(/^\/site/, '');
  // next/image optimizer: /_next/image?url=%2Fsite%2Fhero-photo.png&w=...
  if (p.startsWith('/_next/image')) {
    const params = new URLSearchParams(search || '');
    const inner = decodeURIComponent(params.get('url') || '');
    const innerPath = inner.replace(/^\/site/, '').replace(/^\//, '');
    const pub = path.join(ROOT, 'public', innerPath);
    if (fs.existsSync(pub)) return pub;
    return null;
  }
  if (p.startsWith('/_next/')) {
    return path.join(ROOT, '.next', p.slice('/_next/'.length));
  }
  // public assets
  const pub = path.join(ROOT, 'public', p.replace(/^\//, ''));
  if (fs.existsSync(pub)) return pub;
  return null;
}

(async () => {
  const browser = await chromium.launch({
    executablePath: EXE,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });

  await page.route('**/*', async (route) => {
    const reqUrl = route.request().url();
    // The main document load:
    if (reqUrl.startsWith('file://') && reqUrl.includes('resume_index.html')) {
      return route.continue();
    }
    const url = new URL(reqUrl);
    const local = resolveLocal(url.pathname, url.search);
    if (local && fs.existsSync(local)) {
      const ext = path.extname(local);
      return route.fulfill({
        status: 200,
        contentType: MIME[ext] || 'application/octet-stream',
        body: fs.readFileSync(local),
      });
    }
    // Block external (calendly/fonts CDN) gracefully
    return route.fulfill({ status: 204, body: '' });
  });

  // Write the prerendered HTML to a file served from a fake /site origin via file://.
  // Rewrite absolute /site/_next and /site/<asset> so they resolve under file root.
  let html = fs.readFileSync(HTML, 'utf8');
  const tmpHtml = '/tmp/resume_index.html';
  fs.writeFileSync(tmpHtml, html);
  await page.goto('file://' + tmpHtml, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  await page.screenshot({ path: '/tmp/resume_full.png', fullPage: true });

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/resume_hero.png' });

  await page.evaluate(() => document.getElementById('experience')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/resume_experience.png' });

  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/resume_skills.png' });

  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/resume_contact.png' });

  await browser.close();
  console.log('static screenshots written');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
