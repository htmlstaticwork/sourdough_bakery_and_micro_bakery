/* 🧑💻 The Baker's Atelier — Dashboard Dynamic Logic */

document.addEventListener('DOMContentLoaded', () => {
    initAtelierNav();
    initAtelierSidebar();
});

function initAtelierNav() {
    const allButtons = document.querySelectorAll('.view-btn');
    const views = document.querySelectorAll('.view-section');

    if (allButtons.length === 0 || views.length === 0) return;

    allButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = button.getAttribute('data-view');

            // 1. Update active state of ALL matching buttons (desktop and mobile)
            allButtons.forEach(btn => {
                if (btn.getAttribute('data-view') === viewId) {
                    btn.classList.add('bg-white/10', 'text-accent');
                    btn.classList.remove('hover:bg-white/5');
                } else {
                    btn.classList.remove('bg-white/10', 'text-accent');
                    btn.classList.add('hover:bg-white/5');
                }
            });

            // 2. Switch the active View Section with Animation
            views.forEach(section => {
                section.classList.add('hidden');
                if (section.id === `view-${viewId}`) {
                    section.classList.remove('hidden');
                    section.classList.add('animate-heroReveal');
                }
            });

            // 3. Close mobile sidebar/overlay if open
            closeAtelierSidebar();
        });
    });

    // Initialize with first view active (Overview)
    const firstView = document.querySelector('.view-btn[data-view="overview"]');
    if (firstView) firstView.click();
}

function initAtelierSidebar() {
    const hamburger = document.querySelector('#dashboard-hamburger');
    const sidebar = document.querySelector('#dashboard-sidebar');
    const overlay = document.querySelector('#dashboard-overlay');
    const closeBtn = document.querySelector('#dashboard-close');

    if (!hamburger || !sidebar) return;

    hamburger.addEventListener('click', () => {
        sidebar.classList.remove('translate-x-[110%]');
        overlay.classList.add('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = 'hidden';
    });

    [closeBtn, overlay].forEach(el => {
        el?.addEventListener('click', closeAtelierSidebar);
    });
}

function closeAtelierSidebar() {
    const sidebar = document.querySelector('#dashboard-sidebar');
    const overlay = document.querySelector('#dashboard-overlay');
    if (sidebar) sidebar.classList.add('translate-x-[110%]');
    if (overlay) overlay.classList.remove('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = '';
}
