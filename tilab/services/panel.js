(function (window) {
  TiLab.jsx(
    (
      html,
      render,
      Component,
      h,
      useState,
      useEffect,
      useRef,
      useMemo,
      useCallback,
      useContext,
      createContext
    ) => {
      class Panel extends Component {
        constructor(props) {
          super(props);
          this.state = {
            isOpen: false,
            panelHeight: 500,
            isDragging: false,
            startY: 0,
            startHeight: 0,
          };
        }

        handleToggle = () => {
          this.setState({ isOpen: !this.state.isOpen });
        };

        handleDragStart = (e) => {
          this.setState({
            startY: e.clientY,
            startHeight: this.state.panelHeight,
            isDragging: true,
          });
          document.addEventListener("mousemove", this.handleDrag);
          document.addEventListener("mouseup", this.handleDragEnd);
          e.preventDefault();
        };

        handleDrag = (e) => {
          if (!this.state.isDragging) return;
          const minHeight = 200;
          const maxHeight = window.innerHeight * 0.9;
          const deltaY = this.state.startY - e.clientY;
          const newHeight = Math.max(
            minHeight,
            Math.min(this.state.startHeight + deltaY, maxHeight)
          );
          this.setState({ panelHeight: newHeight });
        };

        handleDragEnd = () => {
          this.setState({ isDragging: false });
          document.removeEventListener("mousemove", this.handleDrag);
          document.removeEventListener("mouseup", this.handleDragEnd);
        };

        render() {
          const { isOpen, panelHeight, isDragging } = this.state;
          const data = window.TiLab;

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
                font-family: ui-sans-serif, Inter, system-ui, sans-serif,
                  sans-serif;
                color: #d0d5dd;
                text-align: left;
              }
              .tilab-frame {
                width: 100vw;
                height: var(--tlp-panel-height);
                position: relative;
                transition: ${isDragging ? "none" : "height 0.3s ease-in-out"};
              }
              .tilab-frame[data-state="false"] {
                height: 0;
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

            <div class="tilab">
              <div class="tilab-frame" data-state="${isOpen}">
                <aside aria-label="TiLab panel">
                  <div
                    class="tilab-drag-handle"
                    onmousedown=${this.handleDragStart}
                  ></div>
                  <button
                    aria-label="Close TiLab panel"
                    class="tilab-close"
                    onclick=${this.handleToggle}
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
                      <${Logo} version=${data.version} />
                      <div class="tilab-status"></div>
                    </div>
                    <${Console} console=${data.console} />
                  </div>
                  <div class="tilab-section"></div>
                </aside>
                <button class="tilab-open" onclick=${this.handleToggle}>
                  <${Notification} count=${data.console.storage.length} />
                  <img
                    src="https://cdn.abros.dev/tilab/services/assets/tilab.png"
                  />
                </button>
              </div>
            </div>
          `;
        }
      }

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
        }, [console.storage.length]);

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
            ${console.storage
              .map((item) => {
                const dataContent =
                  item.data !== undefined
                    ? `<div class="tilab-log-data">
                              ${JSON.stringify(item.data, null, 2)}
                            </div>`
                    : "";

                return `
                        <div class="tilab-log tilab-log-${
                          item.type
                        }" data-log-id="${item.id}">
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
              .join("")}
          </div>
        `;
      };

      render(html`<${Panel} />`, document.body);
    }
  );
})(window);
