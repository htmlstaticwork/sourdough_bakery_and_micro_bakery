document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('dashboard-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('dashboard-overlay');
    const links = document.querySelectorAll('.sidebar-link');
    const panels = document.querySelectorAll('.dashboard-panel');
    const closeBtn = document.getElementById('close-sidebar-btn');

    // Toggle Sidebar
    if (menuBtn && sidebar && overlay) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('hidden');
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                sidebar.classList.remove('active');
                overlay.classList.add('hidden');
            });
        }

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.add('hidden');
        });
    }

    // Panel Switching Logic
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('data-target');
            if (!targetId) return; // For logout or static links

            e.preventDefault();

            // Handle Mobile Close on click
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                overlay.classList.add('hidden');
            }

            // Remove active from all links and panels
            links.forEach(l => l.classList.remove('active'));
            panels.forEach(p => p.classList.add('hidden'));

            // Add active to current link and panel
            link.classList.add('active');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });

    // Theme Toggle (Sidebar version)
    const sidebarThemeToggle = document.getElementById('theme-toggle-sidebar');
    sidebarThemeToggle?.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';

        // Manual toggle logic to ensure consistency
        if (currentTheme === 'dark') {
            document.documentElement.classList.add('dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
});
