import { displayProducts, setupListeners, updateStats } from "./dom.js";
import { Fridge } from "./fridge.js";
import { Product } from "./product.js";

// SETUP INITIAL DATA
const products = [
  new Product("Broccoli", 10, "2022-10-30"),
  new Product("Tomatos", 5, "2022-10-28"),
  new Product("Cheese", 15, "2022-11-15"),
];

// Store data in fridge. Fridge contains all logic

const fridge = new Fridge(40, products);

// make DOM "actionable" by initializing listeners and UI display 
setupListeners(fridge)
displayProducts(fridge);
updateStats(fridge)



