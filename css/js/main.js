/* =============================================
   ANNÉE DYNAMIQUE DANS LE FOOTER
   ============================================= */
// On récupère l'élément avec l'id "year" et on y met l'année actuelle
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

/* =============================================
   DARK MODE
   ============================================= */
// On récupère le bouton dark mode
const darkModeToggle = document.getElementById('darkModeToggle');

// Au chargement de la page, on vérifie si le dark mode était activé
// localStorage permet de sauvegarder des données dans le navigateur
if (localStorage.getItem('darkMode') === 'active') {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) {
        darkModeToggle.innerHTML = '<i class="bi bi-sun"></i>';
    }
}

// Quand on clique sur le bouton dark mode
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {

        // On bascule la classe dark-mode sur le body
        document.body.classList.toggle('dark-mode');

        // Si le dark mode est actif
        if (document.body.classList.contains('dark-mode')) {
            // On sauvegarde dans localStorage
            localStorage.setItem('darkMode', 'active');
            // On change l'icône en soleil
            darkModeToggle.innerHTML = '<i class="bi bi-sun"></i>';
        } else {
            // On supprime du localStorage
            localStorage.removeItem('darkMode');
            // On remet l'icône lune
            darkModeToggle.innerHTML = '<i class="bi bi-moon"></i>';
        }
    });
}

/* =============================================
   NAVBAR DYNAMIQUE AU SCROLL
   ============================================= */
const navbar = document.getElementById('navbar');

// On écoute l'événement scroll sur la fenêtre
window.addEventListener('scroll', function() {

    // Si on a scrollé plus de 50 pixels vers le bas
    if (window.scrollY > 50) {
        // On ajoute la classe "scrolled" à la navbar
        navbar.classList.add('scrolled');
    } else {
        // Sinon on retire la classe
        navbar.classList.remove('scrolled');
    }
});

/* =============================================
   BOUTON RETOUR EN HAUT
   ============================================= */
// On crée le bouton dynamiquement en JavaScript
const btnTop = document.createElement('button');
btnTop.id = 'btnTop';
btnTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
document.body.appendChild(btnTop);

// On écoute le scroll pour afficher/cacher le bouton
window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        btnTop.style.display = 'block';
    } else {
        btnTop.style.display = 'none';
    }
});

// Quand on clique sur le bouton, on remonte en douceur
btnTop.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =============================================
   COMPTEURS ANIMÉS AU SCROLL
   ============================================= */
// On sélectionne tous les éléments avec la classe "counter"
const counters = document.querySelectorAll('.counter');

// On crée un IntersectionObserver qui détecte quand un élément
// entre dans la zone visible de l'écran
const counterObserver = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        // Si l'élément est visible à l'écran
        if (entry.isIntersecting) {

            const counter = entry.target;
            // On récupère la valeur cible depuis data-target
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;

            // On calcule l'incrément : on divise la cible par 100 étapes
            const increment = target / 100;

            // On crée un intervalle qui s'exécute toutes les 20ms
            const timer = setInterval(function() {
                current += increment;

                // Si on a atteint la valeur cible
                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer); // On arrête l'intervalle
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 20);

            // On arrête d'observer cet élément pour ne pas relancer l'animation
            counterObserver.unobserve(counter);
        }
    });

}, { threshold: 0.5 }); // L'élément doit être visible à 50%

// On observe chaque compteur
counters.forEach(function(counter) {
    counterObserver.observe(counter);
});

/* =============================================
   ANIMATIONS FADE-IN AU SCROLL
   ============================================= */
// On sélectionne toutes les sections
const sections = document.querySelectorAll('section');

// On ajoute la classe fade-in à chaque section
sections.forEach(function(section) {
    section.classList.add('fade-in');
});

// On crée un IntersectionObserver pour les animations
const fadeObserver = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {
        // Si la section entre dans le viewport
        if (entry.isIntersecting) {
            // On ajoute la classe visible qui déclenche l'animation CSS
            entry.target.classList.add('visible');
            // On arrête d'observer cette section
            fadeObserver.unobserve(entry.target);
        }
    });

}, { threshold: 0.1 }); // L'élément doit être visible à 10%

// On observe chaque section
sections.forEach(function(section) {
    fadeObserver.observe(section);
});