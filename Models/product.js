const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
   constructor(id, title, imageUrl, description, price) {
      this.title = title;
      this.imageUrl = imageUrl;
      this.description = description;
      this.price = price;
      this.id = id;
   }
   save() {
      return db.execute(
         'INSERT INTO products (title,price,imageUrl,description) Values (?,?,?,?)',
         [this.title, this.price, this.imageUrl, this.description]
      );
   }
   static fetchAll() {
      return db.execute('SELECT * FROM products');
   }

   static findByID(id) {
      return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
   }
   static deleteByID(id) {}
};
