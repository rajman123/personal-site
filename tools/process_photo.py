"""Process Rajveer's portrait: remove busy backdrop, composite onto subtle dark gradient."""
import os
import sys
from pathlib import Path

from PIL import Image, ImageFilter
from rembg import remove, new_session

ASSETS = Path("/root/website-build/assets")
SRC = ASSETS / "rajveer-photo-v1.jpg"
NOBG = ASSETS / "rajveer-photo-v1-nobg.png"
OUT = ASSETS / "rajveer-photo-v1-clean.png"

# Color stops for the dark gradient (RGB)
TOP = (0x0a, 0x0a, 0x12)      # near-black navy
BOTTOM = (0x1a, 0x16, 0x22)   # subtle warm dark


def cut_subject(model_name: str, alpha_matting: bool = True) -> Image.Image:
    """Run rembg with the given model and return RGBA cutout."""
    print(f"[rembg] model={model_name} alpha_matting={alpha_matting}")
    session = new_session(model_name)
    with open(SRC, "rb") as f:
        input_bytes = f.read()
    output_bytes = remove(
        input_bytes,
        session=session,
        alpha_matting=alpha_matting,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
    )
    tmp = ASSETS / f"_tmp_{model_name}.png"
    with open(tmp, "wb") as f:
        f.write(output_bytes)
    return Image.open(tmp).convert("RGBA")


def make_gradient(size: tuple[int, int]) -> Image.Image:
    """Smooth vertical gradient TOP -> BOTTOM, dithered to avoid banding."""
    w, h = size
    # Build at full resolution, per-row interpolation
    grad = Image.new("RGB", (1, h))
    px = grad.load()
    for y in range(h):
        t = y / max(1, h - 1)
        r = round(TOP[0] + (BOTTOM[0] - TOP[0]) * t)
        g = round(TOP[1] + (BOTTOM[1] - TOP[1]) * t)
        b = round(TOP[2] + (BOTTOM[2] - TOP[2]) * t)
        px[0, y] = (r, g, b)
    grad = grad.resize((w, h), Image.BILINEAR)

    # Add a very subtle radial-ish glow behind the subject for depth (optional but polished)
    # Soft vignette darken at corners
    vignette = Image.new("L", (w, h), 0)
    vpx = vignette.load()
    cx, cy = w / 2, h * 0.45
    max_d = ((cx) ** 2 + (cy) ** 2) ** 0.5
    for y in range(h):
        for x in range(w):
            d = ((x - cx) ** 2 + (y - cy) ** 2) ** 0.5 / max_d
            # darken edges by up to 15
            vpx[x, y] = int(min(255, max(0, d * 38)))
    # Apply vignette
    dark = Image.new("RGB", (w, h), (0, 0, 0))
    grad = Image.composite(dark, grad, vignette)
    return grad


def composite(cutout: Image.Image) -> Image.Image:
    bg = make_gradient(cutout.size).convert("RGBA")
    # Slight feather of the alpha to soften any harsh rembg edges
    r, g, b, a = cutout.split()
    a_soft = a.filter(ImageFilter.GaussianBlur(radius=0.6))
    cutout_soft = Image.merge("RGBA", (r, g, b, a_soft))
    out = Image.alpha_composite(bg, cutout_soft)
    return out


def main():
    model = sys.argv[1] if len(sys.argv) > 1 else "u2net"
    am = "--no-am" not in sys.argv
    cutout = cut_subject(model, alpha_matting=am)
    # Save the no-bg intermediate (only for the canonical run)
    cutout.save(NOBG)
    final = composite(cutout)
    final.convert("RGB").save(OUT, "PNG", optimize=True)
    print(f"[done] wrote {OUT} ({final.size})")


if __name__ == "__main__":
    main()
