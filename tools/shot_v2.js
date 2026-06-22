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
  await page.waitForTimeout(1500);

  // 1. Full-screen hero (exactly the viewport on load)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/tmp/v2_hero.png' });

  // 2. Projects collapsed — bring section in, let reveals run, then frame the
  // stack of collapsed cards.
  await page.evaluate(() =>
    document.getElementById('projects')?.scrollIntoView({ block: 'start' })
  );
  await page.waitForTimeout(1300);
  await page.evaluate(() => {
    const sec = document.getElementById('projects');
    const firstCard = sec?.querySelector('button[aria-expanded]');
    const rect = firstCard?.getBoundingClientRect();
    if (rect) window.scrollBy({ top: rect.top - 150, behavior: 'instant' });
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: '/tmp/v2_projects_collapsed.png' });

  // 3. Expand the first project card, then screenshot
  await page.evaluate(() => {
    const sec = document.getElementById('projects');
    const btn = sec?.querySelector('button[aria-expanded]');
    if (btn) btn.click();
  });
  await page.waitForTimeout(900);
  await page.evaluate(() => {
    const sec = document.getElementById('projects');
    const btn = sec?.querySelector('button[aria-expanded="true"]');
    btn?.scrollIntoView({ block: 'start' });
  });
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/tmp/v2_project_expanded.png' });

  // 4. Contact
  await page.evaluate(() =>
    document.getElementById('contact')?.scrollIntoView({ block: 'start' })
  );
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/v2_contact.png' });

  // 5. About (bonus, to confirm copy kept)
  await page.evaluate(() =>
    document.getElementById('about')?.scrollIntoView({ block: 'start' })
  );
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/tmp/v2_about.png' });

  // 6. Experience (bonus, confirm split + placeholder)
  await page.evaluate(() =>
    document.getElementById('experience')?.scrollIntoView({ block: 'start' })
  );
  await page.waitForTimeout(700);
  await page.screenshot({ path: '/tmp/v2_experience.png' });

  await browser.close();
  console.log('v2 screenshots written');
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
