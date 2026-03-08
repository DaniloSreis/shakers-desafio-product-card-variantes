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
  const options = currentSize + " / " + currentColor;
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

function selectColor(e) {
  colors.forEach((color) =>
    color.classList.remove("product-card__color--selected"),
  );
  e.currentTarget.classList.add("product-card__color--selected");
  currentColor = e.currentTarget.innerText.toLowerCase();
  findOption();
}

function selectSize(e) {
  sizes.forEach((size) =>
    size.classList.remove("product-card__size--selected"),
  );
  e.currentTarget.classList.add("product-card__size--selected");
  currentSize = e.currentTarget.innerText.toLowerCase();
  findOption();
}

colors.forEach((color) => color.addEventListener("click", selectColor));
sizes.forEach((size) => size.addEventListener("click", selectSize));

let productList;
async function addToCart() {
  try {
    const response = await fetch(window.Shopify.routes.root + "cart/add.js", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{
          id: clothes.id,
          quantity: 1
        }],
      }),
    });

    const data = await response.json()
    productList = data;
  } catch (err) {
    console.error(err);
  }
}

const buyButton = document.querySelector(".product-card__button")
buyButton.addEventListener("click", addToCart)

const openCartButton = document.querySelector(".header__button-cart")
const closeCartButton = document.querySelector(".header__close-button")
const cartOverlay = document.querySelector(".header__cart-overlay")
const cart = document.querySelector(".header__cart")
function showCart() {
  cart.classList.toggle("open")
  cartOverlay.classList.toggle("open")
}
function closeCart() {
  cart.classList.remove("open")
  cartOverlay.classList.remove("open")
}

openCartButton.addEventListener("click", showCart)
closeCartButton.addEventListener("click", closeCart)