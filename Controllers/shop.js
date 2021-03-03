const Product = require('../Models/product');
const Cart = require('../Models/cart');
exports.getProducts = (req, res, next) => {
   Product.fetchAll((products) => {
      res.render('shop/product-list', {
         prods: products,
         pageTitle: 'All Products',
         path: '/product-list',
      });
   });
};

exports.getIndex = (req, res, next) => {
   Product.fetchAll((products) => {
      res.render('shop/index', {
         prods: products,
         pageTitle: 'Shop',
         path: '/',
      });
   });
};

exports.getSingleProduct = (req, res, next) => {
   const prodID = req.params.productID;
   Product.findByID(prodID, (product) => {
      res.render('shop/product-detail', {
         pageTitle: product.Title,
         path: '/product-list',
         product: product,
      });
   });
};

exports.postCart = (req, res, next) => {
   const prodID = req.body.productID;
   Product.findByID(prodID, (product) => {
      Cart.addProduct(prodID, product.price);
   });
   res.redirect('/');
};

exports.getCart = (req, res, next) => {
   Cart.getCart((cart) => {
      Product.fetchAll((products) => {
         const cartProducts = [];
         for (product of products) {
            const cartProductData = cart.products.find(
               (prod) => prod.id === product.id
            );
            if (cartProductData) {
               cartProducts.push({
                  productData: product,
                  qty: cartProductData.qty,
               });
            }
         }

         res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: cartProducts,
         });
      });
   });
};

exports.postCartDelete = (req, res, next) => {
   const prodID = req.body.productId;
   Product.findByID(prodID, (product) => {
      Cart.deleteProduct(prodID, product.price);
      res.redirect('/cart');
   });
};

exports.getCheckout = (req, res, next) => {
   res.render('shop/checkout', { path: '/checkout', pageTitle: 'Checkout' });
};

exports.getOrders = (req, res, next) => {
   res.render('shop/orders', { path: '/orders', pageTitle: 'Checkout' });
};
