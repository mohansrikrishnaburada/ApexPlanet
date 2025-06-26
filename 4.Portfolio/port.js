document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Form submission handling
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Form submitted! (This is a demo, no data is sent)');
            form.reset();
        });
    }

    // Dynamic skills list adjustment
    const skillsLists = document.querySelectorAll('.skills-list');
    function adjustSkillsList() {
        skillsLists.forEach(list => {
            const cards = list.querySelectorAll('li');
            const viewportWidth = window.innerWidth;
            const cardWidth = viewportWidth <= 480 ? 140 : viewportWidth <= 768 ? 150 : 160;
            cards.forEach(card => {
                card.style.minWidth = `${cardWidth}px`;
            });
        });
    }

    // Run on load and resize
    adjustSkillsList();
    window.addEventListener('resize', adjustSkillsList);

    // Enhance touch scrolling for skills list
    skillsLists.forEach(list => {
        let isDragging = false;
        let startX, scrollLeft;

        list.addEventListener('touchstart', (e) => {
            isDragging = true;
            startX = e.touches[0].pageX - list.offsetLeft;
            scrollLeft = list.scrollLeft;
        });

        list.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.touches[0].pageX - list.offsetLeft;
            const walk = (x - startX) * 2; // Adjust scroll speed
            list.scrollLeft = scrollLeft - walk;
        });

        list.addEventListener('touchend', () => {
            isDragging = false;
        });
    });

    // Project card flip animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});