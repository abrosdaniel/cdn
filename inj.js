document.addEventListener("DOMContentLoaded", function () {
  const block = document.querySelector(".t898");
  const wrapper = document.querySelector(".t898__wrapper");

  if (wrapper) {
    wrapper.addEventListener("mouseenter", function () {
      const randomBottom =
        Math.floor(
          Math.random() * (window.innerHeight - wrapper.offsetHeight)
        ) + "px";
      const randomRight =
        Math.floor(Math.random() * (window.innerWidth - wrapper.offsetWidth)) +
        "px";

      wrapper.style.position = "absolute";
      wrapper.style.bottom = randomBottom;
      wrapper.style.right = randomRight;
    });
  }
});
