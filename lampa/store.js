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
              Lampa.Controller.enabled &&
              Lampa.Controller.enabled().name == "skull_store_center"
            ) {
              Lampa.Controller.toggle("skull_store_center");
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
  var showStoreCenter = null;

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getStoredPlugins() {
    var list =
      Lampa.Plugins && Lampa.Plugins.get
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
    var categoryId =
      plugin.category ||
      legacyCategories[plugin.component] ||
      plugin.component ||
      "other";
    var category = getCategory(categories, categoryId) || {};
    var price = legacy
      ? plugin.field.price
      : plugin.price && plugin.price.label;

    return {
      id: plugin.id || (plugin.param && plugin.param.name) || categoryId,
      type: plugin.type || category.section || "plugin",
      category: categoryId,
      component:
        plugin.component ||
        (plugin.legacy && plugin.legacy.component) ||
        categoryId,
      name: legacy ? plugin.field.name : plugin.name,
      price: price || "Бесплатный",
      description: legacy
        ? plugin.field.description || ""
        : plugin.description || "",
      author: legacy ? plugin.field.author || "" : plugin.author || "",
      url: legacy ? plugin.field.link : plugin.install && plugin.install.url,
      tags: plugin.tags || [],
      requiresReboot:
        plugin.requiresReboot !== false &&
        (!plugin.compatibility ||
          plugin.compatibility.requiresReboot !== false),
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
    if (!silent)
      showReload("Для полного удаления плагина перезагрузите приложение!");
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

    if (showStoreCenter) showStoreCenter();
  }

  function storeStatusText(plugin) {
    var status = availability[plugin.url];

    if (!status || status.loading) return "Проверка";
    if (status.code) return status.code;

    return "404";
  }

  function storeStatusDescription(plugin) {
    var status = availability[plugin.url];

    if (!status || status.loading) return "Проверка";
    if (status.text) return status.text;

    return Number(status.code) >= 200 && Number(status.code) < 400
      ? "Работает"
      : "Ошибка";
  }

  function storeStatusClass(plugin) {
    var status = availability[plugin.url];

    if (!status || status.loading) return "yellow";
    if (Number(status.code) >= 200 && Number(status.code) < 400)
      return "success";

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
        var code = xhr && xhr.status ? Number(xhr.status) : 404;
        var response = xhr && xhr.responseText ? xhr.responseText : "";
        var valid = code >= 200 && code < 400 && /Lampa\./.test(response);

        availability[plugin.url] = {
          loading: false,
          code: valid
            ? "200"
            : code >= 200 && code < 400
              ? "500"
              : String(code || 404),
          text: valid
            ? "Работает"
            : code >= 200 && code < 400
              ? "Не плагин"
              : "Ошибка",
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
    var items =
      item ||
      $(".skull-store__item").filter(function () {
        return $(this).data("url") == plugin.url;
      });

    items.each(function () {
      var item = $(this);
      var check = item.find(".extensions__item-check");
      var code = item.find(".skull-store__availability");
      var status = item.find(".extensions__item-status");
      var loading =
        !availability[plugin.url] || availability[plugin.url].loading;

      check.toggleClass("hide", !loading);

      code
        .toggleClass("hide", loading)
        .removeClass("success error yellow")
        .addClass(storeStatusClass(plugin))
        .text(storeStatusText(plugin));

      status.toggleClass("hide", loading).text(storeStatusDescription(plugin));
    });
  }

  function headBackward(title) {
    var head = $(
      '<div class="head-backward selector">' +
        '<div class="head-backward__button"><svg><use xlink:href="#sprite-backward"></use></svg></div>' +
        '<div class="head-backward__title">' +
        escapeHtml(title) +
        "</div>" +
        "</div>",
    );

    head.find(".head-backward__button").on("click", function () {
      Lampa.Controller.back();
    });

    return head;
  }

  function protoIcon() {
    return (
      '<svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="10.5" cy="8.5" r="7" stroke="currentColor" stroke-width="3"/>' +
      '<rect y="9" width="21" height="21" rx="4" fill="currentColor"/>' +
      "</svg>"
    );
  }

  function injectStoreStyles() {
    if ($("#skull-store-style").length) return;

    $("body").append(
      '<style id="skull-store-style">' +
        ".skull-store-page .extensions__body{padding:2.5em 0;}" +
        ".skull-store__head{display:flex;align-items:flex-start;justify-content:space-between;gap:1em;margin-bottom:2.4em;padding:0 1.5em;}" +
        ".skull-store{padding: 0 1.5em;}" +
        ".skull-store__title{font-size:2.2em;font-weight:700;line-height:1.1;}" +
        ".skull-store__subtitle{opacity:.65;margin-top:.35em;font-size:1.05em;}" +
        ".skull-store__stats{display:flex;gap:.55em;flex-wrap:wrap;justify-content:flex-end;}" +
        ".skull-store__stat{padding:.45em .7em;border-radius:.35em;background:rgba(255,255,255,.08);font-size:.95em;}" +
        ".skull-store__layout{display:grid;grid-template-columns:18em minmax(0,1fr) 18em;align-items:start;}" +
        ".skull-store__column{min-width:0;}" +
        ".skull-store__column>.scroll{height:calc(100vh - 15em);}" +
        ".skull-store__section-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.2em;padding: 0 0.6em;}" +
        ".skull-store__category-list.menu__list{padding-left:0;}" +
        ".skull-store__section-title{font-size:1.25em;font-weight:700;margin:1.1em 0 .55em;}" +
        ".skull-store__section-title:first-child{margin-top:0;}" +
        ".skull-store .extensions__item{width:auto;margin: 0;}" +
        ".skull-store .extensions__item-disabled.hide,.skull-store .extensions__item-error.hide{display:none;}" +
        ".skull-store__news .notice__descr{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}" +
        ".skull-store__empty{padding:2em;opacity:.7;text-align:center;}" +
        "@media(max-width:900px){.skull-store-page .extensions__body{padding:1em 1em 0}.skull-store__layout{grid-template-columns:1fr}.skull-store__column>.scroll{height:auto}.skull-store__section-list{grid-template-columns:1fr}.skull-store__title{font-size:1.65em}}" +
        "</style>",
    );
  }

  function showPluginActions(plugin, rerender) {
    var installed = isInstalled(plugin.url);
    var enabled = isEnabled(plugin.url);
    var items = [];

    if (!installed) {
      items.push({
        title: "Установить",
        action: "install",
      });
    }

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
          installPlugin(plugin);
          rerender();
          Lampa.Controller.toggle("skull_store_center");
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
          Lampa.Controller.toggle("skull_store_center");
        }
      },
      onBack: function () {
        Lampa.Controller.toggle("skull_store_center");
      },
    });
  }

  function registerStoreComponent(rawPlugins, news, categories) {
    categories =
      categories && categories.length ? categories : defaultCategories;

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

    var instance = null;

    injectStoreStyles();

    function SkullStorePage() {
      var html = $('<div class="extensions skull-store-page"></div>');
      var head = $('<div class="skull-store__head"></div>');
      var body = $('<div class="skull-store"></div>');
      var content = $('<div class="extensions__body"></div>');
      var filter = "all";
      var categoryScroll = new Lampa.Scroll({ mask: true, over: true });
      var pluginScroll = new Lampa.Scroll({ mask: true, over: true });
      var newsScroll = new Lampa.Scroll({ mask: true, over: true });
      var scrolls = [categoryScroll, pluginScroll, newsScroll];
      var sections = [];
      var activeSection = 0;
      var lastFocus = [null, null, null];

      function filteredCatalog() {
        return catalog.filter(function (plugin) {
          if (filter == "all") return true;
          if (filter == "installed") return isInstalled(plugin.url);
          return plugin.category == filter;
        });
      }

      function visibleCategories() {
        return categoryOrder.filter(function (category) {
          return (
            category == "all" ||
            category == "installed" ||
            catalog.some(function (plugin) {
              return plugin.category == category;
            })
          );
        });
      }

      function categoryTitle(category) {
        if (category == "all") return "Все";
        if (category == "installed") return "Установленные";
        return categoryNames[category] || category;
      }

      function categoryIcon(category) {
        var icons = {
          all: "folder",
          installed: "check",
          online: "movie",
          tv: "tv",
          torrents: "cloud",
          interface: "settings",
          control: "settings",
          themes: "palette",
        };
        var sprite = icons[category] || "folder";

        return '<svg><use xlink:href="#sprite-' + sprite + '"></use></svg>';
      }

      function renderItem(plugin) {
        var installed = isInstalled(plugin.url);
        var enabled = isEnabled(plugin.url);
        var protocol = plugin.url.indexOf("https://") === 0 ? "https" : "http";
        var disabledText =
          Lampa.Lang && Lampa.Lang.translate
            ? Lampa.Lang.translate("player_disabled")
            : "Отключено";
        var installText = installed ? "Установлен" : "Не установлен";
        var installClass = installed ? "success" : "yellow";

        var item = $(
          '<div class="extensions__item selector skull-store__item" data-url="' +
            escapeHtml(plugin.url) +
            '">' +
            '<div class="extensions__item-author">' +
            escapeHtml(plugin.author) +
            '<span class="extensions__item-premium skull-store__price">' +
            escapeHtml(plugin.price) +
            "</span></div>" +
            '<div class="extensions__item-name">' +
            escapeHtml(plugin.name) +
            "</div>" +
            '<div class="extensions__item-descr">' +
            escapeHtml(plugin.description) +
            "</div>" +
            '<div class="extensions__item-footer">' +
            '<div class="extensions__item-error hide"></div>' +
            '<div class="extensions__item-check"></div>' +
            '<div class="extensions__item-proto protocol-' +
            protocol +
            '">' +
            protoIcon() +
            "</div>" +
            '<div class="extensions__item-code skull-store__availability hide yellow">Проверка</div>' +
            '<div class="extensions__item-status hide">Проверка</div>' +
            '<div class="extensions__item-code skull-store__install-state ' +
            installClass +
            '">' +
            escapeHtml(installText) +
            "</div>" +
            '<div class="extensions__item-disabled' +
            (installed && !enabled ? "" : " hide") +
            '">' +
            disabledText +
            "</div>" +
            "</div>" +
            "</div>",
        );

        item.on("visible", function () {
          checkAvailability(plugin, item);
        });

        updateAvailabilityView(plugin, item);

        return item;
      }

      function bindController() {
        $(".selector", body).on("hover:focus", function () {
          var index = Number(
            $(this).closest(".skull-store__column").data("section"),
          );

          if (!isNaN(index)) {
            activeSection = index;
            lastFocus[index] = this;
            scrolls[index].update(this, true);
          }
        });

        $(".skull-store__category", body).on("hover:enter click", function () {
          filter = $(this).data("filter");
          render();
        });

        $(".skull-store__item", body).on("hover:enter click", function () {
          var url = $(this).data("url");
          var plugin = catalog.find(function (item) {
            return item.url == url;
          });
          if (plugin) showPluginActions(plugin, render);
        });

        $(".skull-store__news-item", body).on("hover:enter click", function () {
          var index = Number($(this).data("news"));
          var item = (news || [])[index];

          if (!item) return;
          openNews(item);
        });
      }

      function newsImage(item) {
        return item.image || item.img || item.picture || item.poster || "";
      }

      function newsCardClass(item) {
        var image = newsImage(item);
        var className = "notice selector";

        if (image) className += " notice--card image--img image--loaded";
        else className += " image--none";

        return className;
      }

      function renderNoticeBody(item) {
        var image = newsImage(item);

        return (
          (image
            ? '<div class="notice__left"><div class="notice__img"><img src="' +
              escapeHtml(image) +
              '"></div></div>'
            : "") +
          '<div class="notice__body">' +
          '<div class="notice__head">' +
          '<div class="notice__title">' +
          escapeHtml(item.title) +
          "</div>" +
          (item.date
            ? '<div class="notice__time">' + escapeHtml(item.date) + "</div>"
            : "") +
          "</div>" +
          '<div class="notice__descr">' +
          escapeHtml(item.text) +
          "</div>" +
          "</div>"
        );
      }

      function renderNotice(item) {
        return (
          '<section class="' +
          newsCardClass(item) +
          '">' +
          renderNoticeBody(item) +
          "</section>"
        );
      }

      function openNews(item) {
        function closeNews() {
          Lampa.Modal.close();
          Lampa.Controller.toggle("skull_store_center");
        }

        Lampa.Modal.open({
          title: "",
          align: "left",
          zIndex: 300,
          html: $(renderNotice(item)),
          onBack: closeNews,
        });

        setTimeout(function () {
          Lampa.Controller.add("skull_store_news_modal", {
            invisible: true,
            toggle: function () {
              Lampa.Controller.collectionSet(Lampa.Modal.render());
            },
            up: function () {
              Lampa.Modal.scroll().wheel(
                -Math.round(window.innerHeight * 0.15),
              );
            },
            down: function () {
              Lampa.Modal.scroll().wheel(Math.round(window.innerHeight * 0.15));
            },
            back: closeNews,
          });

          Lampa.Controller.toggle("skull_store_news_modal");
        }, 0);
      }

      function renderCategories() {
        var list = $('<ul class="skull-store__category-list menu__list"></ul>');

        visibleCategories().forEach(function (category) {
          list.append(
            '<li class="skull-store__category menu__item selector' +
              (filter == category ? " active" : "") +
              '" data-filter="' +
              category +
              '">' +
              '<div class="menu__ico">' +
              categoryIcon(category) +
              "</div>" +
              '<div class="menu__text">' +
              escapeHtml(categoryTitle(category)) +
              "</div>" +
              "</li>",
          );
        });

        return list;
      }

      function renderPlugins(list) {
        var body = $('<div class="skull-store__section-list"></div>');

        if (list.length) {
          list.forEach(function (plugin) {
            body.append(renderItem(plugin));
          });
          return body;
        } else {
          return $(
            '<div class="skull-store__empty">В этом разделе пока пусто</div>',
          );
        }
      }

      function renderNews() {
        var panel = $('<div class="skull-store__news"></div>');

        (news || []).forEach(function (item, index) {
          panel.append(
            $("<section></section>")
              .addClass(newsCardClass(item))
              .addClass("skull-store__news-item")
              .attr("data-news", index)
              .append(renderNoticeBody(item)),
          );
        });

        return panel;
      }

      function makeColumn(index, title, scroll) {
        return $(
          '<div class="skull-store__column" data-section="' +
            index +
            '"></div>',
        )
          .append('<div class="skull-store__section-title">' + title + "</div>")
          .append(scroll.render());
      }

      function setCollection(index, target) {
        var scroll = scrolls[index];
        var render = scroll.render();
        var first = $(".selector", render).first()[0];
        var focus = target || lastFocus[index];

        if (focus && !$.contains(render[0], focus)) focus = null;

        activeSection = index;
        Lampa.Controller.collectionSet(render);
        Lampa.Controller.collectionFocus(focus || first || false, render);

        focus = $(".selector.focus", render)[0] || focus || first;
        if (focus) {
          lastFocus[index] = focus;
          scroll.update(focus, true);
        }
      }

      function nearestFromSection(index) {
        var render = scrolls[index].render();
        var items = $(".selector", render);

        if (!items.length) return null;
        if (lastFocus[index] && $.contains(render[0], lastFocus[index]))
          return lastFocus[index];

        return items.first()[0];
      }

      function fitScrolls() {
        var fontSize = parseFloat($("body").css("font-size")) || 16;
        var bottom = fontSize * 2.5;

        scrolls.forEach(function (scroll) {
          var element = scroll.render()[0];
          var top = element.getBoundingClientRect().top;

          if (top > 0) {
            element.style.height =
              Math.max(fontSize * 12, window.innerHeight - top - bottom) + "px";
          }
        });
      }

      function render() {
        var list = filteredCatalog();
        var installedTotal = catalog.filter(function (plugin) {
          return isInstalled(plugin.url);
        }).length;

        head
          .empty()
          .append(
            '<div class="skull-store__subtitle">Сторонний магазин расширений Lampa.</div>' +
              '<div class="skull-store__stats">' +
              '<div class="skull-store__stat">Всего: ' +
              catalog.length +
              "</div>" +
              '<div class="skull-store__stat">Установлено: ' +
              installedTotal +
              "</div>",
          );

        categoryScroll.clear();
        categoryScroll.append(renderCategories());
        pluginScroll.clear();
        pluginScroll.append(renderPlugins(list));
        newsScroll.clear();
        newsScroll.append(renderNews());

        var layout = $('<div class="skull-store__layout"></div>');

        layout.append(makeColumn(0, "Категории", categoryScroll));
        layout.append(makeColumn(1, "Плагины", pluginScroll));
        layout.append(makeColumn(2, "Новости", newsScroll));
        body.empty().append(layout);
        sections = $(".skull-store__column", body).toArray();
        bindController();

        setTimeout(function () {
          fitScrolls();

          var active = $(
            ".skull-store__category.active",
            categoryScroll.render(),
          ).first()[0];
          setCollection(
            activeSection,
            activeSection === 0 ? active : nearestFromSection(activeSection),
          );
        }, 50);
      }

      function moveVertical(direction) {
        var scroll = scrolls[activeSection];

        if (!Navigator.canmove || Navigator.canmove(direction)) {
          Navigator.move(direction);
        }

        setTimeout(function () {
          var focused = $(".selector.focus", scroll.render())[0];
          if (focused) {
            lastFocus[activeSection] = focused;
            scroll.update(focused, true);
          }
        }, 0);
      }

      function moveHorizontal(direction) {
        var scroll = scrolls[activeSection];
        var next = activeSection + (direction == "right" ? 1 : -1);

        if (
          activeSection == 1 &&
          Navigator.canmove &&
          Navigator.canmove(direction)
        ) {
          Navigator.move(direction);

          setTimeout(function () {
            var focused = $(".selector.focus", scroll.render())[0];
            if (focused) {
              lastFocus[activeSection] = focused;
              scroll.update(focused, true);
            }
          }, 0);

          return;
        }

        if (next < 0 || next >= sections.length) return;

        setCollection(next, nearestFromSection(next));
      }

      function releaseController() {
        var enabled = Lampa.Controller.enabled && Lampa.Controller.enabled();

        if (!enabled || enabled.name != "skull_store_center") return;

        if (Lampa.Controller.clear) Lampa.Controller.clear();
        else Lampa.Controller.toggle("content");
      }

      this.create = function () {
        render();
      };

      this.start = function () {
        var page = this;

        fitScrolls();
        checkCatalogAvailability(catalog, true);

        Lampa.Controller.add("skull_store_center", {
          toggle: function () {
            var focused = $(".selector.focus", body)[0];
            var section = focused
              ? Number(
                  $(focused).closest(".skull-store__column").data("section"),
                )
              : activeSection;

            if (isNaN(section)) section = activeSection;

            setCollection(section, focused || nearestFromSection(section));
          },
          up: function () {
            moveVertical("up");
          },
          down: function () {
            moveVertical("down");
          },
          left: function () {
            moveHorizontal("left");
          },
          right: function () {
            moveHorizontal("right");
          },
          back: function () {
            if (page.onBack) page.onBack();
          },
        });

        Lampa.Controller.toggle("skull_store_center");
      };

      this.pause = function () {};
      this.stop = function () {
        releaseController();
      };
      this.destroy = function () {
        releaseController();
        categoryScroll.destroy();
        pluginScroll.destroy();
        newsScroll.destroy();
        html.remove();
      };
      this.render = function () {
        if (!html.children().length) {
          categoryScroll.minus(head);
          pluginScroll.minus(head);
          newsScroll.minus(head);
          content.append(headBackward("💀 Skull Store"));
          content.append(head);
          content.append(body);
          html.append(content);
        }

        return html;
      };
    }

    showStoreCenter = function () {
      if (instance) return;

      var controller =
        Lampa.Controller.enabled && Lampa.Controller.enabled().name;

      instance = new SkullStorePage();
      instance.onBack = function () {
        instance.destroy();
        instance = null;

        document.body.classList.toggle("ambience--enable", false);

        if (controller) Lampa.Controller.toggle(controller);
      };

      instance.create();

      document.body.classList.toggle("ambience--enable", true);
      document.body.appendChild(instance.render()[0]);

      instance.start();
    };
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
