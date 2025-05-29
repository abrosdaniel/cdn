/*!
 * TiLab.js v0.1a
 * MIT License
 * (c) 2025 Daniel Abros
 * Сайт → https://abros.dev
 * <script src="https://cdn.abros.dev/tilab/tilab.js"></script>
 */

!(function (e) {
  void 0 === window.TiLab &&
    (window.TiLab = {
      version: "0.1a",
      copyright: "© 2025 Daniel Abros",
      site: "https://abros.dev",
    });
  let s = "https://cdn.abros.dev";
  let d = new URLSearchParams(window.location.search);
  if (null !== d.get("abros-debug")) {
    if (void 0 === window.TiLab.debug)
      return (
        null !== d.get("v") && (window.TiLab.version = d.get("v")),
        document.write(
          '<script src="' +
            s +
            "/tilab/debug/" +
            window.TiLab.version +
            '/tilab.js"></script>'
        ),
        void (window.TiLab.debug = !0)
      );
    null !== d.get("v") && (window.TiLab.version = d.get("v"));
  }
  if (null !== d.get("abros-console")) {
    let e = document.createElement("script");
    (e.src = s + "/tilab/services/console.js"),
      (e.async = !0),
      document.head.appendChild(e);
  }
  if (null !== d.get("abros-errors")) {
    let e = document.createElement("script");
    (e.src = s + "/tilab/services/errors.js"),
      (e.async = !0),
      document.head.appendChild(e);
  }
  if (null !== d.get("abros-params")) {
    let e = document.createElement("script");
    (e.src = s + "/tilab/services/params.js"),
      (e.async = !0),
      document.head.appendChild(e);
  }
  let n = function (e, d, ...n) {
      d || (d = {}),
        d.method || (d.method = "init"),
        void 0 === d.js && (d.js = !0),
        void 0 === d.css && (d.css = !1),
        void 0 !== d.depends ? ((d.mod = e), (e = d.depends)) : (d.mod = e),
        void 0 === d.async && (d.async = !0),
        void 0 === d.handler && (d.handler = !0);
      let o = s + "/tilab/lib/" + e + ".js";
      window.TiLab.debug &&
        (o = s + "/tilab/debug/" + window.TiLab.version + "/" + e + ".js");
      let i = function (e, d, n) {
          let o;
          (o = d.object ? window[d.object] : window[e]),
            o && "function" == typeof o[d.method] && o[d.method](...n);
        },
        t = function (e) {
          switch (e) {
            case "rescale": {
              let e = document.querySelector(
                'script[src*="tilda-animation-2.0.min.js"]'
              );
              e &&
                (e.remove(),
                "init" === window.rescale.state
                  ? setTimeout(function () {
                      document.head.appendChild(e);
                    }, 10)
                  : window.addEventListener("rescaleinit", function () {
                      setTimeout(function () {
                        document.head.appendChild(e);
                      }, 10);
                    })),
                "block" === d.method &&
                  (void 0 === window.rescale && (window.rescale = {}),
                  (window.rescale.trigger = "block")),
                "disable" === d.method &&
                  (void 0 === window.rescale && (window.rescale = {}),
                  (window.rescale.disabled = "init"));
              break;
            }
            case "header":
              if (
                ("string" == typeof n[0] &&
                  document
                    .querySelector(n[0])
                    .classList.add("t-header-loading", "t-header-locked"),
                !document.querySelector(".t-header-style"))
              ) {
                let e = document.createElement("style");
                e.classList.add("t-header-style"),
                  (e.textContent =
                    ".t-header-loading { visibility: hidden!important; transition: none!important; opacity: 0!important } .t-header-locked { transition: none !important }"),
                  document.head.appendChild(e);
              }
          }
        };
      if (
        window.TiLab.libs.loaded.sync.has(e) ||
        window.TiLab.libs.loaded.async.has(e)
      )
        i(d.mod, d, n), t(e);
      else if (
        (void 0 === window[e].loaded && (window[e].loaded = !1),
        window[e].loaded)
      ) {
        document
          .querySelector('script[src="' + o + '.js"]')
          .addEventListener("load", function () {
            i(d.mod, d, n);
          }),
          t(e);
      } else {
        if (d.js) {
          let t = document.createElement("script");
          (t.src = o + ".js"),
            d.async && (t.async = !0),
            (t.onload = function () {
              (window[e].loaded = !0),
                d.async
                  ? window.TiLab.libs.loaded.async.add(e)
                  : window.TiLab.libs.loaded.sync.add(e),
                window.dispatchEvent(new Event("TiLabLoaded")),
                i(d.mod, d, n);
            }),
            document.head.appendChild(t);
        }
        if (d.css) {
          let e = document.createElement("link");
          (e.rel = "stylesheet"),
            (e.href = o + ".css"),
            document.head.appendChild(e);
        }
        d.handler && t(e), (window[e].loaded = !0);
      }
    },
    o = function (e) {
      switch (
        ((window.t_onLibLoad = function (e, d, n) {
          void 0 !== window[e] &&
          (function (e) {
            if (void 0 !== window[e])
              for (const d in e) if ("function" == typeof e[d]) return !0;
            return !1;
          })(e)
            ? d()
            : setTimeout(function () {
                t_onObjLoad(e, d, n);
              }, n || 100);
        }),
        (window.t_onLibsReady = function (e) {
          if (window.TiLab)
            if (
              "ready" === window.TiLab.state ||
              "loaded" === window.TiLab.state
            )
              e();
            else if (window.TiLab.libs.init.sync.size > 0) {
              let d = !1;
              window.addEventListener("libsReady", function () {
                setTimeout(function () {
                  e(), (d = !0);
                }, 10);
              }),
                setTimeout(function () {
                  d ||
                    ("ready" === window.TiLab.state ||
                    "loaded" === window.TiLab.state
                      ? e()
                      : (e(),
                        console.warn(
                          "[TiLab.js] Предупреждение: Превышено время загрузки библиотек. Возможно, некоторые библиотеки не загрузились или не инициализировались."
                        )));
                }, 3e3);
            } else e(), (window.TiLab.state = "notloaded");
          else e();
        }),
        (window.t_onReady = function (e) {
          "loading" !== document.readyState
            ? t_onLibsReady(e)
            : document.addEventListener("DOMContentLoaded", function () {
                t_onLibsReady(e);
              });
        }),
        (window.t_onFuncLoadHandler = function (e, d) {
          if ("t396_initialScale" === e)
            void 0 !== window.rescale.disabled &&
              (window.rescale.disabled
                ? d()
                : window.addEventListener("rescaleoff", function () {}));
          else d();
        }),
        e)
      ) {
        case "init":
          window.t_onFuncLoad = function (e, d, n) {
            "function" == typeof window[e]
              ? t_onFuncLoadHandler(e, d)
              : setTimeout(function () {
                  t_onFuncLoad(e, d, n);
                }, n || 100);
          };
          break;
        case "load":
          window.t_onFuncLoad = function (e, d, n) {
            let o = t_checkIsEditMode(),
              i = function () {
                return !o || (o && t_checkEditorIsReady());
              },
              t = function (e) {
                return (
                  "function" == typeof window[e] || "object" == typeof window[e]
                );
              };
            if (t(e) && i()) t_onFuncLoadHandler(e, d);
            else {
              let o = Date.now(),
                s = function () {
                  throw new Error(e + " is undefined");
                };
              setTimeout(function a() {
                var c = Date.now();
                t(e) && i()
                  ? t_onFuncLoadHandler(e, d)
                  : ("complete" === document.readyState &&
                      c - o > 15e3 &&
                      !t(e) &&
                      s(),
                    setTimeout(a, n || 100));
              });
            }
          };
      }
    };
  o("init"),
    document
      .querySelector('script[src*="tilda-scripts-3.0.min.js"]')
      .addEventListener("load", function () {
        o("load");
      }),
    window.addEventListener("TiLabLoaded", function () {
      function e() {
        function e() {
          if (
            ("ready" !== window.TiLab.state &&
              "loaded" !== window.TiLab.state &&
              window.TiLab.libs.init.sync.size ===
                window.TiLab.libs.loaded.sync.size &&
              (window.dispatchEvent(new Event("libsReady")),
              (window.TiLab.state = "ready")),
            "loaded" !== window.TiLab.state)
          ) {
            window.TiLab.libs.init.sync.size +
              window.TiLab.libs.init.async.size ===
              window.TiLab.libs.loaded.sync.size +
                window.TiLab.libs.loaded.async.size &&
              (window.dispatchEvent(new Event("libsLoaded")),
              (window.TiLab.state = "loaded"));
          }
        }
        "loading" !== document.readyState
          ? e()
          : document.addEventListener("DOMContentLoaded", function () {
              e();
            });
      }
      window.TiLab.libs.init.sync.has("rescale")
        ? "init" === window.rescale.state
          ? void 0 === window.rescale.disabled || window.rescale.disabled
            ? e()
            : "init" === window.rescale.disabled
            ? window.addEventListener("rescaleoff", function () {
                e();
              })
            : e()
          : setTimeout(function () {
              void 0 === window.rescale.disabled
                ? window.addEventListener("rescaleinit", function () {
                    e();
                  })
                : window.rescale.disabled
                ? e()
                : "init" === window.rescale.disabled
                ? window.addEventListener("rescaleoff", function () {
                    e();
                  })
                : e();
            })
        : e();
    }),
    (function (e) {
      void 0 === window.TiLab.libs &&
        (window.TiLab.libs = {
          init: { sync: new Set(), async: new Set() },
          loaded: { sync: new Set(), async: new Set() },
        }),
        void 0 === window.TiLab.state && (window.TiLab.state = "loading");
      for (const [d, o] of Object.entries(e)) {
        void 0 === window[d] && (window[d] = {});
        for (const [e, i] of Object.entries(o))
          window[d][e] = function (...e) {
            void 0 === i.async && (i.async = !0),
              !1 === i.async
                ? (window.TiLab.libs.init.sync.add(d), n(d, i, ...e))
                : document.addEventListener("DOMContentLoaded", function () {
                    void 0 !== i.depends ||
                      window.TiLab.libs.init.sync.has(d) ||
                      window.TiLab.libs.init.async.add(d),
                      n(d, i, ...e);
                  });
          };
      }
      window.addEventListener("load", function () {
        window.TiLab.page = "load";
      }),
        document.addEventListener("DOMContentLoaded", function () {
          let e = document.createElement("script");
          (e.innerHTML =
            't_onReady(function(){ setTimeout(function(){ if (window.TiLab.page === "load") { window.dispatchEvent(new Event("load")); window.TiLab.page = "loaded" } }, 300) })'),
            document.querySelector(".t-body").appendChild(e);
        });
    })({
      rescale: {
        init: { method: "init", async: !1 },
        block: { method: "block" },
        disable: { method: "disable", async: !1 },
      },
      forms: {
        init: { method: "init", async: !1 },
        success: { method: "success" },
        validate: { method: "validate" },
      },
    });
})(window);
