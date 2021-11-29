const Pool = require('pg').Pool

const pool = new Pool({
  user: 'YOUR_NAME',
  host: 'YOUR_HOST',
  database: 'YOUR_DATABASE',
  password: 'YOUR_PASSWORD',
  port: 5432,// YOUR_PORT
});

module.exports = pool;