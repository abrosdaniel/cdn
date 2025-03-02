/*!
 * INJ.js v2.0.6
 * (c) 2023-2025
 * by Daniel Abros
 * Сайт → https://abrosdaniel.com
 * Telegram → https://t.me/abrosdaniel
 * <script src="https://cdn.abros.dev/inj.js"></script>
 * <script type="module" src ="https://cdn.abros.dev/inj.js"></script>
 */

if (!window.abros) {
  window.abros = {};

  const fetchData = async (method, table, param, idField) => {
    const publicKey =
      "teable_acccZKbG6Nyeue4E0v4_N+G0YQw/4D18ycxwpdof4fIgesHezrpqWghMaDHbaLQ=";
    const params = {
      search: [param, idField, true],
      cellFormat: "json",
    };
    const url = new URL(`https://base.abros.dev/api/table/${table}/record`);
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          url.searchParams.append(`${key}[]`, item);
        });
      } else {
        url.searchParams.append(key, value);
      }
    });
    const s = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${publicKey}`,
        Accept: "application/json",
      },
    });

    const data = await s.json();
    return data.records.length > 0 ? data.records[0].fields : null;
  };

  const init = async () => {
    try {
      const abrosURL = "https://abrosdaniel.com";
      const host = window.location.host;
      const userLang = navigator.language.split("-")[0];
      const [site, locales] = await Promise.all([
        fetchData("GET", "tblaG88hgMgwDHJpZ0k", host, "fldpU6dsJALKAzID5TV"),
        fetchData(
          "GET",
          "tbl2kFIEpViGktI81tk",
          userLang,
          "fldoBfJMCj6vmpI0uX1"
        ),
      ]);
      console.log(site, locales);
      const text = locales ? locales.text : null;
      const copyright = site ? site.copyright : null;
      const message = site ? site.message : null;
      const script = site ? site.script : null;
      console.log(text, copyright, message, script);

      if (copyright === "yes" || copyright === undefined) {
        console.groupCollapsed(
          `%c👨🏻‍💻 Development by Daniel Abros`,
          "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
        );
        console.log(`✨ ${text}`);
        console.log(`💻 Site: ${abrosURL}`);
        if (message) console.log(`${message}`);
        console.groupEnd();
      }

      window.abros.style = {
        getRandomColor() {
          return `#${Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padEnd(6, "0")}`;
        },
      };

      window.abros.copyright = {
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
          link.href = abrosURL;
          link.target = "_blank";
          link.rel = "noopener";
          link.style.cssText =
            "display:flex;flex-wrap:wrap;justify-content:center;width:350px;text-decoration:none;color:white;";

          const title = document.createElement("p");
          title.style.cssText =
            "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small; transition: background-color 1s, color 2s;";
          title.textContent = "Daniel Abros";

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
            title.style.backgroundColor = `${abros.style.getRandomColor()}80`;
          }, 5000);

          setTimeout(() => {
            document.documentElement.appendChild(container);
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
          link.href = abrosURL;
          link.target = "_blank";
          link.rel = "noopener";
          link.style.cssText =
            "display:flex;flex-wrap:wrap;justify-content:center;width:80px;text-decoration:none;color:white;";

          const title = document.createElement("p");
          title.style.cssText =
            "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small; transition: background-color 1s, color 2s;";
          title.textContent = "Daniel Abros";

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
            title.style.backgroundColor = `${abros.style.getRandomColor()}80`;
            stickColor.style.backgroundColor = `${abros.style.getRandomColor()}80`;
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
      };

      abros.copyright.initCanvas();
      if (script) abros.copyright.initScript(script);
      switch (copyright) {
        case "Footer":
          abros.copyright.initFooter();
          break;
        case "Banner":
          abros.copyright.initBanner();
          break;
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };
  init();
}
