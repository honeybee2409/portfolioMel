// Lógica para o Menu Mobile (Hambúrguer)
const menuHamburger = document.querySelector('.menu-hamburger');
const navMenu = document.querySelector('.nav-menu');

// 1. Abre e fecha o menu ao clicar no ícone de hambúrguer/X
menuHamburger.addEventListener('click', () => {
    menuHamburger.classList.toggle('ativo');
    navMenu.classList.toggle('ativo');
});


// 2. Fecha o menu mobile automaticamente ao clicar em um link
const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Verifica se o menu está ativo antes de tentar fechar
        if (navMenu.classList.contains('ativo')) {
            menuHamburger.classList.remove('ativo');
            navMenu.classList.remove('ativo');
        }
    });
});