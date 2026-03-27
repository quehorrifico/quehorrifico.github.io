const THEME_STORAGE_KEY = 'zeus-theme';

function getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
        button.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
        button.setAttribute('title', `Switch to ${nextTheme} mode`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');

    let activeTheme = document.documentElement.dataset.theme || getPreferredTheme();
    applyTheme(activeTheme);

    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            activeTheme = activeTheme === 'dark' ? 'light' : 'dark';
            applyTheme(activeTheme);

            try {
                localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
            } catch (error) {
                // Ignore storage failures and keep the in-memory theme.
            }
        });
    });

    const yearNode = document.getElementById('current-year');
    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }

    const header = document.querySelector('.site-header');
    if (header) {
        let lastScrollY = window.scrollY;
        let ticking = false;

        const syncHeaderVisibility = () => {
            const currentScrollY = window.scrollY;
            const delta = currentScrollY - lastScrollY;

            header.classList.toggle('is-scrolled', currentScrollY > 12);

            if (currentScrollY <= 24) {
                header.classList.remove('is-hidden');
            } else if (Math.abs(delta) >= 6) {
                if (delta > 0 && currentScrollY > 120) {
                    header.classList.add('is-hidden');
                } else if (delta < 0) {
                    header.classList.remove('is-hidden');
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener(
            'scroll',
            () => {
                if (ticking) {
                    return;
                }

                ticking = true;
                window.requestAnimationFrame(syncHeaderVisibility);
            },
            { passive: true }
        );

        syncHeaderVisibility();
    }

    const revealItems = document.querySelectorAll('.reveal');
    if (!revealItems.length) {
        return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealItems.forEach((item) => item.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.14,
            rootMargin: '0px 0px -32px 0px',
        }
    );

    revealItems.forEach((item) => observer.observe(item));
});
