(function (window) {
  const createPanel = () => {
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
      --tlp-panel-height: 500px;
      --tlp-font-size: 16px;
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
        height: var(--tlp-panel-height);
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
        gap: calc(var(--tlp-font-size) * 0.125);
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
        right: calc(var(--tlp-font-size) * 0.5);
        transform: translate(0, -100%);
        border-right: #394056 1px solid;
        border-left: #394056 1px solid;
        border-top: #394056 1px solid;
        border-bottom: none;
        border-radius: calc(var(--tlp-font-size) * 0.25)
          calc(var(--tlp-font-size) * 0.25) 0px 0px;
        padding: calc(var(--tlp-font-size) * 0.25)
          calc(var(--tlp-font-size) * 0.375)
          calc(var(--tlp-font-size) * 0.125)
          calc(var(--tlp-font-size) * 0.375);
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
        left: -calc(var(--tlp-font-size) * 0.625);
        height: calc(var(--tlp-font-size) * 0.375);
        width: calc(100% + calc(var(--tlp-font-size) * 1.25));
      }
      .tilab-close svg {
        color: #98a2b3;
        width: calc(var(--tlp-font-size) * 0.5);
        height: calc(var(--tlp-font-size) * 0.5);
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
        padding: calc(var(--tlp-font-size) * 0.5)
          calc(var(--tlp-font-size) * 0.625);
        gap: calc(var(--tlp-font-size) * 0.625);
        border-bottom: #292e3d 1px solid;
      }
      .tilab-console {
        flex: 1;
        overflow-y: auto;
        padding: calc(var(--tlp-font-size) * 0.5);
        font-family: monospace;
        font-size: calc(var(--tlp-font-size) * 0.875);
      }
      .tilab-open {
        position: fixed;
        bottom: 0;
        right: 0;
        margin: calc(var(--tlp-font-size) * 0.5);
        height: calc(var(--tlp-font-size) * 3.5);
        width: calc(var(--tlp-font-size) * 3.5);
        padding: 0;
        cursor: pointer;
        background-color: transparent;
        border: 2px solid #494949;
        border-radius: 500px;
        transition: all 0.5s ease-in-out;
      }
      .tilab-frame[data-state="true"] .tilab-open {
        bottom: calc(var(--tlp-font-size) * -7);
      }
      .tilab-open img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        aspect-ratio: 1 / 1;
        border-radius: 500px;
      }
    </style>
    <div class="tilab-frame" data-state="false">
      <aside aria-label="TiLab panel">
        <div class="tilab-drag-handle"></div>
        <button aria-label="Close TiLab panel" class="tilab-close tilab-state">
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

    const startDrag = (e) => {
      startY = e.clientY;
      startHeight = parseInt(window.getComputedStyle(frame).height);
      frame.classList.add("dragging");
      document.addEventListener("mousemove", drag);
      document.addEventListener("mouseup", endDrag);
      e.preventDefault();
    };

    const drag = (e) => {
      const deltaY = startY - e.clientY;
      const newHeight = Math.max(
        minHeight,
        Math.min(startHeight + deltaY, maxHeight)
      );
      container.style.setProperty("--tlp-panel-height", `${newHeight}px`);
    };

    const endDrag = () => {
      frame.classList.remove("dragging");
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("mouseup", endDrag);
    };

    dragHandle.addEventListener("mousedown", startDrag);
  };

  const startApp = () => {
    createPanel();

    tlc.create(".tilab-logo", function Logo() {
      const data = tlc.get("TiLab");
      return `
      <style>
      .tilab-logo {
        display: flex;
        flex-direction: column;
        background-color: transparent;
        border: none;
        gap: calc(var(--tlp-font-size) 16px * 0.125);
        padding: 0px;
      }
      .tilab-logo-tilab {
        font-size: var(--tlp-font-size);
        font-weight: 700;
        line-height: calc(var(--tlp-font-size) * 1);
        white-space: nowrap;
        color: #d0d5dd;
      }
      .tilab-logo-desc {
        font-weight: 600;
        font-size: calc(var(--tlp-font-size) * 0.75);
        background: linear-gradient(to right, #dd524b, #e9a03b);
        background-clip: text;
        -webkit-background-clip: text;
        line-height: 1;
        -webkit-text-fill-color: transparent;
        white-space: nowrap;
      }
      </style>
        <span class="tilab-logo-tilab">TILAB</span>
        <span class="tilab-logo-desc">Версия: ${data.version}</span>
      `;
    });

    tlc.create(".tilab-notify-count", function Notification() {
      const data = tlc.get("TiLab");
      const count = data.console.storage.length;
      return `
      <style>
      .tilab-notify-count {
        position: absolute;
        right: calc(var(--tlp-font-size) * -0.4);
        top: calc(var(--tlp-font-size) * -0.4);
        background-color: #494949;
        color: #fff;
        padding-right: calc(var(--tlp-font-size) * 0.3);
        padding-left: calc(var(--tlp-font-size) * 0.3);
        padding-top: calc(var(--tlp-font-size) * 0.1);
        padding-bottom: calc(var(--tlp-font-size) * 0.1);
        border-radius: 100px;
      }
      </style>
      <span>${count}</span>`;
    });

    tlc.create(".tilab-console", function Console() {
      const data = tlc.get("TiLab");
      const hasLogs = data.console?.getAll()?.length > 0;

      setTimeout(() => {
        const consoleElement = document.querySelector(".tilab-console");
        if (consoleElement && hasLogs) {
          consoleElement.scrollTop = consoleElement.scrollHeight;
        }
      }, 0);

      return `
        <section>
        <style>
        .tilab-log {
        margin-bottom: calc(var(--tlp-font-size) * 0.25);
        padding: calc(var(--tlp-font-size) * 0.25);
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
        margin-bottom: calc(var(--tlp-font-size) * 0.125);
        font-weight: bold;
      }
      .tilab-log-name {
        color: #e5e7eb;
      }
      .tilab-log-time {
        color: #9ca3af;
        font-size: calc(var(--tlp-font-size) * 0.75);
      }
      .tilab-log-message {
        color: #d1d5db;
        margin-bottom: calc(var(--tlp-font-size) * 0.25);
      }
      .tilab-log-data {
        background-color: rgba(0, 0, 0, 0.2);
        padding: calc(var(--tlp-font-size) * 0.25);
        border-radius: 4px;
        overflow-x: auto;
        font-family: monospace;
        color: #a3a3a3;
      }
        </style>
          ${
            hasLogs
              ? data.console
                  .getAll()
                  .map((item) => {
                    const logTypeClass = `tilab-log-${item.type || "info"}`;
                    const dataContent =
                      item.data !== undefined
                        ? `<div class="tilab-log-data">
                        ${JSON.stringify(item.data, null, 2)}
                      </div>`
                        : "";

                    return `
                      <div class="tilab-log ${logTypeClass}" data-log-id="${
                      item.id
                    }">
                        <div class="tilab-log-header">
                          <span class="tilab-log-name">${
                            item.name || "Неизвестно"
                          }</span>
                          <span class="tilab-log-time">${
                            item.time || "неизвестно"
                          }</span>
                        </div>
                        <div class="tilab-log-message">${
                          item.message || ""
                        }</div>
                        ${dataContent}
                      </div>
                    `;
                  })
                  .join("")
              : `
                <div class="tilab-log tilab-log-info">
                  <div class="tilab-log-header">
                    <span class="tilab-log-name">Информация</span>
                    <span class="tilab-log-time">сейчас</span>
                  </div>
                  <div class="tilab-log-message">Нет доступных записей</div>
                </div>
              `
          }
        </section>
      `;
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startApp);
  } else {
    startApp();
  }
})(window);
