document.addEventListener("DOMContentLoaded", function() {
  if (typeof $.scrollify === 'function') {
    $.scrollify({
      section: ".section",
      scrollSpeed: 1100,
      offset: 0
    });
  } else {
    console.error("Scrollify did not load correctly");
  }
});
