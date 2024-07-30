/*!
 * Noti.js v1.0
 * (c) 2024-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Уведомления.
 * <script src='https://abros.dev/dev/noti.js'></script>
 */

// Компонент ассистента
document.body.insertAdjacentHTML("beforeend", `<div class="abrosnoti"></div>`);

// Стили ассистента
var styleNoti = document.createElement("style");
styleNoti.textContent = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat+Alternates:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap');

.abrosnoti {
  --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 1vw;
  width: 280px;
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin: 10px;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 99999999999;
}
@media (max-width: 767px) {
  .abrosnoti {
    margin: 0.5rem 0;
    right: 50%;
    transform: translateX(50%);
  }
}
.abrosnoti .noti {
  position: relative;
  height: 0;
  transition: height 300ms ease;
  flex-shrink: 0;
  opacity: 1;
  cursor: pointer;
}
.abrosnoti .noti.out {animation: notiOut 500ms ease forwards}
@keyframes notiOut {
  to {height: 0;}
}
.abrosnoti .noticard {
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  isolation: isolate;
  width: 280px;
  border: 1px solid;
  border-radius: 10px;
  overflow: hidden;
  animation: notiCardIn 500ms ease;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}
@keyframes notiCardIn {
  from {
    opacity: 0;
  }
}
.abrosnoti .noti.out .noticard {animation: notiCardOut 500ms ease forwards}
@keyframes notiCardOut {
  to {
    opacity: 0;
    transform: scale(0.5)
  }
}
@supports(color: color-mix(in oklch, red 0%, white)) {
  .abrosnoti .noticard[data-theme="dark"] {
    border-color: color-mix(in oklch, var(--color) 5%, oklch(100% 0 0 / 15%));
    background: color-mix(in oklch, var(--color) 50%, oklch(0% 0 0 / 50%));
    color: color-mix(in oklch, var(--color) 50%, oklch(100% 0 0));
  }
  .abrosnoti .noticard[data-theme="light"] {
    border-color: color-mix(in oklch, var(--color) 50%, oklch(100% 0 0 / 15%));
    background: color-mix(in oklch, var(--color) 25%, oklch(100% 0 0 / 50%));
    color: color-mix(in oklch, var(--color) 100%, oklch(100% 0 0));
  }
  .abrosnoti .noticard::selection {
    background: color-mix(in oklch, var(--color) 90%, oklch(100% 0 0));
    color: color-mix(in oklch, var(--color) 10%, oklch(100% 0 0));
  }
}
@supports (color: rgb(from white r g b)) {
  .abrosnoti .noticard[data-theme="dark"] {
    border-color: oklch(from var(--color) l c h / 0.25);
    background: oklch(from var(--color) calc(l * 0.75) c h / 0.5);
    color: oklch(from var(--color) calc(l * 1.5) c h);
  }
  
  .abrosnoti .noticard[data-theme="light"] {
    border-color: oklch(from var(--color) l c h / 25%);
    background: oklch(from var(--color) calc(l * 1) c h / 20%);
    color: oklch(from var(--color) calc(l * 1) c h);
  }

  .abrosnoti .noticard::selection {
    background: oklch(from var(--color) calc(l * 1.1) c h);
    color: oklch(from var(--color) 1 c h);
  }
}
.abrosnoti .notiicon {
  position: absolute;
  width: 24px;
  inset: 10px auto 10px 8px;
  transition: transform 300ms ease;
  z-index: 5;
}
.abrosnoti .noti:hover .notiicon {
  transform: translateX(0.15rem)
}
.abrosnoti .notitext {
  padding: 13px 5px 10px 35px;
  transition: transform 300ms ease;
  z-index: 5;
}
.abrosnoti .noti:hover .notitext {
  transform: translateX(0.25rem)
}
.abrosnoti .notiglow, .abrosnoti .notiborderglow {
  position: absolute;
  width: 320px;
  height: 320px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle closest-side at center, var(--color), transparent);
  opacity: 0;
  transition: opacity 300ms ease;
}
.abrosnoti .notiglow { z-index: 3; }
.abrosnoti .notiborderglow { z-index: 1; }
.abrosnoti .noti:hover .notiglow {opacity: 0.1}
.abrosnoti .noti:hover .notiborderglow {opacity: 0.1}
[data-abrosnoti=ai] {
  --color: oklch(58.11% 0.31 307.02);
}
[data-abrosnoti=error] {
  --color: oklch(62.8% 0.25 29.23);
}
[data-abrosnoti=lang] {
  --color: #2eadff;
}
[data-abrosnoti=note] {
  --color: oklch(41.84% 0 0);
}
[data-abrosnoti=success] {
  --color: oklch(47.06% 0.17 148.76);
}
[data-abrosnoti=tip] {
  --color: oklch(53.24% 0.23 256.22);
}
[data-abrosnoti=warning] {
  --color: oklch(61.47% 0.16 64.21);
}
`;
document.head.appendChild(styleNoti);

if (location.pathname.match(/fullcpgrid/i)) {
  document.querySelector(".abrosnoti").style.fontSize = "32px";
  document.querySelector(".abrosnoti").style.transform =
    "translate(0.5rem, calc(-50% + 3rem))";
}
const domain = "https://cdn.abros.dev/noti";

class noti {
  constructor(el) {
    this.el = el;
  }
  createDiv(className = "") {
    const el = document.createElement("div");
    el.classList.add(className);
    return el;
  }
  addType(el, type) {
    el.setAttribute("data-abrosnoti", type);
  }
  addTheme(el, theme) {
    el.setAttribute("data-theme", theme);
  }
  async addIcon(el, type) {
    const response = await fetch(`${domain}/icons/${type}.svg`);
    const svgText = await response.text();
    const svgElement = this.createSvgElement(svgText);
    el.appendChild(svgElement);
  }
  createSvgElement(svgString) {
    const template = document.createElement("template");
    template.innerHTML = svgString.trim();
    return template.content.firstChild;
  }
  addText(el, text) {
    el.appendChild(document.createTextNode(text));
  }
  create(
    theme = "light",
    type = "",
    text = "",
    duration = 2,
    destroyOnClick = false,
    clickFunction = undefined
  ) {
    function destroy(animate) {
      if (animate) {
        notiEl.classList.add("out");
        notiEl.addEventListener("animationend", () => {
          notiEl.remove();
        });
      } else {
        notiEl.remove();
      }
    }
    const notiEl = this.createDiv("noti");
    this.addType(notiEl, type);

    const notiCardEl = this.createDiv("noticard");
    this.addTheme(notiCardEl, theme);

    const glowEl = this.createDiv("notiglow");
    const borderEl = this.createDiv("notiborderglow");

    const iconEl = this.createDiv("notiicon");
    this.addIcon(iconEl, type);

    const textEl = this.createDiv("notitext");
    this.addText(textEl, text);

    notiEl.appendChild(notiCardEl);
    notiCardEl.appendChild(glowEl);
    notiCardEl.appendChild(borderEl);
    notiCardEl.appendChild(iconEl);
    notiCardEl.appendChild(textEl);

    this.el.appendChild(notiEl);

    requestAnimationFrame(() => {
      notiEl.style.height =
        "calc(0.25rem + " + notiCardEl.getBoundingClientRect().height + "px)";
    });

    notiEl.addEventListener("mousemove", (event) => {
      const rect = notiCardEl.getBoundingClientRect();
      const localX = (event.clientX - rect.left) / rect.width;
      const localY = (event.clientY - rect.top) / rect.height;

      glowEl.style.left = localX * 100 + "%";
      glowEl.style.top = localY * 100 + "%";

      borderEl.style.left = localX * 100 + "%";
      borderEl.style.top = localY * 100 + "%";
    });

    if (clickFunction != undefined) {
      notiEl.addEventListener("click", clickFunction);
    }

    if (destroyOnClick) {
      notiEl.addEventListener("click", () => destroy(true));
    }

    if (duration != 0) {
      setTimeout(() => {
        notiEl.classList.add("out");
        notiEl.addEventListener("animationend", () => {
          notiEl.remove();
        });
      }, duration * 1000);
    }
    return notiEl;
  }
}
const abrosnoti = new noti(document.querySelector(".abrosnoti"));

/*
Как использовать:

Создайте объект уведомления, используя new noti и передайте ему элемент оболочки уведомления, например:
const notis = new noti(document.querySelector(".abrosnoti"))

Создавайте уведомления с помощью notis.create()

Параметры notis.create():
  Тема: string (тема уведомления, по умолчанию: "light", возможные значения: "light", "dark")
  Тип: string (тип уведомления, возможные значения: "ai", "error", "lang", "note", "success", "tip", "warning")
  Текст: string (текст уведомления)
  Продолжительность: number (секунды, по умолчанию: 2 секунды, 0 означает бесконечное время)
  Уничтожить при клике: boolean (определяет, должно ли уведомление исчезнуть при нажатии, по умолчанию: false, возможные значения: "true", "false")
  Функция клика: function (вызывается при нажатии на уведомление, если не определено, по умолчанию: undefined)
*/

/*
Пример использования:
abrosnoti.create(
  "dark", // Тема
  "success", // Тип уведомления
  "Success Notification", // Текст уведомления
  0, // Продолжительность
  true, // Уничтожить при клике
  () => {
    console.log("Notification clicked!");
  }
);
*/
