/*!
 * Copyright.js v1.0.0a
 * (c) 2023-2024
 * by Daniel Abros
 * Сайт → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Копирайт использования на сайтах
 * <script src = 'https://cdn.abros.dev/copyright.js'></script>
 * <script type="module" src = 'https://cdn.abros.dev/copyright.js'></script>
 */
if (!window.AbrosCopyright) {
  window.AbrosCopyright = true;
  document.addEventListener("DOMContentLoaded", function () {
    document.head.insertAdjacentHTML(
      "beforeend",
      `
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
          .color-transition {
            transition: background-color 1s, color 2s;
          }
        </style>
      `
    );

    const container = document.createElement("div");
    container.style.cssText =
      "width:100vw;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;";

    const link = document.createElement("a");
    link.href = "https://abros.dev";
    link.target = "_blank";
    link.rel = "noopener";
    link.style.cssText =
      "display:flex;flex-wrap:wrap;justify-content:center;width:350px;text-decoration:none;color:white;";

    const title = document.createElement("p");
    title.style.cssText =
      "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small;";
    title.textContent = "ABROS";

    const description = document.createElement("p");
    description.style.cssText =
      "padding: 0 5px;border-radius: 2px;margin:0;font-size:xx-small;text-align:center;";

    const translations = {
      en: "The site or materials on the site are developed by developer Daniel Abros",
      ru: "Сайт или материалы на сайте разработаны разработчиком Daniel Abros",
      es: "El sitio o los materiales en el sitio están desarrollados por el desarrollador Daniel Abros",
      fr: "Le site ou les matériaux sur le site sont développés par le développeur Daniel Abros",
      de: "Die Website oder Materialien auf der Website wurden vom Entwickler Daniel Abros entwickelt",
      pl: "Strona lub materiały na stronie są opracowane przez dewelopera Daniel Abros",
    };

    const userLang = navigator.language || navigator.userLanguage;
    description.textContent = translations[userLang] || translations["en"];
    console.log(
      `%c${translations[userLang] || translations["en"]} | https://abros.dev`,
      "color: white; background-color: #626262; border-radius: 5px; padding: 2px 4px; font-family: 'Montserrat Alternates', sans-serif;"
    );

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
  });
}
