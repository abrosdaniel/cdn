/*!
 * Injector.js v1.0.0a
 * (c) 2024-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Инжектор для подключения сторонних скриптов одной строкой
 * Используется для быстрой разработки
 * <script src = 'https://cdn.abros.dev/inj.js'></script>
 * <script type="module" src = 'https://cdn.abros.dev/inj.js'></script>
 */

if (!window.AbrosInj) {
  (function () {
    "use strict";

    /* Подключение плагинов */
    loadScript(`https://cdn.abros.dev/noti/noti.js`); // Noti (Уведомления)
    loadScript(`https://deusnotam.github.io/D3US/d3us.js`); // Настройщик тильды

    function loadScript(src) {
      const script = document.createElement("script");
      script.src = src;
      document.head.appendChild(script);
    }

    window.AbrosInj = true;
  })();
}
