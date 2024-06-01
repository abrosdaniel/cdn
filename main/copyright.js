/*!
 * Copyright.js v1.0.0a
 * (c) 2023-2024
 * by Daniel Abros
 * Сайт → https://abros.dev
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
                .color-transition {
                  transition: background-color 1s, color 2s;
                }
            </style>
          `
    );

    const container = document.createElement("div");
    container.style.cssText =
      "width:100vw;height:auto;margin:0;padding:10px;display:flex;justify-content:center;align-items:center;background-color:#040404;font-family:'Montserrat Alternates',sans-serif;background-image:radial-gradient(circle at 10px 10px,#fff 0.7px,transparent 1px);background-size:10px 10px;";

    const link = document.createElement("a");
    link.href = "https://abros.dev";
    link.target = "_blank";
    link.rel = "noopener";
    link.style.cssText =
      "display:flex;flex-wrap:wrap;justify-content:center;width:550px;text-decoration:none;color:white;";

    const title = document.createElement("p");
    title.style.cssText =
      "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:x-large;";
    title.textContent = "ABROS";

    const description = document.createElement("p");
    description.style.cssText =
      "padding:0;margin:0;font-size:small;text-align:center;";
    description.textContent =
      "Сайт или материалы на сайте разработаны разработчиком Daniel Abros";

    link.appendChild(title);
    link.appendChild(description);
    container.appendChild(link);
    document.body.appendChild(container);

    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function setRandomColor() {
      const newColor = getRandomColor();
      title.style.backgroundColor = `${newColor}80`;
    }

    function updateColor() {
      title.style.transition = "background-color 1s, color 2s";
      setRandomColor();
      setTimeout(() => {
        title.style.transition = "";
      }, 1000);
    }

    setInterval(updateColor, 5000);

    window.AbrosCopyright = true;
  });
}
