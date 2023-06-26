let cartItems = [];

function addToCart(product, quantity = 1) {
    const existingItem = cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ product, quantity });
    }
}

function removeFromCart(product) {
    cartItems = cartItems.filter(item => item.product.id !== product.id);
}

function clearCart() {
    cartItems = [];
}

function getCartItems() {
    return cartItems;
}

function getTotalAmount() {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export {
    addToCart,
    removeFromCart,
    clearCart,
    getCartItems,
    getTotalAmount
}
