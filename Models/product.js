const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
   path.dirname(process.mainModule.filename),
   'data',
   'products.json'
);

const retrieveProducts = (cb) => {
   fs.readFile(p, (err, fileContent) => {
      if (err) {
         cb([]);
      } else {
         cb(JSON.parse(fileContent));
      }
   });
};

module.exports = class Product {
   constructor(id, title, imageUrl, description, price) {
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
      this.price = price;
      this.id = id;
   }
   save() {
      retrieveProducts((products) => {
         if (this.id) {
            const existingProductIndex = products.findIndex(
               (prod) => prod.id === this.id
            );
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = this;
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
               console.log(err);
            });
         } else {
            this.id = products.length.toString();

            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
               console.log(err);
            });
         }
      });
   }
   static fetchAll(cb) {
      retrieveProducts(cb);
   }
   static findByID(id, cb) {
      retrieveProducts((products) => {
         const product = products.find((p) => p.id === id);
         cb(product);
      });
   }
   static deleteByID(id) {
      retrieveProducts((products) => {
         console.log(id);
         const product = products.find((prod) => prod.id === id);
         const UpdatedProducts = products.filter((p) => p.id !== id);
         fs.writeFile(p, JSON.stringify(UpdatedProducts), (err) => {
            if (!err) {
               Cart.deleteProduct(id, product.price);
            }
         });
      });
   }
};
