import { displayProducts, setupListeners, updateStats } from "./dom.js";
import { Fridge } from "./fridge.js";
import { Product } from "./product.js";

// SETUP INITIAL DATA
const products = [
  new Product("Broccoli", 10, "2022-10-30"),
  new Product("Tomatos", 5, "2022-10-28"),
  new Product("Cheese", 15, "2022-11-15"),
];

const fridge = new Fridge(40, products);

setupListeners(fridge)

displayProducts(fridge);
updateStats(fridge)



