const express = require('express');
const router = express.Router();
const { addProduct, getProduct, getProducts } = require('../controllers/productController');


router.post('/add', addProduct)

router.get('/getSelected/:id', getProduct);

router.get('/products', getProducts);



module.exports = router;
