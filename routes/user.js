const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

/* POST user login */
router.post('/login', userController.login);

/* POST user register */
router.post('/register', userController.register);

module.exports = router;
