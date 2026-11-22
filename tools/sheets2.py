# -*- coding: utf-8 -*-
# גיליונות תצוגה גדולים לכל התמונות שעולות לאתר, למיון לפי תחום. כפילויות זהות מסוננות.
import os, json, hashlib
from PIL import Image, ImageOps, ImageDraw
SRC = r"C:\Users\matan\Desktop\אלום אלבז\תמונות של עבודות"
OUT = r"C:\Users\matan\alum-elbaz-site\shots\sheets2"
os.makedirs(OUT, exist_ok=True)
EXT = (".jpg", ".jpeg", ".png", ".webp")
SKIP = ("הכנה", "הכנות", "מחזיר שמן", "ידיות", "סרטוני")
TW, TH, COLS, ROWS = 320, 300, 6, 4
items = []; seen = {}; dups = 0
dirs = ["."] + sorted(d for d in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, d)) and not d.startswith(SKIP))
for d in dirs:
    base = os.path.join(SRC, d)
    fs = sorted(f for f in os.listdir(base) if f.lower().endswith(EXT)) if d == "." else sorted(os.path.relpath(os.path.join(r, f), base) for r, _, ff in os.walk(base) for f in ff if f.lower().endswith(EXT))
    for f in fs:
        p = os.path.join(base, f); h = hashlib.md5(open(p, "rb").read()).hexdigest()
        if h in seen: dups += 1; continue
        seen[h] = 1; items.append({"dir": d, "file": f})
for s in range(0, len(items), COLS * ROWS):
    chunk = items[s:s + COLS * ROWS]; rows = (len(chunk) + COLS - 1) // COLS
    sheet = Image.new("RGB", (COLS * TW, rows * TH), (30, 30, 30)); dr = ImageDraw.Draw(sheet)
    for i, it in enumerate(chunk):
        try:
            im = ImageOps.exif_transpose(Image.open(os.path.join(SRC, it["dir"], it["file"]))).convert("RGB"); it["w"], it["h"] = im.size
            im = ImageOps.contain(im, (TW - 6, TH - 6))
        except Exception as e:
            it["err"] = str(e); continue
        x, y = (i % COLS) * TW + 3, (i // COLS) * TH + 3
        sheet.paste(im, (x + (TW - 6 - im.width) // 2, y + (TH - 6 - im.height) // 2))
        dr.rectangle((x, y, x + 40, y + 16), fill=(0, 0, 0)); dr.text((x + 3, y + 2), str(s + i), fill=(255, 230, 0))
    sheet.save(os.path.join(OUT, "s%03d.jpg" % s), quality=82)
json.dump(items, open(os.path.join(OUT, "index.json"), "w", encoding="utf-8"), ensure_ascii=False)
from collections import Counter
print(len(items), "dups", dups); c = Counter(i["dir"] for i in items); st = 0
for d in dirs: print(st, st + c[d] - 1, d.encode("unicode_escape").decode() if False else d); st += c[d]
print([i for i in items if "err" in i])
