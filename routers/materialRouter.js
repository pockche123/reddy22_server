const { Router } = require('express');

const materialController = require('../controllers/materialController');

const materialRouter = Router();

materialRouter.get('/', materialController.index);
materialRouter.get('/byBin/:id', materialController.showMaterialsByBinId);
materialRouter.get('/notInBin/:id', materialController.showMaterialsNotInBin);
materialRouter.get('/:id', materialController.showMaterialById);

module.exports = materialRouter;
