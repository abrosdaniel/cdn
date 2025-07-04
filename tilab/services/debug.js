(function (window) {
  window.TiLab.debug = {
    loaded: true,
    storage: [],
  };

  window.TiLab.debug.push = function (variant, name, message) {
    window.TiLab.debug.storage.push({
      time: new Date().getTime(),
      variant: variant,
      name: name,
      message: message,
    });
  };
})(window);
