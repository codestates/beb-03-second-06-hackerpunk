const { donate, cancel, reward } = require('../controller/donateController');
const express = require('express');
const router = express.Router();

router.post('/reward', reward);
router.post('/cancel', cancel);
router.post('/', donate);

module.exports = router;