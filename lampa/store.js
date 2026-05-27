/*!
 * BoneHead v1.1
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
    categoryLabelKeys: {
      all: "settings_param_jackett_interview_all",
      installed: "bonehead_category_installed",
      online: "bonehead_category_online",
      tv: "bonehead_category_tv",
      torrent: "full_torrents",
      interface: "settings_main_interface",
      control: "extensions_hpu_control",
      theme: "extensions_hpu_theme",
      erotic: "bonehead_category_erotic",
      other: "extensions_hpu_other",
      screensaver: "extensions_hpu_screensaver",
      video: "extensions_hpu_video",
      recomend: "extensions_hpu_recomend",
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
    /* Иконка категории: lampa:sprite | online.svg | URL | inline <svg> */
    icons: {
      baseUrl: "https://cdn.abros.dev/lampa/icons",
    },
    categoryIcons: {
      all: "lampa:catalog",
      installed: "lampa:collection",
      online: "lampa:movie",
      tv: "lampa:tv",
      torrent: "lampa:torrent",
      interface: "lampa:settings",
      control: "lampa:console",
      theme: "lampa:star",
      erotic: "lampa:adult",
      other: "lampa:dots",
      screensaver: "lampa:broadcast",
      video: "lampa:trailer",
      recomend: "lampa:fire",
    },
  };

  window.bonehead = true;

  var icon_bonehead =
    '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="currentColor" style="border: 2px solid; border-radius: 5px; padding: 4px;"><path d="M133.234,478.948l-21.141-68.984c2.656-3.203,4.141-7.296,3.813-11.671 c-0.688-9.375-9.25-16.438-19.156-15.797c-9.906,0.656-17.375,8.766-16.688,18.141c0.516,6.984,5.406,12.671,11.938,14.875 l21.141,68.984c-2.656,3.188-4.141,7.281-3.813,11.672c0.688,9.359,9.266,16.438,19.156,15.797 c9.906-0.656,17.375-8.781,16.688-18.141C144.656,486.839,139.781,481.151,133.234,478.948z"></path> <path d="M40.953,438.651c-7.078,1.844-11.234,8.781-9.297,15.484l7.984,27.422c1.938,6.703,9.266,10.641,16.344,8.797 l38.016-9.5l-15.031-51.703L40.953,438.651z"></path> <path d="M192.125,401.527c-37.25,11.296-62.797,16.187-62.797,16.187L144,462.12c0,0,50.578-12.813,112-35.109 c61.422,22.297,112,35.109,112,35.109l14.672-44.406c0,0-25.547-4.891-62.797-16.187c54.813-24.141,107.875-54.375,134.625-88.75 c53.984-69.359,26.734-125.938,26.734-125.938s-4.125-9.469-9.656,8.75c-32.203,92.281-132,150.094-215.578,183.547 c-83.578-33.453-183.375-91.266-215.578-183.547c-5.531-18.219-9.656-8.75-9.656-8.75S3.516,243.417,57.5,312.777 C84.25,347.152,137.313,377.386,192.125,401.527z"></path> <path d="M420,415.511c6.531-2.203,11.422-7.89,11.938-14.875c0.688-9.375-6.781-17.484-16.688-18.141 c-9.906-0.641-18.469,6.422-19.156,15.797c-0.328,4.375,1.156,8.469,3.813,11.671l-21.141,68.984 c-6.547,2.203-11.422,7.891-11.938,14.875c-0.688,9.359,6.781,17.484,16.688,18.141c9.891,0.641,18.469-6.438,19.156-15.797 c0.328-4.391-1.156-8.484-3.813-11.672L420,415.511z"></path> <path d="M471.047,438.651l-38.016-9.5L418,480.854l38.016,9.5c7.078,1.844,14.406-2.094,16.344-8.797l7.984-27.422 C482.281,447.433,478.125,440.495,471.047,438.651z"></path> <path d="M187.141,274.871v28.578c0,5.156,4.188,9.344,9.359,9.344h22.813c5.172,0,9.359-4.188,9.359-9.344v-23.922 h7.797v23.922c0,5.156,4.188,9.344,9.344,9.344h22.828c5.172,0,9.359-4.188,9.359-9.344v-23.922h7.781v23.922 c0,5.156,4.188,9.344,9.359,9.344h22.828c5.156,0,9.344-4.188,9.344-9.344v-28.578c23.781-7.219,63.5-23.984,77-57.859 c9.828-24.641,5.984-57.063-8.719-119.578C380.875,34.917,338.125-0.004,257.234-0.004c-80.906,0-123.656,34.922-138.359,97.438 c-14.719,62.516-18.563,94.938-8.734,119.578C123.641,250.886,163.359,267.652,187.141,274.871z M313.672,112.808 c21.516-3.672,42.5,14.031,46.859,39.547s-9.547,49.188-31.063,52.875c-21.516,3.672-42.5-14.031-46.859-39.547 C278.25,140.152,292.156,116.496,313.672,112.808z M257.234,197.558l20.672,25.859h-20.672h-20.688L257.234,197.558z M153.922,152.355c4.375-25.516,25.344-43.219,46.859-39.547c21.531,3.688,35.438,27.344,31.063,52.875 c-4.359,25.516-25.344,43.219-46.859,39.547C163.469,201.542,149.563,177.871,153.922,152.355z"></path></svg>';
  /* Регулярно вызываемые функции */
  Lampa.Storage.set("needReboot", false);
  Lampa.Storage.set("needRebootSettingExit", false);

  function t(key) {
    if (Lampa.Lang && Lampa.Lang.translate) return Lampa.Lang.translate(key);

    return key;
  }

  function registerBoneHeadTranslations() {
    if (!Lampa.Lang || !Lampa.Lang.add) return;

    Lampa.Lang.add({
      bonehead_name: {
        ru: "BoneHead",
        en: "BoneHead",
        uk: "BoneHead",
        be: "BoneHead",
        zh: "BoneHead",
        pt: "BoneHead",
        bg: "BoneHead",
        he: "BoneHead",
        cs: "BoneHead",
        ro: "BoneHead",
        fr: "BoneHead",
      },
      bonehead_category_installed: {
        ru: "Установленные",
        en: "Installed",
        uk: "Встановлені",
        be: "Устаноўленыя",
        zh: "已安装",
        pt: "Instalados",
        bg: "Инсталирани",
        he: "מותקנים",
        cs: "Nainstalováno",
        ro: "Instalate",
        fr: "Installés",
      },
      bonehead_category_online: {
        ru: "Онлайн",
        en: "Online",
        uk: "Онлайн",
        be: "Онлайн",
        zh: "在线",
        pt: "Online",
        bg: "Онлайн",
        he: "אונליין",
        cs: "Online",
        ro: "Online",
        fr: "Online",
      },
      bonehead_category_tv: {
        ru: "ТВ",
        en: "TV",
        uk: "ТБ",
        be: "ТБ",
        zh: "电视",
        pt: "TV",
        bg: "ТВ",
        he: "טלוויזיה",
        cs: "TV",
        ro: "TV",
        fr: "TV",
      },
      bonehead_category_erotic: {
        ru: "18+",
        en: "18+",
        uk: "18+",
        be: "18+",
        zh: "18+",
        pt: "18+",
        bg: "18+",
        he: "18+",
        cs: "18+",
        ro: "18+",
        fr: "18+",
      },
      bonehead_not_installed: {
        ru: "Не установлен",
        en: "Not installed",
        uk: "Не встановлено",
        be: "Не ўстанавлены",
        zh: "未安装",
        pt: "Não instalado",
        bg: "Не е инсталиран",
        he: "לא מותקן",
        cs: "Není nainstalováno",
        ro: "Neinstalat",
        fr: "Non installé",
      },
      bonehead_price_free: {
        ru: "Бесплатный",
        en: "Free",
        uk: "Безкоштовний",
        be: "Бясплатны",
        zh: "免费",
        pt: "Grátis",
        bg: "Безплатен",
        he: "חינם",
        cs: "Zdarma",
        ro: "Gratuit",
        fr: "Gratuit",
      },
      bonehead_price_subscription: {
        ru: "Подписка",
        en: "Subscription",
        uk: "Підписка",
        be: "Падпіска",
        zh: "订阅",
        pt: "Assinatura",
        bg: "Абонамент",
        he: "מנוי",
        cs: "Předplatné",
        ro: "Abonament",
        fr: "Abonnement",
      },
      bonehead_news_empty: {
        ru: "Новостей BoneHead пока нет",
        en: "No BoneHead news yet",
        uk: "Новин BoneHead поки немає",
        be: "Навін BoneHead паку няма",
        zh: "暂无 BoneHead 新闻",
        pt: "Ainda não há notícias do BoneHead",
        bg: "Все още няма новини от BoneHead",
        he: "אין עדיין חדשות מ-BoneHead",
        cs: "Zatím žádné novinky ze BoneHead",
        ro: "Nu există încă știri BoneHead",
        fr: "Pas encore de nouvelles BoneHead",
      },
      bonehead_subtitle: {
        ru: "Сторонний магазин расширений Lampa.",
        en: "Third-party Lampa extensions store.",
        uk: "Сторонній магазин розширень Lampa.",
        be: "Сторонні магазін пашырэнняў Lampa.",
        zh: "Lampa 第三方扩展商店。",
        pt: "Loja de extensões Lampa de terceiros.",
        bg: "Сторонен магазин за разширения на Lampa.",
        he: "חנות תוספים צד שלישי ל-Lampa.",
        cs: "Obchod s rozšířeními Lampa třetí strany.",
        ro: "Magazin de extensii Lampa terț.",
        fr: "Boutique d'extensions Lampa tierce.",
      },
      bonehead_subtitle_suggest: {
        ru: "Предложить добавить новый плагин можно тут",
        en: "Suggest a new plugin here",
        uk: "Запропонувати новий плагін можна тут",
        be: "Прапанаваць новы плагін можна тут",
        zh: "在此建议添加新插件",
        pt: "Sugira um novo plugin aqui",
        bg: "Предложете нов плагин тук",
        he: "הצעת תוסף חדש כאן",
        cs: "Navrhněte nový plugin zde",
        ro: "Sugerați un plugin nou aici",
        fr: "Proposer un nouveau plugin ici",
      },
      bonehead_stats_total: {
        ru: "Всего",
        en: "Total",
        uk: "Всього",
        be: "Усяго",
        zh: "总计",
        pt: "Total",
        bg: "Общо",
        he: 'סה"כ',
        cs: "Celkem",
        ro: "Total",
        fr: "Total",
      },
      bonehead_plugin_not_installed: {
        ru: "Плагин не установлен",
        en: "Plugin is not installed",
        uk: "Плагін не встановлено",
        be: "Плагін не ўстаноўлены",
        zh: "插件未安装",
        pt: "Plugin não instalado",
        bg: "Плагинът не е инсталиран",
        he: "התוסף לא מותקן",
        cs: "Plugin není nainstalován",
        ro: "Pluginul nu este instalat",
        fr: "Plugin non installé",
      },
    });
  }

  function prepareCustomSvg(value) {
    if (!value) return "";

    var svg = String(value).trim();

    if (!svg || svg.indexOf("lampa:") === 0) return "";

    if (svg.indexOf("<") === -1) {
      if (Config.icons && Config.icons.baseUrl) {
        svg =
          Config.icons.baseUrl.replace(/\/$/, "") +
          "/" +
          svg.replace(/^\//, "");
      } else {
        return "";
      }
    }

    if (/^https?:\/\//i.test(svg) || svg.indexOf("//") === 0) {
      return (
        '<img class="bonehead__category-icon bonehead__category-icon--img" src="' +
        escapeHtml(svg) +
        '" alt="">'
      );
    }

    if (svg.indexOf("<svg") === -1) return "";

    if (svg.indexOf("bonehead__category-icon") === -1) {
      svg = svg.replace(/<svg\b([^>]*)>/, function (match, attrs) {
        if (/class\s*=/.test(attrs)) {
          return (
            "<svg" +
            attrs.replace(
              /class\s*=\s*(['"])(.*?)\1/,
              'class="$2 bonehead__category-icon"',
            ) +
            ">"
          );
        }

        return '<svg class="bonehead__category-icon"' + attrs + ">";
      });
    }

    if (!/fill\s*=/.test(svg.split(">")[0])) {
      svg = svg.replace(/<svg\b/, '<svg fill="currentColor"');
    }

    return svg;
  }

  function categoryIconMarkup(category) {
    var icon = Config.categoryIcons[category] || "lampa:folder";

    if (icon.indexOf("lampa:") === 0) {
      return (
        '<svg class="bonehead__category-icon">' +
        '<use xlink:href="#sprite-' +
        icon.slice(6) +
        '"></use></svg>'
      );
    }

    var customSvg = prepareCustomSvg(icon);

    if (customSvg) return customSvg;

    return (
      '<svg class="bonehead__category-icon">' +
      '<use xlink:href="#sprite-folder"></use></svg>'
    );
  }

  function getCategoryLabel(id) {
    var key = Config.categoryLabelKeys[id];

    return key ? t(key) : id.charAt(0).toUpperCase() + id.slice(1);
  }

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

    if (price === "subscription") return t("bonehead_price_subscription");

    return t("bonehead_price_free");
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

    var ordered = Config.categoryOrder
      .filter(function (id) {
        return seen[id];
      })
      .map(function (id) {
        delete seen[id];

        return { id: id, title: getCategoryLabel(id) };
      });

    Object.keys(seen).forEach(function (id) {
      ordered.push({
        id: id,
        title: getCategoryLabel(id),
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

        boneHeadStart(data.extensions || [], news);
      })
      .catch(function (error) {
        console.error("BoneHead: ошибка загрузки из Directus", error);
        boneHeadStart([], []);
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
          name: t("settings_param_no"),
          onSelect: function () {
            Lampa.Modal.close();
            if (cancel) cancel();
          },
        },
        {
          name: t("settings_param_yes"),
          onSelect: function () {
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
  var showBoneHeadCenter = null;

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

  function registerBoneHeadNotices(news, attempt) {
    if (!Lampa.Notice || !Lampa.Notice.addClass) {
      if ((attempt || 0) < 20) {
        setTimeout(function () {
          registerBoneHeadNotices(news, (attempt || 0) + 1);
        }, 250);
      }

      return;
    }

    var fallbackTime = Date.now();

    Lampa.Notice.addClass("bonehead", {
      name: t("bonehead_name"),
      active: function () {
        return true;
      },
      count: function () {
        var viewed = Lampa.Storage.get("bonehead_notice_viewed", 0);

        return this.items().filter(function (item) {
          return item.time > viewed;
        }).length;
      },
      viewed: function () {
        Lampa.Storage.set("bonehead_notice_viewed", Date.now());
        if (Lampa.Notice.drawCount) Lampa.Notice.drawCount();
      },
      empty: function () {
        return t("bonehead_news_empty");
      },
      items: function () {
        return (news || []).map(function (item, index) {
          return {
            id: item.id || "bonehead_news_" + index,
            from: "bonehead",
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
      Lampa.Noty.show(t("extensions_ready"));
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
      Lampa.Noty.show(t("plugins_add_success"));
    }
  }

  function removePluginByUrl(url) {
    var installed = findInstalled(url);

    if (!installed) {
      Lampa.Noty.show(t("bonehead_plugin_not_installed"));
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

    Lampa.Noty.show(t("settings_removed"));
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
    Lampa.Noty.show(
      status
        ? t("settings_parental_control_enabled")
        : t("settings_parental_control_disabled"),
    );
    return true;
  }

  function openBoneHeadCenter() {
    $("body").toggleClass("settings--open", false);
    Lampa.Settings.render().removeClass("animate").removeClass("animate-down");

    if (showBoneHeadCenter) showBoneHeadCenter();
  }

  function storeStatusText(plugin) {
    var status = availability[plugin.url];

    if (!status || status.loading) return t("loading");
    if (status.code) return status.code;

    return "404";
  }

  function storeStatusDescription(plugin) {
    var status = availability[plugin.url];

    if (!status || status.loading) return t("loading");
    if (status.text) return status.text;

    return Number(status.code) >= 200 && Number(status.code) < 400
      ? t("extensions_worked")
      : t("title_error");
  }

  function storeStatusClass(plugin) {
    var status = availability[plugin.url];

    if (!status || status.loading) return "yellow";
    if (Number(status.code) >= 200 && Number(status.code) < 400)
      return "success";

    return "error";
  }

  function cleanupStaleAvailabilityLoading() {
    var now = Date.now();

    Object.keys(availability).forEach(function (url) {
      var item = availability[url];

      if (
        item &&
        item.loading &&
        item.requestId &&
        now - item.requestId > 6500
      ) {
        delete availability[url];
      }
    });
  }

  function checkAvailability(plugin, item, force) {
    if (!plugin.url) return;

    cleanupStaleAvailabilityLoading();

    var cached = availability[plugin.url];

    if (cached && !force) {
      updateAvailabilityView(plugin, item);
      if (!cached.loading) return;
      if (cached.requestId && Date.now() - cached.requestId < 6500) return;
      force = true;
    }

    if (force) delete availability[plugin.url];

    var requestId = Date.now();
    availability[plugin.url] = { loading: true, requestId: requestId };
    updateAvailabilityView(plugin, item);

    $.ajax({
      url: plugin.url,
      dataType: "text",
      timeout: 6000,
      cache: false,
      complete: function (xhr) {
        var current = availability[plugin.url];

        if (!current || current.requestId !== requestId) return;

        var code = xhr && xhr.status ? Number(xhr.status) : 404;
        var response = xhr && xhr.responseText ? xhr.responseText : "";
        var valid = code >= 200 && code < 400 && /Lampa\./.test(response);

        availability[plugin.url] = {
          loading: false,
          requestId: requestId,
          code: valid
            ? "200"
            : code >= 200 && code < 400
              ? "500"
              : String(code || 404),
          text: valid
            ? t("extensions_worked")
            : code >= 200 && code < 400
              ? t("extensions_no_plugin")
              : t("title_error"),
        };
        updateAvailabilityView(plugin);
      },
    });
  }

  function updateAvailabilityView(plugin, item) {
    var items =
      item ||
      $(".bonehead__item").filter(function () {
        return $(this).data("url") == plugin.url;
      });

    items.each(function () {
      var item = $(this);
      var check = item.find(".extensions__item-check");
      var code = item.find(".bonehead__availability");
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

  function getPluginInstallState(url) {
    var state = getPluginState(url);

    if (!state.installed) {
      return { text: t("bonehead_not_installed"), className: "yellow" };
    }

    return {
      text: state.enabled
        ? t("settings_parental_control_enabled")
        : t("settings_parental_control_disabled"),
      className: state.enabled ? "success" : "error",
    };
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

  function injectBoneHeadStyles() {
    if ($("#bonehead-style").length) return;

    $("body").append(
      '<style id="bonehead-style">' +
        ".bonehead-page .extensions__body{padding:2.5em 0;}" +
        ".bonehead__head{display:flex;align-items:center;justify-content:space-between;gap:1em;margin-bottom:2.4em;padding:0 1.5em;}" +
        ".bonehead{padding: 0 1.5em;}" +
        ".bonehead__stats{display:flex;gap:.55em;flex-wrap:wrap;justify-content:flex-end;opacity:.65;}" +
        ".bonehead__stat{padding:.45em .7em;border-radius:.5em;}" +
        ".bonehead__layout{display:grid;grid-template-columns:20em minmax(0,1fr);align-items:start;}" +
        ".bonehead__section-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.2em;padding: 0 0.6em;}" +
        ".bonehead__install-state{margin-left: auto;margin-right: 0 !important;}" +
        ".bonehead__category-list.menu__list{padding-left:0;}" +
        ".bonehead__category .menu__ico{display:flex;align-items:center;justify-content:center;}" +
        ".bonehead__category-icon{width:1.5em;height:1.5em;fill:currentColor;}" +
        ".bonehead__category-icon--img{object-fit:contain;display:block;}" +
        ".bonehead__section-title{font-size:1.25em;font-weight:700;}" +
        ".bonehead .extensions__item{width:auto;margin: 0;}" +
        ".bonehead__empty{padding:2em;opacity:.7;text-align:center;}" +
        "@media(max-width:" +
        Config.mobileBreakpoint +
        'px){.bonehead-page .extensions__body{padding:1em 1em 0}.bonehead{padding:0}.bonehead__head{padding:0;margin-bottom:1em}.bonehead__layout{display:block}.bonehead__column{margin-bottom:1.2em}.bonehead__column>.scroll{height:auto!important;overflow-x:auto;overflow-y:hidden;-webkit-overflow-scrolling:touch}.bonehead__column>.scroll>.scroll__content{padding:.6em 0 1em}.bonehead__column[data-section="0"]>.scroll .scroll__body{display:flex!important;gap:1em;width:max-content;transform:none!important}.bonehead__column[data-section="1"]>.scroll .scroll__body{display:block!important;width:max-content;transform:none!important}.bonehead__category-list.menu__list{display:flex;gap:.5em;margin:0;padding:0}.bonehead__category.menu__item{flex-shrink:0}.bonehead__section-list{display:grid;grid-template-rows:repeat(3,auto);grid-auto-flow:column;grid-auto-columns:min(20em,85vw);gap:1em;padding:0;width:max-content}.bonehead .extensions__item{width:auto}.bonehead__title{font-size:1.65em}}' +
        "</style>",
    );
  }

  function registerBoneHeadComponent(rawPlugins) {
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

    injectBoneHeadStyles();

    function BoneHeadPage() {
      var html = $('<div class="extensions bonehead-page"></div>');
      var head = $('<div class="bonehead__head"></div>');
      var body = $('<div class="bonehead"></div>');
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

      function findCatalogPlugin(url) {
        return catalog.find(function (item) {
          return item.url == url;
        });
      }

      function syncAvailabilityViews() {
        cleanupStaleAvailabilityLoading();

        $(".bonehead__item", body).each(function () {
          var plugin = findCatalogPlugin($(this).data("url"));

          if (plugin) updateAvailabilityView(plugin, $(this));
        });
      }

      function categoryTitle(category) {
        var key = Config.categoryLabelKeys[category];

        if (key) return t(key);

        return categoryNames[category] || category;
      }

      function triggerPluginAvailabilityChecks() {
        if (Lampa.Layer && Lampa.Layer.visible) {
          Lampa.Layer.visible(pluginScroll.render(true));
        }
      }

      function renderItem(plugin) {
        var installState = getPluginInstallState(plugin.url);
        var protocol = plugin.url.indexOf("https://") === 0 ? "https" : "http";

        var item = $(
          '<div class="extensions__item selector bonehead__item layer--visible" data-url="' +
            escapeHtml(plugin.url) +
            '">' +
            '<div class="extensions__item-author">' +
            escapeHtml(plugin.author) +
            '<span class="extensions__item-premium bonehead__price">' +
            escapeHtml(plugin.price) +
            "</span></div>" +
            '<div class="extensions__item-name">' +
            escapeHtml(plugin.name) +
            "</div>" +
            '<div class="extensions__item-descr">' +
            escapeHtml(plugin.description) +
            "</div>" +
            '<div class="extensions__item-footer">' +
            '<div class="extensions__item-check hide"></div>' +
            '<div class="extensions__item-proto protocol-' +
            protocol +
            '">' +
            protoIcon() +
            "</div>" +
            '<div class="extensions__item-code bonehead__availability hide yellow">' +
            escapeHtml(t("loading")) +
            "</div>" +
            '<div class="extensions__item-status hide">' +
            escapeHtml(t("loading")) +
            "</div>" +
            '<div class="extensions__item-code bonehead__install-state ' +
            installState.className +
            '">' +
            escapeHtml(installState.text) +
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

      function isBoneHeadOverlayOpen() {
        if ($("body").hasClass("selectbox--open")) return true;
        if (Lampa.Modal && Lampa.Modal.opened && Lampa.Modal.opened())
          return true;

        return $(".modal").length > 0;
      }

      function updateHeadStats() {
        var installedTotal = catalog.filter(function (plugin) {
          return isInstalled(plugin.url);
        }).length;

        head
          .find(".bonehead__stat")
          .eq(0)
          .text(t("bonehead_stats_total") + ": " + catalog.length);
        head
          .find(".bonehead__stat")
          .eq(1)
          .text(t("plugins_installed") + ": " + installedTotal);
      }

      function updatePluginItemState(plugin, options) {
        options = options || {};
        var item = $(
          '.bonehead__item[data-url="' + escapeHtml(plugin.url) + '"]',
          body,
        );

        if (!item.length) return;

        if (options.removed) {
          item.css("opacity", 0.5);
          return;
        }

        var installState = getPluginInstallState(plugin.url);

        item
          .find(".bonehead__install-state")
          .removeClass("success error yellow")
          .addClass(installState.className)
          .text(installState.text);
      }

      function restoreBoneHeadFocus(after) {
        setTimeout(function () {
          fitScrolls();

          scrolls.forEach(function (scroll) {
            if (scroll.restorePosition) scroll.restorePosition();
          });

          setCollection(
            activeSection,
            lastFocus[activeSection] || nearestFromSection(activeSection),
          );
          cleanupStaleAvailabilityLoading();
          syncAvailabilityViews();

          if (after) after();
        }, 50);
      }

      function showPluginActions(plugin) {
        var state = getPluginState(plugin.url);
        var items = [];
        var controller =
          Lampa.Controller.enabled && Lampa.Controller.enabled()
            ? Lampa.Controller.enabled().name
            : "bonehead_center";
        var back = function (after) {
          Lampa.Controller.toggle(controller);
          restoreBoneHeadFocus(after);
        };

        if (!state.installed) {
          items.push({ title: t("extensions_install"), action: "install" });
        } else {
          items.push({
            title: state.enabled
              ? t("extensions_disable")
              : t("extensions_enable"),
            action: "toggle",
          });
          items.push({ title: t("extensions_remove"), action: "remove" });
        }

        items.push({ title: t("extensions_check"), action: "check" });

        Lampa.Select.show({
          title: t("title_action"),
          items: items,
          onSelect: function (item) {
            if (item.action == "install") {
              installPlugin(plugin);
              updatePluginItemState(plugin);
              updateHeadStats();

              if (filter === "installed") {
                render({ preserveController: true, skipAvailability: true });
              }

              back();
              return;
            }

            if (item.action == "toggle") {
              var nextStatus = state.enabled ? 0 : 1;

              if (!setPluginStatus(plugin.url, nextStatus)) {
                back();
                return;
              }

              updatePluginItemState(plugin);
              updateHeadStats();

              if (nextStatus === 1) {
                back(function () {
                  var installed = findInstalled(plugin.url);

                  if (installed && Lampa.Plugins && Lampa.Plugins.push) {
                    Lampa.Plugins.push(installed);
                  }
                });
                return;
              }

              showReload(t("plugins_need_reload"), function () {
                back();
              });
              return;
            }

            if (item.action == "remove") {
              if (removePluginByUrl(plugin.url)) {
                updatePluginItemState(plugin, { removed: true });
                updateHeadStats();
                showReload(t("plugins_need_reload"), function () {
                  back(function () {
                    if (filter === "installed") {
                      render({
                        preserveController: true,
                        skipAvailability: true,
                      });
                    }
                  });
                });
              } else {
                back();
              }
              return;
            }

            if (item.action == "check") {
              checkAvailability(plugin, null, true);
              back();
            }
          },
          onBack: back,
        });
      }

      function bindController() {
        $(".selector", body).on("hover:focus", function () {
          var index = Number(
            $(this).closest(".bonehead__column").data("section"),
          );

          if (!isNaN(index)) {
            activeSection = index;
            lastFocus[index] = this;
            scrolls[index].update(this, true);
          }
        });

        $(".bonehead__category", body).on("hover:enter click", function () {
          filter = $(this).data("filter");
          lastFocus[1] = null;
          render({ resetPlugins: true });
        });

        $(".bonehead__item", body).on("hover:enter click", function () {
          var plugin = findCatalogPlugin($(this).data("url"));
          if (plugin) showPluginActions(plugin);
        });

        $(".bonehead__item", body).on("hover:focus", function () {
          var plugin = findCatalogPlugin($(this).data("url"));

          if (plugin && availability[plugin.url]) {
            updateAvailabilityView(plugin, $(this));
          }
        });
      }

      function renderCategories() {
        var list = $('<ul class="bonehead__category-list menu__list"></ul>');

        categoryOrder.forEach(function (category) {
          list.append(
            '<li class="bonehead__category menu__item selector' +
              (filter == category ? " active" : "") +
              '" data-filter="' +
              category +
              '">' +
              '<div class="menu__ico">' +
              categoryIconMarkup(category) +
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
        var body = $('<div class="bonehead__section-list"></div>');

        if (list.length) {
          list.forEach(function (plugin) {
            body.append(renderItem(plugin));
          });
          return body;
        } else {
          return $(
            '<div class="bonehead__empty">' +
              escapeHtml(t("empty_text_two")) +
              "</div>",
          );
        }
      }

      function makeColumn(index, title, scroll) {
        return $(
          '<div class="bonehead__column" data-section="' + index + '"></div>',
        )
          .append('<div class="bonehead__section-title">' + title + "</div>")
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
        if (isBoneHeadOverlayOpen()) return;

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
            '<div class="bonehead__subtitle"><p>' +
              escapeHtml(t("bonehead_subtitle")) +
              "</p><br><p>" +
              escapeHtml(t("bonehead_subtitle_suggest")) +
              "</p></div>" +
              '<div class="bonehead__stats">' +
              '<div class="bonehead__stat">' +
              escapeHtml(t("bonehead_stats_total")) +
              ": " +
              catalog.length +
              "</div>" +
              '<div class="bonehead__stat">' +
              escapeHtml(t("plugins_installed")) +
              ": " +
              installedTotal +
              "</div>",
          );

        categoryScroll.clear();
        categoryScroll.append(renderCategories());
        pluginScroll.clear();
        pluginScroll.append(renderPlugins(list));
        var layout = $('<div class="bonehead__layout"></div>');

        layout.append(makeColumn(0, t("title_category"), categoryScroll));
        layout.append(makeColumn(1, t("settings_main_plugins"), pluginScroll));
        body.empty().append(layout);
        bindController();

        setTimeout(function () {
          fitScrolls();

          if (options.preserveController) {
            syncAvailabilityViews();
            setCollection(
              activeSection,
              lastFocus[activeSection] || nearestFromSection(activeSection),
            );
            if (!options.skipAvailability) triggerPluginAvailabilityChecks();
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
            ".bonehead__category.active",
            categoryScroll.render(),
          ).first()[0];
          setCollection(
            activeSection,
            activeSection === 0 ? active : nearestFromSection(activeSection),
          );
          syncAvailabilityViews();
          if (!options.skipAvailability) triggerPluginAvailabilityChecks();
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

        if (!enabled || enabled.name != "bonehead_center") return;

        if (Lampa.Controller.clear) Lampa.Controller.clear();
        else Lampa.Controller.toggle("content");
      }

      this.create = function () {
        render();
      };

      this.start = function () {
        var page = this;

        fitScrolls();

        Lampa.Controller.add("bonehead_center", {
          toggle: function () {
            var focused = $(".selector.focus", body)[0];
            var section = focused
              ? Number($(focused).closest(".bonehead__column").data("section"))
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

        Lampa.Controller.toggle("bonehead_center");
      };

      this.destroy = function () {
        releaseController();
        categoryScroll.destroy();
        pluginScroll.destroy();
        html.remove();
      };
      this.render = function () {
        if (!html.children().length) {
          content.append(headBackward("💀 " + t("bonehead_name") + " 💀"));
          content.append(head);
          content.append(body);
          html.append(content);
        }

        return html;
      };
    }

    showBoneHeadCenter = function () {
      if (instance) return;

      var controller =
        Lampa.Controller.enabled && Lampa.Controller.enabled().name;

      instance = new BoneHeadPage();
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

  /* Создание BoneHead и его меню */
  function boneHeadStart(plugins, news) {
    registerBoneHeadTranslations();
    registerBoneHeadNotices(news);
    registerBoneHeadComponent(plugins);

    /* BoneHead */
    Lampa.SettingsApi.addComponent({
      component: "bonehead",
      name: t("bonehead_name"),
      icon: icon_bonehead,
    });

    Lampa.Settings.listener.follow("open", function (e) {
      if (e.name == "main") {
        /* Сдвигаем раздел выше */
        setTimeout(function () {
          $("div[data-component=plugins]").before(
            $("div[data-component=bonehead]"),
          );
          $("div[data-component=bonehead]")
            .unbind("hover:enter")
            .on("hover:enter", openBoneHeadCenter);
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
