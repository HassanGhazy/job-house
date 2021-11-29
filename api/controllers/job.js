const pool = require('../config/pg');
const getAllJobs = async(req, res) => {
    try {
        const response = await new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM job_offer limit 20', (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            });
        });
        res.status(200).send(response);
    } catch (error_1) {
        res.status(500).send(error_1);
    }
}


const getAllJobsWithPage = async (req, res) => {
    const offset = req.params.page * 20;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM job_offer limit 20 offset $1', [offset] ,(error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows);
            });
        });
        res.status(200).send(response);
    } catch (error_1) {
        res.status(500).send(error_1);
    }
}


const findJobById = async(req, res) => {
    const id = req.params.id;
    try {
        const response = await new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM job_offer where job_id = $1', [id], (error, results, q) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows.map(e => {
                    const {...res } = e;
                    return res;
                }));
            });
        });
        res.status(200).send(response);
    } catch (error_1) {
        res.status(500).send(error_1);
    }
};

const findJobByName = async(req, res) => {
    const name = req.query.name;
    try {
        const response = await new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM job_offer where job_title like $1 limit 20', ['%' + name + '%'], (error, results, q) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows.map(e => {
                    const {...res } = e;
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
    getAllJobs,
    findJobById,
    findJobByName,
    getAllJobsWithPage,
}