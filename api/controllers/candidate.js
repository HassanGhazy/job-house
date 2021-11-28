const pool = require('../config/pg');
const md5 = require("blueimp-md5");
const getAllCandidates = async (req, res) => {
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM student limit 20', (error, results) => {
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

const getAllCandidatesWithPage = async (req, res) => {
    const offset = req.params.page * 20;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM student limit 20 offset $1', [offset] ,(error, results) => {
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


const findCandidateById = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM student where std_id = $1', [id], (error, results, q) => {
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

const addNewCandidate = (req, res) => {
    const newCandidate = {
        ...req.body,
    };
    if (!newCandidate.name) {
        return res.status(400).json({ message: 'Please include a student name' });
    } else if (!newCandidate.email) {
        return res.status(400).json({ message: 'Please include a student email' });
    } else if (!newCandidate.password) {
        return res.status(400).json({ message: 'Please include a student password' });
    }


    const query = "insert into student (name, description, email, password, country, city, phone, gender, birthday, image, cv) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);";
    pool.query(query, [newCandidate.name, newCandidate.description, newCandidate.email, md5(newCandidate.password), newCandidate.country, newCandidate.city, newCandidate.phone, newCandidate.gender !== undefined ? (newCandidate.gender.toLowerCase() === 'male') ? 'M' : 'F' : null, newCandidate.birthday, newCandidate.image, newCandidate.cv], (err, result) => {

        if (err) {
            return res.status(400).json({ message: 'Error adding candidate!', error: err });
        }
        res.json({ message: `Candidate with the name ${newCandidate.name} was inserted!`, newCandidate });
    });
};

const updateCurrentCandidate = (req, res) => {

    const currCandidate = {
        std_id: req.params.id,
        ...req.body,
    };
    if (!currCandidate.name) {
        return res.status(400).json({ message: 'Please include a student name' });
    } else if (!currCandidate.email) {
        return res.status(400).json({ message: 'Please include a student email' });
    } else if (!currCandidate.password) {
        return res.status(400).json({ message: 'Please include a student password' });
    } else if (!currCandidate.description) {
        return res.status(400).json({ message: 'Please include a student description' });
    } else if (!currCandidate.country) {
        return res.status(400).json({ message: 'Please include a student country' });
    } else if (!currCandidate.city) {
        return res.status(400).json({ message: 'Please include a student city' });
    } else if (!currCandidate.phone) {
        return res.status(400).json({ message: 'Please include a student phone' });
    } else if (!currCandidate.gender) {
        return res.status(400).json({ message: 'Please include a student gender' });
    } else if (!currCandidate.birthday) {
        return res.status(400).json({ message: 'Please include a student birthday' });
    } else if (!currCandidate.image) {
        return res.status(400).json({ message: 'Please include a student image' });
    } else if (!currCandidate.cv) {
        return res.status(400).json({ message: 'Please include a student cv' });
    }

    const query = "UPDATE student SET name = $1, description = $2, email = $3, password = $4, country = $5, city = $6, phone = $7, gender = $8, birthday = $9, image = $10, cv = $11 WHERE std_id = $12;";

    pool.query(query, [currCandidate.name, currCandidate.description ?? req.body.description, currCandidate.email, currCandidate.password, currCandidate.country ?? req.body.country, currCandidate.city, currCandidate.phone, currCandidate.gender !== undefined ? (currCandidate.gender.toLowerCase() === 'male') ? 'M' : 'F' : null, currCandidate.birthday, currCandidate.image, currCandidate.cv, currCandidate.std_id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error updating student with id ${currCandidate.std_id}!`, error: err });
        }
        res.json({ message: `Student with the id ${currCandidate.std_id} was updated!`, newStudent: currCandidate });
    });
};


const deleteCurrentCandidate = (req, res) => {

    const currCandidate = {
        std_id: req.params.id,
        ...req.body,
    };
    const query = "DELETE FROM student WHERE std_id = $1";
    pool.query(query, [currCandidate.std_id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error deleteing student with the id ${currCandidate.std_id}!`, error: err });
        }
        res.json({ message: `Student with the id ${currCandidate.std_id} was deleted!`, left: currCandidate });
    });
};


const getAllProjects = async (req, res) => {
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM project_std', (error, results) => {
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

const getAllProjectsToCurrentCandidate = async (req, res) => {
    const std_id = req.params.id;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM project_std where std_id = $1', [std_id], (error, results, q) => {
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


const addNewProjectToCurrentCandidate = async (req, res) => {
    const id = req.params.id;
    const newProject = {
        ...req.body,
    };

    pool.query('insert into project_std values ($1, $2 , $3 )', [id, newProject.name_proj, newProject.description_project], (err, results, q) => {


        if (err) {
            return res.status(400).json({ message: `Error Adding new project to candidate ${id}!`, error: err });
        }
        res.json({ message: `new Project has been added successfully`, newProject: newProject });
    });
};

const getsingleProject = async (req, res) => {
    const name = req.params.name;
    const id = req.params.id;

    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM project_std where name_proj = $1 and std_id = $2', [name,id], (error, results, q) => {
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

const deleteProjectFromCurrentCandidate = async (req, res) => {
    const id = req.params.id;
    const currCandidate = {
        std_id: req.params.id,
        ...req.body,
    };
    const query = "DELETE FROM project_std WHERE std_id = $1";
    pool.query(query, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error deleteing project with the id ${currCandidate.std_id}!`, error: err });
        }
        res.json({ message: `The Project has been deleted successfully!`, left: currCandidate });
    });
};

const updateCurrentProjectForCandidate = (req, res) => {

    const currProject = {
        ...req.body,
    };
    if (!currProject.name_proj) {
        return res.status(400).json({ message: 'Please include a Project name' });
    } else if (!currProject.description_project) {
        return res.status(400).json({ message: 'Please include a Project description' });
    }

    const query = "UPDATE project_std SET name_proj = $1, description_project = $2 WHERE name_proj = $3;";
    console.log(currProject);
    pool.query(query, [currProject.name_proj, currProject.description_project, currProject.name_proj], (err, result) => {
        if (err) {

            return res.status(400).json({ message: `Error updating project with id ${currProject.std_id}!`, error: err });
        }
        res.json({ message: `Project with the name ${currProject.name_proj} was updated!`, project: currProject });
    });
};


const getAllEducations = async (req, res) => {
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM education', (error, results) => {
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

const addNewEducationToCurrentCandidate = async (req, res) => {
    const std_id = req.params.id;
    const newEducate = {
        ...req.body,
    };

    pool.query('insert into education values (Default, $1, $2 , $3 )', [std_id, newEducate.degree, newEducate.university_major], (err, results, q) => {


        if (err) {
            return res.status(400).json({ message: `Error Adding new Educate to candidate ${std_id}!`, error: err });
        }
        res.json({ message: `new Education has been added successfully`, newEducate: newEducate });
    });
};

const getCurrentCandidadateEducate = async (req, res) => {
    const std_id = req.params.id;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM education where std_id = $1', [std_id], (error, results, q) => {
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

const getSingleEducateFromCurrentCandidadate = async (req, res) => {
    const std_id = req.params.id;
    const edu_id = req.params.eduId;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('SELECT * FROM education where std_id = $1 and edu_id = $2', [std_id,edu_id], (error, results, q) => {
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

const deleteEducateFromCurrentCandidate = async (req, res) => {
    const id = req.params.id;
    const currCandidate = {
        std_id: req.params.id,
        ...req.body,
    };
    const query = "DELETE FROM education WHERE edu_id = $1";
    pool.query(query, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error deleteing Educate with the id ${id}!`, error: err });
        }
        res.json({ message: `The Educate has been deleted successfully!`, left: currCandidate });
    });
};

const updateCurrentEducateForCandidate = (req, res) => {
    const id = req.params.id;
    const currEducate = {
        ...req.body,
    };
    if (!currEducate.degree) {
        return res.status(400).json({ message: 'Please include a Educate degree' });
    } else if (!currEducate.university_major) {
        return res.status(400).json({ message: 'Please include a Educate university_major' });
    }

    const query = "UPDATE education SET degree = $1, university_major = $2 WHERE edu_id = $3;";
    console.log(currEducate);
    pool.query(query, [currEducate.degree, currEducate.university_major, id], (err, result) => {
        if (err) {

            return res.status(400).json({ message: `Error updating Educate with id ${id}!`, error: err });
        }
        res.json({ message: `Educate with the degree ${currEducate.degree} and the university major ${currEducate.university_major} was updated!`, Educate: currEducate });
    });
};


const getAllSkills = async (req, res) => {
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('select * from skill;', (error, results) => {
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

const getSingleSkillFromCurrentCandidadate = async (req, res) => {
    const std_id = req.params.id;
    const skill_id = req.params.skillId;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('select title from skill_std natural join skill where std_id = $1 and skill_id = $2', [std_id,skill_id], (error, results, q) => {
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



const addNewSkillToCurrentCandidate = async (req, res) => {
    const std_id = req.params.id;
    const newSkill = {
        ...req.body,
    };

    pool.query('insert into skill_std values ($1, $2)', [std_id, newSkill.skill_id], (err, results, q) => {


        if (err) {
            return res.status(400).json({ message: `Error Adding new Skill to candidate ${std_id}!`, error: err });
        }
        res.json({ message: `new Skill has been added successfully`, newSkill: newSkill });
    });
};


const getAllSkillsToCurrentCandidate = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('select * from skill natural join skill_std where std_id = $1 ', [id], (error, results) => {
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

const deleteSkillFromCurrentCandidate = async (req, res) => {
    const currSkillsCandidate = {
        ...req.body,
    };
    const query = "DELETE FROM skill_std WHERE skill_id = $1";
    pool.query(query, [currSkillsCandidate.skill_id], (err, result) => {
        if (err) {
            return res.status(400).json({ message: `Error deleteing Skill with the id ${id}!`, error: err });
        }
        res.json({ message: `The Skill has been deleted successfully!`, left: currSkillsCandidate });
    });
};

const getSkillSingleProject = async (req, res) => {
    try {
        const response = await new Promise(function (resolve, reject) {
            pool.query('select * from skill_project natural join project_std', (error, results) => {
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

const addSkillsToCurrentProject = async (req, res) => {
    const name = req.params.name;
    const skills = {
        ...req.body,
    };
    let skillsIds = 0;
    try {
       await new Promise(function (resolve, reject) {
            pool.query('select skill_id from skill where title = $1', [skills.title], (error, results) => {
                if (error) {
                    reject(error);
                }
                resolve(results.rows.map(e => {
                    const { ...res } = e;
                    skillsIds = res.skill_id;
                }));
            });
        });
    } catch (error_1) {
        res.status(500).send(error_1);
    }


    pool.query('insert into skill_project values ($1, $2)', [name, skillsIds], (err, results, q) => {

        console.log(err);
        console.log(results);
        console.log(q);
        if (err) {
            return res.status(400).json({ message: `Error Adding new Skill to Prject ${name}!`, error: err });
        }
        res.json({ message: `new Skill has been added successfully`, newSkill: skills });
    });
}


module.exports = {
    getAllCandidates,
    getAllCandidatesWithPage,
    findCandidateById,
    addNewCandidate,
    updateCurrentCandidate,
    deleteCurrentCandidate,
    getAllProjects,
    getAllProjectsToCurrentCandidate,
    addNewProjectToCurrentCandidate,
    deleteProjectFromCurrentCandidate,
    updateCurrentProjectForCandidate,
    getsingleProject,
    getAllEducations,
    addNewEducationToCurrentCandidate,
    getCurrentCandidadateEducate,
    getSingleEducateFromCurrentCandidadate,
    deleteEducateFromCurrentCandidate,
    updateCurrentEducateForCandidate,
    getAllSkills,
    addNewSkillToCurrentCandidate,
    getAllSkillsToCurrentCandidate,
    getSingleSkillFromCurrentCandidadate,
    deleteSkillFromCurrentCandidate,
    addSkillsToCurrentProject,
    getSkillSingleProject,

}