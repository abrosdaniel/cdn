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
      window.abros.settings = settings || [];
      window.abros.locales = locales || [];
      window.abros.blacklist = blacklist || [];

      console.log("Данные загружены и сохранены в window.abros", window.abros);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };
  init();
}
