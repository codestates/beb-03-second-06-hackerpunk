const { register } = require('../controller/registerController');
const express = require('express');
const router = express.Router();

router.post('/', register);

module.exports = router;