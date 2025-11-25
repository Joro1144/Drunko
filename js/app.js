class DrinkRecipeApp {
    constructor() {
        this.drinks = [];
        this.filteredDrinks = [];
        this.currentFilter = 'all';
        this.currentSearch = '';
        this.currentView = 'normal';
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadDrinks();
            this.setupEventListeners();
            this.renderDrinks();
        } catch (error) {
            console.error('Error initializing app:', error);
            this.showError('Failed to load drink recipes. Please try again later.');
        }
    }
    
    async loadDrinks() {
        try {
            const response = await fetch('data/drinks.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.drinks = data.drinks;
            this.filteredDrinks = [...this.drinks];
        } catch (error) {
            console.error('Error loading drinks:', error);
            throw error;
        }
    }
    
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        searchInput.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.filterAndRenderDrinks();
        });
        
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.filterAndRenderDrinks();
            });
        });
        
        // View toggle buttons
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                viewButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentView = e.target.dataset.view;
                this.updateView();
            });
        });
        
        // Modal close functionality
        const modalClose = document.getElementById('modalClose');
        const modal = document.getElementById('drinkModal');
        
        modalClose.addEventListener('click', () => this.closeModal());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeModal();
            }
        });
        
        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }
    
    filterAndRenderDrinks() {
        this.filteredDrinks = this.drinks.filter(drink => {
            // Search filter
            const matchesSearch = this.currentSearch === '' || 
                drink.name.toLowerCase().includes(this.currentSearch) ||
                JSON.stringify(drink.ingredients).toLowerCase().includes(this.currentSearch) ||
                drink.category.toLowerCase().includes(this.currentSearch);
            
            // Category filter
            let matchesFilter = true;
            switch (this.currentFilter) {
                case 'cocktail':
                    matchesFilter = drink.category.toLowerCase() === 'cocktail';
                    break;
                case 'non-alcoholic':
                    matchesFilter = !drink.alcohol;
                    break;
                case 'alcoholic':
                    matchesFilter = drink.alcohol;
                    break;
                case 'easy':
                    matchesFilter = drink.difficulty.toLowerCase() === 'easy';
                    break;
                case 'medium':
                    matchesFilter = drink.difficulty.toLowerCase() === 'medium';
                    break;
            }
            
            return matchesSearch && matchesFilter;
        });
        
        this.renderDrinks();
    }
    
    renderDrinks() {
        const grid = document.getElementById('drinksGrid');
        const noResults = document.getElementById('noResults');
        
        if (this.filteredDrinks.length === 0) {
            grid.style.display = 'none';
            noResults.style.display = 'block';
            return;
        }
        
        grid.style.display = 'grid';
        noResults.style.display = 'none';
        
        grid.innerHTML = this.filteredDrinks.map(drink => this.createDrinkCard(drink)).join('');
        
        // Add click listeners to drink cards
        const drinkCards = grid.querySelectorAll('.drink-card');
        drinkCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.showDrinkDetails(this.filteredDrinks[index]);
            });
        });
    }
    
    createDrinkCard(drink) {
        const difficultyClass = drink.difficulty.toLowerCase();
        const alcoholClass = drink.alcohol ? 'alcoholic' : 'non-alcoholic';
        const alcoholText = drink.alcohol ? 'Alcoholic' : 'Non-alcoholic';
        
        return `
            <div class="drink-card" data-drink-id="${drink.id}">
                <div class="drink-image-container">
                    <img src="${drink.image}" alt="${drink.name}" class="drink-image" 
                         onerror="this.src='https://images.unsplash.com/photo-1551024601-bec78eea708b?w=400&h=300&fit=crop'">
                </div>
                <div class="drink-info">
                    <h3 class="drink-name">${drink.name}</h3>
                    <span class="drink-category">${drink.category}</span>
                    <div class="drink-meta">
                        <span class="difficulty ${difficultyClass}">${drink.difficulty}</span>
                        <span class="alcohol-badge ${alcoholClass}">${alcoholText}</span>
                    </div>
                </div>
            </div>
        `;
    }
    
    updateView() {
        const grid = document.getElementById('drinksGrid');
        if (this.currentView === 'compact') {
            grid.classList.add('compact');
        } else {
            grid.classList.remove('compact');
        }
    }
    
    showDrinkDetails(drink) {
        const modal = document.getElementById('drinkModal');
        const modalImage = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalCategory = document.getElementById('modalCategory');
        const ingredientsList = document.getElementById('ingredientsList');
        const variationsList = document.getElementById('variationsList');
        const instructions = document.getElementById('instructions');
        
        // Set modal content
        modalImage.src = drink.image;
        modalImage.alt = drink.name;
        modalTitle.textContent = drink.name;
        modalCategory.textContent = drink.category;
        
        // Render ingredients by category
        const categoryIcons = {
            spirits: '🥃',
            liqueurs: '🍾', 
            mixers: '🥤',
            citrus: '🍋',
            sweeteners: '🍯',
            garnishes: '🌿',
            creams: '🥛',
            coffee: '☕',
            dairy: '🥛',
            fruits: '🍓',
            greens: '🥬',
            liquids: '💧',
            ice: '🧊',
            sauces: '🍶',
            seasonings: '🧂',
            additions: '✨',
            sparkling: '🥂'
        };
        
        const categoryDisplayNames = {
            spirits: 'Spirits',
            liqueurs: 'Liqueurs',
            mixers: 'Mixers', 
            citrus: 'Citrus',
            sweeteners: 'Sweeteners',
            garnishes: 'Garnishes',
            creams: 'Creams & Dairy',
            coffee: 'Coffee',
            dairy: 'Dairy',
            fruits: 'Fruits',
            greens: 'Greens',
            liquids: 'Liquids',
            ice: 'Ice',
            sauces: 'Sauces',
            seasonings: 'Seasonings',
            additions: 'Additions',
            sparkling: 'Sparkling'
        };
        
        let ingredientsHTML = '';
        Object.entries(drink.ingredients).forEach(([category, items]) => {
            if (items && items.length > 0) {
                const icon = categoryIcons[category] || '📋';
                const displayName = categoryDisplayNames[category] || category.charAt(0).toUpperCase() + category.slice(1);
                
                ingredientsHTML += `
                    <div class="ingredient-category">
                        <div class="category-title">
                            <span class="category-icon">${icon}</span>
                            ${displayName}
                        </div>
                        <ul class="ingredient-list">
                            ${items.map(ingredient => 
                                `<li class="ingredient-item">${ingredient}</li>`
                            ).join('')}
                        </ul>
                    </div>
                `;
            }
        });
        ingredientsList.innerHTML = ingredientsHTML;
        
        // Render variations
        if (drink.variations && drink.variations.length > 0) {
            variationsList.innerHTML = drink.variations.map(variation => `
                <div class="variation-item">
                    <div class="variation-name">${variation.name}</div>
                    <div class="variation-modifications">
                        <ul>
                            ${variation.modifications.map(mod => `<li>${mod}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('');
        } else {
            variationsList.innerHTML = '<p style="color: #718096; font-style: italic;">No variations available for this drink.</p>';
        }
        
        // Set instructions
        instructions.textContent = drink.instructions;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeModal() {
        const modal = document.getElementById('drinkModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    showError(message) {
        const grid = document.getElementById('drinksGrid');
        grid.innerHTML = `
            <div class="no-results" style="display: block;">
                <h2><i class="fas fa-exclamation-triangle"></i> Error</h2>
                <p>${message}</p>
            </div>
        `;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DrinkRecipeApp();
});

// Add some utility functions for better performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});