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
      .tilab-frame[data-state="false"] .tilab-close {
        display: none;
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
      .tilab-open {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: calc(var(--tsqd-font-size) * 0.5);
        height: calc(var(--tsqd-font-size) * 3.5);
        width: calc(var(--tsqd-font-size) * 3.5);
        padding: 0;
        cursor: pointer;
        background-color: transparent;
        border: none;
        border-radius: 500px;
        transition: all 0.5s ease-in-out;
      }
      .tilab-frame[data-state="true"] .tilab-open {
        bottom: calc(var(--tsqd-font-size) * -7);
      }
      .tilab-notify-count {
        position: absolute;
        right: calc(var(--tsqd-font-size) * -0.4);
        top: calc(var(--tsqd-font-size) * -0.4);
        background-color: #868686;
        color: #fff;
        padding-right: calc(var(--tsqd-font-size) * 0.3);
        padding-left: calc(var(--tsqd-font-size) * 0.3);
        padding-top: calc(var(--tsqd-font-size) * 0.1);
        padding-bottom: calc(var(--tsqd-font-size) * 0.1);
        border-radius: 100px;
      }
      .tilab-open img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        aspect-ratio: 1 / 1;
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
    <div class="tilab-frame" data-state="false">
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
            <div class="tilab-logo"></div>
            <div class="tilab-status"></div>
          </div>
          <div class="tilab-console"></div>
        </div>
        <div class="tilab-section">
        </div>
      </aside>
      <button class="tilab-open tilab-state">
        <div class="tilab-notify-count"></div>
        <img src="https://cdn.abros.dev/tilab/services/assets/tilab.png" />
      </button>
    </div>`;

  const tl = {
    data: null,
    components: new Map(),
    dependencies: new Map(),
    activeComponent: null,

    create() {
      const container = document.createElement("div");
      container.classList.add("tilab");
      container.innerHTML = template;
      document.body.appendChild(container);

      const frame = container.querySelector(".tilab-frame");
      const stateButtons = container.querySelectorAll(".tilab-state");
      const dragHandle = container.querySelector(".tilab-drag-handle");
      const minHeight = 200;
      const maxHeight = window.innerHeight * 0.9;
      let startY, startHeight;

      stateButtons.forEach((button) =>
        button.addEventListener("click", () => {
          const currentState = frame.getAttribute("data-state") === "true";
          frame.setAttribute("data-state", (!currentState).toString());
        })
      );

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

    listen(varName) {
      const originalObj = window[varName];

      const track = (path) => {
        if (this.activeComponent) {
          if (!this.dependencies.has(path)) {
            this.dependencies.set(path, new Set());
          }
          this.dependencies.get(path).add(this.activeComponent);
        }
      };

      const notify = (path) => {
        if (this.dependencies.has(path)) {
          const components = this.dependencies.get(path);
          components.forEach((componentId) => {
            if (this.components.has(componentId)) {
              const component = this.components.get(componentId);
              this.render(component.target, component.render, componentId);
            }
          });
        }
      };

      const createProxy = (obj, path = "") => {
        if (obj === null || typeof obj !== "object") return obj;

        return new Proxy(obj, {
          get: (target, prop) => {
            if (
              prop === Symbol.toPrimitive ||
              prop === "toString" ||
              prop === "valueOf"
            ) {
              return () => String(target);
            }

            const value = target[prop];
            const currentPath = path ? `${path}.${prop}` : prop;

            track(currentPath);

            if (value !== null && typeof value === "object") {
              return createProxy(value, currentPath);
            }
            return value;
          },
          set: (target, prop, value) => {
            const oldValue = target[prop];
            target[prop] = value;

            const fullPath = path ? `${path}.${prop}` : prop;

            // Логируем изменение
            console.log(`TiLab: Изменение в ${varName}.${fullPath}`, {
              старое: oldValue,
              новое: value,
            });

            notify(fullPath);

            return true;
          },
        });
      };

      this.data = createProxy(originalObj);
      window[varName] = this.data;
    },

    mount(target, render) {
      const componentId =
        target + "_" + Math.random().toString(36).substr(2, 9);
      this.components.set(componentId, { target, render });
      this.render(target, render, componentId);
      return componentId;
    },

    render(target, render, componentId) {
      const targetElement = document.querySelector(target);
      this.activeComponent = componentId;

      try {
        const html = render();
        targetElement.innerHTML = html;
      } catch (error) {
        console.error(
          `TiLab: Ошибка при рендеринге компонента ${target}:`,
          error
        );
      } finally {
        this.activeComponent = null;
      }
    },
  };

  const App = {
    logo() {
      tl.mount(".tilab-logo", function () {
        const version = tl.data.version;
        return `
        <span class="tilab-logo-tilab">TILAB</span>
        <span class="tilab-logo-desc">Версия: ${version}</span>
        `;
      });
    },
    notification() {
      tl.mount(".tilab-notify-count", function () {
        const count = tl.data.debug.storage.length;
        return `
        <span>${count}</span>
        `;
      });
    },
  };

  const Console = {
    list() {
      tl.mount(".tilab-console", function () {
        if (
          !tl.data.debug ||
          !tl.data.debug.storage ||
          !tl.data.debug.storage.length
        ) {
          return `<div class="tilab-log tilab-log-info">
          <div class="tilab-log-header">
            <span class="tilab-log-name">Информация</span>
            <span class="tilab-log-time">сейчас</span>
          </div>
          <div class="tilab-log-message">Нет доступных записей</div>
        </div>`;
        }

        return tl.data.debug.storage
          .map((item) => {
            const logTypeClass = `tilab-log-${item.type || "info"}`;
            const dataContent =
              item.data !== undefined
                ? `<div class="tilab-log-data">${JSON.stringify(
                    item.data,
                    null,
                    2
                  )}</div>`
                : "";

            return `
          <div class="tilab-log ${logTypeClass}">
            <div class="tilab-log-header">
              <span class="tilab-log-name">${item.name || "Неизвестно"}</span>
              <span class="tilab-log-time">${item.time || "неизвестно"}</span>
            </div>
            <div class="tilab-log-message">${item.message || ""}</div>
            ${dataContent}
          </div>
        `;
          })
          .join("");
      });
    },
  };

  function startApp() {
    tl.create();
    tl.listen("TiLab");
    App.logo();
    App.notification();
    Console.list();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      startApp();
    });
  } else {
    startApp();
  }
})(window);
