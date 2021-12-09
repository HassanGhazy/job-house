const Pool = require('pg').Pool

const pool = new Pool({
  user: 'my_user',
  host: process.env.MY_HOST_DB,
  database: 'Job House',
  password: 'root',
  port: process.env.MY_PORT_DB,
});

module.exports = pool;