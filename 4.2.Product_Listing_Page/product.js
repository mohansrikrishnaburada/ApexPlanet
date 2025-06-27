const products = [
    { id: 1, name: "Smartphone", category: "electronics", price: 33599, rating: 4.5, image: "Smart phone.webp" },
    { id: 2, name: "Laptop", category: "electronics", price: 150000, rating: 4.8, image: "Laptop.avif" },
    { id: 3, name: "T-Shirt", category: "clothing", price: 3000, rating: 4.0, image: "tshirt.webp" },
    { id: 4, name: "Jeans", category: "clothing", price: 2500, rating: 4.2, image: "Jeans.jpg" },
    { id: 5, name: "Novel", category: "books", price: 1500, rating: 4.7, image: "Novel.webp" },
    { id: 6, name: "Textbook", category: "books", price: 890, rating: 4.3, image: "textbook.png" },
    { id: 7, name: "Watch", category: "accessories", price: 2999, rating: 4.4, image: "watch.webp" },
    { id: 8, name: "Sunglasses", category: "accessories", price: 799, rating: 4.1, image: "Sunglasses.jpg" },
    { id: 9, name: "Blender", category: "home-kitchen", price: 1029, rating: 4.6, image: "Blender.jpg" },
    { id: 10, name: "Cookware Set", category: "home-kitchen", price: 649, rating: 4.8, image: "cookware.webp" },
    { id: 11, name: "Tennis Racket", category: "sports-outdoors", price: 1089, rating: 4.3, image: "tennis.webp" },
    { id: 12, name: "Camping Tent", category: "sports-outdoors", price: 1359, rating: 4.5, image: "campingtent.jpg" }
];

function displayProducts(products) {
    const productGrid = document.getElementById('product-grid');
    const loadingSpinner = document.getElementById('loading');
    
    // Show loading spinner
    productGrid.classList.add('opacity-50');
    loadingSpinner.classList.remove('hidden');

    // Simulate async loading for better UX
    setTimeout(() => {
        productGrid.innerHTML = '';

        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.style.animationDelay = `${index * 0.1}s`;
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
                <div class="info">
                    <h3 class="text-xl font-semibold text-gray-800">${product.name}</h3>
                    <p class="text-gray-600">₹${product.price.toFixed(2)}</p>
                    <p class="star-rating">Rating: ${'★'.repeat(Math.floor(product.rating))} (${product.rating})</p>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Hide loading spinner
        productGrid.classList.remove('opacity-50');
        loadingSpinner.classList.add('hidden');
    }, 300); // Short delay for smooth transition
}

function filterAndSortProducts() {
    const category = document.getElementById('category').value;
    const maxPrice = parseFloat(document.getElementById('price').value) || Infinity;
    const sortOption = document.getElementById('sort').value;

    let filteredProducts = products.filter(product => {
        return (category === 'all' || product.category === category) && product.price <= maxPrice;
    });

    filteredProducts.sort((a, b) => {
        if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
        if (sortOption === 'name-desc') return b.name.localeCompare(a.name);
        if (sortOption === 'price-asc') return a.price - b.price;
        if (sortOption === 'price-desc') return b.price - a.price;
        if (sortOption === 'rating-desc') return b.rating - a.rating;
        return 0;
    });

    displayProducts(filteredProducts);
}

// Event listeners for filters and sort
document.getElementById('category').addEventListener('change', filterAndSortProducts);
document.getElementById('price').addEventListener('input', filterAndSortProducts);
document.getElementById('sort').addEventListener('change', filterAndSortProducts);

// Initial display
displayProducts(products);