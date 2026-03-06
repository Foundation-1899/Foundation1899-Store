// ============================================
// Tebex Headless API Integration
// ============================================

// Tebex API Configuration
const TEBEX_CONFIG = {
    // IMPORTANT: Replace this with your actual Tebex Headless API key
    // Get your API key from: https://docs.tebex.io/developers/headless-api/overview
    API_KEY: '11pj5-c2611b98dfd78eaca620a0e2f72214bab56cbb8d',
    
    // API Base URLs
    BASE_URL: 'https://headless.tebex.io/api',
    BASKET_BASE_URL: 'https://checkout.tebex.io/api',
    
    // Endpoints
    ENDPOINTS: {
        CATEGORIES: '/categories',
        PACKAGES: '/packages',
        BASKET: '/basket',
        ADD_TO_BASKET: '/basket/add'
    }
};

// ============================================
// API Request Handler
// ============================================

/**
 * Make an authenticated request to the Tebex API
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
async function tebexRequest(endpoint, options = {}) {
    try {
        const url = `${TEBEX_CONFIG.BASE_URL}${endpoint}`;
        
        const headers = {
            'Content-Type': 'application/json',
            'X-Tebex-Secret': TEBEX_CONFIG.API_KEY,
            ...options.headers
        };
        
        const response = await fetch(url, {
            ...options,
            headers
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || 
                errorData.error || 
                `API request failed: ${response.status} ${response.statusText}`
            );
        }
        
        return await response.json();
    } catch (error) {
        console.error('Tebex API Error:', error);
        throw error;
    }
}

// ============================================
// Categories API
// ============================================

/**
 * Fetch all categories from Tebex
 * @returns {Promise<Array>} Array of categories
 */
async function fetchCategories() {
    try {
        const data = await tebexRequest(TEBEX_CONFIG.ENDPOINTS.CATEGORIES);
        return data.data || data || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

// ============================================
// Packages/Products API
// ============================================

/**
 * Fetch all packages from Tebex
 * @param {number} categoryId - Optional category ID to filter by
 * @returns {Promise<Array>} Array of packages
 */
async function fetchPackages(categoryId = null) {
    try {
        let endpoint = TEBEX_CONFIG.ENDPOINTS.PACKAGES;
        
        // Add category filter if provided
        if (categoryId) {
            endpoint += `?category=${categoryId}`;
        }
        
        const data = await tebexRequest(endpoint);
        return data.data || data || [];
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
}

/**
 * Fetch a single package by ID
 * @param {number} packageId - Package ID
 * @returns {Promise<Object>} Package data
 */
async function fetchPackage(packageId) {
    try {
        const data = await tebexRequest(`${TEBEX_CONFIG.ENDPOINTS.PACKAGES}/${packageId}`);
        return data.data || data;
    } catch (error) {
        console.error('Error fetching package:', error);
        throw error;
    }
}

// ============================================
// Basket API
// ============================================

/**
 * Fetch current basket from Tebex
 * @param {string} basketId - Basket ID (optional, creates new if not provided)
 * @returns {Promise<Object>} Basket data
 */
async function fetchBasket(basketId = null) {
    try {
        let endpoint = TEBEX_CONFIG.ENDPOINTS.BASKET;
        
        if (basketId) {
            endpoint += `/${basketId}`;
        }
        
        const url = `${TEBEX_CONFIG.BASKET_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            // Create new basket if not found
            if (response.status === 404) {
                return createBasket();
            }
            throw new Error(`Basket request failed: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching basket:', error);
        throw error;
    }
}

/**
 * Create a new basket
 * @returns {Promise<Object>} New basket data
 */
async function createBasket() {
    try {
        const url = `${TEBEX_CONFIG.BASKET_BASE_URL}${TEBEX_CONFIG.ENDPOINTS.BASKET}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to create basket: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating basket:', error);
        throw error;
    }
}

/**
 * Add a package to the basket
 * @param {string} basketId - Basket ID
 * @param {number} packageId - Package ID
 * @param {object} options - Additional options (quantity, etc.)
 * @returns {Promise<Object>} Updated basket data
 */
async function addToBasket(basketId, packageId, options = {}) {
    try {
        const url = `${TEBEX_CONFIG.BASKET_BASE_URL}${TEBEX_CONFIG.ENDPOINTS.ADD_TO_BASKET}`;
        
        const body = {
            package_id: packageId,
            quantity: options.quantity || 1,
            ...options
        };
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || 
                errorData.error || 
                `Failed to add to basket: ${response.status}`
            );
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error adding to basket:', error);
        throw error;
    }
}

/**
 * Remove an item from the basket
 * @param {string} basketId - Basket ID
 * @param {number} itemId - Item ID to remove
 * @returns {Promise<Object>} Updated basket data
 */
async function removeFromBasket(basketId, itemId) {
    try {
        const url = `${TEBEX_CONFIG.BASKET_BASE_URL}${TEBEX_CONFIG.ENDPOINTS.BASKET}/${basketId}/remove`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item_id: itemId })
        });
        
        if (!response.ok) {
            throw new Error(`Failed to remove from basket: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error removing from basket:', error);
        throw error;
    }
}

// ============================================
// Data Formatting Helpers
// ============================================

/**
 * Format package data for display
 * @param {object} packageData - Raw package data from API
 * @returns {object} Formatted package data
 */
function formatPackage(packageData) {
    return {
        id: packageData.id,
        name: packageData.name || 'Unknown Package',
        description: packageData.description || '',
        price: packageData.price || 0,
        originalPrice: packageData.sale_price ? packageData.price : null,
        salePrice: packageData.sale_price || null,
        image: packageData.image || null,
        category: packageData.category || {
            id: null,
            name: 'Uncategorized'
        },
        tags: packageData.tags || [],
        onSale: !!packageData.sale_price,
        fancyUrl: packageData.fancy_url || null
    };
}

/**
 * Format category data for display
 * @param {object} categoryData - Raw category data from API
 * @returns {object} Formatted category data
 */
function formatCategory(categoryData) {
    return {
        id: categoryData.id,
        name: categoryData.name || 'Unknown Category',
        order: categoryData.order || 0,
        packageCount: categoryData.package_count || 0
    };
}

/**
 * Calculate basket total
 * @param {object} basket - Basket data
 * @returns {number} Total price
 */
function calculateBasketTotal(basket) {
    if (!basket || !basket.items) return 0;
    
    return basket.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
}

/**
 * Get basket item count
 * @param {object} basket - Basket data
 * @returns {number} Total number of items
 */
function getBasketItemCount(basket) {
    if (!basket || !basket.items) return 0;
    
    return basket.items.reduce((count, item) => count + item.quantity, 0);
}

// ============================================
// Local Storage Helpers
// ============================================

/**
 * Save basket ID to local storage
 * @param {string} basketId - Basket ID to save
 */
function saveBasketId(basketId) {
    localStorage.setItem('tebex_basket_id', basketId);
}

/**
 * Load basket ID from local storage
 * @returns {string|null} Basket ID or null
 */
function loadBasketId() {
    return localStorage.getItem('tebex_basket_id');
}

/**
 * Clear basket ID from local storage
 */
function clearBasketId() {
    localStorage.removeItem('tebex_basket_id');
}

// ============================================
// Export API functions
// ============================================

// Export for use in other scripts
window.TebexAPI = {
    config: TEBEX_CONFIG,
    
    // API methods
    fetchCategories,
    fetchPackages,
    fetchPackage,
    
    // Basket methods
    fetchBasket,
    createBasket,
    addToBasket,
    removeFromBasket,
    
    // Helper methods
    formatPackage,
    formatCategory,
    calculateBasketTotal,
    getBasketItemCount,
    
    // Storage methods
    saveBasketId,
    loadBasketId,
    clearBasketId
};

console.log('Tebex API initialized');