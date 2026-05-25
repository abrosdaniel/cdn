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
  var icon_online =
    '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="500.000000pt" height="500.000000pt" viewBox="-1.09 0 122.88 122.88" version="1.1" id="Layer_1" style="enable-background:new 0 0 120.71 122.88" xml:space="preserve"><g stroke-linecap="round" stroke-linejoin="round"/></g><style type="text/css">.st0{fill-rule:evenodd;clip-rule:evenodd;}</style><g> <path class="st0" d="M59.97,0c33.11,0,59.96,26.85,59.96,59.97c0,16.04-6.3,30.62-16.57,41.38c3.34,9.99,4.44,6.97,17.36,8.88v12.5 c-19.28,0.78-15.44-1.14-27.55-12.83c-9.51,6.34-20.92,10.03-33.2,10.03C26.85,119.93,0,93.08,0,59.97C0,26.85,26.86,0,59.97,0 L59.97,0z M27.63,44.25c8.91,0,16.14,7.22,16.14,16.14c0,8.91-7.22,16.13-16.14,16.13c-8.91,0-16.13-7.22-16.13-16.13 C11.5,51.47,18.72,44.25,27.63,44.25L27.63,44.25z M93.08,44.25c8.91,0,16.14,7.22,16.14,16.14c0,8.91-7.22,16.13-16.14,16.13 c-8.91,0-16.13-7.22-16.13-16.13C76.95,51.47,84.17,44.25,93.08,44.25L93.08,44.25z M60.83,10.86c8.91,0,16.13,7.22,16.13,16.14 c0,8.91-7.22,16.13-16.13,16.13c-8.91,0-16.14-7.22-16.14-16.13C44.69,18.09,51.92,10.86,60.83,10.86L60.83,10.86L60.83,10.86z M60.26,51.71c4.58,0,8.3,3.72,8.3,8.3c0,4.58-3.72,8.3-8.3,8.3c-4.58,0-8.3-3.72-8.3-8.3C51.96,55.42,55.68,51.71,60.26,51.71 L60.26,51.71L60.26,51.71z M60.83,78.38c8.91,0,16.13,7.22,16.13,16.14c0,8.91-7.22,16.13-16.13,16.13 c-8.91,0-16.14-7.22-16.14-16.13C44.69,85.61,51.92,78.38,60.83,78.38L60.83,78.38L60.83,78.38z"/></g></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Онлайн</div></div>';
  var icon_tv =
    '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17 3L12 7L7 3M6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V11.8C22 10.1198 22 9.27976 21.673 8.63803C21.3854 8.07354 20.9265 7.6146 20.362 7.32698C19.7202 7 18.8802 7 17.2 7H6.8C5.11984 7 4.27976 7 3.63803 7.32698C3.07354 7.6146 2.6146 8.07354 2.32698 8.63803C2 9.27976 2 10.1198 2 11.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">ТВ</div></div>';
  var icon_torpars =
    '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 24 24" fill="#ffffff"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16.9C16.3477 18 15.9 18.4477 15.9 19C15.9 19.5523 16.3477 20 16.9 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H7.1C7.65228 20 8.1 19.5523 8.1 19C8.1 18.4477 7.65228 18 7.1 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM13 11C13 10.4477 12.5523 10 12 10C11.4477 10 11 10.4477 11 11V16.5858L9.70711 15.2929C9.31658 14.9024 8.68342 14.9024 8.29289 15.2929C7.90237 15.6834 7.90237 16.3166 8.29289 16.7071L11.2929 19.7071C11.6834 20.0976 12.3166 20.0976 12.7071 19.7071L15.7071 16.7071C16.0976 16.3166 16.0976 15.6834 15.7071 15.2929C15.3166 14.9024 14.6834 14.9024 14.2929 15.2929L13 16.5858V11Z"/></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Торренты и Парсеры</div></div>';
  var icon_interface =
    '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.27209 20.7279L10.8686 14.1314C11.2646 13.7354 11.4627 13.5373 11.691 13.4632C11.8918 13.3979 12.1082 13.3979 12.309 13.4632C12.5373 13.5373 12.7354 13.7354 13.1314 14.1314L19.6839 20.6839M14 15L16.8686 12.1314C17.2646 11.7354 17.4627 11.5373 17.691 11.4632C17.8918 11.3979 18.1082 11.3979 18.309 11.4632C18.5373 11.5373 18.7354 11.7354 19.1314 12.1314L22 15M10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9ZM6.8 21H17.2C18.8802 21 19.7202 21 20.362 20.673C20.9265 20.3854 21.3854 19.9265 21.673 19.362C22 18.7202 22 17.8802 22 16.2V7.8C22 6.11984 22 5.27976 21.673 4.63803C21.3854 4.07354 20.9265 3.6146 20.362 3.32698C19.7202 3 18.8802 3 17.2 3H6.8C5.11984 3 4.27976 3 3.63803 3.32698C3.07354 3.6146 2.6146 4.07354 2.32698 4.63803C2 5.27976 2 6.11984 2 7.8V16.2C2 17.8802 2 18.7202 2.32698 19.362C2.6146 19.9265 3.07354 20.3854 3.63803 20.673C4.27976 21 5.11984 21 6.8 21Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></div><div class="settings-folder__name" style="font-size:1.3em">Интерфейс</div></div>';
  var icon_control =
    '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="800px" height="800px" viewBox="0 0 1024 1024" class="icon"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656zM340 683v77c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-77c-10.1 3.3-20.8 5-32 5s-21.9-1.8-32-5zm64-198V264c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v221c10.1-3.3 20.8-5 32-5s21.9 1.8 32 5zm-64 198c10.1 3.3 20.8 5 32 5s21.9-1.8 32-5c41.8-13.5 72-52.7 72-99s-30.2-85.5-72-99c-10.1-3.3-20.8-5-32-5s-21.9 1.8-32 5c-41.8 13.5-72 52.7-72 99s30.2 85.5 72 99zm.1-115.7c.3-.6.7-1.2 1-1.8v-.1l1.2-1.8c.1-.2.2-.3.3-.5.3-.5.7-.9 1-1.4.1-.1.2-.3.3-.4.5-.6.9-1.1 1.4-1.6l.3-.3 1.2-1.2.4-.4c.5-.5 1-.9 1.6-1.4.6-.5 1.1-.9 1.7-1.3.2-.1.3-.2.5-.3.5-.3.9-.7 1.4-1 .1-.1.3-.2.4-.3.6-.4 1.2-.7 1.9-1.1.1-.1.3-.1.4-.2.5-.3 1-.5 1.6-.8l.6-.3c.7-.3 1.3-.6 2-.8.7-.3 1.4-.5 2.1-.7.2-.1.4-.1.6-.2.6-.2 1.1-.3 1.7-.4.2 0 .3-.1.5-.1.7-.2 1.5-.3 2.2-.4.2 0 .3 0 .5-.1.6-.1 1.2-.1 1.8-.2h.6c.8 0 1.5-.1 2.3-.1s1.5 0 2.3.1h.6c.6 0 1.2.1 1.8.2.2 0 .3 0 .5.1.7.1 1.5.2 2.2.4.2 0 .3.1.5.1.6.1 1.2.3 1.7.4.2.1.4.1.6.2.7.2 1.4.4 2.1.7.7.2 1.3.5 2 .8l.6.3c.5.2 1.1.5 1.6.8.1.1.3.1.4.2.6.3 1.3.7 1.9 1.1.1.1.3.2.4.3.5.3 1 .6 1.4 1 .2.1.3.2.5.3.6.4 1.2.9 1.7 1.3s1.1.9 1.6 1.4l.4.4 1.2 1.2.3.3c.5.5 1 1.1 1.4 1.6.1.1.2.3.3.4.4.4.7.9 1 1.4.1.2.2.3.3.5l1.2 1.8s0 .1.1.1a36.18 36.18 0 0 1 5.1 18.5c0 6-1.5 11.7-4.1 16.7-.3.6-.7 1.2-1 1.8 0 0 0 .1-.1.1l-1.2 1.8c-.1.2-.2.3-.3.5-.3.5-.7.9-1 1.4-.1.1-.2.3-.3.4-.5.6-.9 1.1-1.4 1.6l-.3.3-1.2 1.2-.4.4c-.5.5-1 .9-1.6 1.4-.6.5-1.1.9-1.7 1.3-.2.1-.3.2-.5.3-.5.3-.9.7-1.4 1-.1.1-.3.2-.4.3-.6.4-1.2.7-1.9 1.1-.1.1-.3.1-.4.2-.5.3-1 .5-1.6.8l-.6.3c-.7.3-1.3.6-2 .8-.7.3-1.4.5-2.1.7-.2.1-.4.1-.6.2-.6.2-1.1.3-1.7.4-.2 0-.3.1-.5.1-.7.2-1.5.3-2.2.4-.2 0-.3 0-.5.1-.6.1-1.2.1-1.8.2h-.6c-.8 0-1.5.1-2.3.1s-1.5 0-2.3-.1h-.6c-.6 0-1.2-.1-1.8-.2-.2 0-.3 0-.5-.1-.7-.1-1.5-.2-2.2-.4-.2 0-.3-.1-.5-.1-.6-.1-1.2-.3-1.7-.4-.2-.1-.4-.1-.6-.2-.7-.2-1.4-.4-2.1-.7-.7-.2-1.3-.5-2-.8l-.6-.3c-.5-.2-1.1-.5-1.6-.8-.1-.1-.3-.1-.4-.2-.6-.3-1.3-.7-1.9-1.1-.1-.1-.3-.2-.4-.3-.5-.3-1-.6-1.4-1-.2-.1-.3-.2-.5-.3-.6-.4-1.2-.9-1.7-1.3s-1.1-.9-1.6-1.4l-.4-.4-1.2-1.2-.3-.3c-.5-.5-1-1.1-1.4-1.6-.1-.1-.2-.3-.3-.4-.4-.4-.7-.9-1-1.4-.1-.2-.2-.3-.3-.5l-1.2-1.8v-.1c-.4-.6-.7-1.2-1-1.8-2.6-5-4.1-10.7-4.1-16.7s1.5-11.7 4.1-16.7zM620 539v221c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V539c-10.1 3.3-20.8 5-32 5s-21.9-1.8-32-5zm64-198v-77c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v77c10.1-3.3 20.8-5 32-5s21.9 1.8 32 5zm-64 198c10.1 3.3 20.8 5 32 5s21.9-1.8 32-5c41.8-13.5 72-52.7 72-99s-30.2-85.5-72-99c-10.1-3.3-20.8-5-32-5s-21.9 1.8-32 5c-41.8 13.5-72 52.7-72 99s30.2 85.5 72 99zm.1-115.7c.3-.6.7-1.2 1-1.8v-.1l1.2-1.8c.1-.2.2-.3.3-.5.3-.5.7-.9 1-1.4.1-.1.2-.3.3-.4.5-.6.9-1.1 1.4-1.6l.3-.3 1.2-1.2.4-.4c.5-.5 1-.9 1.6-1.4.6-.5 1.1-.9 1.7-1.3.2-.1.3-.2.5-.3.5-.3.9-.7 1.4-1 .1-.1.3-.2.4-.3.6-.4 1.2-.7 1.9-1.1.1-.1.3-.1.4-.2.5-.3 1-.5 1.6-.8l.6-.3c.7-.3 1.3-.6 2-.8.7-.3 1.4-.5 2.1-.7.2-.1.4-.1.6-.2.6-.2 1.1-.3 1.7-.4.2 0 .3-.1.5-.1.7-.2 1.5-.3 2.2-.4.2 0 .3 0 .5-.1.6-.1 1.2-.1 1.8-.2h.6c.8 0 1.5-.1 2.3-.1s1.5 0 2.3.1h.6c.6 0 1.2.1 1.8.2.2 0 .3 0 .5.1.7.1 1.5.2 2.2.4.2 0 .3.1.5.1.6.1 1.2.3 1.7.4.2.1.4.1.6.2.7.2 1.4.4 2.1.7.7.2 1.3.5 2 .8l.6.3c.5.2 1.1.5 1.6.8.1.1.3.1.4.2.6.3 1.3.7 1.9 1.1.1.1.3.2.4.3.5.3 1 .6 1.4 1 .2.1.3.2.5.3.6.4 1.2.9 1.7 1.3s1.1.9 1.6 1.4l.4.4 1.2 1.2.3.3c.5.5 1 1.1 1.4 1.6.1.1.2.3.3.4.4.4.7.9 1 1.4.1.2.2.3.3.5l1.2 1.8v.1a36.18 36.18 0 0 1 5.1 18.5c0 6-1.5 11.7-4.1 16.7-.3.6-.7 1.2-1 1.8v.1l-1.2 1.8c-.1.2-.2.3-.3.5-.3.5-.7.9-1 1.4-.1.1-.2.3-.3.4-.5.6-.9 1.1-1.4 1.6l-.3.3-1.2 1.2-.4.4c-.5.5-1 .9-1.6 1.4-.6.5-1.1.9-1.7 1.3-.2.1-.3.2-.5.3-.5.3-.9.7-1.4 1-.1.1-.3.2-.4.3-.6.4-1.2.7-1.9 1.1-.1.1-.3.1-.4.2-.5.3-1 .5-1.6.8l-.6.3c-.7.3-1.3.6-2 .8-.7.3-1.4.5-2.1.7-.2.1-.4.1-.6.2-.6.2-1.1.3-1.7.4-.2 0-.3.1-.5.1-.7.2-1.5.3-2.2.4-.2 0-.3 0-.5.1-.6.1-1.2.1-1.8.2h-.6c-.8 0-1.5.1-2.3.1s-1.5 0-2.3-.1h-.6c-.6 0-1.2-.1-1.8-.2-.2 0-.3 0-.5-.1-.7-.1-1.5-.2-2.2-.4-.2 0-.3-.1-.5-.1-.6-.1-1.2-.3-1.7-.4-.2-.1-.4-.1-.6-.2-.7-.2-1.4-.4-2.1-.7-.7-.2-1.3-.5-2-.8l-.6-.3c-.5-.2-1.1-.5-1.6-.8-.1-.1-.3-.1-.4-.2-.6-.3-1.3-.7-1.9-1.1-.1-.1-.3-.2-.4-.3-.5-.3-1-.6-1.4-1-.2-.1-.3-.2-.5-.3-.6-.4-1.2-.9-1.7-1.3s-1.1-.9-1.6-1.4l-.4-.4-1.2-1.2-.3-.3c-.5-.5-1-1.1-1.4-1.6-.1-.1-.2-.3-.3-.4-.4-.4-.7-.9-1-1.4-.1-.2-.2-.3-.3-.5l-1.2-1.8v-.1c-.4-.6-.7-1.2-1-1.8-2.6-5-4.1-10.7-4.1-16.7s1.5-11.7 4.1-16.7z"/></svg></div><div class="settings-folder__name" style="font-size: 1.3em;">Управление</div></div>';
  var icon_style =
    '<div class="settings-folder" style="padding:0!important"><div class="settings-folder__icon" style="width:1.8em;height:1.3em;padding-right:0.5em; margin: 0;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="64px" width="64px" version="1.1" id="_x32_" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff" style="&#10;"><g> <path class="st0" d="M433.803,171.939c-2.142-3.556-4.324-7.127-6.72-10.714c-11.636-17.458-26.107-35.154-43.181-52.22 c-22.65-22.65-46.637-40.976-69.525-53.804c-11.483-6.366-22.728-11.482-33.503-15.015c-10.776-3.465-21.237-5.507-31.222-5.507 c-6.529,0-12.903,0.86-19.033,2.987c-6.06,2.043-11.882,5.507-16.598,10.223l-24.778,24.778l-13.087,13.088 c-34.372-8.011-66.86-13.318-94.749-13.349C65.039,72.421,50.17,74.21,37.19,78.834c-12.926,4.57-24.202,12.389-31.33,24.002 C2.043,108.98-0.023,115.97,0,122.913c0,7.396,2.227,14.502,5.791,20.984c6.298,11.352,16.544,21.352,29.617,30.976 c19.639,14.354,45.961,27.726,76.438,39.731c30.461,11.982,65.032,22.52,100.901,30.715L218,222.324v-0.008 c-52.997-12.09-103.166-29.579-139.312-48.542c-18.057-9.448-32.582-19.324-42.006-28.495c-4.716-4.57-8.126-8.941-10.208-12.75 c-2.104-3.833-2.872-6.967-2.88-9.617c0.031-2.511,0.606-4.816,2.35-7.696c3.848-6.183,9.839-10.784,19.187-14.163 c9.285-3.349,21.682-5.069,36.276-5.054c21.283-0.023,47.105,3.618,74.986,9.525l-13.311,13.31l-46.33,46.322 c9.516,4.638,19.977,9.125,31.068,13.449l78.734-78.735c2.888,14.532,9.202,30.124,18.265,46.414 c12.626,22.543,30.684,46.252,53.134,68.711c22.458,22.45,46.168,40.5,68.711,53.135c16.406,9.132,32.098,15.484,46.722,18.341 L240.996,438.465l0.868-0.944c-2.435,2.519-5.661,4.485-9.986,5.975c-4.247,1.498-9.601,2.366-15.891,2.366 c-14.078,0.077-32.558-4.562-51.99-14.078c-19.425-9.516-39.871-23.91-58.673-42.627c-18.948-18.956-33.58-39.878-43.335-59.779 c-9.831-19.901-14.623-38.849-14.547-53.166c0-6.214,0.86-11.406,2.282-15.577c1.413-4.162,3.302-7.235,5.66-9.593l30.361-30.361 c-10.776-4.716-20.845-9.594-29.97-14.547l-22.65,22.65c-6.137,6.137-10.461,13.61-13.211,21.706 c-2.758,8.104-3.932,16.675-3.932,25.723c0,20.837,6.367,43.726,17.773,67.006c11.406,23.28,27.996,46.798,49.394,68.19 c21.152,21.16,44.202,37.443,67.006,48.61c22.812,11.168,45.301,17.22,65.83,17.304c9.125,0,17.935-1.259,26.114-4.094 c8.18-2.75,15.807-7.235,22.02-13.448L405.093,319.2c-0.062,3.334-0.093,6.114-0.093,8.395c0,17.835-1.981,50.523,23.78,50.523 c7.027,0,17.834-4.953,17.834-29.716c0-15.231,15.853-10.038,15.853-0.998c0,13.879,0,18.18,0,26.744 c0,27.742,8.917,37.658,23.779,37.658c14.862,0,25.753-10.9,25.753-36.66c0-25.761,0-80.247,0-115.917 C512,227.816,478.443,186.425,433.803,171.939z M311.428,213.998c-5.638-4.923-11.26-10.146-16.79-15.684 c-21.037-21.038-37.858-43.227-49.225-63.557c-11.429-20.27-17.15-38.841-17.058-51.269c0-2.189,0.192-4.124,0.484-5.898 l7.443-7.443c1.183-1.098,2.519-2.042,4.638-2.75c2.128-0.791,5.039-1.259,8.734-1.259c5.66,0,13.056,1.175,21.467,4.009 c12.665,4.094,27.612,11.559,43.18,21.867c15.577,10.376,31.776,23.672,47.351,39.248c11.79,11.752,22.175,23.872,31.03,35.808 C365.738,169.397,337.434,183.014,311.428,213.998z"/> <path class="st0" d="M244.806,258.231c9.409,0,17.036-7.626,17.036-17.036c0-9.417-7.627-17.043-17.036-17.043 c-9.417,0-17.044,7.626-17.044,17.043C227.762,250.605,235.389,258.231,244.806,258.231z"/> </g></svg></div><div class="settings-folder__name" style="font-size:1.3em">Темы</div></div>';

  /* Регулярно вызываемые функции */
  Lampa.Storage.set("needReboot", false);
  Lampa.Storage.set("needRebootSettingExit", false);

  function loadScript(src) {
    document.head.appendChild(
      Object.assign(document.createElement("script"), { src }),
    );
  }
  function loadCSS(href) {
    document.head.appendChild(
      Object.assign(document.createElement("link"), {
        rel: "stylesheet",
        href,
      }),
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
        availability[plugin.url] = {
          loading: false,
          code: xhr && xhr.status ? String(xhr.status) : "",
        };
        updateAvailabilityView(plugin);
      },
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
        ".skull-store__tabs{display:flex;gap:.55em;overflow:hidden;margin-bottom:1.1em;flex-wrap:wrap;}" +
        ".skull-store__tab{padding:.58em .85em;border-radius:.35em;background:rgba(255,255,255,.08);border:.12em solid transparent;}" +
        ".skull-store__tab.active{background:#d8c39a;color:#111;}" +
        ".skull-store__tab.focus{border-color:#fff;}" +
        ".skull-store__section-title{font-size:1.25em;font-weight:700;margin:1.1em 0 .55em;}" +
        ".skull-store__section-title:first-child{margin-top:0;}" +
        ".skull-store .extensions__item{position:relative;margin-bottom:.55em;min-height:5.4em;padding:1em 5.2em 1em 1em;border-radius:.45em;background:rgba(255,255,255,.07);border:.12em solid rgba(255,255,255,.08);}" +
        ".skull-store .extensions__item.focus{border-color:#fff;background:rgba(255,255,255,.13);}" +
        ".skull-store .extensions__item-name{font-size:1.15em;font-weight:700;line-height:1.18;padding-right:4em;}" +
        ".skull-store .extensions__item-author{opacity:.78;margin-top:.25em;font-size:.92em;}" +
        ".skull-store .extensions__item-descr{opacity:.78;margin-top:.45em;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}" +
        ".skull-store .extensions__item-premium{display:inline-block;margin-left:.5em;padding:.15em .45em;border-radius:.25em;background:#d8c39a;color:#111;font-size:.86em;}" +
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
        ".skull-store__news-item{border-radius:.45em;padding:.8em;margin-bottom:.65em;background:rgba(255,255,255,.08);}" +
        ".skull-store__news-name{font-size:1.05em;font-weight:700;margin-bottom:.55em;}" +
        ".skull-store__news-text{font-size:.92em;line-height:1.35;}" +
        ".skull-store__empty{padding:2em;opacity:.7;text-align:center;}" +
        "@media(max-width:900px){.skull-store{padding:1em}.skull-store__layout{grid-template-columns:1fr}.skull-store__news{position:static}.skull-store__title{font-size:1.65em}}" +
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
        }

        if (item.action == "remove") {
          removePluginByUrl(plugin.url);
          rerender();
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

        setTimeout(function () {
          checkAvailability(plugin, item);
        }, 50);

        return item;
      }

      function bindController() {
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
      }

      function renderSection(title, list) {
        var section = $('<div class="skull-store__section"></div>');

        section.append('<div class="skull-store__section-title">' + title + "</div>");

        if (list.length) {
          list.forEach(function (plugin) {
            section.append(renderItem(plugin));
          });
        } else {
          section.append('<div class="skull-store__empty">В этом разделе пока пусто</div>');
        }

        return section;
      }

      function renderNews() {
        var panel = $('<div class="skull-store__news"></div>');

        panel.append('<div class="skull-store__news-title">Новости</div>');

        (news || []).forEach(function (item) {
          panel.append(
            '<div class="skull-store__news-item" style="' +
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
          Lampa.Controller.collectionSet(scroll.render());
          Lampa.Controller.collectionFocus(false, scroll.render());
        }, 50);
      }

      this.create = function () {
        render();
      };

      this.start = function () {
        Lampa.Controller.add("skull_store_center", {
          toggle: function () {
            Lampa.Controller.collectionSet(scroll.render());
            Lampa.Controller.collectionFocus(false, scroll.render());
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

    /* Авторство и замена CubPremium */
    Lampa.Settings.main()
      .render()
      .find('[data-component="plugins"]')
      .unbind("hover:enter")
      .on("hover:enter", function () {
        Lampa.Extensions.show();
        setTimeout(function () {
          $(".extensions__item", Lampa.Extensions.render()).each(
            function (i, e) {
              var descr = $(e).find(".extensions__item-descr").text();
              var regex = /https:\/\/cdn\.abros\.dev\/lampa\/store\.js/;
              if (regex.test(descr)) {
                $(e)
                  .find(".extensions__item-author")
                  .html("💀")
                  .append(
                    '<span class="extensions__item-premium">Development by Daniel Abros</span>',
                  );
                $(e).find(".extensions__item-name").html("Skull Store");
                $(e)
                  .find(".extensions__item-descr")
                  .html(
                    "Альтернативный магазин плагинов. Включает множество платных и бесплатных плагинов для Lampa.",
                  );
              }
            },
          );
        }, 500);
      });

    /* Уведомления */
    //     var notice = new Lampa.NoticeClassLampa({name: 'Skull Store',db_name: 'notice_skull'});
    //     Lampa.Notice.addClass('skull', notice);
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
