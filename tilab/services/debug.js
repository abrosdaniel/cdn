(function (window) {
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

  // Класс для управления UI компонентами
  class UIManager {
    constructor(container) {
      this.container = container;
      this.renderers = new Map();
      this.registerDefaultRenderers();
    }

    // Регистрация рендереров для разных типов данных
    registerRenderer(key, renderFn) {
      this.renderers.set(key, renderFn);
      return this;
    }

    // Регистрация стандартных рендереров
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
    }

    // Создание элемента лога
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
    }

    // Форматирование времени
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
    }

    // Обновление UI на основе пути и значения
    update(path, value) {
      if (this.renderers.has(path)) {
        this.renderers.get(path)(this.container, value);
      }
    }
  }

  // Класс для наблюдения за изменениями в объекте
  class ObjectObserver {
    constructor(uiManager) {
      this.uiManager = uiManager;
      this.observedPaths = new Set(["version", "debug.storage"]);
    }

    // Добавить наблюдение за путем
    observe(path) {
      this.observedPaths.add(path);
      return this;
    }

    // Установить обработчики для наблюдения за объектом
    setupObservers(originalObj) {
      // Сохраняем оригинальные методы для массива debug.storage
      if (originalObj.debug && Array.isArray(originalObj.debug.storage)) {
        const originalPush = originalObj.debug.storage.push;
        const originalSplice = originalObj.debug.storage.splice;
        const self = this;

        // Переопределяем метод push для отслеживания добавления логов
        originalObj.debug.storage.push = function (...items) {
          const result = originalPush.apply(this, items);
          self.uiManager.update("debug.storage", originalObj.debug.storage);
          return result;
        };

        // Переопределяем метод splice для отслеживания удаления логов
        originalObj.debug.storage.splice = function (...args) {
          const result = originalSplice.apply(this, args);
          self.uiManager.update("debug.storage", originalObj.debug.storage);
          return result;
        };
      }

      // Наблюдаем за изменениями в объекте
      this.setupMutationObserver(originalObj);

      // Первоначальное обновление UI
      this.updateAllObservedPaths(originalObj);
    }

    // Настройка MutationObserver для отслеживания изменений в DOM
    setupMutationObserver(obj) {
      // Это простая имитация наблюдения за объектом
      // В реальном приложении можно использовать более сложную логику
      const self = this;

      // Проверяем изменения каждые 500мс
      setInterval(() => {
        self.updateAllObservedPaths(obj);
      }, 500);
    }

    // Обновление всех наблюдаемых путей
    updateAllObservedPaths(obj) {
      for (const path of this.observedPaths) {
        const value = this.getValueByPath(obj, path);
        this.uiManager.update(path, value);
      }
    }

    // Получение значения по пути
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
    }
  }

  // Инициализация панели отладки
  function initializeDebugPanel() {
    const container = document.createElement("div");
    container.classList.add("tilab");
    container.innerHTML = html;
    document.body.appendChild(container);

    const frame = container.querySelector(".tilab-frame");
    const stateButtons = container.querySelectorAll(".tilab-state");
    const dragHandle = container.querySelector(".tilab-drag-handle");

    // Настройка переключения состояния
    stateButtons.forEach((button) =>
      button.addEventListener("click", () => {
        const currentState = frame.getAttribute("data-state") === "true";
        frame.setAttribute("data-state", (!currentState).toString());
      })
    );

    // Настройка перетаскивания
    if (dragHandle) {
      setupDragHandling(dragHandle, container, frame);
    }

    // Создаем менеджер UI
    const uiManager = new UIManager(container);

    // Создаем наблюдатель за объектом
    const observer = new ObjectObserver(uiManager);

    // Настраиваем наблюдение за существующим объектом TiLab
    observer.setupObservers(window.TiLab);
  }

  // Настройка перетаскивания
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

  // Запуск инициализации
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDebugPanel);
  } else {
    initializeDebugPanel();
  }
})(window);
