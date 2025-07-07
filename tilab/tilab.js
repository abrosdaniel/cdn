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

    // Обновляет все компоненты, зависящие от данного пути
    function updateDependentComponents(path) {
      // Создаем массив путей: сам путь и все родительские пути
      const pathsToCheck = [path];
      let currentPath = path;

      while (currentPath.includes(".")) {
        currentPath = currentPath.substring(0, currentPath.lastIndexOf("."));
        pathsToCheck.push(currentPath);
      }

      // Обновляем компоненты без дублирования
      const updatedComponents = new Set();

      pathsToCheck.forEach((checkPath) => {
        const affectedComponents = dependencies.get(checkPath);
        if (!affectedComponents) return;

        affectedComponents.forEach((componentId) => {
          if (
            updatedComponents.has(componentId) ||
            !components.has(componentId)
          )
            return;

          const component = components.get(componentId);
          renderComponent(component.target, component.render, componentId);
          updatedComponents.add(componentId);
        });
      });
    }

    // Регистрирует зависимости для объекта
    function registerDependencies(obj, path) {
      if (!obj || typeof obj !== "object" || !activeComponent) return;

      // Регистрируем зависимость для текущего пути
      if (!dependencies.has(path)) {
        dependencies.set(path, new Set());
      }
      dependencies.get(path).add(activeComponent);

      // Рекурсивно регистрируем для всех свойств
      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        const childPath = `${path}.${key}`;

        if (!dependencies.has(childPath)) {
          dependencies.set(childPath, new Set());
        }
        dependencies.get(childPath).add(activeComponent);

        if (value && typeof value === "object") {
          registerDependencies(value, childPath);
        }
      });
    }

    // Создает прокси для реактивности данных
    function createProxy(obj, path) {
      if (!obj || typeof obj !== "object") return obj;

      // Специальная обработка для массивов
      if (Array.isArray(obj)) {
        return new Proxy(obj, {
          get(target, prop) {
            // Перехватываем методы, модифицирующие массив
            if (
              typeof prop === "string" &&
              [
                "push",
                "pop",
                "shift",
                "unshift",
                "splice",
                "sort",
                "reverse",
              ].includes(prop)
            ) {
              const originalMethod = target[prop];
              return function (...args) {
                const result = originalMethod.apply(target, args);
                updateDependentComponents(path);
                return result;
              };
            }

            // Обработка преобразования к примитивам
            if (
              prop === Symbol.toPrimitive ||
              prop === "toString" ||
              prop === "valueOf"
            ) {
              return () => String(target);
            }

            const value = target[prop];
            const currentPath = `${path}.${prop}`;

            // Регистрируем зависимость
            if (activeComponent) {
              [currentPath, path].forEach((p) => {
                if (!dependencies.has(p)) {
                  dependencies.set(p, new Set());
                }
                dependencies.get(p).add(activeComponent);
              });
            }

            return value && typeof value === "object"
              ? createProxy(value, currentPath)
              : value;
          },

          set(target, prop, value) {
            target[prop] = value;
            updateDependentComponents(`${path}.${prop}`);
            return true;
          },
        });
      }

      // Для обычных объектов
      return new Proxy(obj, {
        get(target, prop) {
          if (
            prop === Symbol.toPrimitive ||
            prop === "toString" ||
            prop === "valueOf"
          ) {
            return () => String(target);
          }

          const value = target[prop];
          const currentPath = `${path}.${prop}`;

          if (activeComponent) {
            [currentPath, path].forEach((p) => {
              if (!dependencies.has(p)) {
                dependencies.set(p, new Set());
              }
              dependencies.get(p).add(activeComponent);
            });
          }

          return value && typeof value === "object"
            ? createProxy(value, currentPath)
            : value;
        },

        set(target, prop, value) {
          target[prop] = value;
          updateDependentComponents(`${path}.${prop}`);
          return true;
        },

        deleteProperty(target, prop) {
          delete target[prop];
          updateDependentComponents(`${path}.${prop}`);
          return true;
        },
      });
    }

    // Загружает данные по URL
    function fetchData(url, interval) {
      const fetchAndProcess = () => {
        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const proxiedData = createProxy(data, url);

            if (activeComponent) {
              registerDependencies(data, url);
            }

            urlCache.set(url, {
              data: proxiedData,
              timestamp: Date.now(),
            });

            updateDependentComponents(url);
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

      // Настройка периодического обновления
      if (interval && interval > 0) {
        const cached = urlCache.get(url);

        if (cached && cached.intervalId) {
          clearInterval(cached.intervalId);
        }

        const intervalId = setInterval(fetchAndProcess, interval * 1000);

        if (cached) {
          cached.intervalId = intervalId;
          return Promise.resolve(cached.data);
        } else {
          urlCache.set(url, { intervalId });
          return fetchAndProcess();
        }
      }

      // Возвращаем кэшированные данные или загружаем новые
      return urlCache.has(url)
        ? Promise.resolve(urlCache.get(url).data)
        : fetchAndProcess();
    }

    // Рендерит компонент
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
          get: api.get,
          share: api.share,
        };

        targetElement.innerHTML = renderFn.call(context);
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

    // API для работы с данными
    const api = {
      get(param, interval) {
        // URL
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
          }

          // Доступ к общим данным
          if (sharedData.has(param)) {
            if (activeComponent) {
              if (!dependencies.has(param)) {
                dependencies.set(param, new Set());
              }
              dependencies.get(param).add(activeComponent);

              const data = sharedData.get(param);
              if (data && typeof data === "object") {
                registerDependencies(data, param);
              }
            }
            return sharedData.get(param);
          }

          // Доступ к глобальной переменной
          const globalData = window[param];
          if (globalData !== undefined) {
            const proxiedData = createProxy(globalData, param);
            sharedData.set(param, proxiedData);

            if (activeComponent) {
              if (!dependencies.has(param)) {
                dependencies.set(param, new Set());
              }
              dependencies.get(param).add(activeComponent);

              if (globalData && typeof globalData === "object") {
                registerDependencies(globalData, param);
              }
            }

            return proxiedData;
          }

          TiLab.console.warn(`TiLab(get)`, `Переменная ${param} не найдена`);
          return null;
        }

        TiLab.console.error("TiLab(get)", "Неверный формат параметра для get");
        return null;
      },

      share(name, data) {
        if (!name || typeof name !== "string") {
          TiLab.console.error("TiLab(share)", "Имя должно быть строкой");
          return null;
        }

        const proxiedData = createProxy(data, name);
        sharedData.set(name, proxiedData);
        updateDependentComponents(name);

        return proxiedData;
      },
    };

    // Публичный API
    return {
      create(target, component) {
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
            [componentName, componentFn] = entries[0];
          }
        } else if (typeof component === "function") {
          componentFn = component;
          componentName = component.name || null;
        } else {
          TiLab.console.error(
            "TiLab(create)",
            "Компонент должен быть функцией"
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

        const componentId = `${target}_${Math.random()
          .toString(36)
          .substring(2, 9)}`;
        components.set(componentId, {
          target,
          render: componentFn,
          name: componentName,
        });

        renderComponent(target, componentFn, componentId);
        return componentId;
      },

      share: api.share,
      get: api.get,
    };
  })();
})(window);
