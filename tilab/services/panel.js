(function (window) {
  const createPanel = document.createElement("div");
  createPanel.classList.add("tilab");
  document.body.appendChild(createPanel);

  TiLab.jsx((html, render, useState, useEffect) => {
    const Panel = () => {
      const [isOpen, setIsOpen] = useState(false);
      const [panelHeight, setPanelHeight] = useState(500);
      const [isDragging, setIsDragging] = useState(false);
      const [startY, setStartY] = useState(0);
      const [startHeight, setStartHeight] = useState(0);

      const { useQuery } = window.TiLab.query;

      const { data: tiLabData = window.TiLab.version } = useQuery({
        queryKey: ["tilab-version"],
        queryFn: async () => window.TiLab.version,
        staleTime: 1000 * 60 * 60 * 24,
      });

      const { data: consoleData = { storage: [] } } = useQuery({
        queryKey: ["tilab-console"],
        queryFn: async () => window.TiLab.console,
        staleTime: 1000,
      });

      const { data: libData = { storage: [] } } = useQuery({
        queryKey: ["tilab-lib"],
        queryFn: async () => window.TiLab.lib,
        staleTime: 1000,
      });

      const handleToggle = () => {
        setIsOpen(!isOpen);
      };

      const handleDragStart = (e) => {
        setStartY(e.clientY);
        setStartHeight(panelHeight);
        setIsDragging(true);
        e.preventDefault();
      };

      useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e) => {
          const minHeight = 200;
          const maxHeight = window.innerHeight * 0.9;
          const deltaY = startY - e.clientY;
          const newHeight = Math.max(
            minHeight,
            Math.min(startHeight + deltaY, maxHeight)
          );
          setPanelHeight(newHeight);
        };

        const handleMouseUp = () => {
          setIsDragging(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
        };
      }, [isDragging, startY, startHeight]);

      return html`
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
            --tlp-panel-height: ${panelHeight}px;
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
            height: 0;
            position: relative;
            transition: ${isDragging ? "none" : "height 0.3s ease-in-out"};
          }
          .tilab-frame[data-state="true"] {
            height: var(--tlp-panel-height);
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
            display: none;
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
          .tilab-frame[data-state="true"] .tilab-close {
            display: flex;
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

        <div class="tilab-frame" data-state="${isOpen}">
          <aside aria-label="TiLab panel">
            <div class="tilab-drag-handle" onmousedown=${handleDragStart}></div>
            <button
              aria-label="Close TiLab panel"
              class="tilab-close"
              onclick=${handleToggle}
            >
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
                <${Logo} version=${tiLabData} />
                <div class="tilab-status"></div>
              </div>
              <${Console} console=${consoleData} />
            </div>
            <div class="tilab-section">
              <${Libraries} lib=${libData} />
            </div>
          </aside>
          <button class="tilab-open" onclick=${handleToggle}>
            <${Notification} count=${consoleData.storage.length} />
            <img src="https://cdn.abros.dev/tilab/services/assets/tilab.png" />
          </button>
        </div>
      `;
    };

    const Logo = ({ version }) => {
      return html`
        <style>
          .tilab-logo {
            display: flex;
            flex-direction: column;
            background-color: transparent;
            border: none;
            gap: calc(var(--tlp-font-size) * 0.125);
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
        <div class="tilab-logo">
          <span class="tilab-logo-tilab">TILAB</span>
          <span class="tilab-logo-desc">Версия: ${version}</span>
        </div>
      `;
    };

    const Notification = ({ count }) => {
      return html`
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
        <div class="tilab-notify-count">
          <span>${count}</span>
        </div>
      `;
    };

    const Console = ({ console }) => {
      useEffect(() => {
        const consoleElement = document.querySelector(".tilab-console");
        if (consoleElement && console.storage.length > 0) {
          consoleElement.scrollTop = consoleElement.scrollHeight;
        }
      }, [console.storage]);

      return html`
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
        <div class="tilab-console">
          ${console.storage.length > 0
            ? console.storage.map((item) => {
                const logTypeClass = `tilab-log-${item.type || "info"}`;
                const dataContent =
                  item.data !== undefined
                    ? html`<div class="tilab-log-data">
                        ${JSON.stringify(item.data, null, 2)}
                      </div>`
                    : "";

                return html`
                  <div
                    class="tilab-log ${logTypeClass}"
                    data-log-id="${item.id}"
                  >
                    <div class="tilab-log-header">
                      <span class="tilab-log-name"
                        >${item.name || "Неизвестно"}</span
                      >
                      <span class="tilab-log-time"
                        >${item.time || "неизвестно"}</span
                      >
                    </div>
                    <div class="tilab-log-message">${item.message || ""}</div>
                    ${dataContent}
                  </div>
                `;
              })
            : html`
                <div class="tilab-log tilab-log-info">
                  <div class="tilab-log-header">
                    <span class="tilab-log-name">Информация</span>
                    <span class="tilab-log-time">сейчас</span>
                  </div>
                  <div class="tilab-log-message">Нет доступных записей</div>
                </div>
              `}
        </div>
      `;
    };

    const Libraries = ({ lib }) => {
      return html`
        <style>
          .tilab-libraries {
            padding: calc(var(--tlp-font-size) * 0.5);
          }
          .tilab-libraries h3 {
            margin: 0 0 calc(var(--tlp-font-size) * 0.5) 0;
            color: #e5e7eb;
            font-size: calc(var(--tlp-font-size) * 0.875);
          }
          .tilab-lib-item {
            margin-bottom: calc(var(--tlp-font-size) * 0.25);
            background-color: rgba(255, 255, 255, 0.05);
            border-radius: 4px;
            font-size: calc(var(--tlp-font-size) * 0.75);
          }
          .tilab-lib-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: calc(var(--tlp-font-size) * 0.25);
          }
          .tilab-lib-name {
            color: #d1d5db;
            font-weight: 500;
          }
          .tilab-lib-status {
            padding: calc(var(--tlp-font-size) * 0.125)
              calc(var(--tlp-font-size) * 0.25);
            border-radius: 3px;
            font-size: calc(var(--tlp-font-size) * 0.625);
            font-weight: 500;
          }
          .tilab-lib-loaded {
            background-color: #10b981;
            color: #fff;
          }
          .tilab-lib-loading {
            background-color: #f59e0b;
            color: #fff;
          }
          .tilab-lib-error {
            background-color: #ef4444;
            color: #fff;
          }
          .tilab-lib-idle {
            background-color: #6b7280;
            color: #fff;
          }
          .tilab-lib-exports {
            padding: calc(var(--tlp-font-size) * 0.25);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-family: monospace;
            font-size: calc(var(--tlp-font-size) * 0.625);
          }
          .tilab-lib-export {
            color: #a3a3a3;
            margin-bottom: calc(var(--tlp-font-size) * 0.125);
          }
          .tilab-lib-export:last-child {
            margin-bottom: 0;
          }
          .tilab-lib-export-name {
            color: #60a5fa;
          }
          .tilab-lib-export-type {
            color: #f59e0b;
          }
        </style>
        <div class="tilab-libraries">
          <h3>Библиотеки (${lib.storage.length})</h3>
          ${lib.storage.length > 0
            ? lib.storage.map((libItem) => {
                let statusClass = "tilab-lib-idle";
                let statusText = "Не загружена";

                if (libItem.isLoading) {
                  statusClass = "tilab-lib-loading";
                  statusText = "Загрузка...";
                } else if (libItem.isLoaded) {
                  statusClass = "tilab-lib-loaded";
                  statusText = "Загружена";
                } else if (libItem.error) {
                  statusClass = "tilab-lib-error";
                  statusText = "Ошибка";
                }

                const exports = libItem.exports || {};
                const exportKeys = Object.keys(exports);

                return html`
                  <div class="tilab-lib-item">
                    <div class="tilab-lib-header">
                      <span class="tilab-lib-name">${libItem.name}</span>
                      <span class="tilab-lib-status ${statusClass}"
                        >${statusText}</span
                      >
                    </div>
                    ${libItem.isLoaded && exportKeys.length > 0
                      ? html`
                          <div class="tilab-lib-exports">
                            ${exportKeys.map((key) => {
                              const value = exports[key];
                              const type = typeof value;
                              return html`
                                <div class="tilab-lib-export">
                                  <span class="tilab-lib-export-name"
                                    >${key}</span
                                  >
                                  <span class="tilab-lib-export-type"
                                    >: ${type}</span
                                  >
                                </div>
                              `;
                            })}
                          </div>
                        `
                      : ""}
                  </div>
                `;
              })
            : html`
                <div class="tilab-lib-item">
                  <div class="tilab-lib-header">
                    <span class="tilab-lib-name"
                      >Нет загруженных библиотек</span
                    >
                  </div>
                </div>
              `}
        </div>
      `;
    };

    render(html`<${Panel} />`, createPanel);
  });
})(window);
