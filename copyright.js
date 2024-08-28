/*!
 * Copyright.js v2.0.6
 * (c) 2023-2024
 * by Daniel Abros
 * Сайт → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Копирайт разработчика
 * Подробная документация по команде: abros.docs
 * <script src="https://cdn.abros.dev/copyright.js"></script>
 * <script type="module" src ="https://cdn.abros.dev/copyright.js"></script>
 */

if (!window.abros) {
  window.abros = {};

  const userLang = (navigator.language || navigator.userLanguage).split("-")[0];
  window.abros.userLang = userLang;

  const a =
    "patZs0xLRQaVH0yJo.6b37088cccb3ce09e6abf49e350c39d5011e0e8f7cb478fa33d47eaa6667e8be";
  const b = "appyM5LkcacbXYVGh";

  const fetchData = async (o) => {
    const r = `https://api.airtable.com/v0/${b}/${o}`;
    const s = await fetch(r, {
      headers: {
        Authorization: `Bearer ${a}`,
      },
    });

    const data = await s.json();
    return data.records.map((record) => record.fields);
  };

  const init = async () => {
    try {
      const settingsData = "Settings";
      const localesData = "Locales";
      const blacklistData = "Blacklist";
      const docsData = "Documentation";
      const [settings, locales, blacklist, docs] = await Promise.all([
        fetchData(settingsData),
        fetchData(localesData),
        fetchData(blacklistData),
        fetchData(docsData),
      ]);
      const hostname = window.location.hostname;
      const site = blacklist.find((site) => site.Hostname.includes(hostname));
      const lang =
        locales.find((locale) => locale.Key === userLang) ||
        locales.find((locale) => locale.Key === "en");
      const text = lang.Text;
      const copyright = site ? site.Copyright : null;
      const script = site ? site.Script : null;
      const message = site ? site.Message : null;

      window.abros = {
        initConsole(message) {
          console.groupCollapsed(
            `%c👨🏻‍💻 Development by ABROS`,
            "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
          );
          console.log(`✨ ${text}`);
          console.log(
            `💻 Site: ${settings.find((s) => s.Param === "url").Key}`
          );
          if (message) console.log(`${message}`);
          console.groupEnd();
        },

        getRandomColor() {
          return `#${Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padEnd(6, "0")}`;
        },

        initScript(src) {
          if (src) {
            const script = document.createElement("script");
            script.src = src;
            document.head.appendChild(script);
          }
        },

        initFooter() {
          const container = document.createElement("div");
          container.style.cssText =
            "width:100vw;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;position: relative;z-index: 99999999999999999;";

          const link = document.createElement("a");
          link.href = settings.find((s) => s.Param === "url").Key;
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
          description.textContent = text;

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
          }, 1000);
        },

        initNotification() {
          this.initScript("https://cdn.abros.dev/noti/noti.js");
          let notification = false;
          setInterval(() => {
            if (!notification) {
              abrosnoti.create("dark", "tip", `${text}`, 0, true, () => {
                window.open(
                  settings.find((s) => s.Param === "url").Key,
                  "_blank"
                );
                notification = false;
              });
              notification = true;
            }
          }, 1000);
        },

        initBanner() {
          const container = document.createElement("div");
          container.style.cssText =
            "width:110px;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;position: fixed;bottom: 50%;left: -100px;z-index: 999999999999999;transform: translateY(50%);border: 1px solid white;border-radius: 0 10px 10px 0;opacity: 0;transition: left 0.5s, opacity 1s;";
          container.onmouseenter = () => {
            container.style.left = "-10px";
          };
          container.onmouseleave = () => {
            container.style.left = "-100px";
          };
          const stick = document.createElement("div");
          stick.style.cssText =
            "height: 90%;width: 4px;position: absolute;right: 6px;border-radius: 50px;overflow: hidden;";

          const stickColor = document.createElement("div");
          stickColor.style.cssText =
            "width: 10px;height: 40px;transform: translate(-50%, -50%);position: absolute;left: 50%;top: 0;transition: background-color 1s, color 2s;mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%);-webkit-mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 30%, rgba(0, 0, 0, 0) 100%);animation: abroscopyright 3s cubic-bezier(0.65, 0, 0.29, 1) infinite alternate;";

          const link = document.createElement("a");
          link.href = settings.find((s) => s.Param === "url").Key;
          link.target = "_blank";
          link.rel = "noopener";
          link.style.cssText =
            "display:flex;flex-wrap:wrap;justify-content:center;width:80px;text-decoration:none;color:white;";

          const title = document.createElement("p");
          title.style.cssText =
            "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small; transition: background-color 1s, color 2s;";
          title.textContent = "ABROS";

          const description = document.createElement("p");
          description.style.cssText =
            "padding: 0 5px;border-radius: 2px;margin:0;font-size:xx-small;text-align:center;";
          description.textContent = text;

          link.appendChild(title);
          link.appendChild(description);
          stick.appendChild(stickColor);
          container.appendChild(link);
          container.appendChild(stick);
          document.documentElement.appendChild(container);

          document.head.insertAdjacentHTML(
            "beforeend",
            `<style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');
                @keyframes abroscopyright {
                  0% { top: 0; }
                  100% { top: 100%; }
                }    
              </style>`
          );

          setInterval(() => {
            title.style.backgroundColor = `${this.getRandomColor()}80`;
            stickColor.style.backgroundColor = `${this.getRandomColor()}80`;
          }, 5000);

          setTimeout(() => {
            container.style.opacity = "1";
          }, 1000);
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
            const speed = {
              x: (Math.random() - 0.5) * 8,
              y: Math.random() * -6,
            };
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

        docs() {
          console.table(docs);
          let currentGroup = null;

          docs.forEach((doc) => {
            const { Key, Title, Text, TitleEN, TextEN, Status } = doc;

            // Проверяем текущий язык пользователя
            const isRussian = window.abros.userLang === "ru";
            const displayTitle = isRussian ? Title : TitleEN;
            const displayText = isRussian ? Text : TextEN;

            // Пропускаем элементы, которые не видны
            if (Status !== "Visible") return;

            // Если ключ начинается с "group-", открываем новую группу
            if (Key.startsWith("group-")) {
              // Закрываем предыдущую группу, если она была открыта
              if (currentGroup) {
                console.groupEnd();
              }

              // Открываем новую группу
              console.group(displayTitle);
              currentGroup = Key; // Устанавливаем текущую группу
            } else if (Key.startsWith("item-")) {
              // Если это элемент с ключом item-, выводим его внутри текущей группы
              if (currentGroup) {
                console.log(`
                ${displayTitle}
                ${displayText}`);
              }
            } else if (Key === "item") {
              // Одиночные элементы без группы
              console.log(`
              ${displayTitle}
              ${displayText}`);
            }
          });

          // Закрываем последнюю группу, если она была открыта
          if (currentGroup) {
            console.groupEnd();
          }
        },
      };
      abros.initConsole(message);
      abros.initCanvas();
      if (script) abros.initScript(script);
      switch (copyright) {
        case "Footer":
          abros.initFooter();
          break;
        case "Notification":
          abros.initNotification();
          break;
        case "Banner":
          abros.initBanner();
          break;
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };
  init();
}
