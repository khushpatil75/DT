// Menu Data
const menuItems = [
    {
        id: 1,
        name: "Masala Dosa",
        description: "Crispy rice crepe stuffed with spiced potato filling, served with sambar and chutney",
        price: 60,
        category: "breakfast",
        image: "md.jpeg"
    },
    {
        id: 2,
        name: "Idli Sambar",
        description: "Steamed rice cakes served with lentil soup and coconut chutney",
        price: 40,
        category: "breakfast",
        image: "id.jpeg"
    },
    {
        id: 3,
        name: "Poha",
        description: "Flattened rice cooked with onions, peanuts and mild spices",
        price: 35,
        category: "breakfast",
        image: "poha.jpeg"
    },
    {
        id: 4,
        name: "Upma",
        description: "Semolina cooked with vegetables and mild spices",
        price: 30,
        category: "breakfast",
        image: "upma.jpeg"
    },
    {
        id: 5,
        name: "Vada Pav",
        description: "Spicy potato fritter sandwiched in a bun with chutneys",
        price: 25,
        category: "snacks",
        image: "vada.jpeg"
    },
    {
        id: 6,
        name: "Samosa",
        description: "Crispy pastry stuffed with spiced potatoes and peas",
        price: 20,
        category: "snacks",
        image: "samosa.jpg"
    },
    {
        id: 7,
        name: "Pav Bhaji",
        description: "Spicy mashed vegetables served with buttered buns",
        price: 70,
        category: "snacks",
        image: "pavbhaji.jpeg"
    },
    {
        id: 8,
        name: "Chole Bhature",
        description: "Spicy chickpea curry with deep-fried bread",
        price: 80,
        category: "lunch",
        image: "cb.jpeg"
    },
    {
        id: 9,
        name: "Thali",
        description: "Complete meal with rice, roti, dal, vegetables, curd and salad",
        price: 100,
        category: "lunch",
        image: "thali.jpeg"
    },
    {
        id: 10,
        name: "Biryani",
        description: "Fragrant rice cooked with spices and vegetables",
        price: 90,
        category: "lunch",
        image: "biryani.jpeg"
    },
    {
        id: 11,
        name: "Dal Khichdi",
        description: "Comfort food made with rice, lentils and mild spices",
        price: 70,
        category: "dinner",
        image: "dal khichadi.jpeg"
    },
    {
        id: 12,
        name: "Roti Sabzi",
        description: "Indian bread with mixed vegetable curry",
        price: 60,
        category: "dinner",
        image: "roti.jpeg"
    },
    {
        id: 13,
        name: "Chai",
        description: "Traditional Indian spiced tea",
        price: 15,
        category: "beverages",
        image: "chai.jpeg"
    },
    {
        id: 14,
        name: "Coffee",
        description: "Hot filter coffee",
        price: 20,
        category: "beverages",
        image: "cofee.jpeg"
    },
    {
        id: 15,
        name: "Lassi",
        description: "Sweet yogurt drink",
        price: 30,
        category: "beverages",
        image: "lassi.jpeg"
    },
    {
        id: 16,
        name: "Cold Drink",
        description: "Soft drink (Pepsi/Coke/Sprite)",
        price: 25,
        category: "beverages",
        image: "coldrink.jpeg"
    }
];

// DOM Elements
const menuItemsContainer = document.getElementById('menuItems');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartModal = document.getElementById('cartModal');
const overlay = document.getElementById('overlay');
const cartIcon = document.getElementById('cartIcon');
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');
const orderNowBtn = document.getElementById('orderNowBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

// Cart State
let cart = [];

// Initialize the app
function init() {
    renderMenuItems(menuItems);
    setupEventListeners();
    loadCart();
}

// Render menu items
function renderMenuItems(items) {
    menuItemsContainer.innerHTML = '';
    
    items.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.dataset.id = item.id;
        menuItemElement.dataset.category = item.category;
        
        menuItemElement.innerHTML = `
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="item-details">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-desc">${item.description}</p>
                <div class="item-price">
                    <span class="price">₹${item.price}</span>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        `;
        
        menuItemsContainer.appendChild(menuItemElement);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Add to cart buttons
    menuItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const menuItem = e.target.closest('.menu-item');
            const itemId = parseInt(menuItem.dataset.id);
            addToCart(itemId);
        }
    });
    
    // Cart icon click
    cartIcon.addEventListener('click', openCart);
    
    // Close cart
    closeCart.addEventListener('click', closeCartModal);
    overlay.addEventListener('click', closeCartModal);
    
    // Checkout button
    checkoutBtn.addEventListener('click', checkout);
    
    // Order now button
    orderNowBtn.addEventListener('click', () => {
        document.querySelector('.menu-section').scrollIntoView({ behavior: 'smooth' });
    });
    
    // Category filter buttons
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            filterMenuItems(category);
        });
    });
}

// Filter menu items by category
function filterMenuItems(category) {
    if (category === 'all') {
        renderMenuItems(menuItems);
        return;
    }
    
    const filteredItems = menuItems.filter(item => item.category === category);
    renderMenuItems(filteredItems);
}

// Add item to cart
function addToCart(itemId) {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const menuItem = menuItems.find(item => item.id === itemId);
        cart.push({
            ...menuItem,
            quantity: 1
        });
    }
    
    updateCart();
    showAddToCartAnimation(itemId);
}

// Show add to cart animation
function showAddToCartAnimation(itemId) {
    const itemElement = document.querySelector(`.menu-item[data-id="${itemId}"]`);
    const addButton = itemElement.querySelector('.add-to-cart');
    
    addButton.textContent = 'Added!';
    addButton.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        addButton.textContent = 'Add to Cart';
        addButton.style.backgroundColor = '#d32f2f';
    }, 1000);
}

// Remove item from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCart();
}

// Update item quantity in cart
function updateCartItemQuantity(itemId, newQuantity) {
    const cartItem = cart.find(item => item.id === itemId);
    
    if (cartItem) {
        if (newQuantity <= 0) {
            removeFromCart(itemId);
        } else {
            cartItem.quantity = newQuantity;
        }
    }
    
    updateCart();
}

// Update cart UI
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Save cart to localStorage
    saveCart();
    
    // Render cart items
    renderCartItems();
}

// Render cart items
function renderCartItems() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious items from our menu</p>
            </div>
        `;
        cartTotal.textContent = '₹0';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.dataset.id = item.id;
        
        cartItemElement.innerHTML = `
            <div class="cart-item-img">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} x ${item.quantity} = ₹${itemTotal}</div>
                <div class="cart-item-actions">
                    <button class="quantity-btn minus">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus">+</button>
                    <button class="remove-item">Remove</button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItemElement);
    });
    
    cartTotal.textContent = `₹${total}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            const quantityElement = cartItem.querySelector('.quantity');
            const newQuantity = parseInt(quantityElement.textContent) - 1;
            updateCartItemQuantity(itemId, newQuantity);
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            const quantityElement = cartItem.querySelector('.quantity');
            const newQuantity = parseInt(quantityElement.textContent) + 1;
            updateCartItemQuantity(itemId, newQuantity);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cartItem = e.target.closest('.cart-item');
            const itemId = parseInt(cartItem.dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Open cart modal
function openCart() {
    cartModal.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCartModal() {
    cartModal.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`Order placed successfully! Total: ₹${total}\n\nYour food will be ready in 20 minutes.`);
    
    // Clear cart
    cart = [];
    updateCart();
    closeCartModal();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('mitaoeCanteenCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('mitaoeCanteenCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
}

// Initialize the app
init();
document.getElementById("checkoutBtn").addEventListener("click", function () {
    // You can clear the cart here if needed
    showSuccessPopup();
});

function showSuccessPopup() {
    const popup = document.getElementById("orderSuccessPopup");
    popup.classList.remove("hidden");
    popup.style.display = "block";
}

function closeSuccessPopup() {
    const popup = document.getElementById("orderSuccessPopup");
    popup.classList.add("hidden");
    popup.style.display = "none";

    // Optionally close cart modal too
    document.getElementById("cartModal").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    // Clear cart UI (optional)
    document.getElementById("cartItemsContainer").innerHTML = "";
    document.getElementById("cartTotal").innerText = "₹0";
    document.getElementById("cartCount").innerText = "0";
}
