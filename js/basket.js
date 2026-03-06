// js/basket.js
const TEBEX_PUBLIC_TOKEN = 'YOUR_PUBLIC_WEBSTORE_TOKEN_HERE';
const TEBEX_API_URL = `https://headless.tebex.io/api/accounts/${TEBEX_PUBLIC_TOKEN}`;

document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is returning from the FiveM/Cfx.re login screen
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auth_return') === 'true') {
        const basketIdent = urlParams.get('basket_ident');
        processPendingCheckout(basketIdent);
        return; // Stop rendering normal basket, we are checking out!
    }

    // Otherwise, render the normal basket
    renderBasket();
});

// Helper function to safely get price
function getPrice(pkg) {
    if (pkg.total_price !== undefined && pkg.total_price !== null) return parseFloat(pkg.total_price);
    if (pkg.base_price !== undefined && pkg.base_price !== null) return parseFloat(pkg.base_price);
    if (pkg.price !== undefined && pkg.price !== null) return parseFloat(pkg.price);
    return 0.00;
}

function renderBasket() {
    const cart = JSON.parse(localStorage.getItem('f1899_cart')) || [];
    const container = document.getElementById('basket-items');
    const subtotalEl = document.getElementById('basket-subtotal');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-gray-500">Your ledger is currently empty.</p>';
        subtotalEl.innerText = '$0.00';
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
        return;
    }

    container.innerHTML = '';
    let total = 0;

    cart.forEach(pkg => {
        let price = getPrice(pkg);
        total += price;

        const imageUrl = pkg.image ? pkg.image : 'https://via.placeholder.com/100x100/151412/dcb36b?text=F1899';

        container.innerHTML += `
            <div class="flex items-center justify-between p-4 card-bg border border-gray-800">
                <div class="flex items-center space-x-4">
                    <img src="${imageUrl}" alt="${pkg.name}" class="w-16 h-16 object-cover border border-gray-700">
                    <div>
                        <h3 class="text-lg font-serif text-white">${pkg.name}</h3>
                        <p class="text-xs text-gold">${pkg.category.name || 'Script'}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-6">
                    <span class="text-lg font-bold text-white">$${price.toFixed(2)}</span>
                    <button onclick="removeItem(${pkg.id})" class="text-gray-500 hover:text-red-500 transition text-sm">
                        ✕
                    </button>
                </div>
            </div>
        `;
    });

    subtotalEl.innerText = `$${total.toFixed(2)} USD`;
}

function removeItem(packageId) {
    let cart = JSON.parse(localStorage.getItem('f1899_cart')) || [];
    cart = cart.filter(item => item.id !== packageId);
    localStorage.setItem('f1899_cart', JSON.stringify(cart));
    renderBasket(); // Re-draw
}

// ==========================================
// CHECKOUT & CFX.RE AUTHENTICATION LOGIC
// ==========================================

async function beginCheckout() {
    const cart = JSON.parse(localStorage.getItem('f1899_cart')) || [];
    if (cart.length === 0) return;

    const btn = document.getElementById('checkout-btn');
    btn.innerText = 'AUTHORIZING...';
    btn.disabled = true;

    try {
        // 1. Create Empty Tebex Basket
        const basketRes = await fetch(`${TEBEX_API_URL}/baskets`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const basketData = await basketRes.json();
        const basketIdent = basketData.data.ident;

        // 2. Ask Tebex for the Cfx.re login link. 
        // We tell Tebex to send the user back to THIS exact page, adding special URL parameters.
        const returnUrl = window.location.href.split('?')[0] + `?auth_return=true&basket_ident=${basketIdent}`;
        const authRes = await fetch(`${TEBEX_API_URL}/baskets/${basketIdent}/auth?returnUrl=${encodeURIComponent(returnUrl)}`);
        const authData = await authRes.json();
        
        // 3. Send user away to log in
        window.location.href = authData.data[0].url; 

    } catch (error) {
        console.error('Checkout error:', error);
        alert('Could not start checkout. Please ensure your Tebex API key is correct.');
        btn.innerText = 'PROCEED TO CHECKOUT';
        btn.disabled = false;
    }
}

// Runs when Tebex bounces the user back to basket.html after successful Cfx login
async function processPendingCheckout(basketIdent) {
    const container = document.getElementById('basket-items');
    container.innerHTML = '<p class="text-gold animate-pulse text-lg">Authenticating Cfx.re and securing assets... Please do not close this page.</p>';
    
    document.getElementById('checkout-btn').innerText = 'PROCESSING...';

    const cart = JSON.parse(localStorage.getItem('f1899_cart')) || [];

    try {
        // 1. Add ALL local cart items into the now-authenticated Tebex Basket
        for (let pkg of cart) {
            await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ package_id: pkg.id, quantity: 1 })
            });
        }

        // 2. Get the final payment link
        const finalBasketRes = await fetch(`${TEBEX_API_URL}/baskets/${basketIdent}`);
        const finalBasketData = await finalBasketRes.json();
        
        // 3. Clear local cart so it's empty next time they visit
        localStorage.removeItem('f1899_cart');

        // 4. Send them to Tebex to input their credit card!
        window.location.href = finalBasketData.data.links.checkout;

    } catch (error) {
        console.error('Finalization error:', error);
        alert('An error occurred while securing your assets. Please try checking out again.');
        // Strip the URL parameters and refresh the page to let them try again
        window.location.href = window.location.href.split('?')[0];
    }
}