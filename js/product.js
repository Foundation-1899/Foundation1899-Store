// ============================================
// Product Page JavaScript
// Handles individual product display
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initHeaderScroll();
    initPageTransitions();
    initBasket();
    loadProduct();
});

// ============================================
// Product Loading
// ============================================

let currentProduct = null;

/**
 * Load product from URL parameter or API
 */
async function loadProduct() {
    const loading = document.getElementById('productLoading');
    const error = document.getElementById('productError');
    const content = document.getElementById('productContent');
    
    // Get product ID or slug from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productSlug = urlParams.get('slug');
    
    if (!productId && !productSlug) {
        showError('No product specified');
        return;
    }
    
    try {
        // Check if API key is configured
        if (!window.TebexAPI.config.API_KEY || window.TebexAPI.config.API_KEY === 'YOUR_TEBEX_API_KEY_HERE') {
            console.log('API key not configured, loading mock product');
            loadMockProduct(productId || productSlug);
            return;
        }
        
        // Fetch product from API
        let product;
        if (productId) {
            product = await window.TebexAPI.fetchPackage(productId);
        } else {
            // If slug provided, fetch all packages and find by fancy URL
            const packages = await window.TebexAPI.fetchPackages();
            product = packages.find(p => p.fancy_url === productSlug);
            if (!product) {
                throw new Error('Product not found');
            }
        }
        
        currentProduct = window.TebexAPI.formatPackage(product);
        renderProduct();
        
        // Show content
        loading.style.display = 'none';
        error.style.display = 'none';
        content.style.display = 'block';
    } catch (err) {
        console.error('Error loading product:', err);
        showError(err.message);
    }
}

/**
 * Load mock product for demonstration
 * @param {string|number} productId - Product ID
 */
function loadMockProduct(productId) {
    // Mock products data
    const mockProducts = {
        '1': {
            id: 1,
            name: 'Premium Banking System',
            description: 'A comprehensive banking system designed specifically for RedM roleplay servers. This premium script includes ATMs, bank branches, loans, savings accounts, and investment features. Fully integrated with the RedM economy, it provides a realistic and immersive financial experience for players.\n\nFeatures:\n• Multiple bank locations with custom interiors\n• ATM network across the map\n• Loan system with interest rates and repayment schedules\n• Savings accounts with configurable interest\n• Investment system tied to server economy\n• Full admin panel for managing accounts\n• Detailed transaction history\n• Integration with other economy scripts\n\nInstallation:\nComes with detailed documentation and setup guide. Requires minimal configuration to get started. Compatible with most popular frameworks.',
            price: 29.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 1, name: 'Economy Systems' },
            tags: ['economy', 'banking', 'roleplay', 'financial'],
            onSale: false,
            fancyUrl: 'premium-banking-system'
        },
        '2': {
            id: 2,
            name: 'Mining Job System',
            description: 'Complete mining job with multiple ore types, realistic mining mechanics, and dynamic payout system based on market prices.\n\nPlayers can work as miners, extracting various ores from designated mining locations. The system includes skill progression, tool requirements, and a dynamic economy where ore prices fluctuate based on supply and demand.',
            price: 24.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 2, name: 'Job Systems' },
            tags: ['jobs', 'mining', 'economy'],
            onSale: false,
            fancyUrl: 'mining-job-system'
        },
        '3': {
            id: 3,
            name: 'Blacksmith Crafting',
            description: 'Realistic blacksmith crafting system with multiple recipes, skill progression, and quality tiers based on player skill level.\n\nFeatures:\n• Multiple crafting recipes\n• Skill-based quality system\n• Material requirements\n• Custom tool durability\n• Integration with mining and resource gathering jobs',
            price: 19.99,
            originalPrice: 24.99,
            salePrice: 19.99,
            image: null,
            category: { id: 3, name: 'Roleplay Mechanics' },
            tags: ['crafting', 'roleplay', 'skills'],
            onSale: true,
            fancyUrl: 'blacksmith-crafting'
        },
        '4': {
            id: 4,
            name: 'Saloon Management',
            description: 'Run your own saloon with this comprehensive management system. Serve drinks, hire staff, and manage inventory. Perfect for roleplay servers looking to add business ownership opportunities.\n\nIncludes drink recipes, staff management, customer interactions, and financial tracking.',
            price: 34.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 3, name: 'Roleplay Mechanics' },
            tags: ['roleplay', 'business', 'management'],
            onSale: false,
            fancyUrl: 'saloon-management'
        },
        '5': {
            id: 5,
            name: 'Wagon Dealer Network',
            description: 'Complete wagon dealership system with test drives, financing options, and customer management tools. Players can browse, purchase, and customize their wagons through an immersive dealership experience.',
            price: 39.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 4, name: 'Vehicle Systems' },
            tags: ['vehicles', 'business', 'dealership'],
            onSale: false,
            fancyUrl: 'wagon-dealer-network'
        },
        '6': {
            id: 6,
            name: 'Horse Breeding System',
            description: 'Advanced horse breeding with genetics, inheritance, and stat tracking. Build your perfect bloodline through careful breeding and selection.\n\nFeatures:\n• Genetic traits system\n• Stat inheritance\n• Breeding cooldowns\n• Stable management\n• Pedigree tracking',
            price: 29.99,
            originalPrice: null,
            salePrice: null,
            image: null,
            category: { id: 4, name: 'Vehicle Systems' },
            tags: ['animals', 'breeding', 'horses'],
            onSale: false,
            fancyUrl: 'horse-breeding-system'
        }
    };
    
    // Find product by ID or slug
    let product = mockProducts[productId];
    if (!product) {
        // Try to find by slug (fancyUrl)
        for (const key in mockProducts) {
            if (mockProducts[key].fancyUrl === productId) {
                product = mockProducts[key];
                break;
            }
        }
    }
    
    if (!product) {
        showError('Product not found');
        return;
    }
    
    currentProduct = product;
    renderProduct();
    
    // Show content
    document.getElementById('productLoading').style.display = 'none';
    document.getElementById('productError').style.display = 'none';
    document.getElementById('productContent').style.display = 'block';
}

/**
 * Render product details
 */
function renderProduct() {
    if (!currentProduct) return;
    
    // Update page title
    document.title = `${currentProduct.name} - Foundation 1899 Store`;
    
    // Update breadcrumb
    document.getElementById('breadcrumbProduct').textContent = currentProduct.name;
    
    // Update main image
    const mainImage = document.getElementById('mainImage');
    if (currentProduct.image) {
        mainImage.innerHTML = `<img src="${currentProduct.image}" alt="${currentProduct.name}">`;
    } else {
        mainImage.innerHTML = `
            <div class="placeholder-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                    <polyline points="13 2 13 9 20 9"/>
                </svg>
            </div>
        `;
    }
    
    // Update product info
    document.getElementById('productCategory').textContent = currentProduct.category.name;
    document.getElementById('productTitle').textContent = currentProduct.name;
    
    // Update pricing
    const pricingEl = document.getElementById('productPricing');
    if (currentProduct.onSale && currentProduct.originalPrice) {
        pricingEl.innerHTML = `
            <span class="current-price">$${currentProduct.salePrice.toFixed(2)}</span>
            <span class="original-price">$${currentProduct.originalPrice.toFixed(2)}</span>
            <span class="sale-badge">Sale</span>
        `;
    } else {
        pricingEl.innerHTML = `<span class="current-price">$${currentProduct.price.toFixed(2)}</span>`;
    }
    
    // Update description
    document.getElementById('productDescription').textContent = currentProduct.description;
    
    // Update tags
    const tagsEl = document.getElementById('productTags');
    tagsEl.innerHTML = '';
    currentProduct.tags.forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = 'tag';
        tagEl.textContent = tag;
        tagsEl.appendChild(tagEl);
    });
    
    // Add to basket button handler
    const addToBasketBtn = document.getElementById('addToBasketBtn');
    addToBasketBtn.addEventListener('click', () => {
        addToBasket(currentProduct);
    });
}

/**
 * Show error state
 * @param {string} message - Error message
 */
function showError(message) {
    document.getElementById('productLoading').style.display = 'none';
    document.getElementById('productContent').style.display = 'none';
    document.getElementById('productError').style.display = 'flex';
    document.getElementById('productErrorMessage').textContent = message;
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
    
    basketBtn?.addEventListener('click', () => {
        basketOverlay?.classList.add('active');
    });
    
    mobileBasketBtn?.addEventListener('click', () => {
        basketOverlay?.classList.add('active');
    });
    
    basketClose?.addEventListener('click', () => {
        basketOverlay?.classList.remove('active');
    });
    
    basketOverlay?.addEventListener('click', (e) => {
        if (e.target === basketOverlay) {
            basketOverlay.classList.remove('active');
        }
    });
    
    loadBasket();
}

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

async function createNewBasket() {
    try {
        basket = await window.TebexAPI.createBasket();
        window.TebexAPI.saveBasketId(basket.id);
        updateBasketUI();
    } catch (error) {
        console.error('Error creating basket:', error);
        basket = { id: 'mock-basket', items: [] };
        updateBasketUI();
    }
}

async function addToBasket(product) {
    try {
        if (!basket || !basket.id) {
            await createNewBasket();
        }
        
        await window.TebexAPI.addToBasket(basket.id, product.id);
        await loadBasket();
        
        document.getElementById('basketOverlay')?.classList.add('active');
        showNotification('Added to basket!');
    } catch (error) {
        console.error('Error adding to basket:', error);
        
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

async function removeFromBasket(itemId) {
    try {
        if (basket && basket.id) {
            await window.TebexAPI.removeFromBasket(basket.id, itemId);
            await loadBasket();
        }
    } catch (error) {
        console.error('Error removing from basket:', error);
        
        if (basket.items) {
            basket.items = basket.items.filter(item => item.id !== itemId);
            updateBasketUI();
        }
    }
}

function updateBasketUI() {
    const basketCount = document.getElementById('basketCount');
    const mobileBasketCount = document.getElementById('mobileBasketCount');
    const basketItems = document.getElementById('basketItems');
    const basketTotal = document.getElementById('basketTotal');
    const basketFooter = document.getElementById('basketFooter');
    const basketEmpty = document.getElementById('basketEmpty');
    
    if (!basket) return;
    
    const itemCount = window.TebexAPI.getBasketItemCount(basket);
    const total = window.TebexAPI.calculateBasketTotal(basket);
    
    basketCount.textContent = itemCount;
    basketCount.dataset.count = itemCount;
    mobileBasketCount.textContent = itemCount;
    
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
            
            const removeBtn = itemEl.querySelector('.basket-item-remove');
            removeBtn.addEventListener('click', () => removeFromBasket(item.id));
            
            basketItems.appendChild(itemEl);
        });
        
        basketFooter?.classList.add('active');
        basketEmpty?.classList.remove('active');
        basketTotal.textContent = `$${total.toFixed(2)}`;
    } else {
        basketItems.innerHTML = '';
        basketFooter?.classList.remove('active');
        basketEmpty?.classList.add('active');
    }
}

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
// Shared Functions
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
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
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