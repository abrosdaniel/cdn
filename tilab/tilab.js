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
      debug: {
        storage: [],
      },
    };
  }

  ["log", "info", "trace", "warn", "error"].forEach(function (type) {
    window.TiLab.debug[type] = function (name, message, data) {
      window.TiLab.debug.storage.push({
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

          TiLab.debug.log("TiLab", `Загружена библиотека ${libName}`);

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

        loadPromises.push(loadPromise);
      }
    });

    return Promise.all(loadPromises);
  };
})(window);
