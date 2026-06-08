console.log("Hello world !!!!!!!!!!!!");

// ═══════════════════════════════════════════
// GESTION DU MENU BURGER (MOBILE)
// ═══════════════════════════════════════════
const header = document.querySelector('header');
const boutonBurger = document.querySelector('.burger-menu');

if (boutonBurger && header) {
boutonBurger.addEventListener('click', (event) => {
event.stopPropagation();

```
    header.classList.toggle('is-menu-open');

    if (header.classList.contains('is-menu-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});
```

}

// ═══════════════════════════════════════════
// HEADER DYNAMIQUE AU SCROLL
// ═══════════════════════════════════════════
window.addEventListener('scroll', () => {

```
if (window.innerWidth > 960) {

    if (window.scrollY > 50) {
        header.style.padding = "15px 8%";
    } else {
        header.style.padding = "25px 8%";
    }

}
```

});

// ═══════════════════════════════════════════
// FERMETURE DU MENU MOBILE LORS D'UN CLIC
// SUR UNE ANCRE
// ═══════════════════════════════════════════
document.querySelectorAll('.ancre').forEach(link => {

```
link.addEventListener('click', () => {

    if (header && header.classList.contains('is-menu-open')) {

        header.classList.remove('is-menu-open');

        document.body.style.overflow = '';

    }

});
```

});

// ═══════════════════════════════════════════
// BOUTON RETOUR EN HAUT
// ═══════════════════════════════════════════
const boutonRetourHaut = document.getElementById('back-to-top');

if (boutonRetourHaut) {

```
boutonRetourHaut.addEventListener('click', function(event) {

    event.preventDefault();

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

});

window.addEventListener('scroll', function() {

    if (window.scrollY > 300) {
        boutonRetourHaut.classList.add('is-visible');
    } else {
        boutonRetourHaut.classList.remove('is-visible');
    }

});
```

}

// ═══════════════════════════════════════════
// MODALES SKILLS
// ═══════════════════════════════════════════
const elementsCompetence = document.querySelectorAll('.skill-item');
const boutonsFermerModale = document.querySelectorAll('.close-skill-page');

elementsCompetence.forEach(item => {

```
item.addEventListener('click', () => {

    const targetId = item.getAttribute('data-target');
    const overlay = document.getElementById(targetId);

    if (overlay) {

        overlay.classList.add('is-active');

        document.body.style.overflow = 'hidden';

    }

});
```

});

boutonsFermerModale.forEach(btn => {

```
btn.addEventListener('click', (event) => {

    event.stopPropagation();

    const overlay = btn.closest('.skill-page-overlay');

    if (overlay) {

        overlay.classList.remove('is-active');

        document.body.style.overflow = '';

    }

});
```

});

// ═══════════════════════════════════════════
// ANIMATIONS D'APPARITION
// ═══════════════════════════════════════════
const observerOptions = {
root: null,
rootMargin: '0px 0px -80px 0px',
threshold: 0.1
};

const scrollObserver = new IntersectionObserver((entries) => {

```
entries.forEach(entry => {

    if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
    }

});
```

}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
scrollObserver.observe(el);
});

// ═══════════════════════════════════════════
// FORMULAIRE WEB3FORMS
// ═══════════════════════════════════════════
const formulaire = document.getElementById('portfolio-form');

if (formulaire) {

```
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
```

}
