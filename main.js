// Main JavaScript functionality
(function() {
    'use strict';

    // Atualizar ano no footer dinamicamente
    const updateYear = () => {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    };

    // Marcar link ativo automaticamente baseado na URL atual
    const markActiveLink = () => {
        const currentPath = window.location.pathname;
        const currentPage = currentPath.split('/').pop() || 'index.html';
        
        const navLinks = document.querySelectorAll('.nav-menu a[href]');
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            const linkPage = linkPath.split('/').pop();
            
            // Remove classes e atributos anteriores
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            // Marca como ativo se corresponder à página atual
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'index.html' && linkPage === 'index.html')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    };

    // Preencher aria-pressed inicial do botão de tema
    const initThemeButtonState = () => {
        const toggleButton = document.getElementById('themeToggle');
        if (toggleButton) {
            // Aguarda o theme.js inicializar o tema
            setTimeout(() => {
                const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
                toggleButton.setAttribute('aria-pressed', currentTheme === 'light' ? 'true' : 'false');
            }, 100);
        }
    };

    // Menu Mobile Toggle
    const initMobileMenu = () => {
        const menuToggle = document.getElementById('mobileMenuToggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('active');
            });

            // Fechar menu ao clicar em um link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                });
            });

            // Fechar menu ao pressionar ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('active');
                    menuToggle.focus();
                }
            });
        }
    };

    // Botão Voltar ao Topo
    const initBackToTop = () => {
        const backToTopButton = document.getElementById('backToTop');
        
        if (backToTopButton) {
            const toggleButton = () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            };

            window.addEventListener('scroll', toggleButton);
            toggleButton(); // Verifica estado inicial

            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };

    // Scroll reveal (IntersectionObserver)
    const initReveal = () => {
        const targets = document.querySelectorAll(
            '.section-block, .cta-block, .hero-title, .hero-subtitle'
        );

        targets.forEach((el) => el.classList.add('reveal', 'reveal-up'));

        // Hero normalmente já aparece no topo, então marcamos como visível
        const heroLogo = document.querySelector('.hero-logo-img');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroLogo) heroLogo.classList.add('is-visible');
        if (heroTitle) heroTitle.classList.add('is-visible');
        if (heroSubtitle) heroSubtitle.classList.add('is-visible');

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target); // anima só 1 vez (premium e leve)
                }
            });
        }, { threshold: 0.12 });

        // Observa apenas blocos abaixo do hero (pra não piscar no topo)
        targets.forEach((el) => {
            if (!el.classList.contains('hero-title') && !el.classList.contains('hero-subtitle')) {
                observer.observe(el);
            }
        });

        // Observer separado para os títulos (underline animation)
        const titleObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        // Observa todos os títulos de seção
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach((title) => {
            titleObserver.observe(title);
        });
    };

    // Inicializar todas as funções
    const init = () => {
        updateYear();
        markActiveLink();
        initThemeButtonState();
        initMobileMenu();
        initBackToTop();
        initReveal();
    };

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

