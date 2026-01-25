// Cart functionality
class CartManager {
    constructor() {
        this.sessionId = this.getSessionId();
        this.apiUrl = 'http://localhost:3000/api';
        this.init();
    }

    getSessionId() {
        let sessionId = localStorage.getItem('cartSessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('cartSessionId', sessionId);
        }
        return sessionId;
    }

    async init() {
        await this.loadCart();
        this.setupEventListeners();
    }

    async loadCart() {
        try {
            const response = await fetch(`${this.apiUrl}/cart/${this.sessionId}`);
            const cart = await response.json();
            this.renderCart(cart);
        } catch (error) {
            console.error('Error loading cart:', error);
            this.showEmptyCart();
        }
    }

    renderCart(cart) {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummaryContainer = document.getElementById('cart-summary');

        if (!cart || cart.length === 0) {
            this.showEmptyCart();
            return;
        }

        // Render cart items
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-product-id="${item.productId}">
                <img src="${this.getProductImage(item.productId)}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₱${item.price}</div>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.productId}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1"
                               onchange="cartManager.updateQuantity(${item.productId}, this.value)">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.productId}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="remove-btn" onclick="cartManager.removeItem(${item.productId})">🗑️</button>
                </div>
            </div>
        `).join('');

        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.12; // 12% VAT
        const total = subtotal + tax;

        // Render summary
        cartSummaryContainer.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>₱${subtotal.toFixed(2)}</span>
            </div>
            <div class="summary-row">
                <span>Tax (12%)</span>
                <span>₱${tax.toFixed(2)}</span>
            </div>
            <div class="summary-row summary-total">
                <span>Total</span>
                <span>₱${total.toFixed(2)}</span>
            </div>
            <button class="checkout-btn" onclick="cartManager.checkout()">Proceed to Checkout</button>
        `;
    }

    showEmptyCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartSummaryContainer = document.getElementById('cart-summary');

        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some delicious coffee to get started!</p>
                <a href="index.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;

        cartSummaryContainer.innerHTML = `
            <h3>Order Summary</h3>
            <div class="summary-row summary-total">
                <span>Total</span>
                <span>₱0.00</span>
            </div>
        `;
    }

    getProductImage(productId) {
        // This should match the images from app.js
        const imageMap = {
            1: "https://images.unsplash.com/photo-1632663742505-4c15bd972c0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
            2: "https://images.unsplash.com/photo-1623086923609-594e98bb0bff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg",
            3: "https://images.unsplash.com/photo-1544421604-4bfaaeba6830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg"
        };
        return imageMap[productId] || "https://images.unsplash.com/photo-1544421604-4bfaaeba6830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg";
    }

    async addToCart(productId, name, price, quantity = 1) {
        try {
            const response = await fetch(`${this.apiUrl}/cart/${this.sessionId}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, name, price, quantity })
            });

            const result = await response.json();

            if (result.success) {
                this.showNotification(`Added ${name} to cart!`);
                // Reload cart if we're on the cart page
                if (window.location.pathname.includes('cart.html')) {
                    await this.loadCart();
                }
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            this.showNotification('Error adding item to cart', 'error');
        }
    }

    async updateQuantity(productId, newQuantity) {
        newQuantity = parseInt(newQuantity);
        if (newQuantity < 1) {
            this.removeItem(productId);
            return;
        }

        try {
            const response = await fetch(`${this.apiUrl}/cart/${this.sessionId}/update/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            const result = await response.json();

            if (result.success) {
                await this.loadCart();
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    }

    async removeItem(productId) {
        try {
            const response = await fetch(`${this.apiUrl}/cart/${this.sessionId}/remove/${productId}`, {
                method: 'DELETE'
            });

            const result = await response.json();

            if (result.success) {
                await this.loadCart();
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    }

    checkout() {
        alert('Checkout functionality would be implemented here with payment processing.');
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48BB78' : '#E53E3E'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            font-weight: 500;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    setupEventListeners() {
        // Mobile menu toggle (reuse from main site)
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', this.toggleMobileMenu);
        }
    }

    toggleMobileMenu() {
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
}

// Initialize cart manager
const cartManager = new CartManager();

// Make cartManager available globally for onclick handlers
window.cartManager = cartManager;
