function collectVisitorData() {
  const data = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    windowSize: `${window.innerWidth}x${window.innerHeight}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
    platform: navigator.platform,
    referrer: document.referrer || "direct",
    colorDepth: window.screen.colorDepth,
    deviceMemory: navigator.deviceMemory || "not available",
    hardwareConcurrency: navigator.hardwareConcurrency || "not available",
  };

  // Отправка данных на вебхук
  fetch("https://webhook.site/fd9472fb-ce85-4a31-8dd1-31439950a459", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => console.log("Data sent successfully"))
    .catch((error) => console.error("Error sending data:", error));
}

// Вызов функции при загрузке страницы
window.addEventListener("load", collectVisitorData);
