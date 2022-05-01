const { create, read, update, del } = require('../controller/commentController');
const express = require('express');
const router = express.Router();

router.post('/', create);
router.get('/', read);
router.put('/', update);
router.delete('/', del);

module.exports = router;