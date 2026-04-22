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
        // --- SALGADOS & MASSAS (Receitas) ---
        {
            id: 'pasta-1', section: 'receitas', level: 'iniciante', type: 'massas', filter: 'rapido',
            title: 'Pasta Al Limone', desc: 'Refrescante e pronto em minutos.', tag: '15 min', yield: '2 pessoas',
            img: 'assets/recipe_pasta.png',
            ingredients: ['200g Spaghetti', 'Suco de 2 limões sicilianos', '50g Parmesão', 'Azeite extra virgem', 'Sal e Pimenta'],
            method: ['Cozinhe a massa em água salgada.', 'Em uma frigideira, misture o azeite e o suco de limão.', 'Transfira a massa para a frigideira com um pouco da água do cozimento.', 'Finalize com parmesão e pimenta.']
        },
        {
            id: 'panqueca-1', section: 'receitas', level: 'iniciante', type: 'massas', filter: 'economico',
            title: 'Panqueca Simples', desc: 'Massa leve e versátil para qualquer recheio.', tag: '20 min', yield: '4 pessoas',
            img: 'https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?auto=format&fit=crop&w=800&q=60',
            ingredients: ['1 xícara de farinha', '1 ovo', '1 xícara de leite', '1 pitada de sal'],
            method: ['Misture todos os ingredientes até ficar homogêneo.', 'Despeje pequenas porções na frigideira untada.', 'Doure dos dois lados.', 'Recheie a gosto (carne, queijo ou doce).']
        },
        {
            id: 'molho-branco-1', section: 'receitas', level: 'intermediario', type: 'massas', filter: 'rapido',
            title: 'Macarrão ao Molho Branco', desc: 'Clássico molho béchamel cremoso.', tag: '25 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1645112481338-3561ec9dbada?auto=format&fit=crop&w=800&q=60',
            ingredients: ['250g de macarrão', '2 colheres de manteiga', '2 colheres de farinha', '500ml de leite', 'Sal, pimenta e noz-moscada', 'Queijo ralado'],
            method: ['Cozinhe o macarrão al dente.', 'Prepare o molho branco derretendo manteiga e misturando a farinha.', 'Adicione o leite aos poucos mexendo sempre.', 'Tempere e deixe engrossar.', 'Misture com o macarrão e finalize com queijo.']
        },
        {
            id: 'frango-forno-1', section: 'receitas', level: 'intermediario', type: 'carnes', filter: 'saudavel',
            title: 'Frango ao Forno com Batatas', desc: 'Praticidade e sabor em um só prato.', tag: '60 min', yield: '4 pessoas',
            img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=800&q=60',
            ingredients: ['1kg de frango (coxa e sobrecoxa)', '4 batatas médias', 'Alho, sal e pimenta', 'Azeite de oliva'],
            method: ['Tempere o frango com alho, sal e pimenta.', 'Corte as batatas em cubos e tempere também.', 'Disponha em um refratário com azeite.', 'Leve ao forno a 200°C por cerca de 1 hora até dourar.']
        },
        {
            id: 'risoto-cogumelos-1', section: 'receitas', level: 'avancado', type: 'vegetariano', filter: 'saudavel',
            title: 'Risoto de Cogumelos', desc: 'A sofisticação do arroz arbóreo com mix de funghi.', tag: '40 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=60',
            ingredients: ['1 xícara de arroz arbóreo', '200g de cogumelos frescos', '1/2 cebola picada', '1/2 xícara de vinho branco', '1 litro de caldo de legumes', 'Manteiga e parmesão'],
            method: ['Refogue a cebola e os cogumelos na manteiga.', 'Adicione o arroz e o vinho, mexendo até evaporar.', 'Acrescente o caldo quente concha por concha, mexendo sempre.', 'Quando estiver cremoso, finalize com manteiga fria e queijo.']
        },
        {
            id: 'carne-assada-1', section: 'receitas', level: 'avancado', type: 'carnes', filter: '',
            title: 'Carne Assada com Molho', desc: 'Carne macia com molho de vinho encorpado.', tag: '90 min', yield: '6 pessoas',
            img: 'https://images.unsplash.com/photo-1558030006-45ef67561494?auto=format&fit=crop&w=800&q=60',
            ingredients: ['1kg de carne (Maminha ou Alcatra)', 'Alho, sal e pimenta', '1 cebola grande', '1 xícara de vinho tinto', '1 colher de farinha'],
            method: ['Tempere e sele a carne em todos os lados na panela de pressão ou forno.', 'Leve ao forno por 1 hora coberta com papel alumínio.', 'Prepare o molho com o fundo da carne, cebola, vinho e um toque de farinha.', 'Sirva a carne fatiada com o molho por cima.']
        },

        // --- DOCES (Ateliê) ---
        {
            id: 'doce-brigadeiro', section: 'confeitaria', level: 'iniciante', type: 'sobremesas', filter: 'rapido',
            title: 'Brigadeiro Tradicional', desc: 'O queridinho do Brasil com toque gourmet.', tag: '15 min', yield: '12 unidades',
            img: 'https://images.unsplash.com/photo-1541920483524-9984d469c550?auto=format&fit=crop&w=800&q=60',
            ingredients: ['1 lata de leite condensado', '1 colher de manteiga', '3 colheres de chocolate em pó', 'Granulado de chocolate belga'],
            method: ['Coloque leite condensado, manteiga e chocolate na panela.', 'Cozinhe em fogo médio, mexendo sempre sem parar.', 'Quando a massa desgrudar do fundo, desligue o fogo.', 'Deixe esfriar em um prato, enrole e passe no granulado.']
        },
        {
            id: 'banana-caramel-1', section: 'confeitaria', level: 'iniciante', type: 'sobremesas', filter: 'economico',
            title: 'Banana Caramelizada', desc: 'Sobremesa clássica que derrete na boca.', tag: '15 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1514849302-984523450cf4?auto=format&fit=crop&w=800&q=60',
            ingredients: ['3 bananas maduras', '1/2 xícara de açúcar', '1/4 xícara de água'],
            method: ['Derreta o açúcar em fogo baixo até formar um caramelo dourado.', 'Adicione a água com cuidado para não espirrar.', 'Coloque as bananas cortadas ao meio ou em rodelas.', 'Cozinhe até ficarem macias e cobertas pelo caramelo.']
        },
        {
            id: 'doce-2', section: 'confeitaria', level: 'intermediario', type: 'bolos', filter: 'economico',
            title: 'Bolo de Cenoura', desc: 'Massa fofinha com aquela cobertura de chocolate crocante.', tag: '50 min', yield: '10 pessoas',
            img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60',
            ingredients: ['3 cenouras médias', '3 ovos', '1 xícara de óleo', '2 xícaras de açúcar', '2 xícaras de farinha', '1 colher de fermento', 'Cobertura: Manteiga, Chocolate e Leite'],
            method: ['Bata cenoura, ovos e óleo no liquidificador.', 'Em uma tigela, misture com açúcar, farinha e fermento.', 'Asse em forno preaquecido a 180°C por 40 minutos.', 'Prepare a cobertura de chocolate e despeje ainda quente sobre o bolo.']
        },
        {
            id: 'torta-limao-1', section: 'confeitaria', level: 'avancado', type: 'sobremesas', filter: 'sem-gluten',
            title: 'Torta de Limão com Merengue', desc: 'O equilíbrio perfeito entre o ácido e o doce.', tag: '60 min', yield: '8 pessoas',
            img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=60',
            ingredients: ['Base: 200g biscoito maizena e 100g manteiga', 'Recheio: 1 lata leite condensado e suco de 3 limões', 'Merengue: 3 claras e 1/2 xícara de açúcar'],
            method: ['Triture o biscoito e misture com manteiga; forre a forma e asse 10 min.', 'Misture o leite condensado com o limão e coloque sobre a base fria.', 'Bata as claras em neve com açúcar até o ponto de merengue firme.', 'Cubra a torta e leve ao forno rapidamente ou use um maçarico para dourar.']
        },

        // --- CINE GOURMET (Filmes & Séries) ---
        {
            id: 'cine-ratatouille', section: 'filmes', level: 'intermediario', type: 'animacoes', filter: 'replica',
            title: 'Ratatouille (Remy)', desc: 'A famosa receita de Confit Byaldi que encantou o crítico Ego.', tag: '90 min', yield: '4 pessoas',
            img: 'assets/ratatouille.png',
            ingredients: ['1 abobrinha', '1 berinjela', '2 tomates romas', '1 pimentão amarelo', 'Molho de tomate caseiro', 'Alho, azeite, sal e tomilho'],
            method: ['Corte os legumes em fatias bem finas e uniformes.', 'Espalhe o molho de tomate no fundo de uma assadeira redonda.', 'Organize os legumes intercalando as cores em formato de espiral.', 'Tempere com sal, muito azeite e ervas frescas.', 'Cubra com papel alumínio e asse por 40 min a 180°C; depois gratine sem papel.']
        },
        {
            id: 'cine-matilda', section: 'filmes', level: 'intermediario', type: 'classicos', filter: 'replica',
            title: 'Bolo da Matilda', desc: 'Aquele bolo de chocolate úmido e exagerado que Bruce Bogtrotter enfrentou.', tag: '45 min', yield: '10 pessoas',
            img: 'assets/matilda_cake.png',
            ingredients: ['2 xícaras de farinha', '1 xícara de açúcar', '1 xícara de chocolate em pó 50%', '3 ovos', '1 xícara de leite', '1/2 xícara de óleo', '1 colher de fermento'],
            method: ['Bata os ovos com açúcar e óleo.', 'Adicione o leite e o chocolate, misturando bem.', 'Incorpore a farinha peneirada e por fim o fermento.', 'Asse a 180°C por 35 minutos.', 'Cubra com uma ganache de chocolate bem espessa e brilhante.']
        },
        {
            id: 'cine-american-pie', section: 'filmes', level: 'iniciante', type: 'classicos', filter: 'replica',
            title: 'Torta de Maçã American Pie', desc: 'A clássica torta americana, quentinha e com aroma de canela.', tag: '50 min', yield: '6 pessoas',
            img: 'assets/apple_pie.png',
            ingredients: ['Massa pronta para torta', '4 maçãs grandes fatiadas', '1/2 xícara de açúcar', 'Canela a gosto', 'Suco de 1 limão'],
            method: ['Misture as maçãs fatiadas com açúcar, canela e limão.', 'Forre a forma com a massa e coloque o recheio.', 'Cubra com outra camada de massa (faça trançado se preferir).', 'Asse a 180°C por cerca de 40 minutos até dourar.']
        },
        {
            id: 'cine-chef', section: 'filmes', level: 'iniciante', type: 'classicos', filter: 'replica',
            title: 'Sanduíche Cubano (Chef)', desc: 'O sanduíche que deu vida ao food truck de El Jefe.', tag: '20 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=60',
            ingredients: ['Pão ciabatta ou francês', 'Carne de porco assada e desfiada', 'Fatias de presunto', 'Queijo suíço', 'Picles de pepino', 'Mostarda amarela'],
            method: ['Abra o pão e espalhe mostarda generosamente.', 'Monte as camadas: porco, presunto, queijo e picles.', 'Pressione o sanduíche em uma chapa quente com manteiga.', 'Grelhe até o pão ficar bem crocante e o queijo derretido.']
        },
        {
            id: 'cine-dama-vagabundo', section: 'filmes', level: 'iniciante', type: 'animacoes', filter: 'replica',
            title: 'Spaghetti com Almôndegas', desc: 'Para um jantar romântico como o de A Dama e o Vagabundo.', tag: '40 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=60',
            ingredients: ['Espaguete número 5', 'Molho de tomate pelado', 'Almôndegas: Carne moída, alho, sal e 1 ovo', 'Manjericão fresco'],
            method: ['Prepare as almôndegas temperando a carne e modelando pequenas bolas.', 'Frite as almôndegas e reserve.', 'Cozinhe o espaguete em água fervente salgada.', 'Aqueça o molho, adicione as almôndegas e misture a massa delicadamente.']
        },
        {
            id: 'cine-harry-potter', section: 'filmes', level: 'intermediario', type: 'fantasia', filter: 'inspirada',
            title: 'Café Inglês (Harry Potter)', desc: 'Um banquete digno do Salão Principal de Hogwarts.', tag: '30 min', yield: '2 pessoas',
            img: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=60',
            ingredients: ['Ovos', 'Bacon em fatias', 'Salsichas tipo inglesa', 'Feijão em molho de tomate (baked beans)', 'Pão de forma para torradas'],
            method: ['Frite o bacon até ficar crocante e as salsichas até dourarem.', 'Prepare os ovos (podem ser mexidos ou fritos com gema mole).', 'Aqueça o feijão em uma panela pequena.', 'Sirva tudo em um prato grande acompanhado de torradas bem quentes.']
        },
        {
            id: 'cine-historias-cruzadas', section: 'filmes', level: 'avancado', type: 'classicos', filter: 'replica',
            title: 'Frango Frito do Sul', desc: 'O segredo da Minnie para o melhor frango frito do Mississipi.', tag: '60 min', yield: '4 pessoas',
            img: 'https://images.unsplash.com/photo-1569058242253-92a9c71f9867?auto=format&fit=crop&w=800&q=60',
            ingredients: ['Coxas e sobrecoxas de frango', 'Farinha de trigo', 'Páprica, pimenta e sal', 'Leite ou Buttermilk para marinar'],
            method: ['Deixe o frango marinar no leite com temperos por pelo menos 1 hora.', 'Passe os pedaços de frango na farinha bem temperada.', 'Frite em óleo quente (ou gordura vegetal) até ficar dourado e crocante.', 'Escorra em papel toalha e sirva quente.']
        },
        {
            id: 'cine-julie-julia', section: 'filmes', level: 'iniciante', type: 'classicos', filter: 'replica',
            title: 'Omelete de Julie & Julia', desc: 'A simplicidade francesa dominada pela técnica.', tag: '10 min', yield: '1 pessoa',
            img: 'https://images.unsplash.com/photo-1510629954389-c1e0da47d414?auto=format&fit=crop&w=800&q=60',
            ingredients: ['3 ovos frescos', '1 colher de manteiga sem sal', '1 pitada de sal', 'Ervas finas (opcional)'],
            method: ['Bata os ovos levemente com sal.', 'Derreta a manteiga em uma frigideira antiaderente em fogo médio.', 'Despeje os ovos e mexa rapidamente com um garfo no centro.', 'Dobre a omelete antes que endureça totalmente; ela deve ficar cremosa por dentro.']
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
        const homeSection = document.getElementById('home');
        const aboutSection = document.getElementById('sobre');
        const navLinks = document.querySelectorAll('.nav-link');

        const bgMap = {
            receitas: 'hub-bg-receitas',
            filmes: 'hub-bg-filmes',
            confeitaria: 'hub-bg-confeitaria'
        };

        function switchUniverse(target) {
            // Ocultar Home e Sobre
            if (homeSection) homeSection.style.display = 'none';
            if (aboutSection) aboutSection.style.display = 'none';

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

        // Eventos para os links de navegação principais (Home e Dicas)
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#home' || href === '#sobre') {
                    // Mostrar Home/Sobre e ocultar o resto
                    if (homeSection) homeSection.style.display = 'block';
                    if (aboutSection) aboutSection.style.display = 'block';
                    hubSection.style.display = 'none';
                    tipsSection.style.display = 'none';
                } else if (href === '#receitas-hub' || href === '#dicas') {
                    // Se clicar em Dicas diretamente, também ocultamos a home/sobre
                    if (homeSection) homeSection.style.display = 'none';
                    if (aboutSection) aboutSection.style.display = 'none';
                    hubSection.style.display = 'block';
                    tipsSection.style.display = 'block';
                }
            });
        });
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
