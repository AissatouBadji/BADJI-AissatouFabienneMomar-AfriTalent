// ==========================================================================
// 1. GESTION DU DARK MODE AVEC LOCALSTORAGE
// ==========================================================================
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Si un thème a déjà été choisi par l'utilisateur, on l'applique
if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.textContent = '☀️ Mode Clair';
}

// Écouteur d'événement sur le bouton toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    let theme = 'light';
    if (document.body.classList.contains('dark-theme')) {
        theme = 'dark';
        themeToggle.textContent = '☀️ Mode Clair';
    } else {
        themeToggle.textContent = '🌙 Mode Sombre';
    }
    
    // On sauvegarde le choix dans le localStorage pour que ça persiste entre les pages
    localStorage.setItem('theme', theme);
});

// ==========================================================================
// 2. NAVBAR DYNAMIQUE AU SCROLL & BOUTON RETOUR EN HAUT
// ==========================================================================
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Si on scroll de plus de 50px
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }

    // Apparition du bouton "Retour en haut" si on scroll de plus de 300px
    if (window.scrollY > 300) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

// Action du bouton retour en haut
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Scroll fluide vers le haut
    });
});