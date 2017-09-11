/* SiteCatalyst code version: H.24 (NFLCS modified).
 Copyright 1997-2008 Omniture, Inc. More info available at
 http://www.omniture.com */
/************************ ADDITIONAL FEATURES ************************
 Plugins
 */

/*
 PLEASE READ:
 THE s_account VAR AND ASSIGNED VALUES HAVE BEEN MOVED TO HEAD.JSP BECAUSE FLASH MEDIA
 PLAYER REQUIRES THIS INFO BEFORE s_code.js IS INSTANTIATED...
 */



var s_analytics=new TagContainerLoader();
s_analytics.tagContainerDC="d1";
s_analytics.tagContainerNamespace="nfl";
s_analytics.tagContainerName="teamscode";
s_analytics.loadTagContainer();

/************************** CONFIG SECTION **************************/


/* supported page variables/settings */

// sitePrefix - s_analytics_prefix
// pageName : s_analytics_pagename 
// hierarchy : s_analytics_hier

/* ********************************* */

/* You may add or alter any code config here. */

/* Conversion Config */
s_analytics.currencyCode = "USD"

/* Link Tracking Config */
s_analytics.trackDownloadLinks = true
s_analytics.trackExternalLinks = true
s_analytics.trackInlineStats = true
s_analytics.linkDownloadFileTypes = "exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx"

/* sets reporting filters - need to add for each club site launch... */
//if (nflcsClubCode=='BUF') s_analytics.linkInternalFilters="javascript:,buffalobills.com";
//if (nflcsClubCode=='SEA') s_analytics.linkInternalFilters="javascript:,seahawks.com";
/* --- */

s_analytics.linkLeaveQueryString = false
s_analytics.linkTrackVars = "None"
s_analytics.linkTrackEvents = "None"

/* Plugin Config */
s_analytics.usePlugins = true
function s_analytics_doPlugins(s_analytics) {

    /* Add calls to plugins here */

    //	copy s_analytics_prop to s_analytics.prop
    if (typeof(s_analytics_prop1) != 'undefined') {
        s_analytics.prop1 = s_analytics_prop1;
    }
    if (typeof(s_analytics_prop2) != 'undefined') {
        s_analytics.prop2 = s_analytics_prop2;
    }
    if (typeof(s_analytics_prop3) != 'undefined') {
        s_analytics.prop3 = s_analytics_prop3;
    }
    if (typeof(s_analytics_prop4) != 'undefined') {
        s_analytics.prop4 = s_analytics_prop4;
    }
    if (typeof(s_analytics_prop5) != 'undefined') {
        s_analytics.prop5 = s_analytics_prop5;
    }
    if (typeof(s_analytics_prop6) != 'undefined') {
        s_analytics.prop6 = s_analytics_prop6;
    }
    if (typeof(s_analytics_prop7) != 'undefined') {
        s_analytics.prop7 = s_analytics_prop7;
    }
    if (typeof(s_analytics_prop8) != 'undefined') {
        s_analytics.prop8 = s_analytics_prop8;
    }
    if (typeof(s_analytics_prop9) != 'undefined') {
        s_analytics.prop9 = s_analytics_prop9;
    }
    if (typeof(s_analytics_prop10) != 'undefined') {
        s_analytics.prop10 = s_analytics_prop10;
    }
    if (typeof(s_analytics_prop11) != 'undefined') {
        s_analytics.prop11 = s_analytics_prop11;
    }
    if (typeof(s_analytics_prop12) != 'undefined') {
        s_analytics.prop12 = s_analytics_prop12;
    }
    if (typeof(s_analytics_prop13) != 'undefined') {
        s_analytics.prop13 = s_analytics_prop13;
    }
    if (typeof(s_analytics_prop14) != 'undefined') {
        s_analytics.prop14 = s_analytics_prop14;
    }
    if (typeof(s_analytics_prop15) != 'undefined') {
        s_analytics.prop15 = s_analytics_prop15;
    }
    if (typeof(s_analytics_prop16) != 'undefined') {
        s_analytics.prop16 = s_analytics_prop16;
    }
    if (typeof(s_analytics_prop17) != 'undefined') {
        s_analytics.prop17 = s_analytics_prop17;
    }
    if (typeof(s_analytics_prop18) != 'undefined') {
        s_analytics.prop18 = s_analytics_prop18;
    }
    if (typeof(s_analytics_prop19) != 'undefined') {
        s_analytics.prop19 = s_analytics_prop19;
    }
    if (typeof(s_analytics_prop20) != 'undefined') {
        s_analytics.prop20 = s_analytics_prop20;
    }
    if (typeof(s_analytics_prop21) != 'undefined') {
        s_analytics.prop21 = s_analytics_prop21;
    }
    if (typeof(s_analytics_prop22) != 'undefined') {
        s_analytics.prop22 = s_analytics_prop22;
    }
    if (typeof(s_analytics_prop23) != 'undefined') {
        s_analytics.prop23 = s_analytics_prop23;
    }
    if (typeof(s_analytics_prop24) != 'undefined') {
        s_analytics.prop24 = s_analytics_prop24;
    }
    if (typeof(s_analytics_prop25) != 'undefined') {
        s_analytics.prop25 = s_analytics_prop25;
    }
    if (typeof(s_analytics_prop26) != 'undefined') {
        s_analytics.prop26 = s_analytics_prop26;
    }
    if (typeof(s_analytics_prop27) != 'undefined') {
        s_analytics.prop27 = s_analytics_prop27;
    }
    if (typeof(s_analytics_prop28) != 'undefined') {
        s_analytics.prop28 = s_analytics_prop28;
    }
    if (typeof(s_analytics_prop29) != 'undefined') {
        s_analytics.prop29 = s_analytics_prop29;
    }
    if (typeof(s_analytics_prop30) != 'undefined') {
        s_analytics.prop30 = s_analytics_prop30;
    }
    if (typeof(s_analytics_prop31) != 'undefined') {
        s_analytics.prop31 = s_analytics_prop31;
    }
    if (typeof(s_analytics_prop32) != 'undefined') {
        s_analytics.prop32 = s_analytics_prop32;
    }
    if (typeof(s_analytics_prop33) != 'undefined') {
        s_analytics.prop33 = s_analytics_prop33;
    }
    if (typeof(s_analytics_prop34) != 'undefined') {
        s_analytics.prop34 = s_analytics_prop34;
    }
    if (typeof(s_analytics_prop35) != 'undefined') {
        s_analytics.prop35 = s_analytics_prop35;
    }
    if (typeof(s_analytics_prop36) != 'undefined') {
        s_analytics.prop36 = s_analytics_prop36;
    }
    if (typeof(s_analytics_prop37) != 'undefined') {
        s_analytics.prop37 = s_analytics_prop37;
    }
    if (typeof(s_analytics_prop38) != 'undefined') {
        s_analytics.prop38 = s_analytics_prop38;
    }
    if (typeof(s_analytics_prop39) != 'undefined') {
        s_analytics.prop39 = s_analytics_prop39;
    }
    if (typeof(s_analytics_prop40) != 'undefined') {
        s_analytics.prop40 = s_analytics_prop40;
    }
    if (typeof(s_analytics_prop41) != 'undefined') {
        s_analytics.prop41 = s_analytics_prop41;
    }
    if (typeof(s_analytics_prop42) != 'undefined') {
        s_analytics.prop42 = s_analytics_prop42;
    }
    if (typeof(s_analytics_prop43) != 'undefined') {
        s_analytics.prop43 = s_analytics_prop43;
    }
    if (typeof(s_analytics_prop44) != 'undefined') {
        s_analytics.prop44 = s_analytics_prop44;
    }
    if (typeof(s_analytics_prop45) != 'undefined') {
        s_analytics.prop45 = s_analytics_prop45;
    }
    if (typeof(s_analytics_prop46) != 'undefined') {
        s_analytics.prop46 = s_analytics_prop46;
    }
    if (typeof(s_analytics_prop47) != 'undefined') {
        s_analytics.prop47 = s_analytics_prop47;
    }
    if (typeof(s_analytics_prop48) != 'undefined') {
        s_analytics.prop48 = s_analytics_prop48;
    }
    if (typeof(s_analytics_prop49) != 'undefined') {
        s_analytics.prop49 = s_analytics_prop49;
    }
    if (typeof(s_analytics_prop50) != 'undefined') {
        s_analytics.prop50 = s_analytics_prop50;
    }

    //	copy s_analytics_eVar to s_analytics.eVar
    if (typeof(s_analytics_eVar1) != 'undefined') {
        s_analytics.eVar1 = s_analytics_eVar1;
    }
    if (typeof(s_analytics_eVar2) != 'undefined') {
        s_analytics.eVar2 = s_analytics_eVar2;
    }
    if (typeof(s_analytics_eVar3) != 'undefined') {
        s_analytics.eVar3 = s_analytics_eVar3;
    }
    if (typeof(s_analytics_eVar4) != 'undefined') {
        s_analytics.eVar4 = s_analytics_eVar4;
    }
    if (typeof(s_analytics_eVar5) != 'undefined') {
        s_analytics.eVar5 = s_analytics_eVar5;
    }
    if (typeof(s_analytics_eVar6) != 'undefined') {
        s_analytics.eVar6 = s_analytics_eVar6;
    }
    if (typeof(s_analytics_eVar7) != 'undefined') {
        s_analytics.eVar7 = s_analytics_eVar7;
    }
    if (typeof(s_analytics_eVar8) != 'undefined') {
        s_analytics.eVar8 = s_analytics_eVar8;
    }
    if (typeof(s_analytics_eVar9) != 'undefined') {
        s_analytics.eVar9 = s_analytics_eVar9;
    }
    if (typeof(s_analytics_eVar10) != 'undefined') {
        s_analytics.eVar10 = s_analytics_eVar10;
    }
    if (typeof(s_analytics_eVar11) != 'undefined') {
        s_analytics.eVar11 = s_analytics_eVar11;
    }
    if (typeof(s_analytics_eVar12) != 'undefined') {
        s_analytics.eVar12 = s_analytics_eVar12;
    }
    if (typeof(s_analytics_eVar13) != 'undefined') {
        s_analytics.eVar13 = s_analytics_eVar13;
    }
    if (typeof(s_analytics_eVar14) != 'undefined') {
        s_analytics.eVar14 = s_analytics_eVar14;
    }
    if (typeof(s_analytics_eVar15) != 'undefined') {
        s_analytics.eVar15 = s_analytics_eVar15;
    }
    if (typeof(s_analytics_eVar16) != 'undefined') {
        s_analytics.eVar16 = s_analytics_eVar16;
    }
    if (typeof(s_analytics_eVar17) != 'undefined') {
        s_analytics.eVar17 = s_analytics_eVar17;
    }
    if (typeof(s_analytics_eVar18) != 'undefined') {
        s_analytics.eVar18 = s_analytics_eVar18;
    }
    if (typeof(s_analytics_eVar19) != 'undefined') {
        s_analytics.eVar19 = s_analytics_eVar19;
    }
    if (typeof(s_analytics_eVar20) != 'undefined') {
        s_analytics.eVar20 = s_analytics_eVar20;
    }
    if (typeof(s_analytics_eVar21) != 'undefined') {
        s_analytics.eVar21 = s_analytics_eVar21;
    }
    if (typeof(s_analytics_eVar22) != 'undefined') {
        s_analytics.eVar22 = s_analytics_eVar22;
    }
    if (typeof(s_analytics_eVar23) != 'undefined') {
        s_analytics.eVar23 = s_analytics_eVar23;
    }
    if (typeof(s_analytics_eVar24) != 'undefined') {
        s_analytics.eVar24 = s_analytics_eVar24;
    }
    if (typeof(s_analytics_eVar25) != 'undefined') {
        s_analytics.eVar25 = s_analytics_eVar25;
    }
    if (typeof(s_analytics_eVar26) != 'undefined') {
        s_analytics.eVar26 = s_analytics_eVar26;
    }
    if (typeof(s_analytics_eVar27) != 'undefined') {
        s_analytics.eVar27 = s_analytics_eVar27;
    }
    if (typeof(s_analytics_eVar28) != 'undefined') {
        s_analytics.eVar28 = s_analytics_eVar28;
    }
    if (typeof(s_analytics_eVar29) != 'undefined') {
        s_analytics.eVar29 = s_analytics_eVar29;
    }
    if (typeof(s_analytics_eVar30) != 'undefined') {
        s_analytics.eVar30 = s_analytics_eVar30;
    }
    if (typeof(s_analytics_eVar31) != 'undefined') {
        s_analytics.eVar31 = s_analytics_eVar31;
    }
    if (typeof(s_analytics_eVar32) != 'undefined') {
        s_analytics.eVar32 = s_analytics_eVar32;
    }
    if (typeof(s_analytics_eVar33) != 'undefined') {
        s_analytics.eVar33 = s_analytics_eVar33;
    }
    if (typeof(s_analytics_eVar34) != 'undefined') {
        s_analytics.eVar34 = s_analytics_eVar34;
    }
    if (typeof(s_analytics_eVar35) != 'undefined') {
        s_analytics.eVar35 = s_analytics_eVar35;
    }
    if (typeof(s_analytics_eVar36) != 'undefined') {
        s_analytics.eVar36 = s_analytics_eVar36;
    }
    if (typeof(s_analytics_eVar37) != 'undefined') {
        s_analytics.eVar37 = s_analytics_eVar37;
    }
    if (typeof(s_analytics_eVar38) != 'undefined') {
        s_analytics.eVar38 = s_analytics_eVar38;
    }
    if (typeof(s_analytics_eVar39) != 'undefined') {
        s_analytics.eVar39 = s_analytics_eVar39;
    }
    if (typeof(s_analytics_eVar40) != 'undefined') {
        s_analytics.eVar40 = s_analytics_eVar40;
    }
    if (typeof(s_analytics_eVar41) != 'undefined') {
        s_analytics.eVar41 = s_analytics_eVar41;
    }
    if (typeof(s_analytics_eVar42) != 'undefined') {
        s_analytics.eVar42 = s_analytics_eVar42;
    }
    if (typeof(s_analytics_eVar43) != 'undefined') {
        s_analytics.eVar43 = s_analytics_eVar43;
    }
    if (typeof(s_analytics_eVar44) != 'undefined') {
        s_analytics.eVar44 = s_analytics_eVar44;
    }
    if (typeof(s_analytics_eVar45) != 'undefined') {
        s_analytics.eVar45 = s_analytics_eVar45;
    }
    if (typeof(s_analytics_eVar46) != 'undefined') {
        s_analytics.eVar46 = s_analytics_eVar46;
    }
    if (typeof(s_analytics_eVar47) != 'undefined') {
        s_analytics.eVar47 = s_analytics_eVar47;
    }
    if (typeof(s_analytics_eVar48) != 'undefined') {
        s_analytics.eVar48 = s_analytics_eVar48;
    }
    if (typeof(s_analytics_eVar49) != 'undefined') {
        s_analytics.eVar49 = s_analytics_eVar49;
    }
    if (typeof(s_analytics_eVar50) != 'undefined') {
        s_analytics.eVar50 = s_analytics_eVar50;
    }

    //	copy s_analytics_events to s_analytics.events
    if (typeof(s_analytics_events) != 'undefined') {
        s_analytics.events = s_analytics_events;
    }

    //	copy s_analytics to s_analytics
    if (typeof(s_analytics_events) != 'undefined') {
        s_analytics.pageName = s_analytics_pageName;
    }
    if (typeof(s_analytics_server) != 'undefined') {
        s_analytics.server = s_analytics_server;
    }
    if (typeof(s_analytics_channel) != 'undefined') {
        s_analytics.channel = s_analytics_channel;
    }
    if (typeof(s_analytics_pageType) != 'undefined') {
        s_analytics.pageType = s_analytics_pageType;
    }
    if (typeof(s_analytics_products) != 'undefined') {
        s_analytics.products = s_analytics_products;
    }
    if (typeof(s_analytics_purchaseID) != 'undefined') {
        s_analytics.purchaseID = s_analytics_purchaseID;
    }
    if (typeof(s_analytics_campaign) != 'undefined') {
        s_analytics.campaign = s_analytics_campaign;
    }


    // Populate Pagename, Channel, Hier based on current URL


    s_analytics.getDomain = function(thestring) {
        //function that matches the beginning of a URL
        //in a string and then returns the domain.
        var urlpattern = new RegExp("(http|ftp|https)://(.*?)/.*$");
        var parsedurl = thestring.match(urlpattern);
        return parsedurl[2];
    };

    s_analytics.getClubCode = function()
    {
        var club = "";

        if (typeof(s_analytics_prefix) == "string") {
            club = s_analytics_prefix;
        } else if (typeof s_analytics_hier1 == "string") {
            club = s_analytics_hier1.split('|');
            club = club[0];
        } else
        {
            club = s_analytics.getDomain(window.location.href);

        }

        return club.toLowerCase();
    };

    s_analytics.prefix = s_analytics.getClubCode();
    // }


    // getHier -  finds the hier by getting pathname from url - used when s_analytics_hier1 is not set.
    s_analytics.getHier = function(s) {
        if (!s)
            s = window.location.pathname;
        if (/\.[^\/]+$/.test(s))
            s = s.substring(0, s.lastIndexOf("/"));
        s = s_analytics.prefix.toLowerCase() + s.toLowerCase().replace(/\//g, "|");

        return s.replace(/\|$/, "");
    };

    //add variable to set to getHier result
    s_analytics.gH = s_analytics.getHier();

    //get FileName - finds filename of page - used if pagename / s_analytics_gf1 not set
    s_analytics.getFileName = function() {

        var url = document.URL,
            i = url.lastIndexOf('/') + 1,
            j = url.indexOf('#', i),
            k = url.indexOf('?', i);


        if (-1 == j) {
            j = url.length;
        }
        if (-1 == k) {
            k = url.length;
        }
        url = url.substring(i, Math.min(j, k));
        return url;
    };

    // if s_analytics.gf1; is not set, use getFileName() to populate
    //

    if ((typeof(s_analytics_gf1) != "string") || s_analytics_gf1 == "") {
        s_analytics.gf1 = s_analytics.getFileName();
    } else {
        s_analytics.gf1 = s_analytics_gf1;
    }

    // set gf1 to lowercase, strip off html if present
    s_analytics.gf1 = s_analytics.gf1.toLowerCase();
    if (s_analytics.gf1.match('.html')) {
        s_analytics.gf1 = s_analytics.gf1.split('.');
        s_analytics.gf1 = s_analytics.gf1[0];
    }

    // test response
    s_analytics.test1 = s_analytics.prefix + "|" + s_analytics.gf1;


    //added check for splash page so that channel, pagename and hier1 are properly set when splash page is active
    if(typeof(s_analytics_pageName) != 'undefined' && s_analytics_pageName.toLowerCase() === 'splash'){
        s_analytics.gf1 = 'splash';
    }

    // test for filename, if not present set to 'landing'
    if ((typeof(s_analytics.gf1) != "string") || (s_analytics.gf1.substr(0, 5) == "index") || s_analytics.gf1 == "")
    {
        s_analytics.gf1 = "landing";
    }

    // 3rd party apparatus to have empty filename or determine filename
    if (s_analytics.gf1 == 'empty') {
        s_analytics.gf1 = '';
    }


    // checks for set Hier if not there, creats hier using getHier() + gf (getFilename)
    if ((typeof(s_analytics_hier) != 'string') || s_analytics_hier == "") {
        // set hier1 to .gH (result for getHier())
        s_analytics.hier1 = s_analytics.gH; // + "|" + s_analytics.gf1;

        if (s_analytics.hier1.indexOf(s_analytics.gf1) == -1) {

            s_analytics.hier1 += "|" + s_analytics.gf1;
        }

    } else {
        s_analytics.hier1 = s_analytics_hier.replace(/[|]$/, '') + "|" + s_analytics.gf1;
    }


    s_analytics.sepPath = s_analytics.hier1.split("|");

    //console.log("hier1-a is: " + s_analytics.hier1);

    //sepPath switch check for home vs landing.

    //console.log("gh:: " + s_analytics.gH);
    if (s_analytics.sepPath[1] == "landing") {
        s_analytics.gf1 = "home";
        s_analytics.hier1 = s_analytics.gH + "|" + "home";
        s_analytics.channel = "home";
        s_analytics_channel = "home";
    } else {
        s_analytics.gf1 = s_analytics.gf1;
        s_analytics.hier1 = s_analytics.hier1;
    }

    //Get pluck specific pagename
    s_analytics.doPluckPageOverride = function() {

        var pluckPage = nflcs.gbl.returnUriVariable("plckForumPage");
        //console.log("pluckPage="+pluckPage);
        if(pluckPage != "") {
            //console.log("pluckPage="+pluckPage);
            s_analytics.hier1 = s_analytics.prefix +"|"+ s_analytics.sepPath[1]+"|"+pluckPage;
            //console.log("heir1="+s_analytics.heir1);
            s_analytics_channel = "forum";
            s_analytics_pageName = s_analytics.prefix +":"+ s_analytics.sepPath[1]+":"+pluckPage;
        }
    };

    //Do PluckOverides
    s_analytics.doPluckPageOverride();


    //console.log("gf1 is: " + s_analytics.gf1);
    //console.log("hier1 is: " + s_analytics.hier1);
    //console.log("prefix is: " + s_analytics.prefix);
    //console.log("sepPath 1 is: " + s_analytics.sepPath[1]);
    //if(typeof(s_analytics_pageName) != 'undefined') console.log("pageName is: " + s_analytics_pageName);
    //console.log("channel is: " + s_analytics.channel);


    // for hierarchy, if the last char is a colon, then remove it
    if (/[|]$/.test(s_analytics.hier1)) {
        s_analytics.hier1 = s_analytics.hier1.replace(/[|]$/, '');
    }


    //test for server set value
    if ((typeof(s_analytics_pageName) != "string") || s_analytics_pageName == "")
    {
        s_analytics.pageName = s_analytics.hier1.replace(/\:/g, "|");
        //test if pagename already exists in hier1 variable
        if (s_analytics.hier1.indexOf(s_analytics.pageName) == -1) {
            s_analytics.pageName += "|" + s_analytics.gf1;
        }

    } else {
        //since the server set the variable, use it.
        s_analytics.pageName = s_analytics_pageName;
    }


    // clean hier1

    s_analytics.hier1 = s_analytics.hier1.toLowerCase();
    s_analytics.pageName = s_analytics.pageName.toLowerCase();
    s_analytics.pageName = s_analytics.pageName.replace(/\|/g, ':');

    // for page name, if the last char is a colon, then remove it
    if (/[:]$/.test(s_analytics.pageName)) s_analytics.pageName = s_analytics.pageName.replace(/[:]$/, '');

    // channel tweaking
    var x = s_analytics.hier1.split(":");
    x.pop();
    s_analytics.channel = typeof s_analytics_channel == "string" ? s_analytics_channel.toLowerCase() : "";


    //External Campaigns
    s_analytics.campaign = s_analytics.getQueryParam('campaign');
    s_analytics.clickThruQuality('s_kwcid,campaign', 'event4', 'event5', 'event19', 5);
    s_analytics.campaign = s_analytics.getValOnce(s_analytics.campaign, "s_campaign", 0)

    //Internal Campaigns
    s_analytics.eVar1 = s_analytics.getQueryParam('icampaign');
    s_analytics.eVar1 = s_analytics.getValOnce(s_analytics.eVar1, "s_eVar1", 0)


    //time parting rows
    s_analytics.eVar9=s_analytics.getTimeParting('h','-5'); //Set hour
    s_analytics.prop9=s_analytics.getTimeParting('h','-5');
    s_analytics.prop8=s_analytics.getTimeParting('d','-5'); // Set day
    s_analytics.eVar8=s_analytics.getTimeParting('d','-5');
    s_analytics.prop10=s_analytics.getTimeParting('w','-5'); // Set Weekend / Weekday
    s_analytics.eVar10=s_analytics.getTimeParting('w','-5');

    //Get new/repeat visitor
    s_analytics.prop24 = s_analytics.getNewRepeat();

    //For Clickmap objectIDs
    s_analytics.setupDynamicObjectIDs();

    // Lowercase variables
    if (s_analytics.prop6)
        s_analytics.prop6 = s_analytics.prop6.toLowerCase()

    // Copy search term to eVar
    if (s_analytics.prop6) {
        s_analytics.eVar5 = s_analytics.prop6

        /* Set de-duped onsite search event */
        var t_search = s_analytics.getValOnce(s_analytics.eVar5, 'ev5', 0)
        if (t_search)
            s_analytics.events = s_analytics.apl(s_analytics.events, 'event2', 1)
    }

    /* Set Page View Event*/
    s_analytics.events=s_analytics.apl(s_analytics.events,'event1',',',2);

    // Copy Page Name & Channel to eVars
    if (s_analytics.pageName) s_analytics.eVar2 = s_analytics.pageName;
    if (s_analytics.channel) s_analytics.eVar3 = s_analytics.channel;

    //Days since last visit
    s_analytics.prop21 = s_analytics.getDaysSinceLastVisit();
    s_analytics.eVar6 = s_analytics.getDaysSinceLastVisit();

    // set prop22
    s_analytics.prop22 = s_analytics.prefix + ".com";


    //console.log("22:" + s_analytics.prop22);
    //set prop 23
    //s_analytics.prop22s = s_analytics.prop22.split('.');


    s_analytics.prop23 = s_analytics.prefix + ":" + s_analytics.channel;

    s_analytics.getSecondsConsumed('event38');
    /*Handling Exit Links, both automatic and maual*/
    var url=s_analytics.exitLinkHandler();
    if(url){
        s_analytics.getSecondsConsumed('event38',1);
    }

    // console.log("23 s!:" + s_analytics.prop23);

}
s_analytics.doPlugins = s_analytics_doPlugins;


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
function TagContainerLoader(){var t=this,w=t.w=window;t.d=w.document;t._c='s_l';if(!w.s_c_il){w.s_c_il=[];w.s_c_in=0}t._il=w.s_c_il;t._in=w.s_c_in;t._il[t._in]=t;w.s_c_in++;t.timeout=5000;t.to=
    new Function('var t=s_c_il['+t._in+'];if(t.mt)t.mt(0)');t.loadTagContainer=function(){var t=this,l,p=t.d.body,n,a=t.tagContainerServer?t.tagContainerServer:'www.adobetag.com',b=
    t.tagContainerServerSecure?t.tagContainerServerSecure:a,c=t.d.cookie,d=t.tagContainerEnv?t.tagContainerEnv:(c?(c.indexOf('s_tagEnv=dev')>=0?'dev':(c.indexOf('s_tagEnv=stage')>=0?'stage':'live')):
    'live'),u=(t.w.location.protocol.toLowerCase().indexOf('https')>=0?'https://'+b:'http://'+a)+'/'+(t.tagContainerDC?t.tagContainerDC+'/':'')+t.tagContainerNamespace+'/'+d+'/'+t.tagContainerName+'.js'
    if(t.tagContainerURL)u=t.tagContainerURL;if(t.timeout)t.ti=setTimeout(t.to,t.timeout);if(t.d.getElementsByTagName){l=t.d.getElementsByTagName('HEAD');if(l&&l[0])p=l[0]}else p=0;if(
        p&&!t.tagContainerSynchronous){n=t.d.createElement('SCRIPT');if(n){n.type='text/javascript';n.setAttribute('async','async');n.src=u;if(p.firstChild)p.insertBefore(n,p.firstChild);else p.appendChild(n)
    }}else t.d.write('<sc'+'ript language="JavaScript" type="text/javascript" sr'+'c="'+u+'"></sc'+'ript>')};t.fs=function(x,y){if(x&&y){var a=x.split(','),b=y.split(','),i,j;for(i=0;i<a.length;i++){
    for(j=0;j<b.length;j++)if(a[i]==b[j])return 1}}return 0};t.aa=function(a){var b=0,i;if(a){b=[];for(i=0;i<a.length;i++)b[i]=a[i]}return b};t.wl=[];t.wq=[];t.createAsynchronousCustomTagHandler=function(
    o,f){var t=this,x,i;if(!f){f=o;o=0;x=t.w}else{if(!t.w[o])t.w[o]={};x=t.wl[o]=t.w[o]}if(typeof(f)!='object')f=[f];for(i=0;i<f.length;i++)if(!x[f[i]])x[f[i]]=new Function('var t=s_c_il['+t._in+
    '];t.wq[t.wq.length]={'+(o?'o:"'+o+'",':'')+'f:"'+f[i]+'",a:t.aa(arguments)}')};t.as=function(x){var y=[],i;for(i=1;i<x.length;i++)y[y.length]=x[i];return y};t.s=0;t.contextData={}
    t.retrieveLightData={};if(!w.s_giq)w.s_giq=[];t._gi=w.s_gi;w.s_gi=new Function('u','var t=s_c_il['+t._in+
        '],w=t.w,l=t._il,i,j,x,s;u=u.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=="s_c"||(j>0&&x=="s_l"))&&s.oun&&(s.oun==u||(s.fs&&s.sa&&s.fs(s.oun,u)))){'+
        'if(s.sa)s.sa(u);return s}}if(!t.oun){t.sa(u);return t}if(t._gi)return t._gi(u);s=new TagContainerLoader();s.tagContainerName="s_tca_"+w.s_giq.length;s.sa(u);w.s_giq[w.s_giq.length]=s;return s');t.sa=
        function(u){var t=this;if(t.s)t.s.sa(u);t.un=u;if(!t.oun)t.oun=u;else if(!t.fs(t.oun,u))t.oun+=','+u};t.tq=[];t.track=t.t=function(vo){var t=this,m;if(t.s)return t.s.t(vo);if(!vo)vo={};for(m in t){if(
        m!='un'||t.u!=t.un)vo[m]=t[m]}t.tq[t.tq.length]=vo;t.lnk=t.linkName=t.linkType='';return '';};t.trackLink=t.tl=function(o,u,n,vo){var t=this;if(t.s)return t.s.tl(o,u,v,vo);t.lnk=o;t.linkType=u
        t.linkName=n;return t.t(vo)};t.trackLight=function(p,ss,i,vo){var t=this;if(t.s)return t.s.trackLight(p,ss,i,vo);t.lightProfileID=p;t.lightStoreForSeconds=ss;t.lightIncrementBy=i;return t.t(vo)}
    t.lmq=[];t.loadModule=function(n,u,d){var t=this;if(t.s)return t.s.loadModule(n,u,d);t.lmq[t.lmq.length]={n:n,u:u,d:d};return 0};t.ml=[];t.mmq=[];t.mo=function(m,f){var t=this,i;t.ml[m]=t[m]={};if(f)
        for(i=0;i<f.length;i++)t[m][f[i]]=new Function('var t=s_c_il['+t._in+'];t.mmq[t.mmq.length]={m:"'+m+'",f:"'+f[i]+'",a:t.aa(arguments)}')};t.mo('Media',['open','play','stop','close','track']);t.mo(
        'Survey',['launch']);t.mci=[];t.mn=[];t.mc=function(n,m,p,k){var t=this,b,l=0;if(typeof(mboxFactoryDefault)=='undefined'||t.d.getElementById(m)==null)return;if(!mboxFactoryDefault.isEnabled()){
        clearInterval(t.mci[k]);t.mt(true);return}if(typeof(mboxFactoryDefault.get(t.mn[0],0))!='undefined')l=mboxFactoryDefault.get(t.mn[0],0).isShown();if(k==0||l){clearInterval(t.mci[k]);b=
        mboxFactoryDefault.create(n,p.split("&"));if(b)b.load()}};if(!w.mboxCreate&&!w.mboxDefine&&!w.mboxUpdate){w.mboxVersion='mini';if(!t.d.getElementById('mboxScriptContainer'))t.d.write(
        '<div id="mboxScriptContainer" style="display:none;visibility:hidden;"></div><style>.mboxDefault{visibility:hidden;}</style>');t.mt=function(f){var t=this,i,j,d;if(typeof(mboxFactoryDefault)==
        'undefined'||f){for(i in t.mci)clearInterval(t.mci[i]);d=(t.d.getElementsByClassName)?t.d.getElementsByClassName('mboxDefault'):t.d.getElementsByTagName('div');for(j in d)if(d[j].className==
        "mboxDefault")d[j].style.visibility="visible"}};t.mpi={};t.mp=function(x,m){var t=this;t.mpi[x]=setInterval(function(){if(typeof(mboxFactoryDefault)==='undefined')return;m();clearInterval(t.mpi[x])},
        13)};w.mboxCreate=function(n){var j=0,i,m,p,k;for(i in t.mn)if(t.mn[i]==n)j++;t.mn[t.mn.length]=n;m='mboxMarker-default-'+n+'-'+j;t.d.write('<div id="'+m+
        '" style="visibility:hidden;display:none">&nbsp;</div>');p=t.as(arguments).join("&");k=t.mci.length;t.mci[k]=setInterval(function(){t.mc(n,m,p,k);},5)};w.mboxDefine=function(d,n){var a=t.as(arguments)
        t.mp('define_'+n,function(){mboxFactoryDefault.create(n,a,d);})};w.mboxUpdate=function(n){var a=t.as(arguments),x;x='update_'+n;t.mpi[x]=setInterval(function(){if(typeof(mboxFactoryDefault)===
        'undefined'||typeof(mboxFactoryDefault.get(n))==='undefined')return;mboxFactoryDefault.update(n,a);clearInterval(t.mpi[x]);},13)};w.mboxLoadSCPlugin=function(s){(function(){if(typeof(
        mboxFactoryDefault)==='undefined'||typeof(mboxExternalLoadSCPlugin)==='undefined'||(s._c=='s_l'&&!s.s)){setTimeout(arguments.callee,19);return}if(s._c=='s_l')s=s.s;mboxExternalLoadSCPlugin(s)})()};}}