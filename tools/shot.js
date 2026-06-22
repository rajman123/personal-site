const { chromium } = require('playwright-core');

const EXE = '/root/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome';
const BASE = 'http://127.0.0.1/site';

(async () => {
  const browser = await chromium.launch({
    executablePath: EXE,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
  });

  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1200);

  // Full page
  await page.screenshot({ path: '/tmp/resume_full.png', fullPage: true });

  // Hero (top of page)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/resume_hero.png' });

  // Experience section
  await page.evaluate(() => document.getElementById('experience')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/resume_experience.png' });

  // Skills section
  await page.evaluate(() => document.getElementById('skills')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/resume_skills.png' });

  // Contact section
  await page.evaluate(() => document.getElementById('contact')?.scrollIntoView({ block: 'start' }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: '/tmp/resume_contact.png' });

  // Command palette open (⌘K)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.keyboard.down('Control');
  await page.keyboard.press('K');
  await page.keyboard.up('Control');
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/resume_palette.png' });

  await browser.close();
  console.log('screenshots written');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
