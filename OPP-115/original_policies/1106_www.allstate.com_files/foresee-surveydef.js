FSR.surveydefs = [{
    name: 'browse',
    section: 'quote',
    pin: 1,
    invite: false,
    pop: {
        when: 'later',
        what: 'qualifier'
    },
    criteria: {
        sp: 100,
        lf: 1
    },
    links: {
        attach: [{
            tag: 'input',
            attribute: 'id',
            patterns: ['ctl00_ctl00__site__ques_btnwelcomeStartQuote', 'ctl00_ctl00__site__ques_btnHomewelcomeStartQuote', 'ctl00$ctl00$_site$_ques$btnwelcomeStartQuote', 'btnLogin'],
            sp: 100,
            when: 'later'
        }, {
            tag: 'input',
            attribute: 'name',
            patterns: ['ctl00$ctl00$_site$_ques$btnwelcomeStartQuote', 'ctl00$ctl00$_site$_ques$btnHomewelcomeStartQuote', 'btnLogin'],
            sp: 100,
            when: 'later'
        }]
    },
    include: {
        urls: ['purchase.allstate.com', 'purchase-assembly.allstate.com']
    }
}, {
    name: 'browse',
    section: 'myaccount',
    pin: 1,
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 8,
        lf: 2
    },
    exclude: {
        local: ['/register.aspx', '/eboregister.aspx', '/migrateaccount.aspx', '/home.aspx']
    },
    include: {
        urls: ['myaccount.allstate.com', 'myaccount-assembly.allstate.com']
    }
}, {
    name: 'browse',
    section: 'main',
    invite: {
        when: 'onentry'
    },
    pop: {
        when: 'later'
    },
    criteria: {
        sp: 25,
        lf: 3
    },
    exclude: {
        local: []
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
    
    exclude: {},
    
    zIndexPopup: 10000,
    
    ignoreWindowTopCheck: false,
    
    ipexclude: 'fsr$ip',
    
    mobileHeartbeat: {
        delay: 60, /*mobile on exit heartbeat delay seconds*/
        max: 3600 /*mobile on exit heartbeat max run time seconds*/
    },
    
    invite: {
    
        // Is this an MDOT Site?
        isMDOT: false,
        
        // Is this site zoomable? (aka pinch-able)
        isZoomable: false,
        
        // For no site logo, comment this line:
        siteLogo: "sitelogo.gif",
        
        /* Desktop */
        dialogs: [{
            reverseButtons: false,
            headline: "We'd welcome your feedback!",
            blurb: "Thank you for visiting Allstate.com. You have been selected to participate in a brief customer satisfaction survey to let us know how we can improve your experience.",
            noticeAboutSurvey: "The survey is designed to measure your entire experience, please look for it at the <u>conclusion</u> of your visit.",
            attribution: "This survey is conducted by an independent company ForeSee, on behalf of the site you are visiting.",
            closeInviteButtonText: "Click to close.",
            declineButton: "No, thanks",
            acceptButton: "Yes, I'll give feedback"
        }],
        
        exclude: {
            local: ['/about/northern-ireland', '/india'],
            referrer: []
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
        footer: '<div div id=\"fsrcontainer\"><div style=\"float:left;width:80%;font-size:8pt;text-align:left;line-height:12px;\">This survey is conducted by an independent company ForeSee,<br>on behalf of the site you are visiting.</div><div style=\"float:right;font-size:8pt;\"><a target="_blank" title="Validate TRUSTe privacy certification" href="//privacy-policy.truste.com/click-with-confidence/ctv/en/www.foreseeresults.com/seal_m"><img border=\"0\" src=\"{%baseHref%}truste.png\" alt=\"Validate TRUSTe Privacy Certification\"></a></div></div>',
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
        custom: {
            information: {
                enabled: false,
                repeat: false,
                source: 'url',
                patterns: ['PurchaseProof.aspx']
            }
        }
    },
    
    previous: false,
    
    analytics: {
        google_local: false,
        google_remote: false
    },
    
    cpps: {
        Registration: {
            source: 'variable',
            name: 'Registration_Type'
        },
        Enrollment: {
            source: 'variable',
            name: 'Enrollment_Type'
        },
        One_time: {
            source: 'variable',
            name: 'One_Time_Payment_Type'
        },
        Recurring: {
            source: 'variable',
            name: 'Recurring_Payment_Type'
        },
        Endorsements: {
            source: 'variable',
            name: 'Completed_Endorsements'
        },
        PurchaseProof: {
            source: 'url',
            init: 'false',
            patterns: [{
                regex: 'PurchaseProof.aspx',
                value: 'true'
            }]
        },
        NeworRepeatVisitor: {
            init: 'N',
            source: 'variable',
            name: 's.prop36'
        },
        ExternalCampaign: {
            init: 'N',
            source: 'variable',
            name: 's.campaign'
        },
        ExitLink: {
            init: 'N',
            source: 'variable',
            name: 'pev1'
        },
        InternalSearchTerm: {
            init: 'N',
            source: 'variable',
            name: 's.eVar5'
        },
        InternalCampaign: {
            init: 'N',
            source: 'variable',
            name: 's.eVar4'
        },
        VideoSegment: {
            init: 'N',
            source: 'variable',
            name: 's.eVar52'
        }
    },
    
    mode: 'first-party'
};
