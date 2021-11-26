const pool = require('../config/pg');
const getAllCompanies = async(req, res) => {
    try {
        const response = await new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM company', (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows.map(e => {
                    const { password, ...res } = e;
                    return res;
                }));
            });
        });
        res.status(200).send(response);
    } catch (error_1) {
        res.status(500).send(error_1);
    }
}


const findCompanyById = async(req, res) => {
    const id = req.params.id;
    try {
        const response = await new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM company where comp_id = $1', [id], (error, results, q) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows.map(e => {
                    const { password, ...res } = e;
                    return res;
                }));
            });
        });
        res.status(200).send(response);
    } catch (error_1) {
        res.status(500).send(error_1);
    }
};

module.exports = {
    getAllCompanies,
    findCompanyById
}