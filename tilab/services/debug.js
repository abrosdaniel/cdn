(function (window) {
  // ============================
  // ЧАСТЬ 1: HTML И СТИЛИ ПАНЕЛИ
  // ============================
  const html = `
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

  // =============================
  // ЧАСТЬ 2: БИЗНЕС-ЛОГИКА ПАНЕЛИ
  // =============================

  /**
   * Основной объект, содержащий функциональность панели
   */
  const TiLabPanel = {
    // Ссылки на DOM элементы
    elements: {
      container: null,
      frame: null,
      console: null,
      versionElement: null,
    },

    // Менеджеры для UI и состояния
    ui: null,
    state: null,

    /**
     * Создает и настраивает менеджер UI
     * @returns {Object} Менеджер UI
     */
    createUIManager() {
      const uiManager = {
        container: this.elements.container,
        renderers: new Map(),

        /**
         * Регистрирует рендерер для определенного пути данных
         * @param {string} key - Путь к данным
         * @param {Function} renderFn - Функция рендеринга
         * @returns {Object} Менеджер UI для цепочки вызовов
         */
        registerRenderer(key, renderFn) {
          this.renderers.set(key, renderFn);
          return this;
        },

        /**
         * Обновляет UI на основе пути и значения
         * @param {string} path - Путь к данным
         * @param {*} value - Значение для отображения
         */
        update(path, value) {
          if (this.renderers.has(path)) {
            this.renderers.get(path)(this.container, value);
          }
        },

        /**
         * Форматирует временную метку в удобный для чтения формат
         * @param {number} timestamp - Временная метка
         * @returns {string} Отформатированное время
         */
        formatTime(timestamp) {
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
        },

        /**
         * Создает элемент лога для отображения
         * @param {Object} log - Объект лога
         * @returns {HTMLElement} Элемент лога
         */
        createLogElement(log) {
          const logElement = document.createElement("div");
          logElement.className = `tilab-log tilab-log-${log.type || "info"}`;

          // Заголовок
          const header = document.createElement("div");
          header.className = "tilab-log-header";

          const name = document.createElement("span");
          name.className = "tilab-log-name";
          name.textContent = log.name || "Unknown";
          header.appendChild(name);

          const time = document.createElement("span");
          time.className = "tilab-log-time";
          time.textContent = this.formatTime(log.time || Date.now());
          header.appendChild(time);

          logElement.appendChild(header);

          // Сообщение
          if (log.message) {
            const message = document.createElement("div");
            message.className = "tilab-log-message";
            message.textContent = log.message;
            logElement.appendChild(message);
          }

          // Данные
          if (log.data !== undefined) {
            const dataElement = document.createElement("div");
            dataElement.className = "tilab-log-data";

            try {
              dataElement.textContent = JSON.stringify(log.data, null, 2);
            } catch (e) {
              dataElement.textContent = String(log.data);
            }

            logElement.appendChild(dataElement);
          }

          return logElement;
        },

        /**
         * Регистрирует стандартные рендереры
         */
        registerDefaultRenderers() {
          // Рендерер для версии
          this.registerRenderer("version", (container, value) => {
            const versionElement = container.querySelector(".tilab-logo-desc");
            if (versionElement) {
              versionElement.textContent = `Версия: ${value}`;
            }
          });

          // Рендерер для логов
          this.registerRenderer("debug.storage", (container, logs) => {
            const consoleElement = container.querySelector(".tilab-console");
            if (!consoleElement) return;

            consoleElement.innerHTML = "";

            if (!logs || logs.length === 0) {
              consoleElement.innerHTML =
                '<div style="padding: 16px; color: #98a2b3;">Нет логов для отображения</div>';
              return;
            }

            const fragment = document.createDocumentFragment();

            logs
              .slice()
              .reverse()
              .forEach((log) => {
                fragment.appendChild(this.createLogElement(log));
              });

            consoleElement.appendChild(fragment);
          });
        },
      };

      // Регистрируем стандартные рендереры
      uiManager.registerDefaultRenderers();

      return uiManager;
    },

    /**
     * Создает и настраивает менеджер состояния
     * @param {Object} uiManager - Менеджер UI
     * @returns {Object} Менеджер состояния
     */
    createStateManager(uiManager) {
      const stateManager = {
        uiManager,
        pathHandlers: new Map(),

        /**
         * Регистрирует обработчик для определенного пути данных
         * @param {string} path - Путь к данным
         * @param {Function} handler - Функция обработчик
         * @returns {Object} Менеджер состояния для цепочки вызовов
         */
        registerPathHandler(path, handler) {
          this.pathHandlers.set(path, handler);
          return this;
        },

        /**
         * Регистрирует стандартные обработчики
         */
        registerDefaultHandlers() {
          this.registerPathHandler("version", (value) => {
            this.uiManager.update("version", value);
          });

          this.registerPathHandler("debug.storage", (value) => {
            this.uiManager.update("debug.storage", value);
          });
        },

        /**
         * Создает прокси для существующего объекта без его замены
         * @param {Object} obj - Исходный объект
         * @returns {Object} Исходный объект с внутренними прокси
         */
        wrapExistingObject(obj) {
          // Сохраняем ссылку на оригинальный объект
          const originalObj = obj;

          // Создаем прокси для всех вложенных объектов
          this.deepProxyify(originalObj);

          // Возвращаем оригинальный объект, который теперь содержит прокси внутри
          return originalObj;
        },

        /**
         * Рекурсивно создает прокси для всех вложенных объектов
         * @param {Object} obj - Объект для обработки
         * @param {string} path - Текущий путь в объекте
         */
        deepProxyify(obj, path = "") {
          if (obj === null || typeof obj !== "object") {
            return;
          }

          // Обрабатываем каждое свойство объекта
          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const value = obj[key];
              const currentPath = path ? `${path}.${key}` : key;

              // Если это объект или массив, создаем для него прокси
              if (value !== null && typeof value === "object") {
                // Создаем прокси для текущего свойства
                obj[key] = this.createProxy(value, currentPath);

                // Рекурсивно обрабатываем вложенные свойства
                this.deepProxyify(obj[key], currentPath);
              }
            }
          }
        },

        /**
         * Создает прокси для объекта
         * @param {Object} obj - Исходный объект
         * @param {string} path - Путь к объекту
         * @returns {Proxy} Прокси объект
         */
        createProxy(obj, path) {
          const self = this;

          return new Proxy(obj, {
            get(target, prop) {
              // Специальная обработка для методов массива
              if (Array.isArray(target) && typeof target[prop] === "function") {
                const method = target[prop];

                // Перехватываем методы, которые изменяют массив
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
                    self.notifyChange(path, target);
                    return result;
                  };
                }
              }

              return target[prop];
            },

            set(target, prop, value) {
              const oldValue = target[prop];
              target[prop] = value;

              const currentPath = path ? `${path}.${prop}` : prop;

              // Если значение - объект, создаем для него прокси
              if (
                value !== null &&
                typeof value === "object" &&
                !Object.isFrozen(value)
              ) {
                target[prop] = self.createProxy(value, currentPath);
                self.deepProxyify(target[prop], currentPath);
              }

              // Уведомляем об изменении
              self.notifyChange(currentPath, value);

              // Если это массив и изменилась его длина, уведомляем о его изменении
              if (Array.isArray(target) && prop === "length") {
                self.notifyChange(path, target);
              }

              return true;
            },

            deleteProperty(target, prop) {
              if (prop in target) {
                delete target[prop];

                const currentPath = path ? `${path}.${prop}` : prop;
                self.notifyChange(currentPath, undefined);

                // Уведомляем о изменении родительского объекта
                if (path) {
                  self.notifyChange(path, target);
                }
              }

              return true;
            },
          });
        },

        /**
         * Уведомляет об изменениях в данных
         * @param {string} path - Путь к измененным данным
         * @param {*} value - Новое значение
         */
        notifyChange(path, value) {
          // Проверяем, есть ли обработчик для этого пути
          if (this.pathHandlers.has(path)) {
            this.pathHandlers.get(path)(value);
          }

          // Проверяем родительские пути
          const parts = path.split(".");
          while (parts.length > 1) {
            parts.pop();
            const parentPath = parts.join(".");

            if (this.pathHandlers.has(parentPath)) {
              const parentValue = this.getValueByPath(window.TiLab, parentPath);
              this.pathHandlers.get(parentPath)(parentValue);
            }
          }
        },

        /**
         * Получает значение по пути в объекте
         * @param {Object} obj - Исходный объект
         * @param {string} path - Путь к значению
         * @returns {*} Значение по указанному пути
         */
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
      };

      // Регистрируем стандартные обработчики
      stateManager.registerDefaultHandlers();

      return stateManager;
    },

    /**
     * Настраивает обработку перетаскивания панели
     * @param {HTMLElement} dragHandle - Элемент для перетаскивания
     * @param {HTMLElement} container - Контейнер панели
     * @param {HTMLElement} frame - Рамка панели
     */
    setupDragHandling(dragHandle, container, frame) {
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
    },

    /**
     * Настраивает переключение состояния панели (открыто/закрыто)
     * @param {NodeList} stateButtons - Кнопки для переключения состояния
     * @param {HTMLElement} frame - Рамка панели
     */
    setupStateToggle(stateButtons, frame) {
      stateButtons.forEach((button) =>
        button.addEventListener("click", () => {
          const currentState = frame.getAttribute("data-state") === "true";
          frame.setAttribute("data-state", (!currentState).toString());
        })
      );
    },

    /**
     * Экспортирует публичные методы для использования извне
     * @returns {Object} Публичное API
     */
    exportPublicAPI() {
      return {
        /**
         * Добавляет новый рендерер для отображения данных
         * @param {string} path - Путь к данным
         * @param {Function} renderFn - Функция рендеринга
         */
        addRenderer: (path, renderFn) => {
          this.ui.registerRenderer(path, renderFn);
        },

        /**
         * Добавляет обработчик для отслеживания изменений данных
         * @param {string} path - Путь к данным
         * @param {Function} handler - Функция обработчик
         */
        addPathHandler: (path, handler) => {
          this.state.registerPathHandler(path, handler);
        },

        /**
         * Обновляет UI для указанного пути
         * @param {string} path - Путь к данным
         * @param {*} value - Значение для отображения
         */
        updateUI: (path, value) => {
          this.ui.update(path, value);
        },
      };
    },
  };

  // =============================
  // ЧАСТЬ 3: ИНИЦИАЛИЗАЦИЯ ПАНЕЛИ
  // =============================

  /**
   * Инициализирует панель отладки
   */
  function initializeDebugPanel() {
    // Создаем DOM элементы
    const container = document.createElement("div");
    container.classList.add("tilab");
    container.innerHTML = html;
    document.body.appendChild(container);

    // Получаем ссылки на основные элементы
    const frame = container.querySelector(".tilab-frame");
    const stateButtons = container.querySelectorAll(".tilab-state");
    const dragHandle = container.querySelector(".tilab-drag-handle");

    // Сохраняем ссылки на элементы
    TiLabPanel.elements = {
      container,
      frame,
      console: container.querySelector(".tilab-console"),
      versionElement: container.querySelector(".tilab-logo-desc"),
    };

    // Настраиваем переключение состояния панели
    TiLabPanel.setupStateToggle(stateButtons, frame);

    // Настраиваем перетаскивание панели
    if (dragHandle) {
      TiLabPanel.setupDragHandling(dragHandle, container, frame);
    }

    // Создаем менеджер UI
    TiLabPanel.ui = TiLabPanel.createUIManager();

    // Создаем менеджер состояния
    TiLabPanel.state = TiLabPanel.createStateManager(TiLabPanel.ui);

    // Оборачиваем существующий объект TiLab в прокси
    TiLabPanel.state.wrapExistingObject(window.TiLab);

    // Первоначальное обновление UI
    TiLabPanel.ui.update("version", window.TiLab.version);
    TiLabPanel.ui.update("debug.storage", window.TiLab.debug?.storage);

    // Добавляем публичное API к объекту TiLab
    window.TiLab._panel = TiLabPanel.exportPublicAPI();
  }

  // Запуск инициализации
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDebugPanel);
  } else {
    initializeDebugPanel();
  }
})(window);
