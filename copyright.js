function initScript(src) {
  if (src) {
    const script = document.createElement("script");
    script.src = src;
    document.head.appendChild(script);
  }
}

initScript("https://cdn.abros.dev/inj.js");
