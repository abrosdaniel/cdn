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
          <div style="display: flex; flex-direction: column; align-items: center; width:100vw; height: auto; padding: 10px; margin: 0; background-color: #040404; color: white; font-family: 'Montserrat Alternates', sans-serif;">
              <a href="https://abros.dev" target="_blank">
                  <img src="https://cdn.abros.dev" style="width: 60px;" alt="Logo">
              </a>
              <p style="text-align: center;">D3US System - модификация упрощающая жизнь!<br>Модификация совершенно бесплатна и средства на разработку идут от рекламы, поэтому...</p>
          </div>
        `
    );

    window.AbrosCopyright = true;
  });
}
