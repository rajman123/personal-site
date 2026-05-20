"""Capture preview screenshots of the personal site at multiple accent colors and viewports."""

from pathlib import Path
from playwright.sync_api import sync_playwright

URL = "http://127.0.0.1:3001/"
OUT = Path("/root/website-build/previews")
OUT.mkdir(exist_ok=True)

ACCENTS = ["amber", "blue", "emerald"]
SECTIONS = [
    ("hero", "#top", 0),
    ("work", "#work", 1),
    ("about", "#about", 1),
    ("contact", "#contact", 1),
]

VIEWPORTS = {
    "desktop": {"width": 1440, "height": 900},
    "mobile": {"width": 390, "height": 844},
}


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        for vp_name, vp in VIEWPORTS.items():
            context = browser.new_context(viewport=vp, device_scale_factor=2)
            page = context.new_page()
            page.goto(URL, wait_until="domcontentloaded")
            page.wait_for_load_state("load")
            # wait for fonts/images to settle
            page.wait_for_timeout(2500)
            # Scroll through page to trigger whileInView IntersectionObserver
            # animations so the full-page screenshot captures revealed content.
            total_height = page.evaluate("() => document.body.scrollHeight")
            step = 400
            y = 0
            while y < total_height:
                page.evaluate("(y) => window.scrollTo(0, y)", y)
                page.wait_for_timeout(120)
                y += step
            page.evaluate("() => window.scrollTo(0, document.body.scrollHeight)")
            page.wait_for_timeout(800)
            page.evaluate("() => window.scrollTo(0, 0)")
            page.wait_for_timeout(600)
            for accent in ACCENTS:
                page.evaluate(
                    "(a) => { document.documentElement.dataset.accent = a; localStorage.setItem('preview-accent', a); }",
                    accent,
                )
                # close the accent switcher panel for clean screenshots
                page.evaluate("() => { const b = document.querySelector('[aria-label=Close]'); if (b) b.click(); }")
                page.wait_for_timeout(300)

                # full page first
                full_path = OUT / f"{vp_name}-{accent}-full.png"
                page.screenshot(path=str(full_path), full_page=True)
                print(f"wrote {full_path}")

                # hero only (above the fold)
                hero_path = OUT / f"{vp_name}-{accent}-hero.png"
                page.screenshot(path=str(hero_path), full_page=False)
                print(f"wrote {hero_path}")

            context.close()
        browser.close()


if __name__ == "__main__":
    main()
