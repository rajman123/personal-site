"""Capture preview screenshots of every page on the site."""

from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = "http://127.0.0.1:3001"
OUT = Path("/root/website-build/previews/v2")
OUT.mkdir(parents=True, exist_ok=True)

PAGES = [
    ("home", "/"),
    ("work", "/work"),
    ("about", "/about"),
    ("contact", "/contact"),
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
            for page_name, path in PAGES:
                page.goto(BASE + path, wait_until="domcontentloaded")
                page.wait_for_load_state("load")
                page.wait_for_timeout(2500)

                # scroll-trigger whileInView animations
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

                # full-page
                full_path = OUT / f"{vp_name}-{page_name}-full.png"
                page.screenshot(path=str(full_path), full_page=True)
                print(f"wrote {full_path}")

                # above-the-fold
                fold_path = OUT / f"{vp_name}-{page_name}-fold.png"
                page.screenshot(path=str(fold_path), full_page=False)
                print(f"wrote {fold_path}")
            context.close()
        browser.close()


if __name__ == "__main__":
    main()
