var sProductValue;
function omnitureTrackPageView(params)
{
    if (window.AccountName !== undefined && window.s.pageName !== undefined) {
        s.prop1 = params;
        if (jQuery.adblock !== undefined && jQuery.adblock === true)
            s.events = "prodView,event81";
        else
            s.events = "prodView";

        if (sProductValue !== undefined)
            s.products = sProductValue;
        var s_code = s.t(); if (s_code) document.write(s_code);
    }
}

function omnitureTrackLoadTime() {
    if (window.performance && window.performance.timing) {
        var nowTime = new Date().getTime();
        var perfData = window.performance.timing;
        var pageLoadTime = nowTime - perfData.navigationStart;
        if (pageLoadTime) {
            pageLoadTime = (pageLoadTime / 1000.0).toFixed(2);
            if (pageLoadTime < 1 || pageLoadTime > 30) {
                    pageLoadTime = 30;
            }
            s.eVar62 = pageLoadTime;
            s.prop62 = "D=v62";
            s.events = s.apl(s.events, 'event21=' + pageLoadTime, ',', 1);
        }
    }
}

function omnitureTrackInner(linkTrkName, params) {
    if (window.AccountName !== undefined && window.s.pageName !== undefined) {
        if (sProductValue === undefined && s.products !== undefined)
            sProductValue = s.products;     
        s.linkLeaveQueryString = true;
        var custom_call_type = 'o';
        var linkTrkDetail = linkTrkName;

        if (s.pageName == null || s.pageName == '') {
            s.pageName = 'Home';
        }

        if (linkTrkName == "oStep1") {
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar41,eVar42,eVar43,eVar60,events,channel';
            s.linkTrackEvents = 'event1';
            s.events = 'event1';
            s.eVar41 = s.pageName;
            linkTrkName = "Step 1 Submit";
        }
        else if (linkTrkName == "oNewsletter") {
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar26,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
            s.linkTrackEvents = 'event38';
            s.events = 'event38';
        }
        else if (linkTrkName == "oSearch") {
        s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar26,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar49,eVar60,events,channel';
            s.linkTrackEvents = 'event20';
            s.eVar26 = "Articles";
            s.eVar49 = params.search;
            s.events = 'event20';
        }
        else if (linkTrkName == 'oContactSeller') {
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
            s.linkTrackEvents = 'event17';
            s.events = 'event17';
        }
        else if (linkTrkName == 'oContactSellerCarsCom') {
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
            s.linkTrackEvents = 'event18';
            s.events = 'event18';
        }
        else if (linkTrkName == "oSearchClick") {
            var strUrl = window.location;
            var hostname_regex1 = new RegExp("(/.*?/sch/01[^?]+).*");
            var hostname_regex2 = new RegExp("(/.*?/sch/02[^?]+).*");
            var hostname_regex3 = new RegExp("(/.*?/search[^?]+).*");
            var hostname_regex;

            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar26,eVar27,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
            s.linkTrackEvents = 'event22';
            s.eVar27 = params.searchIndex;
            s.events = 'event22';
            s.eVar26 = "Articles";

            if (hostname_regex1.test(strUrl))
                s.eVar26 = "All Results";

            //Automotive.com Search Option
            if (hostname_regex3.test(strUrl)) {
                s.eVar26 = "All Results";

                hostname_regex = new RegExp('[\\?&]f=articles');
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Articles";

                hostname_regex = new RegExp('[\\?&]f=photos');
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Photos";

                hostname_regex = new RegExp('[\\?&]f=videos');
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Videos";

                hostname_regex = new RegExp('[\\?&]f=news');
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "News";

                hostname_regex = new RegExp('[\\?&]f=forums');
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Forums";

                hostname_regex = new RegExp('[\\?&]f=recent');
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Recent";
            }
            if (hostname_regex2.test(strUrl)) {
                hostname_regex = new RegExp("(/.*?/articles[^?]+).*")
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Articles";

                hostname_regex = new RegExp("(/.*?/photos[^?]+).*")
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Photos";

                hostname_regex = new RegExp("(/.*?/videos[^?]+).*")
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Videos";

                hostname_regex = new RegExp("(/.*?/blogs[^?]+).*")
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Blogs";

                hostname_regex = new RegExp("(/.*?/forums[^?]+).*")
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Forums";

                hostname_regex = new RegExp("(/.*?/rumors[^?]+).*")
                if (hostname_regex.test(strUrl))
                    s.eVar26 = "Rumors";
            }
        }
        else if (linkTrkName == "oAdView") {
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
            s.linkTrackEvents = 'event25';
            s.events = 'event25';
        }
        else if (linkTrkName == "oAdRefresh") {
            omnitureTrackPageView(document.location.href);
            return;
            /*s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar28,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel,products,prop32,prop49';
            s.linkTrackEvents = 'prodView';
            s.events = 'prodView';
            s.products = sProductValue;
            s.prop49 = GenerateProp49();
            s.prop32 = linkTrkName;
            s.eVar28 = linkTrkName;*/
        }
        else if (linkTrkName == "oContentRefresh") {
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar28,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel,products,prop32,prop49';
            s.linkTrackEvents = 'prodView';
            s.events = 'prodView';
            s.products = sProductValue;
            s.prop49 = GenerateProp49();
            s.prop32 = "D=v28";
            s.eVar28 = linkTrkName;
        }
        else if (linkTrkName == "oExitLink") {
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,prop43,prop33,events,channel';
            s.linkTrackEvents = 'event23';
            s.prop43 = params.href;
            s.events = 'event23';
            s.prop33 = window.s.pageName;
            linkTrkName = params.href;
            custom_call_type = 'e';
        }
        else if (linkTrkName == "oFollow") {
            var socialType_arr = params.split('|');
            var socialType = params;
            if (socialType_arr != null && socialType_arr.length > 0)
                socialType = socialType_arr[0];
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar29,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
            s.linkTrackEvents = 'event34';
            s.eVar29 = socialType;
            s.events = 'event34';
        }
        else if (linkTrkName == "oShare") {
            var socialType_arr = params.split('|');
            var socialType = params;
            if (socialType_arr != null && socialType_arr.length > 0)
                socialType = socialType_arr[0];
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar29,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
            s.linkTrackEvents = 'event33';
            s.eVar29 = socialType;
            s.events = 'event33';
        }
        else if (linkTrkName.indexOf("Subscription") != -1) {
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar28,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,prop32,prop33,prop60,events,channel';
            s.linkTrackEvents = 'event19,event24';
            s.prop33 = window.s.pageName;
            s.prop32 = "D=v28";
            s.prop60 = "D=v60";
            s.eVar28 = linkTrkName;
            s.events = 'event19,event24';        
        }
        else {
            linkTrkName = linkTrkName.replace("[OmniturePageName]", window.s.pageName);
            s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar28,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,prop32,prop33,prop60,events,channel';
            s.linkTrackEvents = 'event24';
            s.prop33 = window.s.pageName;
            s.prop32 = "D=v28";
            s.prop60 = "D=v60";
            s.eVar28 = linkTrkName;
            s.events = 'event24';
            
        }

        s.eVar1 = "D=pageName";
        s.eVar42 = "D=ch";
        s.eVar43 = "D=g";
        
        if (typeof s_code_assigned == "undefined")
            return;
        else if (!s_code_assigned)
            return;

        console.log("s_code_assigned : " + s_code_assigned + ", linkTrkName: " + linkTrkName);
        s.tl(this, custom_call_type, linkTrkName);
    }
}



function omnitureTrack(nodeClicked) {
    var linkTrkName = nodeClicked.attr('data-sobjectid');
    if (typeof linkTrkName !== 'undefined' && linkTrkName !== '') {        
        omnitureTrackInner(linkTrkName);
    }
    else {
        linkTrkName = nodeClicked.attr('data-s-object-id');
        if (typeof linkTrkName !== 'undefined' && linkTrkName !== '') {
            omnitureTrackInner(linkTrkName);
        }
    }
    
};


(function() {

    jQuery(function() {
        if (!window.omnitureTrackDefined)
            window.omnitureTrackDefined = true;

        if (window.AccountName !== undefined) {
            sProductValue = s.products;            
        }

        //Track SObject ID
        jQuery('body').on('click', '[data-sobjectid]', function(e) {
            omnitureTrack(jQuery(this));
        });

        jQuery('body').on('click', '[data-s-object-id]', function(e) {
            omnitureTrack(jQuery(this));
        });
        
        // for portfolio section click
        jQuery('#filters a').click(function(e){
          var linkTrkName = jQuery(this).attr('data-s-object-id');
          omnitureTrackInner(linkTrkName);
        });
        
        jQuery('.social_icon_big_email').on('click', function(e) {
            omnitureTrackInner('Corp:Footer:Email');
        });
        
        //Track Social Module
        jQuery('body').on('click', '#fb_social_link', function(e) {
                    omnitureTrackInner('oFollow','Facebook|mouseover|blur');
        });
        
        //Track Social Module
        jQuery('body').on('click', '#in_social_link', function(e) {
            omnitureTrackInner('oFollow','LinkedIn|mouseover|blur');
        });

        //Track Exit Links
        jQuery('body').on("click", 'a', function(e) {
            var host_arr = location.host.split(".");
            var base_host = host_arr[host_arr.length - 2] + "." + host_arr[host_arr.length - 1];
            var hostname_regex = new RegExp("^http[s]?://[.a-zA-Z0-9]+" + base_host);
            var url = jQuery(this).attr("href");
            if (url != null && url.length > 1) {
                if (!hostname_regex.test(url) && (url.substr(0, 7) == "http://" || url.substr(0, 8) == "https://")) {
                    //console.log("External Link");
                    omnitureTrackInner('oExitLink', { "href": url });
                }
            }
        });

        //Track Index of Link clicked in search results
        jQuery('body').on('click', '[data-index]', function(e) {
            var searchIndex = jQuery(this).attr('data-index');
            if (typeof searchIndex !== 'undefined' && searchIndex !== '') {
                omnitureTrackInner('oSearchClick', { "searchIndex": searchIndex });
            }
        });
        
        //Track Ad Clicks
        var adClickable = false;
        jQuery('body').on('mouseover', '.dart_ad', function(e) {
            //console.log("Mouse Over");
            adClickable = true;
        });

        jQuery('body').on('mouseout', '.dart_ad', function(e) {
            //console.log("Mouse Out");
            adClickable = false;
        });
        jQuery(window).blur(function() {
            if (adClickable) {
                //console.log("Ad Clicked");
                omnitureTrackInner('oAdView');
                adClickable = false;
            }
        });
    });
})();

function oTrackCommentAdded() {
    if (window.AccountName !== undefined) {
        s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
        s.linkTrackEvents = 'event16';
        s.events = 'event16';
        s.eVar1 = "D=pageName";
        s.eVar42 = "D=ch";
        s.eVar43 = "D=g";
        s.tl(this, 'o', 'Comment Posted');
    }
}

function oTrackSiteSpecificEvents(linkRel) {
    if (linkRel === "subscribe" && window.AccountName !== undefined) {
        s.linkTrackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar60,events,channel';
        s.linkTrackEvents = 'event19';
        s.events = 'event19';
        s.eVar1 = "D=pageName";
        s.eVar42 = "D=ch";
        s.eVar43 = "D=g";
        s.tl(this, 'o', "Subscription");
    }
}

function pad(num) {
    return ("0" + num).slice(-2);
}

function GenerateProp49() {
    var d = new Date();
    var num = Math.floor(Math.random() * 900000) + 100000;
    var random_num = d.getUTCFullYear() + 
            pad(d.getUTCMonth() + 1) + 
            pad(d.getUTCDate()) + 
           pad(d.getUTCHours()) +
            pad(d.getUTCMinutes()) +
            pad(d.getUTCSeconds()) +
            d.getMilliseconds() + num;
    random_num = random_num.substr(0, 20);

    //console.log(random_num);

    return random_num;
}

function omnitureVideoTrack(linkTrkName, params) {
    if (window.AccountName !== undefined && window.s.pageName !== undefined) {
        s.linkLeaveQueryString = true;
        var custom_call_type = 'o';

        if (typeof s_code_assigned == "undefined")
            return;
        else if (!s_code_assigned)
            return;

        if (s.pageName == null || s.pageName == '') {
            s.pageName = 'Home';
        }
        //console.log(linkTrkName + " -- " + params.title + " -- " + params.type + " -- " + params.playTime);
        if (linkTrkName == "oVideoType") {
            s.Media.trackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar51,eVar52,eVar53,eVar60,prop51,events,channel';
            s.prop51 = "D=v51";
            s.eVar51 = params.title;
            s.eVar52 = params.playTime;
            s.eVar53 = params.type;
            s.eVar1 = "D=pageName";
            s.eVar42 = "D=ch";
            s.eVar43 = "D=g";
            s.Media.trackEvents = 'event27';
            //s.events = 'event27';
            //linkTrkDetail = "VideoStart: ContentType: " + params.type;
            s.Media.open(params.title, Math.floor(params.playTime), "Ooyala");
            s.Media.play(params.title, 1);
        }
        else if (linkTrkName == "oVideoCompletes") {
            s.Media.trackVars = 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6,eVar10,eVar11,eVar12,eVar17,eVar24,eVar30,eVar31,eVar32,eVar33,eVar39,eVar42,eVar43,eVar51,eVar52,eVar53,eVar60,prop51,events,channel';
            s.prop51 = "D=v51";
            s.eVar51 = params.title;
            s.eVar52 = params.playTime;
            s.eVar53 = params.type;
            s.eVar1 = "D=pageName";
            s.eVar42 = "D=ch";
            s.eVar43 = "D=g";
            s.Media.trackEvents = 'event28,event26';
            //s.events = 'event28,event26';
            //linkTrkDetail = "VideoComplete: MainVideo";
            s.Media.complete(params.title, Math.floor(params.playTime));
            s.Media.close(params.title);
        }        
    }
}