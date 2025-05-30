/*!
 * TrackHunter.js v0.1
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * TiLab.lib('trackhunter');
 */

(function () {
  function track(selector, callback, stopOnFound = false) {
    const checkElements = () => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) return false;
      let shouldStop = false;
      for (let i = 0; i < elements.length && !shouldStop; i++) {
        const result = callback(elements[i]);
        if (stopOnFound && result === true) shouldStop = true;
      }
      return shouldStop;
    };

    if (checkElements() && stopOnFound) {
      return { disconnect: () => {} };
    }

    const observer = new MutationObserver((mutations) => {
      let shouldStop = false;
      for (const mutation of mutations) {
        if (shouldStop) break;
        if (mutation.type !== "childList" || mutation.addedNodes.length === 0)
          continue;
        for (const node of mutation.addedNodes) {
          if (shouldStop) break;
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          if (node.matches && node.matches(selector)) {
            const result = callback(node);
            if (stopOnFound && result === true) {
              shouldStop = true;
              break;
            }
          }
          if (!shouldStop) {
            const childElements = node.querySelectorAll(selector);
            for (const element of childElements) {
              if (shouldStop) break;
              const result = callback(element);
              if (stopOnFound && result === true) {
                shouldStop = true;
                break;
              }
            }
          }
        }
      }
      if (shouldStop) observer.disconnect();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return observer;
  }

  if (window.TiLab && window.TiLab.libs) {
    window.TiLab.libs["trackhunter"].version = "0.1";
    window.TiLab.libs["trackhunter"].description =
      "Утилита для отслеживания появления элементов в DOM";
    window.track = track;

    window.TiLab.libs["trackhunter"].exports = {
      track: track,
    };

    if (window.TiLab.debug) {
      console.log("TrackHunter: API успешно инициализирован");
    }
  }
})();
