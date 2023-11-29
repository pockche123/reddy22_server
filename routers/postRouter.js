const { Router } = require('express');

const authenticator = require('../middleware/authenticator');
const postController = require('../controllers/postController.js');

const postRouter = Router();

postRouter.get('/', authenticator, postController.index);
postRouter.get('/community', authenticator, postController.indexCommunity);
postRouter.post('/', postController.create);
postRouter.get('/:id', postController.show);
postRouter.delete('/:id', postController.destroy);

module.exports = postRouter;
