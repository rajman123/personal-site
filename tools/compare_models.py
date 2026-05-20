"""Run multiple rembg models and produce side-by-side composites for comparison."""
from pathlib import Path
from PIL import Image, ImageFilter
from rembg import remove, new_session

ASSETS = Path("/root/website-build/assets")
SRC = ASSETS / "rajveer-photo-v1.jpg"
TOP = (0x0a, 0x0a, 0x12)
BOTTOM = (0x1a, 0x16, 0x22)

MODELS = ["isnet-general-use", "birefnet-portrait", "u2net_human_seg"]


def make_gradient(size):
    w, h = size
    grad = Image.new("RGB", (1, h))
    px = grad.load()
    for y in range(h):
        t = y / max(1, h - 1)
        px[0, y] = (
            round(TOP[0] + (BOTTOM[0] - TOP[0]) * t),
            round(TOP[1] + (BOTTOM[1] - TOP[1]) * t),
            round(TOP[2] + (BOTTOM[2] - TOP[2]) * t),
        )
    return grad.resize((w, h), Image.BILINEAR)


def run(model):
    print(f"=== {model} ===")
    sess = new_session(model)
    with open(SRC, "rb") as f:
        data = f.read()
    out = remove(
        data,
        session=sess,
        alpha_matting=True,
        alpha_matting_foreground_threshold=240,
        alpha_matting_background_threshold=10,
        alpha_matting_erode_size=10,
    )
    p_nobg = ASSETS / f"_test_{model}_nobg.png"
    p_final = ASSETS / f"_test_{model}_final.png"
    with open(p_nobg, "wb") as f:
        f.write(out)
    cutout = Image.open(p_nobg).convert("RGBA")
    bg = make_gradient(cutout.size).convert("RGBA")
    r, g, b, a = cutout.split()
    a = a.filter(ImageFilter.GaussianBlur(radius=0.6))
    cutout = Image.merge("RGBA", (r, g, b, a))
    final = Image.alpha_composite(bg, cutout).convert("RGB")
    final.save(p_final, "PNG", optimize=True)
    print(f"  wrote {p_final}")


for m in MODELS:
    try:
        run(m)
    except Exception as e:
        print(f"  FAILED {m}: {e}")
