(function () {
  var slider = document.querySelector("[data-slider]");
  if (!slider) return;
  var slides = slider.querySelectorAll(".slide");
  var dots = slider.querySelectorAll(".dot");
  var current = 0;

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle("is-active", n === current); });
    dots.forEach(function (d, n) {
      d.classList.toggle("is-active", n === current);
      d.setAttribute("aria-selected", n === current ? "true" : "false");
    });
  }

  slider.querySelector("[data-prev]").addEventListener("click", function () { show(current - 1); });
  slider.querySelector("[data-next]").addEventListener("click", function () { show(current + 1); });
  dots.forEach(function (d, n) { d.addEventListener("click", function () { show(n); }); });

  slider.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  var startX = null;
  slider.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });
})();
