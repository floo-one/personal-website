document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0; // Start with the welcome section
    const modeToggle = document.getElementById('dark-mode-toggle');
    const modeIcon = document.getElementById('mode-icon');

    // Set default mode to dark mode
    document.body.classList.add('dark-mode');
    modeIcon.src = '/light-mode-icon.png';

    const scrollToSection = (index) => {
        sections.forEach((section, i) => {
            if (i === index) {
                section.style.transform = 'translateY(0)';
                section.style.visibility = 'visible';
            } else if (i < index) {
                section.style.transform = 'translateY(-100vh)';
                section.style.visibility = 'hidden';
            } else {
                section.style.transform = 'translateY(100vh)';
                section.style.visibility = 'hidden';
            }
        });
    };

    let isThrottled = false;
    const throttleDuration = 1000; // Adjust this value to control the scrolling speed

    const handleScroll = (event) => {
        if (isThrottled) return;

        if (event.deltaY > 0 && currentSection < sections.length - 1) {
            currentSection++;
        } else if (event.deltaY < 0 && currentSection > 0) {
            currentSection--;
        }

        scrollToSection(currentSection);
        isThrottled = true;
        setTimeout(() => isThrottled = false, throttleDuration);
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('dark-mode')) {
            modeIcon.src = '/light-mode-icon.png';
        } else {
            modeIcon.src = '/dark-mode-icon.png';
        }
    };

    modeToggle.addEventListener('click', toggleDarkMode);
    window.addEventListener('wheel', handleScroll);
    scrollToSection(currentSection); // Initialize position to the welcome section
});
