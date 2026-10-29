/* Сальса Плюс — согласие на cookies (152-ФЗ).
   Выбор посетителя хранится в localStorage под ключом sp-cookie-consent:
   "all" — разрешена аналитика (Яндекс Метрика), "necessary" — только необходимые.
   Счётчик Метрики подключается функцией window.spLoadAnalytics() и только при "all". */
(function () {
  var KEY = 'sp-cookie-consent';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function analytics() { if (typeof window.spLoadAnalytics === 'function') window.spLoadAnalytics(); }
  function init() {
    var old = document.getElementById('cookie-info');
    if (old) old.parentNode.removeChild(old);
    var choice = get();
    if (choice === 'all') { analytics(); return; }
    if (choice === 'necessary') return;
    var box = document.createElement('div');
    box.id = 'sp-cookie';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-live', 'polite');
    box.setAttribute('aria-label', 'Согласие на использование cookies');
    box.innerHTML =
      '<p>Мы используем файлы cookie, чтобы сайт работал, и сервис Яндекс Метрика, чтобы понимать, как им пользуются. ' +
      'Подробнее — в <a href="/pravila-polzovaniya-saytom/">политике конфиденциальности</a>.</p>' +
      '<div class="sp-cookie-actions">' +
      '<button type="button" class="sp-cookie-all">Принять</button>' +
      '<button type="button" class="sp-cookie-min">Только необходимые</button></div>';
    document.body.appendChild(box);
    box.querySelector('.sp-cookie-all').addEventListener('click', function () { set('all'); box.remove(); analytics(); });
    box.querySelector('.sp-cookie-min').addEventListener('click', function () { set('necessary'); box.remove(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
