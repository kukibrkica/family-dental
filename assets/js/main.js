document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle funkcionalnost
    const initMobileMenu = function() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Kreiraj hamburger dugme samo ako meni postoji
        if (nav && navLinks) {
            const menuToggle = document.createElement('button');
            menuToggle.classList.add('menu-toggle');
            menuToggle.innerHTML = '☰';
            nav.appendChild(menuToggle);

            // Sakrij meni na mobilnim uredjajima inicijalno
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }

            // Dodaj event listener za klik
            menuToggle.addEventListener('click', function() {
                const isOpen = navLinks.style.display === 'flex';
                navLinks.style.display = isOpen ? 'none' : 'flex';
                menuToggle.innerHTML = isOpen ? '☰' : '✕';
            });
        }
    };

    // Responzivna kontrola menija
    const handleResponsiveMenu = function() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (!navLinks) return;

        if (window.innerWidth > 768) {
            // Desktop - prikaži meni, sakrij hamburger
            navLinks.style.display = 'flex';
            if (menuToggle) menuToggle.style.display = 'none';
        } else {
            // Mobile - sakrij meni, prikaži hamburger
            navLinks.style.display = 'none';
            if (menuToggle) menuToggle.style.display = 'block';
        }
    };

    // Glatko skrolovanje
    const initSmoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
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

    // Resize event listener
    window.addEventListener('resize', handleResponsiveMenu);
});
