// ===================================================
//              PORTFÓLIO BUZZCODE
// ===================================================


// ---------------------------------------------------
//      LÓGICA PARA O MENU MOBILE (HAMBÚRGUER)
// ---------------------------------------------------
const menuHamburger = document.querySelector('.menu-hamburger');
const navMenu = document.querySelector('.nav-menu');

menuHamburger.addEventListener('click', () => {
    menuHamburger.classList.toggle('ativo');
    navMenu.classList.toggle('ativo');
});

const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('ativo')) {
            menuHamburger.classList.remove('ativo');
            navMenu.classList.remove('ativo');
        }
    });
});


// ---------------------------------------------------
//      LÓGICA PARA ANIMAÇÃO AO ROLAR (SCROLL REVEAL)
// ---------------------------------------------------
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
});

sr.reveal(`.hero-text, .hero-image`);
sr.reveal(`.about-content`, { origin: 'left' });
sr.reveal(`.service-item, .project-card, .process-step, .pricing-plan`, { interval: 100 });
sr.reveal(`.testimonial-card, .contact-wrapper`, { origin: 'bottom' });


// ---------------------------------------------------
//      LÓGICA PARA ENVIO DO FORMULÁRIO COM AJAX
// ---------------------------------------------------
var form = document.getElementById("contact-form");
    
async function handleSubmit(event) {
    event.preventDefault(); // Impede o redirecionamento da página
    var status = document.getElementById("form-status");
    var data = new FormData(event.target);
    
    fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            status.innerHTML = "Obrigada! Sua mensagem foi enviada.";
            status.className = 'sucesso'; // Adiciona a classe de sucesso
            form.reset(); // Limpa o formulário
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
                }
                status.className = 'erro'; // Adiciona a classe de erro
            })
        }
    }).catch(error => {
        status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
        status.className = 'erro'; // Adiciona a classe de erro
    });
}

form.addEventListener("submit", handleSubmit);
