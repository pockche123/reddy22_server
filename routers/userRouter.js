const { Router } = require('express');

const userController = require('../controllers/userController.js');

const userRouter = Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/logout', userController.logout);
userRouter.get('/:id', userController.show);

module.exports = userRouter;
