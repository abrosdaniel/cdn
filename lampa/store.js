/*!
 * Scull Store v1.1
 * (c) 2024-2026
 * by Daniel Abros
 * Site → https://abros.dev
 * Магазин сторонних плагинов для Lampa
 */

(function () {
  "use strict";

  const Config = {
    directus: {
      url: "https://cms.abros.dev",
      collection: "lampa",
    },
    mobileBreakpoint: 900,
    categoryLabels: {
      online: "Онлайн",
      tv: "ТВ",
      torrent: "Торренты",
      interface: "Интерфейс",
      control: "Управление",
      theme: "Темы",
      erotic: "18+",
      other: "Другое",
    },
    categoryOrder: [
      "online",
      "tv",
      "torrent",
      "interface",
      "control",
      "theme",
      "erotic",
      "other",
    ],
    categoryIcons: {
      all: "folder",
      installed: "check",
      online: "movie",
      tv: "tv",
      torrent: "cloud",
      interface: "settings",
      control: "settings",
      theme: "palette",
      erotic: "star",
      other: "folder",
    },
  };

  window.skull = true;

  console.groupCollapsed(
    `%c✨ Сторонний магазин плагинов Skull Store разработан Daniel Abros`,
    "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;",
  );
  console.log(`💻 Site: https://abros.dev`);
  console.groupEnd();

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
  function directusAssetUrl(image) {
    if (!image) return "";
    if (typeof image == "string") return image;
    if (image.id) return Config.directus.url + "/assets/" + image.id;

    return "";
  }

  function formatPrice(price) {
    if (price && typeof price == "object") {
      return price.label || formatPrice(price.type);
    }

    if (price === "subscription") return "Подписка";

    return "Бесплатный";
  }

  function normalizeCategoryId(categoryId) {
    if (categoryId && typeof categoryId == "object") {
      categoryId =
        categoryId.id || categoryId.value || categoryId.slug || "other";
    }

    var aliases = { torrents: "torrent", themes: "theme" };

    return aliases[categoryId] || categoryId || "other";
  }

  function normalizeCategoryIds(category) {
    var list = Array.isArray(category) ? category : category ? [category] : [];
    var result = list.reduce(function (acc, item) {
      var id = normalizeCategoryId(item);

      if (id && acc.indexOf(id) === -1) acc.push(id);

      return acc;
    }, []);

    return result.length ? result : ["other"];
  }

  function buildCategoriesFromCatalog(catalog) {
    var seen = {};

    catalog.forEach(function (plugin) {
      plugin.categories.forEach(function (id) {
        seen[id] = true;
      });
    });

    var ordered = Config.categoryOrder.filter(function (id) {
      return seen[id];
    }).map(function (id) {
      delete seen[id];

      return { id: id, title: Config.categoryLabels[id] || id };
    });

    Object.keys(seen).forEach(function (id) {
      ordered.push({
        id: id,
        title:
          Config.categoryLabels[id] ||
          id.charAt(0).toUpperCase() + id.slice(1),
      });
    });

    return ordered;
  }

  function pluginInCategory(plugin, categoryId) {
    return plugin.categories.indexOf(categoryId) >= 0;
  }

  function normalizePlugin(item) {
    return {
      categories: normalizeCategoryIds(item.category),
      name: item.name || "",
      author: item.author || "",
      description: item.description || "",
      price: formatPrice(item.price),
      url: item.url || "",
    };
  }

  function normalizeNewsItem(item) {
    return {
      id: item.id,
      title: item.title,
      text: item.text,
      image: directusAssetUrl(item.image) || null,
      date: item.date || null,
      tags: Array.isArray(item.tags) ? item.tags : [],
    };
  }

  function isPublishedNews(item) {
    return item && item.status === "published";
  }

  function fetchDirectusLampa() {
    var params = new URLSearchParams({
      fields: "*,extensions.*,news.*",
    });

    params.set("deep[news][_filter][status][_eq]", "published");
    params.set("deep[news][_sort]", "-date,-sort");

    var url =
      Config.directus.url +
      "/items/" +
      Config.directus.collection +
      "?" +
      params.toString();

    return fetch(url).then(function (response) {
      if (!response.ok) {
        throw new Error(
          "Directus " + Config.directus.collection + ": " + response.status,
        );
      }

      return response.json().then(function (payload) {
        var data = payload.data;

        if (Array.isArray(data)) return data[0] || {};

        return data || {};
      });
    });
  }

  /* Загрузка данных */
  function loadData() {
    fetchDirectusLampa()
      .then(function (data) {
        var news = (data.news || [])
          .filter(isPublishedNews)
          .map(normalizeNewsItem)
          .sort(function (a, b) {
            return (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0);
          });

        skullStart(data.extensions || [], news);
      })
      .catch(function (error) {
        console.error("Skull Store: ошибка загрузки из Directus:", error);
        console.error(
          "Skull Store: проверьте CORS на Directus (Origin клиента Lampa / cdn.abros.dev)",
        );
        skullStart([], []);
      });
  }

  /* Запрос на перезагрузку в модальном окне */
  function showReload(reloadText, cancel) {
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
            if (cancel) cancel();
          },
        },
        {
          name: "Да",
          onSelect: function onSelect() {
            window.location.reload();
          },
        },
      ],
      onBack: function () {
        Lampa.Modal.close();
        if (cancel) cancel();
      },
    });
  }
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

  function newsText(text) {
    return escapeHtml(text || "").replace(/\r?\n/g, "<br>");
  }

  function newsTime(item, index, fallbackTime) {
    var parsed = item.date ? Date.parse(item.date) : 0;

    return parsed || fallbackTime - index;
  }

  function registerStoreNotices(news, attempt) {
    if (!Lampa.Notice || !Lampa.Notice.addClass) {
      if ((attempt || 0) < 20) {
        setTimeout(function () {
          registerStoreNotices(news, (attempt || 0) + 1);
        }, 250);
      }

      return;
    }

    var fallbackTime = Date.now();

    Lampa.Notice.addClass("skull_store", {
      name: "Skull Store",
      active: function () {
        return true;
      },
      count: function () {
        var viewed = Lampa.Storage.get("skull_store_notice_viewed", 0);

        return this.items().filter(function (item) {
          return item.time > viewed;
        }).length;
      },
      viewed: function () {
        Lampa.Storage.set("skull_store_notice_viewed", Date.now());
        if (Lampa.Notice.drawCount) Lampa.Notice.drawCount();
      },
      empty: function () {
        return "Новостей Skull Store пока нет";
      },
      items: function () {
        return (news || []).map(function (item, index) {
          return {
            id: item.id || "skull_store_news_" + index,
            from: "skull_store",
            title: item.title,
            text: newsText(item.text),
            time: newsTime(item, index, fallbackTime),
            img: item.image || "",
            labels: item.tags.length ? item.tags : null,
          };
        });
      },
    });
    if (Lampa.Notice.drawCount) Lampa.Notice.drawCount();
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

  function findInstalled(url) {
    return getStoredPlugins().find(function (plugin) {
      return plugin.url == url;
    });
  }

  function getPluginState(url) {
    var plugin = findInstalled(url);

    return {
      installed: !!plugin,
      enabled: !!plugin && plugin.status !== 0,
    };
  }

  function isInstalled(url) {
    return getPluginState(url).installed;
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

  function removePluginByUrl(url) {
    var installed = findInstalled(url);

    if (!installed) {
      Lampa.Noty.show("Плагин не установлен");
      return false;
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

    Lampa.Noty.show("Плагин удален");
    Lampa.Storage.set("needRebootSettingExit", true);
    return true;
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

    if (!changed) return false;

    savePluginList(list);
    Lampa.Noty.show(status ? "Плагин включен" : "Плагин отключен");
    return true;
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

  function checkAvailability(plugin, item) {
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
      var availabilityStatus = availability[plugin.url];
      var loading = !!(availabilityStatus && availabilityStatus.loading);

      check.toggleClass("hide", !loading);

      code
        .toggleClass("hide", !availabilityStatus || loading)
        .removeClass("success error yellow")
        .addClass(storeStatusClass(plugin))
        .text(storeStatusText(plugin));

      status
        .toggleClass("hide", !availabilityStatus || loading)
        .text(storeStatusDescription(plugin));
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
        ".skull-store__head{display:flex;align-items:center;justify-content:space-between;gap:1em;margin-bottom:2.4em;padding:0 1.5em;}" +
        ".skull-store{padding: 0 1.5em;}" +
        ".skull-store__stats{display:flex;gap:.55em;flex-wrap:wrap;justify-content:flex-end;opacity:.65;}" +
        ".skull-store__stat{padding:.45em .7em;border-radius:.5em;}" +
        ".skull-store__layout{display:grid;grid-template-columns:20em minmax(0,1fr);align-items:start;}" +
        ".skull-store__column>.scroll{height:calc(100vh - 15em) !important;}" +
        ".skull-store__section-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.2em;padding: 0 0.6em;}" +
        ".skull-store__install-state{margin-left: auto;margin-right: 0 !important;}" +
        ".skull-store__category-list.menu__list{padding-left:0;}" +
        ".skull-store__section-title{font-size:1.25em;font-weight:700;}" +
        ".skull-store .extensions__item{width:auto;margin: 0;}" +
        ".skull-store__empty{padding:2em;opacity:.7;text-align:center;}" +
        "@media(max-width:" +
        Config.mobileBreakpoint +
        'px){.skull-store-page .extensions__body{padding:1em 1em 0}.skull-store{padding:0}.skull-store__head{padding:0;margin-bottom:1em}.skull-store__layout{display:block}.skull-store__column{margin-bottom:1.2em}.skull-store__column>.scroll{height:auto!important;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch}.skull-store__column>.scroll>.scroll__content{padding:.6em 0 1em}.skull-store__column[data-section="0"]>.scroll .scroll__body{display:flex!important;gap:1em;width:max-content;transform:none!important}.skull-store__column[data-section="1"]>.scroll .scroll__body{display:block!important;width:max-content;transform:none!important}.skull-store__category-list.menu__list{display:flex;gap:.5em;margin:0;padding:0}.skull-store__category.menu__item{flex-shrink:0}.skull-store__section-list{display:grid;grid-template-rows:repeat(3,auto);grid-auto-flow:column;grid-auto-columns:min(20em,85vw);gap:1em;padding:0;width:max-content}.skull-store .extensions__item{width:auto}.skull-store__title{font-size:1.65em}}' +
        "</style>",
    );
  }

  function showPluginActions(plugin, rerender) {
    var state = getPluginState(plugin.url);
    var items = [];
    var back = function () {
      Lampa.Controller.toggle("skull_store_center");
    };

    if (!state.installed) {
      items.push({
        title: "Установить",
        action: "install",
      });
    } else {
      items.push({
        title: state.enabled ? "Отключить" : "Включить",
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
          back();
          return;
        }

        if (item.action == "toggle") {
          if (setPluginStatus(plugin.url, state.enabled ? 0 : 1)) {
            rerender({ preserveController: true });
            showReload(
              "Для применения изменения перезагрузите приложение!",
              back,
            );
          } else {
            back();
          }
          return;
        }

        if (item.action == "remove") {
          if (removePluginByUrl(plugin.url)) {
            rerender({ preserveController: true });
            showReload(
              "Для полного удаления плагина перезагрузите приложение!",
              back,
            );
          } else {
            back();
          }
          return;
        }

        if (item.action == "check") {
          delete availability[plugin.url];
          checkAvailability(plugin);
          back();
        }
      },
      onBack: back,
    });
  }

  function registerStoreComponent(rawPlugins) {
    var catalog = rawPlugins.map(normalizePlugin);
    var categories = buildCategoriesFromCatalog(catalog);
    var categoryNames = {};

    categories.forEach(function (category) {
      categoryNames[category.id] = category.title;
    });

    var categoryOrder = ["all", "installed"].concat(
      categories.map(function (category) {
        return category.id;
      }),
    );

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
      var scrolls = [categoryScroll, pluginScroll];
      var activeSection = 0;
      var lastFocus = [null, null];

      function filteredCatalog() {
        return catalog.filter(function (plugin) {
          if (filter == "all") return true;
          if (filter == "installed") return isInstalled(plugin.url);
          return pluginInCategory(plugin, filter);
        });
      }

      function visibleCategories() {
        return categoryOrder;
      }

      function categoryTitle(category) {
        if (category == "all") return "Все";
        if (category == "installed") return "Установленные";
        return categoryNames[category] || category;
      }

      function categoryIcon(category) {
        var sprite = Config.categoryIcons[category] || "folder";

        return '<svg><use xlink:href="#sprite-' + sprite + '"></use></svg>';
      }

      function triggerPluginAvailabilityChecks() {
        if (Lampa.Layer && Lampa.Layer.visible) {
          Lampa.Layer.visible(pluginScroll.render(true));
        }
      }

      function renderItem(plugin) {
        var state = getPluginState(plugin.url);
        var protocol = plugin.url.indexOf("https://") === 0 ? "https" : "http";
        var stateText = "Не установлен";
        var stateClass = "yellow";

        if (state.installed) {
          stateText = state.enabled ? "Включён" : "Отключён";
          stateClass = state.enabled ? "success" : "error";
        }

        var item = $(
          '<div class="extensions__item selector skull-store__item layer--visible" data-url="' +
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
            '<div class="extensions__item-check"></div>' +
            '<div class="extensions__item-proto protocol-' +
            protocol +
            '">' +
            protoIcon() +
            "</div>" +
            '<div class="extensions__item-code skull-store__availability hide yellow">Проверка</div>' +
            '<div class="extensions__item-status hide">Проверка</div>' +
            '<div class="extensions__item-code skull-store__install-state ' +
            stateClass +
            '">' +
            escapeHtml(stateText) +
            "</div>" +
            "</div>" +
            "</div>",
        );

        item.on("visible", function () {
          checkAvailability(plugin, item);
        });

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
          lastFocus[1] = null;
          render({ resetPlugins: true });
        });

        $(".skull-store__item", body).on("hover:enter click", function () {
          var url = $(this).data("url");
          var plugin = catalog.find(function (item) {
            return item.url == url;
          });
          if (plugin) showPluginActions(plugin, render);
        });

        $(".skull-store__item", body).on("hover:focus", function () {
          var url = $(this).data("url");
          var plugin = catalog.find(function (item) {
            return item.url == url;
          });

          if (plugin) checkAvailability(plugin, $(this));
        });
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

        if (index === 1) triggerPluginAvailabilityChecks();
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

      function resetPluginScroll() {
        var render = pluginScroll.render();
        var scrollBody = render.find(".scroll__body")[0];
        var scrollContent = render.find(".scroll__content")[0];
        var scrollRoot = render.find(".scroll")[0];

        if (scrollBody)
          scrollBody.style.transform = "translate3d(0px, 0px, 0px)";
        if (scrollContent) scrollContent.scrollLeft = 0;
        if (scrollRoot) scrollRoot.scrollLeft = 0;

        var first = $(".selector", render).first()[0];

        if (first) pluginScroll.update(first, true);

        return first || null;
      }

      function render(options) {
        options = options || {};
        var list = filteredCatalog();
        var installedTotal = catalog.filter(function (plugin) {
          return isInstalled(plugin.url);
        }).length;

        head
          .empty()
          .append(
            '<div class="skull-store__subtitle"><p>Сторонний магазин расширений Lampa.</p><br><p>Предложить добавить новый плагин можно тут</p></div>' +
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
        var layout = $('<div class="skull-store__layout"></div>');

        layout.append(makeColumn(0, "Категории", categoryScroll));
        layout.append(makeColumn(1, "Плагины", pluginScroll));
        body.empty().append(layout);
        bindController();

        setTimeout(function () {
          fitScrolls();

          if (options.preserveController) {
            triggerPluginAvailabilityChecks();
            return;
          }

          if (options.resetPlugins) {
            var firstPlugin = resetPluginScroll();

            lastFocus[1] = firstPlugin;

            if (activeSection === 1) {
              setCollection(1, firstPlugin || false);
              return;
            }
          }

          var active = $(
            ".skull-store__category.active",
            categoryScroll.render(),
          ).first()[0];
          setCollection(
            activeSection,
            activeSection === 0 ? active : nearestFromSection(activeSection),
          );
          triggerPluginAvailabilityChecks();
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
            if (activeSection === 1) triggerPluginAvailabilityChecks();
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
              triggerPluginAvailabilityChecks();
            }
          }, 0);

          return;
        }

        if (next < 0 || next >= scrolls.length) return;

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
        html.remove();
      };
      this.render = function () {
        if (!html.children().length) {
          categoryScroll.minus(head);
          pluginScroll.minus(head);
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
  function skullStart(plugins, news) {
    registerStoreNotices(news);
    registerStoreComponent(plugins);

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
