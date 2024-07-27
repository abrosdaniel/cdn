/*!
 * Copyright.js v1.0.9
 * (c) 2023-2024
 * by Daniel Abros
 * Сайт → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Копирайт использования на сайтах
 * <script src="https://cdn.abros.dev/copyright.js"></script>
 * <script type="module" src ="https://cdn.abros.dev/copyright.js"></script>
 */

if (!window.abros) {
  window.abros = {};

  async function fetchData() {
    try {
      const response = await fetch("https://cdn.abros.dev/copyright.json");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function init() {
    const data = await fetchData();
    if (!data) return;

    const translations = data.translations;
    const sites = data.sites;

    const userLang = (navigator.language || navigator.userLanguage).split(
      "-"
    )[0];
    console.log(
      `%c${translations[userLang] || translations.en}`,
      "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
    );

    const hostname = window.location.hostname;
    const params = sites[hostname]?.copyright || {
      type: "banner",
      time: 10,
    };

    window.abros.translations = translations;
    window.abros.userLang = userLang;

    if (params.type === "none") {
      abros.initCanvas();
    } else {
      abros.initCopyright(params);
      abros.initCanvas();
    }
  }

  window.abros = {
    translations: null,
    userLang: null,
    domain: "https://abros.dev",

    initCopyright(params) {
      if (params.type === "footer") {
        this.addFooter(params.time);
      }
      if (params.type === "push") {
        this.addPush(params.time);
      }
      if (params.type === "banner") {
        this.addBanner(params.time);
      }
    },

    addFooter(time) {
      const { translations, userLang, domain } = this;

      const container = document.createElement("div");
      container.style.cssText =
        "width:100vw;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;";

      const link = document.createElement("a");
      link.href = domain;
      link.target = "_blank";
      link.rel = "noopener";
      link.style.cssText =
        "display:flex;flex-wrap:wrap;justify-content:center;width:350px;text-decoration:none;color:white;";

      const title = document.createElement("p");
      title.style.cssText =
        "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small; transition: background-color 1s, color 2s;";
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
        </style>`
      );

      setInterval(() => {
        title.style.backgroundColor = `${this.getRandomColor()}80`;
      }, 5000);

      setTimeout(() => {
        document.documentElement.appendChild(container);
      }, time * 1000);
    },

    addPush(time) {
      const { translations, userLang, domain } = this;

      const script = document.createElement("script");
      script.src = "https://cdn.abros.dev/noti/noti.js";
      document.head.appendChild(script);

      const text = translations[userLang] || translations.en;
      let noti = false;
      setInterval(() => {
        if (!noti) {
          abrosnoti.create("abros", "ABROS", `${text}`, 0, true, () => {
            window.open(domain, "_blank");
            noti = false;
          });
          noti = true;
        }
      }, time * 1000);
    },

    addBanner(time) {
      const { translations, userLang, domain } = this;

      const container = document.createElement("div");
      container.style.cssText =
        "width:110px;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;position: fixed;bottom: 50%;left: -100px;z-index: 999999999999999;transform: translateY(50%);border: 1px solid white;border-radius: 0 10px 10px 0;transition: left 0.5s;";
      container.onmouseenter = () => {
        container.style.left = "-10px";
      };
      container.onmouseleave = () => {
        container.style.left = "-100px";
      };
      const stick = document.createElement("div");
      stick.style.cssText =
        "height: 90%;width: 4px;position: absolute;right: 6px;border-radius: 50px;overflow: hidden;transition: background-color 1s, color 2s;animation: abroscopyright 4s infinite alternate;";
      const link = document.createElement("a");
      link.href = domain;
      link.target = "_blank";
      link.rel = "noopener";
      link.style.cssText =
        "display:flex;flex-wrap:wrap;justify-content:center;width:350px;text-decoration:none;color:white;";

      const title = document.createElement("p");
      title.style.cssText =
        "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small; transition: background-color 1s, color 2s;";
      title.textContent = "ABROS";

      const description = document.createElement("p");
      description.style.cssText =
        "padding: 0 5px;border-radius: 2px;margin:0;font-size:xx-small;text-align:center;";
      description.textContent = translations[userLang] || translations.en;

      link.appendChild(title);
      link.appendChild(description);
      container.appendChild(link);
      container.appendChild(stick);

      document.head.insertAdjacentHTML(
        "beforeend",
        `<style>
          @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
          @keyframes abroscopyright {
            0%, 100% { background: linear-gradient(to top, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%); }
            50% { background: linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 100%); }
          }
        </style>`
      );

      setInterval(() => {
        title.style.backgroundColor = `${this.getRandomColor()}80`;
        stick.style.backgroundColor = `${this.getRandomColor()}80`;
      }, 5000);

      setTimeout(() => {
        document.documentElement.appendChild(container);
      }, time * 1000);
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
      document.addEventListener("keydown", (event) =>
        this.handleKeyDown(event)
      );
    },
  };

  init();
}
