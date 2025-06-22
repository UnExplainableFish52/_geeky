document.addEventListener('DOMContentLoaded', function() {
    // ===== Theme Toggling =====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    function toggleTheme() {
        const body = document.documentElement;
        const isDark = body.getAttribute('data-theme') !== 'light';
        body.setAttribute('data-theme', isDark ? 'light' : 'dark');
        if (themeIcon) {
            themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
        }
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    }

    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeIcon) {
        themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // ===== Mobile Menu Functionality (Unified & Robust) =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    let menuOverlay = document.querySelector('.menu-overlay');

    // Create menu overlay if not present
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.classList.add('menu-overlay');
        document.body.appendChild(menuOverlay);
    }

    // Helper: reset hamburger icon to bars or times
    function setHamburgerIcon(bars = true) {
        if (!mobileMenuToggle) return;
        const icon = mobileMenuToggle.querySelector('i');
        if (!icon) return;
        icon.classList.remove(bars ? 'fa-times' : 'fa-bars');
        icon.classList.add(bars ? 'fa-bars' : 'fa-times');
    }

    // Toggle menu function
    function toggleMenu(forceClose = false) {
        const willBeActive = forceClose ? false : !navLinks.classList.contains('active');
        if (willBeActive) {
            mobileMenuToggle.classList.add('active');
            navLinks.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            setHamburgerIcon(false); // show times
        } else {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
            setHamburgerIcon(true); // show bars
        }
    }

    // Toggle menu on hamburger click
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close menu when clicking the overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            toggleMenu(true);
        });
    }

    // Close menu when clicking a navigation link
    if (navLinks) {
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                    toggleMenu(true);
                }
            });
        });
    }

    // Close menu on outside click (only on mobile)
    document.addEventListener('click', function(event) {
        if (window.innerWidth > 768) return;
        if (!navLinks.classList.contains('active')) return;
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        if (!isClickInsideNav && !isClickOnToggle) {
            toggleMenu(true);
        }
    });

    // Handle window resize: auto-close menu if resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu(true);
        }
    });

    // ===== Smooth Scroll for Navigation =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Skill Bars Animation =====
    const skillBars = document.querySelectorAll('.skill-progress');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const percentage = bar.parentElement.previousElementSibling.lastElementChild.textContent;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = percentage;
            }, 200);
        });
    }

    // Run animation when skills section is in view
    const skillsSection = document.querySelector('.skills-container');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillBars();
                }
            });
        });
        observer.observe(skillsSection);
    }

    // ===== Custom Cursor Effect =====
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
        });
    });

    // ===== Active Navigation Link =====
    const currentPage = window.location.pathname.split('/').pop();
    const navLinkElements = document.querySelectorAll('.nav-link');
    navLinkElements.forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (
            linkHref === currentPage ||
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === 'index.html')
        ) {
            link.classList.add('active');
        }
    });
});