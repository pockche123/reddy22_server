const { Router } = require('express');

const binController = require('../controllers/binController');

const binRouter = Router();

binRouter.get('/', binController.index);
binRouter.get('/:id', binController.show);

module.exports = binRouter;
