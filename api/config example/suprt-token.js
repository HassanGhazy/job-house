const cors = require("cors");
const express = require('express');
const app = express();

const { middleware } = require("supertokens-node/framework/express");
let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
let { errorHandler } = require("supertokens-node/framework/express");

const supertokensInit = () => { 
supertokens.init({
    framework: "express",
    supertokens: {
        // try.supertokens.io is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.io), or self host a core.
        connectionURI: "YOUR_CONNECTION_URI",
        apiKey: "YOUR_API_KEY",
    },
    appInfo: {
        // learn more about this on https://supertokens.io/docs/thirdpartyemailpassword/appinfo
        appName: "Job House",
        apiDomain: "YOUR_API_DOMAIN",
        websiteDomain: "YOUR_WEBSITE_DOMAIN"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({ /*TODO: See next step*/ }),
        Session.init() // initializes session features
    ]
});
app.use(cors({
    origin: "YOUR_WEBSITE_DOMAIN",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
}));

app.use(middleware());
app.use(express.json());
app.use(errorHandler());

var corsOptions = {
    origin: ["YOUR_WEBSITE_DOMAIN"],
    allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
    allowMethods: "GET,POST,PUT,DELETE,OPTIONS",

};
app.use(cors(corsOptions));
}
module.exports = supertokensInit;