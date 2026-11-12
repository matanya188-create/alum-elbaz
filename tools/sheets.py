# -*- coding: utf-8 -*-
# גיליונות תצוגה ממוספרים של תמונות העבודות, לבחירת תמונות לאתר
import os, json
from PIL import Image, ImageOps, ImageDraw
SRC = r"C:\Users\matan\Desktop\אלום אלבז\תמונות של עבודות"
OUT = r"C:\Users\matan\alum-elbaz-site\shots\sheets"
EXT = (".jpg", ".jpeg", ".png", ".webp")
index = {}
dirs = sorted(d for d in os.listdir(SRC) if os.path.isdir(os.path.join(SRC, d)))
TW, TH, COLS, ROWS = 200, 160, 8, 6
for di, d in enumerate(dirs):
    files = []
    for r, _, fs in os.walk(os.path.join(SRC, d)):
        files += [os.path.join(r, f) for f in sorted(fs) if f.lower().endswith(EXT)]
    index[str(di)] = {"dir": d, "files": files}
    for s in range(0, len(files), COLS * ROWS):
        chunk = files[s:s + COLS * ROWS]
        rows = (len(chunk) + COLS - 1) // COLS
        sheet = Image.new("RGB", (COLS * TW, rows * TH), (30, 30, 30)); dr = ImageDraw.Draw(sheet)
        for i, f in enumerate(chunk):
            try:
                im = ImageOps.exif_transpose(Image.open(f)).convert("RGB"); w, h = im.size
                im = ImageOps.fit(im, (TW - 4, TH - 4))
            except Exception as e:
                continue
            x, y = (i % COLS) * TW + 2, (i // COLS) * TH + 2
            sheet.paste(im, (x, y))
            lab = "%d %s" % (s + i, "P" if h > w else "L")
            dr.rectangle((x, y, x + 46, y + 14), fill=(0, 0, 0)); dr.text((x + 2, y + 1), lab, fill=(255, 230, 0))
        sheet.save(os.path.join(OUT, "d%02d_%03d.jpg" % (di, s)), quality=80)
    print(di, len(files))
json.dump(index, open(os.path.join(OUT, "index.json"), "w", encoding="utf-8"), ensure_ascii=False)
