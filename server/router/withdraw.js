const { withdraw } = require('../controller/withdrawController');
const express = require('express');
const router = express.Router();

router.post('/', withdraw);

module.exports = router;