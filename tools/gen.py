# -*- coding: utf-8 -*-
# מייצר את index.html ואת accessibility.html מאותם חלקים משותפים (ראש, ניווט, תחתית).
# הרצה: python tools/gen.py  (מתוך תיקיית האתר)
import io, os, json, hashlib
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WA = "https://wa.me/972543547192"

HEAD = '''<!DOCTYPE html>
<html lang="he" dir="rtl"{tk}>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="theme-color" content="#111315">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:type" content="website">
<meta property="og:image" content="assets/hero-1600.jpg">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="apple-touch-icon" href="favicon.png">
<link rel="preload" href="fonts/plex-hebrew-600.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="fonts/fonts.css">
<link rel="stylesheet" href="styles.css?v={vcss}">
<script src="boot.js?v={vboot}"></script>
</head>
<body>
<a class="skip" href="#main" data-i18n="skip">דילוג לתוכן הראשי</a>
'''

LINKS = '''      <li><a href="{h}#services" data-i18n="nav.what">מה אנחנו עושים</a></li>
      <li><a href="{h}#projects" data-i18n="nav.projects">פרויקטים</a></li>
      <li><a href="{h}#process" data-i18n="nav.process">התהליך</a></li>
      <li><a href="{h}#contact" data-i18n="nav.contact">צור קשר</a></li>
'''

NAV = '''<header class="nav">
  <div class="wrap">
    <a class="logo" href="{h}#top"><img src="assets/logo-mark.png" width="206" height="176" alt=""><span class="wm" lang="en">ALUM ELBAZ</span></a>
    <nav aria-label="תפריט" data-i18n-label="menu"><ul class="links">
{links}    </ul></nav>
    <div class="side">
      <div class="langs" role="group" aria-label="Language">
        <button type="button" data-lang="he" lang="he" aria-pressed="true">עב</button>
        <button type="button" data-lang="en" lang="en" aria-pressed="false">EN</button>
        <button type="button" data-lang="fr" lang="fr" aria-pressed="false">FR</button>
      </div>
      <a class="btn primary" href="{wa}" target="_blank" rel="noopener noreferrer" data-i18n="cta.quote">הצעת מחיר</a>
      <button type="button" class="menu-btn" aria-expanded="false" aria-controls="mnav" aria-label="תפריט" data-i18n-label="menu"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
    </div>
  </div>
  <ul class="mnav" id="mnav">
{links}  </ul>
</header>
'''

TAIL = '''<footer><div class="wrap brand"><img src="assets/logo-full.png" width="656" height="560" alt="Alum Elbaz Ltd." loading="lazy" decoding="async"></div><div class="wrap"><span>&copy; 2026 <span data-i18n="foot.co">אלום אלבז בע״מ</span></span><a href="accessibility.html" data-keep-lang data-i18n="foot.a11y">הצהרת נגישות</a></div></footer>

<a class="fab wa" href="{wa}" target="_blank" rel="noopener noreferrer" aria-label="שלחו לנו הודעה ב-WhatsApp" data-i18n-label="wa.label"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.600 15.100L2 22l5-1.300A10 10 0 1 0 12 2Zm0 18.200a8.200 8.200 0 0 1-4.200-1.200l-.300-.200-3 .800.800-2.900-.200-.300A8.200 8.200 0 1 1 12 20.200Zm4.500-6.100c-.200-.100-1.500-.700-1.700-.800s-.400-.100-.600.100-.600.800-.800 1-.300.200-.500.100a6.700 6.700 0 0 1-3.300-2.900c-.200-.400.200-.400.600-1.200a.400.400 0 0 0 0-.400c-.100-.100-.600-1.400-.800-1.900s-.400-.400-.600-.400h-.500a1 1 0 0 0-.700.300 2.900 2.900 0 0 0-.900 2.200 5 5 0 0 0 1.100 2.700 11.500 11.500 0 0 0 4.400 3.900c1.600.700 2.300.800 3.100.600a2.600 2.600 0 0 0 1.700-1.200 2.100 2.100 0 0 0 .200-1.200c-.100-.100-.300-.200-.500-.300Z"/></svg></a>
<button type="button" class="fab acc" aria-expanded="false" aria-controls="acc-panel" aria-label="תפריט נגישות" data-i18n-label="acc.open"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4.500" r="2"/><path d="M20 8.500c-2.700.700-5.300 1-8 1s-5.300-.300-8-1l.500-1.900c2.500.600 5 .900 7.500.900s5-.300 7.500-.900ZM9.500 10h5v4.500l2 6.500-1.900.600-2.200-6h-.800l-2.200 6-1.900-.600 2-6.500Z"/></svg></button>
<div class="acc-panel" id="acc-panel" role="dialog" aria-labelledby="acc-h" hidden>
  <h2 id="acc-h" data-i18n="acc.title">נגישות</h2>
  <div class="opts">
    <button type="button" data-opt="fs" aria-pressed="false"><span data-i18n="acc.fs">הגדלת טקסט</span><span id="acc-fs-level" aria-live="polite"></span></button>
    <button type="button" data-opt="hc" aria-pressed="false"><span data-i18n="acc.hc">ניגודיות גבוהה</span></button>
    <button type="button" data-opt="ul" aria-pressed="false"><span data-i18n="acc.ul">הדגשת קישורים</span></button>
    <button type="button" data-opt="nomo" aria-pressed="false"><span data-i18n="acc.nomo">עצירת אנימציות</span></button>
    <button type="button" data-opt="reset"><span data-i18n="acc.reset">איפוס</span></button>
    <a class="st" href="accessibility.html" data-keep-lang data-i18n="foot.a11y">הצהרת נגישות</a>
    <button type="button" data-opt="close"><span data-i18n="acc.close">סגירה</span></button>
  </div>
</div>
<script src="site.js?v={vsite}" defer></script>
</body>
</html>
'''


def ver(name):
    return hashlib.md5(open(os.path.join(ROOT, name), "rb").read()).hexdigest()[:8]


def nav(home):
    h = "" if home else "index.html"
    return NAV.format(h=h, wa=WA, links=LINKS.format(h=h))


MAN = json.load(open(os.path.join(ROOT, "tools", "photos.json")))


def pic(n, eager=False, sizes="100vw", alt="", extra=""):
    m = MAN[n]; big, small = m["s"]
    tail = ' fetchpriority="high"' if eager else ' loading="lazy" decoding="async"'
    return ('<img src="assets/{n}-{sm}.jpg" srcset="assets/{n}-{sm}.jpg {sm}w, assets/{n}-{bg}.jpg {bg}w" '
            'sizes="{s}" width="{w}" height="{h}" alt="{alt}"{x}{t}>').format(n=n, sm=small, bg=big, s=sizes, w=m["w"], h=m["h"], alt=alt, x=extra, t=tail)


def li(items, cls="rv"):
    return "\n".join('      <li class="{c}"><h3 data-i18n="{k}t">{t}</h3><p data-i18n="{k}p">{p}</p></li>'.format(c=cls, k=k, t=t, p=p)
                     for k, t, p in items)


T1 = "אלום אלבז | חלונות, דלתות וויטרינות אלומיניום ברמת יוקרה"
D1 = "אלום אלבז בע״מ: תכנון, ייצור והתקנה של חלונות, דלתות אלומיניום, ויטרינות, סגירות חורף ותריסים בכל הארץ. 12 שנות ניסיון ושירות VIP."
SVC = [("windows", "svc.1", "חלונות", "הזזה, ציר, קיפ ובלגי, בפרופילים דקים"),
       ("doors", "svc.2", "דלתות אלומיניום", "כניסה, מרפסת והזזה גדולה"),
       ("vitrines", "svc.3", "ויטרינות", "פתחים רחבים עם מינימום מסגרת"),
       ("winter", "svc.4", "סגירות חורף", "מרפסות ופרגולות לשימוש כל השנה"),
       ("shutters", "svc.5", "תריסים", "חשמליים וידניים, בהתאמה לחזית")]
FACTS = [("facts.1", "שירות VIP", "איש קשר אחד מהמדידה ועד ההתקנה, וזמין גם אחריה."),
         ("facts.2", "אחריות מקיפה", "על המוצר ועל ההתקנה, עם ליווי מקצועי גם אחרי המסירה."),
         ("facts.3", "פתרון בעיות מורכבות", "פתחים חריגים, שיפוצים ותיקון עבודות שלא הצליחו."),
         ("facts.4", "אספקה מהירה", "מהזמנה ועד התקנה, בזמני אספקה מהמהירים בארץ.")]
STEPS = [("proc.1", "מדידה באתר", "מגיעים אליך, מודדים כל פתח ומבינים מה חשוב לך."),
         ("proc.2", "תכנון והצעת מחיר", "בוחרים יחד מערכת, גוון וזיגוג. הצעה ברורה ומפורטת."),
         ("proc.3", "ייצור", "ייצור מדויק לפי המידות, עם בקרת איכות לפני יציאה."),
         ("proc.4", "התקנה וליווי", "צוות התקנה מקצועי, מסירה מסודרת ושירות גם אחרי.")]

tiles = "\n".join(
    '      <li class="tile rv"{i}>{img}<div><h3 data-i18n="{k}t">{t}</h3><p data-i18n="{k}p">{p}</p></div></li>'.format(
        i=(' data-i="%d"' % i) if i else "", img=pic(n, sizes="(min-width:860px) 60vw, 100vw"), k=k, t=t, p=p)
    for i, (n, k, t, p) in enumerate(SVC))
CATS = [("cat.1", "חלונות וויטרינות", "c1"), ("cat.2", "דלתות ומחיצות למשרדים", "c2"), ("cat.3", "פרגולות", "c3"),
        ("cat.4", "מקלחונים", "c4"), ("cat.5", "גדרות ושערים", "c5"), ("cat.6", "הצללה", "c6"),
        ("cat.7", "חיפוי אלומיניום", "c7"), ("cat.8", "ידיות ופרזול", "c8"), ("cat.9", "רשתות פליסה", "c9")]
SZ = "(min-width:860px) 16vw, 46vw"
gal = "\n".join(
    '      <li class="cat rv"><h3 data-i18n="{k}">{t}</h3><div class="pair">{a}{b}</div></li>'.format(
        k=k, t=t_,
        a=pic(c + "a", sizes=SZ, alt=t_ + " 1", extra=' data-i18n-alt="%s" data-n="1"' % k),
        b=pic(c + "b", sizes=SZ, alt=t_ + " 2", extra=' data-i18n-alt="%s" data-n="2"' % k))
    for k, t_, c in CATS)

MAIN = '''
<main id="main">
<div class="hero" id="top">
  <div class="ph">{hero}</div>
  <div class="wrap in">
    <h1 data-i18n-html="hero.h1">אלומיניום <em>ברמת גימור</em> של בית יוקרה.</h1>
    <p data-i18n="hero.p">חלונות, דלתות, ויטרינות וסגירות חורף. תכנון, ייצור והתקנה בכל הארץ, עם ליווי אישי עד אחרי המסירה.</p>
    <div class="cta"><a class="btn primary" href="{wa}" target="_blank" rel="noopener noreferrer" data-i18n="cta.quote">הצעת מחיר</a><a class="btn ghost" href="#projects" data-i18n="cta.projects">לפרויקטים שלנו</a></div>
  </div>
</div>

<section id="services">
  <div class="wrap">
    <h2 class="rv" data-i18n="svc.h2">כל מערכת אלומיניום, מתוכננת לבית שלך.</h2>
    <p class="lead rv" data-i18n="svc.lead">מפתח בודד ועד מעטפת שלמה של וילה. אותה הקפדה על קווים נקיים, איטום ותנועה חלקה.</p>
    <ul class="grid">
{tiles}
    </ul>
  </div>
</section>

<section class="facts" id="why">
  <div class="wrap cols">
    <p class="big rv">12<small data-i18n="facts.big">שנות ניסיון באלומיניום</small></p>
    <ul class="list">
{facts}
    </ul>
  </div>
</section>

<section id="projects">
  <div class="wrap">
    <h2 class="rv" data-i18n="gal.h2">עבודות שביצענו.</h2>
    <p class="lead rv" data-i18n="gal.lead">מבחר מתוך פרויקטים שתכננו, ייצרנו והתקנו, לפי תחום.</p>
    <ul class="cats">
{gal}
    </ul>
  </div>
</section>

<section id="process">
  <div class="wrap">
    <h2 class="rv" data-i18n="proc.h2">מהמדידה ועד הבית הגמור.</h2>
    <ol class="steps">
{steps}
    </ol>
  </div>
</section>

<div class="end" id="contact">
  <div class="ph">{endimg}</div>
  <div class="wrap in">
    <h2 class="rv" data-i18n="end.h2">מתכננים בית או שיפוץ? נשמח לראות את התוכניות.</h2>
    <div class="cta"><a class="btn primary" href="{wa}" target="_blank" rel="noopener noreferrer" data-i18n="cta.quote">הצעת מחיר</a><a class="btn ghost" href="tel:+972543547192" dir="ltr">054-354-7192</a></div>
    <address><a href="mailto:alumelbaz@gmail.com" dir="ltr">alumelbaz@gmail.com</a><span data-i18n="end.area">שירות בכל הארץ</span></address>
  </div>
</div>
</main>

'''

PROOF = '''<aside class="proof" id="proof" aria-label="המלצות לקוחות" data-i18n-label="pf.label" hidden>
  <span class="pf-av" aria-hidden="true"></span>
  <div class="pf-tx"><p class="pf-1"></p><p class="pf-2"></p></div>
  <button type="button" class="pf-x" aria-label="סגירת ההמלצות" data-i18n-label="pf.close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
</aside>
'''

DOC = '''
<main id="main" class="doc">
  <div class="wrap">
    <h1 data-i18n="st.h1">הצהרת נגישות</h1>
    <p data-i18n="st.intro">אלום אלבז בע״מ רוצה שכל אדם יוכל להשתמש באתר הזה בנוחות, כולל אנשים עם מוגבלות.</p>
    <h2 data-i18n="st.h2a">מה עשינו</h2>
    <ul data-i18n-html="st.la"><li>האתר נבנה לפי התקן הישראלי ת״י 5568 ברמה AA (מבוסס על WCAG 2.0).</li><li>ניווט מלא במקלדת, עם סימון ברור של המיקום ועם קישור דילוג לתוכן.</li><li>מבנה סמנטי לקוראי מסך, בעברית, באנגלית ובצרפתית.</li><li>תפריט נגישות: הגדלת טקסט, ניגודיות גבוהה, הדגשת קישורים ועצירת אנימציות.</li><li>האתר מכבד את הגדרת המכשיר להפחתת תנועה.</li></ul>
    <h2 data-i18n="st.h2b">מגבלות ידועות</h2>
    <p data-i18n="st.pb">אנחנו ממשיכים לבדוק ולשפר את האתר. תמונות העבודות מתוארות לפי תחום בלבד, בלי תיאור מפורט. אם נתקלת בבעיה, נשמח שתספר לנו ונתקן.</p>
    <h2 data-i18n="st.h2c">נגישות השירות</h2>
    <p data-i18n="st.pc">השירות שלנו ניתן בבית הלקוח או באתר הבנייה: המדידה, הייעוץ וההתקנה נעשים אצלך. אפשר לפנות אלינו בטלפון, ב-WhatsApp או במייל.</p>
    <h2 data-i18n="st.h2d">רכז הנגישות</h2>
    <p data-i18n-html="st.pd">אילן אלבז<br>טלפון: <a href="tel:+972543547192" dir="ltr">054-354-7192</a><br>מייל: <a href="mailto:alumelbaz@gmail.com" dir="ltr">alumelbaz@gmail.com</a></p>
    <p data-i18n="st.updated">ההצהרה עודכנה לאחרונה ב-12 בנובמבר 2026.</p>
    <a class="back" href="index.html" data-keep-lang data-i18n="st.back">חזרה לעמוד הבית</a>
  </div>
</main>

'''

index = (HEAD.format(title=T1, desc=D1, tk="", vcss=ver("styles.css"), vboot=ver("boot.js")) + nav(True)
         + MAIN.format(hero=pic("hero", eager=True), wa=WA, tiles=tiles, facts=li(FACTS), gal=gal, steps=li(STEPS), endimg=pic("contact"))
         + PROOF + TAIL.format(wa=WA, vsite=ver("site.js")))
acc = (HEAD.format(title="הצהרת נגישות | אלום אלבז", desc="הצהרת הנגישות של אתר אלום אלבז בע״מ.", tk=' data-title-key="st.title"', vcss=ver("styles.css"), vboot=ver("boot.js"))
       + nav(False) + DOC + TAIL.format(wa=WA, vsite=ver("site.js")))
io.open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8", newline="\n").write(index)
io.open(os.path.join(ROOT, "accessibility.html"), "w", encoding="utf-8", newline="\n").write(acc)
print("ok", len(index), len(acc))
