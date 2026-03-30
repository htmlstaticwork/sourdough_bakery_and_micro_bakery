/* 🍞 Aurore Sourdough — Main JS Logic */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initHeaderScroll();
    initMobileNav();
    initScrollAnimations();
    initCounters();
    initTestimonialCarousel();
    initComingSoonTimer();
});

// --- HEADER SCROLL ---
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// --- THEME ---
function initTheme() {
    const themeToggle = document.querySelector('#theme-toggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');

    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    });
}

// --- RTL ---
function initRTL() {
    const rtlToggle = document.querySelector('#rtl-toggle');
    if (!rtlToggle) return;

    const currentDir = localStorage.getItem('dir') || 'ltr';
    document.documentElement.setAttribute('dir', currentDir);

    rtlToggle.addEventListener('click', () => {
        const dir = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
        document.documentElement.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
    });
}

// --- MOBILE NAV SIDEBAR ---
function initMobileNav() {
    const hamburger = document.querySelector('#hamburger-btn');
    const sidebar = document.querySelector('#sidebar-nav');
    const overlay = document.querySelector('#sidebar-overlay');
    const closeBtn = document.querySelector('#sidebar-close');

    if (!hamburger || !sidebar) return;

    const toggleSidebar = (isOpen) => {
        sidebar.classList.toggle('open', isOpen);
        overlay.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => toggleSidebar(true));
    closeBtn?.addEventListener('click', () => toggleSidebar(false));
    overlay?.addEventListener('click', () => toggleSidebar(false));

    // Escape Key to close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            toggleSidebar(false);
        }
    });
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
}

// --- COUNTERS ---
function initCounters() {
    const counters = document.querySelectorAll('.count-up');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    counters.forEach(counter => observer.observe(counter));
}

function startCounter(el) {
    const target = +el.getAttribute('data-target');
    const speed = 200; // Lower is slower
    const increment = target / speed;

    let count = 0;
    const updateCount = () => {
        count += increment;
        if (count < target) {
            el.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            el.innerText = target;
        }
    };
    updateCount();
}

// --- TESTIMONIAL CAROUSEL (Vanila JS) ---
function initTestimonialCarousel() {
    const container = document.querySelector('#testimonial-container');
    const slides = document.querySelectorAll('.testimonial-slide');
    if (!container || slides.length === 0) return;

    let current = 0;
    const interval = 5000;

    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, interval);
}

// --- COMING SOON TIMER ---
function initComingSoonTimer() {
    const timer = document.getElementById('countdown-timer');
    if (!timer) return;

    // Set countdown - 10 days from now
    const nextBakeDate = new Date();
    nextBakeDate.setDate(nextBakeDate.getDate() + 10);
    nextBakeDate.setHours(6, 0, 0, 0);

    const updateTimer = () => {
        const now = new Date();
        const diff = nextBakeDate - now;

        if (diff <= 0) {
            timer.innerHTML = "00 : 00 : 00 : 00";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timer.innerHTML = `
            <div class="flex flex-col"><span class="text-4xl font-bold">${days.toString().padStart(2, '0')}</span><span class="text-xs uppercase">Days</span></div>
            <span class="text-2xl mt-2">:</span>
            <div class="flex flex-col"><span class="text-4xl font-bold">${hours.toString().padStart(2, '0')}</span><span class="text-xs uppercase">Hrs</span></div>
            <span class="text-2xl mt-2">:</span>
            <div class="flex flex-col"><span class="text-4xl font-bold">${minutes.toString().padStart(2, '0')}</span><span class="text-xs uppercase">Min</span></div>
            <span class="text-2xl mt-2">:</span>
            <div class="flex flex-col"><span class="text-4xl font-bold">${seconds.toString().padStart(2, '0')}</span><span class="text-xs uppercase">Sec</span></div>
        `;
    };

    setInterval(updateTimer, 1000);
    updateTimer();
}

// --- FORM REAL-TIME VALIDATION MOCK (Visual) ---
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 0 2px rgba(200, 96, 42, 0.4)';
    });
    input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
    });
});
