const express = require('express');
const cors = require('cors');
const logger = require('morgan');

// const entryRouter = require('./routers/entry');
// const userRouter = require('./routers/user');

const api = express();

// middlewares
api.use(cors());
api.use(express.json());
api.use(logger('dev'));

api.get('/', (req, res) => {
  res.status(200).json({
    name: 'reddy_22 API',
    description: 'Create vivid snapshots of your memories.',
    endpoints: [
      'GET  /entries',
      'GET  /entries/:id',
      'POST  /entries',
      'DELETE  /entries/:id',
      'POST  /users/login',
      'POST  /users/register',
      'GET  /users/logout'
    ]
  });
});

// api.use('/entries', entryRouter);
// api.use('/users', userRouter);

module.exports = api;
