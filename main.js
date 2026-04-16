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

    // --- BANCO DE DADOS DE RECEITAS (RECIPES_DATABASE) ---
    const RECIPES_DATABASE = [
        // SALGADOS (Receitas)
        {
            id: 'pasta-1', section: 'receitas', level: 'iniciante', type: 'massas', filter: 'rapido',
            title: 'Spaghetti Al Limone', desc: 'Refrescante e pronto em minutos.', tag: '15 min', yield: '2 pessoas',
            img: 'assets/recipe_pasta.png',
            ingredients: ['200g Spaghetti', 'Suco de 2 limões sicilianos', '50g Parmesão', 'Azeite extra virgem', 'Sal e Pimenta'],
            method: ['Cozinhe a massa em água salgada.', 'Em uma frigideira, misture o azeite e o suco de limão.', 'Transfira a massa para a frigideira com um pouco da água do cozimento.', 'Finalize com parmesão e pimenta.']
        },
        {
            id: 'fish-1', section: 'receitas', level: 'iniciante', type: 'peixes', filter: 'saudavel',
            title: 'Salmão no Vapor', desc: 'Leve e nutritivo.', tag: '20 min', yield: '1 pessoa',
            img: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['1 filé de Salmão', 'Legumes variados', 'Limão', 'Ervas frescas'],
            method: ['Tempere o peixe com sal e ervas.', 'Cozinhe no vapor por 12-15 minutos.', 'Acompanhe com os legumes cozidos.']
        },
        {
            id: 'meat-1', section: 'receitas', level: 'intermediario', type: 'carnes', filter: 'economico',
            title: 'Costelinha BBQ JV', desc: 'Equilíbrio agridoce perfeito.', tag: '60 min', yield: '4 pessoas',
            img: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['1kg Costelinha Suína', 'Molho BBQ JV', 'Mel', 'Alho e Páprica'],
            method: ['Tempere a costelinha e asse coberta por 40 min.', 'Pincele o molho e asse por mais 20 min descoberta.']
        },
        {
            id: 'meat-2', section: 'receitas', level: 'avancado', type: 'carnes', filter: '',
            title: 'Beef Wellington', desc: 'A técnica definitiva da massa folhada.', tag: '120 min', yield: '6 pessoas',
            img: 'https://images.unsplash.com/photo-1514516348920-f5d90e0c90c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Filet Mignon Inteiro', 'Massa Folhada', 'Duxelles de Cogumelos', 'Presunto de Parma', 'Gemas de ovo'],
            method: ['Sele a carne rapidamente.', 'Envolva no presunto e duxelles.', 'Cubra com a massa folhada e pincele ovos.', 'Asse a 200°C até o ponto desejado.']
        },
        {
            id: 'veggie-1', section: 'receitas', level: 'intermediario', type: 'vegetariano', filter: 'saudavel',
            title: 'Risoto de Cogumelos', desc: 'Cremosidade e sabor terroso.', tag: '40 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Arroz Arbóreo', 'Mix de Cogumelos', 'Vinho Branco', 'Caldo de Legumes', 'Manteiga e Parmesão'],
            method: ['Refogue os cogumelos.', 'Adicione o arroz e o vinho.', 'Vá colocando o caldo aos poucos, mexendo sempre.', 'Finalize com manteiga e queijo.']
        },
        {
            id: 'entrada-1', section: 'receitas', level: 'iniciante', type: 'massas', filter: 'rapido',
            title: 'Bruschetta Pomodoro', desc: 'O clássico italiano.', tag: '10 min', yield: '4 pessoas',
            img: 'assets/recipe_bruschetta.png',
            ingredients: ['Pão Italiano', 'Tomates maduros', 'Manjericão', 'Alho', 'Azeite'],
            method: ['Toste fatias de pão esfregadas com alho.', 'Misture tomates picados com manjericão e azeite.', 'Sirva sobre o pão.']
        },
        {
            id: 'meat-3', section: 'receitas', level: 'avancado', type: 'carnes', filter: 'economico',
            title: 'Picanha Invertida', desc: 'Inovação e suculência.', tag: '80 min', yield: '5 pessoas',
            img: 'https://images.unsplash.com/photo-1558030006-45ef67561494?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Picanha Inteira', 'Queijo Coalho', 'Bacon picado', 'Temperos Secos'],
            method: ['Abra a picanha por dentro sem furar a ponta.', 'Inverta a peça de modo que a gordura fique para dentro.', 'Recheie com o queijo e bacon.', 'Asse até dourar.']
        },
        {
            id: 'peixe-2', section: 'receitas', level: 'avancado', type: 'peixes', filter: 'saudavel',
            title: 'Polvo Grelhado', desc: 'Textura perfeita.', tag: '90 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1548946522-4a313e8972a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Polvo Médio', 'Batatas Bolinha', 'Páprica Defumada', 'Azeite de Oliva'],
            method: ['Cozinhe o polvo na pressão por 35 min.', 'Grelhe o polvo e as batatas com azeite e páprica.']
        },

        // DOCES (Ateliê)
        {
            id: 'doce-1', section: 'confeitaria', level: 'iniciante', type: 'sobremesas', filter: 'rapido',
            title: 'Parfait de Frutas', desc: 'Camadas de frescor.', tag: '10 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Iogurte Grego', 'Granola', 'Frutas Vermelhas', 'Mel'],
            method: ['Intercale camadas de iogurte, frutas e granola em uma taça.', 'Finalize com mel fresco.']
        },
        {
            id: 'doce-2', section: 'confeitaria', level: 'iniciante', type: 'bolos', filter: 'economico',
            title: 'Bolo de Cenoura', desc: 'Irresistível e caseiro.', tag: '45 min', yield: '10 pessoas',
            img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['3 Cenouras', '3 Ovos', '2 Xícaras de Farinha', '1 Xícara de Óleo', 'Calda de Chocolate'],
            method: ['Bata cenoura, ovos e óleo.', 'Misture os secos.', 'Asse por 40 min em forno médio.', 'Cubra com a calda.']
        },
        {
            id: 'doce-3', section: 'confeitaria', level: 'intermediario', type: 'sobremesas', filter: 'rapido',
            title: 'Lava Cake Avelã', desc: 'O clássico centro derretido.', tag: '25 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1541920483524-9984d469c550?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['200g Chocolate Amargo', 'Manteiga', '2 Ovos', 'Essência de Avelã'],
            method: ['Derreta chocolate e manteiga.', 'Misture ovos e essência.', 'Asse em forminhas por apenas 10-12 min.']
        },
        {
            id: 'doce-4', section: 'confeitaria', level: 'avancado', type: 'macarons', filter: '',
            title: 'Macarons Lavanda', desc: 'O desafio supremo.', tag: '180 min', yield: '20 unidades',
            img: 'https://images.unsplash.com/photo-1569864358642-9d161970296d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Farinha de Amêndoas', 'Açúcar de Confeiteiro', 'Claras de Ovos', 'Corante Lavanda'],
            method: ['Faça o macaronage até o ponto de fita.', 'Pingue e deixe secar por 1 hora.', 'Asse por 15 min.', 'Recheie após esfriar.']
        },
        {
            id: 'doce-5', section: 'confeitaria', level: 'avancado', type: 'chocolataria', filter: '',
            title: 'Bombom de Ganache', desc: 'Brilho e técnica.', tag: '120 min', yield: '15 bombons',
            img: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Chocolate Nobre', 'Creme de Leite', 'Invertido', 'Forma de Policarbonato'],
            method: ['Tempere o chocolate.', 'Faça as casquinhas.', 'Recheie com ganache fria.', 'Feche e desenforme após cristalizar.']
        },
        {
            id: 'doce-6', section: 'confeitaria', level: 'intermediario', type: 'bolos', filter: 'economico',
            title: 'Cheesecake de Frutas', desc: 'Textura cremosa.', tag: '60 min', yield: '8 pessoas',
            img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Cream Cheese', 'Biscoito Maizena', 'Manteiga', 'Geleia de Morango'],
            method: ['Faça a base de biscoito.', 'Bata o creme e asse em banho-maria por 50 min.', 'Gele e finalize com cobertura.']
        },
        {
            id: 'doce-7', section: 'confeitaria', level: 'iniciante', type: 'chocolataria', filter: 'rapido',
            title: 'Trufa de Limão', desc: 'Ácido e doce.', tag: '30 min', yield: '12 unidades',
            img: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Chocolate Branco', 'Creme de Leite', 'Suco de Limão', 'Raspas'],
            method: ['Derreta o chocolate com creme.', 'Misture o limão.', 'Modele após firmar na geladeira.']
        },
        {
            id: 'doce-8', section: 'confeitaria', level: 'avancado', type: 'sobremesas', filter: 'sem-gluten',
            title: 'Pavlova Imperial', desc: 'Nuvem de merengue.', tag: '150 min', yield: '6 pessoas',
            img: 'https://images.unsplash.com/photo-1511081138522-86197a8466a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Brancas de Ovos', 'Açúcar Fino', 'Amido de Milho', 'Creme de Leite fresco'],
            method: ['Bata o merengue bem firme.', 'Asse em temperatura baixíssima por 2 horas.', 'Cubra com chantilly e frutas.'],
            movie: ''
        },

        // CINE GOURMET (Filmes)
        {
            id: 'cine-1', section: 'filmes', level: 'intermediario', type: 'animacoes', filter: 'replica',
            title: 'Ratatouille do Remy', desc: 'A versão clássica do Confit Byaldi.', tag: '90 min', yield: '4 pessoas',
            img: 'https://images.unsplash.com/photo-1572453800999-e8d2d15fb3c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Berinjela', 'Abobrinha', 'Tomate Roma', 'Pimentão Amarelo', 'Ervas de Provence'],
            method: ['Fatie os legumes finamente e uniformemente.', 'Faça uma base de molho de pimentão e tomate.', 'Disponha os legumes em espiral.', 'Asse lentamente coberto com papel manteiga.'],
            movie: 'Ratatouille'
        },
        {
            id: 'cine-2', section: 'filmes', level: 'iniciante', type: 'fantasia', filter: 'rapido',
            title: 'Cerveja Amanteigada', desc: 'Sabor mágico e cremoso.', tag: '10 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1513558161293-cdaf7659ed97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Cerveja de Raiz ou Soda', 'Xarope de Caramelo', 'Chantilly', 'Essência de Manteiga'],
            method: ['Misture o refrigerante com o caramelo.', 'No topo, adicione o chantilly batido com essência de manteiga.', 'Sirva gelado.'],
            movie: 'Harry Potter'
        },
        {
            id: 'cine-3', section: 'filmes', level: 'iniciante', type: 'series', filter: 'inspirada',
            title: 'Waffle Eleven', desc: 'Com camadas de coberturas.', tag: '15 min', yield: '1 pessoa',
            img: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Waffles congelados ou frescos', 'Vários tipos de doces', 'Chantilly', 'Calda'],
            method: ['Toste os waffles até ficarem crocantes.', 'Empilhe-os com chantilly entre as camadas.', 'Decore com o máximo de doces possível.'],
            movie: 'Stranger Things'
        },
        {
            id: 'cine-4', section: 'filmes', level: 'intermediario', type: 'classicos', filter: 'replica',
            title: 'Milkshake de 5 Dólares', desc: 'O clássico do Jack Rabbit Slims.', tag: '10 min', yield: '1 pessoa',
            img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Sorvete de Baunilha Premium', 'Leite Integral', 'Chantilly Real', 'Cereja Marrasquino'],
            method: ['Bata o sorvete com o leite até ficar denso.', 'Sirva em copo alto.', 'Finalize com muito chantilly e a cereja no topo.'],
            movie: 'Pulp Fiction'
        },
        {
            id: 'cine-5', section: 'filmes', level: 'avancado', type: 'series', filter: 'replica',
            title: 'Spaghetti Godfather', desc: 'A receita de Clemenza.', tag: '120 min', yield: '6 pessoas',
            img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Polpette (Almôndegas)', 'Linguiça Italiana', 'Tomates Pelados', 'Vinho tinto', 'Açúcar (segredo)'],
            method: ['Sele as carnes.', 'Ferva o molho por horas.', 'Adicione o açúcar e o vinho para equilibrar a acidez.', 'Sirva com spaghetti al dente.'],
            movie: 'The Godfather'
        },
        {
            id: 'cine-6', section: 'filmes', level: 'intermediario', type: 'fantasia', filter: 'inspirada',
            title: 'Pão de Lembas', desc: 'Energia para o dia todo.', tag: '40 min', yield: '12 fatias',
            img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
            ingredients: ['Mel', 'Nozes picadas', 'Laranja', 'Farinha Integral'],
            method: ['Misture os ingredientes até formar uma massa densa.', 'Modele em quadrados e decore com uma folha.', 'Asse até firmar.'],
            movie: 'Lord of the Rings'
        }
    ];

    // --- LÓGICA DO MODAL ---
    const modal = document.getElementById('recipe-modal');
    const closeModal = modal.querySelector('.close-modal');

    function openRecipeModal(recipe) {
        document.getElementById('modal-img').style.backgroundImage = `url(${recipe.img})`;
        document.getElementById('modal-title').textContent = recipe.title;
        document.getElementById('modal-level').textContent = `Nível: ${recipe.level}`;
        document.getElementById('modal-type').textContent = `Categoria: ${recipe.type}`;
        document.getElementById('modal-yield').textContent = `Rendimento: ${recipe.yield}`;
        
        const movieBadge = document.getElementById('modal-movie');
        if (recipe.movie) {
            movieBadge.textContent = `🎬 Obra: ${recipe.movie}`;
            movieBadge.classList.add('active');
        } else {
            movieBadge.classList.remove('active');
        }

        const ingList = document.getElementById('modal-ingredients-list');
        ingList.innerHTML = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');

        const metList = document.getElementById('modal-method-list');
        metList.innerHTML = recipe.method.map(step => `<li>${step}</li>`).join('');

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal.onclick = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // --- LÓGICA DE FILTRAGEM REORGANIZADA ---

    function setupDashboard(containerId, listId, tabClass, pillClass) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const tabs = container.querySelectorAll(tabClass);
        const pills = container.querySelectorAll(pillClass);
        const refineBtn = container.querySelector('.btn-refine');
        const refinePanel = container.querySelector('.refine-panel');
        const filterIcons = container.querySelectorAll('.filter-icon');
        const recipeList = document.getElementById(listId);

        // Toggle do Painel Refinar
        if (refineBtn && refinePanel) {
            refineBtn.onclick = (e) => {
                e.stopPropagation();
                refinePanel.classList.toggle('active');
                refineBtn.classList.toggle('active');
            };

            document.addEventListener('click', () => {
                refinePanel.classList.remove('active');
                refineBtn.classList.remove('active');
            });
            refinePanel.onclick = (e) => e.stopPropagation();
        }

        function renderRecipes() {
            const activeLevel = container.querySelector(`${tabClass}.active`)?.dataset.level;
            const activeType = container.querySelector(`${pillClass}.active`)?.dataset.type;
            const activeIcons = Array.from(container.querySelectorAll('.filter-icon.active')).map(i => i.dataset.filter);

            // Filtrar do Banco de Dados
            const filtered = RECIPES_DATABASE.filter(r => {
                if (r.section !== containerId) return false;
                if (r.level !== activeLevel) return false;
                if (activeType !== 'all' && r.type !== activeType) return false;
                if (activeIcons.length > 0 && !activeIcons.includes(r.filter)) return false;
                return true;
            });

            recipeList.innerHTML = filtered.map(r => `
                <div class="recipe-card" onclick='openRecipeById("${r.id}")'>
                    <div class="recipe-img">
                        <img src="${r.img}" alt="${r.title}">
                        <div class="recipe-tag">${r.tag}</div>
                    </div>
                    <div class="recipe-info">
                        <span class="recipe-cat">${r.level} • ${r.type}</span>
                        <h3>${r.title}</h3>
                        <p>${r.desc}</p>
                        <span class="btn-text">Ver Receita <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            `).join('');
        }

        tabs.forEach(tab => tab.onclick = () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderRecipes();
        });

        pills.forEach(pill => pill.onclick = () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            renderRecipes();
        });

        filterIcons.forEach(icon => icon.onclick = () => {
            icon.classList.toggle('active');
            renderRecipes();
        });

        renderRecipes();
    }

    // Função Global para o onclick dinâmico
    window.openRecipeById = (id) => {
        const recipe = RECIPES_DATABASE.find(r => r.id === id);
        if (recipe) openRecipeModal(recipe);
    };

    // --- LÓGICA DO HUB MASTER DE RECEITAS ---
    function initializeMasterHub() {
        const hubSection = document.getElementById('receitas-hub');
        const tipsSection = document.getElementById('dicas');
        const hubPanes = document.querySelectorAll('.hub-pane');
        const dropdownItems = document.querySelectorAll('.dropdown-item');
        const heroExploreBtn = document.getElementById('heroExploreBtn');

        const bgMap = {
            receitas: 'hub-bg-receitas',
            filmes: 'hub-bg-filmes',
            confeitaria: 'hub-bg-confeitaria'
        };

        function switchUniverse(target) {
            // Revelar seções caso estejam ocultas
            hubSection.style.display = 'block';
            tipsSection.style.display = 'block';

            // 1. Alternar Painéis
            hubPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === `hub-${target}`) {
                    pane.classList.add('active');
                }
            });

            // 2. Mudar Fundo
            hubSection.classList.remove('hub-bg-receitas', 'hub-bg-filmes', 'hub-bg-confeitaria');
            hubSection.classList.add(bgMap[target]);

            // 3. Scroll Suave para a Seção
            hubSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // Eventos nos itens do Dropdown do Menu Superior
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const target = item.dataset.target;
                switchUniverse(target);
                document.getElementById('navMenu').classList.remove('active');
            });
        });

        // Evento no botão do Hero
        if (heroExploreBtn) {
            heroExploreBtn.addEventListener('click', () => {
                switchUniverse('receitas'); // Abre salgados por padrão
            });
        }
    }

    // Inicializar Hub Master
    initializeMasterHub();

    // Inicializar Dashboards individuais
    setupDashboard('receitas', 'recipe-list-receitas', '.tab-btn', '.filter-pill');
    setupDashboard('filmes', 'recipe-list-filmes', '.tab-btn-cine', '.filter-pill-cine');
    setupDashboard('confeitaria', 'recipe-list-ateliere', '.tab-btn-pastry', '.filter-pill-pastry');

    // --- LÓGICA DO ATELIÊ DE CONFEITARIA (FERRAMENTAS) ---

    // 1. Tabela de Temperagem
    const tempBtns = document.querySelectorAll('.temp-btn');
    const tempMelt = document.getElementById('temp-melt');
    const tempCool = document.getElementById('temp-cool');
    const tempWork = document.getElementById('temp-work');

    const tempData = {
        dark: { melt: '45-50°C', cool: '27-28°C', work: '31-32°C' },
        milk: { melt: '40-45°C', cool: '26-27°C', work: '29-30°C' },
        white: { melt: '40-45°C', cool: '25-26°C', work: '27-28°C' }
    };

    tempBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tempBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const type = btn.dataset.type;
            if (tempMelt) tempMelt.textContent = tempData[type].melt;
            if (tempCool) tempCool.textContent = tempData[type].cool;
            if (tempWork) tempWork.textContent = tempData[type].work;
        });
    });

    // 2. Conversor Chef
    const convGrams = document.getElementById('conv-grams');
    const convIngredient = document.getElementById('conv-ingredient');
    const resCups = document.getElementById('res-cups');
    const resSpoons = document.getElementById('res-spoons');

    const densities = {
        farinha: 120, // 1 xícara = 120g
        acucar: 200,  // 1 xícara = 200g
        manteiga: 200,// 1 xícara = 200g
        leite: 240,   // 1 xícara = 240g
        cacau: 90     // 1 xícara = 90g
    };

    function updateConversion() {
        const grams = parseFloat(convGrams.value) || 0;
        const ingredient = convIngredient.value;
        const cupWeight = densities[ingredient];

        if (grams <= 0) {
            resCups.textContent = '0';
            resSpoons.textContent = '0';
            return;
        }

        const cups = (grams / cupWeight).toFixed(1);
        const spoons = (grams / (cupWeight / 16)).toFixed(1); // 1 xícara = 16 colheres (sopa) aprox

        resCups.textContent = cups;
        resSpoons.textContent = spoons;
    }

    convGrams.addEventListener('input', updateConversion);
    convIngredient.addEventListener('change', updateConversion);
});
