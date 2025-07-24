// NOVI KOMPLETAN KOD KOJI TREBA DA ZAMENI POSTOJEĆI
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = function() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');

        // Kreiraj dugme za mobilni meni
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '☰';
        nav.appendChild(menuToggle);
        
        // Dodaj event listener
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Sakrij meni na desktopu
        if (window.innerWidth > 768) {
            navLinks.style.display = 'flex';
            menuToggle.style.display = 'none';
        }
    };

    // Resize event
    window.addEventListener('resize', function() {
        const navLinks = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');

        if (window.innerWidth > 768) {



            navLinks.style.display = 'flex';
            if (menuToggle) menuToggle.style.display = 'none';



        } else {
            navLinks.style.display = 'none';
            if (menuToggle) menuToggle.style.display = 'block';
        }
    });

    // Inicijalizacija
    mobileMenuToggle();
});
