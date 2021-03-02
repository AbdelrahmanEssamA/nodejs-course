const path = require('path');

const express = require('express');

const productsController = require('../Controllers/admin');

const router = express.Router();

router.get('/add-product', productsController.getAddProduct);
router.get('/products', productsController.getProducts);
router.post('/add-product', productsController.postAddProduct);

module.exports = router;
