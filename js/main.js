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


/* =============================================
   FILTRAGE DYNAMIQUE DES FREELANCES
   ============================================= */
// On sélectionne tous les boutons de filtre
const btnsFiltres = document.querySelectorAll('.btn-filter');
// On sélectionne toutes les cartes freelances
const cartesFree = document.querySelectorAll('.freelance-card');

// Si on est sur la page freelances
if (btnsFiltres.length > 0) {

    btnsFiltres.forEach(function(btn) {

        // Quand on clique sur un bouton de filtre
        btn.addEventListener('click', function() {

            // On retire la classe active de tous les boutons
            btnsFiltres.forEach(function(b) {
                b.classList.remove('active');
            });

            // On ajoute la classe active au bouton cliqué
            btn.classList.add('active');

            // On récupère la valeur du filtre
            const filtre = btn.getAttribute('data-filtre');

            // On parcourt toutes les cartes
            cartesFree.forEach(function(carte) {

                // Si le filtre est "tous" on affiche tout
                if (filtre === 'tous') {
                    carte.style.display = 'block';
                } else {
                    // On récupère la catégorie de la carte
                    const categorie = carte.getAttribute('data-categorie');

                    // Si la catégorie correspond au filtre
                    if (categorie === filtre) {
                        carte.style.display = 'block';
                    } else {
                        carte.style.display = 'none';
                    }
                }
            });
        });
    });
}

/* =============================================
   VALIDATION DU FORMULAIRE DE CONTACT
   ============================================= */
const btnEnvoyer = document.getElementById('btnEnvoyer');

if (btnEnvoyer) {

    btnEnvoyer.addEventListener('click', function() {

        // On récupère les valeurs de chaque champ
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const email = document.getElementById('email').value.trim();
        const sujet = document.getElementById('sujet').value;
        const message = document.getElementById('message').value.trim();

        // On récupère les divs d'erreur
        const errNom = document.getElementById('erreur-nom');
        const errPrenom = document.getElementById('erreur-prenom');
        const errEmail = document.getElementById('erreur-email');
        const errSujet = document.getElementById('erreur-sujet');
        const errMessage = document.getElementById('erreur-message');

        // On remet à zéro tous les messages d'erreur
        errNom.textContent = '';
        errPrenom.textContent = '';
        errEmail.textContent = '';
        errSujet.textContent = '';
        errMessage.textContent = '';

        // On remet les bordures normales
        document.getElementById('nom').classList.remove('is-invalid', 'is-valid');
        document.getElementById('prenom').classList.remove('is-invalid', 'is-valid');
        document.getElementById('email').classList.remove('is-invalid', 'is-valid');
        document.getElementById('sujet').classList.remove('is-invalid', 'is-valid');
        document.getElementById('message').classList.remove('is-invalid', 'is-valid');

        // Variable pour savoir si le formulaire est valide
        let valide = true;

        // Validation du nom
        if (nom === '') {
            errNom.textContent = 'Le nom est obligatoire.';
            document.getElementById('nom').classList.add('is-invalid');
            valide = false;
        } else {
            document.getElementById('nom').classList.add('is-valid');
        }

        // Validation du prénom
        if (prenom === '') {
            errPrenom.textContent = 'Le prénom est obligatoire.';
            document.getElementById('prenom').classList.add('is-invalid');
            valide = false;
        } else {
            document.getElementById('prenom').classList.add('is-valid');
        }

        // Validation de l'email avec regex
        // Le regex vérifie le format : quelquechose@domaine.extension
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email === '') {
            errEmail.textContent = 'L\'email est obligatoire.';
            document.getElementById('email').classList.add('is-invalid');
            valide = false;
        } else if (!regexEmail.test(email)) {
            errEmail.textContent = 'Format d\'email invalide.';
            document.getElementById('email').classList.add('is-invalid');
            valide = false;
        } else {
            document.getElementById('email').classList.add('is-valid');
        }

        // Validation du sujet
        if (sujet === '') {
            errSujet.textContent = 'Veuillez choisir un sujet.';
            document.getElementById('sujet').classList.add('is-invalid');
            valide = false;
        } else {
            document.getElementById('sujet').classList.add('is-valid');
        }

        // Validation du message (minimum 20 caractères)
        if (message === '') {
            errMessage.textContent = 'Le message est obligatoire.';
            document.getElementById('message').classList.add('is-invalid');
            valide = false;
        } else if (message.length < 20) {
            errMessage.textContent = 'Le message doit contenir au moins 20 caractères.';
            document.getElementById('message').classList.add('is-invalid');
            valide = false;
        } else {
            document.getElementById('message').classList.add('is-valid');
        }

        // Si tout est valide on affiche le message de succès
        if (valide) {
            document.getElementById('messageSucces').style.display = 'block';
            // On vide le formulaire
            document.getElementById('nom').value = '';
            document.getElementById('prenom').value = '';
            document.getElementById('email').value = '';
            document.getElementById('sujet').value = '';
            document.getElementById('message').value = '';
        }
    });
}