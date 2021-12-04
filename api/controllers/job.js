const pool = require('../config/pg');
const getAllJobs = async (req, res) => {
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM job_offer where status = $1 limit 20',["A"], (error, results) => {
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
            pool.query('SELECT * FROM job_offer limit 20 offset $1', [offset], (error, results) => {
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


const findJobById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM job_offer where job_id = $1', [id], (error, results, q) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows.map(e => {
                    const { ...res } = e;
                    return res;
                }));
            });
        });
        res.status(200).send(response);
    } catch (error_1) {
        res.status(500).send(error_1);
    }
};

const findJobByName = async (req, res) => {
    const name = req.query.name;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM job_offer where job_title like $1 limit 20', ['%' + name + '%'], (error, results, q) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows.map(e => {
                    const { ...res } = e;
                    return res;
                }));
            });
        });
        res.status(200).send(response);
    } catch (error_1) {
        res.status(500).send(error_1);
    }
};

const updateView = (req, res) => {
    const id = req.params.compId;
    const jobId = req.params.id;

    const currJob = {
        ...req.body,
    };


    const query = "UPDATE job_offer SET views = $1 WHERE comp_id = $2 and job_id = $3";

    pool.query(query, [currJob.views + 1, id, jobId], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error updating Views with id ${id}!`, error: err });
        }
        res.json({ message: `The view was updated!`, currJob: currJob });
    });
}

const getView = async (req, res) => {
    const id = req.params.compId;
    const jobId = req.params.id;

    const query = "select views from job_offer where comp_id = $1 and job_id = $2 ";

    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query(query, [id, jobId], (error, results, q) => {
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

const submitJob = (req, res) => {
    const id = req.params.idComp;
    const jobId = req.params.jobId;

    const requestJob = {
        ...req.body,
    };


    const query = "insert into job_submit VALUES ($1, $2, $3, $4)";
    pool.query(query, [requestJob.std_id, id, jobId, requestJob.date_submited ], (err, result) => {

        if (err) {
            return res.status(400).json({ message: 'Error requesting a job!', error: err });
        }
        res.json({ message: `request job has been done successfully!`, newSkill: requestJob });
    });
};

const statusSubmitJob = (req, res) => {
    const id = req.params.idComp;
    const jobId = req.params.jobId;

    const requestJob = {
        ...req.body,
    };


    const query = "insert into status_submit_job VALUES ($1, $2, $3, $4)";
    pool.query(query, [requestJob.std_id, id, jobId, requestJob.status ], (err, result) => {

        if (err) {
            return res.status(400).json({ message: 'Error requesting a job!', error: err });
        }
        res.json({ message: `Reply Status job has been sent successfully!`, newSkill: requestJob });
    });
};


const updateButtonApply = (req, res) => {
    const id = req.params.compId;
    const jobId = req.params.id;

    const currJob = {
        ...req.body,
    };

    const query = "UPDATE job_offer SET button_apply = $1 WHERE comp_id = $2 and job_id = $3";

    pool.query(query, [parseInt(currJob.button_apply) + 1, id, jobId], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error updating Button Apply`, error: err });
        }
        res.json({ message: `The number of Apply was updated was updated!`, currJob: result });
    });
}

const getstatusSubmitedJob = async (req, res) => {
    const id = req.params.stdId;

    const query = "select * from status_submit_job where std_id = $1";

    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query(query, [id], (error, results, q) => {
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

const getNumberOfApply = async (req, res) => {
    const id = req.params.jobId;
    const compId = req.params.compId;

    const query = "select button_apply from job_offer where job_id = $1 and comp_id = $2";

    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query(query, [id,compId], (error, results, q) => {
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

const updateNumberOfApply = (req, res) => {
    const id = req.params.jobId;
    const compId = req.params.compId;

    const currJob = {
        ...req.body,
    };

    const query = "UPDATE job_offer SET button_apply = $1 WHERE comp_id = $2 and job_id = $3";

    pool.query(query, [currJob.button_apply, compId, id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error updating Button Apply`, error: err });
        }
        res.json({ message: `The number of Apply was updated was updated!`, currJob: currJob });
    });
}

module.exports = {
    getAllJobs,
    findJobById,
    findJobByName,
    getAllJobsWithPage,
    updateView,
    getView,
    submitJob,
    updateButtonApply,
    statusSubmitJob,
    getstatusSubmitedJob,
    getNumberOfApply,
    updateNumberOfApply,
}