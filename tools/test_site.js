// בדיקות האתר: שפות, רוחב מסכים, נגישות (axe), תפריט נגישות, מקלדת, CSP, קישורים.
// הרצה: node tools/test_site.js <תיקייה עם node_modules של puppeteer-core ו-axe-core>  (האתר מוגש ב-127.0.0.1:5180)
const { createRequire } = require("module"); const path = require("path"); const fs = require("fs");
const req = createRequire(path.join(process.argv[2], "package.json"));
const puppeteer = req("puppeteer-core"); const axeSrc = fs.readFileSync(req.resolve("axe-core/axe.min.js"), "utf8");
const BASE = "http://127.0.0.1:5180/"; const SHOTS = path.join(__dirname, "..", "shots"); fs.mkdirSync(SHOTS, { recursive: true });
const out = []; let failed = 0;
const check = (n, ok, info) => { out.push((ok ? "PASS " : "FAIL ") + n + (info !== undefined && info !== "" ? "  :: " + (typeof info === "string" ? info : JSON.stringify(info)) : "")); if (!ok) failed++; };
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: "new", args: ["--no-first-run"] });
  const errors = [];
  async function open(url, w, h, opts) {
    const ctx = await browser.createBrowserContext(); const p = await ctx.newPage();
    await p.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w < 800, hasTouch: w < 800 });
    if (opts && opts.reduce) await p.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    p.on("pageerror", e => errors.push("pageerror " + e.message));
    p.on("console", m => { if (m.type() === "error") errors.push("console " + m.text()); });
    p.on("requestfailed", r => errors.push("reqfail " + r.url()));
    p.on("response", r => { if (r.status() >= 400) errors.push(r.status() + " " + r.url()); });
    await p.goto(BASE + url, { waitUntil: "networkidle0" }); return p;
  }
  const scrollAll = async p => { await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo({ top: y, behavior: "instant" }); await new Promise(r => setTimeout(r, 120)); } scrollTo({ top: document.body.scrollHeight, behavior: "instant" }); await new Promise(r => setTimeout(r, 300)); scrollTo({ top: 0, behavior: "instant" }); }); await sleep(1300); };
  const overflow = p => p.evaluate(() => ({ over: document.documentElement.scrollWidth - innerWidth, cut: [...document.querySelectorAll("a,button,h1,h2,h3,p,li")].filter(e => { if (e.closest("[hidden]")) return false; const r = e.getBoundingClientRect(); return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1); }).map(e => e.tagName + ":" + e.textContent.trim().slice(0, 20)).slice(0, 4) }));
  const axe = async (p, tag, skip) => { await p.evaluate(axeSrc); const r = await p.evaluate(async skip => { const r = await axe.run(skip ? { exclude: [skip] } : document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } }); return r.violations.map(v => v.id + " (" + v.nodes.length + "): " + v.nodes.slice(0, 2).map(n => n.target.join(" ")).join(" | ")); }, skip || null); check("נגישות axe (WCAG A+AA) " + tag, r.length === 0, r); };

  // ----- שפות ורוחב מסכים -----
  for (const lang of ["he", "en", "fr"]) for (const [w, h] of [[320, 640], [390, 844], [768, 1024], [1440, 900]]) {
    const p = await open("index.html?lang=" + lang, w, h); await scrollAll(p);
    const o = await overflow(p);
    check("פריסה " + lang + " " + w + ": בלי גלישה לרוחב ובלי טקסט חתוך", o.over <= 0 && o.cut.length === 0, o);
    const s = await p.evaluate(() => { const c = document.body.cloneNode(true); c.querySelectorAll(".langs,script").forEach(e => e.remove()); return { dir: document.documentElement.dir, lang: document.documentElement.lang, heb: (c.textContent.match(/[א-ת]{2,}/g) || []).slice(0, 5), hebAttr: [...document.querySelectorAll("[aria-label]")].map(e => e.getAttribute("aria-label")).filter(t => /[א-ת]/.test(t)), title: document.title, h1: document.querySelector("h1").textContent, hidden: [...document.querySelectorAll(".rv")].filter(e => getComputedStyle(e).opacity !== "1").length }; });
    if (w === 390) {
      check("שפה " + lang + ": כיוון ושפת הדף", s.lang === lang && s.dir === (lang === "he" ? "rtl" : "ltr"), s);
      if (lang !== "he") check("שפה " + lang + ": לא נשארה עברית בדף, בכותרת ובתוויות", s.heb.length === 0 && s.hebAttr.length === 0 && !/[א-ת]/.test(s.title), s);
      check("שפה " + lang + ": כל התוכן נחשף אחרי גלילה", s.hidden === 0, s.hidden);
      const fold = await p.evaluate(() => { const b = document.querySelector(".hero .btn.primary").getBoundingClientRect(); const f = [...document.querySelectorAll(".fab")].map(e => e.getBoundingClientRect()); return { vis: b.bottom <= innerHeight && b.top >= 0, hit: f.some(r => !(r.right < b.left || r.left > b.right || r.bottom < b.top || r.top > b.bottom)) }; });
      check("שפה " + lang + ": כפתור ההצעה נראה במסך הראשון, והכפתורים הצפים לא מכסים אותו", fold.vis && !fold.hit, fold);
      await p.screenshot({ path: path.join(SHOTS, "site_mob_" + lang + ".png") });
      await axe(p, "עמוד הבית " + lang);
    }
    if (w === 1440) {
      const hh = await p.evaluate(() => ({ lines: Math.round(document.querySelector("h1").getBoundingClientRect().height / parseFloat(getComputedStyle(document.querySelector("h1")).lineHeight)), nav: document.querySelector(".nav .wrap").getBoundingClientRect().height, navLines: new Set([...document.querySelectorAll(".nav .links a")].map(a => Math.round(a.getBoundingClientRect().top))).size }));
      check("מחשב " + lang + ": כותרת עד 3 שורות, ניווט בשורה אחת", hh.lines <= 3 && hh.navLines === 1 && hh.nav <= 80, hh);
      await p.screenshot({ path: path.join(SHOTS, "site_desk_" + lang + ".png") });
      if (lang === "he") await p.screenshot({ path: path.join(SHOTS, "site_full_he.png"), fullPage: true });
    }
    await p.browserContext().close();
  }

  // ----- החלפת שפה בלחיצה + שמירה -----
  let p = await open("index.html", 390, 844);
  await p.click('.langs [data-lang="fr"]'); await sleep(200);
  let s = await p.evaluate(() => ({ lang: document.documentElement.lang, dir: document.documentElement.dir, btn: document.querySelector(".hero .btn.primary").textContent, pressed: document.querySelector('.langs [data-lang="fr"]').getAttribute("aria-pressed"), acc: document.querySelector("footer a").getAttribute("href") }));
  check("לחיצה על FR: הדף עובר לצרפתית, והקישור להצהרה שומר את השפה", s.lang === "fr" && s.dir === "ltr" && s.btn === "Demander un devis" && s.pressed === "true" && s.acc === "accessibility.html?lang=fr", s);
  await p.reload({ waitUntil: "networkidle0" });
  check("אחרי רענון השפה נשמרת", (await p.evaluate(() => document.documentElement.lang)) === "fr");
  await p.click('.langs [data-lang="he"]'); await sleep(200);
  check("חזרה לעברית מחזירה את הטקסט המקורי", (await p.evaluate(() => document.querySelector("h1").innerHTML)) === "אלומיניום <em>ברמת גימור</em> של בית יוקרה.");
  // ?lang עם ערך זר
  await p.goto(BASE + "index.html?lang=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E", { waitUntil: "networkidle0" });
  check("ערך זר ב-?lang: נשאר עברית, שום דבר לא נכנס לדף", (await p.evaluate(() => document.documentElement.lang === "he" && !document.querySelector("img[src='x']"))));

  // ----- תפריט טלפון -----
  await p.goto(BASE + "index.html?lang=he", { waitUntil: "networkidle0" });
  await p.click(".menu-btn"); await sleep(150);
  s = await p.evaluate(() => ({ open: getComputedStyle(document.getElementById("mnav")).display !== "none", exp: document.querySelector(".menu-btn").getAttribute("aria-expanded") }));
  check("תפריט בטלפון נפתח ומדווח aria-expanded", s.open && s.exp === "true", s);
  await p.click("#mnav a"); await sleep(300);
  check("לחיצה על קישור בתפריט סוגרת אותו", await p.evaluate(() => getComputedStyle(document.getElementById("mnav")).display === "none"));

  // ----- תפריט נגישות -----
  await p.evaluate(() => scrollTo(0, 0)); await p.click(".fab.acc"); await sleep(150);
  s = await p.evaluate(() => ({ shown: !document.getElementById("acc-panel").hidden, focusIn: document.getElementById("acc-panel").contains(document.activeElement) }));
  check("תפריט נגישות נפתח, והמיקוד עובר לתוכו", s.shown && s.focusIn, s);
  const base = await p.evaluate(() => parseFloat(getComputedStyle(document.documentElement).fontSize));
  await p.click('[data-opt="fs"]'); await p.click('[data-opt="fs"]');
  await p.click('[data-opt="hc"]'); await p.click('[data-opt="ul"]'); await p.click('[data-opt="nomo"]'); await sleep(150);
  s = await p.evaluate(() => ({ fs: parseFloat(getComputedStyle(document.documentElement).fontSize), cls: document.documentElement.className, bg: getComputedStyle(document.body).backgroundColor, ul: getComputedStyle(document.querySelector("footer a")).textDecorationLine, pressed: [...document.querySelectorAll("#acc-panel [aria-pressed]")].map(b => b.getAttribute("aria-pressed")).join(",") }));
  check("הגדלת טקסט 125%, ניגודיות גבוהה, הדגשת קישורים, עצירת אנימציות", Math.abs(s.fs / base - 1.25) < 0.01 && /hc/.test(s.cls) && /nomo/.test(s.cls) && s.bg === "rgb(0, 0, 0)" && /underline/.test(s.ul) && s.pressed === "true,true,true,true", s);
  let o = await overflow(p); check("טקסט מוגדל 125% בטלפון: בלי גלישה", o.over <= 0 && o.cut.length === 0, o);
  await axe(p, "במצב ניגודיות גבוהה + טקסט מוגדל");
  await p.screenshot({ path: path.join(SHOTS, "site_a11y_panel.png") });
  await p.reload({ waitUntil: "networkidle0" });
  check("העדפות הנגישות נשמרות אחרי רענון", await p.evaluate(() => /hc/.test(document.documentElement.className) && /fs2/.test(document.documentElement.className)));
  await p.click(".fab.acc"); await p.keyboard.press("Escape"); await sleep(100);
  check("Escape סוגר את התפריט ומחזיר מיקוד לכפתור", await p.evaluate(() => document.getElementById("acc-panel").hidden && document.activeElement.classList.contains("acc")));
  await p.click(".fab.acc"); await p.click('[data-opt="reset"]'); await sleep(100);
  check("איפוס מחזיר הכול", await p.evaluate(() => !/hc|fs1|fs2|ul|nomo/.test(document.documentElement.className.replace("js", ""))));
  await p.browserContext().close();

  // ----- מקלדת -----
  p = await open("index.html", 1440, 900);
  await p.keyboard.press("Tab");
  s = await p.evaluate(() => ({ cls: document.activeElement.className, top: document.activeElement.getBoundingClientRect().top }));
  check("Tab ראשון: קישור הדילוג מופיע", s.cls === "skip" && s.top >= 0, s);
  await p.keyboard.press("Enter"); await sleep(200);
  const seen = []; for (let i = 0; i < 40; i++) { await p.keyboard.press("Tab"); const f = await p.evaluate(() => { const e = document.activeElement; const st = getComputedStyle(e); return { t: e.tagName, vis: e.getBoundingClientRect().width > 0, outline: st.outlineStyle !== "none" && parseFloat(st.outlineWidth) >= 2 }; }); seen.push(f); }
  const el = seen.filter(f => f.t !== "BODY"); check("ניווט במקלדת: כל רכיב שמקבל מיקוד נראה ומסומן (" + el.length + " רכיבים)", el.length >= 20 && el.every(f => f.vis && f.outline), el.filter(f => !f.vis || !f.outline).slice(0, 3));
  await p.browserContext().close();

  // ----- הפחתת תנועה -----
  p = await open("index.html", 1440, 900, { reduce: true });
  s = await p.evaluate(() => ({ hid: [...document.querySelectorAll(".rv")].filter(e => getComputedStyle(e).opacity !== "1").length, anim: getComputedStyle(document.querySelector(".hero .ph img")).animationName }));
  check("הפחתת תנועה במכשיר: אין אנימציה, הכול גלוי מיד", s.hid === 0 && s.anim === "none", s);
  await p.browserContext().close();
  p = await open("index.html", 1440, 900);
  s = await p.evaluate(async () => { const img = document.querySelector(".hero .ph img"); const a = getComputedStyle(img).transform; scrollTo(0, 500); await new Promise(r => setTimeout(r, 400)); return { name: getComputedStyle(img).animationName, a, b: getComputedStyle(img).transform }; });
  check("תנועה בגלילה: תמונת הפתיחה זזה עם הגלילה", s.name === "heroZoom" && s.a !== s.b, s);
  await p.browserContext().close();

  // ----- הצהרת נגישות -----
  for (const lang of ["he", "en", "fr"]) {
    p = await open("accessibility.html?lang=" + lang, 390, 844);
    s = await p.evaluate(() => ({ h1: document.querySelector("h1").textContent, title: document.title, tel: !!document.querySelector('main a[href="tel:+972543547192"]'), mail: !!document.querySelector('main a[href="mailto:alumelbaz@gmail.com"]'), name: /אילן אלבז|Ilan Elbaz/.test(document.querySelector("main").textContent), back: document.querySelector(".back").getAttribute("href") }));
    check("הצהרת נגישות " + lang + ": כותרת, רכז, טלפון ומייל", s.tel && s.mail && s.name && s.h1.length > 5 && (lang === "he" ? /[א-ת]/.test(s.title) : !/[א-ת]/.test(s.title)) && s.back === (lang === "he" ? "index.html" : "index.html?lang=" + lang), s);
    o = await overflow(p); check("הצהרת נגישות " + lang + ": בלי גלישה", o.over <= 0 && o.cut.length === 0, o);
    await axe(p, "הצהרת נגישות " + lang);
    if (lang === "he") await p.screenshot({ path: path.join(SHOTS, "site_statement_he.png") });
    await p.browserContext().close();
  }

  // ----- עבודות לפי תחום -----
  for (const lang of ["he", "fr"]) { p = await open("index.html?lang=" + lang, 1440, 900); await scrollAll(p);
    s = await p.evaluate(() => { const im = [...document.querySelectorAll("img")]; const ci = [...document.querySelectorAll(".cat img")]; return { cats: document.querySelectorAll(".cat").length, pics: ci.length, broken: im.filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.src), noAlt: ci.filter(i => !i.alt || (document.documentElement.lang !== "he" && /[א-ת]/.test(i.alt))).length, old: im.filter(i => /\/(g[1-4]|u\d+)-/.test(i.src)).length, ratio: ci.map(i => { const r = i.getBoundingClientRect(); return Math.round(r.width / r.height * 100); }).filter(x => x !== 80).length }; });
    check("עבודות " + lang + ": 9 תחומים, 18 תמונות, כולן נטענות, עם תיאור בשפת הדף וביחס אחיד", s.cats === 9 && s.pics === 18 && s.broken.length === 0 && s.noAlt === 0 && s.old === 0 && s.ratio === 0, s);
    if (lang === "he") { await p.evaluate(() => document.getElementById("projects").scrollIntoView({ behavior: "instant" })); await sleep(600); await p.screenshot({ path: path.join(SHOTS, "site_works_desk.png") }); await p.screenshot({ path: path.join(SHOTS, "site_full_he.png"), fullPage: true }); }
    await p.browserContext().close(); }
  p = await open("index.html", 390, 844); await scrollAll(p); await p.evaluate(() => document.getElementById("projects").scrollIntoView({ behavior: "instant" })); await sleep(600); await p.screenshot({ path: path.join(SHOTS, "site_works_mob.png") }); await p.browserContext().close();
  // ----- הודעות המלצה קופצות -----
  p = await open("index.html", 390, 844); await scrollAll(p); await sleep(3000);
  s = await p.evaluate(() => { const b = document.getElementById("proof"); return { on: b.classList.contains("on"), t: b.textContent.replace(/\s+/g, " ").trim(), demo: !!b.querySelector(".pf-demo") }; });
  check("האתר הרגיל: קופצים רק הלקוחות האמיתיים, בלי תווית דוגמה ובלי שמות מומצאים", s.on && !s.demo && /ד\.ט\. מקריית נטפים|מועצה מקומית קדומים/.test(s.t) && !/הוד השרון|רעננה/.test(s.t), s);
  await p.browserContext().close();
  for (const [lang, w] of [["he", 390], ["fr", 1440], ["en", 320]]) {
    p = await open("index.html?proof=demo&lang=" + lang, w, 800);
    check("הדגמה " + lang + ": לפני גלילה אין הודעה", await p.evaluate(() => document.getElementById("proof").hidden));
    await p.evaluate(() => document.getElementById("services").scrollIntoView({ behavior: "instant" })); await sleep(2600);
    s = await p.evaluate(() => { const b = document.getElementById("proof"), r = b.getBoundingClientRect(), a = document.querySelector(".fab.acc").getBoundingClientRect(), wa = document.querySelector(".fab.wa").getBoundingClientRect(); const hit = q => !(r.right < q.left || r.left > q.right || r.bottom < q.top || r.top > q.bottom); return { on: !b.hidden && b.classList.contains("on"), t1: b.querySelector(".pf-1").textContent, t2: b.querySelector(".pf-2").textContent, demo: !!b.querySelector(".pf-demo"), fixed: getComputedStyle(b).position, inView: r.left >= 0 && r.right <= innerWidth && r.bottom <= innerHeight && r.top >= 0, left: r.left < innerWidth / 2, hitAcc: hit(a), hitWa: hit(wa), lines: Math.round(b.querySelector(".pf-1").getBoundingClientRect().height) }; });
    check("הדגמה " + lang + ": אחרי גלילה קופצת הודעה נעוצה, בתוך המסך, מסומנת 'דוגמה', ולא מכסה את הכפתורים הצפים", s.on && s.demo && s.fixed === "fixed" && s.inView && !s.hitAcc && !s.hitWa && s.t1.length > 12 && s.t2.length > 5 && (lang === "he" ? /הזמין |הזמינה /.test(s.t1) && s.left : !/[א-ת]/.test(s.t1 + s.t2)), s);
    if (lang === "he") { await axe(p, "עם הודעת המלצה פתוחה", ".hero"); await p.screenshot({ path: path.join(SHOTS, "site_proof_mob.png") }); }
    if (lang === "fr") await p.screenshot({ path: path.join(SHOTS, "site_proof_desk_fr.png") });
    if (lang === "he") {
      const first = s.t1; await sleep(6800);
      check("ההודעה נעלמת אחרי כ-6 שניות", await p.evaluate(() => document.getElementById("proof").hidden));
      await sleep(5600);
      const s2 = await p.evaluate(() => ({ on: document.getElementById("proof").classList.contains("on"), t1: document.querySelector(".pf-1").textContent }));
      check("אחרי הפסקה קופצת הודעה של לקוח אחר", s2.on && s2.t1 !== first, s2);
      await p.click(".pf-x"); await sleep(900);
      check("לחיצה על X סוגרת", await p.evaluate(() => document.getElementById("proof").hidden));
      await p.reload({ waitUntil: "networkidle0" }); await p.evaluate(() => document.getElementById("services").scrollIntoView({ behavior: "instant" })); await sleep(3000);
      check("אחרי X ההודעות לא חוזרות באותו ביקור", await p.evaluate(() => document.getElementById("proof").hidden));
    }
    await p.browserContext().close();
  }
  p = await open("index.html?proof=demo", 390, 844, { reduce: true }); await p.evaluate(() => document.getElementById("services").scrollIntoView({ behavior: "instant" })); await sleep(3000);
  check("מכשיר שמבקש פחות תנועה: אין הודעות קופצות", await p.evaluate(() => document.getElementById("proof").hidden));
  await p.browserContext().close();
  // ----- לוגו -----
  for (const w of [320, 390, 1440]) { p = await open("index.html", w, 800); await scrollAll(p);
    s = await p.evaluate(() => { const m = document.querySelector(".logo img"), f = document.querySelector("footer .brand img"), r = m.getBoundingClientRect(); return { mark: m.complete && m.naturalWidth > 0, h: Math.round(r.height), inNav: r.top >= 0 && r.bottom <= 80, full: f.complete && f.naturalWidth > 0, fw: Math.round(f.getBoundingClientRect().width), name: document.querySelector(".logo").textContent.trim() }; });
    check("לוגו ברוחב " + w + ": הסמל בניווט והלוגו המלא בתחתית נטענים", s.mark && s.h === 52 && s.inNav && s.full && s.fw >= 180 && s.name === "ALUM ELBAZ", s);
    if (w === 1440) { await p.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: "instant" })); await sleep(500); await p.screenshot({ path: path.join(SHOTS, "site_footer_logo.png") }); }
    await p.browserContext().close(); }
  // ----- קישורים ואבטחה -----
  p = await open("index.html", 1440, 900);
  s = await p.evaluate(() => ({ ext: [...document.querySelectorAll('a[target="_blank"]')].map(a => a.rel + " " + a.href), wa: [...document.querySelectorAll('a[href^="https://wa.me/"]')].length, tel: document.querySelector('a[href^="tel:"]').getAttribute("href"), inlineScripts: [...document.scripts].filter(x => !x.src).length, inlineStyle: document.querySelectorAll("[style]").length, forms: document.forms.length, extRes: performance.getEntriesByType("resource").map(r => r.name).filter(n => !n.startsWith(location.origin)), csp: document.querySelector('meta[http-equiv="Content-Security-Policy"]').content }));
  check("קישורי WhatsApp וטלפון נכונים, וכל קישור חיצוני עם noopener", s.wa >= 3 && s.tel === "tel:+972543547192" && s.ext.every(x => /noopener/.test(x) && /wa\.me\/972543547192/.test(x)), s.ext);
  check("אין סקריפט או עיצוב בתוך הדף, אין טפסים, ואין שום משאב מאתר חיצוני", s.inlineScripts === 0 && s.inlineStyle === 0 && s.forms === 0 && s.extRes.length === 0, s);
  const inj = await p.evaluate(async () => { let blocked = 0; document.addEventListener("securitypolicyviolation", () => blocked++); const sc = document.createElement("script"); sc.textContent = "window.__x=1"; document.head.appendChild(sc); const im = new Image(); im.src = "https://example.com/x.png"; document.body.appendChild(im); await new Promise(r => setTimeout(r, 500)); return { ran: !!window.__x, blocked }; });
  check("CSP חוסם סקריפט מוזרק ותמונה מאתר זר", !inj.ran && inj.blocked >= 2, inj);
  await p.browserContext().close();
  const real = errors.filter(e => !/example\.com|Content Security Policy|securitypolicy/i.test(e));
  check("אין שגיאות בדפדפן ואין קבצים חסרים", real.length === 0, real.slice(0, 5));
  console.log(out.join("\n")); console.log("\n" + (out.length - failed) + "/" + out.length + " passed");
  await browser.close(); process.exit(failed ? 1 : 0);
})().catch(e => { console.log(out.join("\n")); console.error("CRASH", e); process.exit(2); });
