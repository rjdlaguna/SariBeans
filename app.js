// Data
const products = [
    {
        id: 1,
        name: "Barako Blend",
        price: 180,
        category: "signature",
        badge: "⭐ Signature",
        description: "Strong and bold Liberica coffee from Batangas, known for its distinctive aroma",
        image: "https://images.unsplash.com/photo-1632663742505-4c15bd972c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
        fullDescription: "Experience the authentic taste of Filipino Barako coffee. This strong and bold Liberica blend from Batangas carries a distinctive aroma that coffee enthusiasts love. Perfect for those who prefer a full-bodied cup with character."
    },
    {
        id: 2,
        name: "Sagada Arabica",
        price: 160,
        category: "traditional",
        badge: "☕ Best Seller",
        description: "Smooth and balanced coffee from the Mountain Province, with hints of chocolate",
        image: "https://images.unsplash.com/photo-1623086923609-594e98bb0bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
        fullDescription: "Sourced from the cool highlands of Sagada, this Arabica coffee offers a smooth and balanced taste with subtle chocolate notes. A favorite among our customers for its refined flavor profile."
    },
    {
        id: 3,
        name: "Benguet Organic",
        price: 170,
        category: "traditional",
        badge: "🌿 Organic",
        description: "Sustainably grown Arabica with floral notes and natural sweetness",
        image: "https://images.unsplash.com/photo-1544421604-4bfaaeba6830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
        fullDescription: "Certified organic and sustainably grown in Benguet, this Arabica coffee features delicate floral notes and natural sweetness. Perfect for the environmentally conscious coffee lover."
    }
];

const locations = [
    {
        name: "Makati Branch",
        address: "123 Ayala Avenue, Makati City",
        hours: "Mon-Fri: 7AM-9PM | Sat-Sun: 8AM-10PM",
        phone: "+63 2 1234 5678",
        image: "https://images.unsplash.com/photo-1684006997322-6a5128f44816?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
    },
    {
        name: "BGC Branch",
        address: "456 High Street, Bonifacio Global City",
        hours: "Mon-Sun: 7AM-10PM",
        phone: "+63 2 8765 4321",
        image: "https://images.unsplash.com/photo-1623086923609-594e98bb0bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
    },
    {
        name: "Quezon City Branch",
        address: "789 Tomas Morato, Quezon City",
        hours: "Mon-Fri: 7AM-9PM | Sat-Sun: 8AM-11PM",
        phone: "+63 2 9876 5432",
        image: "https://images.unsplash.com/photo-1764516627486-db9aa6ba6132?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
    }
];

const menuItems = {
    signature: [
        { name: "Ube Latte (8oz/12oz/16oz)", price: "₱140/150/160" },
        { name: "Pandan Latte (8oz/12oz/16oz)", price: "₱140/150/160" },
        { name: "Mango Latte (8oz/12oz/16oz)", price: "₱140/150/160" },
        { name: "Leche Latte (8oz/12oz/16oz)", price: "₱140/150/160" },
        { name: "Dirty Matcha Latte (12oz/16oz)", price: "₱175/190" },
        { name: "Dirty Horchata (12oz/16oz)", price: "₱150/170" }
    ],
    traditional: [
        { name: "Americano (8oz/12oz/16oz)", price: "₱110/120/130" },
        { name: "Long Black (8oz/12oz/16oz)", price: "₱110/120/130" },
        { name: "Cappuccino (8oz/12oz/16oz)", price: "₱130/140/150" },
        { name: "Latte (8oz/12oz/16oz)", price: "₱130/140/150" },
        { name: "Flat White (8oz/12oz/16oz)", price: "₱130/140/150" }
    ],
    matcha: [
        { name: "Ube Matcha Latte (12oz/16oz)", price: "₱170/185" },
        { name: "Pandan Matcha Latte (12oz/16oz)", price: "₱170/185" },
        { name: "Mango Pandan Latte (12oz/16oz)", price: "₱170/185" },
        { name: "Matcha Latte (12oz/16oz)", price: "₱160/175" }
    ],
    horchata: [
        { name: "Ube Horchata (12oz/16oz)", price: "₱145/165" },
        { name: "Pandan Horchata (12oz/16oz)", price: "₱145/165" },
        { name: "Mango Horchata (12oz/16oz)", price: "₱145/165" },
        { name: "Horchata (12oz/16oz)", price: "₱130/150" }
    ],
    refreshers: [
        { name: "Honey Calamansi Fizz (12oz/16oz)", price: "₱100/115" },
        { name: "Mango Calamansi Fizz (12oz/16oz)", price: "₱100/115" },
        { name: "Calamansi Fizz (12oz/16oz)", price: "₱100/115" }
    ]
};

const customAddOns = {
    espresso: [
        { name: "1 Espresso Shot", price: "+₱30" },
        { name: "2 Espresso Shots", price: "+₱40" }
    ],
    sweetness: [
        { name: "Less Sweetness", price: "FREE" },
        { name: "Normal Sweetness", price: "FREE" },
        { name: "More Sweetness", price: "+₱15" }
    ],
    milk: [
        { name: "Soy Milk", price: "+₱30" },
        { name: "Oat Milk", price: "+₱40" }
    ],
    ice: [
        { name: "Less Ice", price: "FREE" },
        { name: "Normal Ice", price: "FREE" },
        { name: "More Ice", price: "FREE" }
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderLocations();
    renderMenu('all');
    setupEventListeners();
    setupScroll();
    document.getElementById('year').textContent = new Date().getFullYear();
});

// Render Products
function renderProducts() {
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-badge">${product.badge}</div>
            </div>
            <div class="product-content">
                <div class="product-header">
                    <h3 class="product-name">${product.name}</h3>
                    <span class="product-price">₱${product.price}</span>
                </div>
                <p class="product-description">${product.description}</p>
                <button class="product-button" onclick="addToCart(${product.id}, event)">Order Now</button>
            </div>
        </div>
    `).join('');
}

// Render Locations
function renderLocations() {
    const grid = document.getElementById('locations-grid');
    grid.innerHTML = locations.map(location => `
        <div class="location-card">
            <div class="location-image">
                <img src="${location.image}" alt="${location.name}">
            </div>
            <div class="location-content">
                <h3 class="location-name">${location.name}</h3>
                <div class="location-details">
                    <div class="location-detail">
                        <span class="location-icon">📍</span>
                        <p class="location-text">${location.address}</p>
                    </div>
                    <div class="location-detail">
                        <span class="location-icon">🕒</span>
                        <p class="location-text">${location.hours}</p>
                    </div>
                    <div class="location-detail">
                        <span class="location-icon">📞</span>
                        <p class="location-text">${location.phone}</p>
                    </div>
                </div>
                <button class="location-button">Get Directions</button>
            </div>
        </div>
    `).join('');
}

// Render Menu
function renderMenu(category) {
    const menuContainer = document.getElementById('menu-categories');
    let html = '';
    
    const categoryIcons = {
        signature: '✨',
        traditional: '☕',
        matcha: '🍵',
        horchata: '🥛',
        refreshers: '💧'
    };
    
    const categoryColors = {
        signature: '#C9A961',
        traditional: '#D4845C',
        matcha: '#8B9E7E',
        horchata: '#FF6B35',
        refreshers: '#6B9BD1'
    };
    
    const categoryTitles = {
        signature: 'Signatures',
        traditional: 'Classics',
        matcha: 'Matcha (Hot/Cold)',
        horchata: 'Horchata (Cold)',
        refreshers: 'Refreshers (Cold)'
    };

    if (category === 'all') {
        Object.keys(menuItems).forEach(cat => {
            html += createMenuCategory(cat, menuItems[cat], categoryIcons[cat], categoryColors[cat], categoryTitles[cat]);
        });
    } else {
        html = createMenuCategory(category, menuItems[category], categoryIcons[category], categoryColors[category], categoryTitles[category]);
    }
    
    menuContainer.innerHTML = html;
}

function createMenuCategory(cat, items, icon, color, title) {
    return `
        <div class="menu-category">
            <div class="menu-category-header">
                <div class="menu-category-icon" style="background-color: ${color};">${icon}</div>
                <h3 class="menu-category-title">${title}</h3>
            </div>
            <div class="menu-items">
                ${items.map(item => `
                    <div class="menu-item" onclick="this.style.backgroundColor = 'rgba(201, 169, 97, 0.2)'">
                        <span class="menu-item-name">${item.name}</span>
                        <span class="menu-item-price">${item.price}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    const modal = document.getElementById('product-modal');
    const modalBody = document.getElementById('modal-body');
    
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="modal-product-image">
        <h2 class="modal-product-name">${product.name}</h2>
        <p class="modal-product-price">₱${product.price}</p>
        <p class="modal-product-description">${product.fullDescription}</p>
        <button class="modal-add-to-cart" onclick="addToCart(${product.id}, event)">Add to Cart</button>
    `;
    
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
}

// Add to Cart
async function addToCart(productId, event) {
    event.stopPropagation();
    const product = products.find(p => p.id === productId);

    // Get or create session ID
    let sessionId = localStorage.getItem('cartSessionId');
    if (!sessionId) {
        sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('cartSessionId', sessionId);
    }

    try {
        const response = await fetch(`http://localhost:3000/api/cart/${sessionId}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            })
        });

        const result = await response.json();

        if (result.success) {
            // Show notification
            const notification = document.getElementById('cart-notification');
            notification.innerHTML = `✅ Added <strong>${product.name}</strong> to cart! <a href="cart.html" id="view-cart-link">View Cart</a>`;
            notification.style.display = 'block';

            // Auto-hide notification
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        // Fallback to local notification
        const notification = document.getElementById('cart-notification');
        notification.innerHTML = `❌ Failed to add <strong>${product.name}</strong> to cart. Please try again.`;
        notification.style.display = 'block';
        notification.style.backgroundColor = '#E53E3E';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    // Close modal if open
    closeModal();
}

// Menu Filter
function setupEventListeners() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.getAttribute('data-filter');
            renderMenu(filter);
        });
    });
    
    // Modal close
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            alert(`Thank you! We'll send updates to ${email}`);
            this.reset();
        });
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    const menuIcon = document.getElementById('menu-icon');
    
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        menuIcon.textContent = '☰';
    } else {
        mobileNav.classList.add('active');
        menuIcon.textContent = '✕';
    }
}

// Scroll Effects
function setupScroll() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu
                const mobileNav = document.getElementById('mobile-nav');
                if (mobileNav.classList.contains('active')) {
                    toggleMobileMenu();
                }
            }
        });
    });
}