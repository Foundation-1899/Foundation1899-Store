const TEBEX_PUBLIC_TOKEN = '11pj5-c2611b98dfd78eaca620a0e2f72214bab56cbb8d'; 
// store.js
const TEBEX_PUBLIC_TOKEN = 'YOUR_PUBLIC_WEBSTORE_TOKEN_HERE'; 
const TEBEX_STORE_URL = 'https://redm.foundation1899.com';

const TEBEX_API_URL = `https://headless.tebex.io/api/accounts/${TEBEX_PUBLIC_TOKEN}`;

document.addEventListener('DOMContentLoaded', () => {
    fetchPackages();
});

async function fetchPackages() {
    try {
        const response = await fetch(`${TEBEX_API_URL}/packages`);
        const data = await response.json();
        renderProducts(data.data);
    } catch (error) {
        console.error('Error fetching packages:', error);
        document.getElementById('product-grid').innerHTML = '<p class="text-red-500">Failed to load store packages.</p>';
    }
}

function renderProducts(packages) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; 

    packages.forEach(pkg => {
        const imageUrl = pkg.image ? pkg.image : 'https://via.placeholder.com/400x200/151412/dcb36b?text=Foundation+1899';
        
        // FIX: Properly pull the price variable from the Tebex payload
        let price = "0.00";
        if (pkg.total_price !== undefined) price = pkg.total_price;
        else if (pkg.base_price !== undefined) price = pkg.base_price;
        else if (pkg.price !== undefined) price = pkg.price;

        const card = document.createElement('div');
        card.className = 'card-bg flex flex-col';
        
        card.innerHTML = `
            <div class="relative">
                <img src="${imageUrl}" alt="${pkg.name}" class="w-full h-48 object-cover opacity-80">
                
                <div class="absolute top-0 right-0 bg-black/80 text-gold text-[10px] px-2 py-1 m-2 border border-gold/30 font-bold tracking-wider">
                    NEW
                </div>
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
                    
                    <a href="${TEBEX_STORE_URL}/package/${pkg.id}" 
                       class="buy-btn px-6 py-2 text-xs font-bold tracking-widest cursor-pointer text-center">
                        BUY ON TEBEX
                    </a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}
