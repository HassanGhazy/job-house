let supertokens = require("supertokens-node");
let Session = require("supertokens-node/recipe/session");
let ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");

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

module.exports;