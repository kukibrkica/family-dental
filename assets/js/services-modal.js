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

    // Provera da li elementi postoje
    if (!modal || !modalContent || serviceCards.length === 0) {
        console.warn('Nisu pronađeni svi potrebni elementi za modal');
        return;
    }

    // Funkcija za otvaranje modala
    function openModal(serviceId) {
        const service = servicesData[serviceId];
        if (!service) return;

        // Postavite ARIA atribute OVDE - pre innerHTML
        modal.setAttribute('aria-hidden', 'false');
        const mainContent = document.querySelector('.hero, .services, .booking, footer');
        if (mainContent) {
            mainContent.setAttribute('aria-hidden', 'true');
        }

        modalContent.innerHTML = `
            <div class="fd-modal-header">
                <h2>${escapeHtml(service.title)}</h2>
                <button class="fd-modal-close" aria-label="Zatvori">&times;</button>
            </div>
            <div class="fd-modal-content">
            <img src="${escapeHtml(service.image)}" loading="lazy" alt="${escapeHtml(service.title)}" class="fd-modal-img">
            <div class="fd-modal-text">
                    ${service.description}
                    <button class="fd-booking-btn">Zakaži termin</button>
                </div>
            </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Dodajemo event listener za close dugme
    modalContent.querySelector('.fd-modal-close').addEventListener('click', closeModal);
    
    // Dodajemo event listener za booking dugme
    modalContent.querySelector('.fd-booking-btn')?.addEventListener('click', function() {
            window.location.href = '#booking';
            closeModal();
        });
    }    

    // Funkcija za zatvaranje modala
    function closeModal() {
         modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    modal.setAttribute('aria-hidden', 'true');
    const mainContent = document.querySelector('.hero, .services, .booking, footer');
    if (mainContent) {
        mainContent.setAttribute('aria-hidden', 'false');
    }
    }

    // Event listeneri za kartice usluga
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceId = this.getAttribute('data-service-id');
            if (serviceId) openModal(serviceId);
        });
    });

    // Event listener za zatvaranje modala
    modal.addEventListener('click', function(e) {
        // Proveravamo da li je kliknut sam modal (overlay)
        // a ne njegova deca (sadržaj unutra)
        if (e.target === this) {
            closeModal();
        }
    });


    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});

function escapeHtml(unsafe) {
    return unsafe.replace(/[&<"'>]/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[m];
    });
}