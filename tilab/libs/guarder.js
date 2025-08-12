/*!
 * Guarder.js
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 */

(function () {
  const Guarder = {
    template(options) {
      switch (options.template) {
        case "standart":
          document.body.innerHTML = " ";
          document.body.innerHTML = `
          <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #fff; z-index: 9999; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; font-family: Arial, sans-serif;">
            <h1 style="color: #e74c3c;">Доступ запрещен</h1>
            <p>Действие заблокировано системой защиты Guarder.js</p>
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
              TiLab.console.warn(
                "Guarder.js",
                `Блок "${options.block}" не найден`
              );
            }
          } else {
            TiLab.console.warn("Guarder.js", `Нет параметра "block"`);
          }
          break;
        case "custom":
          if (options.custom) {
            document.body.innerHTML = options.custom;
          } else {
            TiLab.console.warn("Guarder.js", `Нет параметра "custom"`);
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
        const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
        const heightDiff = Math.abs(window.outerHeight - window.innerHeight);

        if (
          (widthDiff > threshold && widthDiff > window.innerWidth * 0.3) ||
          (heightDiff > threshold && heightDiff > window.innerHeight * 0.3)
        ) {
          emitEvent();
        }
      });

      // Метод 2: Проверка наличия DevTools API
      const checkDevToolsAPI = () => {
        try {
          const devToolsDetected =
            (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
              window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers &&
              window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers.size > 0) ||
            (window.Firebug &&
              window.Firebug.chrome &&
              window.Firebug.chrome.isInitialized) ||
            (window.msIsStaticHTML !== undefined &&
              window.msIsStaticHTML.toString().indexOf("native code") === -1);
          if (devToolsDetected && !devtoolsOpen) {
            emitEvent();
          }
        } catch (e) {}
      };

      // Метод 3: Проверка размеров окна при инициализации
      const checkWindowSizeOnInit = () => {
        const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
        const heightDiff = Math.abs(window.outerHeight - window.innerHeight);

        if (
          (widthDiff > threshold && widthDiff > window.innerWidth * 0.3) ||
          (heightDiff > threshold && heightDiff > window.innerHeight * 0.3)
        ) {
          emitEvent();
        }
      };

      // Метод 4: Проверка через console.debug
      const checkConsoleDebug = () => {
        const startTime = new Date();
        console.debug("Guarder.js DevTools Detection");
        const endTime = new Date();
        if (endTime - startTime > 100) {
          emitEvent();
        }
      };

      // Метод 6: Проверка наличия мобильной эмуляции
      const checkMobileEmulation = () => {
        const isMobileEmulated =
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ) &&
          (window.screenX !== 0 || window.screenY !== 0);

        const hasTouchInDesktop =
          ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
          window.innerWidth > 800 &&
          !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.platform
          );

        if ((isMobileEmulated || hasTouchInDesktop) && !devtoolsOpen) {
          emitEvent();
        }
      };

      checkWindowSizeOnInit();
      checkDevToolsAPI();
      checkConsoleDebug();
      checkMobileEmulation();

      const devtoolsCheckInterval = setInterval(() => {
        checkDevToolsAPI();
        checkConsoleDebug();
        checkMobileEmulation();
      }, 3000);

      window.addEventListener("beforeunload", function () {
        clearInterval(devtoolsCheckInterval);
      });
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
          const testName = "guarder_test";
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
      const preventEvent = function (e) {
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
        TiLab.console.warn(
          "Guarder.js",
          `Неверное значение параметра "media": ${options.media}`
        );
        return;
      }

      document.addEventListener(
        "keydown",
        function (e) {
          if ((e.ctrlKey || e.metaKey) && ["x", "s", "a"].includes(e.key)) {
            preventEvent(e);
          }
        },
        true
      );

      let protectedCount = 0;

      const protectElement = function (element) {
        if (!element || !element.nodeType) return;

        try {
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

          events.forEach(function (eventName) {
            element.addEventListener(eventName, preventEvent, true);
          });

          ["touchstart", "touchend", "touchmove"].forEach(function (eventName) {
            element.addEventListener(eventName, preventEvent, {
              passive: false,
              capture: true,
            });
          });

          element.style.webkitUserSelect = "none";
          element.style.userSelect = "none";
          element.style.webkitTouchCallout = "none";
          element.setAttribute("unselectable", "on");

          if (element.tagName === "IMG" || element.tagName === "VIDEO") {
            element.setAttribute("draggable", "false");
          }

          protectedCount++;
        } catch (err) {
          TiLab.console.warn("Guarder.js", `Ошибка при защите элемента`, err);
        }
      };

      selectors.forEach(function (selector) {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(protectElement);
        } catch (err) {
          TiLab.console.warn(
            "Guarder.js",
            `Ошибка при выборе элементов по селектору "${selector}"`,
            err
          );
        }
      });

      // Наблюдаем за изменениями в DOM для защиты новых элементов
      // try {
      //   const observer = new MutationObserver(function (mutations) {
      //     mutations.forEach(function (mutation) {
      //       if (mutation.addedNodes && mutation.addedNodes.length > 0) {
      //         mutation.addedNodes.forEach(function (node) {
      //           // Проверяем, является ли узел элементом
      //           if (node.nodeType === 1) {
      //             // Проверяем, соответствует ли элемент нашим селекторам
      //             if (
      //               selectors.some((selector) => {
      //                 try {
      //                   return node.matches(selector);
      //                 } catch (e) {
      //                   return false;
      //                 }
      //               })
      //             ) {
      //               protectElement(node);
      //             }

      //             // Проверяем дочерние элементы
      //             selectors.forEach(function (selector) {
      //               try {
      //                 const childElements = node.querySelectorAll(selector);
      //                 childElements.forEach(protectElement);
      //               } catch (e) {
      //                 // Игнорируем ошибки
      //               }
      //             });
      //           }
      //         });
      //       }
      //     });
      //   });

      //   // Начинаем наблюдение за изменениями в DOM
      //   observer.observe(document.body, {
      //     childList: true,
      //     subtree: true,
      //   });
      // } catch (err) {
      //   TiLab.console.warn(
      //     "Guarder.js",
      //     `Ошибка при настройке MutationObserver: ${err.message}`
      //   );
      // }
      TiLab.console.info(
        "Guarder.js",
        `Защита применена к ${protectedCount} элементам`
      );
    },
  };

  function shield(options) {
    options = options || {};
    options.devtools = options.devtools || false;
    options.frame = options.frame || false;
    options.media = options.media || false;
    options.template = options.template || "standart";

    if (options.devtools) {
      Guarder.devtools(options);
    }
    if (options.frame) {
      Guarder.frame(options);
    }
    if (options.media) {
      Guarder.media(options);
    }
  }

  if (window.TiLabExport) {
    window.TiLabExport({
      name: "Guarder.js",
      desc: "Библиотека для защиты сайта от копирования.",
      exports: {
        shield,
      },
    });
  }
})();
