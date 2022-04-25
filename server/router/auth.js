const { auth } = require('../controller/authController');
const express = require('express');
const router = express.Router();

router.get('/', auth);

module.exports = router;