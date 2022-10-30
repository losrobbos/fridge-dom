
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
    this.products.push(product)
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

  getOutdated() {
    const today = new Date()
    console.log(today)

    const productsOutdated = this.products.filter(product => {
      console.log( product.expiryDate )
    })
    return productsOutdated
  }
}