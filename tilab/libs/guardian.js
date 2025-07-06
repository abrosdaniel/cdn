/*!
 * Guardian.js
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * TiLab.lib('guardian');
 */

(function () {
  function protect(options = {}) {
    const defaultOptions = {
      stop: false,
      listen: {
        mount: true,
        unmount: false,
        attributes: false,
        children: true,
      },
      filter: {
        attributes: null,
      },
    };

    const settings = {
      stop: options.stop !== undefined ? options.stop : defaultOptions.stop,
      listen: {
        ...defaultOptions.listen,
        ...(options.listen || {}),
      },
      filter: {
        ...defaultOptions.filter,
        ...(options.filter || {}),
      },
    };
  }

  if (window.TiLab && window.TiLab.libs) {
    window.TiLab.libs["trackhunter"] = window.TiLab.libs["trackhunter"] || {};
    window.TiLab.libs["trackhunter"].version = "0.1";
    window.TiLab.libs["trackhunter"].description =
      "Утилита для отслеживания появления, удаления и изменения элементов в DOM";
    window.TiLab.libs["trackhunter"].exports = {
      track: track,
    };
    if (window.TiLab.debug) {
      console.log("TrackHunter: API успешно инициализирован");
    }
  }
})();
