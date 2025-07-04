(function (window) {
  window.TiLab.debug = {
    loaded: true,
    storage: [],
  };

  window.TiLab.debug.push = function (value, message) {
    let variant = "log";
    let name = value;

    if (value.startsWith("!!")) {
      variant = "error";
      name = value.substring(2);
    } else if (value.startsWith("!")) {
      variant = "warn";
      name = value.substring(1);
    } else if (value.startsWith("-")) {
      variant = "info";
      name = value.substring(1);
    }

    window.TiLab.debug.storage.push({
      time: new Date().getDate(),
      variant: variant,
      name: name,
      message: message,
    });
  };
})(window);
