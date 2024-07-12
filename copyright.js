/*!
 * Copyright.js v1.0.0a
 * (c) 2023-2024
 * by Daniel Abros
 * Сайт → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Копирайт использования на сайтах
 * <script src="https://cdn.abros.dev/copyright.js"></script>
 * <script type="module" src ="https://cdn.abros.dev/copyright.js"></script>
 */
if (!window.AbrosCopyright) {
  window.AbrosCopyright = true;

  const data = {
    "abros.tilda.ws": { type: "banner", time: 50 }, // Test
    "contract-fpobeda.ru": "none", // Fpobeda
    "signatureprodesign.com": "none", // Signature Pro
    "signaturepro.design": "none", // Signature Pro
    "signatureprodesign.co.tilda.ws": "none", // Signature Pro
    "writetightc.tilda.ws": "none", // Write Tight C
    "onetwosign.ru": "none", // One Two Sign
    "triggerstudio.ru": "none", // Trigger Studio
    "writetightcourse.ru": "none", // Write Tight Course
    "woman.writetight.ru": "none", // Write Tight Woman
    "writetight.tilda.ws": "none", // Write Tight
    "signatureprocourse.com": "none", // Signature Pro Course
    "macfree-verify.co": "none", // MacFree
  };

  const translations = {
    en: "The site or materials on the site are developed by developer Daniel Abros | https://abros.dev",
    ru: "Сайт или материалы на сайте разработаны разработчиком Daniel Abros | https://abros.dev",
    es: "El sitio o los materiales en el sitio están desarrollados por el desarrollador Daniel Abros | https://abros.dev",
    fr: "Le site ou les matériaux sur le site sont développés par le développeur Daniel Abros | https://abros.dev",
    de: "Die Website oder Materialien auf der Website wurden vom Entwickler Daniel Abros entwickelt | https://abros.dev",
    pl: "Strona lub materiały na stronie są opracowane przez dewelopera Daniel Abros | https://abros.dev",
  };

  const userLang = navigator.language || navigator.userLanguage;
  console.log(
    `%c${translations[userLang] || translations["en"]}`,
    "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
  );

  document.addEventListener("DOMContentLoaded", function () {
    const hostname = window.location.hostname;
    const params = data[hostname] || { type: "banner", time: 10 };
    if (params === "none") {
      initCanvas();
    } else {
      initCopyright({ type: params.type, time: params.time });
      initCanvas();
    }
  });

  function initCopyright(params) {
    if (params.type === "banner") {
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
      setTimeout(() => {}, 5000);

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
        "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small;font-family:'Montserrat Alternates',sans-serif;";
      title.textContent = "ABROS";

      const description = document.createElement("p");
      description.style.cssText =
        "padding: 0 5px;border-radius: 2px;margin:0;font-size:xx-small;text-align:center;font-family:'Montserrat Alternates',sans-serif;";

      description.textContent = translations[userLang] || translations["en"];

      link.appendChild(title);
      link.appendChild(description);
      container.appendChild(link);

      setTimeout(function () {
        document.documentElement.appendChild(container);
      }, params.time * 100);
    } else if (params.type === "push") {
      const script = document.createElement("script");
      script.src = `https://cdn.abros.dev/noti/noti.js`;
      document.head.appendChild(script);

      const text = translations[userLang] || translations["en"];

      setTimeout(function () {
        abrosnoti.create("abros", "ABROS", `${text}`, 0, true, () =>
          window.open("https://abros.dev", "_blank")
        );
      }, params.time * 100);
    } else {
      return null;
    }
  }

  function initCanvas() {
    const styleFire = document.createElement("style");
    styleFire.textContent = `
.abrosFire {
  position: absolute;
  width: 20px;
  height: 20px;
  background-image: url('https://cdn.abros.dev/abros.svg');
  background-size: cover;
  pointer-events: none;
  animation: abrosfirework 2s linear forwards;
}
@keyframes abrosfirework {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh) scale(0);
  }
}
`;
    document.head.appendChild(styleFire);

    document.addEventListener("DOMContentLoaded", function () {
      let pressedKeys = "";
      let animationStarted = false;

      document.addEventListener("keydown", handleKeyDown);

      function handleKeyDown(event) {
        const keyPressed = event.key.toUpperCase();
        pressedKeys += keyPressed;

        if (pressedKeys.includes("ABROS") && !animationStarted) {
          launchFirework();
          pressedKeys = "";
        }
      }

      function launchFirework() {
        animationStarted = true;
        for (let i = 0; i < 100; i++) {
          const particle = createParticle();
          document.body.appendChild(particle);
          setTimeout(() => {
            particle.remove();
          }, 2000);
        }
        animationStarted = false;
      }

      function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("abrosFire");
        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.top = window.innerHeight + "px";
        particle.style.animationDelay = Math.random() * 0.5 + "s";
        return particle;
      }
    });
  }
}
