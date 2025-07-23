// Parallax efekat
document.addEventListener('scroll', function() {
    const parallaxBg = document.querySelector('.parallax-bg');
    const scrollPosition = window.pageYOffset;
    parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Onemogući parallax na mobilnim uređajima
if (window.innerWidth <= 768) {
    document.querySelector('.parallax-bg').style.transform = 'none';
}
