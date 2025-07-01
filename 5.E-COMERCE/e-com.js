document.addEventListener('DOMContentLoaded', () => {
    // Cart state management
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCounter = document.querySelector('.cart-counter');
    const cartModal = document.querySelector('.cart-modal');
    const overlay = document.querySelector('.overlay');
    const cartItemsList = document.querySelector('#cart-items');
    const totalDisplay = document.querySelector('.total');
    const searchBar = document.querySelector('.search-bar');
  
    // Toast notification
    function showToast(message) {
      const toast = document.createElement('div');
      toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #ff2e63;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
      `;
      toast.textContent = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  
    // Update cart UI and local storage
    function updateCart() {
      cartCounter.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartItemsList.innerHTML = '';
      let total = 0;
  
      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = `
          <div>
            ${item.name}: ₹${item.price} × ${item.quantity}
            <div style="margin-top: 5px;">
              <button onclick="updateQuantity(${index}, -1)" style="background: #ff2e63; color: #fff; border: none; padding: 0.2rem 0.5rem; border-radius: 5px;">-</button>
              <button onclick="updateQuantity(${index}, 1)" style="background: #ff2e63; color: #fff; border: none; padding: 0.2rem 0.5rem; border-radius: 5px;">+</button>
              <button onclick="removeFromCart(${index})" style="background: #d81b60; color: #fff; border: none; padding: 0.2rem 0.5rem; border-radius: 5px;">Remove</button>
            </div>
          </div>
        `;
        cartItemsList.appendChild(li);
      });
  
      totalDisplay.textContent = `Total: ₹${total.toFixed(2)}`;
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Update item quantity
    window.updateQuantity = (index, change) => {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
        showToast('Item removed from cart');
      } else {
        showToast(`Updated ${cart[index].name} quantity`);
      }
      updateCart();
    };
  
    // Remove item from cart
    window.removeFromCart = (index) => {
      const itemName = cart[index].name;
      cart.splice(index, 1);
      showToast(`${itemName} removed from cart`);
      updateCart();
    };
  
    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Add to cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const name = button.dataset.name;
        const price = parseInt(button.dataset.price);
        const existingItem = cart.find(item => item.name === name);
  
        if (existingItem) {
          existingItem.quantity += 1;
          showToast(`Added another ${name} to cart`);
        } else {
          cart.push({ name, price, quantity: 1 });
          showToast(`${name} added to cart`);
        }
  
        updateCart();
        button.textContent = 'Added!';
        button.disabled = true;
        setTimeout(() => {
          button.textContent = 'Add to Cart';
          button.disabled = false;
        }, 1000);
      });
    });
  
    // Cart modal toggle
    document.querySelector('.cart-link').addEventListener('click', (e) => {
      e.preventDefault();
      cartModal.classList.add('active');
      overlay.classList.add('active');
    });
  
    document.querySelector('.close-btn').addEventListener('click', () => {
      cartModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  
    overlay.addEventListener('click', () => {
      cartModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  
    // Debounced search
    let searchTimeout;
    searchBar.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const query = searchBar.value.toLowerCase();
        document.querySelectorAll('.product-item').forEach(item => {
          const name = item.querySelector('h3').textContent.toLowerCase();
          item.style.display = name.includes(query) ? 'block' : 'none';
        });
      }, 300);
    });
  
    // Category filtering (assuming categories are linked to products)
    document.querySelectorAll('.category-item').forEach(category => {
      category.addEventListener('click', (e) => {
        e.preventDefault();
        const categoryName = category.querySelector('h3').textContent.toLowerCase();
        document.querySelectorAll('.product-item').forEach(item => {
          const name = item.querySelector('h3').textContent.toLowerCase();
          // Simplified category matching (can be enhanced with data attributes)
          const isMatch = categoryName === 'fashion (clothes/shoes)' ? name.includes('slippers') :
                          categoryName === 'electronics' ? name.includes('latches') :
                          categoryName === 'mobiles' ? name.includes('bottles') : true;
          item.style.display = isMatch ? 'block' : 'none';
        });
        showToast(`Filtered by ${categoryName}`);
      });
    });
  
    // Initialize cart
    updateCart();
  
    // CSS for toast animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  });