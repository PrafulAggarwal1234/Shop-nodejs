const express = require('express');
const path = require('path');

const shopController = require('../controllers/shop');
const router=express.Router();

// const products = [];
router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/products/:id',shopController.getProduct);

router.get('/cart',shopController.getCart);

router.post('/cart',shopController.postCart);

router.post('/cart-delete-item',shopController.postCartDeleteProduct);

router.post('/create-order',shopController.postOrder);

router.get('/checkout',shopController.getCheckout);
router.get('/orders',shopController.getOrders);


module.exports=router;