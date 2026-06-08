console.log("Script chargé avec succès.");

// ═══════════════════════════════════════════
// GESTION GLOBALE DU SCROLL (BARRE + SACCADES)
// ═══════════════════════════════════════════
const header = document.querySelector('header');
const progressBar = document.querySelector('.scroll-progress-bar');
const boutonRetourHaut = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // 1. Barre de progression fluide
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    if (docHeight > 0 && progressBar) {
        const scrollPercent = scrollTop / docHeight;
        progressBar.style.transform = `scaleX(${scrollPercent})`;
    }

    // 2. Header dynamique au scroll (Desktop uniquement)
    if (window.innerWidth > 960 && header) {
        if (scrollTop > 50) {
            header.style.padding = "15px 8%";
        } else {
            header.style.padding = "25px 8%";
        }
    }

    // 3. Visibilité du bouton retour en haut
    if (boutonRetourHaut) {
        if (scrollTop > 300) {
            boutonRetourHaut.classList.add('is-visible');
        } else {
            boutonRetourHaut.classList.remove('is-visible');
        }
    }
});

// ═══════════════════════════════════════════
// ANCRES ET SMOOTH SCROLL ROBUSTE
// ═══════════════════════════════════════════
document.querySelectorAll('.ancre').forEach(link => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        
        // On s'assure que c'est bien une ancre locale
        if (targetId.startsWith('#')) {
            event.preventDefault();
            
            // Gestion spécifique du cas "#top" ou élément cible
            const targetElement = targetId === '#top' ? document.body : document.querySelector(targetId);
            
            if (targetElement) {
                // Fermeture propre du menu mobile si ouvert avant de scroller
                if (header && header.classList.contains('is-menu-open')) {
                    header.classList.remove('is-menu-open');
                    document.body.style.overflow = '';
                }

                // Calcul précis de l'offset avec la hauteur du header
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                // Execution du scroll fluide natif maîtrisé
                window.scrollTo({
                    top: targetId === '#top' ? 0 : offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ═══════════════════════════════════════════
// GESTION DU MENU BURGER (MOBILE)
// ═══════════════════════════════════════════
const boutonBurger = document.querySelector('.burger-menu');

if (boutonBurger && header) {
    boutonBurger.addEventListener('click', (event) => {
        event.stopPropagation();
        header.classList.toggle('is-menu-open');

        if (header.classList.contains('is-menu-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// ═══════════════════════════════════════════
// RETOUR EN HAUT (FALLBACK CLIC DIRECT)
// ═══════════════════════════════════════════
if (boutonRetourHaut) {
    boutonRetourHaut.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ═══════════════════════════════════════════
// MODALES SKILLS
// ═══════════════════════════════════════════
const elementsCompetence = document.querySelectorAll('.skill-item');
const boutonsFermerModale = document.querySelectorAll('.close-skill-page');

elementsCompetence.forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.getAttribute('data-target');
        const overlay = document.getElementById(targetId);

        if (overlay) {
            overlay.classList.add('is-active');
            document.body.style.overflow = 'hidden';
        }
    });
});

boutonsFermerModale.forEach(btn => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation();
        const overlay = btn.closest('.skill-page-overlay');

        if (overlay) {
            overlay.classList.remove('is-active');
            document.body.style.overflow = '';
        }
    });
});

// ═══════════════════════════════════════════
// ANIMATIONS D'APPARITION (INTERSECTION OBSERVER)
// ═══════════════════════════════════════════
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    scrollObserver.observe(el);
});

// ═══════════════════════════════════════════
// FORMULAIRE WEB3FORMS
// ═══════════════════════════════════════════
const formulaire = document.getElementById('portfolio-form');

if (formulaire) {
    formulaire.addEventListener("submit", async function(event) {
        event.preventDefault();

        const boutonSubmit = formulaire.querySelector('.submit-btn');
        const texteBouton = boutonSubmit.querySelector('span');

        texteBouton.textContent = "Envoi en cours...";
        boutonSubmit.style.pointerEvents = "none";
        boutonSubmit.style.opacity = "0.7";

        const data = new FormData(event.target);

        try {
            const response = await fetch(formulaire.action, {
                method: formulaire.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            const json = await response.json();

            if (json.success) {
                texteBouton.textContent = "Message envoyé avec succès ! ✓";
                boutonSubmit.style.backgroundColor = "var(--accent-color)";
                boutonSubmit.style.opacity = "1";

                formulaire.reset();

                setTimeout(() => {
                    texteBouton.textContent = "Envoyer le message";
                    boutonSubmit.style.backgroundColor = "var(--text-color)";
                    boutonSubmit.style.pointerEvents = "auto";
                }, 5000);
            } else {
                texteBouton.textContent = "Erreur lors de l'envoi... ✕";
                boutonSubmit.style.backgroundColor = "#ff3333";
                boutonSubmit.style.pointerEvents = "auto";
                boutonSubmit.style.opacity = "1";
            }
        } catch (error) {
            texteBouton.textContent = "Erreur de connexion... ✕";
            boutonSubmit.style.backgroundColor = "#ff3333";
            boutonSubmit.style.pointerEvents = "auto";
            boutonSubmit.style.opacity = "1";
        }
    });
}
