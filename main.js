// --- ESTADO GLOBAL DA APLICAÇÃO ---
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
    level: 'iniciante',
    restrictions: [],
    favorites: [],
    following: []
};
if (!userPreferences.following) userPreferences.following = [];

let allComments = JSON.parse(localStorage.getItem('allComments')) || [
    { id: 101, user: "Chef Helena", text: "Acabei de postar a minha versão da Lasanha à Bolonhesa! Segue para acompanhar as próximas dicas.", date: "5 min atrás", type: "status" },
    { id: 102, user: "Gourmet Victor", text: "Alguém sabe onde encontro o pistache ideal para o brigadeiro?", date: "1 hora atrás", type: "status" },
    { id: 103, user: "Cineasta Maria", text: "O Ratatouille do filme é uma obra de arte, tentei fazer e ficou igualzinho!", date: "3 horas atrás", type: "status" }
];

let RECIPES_DATABASE = [
    // --- GASTRONÔMICO (Massas e Almoço) ---
    {
        id: 11, section: 'gastronomico', category: 'Pratos principais', level: 'intermediario', rating: 'generico',
        title: "Lasanha Clássica à Bolonhesa", movie: "Cozinha Tradicional", time: "60 min", cost: "Médio", yield: "6 porções",
        img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80", basePortion: 6,
        ingredients: [
            { item: "Massa de lasanha", qty: 500, unit: "g" },
            { item: "Carne moída", qty: 600, unit: "g" },
            { item: "Molho de tomate", qty: 800, unit: "ml" },
            { item: "Queijo mussarela", qty: 400, unit: "g" }
        ],
        method: ["Prepare o molho bolonhesa.", "Monte as camadas com massa, molho e queijo.", "Asse por 40 minutos."],
        extra: "Um almoço de domingo inesquecível."
    },
    {
        id: 12, section: 'gastronomico', category: 'Pratos principais', level: 'iniciante', rating: 'premium',
        title: "Espaguete à Carbonara Autêntico", movie: "Sabor da Itália", time: "20 min", cost: "Baixo", yield: "2 porções",
        img: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80", basePortion: 2,
        ingredients: [
            { item: "Espaguete", qty: 200, unit: "g" },
            { item: "Pancetta ou Guanciale", qty: 100, unit: "g" },
            { item: "Gemas de ovo", qty: 3, unit: "un" },
            { item: "Pecorino Romano", qty: 50, unit: "g" }
        ],
        method: ["Frite a pancetta.", "Misture as gemas com o queijo.", "Junte a massa quente e misture rapidamente."],
        extra: "O segredo é a cremosidade do ovo, sem creme de leite!"
    },
    {
        id: 13, section: 'gastronomico', category: 'Pratos principais', level: 'intermediario', rating: 'generico',
        title: "Risoto de Cogumelos Selvagens", movie: "Cozinha da Terra", time: "40 min", cost: "Médio", yield: "2 porções",
        img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=800&q=80", basePortion: 2,
        ingredients: [
            { item: "Arroz arbóreo", qty: 200, unit: "g" },
            { item: "Cogumelos variados", qty: 300, unit: "g" },
            { item: "Vinho branco seco", qty: 100, unit: "ml" },
            { item: "Caldo de legumes", qty: 1, unit: "L" }
        ],
        method: ["Refogue os cogumelos.", "Toste o arroz e adicione o vinho.", "Adicione o caldo aos poucos, mexendo sempre."],
        extra: "Paciência e carinho resultam no risoto perfeito."
    },
    {
        id: 21, section: 'gastronomico', category: 'Pratos principais', level: 'iniciante', rating: 'generico',
        title: "Nhoque de Batata Caseiro", movie: "Tradição Italiana", time: "45 min", cost: "Baixo", yield: "4 porções",
        img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80", basePortion: 4,
        ingredients: [
            { item: "Batatas", qty: 1, unit: "kg" },
            { item: "Farinha de trigo", qty: 300, unit: "g" },
            { item: "Ovo", qty: 1, unit: "un" }
        ],
        method: ["Cozinhe e amasse as batatas.", "Misture com o ovo e farinha até dar ponto.", "Modele e cozinhe em água fervente."],
        extra: "Sirva com molho de tomate fresco e manjericão."
    },

    // --- ATELIÊ (Doces) ---
    {
        id: 14, section: 'atelie', category: 'Sobremesas', level: 'iniciante', rating: 'generico',
        title: "Brigadeiro Gourmet de Pistache", movie: "Doçaria Fina", time: "30 min", cost: "Médio", yield: "20 unidades",
        img: "https://images.unsplash.com/photo-1548506062-299030e9bb4a?auto=format&fit=crop&w=800&q=80", basePortion: 20,
        ingredients: [
            { item: "Leite condensado", qty: 395, unit: "g" },
            { item: "Creme de leite", qty: 200, unit: "g" },
            { item: "Pasta de pistache", qty: 50, unit: "g" },
            { item: "Pistache picado", qty: 100, unit: "g" }
        ],
        method: ["Misture o leite condensado, creme e pasta.", "Cozinhe em fogo baixo até desgrudar da panela.", "Enrole e passe no pistache picado."],
        extra: "Uma versão sofisticada do clássico brasileiro."
    },
    {
        id: 15, section: 'atelie', category: 'Sobremesas', level: 'intermediario', rating: 'premium',
        title: "Petit Gâteau com Calda Quente", movie: "Sobremesas Francesas", time: "15 min", cost: "Baixo", yield: "4 unidades",
        img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=800&q=80", basePortion: 4,
        ingredients: [
            { item: "Chocolate amargo", qty: 200, unit: "g" },
            { item: "Manteiga", qty: 100, unit: "g" },
            { item: "Ovos", qty: 2, unit: "un" },
            { item: "Açúcar", qty: 50, unit: "g" }
        ],
        method: ["Derreta o chocolate com a manteiga.", "Bata os ovos com o açúcar.", "Misture tudo e asse por apenas 8 minutos."],
        extra: "O centro deve ficar líquido e apaixonante."
    },
    {
        id: 16, section: 'atelie', category: 'Sobremesas', level: 'avancado', rating: 'premium',
        title: "Macarons de Lavanda e Mel", movie: "Confeitaria de Luxo", time: "120 min", cost: "Alto", yield: "12 unidades",
        img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&q=80", basePortion: 12,
        ingredients: [
            { item: "Farinha de amêndoas", qty: 125, unit: "g" },
            { item: "Açúcar de confeiteiro", qty: 125, unit: "g" },
            { item: "Claras de ovo", qty: 2, unit: "un" },
            { item: "Essência de lavanda", qty: 5, unit: "ml" }
        ],
        method: ["Peneire os secos.", "Faça o merengue suíço.", "Macarone a massa até o ponto de fita e asse com cuidado."],
        extra: "O desafio final de qualquer confeiteiro."
    },
    {
        id: 22, section: 'atelie', category: 'Sobremesas', level: 'intermediario', rating: 'generico',
        title: "Torta de Limão Merengada", movie: "Clássicos do Ateliê", time: "60 min", cost: "Baixo", yield: "8 fatias",
        img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=800&q=80", basePortion: 8,
        ingredients: [
            { item: "Biscoito maisena", qty: 200, unit: "g" },
            { item: "Leite condensado", qty: 395, unit: "g" },
            { item: "Suco de limão", qty: 100, unit: "ml" },
            { item: "Claras", qty: 3, unit: "un" }
        ],
        method: ["Faça a base com biscoito e manteiga.", "Misture o creme de limão.", "Cubra com merengue e doure."],
        extra: "O equilíbrio perfeito entre o azedo e o doce."
    },

    // --- CINE GOURMET (Filmes) ---
    {
        id: 17, section: 'cine', category: 'Pratos principais', level: 'intermediario', rating: 'premium',
        title: "Royale with Cheese (Pulp Fiction)", movie: "Pulp Fiction", time: "25 min", cost: "Baixo", yield: "1 porção",
        img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", basePortion: 1,
        ingredients: [
            { item: "Carne bovina", qty: 200, unit: "g" },
            { item: "Pão de hambúrguer", qty: 1, unit: "un" },
            { item: "Queijo Cheddar", qty: 2, unit: "fatias" }
        ],
        method: ["Grelhe a carne ao ponto desejado.", "Derreta o queijo sobre a carne.", "Monte com picles e mostarda."],
        extra: "Como Vincent Vega diria: é assim que eles chamam em Paris."
    },
    {
        id: 18, section: 'cine', category: 'Acompanhamentos', level: 'avancado', rating: 'premium',
        title: "Ratatouille de Confit", movie: "Ratatouille", time: "60 min", cost: "Baixo", yield: "4 porções",
        img: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?auto=format&fit=crop&w=800&q=80", basePortion: 4,
        ingredients: [
            { item: "Abobrinha", qty: 1, unit: "un" },
            { item: "Berinjela", qty: 1, unit: "un" },
            { item: "Tomate", qty: 3, unit: "un" }
        ],
        method: ["Fatie os legumes finamente.", "Arrume em espiral sobre molho de pimentão.", "Asse lentamente coberto por papel manteiga."],
        extra: "A receita de Thomas Keller para o filme da Pixar."
    },
    {
        id: 19, section: 'cine', category: 'Bebidas', level: 'iniciante', rating: 'generico',
        title: "Cerveja Amanteigada (Harry Potter)", movie: "Harry Potter", time: "10 min", cost: "Baixo", yield: "2 canecas",
        img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80", basePortion: 2,
        ingredients: [
            { item: "Refrigerante de baunilha", qty: 500, unit: "ml" },
            { item: "Essência de manteiga", qty: 5, unit: "ml" },
            { item: "Caramelo líquido", qty: 30, unit: "ml" },
            { item: "Chantilly", qty: 100, unit: "g" }
        ],
        method: ["Misture o refrigerante com o caramelo e essência.", "Sirva gelado.", "Cubra com uma generosa camada de chantilly."],
        extra: "Diretamente do Três Vassouras para sua casa."
    },
    {
        id: 20, section: 'cine', category: 'Bebidas', level: 'iniciante', rating: 'premium',
        title: "Milkshake de 5 Dólares", movie: "Pulp Fiction", time: "5 min", cost: "Médio", yield: "1 copo",
        img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", basePortion: 1,
        ingredients: [
            { item: "Sorvete de baunilha", qty: 3, unit: "bolas" },
            { item: "Leite", qty: 100, unit: "ml" },
            { item: "Cereja em calda", qty: 1, unit: "un" }
        ],
        method: ["Bata o sorvete com o leite.", "Sirva em um copo alto.", "Finalize com a cereja no topo."],
        extra: "Vale cada centavo, como diria Mia Wallace."
    }
];

let activeRecipe = null;
let openRecipesList = []; // Lista de IDs das receitas abertas em abas
let currentPortions = 1;
let currentStepIndex = 0;
let currentSteps = [];
let activeTimer = null;
let currentCategory = 'home';
let currentLevel = 'iniciante';
let currentType = 'todos';
let theme = localStorage.getItem('theme') || 'light';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const masterTabBtns = document.querySelectorAll('.master-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const levelTabs = document.querySelectorAll('.level-tab');
    const recipeModal = document.getElementById('recipe-modal');
    const communityFeed = document.getElementById('communityFeed');
    
    // Filtros de Refinamento
    const REFINE_FILTERS = {
        'Tempo': ['< 15 min', '15-30 min', '30-60 min', '> 60 min'],
        'Custo': ['Baixo', 'Médio', 'Alto'],
        'Dieta': ['Vegetariano', 'Low Carb', 'Sem Glúten', 'Vegano'],
        'Cozinha': ['Italiana', 'Francesa', 'Americana', 'Brasileira', 'Asiática'],
        'Ocasiao': ['Jantar Romântico', 'Família', 'Rápido', 'Festa'],
        'Metodo': ['Forno', 'Frigideira', 'Fogão', 'Sem Cozimento']
    };

    // --- GERENCIAMENTO DO PAINEL DE REFINAR ---
    const refineOverlay = document.getElementById('refine-overlay');
    const closeRefine = document.getElementById('close-refine');
    const btnRefine = document.querySelectorAll('.btn-refine');

    function openRefine() {
        const bodyPanel = refineOverlay.querySelector('.refine-body');
        bodyPanel.innerHTML = Object.entries(REFINE_FILTERS).map(([key, options]) => `
            <div class="refine-group">
                <h4>${key}</h4>
                <div class="refine-options">
                    ${options.map(opt => `<button class="refine-opt">${opt}</button>`).join('')}
                </div>
            </div>
        `).join('');

        refineOverlay.classList.add('active');
        body.style.overflow = 'hidden';
        
        // Listener para botões de opção
        bodyPanel.querySelectorAll('.refine-opt').forEach(opt => {
            opt.onclick = () => opt.classList.toggle('active');
        });
    }

    btnRefine.forEach(btn => btn.onclick = openRefine);
    closeRefine.onclick = () => closeModalWindow(refineOverlay);
    document.getElementById('apply-filters').onclick = () => closeModalWindow(refineOverlay);

    // --- PERFIL E PREFERÊNCIAS ---
    const profileModal = document.getElementById('profile-modal');
    const btnProfile = document.getElementById('btnProfile');
    const closeProfile = document.getElementById('closeProfile');
    const savePreferences = document.getElementById('savePreferences');
    const loginForm = document.getElementById('loginForm');

    // Troca de abas no Modal de Perfil
    const profileTabBtns = profileModal.querySelectorAll('.inner-tab-btn');
    const profileTabContents = profileModal.querySelectorAll('.inner-tab-content');

    profileTabBtns.forEach(btn => {
        btn.onclick = () => {
            profileTabBtns.forEach(b => b.classList.remove('active'));
            profileTabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            profileModal.querySelector(`#tab-${btn.dataset.tab}`).classList.add('active');
        };
    });

    btnProfile.onclick = () => {
        const defaultTab = currentUser ? 'preferences' : 'login';
        profileTabBtns.forEach(b => b.classList.toggle('active', b.dataset.tab === defaultTab));
        profileTabContents.forEach(c => c.classList.toggle('active', c.id === `tab-${defaultTab}`));

        profileModal.classList.add('active');
        body.style.overflow = 'hidden';
    };

    closeProfile.onclick = () => closeModalWindow(profileModal);

    // Handler de Login
    if (loginForm) {
        loginForm.onsubmit = (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            // Simulação de envio e sucesso
            alert(`Enviado com sucesso! Um link de acesso foi enviado para ${email}`);
            closeModalWindow(profileModal);
        };
    }

    document.querySelectorAll('.refine-opt').forEach(opt => {
        opt.onclick = () => {
            if (opt.parentElement.id === 'pref-level') {
                opt.parentElement.querySelectorAll('.refine-opt').forEach(o => o.classList.remove('active'));
            }
            opt.classList.toggle('active');
        };
    });

    savePreferences.onclick = () => {
        const nameInput = document.getElementById('editUserName');
        const level = document.querySelector('#pref-level .refine-opt.active')?.dataset.val || 'iniciante';
        const restrictions = Array.from(document.querySelectorAll('#pref-restrictions .refine-opt.active')).map(o => o.dataset.val);
        
        currentUser = { name: nameInput.value || "Visitante" };
        userPreferences = { level, restrictions, favorites: userPreferences.favorites };
        
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        
        closeModalWindow(profileModal);
        updateProfileUI();
        renderGrid();
        alert('Perfil atualizado!');
    };

    // --- SISTEMA DE PERFIL ---
    const kitchenUserName = document.getElementById('kitchenUserName');
    const userNameTop = document.getElementById('userNameTop');

    function updateProfileUI() {
        if (currentUser) {
            if (userNameTop) userNameTop.textContent = currentUser.name;
        }
    }
    updateProfileUI();

    // --- LOGOUT (Opcional, no Perfil) ---
    window.logout = () => {
        localStorage.removeItem('currentUser');
        location.reload();
    };

    // --- GERENCIAMENTO DE ABAS PRINCIPAIS ---
    function switchMasterTab(targetId) {
        // Fechar qualquer modal aberto ao trocar de aba principal
        document.querySelectorAll('.modal, .assistant-overlay, .refine-overlay').forEach(m => {
            closeModalWindow(m);
        });

        masterTabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.target === targetId));
        tabContents.forEach(content => content.classList.toggle('active', content.id === targetId));
        
        const sectionId = targetId.split('-')[0];
        
        // Remove temas antigos e aplica o novo
        body.classList.remove('theme-home', 'theme-gastronomico', 'theme-cine', 'theme-atelie', 'theme-comunidade');
        body.classList.add(`theme-${sectionId}`);

        currentCategory = sectionId;
        currentType = 'todos'; // Resetar filtro de tipo ao trocar de aba
        if (sectionId !== 'home' && sectionId !== 'comunidade') {
            renderTypes(sectionId);
            renderGrid();
        }
        window.scrollTo(0, 0);
    }

    masterTabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchMasterTab(btn.dataset.target));
    });

    // --- FILTROS DE NÍVEL ---
    levelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const parent = tab.closest('.category-page');
            parent.querySelectorAll('.level-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentLevel = tab.dataset.level;
            renderGrid();
        });
    });

    // --- FILTROS DE TIPO (DINÂMICOS) ---
    function renderTypes(sectionId) {
        const container = document.getElementById(`types-${sectionId}`);
        if (!container) return;
        
        container.innerHTML = `<button class="type-btn active" data-type="todos">🌟 Todos</button>` + 
            TYPES_LIST.map(type => `<button class="type-btn" data-type="${type}">${type}</button>`).join('');

        container.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                container.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentType = btn.dataset.type;
                renderGrid();
            });
        });
    }

    window.showFavoritesInKitchen = () => {
        const gridContainer = document.getElementById('kitchenResults');
        if (!gridContainer) return;

        const filtered = RECIPES_DATABASE.filter(r => userPreferences.favorites.includes(r.id));
        
        if (filtered.length === 0) {
            gridContainer.innerHTML = `<div class="empty-msg" style="grid-column: 1/-1; text-align: center; padding: 40px;">Você ainda não tem receitas favoritas.</div>`;
            return;
        }

        gridContainer.innerHTML = `
            <div style="grid-column: 1/-1; margin-bottom: 20px;"><h3>Suas Receitas Favoritas ❤️</h3></div>
            ${filtered.map(r => `
                <div class="recipe-card animate-in" data-id="${r.id}">
                    <div class="card-img-area">
                        <img src="${r.img}" alt="${r.title}">
                        <button class="btn-fav active" onclick="toggleFavorite(event, ${r.id})">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="card-info">
                        <span class="card-movie-title">${r.movie}</span>
                        <h3>${r.title}</h3>
                    </div>
                </div>
            `).join('')}
        `;
        
        gridContainer.scrollIntoView({ behavior: 'smooth' });
    };

    // --- RENDERIZAÇÃO DO GRID ---
    function renderGrid() {
        if (currentCategory === 'home' || currentCategory === 'comunidade') return;
        const gridId = `grid-${currentCategory}`;
        const gridContainer = document.getElementById(gridId);
        if (!gridContainer) return;

        const filtered = RECIPES_DATABASE.filter(r => {
            const matchesCategory = r.section === currentCategory;
            const matchesType = (currentType === 'todos' || r.category === currentType);
            return matchesCategory && matchesType;
        });

        // Ordenar por nível de habilidade preferido do usuário
        filtered.sort((a, b) => {
            if (a.level === userPreferences.level) return -1;
            if (b.level === userPreferences.level) return 1;
            return 0;
        });

        if (filtered.length === 0) {
            gridContainer.innerHTML = `<div class="empty-msg">Nenhuma receita encontrada para este nível de ${currentType}.</div>`;
            return;
        }

        gridContainer.innerHTML = filtered.map(r => {
            const isFav = userPreferences.favorites.includes(r.id);
            return `
                <div class="recipe-card animate-in" data-id="${r.id}">
                    <div class="card-img-area">
                        <img src="${r.img}" alt="${r.title}">
                        ${r.rating === 'premium' ? '<span class="tag-premium">✨ Premium</span>' : ''}
                        <button class="btn-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, ${r.id})">
                            <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                    <div class="card-info">
                        <span class="card-movie-title">${r.movie}</span>
                        <h3>${r.title}</h3>
                        <div class="card-meta">
                            <span><i class="far fa-clock"></i> ${r.time}</span> | 
                            <span><i class="fas fa-users"></i> ${r.yield || r.basePortion}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderHomeFeatured() {
        const homeGrid = document.getElementById('grid-featured-home');
        if (!homeGrid) return;

        // Mostrar TODAS as receitas na Home para acesso imediato
        const allRecipes = RECIPES_DATABASE;

        homeGrid.innerHTML = allRecipes.map(r => {
            const isFav = userPreferences.favorites.includes(r.id);
            return `
                <div class="recipe-card animate-in" data-id="${r.id}">
                    <div class="card-img-area">
                        <img src="${r.img}" alt="${r.title}">
                        ${r.rating === 'premium' ? '<span class="tag-premium">✨ Premium</span>' : ''}
                        <button class="btn-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, ${r.id})">
                            <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                        </button>
                    </div>
                    <div class="card-info">
                        <span class="card-movie-title">${r.movie}</span>
                        <h3>${r.title}</h3>
                        <div class="card-meta">
                            <span><i class="far fa-clock"></i> ${r.time}</span> | 
                            <span><i class="fas fa-users"></i> ${r.yield || r.basePortion}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    window.toggleFavorite = (event, id) => {
        event.stopPropagation();
        if (userPreferences.favorites.includes(id)) {
            userPreferences.favorites = userPreferences.favorites.filter(fid => fid !== id);
        } else {
            userPreferences.favorites.push(id);
        }
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        renderGrid();
        if (document.getElementById('kitchenResults').innerHTML.includes('Favoritas')) {
            showFavoritesInKitchen();
        }
    };
    // Sugestão antiga removida
    
    // Configurações para a aba "Minha Cozinha"
    const btnKitchenSuggest = document.getElementById('btnKitchenSuggest');
    const btnKitchenImprovise = document.getElementById('btnKitchenImprovise');
    
    if (btnKitchenSuggest) {
        btnKitchenSuggest.onclick = () => suggestRecipes('standard', 'kitchenIngInput', 'kitchenResults');
    }
    if (btnKitchenImprovise) {
        btnKitchenImprovise.onclick = () => suggestRecipes('creative', 'kitchenIngInput', 'kitchenResults');
    }

    function suggestRecipes(mode = 'standard', inputId, outputId) {
        const input = document.getElementById(inputId);
        const output = document.getElementById(outputId);
        const query = input.value.toLowerCase();
        if (!query) return;
        
        const inputIngredients = query.split(',').map(i => i.trim()).filter(i => i !== "");
        
        // ... (resto da lógica de filtragem igual ao suggester anterior, adaptada para os inputs dinâmicos)
        let filtered = RECIPES_DATABASE.filter(r => {
            const matches = inputIngredients.filter(ing => r.ingredients.some(ri => 
                (typeof ri === 'string' ? ri : ri.item).toLowerCase().includes(ing)
            ));
            return mode === 'standard' ? matches.length >= 1 : (matches.length >= 1 && Math.random() > 0.3);
        });

        output.innerHTML = filtered.map(r => `
            <div class="recipe-card" data-id="${r.id}">
                <div class="card-img-area"><img src="${r.img}"></div>
                <div class="card-info"><h3>${r.title}</h3></div>
            </div>
        `).join('') || '<p>Nenhuma sugestão encontrada.</p>';
    }
    // Fim da lógica de sugestão
    // --- ASSISTENTE DE COZINHA (REAL-TIME) ---
    const assistantOverlay = document.getElementById('assistantOverlay');
    const closeAssistant = document.getElementById('closeAssistant');
    const btnStartAssistant = document.getElementById('btnStartAssistant');
    const assistantStepContent = document.getElementById('assistantStepContent');
    const timerBox = document.getElementById('timerBox');
    const btnPrevStep = document.getElementById('btnPrevStep');
    const btnNextStep = document.getElementById('btnNextStep');
    const btnVoice = document.getElementById('btnVoice');

    let currentSteps = [];
    let currentStepIndex = 0;
    let activeTimer = null;

    // --- MODAL DE DETALHES ---

    window.openRecipe = (id) => {
        // Agora NÃO removemos 'active' obrigatoriamente se já for o modal de receita, 
        // apenas garantimos que ele abra se estiver fechado.
        recipeModal.classList.add('active');
        body.style.overflow = 'hidden';

        const r = RECIPES_DATABASE.find(recipe => recipe.id === id) || allComments.find(c => c.id === id && c.type === 'recipe');
        if (!r) return;
        activeRecipe = r;
        currentPortions = r.basePortion || 1;

        // Adicionar à lista de abas se não estiver
        if (!openRecipesList.includes(id)) {
            openRecipesList.push(id);
        }
        renderRecipeTabs();

        btnStartAssistant.onclick = () => startAssistant(r);
        
        document.getElementById('modal-img').src = r.img;
        document.getElementById('modal-title').textContent = r.title;
        document.getElementById('modal-category').textContent = r.category || (r.section === 'comunidade' ? 'Comunidade' : 'Receita');
        document.getElementById('modal-level').textContent = r.level || 'N/A';
        document.getElementById('modal-time').textContent = r.time || 'N/A';
        document.getElementById('modal-cost').textContent = r.cost || 'Baixo';
        updatePortionsUI();

        document.getElementById('modal-extra-info').textContent = r.extra;
        
        // Popula aba de detalhes (utensílios e substituições)
        const detailsTab = document.getElementById('tab-details');
        detailsTab.innerHTML = `
            <div class="details-box">
                <h4><i class="fas fa-tools"></i> Utensílios Necessários</h4>
                <ul class="styled-list">
                    ${(r.utensils || ['Utensílios padrão de cozinha']).map(u => `<li>${u}</li>`).join('')}
                </ul>
            </div>
            ${r.substitutions ? `
            <div class="details-box" style="margin-top: 20px;">
                <h4><i class="fas fa-exchange-alt"></i> Substituições Possíveis</h4>
                <ul class="styled-list">
                    ${Object.entries(r.substitutions).map(([original, sub]) => `<li><b>${original}</b>: pode ser substituído por <b>${sub}</b></li>`).join('')}
                </ul>
            </div>
            ` : ''}
            <p style="margin-top: 20px;">${r.extra}</p>
        `;

        const movieTag = document.getElementById('modal-movie-tag');
        if (r.section === 'cine') {
            movieTag.classList.add('active'); // Use class instead of display if possible, or just keep it simple if movieTag is not a modal
            movieTag.style.display = 'block'; 
            movieTag.textContent = `🎬 Filme: ${r.movie}`;
        } else {
            movieTag.classList.remove('active');
            movieTag.style.display = 'none';
        }

        document.getElementById('modal-method-list').innerHTML = r.method.map(m => `<li>${m}</li>`).join('');

        recipeModal.classList.add('active');
        body.style.overflow = 'hidden';
    };

    function updatePortionsUI() {
        document.getElementById('modal-servings').textContent = currentPortions;
        renderIngredients(activeRecipe, currentPortions);
    }

    function renderIngredients(recipe, portions) {
        const list = document.getElementById('modal-ingredients-list');
        const ratio = portions / recipe.basePortion;
        
        list.innerHTML = recipe.ingredients.map(ing => {
            if (typeof ing === 'string') return `<li>${ing}</li>`;
            const finalQty = (ing.qty * ratio).toFixed(ing.qty % 1 === 0 ? 0 : 1);
            return `<li><b>${finalQty}${ing.unit}</b> ${ing.item}</li>`;
        }).join('');
    }

    document.getElementById('btnMorePortion').onclick = () => {
        currentPortions++;
        updatePortionsUI();
    };

    document.getElementById('btnLessPortion').onclick = () => {
        if (currentPortions > 1) {
            currentPortions--;
            updatePortionsUI();
        }
    };

    function renderRecipeTabs() {
        const tabsBar = document.getElementById('recipe-tabs-bar');
        if (!tabsBar) return;

        tabsBar.innerHTML = openRecipesList.map(id => {
            const r = RECIPES_DATABASE.find(rec => rec.id === id) || allComments.find(c => c.id === id);
            if (!r) return '';
            const isActive = activeRecipe && activeRecipe.id === id;
            return `
                <div class="recipe-tab-item ${isActive ? 'active' : ''}" onclick="openRecipe(${id})">
                    <span>${r.title}</span>
                    <i class="fas fa-times btn-close-tab" onclick="closeRecipeTab(event, ${id})"></i>
                </div>
            `;
        }).join('');
    }

    window.closeRecipeTab = (event, id) => {
        event.stopPropagation();
        openRecipesList = openRecipesList.filter(fid => fid !== id);
        
        if (openRecipesList.length === 0) {
            closeModalWindow(recipeModal);
        } else if (activeRecipe && activeRecipe.id === id) {
            // Se fechou a aba ativa, abre a primeira da lista
            openRecipe(openRecipesList[0]);
        } else {
            renderRecipeTabs();
        }
    };

    // Função genérica para fechar qualquer modal
    function closeModalWindow(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        
        // Pequeno atraso para garantir que o DOM atualizou antes de checar outros modais ativos
        setTimeout(() => {
            const activeModals = document.querySelectorAll('.modal.active, .assistant-overlay.active, .refine-overlay.active');
            if (activeModals.length === 0) {
                body.style.overflow = 'auto';
            }
        }, 10);
    }

    // Fechar ao clicar no botão de fechar ou no fundo
    document.addEventListener('click', (e) => {
        const recipeCard = e.target.closest('.recipe-card');
        const communityBtn = e.target.closest('.btn-view-community-recipe');
        const modal = e.target.closest('.modal') || e.target.closest('.assistant-overlay') || e.target.closest('.refine-overlay');
        
        // 1. Abrir Receita (Grid ou Botão da Comunidade)
        if (recipeCard && !e.target.closest('.btn-fav')) {
            const id = parseInt(recipeCard.dataset.id);
            if (id) openRecipe(id);
            return;
        }
        if (communityBtn) {
            const id = parseInt(communityBtn.dataset.id);
            if (id) openRecipe(id);
            return;
        }

        // 2. Fechar Modais
        if (e.target.closest('.btn-close-modal') || e.target.closest('.close-overlay')) {
            if (modal && modal.id === 'recipe-modal') openRecipesList = []; 
            closeModalWindow(modal);
            if (modal && modal.id === 'assistantOverlay') {
                clearInterval(activeTimer);
                window.speechSynthesis.cancel();
            }
        } else if (e.target === modal) {
            closeModalWindow(modal);
            if (modal.id === 'assistantOverlay') {
                clearInterval(activeTimer);
                window.speechSynthesis.cancel();
            }
        }
    });

    // --- LÓGICA DO ASSISTENTE ---
    function startAssistant(recipe) {
        currentSteps = recipe.method;
        currentStepIndex = 0;
        closeModalWindow(recipeModal);
        assistantOverlay.classList.add('active');
        updateStep();
    }

    const timerContainer = document.getElementById('timerContainer');
    const assistantBubble = document.querySelector('.speech-bubble');

    function updateStep() {
        const stepText = currentSteps[currentStepIndex];
        assistantStepContent.innerHTML = `
            <div class="step-number">Passo ${currentStepIndex + 1} de ${currentSteps.length}</div>
            <div class="step-text">${stepText}</div>
        `;

        // Personalizar fala da Chef Jure
        if (assistantBubble) {
            const tips = ["Mãos à obra!", "Essa parte é importante!", "Hum, o cheiro está ótimo!", "Quase lá!", "Capricha no tempero!"];
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            assistantBubble.innerHTML = `<b>Chef Jure:</b> ${randomTip}`;
        }

        // Lógica de Timer Automático (procura por "X min" no texto)
        clearInterval(activeTimer);
        if (timerContainer) timerContainer.classList.remove('active');
        const timeMatch = stepText.match(/(\d+)\s*min/);
        if (timeMatch) {
            startTimer(parseInt(timeMatch[1]) * 60);
        }

        // Falar o passo
        speak(stepText);
    }

    function startTimer(seconds) {
        if (timerContainer) timerContainer.classList.add('active');
        let timeLeft = seconds;
        activeTimer = setInterval(() => {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            timerBox.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            if (timeLeft <= 0) {
                clearInterval(activeTimer);
                new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock_classic.ogg').play();
                alert("Tempo esgotado! Verifique sua receita.");
            }
            timeLeft--;
        }, 1000);
    }

    function speak(text) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'pt-BR';
        window.speechSynthesis.speak(msg);
    }

    btnNextStep.onclick = () => {
        if (currentStepIndex < currentSteps.length - 1) {
            currentStepIndex++;
            updateStep();
        } else {
            alert('Receita finalizada! Bom apetite! ❤️');
            closeModalWindow(assistantOverlay);
        }
    };

    btnPrevStep.onclick = () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            updateStep();
        }
    };

    btnVoice.onclick = () => speak(currentSteps[currentStepIndex]);
    closeAssistant.onclick = () => {
        closeModalWindow(assistantOverlay);
        clearInterval(activeTimer);
        window.speechSynthesis.cancel();
    };

    // --- COMUNIDADE LÓGICA ---
    const btnToggleRecipeForm = document.getElementById('btnToggleRecipeForm');
    const recipePublishForm = document.getElementById('recipePublishForm');
    const btnSubmitPost = document.getElementById('btnSubmitPost');
    const btnConfirmPublish = document.getElementById('btnConfirmPublish');
    const communityPostText = document.getElementById('communityPostText');
    const communityPostPhoto = document.getElementById('communityPostPhoto');

    if (btnToggleRecipeForm) {
        btnToggleRecipeForm.onclick = () => recipePublishForm.classList.toggle('active');
    }

    if (btnSubmitPost) {
        btnSubmitPost.onclick = () => {
            if (!communityPostText.value) return;
            const newPost = {
                id: Date.now(),
                user: currentUser?.name || "Visitante",
                text: communityPostText.value,
                date: "Agora",
                type: 'status',
                image: communityPostPhoto.files.length > 0 ? URL.createObjectURL(communityPostPhoto.files[0]) : null
            };
            allComments.unshift(newPost);
            localStorage.setItem('allComments', JSON.stringify(allComments));
            communityPostText.value = '';
            communityPostPhoto.value = '';
            renderCommunityFeed();
            alert('Postado na comunidade!');
        };
    }

    if (btnConfirmPublish) {
        btnConfirmPublish.onclick = () => {
            const title = document.getElementById('pubRecipeTitle').value;
            const ingredients = document.getElementById('pubRecipeIngredients').value;
            const method = document.getElementById('pubRecipeMethod').value;

            if (!title || !ingredients || !method) {
                alert('Por favor, preencha todos os campos da receita.');
                return;
            }

            const newRecipe = {
                id: Date.now(),
                section: 'comunidade',
                title: title,
                user: currentUser?.name || "Visitante",
                text: `Acabei de publicar uma nova receita: ${title}! 🍳`,
                date: "Agora",
                type: 'recipe',
                ingredients: ingredients.split('\n'),
                method: method.split('\n'),
                img: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?auto=format&fit=crop&w=800&q=80" // Imagem padrão para receitas criadas
            };

            allComments.unshift(newRecipe);
            localStorage.setItem('allComments', JSON.stringify(allComments));
            
            // Limpar form
            document.getElementById('pubRecipeTitle').value = '';
            document.getElementById('pubRecipeIngredients').value = '';
            document.getElementById('pubRecipeMethod').value = '';
            recipePublishForm.classList.remove('active');
            
            renderCommunityFeed();
            alert('Sua receita foi publicada com sucesso!');
        };
    }

    // --- COMUNIDADE ---
    const commentText = document.getElementById('commentText');
    const btnPostComment = document.getElementById('btnPostComment');
    const commentsList = document.getElementById('modal-comments-list');


    function renderComments(recipeId) {
        const filtered = allComments.filter(c => c.recipeId === recipeId);
        commentsList.innerHTML = filtered.map(c => `
            <div class="comment-item">
                <div class="comment-user"><b>${c.user}</b> <small>${c.date}</small></div>
                <div class="comment-text">${c.text}</div>
            </div>
        `).join('') || '<p>Seja o primeiro a comentar!</p>';
    }

    btnPostComment.onclick = () => {
        if (!commentText.value) return;
        const newComment = {
            id: Date.now(),
            recipeId: activeRecipe.id,
            user: "Você",
            text: commentText.value,
            date: "Agora"
        };
        allComments.push(newComment);
        localStorage.setItem('allComments', JSON.stringify(allComments));
        commentText.value = '';
        renderComments(activeRecipe.id);
        renderCommunityFeed();
    };

    window.addFriend = (name) => {
        alert(`${name} agora é seu amigo(a) na Jurevenus! 🤝`);
    };

    function renderCommunityFeed() {
        if (!communityFeed) return;
        const recent = [...allComments].reverse(); // Inverte para mostrar mais recentes (ajustado na lógica anterior)
        // Na verdade a lógica de unshift já coloca no começo, mas o allComments inicial está "antigo"
        // Vamos apenas usar a ordem que vier e se for Date.now() será maior
        const sorted = [...allComments].sort((a,b) => (b.id || 0) - (a.id || 0));

        communityFeed.innerHTML = sorted.map(c => {
            const r = RECIPES_DATABASE.find(rec => rec.id === c.recipeId);
            const isCustomRecipe = c.type === 'recipe';
            const isFollowing = userPreferences.following.includes(c.user);
            
            return `
                <div class="community-post animate-in">
                    <div class="post-header">
                        <img src="${isCustomRecipe ? c.img : (r?.img || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=100&q=80')}" class="post-recipe-img">
                        <div class="post-meta">
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <b>${c.user}</b> 
                                ${c.user !== (currentUser?.name || 'Visitante') ? `
                                    <button class="btn-follow ${isFollowing ? 'following' : ''}" onclick="toggleFollow('${c.user}')">
                                        ${isFollowing ? 'Seguindo' : 'Seguir'}
                                    </button>
                                ` : ''}
                            </div>
                            <small>${isCustomRecipe ? 'publicou uma receita' : (r ? `comentou em <b>${r.title}</b>` : 'postou um status')}</small>
                            <br><small>${c.date}</small>
                        </div>
                    </div>
                    <div class="post-body">
                        ${c.text}
                        ${c.image ? `<img src="${c.image}" style="width: 100%; border-radius: 15px; margin-top: 10px;">` : ''}
                        ${isCustomRecipe ? `
                            <div style="margin-top: 10px; background: var(--bg-secondary); padding: 15px; border-radius: 10px;">
                                <b>Ingredientes:</b> ${c.ingredients.slice(0,2).join(', ')}...
                                <br><button class="btn btn-outline btn-view-community-recipe" data-id="${c.id}" style="margin-top: 10px; font-size: 0.8rem; padding: 5px 10px;">Ver Receita Completa</button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    // Modal Tabs Internas
    const innerTabBtns = document.querySelectorAll('.inner-tab-btn');
    const innerTabContents = document.querySelectorAll('.inner-tab-content');

    innerTabBtns.forEach(btn => {
        btn.onclick = () => {
            innerTabBtns.forEach(b => b.classList.remove('active'));
            innerTabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
        };
    });

    // --- ALTERNAR TEMA ---
    const btnKitchenTheme = document.getElementById('btnKitchenTheme');
    
    function updateThemeUI(isDark) {
        body.classList.toggle('dark-theme', isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        const iconClass = isDark ? 'fas fa-sun' : 'fas fa-moon';
        themeToggle.querySelector('i').className = iconClass;
        if (btnKitchenTheme) btnKitchenTheme.querySelector('i').className = iconClass;
    }

    if (theme === 'dark') updateThemeUI(true);
    
    const toggleTheme = () => {
        const isDark = !body.classList.contains('dark-theme');
        updateThemeUI(isDark);
    };

    themeToggle.addEventListener('click', toggleTheme);
    if (btnKitchenTheme) btnKitchenTheme.addEventListener('click', toggleTheme);

    // --- ANIMAÇÕES DO HERO ---
    const words = ["Arte", "Paixão", "Técnica", "Magia", "Sabor"];
    let wordIndex = 0;
    const dynamicWord = document.getElementById("dynamic-word");

    if (dynamicWord) {
        setInterval(() => {
            wordIndex = (wordIndex + 1) % words.length;
            // Remove e recria o elemento para reiniciar a animação CSS
            dynamicWord.style.animation = 'none';
            dynamicWord.offsetHeight; /* trigger reflow */
            dynamicWord.style.animation = 'wordFadeIn 0.5s ease-in-out';
            dynamicWord.textContent = words[wordIndex];
        }, 2500); // Muda a cada 2.5s
    }

    // Gerador de Partículas de Farinha
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer) {
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('flour-particle');
            
            const size = Math.random() * 5 + 2; // de 2px a 7px
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            particle.style.left = `${Math.random() * 100}%`;
            
            const duration = Math.random() * 3 + 4; // de 4s a 7s
            particle.style.animationDuration = `${duration}s`;
            
            particlesContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }

        // Criar uma partícula a cada 150ms
        setInterval(createParticle, 150);
    }

    // --- INICIALIZAÇÃO ---
    renderGrid();
    renderCommunityFeed();
    renderHomeFeatured();
    
    // Ativa a logo como Home
    document.getElementById('homeLogo').onclick = () => switchMasterTab('home-section');
    
    // Funções globais expostas para o index.html
    window.showCategory = (targetId) => switchMasterTab(targetId);

    // --- LÓGICA DE PESQUISA GLOBAL ---
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        globalSearch.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            if (term.length < 2) {
                renderGrid();
                return;
            }

            // Pesquisar em todas as seções
            const filtered = RECIPES_DATABASE.filter(r => 
                r.title.toLowerCase().includes(term) || 
                r.movie.toLowerCase().includes(term) ||
                r.ingredients.some(i => i.item.toLowerCase().includes(term))
            );

            // Se estiver em uma aba de categoria, foca nela, senão foca no Gastronômico por padrão
            if (currentCategory === 'home' || currentCategory === 'comunidade') {
                switchMasterTab('gastronomico-section');
            }
            
            const gridId = `grid-${currentCategory === 'home' ? 'gastronomico' : currentCategory}`;
            const grid = document.getElementById(gridId);
            if (grid) {
                grid.innerHTML = filtered.length > 0 ? filtered.map(r => {
                    const isFav = userPreferences.favorites.includes(r.id);
                    return `
                        <div class="recipe-card animate-in" data-id="${r.id}">
                            <div class="card-img-area">
                                <img src="${r.img}" alt="${r.title}">
                                <button class="btn-fav ${isFav ? 'active' : ''}" onclick="toggleFavorite(event, ${r.id})">
                                    <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                                </button>
                            </div>
                            <div class="card-info">
                                <span class="card-movie-title">${r.movie}</span>
                                <h3>${r.title}</h3>
                            </div>
                        </div>
                    `;
                }).join('') : '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">Nenhuma receita encontrada para sua busca.</p>';
            }
        });
    }

    // --- LÓGICA DE SEGUIR ---
    window.toggleFollow = (username) => {
        const index = userPreferences.following.indexOf(username);
        if (index > -1) {
            userPreferences.following.splice(index, 1);
        } else {
            userPreferences.following.push(username);
        }
        localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
        renderCommunityFeed();
    };

    // --- LÓGICA DO FORMULÁRIO DE CONTATO ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.onsubmit = (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            alert(`Obrigado, ${name}! Recebemos sua mensagem e entraremos em contato em breve.`);
            contactForm.reset();
        };
    }

});
