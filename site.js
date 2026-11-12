// אלום אלבז: שפות, תפריט, נגישות, כניסה בגלילה. בלי ספריות חיצוניות.
(function () {
  "use strict";
  var AE = window.__AE || { lang: "he", prefs: { fs: 0, hc: false, ul: false, nomo: false } };
  var d = document.documentElement;

  /* העברית נמצאת ב-HTML עצמו; כאן רק האנגלית והצרפתית. כל המחרוזות קבועות (לא קלט משתמש). */
  var T = {
    en: {
      "title": "Alum Elbaz | Premium aluminium windows, doors and glazing",
      "desc": "Alum Elbaz Ltd. designs, manufactures and installs aluminium windows, doors, glazed walls, winter enclosures and shutters across Israel.",
      "skip": "Skip to main content", "menu": "Menu",
      "nav.what": "What we do", "nav.projects": "Projects", "nav.process": "Process", "nav.contact": "Contact",
      "cta.quote": "Get a quote", "cta.projects": "See our projects",
      "hero.h1": "Aluminium <em>finished to the standard</em> of a luxury home.",
      "hero.p": "Windows, doors, glazed walls and winter enclosures. Design, manufacturing and installation across Israel, with personal support well after handover.",
      "svc.h2": "Every aluminium system, designed for your home.",
      "svc.lead": "From a single opening to the full envelope of a villa. The same care for clean lines, sealing and smooth movement.",
      "svc.1t": "Windows", "svc.1p": "Sliding, hinged, tilt and Belgian style, in slim profiles",
      "svc.2t": "Aluminium doors", "svc.2p": "Entrance, balcony and large sliding doors",
      "svc.3t": "Glazed walls", "svc.3p": "Wide openings with minimal framing",
      "svc.4t": "Winter enclosures", "svc.4p": "Balconies and pergolas you can use all year",
      "svc.5t": "Shutters", "svc.5p": "Electric and manual, matched to the facade",
      "facts.big": "years of aluminium experience",
      "facts.1t": "VIP service", "facts.1p": "One contact person from measurement to installation, and available afterwards.",
      "facts.2t": "Comprehensive warranty", "facts.2p": "On the product and on the installation, with professional support after handover.",
      "facts.3t": "Complex problems solved", "facts.3p": "Unusual openings, renovations and fixing work that went wrong.",
      "facts.4t": "Fast delivery", "facts.4p": "From order to installation, among the fastest lead times in Israel.",
      "gal.h2": "Our work.", "gal.lead": "A selection of projects we designed, manufactured and installed, by category.",
      "cat.1": "Windows and glazed walls", "cat.2": "Office doors and partitions", "cat.3": "Pergolas", "cat.4": "Shower enclosures", "cat.5": "Fences and gates", "cat.6": "Shading", "cat.7": "Aluminium cladding", "cat.8": "Handles and hardware", "cat.9": "Pleated insect screens",
      "proc.h2": "From measurement to the finished home.",
      "proc.1t": "On-site measurement", "proc.1p": "We come to you, measure every opening and learn what matters to you.",
      "proc.2t": "Design and quote", "proc.2p": "Together we choose the system, colour and glazing. A clear, itemised quote.",
      "proc.3t": "Manufacturing", "proc.3p": "Made precisely to measure, with quality control before it leaves.",
      "proc.4t": "Installation and support", "proc.4p": "A professional installation team, an orderly handover and service afterwards.",
      "end.h2": "Planning a home or a renovation? We would love to see the plans.",
      "end.area": "Service across Israel",
      "foot.co": "Alum Elbaz Ltd.", "foot.a11y": "Accessibility statement",
      "pf.label": "Customer recommendations", "pf.close": "Close recommendations", "wa.label": "Message us on WhatsApp", "acc.open": "Accessibility menu",
      "acc.title": "Accessibility", "acc.fs": "Larger text", "acc.hc": "High contrast", "acc.ul": "Highlight links", "acc.nomo": "Stop animations", "acc.reset": "Reset", "acc.close": "Close",
      "st.title": "Accessibility statement | Alum Elbaz",
      "st.h1": "Accessibility statement",
      "st.intro": "Alum Elbaz Ltd. wants everyone to be able to use this website comfortably, including people with disabilities.",
      "st.h2a": "What we did",
      "st.la": "<li>The site was built to follow Israeli Standard 5568 at level AA (based on WCAG 2.0).</li><li>Full keyboard navigation, with a visible focus indicator and a skip link.</li><li>Semantic structure for screen readers, in Hebrew, English and French.</li><li>An accessibility menu: larger text, high contrast, highlighted links and stopping animations.</li><li>The site respects the device setting for reduced motion.</li>",
      "st.h2b": "Known limitations",
      "st.pb": "We keep checking and improving the site. Project photos are described by category only, not in full detail. If you found a problem, please tell us and we will fix it.",
      "st.h2c": "Accessibility of the service",
      "st.pc": "Our service is provided at the customer's home or site: measurement, consultation and installation take place where you are. You can reach us by phone, WhatsApp or email.",
      "st.h2d": "Accessibility coordinator",
      "st.pd": "Ilan Elbaz<br>Phone: <a href=\"tel:+972543547192\">054-354-7192</a><br>Email: <a href=\"mailto:alumelbaz@gmail.com\">alumelbaz@gmail.com</a>",
      "st.updated": "This statement was last updated on 12 November 2026.",
      "st.back": "Back to the home page"
    },
    fr: {
      "title": "Alum Elbaz | Fenêtres, portes et baies vitrées en aluminium haut de gamme",
      "desc": "Alum Elbaz Ltd. conçoit, fabrique et installe des fenêtres, portes, baies vitrées, fermetures d'hiver et volets en aluminium dans tout Israël.",
      "skip": "Aller au contenu principal", "menu": "Menu",
      "nav.what": "Nos prestations", "nav.projects": "Projets", "nav.process": "Méthode", "nav.contact": "Contact",
      "cta.quote": "Demander un devis", "cta.projects": "Voir nos projets",
      "hero.h1": "L'aluminium, <em>avec la finition</em> d'une maison de luxe.",
      "hero.p": "Fenêtres, portes, baies vitrées et fermetures d'hiver. Conception, fabrication et pose dans tout Israël, avec un suivi personnel bien après la livraison.",
      "svc.h2": "Chaque système en aluminium, conçu pour votre maison.",
      "svc.lead": "D'une seule ouverture à l'enveloppe complète d'une villa. Le même soin pour les lignes, l'étanchéité et la fluidité du mouvement.",
      "svc.1t": "Fenêtres", "svc.1p": "Coulissantes, battantes, oscillo-battantes et style belge, en profilés fins",
      "svc.2t": "Portes en aluminium", "svc.2p": "Entrée, balcon et grands coulissants",
      "svc.3t": "Baies vitrées", "svc.3p": "De larges ouvertures avec un cadre minimal",
      "svc.4t": "Fermetures d'hiver", "svc.4p": "Balcons et pergolas utilisables toute l'année",
      "svc.5t": "Volets", "svc.5p": "Électriques ou manuels, assortis à la façade",
      "facts.big": "ans d'expérience dans l'aluminium",
      "facts.1t": "Service VIP", "facts.1p": "Un seul interlocuteur, de la prise de mesures à la pose, et disponible ensuite.",
      "facts.2t": "Garantie complète", "facts.2p": "Sur le produit et sur la pose, avec un suivi professionnel après la livraison.",
      "facts.3t": "Solutions aux cas complexes", "facts.3p": "Ouvertures hors normes, rénovations et reprise de travaux mal réalisés.",
      "facts.4t": "Livraison rapide", "facts.4p": "De la commande à la pose, parmi les délais les plus courts d'Israël.",
      "gal.h2": "Nos réalisations.", "gal.lead": "Une sélection de projets que nous avons conçus, fabriqués et posés, par catégorie.",
      "cat.1": "Fenêtres et baies vitrées", "cat.2": "Portes et cloisons de bureau", "cat.3": "Pergolas", "cat.4": "Parois de douche", "cat.5": "Clôtures et portails", "cat.6": "Brise-soleil", "cat.7": "Bardage aluminium", "cat.8": "Poignées et quincaillerie", "cat.9": "Moustiquaires plissées",
      "proc.h2": "De la prise de mesures à la maison terminée.",
      "proc.1t": "Mesures sur place", "proc.1p": "Nous venons chez vous, mesurons chaque ouverture et comprenons vos priorités.",
      "proc.2t": "Conception et devis", "proc.2p": "Nous choisissons ensemble le système, la teinte et le vitrage. Un devis clair et détaillé.",
      "proc.3t": "Fabrication", "proc.3p": "Une fabrication précise sur mesure, avec contrôle qualité avant le départ.",
      "proc.4t": "Pose et suivi", "proc.4p": "Une équipe de pose professionnelle, une livraison soignée et un service après.",
      "end.h2": "Un projet de maison ou de rénovation ? Montrez-nous vos plans.",
      "end.area": "Service dans tout Israël",
      "foot.co": "Alum Elbaz Ltd.", "foot.a11y": "Déclaration d'accessibilité",
      "pf.label": "Recommandations de clients", "pf.close": "Fermer les recommandations", "wa.label": "Écrivez-nous sur WhatsApp", "acc.open": "Menu d'accessibilité",
      "acc.title": "Accessibilité", "acc.fs": "Texte plus grand", "acc.hc": "Contraste élevé", "acc.ul": "Souligner les liens", "acc.nomo": "Arrêter les animations", "acc.reset": "Réinitialiser", "acc.close": "Fermer",
      "st.title": "Déclaration d'accessibilité | Alum Elbaz",
      "st.h1": "Déclaration d'accessibilité",
      "st.intro": "Alum Elbaz Ltd. souhaite que chacun puisse utiliser ce site confortablement, y compris les personnes en situation de handicap.",
      "st.h2a": "Ce que nous avons fait",
      "st.la": "<li>Le site a été conçu selon la norme israélienne 5568, niveau AA (fondée sur WCAG 2.0).</li><li>Navigation complète au clavier, avec un indicateur de focus visible et un lien d'évitement.</li><li>Structure sémantique pour les lecteurs d'écran, en hébreu, anglais et français.</li><li>Un menu d'accessibilité : texte plus grand, contraste élevé, liens soulignés et arrêt des animations.</li><li>Le site respecte le réglage de réduction des animations de l'appareil.</li>",
      "st.h2b": "Limites connues",
      "st.pb": "Nous continuons à vérifier et à améliorer le site. Les photos de projets sont décrites par catégorie seulement, sans description détaillée. Si vous rencontrez un problème, dites-le-nous et nous le corrigerons.",
      "st.h2c": "Accessibilité du service",
      "st.pc": "Notre service est rendu chez le client : les mesures, le conseil et la pose se font sur place. Vous pouvez nous joindre par téléphone, WhatsApp ou e-mail.",
      "st.h2d": "Référent accessibilité",
      "st.pd": "Ilan Elbaz<br>Téléphone : <a href=\"tel:+972543547192\">054-354-7192</a><br>E-mail : <a href=\"mailto:alumelbaz@gmail.com\">alumelbaz@gmail.com</a>",
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
  var heCat = {}; each("h3[data-i18n]", function (el) { heCat[el.getAttribute("data-i18n")] = el.textContent; });

  function setLang(lang, save) {
    if (["he", "en", "fr"].indexOf(lang) < 0) lang = "he";
    var dict = T[lang];
    d.lang = lang; d.dir = lang === "he" ? "rtl" : "ltr";
    each("[data-i18n]", function (el) { var k = el.getAttribute("data-i18n"); el.textContent = dict && dict[k] != null ? dict[k] : orig.text.get(el); });
    each("[data-i18n-html]", function (el) { var k = el.getAttribute("data-i18n-html"); el.innerHTML = dict && dict[k] != null ? dict[k] : orig.html.get(el); });
    each("[data-i18n-label]", function (el) { var k = el.getAttribute("data-i18n-label"); el.setAttribute("aria-label", dict && dict[k] != null ? dict[k] : orig.attr.get(el)); });
    each("img[data-i18n-alt]", function (el) { var k = el.getAttribute("data-i18n-alt"); el.alt = (dict && dict[k] != null ? dict[k] : heCat[k]) + " " + el.getAttribute("data-n"); });
    var tk = d.getAttribute("data-title-key") || "title";
    document.title = dict && dict[tk] ? dict[tk] : orig.title;
    if (metaDesc) metaDesc.setAttribute("content", dict && dict.desc ? dict.desc : orig.desc);
    each(".langs button", function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === lang)); });
    each("a[data-keep-lang]", function (a) { var u = a.getAttribute("href").split("?")[0]; a.setAttribute("href", lang === "he" ? u : u + "?lang=" + lang); });
    if (save) { try { localStorage.setItem("ae_lang", lang); } catch (e) {} }
    AE.lang = lang;
  }
  each(".langs button", function (b) { b.addEventListener("click", function () { setLang(b.getAttribute("data-lang"), true); }); });
  setLang(AE.lang, false);

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

  /* ---- הודעות המלצה קופצות ----
     PROOF = לקוחות אמיתיים בלבד (ראשי תיבות, עיר, מה הוזמן, ומשפט המלצה אם יש). כל עוד הרשימה ריקה, לא מוצג כלום.
     PROOF_DEMO = נתוני הדגמה מומצאים, מוצגים רק עם ?proof=demo ורק עם התווית "דוגמה". לא להעביר אותם ל-PROOF. */
  var PROOF = [
    /* נמסרו ע"י מתניה 12/11/2026. מה הוזמן ומשפט המלצה: להוסיף כשיימסרו (item / q). */
    { i: "ד.ט.", il: "D.T.", g: "m", city: ["קריית נטפים", "Kiryat Netafim", "Kiryat Netafim"] },
    { org: ["מועצה מקומית קדומים", "Kedumim Local Council", "Conseil local de Kedumim"], i: "ק", il: "K" }
  ];
  var PROOF_DEMO = [
    { i: "מ.ג.", il: "M.G.", g: "m", city: ["הוד השרון", "Hod HaSharon", "Hod HaSharon"], item: "windows" },
    { i: "ר.כ.", il: "R.K.", g: "f", city: ["רעננה", "Ra'anana", "Ra'anana"], item: "pergola", q: ["עבודה נקייה ומדויקת", "Clean, precise work", "Un travail propre et précis"] },
    { i: "ד.ל.", il: "D.L.", g: "m", city: ["מודיעין", "Modi'in", "Modi'in"], item: "shower" },
    { i: "ש.א.", il: "S.A.", g: "f", city: ["חיפה", "Haifa", "Haïfa"], item: "vitrine", q: ["הגיעו בזמן וסיימו ביום אחד", "On time and finished in one day", "À l'heure et terminé en une journée"] },
    { i: "י.ב.", il: "Y.B.", g: "m", city: ["אשדוד", "Ashdod", "Ashdod"], item: "doors" },
    { i: "נ.ח.", il: "N.H.", g: "f", city: ["ירושלים", "Jerusalem", "Jérusalem"], item: "fence" }
  ];
  var PF_ITEM = {
    windows: ["חלונות", "windows", "des fenêtres"], pergola: ["פרגולה", "a pergola", "une pergola"], shower: ["מקלחון", "a shower enclosure", "une paroi de douche"],
    vitrine: ["ויטרינה", "a glazed wall", "une baie vitrée"], doors: ["דלתות", "doors", "des portes"], fence: ["גדר", "a fence", "une clôture"], shutters: ["תריסים", "shutters", "des volets"]
  };
  (function () {
    var box = document.getElementById("proof"); if (!box) return;
    var demo = false; try { demo = new URLSearchParams(location.search).get("proof") === "demo"; } catch (e) {}
    var list = (demo ? PROOF_DEMO : PROOF).slice(); if (!list.length) return;
    try { if (sessionStorage.getItem("ae_proof_off") === "1") return; } catch (e) {}
    var SHOW = 6000, GAP = demo ? 5000 : 15000, n = 0, timer = null, off = false, started = false;
    for (var k = list.length - 1; k > 0; k--) { var j = Math.floor(Math.random() * (k + 1)), x = list[k]; list[k] = list[j]; list[j] = x; }
    var av = box.querySelector(".pf-av"), l1 = box.querySelector(".pf-1"), l2 = box.querySelector(".pf-2");
    function quiet() { return d.classList.contains("nomo") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches); }
    function fill(c) {
      var li = AE.lang === "en" ? 1 : AE.lang === "fr" ? 2 : 0, item = (PF_ITEM[c.item] || ["", "", ""])[li], city = c.city ? c.city[li] : "", who = li ? c.il : c.i;
      av.textContent = (li ? c.il : c.i).replace(/\./g, "");
      if (c.org) l1.textContent = c.org[li];
      else if (!item) l1.textContent = li === 0 ? who + " מ" + city : li === 1 ? who + " from " + city : who + ", de " + city;
      else l1.textContent = li === 0 ? who + " מ" + city + (c.g === "f" ? " הזמינה " : " הזמין ") + item
        : li === 1 ? who + " from " + city + " ordered " + item : who + ", de " + city + ", a commandé " + item;
      if (demo) { var b = document.createElement("span"); b.className = "pf-demo"; b.textContent = ["דוגמה", "Sample", "Exemple"][li]; l1.appendChild(b); }
      l2.textContent = c.q ? "“" + c.q[li] + "”"
        : c.org ? ["בין הלקוחות שלנו", "Among our clients", "Parmi nos clients"][li]
        : !item ? [c.g === "f" ? "לקוחה של אלום אלבז" : "לקוח של אלום אלבז", "An Alum Elbaz client", "Client d'Alum Elbaz"][li]
        : li === 0 ? (c.g === "f" ? "ממליצה בחום" : "ממליץ בחום") : li === 1 ? "Highly recommends us" : "Nous recommande vivement";
    }
    function hide(next) { box.classList.remove("on"); timer = setTimeout(function () { box.hidden = true; if (next && !off) timer = setTimeout(show, GAP); }, 550); }
    function show() {
      if (off) return;
      if (quiet() || (document.getElementById("acc-panel") && !document.getElementById("acc-panel").hidden)) { timer = setTimeout(show, GAP); return; }
      fill(list[n % list.length]); n++; box.hidden = false;
      requestAnimationFrame(function () { requestAnimationFrame(function () { box.classList.add("on"); }); });
      timer = setTimeout(function () { hide(true); }, SHOW);
    }
    box.querySelector(".pf-x").addEventListener("click", function () { off = true; clearTimeout(timer); hide(false); try { sessionStorage.setItem("ae_proof_off", "1"); } catch (e) {} });
    box.addEventListener("mouseenter", function () { if (box.classList.contains("on")) clearTimeout(timer); });
    box.addEventListener("mouseleave", function () { if (box.classList.contains("on") && !off) { clearTimeout(timer); timer = setTimeout(function () { hide(true); }, 2500); } });
    /* ההודעה הראשונה רק אחרי שהגולש התחיל לגלול */
    var sentinel = document.getElementById("services");
    if (sentinel && "IntersectionObserver" in window) {
      var po = new IntersectionObserver(function (es) { if (!started && es[0].isIntersecting) { started = true; po.disconnect(); timer = setTimeout(show, 1500); } }, { threshold: 0.05 });
      po.observe(sentinel);
    }
  })();

  /* ---- כניסה בגלילה ---- */
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }); }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    Array.prototype.forEach.call(rv, function (el) { io.observe(el); });
  } else Array.prototype.forEach.call(rv, function (el) { el.classList.add("on"); });
})();
