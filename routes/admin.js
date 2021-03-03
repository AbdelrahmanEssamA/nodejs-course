const path = require('path');

const express = require('express');

const productsController = require('../Controllers/admin');

const router = express.Router();

//RETRIEVING PRODUCTS
router.get('/products', productsController.getProducts);

//ADDING PRODUCT AND POST THEM
router.get('/add-product', productsController.getAddProduct);
router.post('/add-product', productsController.postAddProduct);

//EDITING PRODUCTS AND POST CHANGES
router.get('/edit-product/:productId', productsController.getEditProduct);
router.post('/edit-product', productsController.postEditProduct);

//DELETING PRODUCT
router.post('/delete-product', productsController.deleteProduct);
module.exports = router;
