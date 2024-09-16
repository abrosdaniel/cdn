/*!
 * Скорее всего если вы по каким либо причинам нашли этот скрипт, то вы пытаетесь его удалить.
 * Этого скрипта тут бы и не было, если бы заказчик был добросовестным и оплатил бы проделанную работу.
 * Раз этот скрипт тут, значит меня решили кинуть
 * Огромная просьба не пытаться удалить скрипт, скорее всего вас потом тоже кинут.
 * Хороших тебе разработок и клиентов мой читатель.
 */
window.addEventListener("load", function () {
  var startDate = new Date("2024-09-16");
  var currentDate = new Date();
  var daysPassed = Math.floor(
    (currentDate - startDate) / (1000 * 60 * 60 * 24)
  );
  var newOpacity = Math.min(0.3 * daysPassed, 1);
  document.body.style.opacity = newOpacity;
});
