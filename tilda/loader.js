/*!
 * Loader.js v0.0
 * (c) 2025
 * by Daniel Abros
 * Сайт → https://abrosdaniel.com
 * Telegram → https://t.me/abrosdaniel
 * <script src="https://cdn.abros.dev/tilda/loader.js"></script>
 */

class TiLoader {
  constructor(options = {}) {
    this.type = options.type || null;
    this.start = options.start || null;
    this.triggers = options.triggers || null;
    this.click = options.click || null;
    this.opacity = options.opacity || null;
    this.transition = options.transition || null;
    this.init();
  }

  init() {
    this.initStyle();
    if (this.start) {
      document.addEventListener("DOMContentLoaded", () => {
        window.scrollTo(0, 0);
      });
    }
    if (this.type === "click") {
      this.initClick(this.triggers, this.click, this.opacity, this.transition);
    }
    if (this.keylogger) {
      this.initKeylogger(this.keylogger);
    }
    if (this.blocker) {
      this.initBlocker(this.blocker, this.host);
    }
  }

  hideElements(options) {
    const { settings } = options;
    settings.opacity.forEach((selector) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.transition = `opacity ${settings.transition.duration}s ${settings.transition.type}`;
        element.style.transitionDelay = `${settings.transition.delay}s`;
        element.style.opacity = "0";

        setTimeout(() => {
          element.style.pointerEvents = "none";
        }, (settings.transition.duration + settings.transition.delay) * 1000);
      }
    });
  }

  initStyle() {
    var stylePlayer = document.createElement("style");
    stylePlayer.textContent = `
    #id-блока {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      opacity: 1;
    }
    body {
      overflow: hidden;
    }
    .abr-startbutton {
      cursor: pointer;
    }
    `;
    document.head.appendChild(stylePlayer);
  }

  initClick(options) {
    const { settings } = options;
    const body = document.querySelector("body");
    settings.trigger.forEach((selector) => {
      const triggerElement = document.querySelector(selector);
      if (triggerElement) {
        triggerElement.addEventListener("click", () => {
          this.hideElements(settings.opacity, settings.transition);
          body.style.overflow = "auto";
          settings.click.forEach((clickSelector) => {
            const element = document.querySelector(clickSelector);
            if (element) {
              element.click();
            }
          });
        });
      }
    });
  }
}

if (typeof window !== "undefined") {
  window.TiLoader = TiLoader;
}
