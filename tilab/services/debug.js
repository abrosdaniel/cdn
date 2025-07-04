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
          <div class="tilab-content"></div>
        </div>
        <div class="tilab-section"></div>
      </aside>
      <button class="tilab-open tilab-state"></button>
    </div>`;

  function updateDebugContent(data, container) {
    if (!container) return;

    const contentElement = container.querySelector(".tilab-content");
    if (!contentElement) return;

    // Очищаем текущее содержимое
    contentElement.innerHTML = "";

    // Если данных нет, выводим сообщение
    if (!data || Object.keys(data).length === 0) {
      contentElement.innerHTML =
        '<div style="padding: 16px; color: #98a2b3;">Нет данных для отображения</div>';
      return;
    }

    // Создаем HTML для отображения данных
    const dataHtml = createDataHtml(data);
    contentElement.innerHTML = dataHtml;
  }

  // Функция для создания HTML из данных
  function createDataHtml(data, level = 0) {
    if (data === null) return '<span style="color: #98a2b3;">null</span>';
    if (data === undefined)
      return '<span style="color: #98a2b3;">undefined</span>';

    const indent = "  ".repeat(level);
    const padding = level * 16;

    if (typeof data === "string") {
      return `<span style="color: #a5d6ff;">"${escapeHtml(data)}"</span>`;
    }

    if (typeof data === "number" || typeof data === "boolean") {
      return `<span style="color: #f97583;">${data}</span>`;
    }

    if (typeof data === "function") {
      return `<span style="color: #b392f0;">function() {...}</span>`;
    }

    if (Array.isArray(data)) {
      if (data.length === 0) return "[]";

      let result = `<details open><summary style="cursor: pointer; padding-left: ${padding}px;">Array(${data.length})</summary>`;
      result += '<div style="padding-left: 16px;">';

      data.forEach((item, index) => {
        result += `<div>[${index}]: ${createDataHtml(item, level + 1)}</div>`;
      });

      result += "</div></details>";
      return result;
    }

    if (typeof data === "object") {
      const keys = Object.keys(data);
      if (keys.length === 0) return "{}";

      let result = `<details open><summary style="cursor: pointer; padding-left: ${padding}px;">Object</summary>`;
      result += '<div style="padding-left: 16px;">';

      keys.forEach((key) => {
        result += `<div>${escapeHtml(key)}: ${createDataHtml(
          data[key],
          level + 1
        )}</div>`;
      });

      result += "</div></details>";
      return result;
    }

    return String(data);
  }

  // Функция для экранирования HTML
  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Функция для создания прокси для отслеживания изменений
  function createTiLabProxy(container) {
    function createNestedProxy(obj, path = "") {
      return new Proxy(obj, {
        get(target, prop) {
          const value = target[prop];
          if (value && typeof value === "object" && !Array.isArray(value)) {
            return createNestedProxy(value, path ? `${path}.${prop}` : prop);
          }
          return value;
        },
        set(target, prop, value) {
          target[prop] = value;
          updateDebugContent(window.TiLab, container);
          return true;
        },
        deleteProperty(target, prop) {
          if (prop in target) {
            delete target[prop];
            updateDebugContent(window.TiLab, container);
          }
          return true;
        },
      });
    }

    window.TiLab = createNestedProxy(window.TiLab);
    updateDebugContent(window.TiLab, container);
  }

  function initializeDebugPanel() {
    const container = document.createElement("div");
    container.classList.add("tilab");
    container.innerHTML = html;
    document.body.appendChild(container);

    const frame = container.querySelector(".tilab-frame");
    const stateButtons = container.querySelectorAll(".tilab-state");
    const dragHandle = container.querySelector(".tilab-drag-handle");

    stateButtons.forEach((button) =>
      button.addEventListener("click", () => {
        const currentState = frame.getAttribute("data-state") === "true";
        frame.setAttribute("data-state", (!currentState).toString());
      })
    );

    if (dragHandle) {
      setupDragHandling(dragHandle, container, frame);
    }

    createTiLabProxy(container);
  }

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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDebugPanel);
  } else {
    initializeDebugPanel();
  }
})(window);
