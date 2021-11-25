const express = require('express');

const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 8080;
const merchant_model = require('./admin_modal');
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



app.get('/api/student', (req, res) => {
    merchant_model.getStudents()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/company', (req, res) => {
    merchant_model.getCompanies()
        .then(response => {
            res.status(200).send(response);
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})