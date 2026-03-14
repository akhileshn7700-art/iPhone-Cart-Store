const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    price: 1199,
    image: "images/Iphone 1.png",
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    image: "images/Iphone 2.png",
  },
  {
    id: 3,
    name: "iPhone 15",
    price: 799,
    image: "images/Iphone 3.png",
  },
  {
    id: 4,
    name: "iPhone 14 Pro Max",
    price: 1099,
    image: "images/Iphone 4.png",
  },
  {
    id: 5,
    name: "iPhone 14 Pro",
    price: 999,
    image: "images/Iphone 5.png",
  },
  {
    id: 6,
    name: "iPhone 14",
    price: 799,
    image: "images/Iphone 6.png",
  },
  {
    id: 7,
    name: "iPhone 13 Pro Max",
    price: 999,
    image: "images/Iphone 7.png",
  },
  {
    id: 8,
    name: "iPhone 13 Pro",
    price: 899,
    image: "images/Iphone 8.png",
  },
  {
    id: 9,
    name: "iPhone 13",
    price: 799,
    image: "images/Iphone 9.png",
  },
  {
    id: 10,
    name: "iPhone 12",
    price: 699,
    image: "images/Iphone 10.png",
  }
];
let cart = [];

function searchProducts() {
  let query = document.getElementById("search").value.toLowerCase();

  let filtered = products.filter((product) => {
    return product.name.toLocaleLowerCase().includes(query);
  });
  displayProducts(filtered);
}

function displayProducts(filtered = products) {
  let productDiv = document.getElementById("products");
  productDiv.innerHTML = "";
  filtered.forEach((product) => {
    let productContainer = document.createElement("div");
    productContainer.classList.add("product");
    productContainer.innerHTML = `
          <img
            class="img1"
            src="${product.image}"
            alt=""
          />
          <p class="p1">${product.name}</p>
          <p class="p2">${product.price}</p>
          <button class="add" onclick = "addToCart(${product.id})">Add to Cart</button>
          `;
    productDiv.appendChild(productContainer);
  });
}
function addToCart(id) {
  let selectedProduct = products.find((product) => product.id === id);
  let existinItem = cart.find((item) => item.id === id);

  if (existinItem) {
    existinItem.quantity++;
  } else {
    cart.push({ ...selectedProduct, quantity: 1 });
  }
  showToast();
  updateCart();
}
function updateCart() {
  let cartDiv = document.getElementById("cart-c");
  cartDiv.innerHTML = "";

  let totalAmount = 0;
  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty</p>";
    document.getElementById("total").textContent = "Total: $0";
    localStorage.removeItem("cart");
    return;
  }
  cart.forEach((item, index) => {
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-p");

    totalAmount += item.price * item.quantity;

    cartItem.innerHTML = `
    <img src="${item.image}" width ="50" alt="${item.name}">
          <p>${item.name} - $${item.price}</p>
          <input type="number" min="1" value="${item.quantity}" onchange="quantityUpdate(${index},this.value) "/>
          <button onclick="remove(${index})">Remove</button>
    `;
    cartDiv.appendChild(cartItem);
  });
  document.getElementById("total").textContent = "Total: $" + totalAmount;

  localStorage.setItem("cart", JSON.stringify(cart));
}

window.addEventListener("DOMContentLoaded", () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCart();
  }
});

function remove(index) {
  cart.splice(index, 1);
  updateCart();
}
function quantityUpdate(index, quantity) {
  cart[index].quantity = Math.max(1, quantity);
  updateCart();
}
displayProducts();

function toggleCart() {
  const cart = document.querySelector(".cart");
  const toggleBtn = document.getElementById("cart-toggle-btn");

  cart.classList.toggle("open");

  if (cart.classList.contains("open")) {
    toggleBtn.textContent = "X";
  } else {
    toggleBtn.textContent = "☰";
  }
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}
