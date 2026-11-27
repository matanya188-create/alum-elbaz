// אלום אלבז: שפות, תפריט, נגישות, כניסה בגלילה. בלי ספריות חיצוניות.
(function () {
  "use strict";
  var AE = window.__AE || { lang: "he", prefs: { fs: 0, hc: false, ul: false, nomo: false } };
  var d = document.documentElement;
  /* כתובת נקייה: עמוד הבית מוצג בלי שם הקובץ */
  try { if (/\/index\.html$/.test(location.pathname) && /^https?:$/.test(location.protocol)) history.replaceState(history.state, "", location.pathname.replace(/index\.html$/, "") + location.search + location.hash); } catch (e) {}

  /* העברית נמצאת ב-HTML עצמו; כאן רק האנגלית והצרפתית. כל המחרוזות קבועות (לא קלט משתמש). */
  var T = {
    en: {
      "title": "Alum Elbaz | Premium aluminum windows, doors and glazing",
      "desc": "Alum Elbaz Ltd. designs, manufactures and installs aluminum windows, doors, glazed walls, winter enclosures and shutters across Israel.",
      "skip": "Skip to main content", "menu": "Menu",
      "nav.what": "What we do", "nav.projects": "Projects", "nav.process": "Process", "nav.contact": "Contact",
      "cta.quote": "Get a quote", "cta.projects": "See our projects",
      "hero.h1": "Aluminum <em>finished to the standard</em> of a luxury home.",
      "hero.p": "Windows, doors, glazed walls and winter enclosures. Design, manufacturing and installation across Israel, with personal support well after handover.",
      "svc.h2": "Every aluminum system, designed for your home.",
      "svc.lead": "From a single opening to the full envelope of a villa. The same care for clean lines, sealing and smooth movement.",
      "svc.1t": "Windows", "svc.1p": "Sliding, hinged, tilt-and-turn and Belgian style, in slim profiles",
      "svc.2t": "Aluminum doors", "svc.2p": "Entrance, balcony and large sliding doors",
      "svc.3t": "Glazed walls", "svc.3p": "Wide openings with minimal framing",
      "svc.4t": "Winter enclosures", "svc.4p": "Balconies and pergolas you can use all year",
      "svc.5t": "Shutters", "svc.5p": "Electric and manual, matched to the facade",
      "facts.big": "years of aluminum experience",
      "facts.1t": "VIP service", "facts.1p": "One contact person from measurement to installation, and available afterwards.",
      "facts.2t": "Comprehensive warranty", "facts.2p": "On the product and on the installation, with professional support after handover.",
      "facts.3t": "Complex problems solved", "facts.3p": "Unusual openings, renovations and fixing work that went wrong.",
      "facts.4t": "Fast delivery", "facts.4p": "From order to installation, among the fastest lead times in Israel.",
      "gal.h2": "Our work.", "gal.lead": "A selection of projects we designed, manufactured and installed, by category.",
      "g.windows": "Windows", "g.vitrines": "Glazed sliding walls", "g.belgian": "Profiles", "g.doors": "Doors", "g.shutters": "Shutters", "g.closures": "Winter and patio enclosures", "g.showers": "Shower enclosures", "g.pergolas": "Pergolas", "g.fences": "Fences and gates", "g.office": "Office doors and partitions", "g.cladding": "Aluminum cladding", "g.screens": "Pleated insect screens", "g.handles": "Handles", "g.more": "All photos", "g.vid": "Video",
      "wk.title": "Our work | Alum Elbaz", "wk.h1": "Our work", "wk.lead": "Every photo, by category. Click a photo to enlarge it.", "wk.cats": "Categories",
      "proc.h2": "From measurement to the finished home.",
      "proc.1t": "On-site measurement", "proc.1p": "We come to you, measure every opening and learn what matters to you.",
      "proc.2t": "Design and quote", "proc.2p": "Together we choose the system, color and glazing. A clear, itemized quote.",
      "proc.3t": "Manufacturing", "proc.3p": "Made precisely to measure, with quality control before it leaves.",
      "proc.4t": "Installation and support", "proc.4p": "A professional installation team, an orderly handover and service afterwards.",
      "end.h2": "Planning a home or a renovation? We would love to see the plans.",
      "end.call": "Call us. We'd be happy to help :)", "end.mail": "Email", "end.igk": "Instagram", "end.easy": "Business page and reviews", "end.qr": "Scan the code with your phone to open our Instagram",
      "foot.co": "Alum Elbaz Ltd.", "foot.a11y": "Accessibility statement",
      "lb.label": "Image viewer", "lb.close": "Close", "lb.prev": "Previous image", "lb.next": "Next image", "lb.open": "Enlarge image", "lb.ask": "Interested? Send us this photo", "lb.msg": "Hello, I saw this project on your website and I am interested in something similar:", "lb.pic": "photo",
      "fs.on": "Full screen", "fs.off": "Exit full screen", "wa.label": "Message us on WhatsApp", "ig.label": "Our Instagram page", "acc.open": "Accessibility menu",
      "acc.title": "Accessibility", "acc.fs": "Larger text", "acc.hc": "High contrast", "acc.ul": "Highlight links", "acc.nomo": "Stop animations", "acc.reset": "Reset", "acc.close": "Close",
      "st.title": "Accessibility statement | Alum Elbaz",
      "st.h1": "Accessibility statement",
      "st.intro": "Alum Elbaz Ltd. wants everyone to be able to use this website comfortably, including people with disabilities.",
      "st.h2a": "What we did",
      "st.la": "<li>The site was built to follow Israeli Standard 5568 at level AA (based on WCAG 2.0).</li><li>Full keyboard navigation, with a visible focus indicator and a skip link.</li><li>Semantic structure for screen readers, in Hebrew, English and French.</li><li>An accessibility menu: larger text, high contrast, highlighted links and stopping animations.</li><li>The site respects the device setting for reduced motion.</li>",
      "st.h2b": "Known limitations",
      "st.pb": "We keep checking and improving the site. Project photos are described by category only, not in full detail. If you find a problem, please let us know and we'll fix it.",
      "st.h2c": "Accessibility of the service",
      "st.pc": "Our service is provided at the customer's home or site: measurement, consultation and installation take place where you are. You can reach us by phone, WhatsApp or email.",
      "st.h2d": "Accessibility coordinator",
      "st.pd": "Ilan Elbaz<br>Phone: <a href=\"tel:+972543547192\">054-354-7192</a><br>Email: <a href=\"mailto:alumelbaz@gmail.com\">alumelbaz@gmail.com</a>",
      "st.updated": "This statement was last updated on November 12, 2026.",
      "st.back": "Back to the home page"
    },
    fr: {
      "title": "Alum Elbaz | Fenêtres, portes et baies vitrées en aluminium haut de gamme",
      "desc": "Alum Elbaz Ltd. conçoit, fabrique et installe des fenêtres, portes, baies vitrées, fermetures de terrasse et volets en aluminium dans tout Israël.",
      "skip": "Aller au contenu principal", "menu": "Menu",
      "nav.what": "Nos prestations", "nav.projects": "Projets", "nav.process": "Méthode", "nav.contact": "Contact",
      "cta.quote": "Demander un devis", "cta.projects": "Voir nos projets",
      "hero.h1": "L'aluminium, <em>avec la finition</em> d'une maison de luxe.",
      "hero.p": "Fenêtres, portes, baies vitrées et fermetures de terrasse. Conception, fabrication et pose dans tout Israël, avec un suivi personnel bien après la livraison.",
      "svc.h2": "Chaque système en aluminium, conçu pour votre maison.",
      "svc.lead": "D'une seule ouverture à l'enveloppe complète d'une villa. Le même soin pour les lignes, l'étanchéité et la fluidité du mouvement.",
      "svc.1t": "Fenêtres", "svc.1p": "Coulissantes, battantes, oscillo-battantes et style belge, en profilés fins",
      "svc.2t": "Portes en aluminium", "svc.2p": "Entrée, balcon et grands coulissants",
      "svc.3t": "Baies vitrées", "svc.3p": "De larges ouvertures avec un cadre minimal",
      "svc.4t": "Fermetures de terrasse", "svc.4p": "Balcons et pergolas utilisables toute l'année",
      "svc.5t": "Volets", "svc.5p": "Électriques ou manuels, assortis à la façade",
      "facts.big": "ans d'expérience dans l'aluminium",
      "facts.1t": "Service VIP", "facts.1p": "Un seul interlocuteur, de la prise de mesures à la pose, et disponible ensuite.",
      "facts.2t": "Garantie complète", "facts.2p": "Sur le produit et sur la pose, avec un suivi professionnel après la livraison.",
      "facts.3t": "Solutions aux cas complexes", "facts.3p": "Ouvertures hors normes, rénovations et reprise de travaux mal réalisés.",
      "facts.4t": "Livraison rapide", "facts.4p": "De la commande à la pose, des délais parmi les plus courts d'Israël.",
      "gal.h2": "Nos réalisations.", "gal.lead": "Une sélection de projets que nous avons conçus, fabriqués et posés, par catégorie.",
      "g.windows": "Fenêtres", "g.vitrines": "Baies vitrées coulissantes", "g.belgian": "Profils", "g.doors": "Portes", "g.shutters": "Volets", "g.closures": "Fermetures de terrasse et vérandas", "g.showers": "Parois de douche", "g.pergolas": "Pergolas", "g.fences": "Clôtures et portails", "g.office": "Portes et cloisons de bureau", "g.cladding": "Bardage aluminium", "g.screens": "Moustiquaires plissées", "g.handles": "Poignées", "g.more": "Toutes les photos", "g.vid": "Vidéo",
      "wk.title": "Nos réalisations | Alum Elbaz", "wk.h1": "Nos réalisations", "wk.lead": "Toutes les photos, par catégorie. Cliquez sur une photo pour l'agrandir.", "wk.cats": "Catégories",
      "proc.h2": "De la prise de mesures à la maison terminée.",
      "proc.1t": "Mesures sur place", "proc.1p": "Nous venons chez vous, mesurons chaque ouverture et comprenons vos priorités.",
      "proc.2t": "Conception et devis", "proc.2p": "Nous choisissons ensemble le système, la teinte et le vitrage. Un devis clair et détaillé.",
      "proc.3t": "Fabrication", "proc.3p": "Une fabrication précise sur mesure, avec contrôle qualité avant le départ.",
      "proc.4t": "Pose et suivi", "proc.4p": "Une équipe de pose professionnelle, une livraison soignée et un service après-vente.",
      "end.h2": "Un projet de maison ou de rénovation ? Montrez-nous vos plans.",
      "end.call": "Appelez-nous, nous serons ravis de vous aider :)", "end.mail": "E-mail", "end.igk": "Instagram", "end.easy": "Fiche de l'entreprise et avis", "end.qr": "Scannez le code avec votre téléphone pour ouvrir notre Instagram",
      "foot.co": "Alum Elbaz Ltd.", "foot.a11y": "Déclaration d'accessibilité",
      "lb.label": "Visionneuse d'images", "lb.close": "Fermer", "lb.prev": "Image précédente", "lb.next": "Image suivante", "lb.open": "Agrandir l'image", "lb.ask": "Intéressé ? Envoyez-nous cette photo", "lb.msg": "Bonjour, j'ai vu cette réalisation sur votre site et je suis intéressé par quelque chose de similaire :", "lb.pic": "photo",
      "fs.on": "Plein écran", "fs.off": "Quitter le plein écran", "wa.label": "Écrivez-nous sur WhatsApp", "ig.label": "Notre page Instagram", "acc.open": "Menu d'accessibilité",
      "acc.title": "Accessibilité", "acc.fs": "Texte plus grand", "acc.hc": "Contraste élevé", "acc.ul": "Souligner les liens", "acc.nomo": "Arrêter les animations", "acc.reset": "Réinitialiser", "acc.close": "Fermer",
      "st.title": "Déclaration d'accessibilité | Alum Elbaz",
      "st.h1": "Déclaration d'accessibilité",
      "st.intro": "Alum Elbaz Ltd. souhaite que chacun puisse utiliser ce site confortablement, y compris les personnes en situation de handicap.",
      "st.h2a": "Ce que nous avons fait",
      "st.la": "<li>Le site a été conçu selon la norme israélienne 5568, niveau AA (fondée sur les WCAG 2.0).</li><li>Navigation complète au clavier, avec un indicateur de focus visible et un lien d'évitement.</li><li>Structure sémantique pour les lecteurs d'écran, en hébreu, anglais et français.</li><li>Un menu d'accessibilité : texte plus grand, contraste élevé, liens soulignés et arrêt des animations.</li><li>Le site respecte le réglage de réduction des animations de l'appareil.</li>",
      "st.h2b": "Limites connues",
      "st.pb": "Nous continuons à vérifier et à améliorer le site. Les photos de projets sont décrites par catégorie seulement, sans description détaillée. Si vous rencontrez un problème, dites-le-nous et nous le corrigerons.",
      "st.h2c": "Accessibilité du service",
      "st.pc": "Notre service est rendu chez le client : les mesures, le conseil et la pose se font sur place. Vous pouvez nous joindre par téléphone, WhatsApp ou e-mail.",
      "st.h2d": "Référent accessibilité",
      "st.pd": "Ilan Elbaz<br>Téléphone : <a href=\"tel:+972543547192\">054-354-7192</a><br>E-mail : <a href=\"mailto:alumelbaz@gmail.com\">alumelbaz@gmail.com</a>",
      "st.updated": "Cette déclaration a été mise à jour le 12 novembre 2026.",
      "st.back": "Retour à l'accueil"
    }
  };

  /* ---- שפות ---- */
  var orig = { text: new Map(), html: new Map(), attr: new Map(), title: document.title, desc: "" };
  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) orig.desc = metaDesc.getAttribute("content");
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  each("[data-i18n]", function (el) { orig.text.set(el, el.textContent); });
  each("[data-i18n-html]", function (el) { orig.html.set(el, el.innerHTML); });
  each("[data-i18n-label]", function (el) { orig.attr.set(el, el.getAttribute("aria-label")); });
  var heCat = {}; each("[data-i18n^='g.']", function (el) { heCat[el.getAttribute("data-i18n")] = el.textContent; });

  function setLang(lang, save) {
    if (["he", "en", "fr"].indexOf(lang) < 0) lang = "he";
    var dict = T[lang];
    d.lang = lang; d.dir = lang === "he" ? "rtl" : "ltr";
    each("[data-i18n]", function (el) { var k = el.getAttribute("data-i18n"); el.textContent = dict && dict[k] != null ? dict[k] : orig.text.get(el); });
    each("[data-i18n-html]", function (el) { var k = el.getAttribute("data-i18n-html"); el.innerHTML = dict && dict[k] != null ? dict[k] : orig.html.get(el); });
    each("[data-i18n-label]", function (el) { var k = el.getAttribute("data-i18n-label"); el.setAttribute("aria-label", dict && dict[k] != null ? dict[k] : orig.attr.get(el)); });
    each("img[data-i18n-alt]", function (el) { var k = el.getAttribute("data-i18n-alt"); el.alt = (dict && dict[k] != null ? dict[k] : heCat[k]) + " " + el.getAttribute("data-n"); });
    each(".zoom", function (b) { b.setAttribute("aria-label", (dict && dict["lb.open"] || "הגדלת התמונה") + ": " + b.firstElementChild.alt); });
    var tk = d.getAttribute("data-title-key") || "title";
    document.title = dict && dict[tk] ? dict[tk] : orig.title;
    if (metaDesc) metaDesc.setAttribute("content", dict && dict.desc ? dict.desc : orig.desc);
    each(".langs button", function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    each("a[data-keep-lang]", function (a) {
      var p = a.getAttribute("href").split("?"), q = (p[1] || "").split("&").filter(function (x) { return x && x.indexOf("lang=") !== 0; });
      if (lang !== "he") q.push("lang=" + lang);
      a.setAttribute("href", p[0] + (q.length ? "?" + q.join("&") : ""));
    });
    if (save) { try { localStorage.setItem("ae_lang", lang); } catch (e) {} }
    AE.lang = lang;
    syncFs();
  }
  function calm() { return d.classList.contains("nomo") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches); }
  /* החלפת שפה: הדף דוהה לרגע, כדי שהיפוך הכיוון לא ייראה כקפיצה */
  var langT = 0;
  each(".langs button", function (b) { b.addEventListener("click", function () {
    var l = b.getAttribute("data-lang"); clearTimeout(langT);
    if (calm() || l === AE.lang) { d.classList.remove("lg"); setLang(l, true); return; }
    d.classList.add("lg");
    langT = setTimeout(function () { setLang(l, true); d.classList.remove("lg"); }, 130);
  }); });
  setLang(AE.lang, false);

  /* ---- קישורים פנימיים: גוללים לסעיף בלי להשאיר #סעיף בכתובת (אחרת כניסה חוזרת קופצת לשם) ---- */
  each('a[href^="#"]', function (a) {
    a.addEventListener("click", function (e) {
      var el = document.getElementById(a.getAttribute("href").slice(1)); if (!el) return;
      e.preventDefault();
      if (wv && !wv.hidden) setView(false, null, true);
      var calm = d.classList.contains("nomo") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
      el.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
      if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
      el.focus({ preventScroll: true });
    });
  });

  /* ---- תפריט בטלפון ---- */
  var mb = document.querySelector(".menu-btn"), mn = document.getElementById("mnav");
  if (mb && mn) {
    var closeMenu = function () { mn.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); };
    mb.addEventListener("click", function () { var o = !mn.classList.contains("open"); mn.classList.toggle("open", o); mb.setAttribute("aria-expanded", String(o)); });
    each("#mnav a", function (a) { a.addEventListener("click", closeMenu); });
  }

  /* ---- תפריט נגישות ---- */
  var ab = document.querySelector(".fab.acc"), ap = document.getElementById("acc-panel");
  function savePrefs() { try { localStorage.setItem("ae_a11y", JSON.stringify(AE.prefs)); } catch (e) {} }
  function applyPrefs() {
    var p = AE.prefs;
    d.classList.toggle("fs1", p.fs === 1); d.classList.toggle("fs2", p.fs === 2);
    d.classList.toggle("hc", p.hc); d.classList.toggle("ul", p.ul); d.classList.toggle("nomo", p.nomo);
    each("#acc-panel [data-opt][aria-pressed]", function (b) { var k = b.getAttribute("data-opt"); b.setAttribute("aria-pressed", String(k === "fs" ? p.fs > 0 : !!p[k])); });
    var lv = document.getElementById("acc-fs-level"); if (lv) lv.textContent = p.fs === 0 ? "" : (p.fs === 1 ? "112%" : "125%");
  }
  if (ab && ap) {
    var openAcc = function (o) { ap.hidden = !o; ab.setAttribute("aria-expanded", String(o)); if (o) { var f = ap.querySelector("button"); if (f) f.focus(); } else ab.focus(); };
    ab.addEventListener("click", function () { openAcc(ap.hidden); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !ap.hidden) openAcc(false); });
    each("#acc-panel [data-opt]", function (b) {
      b.addEventListener("click", function () {
        var k = b.getAttribute("data-opt"), p = AE.prefs;
        if (k === "fs") p.fs = (p.fs + 1) % 3;
        else if (k === "reset") { p.fs = 0; p.hc = false; p.ul = false; p.nomo = false; }
        else if (k === "close") { openAcc(false); return; }
        else p[k] = !p[k];
        applyPrefs(); savePrefs();
      });
    });
    applyPrefs();
  }

  /* ---- מסך מלא ---- */
  var fsb = document.getElementById("fsb"), fsEl = document.documentElement;
  function fsNow() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
  function syncFs() {
    if (!fsb) return;
    var on = !!fsNow(), dict = T[AE.lang], k = on ? "fs.off" : "fs.on";
    fsb.setAttribute("aria-pressed", String(on));
    document.getElementById("fsb-t").textContent = dict && dict[k] ? dict[k] : (on ? "יציאה ממסך מלא" : "מסך מלא");
  }
  if (fsb && (fsEl.requestFullscreen || fsEl.webkitRequestFullscreen) && (document.fullscreenEnabled || document.webkitFullscreenEnabled)) {
    fsb.hidden = false; syncFs();
    fsb.addEventListener("click", function () {
      try {
        if (fsNow()) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
        else {
          var r = (fsEl.requestFullscreen || fsEl.webkitRequestFullscreen).call(fsEl); if (r && r.catch) r.catch(function () {});
          if (navigator.keyboard && navigator.keyboard.lock) navigator.keyboard.lock(["Escape"]).catch(function () {});
        }
      } catch (e) {}
    });
    document.addEventListener("fullscreenchange", syncFs); document.addEventListener("webkitfullscreenchange", syncFs);
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !fsNow()) return;
      var lb = document.getElementById("lb"), ap = document.getElementById("acc-panel");
      if ((lb && lb.open) || (ap && !ap.hidden)) return;
      try { (document.exitFullscreen || document.webkitExitFullscreen).call(document); } catch (er) {}
    });
  }

  /* ---- כל העבודות בתוך עמוד הבית: החלפת תצוגה בלי טעינת עמוד (מעבר עמוד היה מוציא ממסך מלא) ---- */
  var wv = document.getElementById("wv"), homeMain = document.getElementById("main"), homeTitle = orig.title, showCat = null;
  function setView(works, cat, push) {
    if (!wv) return;
    wv.hidden = !works; homeMain.hidden = works;
    if (works) { d.setAttribute("data-title-key", "wk.title"); orig.title = "העבודות שלנו | אלום אלבז"; if (showCat) showCat(cat, false); }
    else { d.removeAttribute("data-title-key"); orig.title = homeTitle; }
    var dict = T[AE.lang], tk = works ? "wk.title" : "title";
    document.title = dict && dict[tk] ? dict[tk] : orig.title;
    if (push) { try {
      var q = new URLSearchParams(location.search);
      if (works) { q.set("view", "works"); if (cat) q.set("cat", cat); else q.delete("cat"); } else { q.delete("view"); q.delete("cat"); }
      var s = q.toString(); history.pushState(null, "", location.pathname + (s ? "?" + s : ""));
    } catch (e) {} }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (works) wv.focus({ preventScroll: true });
  }
  function viewFromUrl() { try { var q = new URLSearchParams(location.search); setView(q.get("view") === "works", q.get("cat"), false); } catch (e) {} }
  if (wv) {
    each("a.more", function (a) { a.addEventListener("click", function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return;
      e.preventDefault(); var m = /[?&]cat=([a-z]+)/.exec(a.getAttribute("href")); setView(true, m ? m[1] : null, true);
    }); });
    each("#wv .back", function (a) { a.addEventListener("click", function (e) { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button) return; e.preventDefault(); setView(false, null, true); }); });
    window.addEventListener("popstate", viewFromUrl);
  }

  /* ---- עמוד העבודות: תחום אחד מוצג בכל פעם ---- */
  (function () {
    var chips = document.querySelectorAll(".chip"), secs = document.querySelectorAll(".gcat");
    if (!chips.length) return;
    function show(c, push) {
      var ok = false; Array.prototype.forEach.call(secs, function (s) { if (s.getAttribute("data-g") === c) ok = true; });
      if (!ok) c = secs[0].getAttribute("data-g");
      Array.prototype.forEach.call(secs, function (s) { s.hidden = s.getAttribute("data-g") !== c; });
      Array.prototype.forEach.call(chips, function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-cat") === c)); });
      if (push) { try { var q = new URLSearchParams(location.search); q.set("cat", c); history.replaceState(null, "", location.pathname + "?" + q.toString()); } catch (e) {} }
    }
    var first = null; try { first = new URLSearchParams(location.search).get("cat"); } catch (e) {}
    show(first, false); showCat = show;
    Array.prototype.forEach.call(chips, function (b) { b.addEventListener("click", function () { show(b.getAttribute("data-cat"), true); }); });
  })();

  if (wv) { try { if (new URLSearchParams(location.search).get("view") === "works") viewFromUrl(); } catch (e) {} }

  /* ---- תצוגת תמונה מוגדלת ---- */
  (function () {
    var lb = document.getElementById("lb"), all = document.querySelectorAll(".zoom"), zs = all;
    if (!lb || !all.length || !lb.showModal) return;
    var im = document.getElementById("lb-img"), cap = document.getElementById("lb-cap"), cnt = document.getElementById("lb-n"), wa = document.getElementById("lb-wa"), cur = 0, x0 = null;
    function go(i) {
      cur = (i + zs.length) % zs.length;
      var src = zs[cur].firstElementChild, big = src.getAttribute("data-full");
      if (im.getAttribute("src") !== big) { im.classList.add("sw"); im.setAttribute("src", big); }
      im.alt = src.alt; cap.textContent = src.alt.replace(/ \d+$/, ""); cnt.textContent = (cur + 1) + " / " + zs.length;
      /* כפתור "מתעניין": הודעת WhatsApp מוכנה עם שם התחום, מספר התמונה וקישור שפותח אותה באתר */
      if (wa) {
        var m = /([a-z]+)-0*(\d+)\.webp$/.exec(big || ""), dict = T[AE.lang] || {}, NL = String.fromCharCode(10);
        var txt = (dict["lb.msg"] || "שלום, ראיתי באתר שלכם את העבודה הזאת ואני מתעניין במשהו דומה:") + NL + cap.textContent + ", " + (dict["lb.pic"] || "תמונה") + " " + (cur + 1)
          + (m ? NL + "https://alum-elbaz.co.il/?view=works&cat=" + m[1] + "&img=" + m[2] : "");
        wa.setAttribute("href", "https://wa.me/972543547192?text=" + encodeURIComponent(txt));
      }
    }
    function step(n) { go(cur + n); }
    im.addEventListener("load", function () { im.classList.remove("sw"); });
    im.addEventListener("error", function () { im.classList.remove("sw"); });
    Array.prototype.forEach.call(all, function (z) { z.addEventListener("click", function () {
      var g = z.closest("[data-g]"), i = -1; zs = g ? g.querySelectorAll(".zoom") : all;
      /* תמונה מעמוד הבית: מדפדפים בכל התמונות של אותו תחום, לא בין התחומים */
      if (g && g.getAttribute("data-g") === "home") {
        var key = (z.firstElementChild.getAttribute("data-i18n-alt") || "").replace("g.", ""), full = z.firstElementChild.getAttribute("data-full");
        var sec = key ? document.getElementById("g-" + key) : null, cat = z.closest(".cat");
        zs = sec ? sec.querySelectorAll(".zoom") : (cat ? cat.querySelectorAll(".zoom") : zs);
        Array.prototype.forEach.call(zs, function (o, k) { if (i < 0 && o.firstElementChild.getAttribute("data-full") === full) i = k; });
      }
      go(i >= 0 ? i : Array.prototype.indexOf.call(zs, z)); d.classList.add("lb-open"); lb.showModal();
    }); });
    lb.addEventListener("close", function () { d.classList.remove("lb-open"); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.querySelector(".lb-x").addEventListener("click", function () { lb.close(); });
    lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    /* החצים לפי כיוון הקריאה: בעברית "הבא" הוא שמאלה */
    lb.addEventListener("keydown", function (e) {
      var fwd = d.dir === "rtl" ? "ArrowLeft" : "ArrowRight", back = d.dir === "rtl" ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd) { e.preventDefault(); step(1); } else if (e.key === back) { e.preventDefault(); step(-1); }
    });
    lb.addEventListener("touchstart", function (e) { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) step((dx > 0) === (d.dir === "rtl") ? 1 : -1);
    }, { passive: true });
    /* קישור ישיר לתמונה מסוימת: ?cat=showers&img=12 פותח אותה מוגדלת */
    try {
      var q = new URLSearchParams(location.search), qc = q.get("cat"), qi = parseInt(q.get("img"), 10);
      if (qc && /^[a-z]+$/.test(qc) && qi > 0) {
        var sec = document.getElementById("g-" + qc), want = new RegExp("/" + qc + "-0*" + qi + "[.]webp$");
        if (sec && !sec.hidden && sec.offsetParent !== null) Array.prototype.some.call(sec.querySelectorAll(".zoom"), function (z) {
          if (!want.test(z.firstElementChild.getAttribute("data-full") || "")) return false; z.click(); return true; });
      }
    } catch (e) {}
  })();

  /* ---- ספירה של מספר השנים, פעם אחת כשהוא נכנס למסך ---- */
  (function () {
    var el = document.querySelector(".num[data-count]");
    if (!el || !("IntersectionObserver" in window)) return;
    var to = parseInt(el.getAttribute("data-count"), 10);
    var o = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return; o.disconnect();
      if (calm()) return;
      var t0 = null, D = 900;
      el.textContent = "0";
      requestAnimationFrame(function f(ts) {
        if (t0 === null) t0 = ts;
        var p = Math.min(1, (ts - t0) / D), e = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(to * e));
        if (p < 1) requestAnimationFrame(f);
      });
    }, { threshold: 0.6 });
    o.observe(el);
  })();

  /* ---- כניסה בגלילה ---- */
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    Array.prototype.forEach.call(rv, function (el) { io.observe(el); });
  } else Array.prototype.forEach.call(rv, function (el) { el.classList.add("on"); });
})();
