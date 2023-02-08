import { Fridge } from "./fridge.js";
import { Product } from "./product.js";

// DOM NODES

// CONTAINER
const elFridgeContainer = document.querySelector(".fridge-container");

// STATS
const elStatsCapacity = document.querySelector(".capacity");
const elStatsCapacityTaken = document.querySelector(".capacity-taken");
const elStatsCapacityAvailable = document.querySelector(".capacity-available");
const elStatsLowest = document.querySelector(".lowest");
const elStatsBiggest = document.querySelector(".biggest");
const elStatsExpired = document.querySelector(".expired");

// ACTIONS

// ADD FORM
const elProductName = document.querySelector(".product-add > .product-name");
const elProductVolume = document.querySelector(
  ".product-add > .product-volume"
);
const elProductExpiry = document.querySelector(
  ".product-add > .product-expiry"
);
const elProductDetox = document.querySelector(".product-detox > button");
const elProductButtonAdd = document.querySelector(".product-add > button");
const elProductAddError = document.querySelector(".product-add-errors");

/**
 * Handle User Interaction (=EVENT LISTENERS)
 * @param {Fridge} fridge
 */
export const setupListeners = (fridge) => {

  // DETOX
  elProductDetox.addEventListener("click", () => {
    fridge.detox();
    displayProducts(fridge); // update product list
    updateStats(fridge);
  });

  // ADD PRODUCT Button
  elProductButtonAdd.addEventListener("click", () => {

    const [name, volume, expiryDate] = [
      elProductName.value,
      parseInt(elProductVolume.value),
      elProductExpiry.value,
    ];

    elProductAddError.innerText = "";

    // input validation
    if (!name || !volume) {
      elProductAddError.innerText = "Please be kind and fill in the stuff, buddy!";
      return;
    }

    // check if already in list!
    if (fridge.exists(name)) {
      elProductAddError.innerText = "Already got that dude! Fuck off!"
      return;
    }

    const prodNew = new Product(name, volume, expiryDate);
    if (fridge.addProduct(prodNew)) {
      insertProductCard(prodNew);
      updateStats(fridge);
      // clear form
      elProductName.value = "";
      elProductVolume.value = "";
      elProductExpiry.value = "";
    } else {
      elProductAddError.innerText = "Capacity exceeded! Go to hell with that item!";
    }
  });
};

// DOM LIB FUNCTIONS
// (used by event listeners)

/**
 * display initial fridge in fridge container
 * @param {Fridge} fridge
 */
export const displayProducts = (fridge) => {
  // clear container
  elFridgeContainer.innerHTML = "";

  // create product cards and inject
  fridge.products.forEach((prod) => insertProductCard(prod));
};

/**
 *
 * @param {Product} product
 */
export const insertProductCard = (product) => {
  const elProductCard = createProductCardDom(product);
  elFridgeContainer.appendChild(elProductCard);
};

/**
 * Convert product object into HTML DOM Element with given style
 *
 * @param {Product} product
 */
const createProductCardDom = (product) => {
  const productCard = document.createElement("div");
  productCard.classList.add(
    "product-card",
    "w-48",
    "h-28",
    "p-3",
    "border",
    "border-cyan-900",
    "rounded",
  );
  productCard.innerHTML = `
      <div class="product-name text-teal-500 text-xl uppercase cursor-pointer">${product.name}</div>
      <div class="text-base"><span class="product-volume">${product.volume}</span> VU</div>
      <div class="text-xs">Expiry: <span class="product-expiry">${product.expiryDate}</span></div>
  `;
  return productCard;
};

/**
 * evaluate stats from product list and show in stats panel
 * @param {Fridge} fridge
 */
export const updateStats = (fridge) => {
  const capacityMax = fridge.capacityMax;
  const capTaken = fridge.getCapacityTaken();
  const capAvailable = capacityMax - capTaken;
  const biggest = fridge.getBiggestProduct();
  const smallest = fridge.getSmallestProduct();
  const outdated = fridge.getOutdated();

  elStatsCapacity.innerText = capacityMax;
  elStatsCapacityTaken.innerText = capTaken;
  elStatsCapacityAvailable.innerText = capAvailable;

  elStatsBiggest.innerText = biggest?.name || '(none)';
  elStatsLowest.innerText = smallest?.name || '(none)';
  elStatsExpired.innerText = outdated.map((prod) => prod.name).join(", ");
};
