// ===================================================
//              PORTFÓLIO BUZZCODE
// ===================================================

document.addEventListener('DOMContentLoaded', function() {

    // ---------------------------------------------------
    //      LÓGICA PARA O MENU MOBILE (HAMBÚRGUER)
    // ---------------------------------------------------
    const menuHamburger = document.querySelector('.menu-hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (menuHamburger && navMenu) {
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
    }

    // ---------------------------------------------------
    //      LÓGICA PARA ANIMAÇÃO AO ROLAR (SCROLL REVEAL)
    // ---------------------------------------------------
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
    });

    sr.reveal('.hero-text, .hero-image');
    sr.reveal('.about-content', { origin: 'left' });
    sr.reveal('.service-item, .process-step, .pricing-plan, .project-card', { interval: 100 });
    sr.reveal('.testimonial-card', { interval: 150 });
    sr.reveal('.contact-wrapper', { origin: 'bottom' });


    // ---------------------------------------------------
    //      LÓGICA PARA O MODAL DE PLANOS
    // ---------------------------------------------------
    const botoesPlano = document.querySelectorAll('.btn-plano');
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const modalTitle = document.getElementById('modal-title');
        const modalFeatures = document.getElementById('modal-features');
        const modalContactBtn = document.getElementById('modal-contact-btn');

        const detalhesPlanos = {
            colmeia: {
                title: 'Plano Colmeia',
                features: [ 'Site de até 3 páginas (Ex: Início, Sobre, Contato)', 'Design totalmente responsivo para celular e desktop', 'Formulário de contato funcional', 'Otimização SEO inicial para ser encontrado no Google', 'Entrega em até 7 dias úteis' ]
            },
            nectar: {
                title: 'Plano Néctar',
                features: [ 'Tudo do Plano Colmeia', 'Site de até 5 páginas', 'Seção de Blog totalmente gerenciável por você', 'Treinamento para gerenciar seu conteúdo', 'Integração com redes sociais' ]
            },
            realeza: {
                title: 'Plano Realeza',
                features: [ 'Tudo do Plano Néctar', 'Número de páginas ilimitado', 'Funcionalidades de E-commerce (loja virtual)', 'Integração com sistemas de pagamento (PagSeguro, etc)', 'Suporte técnico prioritário' ]
            }
        };

        botoesPlano.forEach(botao => {
            botao.addEventListener('click', () => {
                const planoId = botao.dataset.plano;
                const plano = detalhesPlanos[planoId];
                modalTitle.innerText = plano.title;
                modalFeatures.innerHTML = '';
                plano.features.forEach(feature => {
                    modalFeatures.innerHTML += `<li><i class="fas fa-check-circle"></i> ${feature}</li>`;
                });
                modalOverlay.classList.add('ativo');
            });
        });

        const fecharModal = () => {
            modalOverlay.classList.remove('ativo');
        }

        modalCloseBtn.addEventListener('click', fecharModal);
        modalOverlay.addEventListener('click', (event) => {
            if (event.target === modalOverlay) {
                fecharModal();
            }
        });
        modalContactBtn.addEventListener('click', fecharModal);
    }

    // ---------------------------------------------------
    //      LÓGICA PARA ENVIO DO FORMULÁRIO COM AJAX
    // ---------------------------------------------------
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", async function(event) {
            event.preventDefault();
            const status = document.getElementById("form-status");
            const data = new FormData(event.target);
            
            fetch(event.target.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            }).then(response => {
                status.className = '';
                if (response.ok) {
                    status.innerHTML = "Obrigada! Sua mensagem foi enviada.";
                    status.classList.add('sucesso');
                    form.reset();
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            status.innerHTML = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
                        }
                        status.classList.add('erro');
                    })
                }
            }).catch(error => {
                status.className = '';
                status.innerHTML = "Oops! Ocorreu um problema ao enviar seu formulário.";
                status.classList.add('erro');
            });
        });
    }

});
