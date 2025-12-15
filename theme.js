// Theme Toggle Functionality
(function() {
    'use strict';

    // Verificar preferência salva ou usar modo escuro como padrão
    const getTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    };

    // Aplicar tema
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateToggleIcon(theme);
        updateAriaPressed(theme);
    };

    // Atualizar aria-pressed
    const updateAriaPressed = (theme) => {
        const toggleButton = document.getElementById('themeToggle');
        if (toggleButton) {
            toggleButton.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
        }
    };

    // Atualizar ícone do toggle
    const updateToggleIcon = (theme) => {
        const themeIcon = document.querySelector('.theme-icon');
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
        }
    };

    // Alternar tema
    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    // Inicializar tema ao carregar a página
    const initTheme = () => {
        const theme = getTheme();
        setTheme(theme);
    };

    // Adicionar event listener ao botão
    const initToggle = () => {
        const toggleButton = document.getElementById('themeToggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', toggleTheme);
        }
    };

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initTheme();
            initToggle();
        });
    } else {
        initTheme();
        initToggle();
    }
})();

