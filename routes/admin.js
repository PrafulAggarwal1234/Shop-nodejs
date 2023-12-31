const express = require('express');
const path = require('path');

const rootDir = require('../util/path');
const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product
router.get("/add-product",adminController.getAddProduct);

//admin/products
router.get('/products',adminController.getProducts);

router.post("/add-product",adminController.postAddProduct);

router.get("/edit-product/:productId",adminController.getEditProduct);
router.post("/edit-product",adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct);
module.exports=router;