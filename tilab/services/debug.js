(function (window) {
  // ========================= ЗАГРУЗКА ЗАВИСИМОСТЕЙ =========================

  async function loadDependencies() {
    try {
      // Загрузка скриптов параллельно
      await Promise.all([
        loadScript(
          "https://cdn.jsdelivr.net/npm/preact@10.15.1/dist/preact.min.js"
        ),
        loadScript("https://cdn.jsdelivr.net/npm/htm@3.1.1/dist/htm.umd.js"),
      ]);

      window.html = window.htm.bind(window.preact.h);
      initializeDebugPanel();
    } catch (error) {
      console.error(
        "Failed to load dependencies for TiLab debug panel:",
        error
      );
    }
  }

  function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // ========================= СОСТОЯНИЕ И РЕАКТИВНОСТЬ =========================

  // Управление состоянием и подписками
  const StateManager = {
    subscribers: new Map(),

    // Получение значения по пути в объекте
    getValueByPath(obj, path) {
      if (!path) return obj;
      return path
        .split(".")
        .reduce(
          (acc, part) =>
            acc !== null && acc !== undefined ? acc[part] : undefined,
          obj
        );
    },

    // Подписка на изменения
    subscribe(path, callback) {
      if (!this.subscribers.has(path)) {
        this.subscribers.set(path, new Set());
      }
      this.subscribers.get(path).add(callback);

      // Сразу вызываем колбэк с текущим значением
      const value = this.getValueByPath(window.TiLab, path);
      callback(value);

      return () => this.unsubscribe(path, callback);
    },

    // Отписка от изменений
    unsubscribe(path, callback) {
      const subscribers = this.subscribers.get(path);
      if (subscribers) {
        subscribers.delete(callback);
        if (subscribers.size === 0) {
          this.subscribers.delete(path);
        }
      }
    },

    // Уведомление подписчиков об изменениях
    notify(path, value) {
      const subscribers = this.subscribers.get(path);
      if (subscribers) {
        subscribers.forEach((callback) => callback(value));
      }

      // Уведомляем подписчиков родительских путей
      const parts = path.split(".");
      while (parts.length > 1) {
        parts.pop();
        const parentPath = parts.join(".");
        const parentSubscribers = this.subscribers.get(parentPath);

        if (parentSubscribers) {
          const parentValue = this.getValueByPath(window.TiLab, parentPath);
          parentSubscribers.forEach((callback) => callback(parentValue));
        }
      }
    },

    // Создание прокси-объекта для отслеживания изменений
    createProxy(obj, path = "") {
      if (obj === null || typeof obj !== "object" || Object.isFrozen(obj)) {
        return obj;
      }

      const self = this;
      const arrayMethods = [
        "push",
        "pop",
        "shift",
        "unshift",
        "splice",
        "sort",
        "reverse",
      ];

      return new Proxy(obj, {
        get(target, prop) {
          // Перехват методов массива для уведомления о изменениях
          if (
            Array.isArray(target) &&
            typeof target[prop] === "function" &&
            arrayMethods.includes(prop)
          ) {
            return function (...args) {
              const result = target[prop].apply(target, args);
              self.notify(path, target);
              return result;
            };
          }
          return target[prop];
        },

        set(target, prop, value) {
          target[prop] = value;
          const currentPath = path ? `${path}.${prop}` : prop;

          // Рекурсивно создаем прокси для вложенных объектов
          if (
            value !== null &&
            typeof value === "object" &&
            !Object.isFrozen(value)
          ) {
            target[prop] = self.createProxy(value, currentPath);
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
            if (path) self.notify(path, target);
          }
          return true;
        },
      });
    },

    // Инициализация объекта TiLab
    initTiLab() {
      // Оборачиваем существующий объект
      this.wrapExistingObject(window.TiLab);
    },

    // Рекурсивное оборачивание существующего объекта
    wrapExistingObject(obj) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          if (value !== null && typeof value === "object") {
            obj[key] = this.createProxy(value, key);
            this.wrapExistingObject(obj[key]);
          }
        }
      }
    },
  };

  // ========================= КОМПОНЕНТЫ =========================

  // Вспомогательные функции для компонентов
  const ComponentUtils = {
    // Кеш для форматированных временных меток
    timeCache: new Map(),

    // Форматирование времени с кешированием
    formatTime(timestamp) {
      if (this.timeCache.has(timestamp)) return this.timeCache.get(timestamp);

      const date = new Date(timestamp);
      const formatted =
        [
          date.getHours().toString().padStart(2, "0"),
          date.getMinutes().toString().padStart(2, "0"),
          date.getSeconds().toString().padStart(2, "0"),
        ].join(":") +
        "." +
        date.getMilliseconds().toString().padStart(3, "0");

      this.timeCache.set(timestamp, formatted);

      // Очистка кеша при необходимости
      if (this.timeCache.size > 1000) {
        const keys = Array.from(this.timeCache.keys()).slice(0, 500);
        keys.forEach((key) => this.timeCache.delete(key));
      }

      return formatted;
    },

    // Кеш для JSON-строк
    jsonCache: new Map(),

    // Преобразование объекта в JSON с кешированием
    objectToJson(data, cacheKey) {
      if (!this.jsonCache.has(cacheKey)) {
        this.jsonCache.set(cacheKey, JSON.stringify(data, null, 2));

        // Очистка кеша при необходимости
        if (this.jsonCache.size > 200) {
          const keys = Array.from(this.jsonCache.keys()).slice(0, 100);
          keys.forEach((key) => this.jsonCache.delete(key));
        }
      }
      return this.jsonCache.get(cacheKey);
    },
  };

  // Создание компонентов
  function createComponents() {
    // Компонент для отображения одного лога
    const LogItem = ({ log }) => {
      const type = log.type || "info";
      const name = log.name || "Unknown";
      const time = ComponentUtils.formatTime(log.time || Date.now());

      let dataContent = null;
      if (log.data !== undefined) {
        let dataString;
        if (typeof log.data === "object") {
          const cacheKey = `log_${log.time}_${JSON.stringify(log.data).slice(
            0,
            50
          )}`;
          dataString = ComponentUtils.objectToJson(log.data, cacheKey);
        } else {
          dataString = String(log.data);
        }

        dataContent = window.html`<div class="tilab-log-data">${dataString}</div>`;
      }

      return window.html`
        <div class=${`tilab-log tilab-log-${type}`}>
          <div class="tilab-log-header">
            <span class="tilab-log-name">${name}</span>
            <span class="tilab-log-time">${time}</span>
          </div>
          ${
            log.message
              ? window.html`<div class="tilab-log-message">${log.message}</div>`
              : null
          }
          ${dataContent}
        </div>
      `;
    };

    // Компонент для отображения списка логов
    const LogsList = ({ logs }) => {
      if (!logs || logs.length === 0) {
        return window.html`<div style="padding: 16px; color: #98a2b3;">Нет логов для отображения</div>`;
      }

      // Создаем перевернутую копию массива только один раз
      const reversedLogs = logs.slice().reverse();

      return window.html`
        <${window.preact.Fragment}>
          ${reversedLogs.map(
            (log) => window.html`<${LogItem} log=${log} key=${log.time} />`
          )}
        <//>
      `;
    };

    // Компонент для отображения версии
    const VersionDisplay = ({ version }) =>
      window.html`<span>Версия: ${version || "1.0.0"}</span>`;

    // Основной компонент панели отладки
    const DebugPanel = () => {
      return window.html`
        <style>${styles}</style>
        <div class="tilab-frame" data-state="true">
          <aside aria-label="TiLab debug">
            <div class="tilab-drag-handle"></div>
            <button aria-label="Close TiLab debug" class="tilab-close tilab-state">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <div class="tilab-section">
              <div class="tilab-header">
                <div class="tilab-logo">
                  <span class="tilab-logo-tilab">TILAB</span>
                  <span class="tilab-logo-desc" id="tilab-version">Версия: 1.0.0</span>
                </div>
                <div class="tilab-status"></div>
              </div>
              <div class="tilab-console" id="tilab-console"></div>
            </div>
            <div class="tilab-section"></div>
          </aside>
          <button class="tilab-open tilab-state"></button>
        </div>
      `;
    };

    return { LogItem, LogsList, VersionDisplay, DebugPanel };
  }

  // ========================= СТИЛИ =========================

  const styles = `
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
      gap: calc(var(--tsqd-font-size) * 0.125);
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
    .tilab-log-info { border-color: #3b82f6; }
    .tilab-log-warn { border-color: #f59e0b; }
    .tilab-log-error { border-color: #ef4444; }
    .tilab-log-trace { border-color: #8b5cf6; }
    .tilab-log-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: calc(var(--tsqd-font-size) * 0.125);
      font-weight: bold;
    }
    .tilab-log-name { color: #e5e7eb; }
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
  `;

  // ========================= ИНИЦИАЛИЗАЦИЯ ПАНЕЛИ =========================

  // Настройка перетаскивания панели
  function setupDragHandling(dragHandle, container, frame) {
    if (!dragHandle || !container || !frame) return;

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

  // Настройка реактивных компонентов
  function setupReactiveComponents() {
    // Отображение версии
    const versionElement = document.getElementById("tilab-version");
    if (versionElement) {
      const unsubscribeVersion = StateManager.subscribe(
        "version",
        (version) => {
          window.preact.render(
            window.html`<span>Версия: ${version || "1.0.0"}</span>`,
            versionElement
          );
        }
      );
    }

    // Отображение логов
    const consoleElement = document.getElementById("tilab-console");
    if (consoleElement) {
      const { LogsList } = createComponents();
      const unsubscribeLogs = StateManager.subscribe(
        "debug.storage",
        (logs) => {
          window.preact.render(
            window.html`<${LogsList} logs=${logs} />`,
            consoleElement
          );
        }
      );
    }
  }

  // Инициализация панели отладки
  function initializeDebugPanel() {
    // Инициализация TiLab
    StateManager.initTiLab();

    // Создаем контейнер
    const container = document.createElement("div");
    container.classList.add("tilab");
    document.body.appendChild(container);

    // Получаем компоненты и рендерим основную панель
    const { DebugPanel } = createComponents();
    window.preact.render(window.html`<${DebugPanel} />`, container);

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

    // Настраиваем реактивные компоненты
    setupReactiveComponents();
  }

  // Запускаем загрузку зависимостей
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadDependencies);
  } else {
    loadDependencies();
  }
})(window);
