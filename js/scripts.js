// ============================================
// Scripts Page JavaScript
// Handles product display, filtering, modals, and basket
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initHeaderScroll();
    initPageTransitions();
    initProductModal();
    initBasket();
    initTebexData();
    
    // Retry button for error state
    document.getElementById('retryBtn')?.addEventListener('click', initTebexData);
});

// ============================================
// Tebex Data Loading
// ============================================

let allProducts = [];
let allCategories = [];
let currentCategory = 'all';

/**
 * Initialize Tebex data loading
 */
async function initTebexData() {
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const productsGrid = document.getElementById('productsGrid');
    
    // Show loading state
    loadingState.style.display = 'block';
    errorState.style.display = 'none';
    productsGrid.innerHTML = '';
    
    try {
        // Check if API key is configured
        if (!window.TebexAPI.config.API_KEY || window.TebexAPI.config.API_KEY === 'YOUR_TEBEX_API_KEY_HERE') {
            throw new Error('Tebex API key not configured. Please add your API key in js/tebex-api.js');
        }
        
        // Fetch categories and packages in parallel
        const [categories, packages] = await Promise.all([
            window.TebexAPI.fetchCategories(),
            window.TebexAPI.fetchPackages()
        ]);
        
        // Format data
        allCategories = categories.map(cat => window.TebexAPI.formatCategory(cat));
        allProducts = packages.map(pkg => window.TebexAPI.formatPackage(pkg));
        
        // Render categories
        renderCategories();
        
        // Render products
        renderProducts(allProducts);
        
        // Hide loading state
        loadingState.style.display = 'none';
        
        console.log('Tebex data loaded successfully');
    } catch (error) {
        console.error('Error loading Tebex data:', error);
        
        // Show error state
        loadingState.style.display = 'none';
        errorState.style.display = 'block';
        
        // Update error message
        document.getElementById('errorMessage').textContent = error.message;
        
        // For demo purposes, load mock data if API fails
        loadMockData();
    }
}

/**
 * Load mock data for demonstration
 */
function loadMockData() {
    console.log('Loading mock data for demonstration...');
    
    // Mock categories
    allCategories = [
        { id: 1, name: 'Economy Systems', order: 1, packageCount: 3 },
        { id: 2, name: 'Job Systems', order: 2, packageCount: 2 },
        { id: 3, name: 'Roleplay Mechanics', order: 3, packageCount: 4 },
        { id: 4, name: 'Vehicle Systems', order: 4, packageCount: 2 }
    ];
    
    // Mock products
    allProducts = [
        {
            id: 1,
            name: 'Premium Banking System',
            description: 'A comprehensive banking system with ATMs, loans, savings accounts, and investment features. Fully integrated with the RedM economy.',
            price: 29.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 1, name: 'Economy Systems' },
            tags: ['economy', 'banking'],
            onSale: false,
            fancyUrl: 'premium-banking-system'
        },
        {
            id: 2,
            name: 'Mining Job System',
            description: 'Complete mining job with multiple ore types, realistic mining mechanics, and dynamic payout system based on market prices.',
            price: 24.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 2, name: 'Job Systems' },
            tags: ['jobs', 'mining'],
            onSale: false,
            fancyUrl: 'mining-job-system'
        },
        {
            id: 3,
            name: 'Blacksmith Crafting',
            description: 'Realistic blacksmith crafting system with multiple recipes, skill progression, and quality tiers based on player skill level.',
            price: 19.99,
            originalPrice: 24.99,
            salePrice: 19.99,
            image: null,
            category: { id: 3, name: 'Roleplay Mechanics' },
            tags: ['crafting', 'roleplay'],
            onSale: true,
            fancyUrl: 'blacksmith-crafting'
        },
        {
            id: 4,
            name: 'Saloon Management',
            description: 'Run your own saloon with this comprehensive management system. Serve drinks, hire staff, and manage inventory.',
            price: 34.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 3, name: 'Roleplay Mechanics' },
            tags: ['roleplay', 'business'],
            onSale: false,
            fancyUrl: 'saloon-management'
        },
        {
            id: 5,
            name: 'Wagon Dealer Network',
            description: 'Complete wagon dealership system with test drives, financing options, and customer management tools.',
            price: 39.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 4, name: 'Vehicle Systems' },
            tags: ['vehicles', 'business'],
            onSale: false,
            fancyUrl: 'wagon-dealer-network'
        },
        {
            id: 6,
            name: 'Horse Breeding System',
            description: 'Advanced horse breeding with genetics, inheritance, and stat tracking. Build your perfect bloodline.',
            price: 29.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 4, name: 'Vehicle Systems' },
            tags: ['animals', 'breeding'],
            onSale: false,
            fancyUrl: 'horse-breeding-system'
        }
    ];
    
    // Render mock data
    renderCategories();
    renderProducts(allProducts);
    
    // Hide loading and error states
    document.getElementById('loadingState').style.display = 'none';
    document.getElementById('errorState').style.display = 'none';
}

// ============================================
// Render Functions
// ============================================

/**
 * Render category buttons
 */
function renderCategories() {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    allCategories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'category-btn';
        btn.dataset.category = category.id;
        btn.textContent = category.name;
        
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter products
            currentCategory = category.id;
            filterProducts();
        });
        
        container.appendChild(btn);
    });
    
    // Add "All" button click handler
    const allBtn = document.querySelector('.category-btn[data-category="all"]');
    if (allBtn) {
        allBtn.addEventListener('click', () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            allBtn.classList.add('active');
            currentCategory = 'all';
            filterProducts();
        });
    }
}

/**
 * Render product cards
 * @param {Array} products - Products to render
 */
function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    const emptyState = document.getElementById('emptyState');
    
    if (!grid) return;
    
    grid.innerHTML = '';
    
    if (products.length === 0) {
        emptyState.style.display = 'block';
        return;
    }
    
    emptyState.style.display = 'none';
    
    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });
}

/**
 * Create a product card element
 * @param {object} product - Product data
 * @returns {HTMLElement} Product card element
 */
function createProductCard(product) {
    const card = document.createElement('a');
    card.href = '#';
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    // Create product image
    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-image';
    
    if (product.image) {
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        imageContainer.appendChild(img);
    } else {
        // Placeholder icon
        imageContainer.innerHTML = `
            <div class="placeholder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                    <polyline points="13 2 13 9 20 9"/>
                </svg>
            </div>
        `;
    }
    
    // Sale badge
    if (product.onSale) {
        const badge = document.createElement('div');
        badge.className = 'product-badge sale';
        badge.textContent = 'SALE';
        imageContainer.appendChild(badge);
    }
    
    // Create content
    const content = document.createElement('div');
    content.className = 'product-content';
    
    // Category
    const category = document.createElement('div');
    category.className = 'product-category';
    category.textContent = product.category.name;
    content.appendChild(category);
    
    // Title
    const title = document.createElement('h3');
    title.className = 'product-title';
    title.textContent = product.name;
    content.appendChild(title);
    
    // Description (truncated)
    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = product.description;
    content.appendChild(description);
    
    // Footer with price and button
    const footer = document.createElement('div');
    footer.className = 'product-footer';
    
    // Price
    const price = document.createElement('div');
    price.className = 'product-price';
    
    if (product.onSale && product.originalPrice) {
        price.innerHTML = `
            $${product.salePrice.toFixed(2)}
            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
        `;
    } else {
        price.textContent = `$${product.price.toFixed(2)}`;
    }
    
    footer.appendChild(price);
    
    // View button
    const viewBtn = document.createElement('span');
    viewBtn.className = 'view-btn';
    viewBtn.textContent = 'View Details';
    footer.appendChild(viewBtn);
    
    content.appendChild(footer);
    
    card.appendChild(imageContainer);
    card.appendChild(content);
    
    // Click handler for modal
    card.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Check if right-click (new tab)
        if (e.button === 2) {
            // Handle right-click - will use native context menu
            return;
        }
        
        // Left click - open modal
        openProductModal(product);
    });
    
    // Context menu handler for right-click
    card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        
        // If fancy URL is configured, allow opening in new tab
        if (product.fancyUrl) {
            window.open(`product.html?slug=${product.fancyUrl}`, '_blank');
        } else {
            // Fallback to product page with ID
            window.open(`product.html?id=${product.id}`, '_blank');
        }
    });
    
    return card;
}

// ============================================
// Product Filtering
// ============================================

/**
 * Filter products by current category
 */
function filterProducts() {
    let filteredProducts = allProducts;
    
    if (currentCategory !== 'all') {
        filteredProducts = allProducts.filter(p => p.category.id === currentCategory);
    }
    
    renderProducts(filteredProducts);
}

// ============================================
// Product Modal
// ============================================

function initProductModal() {
    const modal = document.getElementById('productModal');
    const closeBtn = document.getElementById('modalClose');
    
    // Close modal on overlay click
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProductModal();
        }
    });
    
    // Close modal on close button click
    closeBtn?.addEventListener('click', closeProductModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeProductModal();
        }
    });
}

/**
 * Open product modal
 * @param {object} product - Product data
 */
function openProductModal(product) {
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    // Build modal content
    modalBody.innerHTML = `
        <div class="modal-image">
            ${product.image 
                ? `<img src="${product.image}" alt="${product.name}">`
                : `
                    <div class="placeholder-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                            <polyline points="13 2 13 9 20 9"/>
                        </svg>
                    </div>
                `
            }
        </div>
        
        <div class="modal-category">${product.category.name}</div>
        <h2 class="modal-title">${product.name}</h2>
        <p class="modal-description">${product.description}</p>
        
        <div class="modal-price-section">
            <div class="modal-price">
                ${product.onSale && product.originalPrice
                    ? `
                        $${product.salePrice.toFixed(2)}
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                    `
                    : `$${product.price.toFixed(2)}`
                }
            </div>
        </div>
        
        <button class="add-to-basket-btn" data-product-id="${product.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Add to Basket
        </button>
        
        ${product.fancyUrl 
            ? `<a href="product.html?slug=${product.fancyUrl}" class="view-full-page">View Full Product Page →</a>`
            : `<a href="product.html?id=${product.id}" class="view-full-page">View Full Product Page →</a>`
        }
    `;
    
    // Add to basket button handler
    const addToBasketBtn = modalBody.querySelector('.add-to-basket-btn');
    addToBasketBtn.addEventListener('click', () => {
        addToBasket(product);
    });
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close product modal
 */
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal?.classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Shopping Basket
// ============================================

let basket = null;

function initBasket() {
    const basketBtn = document.getElementById('basketBtn');
    const mobileBasketBtn = document.getElementById('mobileBasketBtn');
    const basketOverlay = document.getElementById('basketOverlay');
    const basketClose = document.getElementById('basketClose');
    
    // Open basket
    basketBtn?.addEventListener('click', () => {
        basketOverlay?.classList.add('active');
    });
    
    mobileBasketBtn?.addEventListener('click', () => {
        basketOverlay?.classList.add('active');
    });
    
    // Close basket
    basketClose?.addEventListener('click', () => {
        basketOverlay?.classList.remove('active');
    });
    
    // Close on overlay click
    basketOverlay?.addEventListener('click', (e) => {
        if (e.target === basketOverlay) {
            basketOverlay.classList.remove('active');
        }
    });
    
    // Load existing basket
    loadBasket();
}

/**
 * Load basket from storage or API
 */
async function loadBasket() {
    const basketId = window.TebexAPI.loadBasketId();
    
    if (basketId) {
        try {
            basket = await window.TebexAPI.fetchBasket(basketId);
            updateBasketUI();
        } catch (error) {
            console.error('Error loading basket:', error);
            createNewBasket();
        }
    } else {
        createNewBasket();
    }
}

/**
 * Create a new basket
 */
async function createNewBasket() {
    try {
        basket = await window.TebexAPI.createBasket();
        window.TebexAPI.saveBasketId(basket.id);
        updateBasketUI();
    } catch (error) {
        console.error('Error creating basket:', error);
        // Use mock basket for demo
        basket = { id: 'mock-basket', items: [] };
        updateBasketUI();
    }
}

/**
 * Add product to basket
 * @param {object} product - Product to add
 */
async function addToBasket(product) {
    try {
        if (!basket || !basket.id) {
            await createNewBasket();
        }
        
        await window.TebexAPI.addToBasket(basket.id, product.id);
        
        // Reload basket
        await loadBasket();
        
        // Show basket
        document.getElementById('basketOverlay')?.classList.add('active');
        
        // Show success feedback
        showNotification('Added to basket!');
    } catch (error) {
        console.error('Error adding to basket:', error);
        
        // For demo, add to mock basket
        if (basket.items) {
            basket.items.push({
                id: Date.now(),
                package_id: product.id,
                name: product.name,
                price: product.salePrice || product.price,
                quantity: 1
            });
            updateBasketUI();
            showNotification('Added to basket!');
        }
    }
}

/**
 * Remove item from basket
 * @param {number} itemId - Item ID to remove
 */
async function removeFromBasket(itemId) {
    try {
        if (basket && basket.id) {
            await window.TebexAPI.removeFromBasket(basket.id, itemId);
            await loadBasket();
        }
    } catch (error) {
        console.error('Error removing from basket:', error);
        
        // For demo, remove from mock basket
        if (basket.items) {
            basket.items = basket.items.filter(item => item.id !== itemId);
            updateBasketUI();
        }
    }
}

/**
 * Update basket UI
 */
function updateBasketUI() {
    const basketCount = document.getElementById('basketCount');
    const mobileBasketCount = document.getElementById('mobileBasketCount');
    const basketItems = document.getElementById('basketItems');
    const basketTotal = document.getElementById('basketTotal');
    const basketFooter = document.getElementById('basketFooter');
    const basketEmpty = document.getElementById('basketEmpty');
    
    if (!basket) return;
    
    // Update counts
    const itemCount = window.TebexAPI.getBasketItemCount(basket);
    const total = window.TebexAPI.calculateBasketTotal(basket);
    
    basketCount.textContent = itemCount;
    basketCount.dataset.count = itemCount;
    mobileBasketCount.textContent = itemCount;
    
    // Update items
    if (basket.items && basket.items.length > 0) {
        basketItems.innerHTML = '';
        
        basket.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'basket-item';
            itemEl.innerHTML = `
                <div class="basket-item-image">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 100%; height: 100%; padding: 10px; color: var(--primary-gold);">
                        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                        <polyline points="13 2 13 9 20 9"/>
                    </svg>
                </div>
                <div class="basket-item-details">
                    <div class="basket-item-title">${item.name}</div>
                    <div class="basket-item-price">$${item.price.toFixed(2)}</div>
                    <button class="basket-item-remove" data-item-id="${item.id}">Remove</button>
                </div>
            `;
            
            // Remove button handler
            const removeBtn = itemEl.querySelector('.basket-item-remove');
            removeBtn.addEventListener('click', () => removeFromBasket(item.id));
            
            basketItems.appendChild(itemEl);
        });
        
        // Show footer
        basketFooter?.classList.add('active');
        basketEmpty?.classList.remove('active');
        
        // Update total
        basketTotal.textContent = `$${total.toFixed(2)}`;
    } else {
        basketItems.innerHTML = '';
        basketFooter?.classList.remove('active');
        basketEmpty?.classList.add('active');
    }
}

// ============================================
// Notification System
// ============================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ============================================
// Shared Functions (same as index.js)
// ============================================

function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            const spans = this.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
        
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileNav.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    
    if (header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
}

function initPageTransitions() {
    const transition = document.querySelector('.page-transition');
    const links = document.querySelectorAll('a[href$=".html"]');
    
    if (transition) {
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === window.location.pathname || href.startsWith('#') || this.target === '_blank') {
                    return;
                }
                
                e.preventDefault();
                transition.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                transition.classList.remove('active');
            }, 100);
        });
    }
}