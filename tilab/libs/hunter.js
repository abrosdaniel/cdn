/*!
 * TrackHunter.js v0.1
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * TiLab.lib.init('trackhunter');
 */

(function () {
  function track(selector, callback, options = {}) {
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

    const checkElements = () => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) return false;

      let shouldStop = false;
      for (let i = 0; i < elements.length && !shouldStop; i++) {
        const result = callback(elements[i], "existing");
        if (settings.stop && result === true) shouldStop = true;
      }
      return shouldStop;
    };

    if (checkElements() && settings.stop) {
      return { disconnect: () => {} };
    }

    const trackedElements = new WeakMap();

    const observer = new MutationObserver((mutations) => {
      let shouldStop = false;

      for (const mutation of mutations) {
        if (shouldStop) break;
        if (
          settings.listen.mount &&
          mutation.type === "childList" &&
          mutation.addedNodes.length > 0
        ) {
          for (const node of mutation.addedNodes) {
            if (shouldStop) break;
            if (node.nodeType !== Node.ELEMENT_NODE) continue;
            if (
              node.matches &&
              node.matches(selector) &&
              !trackedElements.has(node)
            ) {
              trackedElements.set(node, true);
              const result = callback(node, "mount");
              if (settings.stop && result === true) {
                shouldStop = true;
                break;
              }
            }

            if (
              !shouldStop &&
              settings.listen.children &&
              node.querySelectorAll
            ) {
              const childElements = node.querySelectorAll(selector);
              for (const element of childElements) {
                if (shouldStop) break;
                if (trackedElements.has(element)) continue;
                trackedElements.set(element, true);
                const result = callback(element, "mount");
                if (settings.stop && result === true) {
                  shouldStop = true;
                  break;
                }
              }
            }
          }
        }

        if (
          settings.listen.unmount &&
          mutation.type === "childList" &&
          mutation.removedNodes.length > 0
        ) {
          for (const node of mutation.removedNodes) {
            if (shouldStop) break;
            if (node.nodeType !== Node.ELEMENT_NODE) continue;

            if (node.matches && node.matches(selector)) {
              const result = callback(node, "unmount");
              if (settings.stop && result === true) {
                shouldStop = true;
                break;
              }
            }

            if (
              !shouldStop &&
              settings.listen.children &&
              node.querySelectorAll
            ) {
              const childElements = node.querySelectorAll(selector);
              for (const element of childElements) {
                if (shouldStop) break;

                const result = callback(element, "unmount");
                if (settings.stop && result === true) {
                  shouldStop = true;
                  break;
                }
              }
            }
          }
        }

        if (settings.listen.attributes && mutation.type === "attributes") {
          const target = mutation.target;
          if (target.nodeType === Node.ELEMENT_NODE) {
            if (target.matches && target.matches(selector)) {
              const result = callback(target, "attributes", {
                attributeName: mutation.attributeName,
                oldValue: mutation.oldValue,
              });
              if (settings.stop && result === true) {
                shouldStop = true;
              }
            }
          }
        }
      }
      if (shouldStop) observer.disconnect();
    });

    const observerOptions = {
      childList: settings.listen.mount || settings.listen.unmount,
      subtree: true,
      attributes: settings.listen.attributes,
      attributeOldValue: settings.listen.attributes,
    };

    if (settings.listen.attributes && settings.filter.attributes) {
      observerOptions.attributeFilter = settings.filter.attributes;
    }
    observer.observe(document.body, observerOptions);
    return observer;
  }

  // Прямой экспорт функций через TiLabExport
  if (window.TiLabExport) {
    window.TiLabExport({
      name: "Hunter.js",
      desc: "Библиотека для отслеживания элементов и их параметров.",
      exports: {
        track,
      },
    });
  }

  if (window.TiLab && window.TiLab.console) {
    window.TiLab.console.log("TrackHunter", "API успешно инициализирован");
  }
})();
