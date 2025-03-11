const express = require('express');
const {addOrder, updateStatus} = require("../controllers/orderController");
const router = express.Router();


router.post('/add', addOrder)




module.exports = router;
