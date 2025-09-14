/*!
 * Caller.js v0.2
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * TiLab.lib.init('caller');
 */

(function () {
  const templates = new Map();
  const notifySettings = new Map();

  if (!document.getElementById("tilab-caller-body-styles")) {
    const style = document.createElement("style");
    style.id = "tilab-caller-body-styles";
    style.textContent = `
          .tilab-caller-body {
            overflow: hidden;
          }
        `;
    document.head.appendChild(style);
  }

  function toggleBodyClass(action) {
    if (action === "add") {
      document.body.classList.add("tilab-caller-body");
    } else if (action === "remove") {
      document.body.classList.remove("tilab-caller-body");
    }
  }

  function createNotifyContainer() {
    if (!document.getElementById("tilab-notify-container")) {
      const container = document.createElement("div");
      container.id = "tilab-notify-container";
      container.classList.add("tilab-notify-container");
      const style = document.createElement("style");
      style.id = "tilab-notify-styles";
      style.textContent = `
          .tilab-notify-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 300px;
          }
          
          @media (max-width: 768px) {
            .tilab-notify-container {
              top: 50%;
              right: 50%;
              transform: translateX(50%);
            }
          }
        `;
      document.head.appendChild(style);
      document.body.appendChild(container);
    }
  }

  function fadeOut(element, duration) {
    if (!element || !element.parentNode) return;

    element.style.transition = `opacity ${duration}ms ease-out`;
    element.style.opacity = "0";

    setTimeout(() => {
      closeModal(element);
    }, duration);
  }

  function closeModal(element) {
    if (element && element.parentNode) {
      element.remove();
      toggleBodyClass("remove");
    }
  }

  function create(options = {}) {
    const { type, html, duration, out = 0 } = options;
    if (!type || !html) {
      window.TiLab.console.warn(
        "Caller.js",
        "Необходимо указать type и html для создания шаблона"
      );
    }
    if (type !== "modal" && type !== "notify") {
      window.TiLab.console.warn(
        "Caller.js",
        'type должен быть "modal" или "notify"'
      );
    }

    templates.set(type, html);

    if (type === "notify") {
      notifySettings.set(type, { duration, out });
      createNotifyContainer();
    } else if (type === "modal") {
      notifySettings.set(type, { duration, out });
    }

    window.TiLab.console.info("Caller.js", `Шаблон "${type}" создан успешно`);
  }

  function push(options = {}) {
    const { to, type, content = {}, btn, duration, out } = options;

    if (!to) {
      window.TiLab.console.warn(
        "Caller.js",
        "Необходимо указать to: 'modal' или 'notify' для использования"
      );
    }

    const template = templates.get(to);
    if (!template) {
      window.TiLab.console.warn(
        "Caller.js",
        `Шаблон "${to}" не найден. Сначала создайте его с помощью функции create`
      );
      return;
    }

    let processedHtml = template;
    if (btn) {
      processedHtml = processedHtml.replace(/\$\[btns\]/g, btn);
    } else {
      processedHtml = processedHtml.replace(/\$\[btns\]/g, "");
    }

    Object.keys(content).forEach((key) => {
      const regex = new RegExp(`\\$\\[${key}\\]`, "g");
      processedHtml = processedHtml.replace(regex, content[key]);
    });

    const container = document.createElement("div");
    container.innerHTML = processedHtml;
    const element = container.firstElementChild;

    if (type && element) {
      element.classList.add(type);
    }

    if (btn) {
      const buttons = element.querySelectorAll("button");
      buttons.forEach((button) => {
        const originalOnclick = button.getAttribute("onclick");
        if (originalOnclick) {
          const handler = new Function(originalOnclick);
          button.onclick = handler;
        }
      });
    }

    if (to === "modal") {
      element.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
      document.body.appendChild(element);

      toggleBodyClass("add");

      const settings = notifySettings.get(to);
      const finalDuration = duration || (settings ? settings.duration : null);
      const outDuration = out !== undefined ? out : settings ? settings.out : 0;

      if (finalDuration) {
        setTimeout(() => {
          if (element.parentNode) {
            if (outDuration > 0) {
              fadeOut(element, outDuration);
            } else {
              closeModal(element);
            }
          }
        }, finalDuration);
      }

      element.addEventListener("click", (e) => {
        if (e.target === element) {
          if (outDuration > 0) {
            fadeOut(element, outDuration);
          } else {
            closeModal(element);
          }
        }
      });

      const closeElements = element.querySelectorAll(".close");
      closeElements.forEach((closeEl) => {
        closeEl.addEventListener("click", () => {
          if (outDuration > 0) {
            fadeOut(element, outDuration);
          } else {
            closeModal(element);
          }
        });
      });
    } else if (to === "notify") {
      element.style.cssText = `
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                padding: 16px;
                margin-bottom: 10px;
            `;

      const container = document.querySelector(".tilab-notify-container");
      if (container) {
        container.appendChild(element);
      } else {
        createNotifyContainer();
        document.querySelector(".tilab-notify-container").appendChild(element);
      }

      const settings = notifySettings.get(to);
      const finalDuration = duration || (settings ? settings.duration : 5000);
      const outDuration = out !== undefined ? out : settings ? settings.out : 0;

      setTimeout(() => {
        if (element.parentNode) {
          if (outDuration > 0) {
            fadeOut(element, outDuration);
          } else {
            element.remove();
          }
        }
      }, finalDuration);

      const closeElements = element.querySelectorAll(".close");
      closeElements.forEach((closeEl) => {
        closeEl.addEventListener("click", () => {
          if (outDuration > 0) {
            fadeOut(element, outDuration);
          } else {
            element.remove();
          }
        });
      });
    }
  }

  if (window.TiLabExport) {
    window.TiLabExport({
      name: "Caller.js",
      desc: "Библиотека для создания информеров (Модальные окна, уведомления)",
      exports: {
        create,
        push,
      },
    });
  }

  if (window.TiLab && window.TiLab.console) {
    window.TiLab.console.log("Caller.js", "API успешно инициализирован");
  }
})();
