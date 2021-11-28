const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 8000;
const candidate = require('./controllers/candidate');
const company = require('./controllers/company');
const job = require('./controllers/job');
const { middleware } = require("supertokens-node/framework/express");

let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let { errorHandler } = require("supertokens-node/framework/express");


supertokens.init({
    framework: "express",
    supertokens: {
        // try.supertokens.io is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.io), or self host a core.
        connectionURI: "https://01f5cd214f6511ecaac62747d138a5e1-us-east-1.aws.supertokens.io:3569",
        apiKey: "c68HLamIZEdlyC4EC5mCqjVZQHGCoO",
    },
    appInfo: {
        // learn more about this on https://supertokens.io/docs/thirdpartyemailpassword/appinfo
        appName: "Job House",
        apiDomain: "http://localhost:8000",
        websiteDomain: "http://localhost:3000"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({ /*TODO: See next step*/ }),
        Session.init() // initializes session features
    ]
});
app.use(cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());
app.use(express.json());
// app.use(function(req, res, next) {
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//     next();
// });
app.use(errorHandler());

app.get('/', (req, res) => {
        res.json({ message: "Welcome to Job House Api." });
    })
    // supertokens.getAllCORSHeaders().push('Access-Control-Allow-Headers');
var corsOptions = {
    origin: ["http://localhost:3000"],
    allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
    allowMethods: "GET,POST,PUT,DELETE,OPTIONS",

};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.get('/api/student', candidate.getAllCandidates);
app.get('/api/student/page/:page', candidate.getAllCandidatesWithPage);
app.get('/api/student/project', candidate.getAllProjects);
app.get('/api/student/education', candidate.getAllEducations);
app.get('/api/student/project/skill/:name', candidate.getSkillSingleProject);
app.get('/api/student/:id/project/:name', candidate.getsingleProject);
app.get('/api/student/:id/project/', candidate.getAllProjectsToCurrentCandidate);
app.get('/api/student/:id/education/', candidate.getCurrentCandidadateEducate);
app.get('/api/student/:id/education/:eduId', candidate.getSingleEducateFromCurrentCandidadate);
app.get('/api/student/:id/skill/:skillId', candidate.getSingleSkillFromCurrentCandidadate);
app.get('/api/student/:id/skill/', candidate.getAllSkillsToCurrentCandidate);
app.get('/api/student/:id', candidate.findCandidateById);
app.get('/api/skill', candidate.getAllSkills);

app.post('/api/student/', candidate.addNewCandidate);
app.post('/api/student/project/skill/:name', candidate.addSkillsToCurrentProject);
app.post('/api/student/:id/project', candidate.addNewProjectToCurrentCandidate);
app.post('/api/student/:id/education/', candidate.addNewEducationToCurrentCandidate);
app.post('/api/student/:id/skill', candidate.addNewSkillToCurrentCandidate);

app.put('/api/student/project/:name', candidate.updateCurrentProjectForCandidate);
app.put('/api/student/education/:id', candidate.updateCurrentEducateForCandidate);
app.put('/api/student/:id', candidate.updateCurrentCandidate);

app.delete('/api/student/project/:id', candidate.deleteProjectFromCurrentCandidate);
app.delete('/api/student/education/:id', candidate.deleteEducateFromCurrentCandidate);
app.delete('/api/student/skill/:id', candidate.deleteSkillFromCurrentCandidate);
app.delete('/api/student/:id', candidate.deleteCurrentCandidate);

app.get('/api/company', company.getAllCompanies);
app.get('/api/company/:id', company.findCompanyById);
app.post('/api/company/', company.addNewCompany);
app.put('/api/company/:id', company.updateCurrentCompany);
app.delete('/api/company/:id', company.deleteCurrentCompany);
app.get('/api/job', job.getAllJobs);
app.get('/api/job/:id', job.findJobById);



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})