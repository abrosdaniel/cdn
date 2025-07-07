/*!
 * TiLab.js v0.6a
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * <script src="https://cdn.abros.dev/tilab/tilab.js"></script>
 */

(function (window) {
  const CDN = "https://cdn.abros.dev";
  const CONSOLE_TYPES = ["log", "info", "trace", "warn", "error"];
  const ARRAY_MUTATION_METHODS = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "sort",
    "reverse",
  ];
  const PRIMITIVE_METHODS = [Symbol.toPrimitive, "toString", "valueOf"];

  if (!window.TiLab) {
    window.TiLab = {
      version: "0.6 (alpha)",
      copyright: "© 2025 Daniel Abros",
      site: "https://abros.dev",
      libs: {},
      console: { storage: [] },
    };
  }

  CONSOLE_TYPES.forEach((type) => {
    window.TiLab.console[type] = (name, message, data) => {
      window.TiLab.console.storage.push({
        time: new Date().toLocaleString(),
        type,
        name,
        message,
        data,
      });
      console[type](`[ ${name} ]\n${message}`, data);
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

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("tilab") === "") {
    loadScript(`${CDN}/tilab/services/panel.js`);
  }

  window.TiLab.init = function (libs, options = {}, ...args) {
    const libsArray = Array.isArray(libs) ? libs : [libs];
    const isAsync = options.async !== undefined ? options.async : true;

    if (libsArray.length === 1 && typeof libsArray[0] === "string") {
      const libName = libsArray[0];
      const existingLib = window.TiLab.libs[libName];

      if (existingLib?.loaded) {
        const exports = existingLib.exports;
        if (!exports) return Promise.resolve();

        const exportKeys = Object.keys(exports);
        return Promise.resolve(
          exportKeys.length === 1 ? exports[exportKeys[0]] : exports
        );
      }

      const libPath = `${CDN}/tilab/libs/${libName}.js`;

      return loadScript(libPath, isAsync)
        .then(() => {
          window.TiLab.libs[libName] = {
            loaded: true,
            timestamp: new Date().getTime(),
            async: isAsync,
          };

          TiLab.debug.log("TiLab", `Загружена библиотека ${libName}`);

          const exports = window.TiLab.libs[libName].exports;
          if (!exports) return;

          const exportKeys = Object.keys(exports);
          return exportKeys.length === 1 ? exports[exportKeys[0]] : exports;
        })
        .catch((error) => {
          TiLab.debug.error(
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

    const loadPromises = libsArray
      .filter(
        (libName) => typeof libName === "string" && !window.TiLab.libs[libName]
      )
      .map((libName) => {
        const libPath = `${CDN}/tilab/libs/${libName}.js`;

        return loadScript(libPath, isAsync)
          .then(() => {
            window.TiLab.libs[libName] = {
              loaded: true,
              timestamp: new Date().getTime(),
              async: isAsync,
            };
            TiLab.debug.log("TiLab", `Загружена библиотека ${libName}`);
          })
          .catch((error) => {
            TiLab.debug.error(
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
      });

    return Promise.all(loadPromises);
  };

  window.tlc = (function () {
    const components = new Map();
    const dependencies = new Map();
    const sharedData = new Map();
    const urlCache = new Map();
    let activeComponent = null;

    const transformJSX = (jsxString) => {
      if (typeof jsxString !== "string") return jsxString;

      return jsxString
        .replace(/\s*<>\s*/g, "")
        .replace(/\s*<\/>\s*/g, "")
        .replace(/\n\s*/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\$\{([^}]+)\}/g, (match, expression) => {
          try {
            return eval(expression);
          } catch (error) {
            TiLab.console.error(
              "TiLab(jsx)",
              `Ошибка интерполяции: ${expression}`,
              error
            );
            return "";
          }
        });
    };

    const jsxToString = (jsxCode) => {
      if (typeof jsxCode === "string") return jsxCode;
      if (typeof jsxCode === "object" && jsxCode !== null)
        return String(jsxCode);
      return jsxCode;
    };

    const jsx = (tag, props, ...children) => {
      if (tag === "") return children.join("");

      const attributes = [];
      if (props) {
        Object.keys(props).forEach((key) => {
          if (key !== "children") {
            const value = props[key];
            if (typeof value === "boolean") {
              if (value) attributes.push(key);
            } else {
              attributes.push(`${key}="${value}"`);
            }
          }
        });
      }

      const attrString =
        attributes.length > 0 ? " " + attributes.join(" ") : "";
      return `<${tag}${attrString}>${children.join("")}</${tag}>`;
    };

    const Fragment = (props, ...children) => children.join("");

    const updateDependentComponents = (path) => {
      const pathsToCheck = [path];
      let currentPath = path;

      while (currentPath.includes(".")) {
        currentPath = currentPath.substring(0, currentPath.lastIndexOf("."));
        pathsToCheck.push(currentPath);
      }

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
    };

    const registerDependencies = (obj, path) => {
      if (!obj || typeof obj !== "object" || !activeComponent) return;

      const paths = [path, ...Object.keys(obj).map((key) => `${path}.${key}`)];
      paths.forEach((p) => {
        if (!dependencies.has(p)) dependencies.set(p, new Set());
        dependencies.get(p).add(activeComponent);
      });

      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (value && typeof value === "object") {
          registerDependencies(value, `${path}.${key}`);
        }
      });
    };

    const addDependency = (path) => {
      if (!activeComponent) return;
      if (!dependencies.has(path)) dependencies.set(path, new Set());
      dependencies.get(path).add(activeComponent);
    };

    const createProxy = (obj, path) => {
      if (!obj || typeof obj !== "object") return obj;
      if (sharedData.has(path) && sharedData.get(path) === obj) return obj;

      const proxyHandler = {
        get(target, prop) {
          if (PRIMITIVE_METHODS.includes(prop)) return () => String(target);

          const value = target[prop];
          const currentPath = `${path}.${prop}`;

          addDependency(currentPath);
          addDependency(path);

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
      };

      if (Array.isArray(obj)) {
        return new Proxy(obj, {
          ...proxyHandler,
          get(target, prop) {
            if (ARRAY_MUTATION_METHODS.includes(prop)) {
              const originalMethod = target[prop];
              return function (...args) {
                const result = originalMethod.apply(target, args);
                updateDependentComponents(path);
                return result;
              };
            }
            return proxyHandler.get(target, prop);
          },
        });
      }

      return new Proxy(obj, proxyHandler);
    };

    const fetchData = (url, interval) => {
      const fetchAndProcess = () =>
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            const proxiedData = createProxy(data, url);
            if (activeComponent) registerDependencies(data, url);

            urlCache.set(url, { data: proxiedData, timestamp: Date.now() });
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

      if (interval && interval > 0) {
        const cached = urlCache.get(url);
        if (cached?.intervalId) clearInterval(cached.intervalId);

        const intervalId = setInterval(fetchAndProcess, interval * 1000);

        if (cached) {
          cached.intervalId = intervalId;
          return Promise.resolve(cached.data);
        } else {
          urlCache.set(url, { intervalId });
          return fetchAndProcess();
        }
      }

      return urlCache.has(url)
        ? Promise.resolve(urlCache.get(url).data)
        : fetchAndProcess();
    };

    const renderComponent = (target, renderFn, componentId) => {
      const targetElement = document.querySelector(target);
      if (!targetElement) {
        TiLab.console.error(`TiLab(render)`, `Элемент ${target} не найден`);
        return;
      }

      const prevComponent = activeComponent;
      activeComponent = componentId;

      try {
        const context = { get: api.get, share: api.share, jsx, Fragment };
        let result = renderFn.call(context);

        result = jsxToString(result);

        if (typeof result === "string") {
          result = transformJSX(result);
        }

        targetElement.innerHTML = result;
      } catch (error) {
        TiLab.console.error(
          `TiLab(render)`,
          `Ошибка при рендеринге компонента ${target}:`,
          error
        );
      } finally {
        activeComponent = prevComponent;
      }
    };

    const api = {
      get(param, interval) {
        if (typeof param !== "string") {
          TiLab.console.error(
            "TiLab(get)",
            "Неверный формат параметра для get"
          );
          return null;
        }

        if (
          param.startsWith("http://") ||
          param.startsWith("https://") ||
          param.includes("/")
        ) {
          addDependency(param);
          return fetchData(param, interval);
        }

        if (sharedData.has(param)) {
          addDependency(param);
          const data = sharedData.get(param);
          if (data && typeof data === "object")
            registerDependencies(data, param);
          return data;
        }

        const globalData = window[param];
        if (globalData !== undefined) {
          const proxiedData = createProxy(globalData, param);
          if (typeof globalData === "object" && globalData !== null) {
            window[param] = proxiedData;
          }
          sharedData.set(param, proxiedData);
          addDependency(param);
          if (globalData && typeof globalData === "object") {
            registerDependencies(globalData, param);
          }
          return proxiedData;
        }

        TiLab.console.warn(`TiLab(get)`, `Переменная ${param} не найдена`);
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
          if (entries.length === 1) [componentName, componentFn] = entries[0];
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
      jsx,
      Fragment,
    };
  })();
})(window);
