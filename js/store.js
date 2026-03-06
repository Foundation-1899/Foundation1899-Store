const TEBEX_PUBLIC_TOKEN = '11pj5-c2611b98dfd78eaca620a0e2f72214bab56cbb8d'; 
const TEBEX_API_URL = `https://headless.tebex.io/api/accounts/${TEBEX_PUBLIC_TOKEN}`;

let globalPackages = [];

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories(); // Fetch categories first
    fetchPackages();
});

// --- CATEGORY LOGIC ---
async function fetchCategories() {
    try {
        const response = await fetch(`${TEBEX_API_URL}/categories`);
        const data = await response.json();
        renderCategories(data.data);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

function renderCategories(categories) {
    const container = document.getElementById('category-container');
    
    categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.className = "hover:text-gold transition pb-2 filter-btn uppercase";
        btn.innerText = cat.name;
        // When clicked, filter by this category's ID
        btn.onclick = () => filterProducts(cat.id, btn);
        container.appendChild(btn);
    });
}

function filterProducts(categoryId, clickedBtn) {
    // 1. Reset all buttons to gray
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('text-gold', 'border-b', 'border-gold');
    });
    
    // 2. Highlight the clicked button in gold
    clickedBtn.classList.add('text-gold', 'border-b', 'border-gold');

    // 3. Filter the grid
    if (categoryId === 'all') {
        renderProducts(globalPackages);
    } else {
        const filtered = globalPackages.filter(pkg => pkg.category && pkg.category.id === categoryId);
        renderProducts(filtered);
    }
}


// --- PACKAGE LOGIC ---
async function fetchPackages() {
    try {
        const response = await fetch(`${TEBEX_API_URL}/packages`);
        const data = await response.json();
        globalPackages = data.data;
        renderProducts(globalPackages); // Initially render ALL packages
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

    if (packages.length === 0) {
        grid.innerHTML = '<p class="text-gray-500 italic">No scripts found in this category.</p>';
        return;
    }

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
        alert(`${pkg.name} is already in your ledger!`);
        return;
    }
    cart.push(pkg);
    localStorage.setItem('f1899_cart', JSON.stringify(cart));
    
    // Quick visual feedback on the button
    const originalText = event.target.innerText;
    event.target.innerText = "ADDED TO LEDGER!";
    event.target.style.backgroundColor = "#4ade80"; // Green
    setTimeout(() => {
        event.target.innerText = originalText;
        event.target.style.backgroundColor = ""; 
    }, 2000);
}