# -*- coding: utf-8 -*-
# מיון חד-פעמי (22/11/2026): כל תמונה שויכה לתחום לפי מה שרואים בה, אחרי מעבר על לוחות התצוגה ב-shots/sheets2.
# הפלט tools/gallery_map.json הוא המקור של tools/gallery.py. תמונה חדשה בתיקייה שלא מופיעה במפה תדווח שם.
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
items = json.load(open(os.path.join(ROOT, "shots", "sheets2", "index.json"), encoding="utf-8"))


def R(s):
    out = []
    for part in s.replace(" ", "").split(","):
        if not part: continue
        a, _, b = part.partition("-"); out += range(int(a), int(b or a) + 1)
    return out


CATS = {
    "fences": R("0,3-14"),
    "office": R("15-17,164,219-221,223"),
    "cladding": R("20,21"),
    "belgian": R("22-33,38-40,75,76,105,118,142,144,146,147,151,161,165,169,170,172,205-210,243-245,271,275,277-279,281,286"),
    "doors": R("34-37,42,45,55,56,58-61,90,93,94,104,114,124,126-131,141,150,153,175,176,193,194,197-200,211,222,242,263-266,270,283,284,297,298,301,302,308"),
    "shutters": R("53,54,66,112,113,154,195,204,230,232,280,285"),
    "closures": R("68,152,185-189,191,192,214,224,234,235,255-258,429-435"),
    "vitrines": R("41,64,67,69,70,73,74,77,84,88,89,91,92,95,143,145,167,168,183,184,203,215,217,218,229,231,236,237,260-262,272,274,276,289-293"),
    "showers": R("309-366"),
    "pergolas": R("1,2,367-400,402-427"),
    "screens": R("450-453"),
}
# לא עולות: חומרי איטום וצילום מסך של חשבון אחר (18,19), תקריבי ידיות (116,120), שרטוט (248), לוגו ישן (282),
# צילומי מסך של הדמיות (294,295), דוגמאות חומר וקטלוג (401,428,436-440,449)
# 441-448: דוגמאות רשת מהחנות, הוסרו לבקשת מתניה 22/11
SKIP = set(R("18,19,116,120,248,282,294,295,401,428,436-449"))
used = {}
for c, idx in CATS.items():
    for i in idx:
        assert i not in used and i not in SKIP, (i, c, used.get(i)); used[i] = c
for i in range(len(items)):
    if i not in used and i not in SKIP: assert 22 <= i <= 308, i; used[i] = "windows"
m = {(it["dir"] + "/" + it["file"]).replace("\\", "/"): used.get(i, "-") for i, it in enumerate(items)}
json.dump(m, open(os.path.join(ROOT, "tools", "gallery_map.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=0)
from collections import Counter
print(Counter(m.values()))
