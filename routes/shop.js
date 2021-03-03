const path = require('path');

const express = require('express');

const shopController = require('../Controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/product-list', shopController.getProducts);
router.get('/product-list/:productID', shopController.getSingleProduct);
router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDelete);
router.get('/checkout', shopController.getCheckout);
router.get('/orders', shopController.getOrders);

module.exports = router;
