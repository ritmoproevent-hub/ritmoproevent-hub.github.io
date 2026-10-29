/* Сальса Плюс — счётчики посещаемости.
   Запускаются ТОЛЬКО после согласия посетителя в баннере cookies (consent.js)
   и ТОЛЬКО на рабочем домене salsaplus.ru — тестовая копия не портит статистику.
   Яндекс Метрика: 23867182. VK Реклама / Top.Mail.Ru: 3415173. */
(function () {
  var METRIKA_ID = 23867182, VK_ID = '3415173', loaded = false;
  window.spLoadAnalytics = function () {
    if (loaded) return; loaded = true;
    if (!/(^|\.)salsaplus\.ru$/.test(location.hostname)) return;
    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      k = e.createElement(t); a = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; a.parentNode.insertBefore(k, a);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    window.ym(METRIKA_ID, 'init', { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });
    var _tmr = window._tmr || (window._tmr = []);
    _tmr.push({ id: VK_ID, type: 'pageView', start: (new Date()).getTime() });
    var s = document.createElement('script'); s.async = true; s.id = 'tmr-code';
    s.src = 'https://top-fwz1.mail.ru/js/code.js';
    document.head.appendChild(s);
  };
})();
