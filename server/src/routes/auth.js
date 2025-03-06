const express = require('express');
const { signUp, signIn, currentUser } = require('../controllers/authController');

const router = express.Router();

router.post('/signUp', signUp);

router.post('/signIn', signIn)

router.get('/me', currentUser)


module.exports = router;
