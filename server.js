const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));


let carts = {};

// Routes
app.get('/api/cart/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    const cart = carts[sessionId] || [];
    res.json(cart);
});

app.post('/api/cart/:sessionId/add', (req, res) => {
    const { sessionId } = req.params;
    const { productId, name, price, quantity = 1 } = req.body;

    if (!carts[sessionId]) {
        carts[sessionId] = [];
    }

    const existingItem = carts[sessionId].find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        carts[sessionId].push({
            productId,
            name,
            price,
            quantity
        });
    }

    res.json({ success: true, cart: carts[sessionId] });
});

app.put('/api/cart/:sessionId/update/:productId', (req, res) => {
    const { sessionId, productId } = req.params;
    const { quantity } = req.body;

    if (!carts[sessionId]) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    const item = carts[sessionId].find(item => item.productId === parseInt(productId));

    if (!item) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    if (quantity <= 0) {
        carts[sessionId] = carts[sessionId].filter(item => item.productId !== parseInt(productId));
    } else {
        item.quantity = quantity;
    }

    res.json({ success: true, cart: carts[sessionId] });
});

app.delete('/api/cart/:sessionId/remove/:productId', (req, res) => {
    const { sessionId, productId } = req.params;

    if (!carts[sessionId]) {
        return res.status(404).json({ error: 'Cart not found' });
    }

    carts[sessionId] = carts[sessionId].filter(item => item.productId !== parseInt(productId));

    res.json({ success: true, cart: carts[sessionId] });
});

app.delete('/api/cart/:sessionId', (req, res) => {
    const { sessionId } = req.params;
    delete carts[sessionId];
    res.json({ success: true });
});


app.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'cart.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
