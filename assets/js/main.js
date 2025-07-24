document.addEventListener('DOMContentLoaded', function() {
    // DOM elementi
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Provera da li elementi postoje
    if (!nav || !navLinks) {
        console.error('Nije pronađen nav ili .nav-links element');
        return;
    }

    // Kreiranje dugmeta za mobilni meni
    const menuToggle = document.createElement('button');
    menuToggle.classList.add('menu-toggle');
    menuToggle.setAttribute('aria-label', 'Toggle menu');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '☰';
    nav.appendChild(menuToggle);

    // Funkcija za zatvaranje menija
    const closeMenu = () => {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
        document.body.style.overflow = ''; // Vrati scroll
    };

    // Funkcija za otvaranje menija
    const openMenu = () => {
        navLinks.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.innerHTML = '✕';
        document.body.style.overflow = 'hidden'; // Spreči scroll kada je meni otvoren
    };

    // Provera širine ekrana i podešavanje menija
    const checkScreenSize = () => {
        if (window.innerWidth > 768) {
            // Desktop - uvek prikaži linkove i zatvori meni ako je bio otvoren
            closeMenu();
            navLinks.style.display = 'flex';
            menuToggle.style.display = 'none';
        } else {
            // Mobile - sakrij linkove i prikaži dugme
            navLinks.style.display = 'none';
            menuToggle.style.display = 'block';
        }
    };

    // Debounce funkcija za resize event
    let resizeTimer;
    const debouncedResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(checkScreenSize, 250);
    };

    // Event listener za dugme
    menuToggle.addEventListener('click', function() {
        if (navLinks.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Zatvaranje menija klikom van njega
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !nav.contains(e.target) && 
            navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Zatvaranje menija pritiskom na Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
            menuToggle.focus(); // Vrati fokus na dugme
        }
    });

    // Zatvaranje menija nakon klika na link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Inicijalno podešavanje
    checkScreenSize();

    // Resize event sa debounce-om
    window.addEventListener('resize', debouncedResize);
});
