(function (window) {
  const blackList = [
    {
      host: [
        "ida.21.oml.ru",
        "baudinoffs.kz",
        "eraly-ayaulym.top",
        "lerazhalil.ru",
      ],
      fn: () => {
        window.location.href = "https://maryinvite.ru";
      },
    },
  ];

  function check() {
    for (const item of blackList) {
      if (item.host.includes(window.location.host)) {
        item.fn();
        return true;
      }
    }
    return false;
  }
  check();
})(window);
