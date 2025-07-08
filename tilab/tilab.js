/*!
 * TiLab.js v0.6a
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * <script src="https://cdn.abros.dev/tilab/tilab.js"></script>
 */

(function (window) {
  if (!window.TiLab) {
    window.TiLab = {
      version: "0.6 (alpha)",
      copyright: "© 2025 Daniel Abros",
      site: "https://abros.dev",
    };

    const ConsoleModule = {
      storage: [],
      types: ["log", "info", "trace", "warn", "error"],

      add(type, name, message, data) {
        const entry = {
          id: Date.now() + Math.random(),
          time: new Date().toLocaleString(),
          type: type || "info",
          name: name || "Система",
          message: message || "",
          data: data,
        };

        this.storage.push(entry);
        return entry;
      },

      clear() {
        this.storage = [];
      },

      createMethods() {
        this.types.forEach((type) => {
          this[type] = (name, message, data) => {
            return this.add(type, name, message, data);
          };
        });
      },
    };

    ConsoleModule.createMethods();
    window.TiLab.console = ConsoleModule;

    function loadLib(src, async = true) {
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
    if (urlParams.get("tilab") === "") {
      loadLib(`${CDN}/tilab/services/panel.js`);
    }
  }
})(window);
