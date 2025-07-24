document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    // Hamburger meni toggle
    const initMobileMenu = function () {
        if (!menuToggle || !navLinks) return;

        // Ako smo sačuvali da je meni prethodno zatvoren - sakrij odmah
        if (window.innerWidth <= 768 && localStorage.getItem('menuClosed') === 'true') {
            navLinks.style.display = 'none';
            menuToggle.innerHTML = '☰';
            localStorage.removeItem('menuClosed');
        }

        menuToggle.addEventListener('click', function () {
            const isOpen = navLinks.style.display === 'flex';
            navLinks.style.display = isOpen ? 'none' : 'flex';
            menuToggle.innerHTML = isOpen ? '☰' : '✕';
        });

        // Kada klikneš na link, sakrij meni i zapamti to
        navLinksAll.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.style.display = 'none';
                    menuToggle.innerHTML = '☰';
                    localStorage.setItem('menuClosed', 'true');
                }
            });
        });
    };

    // Prilagodi meni pri promeni veličine prozora
    const handleResponsiveMenu = function () {
        if (!navLinks) return;

        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            if (menuToggle) menuToggle.style.display = 'none';
        } else {
            navLinks.style.display = 'none';
            if (menuToggle) {
                menuToggle.style.display = 'block';
                menuToggle.innerHTML = '☰';
            }
        }
    };

    // Glatko skrolovanje za #linkove
    const initSmoothScroll = function () {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // Inicijalizacija
    initMobileMenu();
    handleResponsiveMenu();
    initSmoothScroll();

    // Reaguj na promenu veličine prozora
    window.addEventListener('resize', handleRespon
