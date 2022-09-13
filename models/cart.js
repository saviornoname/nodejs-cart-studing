const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previus cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPtice: 0 };
            if (!err) {
                cart = JSON.parse(fileContent);
            }

            // Find existsing product
            const existsingProduct = cart.products.find(prod => prod.id === id)
            const existsingProductIndex = cart.products.findIndex(prod => prod.id === id)
            
            // Add new product/ increase quantity
            let updatedProduct;
            if (existsingProduct) {
                updatedProduct = { ... existsingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existsingProductIndex] = updatedProduct
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            
            cart.totalPtice = cart.totalPtice + +productPrice;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    save() {
        this.id = Math.random().toString();
        getProductsFromCart(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
    };

    static fetchAll(cb) {
        getProductsFromCart(cb);
    };
};