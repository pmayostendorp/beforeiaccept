/**
 * NFL Club Sites Library
 *
 * @filename nflcs-lib.js
 */
/* Globals */
var nflJsLibPath = nflcsAssetPath + 'nfl-assets/js/';

/**
 * Features initialized by selectors
 *
 * @param selector String element, class, ID, or namespace
 * @param dependencies Array JavaScript path relative to nflJsLibPath (/nfl-assets/js)
 * @param init Function initializes feature by selector
 */
$nflcs.FeaturesList = {
    "ads": {
        selector: "nflcs\\:ad",
        bindType: "live",
        init: function(elem) {
            $nflcs.ad.load(elem);
        }
    },
    "dropDownNavigation": {
        selector: "#main-nav",
        dependencies: new Array(nflJsLibPath + '001-navigation-suckerfish.js'),
        init: function() {}
    },
        "ribbonNavigation": {
        selector: "#main-nav-ribbon" ,
        dependencies: new Array(nflJsLibPath + 'jquery.easing.1.3.js', nflJsLibPath + '001-navigation-ribbon.js') ,
        init: function(elem){
            nflcs.gbl.mod.GlobalNavigation.ribbonNav.load($nflcs(elem).data("options"));
        }
    },
    "article": {
        selector: ".article",
        dependencies: new Array(nflJsLibPath + '002-article.js'),
        init: function() {}
    },
    "contentTools": {
        selector: ".content-tools",
        dependencies: new Array(nflJsLibPath + 'jquery.form.min.js', nflJsLibPath + '003-content-tools.js'),
        init: function() {
            nflcs.gbl.mod.ContentTools.load();
        }
    },
    "socialButtons": {
        selector: ".social-buttons",
        dependencies: new Array(nflJsLibPath + 'social-buttons.js'),
        init: function(elem) {
            $nflcs(elem).socialButtons({
                style:'popup'
            });
        }
    },
    "countdownClockHTML": {
           selector: ".count-down-clock",
           dependencies: new Array(nflJsLibPath + 'jquery.jcountdown.js', nflJsLibPath + 'count-down-html.js'),
            init: function(elem) {
                $nflcs.countdownClockHTML.load(elem);
            }
     },
    "transactions": {
        selector: ".transactions",
        dependencies: new Array(nflJsLibPath + 'jquery.form.min.js', nflJsLibPath + 'jquery.tablesorter.min.js', nflJsLibPath + 'jquery.tablesorter.pager.min.js', nflJsLibPath + '004-transactions.js'),
        init: function() {
            nflcs.gbl.mod.Transactions.load();
        }
    },
    "siteAlert": {
        selector: ".site-alert",
        dependencies: new Array(nflJsLibPath + '007-site-alert.js'),
        init: function(elem) {
            $nflcs.siteAlert.load(elem);
        }
    },
    "polls": {
        selector: ".polls",
        dependencies: new Array(nflJsLibPath + 'jquery.form.min.js', nflJsLibPath + 'jquery.cookie.min.js', nflJsLibPath + '013-polls.js'),
        init: function() {
            nflcs.gbl.mod.Polls.load();
        }
    },
    "standings": {
        selector: ".standings",
        dependencies: new Array(nflJsLibPath + 'jquery.form.min.js', nflJsLibPath + 'jquery.tablesorter.min.js', nflJsLibPath + '014-standings.js'),
        init: function() {
            nflcs.gbl.mod.Standings.load();
        }
    },
    "schedule": {
        selector: ".schedule",
        dependencies: new Array(nflJsLibPath + 'jquery.form.min.js', nflJsLibPath + '016-schedule.js'),
        init: function() {
            nflcs.gbl.mod.Schedule.load();
        }
    },
    "scheduleSmall" : {
        selector: ".rotating-schedule",
        dependencies: new Array(nflJsLibPath + 'handlebars.js', nflJsLibPath + 'small-schedule.js', nflJsLibPath + 'hammer.js', nflJsLibPath + 'nfl-moment.min.js'),
        init: function(elem){
            var Hammer = require(nflJsLibPath + 'hammer.js');

            $nflcs.smallSchedule.init(elem, Hammer);
        }
    },
    "scheduleList": {
           selector: ".schedule-list",
           dependencies: new Array(nflJsLibPath + 'jquery.tools.min.js', nflJsLibPath + 'handlebars.js', nflJsLibPath + 'jquery.tooltipster.min.js', nflJsLibPath + 'schedule-list.js'),
           init: function(elem) {
               $nflcs.scheduleList.init(elem);
           }
       },
    "contentListCarousel": {
        selector: ".content-list-carousel",
        dependencies: new Array(nflJsLibPath + 'jquery.tools.min.js', nflJsLibPath + '018-scrollable.js'),
        init: function(elem) {
            nflcs.mod.Scrollable.load(elem);
        }
    },
    "scrollable": {
        selector: ".scroll-view",
        dependencies: new Array(nflJsLibPath + 'jquery.tools.min.js'),
        init: function(elem) {
            $nflcs.scrollable.load(elem);
        }
    },
    "fullWidthGallery": {
        selector: ".module.full-width-gallery",
        dependencies: new Array(nflJsLibPath + '022-photo-gallery-full-width.js', nflJsLibPath + 'jquery.ba-bbq.min.js', nflJsLibPath + 'handlebars.js', nflJsLibPath + 'jquery.cookie.min.js', nflJsLibPath + 'jquery.writeCapture.js'),
        init: function(elem) {
            $nflcs(elem).photoGallery();
            $nflcs(elem).data("photoGallery").load(elem);
            $nflcs(elem).data("photoGallery").ad.load(elem);
            $nflcs(elem).data("photoGallery").tracking.load(elem);
            $nflcs(elem).data("photoGallery").thumbnails.load(elem);
            $nflcs(elem).data("photoGallery").prefetch.load(elem);
            $nflcs(elem).data("photoGallery").grid.load(elem);
            $nflcs(elem).data("photoGallery").endFrame.load(elem);
            $nflcs(elem).data("photoGallery").related.load(elem);
            if (Modernizr.touch) {
                $nflcs(elem).data("photoGallery").mobile.load(elem);
            }
        }
    },
    "teamStats": {
        selector: ".team-stats",
        dependencies: new Array(nflJsLibPath + 'jquery.form.min.js', nflJsLibPath + '035-team-stats.js'),
        init: function() {
            nflcs.gbl.mod.TeamStats.load();
        }
    },
    "classicSiteSearch": {
        selector: ".classic-site-search",
        init: function(elem) {
            $nflcs.classicSiteSearch.load(elem);
        }
    },
    "searchAutocomplete": {
        selector: ".search-autocomplete",
        dependencies: new Array(nflJsLibPath + '038-ramp-search-autocomplete.js'),
        init: function(elem) {
            $nflcs.searchAutocomplete.load(elem);
        }
    },
    "centerpiece": {
        selector: "nflcs\\:centerpiece",
        dependencies: new Array(nflJsLibPath + 'jquery.slides.js', nflJsLibPath + '041-centerpiece.js'),
        init: function(elem) {
            $nflcs.centerpiece.load(elem);
        }
    },
    "liveEventContent": {
        selector: ".events-calendar-live-expanded",
        dependencies: new Array(nflJsLibPath + '062-live-events.js'),
        init: function(elem) {
            $nflcs.liveEventContent.load(elem);
        }
    },
    "eventsCalendarLiveCollapsed": {
        selector: ".module.events-calendar-live-collapsed",
        dependencies: new Array(nflJsLibPath + '062-live-events.js'),
        init: function(elem) {
            $nflcs.eventsCalendarLiveCollapsed.load(elem);
        }
    },
    "bio": {
        selector: ".player-bio.toggle",
        dependencies: new Array(nflJsLibPath + '105-bio.js'),
        init: function() {
            nflcs.gbl.mod.Bio.load();
        }
    },
//  Removing for now until we can do Single Request Architecture first and then dynamic loading of ads
//    "SRAads": {
//        selector: "nflcs\\:ad",
//        init: function(elem) {
//            $nflcs(elem).data("SRA", true);
//            $nflcs.ad.load(elem);
//        }
//    },
    "adBlocker": {
        selector: '.gbl-wrp-1',
        dependencies: new Array(nflJsLibPath + 'detect-blocked-ads.js', nflJsLibPath + 'jquery.cookie.min.js'),
        init: function() {
            $nflcs.detectBlockedAds();
        }
    },

    "comments":{
        selector: "nflcs\\:comments",
        dependencies: [nflJsLibPath + 'jquery.writeCapture.js', nflJsLibPath + 'comments.js'],
        init: function(elem) {
            $nflcs.comments.load(elem);
        }
    },
    "jquery-ui-select":{
        selector: ".audio-video-extended select, .av-browser select, select.custom-selectmenu",
        dependencies: [nflJsLibPath + 'jquery.ui.core.widget.position.selectmenu.js'],
        init: function(elem) {
            $nflcs(elem).selectmenu();
        }
    },
    "avPlayer": {
        selector: "nflcs\\:avplayer",
        dependencies: [nflcomCombinatorAVP, nflJsLibPath + 'av-player.js'],
        init: function(elem) {
            $nflcs.avPlayer.init(elem);
        }
    },
    "avGalleryTabs": {
        selector: ".audio-video-extended .tabs",
        dependencies: [nflJsLibPath + 'jquery.ui.core.widget.tabs.min.js', nflJsLibPath + '025-av-gallery-extended.js'],
        init: function(elem){
            $nflcs.avGalleryTabs.load(elem);
        }
    },
    "avGallery": {
        selector: ".av-gallery.avPlayer",
        dependencies: [nflcsAssetPath+'nfl-assets/js/jquery.jcarousel.min.js',
            nflcsAssetPath+'nfl-assets/js/025-av-gallery.js'],
        init: function(elem){
            $nflcs.avGallery.load(elem);
        }
    },
    "avGalleryExtended": {
        selector: ".audio-video-extended",
        dependencies: [nflJsLibPath + 'jquery.writeCapture.js', nflJsLibPath + 'jquery.ui.core.widget.tabs.min.js', nflJsLibPath + 'jquery.address.min.js', nflJsLibPath + 'jquery.cookie.min.js', nflJsLibPath + 'handlebars.js', nflJsLibPath + '025-av-gallery-extended.js'],
        init: function(elem){
            $nflcs.avGalleryExtended.load(elem);
        }
    },
    "avGalleryBrowserExtended": {
        selector: ".av-browser",
        dependencies: [nflJsLibPath + 'handlebars.js', nflJsLibPath + '050-av-gallery-browser-extended.js'],
        init: function(elem){
            $nflcs(elem).avGalleryBrowserExtended();
        }
    },
    "avPopOut": {
        selector: ".audio-video-pop-out",
        dependencies: [nflJsLibPath + '025-av-pop-out.js'],
        init: function(elem){
            $nflcs(elem).avPopOut();
        }
    },
    "breadcrumbs": {
        selector: ".module.breadcrumb",
        dependencies: new Array(nflJsLibPath + 'breadcrumbs.js'),
        init: function(elem) {
            $nflcs.breadcrumbs.load(elem);
        }
    },
    "videoTakeover": {
        selector: "nflcs\\:videotakeover",
        dependencies: new Array(nflJsLibPath + 'jquery.cookie.min.js', nflJsLibPath + 'jquery.tools.min.js', nflcomCombinatorAVP, nflJsLibPath + 'av-player.js', nflJsLibPath + 'video-takeover.js'),
        init: function(elem) {
            $nflcs(elem).videoTakeover();
        }
    },
    "pluckApps": {
        selector: ".pluck-tag",
        dependencies: new Array(nflJsLibPath + 'pluck-apps.js'),
        init: function(elem) {
            $nflcs(elem).pluckApps();
        }
    },
    "twitter": {
        selector: ".module.twitter",
        dependencies: new Array(nflJsLibPath + 'twitter.js',nflJsLibPath + 'handlebars.js'),
        init: function(elem) {
            if(typeof(twitterInstances) == 'undefined') var twitterInstances=[];
            twitterInstances[twitterInstances.length] = new $nflcs.twitter(elem);
        }
    },
    "geoInterstitial": {
        selector: ".geo-interstitial",
        dependencies: new Array(nflJsLibPath + 'jquery.cookie.min.js', nflJsLibPath + 'jqModal.js', nflJsLibPath + 'geo-interstitial.js'),
        init: function(elem) {
            if (!isSplashPage) {
                $nflcs.geoInterstitialInstance = new $nflcs.geoInterstitial(elem);
            }
        }
    },
    "gameStatusStrip": {
           selector: ".game-status.strip",
           dependencies: new Array(nflJsLibPath + 'handlebars.js', nflJsLibPath + 'game-status-strip.js'),
           init: function(elem) {
                   $nflcs.gameStatusStrip.init(elem);
           }
    },
    "gamecenter": {
           selector: "nflcs\\:gamecenter",
           dependencies: new Array(nflJsLibPath + 'gamecenter.js'),
           init: function(elem) {
                   $nflcs.gamecenter.init(elem);
           }
    },
    "embeddablePhotoGallery":{
        selector: "nflcs\\:photogallery",
        dependencies: new Array(nflJsLibPath + 'jquery.tools.min.js', nflJsLibPath + '022-photo-gallery-embeddable.js'),
        init: function(elem) {
            $nflcs(elem).embeddablePhotoGallery();
        }
    },
    "drafttracker": {
        selector: ".draft-view",
        dependencies: new Array( nflJsLibPath + 'drafttracker.js'),
        init: function (el) {
            nflcs.gbl.mod.drafttracker.load(el, nflJsLibPath);
        }
    },
    "standingsmultiple": {
        selector: ".module.standings-multiple",
        dependencies: new Array( nflJsLibPath + 'standings-multiple.js',nflJsLibPath + 'handlebars.js', nflJsLibPath + 'jquery.tablesorter.min.js'),
        init: function (el) {
            nflcs.gbl.mod.standingsmultiple.load(el);
        }
    }
};

/**
 * API library for interaction with global use of Facebook "apps".
 *
 * @filename nfl-fbapps-api.js
 */
$nflcs.FbAppsApi = {
    init: function(fbAppid) {
        var $fbRoot = $nflcs('#fb-root');
        if ($fbRoot.length < 1) {
            $nflcs('body').append($nflcs('<div id="fb-root"></div>'));
            window.fbAsyncInit = function() {
                FB.init({appId: fbAppid, status: true, cookie: true, xfbml: true});
            };
        }
    }
};

$nflcs.Utility = {
    /**
     * Function to return a clean URL for a media page that uses Ajax to navigate from clip to clip
     *
     * @param startUrl String
     * @return sUrl String
     */
    dynamicPageUrl: function (startUrl, secondary) {
        var sUrl = startUrl;
        if (!this.isArticlePage()) {
            var aTemp = startUrl.split('/');
//            if ($nflcs(".video-browser").length > 0) {
//                sUrl = aTemp[0] + "/" + aTemp[1] + "/" + aTemp[2] + "/" + aTemp[3]
//                    + '/videos'
//                    + '/' + $nflcs.Utility.getMediaName()
//                    + '/' + nflcs.gbl.AVGalleryBrowser.load.curClip;
//            }
//            else if ($nflcs(".audio-browser").length > 0) {
//                sUrl = aTemp[0] + "/" + aTemp[1] + "/" + aTemp[2] + "/" + aTemp[3]
//                    + '/audio'
//                    + '/' + $nflcs.Utility.getMediaName()
//                    + '/' + nflcs.gbl.AVGalleryBrowser.load.curClip;
//            }
//            else if (nflcs.gbl.AVGalleryBrowser.load.curClip) {
//                aTemp = sUrl.split('/');
//                aTemp.pop();
//                sUrl = aTemp.join('/');
//                sUrl = sUrl
//                    + '/' + $nflcs.Utility.getMediaName()
//                    + '/' + nflcs.gbl.AVGalleryBrowser.load.curClip;
//            }
            if ($nflcs(".audio-video-extended")) {
                if($nflcs(".audio-video-extended").find(".channel-carousel a.current").length){
                    sUrl = aTemp[0] + "/" + aTemp[1] + "/" + aTemp[2]
                        + $nflcs(".audio-video-extended").find(".channel-carousel a.current").attr("href");
                }
                else{
                    sUrl = sUrl.split("#")[0];
                }
            }
            else if ($nflcs('#rosterYear').length) {
                sUrl = sUrl.split('?')[0] + '?' + $nflcs.param({
                    'year' : $nflcs('#rosterYear').val()
                });
            }
            else if ($nflcs('#seasonSelectYear').length && $nflcs('#seasonSelectSeasonType').length) {
                sUrl = sUrl.split('?')[0] + '?' + $nflcs.param({
                    'year' : $nflcs('#seasonSelectYear').val(),
                    'season' : $nflcs('#seasonSelectSeasonType').val()
                });
            }
            else if ($nflcs('.content-list .year-fieldset #year').length && $nflcs('.content-list .year-fieldset #month').length) {
                sUrl = sUrl.split('?')[0] + '?' + $nflcs.param({
                    'year' : $nflcs('.content-list .year-fieldset #year').val(),
                    'month' : $nflcs('.content-list .year-fieldset #month').val()
                });
            }
            else if ($nflcs('.transactions select').length) {
                sUrl = sUrl.split('?')[0] + '?' + $nflcs.param({
                    'year' : $nflcs('.transactions select').val()
                });
            }
        }
        return sUrl;
    },
    /**
     * Function that checks if the current page is an article page
     *
     * @return isIt boolean
     */
    isArticlePage: function() {
        var isIt = false;
        if (typeof(nflcs.gbl.ArticleLoaded) != "undefined") {
            isIt = nflcs.gbl.ArticleLoaded;
        }
        return isIt;
    },
    /**
     * Function that loads a CSS file into the head tag.
     *
     * @param url String URL if CSS file to load.
     */
    loadCss: function(url) {
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        document.getElementsByTagName("head")[0].appendChild(link);
    },

    /***
     * getRandomNumber();
     *
     * returns: returns a unique numeric identifier that is randomly generated
     */
    getRandomNumber : function() {
        return Math.floor(Math.random() * 10000000);
    },

    /**
     * Inputs date of format 03/23/2012 10:15:00 or similar
     * Converts date to microformat, then inputs date into prettyDate,
     * which returns date text if less than 24 hours otherwise returns undefined,
     * if undefined, then return actual date of format Mar 23, 2012
     *
     * @param date
     * @return String
     */
    timeAgo: function(date,dateFormatType) {
        if(typeof(dateFormatType) == 'undefined') var dateFormatType = 'mediumDate';
        var isoDate = dateFormat(date, 'isoDateTime');
        var dateStr = prettyDate(isoDate);

        return (dateStr != undefined ? dateStr : dateFormat(date, dateFormatType));
    },

    getIndicesOf: function(searchStr, str) {
        var startIndex = 0, searchStrLen = searchStr.length;
        var index, indices = [];
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    },

    getGalleryRoot: function() {
        var indices = $nflcs.Utility.getIndicesOf("/", window.location.href);
        if(!(indices[4])){ //gallery not being accessed through a full seo friendly URL
            return "";
        }
        else{ //browser supports pushState
            return window.location.href.substring(indices[2],indices[4]) + "/";
        }
    },

    sanitizeTitle: function(title) {
        return title.replace(/[^a-z0-9\s]/gi, '').replace(/ +/g,"_");//.toLowerCase();
    }
};

/**
 * @class Ad
 * @description Handles all advertising related functionality
 */
$nflcs.ad = {

    collapseEmptyDivs : false,

    load : function(context) {
        var myData = $nflcs(context).data();
        var thisUrl = "";
        var thisAd = "";
        //$nflcs(context).addClass("ad-" + myData.slot);
        if(!myData.slot) myData.slot = "";
        //slot is no longer used. check for class="ad-companion"
        if(!$nflcs(context).hasClass("ad-companion")){
            this.makeAd(context);
        }
    },


    loadCompanion : function(context){
         this.makeAd(context);
    },

    /**
     * @class vendor
     * @description class that contains all the supported vendor classes for advertising.
     */
    vendor : {
        /**
         * @class dart
         * @description class for Doubleclick Specific advertising calls.
         */
        dart : {

            /**
             * @property adTrack
             * @description tracker for ord value per AD so that if the same ad gets reloaded a new ORD value will be applied.
             * @type Array
             */
            adTrack : new Array(),
            /**
             * @property tileTrack
             * @description Tracks the current tile being used. Max limit by Doubleclick is 16
             * @type Integer
             */
            tileTrack : 0,
            /**
             * @function getUpdatedOrdAndTile()
             * @description Figures out which ord={value} and tile={value} to use for the current ad.
             * @param src
             * @param data
             * @param context
             * @returns object with ord and tile integer values to use with the ad call.
             */
            getUpdatedOrdAndTile: function(src, data, context){
                var hashkey = src + "|" + data.id;
                var results = {ord: ((data.ord)? data.ord : window.jsRand), tile: ""};
                var context$ = $nflcs(context);

                if(typeof context$.data("tile") != "undefined"){
                    results.tile = context$.data("tile");
                    return results;
                }

                results.tile = $nflcs.inArray(hashkey, $nflcs.ad.vendor.dart.adTrack);

                if(results.tile != -1){
                    //if hashkey exists in array
                    results.ord = $nflcs.Utility.getRandomNumber();
                    results.tile++; //inArray is 0-based :(
                }else{
                    //hashkey doesn't exist in array
                    results.tile = $nflcs.ad.vendor.dart.adTrack.push(hashkey);
                }

                $nflcs.log(hashkey);

                return results;
            },

            /**
             * @function getAd()
             * @param opts : data object that contains all the supported parameters used by this function.
             * @description  Creates the Doubleclick specific ad call.
             * @returns String
             */
            getAd : function(opts){
                var params = {
                  context : null,
                  data : null
                };

                //combine parameters
                $nflcs.extend(true, params, opts);

                //local variables
                var fullpath = $nflcs.ad.getPathFromUrl(),
                    path = "",
                    zones = "";

                //set the last entry to index if it's empty or _
                if(fullpath[fullpath.length-1].replace("_","") == "") fullpath[fullpath.length-1] = "index";

                //the path part of the ad only incorporates the first two parts of the URL

                if(fullpath.length > 1){
                    path = '';
                    if(fullpath.length > 5) maxPaths = 5;
                    else maxPaths = fullpath.length;
                    for(i=0;i<maxPaths;i++)
                    {
                        path = path  + fullpath[i].replace(/[^a-z0-9]/gi, '_') + "/";
                    }
                }else{
                    path = fullpath[0].replace(/[^a-z0-9]/gi, '_');
                }
                //build the s1...sn portion of the DBLCLICK query
                if(params.data.zoneOverride && $nflcs(params.data.zoneOverride).children.length > 0){
                    for(zone in params.data.zoneOverride){
                        if(params.data.zoneOverride.hasOwnProperty(zone)){
                            zones += ";" + zone + "=" + params.data.zoneOverride[zone];
                        }

                    }
                }else{
                    for(var i=0;i<fullpath.length;i++){
                        zones += ";s" + (i+1) + "=" + fullpath[i].replace(/[^a-z0-9]/gi, '_');
                    }
                }

                //set the supported sizes. If data object doesn't include a sizes variable use the width and height object instead.
                var sizes = (params.data.sizes && ($nflcs(params.data.sizes).children.length > 0))? params.data.sizes : (params.data.width + "x" + params.data.height);

                //extract parameter elements from the nflcs:ad tag if any exist and associate with data object
                $nflcs.ad.getParams(params.context, params.data);
                var paramStr = "";
                //get any custom params associated with this advertisement
                for(var k in params.data.params){
                    if (params.data.params.hasOwnProperty(k)){
                        paramStr += ";" + k + "=" + params.data.params[k];
                    }
                }

                //if query attribute exists add it to the parameters
                if(params.data.query && params.data.query.length > 0) paramStr = params.data.query + paramStr;
                //if customparams have been speicified make sure to include them

                if(params.data.customparams && params.data.customparams.length > 0){
                    paramStr += ";" + params.data.customparams;
                    //PVT ID: 33425137
                    if(paramStr.indexOf("sz") > 0){
                        //TODO: convert this to a regex pattern match
                        var tmp = paramStr.split(";");
                        for(i=0;i<tmp.length;i++){
                            if(tmp[i].indexOf("sz") >= 0){
                                sizes = tmp[i].replace("sz=","");
                                //remove it from paramStr and remove any double ;;
                                paramStr = paramStr.replace(tmp[i], '').replace(';;', ';');
                                if(paramStr.lastIndexOf(";") == (paramStr.length -1))
                                {
                                    paramStr = paramStr.substr(0, paramStr.length -1);
                                }

                            }
                        }
                    }
                }

                //build the complete src tag per DBLCLICK specifications
                //Add N4595 to all ad calls - ticket:
                var srcURL = "http://ad.doubleclick.net/N4595/"+ params.data.adtype +"/" + params.data.suite + "/"
                    + path + zones + paramStr
                    + ";sz=" + sizes
                    + ';url=' + window.location.pathname.replace(/\.htm.?$/gi, '').replace(/[^a-z0-9]/gi, '_').substring(1);


                //check and set the proper ORD value for the page or reloaded advertisement
                //srcURL += ";tile=" + $nflcs.ad.vendor.dart.getUpdatedTile(params.context) +
                //    ';ord=' + $nflcs.ad.vendor.dart.getUpdatedOrd(srcURL, params.data);

                var updatedOrdAndTile = $nflcs.ad.vendor.dart.getUpdatedOrdAndTile(srcURL, params.data, params.context);
                srcURL += ";tile=" + updatedOrdAndTile.tile + ';ord=' + updatedOrdAndTile.ord;

                //build ad based on ad type
                if(params.data.adtype == "adj")
                    return $nflcs.ad.makeADJ(srcURL);
                else
                    return $nflcs.ad.makeADI(srcURL, params.data.width, params.data.height, params.data.id);
            }

        },

        gpt : {
            /**
             * @function getAd()
             * @param opts : data object that contains all the supported parameters used by this function.
             * @description  Creates the Doubleclick specific ad call.
             */
            getAd : function(opts, GPTadTag){

                if(GPTadTag){
                    googletag.pubads().refresh([GPTadTag]);
                    return GPTadTag;
                }

                var params = {
                  context : null,
                  data : null
                };

                //combine parameters
                $nflcs.extend(true, params, opts);

                //local variables
                var fullpath = $nflcs.ad.getPathFromUrl(),
                    path = "",
                    zones = "";

                //set the last entry to index if it's empty or _
                if(fullpath[fullpath.length-1].replace("_","") == "") fullpath[fullpath.length-1] = "index";

                if(fullpath.length > 1){
                    path = '';
                    if(fullpath.length > 5) maxPaths = 5;
                    else maxPaths = fullpath.length;
                    for(i=0;i<maxPaths;i++)
                    {
                        var endingSlash = '/';
                        if(i==maxPaths-1) endingSlash = ""
                        path = path  + fullpath[i].replace(/[^a-z0-9]/gi, '_') + endingSlash;

                    }
                }else{
                    path = fullpath[0].replace(/[^a-z0-9]/gi, '_');
                }
                //build the s1...sn portion of the DBLCLICK query
                if(params.data.zoneOverride && $nflcs(params.data.zoneOverride).children.length > 0){
                    for(zone in params.data.zoneOverride){
                        if(params.data.zoneOverride.hasOwnProperty(zone)){
                            zones += ";" + zone + "=" + params.data.zoneOverride[zone];
                        }

                    }
                }else{
                    for(var i=0;i<fullpath.length;i++){
                        zones += ";s" + (i+1) + "=" + fullpath[i].replace(/[^a-z0-9]/gi, '_');
                    }
                }

                //set the supported sizes. If data object doesn't include a sizes variable use the width and height object instead.
                var sizes = (params.data.sizes && ($nflcs(params.data.sizes).children.length > 0))? params.data.sizes : (params.data.width + "x" + params.data.height);

                //extract parameter elements from the nflcs:ad tag if any exist and associate with data object
                $nflcs.ad.getParams(params.context, params.data);
                var paramStr = "";
                //get any custom params associated with this advertisement
                for(var k in params.data.params){
                    if (params.data.params.hasOwnProperty(k)){
                        paramStr += ";" + k + "=" + params.data.params[k];
                    }
                }

                //if query attribute exists add it to the parameters
                if(params.data.query && params.data.query.length > 0) paramStr = ";" + params.data.query + paramStr;
                //if customparams have been speicified make sure to include them

                if(params.data.customparams && params.data.customparams.length > 0){
                    paramStr += ";" + params.data.customparams;
                    //PVT ID: 33425137
                    if(paramStr.indexOf("sz") > 0){
                        //TODO: convert this to a regex pattern match
                        var tmp = paramStr.split(";");
                        for(i=0;i<tmp.length;i++){
                            if(tmp[i].indexOf("sz") >= 0){
                                sizes = tmp[i].replace("sz=","");
                                //remove it from paramStr and remove any double ;;
                                paramStr = paramStr.replace(tmp[i], '').replace(';;', ';');
                                if(paramStr.lastIndexOf(";") == (paramStr.length -1))
                                {
                                    paramStr = paramStr.substr(0, paramStr.length -1);
                                }

                            }
                        }
                    }
                }

                //build the complete src tag per DBLCLICK specifications
                //Add N4595 to all ad calls - ticket:
                var srcURL = "http://ad.doubleclick.net/N4595/"+ params.data.adtype +"/" + params.data.suite + "/"
                    + path + zones + paramStr
                    + ";sz=" + sizes
                    + ';url=' + window.location.pathname.replace(/\.htm.?$/gi, '').replace(/[^a-z0-9]/gi, '_').substring(1);

                var updatedOrdAndTile = $nflcs.ad.vendor.dart.getUpdatedOrdAndTile(srcURL, params.data, params.context);
                srcURL += ";tile=" + updatedOrdAndTile.tile + ';ord=' + updatedOrdAndTile.ord;

                if(params.data.sizes){
                    var GPTsizes = params.data.sizes.split(",");
                    for(var i = 0; i < GPTsizes.length; i++){
                        var sizeSplit = GPTsizes[i].split("x");
                        GPTsizes[i] = [parseInt(sizeSplit[0]),parseInt(sizeSplit[1])];
                    }
                }
                else{
                    var GPTsizes = [parseInt(params.data.width), parseInt(params.data.height)];
                }
                var context$ = $nflcs(params.context);
                var adId = context$.attr('id');

                if (!(adId && adId.length)) {
                    adId = "div-gpt-ad-" + updatedOrdAndTile.ord + "-" + updatedOrdAndTile.tile;
                    context$.attr('id',adId);
                }
                GPTadTag = googletag.defineSlot("/4595/" + params.data.suite + "/" + path, GPTsizes, adId);
                GPTadTag.addService(googletag.pubads())
                    .setTargeting("url", window.location.pathname.replace(/\.htm.?$/gi, '').replace(/[^a-z0-9]/gi, '_').substring(1))
                    .setTargeting("tile", updatedOrdAndTile.tile);

                var zonesAndParams = zones + paramStr;

                if(zonesAndParams.length){
                    var GPTzones = zonesAndParams.split(';');
                    for(var i = 0;  i < GPTzones.length; i++){
                        var targeting = GPTzones[i].split("=");
                        if(targeting.length == 2){
                            GPTadTag.setTargeting(targeting[0],targeting[1]);
                        }
                    }
                }

                if (!$nflcs.ad.collapseEmptyDivs) {
                    googletag.pubads().collapseEmptyDivs();
                    $nflcs.ad.collapseEmptyDivs = true;
                }

                googletag.enableServices();
                googletag.defineOutOfPageSlot();
                googletag.display(adId);

                return GPTadTag;
            }
        },

        simplified: {
            getAd : function(opts){
                var adURL = "http://pubads.g.doubleclick.net/gampad/adx";

                var params = {
                  context : null,
                  data : null
                };

                //combine parameters
                $nflcs.extend(true, params, opts);

                //local variables
                var fullpath = $nflcs.ad.getPathFromUrl(),
                    path = "",
                    zones = "";

                //set the last entry to index if it's empty or _
                if(fullpath[fullpath.length-1].replace("_","") == "") fullpath[fullpath.length-1] = "index";

                if(fullpath.length > 1){
                    path = '';
                    if(fullpath.length > 5) maxPaths = 5;
                    else maxPaths = fullpath.length;
                    for(i=0;i<maxPaths;i++)
                    {
                        var endingSlash = '/';
                        if(i==maxPaths-1) endingSlash = ""
                        path = path  + fullpath[i].replace(/[^a-z0-9]/gi, '_') + endingSlash;
                    }
                }else{
                    path = fullpath[0].replace(/[^a-z0-9]/gi, '_');
                }

                //build the s1...sn portion of the DBLCLICK query
                if(params.data.zoneOverride && $nflcs(params.data.zoneOverride).children.length > 0){
                    for(zone in params.data.zoneOverride){
                        if(params.data.zoneOverride.hasOwnProperty(zone)){
                            zones += zone + "=" + params.data.zoneOverride[zone];
                        }

                    }
                }else{
                    for(var i=0;i<fullpath.length;i++){
                        zones += "&s" + (i+1) + "=" + fullpath[i].replace(/[^a-z0-9]/gi, '_');
                    }
                }

                if(params.data.sizes){
                    var sizes = params.data.sizes.join("|");
                }
                else{
                    var sizes = params.data.width + "x" + params.data.height;
                }

                //extract parameter elements from the nflcs:ad tag if any exist and associate with data object
                $nflcs.ad.getParams(params.context, params.data);
                var paramStr = "";
                //get any custom params associated with this advertisement
                for(var k in params.data.params){
                    if (params.data.params.hasOwnProperty(k)){
                        paramStr += "&" + k + "=" + params.data.params[k];
                    }
                }

                //if query attribute exists add it to the parameters
                if(params.data.query && params.data.query.length > 0) paramStr = params.data.query + paramStr;
                //if customparams have been speicified make sure to include them

                if(params.data.customparams && params.data.customparams.length > 0){
                    paramStr += "&" + params.data.customparams;
                    //PVT ID: 33425137
                    if(paramStr.indexOf("sz") > 0){
                        //TODO: convert this to a regex pattern match
                        var tmp = paramStr.split(";");
                        for(i=0;i<tmp.length;i++){
                            if(tmp[i].indexOf("sz") >= 0){
                                sizes = tmp[i].replace("sz=","");
                                //remove it from paramStr and remove any double ;;
                                paramStr = paramStr.replace(tmp[i], '').replace(';;', ';');
                                if(paramStr.lastIndexOf("&") == (paramStr.length -1))
                                {
                                    paramStr = paramStr.substr(0, paramStr.length -1);
                                }

                            }
                        }
                    }
                }

                var targeting = encodeURIComponent( paramStr.substring(1) + zones
                    + '&url=' + window.location.pathname.replace(/\.htm.?$/gi, '').replace(/[^a-z0-9]/gi, '_').substring(1) );

                adURL += "?iu=/4595/" + params.data.suite + "/" + path
                    + "&t=" + targeting + "&sz=" + sizes + "&c=" + Math.floor(Math.random()*10000000);

                return $nflcs.ad.makeADI(adURL, params.data.width, params.data.height, params.data.id);
            }
        }
    },

    /**
     * @function getPathFromUrl()
     * @description Takes the current URL and builds an array based on the path part.
     * @returns Array
     */
    getPathFromUrl : function() {
        var paths = window.location.pathname.replace(/\.htm.?$/gi, '');
        if(paths.substring(0,1) == "/") paths = paths.substr(1,paths.length-1);
        return paths.split("/");
    },

    /**
     * @function makeADI()
     * @description Builds the HTML string that represnts an ADI advertising call.
     * @param src
     * @param width
     * @param height
     * @param id
     * @returns String
     */
    makeADI : function(src, width, height, id){
        return '<iframe width="' + width + '" id="' + id + '" height="'
            + height + '" scrolling="no" frameborder="0" src="' + src + '" marginwidth="0" marginheight="0"></iframe>';
    },

    /**
     * @function makeADJ()
     * @description Builds the HTML string that represents an ADJ advertising call.
     * @param src
     * @returns String
     */
    makeADJ : function(src){
        return '<script language="JavaScript" src="'+ src +'"></script>';
    },

    /**
     * @function makeAdFromParams()
     * @descriptions creates <nflcs:ad> element from passed in options
     * @param type
     * @param opts
     * @param params
     * @returns HTML Element of <nflcs:ad>
     */
    makeAdFromParams : function(type, opts, params){
        var thisAd = $nflcs("<nflcs:ad></nflcs:ad>");

        //why not use extend?
        thisAd.data("adtype", type);
        thisAd.data("width", opts.width);
        thisAd.data("height", opts.height);
        thisAd.data("suite", opts.suite);
        thisAd.data("id", opts.id);
        //if custom query passed add it
        if(opts.query && opts.query.length > 0) thisAd.data("query", opts.query);

        //if multiple sizes is used, set those values
        if(opts.sizes && opts.sizes.length > 0) thisAd.data("sizes", opts.sizes);
        //add custom params if they are defined inline from DCR
        if(opts.customparams && opts.customparams.length > 0) thisAd.data("customparams", opts.customparams);
        //add zoneOverride to use instead of URL zones
        if(opts.zoneOverride) thisAd.data("zoneOverride", opts.zoneOverride);
        //pass any additional parameters (name/value) pairs specified.
        thisAd.data("params", params);
        return thisAd;
    },

    /**
     * @function makeAd()
     * @description Builds an advertising call and inserts it into the supplied context.
     * @param context
     */
    makeAd : function(context, GPT_Object){

        var myData = $nflcs(context).data();

        //Check if there's a gallery ad container on the page to grab the gallery tags and append to query
//        var galleryAdData = $nflcs(".full-width-gallery .ad").data();
//        if(galleryAdData && typeof galleryAdData.tags === "string" && galleryAdData.tags.length > 0){
//            myData.query = myData.query + galleryAdData.tags + ";";
//        }

        //For the purposes of passing on the video title and channel for video pages (CSPL-3608), we are assuming the av gallery extended module means we are on the video page
        if( $nflcs($nflcs.FeaturesList["avGalleryExtended"].selector).length > 0 ) {
            var channelName, videoTitle, zoneOverride = {};

            var avPlayer = $nflcs($nflcs.cleanSelector($nflcs.FeaturesList["avPlayer"].selector));
            if( avPlayer.length > 0 ) {
                channelName = avPlayer.data("channelkey");
                if( !channelName || channelName == "" ) {
                    channelName = "index";
                }
            }

            //Assuming seoTitle for video is 3rd url param, just like ESI logic for video page
            var urlArray = $nflcs.ad.getPathFromUrl();

            for(var i = 0; i < urlArray.length; i++){
                zoneOverride["s" + (i + 1)] = urlArray[i].replace(/[^a-z0-9]/gi, '_');
            }

            if( zoneOverride.s3 ) {

                //this is a channel url, with no video title
                if( zoneOverride.s3 == "channel" ) {
                    if( !zoneOverride.s4 )
                        channelName = "index";

                    videoTitle = "";
                }
                //this is a deeplink url
                else {
                    videoTitle = zoneOverride.s3;
                }
                if(channelName) {
                    zoneOverride.s3 = channelName;
                }

            }

            zoneOverride.s4 = videoTitle;
            myData.zoneOverride = zoneOverride;
        }

        if(!myData.id){
            myData.id = $nflcs.Utility.getRandomNumber();
        }


        var opts = {"context" : context, "data" : myData};
        switch (myData.vendor) {
            case "DART":
                var thisAd = $nflcs.ad.vendor.dart.getAd(opts);

                if (myData.adtype == "adj") {
                    $nflcs(context).writeCapture().html(thisAd);
                } else {
                    $nflcs(context).html(thisAd);
                }
                break;
            case "Simplified":
                var thisAd = $nflcs.ad.vendor.simplified.getAd(opts, GPT_Object);
                $(context).html(thisAd);
                break;
            case "GPT":
            default:
                var thisAd = $nflcs.ad.vendor.gpt.getAd(opts, GPT_Object);
        }

        return thisAd;
    },

    /**
     * @function getParams()
     * @description gets additional parameter elements that can be provided within an nflcs:ad element.
     * @param context
     * @param data
     * @returns Array
     */
    getParams : function(context, data) {
        var params$ = $nflcs(context).children("param");

        //add parameters
        var params = {};
        for (var i = 0; i < params$.length; i++) {
            if (params$[i].name && params$[i].value) {
                params[params$[i].name] = params$[i].value;
            }
        }
        //remove the last divider from the end of the query
        // extend in case params already exist so that we don't lose them on reloaded ads
        if(!data.params) data.params = {};
        $nflcs.extend(true, data.params, params);
    }
};

/***
 *
 *
 *
 * Reference information
 *
 ***/

/*
 <nflcs:ad data-width="220" data-height="90" data-adtype="adi" data-channel="home" data-nfl="ad" data-vendor="DART"
 data-subchannel="landing" data-slot="top" data-pos="top" data-tile="2" data-suite="team.sea">
 </nflcs:ad>

 url: 'http://ad.doubleclick.net/adi/team.sea/home/landing;s1=home;s2=landing;slot=top;nfl=ad;pos=;tile=2;sz=220x90' ,

 TODO: refactor for more dynamic querystring and channel definitions

 */

$nflcs.getUTC = {
    load: function() {
        var UTC = '';
        // convert local time to UTC
        var localTime = new Date();
        // milliseconds since 1/1/1970 @ 12:00 AM
        UTC = localTime.getTime();
        return UTC;
    }
};

$nflcs.scrollable = {
    /**
     * Scrollable load function that gets settings of defaults and from markup then initializes function on scrollable container
     *
     * @param elem HTML element containing markup for scrollable
     * @return void
     */
    load: function(elem) {
        // .scroll-view
        var el$ = $nflcs(elem);
        // .scroll-view .scrollable
        var scrollable$ = $nflcs(".scrollable", el$);

        var settings = {
            items   : ".items",
            keyboard : false,
            easing  : 'linear',
            prev    : ".previous",
            next    : ".next",
            api     : true
        };
        // check for vertical scroll
        if (el$.hasClass("vertical")) {
            settings.vertical = true;
        }
        // check for circular scroll
        if (el$.hasClass("circular")) {
            settings.circular = true;
        }
        // check for easing
        if(el$.hasClass('easing')) {
            settings.easing = 'swing';
        }

        // tag-list height set dynamically
        if (el$.hasClass("multiple-line")) {
            var tagListDiv$ = $nflcs(".tag-list", scrollable$);
            var height = scrollable$.height();
            tagListDiv$.each(function() {
                if (height < $nflcs(this).height()) {
                    height = $nflcs(this).height();
                }
            });
            scrollable$.height(height);
            tagListDiv$.height(height);
        }
        scrollable$.scrollable(settings);
    }
};

$nflcs.Omniture = {

    /**
     * Used to track flash centerpiece clicks
     *
     * @param title Article or video title (Headline)
     * @param type Content type
     * @param chNum Chapter number
     * @param url
     */
    trackLink: function(title, type, chNum, url) {
        s_analytics.linkTrackVars = "prop29,prop30,prop31,prop36";
        s_analytics.prop29 = title;
        s_analytics.prop29 = s_analytics.prop29.toLowerCase();
        s_analytics.prop30 = chNum;
        s_analytics.prop31 = url;
        s_analytics.prop36 = type;// ﻿(category is the content type of the click event)
        s_analytics.tl(true, 'o', 'featured news click');
        s_analytics.linkTrackVars = "None";
        s_analytics.prop29 = "";
        s_analytics.prop30 = "";
        s_analytics.prop31 = "";
        s_analytics.prop36 = "";
        document.location = url;
    },

    /**
     * Track a clicked link view Omniture
     *
     * Use the below variables to track a clicked event
     *
     * - eVar16  Module Name (will always be 'cp' for centerpiece)
     * - eVar17  The chapter number. Only needed for centerpiece otherwise set as empty string eg: 1 or ""
     * - eVar18  The ID or name of the item that was actually used. For example,
     *           "play button", "main image", or "read more". The idea is that this variable identifies which
     *           of the objects was actually used. Use any naming convention, just be sure it is consistent and readable.
     *
     * Please note in the future if different eVars or props are used it might be better to uncomment the
     * reset of the variables after the call to tl()
     *
     * @param propertyNames Array a list of Omniture prop names  eg: prop29
     * @param propertyValues Array a list of values for Omniture prop names
     * @param linkName String the name of the link clicked
     * @return Void
     */
    trackLinkClicked: function(propertyNames, propertyValues, linkName) {
        var trackingProperties = this.createTrackingProperties(propertyNames, propertyValues);

        //get the props we are going to track
        for (prop in trackingProperties) {
            s_analytics[prop] = trackingProperties[prop];
        }

        s_analytics.linkTrackVars = propertyNames.join(",");

        //make call to Omniture
        s_analytics.tl(true, 'o', linkName);

        //reset the tracking properties
//        s_analytics.linkTrackVars = "None";
//        for (prop in trackingProperties) {
//            s_analytics[prop] = "";
//        }


    },

    /**
     * Creates a object with properties
     * reflecting the data we want Omniture to capture
     *
     * @param propertyKeys Array a list of Omniture property (prop) names
     * @param propertyValues Array a list of values for the Omniture property names
     * @return Object
     */
    createTrackingProperties: function(propertyKeys, propertyValues) {
        var trackingObject = {}, propertyKeysLength = propertyKeys.length;
        for (var i = 0; i < propertyKeysLength; i++) {
            trackingObject[propertyKeys[i]] = propertyValues[i];
        }
        return trackingObject;
    },

    /**
     *
     * @return {*}
     */
    getPagePath: function() {
        var path = window.location.pathname;

        // home page
        if (path == "/") {
            path = "home";
        }
        // static page
        else if (path.indexOf(".html") > -1) {
            path = path.substring(1, path.lastIndexOf(".html"));
        }
        // prototypical or third-party page with query string
        else if (path.indexOf("?") > -1) {
            path = path.substring(1, path.lastIndexOf("?"));
        }
        // prototypical or third-party page without query string
        else {
            path = path.substring(1, path.length);
        }

        return path;
    },

    getSiteSection: function() {
        var path = window.location.pathname;

        // home page
        if ((path == "/") || (path == "/index.html")) {
            path = "home";
        }
        // static, prototypical, or third-party pages
        else {
            // remove leading slash
            path = path.substring(1, path.length);

            if (path.indexOf("/") > -1) {
                path = path.substring(0, path.indexOf("/"));
            }
        }

        return path;
    },

    /**
     * Track a virtual page view using Omniture. This is known as macro data
     *
     * To track a virtual page view you use the below in the propertyNames array
     *
     * - s_analytics_pageName the name of the page eg: nfl.com|home|modal-player
     * - s_analytics_gf1 overwrite the get filename eg: modal-player
     * - s_analytics_hier(hier1) the hierarchy variable eg: nfl.com|home|modal-player
     * - prop5 eg: nfl.com|home|modal-player
     *
     * @param propertyNames Array a list of Omniture property (prop) names
     * @param propertyValues Array a list of values for the Omniture property names
     * @return Void
     */
    trackPageView: function(propertyNames, propertyValues) {
        var trackingProperties = this.createTrackingProperties(propertyNames, propertyValues);

        s_analytics.linkTrackVars = "pageName,hier1,prop5";

        // Clear link tracking vars
        s_analytics.eVar16 = s_analytics.eVar17 = s_analytics.eVar18 = "";

        for (prop in trackingProperties) {
            if (prop.indexOf("_") >= 0) {
                window[prop] = trackingProperties[prop];
            } else {
                s_analytics[prop] = trackingProperties[prop];
            }
        }

        //call Omniture
        void(s_analytics.t());

        //clean up the Omniture variables
        for (prop in trackingProperties) {
            if (prop.indexOf("_") >= 0) {
                window[prop] = "";
            } else {
                s_analytics[prop] = "";
            }
        }

    },

    /**
     * Gets the page hierarchy
     *
     * @param s
     * @return String
     */
    getHier: function(s) {
        if (!s)
            s = window.location.pathname;
        if (/\.[^\/]+$/.test(s))
            s = s.substring(0, s.lastIndexOf("/"));
        s = this.getClubCode().toLowerCase() + s.toLowerCase().replace(/\//g, "|");

        return s.replace(/\|$/, "");
    },

    /**
     * Get the club code
     *
     * @return String
     */
    getClubCode: function() {
        var club = "";

        if (typeof(s_analytics_prefix) == "string") {
            club = s_analytics_prefix;
        } else if (typeof s_analytics_hier1 == "string") {
            club = s_analytics_hier1.split('|');
            club = club[0];
        } else {
            club = this.getDomain(window.location.href);
        }

        return club.toLowerCase();
    },

    /**
     * Get the domain
     *
     * @param thestring
     * @return String
     */
    getDomain: function(thestring) {
        //function that matches the beginning of a URL
        //in a string and then returns the domain.
        var urlpattern = new RegExp("(http|ftp|https)://(.*?)/.*$");
        var parsedurl = thestring.match(urlpattern);
        return parsedurl[2];
    }

};
$nflcs.omniTrack = $nflcs.Omniture.trackLink;

/**
 * Open a modal video window
 *
 * @param event
 * @param el$
 * @returns void
 */


$nflcs.OpenModalVideo = function(params){
     var opts = {
         container : "",
         externalID : "",
         mediaType : "video",
         avModPath : "/cda-web/audio-video-modal-module.htm?id=",
         context : null,
         event : null,
         playerName: ""
     };

    $nflcs.extend(true, opts, params);

    nflcs.mod.CenterpieceVideo.load({
        container: opts.container,
        content: opts.avModPath + opts.externalID + "&mode=" + opts.mediaType,
        trigger: $nflcs(opts.event).attr('class'),
        closeClass: "jqmClose",
        context: opts.context,
        playerName: opts.playerName
    });
};

/**
 * Autocomplete for site search (RAMP)
 *
 * @return Object
 */
$nflcs.searchAutocomplete = {

    list: "#list-autocomplete",

    /**
     * Setup variables needed for
     * autocomplete and call needed methods
     *
     * @param elem  String the selector for the search box
     * @return Void
     */
    load: function(elem) {

        //set up inital variables
        var elem$ = $nflcs(elem);
        var modData = elem$.data();

        this.searchUrl = modData.searchUrl;
        this.searchPath = modData.searchPath;
        this.publishUrl = modData.publishUrl;
        //this.nickname = modData.nickname;
        window.ezAutocompleteSearchUrl = this.searchUrl + this.searchPath + "?";

        //search label text
        this.searchInitLabel = modData.searchText;
        this.searchLabel(elem$);
        this.events(elem$);
        this.setupAutocomplete(elem$);
    },

    /**
     * Bind needed events
     *
     * @param elem$ jquery object of the search input
     * @return Void
     */
    events: function(elem$) {
        //update search box on hover over search terms
        $nflcs(this.list + " a").live("hover", function() {
            elem$.val($nflcs(this).text());
            $nflcs(this).addClass("hover");
        });

        //remove hover effect if user mouseout of autocomplete <div>
        $nflcs(this.list).live("mouseleave", function() {
            $nflcs("#list-autocomplete a").removeClass("hover");
        });
    },

    /**
     * Call the RAMP js file. This file
     * does the call to get the search terms
     *
     * @param elem$ jquery object of the search input
     * @return Void
     */
    setupAutocomplete: function(elem$) {
        //need to provide the global variable myAc
        //as RAMP requires this
        window.myAC = queryExpansion_init(elem$, $nflcs(this.list),
            this.publishUrl + "autocomplete?callbackName=myAC&q=",
            this.searchUrl + this.searchPath + "?");
    },

    /**
     * Show hide the search box
     * label text onFocus and onBlur
     *
     * @param elem$ jquery object of the search box
     * @return Void
     */
    searchLabel: function(elem$) {

        var searchInitLabel = this.searchInitLabel;

        elem$.bind("focus",
            function() {
                if (elem$.val() == searchInitLabel) {
                    elem$.val('');
                }
            }).blur(function() {
                if (elem$.val() == "") {
                    elem$.val(searchInitLabel);
                }
            });
    }

};

/**
 * Original site search
 *
 * @param elem the search box selector
 * @return Void
 */
$nflcs.classicSiteSearch = {

    load: function(elem) {
        nflcs.gbl.mod.searchText.init({
            elementPath:    '#search form label',
            searchFieldId:    '#search-text',
            searchInitLabel: $nflcs(elem).attr("data-search-text")
        });
    }
};

/**
 * Modify selector to properly handle custom tags if browser is IE7
 *
 * @param key Key set in FeaturesList object
 * @return $nflcs.FeaturesList[key].selector String
 */
$nflcs.setSelector = function(key) {
    return $nflcs.cleanSelector($nflcs.FeaturesList[key].selector);
};

/**
 * Generic function to handle custom tags if browser is IE7
 *
 * @param selector The selector we want to check
 * @return selector String the cleaned up version
 */
$nflcs.cleanSelector = function(selector){
    if ($nflcs.browser.msie && $nflcs.browser.version == 7) {
        return selector.replace(/.*:/gi, "");
    }

    return selector;
};

/**
 * Builds a selector string from FeaturesList, determines live modules, loads dependent JavaScript files, then triggers init functions
 *
 * @return void
 */
$nflcs.loadModules = function() {
    var massSelector = '';
    // build a selector string from FeaturesList
    for (var key in $nflcs.FeaturesList) {
        massSelector += $nflcs.setSelector(key) + ',';
    }
    // remove last comma from massSelector
    massSelector = massSelector.substr(0, massSelector.length - 1);
    // find all selectors in the DOM
    var nflcsLiveModules$ = $nflcs(massSelector);
    var requireArray = []; // collection of required JavaScript files
    var initArray = []; // collection of init functions
    for (var itemKey in $nflcs.FeaturesList) {
        var item = $nflcs.FeaturesList[itemKey];
        // add JavaScript files to requireArray if item's in the DOM
        if (item.dependencies && ($nflcs($nflcs.setSelector(itemKey), nflcsLiveModules$.parent()).length > 0)) {
            $nflcs.merge(requireArray, item.dependencies);
        }
        // add functions to initArray if item's in the DOM
        $nflcs($nflcs($nflcs.setSelector(itemKey)), nflcsLiveModules$.parent()).each(function() {
            initArray.push({
                feature : item,
                element : this
            });
        });
    }

    // setup require.
    require.config({
        paths: {
            knockout: nflJsLibPath + 'knockout-3.1.0',
            komapping: nflJsLibPath + 'knockout-mapping',
            moment: nflJsLibPath + 'moment',
            "moment-timezone": nflJsLibPath + 'moment-timezone',
            "moment-timezone-data": nflJsLibPath + "moment-timezone-data"
        },
        shim:{
            komapping: {
                deps: ["knockout"],
                exports: "komapping"
            }
        }
    });

    // load dependent JavaScript files then trigger init functions
    require(requireArray, function() {
        for (var i = 0; i < initArray.length; i++) {
            initArray[i].feature.init(initArray[i].element);
        }
        //trigger the page level omniture call (Main call to Omniture
        if(((typeof(s_code) == "undefined") || s_code == "") && s_analytics)
        {
            s_code=s_analytics.t();//if(s_code)document.write(s_code);
        }
    });
    // load NFL Club Sites Library for Mobile (Touch)
    if (Modernizr.touch) {
        require([nflJsLibPath + 'nflcs-lib-mobile.js']);
    }

};

// TODO: Update FeaturesList and loadModules to trigger modules on document ready or window load
// Why are ribbon nav and clue tip affected if not document ready?
$nflcs(document).ready(function() {
    $nflcs.loadModules();
});

/** QUnit **/
$nflcs.qBert = {
    inject : function(){
        var type = (window.location.href.indexOf("cda-web/") > 0)? "module" : "selector";

        switch(type){
            case "module" :
                $nflcs.getScript(nflJsLibPath + "../jstests/load-tests-dynamically-module.js");
                break;
            default :
                $nflcs.getScript(nflJsLibPath + "../jstests/load-tests-dynamically-selector.js");

        }
    }
};

var qvar = nflcs.gbl.returnUriVariable("qunit");
if (qvar == "true"){
    $nflcs(window).load(function() {
        //load QUnit tests
        $nflcs.qBert.inject();
    });
}
