const path = require('path');
const products = [];

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    path = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'  
    );

    products.push(this);
  }

  static fetchAll() {
    return products;
  }
}