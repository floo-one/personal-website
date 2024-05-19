document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll('.section');
  let currentSectionIndex = 0;

  function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
      currentSectionIndex = index;
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      scrollToSection(currentSectionIndex + 1);
    } else if (event.key === 'ArrowUp') {
      scrollToSection(currentSectionIndex - 1);
    }
  });
});
