# -*- coding: utf-8 -*-
# מכין את תמונות העבודות לאתר: יישור לפי EXIF, הקטנה, והסרת נתוני המצלמה והמיקום (EXIF) מהקובץ.
# הבחירה נעשתה ידנית מתוך "תמונות של עבודות" (המספר = מיקום הקובץ בתיקייה לפי סדר שמות).
import os, json
from PIL import Image, ImageOps
SRC = r"C:\Users\matan\Desktop\אלום אלבז\תמונות של עבודות"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets")
EXT = (".jpg", ".jpeg", ".png", ".webp")
def files(d):
    out = []
    for r, _, fs in os.walk(os.path.join(SRC, d)):
        out += [os.path.join(r, f) for f in sorted(fs) if f.lower().endswith(EXT)]
    return out
# שם באתר: (תיקייה, מספר, מצב)  מצב: "full" = יחס מקורי, "45" = חיתוך 4:5 לגלריה
PICK = {
    "hero": (None, os.path.join(ROOT, "src-img", "hero.jpg"), "full"),  # תמונת הפתיחה: נשארת התמונה המקורית (בקשת מתניה 12/11), לא מתמונות העבודות
    "contact": ("פרגולות", 46, "full"),
    "windows": ("חלונות", 239, "full"), "doors": ("חלונות", 142, "full"), "vitrines": ("חלונות", 268, "full"),
    "winter": ("פרגולות", 67, "full"), "shutters": ("חלונות", 44, "full"),
    "c1a": ("חלונות", 269, "45"), "c1b": ("חלונות", 187, "45"),
    "c2a": ("דלתות משרדים", 0, "45"), "c2b": ("דלתות משרדים", 2, "45"),
    "c3a": ("פרגולות", 15, "45"), "c3b": ("פרגולות", 66, "45"),
    "c4a": ("מקלחונים", 2, "45"), "c4b": ("מקלחונים", 54, "45"),
    "c5a": ("גדרות", 14, "45"), "c5b": ("גדרות", 10, "45"),
    "c6a": ("הצללה", 0, "45"), "c6b": ("הצללה", 1, "45"),
    "c7a": ("חיפוי אלומיניום בקליק", 1, "45"), "c7b": ("חיפוי אלומיניום בקליק", 0, "45"),
    "c8a": ("ידיות", 0, "45"), "c8b": ("ידיות", 1, "45"),
    "c9a": ("רשת פליסה", 16, "45"), "c9b": ("רשת פליסה", 15, "45"),
}
CENTER = {"c7b": (0.3, 0.5), "c1a": (0.5, 0.5)}
man = {}
for name, (d, i, mode) in PICK.items():
    im = ImageOps.exif_transpose(Image.open(i if d is None else files(d)[i])).convert("RGB")
    # יש תמונות שנשמרו עם פסים שחורים למעלה ולמטה: חותכים אותם
    g = im.convert("L").resize((64, im.height)); rows = [sum(g.crop((0, y, 64, y + 1)).getdata()) / 64 for y in range(im.height)]
    top = next(y for y, v in enumerate(rows) if v > 14); bot = im.height - next(y for y, v in enumerate(reversed(rows)) if v > 14)
    if top > 8 or bot < im.height - 8: im = im.crop((0, top, im.width, bot))
    if mode == "45":
        im = ImageOps.fit(im, (960, 1200), Image.LANCZOS, centering=CENTER.get(name, (0.5, 0.5))); sizes = (960, 480)
    else:
        big = 1600 if im.width >= im.height else 1200
        if im.width > big: im = im.resize((big, round(im.height * big / im.width)), Image.LANCZOS)
        sizes = (im.width, im.width // 2)
    for w in sizes:
        o = im if w == im.width else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        o.save(os.path.join(OUT, "%s-%d.jpg" % (name, w)), quality=80, optimize=True, progressive=True)  # בלי exif
    man[name] = {"w": im.width, "h": im.height, "s": list(sizes)}
json.dump(man, open(os.path.join(ROOT, "tools", "photos.json"), "w"), indent=0)
print(len(man), "photos")
