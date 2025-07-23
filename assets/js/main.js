/**
 * Family Dental - Kompletan JavaScript fajl
 * Obuhvata: 
 * - Hamburger meni funkcionalnost
 * - Responzivnu navigaciju
 * - Glatko skrolovanje
 */

document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // MOBILNI MENI TOGGLE FUNKCIONALNOST
    // =============================================
    const initMobileMenu = function() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle') || createMenuToggle();
        
        function createMenuToggle() {
            const toggle = document.createElement('button');
            toggle.classList.add('menu-toggle');
            toggle.innerHTML = '☰';
            nav.appendChild(toggle);
            return toggle;
        }

        function toggleMenu() {
            const isOpen = navLinks.classList.contains('active');
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = isOpen ? '☰' : '✕';
            document.body.style.overflow = isOpen ? '' : 'hidden';
        }

        function closeMenu() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '☰';
            document.body.style.overflow = '';
        }

        // Event Listeners
        menuToggle.addEventListener('click', toggleMenu);
        
        // Zatvori meni prilikom klika na link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Zatvori meni prilikom klika izvan
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) {
                closeMenu();
            }
        });

        // Inicijalno stanje
        if (window.innerWidth <= 992) {
            navLinks.classList.remove('active');
        }
    };

    // =============================================
    // RESPONZIVNA NAVIGACIJA
    // =============================================
    const handleResponsiveNav = function() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (window.innerWidth > 992) {
            // Desktop - prikaži puni meni
            navLinks.style.display = 'flex';
            if (menuToggle) {
                menuToggle.style.display = 'none';
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        } else {
            // Mobilni/Tablet - prikaži hamburger
            navLinks.style.display = 'none';
            if (menuToggle) menuToggle.style.display = 'block';
        }
    };

    // =============================================
    // GLATKO SKROLOVANJE
    // =============================================
    const initSmoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || !document.querySelector(targetId)) return;
                
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    };

    // =============================================
    // INICIJALIZACIJA
    // =============================================
    initMobileMenu();
    handleResponsiveNav();
    initSmoothScroll();

    // Resize Event Listener
    window.addEventListener('resize', function() {
        handleResponsiveNav();
    });

    // Load Event - dodatna provera
    window.addEventListener('load', function() {
        handleResponsiveNav();
    });
});