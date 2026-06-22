const { chromium } = require('playwright-core');

const EXE = '/root/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome';
const BASE = 'http://127.0.0.1/site';

(async () => {
  const browser = await chromium.launch({
    executablePath: EXE,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);

  // Slow-scroll the whole page so every framer-motion whileInView reveal fires.
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= total; y += 450) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(220);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);

  const frameTopOf = async (sel, offset = 130) => {
    await page.evaluate(
      ({ s, o }) => {
        const el = document.querySelector(s);
        if (el) {
          const r = el.getBoundingClientRect();
          window.scrollBy({ top: r.top - o, behavior: 'instant' });
        }
      },
      { s: sel, o: offset }
    );
    await page.waitForTimeout(700);
  };

  // 1. Education block (top of #experience)
  await page.evaluate(() =>
    document.getElementById('experience')?.scrollIntoView({ block: 'start' })
  );
  await page.waitForTimeout(900);
  await page.screenshot({ path: '/tmp/exp_education.png' });

  // 2. Experience cards COLLAPSED — frame the first card.
  await frameTopOf('#experience .space-y-4 > div:first-child', 120);
  await page.screenshot({ path: '/tmp/exp_collapsed.png' });

  // 3. Expand the SECOND card (Secretariat — has 3 bullets) and capture.
  await page.evaluate(() => {
    const cards = document.querySelectorAll('#experience button[aria-expanded]');
    cards[1]?.click();
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const btn = document.querySelector('#experience button[aria-expanded="true"]');
    if (btn) {
      const r = btn.getBoundingClientRect();
      window.scrollBy({ top: r.top - 130, behavior: 'instant' });
    }
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/tmp/exp_expanded.png' });

  // 4. Skills + Investor highlight
  await frameTopOf('#skills', 110);
  await page.screenshot({ path: '/tmp/exp_skills.png' });

  // 5. Investor highlight close-up (scroll to the callout)
  await frameTopOf('#skills .glass', 200);
  await page.screenshot({ path: '/tmp/exp_investor.png' });

  // 6. Interests + Affiliations
  await frameTopOf('#interests', 110);
  await page.screenshot({ path: '/tmp/exp_interests.png' });

  await browser.close();
  console.log('exp screenshots written');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
