// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = function() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelector('.nav-links');
        
        // Kreiraj dugme za mobilni meni
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '☰';
        nav.prepend(menuToggle);
        
        // Dodaj event listener
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Dodaj CSS za mobilni meni
        const mobileMenuCSS = `
            @media (max-width: 768px) {
                .nav-links {
                    position: fixed;
                    top: 70px;
                    left: 0;
                    width: 100%;
                    background: white;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px 0;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                    transform: translateY(-150%);
                    transition: transform 0.3s ease;
                    z-index: 999;
                }
                
                .nav-links.active {
                    transform: translateY(0);
                }
                
                .nav-links li {
                    margin: 10px 0;
                }
                
                .menu-toggle {
                    display: block;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 5px 10px;
                }
            }
        `;
        
        // Dodaj stilove u head
        const styleElement = document.createElement('style');
        styleElement.innerHTML = mobileMenuCSS;
        document.head.appendChild(styleElement);
    };
    
    // Parallax efekat
    const parallaxEffect = function() {
        const parallaxBg = document.querySelector('.parallax-bg');
        
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
            });
        } else {
            parallaxBg.style.transform = 'none';
        }
    };
    
    // Smooth scroll za linkove
    const smoothScroll = function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Sakrij mobilni meni ako je otvoren
                    const navLinks = document.querySelector('.nav-links');
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        document.querySelector('.menu-toggle').innerHTML = '☰';
                    }
                    
                    // Smooth scroll
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Forma za zakazivanje - dodatna validacija
    const bookingFormValidation = function() {
        const bookingForm = document.querySelector('.booking-form');
        if (!bookingForm) return;
        
        bookingForm.addEventListener('submit', function(e) {
            const phoneInput = document.getElementById('phone');
            const phoneRegex = /^[+]?[\d\s-]{8,}$/;
            
            if (!phoneRegex.test(phoneInput.value)) {
                e.preventDefault();
                alert('Molimo unesite validan broj telefona');
                phoneInput.focus();
            }
        });
    };
    
    // Inicijalizacija svih funkcija
    mobileMenuToggle();
    parallaxEffect();
    smoothScroll();
    bookingFormValidation();
    
    // Resize event - osveži parallax na promeni veličine ekrana
    window.addEventListener('resize', function() {
        parallaxEffect();
    });
});
