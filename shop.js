let allProducts = [];
let filteredProducts = [];

// 1️⃣ Load all products
async function loadProducts() {
  let res = await fetch('https://fakestoreapi.com/products');
  allProducts = await res.json();
  filteredProducts = allProducts;
  renderProducts();
}

// 2️⃣ Load categories into dropdown (alphabetical)
async function loadCategoriesDropdown() {
  let res = await fetch('https://fakestoreapi.com/products/categories');
  let categories = await res.json();

  // Sort alphabetically
  categories.sort((a, b) => a.localeCompare(b));

  let dropdown = document.getElementById("categoryDropdown");
  categories.forEach(cat => {
    let option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });
}

// 3️⃣ Render products
function renderProducts() {
  let container = document.getElementById("productList");
  container.innerHTML = "";

  if(filteredProducts.length === 0){
    container.innerHTML = `<p class="text-center">No products found.</p>`;
    return;
  }

  filteredProducts.forEach(product => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h6 class="card-title">${product.title}</h6>
            <p class="card-text">$${product.price} | ${product.category}</p>
          </div>
        </div>
      </div>
    `;
  });
}

// 4️⃣ Filter products based on dropdowns
function filterProductsDropdown() {
  let categoryValue = document.getElementById("categoryDropdown").value;
  let priceValue = document.getElementById("priceDropdown").value;

  filteredProducts = allProducts.filter(p => {
    // Category filter
    let categoryMatch = categoryValue === "all" || p.category === categoryValue;

    // Price filter
    let priceMatch = true;
    if(priceValue !== "all") {
      let [min, max] = priceValue.split("-").map(Number);
      priceMatch = p.price >= min && p.price <= max;
    }

    return categoryMatch && priceMatch;
  });

  renderProducts();
}

// 5️⃣ Event listeners
document.getElementById("categoryDropdown").addEventListener("change", filterProductsDropdown);
document.getElementById("priceDropdown").addEventListener("change", filterProductsDropdown);

// 6️⃣ Initialize
loadProducts();
loadCategoriesDropdown();

// 7️⃣ Add to Cart Popup
function addToCart(title, price) {
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-price").innerText = `$${price}`;
    document.getElementById("popup").classList.add("active");
}

function closePopup() {
  document.getElementById("popup").classList.remove("active");
}

// Product Details Page
// Get product ID from query string (e.g., ?id=1)
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id') || 1; // Default to 1 if no id provided

// Select HTML elements
const productImg = document.getElementById('product-img');
const productTitle = document.getElementById('product-title');
const productCategory = document.getElementById('product-category');
const productDescription = document.getElementById('product-description');
const productPrice = document.getElementById('product-price');
const productRating = document.getElementById('product-rating');
const addToCartBtn = document.getElementById('add-to-cart');

// Fetch product data
fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
        productImg.src = product.image;
        productTitle.textContent = product.title;
        productCategory.textContent = product.category;
        productDescription.textContent = product.description;
        productPrice.textContent = `$${product.price.toFixed(2)}`;
        productRating.textContent = `Rating: ★ ${product.rating.rate} (${product.rating.count} reviews)`;
    })
    .catch(err => console.error(err));

// Add to Cart functionality
addToCartBtn.addEventListener('click', () => {
    alert('Product added to cart!');
});
