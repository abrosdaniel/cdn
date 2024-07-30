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

  const fetchData = async () => {
    try {
      const response = await fetch("https://cdn.abros.dev/copyright.json");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const init = async () => {
    const data = await fetchData();
    if (!data) return;

    const { translations, sites } = data;
    const userLang = (navigator.language || navigator.userLanguage).split(
      "-"
    )[0];
    console.log(
      `%c${translations[userLang] || translations.en}`,
      "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
    );

    const hostname = window.location.hostname;
    const params = sites[hostname]?.copyright || {
      type: "footer",
      time: 10,
      script: "none",
    };

    window.abros.translations = translations;
    window.abros.userLang = userLang;

    if (params.script !== "none") abros.loadScript(params.script);

    if (params.type !== "none") abros.initCopyright(params);

    abros.initCanvas();
  };

  window.abros = {
    translations: null,
    userLang: null,
    domain: "https://abros.dev",

    initCopyright(params) {
      switch (params.type) {
        case "footer":
          this.addFooter(params.time);
          break;
        case "push":
          this.addPush(params.time);
          break;
        case "banner":
          this.addBanner(params.time);
          break;
      }
    },

    addFooter(time) {
      const { translations, userLang, domain } = this;
      const container = this.createContainer();
      const link = this.createLink(domain);

      const title = this.createTitle();
      const description = this.createDescription(
        translations[userLang] || translations.en
      );

      link.append(title, description);
      container.appendChild(link);

      document.head.insertAdjacentHTML("beforeend", this.getGoogleFont());
      setInterval(
        () => (title.style.backgroundColor = `${this.getRandomColor()}80`),
        5000
      );
      setTimeout(
        () => document.documentElement.appendChild(container),
        time * 1000
      );
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
          abrosnoti.create("abros", "ABROS", text, 0, true, () => {
            window.open(domain, "_blank");
            noti = false;
          });
          noti = true;
        }
      }, time * 1000);
    },

    addBanner(time) {
      const { translations, userLang, domain } = this;

      const container = this.createBannerContainer();
      const link = this.createLink(domain);
      const title = this.createTitle();
      const description = this.createDescription(
        translations[userLang] || translations.en
      );
      const stick = this.createStick();

      link.append(title, description);
      container.append(link, stick);

      document.documentElement.appendChild(container);
      document.head.insertAdjacentHTML(
        "beforeend",
        this.getGoogleFont() + this.getBannerKeyframes()
      );

      setInterval(() => {
        title.style.backgroundColor = `${this.getRandomColor()}80`;
        stick.firstChild.style.backgroundColor = `${this.getRandomColor()}80`;
      }, 5000);

      setTimeout(() => (container.style.opacity = "1"), time * 1000);
    },

    initCanvas() {
      let canvas;
      let ctx;
      let particles = [];
      let animationStarted = false;
      const image = new Image();
      image.src = "https://cdn.abros.dev/abros.svg";
      let pressedKeys = "";

      const createCanvas = () => {
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

      const createParticle = () => {
        const x = Math.random() * canvas.width;
        const y = canvas.height;
        const speed = { x: (Math.random() - 0.5) * 8, y: Math.random() * -6 };
        const size = Math.random() * 30 + 20;
        return { x, y, speed, size };
      };

      const launchFirework = () => {
        animationStarted = true;
        for (let i = 0; i < 100; i++) particles.push(createParticle());
        animateFirework();
      };

      const animateFirework = () => {
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
          if (particle.size <= 0 || particle.y > canvas.height)
            particles.splice(index, 1);
        });
        if (particles.length > 0) requestAnimationFrame(animateFirework);
        else animationStarted = false;
      };

      const handleKeyDown = (event) => {
        pressedKeys += event.key.toUpperCase();
        if (pressedKeys.includes("ABROS") && !animationStarted) {
          if (!canvas) createCanvas();
          launchFirework();
          pressedKeys = "";
        }
      };

      document.addEventListener("keydown", handleKeyDown);
    },

    getRandomColor() {
      return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, "0")}`;
    },

    loadScript(src) {
      const script = document.createElement("script");
      script.src = src;
      document.head.appendChild(script);
    },

    createContainer() {
      const container = document.createElement("div");
      container.style.cssText =
        "width:100vw;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;";
      return container;
    },

    createLink(domain) {
      const link = document.createElement("a");
      link.href = domain;
      link.target = "_blank";
      link.rel = "noopener";
      link.style.cssText =
        "display:flex;flex-wrap:wrap;justify-content:center;width:350px;text-decoration:none;color:white;";
      return link;
    },

    createTitle() {
      const title = document.createElement("p");
      title.style.cssText =
        "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small; transition: background-color 1s, color 2s;";
      title.textContent = "ABROS";
      return title;
    },

    createDescription(text) {
      const description = document.createElement("p");
      description.style.cssText =
        "padding: 0 5px;border-radius: 2px;margin:0;font-size:xx-small;text-align:center;";
      description.textContent = text;
      return description;
    },

    createBannerContainer() {
      const container = document.createElement("div");
      container.style.cssText =
        "width:110px;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;position: fixed;bottom: 50%;left: -100px;z-index: 999999999999999;transform: translateY(50%);border: 1px solid white;border-radius: 0 10px 10px 0;opacity: 0;transition: left 0.5s, opacity 1s;";
      container.onmouseenter = () => (container.style.left = "-10px");
      container.onmouseleave = () => (container.style.left = "-100px");
      return container;
    },

    createStick() {
      const stick = document.createElement("div");
      stick.style.cssText =
        "height: 90%;width: 4px;position: absolute;right: 6px;border-radius: 50px;overflow: hidden;";
      const stickColor = document.createElement("div");
      stickColor.style.cssText =
        "width: 10px;height: 40px;transform: translate(-50%, -50%);position: absolute;left: 50%;top: 0;transition: background-color 1s, color 2s;mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%);-webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%);animation: abroscopyright 3s cubic-bezier(0.65, 0, 0.29, 1) infinite alternate;";
      stick.appendChild(stickColor);
      return stick;
    },

    getGoogleFont() {
      return `<style>@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');</style>`;
    },

    getBannerKeyframes() {
      return `<style>@keyframes abroscopyright { 0% { top: 0; } 100% { top: 100%; } }</style>`;
    },
  };

  init();
}
