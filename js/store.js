const TEBEX_PUBLIC_TOKEN = '11pj5-c2611b98dfd78eaca620a0e2f72214bab56cbb8d'; 
const TEBEX_API_URL = `https://headless.tebex.io/api/accounts/${TEBEX_PUBLIC_TOKEN}`;

let globalPackages = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchPackages();
});

async function fetchPackages() {
    try {
        const response = await fetch(`${TEBEX_API_URL}/packages`);
        const data = await response.json();
        globalPackages = data.data;
        renderProducts(globalPackages);
    } catch (error) {
        console.error('Error fetching packages:', error);
        document.getElementById('product-grid').innerHTML = '<p class="text-red-500">Failed to load scripts.</p>';
    }
}

function getPrice(pkg) {
    if (pkg.total_price !== undefined && pkg.total_price !== null) return pkg.total_price;
    if (pkg.base_price !== undefined && pkg.base_price !== null) return pkg.base_price;
    if (pkg.price !== undefined && pkg.price !== null) return pkg.price;
    return "0.00";
}

function renderProducts(packages) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    packages.forEach(pkg => {
        const imageUrl = pkg.image ? pkg.image : 'https://via.placeholder.com/400x200/151412/dcb36b?text=Foundation+1899';
        const price = getPrice(pkg);

        const card = document.createElement('div');
        card.className = 'card-bg flex flex-col';
        
        card.innerHTML = `
            <div class="relative">
                <img src="${imageUrl}" alt="${pkg.name}" class="w-full h-48 object-cover opacity-80">
            </div>
            
            <div class="p-6 flex flex-col flex-grow">
                <div class="mb-4">
                    <span class="text-[10px] text-gold border border-gold/30 px-2 py-1 uppercase tracking-widest">
                        ${pkg.category.name || 'Quality of Life'}
                    </span>
                </div>
                
                <h2 class="text-xl font-serif text-white mb-3">${pkg.name}</h2>
                <div class="text-sm text-gray-400 mb-6 flex-grow tebex-desc">
                    ${pkg.description}
                </div>
                
                <div class="flex justify-between items-center pt-4 border-t border-gray-800/50 mt-auto">
                    <span class="text-xl text-gold font-serif font-bold">
                        $${price} <span class="text-xs text-gray-500 font-sans font-normal">${pkg.currency || 'USD'}</span>
                    </span>
                    
                    <button onclick="addToCart(${pkg.id})" 
                       class="buy-btn px-6 py-2 text-xs font-bold tracking-widest cursor-pointer text-center border-none">
                        ADD TO CART
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function addToCart(packageId) {
    const pkg = globalPackages.find(p => p.id === packageId);
    if (!pkg) return;
    let cart = JSON.parse(localStorage.getItem('f1899_cart')) || [];
    if (cart.find(item => item.id === packageId)) {
        alert(`${pkg.name} is already in your cart!`);
        return;
    }
    cart.push(pkg);
    localStorage.setItem('f1899_cart', JSON.stringify(cart));
    event.target.innerText = "ADDED!";
    event.target.style.backgroundColor = "#4ade80";
    setTimeout(() => {
        event.target.innerText = "ADD TO CART";
        event.target.style.backgroundColor = ""; 
    }, 2000);
}