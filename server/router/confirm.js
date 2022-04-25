const { confirm } = require('../controller/confirmController');
const express = require('express');
const router = express.Router();

router.post('/', confirm);

module.exports = router;