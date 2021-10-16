
const pool = require('./private/pg');
const getStudents = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM student', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve (results.rows.map(e => {
        const {password,...res} = e;
        return res;
      }));
    })
  }) 
}

const getCompanies = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM company', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve (results.rows.map(e => {
            const {password,...res} = e;
            return res;
          }));
      })
    }) 
  }

module.exports = {
    getStudents,
    getCompanies
}