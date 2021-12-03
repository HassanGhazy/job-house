const pool = require('../config/pg');
const md5 = require("blueimp-md5");
const getAllCompanies = async (req, res) => {
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM company limit 20', (error, results) => {
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

const getAllCompaniesWithPage = async (req, res) => {
    const offset = req.params.page * 20;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM company limit 20 offset $1', [offset] ,(error, results) => {
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


const findCompanyById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await new Promise(function (resolve, reject) {
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


const findCompanyByName = async(req, res) => {
    const name = req.query.name;
    try {
        const response = await new Promise(function(resolve, reject) {
            pool.query('SELECT * FROM company where name like $1 limit 20', ['%' + name + '%'], (error, results, q) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows.map(e => {
                    const {password,...res } = e;
                    return res;
                }));
            });
        });
        res.status(200).send(response);
    } catch (error_1) {
        res.status(500).send(error_1);
    }
};


const addNewCompany = (req, res) => {
    const newCompany = {
        ...req.body,
    };

    if (!newCompany.name) {
        return res.status(400).json({ message: 'Please include a Company name' });
    } else if (!newCompany.email) {
        return res.status(400).json({ message: 'Please include a Company email' });
    } else if (!newCompany.password) {
        return res.status(400).json({ message: 'Please include a Company password' });
    } else if (!newCompany.country) {
        return res.status(400).json({ message: 'Please include a Company country' });
    } else if (!newCompany.city) {
        return res.status(400).json({ message: 'Please include a Company city' });
    } else if (!newCompany.phone) {
        return res.status(400).json({ message: 'Please include a Company phone' });
    } else if (!newCompany.description) {
        return res.status(400).json({ message: 'Please include a Company description' });
    }


    const query = "insert into company (name, email, password, country, city, street, phone, website, description, video, logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)";
    pool.query(query, [newCompany.name, newCompany.email, md5(newCompany.password), newCompany.country, newCompany.city, newCompany.street, newCompany.phone, newCompany.website, newCompany.video, newCompany.logo ], (err, result) => {

        if (err) {
            return res.status(400).json({ message: 'Error adding Company!', error: err });
        }
        res.json({ message: `Candidate with the id ${newCompany.comp_id} was inserted!`, newCompany: newCompany });
    });
};

const updateCurrentCompany = (req, res) => {

    const currCompany = {
        comp_id: req.params.id,
        ...req.body,
    };

    if (!currCompany.name) {
        return res.status(400).json({ message: 'Please include a Company name' });
    } else if (!currCompany.email) {
        return res.status(400).json({ message: 'Please include a Company email' });
    } else if (!currCompany.country) {
        return res.status(400).json({ message: 'Please include a Company country' });
    } else if (!currCompany.city) {
        return res.status(400).json({ message: 'Please include a Company city' });
    } else if (!currCompany.phone) {
        return res.status(400).json({ message: 'Please include a Company phone' });
    } else if (!currCompany.description) {
        return res.status(400).json({ message: 'Please include a Company description' });
    }

    const query = "UPDATE company SET name = $1, email = $2, country = $3, city = $4, street = $5, phone = $6, website = $7, description = $8, video = $9, logo = $10 WHERE comp_id = $11;";

    pool.query(query, [currCompany.name, currCompany.email, currCompany.country, currCompany.city, currCompany.street, currCompany.phone, currCompany.website, currCompany.description, currCompany.video, currCompany.logo, currCompany.comp_id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error updating Company with id ${currCompany.comp_id}!`, error: err });
        }
        res.json({ message: `Company with the id ${currCompany.comp_id} was updated!`, newCompany: currCompany });
    });
};

const deleteCurrentCompany = (req, res) => {
    
    const currCompany = {
        comp_id: req.params.id,
        ...req.body,
    };

    const query = "DELETE FROM company WHERE comp_id = $1";

    pool.query(query, [currCompany.comp_id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error deleteing company with the id ${currCompany.comp_id}!` ,error : err});
        }
        res.json({ message: `Company with the id ${currCompany.comp_id} was deleted!`, left: currCompany });
    });
};

const getAllJobToCurrentComapny = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM job_offer where comp_id = $1', [id], (error, results) => {
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
}

const getSkillSingleJobToCurrentComapny = async (req, res) => {
    const id = req.params.id;
    const jobId = req.params.jobId;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM skill_request natural join skill where comp_id = $1 and job_id = $2', [id,jobId], (error, results) => {
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
}

const getSingleJobToCurrentComapny = async (req, res) => {
    const id = req.params.id;
    const jobId = req.params.jobId;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM job_offer where comp_id = $1 and job_id = $2', [id,jobId], (error, results) => {
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
}


const addNewJobToCurrentCompany = (req, res) => {
    const id = req.params.id;
    const newJob = {
        ...req.body,
    };

    if (!newJob.job_title) {
        return res.status(400).json({ message: 'Please include a job title' });
    } else if (!newJob.description) {
        return res.status(400).json({ message: 'Please include a description' });
    } else if (!newJob.date_submit) {
        return res.status(400).json({ message: 'Please include a date submit' });
    } else if (!newJob.status) {
        return res.status(400).json({ message: 'Please include a status' });
    } else if (!newJob.salary) {
        return res.status(400).json({ message: 'Please include a salary' });
    } 

    const query = "insert into job_offer VALUES ($1, Default, $2, $3, $4, $5, $6, $7, $8)";
    pool.query(query, [id, newJob.job_title, newJob.description, newJob.date_submit, newJob.status, newJob.salary, newJob.views, newJob.button_apply ], (err, result) => {

        if (err) {
            return res.status(400).json({ message: 'Error adding job!', error: err });
        }
        res.json({ message: `Company with the id ${id} was inserted a job successfully!`, newJob: newJob });
    });
};

const addSkillToJobToCurrentCompany = (req, res) => {
    const id = req.params.id;
    const jobId = req.params.jobId;

    const newSkill = {
        ...req.body,
    };

    if (!newSkill.skill_id) {
        return res.status(400).json({ message: 'Please include a skill id' });
    } 
    const query = "insert into skill_request VALUES ($1, $2, $3)";
    pool.query(query, [newSkill.skill_id, id, jobId ], (err, result) => {

        if (err) {
            return res.status(400).json({ message: 'Error adding Skill!', error: err });
        }
        res.json({ message: `Skill with the id job ${jobId} was inserted successfully!`, newSkill: newSkill });
    });
};

const deleteSkillOfCurrentJob = (req, res) => {
    const id = req.params.id;
    const jobId = req.params.jobId;
    const skillId = req.params.skillId;
    const query = "DELETE FROM skill_request WHERE comp_id = $1 and job_id = $2 and skill_id = $3";

    pool.query(query, [id,jobId,skillId], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error deleteing The Skills from the company with the id ${id}!` ,error : err});
        }
        res.json({ message: `Skills ${skillId} for the company with the id ${id} was deleted successfully!`});
    });
};

const getTitleSkillFromSingleJobToCurrentComapny = async(req, res) => {
    const idSkill = req.params.idSkill;

    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('select title from skill where skill_id = $1', [idSkill], (error, results, q) => {
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

const deleteJobFromCurrentCompany = (req, res) => {
    const id = req.params.id;
    const jobId = req.params.jobId;
    const query = "DELETE FROM job_offer WHERE comp_id = $1 and job_id = $2";

    pool.query(query, [id,jobId], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error deleteing The Job from the company with the id ${id}!` ,error : err});
        }
        res.json({ message: `The Job of the company with the id ${id} was deleted successfully!`});
    });
};

const updateCurrentJobFromCompany = (req, res) => {
    const id = req.params.id;
    const jobId = req.params.jobId;

    const currJob = {
        comp_id: id,
        ...req.body,
    };

    if (!currJob.job_title) {
        return res.status(400).json({ message: 'Please include a job title' });
    } else if (!currJob.description) {
        return res.status(400).json({ message: 'Please include a description' });
    } else if (!currJob.date_submit) {
        return res.status(400).json({ message: 'Please include a date submit' });
    } else if (!currJob.status) {
        return res.status(400).json({ message: 'Please include a status' });
    } else if (!currJob.salary) {
        return res.status(400).json({ message: 'Please include a salary' });
    } 

    const query = "UPDATE job_offer SET job_title = $1, description = $2, date_submit = $3, status = $4, salary = $5, image = $8, job_type = $9 WHERE comp_id = $6 and job_id = $7;";

    pool.query(query, [currJob.job_title, currJob.description, currJob.date_submit, currJob.status, currJob.salary,id, jobId, currJob.image, currJob.job_type], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error updating Job with id ${id}!`, error: err });
        }
        res.json({ message: `Job with the id ${id} was updated!`, currJob: currJob });
    });
};


module.exports = {
    getAllCompanies,
    getAllCompaniesWithPage,
    findCompanyById,
    addNewCompany,
    updateCurrentCompany,
    deleteCurrentCompany,
    getAllJobToCurrentComapny,
    getSingleJobToCurrentComapny,
    addNewJobToCurrentCompany,
    getSkillSingleJobToCurrentComapny,
    addSkillToJobToCurrentCompany,
    deleteSkillOfCurrentJob,
    getTitleSkillFromSingleJobToCurrentComapny,
    deleteJobFromCurrentCompany,
    updateCurrentJobFromCompany,
    findCompanyByName,

}