const express = require('express');
const router = express.Router();

const binController = require('../controllers/binController');

router.get('/', binController.index);

module.exports = router;
