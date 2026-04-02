// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const rtlToggles = document.querySelectorAll('[data-rtl-toggle]');

// Function to setTheme
function setTheme(theme) {
    if (theme === 'dark') {
        htmlElement.classList.add('dark');
        htmlElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        htmlElement.classList.remove('dark');
        htmlElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

// Initial Theme Selection
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.classList.contains('dark') ? 'light' : 'dark';
        setTheme(currentTheme);
    });
}

function syncRtlToggles() {
    const isRTL = htmlElement.getAttribute('dir') === 'rtl';

    rtlToggles.forEach(toggle => {
        const dot = toggle.querySelector('.dot');
        toggle.setAttribute('aria-pressed', String(isRTL));

        if (dot) {
            toggle.classList.toggle('active', isRTL);
            dot.style.left = isRTL ? '22px' : '4px';
        } else {
            toggle.classList.toggle('rtl-toggle-active', isRTL);
        }
    });
}

function setDirection(direction) {
    htmlElement.setAttribute('dir', direction === 'rtl' ? 'rtl' : 'ltr');
    localStorage.setItem('direction', htmlElement.getAttribute('dir'));
    syncRtlToggles();
}

const savedDirection = localStorage.getItem('direction');
setDirection(savedDirection === 'rtl' ? 'rtl' : 'ltr');

rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const nextDirection = htmlElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        setDirection(nextDirection);
    });
});

// Mobile Navbar Logic
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const drawer = document.getElementById('mobile-drawer');
const overlay = document.getElementById('overlay');

function openDrawer() {
    if (drawer) {
        drawer.classList.add('active');
        if (overlay) overlay.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
    }
}

function closeDrawer() {
    if (drawer) {
        drawer.classList.remove('active');
        if (overlay) overlay.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
    }
}

if (menuBtn) menuBtn.addEventListener('click', openDrawer);
if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
if (overlay) overlay.addEventListener('click', closeDrawer);

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawer();
});

// Close drawer on link click
const drawerLinks = document.querySelectorAll('#mobile-drawer a');
drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
});

// Scroll Animations (Simple Intersection Observer)
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

// Parallax Hero for Home (index.html)
const parallaxContainer = document.querySelector('.parallax-container');
if (parallaxContainer) {
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset;
        const layers = document.querySelectorAll('.parallax-layer');
        layers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            layer.style.transform = `translateY(${scrollPos * speed}px)`;
        });
    });
}

// Staggered load for shop (stagger-load)
const staggerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                setTimeout(() => {
                    child.style.opacity = '1';
                    child.style.transform = 'translateY(0)';
                    child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                }, index * 100);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const staggerElements = document.querySelectorAll('.stagger-load');
staggerElements.forEach(el => staggerObserver.observe(el));

// Back to top logic
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.remove('hidden');
            backToTop.classList.add('flex');
        } else {
            backToTop.classList.add('hidden');
            backToTop.classList.remove('flex');
        }
    });
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Counters (for home-2)
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const updateCount = () => {
                    const target = +entry.target.getAttribute('data-target');
                    const count = +entry.target.innerText;
                    const inc = target / 100;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    counters.forEach(counter => counterObserver.observe(counter));
}
