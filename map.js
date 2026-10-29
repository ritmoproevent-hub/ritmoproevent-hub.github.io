/* Сальса Плюс — карта Яндекса на странице «Контакты».
   Карта Яндекса загружается не сразу, а:
   • автоматически — если посетитель принял cookies («Принять») и карта появилась на экране;
   • по нажатию «Показать интерактивную карту» — в любом случае.
   Так страница открывается быстрее, а сторонний скрипт не грузится без согласия. */
(function () {
  var SRC = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3A9804d651e7adcd0421e03df44dafbe168dd140edc4a9804c9bc952bf1d5e9066&width=100%25&height=400&lang=ru_RU&scroll=false';
  function init() {
    var box = document.getElementById('sp-map'); if (!box) return;
    var holder = box.querySelector('.sp-map-canvas'), btn = box.querySelector('.sp-map-load'), done = false;
    function load() {
      if (done) return; done = true;
      box.classList.add('is-loaded');
      var s = document.createElement('script');
      s.type = 'text/javascript'; s.charset = 'utf-8'; s.async = true; s.src = SRC;
      holder.innerHTML = ''; holder.appendChild(s);
    }
    btn.addEventListener('click', load);
    var consent = null; try { consent = localStorage.getItem('sp-cookie-consent'); } catch (e) {}
    if (consent === 'all') {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { io.disconnect(); load(); } }, { rootMargin: '200px' });
        io.observe(box);
      } else load();
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
