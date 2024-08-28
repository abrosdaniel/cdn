/*!
 * Copyright.js v1.0.9
 * (c) 2023-2024
 * by Daniel Abros
 * Сайт → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Копирайт использования на сайтах
 * <script src="https://cdn.abros.dev/copyright.js"></script>
 * <script type="module" src ="https://cdn.abros.dev/copyright.js"></script>
 */

if (!window.abros) {
  window.abros = {};

  const userLang = (navigator.language || navigator.userLanguage).split("-")[0];
  window.abros.userLang = userLang;

  const a =
    "patZs0xLRQaVH0yJo.6b37088cccb3ce09e6abf49e350c39d5011e0e8f7cb478fa33d47eaa6667e8be";
  const b = "appyM5LkcacbXYVGh";

  const fetchData = async (o) => {
    const r = `https://api.airtable.com/v0/${b}/${o}`;
    const s = await fetch(r, {
      headers: {
        Authorization: `Bearer ${a}`,
      },
    });

    const data = await s.json();
    return data.records.map((record) => record.fields);
  };

  const init = async () => {
    try {
      const settingsData = "Settings";
      const localesData = "Locales";
      const blacklistData = "Blacklist";
      const [settings, locales, blacklist] = await Promise.all([
        fetchData(settingsData),
        fetchData(localesData),
        fetchData(blacklistData),
      ]);
      const hostname = window.location.hostname;
      const site = blacklist.find((site) => site.Hostname.includes(hostname));
      if (!site) return;
      const copyright = site.Copyright;
      const script = site.Script;
      const lang =
        locales.find((locale) => locale.Key === userLang) ||
        locales.find((locale) => locale.Key === "en");
      const text = lang.Text;

      window.abros = {
        initConsole() {
          console.groupCollapsed(
            `%c👨🏻‍💻 Development by ABROS`,
            "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
          );
          console.log(`✨ ${text}`);
          console.log(
            `💻 Site: ${settings.find((s) => s.Param === "url").Key}`
          );
          console.groupEnd();
        },

        initScript(src) {
          const script = document.createElement("script");
          script.src = src;
          document.head.appendChild(script);
        },

        initNotification() {
          this.initScript("https://cdn.abros.dev/noti/noti.js");
          let notification = false;
          setInterval(() => {
            if (!notification) {
              abrosnoti.create("dark", "tip", `${text}`, 0, true, () => {
                window.open(
                  settings.find((s) => s.Param === "url").Key,
                  "_blank"
                );
                notification = false;
              });
              notification = true;
            }
          }, 1000);
        },
      };

      abros.initConsole();
      if (script) abros.initScript(script);
      switch (copyright) {
        case "Footer":
          abros.initFooter();
          break;
        case "Notification":
          abros.initNotification();
          break;
        case "Banner":
          abros.initBanner();
          break;
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };
  init();
}
