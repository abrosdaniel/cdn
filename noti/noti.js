/*!
 * Noti.js v1.0
 * (c) 2024-2024
 * by Daniel Abros
 * Site → https://abros.dev
 * Telegram → https://t.me/abrosxd
 * Уведомления.
 * <script src = 'https://abros.dev/dev/noti.js'></script>
 */

// Компонент ассистента
document.body.insertAdjacentHTML("beforeend", `<div class="abrosnoti"></div>`);

// Стили ассистента
var styleNoti = document.createElement("style");
styleNoti.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

  .abrosnoti {
    --gradient: linear-gradient(to bottom, #2eadff, #3d83ff, #7e61ff);
    --color: #fff;
    font-family: "Inter";
    font-size: 16px;
    width: 18rem;
    display: flex;
    flex-direction: column;
    justify-content: end;
    margin: 0.5rem;
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
    width: 18rem;
    d-height: 8rem;
    background: rgba(53, 53, 53, .4);
    border-radius: 1rem;
    overflow: hidden;
    animation: notiCardIn 500ms ease;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
  }
  @keyframes notiCardIn {
    from {
      /* transform: translateX(50%); */
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
  .abrosnoti .noticard:before {
    position: absolute;
    content: "";
    inset: 0.0625rem;
    border-radius: 0.9375rem;
    background: rgba(53, 53, 53, .4);
    z-index: 2
  }
  .abrosnoti .notiicon {
    position: absolute;
    width: 1.5rem;
    inset: 0.65rem auto 0.65rem 0.5rem;
    transition: transform 300ms ease;
    z-index: 5;
  }
  .abrosnoti .noti:hover .notiicon {
    transform: translateX(0.15rem)
  }
  .abrosnoti .notititle {
    color: var(--color);
    padding: 0.65rem 0.5rem 0.4rem 2.5rem;
    font-weight: 500;
    font-size: 1.1rem;
    transition: transform 300ms ease;
    z-index: 5;
  }
  .abrosnoti .noti:hover .notititle {
    transform: translateX(0.15rem)
  }
  .abrosnoti .notidesc {
    color: #c1c1c1;
    padding: 0 0.5rem 0.85rem 0.5rem;
    transition: transform 300ms ease;
    z-index: 5;
  }
  .abrosnoti .noti:hover .notidesc {
    transform: translateX(0.25rem)
  }
  .abrosnoti .notiglow, .abrosassistant .notiborderglow {
    position: absolute;
    width: 20rem;
    height: 20rem;
    transform: translate(-50%, -50%);
    background: radial-gradient(circle closest-side at center, white, transparent);
    opacity: 0;
    transition: opacity 300ms ease;
  }
  .abrosnoti .notiglow { z-index: 3; }
  .abrosnoti .notiborderglow { z-index: 1; }
  .abrosnoti .noti:hover .notiglow {opacity: 0.1}
  .abrosnoti .noti:hover .notiborderglow {opacity: 0.1}
`;
document.head.appendChild(styleNoti);

if (location.pathname.match(/fullcpgrid/i) ? true : false) {
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
  createImg(className = "") {
    const el = document.createElement("img");
    el.classList.add(className);
    return el;
  }
  addIcon(el, icon) {
    const url = `${domain}/icons/${icon}.svg`;
    el.src = url;
  }
  addText(el, text) {
    el.appendChild(document.createTextNode(text));
  }
  create(
    icon = "abros",
    title = "Untitled notification",
    description = "",
    duration = 2,
    destroyOnClick = false,
    clickFunction = undefined
  ) {
    if (icon === "" || icon === " " || icon === undefined) {
      icon = "abros";
    }
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
    const notiCardEl = this.createDiv("noticard");
    const glowEl = this.createDiv("notiglow");
    const borderEl = this.createDiv("notiborderglow");

    const iconEl = this.createImg("notiicon");
    this.addIcon(iconEl, icon);

    const titleEl = this.createDiv("notititle");
    this.addText(titleEl, title);

    const descriptionEl = this.createDiv("notidesc");
    this.addText(descriptionEl, description);

    notiEl.appendChild(notiCardEl);
    notiCardEl.appendChild(glowEl);
    notiCardEl.appendChild(borderEl);
    notiCardEl.appendChild(iconEl);
    notiCardEl.appendChild(titleEl);
    notiCardEl.appendChild(descriptionEl);

    this.el.appendChild(notiEl);

    // console.log("height", notiCardEl.scrollHeight)
    requestAnimationFrame(function () {
      notiEl.style.height =
        "calc(0.25rem + " + notiCardEl.getBoundingClientRect().height + "px)";
    });

    notiEl.addEventListener("mousemove", (event) => {
      const rect = notiCardEl.getBoundingClientRect();
      const localX = (event.clientX - rect.left) / rect.width;
      const localY = (event.clientY - rect.top) / rect.height;

      // console.log(localX, localY)
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
abrosnoti = new noti(document.querySelector(".abrosnoti"));

// demo

// const demonotis = [
//   () => {abrosnoti.create("Neon notifications", "wow, these notifications really do look beautiful", 5)},
//   () => {abrosnoti.create("Hover effects", "and the hover effects make it even better!", 5)},
//   () => {abrosnoti.create("Ease of use", "on top of that, you can easily add this to any project", 10)},
//   () => {abrosnoti.create("Customisation", "you can even customise the duration and add actions on click", 10)},
//   () => {abrosnoti.create("Click me", "try clicking this for a surprise!", 5, true, () => notis.create("Surprise", "Wow, you clicked the previous notification,", 4))},
//   () => {abrosnoti.create("Animations", "all the animations stay smooth even when notifications disappear out of order or when multiple appear at once", 15)},
// ]
// let i = 1;
// demonotis[0]()
// setInterval(()=>{
//   if (i == demonotis.length) {
//     notis.create("Demo done", "click on this notification to restart the demo or go look at the code if you're interested", 0, true, () => {i = 0})
//   } else if (i < demonotis.length) {
//     demonotis[i]()
//   }
//   i++
// }, 4000)

/*
Как использовать:

Создайте объект уведомления, используя new Notifications и передайте ему элемент оболочки уведомления например:
const notis = new abrosnoti(document.querySelector(".abrosnoti"))

Создавайте уведомления с помощью notis.create()

Параметры notis.create():
  Заголовок: string,
  Описание: string,
  Продолжительность: секунды (по умолчанию: 2 секунды, 0 означает бесконечное время),
  Уничтожить при клике: boolean
    (определяет, должно ли уведомление исчезнуть при нажатии, по умолчанию: false)
  Функция клика: function
    (вызывается при нажатии на уведомление, если не определено, по умолчанию: undefined)
*/
