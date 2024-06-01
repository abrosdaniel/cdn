/*!
 * Copyright.js v1.0.0a
 * (c) 2023-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Копирайт использования на сайтах
 * <script src = 'https://cdn.abros.dev/main/copyright.js'></script>
 * <script type="module" src = 'https://cdn.abros.dev/main/copyright.js'></script>
 */

if (!window.AbrosCopyright) {
  document.addEventListener("DOMContentLoaded", function () {
    "use strict";

    document.head.insertAdjacentHTML(
      "beforeend",
      `
          <style>
              @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          </style>
        `
    );

    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div style=": ;nter;width:100vw;heigh;x;height: auto;margin: 0;padding: 0;display: flex;justify-content: center;background-color: #040404;font-family: 'Montserrat Alternates', sans-serif;background-image: radial-gradient(circle at 10px 10px, #fff 0.7px, transparent 1px);background-size: 10px 10px;">
        <a href="https://abros.dev" target="_blank" rel="noopener" style="display: flex;flex-wrap: wrap;justify-content: center;width: 550px;text-decoration: none;color: white;">
            <p style="transition: background-color 1s, color 2s;padding: 0;margin: 0;font-size: x-large;">ABROS</p>
            <p style="padding: 0;margin: 0;font-size: small;text-align: center;">Сайт или материалы на сайте разработанны разработчиком Daniel Abros</p>
        </a>
      </div>
      `
    );

    window.AbrosCopyright = true;
  });
}
