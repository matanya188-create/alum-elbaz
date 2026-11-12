// נטען לפני הציור: שפה והעדפות נגישות, כדי שלא יהיה הבהוב
(function () {
  var d = document.documentElement, LANGS = ["he", "en", "fr"], lang = "he", prefs = {};
  d.classList.add("js");
  /* כניסה לאתר מתחילה תמיד מלמעלה: בלי שחזור מיקום גלילה ישן, ובלי #סעיף שנשאר בכתובת מלחיצה קודמת.
     יוצא מן הכלל: הגעה מעמוד אחר באתר (למשל מהצהרת הנגישות ל"צור קשר"). */
  try {
    history.scrollRestoration = "manual";
    var inner = document.referrer && document.referrer.indexOf(location.origin + "/") === 0;
    if (location.hash && !inner) history.replaceState(null, "", location.pathname + location.search);
    /* שומר: בשנייה וחצי הראשונות, כל גלילה שלא באה מהגולש עצמו (דפדפן פנימי של WhatsApp, קישור עם הדגשת טקסט,
       שחזור מיקום) מוחזרת לראש הדף. מגע, גלגלת או מקלדת מבטלים את השומר מיד. */
    if (!(inner && location.hash)) {
      var guard = true, stop = function () { guard = false; };
      var top = function () { if (guard && (window.pageYOffset || d.scrollTop) > 0) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
      ["touchstart", "wheel", "keydown", "mousedown", "pointerdown"].forEach(function (ev) { window.addEventListener(ev, stop, { capture: true, passive: true, once: true }); });
      window.addEventListener("scroll", top, { passive: true });
      document.addEventListener("DOMContentLoaded", top); window.addEventListener("load", top); window.addEventListener("pageshow", top);
      setTimeout(function () { top(); guard = false; window.removeEventListener("scroll", top); }, 1500);
    }
  } catch (e) {}
  try {
    var q = new URLSearchParams(location.search).get("lang");
    var s = localStorage.getItem("ae_lang");
    if (LANGS.indexOf(q) >= 0) lang = q; else if (LANGS.indexOf(s) >= 0) lang = s;
    prefs = JSON.parse(localStorage.getItem("ae_a11y") || "{}") || {};
  } catch (e) {}
  d.lang = lang; d.dir = lang === "he" ? "rtl" : "ltr";
  if (prefs.fs === 1 || prefs.fs === 2) d.classList.add("fs" + prefs.fs);
  if (prefs.hc === true) d.classList.add("hc");
  if (prefs.ul === true) d.classList.add("ul");
  if (prefs.nomo === true) d.classList.add("nomo");
  window.__AE = { lang: lang, prefs: { fs: prefs.fs === 1 || prefs.fs === 2 ? prefs.fs : 0, hc: prefs.hc === true, ul: prefs.ul === true, nomo: prefs.nomo === true } };
})();
