/*!
 * Guardian.js
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * TiLab.lib('guardian');
 */

(function () {
  const Guardian = {
    template(options) {
      switch (options.template) {
        case "standart":
          document.body.innerHTML = " ";
          document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 9999; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: Arial, sans-serif;">
            <h1 style="color: #e74c3c;">Доступ запрещен</h1>
            <p>Действие заблокировано системой защиты Guardian.js</p>
          </div>
        `;
          break;
        case "block":
          if (options.block) {
            if (document.querySelector(options.block)) {
              const allrecords = document.querySelector("#allrecords");
              const block = allrecords.querySelector(options.block);
              const clone = block.cloneNode(true);
              allrecords.innerHTML = "";
              allrecords.appendChild(clone);
            } else {
              TiLab.debug.warn(
                "Guardian.js",
                `Блок "${options.block}" не найден`
              );
            }
          } else {
            TiLab.debug.warn("Guardian.js", `Нет параметра "block"`);
          }
          break;
        case "custom":
          if (options.custom) {
            document.body.innerHTML = options.custom;
          } else {
            TiLab.debug.warn("Guardian.js", `Нет параметра "custom"`);
          }
          break;
      }
    },
    devtools(options) {
      let devtoolsOpen = false;
      const threshold = 160;
      const emitEvent = () => {
        if (!devtoolsOpen) {
          devtoolsOpen = true;
          this.template(options);
        }
      };
      // Метод 1: Отслеживание размера окна
      window.addEventListener("resize", function () {
        if (
          Math.abs(window.outerWidth - window.innerWidth) > threshold ||
          Math.abs(window.outerHeight - window.innerHeight) > threshold
        ) {
          emitEvent();
        }
      });
      // Метод 2: Отслеживание через console.log
      const originalLog = console.log;
      console.log = function () {
        if (options.devtools && !devtoolsOpen) {
          emitEvent();
        }
        originalLog.apply(console, arguments);
      };
      // Метод 3: Отслеживание через debugger
      setInterval(function () {
        const startTime = new Date();
        debugger;
        if (options.devtools && new Date() - startTime > 100) {
          emitEvent();
        }
      }, 1000);
    },
    frame(options) {
      const emitEvent = () => {
        this.template(options);
      };

      try {
        if (window.self !== window.top) {
          emitEvent();
        }
      } catch (e) {
        emitEvent();
      }

      const checkUserAgent = () => {
        const ua = navigator.userAgent.toLowerCase();
        const suspiciousAgents = [
          "wget",
          "httrack",
          "webcopier",
          "webripper",
          "webreaper",
          "teleport",
          "webzip",
          "scraper",
          "crawler",
          "spider",
          "bot",
          "archiver",
        ];
        for (let agent of suspiciousAgents) {
          if (ua.indexOf(agent) !== -1) {
            return true;
          }
        }
        return false;
      };

      const checkBrowserFeatures = () => {
        const requiredFeatures = [
          "localStorage" in window,
          "sessionStorage" in window,
          "navigator.cookieEnabled",
          "window.history",
          "window.requestAnimationFrame",
          "window.matchMedia",
        ];
        const missingFeatures = requiredFeatures.filter(
          (feature) => !feature
        ).length;
        return missingFeatures > 2;
      };

      const checkReferrer = () => {
        return document.referrer === "";
      };

      const checkCookies = () => {
        if (navigator.cookieEnabled) {
          const testName = "guardian_test";
          document.cookie = `${testName}=1; path=/`;
          const hasCookie = document.cookie.indexOf(testName) !== -1;
          document.cookie = `${testName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
          return !hasCookie;
        }
        return true;
      };

      if (
        checkUserAgent() ||
        checkBrowserFeatures() ||
        (checkReferrer() && checkCookies())
      ) {
        emitEvent();
      }
    },
    media(options) {
      const preventEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      let selectors = [];

      if (options.media === "all") {
        selectors = [
          "img",
          "svg",
          ".t-img",
          ".t-bgimg",
          "video",
          "audio",
          "picture",
          "canvas",
          "iframe",
        ];
      } else if (Array.isArray(options.media)) {
        selectors = options.media;
      } else {
        TiLab.debug.warn("Guardian.js", `Неверное значение параметра "media"`);
        return;
      }

      const applyProtection = (element) => {
        if (!element) return;

        ["contextmenu", "dragstart", "drop", "selectstart"].forEach((event) => {
          element.addEventListener(event, preventEvent, { passive: false });
        });

        ["touchstart", "touchend", "touchmove"].forEach((event) => {
          element.addEventListener(event, preventEvent, { passive: false });
        });

        Object.assign(element.style, {
          webkitUserSelect: "none",
          userSelect: "none",
          webkitTouchCallout: "none",
          pointerEvents: "auto",
        });

        if (["img", "video"].includes(element.tagName.toLowerCase())) {
          element.setAttribute("draggable", "false");
          element.style.pointerEvents = "none";

          const parent = element.parentNode;
          const computedStyle = window.getComputedStyle(parent);

          if (!["relative", "absolute"].includes(computedStyle.position)) {
            parent.style.position = "relative";
          }

          const overlay = document.createElement("div");
          Object.assign(overlay.style, {
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            zIndex: "1",
          });

          parent.appendChild(overlay);
        }
      };

      selectors.forEach((selector) => {
        try {
          document.querySelectorAll(selector).forEach(applyProtection);
        } catch (error) {
          TiLab.debug.warn(
            "Guardian.js",
            `Ошибка при защите элемента ${selector}:`,
            error
          );
        }
      });

      document.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && ["c", "x", "s"].includes(e.key)) {
          preventEvent(e);
        }
      });

      document.body.style.webkitUserSelect = "none";
      document.body.style.userSelect = "none";
    },
  };

  function protect(options) {
    options = options || {};
    options.devtools = options.devtools || false;
    options.frame = options.frame || false;
    options.media = options.media || false;
    options.template = options.template || "standart";

    if (options.devtools) {
      Guardian.devtools(options);
    }
    if (options.frame) {
      Guardian.frame(options);
    }
    if (options.media) {
      Guardian.media(options);
    }
  }

  if (window.TiLab && window.TiLab.libs) {
    window.TiLab.libs["guardian"] = window.TiLab.libs["guardian"] || {};
    window.TiLab.libs["guardian"].version = "0.1";
    window.TiLab.libs["guardian"].description =
      "Утилита для защиты сайта от копирования контента";
    window.TiLab.libs["guardian"].exports = {
      protect: protect,
    };
    TiLab.debug.info("Guardian.js", "Библиотека успешно иницифлизирована.");
  }
})();
