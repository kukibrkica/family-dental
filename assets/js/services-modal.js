// services-modal.js
document.addEventListener('DOMContentLoaded', function() {
    // Podaci o uslugama (može se premestiti u JSON fajl ako želite)
    const servicesData = {
        'preventivna': {
            title: "Preventivna stomatologija",
            image: "./assets/img/preventivna.jpg",
            description: `
                <h2>Zašto je preventivna nega važna?</h2>
                <p>Redovni stomatološki pregledi su ključni za održavanje oralnog zdravlja...</p>
                <ul>
                    <li>Profesionalno čišćenje zuba</li>
                    <li>Fluorizacija</li>
                    <li>Sealanti</li>
                    <li>Oralno zdravstveno savetovanje</li>
                </ul>
                <p>Cena početna od: <strong>2.500 RSD</strong></p>
            `
        },
        'estetska': {
            title: "Estetska stomatologija",
            image: "./assets/img/estetska.jpg",
            description: `
                <h2>Savršen osmeh</h2>
                <p>Naše estetske procedure obuhvataju...</p>
                <ul>
                    <li>Izbjeljivanje zuba</li>
                    <li>Furniri</li>
                    <li>Bonding</li>
                    <li>Estetske plombe</li>
                </ul>
                <p>Cena početna od: <strong>5.000 RSD</strong></p>
            `
        },
        'hirurgija': {
            title: "Oralna hirurgija",
            image: "./assets/img/oralna.jpg",
            description: `
                <h2>Specijalizovane hirurške procedure</h2>
                <p>Naš tim stručnjaka pruža...</p>
                <ul>
                    <li>Vađenje zuba</li>
                    <li>Implantologija</li>
                    <li>Resekcija vrha korena</li>
                    <li>Uklanjanje impaktiranih zuba</li>
                </ul>
                <p>Cena početna od: <strong>4.000 RSD</strong></p>
            `
        }
    };

    // Modal elementi
    const modal = document.getElementById('serviceModal');
    const modalContent = document.getElementById('fdModalContent');
    const serviceCards = document.querySelectorAll('.service-card');
    const closeBtn = document.querySelector('.fd-modal-close');

    // Provera da li elementi postoje
    if (!modal || !modalContent || serviceCards.length === 0) {
        console.warn('Nisu pronađeni svi potrebni elementi za modal');
        return;
    }

    // Funkcija za otvaranje modala
    function openModal(serviceId) {
        const service = servicesData[serviceId];
        if (!service) return;

        modalContent.innerHTML = `
            <h2>${service.title}</h2>
            <div class="fd-modal-grid">
                <img src="${service.image}" alt="${service.title}" class="fd-modal-img">
                <div class="fd-modal-text">
                    ${service.description}
                    <button class="fd-booking-btn">Zakaži termin</button>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.paddingRight = getScrollbarWidth() + 'px';
        
        // Dodajemo event listener za booking dugme
        const bookingBtn = modalContent.querySelector('.fd-booking-btn');
        if (bookingBtn) {
            bookingBtn.addEventListener('click', function() {
                window.location.href = '#booking';
                closeModal();
            });
        }
    }

    // Funkcija za zatvaranje modala
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.documentElement.style.paddingRight = '';
    }

    // Event listeneri za kartice usluga
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id') || 
                             this.querySelector('[data-service-id]')?.getAttribute('data-service-id');
            if (serviceId) openModal(serviceId);
        });
    });

    // Event listeneri za zatvaranje modala
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    // Pomocna funkcija za scrollbar width
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    // Dodajemo data-service-id atribut kartama ako ga već nemaju
    serviceCards.forEach((card, index) => {
        if (!card.hasAttribute('data-service-id')) {
            const services = Object.keys(servicesData);
            if (services[index]) {
                card.setAttribute('data-service-id', services[index]);
            }
        }
    });
});