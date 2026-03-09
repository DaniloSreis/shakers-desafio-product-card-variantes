const colors = document.querySelectorAll(".product-card__color");
const sizes = document.querySelectorAll(".product-card__size");
const productCard = document.querySelector(".product-card");
const productImage = document.querySelector(".product-card__image");
const productPrice = document.querySelector(".product-card__price");
const productVariants = JSON.parse(productCard.dataset.variants);

let clothes;
let currentSize = "p";
let currentColor = "preto";
function findOption() {
  const options = currentColor + " / " + currentSize;
  const formatPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  clothes = productVariants.find((variant) => {
    return variant.title.toLowerCase() === options.toLocaleLowerCase();
  });

  if (clothes) {
    productImage.src = clothes.featured_image.src;
    productPrice.innerText = formatPrice.format(clothes.price / 100);
  }
}
findOption();

const allOptions = document.querySelectorAll(".product-card__option");

function selectOption(e) {
  const element = e.currentTarget;
  const optionType = element.dataset.optionName;
  const value = element.dataset.value;

  element.parentElement.querySelectorAll(".product-card__option").forEach((option) => {
    option.classList.remove("selected");
  });
  
  element.classList.add("selected");

  if (optionType === "tamanhos") {
    currentSize = value;
  } else if (optionType === "cores") {
    currentColor = value;
  }

  findOption();
}

allOptions.forEach((option) => option.addEventListener("click", selectOption));

let productList;
async function addToCart() {
  try {
    const response = await fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            id: clothes.id,
            quantity: 1,
          },
        ],
      }),
    });

    const data = await response.json();
    productList = data;
    await getCart();
  } catch (err) {
    console.error(err);
  }
}

const buyButton = document.querySelector(".product-card__button");
buyButton.addEventListener("click", addToCart);

const openCartButton = document.querySelector(".header__button-cart");
const closeCartButton = document.querySelector(".header__close-button");
const cartOverlay = document.querySelector(".header__cart-overlay");
const cart = document.querySelector(".header__cart");
function showCart() {
  cart.classList.toggle("open");
  cartOverlay.classList.toggle("open");
}
function closeCart() {
  cart.classList.remove("open");
  cartOverlay.classList.remove("open");
}

openCartButton.addEventListener("click", showCart);
closeCartButton.addEventListener("click", closeCart);

async function getCart() {
  try {
    const response = await fetch(window.Shopify.routes.root + "cart.js");
    const data = await response.json();
    productList = data.items;
    renderProducts();
  } catch (err) {
    console.error(err);
  }
}

function renderProducts() {
  const cartList = document.querySelector(".header__cart-list");
  cartList.innerHTML = "";
  productList.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("header__cart-product");

    productDiv.innerHTML = `
      <img src="${product.image}" width="auto" height="auto" alt="${product.product_title}">
      <div class="cart-item__details">
        <p class="cart-item__name">${product.product_title}</p>
        <span class="cart-item__variant">${product.variant_title}</span>
        <div class="cart-item__price-row">
          <span>Qtd: ${product.quantity}</span>
          <span>${(product.price / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
        </div>
      </div>
    `;
    cartList.appendChild(productDiv);
  });

  const clearBtn = document.createElement("button");
  clearBtn.classList.add("cart__clear-button");
  clearBtn.innerText = "Limpar Sacola";
  clearBtn.addEventListener("click", clearCart);
  cartList.appendChild(clearBtn);
}

async function clearCart() {
  try {
    const response = await fetch(window.Shopify.routes.root + "cart/clear.js", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      }
    });

    if (response) {
      await getCart()
    }
  } catch (err) {
    console.error(err);
  }
}
