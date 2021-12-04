const Pool = require('pg').Pool

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'Job House',
  password: 'root',
  port: 5432,
});

module.exports = pool;