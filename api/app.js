const express = require('express');
require("./config/suprt-token").supertokensInit;
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const candidate = require('./controllers/candidate');
const company = require('./controllers/company');
const job = require('./controllers/job');
const cors = require("cors");

const { middleware } = require("supertokens-node/framework/express");
let supertokens = require("supertokens-node");
let { errorHandler } = require("supertokens-node/framework/express");


app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());
app.use(express.json());
app.use(errorHandler());

var corsOptions = {
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
    allowMethods: "GET,POST,PUT,DELETE,OPTIONS",

};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
        res.json({ message: "Welcome to Job House Api." });
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/student', candidate.getAllCandidates);

app.get('/api/student/project', candidate.getAllProjects);
app.get('/api/student/education', candidate.getAllEducations);
app.get('/api/student/:id/project/:name/skill/', candidate.getSkillSingleProject);
app.get('/api/student/:id/project/:name', candidate.getsingleProject);
app.get('/api/student/:id/project/', candidate.getAllProjectsToCurrentCandidate);
app.get('/api/student/:id/education/', candidate.getCurrentCandidadateEducate);
app.get('/api/student/:id/education/:eduId', candidate.getSingleEducateFromCurrentCandidadate);
app.get('/api/student/:id/skill/:skillId', candidate.getSingleSkillFromCurrentCandidadate);
app.get('/api/student/:id/skill/', candidate.getAllSkillsToCurrentCandidate);
app.get('/api/student/:id', candidate.findCandidateById);

app.post('/api/student/', candidate.addNewCandidate);
app.post('/api/student/project/skill/:name', candidate.addSkillsToCurrentProject);
app.post('/api/student/:id/project', candidate.addNewProjectToCurrentCandidate);
app.post('/api/student/:id/education/', candidate.addNewEducationToCurrentCandidate);
app.post('/api/student/:id/skill', candidate.addNewSkillToCurrentCandidate);

app.put('/api/student/project/:name', candidate.updateCurrentProjectForCandidate);
app.put('/api/student/education/:id', candidate.updateCurrentEducateForCandidate);
app.put('/api/student/password/:id', candidate.changePasswordCurrentCandidate);
app.put('/api/student/:id', candidate.updateCurrentCandidate);

app.delete('/api/student/project/:id', candidate.deleteProjectFromCurrentCandidate);
app.delete('/api/student/education/:id', candidate.deleteEducateFromCurrentCandidate);
app.delete('/api/student/skill/:id', candidate.deleteSkillFromCurrentCandidate);
app.delete('/api/student/:id', candidate.deleteCurrentCandidate);

app.get('/api/skill', candidate.getAllSkills);

app.get('/api/company', company.getAllCompanies);
app.get('/api/company/:id', company.findCompanyById);
app.get('/api/company/:id/job', company.getAllJobToCurrentComapny);
app.get('/api/company/:id/job/:jobId', company.getSingleJobToCurrentComapny);
app.get('/api/company/:id/job/:jobId/skill', company.getSkillSingleJobToCurrentComapny);
app.get('/api/company/:id/job/:jobId/skill/:idSkill', company.getTitleSkillFromSingleJobToCurrentComapny);

app.post('/api/company/', company.addNewCompany);
app.post('/api/company/:id', company.addNewJobToCurrentCompany);
app.post('/api/company/:id/job/:jobId', company.addSkillToJobToCurrentCompany);

app.put('/api/company/:id', company.updateCurrentCompany);
app.put('/api/company/:id/job/:jobId', company.updateCurrentJobFromCompany);

app.delete('/api/company/:id', company.deleteCurrentCompany);
app.delete('/api/company/:id/job/:jobId/skill', company.deleteAllSkillOfCurrentJob);
app.delete('/api/company/:id/job/:jobId', company.deleteJobFromCurrentCompany);

app.get('/api/job', job.getAllJobs);
app.get('/api/job/:id', job.findJobById);

app.get('/api/student/page/:page', candidate.getAllCandidatesWithPage);
app.get('/api/company/page/:page', company.getAllCompaniesWithPage);
app.get('/api/job/page/:page', job.getAllJobsWithPage);


app.get('/api/search/job/', job.findJobByName);
app.get('/api/search/student/', candidate.findCandidateByName);
app.get('/api/search/company', company.findCompanyByName);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})