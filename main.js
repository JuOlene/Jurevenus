document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO DA APLICAÇÃO ---
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    let userPreferences = JSON.parse(localStorage.getItem('userPreferences')) || {
        level: 'iniciante',
        restrictions: [],
        favorites: []
    };
    
    let currentCategory = 'home';
    let currentLevel = userPreferences.level;
    let currentType = 'todos';
    let currentPortions = 1;

    let theme = localStorage.getItem('theme') || 'light';

    // --- ELEMENTOS DO DOM ---
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const masterTabBtns = document.querySelectorAll('.master-tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const levelTabs = document.querySelectorAll('.level-tab');
    const recipeModal = document.getElementById('recipe-modal');
    const closeModal = document.querySelector('.btn-close-modal');

    // --- BANCO DE DADOS EXPANDIDO ---
    const RECIPES_DATABASE = [
        // --- GASTRONÔMICO ---
        {
            id: 1, section: 'gastronomico', category: 'Pratos principais', level: 'iniciante', rating: 'generico',
            title: "Omelete de Julie & Julia", movie: "Julie & Julia", time: "10 min", cost: "Baixo", yield: "1 porção",
            img: "assets/recipe_omelete.png", basePortion: 1,
            ingredients: [
                { item: "ovos", qty: 3, unit: "" },
                { item: "Manteiga", qty: 10, unit: "g" },
                { item: "Sal", qty: 1, unit: "pitada" }
            ],
            utensils: ["Frigideira antiaderente", "Garfo"],
            method: ["Bata os ovos com sal.", "Derreta manteiga na frigideira.", "Cozinhe mexendo levemente.", "Dobre e sirva."],
            extra: "Um clássico da culinária francesa ensinado por Julia Child."
        },
        {
            id: 2, section: 'gastronomico', category: 'Pratos principais', level: 'intermediario', rating: 'premium',
            title: "Sanduíche Cubano de Chef", movie: "Chef", time: "30 min", cost: "Médio", yield: "2 porções",
            img: "https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80", basePortion: 2,
            ingredients: [
                { item: "Pão ciabatta", qty: 2, unit: "un" },
                { item: "Carne de porco", qty: 200, unit: "g" },
                { item: "Presunto", qty: 100, unit: "g" },
                { item: "Queijo suíço", qty: 4, unit: "fatias" }
            ],
            method: ["Monte o sanduíche.", "Prense em prensa quente.", "Grelhe até o queijo derreter."],
            extra: "Inspirado no filme Chef (2014)."
        },
        {
            id: 3, section: 'gastronomico', category: 'Entradas', level: 'iniciante', rating: 'generico',
            title: "Bruschetta Crocante", movie: "Jurevenus", time: "15 min", cost: "Baixo", yield: "4 porções",
            img: "assets/recipe_bruschetta.png", basePortion: 4,
            ingredients: [
                { item: "Pão italiano", qty: 4, unit: "fatias" },
                { item: "Tomate", qty: 2, unit: "un" },
                { item: "Azeite", qty: 50, unit: "ml" }
            ],
            method: ["Torre o pão.", "Cubra com tomate e azeite."],
            extra: "Perfeito para abrir o apetite."
        },

        // --- ATELIÊ ---
        {
            id: 4, section: 'atelie', category: 'Sobremesas', level: 'intermediario', rating: 'premium',
            title: "Bolo de Chocolate de Matilda", movie: "Matilda", time: "50 min", cost: "Médio", yield: "12 fatias",
            img: "assets/matilda_cake.png", basePortion: 12,
            ingredients: [
                { item: "Farinha", qty: 400, unit: "g" },
                { item: "Açúcar", qty: 300, unit: "g" },
                { item: "Chocolate", qty: 200, unit: "g" }
            ],
            method: ["Prepare a massa.", "Asse por 35 min."],
            extra: "O lendário bolo do Bruce."
        },
        {
            id: 5, section: 'atelie', category: 'Sobremesas', level: 'iniciante', rating: 'generico',
            title: "Torta de Maçã Americana", movie: "American Pie", time: "60 min", cost: "Médio", yield: "8 fatias",
            img: "assets/apple_pie.png", basePortion: 8,
            ingredients: [
                { item: "Maçãs", qty: 6, unit: "un" },
                { item: "Massa", qty: 1, unit: "un" }
            ],
            method: ["Recheie a massa.", "Asse até dourar."],
            extra: "Clássico americano."
        },

        // --- CINE GOURMET ---
        {
            id: 6, section: 'cine', category: 'Acompanhamentos', level: 'avancado', rating: 'premium',
            title: "Ratatouille de Remy", movie: "Ratatouille", time: "60 min", cost: "Baixo", yield: "4 porções",
            img: "assets/ratatouille.png", basePortion: 4,
            ingredients: [
                { item: "Abobrinha", qty: 1, unit: "un" },
                { item: "Berinjela", qty: 1, unit: "un" },
                { item: "Tomate", qty: 2, unit: "un" }
            ],
            method: ["Fatie os legumes.", "Asse em espiral."],
            extra: "Receita de Confit Byaldi."
        },
        {
            id: 7, section: 'cine', category: 'Pratos principais', level: 'iniciante', rating: 'generico',
            title: "Espaguete com Almôndegas", movie: "A Dama e o Vagabundo", time: "40 min", cost: "Médio", yield: "2 porções",
            img: "assets/recipe_pasta.png", basePortion: 2,
            ingredients: [
                { item: "Espaguete", qty: 200, unit: "g" },
                { item: "Carne moída", qty: 300, unit: "g" }
            ],
            method: ["Cozinhe a massa.", "Sirva com almôndegas."],
            extra: "Uma cena icônica da Disney."
        },
        {
            id: 8, section: 'cine', category: 'Café da Manhã', level: 'iniciante', rating: 'premium',
            title: "Café da Manhã Inglês", movie: "Harry Potter", time: "25 min", cost: "Médio", yield: "1 porção",
            img: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=800&q=80", basePortion: 1,
            ingredients: [
                { item: "Ovos", qty: 2, unit: "un" },
                { item: "Bacon", qty: 3, unit: "fatias" },
                { item: "Salsichas", qty: 2, unit: "un" }
            ],
            method: ["Frite tudo.", "Sirva quente."],
            extra: "Banquete de Hogwarts."
        },
        {
            id: 9, section: 'cine', category: 'Pratos principais', level: 'intermediario', rating: 'premium',
            title: "Frango Frito", movie: "Histórias Cruzadas", time: "45 min", cost: "Médio", yield: "4 porções",
            img: "https://images.unsplash.com/photo-1569058242253-92a9c71f9867?auto=format&fit=crop&w=800&q=80", basePortion: 4,
            ingredients: [
                { item: "Frango", qty: 1, unit: "kg" },
                { item: "Gordura vegetal", qty: 500, unit: "g" }
            ],
            method: ["Frite o frango.", "Deixe bem crocante."],
            extra: "A receita secreta de Minny Jackson."
        },
        {
            id: 10, section: 'cine', category: 'Lanches', level: 'iniciante', rating: 'generico',
            title: "Cerveja Amanteigada", movie: "Harry Potter", time: "15 min", cost: "Baixo", yield: "2 porções",
            img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80", basePortion: 2,
            ingredients: [
                { item: "Soda", qty: 500, unit: "ml" },
                { item: "Caramelo", qty: 100, unit: "ml" }
            ],
            method: ["Misture.", "Sirva com espuma."],
            extra: "Bebida mágica."
        }
    ];

    const TYPES_LIST = ['Pratos principais', 'Entradas', 'Acompanhamentos', 'Sobremesas', 'Lanches', 'Bebidas'];
    
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
        
        // Listener para botões de opção
        bodyPanel.querySelectorAll('.refine-opt').forEach(opt => {
            opt.onclick = () => opt.classList.toggle('active');
        });
    }

    btnRefine.forEach(btn => btn.onclick = openRefine);
    closeRefine.onclick = () => refineOverlay.classList.remove('active');
    document.getElementById('apply-filters').onclick = () => refineOverlay.classList.remove('active');

    // --- PERFIL E PREFERÊNCIAS ---
    const profileModal = document.getElementById('profile-modal');
    const btnProfile = document.getElementById('btnProfile');
    const closeProfile = document.getElementById('closeProfile');
    const savePreferences = document.getElementById('savePreferences');

    btnProfile.onclick = () => {
        // Marcar opções atuais
        document.querySelectorAll('#pref-level .refine-opt').forEach(opt => {
            opt.classList.toggle('active', opt.dataset.val === userPreferences.level);
        });
        document.querySelectorAll('#pref-restrictions .refine-opt').forEach(opt => {
            opt.classList.toggle('active', userPreferences.restrictions.includes(opt.dataset.val));
        });
        profileModal.style.display = 'block';
    };

    closeProfile.onclick = () => profileModal.style.display = 'none';

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
        
        profileModal.style.display = 'none';
        updateProfileUI();
        renderGrid();
        alert('Perfil atualizado!');
    };

    // --- SISTEMA DE PERFIL ---
    const kitchenUserName = document.getElementById('kitchenUserName');
    const userNameTop = document.getElementById('userNameTop');

    function updateProfileUI() {
        if (currentUser) {
            if (kitchenUserName) kitchenUserName.textContent = `Olá, ${currentUser.name}!`;
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
        masterTabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.target === targetId));
        tabContents.forEach(content => content.classList.toggle('active', content.id === targetId));
        
        const sectionId = targetId.split('-')[0];
        if (sectionId !== 'home') {
            currentCategory = sectionId;
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

    // --- RENDERIZAÇÃO DO GRID ---
    function renderGrid() {
        const gridId = `grid-${currentCategory}`;
        const gridContainer = document.getElementById(gridId);
        if (!gridContainer) return;

        const filtered = RECIPES_DATABASE.filter(r => {
            // Filtrar por categoria principal e nível (se não houver preferência específica)
            const matchesCategory = r.section === currentCategory;
            const matchesType = (currentType === 'todos' || r.category === currentType);
            
            // Personalização: Se o usuário tem restrições, esconder receitas que não se encaixam
            // (Simulação simples: se a receita tem tag de restrição ou o usuário não tem restrições)
            const matchesRestrictions = userPreferences.restrictions.length === 0 || 
                                       userPreferences.restrictions.every(rest => r.diets?.includes(rest));

            return matchesCategory && matchesType && matchesRestrictions;
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
                <div class="recipe-card animate-in" onclick="openRecipe(${r.id})">
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
        if (currentCategory === 'favorites') renderGrid(); // Re-render se estiver na aba fav
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
            <div class="recipe-card" onclick="openRecipe(${r.id})">
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
    let activeRecipe = null;

    window.openRecipe = (id) => {
        const r = RECIPES_DATABASE.find(recipe => recipe.id === id);
        if (!r) return;
        activeRecipe = r;
        currentPortions = r.basePortion;

        btnStartAssistant.onclick = () => startAssistant(r);
        
        document.getElementById('modal-img').src = r.img;
        document.getElementById('modal-title').textContent = r.title;
        document.getElementById('modal-category').textContent = r.category;
        document.getElementById('modal-level').textContent = r.level;
        document.getElementById('modal-time').textContent = r.time;
        document.getElementById('modal-cost').textContent = r.cost;
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
            movieTag.style.display = 'block';
            movieTag.textContent = `🎬 Filme: ${r.movie}`;
        } else {
            movieTag.style.display = 'none';
        }

        document.getElementById('modal-method-list').innerHTML = r.method.map(m => `<li>${m}</li>`).join('');

        recipeModal.style.display = 'block';
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

    closeModal.onclick = () => {
        recipeModal.style.display = 'none';
        body.style.overflow = 'auto';
    };

    // --- LÓGICA DO ASSISTENTE ---
    function startAssistant(recipe) {
        currentSteps = recipe.method;
        currentStepIndex = 0;
        recipeModal.style.display = 'none';
        assistantOverlay.style.display = 'block';
        updateStep();
    }

    function updateStep() {
        const stepText = currentSteps[currentStepIndex];
        assistantStepContent.innerHTML = `
            <div class="step-number">Passo ${currentStepIndex + 1} de ${currentSteps.length}</div>
            <div class="step-text">${stepText}</div>
        `;

        // Lógica de Timer Automático (procura por "X min" no texto)
        clearInterval(activeTimer);
        timerBox.style.display = 'none';
        const timeMatch = stepText.match(/(\d+)\s*min/);
        if (timeMatch) {
            startTimer(parseInt(timeMatch[1]) * 60);
        }

        // Falar o passo
        speak(stepText);
    }

    function startTimer(seconds) {
        timerBox.style.display = 'block';
        let timeLeft = seconds;
        activeTimer = setInterval(() => {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            timerBox.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            if (timeLeft <= 0) {
                clearInterval(activeTimer);
                new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock_classic.ogg').play();
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
            assistantOverlay.style.display = 'none';
            body.style.overflow = 'auto';
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
        assistantOverlay.style.display = 'none';
        body.style.overflow = 'auto';
        clearInterval(activeTimer);
        window.speechSynthesis.cancel();
    };

    // --- COMUNIDADE ---
    const communityFeed = document.getElementById('communityFeed');
    const commentText = document.getElementById('commentText');
    const btnPostComment = document.getElementById('btnPostComment');
    const commentsList = document.getElementById('modal-comments-list');

    let allComments = JSON.parse(localStorage.getItem('allComments')) || [
        { id: 1, recipeId: 1, user: "Chef Ana", text: "Ficou uma delícia! Adicionei um pouco de orégano.", date: "2 horas atrás" },
        { id: 2, recipeId: 4, user: "Marcos C.", text: "O melhor bolo da vida! Bruce ficaria orgulhoso.", date: "1 dia atrás" }
    ];

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
        const recent = [...allComments].reverse();
        communityFeed.innerHTML = recent.map(c => {
            const r = RECIPES_DATABASE.find(rec => rec.id === c.recipeId);
            return `
                <div class="community-post animate-in">
                    <div class="post-header">
                        <img src="${r?.img}" class="post-recipe-img">
                        <div class="post-meta">
                            <b>${c.user}</b> <button class="btn-add-friend" onclick="addFriend('${c.user}')">Adicionar</button>
                            <br><small>comentou em <b>${r?.title}</b></small>
                            <br><small>${c.date}</small>
                        </div>
                    </div>
                    <div class="post-body">${c.text}</div>
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

    // --- INICIALIZAÇÃO ---
    renderGrid();
    renderCommunityFeed();
    
    // Ativa a logo como Home
    document.getElementById('homeLogo').onclick = () => switchMasterTab('home-section');
    
    // Funções globais expostas para o index.html
    window.showCategory = (targetId) => switchMasterTab(targetId);

});
