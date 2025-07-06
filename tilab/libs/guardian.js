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
        // debugger;
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
      // Проверяем значение options.media
      if (!options.media) {
        TiLab.debug.warn("Guardian.js", "Параметр media не указан");
        return;
      }

      // Функция для предотвращения событий
      const preventEvent = function (e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      };

      // Определяем селекторы для защиты
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
        TiLab.debug.warn(
          "Guardian.js",
          `Неверное значение параметра "media": ${options.media}`
        );
        return;
      }

      // Логируем начало процесса
      TiLab.debug.info(
        "Guardian.js",
        "Начало применения защиты медиа-контента"
      );

      // Защита от контекстного меню для всей страницы
      document.addEventListener("contextmenu", preventEvent, true);

      // Защита от копирования для всей страницы
      document.addEventListener("copy", preventEvent, true);
      document.addEventListener("cut", preventEvent, true);

      // Защита от горячих клавиш
      document.addEventListener(
        "keydown",
        function (e) {
          if (
            (e.ctrlKey || e.metaKey) &&
            ["c", "x", "s", "a"].includes(e.key)
          ) {
            preventEvent(e);
          }
        },
        true
      );

      // Отключаем выделение текста на странице
      document.body.style.webkitUserSelect = "none";
      document.body.style.userSelect = "none";
      document.body.style.webkitTouchCallout = "none";

      // Счетчик для отслеживания прогресса
      let protectedCount = 0;

      // Функция для применения защиты к элементу
      const protectElement = function (element) {
        if (!element || !element.nodeType) return;

        try {
          // Основные события для блокировки
          const events = [
            "contextmenu",
            "dragstart",
            "drag",
            "dragend",
            "dragover",
            "dragenter",
            "drop",
            "selectstart",
            "mousedown",
            "mouseup",
            "copy",
            "cut",
          ];

          // Блокируем все события
          events.forEach(function (eventName) {
            element.addEventListener(eventName, preventEvent, true);
          });

          // Блокируем события касания для мобильных устройств
          ["touchstart", "touchend", "touchmove"].forEach(function (eventName) {
            element.addEventListener(eventName, preventEvent, {
              passive: false,
              capture: true,
            });
          });

          // Применяем CSS защиту
          element.style.webkitUserSelect = "none";
          element.style.userSelect = "none";
          element.style.webkitTouchCallout = "none";
          element.setAttribute("unselectable", "on");

          // Для изображений и видео добавляем дополнительную защиту
          if (element.tagName === "IMG" || element.tagName === "VIDEO") {
            // Отключаем перетаскивание
            element.setAttribute("draggable", "false");
            element.style.pointerEvents = "none";

            // Добавляем защитный слой поверх элемента
            const parent = element.parentNode;

            // Проверяем, есть ли уже защитный слой
            const existingOverlay = parent.querySelector(".guardian-overlay");
            if (!existingOverlay) {
              // Проверяем позиционирование родителя
              const parentStyle = window.getComputedStyle(parent);
              if (parentStyle.position === "static") {
                parent.style.position = "relative";
              }

              // Создаем защитный слой
              const overlay = document.createElement("div");
              overlay.className = "guardian-overlay";
              overlay.style.position = "absolute";
              overlay.style.top = "0";
              overlay.style.left = "0";
              overlay.style.width = "100%";
              overlay.style.height = "100%";
              overlay.style.zIndex = "1";
              overlay.style.cursor = "default";

              // Блокируем события на защитном слое
              events.forEach(function (eventName) {
                overlay.addEventListener(eventName, preventEvent, true);
              });

              // Добавляем слой в DOM
              parent.appendChild(overlay);
            }
          }

          protectedCount++;
        } catch (err) {
          TiLab.debug.warn(
            "Guardian.js",
            `Ошибка при защите элемента: ${err.message}`
          );
        }
      };

      // Применяем защиту к существующим элементам
      selectors.forEach(function (selector) {
        try {
          const elements = document.querySelectorAll(selector);
          TiLab.debug.info(
            "Guardian.js",
            `Найдено ${elements.length} элементов по селектору "${selector}"`
          );

          elements.forEach(protectElement);
        } catch (err) {
          TiLab.debug.warn(
            "Guardian.js",
            `Ошибка при выборе элементов по селектору "${selector}": ${err.message}`
          );
        }
      });

      // Наблюдаем за изменениями в DOM для защиты новых элементов
      try {
        const observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (mutation) {
            if (mutation.addedNodes && mutation.addedNodes.length > 0) {
              mutation.addedNodes.forEach(function (node) {
                // Проверяем, является ли узел элементом
                if (node.nodeType === 1) {
                  // Проверяем, соответствует ли элемент нашим селекторам
                  if (
                    selectors.some((selector) => {
                      try {
                        return node.matches(selector);
                      } catch (e) {
                        return false;
                      }
                    })
                  ) {
                    protectElement(node);
                  }

                  // Проверяем дочерние элементы
                  selectors.forEach(function (selector) {
                    try {
                      const childElements = node.querySelectorAll(selector);
                      childElements.forEach(protectElement);
                    } catch (e) {
                      // Игнорируем ошибки
                    }
                  });
                }
              });
            }
          });
        });

        // Начинаем наблюдение за изменениями в DOM
        observer.observe(document.body, {
          childList: true,
          subtree: true,
        });
      } catch (err) {
        TiLab.debug.warn(
          "Guardian.js",
          `Ошибка при настройке MutationObserver: ${err.message}`
        );
      }
      TiLab.debug.info(
        "Guardian.js",
        `Защита применена к ${protectedCount} элементам`
      );
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
