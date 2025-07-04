(function (window) {
  const template = `
    <style>
    .tilab {
    display: block;
      position: fixed;
      z-index: 99999999;
      left: 0;
      bottom: 0;
      margin: 0 !important;
      padding: 0 !important;
      font-size: 16px !important;
      --tsqd-panel-height: 500px;
      --tsqd-font-size: 16px;
    }
      .tilab * {
        box-sizing: border-box !important;
        text-transform: none !important;
        font-family: ui-sans-serif, Inter, system-ui, sans-serif, sans-serif;
        color: #d0d5dd;
        text-align: left;
      }
      .tilab-frame {
        width: 100vw;
        height: var(--tsqd-panel-height);
        position: relative;
        transition: height 0.3s ease-in-out;
      }
      .tilab-frame[data-state="false"] {
        height: 0;
      }
      .tilab-frame.dragging {
        transition: none;
      }
      .tilab aside {
        width: 100%;
        height: 100%;
        flex-direction: row;
        background-color: #0b0d10;
        max-height: 90%;
        min-height: calc(var(--tsqd-font-size) * 3.5);
        position: fixed;
        z-index: 9999;
        display: flex;
        gap: calc(var(--tsqd-font-size) * 0.125);
      }
      .tilab-drag-handle {
        position: absolute;
        transition: background-color 0.125s ease;
        z-index: 4;
        top: 0;
        width: 100%;
        height: 3px;
        cursor: ns-resize;
      }
      .tilab-drag-handle:hover {
        background-color: #9b8afbe5;
      }
      .tilab-close {
        position: absolute;
        cursor: pointer;
        z-index: 5;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        background-color: #191c24;
        top: 0;
        right: calc(var(--tsqd-font-size) * 0.5);
        transform: translate(0, -100%);
        border-right: #394056 1px solid;
        border-left: #394056 1px solid;
        border-top: #394056 1px solid;
        border-bottom: none;
        border-radius: calc(var(--tsqd-font-size) * 0.25)
          calc(var(--tsqd-font-size) * 0.25) 0px 0px;
        padding: calc(var(--tsqd-font-size) * 0.25)
          calc(var(--tsqd-font-size) * 0.375)
          calc(var(--tsqd-font-size) * 0.125)
          calc(var(--tsqd-font-size) * 0.375);
      }
      .tilab-close:hover {
        background-color: #292e3d;
      }
      .tilab-close::after {
        content: " ";
        position: absolute;
        top: 100%;
        left: -calc(var(--tsqd-font-size) * 0.625);
        height: calc(var(--tsqd-font-size) * 0.375);
        width: calc(100% + calc(var(--tsqd-font-size) * 1.25));
      }
      .tilab-close svg {
        color: #98a2b3;
        width: calc(var(--tsqd-font-size) * 0.5);
        height: calc(var(--tsqd-font-size) * 0.5);
      }
      .tilab-section {
        flex: 1 1 700px;
        background-color: #191c24;
        display: flex;
        flex-direction: column;
      }
      .tilab-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: calc(var(--tsqd-font-size) * 0.5)
          calc(var(--tsqd-font-size) * 0.625);
        gap: calc(var(--tsqd-font-size) * 0.625);
        border-bottom: #292e3d 1px solid;
      }
      .tilab-logo {
        display: flex;
        flex-direction: column;
        background-color: transparent;
        border: none;
        gap: calc(var(--tsqd-font-size) 16px * 0.125);
        padding: 0px;
      }
      .tilab-logo-tilab {
        font-size: var(--tsqd-font-size);
        font-weight: 700;
        line-height: calc(var(--tsqd-font-size) * 1);
        white-space: nowrap;
        color: #d0d5dd;
      }
      .tilab-logo-desc {
        font-weight: 600;
        font-size: calc(var(--tsqd-font-size) * 0.75);
        background: linear-gradient(to right, #dd524b, #e9a03b);
        background-clip: text;
        -webkit-background-clip: text;
        line-height: 1;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      }
      .tilab-console {
        flex: 1;
        overflow-y: auto;
        padding: calc(var(--tsqd-font-size) * 0.5);
        font-family: monospace;
        font-size: calc(var(--tsqd-font-size) * 0.875);
      }
      .tilab-log {
        margin-bottom: calc(var(--tsqd-font-size) * 0.25);
        padding: calc(var(--tsqd-font-size) * 0.25);
        border-left: 3px solid;
        background-color: rgba(255, 255, 255, 0.05);
      }
      .tilab-log-info {
        border-color: #3b82f6;
      }
      .tilab-log-warn {
        border-color: #f59e0b;
      }
      .tilab-log-error {
        border-color: #ef4444;
      }
      .tilab-log-trace {
        border-color: #8b5cf6;
      }
      .tilab-log-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: calc(var(--tsqd-font-size) * 0.125);
        font-weight: bold;
      }
      .tilab-log-name {
        color: #e5e7eb;
      }
      .tilab-log-time {
        color: #9ca3af;
        font-size: calc(var(--tsqd-font-size) * 0.75);
      }
      .tilab-log-message {
        color: #d1d5db;
        margin-bottom: calc(var(--tsqd-font-size) * 0.25);
      }
      .tilab-log-data {
        background-color: rgba(0, 0, 0, 0.2);
        padding: calc(var(--tsqd-font-size) * 0.25);
        border-radius: 4px;
        overflow-x: auto;
        font-family: monospace;
        color: #a3a3a3;
      }
    </style>
    <div class="tilab-frame" data-state="true">
      <aside aria-label="TiLab debug">
        <div class="tilab-drag-handle"></div>
        <button aria-label="Close TiLab debug" class="tilab-close tilab-state">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              stroke-width="1.66667"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </button>
        <div class="tilab-section">
          <div class="tilab-header">
            <div class="tilab-logo">
              <span class="tilab-logo-tilab">TILAB</span>
              <span class="tilab-logo-desc">Версия: 1.0.0</span>
            </div>
            <div class="tilab-status"></div>
          </div>
          <div class="tilab-console"></div>
        </div>
        <div class="tilab-section">
        </div>
      </aside>
      <button class="tilab-open tilab-state"></button>
    </div>`;

  // ПРОВАЙДЕРЫ И УТИЛИТЫ

  const ProxyManager = {
    subscribers: new Map(),

    subscribe(path, callback) {
      if (!this.subscribers.has(path)) {
        this.subscribers.set(path, new Set());
      }
      this.subscribers.get(path).add(callback);
      return () => this.unsubscribe(path, callback);
    },

    unsubscribe(path, callback) {
      if (this.subscribers.has(path)) {
        this.subscribers.get(path).delete(callback);
      }
    },

    notify(path, value) {
      if (this.subscribers.has(path)) {
        this.subscribers.get(path).forEach((callback) => callback(value));
      }

      const parts = path.split(".");
      while (parts.length > 1) {
        parts.pop();
        const parentPath = parts.join(".");

        if (this.subscribers.has(parentPath)) {
          const parentValue = this.getValueByPath(window.TiLab, parentPath);
          this.subscribers
            .get(parentPath)
            .forEach((callback) => callback(parentValue));
        }
      }
    },

    getValueByPath(obj, path) {
      if (!path) return obj;

      const parts = path.split(".");
      let current = obj;

      for (const part of parts) {
        if (current === null || current === undefined) {
          return undefined;
        }
        current = current[part];
      }

      return current;
    },

    createProxyObject(obj, path = "") {
      if (obj === null || typeof obj !== "object") {
        return obj;
      }

      const self = this;

      return new window.Proxy(obj, {
        get(target, prop) {
          if (Array.isArray(target) && typeof target[prop] === "function") {
            const method = target[prop];

            if (
              [
                "push",
                "pop",
                "shift",
                "unshift",
                "splice",
                "sort",
                "reverse",
              ].includes(prop)
            ) {
              return function (...args) {
                const result = method.apply(target, args);
                self.notify(path, target);
                return result;
              };
            }
          }

          return target[prop];
        },

        set(target, prop, value) {
          target[prop] = value;

          const currentPath = path ? `${path}.${prop}` : prop;

          if (
            value !== null &&
            typeof value === "object" &&
            !Object.isFrozen(value)
          ) {
            target[prop] = self.createProxyObject(value, currentPath);
          }

          self.notify(currentPath, value);

          if (Array.isArray(target) && prop === "length") {
            self.notify(path, target);
          }

          return true;
        },

        deleteProperty(target, prop) {
          if (prop in target) {
            delete target[prop];

            const currentPath = path ? `${path}.${prop}` : prop;
            self.notify(currentPath, undefined);

            if (path) {
              self.notify(path, target);
            }
          }

          return true;
        },
      });
    },

    wrapObject(obj) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];

          if (value !== null && typeof value === "object") {
            obj[key] = this.createProxyObject(value, key);
            this.wrapObject(obj[key]);
          }
        }
      }

      return obj;
    },
  };

  // Система для связывания Preact-компонентов с данными TiLab
  const Mount = {
    mounts: new Map(),

    create(config, element, Component) {
      const id = Math.random().toString(36).substr(2, 9);

      const mount = {
        id,
        config,
        element,
        Component,
        unsubscribers: [],
        data: {},

        render() {
          // Создаем компонент-обертку, который передает данные в пропсы
          const WrappedComponent = (props) => {
            return window.preact.h(this.Component, {
              ...props,
              ...this.data,
            });
          };

          // Рендерим компонент
          window.preact.render(window.preact.h(WrappedComponent), this.element);
        },

        update(key, value) {
          this.data[key] = value;
          this.render();
        },

        subscribe() {
          for (const key in this.config) {
            const path = this.config[key].replace("@", "");

            const initialValue = ProxyManager.getValueByPath(
              window.TiLab,
              path
            );
            this.data[key] = initialValue;

            const unsubscribe = ProxyManager.subscribe(path, (value) => {
              this.update(key, value);
            });

            this.unsubscribers.push(unsubscribe);
          }

          this.render();
        },

        destroy() {
          this.unsubscribers.forEach((unsubscribe) => unsubscribe());
          this.unsubscribers = [];
          Mount.mounts.delete(this.id);
          this.element.innerHTML = "";
        },
      };

      mount.subscribe();
      Mount.mounts.set(id, mount);

      return {
        id,
        destroy: () => mount.destroy(),
      };
    },
  };

  const Func = {
    funcs: new Map(),

    create(config, callback) {
      const id = Math.random().toString(36).substr(2, 9);

      const func = {
        id,
        config,
        callback,
        unsubscribers: [],
        data: {},

        execute() {
          this.callback(this.data);
        },

        update(key, value) {
          this.data[key] = value;
          this.execute();
        },

        subscribe() {
          for (const key in this.config) {
            const path = this.config[key].replace("@", "");

            const initialValue = ProxyManager.getValueByPath(
              window.TiLab,
              path
            );
            this.data[key] = initialValue;

            const unsubscribe = ProxyManager.subscribe(path, (value) => {
              this.update(key, value);
            });

            this.unsubscribers.push(unsubscribe);
          }

          this.execute();
        },

        destroy() {
          this.unsubscribers.forEach((unsubscribe) => unsubscribe());
          this.unsubscribers = [];
          Func.funcs.delete(this.id);
        },
      };

      func.subscribe();
      Func.funcs.set(id, func);

      return {
        id,
        destroy: () => func.destroy(),
      };
    },
  };

  // Вспомогательные функции
  function formatTime(timestamp) {
    const date = new Date(timestamp);
    return (
      [
        date.getHours().toString().padStart(2, "0"),
        date.getMinutes().toString().padStart(2, "0"),
        date.getSeconds().toString().padStart(2, "0"),
      ].join(":") +
      "." +
      date.getMilliseconds().toString().padStart(3, "0")
    );
  }

  // Функция для загрузки скриптов
  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Функция для инициализации компонентов после загрузки Preact и HTM
  async function initializeComponents() {
    // Загружаем Preact и HTM
    await loadScript(
      "https://cdn.jsdelivr.net/npm/preact@10.15.1/dist/preact.min.js"
    );
    await loadScript("https://cdn.jsdelivr.net/npm/htm@3.1.1/dist/htm.umd.js");

    // Настраиваем HTM с Preact
    window.html = window.htm.bind(window.preact.h);

    // КОМПОНЕНТЫ

    // Компонент для отображения одного лога с использованием htm
    function LogItem({ log }) {
      const type = log.type || "info";
      const name = log.name || "Unknown";
      const time = formatTime(log.time || Date.now());

      return window.html`
        <div className=${`tilab-log tilab-log-${type}`}>
          <div className="tilab-log-header">
            <span className="tilab-log-name">${name}</span>
            <span className="tilab-log-time">${time}</span>
          </div>
          ${
            log.message &&
            window.html`<div className="tilab-log-message">${log.message}</div>`
          }
          ${
            log.data !== undefined &&
            window.html`
            <div className="tilab-log-data">
              ${
                typeof log.data === "object"
                  ? JSON.stringify(log.data, null, 2)
                  : String(log.data)
              }
            </div>
          `
          }
        </div>
      `;
    }

    // Компонент для отображения списка логов с использованием htm
    function LogsList({ logs }) {
      if (!logs || logs.length === 0) {
        return window.html`<div style="padding: 16px; color: #98a2b3;">
          Нет логов для отображения
        </div>`;
      }

      return window.html`
        <${window.preact.Fragment}>
          ${logs
            .slice()
            .reverse()
            .map(
              (log) => window.html`<${LogItem} log=${log} key=${log.time} />`
            )}
        <//>
      `;
    }

    // Компонент для отображения версии с использованием htm
    function VersionDisplay({ version }) {
      return window.html`<span>Версия: ${version || "1.0.0"}</span>`;
    }

    // БИЗНЕС ЛОГИКА

    function setupConsoleOutput(container) {
      const consoleElement = container.querySelector(".tilab-console");
      return Mount.create({ logs: "@debug.storage" }, consoleElement, LogsList);
    }

    function setupVersionDisplay(container) {
      const versionElement = container.querySelector(".tilab-logo-desc");
      return Mount.create(
        { version: "@version" },
        versionElement,
        VersionDisplay
      );
    }

    // Получаем ссылки на основные элементы
    const container = document.querySelector(".tilab");

    // Настраиваем отображение данных
    setupVersionDisplay(container);
    setupConsoleOutput(container);
  }

  // ИНИЦИАЛИЗАЦИЯ ПАНЕЛИ

  function setupDragHandling(dragHandle, container, frame) {
    const minHeight = 200;
    const maxHeight = window.innerHeight * 0.9;
    let startY, startHeight;

    function startDrag(e) {
      startY = e.clientY;
      startHeight = parseInt(window.getComputedStyle(frame).height);
      frame.classList.add("dragging");
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", endDrag);
      e.preventDefault();
    }

    function drag(e) {
      const deltaY = startY - e.clientY;
      const newHeight = Math.max(
        minHeight,
        Math.min(startHeight + deltaY, maxHeight)
      );
      container.style.setProperty("--tsqd-panel-height", `${newHeight}px`);
    }

    function endDrag() {
      frame.classList.remove("dragging");
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", endDrag);
    }

    dragHandle.addEventListener("mousedown", startDrag);
  }

  function initializeDebugPanel() {
    // Создаем DOM элементы
    const container = document.createElement("div");
    container.classList.add("tilab");
    container.innerHTML = template;
    document.body.appendChild(container);

    // Получаем ссылки на основные элементы
    const frame = container.querySelector(".tilab-frame");
    const stateButtons = container.querySelectorAll(".tilab-state");
    const dragHandle = container.querySelector(".tilab-drag-handle");

    // Настраиваем переключение состояния панели
    stateButtons.forEach((button) =>
      button.addEventListener("click", () => {
        const currentState = frame.getAttribute("data-state") === "true";
        frame.setAttribute("data-state", (!currentState).toString());
      })
    );

    // Настраиваем перетаскивание панели
    if (dragHandle) {
      setupDragHandling(dragHandle, container, frame);
    }

    // Оборачиваем существующий объект TiLab в прокси
    ProxyManager.wrapObject(window.TiLab);

    // Инициализируем компоненты после загрузки Preact и HTM
    initializeComponents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDebugPanel);
  } else {
    initializeDebugPanel();
  }
})(window);
