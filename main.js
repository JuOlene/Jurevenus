document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // --- Menu Mobile e Hamburger ---
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Bloquear scroll quando menu aberto
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'initial';
        }
    });

    // --- Acordeões Mobile (Níveis, Tipos, Filtros) ---
    const accHeaders = document.querySelectorAll('.acc-header');
    
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            // Toggle do conteúdo
            if (content.style.display === 'flex') {
                content.style.display = 'none';
                icon.classList.replace('fa-minus', 'fa-plus');
            } else {
                content.style.display = 'flex';
                icon.classList.replace('fa-plus', 'fa-minus');
            }
        });
    });

    // Fechar menu mobile ao clicar em links
    const navLinks = document.querySelectorAll('.nav-link, .acc-content a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.style.overflow = 'initial';
        });
    });

    // --- Troca de Tema ---
    const updateThemeIcon = (isDark) => {
        if (isDark) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        updateThemeIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        updateThemeIcon(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // --- Scroll Reveal (Simple highlight) ---
    const sections = document.querySelectorAll('section');
    const menuLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Rotação de Texto Dinâmico (Hero) ---
    const dynamicText = document.getElementById('dynamic-text');
    if (dynamicText) {
        const words = ['Mestre', 'Chef', 'Especialista', 'Amigo'];
        let currentIndex = 0;

        setInterval(() => {
            currentIndex = (currentIndex + 1) % words.length;
            
            // Efeito de transição simples
            dynamicText.style.opacity = '0';
            dynamicText.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                dynamicText.textContent = words[currentIndex];
                dynamicText.style.opacity = '1';
                dynamicText.style.transform = 'translateY(0)';
            }, 500);
        }, 3000);
    }

    // --- DASHBOARD DE RECEITAS: LÓGICA DE FILTRAGEM ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const filterPills = document.querySelectorAll('.filter-pill');
    const recipeCards = document.querySelectorAll('.recipe-card');

    function filterRecipes() {
        const activeLevel = document.querySelector('.tab-btn.active').dataset.level;
        const activeType = document.querySelector('.filter-pill.active').dataset.type;

        recipeCards.forEach(card => {
            const cardLevel = card.dataset.level;
            const cardType = card.dataset.type;

            const levelMatch = cardLevel === activeLevel;
            const typeMatch = activeType === 'all' || cardType === activeType;

            if (levelMatch && typeMatch) {
                card.style.display = 'block';
                card.style.animation = 'fadeWord 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Eventos para Tabs de Nível
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterRecipes();
        });
    });

    // Eventos para Filtros de Tipo
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            filterRecipes();
        });
    });

    // Filtro Inicial
    filterRecipes();
});
