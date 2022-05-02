const { refresh } = require('../controller/refreshTokenReqController');
const express = require('express');
const router = express.Router();

router.get('/', refresh);

module.exports = router;