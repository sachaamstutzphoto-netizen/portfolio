console.log("Hello world !!!!!!!!!!!!");

// ═══════════════════════════════════════════
// GESTION DU MENU BURGER (MOBILE)
// ═══════════════════════════════════════════
const header = document.querySelector('header');
const boutonBurger = document.querySelector('.burger-menu');

if (boutonBurger && header) {
    boutonBurger.addEventListener('click', (event) => {
        event.stopPropagation(); // Évite les conflits d'événements bulles
        header.classList.toggle('is-menu-open');
        
        // Bloque le scroll de la page en arrière-plan quand le menu est ouvert
        if (header.classList.contains('is-menu-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// ═══════════════════════════════════════════
// DÉDUCTION DE LA TAILLE DU HEADER AU SCROLL
// ═══════════════════════════════════════════
window.addEventListener('scroll', () => {
    // On n'applique le changement d'épaisseur que sur desktop pour éviter les sauts visuels sur mobile
    if (window.innerWidth > 960) {
        if (window.scrollY > 50) {
            header.style.padding = "15px 8%";
        } else {
            header.style.padding = "25px 8%";
        }
    }
});

// ═══════════════════════════════════════════
// FONCTION OPTIMISÉE DE DÉFILEMENT FLUIDE
// ═══════════════════════════════════════════
function smoothScrolling(element, event) {
    event.preventDefault();
    let destination = element.getAttribute('href');
    
    if (destination) {
        let targetSection;
        
        // Gestion spécifique du retour en haut (si l'ancre est # ou #top)
        if (destination === "#" || destination === "#top") {
            targetSection = document.body;
        } else {
            targetSection = document.querySelector(destination);
        }

        if (targetSection) {
            // Calcul précis de la position avec décalage pour le header sticky (85px)
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - 85;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // SÉCURITÉ MOBILE : Si le menu burger est ouvert, on le referme proprement après le clic
            if (header && header.classList.contains('is-menu-open')) {
                header.classList.remove('is-menu-open');
                document.body.style.overflow = '';
            }
        }
    }
}

// ═══════════════════════════════════════════
// APPLICATION AU BOUTON RETOUR EN HAUT
// ═══════════════════════════════════════════
const boutonRetourHaut = document.getElementById('back-to-top');

if (boutonRetourHaut) {
    boutonRetourHaut.addEventListener('click', function(event) {
        smoothScrolling(boutonRetourHaut, event);
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            boutonRetourHaut.classList.add('is-visible');
        } else {
            boutonRetourHaut.classList.remove('is-visible');
        }
    });
}

// ═══════════════════════════════════════════
// APPLICATION AUX ANCRES DU MENU
// ═══════════════════════════════════════════
const liensAncre = document.getElementsByClassName('ancre');

for (let i = 0; i < liensAncre.length; i++) {
    liensAncre[i].addEventListener('click', function(event) {
        smoothScrolling(liensAncre[i], event);
    });
}

// ═══════════════════════════════════════════
// SYSTÈME DE MODALES PLEIN ÉCRAN POUR LES SKILLS
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
        event.stopPropagation(); // Évite de ré-ouvrir accidentellement la modale
        const overlay = btn.closest('.skill-page-overlay');
        if (overlay) {
            overlay.classList.remove('is-active');
            document.body.style.overflow = ''; 
        }
    });
});

// ═══════════════════════════════════════════
// ANIMATIONS D'APPARITION DES BLOCS (OBSERVER)
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
// GESTION DU FORMULAIRE DE CONTACT (WEB3FORMS)
// ═══════════════════════════════════════════
const formulaire = document.getElementById('portfolio-form');

if (formulaire) {
    formulaire.addEventListener("submit", async function(event) {
        event.preventDefault(); // On bloque le rechargement de la page
        
        const boutonSubmit = formulaire.querySelector('.submit-btn');
        const texteBouton = boutonSubmit.querySelector('span');
        
        // Effet visuel de chargement
        texteBouton.textContent = "Envoi en cours...";
        boutonSubmit.style.pointerEvents = "none";
        boutonSubmit.style.opacity = "0.7";

        const data = new FormData(event.target);
        
        try {
            const response = await fetch(formulaire.action, {
                method: formulaire.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            const json = await response.json();

            if (json.success) {
                // Succès de l'envoi
                texteBouton.textContent = "Message envoyé avec succès ! ✓";
                boutonSubmit.style.backgroundColor = "var(--accent-color)";
                boutonSubmit.style.opacity = "1";
                formulaire.reset(); // On vide les champs du formulaire
                
                // On remet le bouton à sa place après 5 secondes
                setTimeout(() => {
                    texteBouton.textContent = "Envoyer le message";
                    boutonSubmit.style.backgroundColor = "var(--text-color)";
                    boutonSubmit.style.pointerEvents = "auto";
                }, 5000);
                
            } else {
                // Erreur retournée par le serveur
                texteBouton.textContent = "Erreur lors de l'envoi... ✕";
                boutonSubmit.style.backgroundColor = "#ff3333";
                boutonSubmit.style.pointerEvents = "auto";
                boutonSubmit.style.opacity = "1";
            }
        } catch (error) {
            // Erreur réseau de connexion
            texteBouton.textContent = "Erreur de connexion... ✕";
            boutonSubmit.style.backgroundColor = "#ff3333";
            boutonSubmit.style.pointerEvents = "auto";
            boutonSubmit.style.opacity = "1";
        }
    });
}
