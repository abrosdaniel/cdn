/*!
 * TiLab.js v0.6a
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * <script src="https://cdn.abros.dev/tilab/tilab.js"></script>
 */

(function (window) {
  if (!window.TiLab) {
    const Constants = {
      CDN: "https://cdn.abros.dev",
      CONSOLE_TYPES: ["log", "info", "trace", "warn", "error"],
    };

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

    const LibraryModule = () => {
      const storage = [];

      const init = (libName, callback) => {
        const existingLib = storage.find((lib) => lib.name === libName);
        if (existingLib?.isLoaded) {
          if (typeof callback === "function") {
            const exports = existingLib.exports || {};
            callback(...Object.values(exports));
          }
          return Promise.resolve(existingLib.exports);
        }

        const libRecord = {
          name: libName,
          isLoaded: false,
          isLoading: true,
          timestamp: Date.now(),
          exports: {},
          error: null,
        };
        storage.push(libRecord);

        window.TiLabExport = (functions) => {
          Object.assign(libRecord.exports, functions);
        };

        return loadScript(`${Constants.CDN}/tilab/libs/${libName}.js`)
          .then(() => {
            delete window.TiLabExport;

            libRecord.isLoaded = true;
            libRecord.isLoading = false;
            libRecord.loadedAt = Date.now();

            if (typeof callback === "function") {
              callback(...Object.values(libRecord.exports));
            }

            return libRecord.exports;
          })
          .catch((error) => {
            delete window.TiLabExport;

            libRecord.isLoaded = false;
            libRecord.isLoading = false;
            libRecord.error = error.message;

            console.error(`Ошибка загрузки библиотеки ${libName}:`, error);
            throw error;
          });
      };

      const lib = {
        storage,
        init,
      };
      return lib;
    };

    const ConsoleModule = () => {
      const storage = [];

      const addEntry = (type, name, message, data) => {
        const entry = {
          id: Date.now() + Math.random(),
          time: new Date().toLocaleString(),
          type: type || "info",
          name: name || "Система",
          message: message || "",
          data,
        };
        storage.push(entry);
        return entry;
      };

      const console = {
        storage,
        clear: () => {
          storage.length = 0;
        },
      };

      Constants.CONSOLE_TYPES.forEach((type) => {
        console[type] = (name, message, data) =>
          addEntry(type, name, message, data);
      });

      return console;
    };

    const JSXModule = () => {
      const storage = [];
      let preactLoaded = false;

      const loadPreact = () => {
        if (preactLoaded) return Promise.resolve();

        return import("https://unpkg.com/htm/preact/standalone.module.js")
          .then((module) => {
            preactLoaded = true;
            window.preact = module;
            console.log("Preact загружен:", window.preact);
            console.log("Доступные функции:", Object.keys(window.preact || {}));
            return Promise.resolve();
          })
          .catch((error) => {
            console.error("Ошибка загрузки Preact:", error);
            throw error;
          });
      };

      const jsxWrapper = (componentFunction) => {
        return loadPreact().then(() => {
          const {
            html,
            render,
            Component,
            h,
            useState,
            useEffect,
            useRef,
            useMemo,
            useCallback,
            useContext,
            createContext,
          } = window.preact || {};

          if (!html || !render) {
            console.error("Preact объект:", window.preact);
            console.error(
              "Доступные функции:",
              Object.keys(window.preact || {})
            );
            throw new Error("htm/preact не загружен или функции недоступны");
          }

          const context = {
            h,
            html,
            render,
            Component,
            useState,
            useEffect,
            useRef,
            useMemo,
            useCallback,
            useContext,
            createContext,
          };

          const componentResult = componentFunction.call(context);

          let container;

          if (container && componentResult) {
            render(componentResult, container);
          }

          const componentRecord = {
            id: Date.now() + Math.random(),
            name: componentFunction.name || "Anonymous",
            createdAt: Date.now(),
          };
          storage.push(componentRecord);
        });
      };

      const jsx = {
        storage,
        create: jsxWrapper,
      };

      return jsx;
    };

    window.TiLab = {
      version: "0.6 (alpha)",
      copyright: "© 2025 Daniel Abros",
      site: "https://abros.dev",
      console: ConsoleModule(),
      lib: LibraryModule(),
      jsx: JSXModule().create,
    };

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("tilab") === "") {
      loadScript(`${Constants.CDN}/tilab/services/panel.js`);
    }
  }
})(window);
