/* ==========================================================================
   Javascript Specific Environment Settings

   For things that differ between the CE Sandbox and the Sitecore environment
   ========================================================================== */


var kraft = kraft || {};
kraft.environmentSettings = {
    registration: {
        url: "/_Handlers/RegistrationHandler.ashx",
        modalPage: "/registration%20step%201.aspx",
        returnObject: {
            errorCode: 0
        }
    },
    signin: {
        url: "/_Handlers/SignInHandler.ashx",
        returnObject: {
            errorCode: 0
        }
    },
    recipesByEmail: {
        url: "/_Handlers/EmailSignUpHandler.ashx",
        returnObject: {
            fieldError: "Success!!"
        }
    },
    facebookSignIn: {
        url: "/_Handlers/FacebookConnectHandler.ashx",
        returnObject: {
            errorCode: 0
        }
    },
    ratingReviewForm: {
        url: "/_Handlers/RatingsReviewsFormHandler.ashx",
        returnObject: {
            errorCode: 0
        }
    },
    blogCommentsForm: {
        url: "/_Handlers/BlogReviewsFormHandler.ashx",
        returnObject: {
            errorCode: 0
        }
    },
    changeZip: {
        url: "",
    },
    zipModal: {
        url: "/change-zip",
        returnObject: {
            errorCode: 0
        }
    },
    siteSearch: {
        predictions: {
            url: "/_Handlers/GetIngredientsAutoSuggestHandler.ashx",
            returnObject: {
                errorCode: 0
            }
        }
    },
    memberRecipe: {
        url: "/_Handlers/MemberRecipeSubmissionHandler.ashx",
        returnObject: {
            errorCode: 0
        }
    },
    emailShoppingList: {
        url: "",
        returnObject: {
            errorCode: 0
        }
    },
    checkAuth: {
        url: "/_Handlers/AuthenticationCheck.ashx"
    }

};

kraft.facebookAppId = '301617330024020'; //will be overwritten