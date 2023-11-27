const express = require('express')
const router = express.Router()


const binController = require('../controller/binController')

router.get('/', binController.index)


module.exports = router; 