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

  // Реализация библиотеки htm (Hyperscript Tagged Markup)
  // Взято из https://github.com/developit/htm
  function htm(n) {
    var l = function (l) {
      for (
        var s,
          h,
          u,
          a,
          o = 0,
          r = [],
          i = 0,
          c = 0,
          f = "",
          v = !1,
          d = !1,
          p = !1,
          m = 0;
        c < l.length;
        c++
      ) {
        var y = l.charCodeAt(c);
        if (v) 34 === y && "\\" !== l[c - 1] && (v = !v);
        else if (d) 39 === y && "\\" !== l[c - 1] && (d = !d);
        else if (p) 96 === y && "\\" !== l[c - 1] && (p = !p);
        else if (
          47 === y &&
          47 === l.charCodeAt(c + 1) &&
          47 !== l.charCodeAt(c - 1)
        )
          c += 2;
        else if (123 === y && "/" !== l[c - 1] && "/" !== l[c + 1])
          o++, (r[i++] = f), (f = "");
        else if (125 === y && o > 0) {
          if (--o === 0) {
            var g = r[--i] || "";
            if ("..." === g.trim().slice(0, 3)) {
              var b = r[--i] || "";
              (g = b + "," + g), (r[i] = b);
            }
            f = g + l.slice(m, c + 1);
          }
          m = c + 1;
        } else 34 === y ? (v = !0) : 39 === y ? (d = !0) : 96 === y && (p = !0);
      }
      var C = l.slice(0, m).split("<"),
        k = [C[0]],
        w = C.length;
      if (w > 1) {
        k.push(C[1]);
        for (var A = 2; A < w; A++) {
          var x = C[A],
            $ = x.indexOf(">");
          if ($ > -1) {
            var j = x.slice(0, $),
              E = x.slice($ + 1) || "";
            k.push(j, E);
          } else k.push(x);
        }
      }
      var O = k.length - 1,
        S = k[O];
      if (S && />$/.test(S)) {
        var _ = /^<([^\s/>]+)/.exec(k[1]),
          L = _ ? _[1] : "div";
        (k[O] = S.replace(/>$/, "")), k.push("/", L, ">");
      }
      for (var M = [], N = [], T = [], z = [], A = 0; A < k.length; A++) {
        var H = k[A];
        if (A & 1) {
          var P = H.split(/\s+/),
            L = P[0],
            I = L && L.toLowerCase();
          if ("/" === L) {
            for (var q = T.pop(); q && q !== I; ) q = T.pop();
            if (q !== I) throw new Error("Malformed HTML: Unclosed tag " + I);
          } else {
            var D = "/" === H.slice(-1);
            if ((D && P.pop(), L && ">" !== L && !D)) T.push(I);
            var F = [];
            for (var R = 1; R < P.length; R++) {
              var J = P[R],
                B = J.indexOf("=");
              if (B > -1) {
                var G = J.slice(0, B),
                  K = J.slice(B + 1);
                if (
                  ((K.charCodeAt(0) === 34 || K.charCodeAt(0) === 39) &&
                    (K = K.slice(1, -1)),
                  "..." === G.slice(0, 3))
                ) {
                  var Q = G.slice(3) || o++;
                  F.push({
                    spread: !0,
                    name: Q,
                    value: K,
                  });
                } else
                  F.push({
                    name: G,
                    value: K,
                  });
              } else
                "..." === J.slice(0, 3)
                  ? F.push({
                      spread: !0,
                      name: J.slice(3) || o++,
                      value: !0,
                    })
                  : F.push({
                      name: J,
                      value: !0,
                    });
            }
            var U = {
              tag: L,
              props: F,
            };
            if (D) for (var q = T.pop(); q && q !== I; ) q = T.pop();
            M.push(U), z.push(M.length);
          }
        } else {
          for (var V = H.split("<"), W = 0; W < V.length; W++) {
            var X = V[W];
            if (X) {
              for (var Y = [], Z = 0, ee = !1, te = 0; te < X.length; te++) {
                var ne = X.charCodeAt(te);
                if (123 === ne && 125 !== X.charCodeAt(te + 1) && !ee)
                  Z++, Y.push(X.slice(ee ? te : 0, te), o++), (ee = !0);
                else if (125 === ne && ee) {
                  if (0 === --Z) {
                    var le = te + 1;
                    Y.push(X.slice(0, le)), (ee = !1);
                  }
                }
              }
              if (ee) throw new Error("Malformed HTML: Unclosed block");
              if (Y.length) {
                for (var se = 0; se < Y.length; se++) {
                  var he = Y[se];
                  "string" == typeof he
                    ? N.push({
                        value: he,
                      })
                    : N.push({
                        name: he,
                      });
                }
                var ae = X.slice(le);
                ae &&
                  N.push({
                    value: ae,
                  });
              } else
                N.push({
                  value: X,
                });
            }
            W < V.length - 1 && z.push(M.length);
          }
        }
      }
      var oe = [],
        re = [],
        ie = M.length;
      for (A = 0; A < ie; A++) {
        var U = M[A],
          ce = U.tag,
          ue = ce.toLowerCase(),
          fe = z.indexOf(A + 1),
          de = fe > -1 ? z[fe] : ie,
          pe = [];
        for (R = A + 1; R < de; R++) {
          var me = M[R];
          me && pe.push(me);
        }
        var ve = [];
        for (var ge in N) {
          var be = parseInt(ge, 10);
          if (be >= z[A] && (!fe || be < z[fe])) {
            var Ce = N[be];
            Ce && ve.push(Ce);
          }
        }
        var ke = {
          tag: ce,
          props: U.props,
          children: pe,
          text: ve,
        };
        oe.push(ke);
      }
      for (var we = [], A = 0; A < oe.length; A++) {
        var Ae = oe[A];
        if (Ae) {
          var xe = Ae.tag,
            $e = [],
            je = Ae.props,
            Ee = Ae.children,
            Oe = Ae.text;
          if (Ee.length)
            for (R = 0; R < Ee.length; R++) {
              var Se = re[Ee[R].index];
              Se && $e.push(Se);
            }
          for (var _e = [], R = 0; R < Oe.length; R++) {
            var Le = Oe[R];
            if (Le) {
              var Me = Le.value;
              if (void 0 !== Me) _e.push(Me);
              else {
                var Ne = Le.name,
                  Te = r[Ne];
                void 0 !== Te && _e.push(Te);
              }
            }
          }
          if (
            (_e.length &&
              (1 === _e.length ? $e.push(_e[0]) : $e.push(_e.join(""))),
            je)
          ) {
            for (var ze = {}, R = 0; R < je.length; R++) {
              var He = je[R],
                Pe = He.name;
              if (He.spread) {
                var Ie = r[Pe];
                if (Ie && "object" == typeof Ie)
                  for (var qe in Ie) ze[qe] = Ie[qe];
              } else {
                var De = He.value;
                if ("string" == typeof De && De.charCodeAt(0) === 123) {
                  var Fe = De.slice(1, -1).trim(),
                    Re = r[Fe];
                  void 0 !== Re && (De = Re);
                }
                ze[Pe] = De;
              }
            }
            var Je = re.length,
              Be = n(xe, ze, $e.length ? $e : void 0);
            re[Je] = Be;
          } else {
            var Je = re.length,
              Be = n(xe, null, $e.length ? $e : void 0);
            re[Je] = Be;
          }
        }
      }
      return re[re.length - 1];
    };
    return function (n) {
      var s = n[0];
      if (!s) return "";
      "string" == typeof s && (s = [s]);
      for (var h = s[0], u = "", a = 1, o = arguments.length; a < o; a++)
        (u += n[a - 1]), (u += arguments[a]);
      return (u += n[o - 1]), l(h + u);
    };
  }

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

  // React-подобная система для создания компонентов
  const React = {
    createElement(type, props = {}, ...children) {
      return {
        type,
        props: {
          ...props,
          children: children
            .flat()
            .filter((child) => child !== null && child !== undefined),
        },
      };
    },

    Fragment: ({ children }) => children,

    useState(initialState) {
      const id = React._getHookId();
      const component = React._getCurrentComponent();

      if (!component._states) component._states = {};
      if (!(id in component._states)) {
        component._states[id] = initialState;
      }

      const setState = (newState) => {
        if (typeof newState === "function") {
          component._states[id] = newState(component._states[id]);
        } else {
          component._states[id] = newState;
        }
        component._render();
      };

      return [component._states[id], setState];
    },

    useEffect(callback, deps) {
      const id = React._getHookId();
      const component = React._getCurrentComponent();

      if (!component._effects) component._effects = {};

      const hasChanged =
        !component._effects[id] ||
        !deps ||
        deps.some((dep, i) => dep !== component._effects[id].deps[i]);

      if (hasChanged) {
        // Очищаем предыдущий эффект, если он был
        if (component._effects[id] && component._effects[id].cleanup) {
          component._effects[id].cleanup();
        }

        // Запускаем новый эффект
        const cleanup = callback();
        component._effects[id] = {
          deps,
          cleanup: typeof cleanup === "function" ? cleanup : undefined,
        };
      }
    },

    useMemo(factory, deps) {
      const id = React._getHookId();
      const component = React._getCurrentComponent();

      if (!component._memos) component._memos = {};

      const hasChanged =
        !component._memos[id] ||
        !deps ||
        deps.some((dep, i) => dep !== component._memos[id].deps[i]);

      if (hasChanged) {
        component._memos[id] = {
          deps,
          value: factory(),
        };
      }

      return component._memos[id].value;
    },

    useCallback(callback, deps) {
      return React.useMemo(() => callback, deps);
    },

    // Внутренние методы для управления хуками
    _currentComponent: null,
    _hookId: 0,

    _setCurrentComponent(component) {
      React._currentComponent = component;
      React._hookId = 0;
    },

    _getCurrentComponent() {
      if (!React._currentComponent) {
        throw new Error(
          "Хуки можно использовать только внутри функциональных компонентов"
        );
      }
      return React._currentComponent;
    },

    _getHookId() {
      return React._hookId++;
    },
  };

  // Подключаем htm к React.createElement
  const html = htm(React.createElement);

  // Система рендеринга
  const ReactDOM = {
    render(element, container) {
      container.innerHTML = "";
      const renderedElement = this._renderElement(element);
      if (renderedElement) {
        container.appendChild(renderedElement);
      }
      return renderedElement;
    },

    _renderElement(element) {
      if (typeof element === "string" || typeof element === "number") {
        return document.createTextNode(element.toString());
      }

      if (!element || !element.type) {
        return document.createTextNode("");
      }

      if (element.type === "TEXT_ELEMENT") {
        return document.createTextNode(element.props.nodeValue);
      }

      if (typeof element.type === "function") {
        // Создаем компонент
        const component = {
          props: element.props,
          _render: function () {
            React._setCurrentComponent(this);
            const result = element.type(this.props);
            const renderedElement = ReactDOM._renderElement(result);

            // Заменяем DOM-элемент
            if (this._domElement && this._domElement.parentNode) {
              this._domElement.parentNode.replaceChild(
                renderedElement,
                this._domElement
              );
            }

            this._domElement = renderedElement;
            return renderedElement;
          },
          _cleanup: function () {
            // Очищаем эффекты при размонтировании
            if (this._effects) {
              Object.values(this._effects).forEach((effect) => {
                if (effect.cleanup) effect.cleanup();
              });
            }
          },
        };

        // Рендерим компонент
        return component._render();
      }

      const domElement = document.createElement(element.type);

      // Устанавливаем атрибуты
      Object.keys(element.props || {})
        .filter((key) => key !== "children")
        .forEach((key) => {
          if (
            key.startsWith("on") &&
            typeof element.props[key] === "function"
          ) {
            const eventType = key.toLowerCase().substring(2);
            domElement.addEventListener(eventType, element.props[key]);
          } else if (key === "className") {
            domElement.setAttribute("class", element.props[key]);
          } else if (
            key === "style" &&
            typeof element.props[key] === "object"
          ) {
            Object.assign(domElement.style, element.props[key]);
          } else {
            domElement.setAttribute(key, element.props[key]);
          }
        });

      // Рекурсивно рендерим дочерние элементы
      (element.props.children || []).forEach((child) => {
        const childElement = this._renderElement(child);
        if (childElement) {
          domElement.appendChild(childElement);
        }
      });

      return domElement;
    },
  };

  // Система для связывания React-компонентов с данными TiLab
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
            return React.createElement(this.Component, {
              ...props,
              ...this.data,
            });
          };

          // Рендерим компонент
          ReactDOM.render(React.createElement(WrappedComponent), this.element);
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

  // КОМПОНЕНТЫ

  // Компонент для отображения одного лога с использованием htm
  function LogItem({ log }) {
    const type = log.type || "info";
    const name = log.name || "Unknown";
    const time = formatTime(log.time || Date.now());

    return html`
      <div className=${`tilab-log tilab-log-${type}`}>
        <div className="tilab-log-header">
          <span className="tilab-log-name">${name}</span>
          <span className="tilab-log-time">${time}</span>
        </div>
        ${log.message &&
        html`<div className="tilab-log-message">${log.message}</div>`}
        ${log.data !== undefined &&
        html`
          <div className="tilab-log-data">
            ${typeof log.data === "object"
              ? JSON.stringify(log.data, null, 2)
              : String(log.data)}
          </div>
        `}
      </div>
    `;
  }

  // Компонент для отображения списка логов с использованием htm
  function LogsList({ logs }) {
    if (!logs || logs.length === 0) {
      return html`<div style="padding: 16px; color: #98a2b3;">
        Нет логов для отображения
      </div>`;
    }

    return html`
      <${React.Fragment}>
        ${logs
          .slice()
          .reverse()
          .map((log) => html`<${LogItem} log=${log} key=${log.time} />`)}
      <//>
    `;
  }

  // Компонент для отображения версии с использованием htm
  function VersionDisplay({ version }) {
    return html`<span>Версия: ${version || "1.0.0"}</span>`;
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

    // Настраиваем отображение данных
    setupVersionDisplay(container);
    setupConsoleOutput(container);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeDebugPanel);
  } else {
    initializeDebugPanel();
  }
})(window);
