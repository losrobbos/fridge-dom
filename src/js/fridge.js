
export class Fridge {

  /**
   * 
   * @param {number} capacityMax 
   * @param {Product[]} products 
   */
  constructor(capacityMax, products = []) {
    this.capacityMax = capacityMax
    this.products = products
  }

  /**
   * 
   * @param {Product} product 
   */
  addProduct(product) {
    if(this.getCapacityAvailable() >= product.volume) {
      this.products.push(product)
      return true
    }
    return false
  }

  exists(productName) {
    return this.products.find((prod) => prod.name.toLowerCase() === productName.toLowerCase());
  }

  /**
   * 
   * @param {Product} product 
   */
  removeProduct(product) {
    const indexToDelete = this.products.findIndex(prod => prod.name === product.name)
    this.products.splice(indexToDelete,1)
  }

  getSmallestProduct() {
    let smallestProduct = this.products[0]
    this.products.forEach(product => {
      if(product.volume < smallestProduct.volume) smallestProduct = product
    })
    return smallestProduct
  }

  getBiggestProduct() {
    let biggestProduct = this.products[0]
    this.products.forEach(product => {
      if(product.volume > biggestProduct.volume) biggestProduct = product
    })
    return biggestProduct
  }

  getCapacityAvailable() {
    return this.capacityMax - this.getCapacityTaken()
  }

  getCapacityTaken() {
    return this.products.reduce((capTotal, prod) => capTotal+prod.volume, 0)
  }

  getOutdated() {
    const today = new Date().toISOString().substring(0, 10)

    const productsOutdated = this.products.filter(product => {
      return product.expiryDate < today
    })
    return productsOutdated
  }

  getFresh() {
    const today = new Date().toISOString().substring(0, 10);

    const productsOutdated = this.products.filter((product) => {
      return product.expiryDate >= today;
    });
    return productsOutdated;
  }

  // clear outdated guys
  detox() {
    this.products = this.getFresh()
  }
}