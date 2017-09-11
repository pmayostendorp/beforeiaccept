(function(){

    var FSR;
    var supports_amd = typeof(window.define) === 'function' && window.define.amd;

    if(!supports_amd)
        FSR = window.FSR;
    else
        FSR = {};

    FSR.surveydefs = [{
    name: 'browse',
	brand: 'Foresee',
	section: 'si-Foresee',
    invite: {
        when: 'onentry',
		//corpLogo: 'fsrlogo.gif',
        corpLogo: 'https://survey.foreseeresults.com/images/logos/si-Foresee.gif',
		corpAltText: 'Foresee'
    },
    pop: {
        when: 'now'
    },
    criteria: {
        sp: 10,
        lf: 3
    },
    include: {
        urls: ['.']
    }
},
{
    name: 'browse',
	brand: 'Answers',
	section: 'si-Answers',	
    invite: {
        when: 'onentry',
		//corpLogo: 'answerslogo.gif',
        corpLogo: 'https://survey.foreseeresults.com/images/logos/si-Answers.gif',
		corpAltText: 'Answers'
    },
    pop: {
        when: 'now'
    },
    criteria: {
        sp: 10,
        lf: 3
    },
    include: {
        urls: ['.']
    }
},
{
    name: 'browse',
	brand: 'ForeseeByAnswers',
	section: 'si-ForeseeByAnswers',	
    invite: {
        when: 'onentry',
		//corpLogo: 'fbyalogo.gif',
        corpLogo: 'https://survey.foreseeresults.com/images/logos/si-ForeseeByAnswers.gif',
		corpAltText: 'Foresee By Answers'
    },
    pop: {
        when: 'now'
    },
    criteria: {
        sp: 10,
        lf: 3
    },
    include: {
        urls: ['.']
    }
}];
FSR.properties = {
    repeatdays: 90,
    
    repeatoverride: false,
    
    altcookie: {},
    
    language: {
        locale: 'en'
    },
    
    brands: [{
        "c": "Foresee",
        "p": 33
    }, {
        "c": "Answers",
        "p": 33
    }, {
        "c": "ForeseeByAnswers",
        "p": 34
    }],
    
    exclude: {},
    
    zIndexPopup: 10000,
    
    ignoreWindowTopCheck: false,
    
    ipexclude: 'fsr$ip',
    
    mobileHeartbeat: {
        delay: 60, /*mobile on exit heartbeat delay seconds*/
        max: 3600 /*mobile on exit heartbeat max run time seconds*/
    },
    
    invite: {
    
        // For no site logo, comment this line:
        siteLogo: "sitelogo.gif",
        
        //alt text fore site logo img
        siteLogoAlt: "",
        
        /* Desktop */
        dialogs: [[{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting our website. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            //noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback",
            error: "Error",
            warnLaunch: "this will launch a new window"
        
        
            /*	,quizContent: {
             question: "Did you shop today at the store?",
             answers:[
             {
             answer:"Yes, absolutely.",
             proceedWithSurvey:true
             },
             {
             answer:"No, I didn't, actually",
             proceedWithSurvey:false,
             cancelTitle: "Thank you.",
             cancelText: "Thank you for your willingness to help, but we're not collecting surveys for non-shoppers.<br><br>Please visit again soon!"
             }
             ]
             }*/
        }]],
        
        /* invite positioning */
        /*
         position: {
         offset :{
         h: "0px",
         v: "0px"
         },
         pin:{
         left: false,
         right: false,
         top: false,
         bottom: false
         }
         },
         */
        // Mobile
        /*dialogs : [[{
         reverseButtons: false,
         headline: "We'd welcome your feedback!",
         blurb: "You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
         attribution: "Conducted by ForeSee.",
         declineButton: "No, thanks",
         acceptButton: "Yes, I'll help",
         error: "Error",
         warnLaunch: "this will launch a new window"
         }]],*/
        // Mobile On Exit
        /*dialogs : [
         [ {
         reverseButtons: false,
         headline: "We'd welcome your feedback!",
         blurb: "Can we email or text you later a brief customer satisfaction survey so we can improve your mobile experience?",
         attribution: "Conducted by ForeSee.",
         declineButton: "No, thanks",
         acceptButton: "Yes, I'll help",
         error: "Error"
         } ],
         [ {
         reverseButtons: false,
         headline: "Thank you for helping!",
         blurb: "Please provide your email address or mobile number (US and CA only). After your visit we'll send you a link to the survey. Text Messaging rates apply.",
         attribution: "ForeSee's <a class='fsrPrivacy' href='//www.foresee.com/privacy-policy.shtml' target='_blank'>Privacy Policy</a>",
         declineButton: "Cancel",
         acceptButton: "email/text me",
         error: "Error",
         mobileExitDialog: {
         support:"b", //e for email only, s for sms only, b for both
         inputMessage:"email or mobile number",
         emailMeButtonText:"email me",
         textMeButtonText:"text me",
         fieldRequiredErrorText:"Enter a mobile number or email address",
         invalidFormatErrorText:"Format should be: name@domain.com or 123-456-7890"
         }
         } ] ],*/
        exclude: {
            urls: [],
            referrers: [],
            userAgents: [],
            browsers: [],
            cookies: [],
            variables: []
            // [name (content), http-equiv (content), itemprop (content),  charset] possible attributes for meta tag element http://devdocs.io/html/meta
            // metas:[{"name":{"key":"value", "content":"value"}}, {"http-equiv":{"key":"value", "content":"value"}}, {"itemprop":{"key":"value", "content":"value"}}, {"charset":{"key":"value"}}]
        
        },
        include: {
            local: ['.']
        },
        
        delay: 0,
        timeout: 0,
        
        hideOnClick: false,
        
        hideCloseButton: false,
        
        css: 'foresee-dhtml.css',
        
        hide: [],
        
        hideFlash: false,
        
        type: 'dhtml',
        /* desktop */
        // url: 'invite.html'
        /* mobile */
        url: 'invite-mobile.html',
        back: 'url'
    
        //SurveyMutex: 'SurveyMutex'
    },
    
    tracker: {
        width: '690',
        height: '415',
        timeout: 3,
        adjust: true,
        alert: {
            enabled: true,
            message: 'The survey is now available.'
        },
        url: 'tracker.html'
    },
    
    survey: {
        width: 690,
        height: 600
    },
    
    qualifier: {
        footer: '<div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
        width: '690',
        height: '500',
        bgcolor: '#333',
        opacity: 0.7,
        x: 'center',
        y: 'center',
        delay: 0,
        buttons: {
            accept: 'Continue'
        },
        hideOnClick: false,
        css: 'foresee-dhtml.css',
        url: 'qualifying.html'
    },
    
    cancel: {
        url: 'cancel.html',
        width: '690',
        height: '400'
    },
    
    pop: {
        what: 'survey',
        after: 'leaving-site',
        pu: false,
        tracker: true
    },
    
    meta: {
        referrer: true,
        terms: true,
        ref_url: true,
        url: true,
        url_params: false,
        user_agent: false,
        entry: false,
        entry_params: false
    },
    
    events: {
        enabled: true,
        id: true,
        codes: {
            purchase: 800,
            items: 801,
            dollars: 802,
            followup: 803,
            information: 804,
            content: 805
        },
        pd: 7,
        custom: {}
    },
    
    previous: false,
    
    analytics: {
        google_local: false,
        google_remote: false
    },
    
    cpps: {
        Site_Section: { //this will be the name of the cpp
            source: 'variable',
            name: 'cpp_value' //the value sent will be the value of the parameter
        }
    },
    
    mode: 'hybrid'
};


    if(supports_amd)
        define(function(){ return FSR })
})();
