/*!
 * Scull Store v1.1
 * (c) 2024-2026
 * by Daniel Abros
 * Site → https://abros.dev
 * Магазин сторонних плагинов для Lampa
 */

(function () {
  "use strict";

  window.skull = true;

  console.groupCollapsed(
    `%c✨ Сторонний магазин плагинов Scull Store разработан Daniel Abros`,
    "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;",
  );
  console.log(`💻 Site: https://abros.dev`);
  console.groupEnd();

  /* Домен-регулятор */
  const domain = "https://cdn.abros.dev/lampa";

  /* Иконки */
  var icon_skull =
    '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="currentColor" style="border: 3px solid; border-radius: 5px; padding: 4px;"><path d="M133.234,478.948l-21.141-68.984c2.656-3.203,4.141-7.296,3.813-11.671 c-0.688-9.375-9.25-16.438-19.156-15.797c-9.906,0.656-17.375,8.766-16.688,18.141c0.516,6.984,5.406,12.671,11.938,14.875 l21.141,68.984c-2.656,3.188-4.141,7.281-3.813,11.672c0.688,9.359,9.266,16.438,19.156,15.797 c9.906-0.656,17.375-8.781,16.688-18.141C144.656,486.839,139.781,481.151,133.234,478.948z"></path> <path d="M40.953,438.651c-7.078,1.844-11.234,8.781-9.297,15.484l7.984,27.422c1.938,6.703,9.266,10.641,16.344,8.797 l38.016-9.5l-15.031-51.703L40.953,438.651z"></path> <path d="M192.125,401.527c-37.25,11.296-62.797,16.187-62.797,16.187L144,462.12c0,0,50.578-12.813,112-35.109 c61.422,22.297,112,35.109,112,35.109l14.672-44.406c0,0-25.547-4.891-62.797-16.187c54.813-24.141,107.875-54.375,134.625-88.75 c53.984-69.359,26.734-125.938,26.734-125.938s-4.125-9.469-9.656,8.75c-32.203,92.281-132,150.094-215.578,183.547 c-83.578-33.453-183.375-91.266-215.578-183.547c-5.531-18.219-9.656-8.75-9.656-8.75S3.516,243.417,57.5,312.777 C84.25,347.152,137.313,377.386,192.125,401.527z"></path> <path d="M420,415.511c6.531-2.203,11.422-7.89,11.938-14.875c0.688-9.375-6.781-17.484-16.688-18.141 c-9.906-0.641-18.469,6.422-19.156,15.797c-0.328,4.375,1.156,8.469,3.813,11.671l-21.141,68.984 c-6.547,2.203-11.422,7.891-11.938,14.875c-0.688,9.359,6.781,17.484,16.688,18.141c9.891,0.641,18.469-6.438,19.156-15.797 c0.328-4.391-1.156-8.484-3.813-11.672L420,415.511z"></path> <path d="M471.047,438.651l-38.016-9.5L418,480.854l38.016,9.5c7.078,1.844,14.406-2.094,16.344-8.797l7.984-27.422 C482.281,447.433,478.125,440.495,471.047,438.651z"></path> <path d="M187.141,274.871v28.578c0,5.156,4.188,9.344,9.359,9.344h22.813c5.172,0,9.359-4.188,9.359-9.344v-23.922 h7.797v23.922c0,5.156,4.188,9.344,9.344,9.344h22.828c5.172,0,9.359-4.188,9.359-9.344v-23.922h7.781v23.922 c0,5.156,4.188,9.344,9.359,9.344h22.828c5.156,0,9.344-4.188,9.344-9.344v-28.578c23.781-7.219,63.5-23.984,77-57.859 c9.828-24.641,5.984-57.063-8.719-119.578C380.875,34.917,338.125-0.004,257.234-0.004c-80.906,0-123.656,34.922-138.359,97.438 c-14.719,62.516-18.563,94.938-8.734,119.578C123.641,250.886,163.359,267.652,187.141,274.871z M313.672,112.808 c21.516-3.672,42.5,14.031,46.859,39.547s-9.547,49.188-31.063,52.875c-21.516,3.672-42.5-14.031-46.859-39.547 C278.25,140.152,292.156,116.496,313.672,112.808z M257.234,197.558l20.672,25.859h-20.672h-20.688L257.234,197.558z M153.922,152.355c4.375-25.516,25.344-43.219,46.859-39.547c21.531,3.688,35.438,27.344,31.063,52.875 c-4.359,25.516-25.344,43.219-46.859,39.547C163.469,201.542,149.563,177.871,153.922,152.355z"></path></svg>';
  /* Регулярно вызываемые функции */
  Lampa.Storage.set("needReboot", false);
  Lampa.Storage.set("needRebootSettingExit", false);

  function loadScript(src) {
    document.head.appendChild(
      Object.assign(document.createElement("script"), { src }),
    );
  }
  /* Загрузка данных */
  function loadData() {
    fetch(`${domain}/data.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        var { plugins, news, categories } = data;
        skullStart(plugins, news, categories);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error,
        );
      });
  }

  /* Запрос на перезагрузку в модальном окне */
  function showReload(reloadText) {
    Lampa.Modal.open({
      title: "",
      align: "center",
      zIndex: 300,
      html: $('<div class="about">' + reloadText + "</div>"),
      buttons: [
        {
          name: "Нет",
          onSelect: function onSelect() {
            Lampa.Modal.close();
            $(".modal").remove();
            if ($("body").hasClass("settings--open")) {
              Lampa.Controller.toggle("settings_component");
            } else if (
              Lampa.Activity.active() &&
              Lampa.Activity.active().component == "skull_store_center"
            ) {
              Lampa.Controller.toggle("skull_store_center");
            }
          },
        },
        {
          name: "Да",
          onSelect: function onSelect() {
            window.location.reload();
          },
        },
      ],
    });
  }
  var defaultCategories = [
    { id: "online", title: "Онлайн", section: "plugins" },
    { id: "tv", title: "ТВ", section: "plugins" },
    { id: "torrents", title: "Торренты", section: "plugins" },
    { id: "interface", title: "Интерфейс", section: "extensions" },
    { id: "control", title: "Управление", section: "extensions" },
    { id: "themes", title: "Темы", section: "extensions" },
  ];

  var legacyCategories = {
    skull_online: "online",
    skull_tv: "tv",
    skull_torpars: "torrents",
    skull_interface: "interface",
    skull_control: "control",
    skull_style: "themes",
  };

  var availability = {};

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getStoredPlugins() {
    var list = Lampa.Plugins && Lampa.Plugins.get
      ? Lampa.Plugins.get()
      : Lampa.Storage.get("plugins", "[]");

    if (!Array.isArray(list)) list = [];

    return list.map(function (plugin) {
      return typeof plugin == "string" ? { url: plugin, status: 1 } : plugin;
    });
  }

  function getCategory(categories, id) {
    return categories.find(function (category) {
      return category.id == id;
    });
  }

  function normalizePlugin(plugin, categories) {
    var legacy = plugin.field ? plugin : false;
    var categoryId = plugin.category || legacyCategories[plugin.component] || plugin.component || "other";
    var category = getCategory(categories, categoryId) || {};
    var price = legacy ? plugin.field.price : plugin.price && plugin.price.label;

    return {
      id: plugin.id || (plugin.param && plugin.param.name) || categoryId,
      type: plugin.type || category.section || "plugin",
      category: categoryId,
      component: plugin.component || (plugin.legacy && plugin.legacy.component) || categoryId,
      name: legacy ? plugin.field.name : plugin.name,
      price: price || "Бесплатный",
      description: legacy ? plugin.field.description || "" : plugin.description || "",
      author: legacy ? plugin.field.author || "" : plugin.author || "",
      url: legacy ? plugin.field.link : plugin.install && plugin.install.url,
      tags: plugin.tags || [],
      requiresReboot:
        plugin.requiresReboot !== false &&
        (!plugin.compatibility || plugin.compatibility.requiresReboot !== false),
    };
  }

  function findInstalled(url) {
    return getStoredPlugins().find(function (plugin) {
      return plugin.url == url;
    });
  }

  function isInstalled(url) {
    return !!findInstalled(url);
  }

  function isEnabled(url) {
    var plugin = findInstalled(url);
    return !!plugin && plugin.status !== 0;
  }

  function savePluginList(list) {
    Lampa.Storage.set("plugins", list);
    if (Lampa.Plugins && Lampa.Plugins.save) Lampa.Plugins.save();
  }

  function installPlugin(plugin) {
    if (isInstalled(plugin.url)) {
      Lampa.Noty.show("Плагин уже установлен");
      return;
    }

    var item = {
      author: plugin.author,
      url: plugin.url,
      name: plugin.name,
      status: 1,
    };

    if (Lampa.Plugins && Lampa.Plugins.add) {
      Lampa.Plugins.add(item);
    } else {
      var list = getStoredPlugins();
      list.push(item);
      Lampa.Storage.set("plugins", list);
      loadScript(plugin.url);
      Lampa.Noty.show("Плагин " + plugin.name + " установлен");
    }
  }

  function removePluginByUrl(url, silent) {
    var installed = findInstalled(url);

    if (!installed) {
      Lampa.Noty.show("Плагин не установлен");
      return;
    }

    if (Lampa.Plugins && Lampa.Plugins.remove) {
      Lampa.Plugins.remove(installed);
    } else {
      savePluginList(
        getStoredPlugins().filter(function (plugin) {
          return plugin.url !== url;
        }),
      );
    }

    if (!silent) Lampa.Noty.show("Плагин удален");
    Lampa.Storage.set("needRebootSettingExit", true);
    if (!silent) showReload("Для полного удаления плагина перезагрузите приложение!");
  }

  function setPluginStatus(url, status) {
    var list = getStoredPlugins();
    var changed = false;

    list.forEach(function (plugin) {
      if (plugin.url == url) {
        plugin.status = status;
        changed = true;
      }
    });

    if (changed) {
      savePluginList(list);
      Lampa.Noty.show(status ? "Плагин включен" : "Плагин отключен");
      showReload("Для применения изменения перезагрузите приложение!");
    }
  }

  function openStoreCenter() {
    $("body").toggleClass("settings--open", false);
    Lampa.Settings.render().removeClass("animate").removeClass("animate-down");
    Lampa.Activity.push({
      component: "skull_store_center",
      title: "Skull Store",
    });
  }

  function storeStatusText(plugin) {
    var status = availability[plugin.url];

    if (!status) return "Проверка";
    if (status.code) return status.code;
    if (status.loading) return "...";

    return "ERR";
  }

  function storeStatusClass(plugin) {
    var status = availability[plugin.url];

    if (!status || status.loading) return "wait";
    if (Number(status.code) >= 200 && Number(status.code) < 400) return "ready";

    return "error";
  }

  function checkAvailability(plugin, item, force) {
    if (force) delete availability[plugin.url];
    if (!plugin.url || availability[plugin.url]) return;

    availability[plugin.url] = { loading: true };
    updateAvailabilityView(plugin, item);

    $.ajax({
      url: plugin.url,
      dataType: "text",
      timeout: 6000,
      cache: false,
      complete: function (xhr) {
        availability[plugin.url] = {
          loading: false,
          code: xhr && xhr.status ? String(xhr.status) : "",
        };
        updateAvailabilityView(plugin);
      },
    });
  }

  function checkCatalogAvailability(catalog, force) {
    catalog.forEach(function (plugin) {
      checkAvailability(plugin, null, force);
    });
  }

  function updateAvailabilityView(plugin, item) {
    var items = item || $('.skull-store__item[data-url="' + plugin.url + '"]');

    items.each(function () {
      var status = $(this).find(".skull-store__availability");

      status
        .removeClass("ready error wait")
        .addClass(storeStatusClass(plugin))
        .text(storeStatusText(plugin));
    });
  }

  function injectStoreStyles() {
    if ($("#skull-store-style").length) return;

    $("body").append(
      '<style id="skull-store-style">' +
        ".skull-store{padding:1.5em 2em 3em;}" +
        ".skull-store__head{display:flex;align-items:flex-start;justify-content:space-between;gap:1em;margin-bottom:1.2em;}" +
        ".skull-store__title{font-size:2.2em;font-weight:700;line-height:1.1;}" +
        ".skull-store__subtitle{opacity:.65;margin-top:.35em;font-size:1.05em;}" +
        ".skull-store__stats{display:flex;gap:.55em;flex-wrap:wrap;justify-content:flex-end;}" +
        ".skull-store__stat{padding:.45em .7em;border-radius:.35em;background:rgba(255,255,255,.08);font-size:.95em;}" +
        ".skull-store__layout{display:grid;grid-template-columns:minmax(0,1fr) 24em;gap:1.2em;align-items:start;}" +
        ".skull-store__section-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.65em;}" +
        ".skull-store__tabs{display:flex;gap:.55em;overflow:hidden;margin-bottom:1.1em;flex-wrap:wrap;}" +
        ".skull-store__tab{padding:.58em .85em;border-radius:.35em;background:rgba(255,255,255,.08);border:.12em solid transparent;}" +
        ".skull-store__tab.active{background:#d8c39a;color:#111;}" +
        ".skull-store__tab.focus{border-color:#fff;}" +
        ".skull-store__section-title{font-size:1.25em;font-weight:700;margin:1.1em 0 .55em;}" +
        ".skull-store__section-title:first-child{margin-top:0;}" +
        ".skull-store .extensions__item{position:relative;min-height:5.4em;padding-right:5.2em;}" +
        ".skull-store .extensions__item-name{padding-right:4em;}" +
        ".skull-store .extensions__item-descr{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}" +
        ".skull-store .extensions__item-premium{margin-left:.5em;}" +
        ".skull-store .extensions__item-proto{position:absolute;right:1em;bottom:1em;font-size:.75em;opacity:.72;}" +
        ".skull-store .extensions__item-disabled{position:absolute;right:5.2em;top:1em;padding:.22em .5em;border-radius:.25em;background:rgba(255,255,255,.18);font-size:.8em;}" +
        ".skull-store .extensions__item-disabled.hide,.skull-store .extensions__item-error.hide{display:none;}" +
        ".skull-store__item{position:relative;}" +
        ".skull-store__availability{position:absolute;right:1em;top:1em;padding:.22em .5em;border-radius:.25em;background:rgba(255,255,255,.12);font-size:.8em;}" +
        ".skull-store__availability.ready{background:#3fb36b;color:#fff;}" +
        ".skull-store__availability.error{background:#b34444;color:#fff;}" +
        ".skull-store__availability.wait{background:#777;color:#fff;}" +
        ".skull-store__price{margin-left:.5em;opacity:.72;}" +
        ".skull-store__news{position:sticky;top:1em;}" +
        ".skull-store__news-title{font-size:1.25em;font-weight:700;margin-bottom:.55em;}" +
        ".skull-store__news-item{position:relative;margin-bottom:.65em;}" +
        ".skull-store__news-name{font-weight:700;margin-bottom:.45em;}" +
        ".skull-store__news-text{line-height:1.35;opacity:.86;}" +
        ".skull-store__empty{padding:2em;opacity:.7;text-align:center;}" +
        "@media(max-width:900px){.skull-store{padding:1em}.skull-store__layout{grid-template-columns:1fr}.skull-store__section-list{grid-template-columns:1fr}.skull-store__news{position:static}.skull-store__title{font-size:1.65em}}" +
        "</style>",
    );
  }

  function showPluginActions(plugin, rerender) {
    var installed = isInstalled(plugin.url);
    var enabled = isEnabled(plugin.url);
    var items = [];

    items.push({
      title: installed ? "Переустановить" : "Установить",
      action: "install",
    });

    if (installed) {
      items.push({
        title: enabled ? "Отключить" : "Включить",
        action: "toggle",
      });

      items.push({
        title: "Удалить",
        action: "remove",
      });
    }

    items.push({
      title: "Проверить доступность",
      action: "check",
    });

    Lampa.Select.show({
      title: plugin.name,
      items: items,
      onSelect: function (item) {
        if (item.action == "install") {
          if (installed) removePluginByUrl(plugin.url, true);
          setTimeout(function () {
            installPlugin(plugin);
            rerender();
            Lampa.Controller.toggle("skull_store_center");
          }, installed ? 300 : 0);
        }

        if (item.action == "toggle") {
          setPluginStatus(plugin.url, enabled ? 0 : 1);
          rerender();
          Lampa.Controller.toggle("skull_store_center");
        }

        if (item.action == "remove") {
          removePluginByUrl(plugin.url);
          rerender();
          Lampa.Controller.toggle("skull_store_center");
        }

        if (item.action == "check") {
          delete availability[plugin.url];
          checkAvailability(plugin);
          rerender();
          Lampa.Controller.toggle("skull_store_center");
        }
      },
      onBack: function () {
        Lampa.Controller.toggle("skull_store_center");
      },
    });
  }

  function registerStoreComponent(rawPlugins, news, categories) {
    categories = categories && categories.length ? categories : defaultCategories;

    var categoryNames = categories.reduce(function (result, category) {
      result[category.id] = category.title;
      return result;
    }, {});

    var categoryOrder = ["all", "installed"].concat(
      categories.map(function (category) {
        return category.id;
      }),
    );

    var catalog = rawPlugins.map(function (plugin) {
      return normalizePlugin(plugin, categories);
    });

    if (Lampa.Component.get && Lampa.Component.get("skull_store_center")) return;

    injectStoreStyles();

    Lampa.Component.add("skull_store_center", function () {
      var html = $('<div class="skull-store"></div>');
      var filter = "all";
      var scroll = new Lampa.Scroll({ mask: true, over: true });

      function filteredCatalog() {
        return catalog.filter(function (plugin) {
          if (filter == "all") return true;
          if (filter == "installed") return isInstalled(plugin.url);
          return plugin.category == filter;
        });
      }

      function renderTabs() {
        return categoryOrder
          .filter(function (category) {
            return (
              category == "all" ||
              category == "installed" ||
              catalog.some(function (plugin) {
                return plugin.category == category;
              })
            );
          })
          .map(function (category) {
            return (
              '<div class="skull-store__tab selector' +
              (filter == category ? " active" : "") +
              '" data-filter="' +
              category +
              '">' +
              escapeHtml(category == "all" ? "Все" : category == "installed" ? "Установленные" : categoryNames[category]) +
              "</div>"
            );
          })
          .join("");
      }

      function renderItem(plugin) {
        var installed = isInstalled(plugin.url);
        var enabled = isEnabled(plugin.url);
        var protocol = plugin.url.indexOf("https://") === 0 ? "https" : "http";
        var disabledText =
          Lampa.Lang && Lampa.Lang.translate
            ? Lampa.Lang.translate("player_disabled")
            : "Отключено";

        var item = $(
          '<div class="extensions__item selector skull-store__item" data-url="' +
            escapeHtml(plugin.url) +
            '">' +
            '<div class="extensions__item-name">' +
            escapeHtml(plugin.name) +
            "</div>" +
            '<div class="extensions__item-author">' +
            escapeHtml(plugin.author) +
            '<span class="extensions__item-premium skull-store__price">' +
            escapeHtml(plugin.price) +
            "</span></div>" +
            '<div class="extensions__item-descr">' +
            escapeHtml(plugin.description) +
            "</div>" +
            '<div class="extensions__item-proto protocol-' +
            protocol +
            '">' +
            protocol.toUpperCase() +
            "</div>" +
            '<div class="extensions__item-disabled' +
            (installed && !enabled ? "" : " hide") +
            '">' +
            disabledText +
            "</div>" +
            '<div class="extensions__item-error hide">Ошибка</div>' +
            '<div class="skull-store__availability wait">Проверка</div>' +
            "</div>",
        );

        item.on("visible", function () {
          checkAvailability(plugin, item);
        });

        item.on("hover:focus", function () {
          scroll.update(item[0], true);
        });

        updateAvailabilityView(plugin, item);

        return item;
      }

      function bindController() {
        $(".selector", html).on("hover:focus", function () {
          scroll.update(this, true);
        });

        $(".skull-store__tab", html).on("hover:enter click", function () {
          filter = $(this).data("filter");
          render();
        });

        $(".skull-store__item", html).on("hover:enter click", function () {
          var url = $(this).data("url");
          var plugin = catalog.find(function (item) {
            return item.url == url;
          });
          if (plugin) showPluginActions(plugin, render);
        });

        $(".skull-store__news-item", html).on("hover:enter click", function () {
          var index = Number($(this).data("news"));
          var item = (news || [])[index];

          if (!item) return;

          Lampa.Modal.open({
            title: item.title,
            align: "left",
            zIndex: 300,
            html: $('<div class="about">' + escapeHtml(item.text) + "</div>"),
            buttons: [
              {
                name: "Закрыть",
                onSelect: function () {
                  Lampa.Modal.close();
                  Lampa.Controller.toggle("skull_store_center");
                },
              },
            ],
          });
        });
      }

      function renderSection(title, list) {
        var section = $('<div class="skull-store__section"></div>');
        var body = $('<div class="skull-store__section-list"></div>');

        section.append('<div class="skull-store__section-title">' + title + "</div>");

        if (list.length) {
          list.forEach(function (plugin) {
            body.append(renderItem(plugin));
          });
          section.append(body);
        } else {
          section.append('<div class="skull-store__empty">В этом разделе пока пусто</div>');
        }

        return section;
      }

      function renderNews() {
        var panel = $('<div class="skull-store__news"></div>');

        panel.append('<div class="skull-store__news-title">Новости</div>');

        (news || []).forEach(function (item, index) {
          panel.append(
            '<div class="notice__item selector skull-store__news-item" data-news="' +
              index +
              '" style="' +
              escapeHtml(item.background || item.bg || "") +
              ";color:" +
              escapeHtml(item.textColor || item.colortext || "#fff") +
              '">' +
              '<div class="skull-store__news-name">' +
              escapeHtml(item.title) +
              "</div>" +
              '<div class="skull-store__news-text">' +
              escapeHtml(item.text) +
              "</div>" +
              "</div>",
          );
        });

        return panel;
      }

      function render() {
        var list = filteredCatalog();
        var installedTotal = catalog.filter(function (plugin) {
          return isInstalled(plugin.url);
        }).length;
        var plugins = list.filter(function (plugin) {
          return plugin.type == "plugin";
        });
        var extensions = list.filter(function (plugin) {
          return plugin.type != "plugin";
        });

        html.empty().append(
          '<div class="skull-store__head">' +
            "<div>" +
            '<div class="skull-store__title">Skull Store</div>' +
            '<div class="skull-store__subtitle">Управление установкой, отключением и удалением модов Lampa</div>' +
            "</div>" +
            '<div class="skull-store__stats">' +
            '<div class="skull-store__stat">Всего: ' +
            catalog.length +
            "</div>" +
            '<div class="skull-store__stat">Установлено: ' +
            installedTotal +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="skull-store__tabs">' +
            renderTabs() +
            "</div>",
        );

        var layout = $('<div class="skull-store__layout"></div>');
        var left = $('<div class="skull-store__left"></div>');

        left.append(renderSection("Расширения", extensions));
        left.append(renderSection("Плагины", plugins));
        layout.append(left);
        layout.append(renderNews());
        html.append(layout);
        scroll.clear();
        scroll.append(html);
        bindController();

        setTimeout(function () {
          var first = $(".selector", html).first()[0];
          Lampa.Controller.collectionSet(scroll.render());
          Lampa.Controller.collectionFocus(first || false, scroll.render());
          if (first) scroll.update(first, true);
        }, 50);
      }

      function move(direction) {
        Navigator.move(direction);

        setTimeout(function () {
          var focused = $(".selector.focus", html);
          if (focused.length) scroll.update(focused[0], true);
        }, 0);
      }

      this.create = function () {
        render();
      };

      this.start = function () {
        checkCatalogAvailability(catalog, true);

        Lampa.Controller.add("skull_store_center", {
          toggle: function () {
            var focused = $(".selector.focus", html)[0];
            var first = $(".selector", html).first()[0];
            Lampa.Controller.collectionSet(scroll.render());
            Lampa.Controller.collectionFocus(focused || first || false, scroll.render());
          },
          up: function () {
            move("up");
          },
          down: function () {
            move("down");
          },
          left: function () {
            move("left");
          },
          right: function () {
            move("right");
          },
          back: function () {
            Lampa.Activity.backward();
          },
        });

        Lampa.Controller.toggle("skull_store_center");
      };

      this.pause = function () {};
      this.stop = function () {};
      this.destroy = function () {
        scroll.destroy();
        html.remove();
      };
      this.render = function () {
        return scroll.render();
      };
    });
  }

  /* Создание Skull Store и его меню */
  function skullStart(plugins, news, categories) {
    registerStoreComponent(plugins, news, categories);

    /* Skull Store */
    Lampa.SettingsApi.addComponent({
      component: "skull",
      name: "Skull Store",
      icon: icon_skull,
    });

    Lampa.Settings.listener.follow("open", function (e) {
      if (e.name == "main") {
        /* Сдвигаем раздел выше */
        setTimeout(function () {
          $("div[data-component=plugins]").before(
            $("div[data-component=skull]"),
          );
          $("div[data-component=skull]")
            .unbind("hover:enter")
            .on("hover:enter", openStoreCenter);
        }, 30);
      }
    });

    /* Центр управления */
    Lampa.SettingsApi.addParam({
      component: "skull",
      param: {
        name: "skull_store_center",
        type: "static",
        default: true,
      },
      field: {
        name:
          '<div class="settings-folder" style="padding:0!important">' +
          '<div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em;margin:0">' +
          icon_skull +
          "</div>" +
          '<div class="settings-folder__name" style="font-size:1.3em">Центр управления модами</div>' +
          "</div>",
      },
      onRender: function (item) {
        item.on("hover:enter", function () {
          openStoreCenter();
        });
      },
    });

    /* Подвал */
    Lampa.SettingsApi.addParam({
      component: "skull",
      param: {
        name: "skull_info",
        type: "title",
      },
      field: {
        name: "✨ Данный магазин разрабатывается только из интереса к проекту. Если ты хочешь помочь в разработке пиши мне в телеграм @abrosxd",
      },
    });

    /* Настройки меню */
    Lampa.Settings.listener.follow("open", function (e) {
      if (e.name == "main") {
        $(".settings__title").text(Lampa.Lang.translate("title_settings"));
      }
      if (e.name == "skull") {
        $(".settings__title").text("💀 Skull Store");
      }
    });

  }

  if (window.appready) {
    loadData();
  } else {
    Lampa.Listener.follow("app", (e) => {
      if (e.type === "ready") {
        loadData();
      }
    });
  }
})();
