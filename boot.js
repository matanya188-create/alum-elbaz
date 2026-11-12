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
