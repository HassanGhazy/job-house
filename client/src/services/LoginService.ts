import SuperTokens from "supertokens-auth-react";
import Session from "supertokens-auth-react/recipe/session";
import ThirdPartyEmailPassword, { Facebook, Github, Google } from "supertokens-auth-react/recipe/thirdpartyemailpassword";

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.io/docs/thirdpartyemailpassword/appinfo
        appName: "Job House",
        apiDomain: "http://localhost:8000",
        websiteDomain: "http://localhost:3000"
    },
    recipeList: [
        ThirdPartyEmailPassword.init({
            onHandleEvent: async (context) => {
                if (context.action === "SESSION_ALREADY_EXISTS") {
                    // TODO:
                } else {
                    console.log('context', context.action);
                    if (context.action === "SUCCESS") {
                        return window.location.href = '/browse-job';
                    }
                }
            },
            signInAndUpFeature: {
                signUpForm: {
                    formFields: [{
                        id: "name",
                        label: "Full name",
                        placeholder: "First name and last name"
                    },
                    {
                        id: "description",
                        label: "Description",
                        placeholder: "Enter something about you",
                    },
                    {
                        id: "type",
                        label: "Type",
                        placeholder: "Enter Candidate or Company",
                        validate: async (value: string) => {
                            if (value.toLowerCase() === "candidate" || value.toLowerCase() === "company") {
                                return undefined; // means that there is no error
                            }
                            return "You must enter Candidate or Company";
                        }
                    }
                    ]
                },
                providers: [
                    Github.init(),
                    Google.init(),
                    Facebook.init(),
                ]
            },
            palette: {
                primary: '#0d9bf9',
            },
        }),
        Session.init()
    ]
});