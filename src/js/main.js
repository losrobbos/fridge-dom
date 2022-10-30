import { Fridge } from "./fridge.js";
import { Product } from "./product.js";

// SETUP INITIAL DATA
const products = [
  new Product("Broccoli", 10, "2022-10-30"),
  new Product("Tomatos", 5, "2022-10-28"),
  new Product("Cheese", 15, "2022-11-15"),
];

const fridge = new Fridge(40, products);

// DOM NODES
const elFridgeContainer = document.querySelector(".fridge-container");
const elButtonProductAdd = document.querySelector(".product-add > button")
const elProductName = document.querySelector(".product-add > .product-name")
const elProductVolume = document.querySelector(".product-add > .product-volume")
const elProductExpiry = document.querySelector(".product-add > .product-expiry")

/**
 * Handle User Interaction (EVENT LISTENERS) 
 */
elButtonProductAdd.addEventListener("click", () => {

  const [name, volume, expiryDate] = [
    elProductName.value,
    elProductVolume.value,
    elProductExpiry.value,
  ];

  if(!name || !volume) return;

  // check if already in list!
  if(fridge.products.find(prod => prod.name === name)) return

  const prodNew = new Product(name, volume, expiryDate);
  fridge.addProduct(prodNew);
  insertProductCard(prodNew)
});


/**
 *
 * @param {Product} product
 */
const createProductCardDom = (product) => {
  const productCard = document.createElement("div")
  productCard.classList.add(
    "product-card",
    "w-48",
    "h-28",
    "p-3",
    "border",
    "border-cyan-900",
    "rounded",
    "cursor-pointer"
  );
  productCard.innerHTML = `
      <div class="product-name text-teal-500 text-xl uppercase">${product.name}</div>
      <div class="text-base"><span class="product-volume">${product.volume}</span> VU</div>
      <div class="text-xs">Expiry: <span class="product-expiry">${product.expiryDate}</span></div>
  `;
  return productCard
};

/**
 * 
 * @param {Product} product 
 */
const insertProductCard = (product) => {
  const elProductCard = createProductCardDom(product);
  elFridgeContainer.appendChild(elProductCard);
}

// display initial fridge in fridge container
const displayProducts = () => {
  // clear container
  elFridgeContainer.innerHTML = ""

  // create product cards and inject
  fridge.products.forEach(prod => insertProductCard(prod))
}
displayProducts()

