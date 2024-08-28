if (!window.abros) {
  window.abros = {};

  const userLang = navigator.language.split("-")[0] || "en";
  const apiKey =
    "patZs0xLRQaVH0yJo.6b37088cccb3ce09e6abf49e350c39d5011e0e8f7cb478fa33d47eaa6667e8be";
  const baseId = "appyM5LkcacbXYVGh";

  const fetchData = async (table) => {
    const url = `https://api.airtable.com/v0/${baseId}/${table}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных с таблицы ${table}`);
    }
    const data = await response.json();
    return data.records.map((record) => record.fields);
  };

  const init = async () => {
    try {
      const [settings, locales, blacklist, docs] = await Promise.all([
        fetchData("Settings"),
        fetchData("Locales"),
        fetchData("Blacklist"),
        fetchData("Documentation"),
      ]);

      const hostname = window.location.hostname;
      const site = blacklist.find((site) => site.Hostname.includes(hostname));

      const langData =
        locales.find((locale) => locale.Key === userLang) ||
        locales.find((locale) => locale.Key === "en");
      const text = langData?.Text || "Default text";
      const copyright = site?.Copyright || null;
      const script = site?.Script || null;
      const message = site?.Message || null;

      const settingsUrl = settings.find((s) => s.Param === "url")?.Key || "#";

      window.abros = {
        initConsole() {
          console.groupCollapsed(
            "%c👨🏻‍💻 Development by ABROS",
            "border: 1px solid #626262; border-radius: 5px; padding: 2px 4px;"
          );
          console.log(`✨ ${text}`);
          console.log(`💻 Site: ${settingsUrl}`);
          if (message) console.log(message);
          console.groupEnd();
        },

        getRandomColor() {
          return `#${Math.floor(Math.random() * 0xffffff)
            .toString(16)
            .padEnd(6, "0")}`;
        },

        appendScript(src) {
          if (src) {
            const script = document.createElement("script");
            script.src = src;
            document.head.appendChild(script);
          }
        },

        createFooter() {
          const footer = document.createElement("div");
          footer.style.cssText =
            "width:100vw;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;position: relative;z-index: 99999999999999999;";

          const link = document.createElement("a");
          link.href = settingsUrl;
          link.target = "_blank";
          link.rel = "noopener";
          link.style.cssText =
            "display:flex;flex-wrap:wrap;justify-content:center;width:350px;text-decoration:none;color:white;";

          const title = document.createElement("p");
          title.style.cssText =
            "font-weight: bold;padding: 0 12px;border-radius: 2px;margin:0;font-size:small;";
          title.textContent = "ABROS";

          const description = document.createElement("p");
          description.style.cssText =
            "padding: 0 5px;border-radius: 2px;margin:0;font-size:xx-small;text-align:center;";
          description.textContent = text;

          link.appendChild(title);
          link.appendChild(description);
          footer.appendChild(link);
          document.body.appendChild(footer);

          setInterval(() => {
            title.style.backgroundColor = `${this.getRandomColor()}80`;
          }, 5000);
        },

        createNotification() {
          this.appendScript("https://cdn.abros.dev/noti/noti.js");
          let notificationShown = false;

          setInterval(() => {
            if (!notificationShown) {
              abrosnoti.create("dark", "tip", text, 0, true, () => {
                window.open(settingsUrl, "_blank");
                notificationShown = false;
              });
              notificationShown = true;
            }
          }, 1000);
        },

        createBanner() {
          const banner = document.createElement("div");
          banner.style.cssText =
            "width:110px;height:auto;margin:0;display:flex;justify-content:center;align-items:center;font-family:'Montserrat Alternates',sans-serif;background-color: black;padding: 2px;position: fixed;bottom: 50%;left: -100px;z-index: 999999999999999;transform: translateY(50%);border: 1px solid white;border-radius: 0 10px 10px 0;opacity: 0;transition: left 0.5s, opacity 1s;";
          banner.onmouseenter = () => {
            banner.style.left = "-10px";
          };
          banner.onmouseleave = () => {
            banner.style.left = "-100px";
          };

          const stick = document.createElement("div");
          stick.style.cssText =
            "height: 90%;width: 4px;position: absolute;right: 6px;border-radius: 50px;";

          const stickColor = document.createElement("div");
          stickColor.style.cssText =
            "width: 10px;height: 40px;position: absolute;left: 50%;top: 0;";

          const link = document.createElement("a");
          link.href = settingsUrl;
          link.target = "_blank";
          link.rel = "noopener";
          link.style.cssText =
            "display:flex;flex-wrap:wrap;justify-content:center;width:80px;text-decoration:none;color:white;";

          const title = document.createElement("p");
          title.style.cssText =
            "font-weight: bold;padding: 0 12px;margin:0;font-size:small;";
          title.textContent = "ABROS";

          const description = document.createElement("p");
          description.style.cssText =
            "padding: 0 5px;margin:0;font-size:xx-small;text-align:center;";
          description.textContent = text;

          link.appendChild(title);
          link.appendChild(description);
          stick.appendChild(stickColor);
          banner.appendChild(link);
          banner.appendChild(stick);
          document.body.appendChild(banner);

          setInterval(() => {
            title.style.backgroundColor = `${this.getRandomColor()}80`;
            stickColor.style.backgroundColor = `${this.getRandomColor()}80`;
          }, 5000);

          setTimeout(() => {
            banner.style.opacity = "1";
          }, 1000);
        },

        docs() {
          console.table(docs);
          const sortedDocs = docs.sort((a, b) => a.Num - b.Num);
          let currentGroup = null;

          sortedDocs.forEach((doc) => {
            const { Key, Title, Text, TitleEN, TextEN, Status } = doc;
            if (Status !== "Visible") return;

            const displayTitle = userLang === "ru" ? Title : TitleEN;
            const displayText = userLang === "ru" ? Text : TextEN;

            if (Key.startsWith("group-")) {
              if (currentGroup) console.groupEnd();
              console.group(displayTitle);
              currentGroup = Key;
            } else {
              console.log(`${displayTitle}\n${displayText}`);
            }
          });
          if (currentGroup) console.groupEnd();
        },
      };

      abros.initConsole();
      abros.initCanvas();
      if (script) abros.appendScript(script);

      switch (copyright) {
        case "Footer":
          abros.createFooter();
          break;
        case "Notification":
          abros.createNotification();
          break;
        case "Banner":
          abros.createBanner();
          break;
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  init();
}
