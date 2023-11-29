const express = require('express');
const cors = require('cors');
const logger = require('morgan');

const postRouter = require('./routers/postRouter');
const userRouter = require('./routers/userRouter');
const binRouter = require('./routers/binsRouter');
const materialRouter = require('./routers/materialRouter');

const api = express();

api.use(cors());
api.use(express.json());
api.use(logger('dev'));

api.get('/', (req, res) => {
  res.status(200).json({
    name: 'reddy_22 API',
    description: 'TBC',
    endpoints: [
      'GET  /posts',
      'GET  /posts/community',
      'GET  /posts/:id',
      'POST  /posts',
      'DELETE  /posts/:id',
      'POST  /users/login',
      'POST  /users/register',
      'GET  /users/:id',
      'GET  /users/logout',
      'GET  /bins',
      'GET  /materials',
      'GET  /materials/:id',
      'GET  /materials/byBin/:id',
      'GET  /materials/notInBin/:id'
    ]
  });
});

api.use('/posts', postRouter);
api.use('/users', userRouter);
api.use('/bins', binRouter);
api.use('/materials', materialRouter);

module.exports = api;
