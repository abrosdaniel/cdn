/*!
 * TiLab.js v0.1a
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * <script src="https://cdn.abros.dev/tilab/tilab.js"></script>
 */

(function (window) {
  if (window.TiLab === undefined) {
    window.TiLab = {
      version: "0.1 (alpha)",
      copyright: "© 2025 Daniel Abros",
      site: "https://abros.dev",
      libs: {},
      console: {
        storage: [],
      },
    };
  }

  ["log", "info", "trace", "warn", "error"].forEach(function (type) {
    window.TiLab.console[type] = function (name, message, data) {
      window.TiLab.console.storage.push({
        time: new Date().toLocaleString(),
        type: type,
        name: name,
        message: message,
        data: data,
      });

      if (data !== undefined) {
        console[type](`[ ${name} ]\n${message}`, data);
      } else {
        console[type](`[ ${name} ]\n${message}`);
      }
    };
  });

  function loadScript(src, async = true) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = async;
      script.onload = () => {
        resolve(src);
      };
      script.onerror = () => {
        reject(new Error(`Не удалось загрузить скрипт: ${src}`));
      };
      document.head.appendChild(script);
    });
  }

  const CDN = "https://cdn.abros.dev";
  const urlParams = new URLSearchParams(window.location.search);

  switch (urlParams.get("tilab")) {
    case "":
      loadScript(`${CDN}/tilab/services/panel.js`);
      break;
  }

  /**
   * Загрузка библиотеки
   * @param {string} libName - Имя библиотеки
   * @param {Object} options - Параметры загрузки
   * @param {...*} args - Аргументы для передачи методу библиотеки
   * @returns {Promise} - Промис, который разрешается после загрузки всех библиотек
   */
  window.TiLab.init = function (libs, options = {}, ...args) {
    const libsArray = Array.isArray(libs) ? libs : [libs];
    const loadPromises = [];
    const isAsync = options.async !== undefined ? options.async : true;

    if (libsArray.length === 1 && typeof libsArray[0] === "string") {
      const libName = libsArray[0];

      if (window.TiLab.libs[libName] && window.TiLab.libs[libName].loaded) {
        if (window.TiLab.libs[libName].exports) {
          const exports = window.TiLab.libs[libName].exports;
          const exportKeys = Object.keys(exports);
          if (exportKeys.length === 1) {
            return Promise.resolve(exports[exportKeys[0]]);
          }
          return Promise.resolve(exports);
        }
        return Promise.resolve();
      }

      const libPath = `${CDN}/tilab/libs/${libName}.js`;

      return loadScript(libPath, isAsync)
        .then(() => {
          window.TiLab.libs[libName] = window.TiLab.libs[libName] || {
            loaded: true,
            timestamp: new Date().getTime(),
            async: isAsync,
          };

          TiLab.console.log("TiLab", `Загружена библиотека ${libName}`);

          if (window.TiLab.libs[libName].exports) {
            const exports = window.TiLab.libs[libName].exports;
            const exportKeys = Object.keys(exports);

            if (exportKeys.length === 1) {
              return exports[exportKeys[0]];
            }

            return exports;
          }
        })
        .catch((error) => {
          TiLab.console.error(
            "TiLab",
            `Ошибка загрузки библиотеки ${libName}:`,
            error
          );
          window.TiLab.libs[libName] = {
            loaded: false,
            error: error.message,
            timestamp: new Date().getTime(),
          };

          throw error;
        });
    }

    libsArray.forEach((libName) => {
      if (typeof libName === "string") {
        if (window.TiLab.libs[libName]) {
          return;
        }

        const libPath = `${CDN}/tilab/libs/${libName}.js`;

        const loadPromise = loadScript(libPath, isAsync)
          .then(() => {
            window.TiLab.libs[libName] = {
              loaded: true,
              timestamp: new Date().getTime(),
              async: isAsync,
            };

            TiLab.console.log("TiLab", `Загружена библиотека ${libName}`);
          })
          .catch((error) => {
            TiLab.console.error(
              "TiLab",
              `Ошибка загрузки библиотеки ${libName}:`,
              error
            );
            window.TiLab.libs[libName] = {
              loaded: false,
              error: error.message,
              timestamp: new Date().getTime(),
            };

            throw error;
          });

        loadPromises.push(loadPromise);
      }
    });

    return Promise.all(loadPromises);
  };

  window.tlc = (function () {
    const components = new Map();
    const dependencies = new Map();
    const sharedData = new Map();
    const urlCache = new Map();
    let activeComponent = null;

    function createProxy(obj, path = "") {
      if (obj === null || typeof obj !== "object") return obj;

      return new Proxy(obj, {
        get: (target, prop) => {
          if (
            prop === Symbol.toPrimitive ||
            prop === "toString" ||
            prop === "valueOf"
          ) {
            return () => String(target);
          }

          const value = target[prop];
          const currentPath = path ? `${path}.${prop}` : prop;

          if (activeComponent) {
            if (!dependencies.has(currentPath)) {
              dependencies.set(currentPath, new Set());
            }
            dependencies.get(currentPath).add(activeComponent);
          }

          if (value !== null && typeof value === "object") {
            return createProxy(value, currentPath);
          }
          return value;
        },
        set: (target, prop, value) => {
          target[prop] = value;

          const fullPath = path ? `${path}.${prop}` : prop;

          if (dependencies.has(fullPath)) {
            const affectedComponents = dependencies.get(fullPath);
            affectedComponents.forEach((componentId) => {
              if (components.has(componentId)) {
                const component = components.get(componentId);
                renderComponent(
                  component.target,
                  component.render,
                  componentId
                );
              }
            });
          }

          return true;
        },
      });
    }

    function fetchData(url, interval = null) {
      const fetchAndCache = () => {
        return fetch(url)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const proxiedData = createProxy(data);
            urlCache.set(url, { data: proxiedData, timestamp: Date.now() });
            return proxiedData;
          })
          .catch((error) => {
            TiLab.console.error(
              `TiLab(get)`,
              `Ошибка при загрузке данных с ${url}:`,
              error
            );
            return null;
          });
      };

      // Если указан интервал обновления
      if (interval && interval > 0) {
        if (!urlCache.has(url)) {
          fetchAndCache(); // Первая загрузка
        }

        // Настройка периодического обновления
        const intervalId = setInterval(() => {
          fetchAndCache().then((data) => {
            if (dependencies.has(url)) {
              const affectedComponents = dependencies.get(url);
              affectedComponents.forEach((componentId) => {
                if (components.has(componentId)) {
                  const component = components.get(componentId);
                  renderComponent(
                    component.target,
                    component.render,
                    componentId
                  );
                }
              });
            }
          });
        }, interval * 1000);

        if (urlCache.has(url)) {
          urlCache.get(url).intervalId = intervalId;
        } else {
          urlCache.set(url, { intervalId });
        }

        return fetchAndCache();
      } else {
        // Одноразовая загрузка
        if (urlCache.has(url)) {
          return Promise.resolve(urlCache.get(url).data);
        }
        return fetchAndCache();
      }
    }

    function renderComponent(target, renderFn, componentId) {
      const targetElement = document.querySelector(target);
      if (!targetElement) {
        TiLab.console.error(`TiLab(render)`, `Элемент ${target} не найден`);
        return;
      }

      const prevComponent = activeComponent;
      activeComponent = componentId;

      try {
        const context = {
          get: internalApi.get,
          share: internalApi.share,
        };

        const html = renderFn.call(context);
        targetElement.innerHTML = html;
      } catch (error) {
        TiLab.console.error(
          `TiLab(render)`,
          `Ошибка при рендеринге компонента ${target}:`,
          error
        );
      } finally {
        activeComponent = prevComponent;
      }
    }

    const internalApi = {
      get: function (param, interval) {
        if (typeof param === "string") {
          if (
            param.startsWith("http://") ||
            param.startsWith("https://") ||
            param.includes("/")
          ) {
            if (activeComponent) {
              if (!dependencies.has(param)) {
                dependencies.set(param, new Set());
              }
              dependencies.get(param).add(activeComponent);
            }
            return fetchData(param, interval);
          } else {
            if (sharedData.has(param)) {
              return sharedData.get(param);
            }
            const originalObj = window[param];
            if (originalObj === undefined) {
              TiLab.console.warn(
                `TiLab(get)`,
                `Переменная ${param} не найдена в глобальном контексте`
              );
              return null;
            }

            const proxiedData = createProxy(originalObj);
            sharedData.set(param, proxiedData);
            return proxiedData;
          }
        }

        TiLab.console.error("TiLab(get)", "Неверный формат параметра для get");
        return null;
      },

      share: function (name, data) {
        if (!name || typeof name !== "string") {
          TiLab.console.error(
            "TiLab(share)",
            "Имя для shared данных должно быть строкой"
          );
          return null;
        }

        const proxiedData = createProxy(data);
        sharedData.set(name, proxiedData);
        return proxiedData;
      },
    };

    // Публичный API
    return {
      create: function (target, component) {
        if (typeof target !== "string" || !target) {
          TiLab.console.error(
            "TiLab(create)",
            "Целевой селектор должен быть строкой"
          );
          return;
        }

        let componentFn;
        let componentName = null;

        if (typeof component === "object") {
          const entries = Object.entries(component);
          if (entries.length === 1) {
            componentName = entries[0][0];
            componentFn = entries[0][1];
          }
        } else if (typeof component === "function") {
          componentFn = component;
        } else {
          TiLab.console.error(
            "TiLab(create)",
            "Компонент должен быть функцией или объектом с одним свойством"
          );
          return;
        }

        if (typeof componentFn !== "function") {
          TiLab.console.error(
            "TiLab(create)",
            "Компонент должен содержать функцию"
          );
          return;
        }

        const componentId =
          target + "_" + Math.random().toString(36).substr(2, 9);
        components.set(componentId, {
          target,
          render: componentFn,
          name: componentName,
        });

        renderComponent(target, componentFn, componentId);

        return componentId;
      },
      share: internalApi.share,
      get: internalApi.get,
    };
  })();
})(window);
