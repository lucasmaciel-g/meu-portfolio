// JavaScript para o hub de ferramentas
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos da interface
    const searchInput = document.getElementById('searchInput');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const categorySections = document.querySelectorAll('.category-section');
    const allCards = document.querySelectorAll('.hologram');

    // Função para mostrar/esconder seções baseadas na categoria
    function showCategorySection(category) {
        categorySections.forEach(section => {
            if (category === 'all') {
                section.classList.remove('hidden');
            } else {
                if (section.dataset.category === category) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            }
        });
    }

    // Event listeners para os filtros de categoria
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active de todos os filtros
            categoryFilters.forEach(f => {
                f.classList.remove('active');
                f.style.background = '';
            });
            
            // Adiciona active ao filtro clicado
            this.classList.add('active');
            
            const category = this.dataset.category;
            showCategorySection(category);
            
            // Limpa a busca quando muda categoria
            searchInput.value = '';
        });
    });

    // Função de busca
    function searchTools() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm === '') {
            // Se busca vazia, mostra categoria ativa
            const activeFilter = document.querySelector('.category-filter.active');
            showCategorySection(activeFilter.dataset.category);
            return;
        }

        // Esconde todas as seções primeiro
        categorySections.forEach(section => {
            section.classList.add('hidden');
        });

        // Busca em todos os cards
        let hasResults = false;
        categorySections.forEach(section => {
            const cards = section.querySelectorAll('.hologram');
            let sectionHasVisibleCards = false;
            
            cards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    sectionHasVisibleCards = true;
                    hasResults = true;
                } else {
                    card.style.display = 'none';
                }
            });
            
            if (sectionHasVisibleCards) {
                section.classList.remove('hidden');
            }
        });

        // Se não há resultados, mostra mensagem
        if (!hasResults) {
            // Aqui você pode adicionar uma mensagem de "nenhum resultado encontrado"
            console.log('Nenhum resultado encontrado para:', searchTerm);
        }
    }

    // Event listener para busca
    searchInput.addEventListener('input', searchTools);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchTools();
        }
    });

    // Animação de entrada dos cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observa todos os cards para animação de entrada
    allCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

});
