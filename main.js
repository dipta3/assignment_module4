import products from './product.js';
import { addToCart, removeFromCart, clearCart, getCartItems, getTotalAmount } from './cart.js';


function displayProducts() {
    const productList = document.getElementById('product-list');

    products.map(product => {
        console.log(product.img);
        const item = document.createElement('div');
        item.innerHTML = `
        <div class=" flex justify-center items-center">
        <div class="max-w-sm rounded-xl overflow-hidden shadow-lg">
        <img class="w-full p-2 rounded-xl"  src="${product.img}" alt="">
        <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">${product.name}</div>
            <p class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
             $${product.price.toFixed(2)}
            </p>
            <button class="add-to-cart bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" data-product-id="${product.id}">Add to Cart</button>
        </div>
        </div>
        </div>
      
    `;
        productList.appendChild(item);
    });
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    const cartItems = getCartItems();

    cartItems.map(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('item');
        cartItem.innerHTML = `
        <span class='font-bold'>${item.product.name}</span>
        <button class="quantity-decrease bg-green-500 text-xs text-white font-bold py-1 px-1 rounded-full" data-product-id="${item.product.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-increase bg-green-500 text-xs text-white font-bold py-1 px-1 rounded-full" data-product-id="${item.product.id}">+</button>
        <span class="text-yellow-500 font-bold">$${(item.product.price * item.quantity).toFixed(2)}</span>
        <button class="remove-from-cart bg-red-500 hover:bg-red-700 text-white text-xs mt-2 font-bold py-1 px-1 rounded" data-product-id="${item.product.id}">Remove</button>
      `;
        cartItemsDiv.appendChild(cartItem);
    });

    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `$${getTotalAmount().toFixed(2)}`;
}

function addEventListeners() {
    const productList = document.getElementById('product-list');
    const clearCartBtn = document.getElementById('clear-cart');
    const discountInput = document.getElementById('discount-input');
    const applyDiscountBtn = document.getElementById('apply-discount');

    productList.addEventListener('click', e => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            const product = products.find(product => product.id === productId);
            addToCart(product);
            displayCartItems();
        }
    });

    clearCartBtn.addEventListener('click', () => {
        clearCart();
        displayCartItems();
    });

    applyDiscountBtn.addEventListener('click', () => {
        const discount = parseFloat(discountInput.value);
        if (!isNaN(discount)) {
            applyDiscount(discount);
        }
    });

    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.addEventListener('click', e => {
        if (e.target.classList.contains('quantity-decrease')) {
            const productId = parseInt(e.target.dataset.productId);
            const product = products.find(product => product.id === productId);
            decreaseQuantity(product);
        } else if (e.target.classList.contains('quantity-increase')) {
            const productId = parseInt(e.target.dataset.productId);
            const product = products.find(product => product.id === productId);
            increaseQuantity(product);
        } else if (e.target.classList.contains('remove-from-cart')) {
            const productId = parseInt(e.target.dataset.productId);
            const product = products.find(product => product.id === productId);
            removeFromCart(product);
        }
        displayCartItems();
    });
}

function applyDiscount(discount) {
    const totalAmount = getTotalAmount();
    const discountAmount = (totalAmount * discount) / 100;
    const discountedTotal = totalAmount - discountAmount;

    const cartTotal = document.getElementById('cart-total');
    cartTotal.textContent = `$${discountedTotal.toFixed(2)}`;
}

function increaseQuantity(product) {
    addToCart(product, 1);
    displayCartItems();
}

function decreaseQuantity(product) {
    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.product.id === product.id);

    if (existingItem) {
        if (existingItem.quantity > 1) {
            existingItem.quantity--;
        } else {
            removeFromCart(product);
        }
    }

    displayCartItems();
}

function init() {
    displayProducts();
    displayCartItems();
    addEventListeners();
}

init();
