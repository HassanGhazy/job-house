const express = require('express');

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8000;
const candidate = require('./controllers/candidate');
const company = require('./controllers/company');
const job = require('./controllers/job');
app.use(express.json());
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Job House Api." });
})

var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(corsOptions));

app.get('/api/student', candidate.getAllCandidates);
app.get('/api/student/:id', candidate.findCandidateById);

app.get('/api/company', company.getAllCompanies);
app.get('/api/company/:id', company.findCompanyById);

app.get('/api/job', job.getAllJobs);
app.get('/api/job/:id', job.findJobById);



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})