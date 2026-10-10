/* ==== הפרטים האמיתיים של העסק: ממלאים כאן פעם אחת, לכל עמודי האתר. ====
   שדה ריק יוצג באתר כסימון צהוב "להשלים", והכפתורים שתלויים בו יהיו מושבתים. */
window.SITE = {
  whatsapp:    "",   // מספר בפורמט בינלאומי בלי + ובלי מקפים, למשל 9725XXXXXXXX
  phone:       "",   // כפי שיוצג באתר, למשל 05X-XXX-XXXX
  email:       "getiaschedule@gmail.com",
  businessId:  "",   // ע.מ. / ח.פ.
  businessName:"IA Schedule",   // השם הרשמי של העסק (כפי שרשום ברשויות)
  address:     "",   // כתובת למשלוח דואר (לא חובה להציג באתר, אבל נדרשת במדיניות פרטיות)
  hosting:     "GitHub Pages",   // ספק האחסון, למשל Netlify / Cloudflare Pages
  retention:   "",   // כמה זמן שומרים פניות, למשל "עד 24 חודשים מהפנייה האחרונה"
  privacyUrl:  "privacy.html",
  a11yDate:    "",   // תאריך בדיקת הנגישות האחרונה
  privacyDate: "10.10.2026"    // תאריך עדכון מדיניות הפרטיות
};

/* ממלא את הפרטים בעמוד. אין צורך לשנות מכאן והלאה. */
window.applySite = function(){
  const S = window.SITE;
  /* 'hide' (public pages): missing details are hidden, not marked. 'mark' (drafts): shown as 'להשלים'. */
  const hide = window.SITE_MODE === 'hide';
  const labels = {whatsappDisplay:'מספר וואטסאפ', phone:'מספר טלפון', email:'כתובת מייל', businessId:'ע.מ. / ח.פ.', businessName:'שם העסק הרשמי', address:'כתובת', hosting:'ספק האחסון', retention:'תקופת שמירה', a11yDate:'תאריך', privacyDate:'תאריך'};
  const vals = Object.assign({}, S, {whatsappDisplay: S.phone || '', year: String(new Date().getFullYear())});
  document.querySelectorAll('[data-fill]').forEach(el => {
    const k = el.dataset.fill, v = vals[k];
    if (v) { el.textContent = v; }
    else if (hide) { const box = el.closest('[data-optional]'); if (box) box.hidden = true; }
    else { el.textContent = 'להשלים: ' + (labels[k] || k); el.classList.add('todo'); }
  });
  const links = {
    whatsapp: S.whatsapp ? 'https://wa.me/' + S.whatsapp.replace(/\D/g, '') : '',
    tel:      S.phone ? 'tel:' + S.phone.replace(/[^\d+]/g, '') : '',
    mail:     S.email ? 'mailto:' + S.email : '',
    privacy:  S.privacyUrl
  };
  document.querySelectorAll('[data-link]').forEach(a => {
    const href = links[a.dataset.link];
    if (href) { a.href = href; if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; } }
    else if (hide && a.dataset.link === 'whatsapp') {
      a.addEventListener('click', e => { e.preventDefault(); window.siteToast && window.siteToast('זו תצוגה מקדימה: מספר הוואטסאפ יתווסף לפני שהאתר עולה לאוויר.'); });
    }
    else if (hide) { const box = a.closest('[data-optional]'); if (box) box.hidden = true; }
    else {
      a.setAttribute('aria-disabled', 'true');
      a.title = 'הקישור יפעל אחרי שימולאו פרטי הקשר';
      a.addEventListener('click', e => e.preventDefault());
    }
  });
};

window.siteToast = function(msg){
  let t = document.querySelector('.site-toast');
  if (!t) { t = document.createElement('div'); t.className = 'site-toast'; t.setAttribute('role', 'status');
    t.style.cssText = 'position:fixed;bottom:96px;left:50%;transform:translateX(-50%);background:#0F1B4D;color:#fff;padding:12px 18px;border-radius:12px;font-size:16px;max-width:calc(100% - 32px);z-index:60';
    document.body.appendChild(t); }
  t.textContent = msg; clearTimeout(window.__toastT); window.__toastT = setTimeout(() => t.remove(), 3200);
};
