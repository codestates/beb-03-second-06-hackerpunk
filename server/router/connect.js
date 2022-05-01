const { connect } = require('../controller/connectController');
const express = require('express');
const router = express.Router();

router.get('/', connect);

module.exports = router;