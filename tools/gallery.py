# -*- coding: utf-8 -*-
# בונה את תמונות הגלריה (assets/g) ואת tools/gallery.json מתוך tools/gallery_map.json.
# לכל תמונה: יישור לפי EXIF, הסרת פסים אחידים (שחור/לבן) וסרגלי טלפון מצילומי מסך, תמונה ממוזערת + תמונה גדולה ב-webp, בלי EXIF.
import os, json, io, shutil
from PIL import Image, ImageOps
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = r"C:\Users\matan\Desktop\אלום אלבז\תמונות של עבודות"
OUT = os.path.join(ROOT, "assets", "g")
ORDER = ["windows", "vitrines", "belgian", "doors", "shutters", "closures", "showers", "pergolas", "fences", "office", "cladding", "screens", "handles"]
# שתי התמונות שמוצגות בעמוד הבית לכל תחום (מספר בלוחות shots/sheets2); הן גם הראשונות בגלריה
FIRST = {"windows": [121, 202], "vitrines": [289, 236], "belgian": [245, 206], "doors": [127, 266], "shutters": [154, 230], "closures": [189, 255],
         "showers": [312, 330], "pergolas": [367, 411], "fences": [14, 10], "office": [15, 220], "cladding": [21, 20], "screens": [452, 451]}
# חיתוך ידני (חלק מהגובה: מלמעלה, מלמטה) לצילומי מסך שסרגל הטלפון מונח בהם על התמונה עצמה
CROP = {429: (0, .07), 433: (0, .07), 324: (.05, 0)}
# אותו צילום פעמיים (צילום מסך של אותה תמונה או אותו סרטון)
DROP = {325, 318}
HANDLES = [("1.jpg", None), ("4.jpg", None), ("5.jpg", (.045, .065)), ("2.jpg", None), ("3.jpg", None)]


def bands(g, axis):
    """מחזיר את הקטע הארוך ביותר של שורות/עמודות שאינן פס אחיד שחור או לבן."""
    w, h = g.size; n = h if axis == 0 else w
    px = g.load(); flat = []
    for i in range(n):
        vals = [px[x, i] for x in range(0, w, max(1, w // 48))] if axis == 0 else [px[i, y] for y in range(0, h, max(1, h // 48))]
        m = sum(vals) / len(vals); sd = (sum((v - m) ** 2 for v in vals) / len(vals)) ** .5
        flat.append(sd < 7 and (m < 22 or m > 236))
    runs = []; s = None
    for i, f in enumerate(flat + [True]):
        if not f and s is None: s = i
        if f and s is not None: runs.append([s, i]); s = None
    if not runs: return 0, n
    merged = [runs[0]]
    for r in runs[1:]:
        if r[0] - merged[-1][1] < n * .012: merged[-1][1] = r[1]
        else: merged.append(r)
    a, b = max(merged, key=lambda r: r[1] - r[0])
    return (a, b) if (b - a) < n * .96 else (0, n)


def prep(path, crop=None):
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    if crop: im = im.crop((0, round(im.height * crop[0]), im.width, round(im.height * (1 - crop[1]))))
    g = im.convert("L").resize((max(1, im.width // 4), max(1, im.height // 4)))
    y0, y1 = bands(g, 0); x0, x1 = bands(g, 1); t = False
    if (y0, y1, x0, x1) != (0, g.height, 0, g.width):
        im = im.crop((x0 * 4, y0 * 4, min(im.width, x1 * 4), min(im.height, y1 * 4))); t = True
    return im, t


def dhash(im):
    g = im.convert("L").resize((17, 16)); p = list(g.tobytes())
    return sum(1 << i for i in range(256) if p[(i // 16) * 17 + i % 16] > p[(i // 16) * 17 + i % 16 + 1])


items = json.load(open(os.path.join(ROOT, "shots", "sheets2", "index.json"), encoding="utf-8"))
mp = json.load(open(os.path.join(ROOT, "tools", "gallery_map.json"), encoding="utf-8"))
by = {c: [] for c in ORDER}
for i, it in enumerate(items):
    c = mp.get((it["dir"] + "/" + it["file"]).replace("\\", "/"))
    if c is None: print("NOT IN MAP", it); continue
    if c != "-" and i not in DROP: by[c].append((i, os.path.join(SRC, it["dir"], it["file"]), CROP.get(i)))
for c in by: by[c].sort(key=lambda t: (FIRST.get(c, []).index(t[0]) if t[0] in FIRST.get(c, []) else 99, t[0]))
by["handles"] = [("h%d" % k, os.path.join(ROOT, "src-img", "handles", f), cr) for k, (f, cr) in enumerate(HANDLES)]
if os.path.isdir(OUT): shutil.rmtree(OUT)
os.makedirs(OUT)
man = {}; log = {"trim": [], "small": [], "dup": []}
for c in ORDER:
    out = []; hashes = []
    for idx, path, crop in by[c]:
        im, t = prep(path, crop)
        if t: log["trim"].append(idx)
        if min(im.size) < 320: log["small"].append((idx, im.size)); continue
        h = dhash(im)
        if any(bin(h ^ o).count("1") <= 6 for o in hashes): log["dup"].append(idx); continue
        hashes.append(h)
        n = len(out) + 1; big = im.copy(); big.thumbnail((1600, 1600), Image.LANCZOS)
        th = im.copy(); th.thumbnail((520, 1040), Image.LANCZOS)
        big.save(os.path.join(OUT, "%s-%03d.webp" % (c, n)), "WEBP", quality=80, method=5)
        th.save(os.path.join(OUT, "%s-%03d-t.webp" % (c, n)), "WEBP", quality=72, method=5)
        out.append({"n": n, "w": big.width, "h": big.height, "tw": th.width, "th": th.height, "src": idx})
    man[c] = out; print(c, len(out), flush=True)
json.dump(man, open(os.path.join(ROOT, "tools", "gallery.json"), "w"), separators=(",", ":"))
print(json.dumps(log)); print(sum(len(v) for v in man.values()), "images", sum(os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT)) // 1024 // 1024, "MB")
