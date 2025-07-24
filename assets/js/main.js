document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle funkcionalnost
    const initMobileMenu = function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener('click', function() {
        const isVisible = navLinks.style.display === 'flex';
        navLinks.style.display = isVisible ? 'none' : 'flex';
        menuToggle.innerHTML = isVisible ? '☰' : '✕';
    });
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
