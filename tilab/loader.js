/*!
 * mods.js v1.4 | MIT License | (c) 2025 Maksim Postnikov
 * https://postnikovmd.com/mods/license
 */

!(function (e) {
  void 0 === window.mods &&
    (window.mods = {
      version: "1.4",
      license: "MIT License: https://postnikovmd.com/mods/license",
      copyright: "В© 2025 Maksim Postnikov",
    });
  let d = new URLSearchParams(window.location.search);
  if (null !== d.get("debug")) {
    if (void 0 === window.mods.debug)
      return (
        null !== d.get("v") && (window.mods.version = d.get("v")),
        document.write(
          '<script src="https://static.postnikovmd.com/mods/' +
            window.mods.version +
            '/mods.min.js"></script>'
        ),
        void (window.mods.debug = !0)
      );
    null !== d.get("v") && (window.mods.version = d.get("v"));
  }
  if (null !== d.get("showerrors")) {
    let e = document.createElement("script");
    (e.src =
      "https://static.postnikovmd.com/mods/" +
      window.mods.version +
      "/misc/showerrors.min.js"),
      (e.async = !0),
      document.head.appendChild(e);
  }
  if (null !== d.get("showparams")) {
    let e = document.createElement("script");
    (e.src =
      "https://static.postnikovmd.com/mods/" +
      window.mods.version +
      "/misc/showparams.min.js"),
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
      let o =
        "https://cdn.postnikovmd.com/tilda@" +
        window.mods.version +
        "/" +
        e +
        ".min";
      window.mods.debug &&
        (o =
          "https://static.postnikovmd.com/mods/" +
          window.mods.version +
          "/" +
          e +
          ".min");
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
        window.mods.mods.loaded.sync.has(e) ||
        window.mods.mods.loaded.async.has(e)
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
                  ? window.mods.mods.loaded.async.add(e)
                  : window.mods.mods.loaded.sync.add(e),
                window.dispatchEvent(new Event("modLoaded")),
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
        ((window.t_onModLoad = function (e, d, n) {
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
        (window.t_onModsReady = function (e) {
          if (window.mods)
            if ("ready" === window.mods.state || "loaded" === window.mods.state)
              e();
            else if (window.mods.mods.init.sync.size > 0) {
              let d = !1;
              window.addEventListener("modsReady", function () {
                setTimeout(function () {
                  e(), (d = !0);
                }, 10);
              }),
                setTimeout(function () {
                  d ||
                    ("ready" === window.mods.state ||
                    "loaded" === window.mods.state
                      ? e()
                      : (e(),
                        console.warn(
                          "[mods.js] РџСЂРµРґСѓРїСЂРµР¶РґРµРЅРёРµ: РџСЂРµРІС‹С€РµРЅРѕ РІСЂРµРјСЏ Р·Р°РіСЂСѓР·РєРё РјРѕРґРёС„РёРєР°С†РёР№"
                        )));
                }, 3e3);
            } else e(), (window.mods.state = "notloaded");
          else e();
        }),
        (window.t_onReady = function (e) {
          "loading" !== document.readyState
            ? t_onModsReady(e)
            : document.addEventListener("DOMContentLoaded", function () {
                t_onModsReady(e);
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
    window.addEventListener("modLoaded", function () {
      function e() {
        function e() {
          if (
            ("ready" !== window.mods.state &&
              "loaded" !== window.mods.state &&
              window.mods.mods.init.sync.size ===
                window.mods.mods.loaded.sync.size &&
              (window.dispatchEvent(new Event("modsReady")),
              (window.mods.state = "ready")),
            "loaded" !== window.mods.state)
          ) {
            window.mods.mods.init.sync.size +
              window.mods.mods.init.async.size ===
              window.mods.mods.loaded.sync.size +
                window.mods.mods.loaded.async.size &&
              (window.dispatchEvent(new Event("modsLoaded")),
              (window.mods.state = "loaded"));
          }
        }
        "loading" !== document.readyState
          ? e()
          : document.addEventListener("DOMContentLoaded", function () {
              e();
            });
      }
      window.mods.mods.init.sync.has("rescale")
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
    void 0 === window.postnikovmd &&
      (window.postnikovmd = "Maksim Postnikov, https://postnikovmd.com"),
    (function (e) {
      void 0 === window.mods.mods &&
        (window.mods.mods = {
          init: { sync: new Set(), async: new Set() },
          loaded: { sync: new Set(), async: new Set() },
        }),
        void 0 === window.mods.state && (window.mods.state = "loading");
      for (const [d, o] of Object.entries(e)) {
        void 0 === window[d] && (window[d] = {});
        for (const [e, i] of Object.entries(o))
          window[d][e] = function (...e) {
            void 0 === i.async && (i.async = !0),
              !1 === i.async
                ? (window.mods.mods.init.sync.add(d), n(d, i, ...e))
                : document.addEventListener("DOMContentLoaded", function () {
                    void 0 !== i.depends ||
                      window.mods.mods.init.sync.has(d) ||
                      window.mods.mods.init.async.add(d),
                      n(d, i, ...e);
                  });
          };
      }
      window.addEventListener("load", function () {
        window.mods.page = "load";
      }),
        document.addEventListener("DOMContentLoaded", function () {
          let e = document.createElement("script");
          (e.innerHTML =
            't_onReady(function(){ setTimeout(function(){ if (window.mods.page === "load") { window.dispatchEvent(new Event("load")); window.mods.page = "loaded" } }, 300) })'),
            document.querySelector(".t-body").appendChild(e);
        });
    })({
      rescale: {
        init: { method: "init", async: !1 },
        block: { method: "block" },
        disable: { method: "disable", async: !1 },
      },
      header: { init: { method: "init", css: !0 } },
      subheader: { init: { depends: "header", method: "init" } },
      submenu: { init: { depends: "header", method: "init" } },
      menu: { init: { depends: "header", method: "init" } },
      search: { init: { depends: "header", method: "init" } },
      slider: { init: { method: "init", css: !0 } },
      tabs: { init: { method: "init", css: !0 } },
      popup: { init: { method: "init", css: !0 } },
      forms: {
        init: { method: "init", async: !1 },
        success: { method: "success" },
        validate: { method: "validate" },
      },
      accordion: { init: { method: "init", css: !0 } },
      video: { init: { method: "init", css: !0 } },
      audio: { init: { method: "init", css: !0 } },
      preloader: { init: { method: "init", async: !1, css: !0 } },
      tooltip: { init: { method: "init", css: !0 } },
      lottie: { init: { method: "init" } },
      truncate: { init: { method: "init" } },
      buttons: { init: { method: "init", css: !0 } },
      back: { init: { method: "init" } },
      flip: { init: { method: "init", css: !0 } },
      tilt: { init: { method: "init" } },
      textsplit: { init: { method: "init", css: !0 } },
      numbers: { init: { method: "init" } },
    });
})(window);
