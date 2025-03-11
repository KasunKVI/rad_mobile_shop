const express = require('express');
const router = express.Router();
const { addProduct, getProduct, getProducts, updateProduct ,deleteProduct} = require('../controllers/productController');


router.post('/add', addProduct)

router.get('/getSelected/:id', getProduct);

router.get('/products', getProducts);

router.put('/update', updateProduct)

router.delete('/delete/:id', deleteProduct)



module.exports = router;
