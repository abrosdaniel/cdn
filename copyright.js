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
    "abros.tilda.ws": { type: "banner", time: 50 },
    "contract-fpobeda.ru": "none",
    "signatureprodesign.com": "none",
    "signaturepro.design": "none",
    "signatureprodesign.co.tilda.ws": "none",
    "writetightc.tilda.ws": "none",
    "onetwosign.ru": "none",
    "triggerstudio.ru": "none",
    "writetightcourse.ru": "none",
    "woman.writetight.ru": "none",
    "writetight.tilda.ws": "none",
    "signatureprocourse.com": "none",
    "macfree-verify.co": "none",
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
    `%c${translations[userLang] || translations.en}`,
    "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
  );

  document.addEventListener("DOMContentLoaded", () => {
    const hostname = window.location.hostname;
    const params = data[hostname] || { type: "banner", time: 10 };
    if (params === "none") {
      abros.initCanvas();
    } else {
      abros.initCopyright(params);
      abros.initCanvas();
    }
  });

  window.abros = {
    initCopyright(params) {
      if (params.type === "banner") {
        this.addBanner(params.time);
      }
      if (params.type === "push") {
        this.addPushNotification(params.time);
      }
    },

    addBanner(time) {
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
      description.textContent = translations[userLang] || translations.en;

      link.appendChild(title);
      link.appendChild(description);
      container.appendChild(link);

      document.head.insertAdjacentHTML(
        "beforeend",
        `<style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
          .color-transition { transition: background-color 1s, color 2s; }
        </style>`
      );

      setInterval(() => {
        title.style.backgroundColor = `${this.getRandomColor()}80`;
      }, 5000);

      setTimeout(() => {
        document.documentElement.appendChild(container);
      }, time * 100);
    },

    addPushNotification(time) {
      const script = document.createElement("script");
      script.src = "https://cdn.abros.dev/noti/noti.js";
      document.head.appendChild(script);

      const text = translations[userLang] || translations.en;
      setTimeout(() => {
        abrosnoti.create("abros", "ABROS", `${text}`, 0, true, () =>
          window.open("https://abros.dev", "_blank")
        );
      }, time * 100);
    },

    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },

    initCanvas() {
      let canvas;
      let ctx;
      let particles = [];
      let animationStarted = false;
      const image = new Image();
      image.src = "https://cdn.abros.dev/abros.svg";

      document.addEventListener("keydown", this.handleKeyDown);
      let pressedKeys = "";

      this.handleKeyDown = (event) => {
        const keyPressed = event.key.toUpperCase();
        pressedKeys += keyPressed;

        // Проверяем последовательность
        if (pressedKeys.includes("ABROS") && !animationStarted) {
          if (!canvas) {
            this.createCanvas();
          }
          this.launchFirework();
          pressedKeys = "";
        }
      };

      this.createCanvas = () => {
        canvas = document.createElement("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "999999999";
        document.documentElement.appendChild(canvas);
        ctx = canvas.getContext("2d");
      };

      this.launchFirework = () => {
        animationStarted = true;
        for (let i = 0; i < 100; i++) {
          particles.push(this.createParticle());
        }
        this.animateFirework();
      };

      this.createParticle = () => {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const speed = { x: (Math.random() - 0.5) * 8, y: Math.random() * -6 };
        const size = Math.random() * 30 + 20;
        return { x, y, speed, size };
      };

      this.animateFirework = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
          particle.x += particle.speed.x;
          particle.y += particle.speed.y;
          particle.size -= 0.1;
          ctx.drawImage(
            image,
            particle.x,
            particle.y,
            particle.size,
            particle.size
          );
          if (particle.size <= 0 || particle.y > canvas.height) {
            particles.splice(index, 1);
          }
        });
        if (particles.length > 0) {
          requestAnimationFrame(this.animateFirework);
        } else {
          animationStarted = false;
        }
      };
    },
  };
}
