const express = require('express');
const {addOrder, updateStatus, getOrders} = require("../controllers/orderController");
const router = express.Router();


router.post('/add', addOrder)

router.patch('/update/status/:id', updateStatus)

router.get('/get', getOrders);



module.exports = router;
