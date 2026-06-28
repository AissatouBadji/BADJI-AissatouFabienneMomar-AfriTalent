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