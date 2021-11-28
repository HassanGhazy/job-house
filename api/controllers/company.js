const pool = require('../config/pg');
const md5 = require("blueimp-md5");
const getAllCompanies = async (req, res) => {
    try {
        const response = await new Promise(function (resolve, reject) {
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
    } else if (!currCompany.password) {
        return res.status(400).json({ message: 'Please include a Company password' });
    } else if (!currCompany.country) {
        return res.status(400).json({ message: 'Please include a Company country' });
    } else if (!currCompany.city) {
        return res.status(400).json({ message: 'Please include a Company city' });
    } else if (!currCompany.street) {
        return res.status(400).json({ message: 'Please include a Company street' });
    } else if (!currCompany.phone) {
        return res.status(400).json({ message: 'Please include a Company phone' });
    } else if (!currCompany.website) {
        return res.status(400).json({ message: 'Please include a Company website' });
    } else if (!currCompany.description) {
        return res.status(400).json({ message: 'Please include a Company description' });
    } else if (!currCompany.video) {
        return res.status(400).json({ message: 'Please include a Company video' });
    } else if (!currCompany.logo) {
        return res.status(400).json({ message: 'Please include a Company logo' });
    }

    const query = "UPDATE company SET name = $1, email = $2, password = $3, country = $4, city = $5, street = $6, phone = $7, website = $8, description = $9, video = $10, logo = $11 WHERE comp_id = $12;";

    pool.query(query, [currCompany.name, currCompany.email, currCompany.password, currCompany.country, currCompany.city, currCompany.street, currCompany.phone, currCompany.website, currCompany.description, currCompany.video, currCompany.logo, currCompany.comp_id], (err, result) => {
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

module.exports = {
    getAllCompanies,
    findCompanyById,
    addNewCompany,
    updateCurrentCompany,
    deleteCurrentCompany
}