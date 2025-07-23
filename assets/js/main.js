document.addEventListener('DOMContentLoaded', function() {
    // 1. Inicijalizacija hamburger menija
    const initMobileMenu = function() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (nav && navLinks) {
            // Kreiraj hamburger dugme
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('menu-toggle');
            menuToggle.innerHTML = '☰';
            nav.appendChild(menuToggle);

            // Sakrij meni inicijalno na mobilnim i tablet uredjajima
            if (window.innerWidth <= 992) {
                navLinks.style.display = 'none';
            }

            // Dodaj event listener za klik
            menuToggle.addEventListener('click', function() {
                const isOpen = navLinks.style.display === 'flex';
                navLinks.style.display = isOpen ? 'none' : 'flex';
                menuToggle.innerHTML = isOpen ? '☰' : '✕';
                
                // Dodaj/ukloni klasu za tranziciju
                navLinks.classList.toggle('active', !isOpen);
            });
        }
    };

    // 2. Responzivna kontrola menija
    const handleResponsiveMenu = function() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!navLinks) return;

        if (window.innerWidth > 992) {
            // Desktop - prikaži puni meni
            navLinks.style.display = 'flex';
            if (menuToggle) {
                menuToggle.style.display = 'none';
                navLinks.classList.remove('active');
            }
        } else {
            // Mobile i tablet - prikaži hamburger
            if (menuToggle) menuToggle.style.display = 'block';
        }
    };

    // 3. Glatko skrolovanje za anchor linkove
    const initSmoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#' || targetId.startsWith('#')) {
                    e.preventDefault();
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Zatvori meni ako je otvoren
                        if (window.innerWidth <= 992) {
                            const navLinks = document.querySelector('.nav-links');
                            const menuToggle = document.querySelector('.menu-toggle');
                            if (navLinks && menuToggle) {
                                navLinks.style.display = 'none';
                                menuToggle.innerHTML = '☰';
                                navLinks.classList.remove('active');
                            }
                        }
                    }
                }
            });
        });
    };

    // 4. Inicijalizacija svih funkcija
    initMobileMenu();
    handleResponsiveMenu();
    initSmoothScroll();

    // 5. Resize event za responzivnost
    window.addEventListener('resize', function() {
        handleResponsiveMenu();
    });

    // 6. Zatvori meni pri kliku izvan (opciono)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            const navLinks = document.querySelector('.nav-links');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (navLinks && menuToggle && 
                !e.target.closest('.nav-links') && 
                !e.target.closest('.menu-toggle')) {
                navLinks.style.display = 'none';
                menuToggle.innerHTML = '☰';
                navLinks.classList.remove('active');
            }
        }
    });
});