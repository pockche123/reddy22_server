const fs = require('fs');

const db = require('./connect');

const sql = fs.readFileSync('./database/setup.sql').toString();

db.query(sql)
  .then((data) => console.log('Set-up complete.'))
  .catch((e) => console.log(e));
