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

    // Добавляем отладочную информацию для диагностики обновлений
    const DEBUG = false;

    const ARRAY_MUTATING_METHODS = [
      "push",
      "pop",
      "shift",
      "unshift",
      "splice",
      "sort",
      "reverse",
    ];
    const PRIMITIVE_SYMBOLS = [Symbol.toPrimitive, "toString", "valueOf"];

    function registerDependency(path) {
      if (!activeComponent) return;

      if (DEBUG) {
        TiLab.console.log(
          "TiLab(dependency)",
          `Регистрация зависимости: ${path} для компонента ${activeComponent}`
        );
      }

      if (!dependencies.has(path)) {
        dependencies.set(path, new Set());
      }
      dependencies.get(path).add(activeComponent);
    }

    // Обновляет все компоненты, зависящие от данного пути и всех его родительских путей
    function updateDependentComponents(path) {
      if (DEBUG) {
        TiLab.console.log(
          "TiLab(update)",
          `Запрос на обновление по пути: ${path}`
        );
      }

      // Создаем массив путей для проверки: сам путь и все его родительские пути
      const pathsToCheck = [path];
      let currentPath = path;

      // Добавляем все родительские пути
      while (currentPath.includes(".")) {
        currentPath = currentPath.substring(0, currentPath.lastIndexOf("."));
        pathsToCheck.push(currentPath);
      }

      if (DEBUG) {
        TiLab.console.log(
          "TiLab(update)",
          `Проверяемые пути: ${pathsToCheck.join(", ")}`
        );
      }

      // Проходим по всем зависимостям и обновляем компоненты
      const updatedComponents = new Set();

      let foundDependencies = false;

      for (const checkPath of pathsToCheck) {
        const affectedComponents = dependencies.get(checkPath);
        if (!affectedComponents) continue;

        foundDependencies = true;

        if (DEBUG) {
          TiLab.console.log(
            "TiLab(update)",
            `Найдены компоненты для пути ${checkPath}: ${Array.from(
              affectedComponents
            ).join(", ")}`
          );
        }

        for (const componentId of affectedComponents) {
          if (updatedComponents.has(componentId)) continue;

          if (!components.has(componentId)) {
            if (DEBUG) {
              TiLab.console.warn(
                "TiLab(update)",
                `Компонент ${componentId} не найден, но есть в зависимостях`
              );
            }
            continue;
          }

          const component = components.get(componentId);

          if (DEBUG) {
            TiLab.console.log(
              "TiLab(update)",
              `Обновление компонента: ${componentId} (${
                component.name || "безымянный"
              })`
            );
          }

          // Добавляем задержку для асинхронного обновления UI
          setTimeout(() => {
            renderComponent(component.target, component.render, componentId);
          }, 0);

          updatedComponents.add(componentId);
        }
      }

      if (DEBUG && !foundDependencies) {
        TiLab.console.warn(
          "TiLab(update)",
          `Не найдено зависимостей для пути: ${path}`
        );
      }
    }

    // Рекурсивно регистрирует зависимости для всех путей в объекте
    function registerDependenciesForObject(obj, basePath) {
      if (obj === null || typeof obj !== "object" || !activeComponent) return;

      registerDependency(basePath);

      // Рекурсивно регистрируем зависимости для всех свойств объекта
      for (const key of Object.keys(obj)) {
        const value = obj[key];
        const childPath = basePath ? `${basePath}.${key}` : key;

        registerDependency(childPath);

        // Если значение - объект, рекурсивно регистрируем зависимости для его свойств
        if (value !== null && typeof value === "object") {
          registerDependenciesForObject(value, childPath);
        }
      }
    }

    // Создает прокси для отслеживания изменений в объектах
    function createProxy(obj, path = "") {
      if (obj === null || typeof obj !== "object") return obj;

      // Проверяем, не является ли объект уже прокси
      if (obj.__isProxy) return obj;

      const handler = {
        get(target, prop) {
          // Проверка на специальное свойство для определения прокси
          if (prop === "__isProxy") return true;

          // Обработка примитивных методов
          if (PRIMITIVE_SYMBOLS.includes(prop)) {
            return () => String(target);
          }

          const value = target[prop];
          const currentPath = path ? `${path}.${prop}` : String(prop);

          // Регистрируем зависимость текущего компонента от этого пути
          if (activeComponent) {
            registerDependency(currentPath);
            if (path) registerDependency(path);
          }

          // Для массивов перехватываем методы, изменяющие массив
          if (
            Array.isArray(target) &&
            typeof prop === "string" &&
            ARRAY_MUTATING_METHODS.includes(prop)
          ) {
            return function (...args) {
              const result = Array.prototype[prop].apply(target, args);

              if (DEBUG) {
                TiLab.console.log(
                  "TiLab(array)",
                  `Вызван метод ${prop} для массива по пути ${path}`
                );
              }

              // Важно: обновляем компоненты после изменения массива
              setTimeout(() => {
                updateDependentComponents(path);
              }, 0);

              return result;
            };
          }

          // Рекурсивно создаем прокси для вложенных объектов
          if (value !== null && typeof value === "object") {
            return createProxy(value, currentPath);
          }

          return value;
        },

        set(target, prop, value) {
          const oldValue = target[prop];
          target[prop] = value;

          if (DEBUG) {
            TiLab.console.log(
              "TiLab(set)",
              `Установлено значение для ${
                path ? `${path}.${prop}` : prop
              }: ${JSON.stringify(oldValue)} -> ${JSON.stringify(value)}`
            );
          }

          const fullPath = path ? `${path}.${prop}` : String(prop);

          // Важно: обновляем компоненты асинхронно
          setTimeout(() => {
            updateDependentComponents(fullPath);
          }, 0);

          return true;
        },

        deleteProperty(target, prop) {
          if (prop in target) {
            delete target[prop];
            const fullPath = path ? `${path}.${prop}` : String(prop);

            if (DEBUG) {
              TiLab.console.log(
                "TiLab(delete)",
                `Удалено свойство ${fullPath}`
              );
            }

            // Важно: обновляем компоненты асинхронно
            setTimeout(() => {
              updateDependentComponents(fullPath);
            }, 0);
          }
          return true;
        },
      };

      return new Proxy(obj, handler);
    }

    // Загружает данные с URL и кэширует их
    function fetchData(url, interval = null) {
      const fetchAndCache = () => {
        if (DEBUG) {
          TiLab.console.log("TiLab(fetch)", `Загрузка данных с ${url}`);
        }

        return fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const proxiedData = createProxy(data, url);

            if (activeComponent) {
              registerDependenciesForObject(data, url);
            }

            urlCache.set(url, {
              data: proxiedData,
              timestamp: Date.now(),
            });

            // Важно: обновляем компоненты после загрузки данных
            setTimeout(() => {
              updateDependentComponents(url);
            }, 0);

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

      // Обработка интервального обновления
      if (interval && interval > 0) {
        const cachedData = urlCache.get(url);

        // Очищаем предыдущий интервал, если он был
        if (cachedData && cachedData.intervalId) {
          clearInterval(cachedData.intervalId);
        }

        const intervalId = setInterval(fetchAndCache, interval * 1000);

        if (cachedData && cachedData.data) {
          urlCache.set(url, { ...cachedData, intervalId });
          return Promise.resolve(cachedData.data);
        } else {
          urlCache.set(url, { intervalId });
          return fetchAndCache();
        }
      }

      // Обычная загрузка (без интервала)
      return urlCache.has(url)
        ? Promise.resolve(urlCache.get(url).data)
        : fetchAndCache();
    }

    // Рендерит компонент в целевой элемент
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

        if (DEBUG) {
          TiLab.console.log(
            "TiLab(render)",
            `Рендеринг компонента ${componentId} в ${target}`
          );
        }

        // Сохраняем текущий фокус
        const activeElement = document.activeElement;
        const selectionStart =
          activeElement && "selectionStart" in activeElement
            ? activeElement.selectionStart
            : null;
        const selectionEnd =
          activeElement && "selectionEnd" in activeElement
            ? activeElement.selectionEnd
            : null;

        targetElement.innerHTML = html;

        // Восстанавливаем фокус, если это возможно
        if (activeElement && activeElement.id) {
          const newActiveElement = document.getElementById(activeElement.id);
          if (newActiveElement) {
            newActiveElement.focus();
            if (
              selectionStart !== null &&
              "selectionStart" in newActiveElement
            ) {
              newActiveElement.selectionStart = selectionStart;
              newActiveElement.selectionEnd = selectionEnd;
            }
          }
        }
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

    // Внутренний API для работы с данными
    const internalApi = {
      get(param, interval) {
        if (typeof param !== "string") {
          TiLab.console.error(
            "TiLab(get)",
            "Неверный формат параметра для get"
          );
          return null;
        }

        // Обработка URL
        if (
          param.startsWith("http://") ||
          param.startsWith("https://") ||
          param.includes("/")
        ) {
          registerDependency(param);
          return fetchData(param, interval);
        }

        // Обработка локальных данных
        if (sharedData.has(param)) {
          if (activeComponent) {
            registerDependency(param);

            const data = sharedData.get(param);
            if (data && typeof data === "object") {
              registerDependenciesForObject(data, param);
            }
          }
          return sharedData.get(param);
        }

        // Обработка глобальных данных
        const originalObj = window[param];
        if (originalObj === undefined) {
          TiLab.console.warn(
            `TiLab(get)`,
            `Переменная ${param} не найдена в глобальном контексте`
          );
          return null;
        }

        const proxiedData = createProxy(originalObj, param);
        sharedData.set(param, proxiedData);

        if (activeComponent) {
          registerDependency(param);

          if (originalObj && typeof originalObj === "object") {
            registerDependenciesForObject(originalObj, param);
          }
        }

        return proxiedData;
      },

      share(name, data) {
        if (!name || typeof name !== "string") {
          TiLab.console.error(
            "TiLab(share)",
            "Имя для shared данных должно быть строкой"
          );
          return null;
        }

        const proxiedData = createProxy(data, name);
        sharedData.set(name, proxiedData);

        // Важно: обновляем компоненты асинхронно
        setTimeout(() => {
          updateDependentComponents(name);
        }, 0);

        return proxiedData;
      },

      // Добавляем метод для отладки
      debug() {
        return {
          components: Array.from(components.entries()),
          dependencies: Array.from(dependencies.entries()).map(
            ([key, value]) => ({
              path: key,
              components: Array.from(value),
            })
          ),
          sharedData: Array.from(sharedData.keys()),
          urlCache: Array.from(urlCache.keys()),
        };
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
          componentName = componentFn.name || null;
        } else {
          TiLab.console.error(
            "TiLab(create)",
            "Компонент должен быть функцией с именем"
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

        if (DEBUG) {
          TiLab.console.log(
            "TiLab(create)",
            `Создан компонент: ${componentId} (${
              componentName || "безымянный"
            }) для ${target}`
          );
        }

        renderComponent(target, componentFn, componentId);
        return componentId;
      },
      share: internalApi.share,
      get: internalApi.get,
      debug: DEBUG ? internalApi.debug : undefined,
    };
  })();
})(window);
