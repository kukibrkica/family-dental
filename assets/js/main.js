// Parallax efekat
document.addEventListener('DOMContentLoaded', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    
    if (window.innerWidth > 768) {
        document.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    } else {
        parallaxBg.style.transform = 'none';
    }
});

// Mobile menu toggle (dodatna funkcionalnost)
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.createElement('div');
    menuToggle.className = 'mobile-menu-toggle';
    menuToggle.innerHTML = '☰';
    document.querySelector('nav').appendChild(menuToggle);
    
    menuToggle.addEventListener('click', function() {
        document.querySelector('.nav-links').classList.toggle('active');
    });
});
