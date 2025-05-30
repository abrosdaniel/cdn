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
      version: "0.1a",
      copyright: "© 2025 Daniel Abros",
      site: "https://abros.dev",
      libs: {},
    };
  }

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
  const services = ["console", "errors", "params"];

  if (urlParams.get("tilab") !== null) {
    if (window.TiLab.debug === undefined) {
      if (urlParams.get("debug") !== null) {
        window.TiLab.debug = true;
        if (urlParams.get("debug") === "lib") {
          loadScript(`${CDN}/tilab/test/tilab.js`);
        }
        if (urlParams.get("test") !== null) {
          loadScript(`${CDN}/tilab/test/${urlParams.get("test")}`);
        }
      }
    } else {
      services.forEach((service) => {
        if (urlParams.get(service) !== null) {
          loadScript(`${CDN}/tilab/services/${service}.js`);
        }
      });
    }
  }

  /**
   * Загрузка библиотеки
   * @param {string} libName - Имя библиотеки
   * @param {Object} options - Параметры загрузки
   * @param {...*} args - Аргументы для передачи методу библиотеки
   * @returns {Promise} - Промис, который разрешается после загрузки всех библиотек
   */
  window.TiLab.lib = function (libs, options = {}, ...args) {
    const libsArray = Array.isArray(libs) ? libs : [libs];
    const loadPromises = [];
    const isAsync = options.async !== undefined ? options.async : true;

    if (libsArray.length === 1 && typeof libsArray[0] === "string") {
      const libName = libsArray[0];

      if (window.TiLab.libs[libName] && window.TiLab.libs[libName].loaded) {
        if (window.TiLab.debug) {
          console.log(`TiLab: библиотека ${libName} уже загружена`);
        }

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

      const libPath = `${CDN}/libs/${libName}`;

      return loadScript(libPath, isAsync)
        .then(() => {
          window.TiLab.libs[libName] = window.TiLab.libs[libName] || {
            loaded: true,
            timestamp: new Date().getTime(),
            async: isAsync,
          };

          if (window.TiLab.debug) {
            console.log(`TiLab: загружена библиотека ${libName}`);
          }

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
          if (window.TiLab.debug) {
            console.error(
              `TiLab: ошибка загрузки библиотеки ${libName}:`,
              error
            );
          }
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
          if (window.TiLab.debug) {
            console.log(`TiLab: библиотека ${libName} уже загружена`);
          }
          return;
        }

        const libPath = `${CDN}/libs/${libName}`;

        const loadPromise = loadScript(libPath, isAsync)
          .then(() => {
            window.TiLab.libs[libName] = {
              loaded: true,
              timestamp: new Date().getTime(),
              async: isAsync,
            };

            if (window.TiLab.debug) {
              console.log(`TiLab: загружена библиотека ${libName}`);
            }
          })
          .catch((error) => {
            if (window.TiLab.debug) {
              console.error(
                `TiLab: ошибка загрузки библиотеки ${libName}:`,
                error
              );
            }
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
})(window);
