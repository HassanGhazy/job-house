const express = require('express');
require("./config/suprt-token").supertokensInit;
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
const candidate = require('./controllers/candidate');
const company = require('./controllers/company');
const job = require('./controllers/job');
const global = require('./controllers/global');
const cors = require("cors");
const { verifySession } = require("supertokens-node/recipe/session/framework/express");
require("dotenv").config();

const { middleware } = require("supertokens-node/framework/express");
let supertokens = require("supertokens-node");
let { errorHandler } = require("supertokens-node/framework/express");


app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

// app.use(cors({
//     origin: "http://192.168.56.1:3000",
//     allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
//     credentials: true,
// }));

app.use(middleware());
app.use(express.json());
app.use(errorHandler());

var corsOptions = {
    origin: ["http://localhost:3000","http://192.168.56.1:3000/"],
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
app.get("/api/get-user-info", verifySession(), candidate.getUserByEmail);

app.get('/api/student/project', candidate.getAllProjects);
app.get('/api/student/education', candidate.getAllEducations);
app.get('/api/student/:id/project/:name/skill/', candidate.getSkillSingleProject);
app.get('/api/student/:id/project/:name', candidate.getsingleProject);
app.get('/api/student/:id/project/', candidate.getAllProjectsToCurrentCandidate);
app.get('/api/student/:id/education/', candidate.getCurrentCandidadateEducate);
app.get('/api/student/:id/education/:eduId', candidate.getSingleEducateFromCurrentCandidadate);
app.get('/api/student/:id/skill/title', candidate.getAllSkillsTitleToCurrentCandidate);
app.get('/api/student/:id/skill/:skillId', candidate.getSingleSkillFromCurrentCandidadate);
app.get('/api/student/:id/skill/', candidate.getAllSkillsToCurrentCandidate);
app.get('/api/student/:id', candidate.findCandidateById);

app.post('/api/student/', candidate.addNewCandidate);
app.post('/api/student/project/skill/:name', candidate.addSkillsToCurrentProject);
app.post('/api/student/:id/project', candidate.addNewProjectToCurrentCandidate);
app.post('/api/student/:id/education/', candidate.addNewEducationToCurrentCandidate);
app.post('/api/student/:id/skill', candidate.addNewSkillToCurrentCandidate);
app.post('/api/student/:id/password', candidate.checkPassword);


app.put('/api/student/project/:name', candidate.updateCurrentProjectForCandidate);
app.put('/api/student/:std_id/education/:id', candidate.updateCurrentEducateForCandidate);
app.put('/api/student/password/:id', candidate.changePasswordCurrentCandidate);
app.put('/api/student/:id', candidate.updateCurrentCandidate);

app.delete('/api/student/:id/project/:name', candidate.deleteProjectFromCurrentCandidate);
app.delete('/api/student/:std_id/education/:id', candidate.deleteEducateFromCurrentCandidate);
app.delete('/api/student/:id/skill/:skillId', candidate.deleteSkillFromCurrentCandidate);
app.delete('/api/student', verifySession(), candidate.deleteCurrentCandidate);

app.get('/api/skill', candidate.getAllSkills);

app.get('/api/company', company.getAllCompanies);
app.get('/api/company/:id', company.findCompanyById);
app.get('/api/company/:id/job', company.getAllJobToCurrentComapny);
app.get('/api/company/:id/job/:jobId', company.getSingleJobToCurrentComapny);
app.get('/api/company/:id/job/:jobId/skill/:idSkill', company.getTitleSkillFromSingleJobToCurrentComapny);
app.get('/api/company/:id/job/:jobId/skill', company.getSkillSingleJobToCurrentComapny);
app.get('/api/company/:id/request', company.getCandidateSubmitedJob);

app.post('/api/company/', company.addNewCompany);
app.post('/api/company/:id/job/:jobId/skill', company.addSkillToJobToCurrentCompany);
app.post('/api/company/:id/password', company.checkPassword);
app.post('/api/company/:id', company.addNewJobToCurrentCompany);

app.put('/api/company/:id', company.updateCurrentCompany);
app.put('/api/company/:id/job/:jobId', company.updateCurrentJobFromCompany);
app.put('/api/company/password/:id', company.changePasswordCurrentCompany);

app.delete('/api/company/:id', verifySession(), company.deleteCurrentCompany);
app.delete('/api/company/:id/job/:jobId/skill/:skillId', company.deleteSkillOfCurrentJob);
app.delete('/api/company/:id/job/:jobId', company.deleteJobFromCurrentCompany);

app.get('/api/job', job.getAllJobs);
app.get('/api/job/:id', job.findJobById);
app.get('/api/:compId/job/view/:id', job.getView);
app.get('/api/job/:stdId/status/', job.getstatusSubmitedJob);
app.get('/api/job/:compId/apply/:jobId', job.getNumberOfApply);

app.put('/api/job/:jobId/company/:id', job.updateButtonApply);
app.put('/api/:compId/job/view/:id', job.updateView);
app.put('/api/job/:compId/apply/:jobId', job.updateNumberOfApply);

app.post('/api/job/:idComp/student/:jobId', job.submitJob);
app.post('/api/job/:idComp/status/:jobId', job.statusSubmitJob);


app.get('/api/student/page/:page', candidate.getAllCandidatesWithPage);
app.get('/api/company/page/:page', company.getAllCompaniesWithPage);
app.get('/api/job/page/:page', job.getAllJobsWithPage);


app.get('/api/search/job/', job.findJobByName);
app.get('/api/search/student/', candidate.findCandidateByName);
app.get('/api/search/company', company.findCompanyByName);
app.get('/api/search/all', global.getSearchResult);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})