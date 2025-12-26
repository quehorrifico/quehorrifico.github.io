document.addEventListener('DOMContentLoaded', () => {
    // Add animation to navigation links on hover
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.classList.add('hover-bounce');
        });
        link.addEventListener('mouseout', () => {
            link.classList.remove('hover-bounce');
        });
    });

    // Animate sections on scroll into view
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
