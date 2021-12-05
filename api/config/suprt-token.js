const supertokens = require("supertokens-node");
const Session = require("supertokens-node/recipe/session");
const md5 = require("blueimp-md5");
const ThirdPartyEmailPassword = require("supertokens-node/recipe/thirdpartyemailpassword");
const { Google, Github, Facebook } = ThirdPartyEmailPassword;
var request = require('request');
function insertNewUser(postData, type) {
    const user = type.toLowerCase() === "candidate" ? "student" : "company";
    var clientServerOptions = {
        uri: `http://localhost:8000/api/${user}`,
        body: JSON.stringify(postData),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    request(clientServerOptions, function (error, response) {
        console.log(error, response.body);
        return;
    });
}
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
        ThirdPartyEmailPassword.init({
            providers: [
                Google({
                    clientId: "821031115004-rj5aqpbdhbilkv1acsn6ta81fkdosdn5.apps.googleusercontent.com",
                    clientSecret: "RNMmX8yly6vz2UNFoJGXbx3Y"
                }),
                Github({
                    clientId: "561a6554363879a4dd28",
                    clientSecret: "fbcec68f6f3a4902e922d9a1f87a217e74a7da5a"
                }),

                Facebook({
                    clientSecret: "597070614609794",
                    clientId: "20c029ac23314e66135717e851f7f090"
                })
            ],
            signUpFeature: {
                formFields: [{
                    id: "name"
                },
                {
                    id: "description"
                },
                {
                    id: "type",
                    validate: async (value) => {
                        if (value.toLowerCase() === "candidate" || value.toLowerCase() === "company") {
                            return undefined; // means that there is no error
                        }
                        return "You must be entered Candidate or Company";
                    }
                }
                ]
            },
            override: {
                apis: (originalImplementation) => {
                    return {
                        ...originalImplementation,

                        // override the email password sign up API
                        emailPasswordSignUpPOST: async function (input) {
                            if (originalImplementation.emailPasswordSignUpPOST === undefined) {
                                throw Error("Should never come here");
                            }

                            // TODO: some pre sign up logic

                            let response = await originalImplementation.emailPasswordSignUpPOST(input);
                            if (response.status === "OK") {
                                const res = input.formFields;
                                let data = {};
                                res.map(e => (e.id !== "type") ? data[`${e.id}`] = e.value : null);
                                data.password = md5(data.password); 
                                insertNewUser(data,input.formFields[4].value);
                            }

                            return response;
                        },

                        // override the email password sign in API
                        emailPasswordSignInPOST: async function (input) {
                            if (originalImplementation.emailPasswordSignInPOST === undefined) {
                                throw Error("Should never come here");
                            }

                            // TODO: some pre sign in logic

                            let response = await originalImplementation.emailPasswordSignInPOST(input);

                            if (response.status === "OK") {
                                // TODO: some post sign in logic
                            }

                            return response;
                        },

                        // override the thirdparty sign in / up API
                        thirdPartySignInUpPOST: async function (input) {
                            if (originalImplementation.thirdPartySignInUpPOST === undefined) {
                                throw Error("Should never come here");
                            }

                            // TODO: Some pre sign in / up logic

                            let response = await originalImplementation.thirdPartySignInUpPOST(input);

                            if (response.status === "OK") {
                                if (response.createdNewUser) {
                                    // TODO: some post sign up logic
                                } else {
                                    // TODO: some post sign in logic
                                }
                            }

                            return response;
                        }
                    }
                }
            }
        }),
        Session.init() // initializes session features
    ]
});

module.exports;