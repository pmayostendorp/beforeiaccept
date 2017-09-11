///#source 1 1 /te_re/modules/te_re.START.js
/// <reference path="te_re.base.js" />
/// <reference path="te_re.browser.js" />
/*
TruEffect Rendering Engine
*/
if (te_re == undefined || te_re == null) {

///#source 1 1 /te_re/modules/te_re.base.js
/// <reference path="te_re.base.js" />
/// <reference path="te_re.browser.js" />
    var te_re = {
        version: '0.3.6',
        inIframe: false,
        crossDomain: false,
        debug: true,
        tags: {},
        features: {},
        register: function (tag, config) {
            te_re.browser.console("register tag: " + tag.txnid, tag);
            tag.initTime = (new Date()).getTime();
            if (typeof config === "undefined") { config = {}; }
            if (typeof config.tag === "undefined") { config.tag = {}; }
            if (typeof config.tag.adContainerID === "undefined") { config.tag.adContainerID = "tead_" + tag.usec; }
            if (typeof config.tag.tagContainerID === "undefined") { config.tag.tagContainerID = "tetags_" + tag.usec; }
            tag.adContainer = document.getElementById(config.tag.adContainerID);
            tag.tagContainer = document.getElementById(config.tag.tagContainerID);
            if (tag.adContainer == null) {
                te_re.browser.console("Ad Container not found! - " + tag.usec, tag);
                setTimeout(function () { te_re.register(tag, config); }, 100);
                return;
            }
            te_re.tags[tag.txnid] = tag;
            for (var f in config) {
                if (te_re.features[f]) {
                    te_re[te_re.features[f].mod].register(tag, config[f], te_re.features[f].params);
                } else {
                    te_re.browser.console("Invalid feature specified! name: " + f, { tag: tag, config: config });
                }
            }
            te_re.browser.register(tag);
        },
        registerFeature: function (txnid, feature, config) {
            if (te_re.tags[txnid]) {
                if (te_re.features[feature]) {
                    te_re[te_re.features[feature].mod].register(te_re.tags[txnid], config, te_re.features[feature].params);
                }
            } else {
                te_re.browser.console("Invalid txnid referenced! - " + txnid);
            }
        },
        sendNotification: function (tag, name, args) {
            for (var featureName in te_re.features) {
                var feature = te_re.features[featureName];
                if (te_re[feature.mod] && te_re[feature.mod].handleNotification) {
                    te_re[feature.mod].handleNotification(tag, name, args, feature.params);
                } else {
                    te_re.browser.console("Module not found or doesn't have handleNotification!", { feature: feature, name: name, args: args });
                }
            }
            te_re.browser.handleNotification(tag, name, args, {});
        },
        init: function () {
            //determine if in iframe
            if (top != window) {
                te_re.inIframe = true;
                //determine if running in a bridge file
                try{
                    if (top.location != undefined && top.location.hostname != window.location.hostname) {
                        te_re.crossDomain = true;
                    }
                } catch (e) { te_re.crossDomain = true; }
            }
            te_re.log.init();
            te_re.av.init();
            te_re.tracking.init();
            //always init browser last
            te_re.browser.init();
            return true;
        }
    };



///#source 1 1 /te_re/modules/te_re.browser.js
/// <reference path="te_re.base.js" />
    te_re.browser = {
        height: 0,
        width: 0,
        scrollTop: 0,
        scrollLeft: 0,
        scrollTimer: null,
        getDim: function () {
            var tWidth = te_re.browser.width;
            var tHeight = te_re.browser.height;
            var win = window.top;
            var doc = win.document;
            if (typeof (window.innerWidth) == 'number') {
                //Non-IE
                te_re.browser.width = win.innerWidth;
                te_re.browser.height = win.innerHeight;
            } else if (doc.documentElement && (doc.documentElement.clientWidth || doc.documentElement.clientHeight)) {
                //IE 6+ in 'standards compliant mode'
                te_re.browser.width = doc.documentElement.clientWidth;
                te_re.browser.height = doc.documentElement.clientHeight;
            } else if (doc.body && (doc.body.clientWidth || doc.body.clientHeight)) {
                //IE 4 compatible
                te_re.browser.width = doc.body.clientWidth;
                te_re.browser.height = doc.body.clientHeight;
            }
            //return true if these values changed
            return (tWidth != te_re.browser.width || tHeight != te_re.browser.height);
        },
        getScroll: function () {
            var tTop = te_re.browser.scrollTop;
            var tLeft = te_re.browser.scrollLeft;
            var win = window.top;
            var doc = win.document;
            if (typeof (window.pageYOffset) == 'number') {
                //Netscape compliant
                te_re.browser.scrollTop = win.pageYOffset;
                te_re.browser.scrollLeft = win.pageXOffset;
            } else if (doc.body && (doc.body.scrollLeft || doc.body.scrollTop)) {
                //DOM compliant
                te_re.browser.scrollTop = doc.body.scrollTop;
                te_re.browser.scrollLeft = doc.body.scrollLeft;
            } else if (doc.documentElement && (doc.documentElement.scrollLeft || doc.documentElement.scrollTop)) {
                //IE6 standards compliant mode
                te_re.browser.scrollTop = doc.documentElement.scrollTop;
                te_re.browser.scrollLeft = doc.documentElement.scrollLeft;
            }
            //return true if these values changed
            return (tTop != te_re.browser.scrollTop || tLeft != te_re.browser.scrollLeft);
        },
        handleResizeScroll: function () {
            try { 
                te_re.browser.console("handleResizeScroll");
                if (te_re.browser.getScroll() || te_re.browser.getDim()) {
                    if (!te_re.browser.evalVisibility()) { }
                }
            } catch (e) { }
        },
        getOffset: function (ele) {
            var cur = { top: 0, left: 0, topContainer: null };
            var obj = ele;
            cur.left += obj.offsetLeft;
            cur.top += obj.offsetTop;
            if(obj.offsetParent && false) {
                do {
                    cur.left += obj.offsetLeft;
                    cur.top += obj.offsetTop;
                } while (obj = obj.offsetParent);
            }

            if (te_re.inIframe && !te_re.crossDomain) {
                var doc = ele.ownerDocument;
                var win = doc.defaultView || doc.parentWindow;
                cur.topContainer = win.frameElement;
                if (win.frameElement) {
                    var par = te_re.browser.getOffset(win.frameElement);
                    cur.top += par.top;
                    cur.left += par.left;
                    if(par.topContainer){
                        cur.topContainer = par.topContainer;
                    }
                }
            }
            return cur;
        },
        evalVisibility: function () {
            for (var tag in te_re.tags) {
                te_re.browser.evalTagVisibility(te_re.tags[tag], false);
            }
        },
        evalTagVisibility: function (tag, forceSend) {
            var per = -1;
            if(!te_re.crossDomain){
                var visTop = te_re.browser.scrollTop;
                var visBot = te_re.browser.scrollTop + te_re.browser.height;
                var visLeft = te_re.browser.scrollLeft;
                var visRight = te_re.browser.scrollLeft + te_re.browser.width;
                var visH = 0;
                var visW = 0;
                if (tag.browser.offset.bottom < visTop) { visH = 0; }
                if (tag.browser.offset.top > visBot) { visH = 0; }
                if (tag.browser.offset.top >= visTop && tag.browser.offset.bottom <= visBot) { visH = tag.height; }
                if (tag.browser.offset.top < visTop) { visH = tag.height - (visTop - tag.browser.offset.top); }
                if (tag.browser.offset.bottom > visBot) { visH = tag.height - (tag.browser.offset.bottom - visBot); }
                if (visH > tag.height) { visH = tag.height; }
                if (visH < 0) { visH = 0; }
                if (visH > 0) {
                    if (tag.browser.offset.right < visLeft) { visW = 0; }
                    if (tag.browser.offset.left > visRight) { visW = 0; }
                    if (tag.browser.offset.left >= visLeft && tag.browser.offset.right <= visRight) { visW = tag.width; }
                    if (tag.browser.offset.left < visLeft) { visW = tag.width - (visLeft - tag.browser.offset.left); }
                    if (tag.browser.offset.right > visRight) { visW = tag.width - (tag.browser.offset.right - visRight); }
                    if (visW > tag.width) { visW = tag.width; }
                    if (visW < 0) { visW = 0; }
                }
                if (visH > 0 && visW > 0) {
                    per = parseInt(((visH * visW) / (tag.height * tag.width)) * 100, 10);
                }
                if (per < 0) { per = 0; }
                if (per != tag.browser.maxViewablePercentage || forceSend) {
                    tag.browser.maxViewablePercentage = per;
                    te_re.browser.sendViewability(tag);
                    return true;
                }
            } else {
                if (tag.browser.isViewabilityAvail == true || forceSend) {
                    tag.browser.isViewabilityAvail = false;
                    te_re.browser.sendViewability(tag);
                    return true;
                }
            }
            return false;
        },
        sendViewability: function (tag) {
            if (!tag.browser.isViewabilityAvail) {
                te_re.sendNotification(tag, 'viewability_unknown', { });
            } else {
                te_re.sendNotification(tag, 'viewability_changed', { percentage: tag.browser.maxViewablePercentage });
            }            
        },
        addEvent: function (ele, type, callback) {
            if (ele.attachEvent) {
                ele.attachEvent('on' + type, function () { callback(window.event); })
            } else {
                ele.addEventListener(type, callback, false);
            }
        },
        handleNotification: function (tag, e, args, feature) {
            switch (e) {
                case "request_viewability":
                    te_re.browser.sendViewability(tag);
                    break;
            }
        },
        console: function (message, parameters) {
            if (te_re.debug) {
                if (parameters == null || parameters == undefined) {
                    parameters = {};
                }
                try{
                    if (console && console.log) {
                        console.log('te_re[' + te_re.version + '] - ' + message, parameters);
                    }
                } catch (e) {/*nothing, console not supported*/}
            }
        },
        featureDetection: function () {
            var win = window, doc = document, nav = navigator, UNDEF = "undefined", OBJECT = "object", SHOCKWAVE_FLASH = "Shockwave Flash", SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
                FLASH_MIME_TYPE = "application/x-shockwave-flash",
                html5 = false,
                svg = (!!doc.createElementNS && !!doc.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect);
            
            // feature detection based on swfobject's implementation, ua object
            var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
                    u = nav.userAgent.toLowerCase(),
                    p = nav.platform.toLowerCase(),
                    windows = p ? /win/.test(p) : /win/.test(u),
                    mac = p ? /mac/.test(p) : /mac/.test(u),
                    webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
                    ie = !+"\v1", // feature detection based on Andrea Giammarchi's solution: http://webreflection.blogspot.com/2009/01/32-bytes-to-know-if-your-browser-is-ie.html
                    playerVersion = [0, 0, 0],
                    d = null;
            if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
                d = nav.plugins[SHOCKWAVE_FLASH].description;
                if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
                    plugin = true;
                    ie = false; // cascaded feature detection for Internet Explorer
                    d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                    playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
                    playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                    playerVersion[2] = /[a-zA-Z]/.test(d) ? parseInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0;
                }
            }
            else if (typeof win.ActiveXObject != UNDEF) {
                try {
                    var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
                    if (a) { // a will return null when ActiveX is disabled
                        d = a.GetVariable("$version");
                        if (d) {
                            ie = true; // cascaded feature detection for Internet Explorer
                            d = d.split(" ")[1].split(",");
                            playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
                        }
                    }
                }
                catch (e) { }
            }
            var eHTML5 = doc.createElement("canvas");
            html5 = !!(eHTML5.getContext && eHTML5.getContext("2d"));

            te_re.browser.features = {
                w3: w3cdom,
                flashVersion: playerVersion,
                wk: webkit,
                ie: ie,
                win: windows,
                mac: mac,
                svg: svg,
                html5: html5,
                hasFlashVersion: function(rv) {
                    var pv = ua.pv, v = rv.split(".");
                    v[0] = parseInt(v[0], 10);
                    v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
                    v[2] = parseInt(v[2], 10) || 0;
                    return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
                }};
        },
        register: function (tag) { 
            tag.browser = {
                isViewabilityAvail: true,
                maxViewablePercentage: 0
            };
            tag.browser.offset = te_re.browser.getOffset(tag.adContainer);
            tag.browser.offset.bottom = tag.browser.offset.top + tag.height;
            tag.browser.offset.right = tag.browser.offset.left + tag.width;
            te_re.browser.evalTagVisibility(tag, true);
        },
        init: function () {
            if (!te_re.crossDomain) {
                te_re.browser.featureDetection();
                te_re.browser.getDim();
                te_re.browser.addEvent(window.top, 'resize', te_re.browser.handleResizeScroll);
                te_re.browser.addEvent(window.top, 'orientationchange', te_re.browser.handleResizeScroll);
                te_re.browser.addEvent(window.top, 'scroll', te_re.browser.handleResizeScroll);
            }
        }
    };
///#source 1 1 /te_re/modules/te_re.log.js
/// <reference path="te_re.browser.js" />
/// <reference path="te_re.av.js" />
    te_re.log = {
        tags: [],
        logEvent: function (tag, params) { 
            var url = tag.log.url + "&jtime=" + (new Date()).getTime() + "&ptxnid=" + tag.txnid + "&group=inBanner";
            for (var param in params) { try { url += "&" + param + "=" + params[param].toString().replace(/[\r\t &+=]/g, '_'); } catch (e) { } }
            var img = new Image();
            img.src = url;
        },
        handleNotification: function (tag, name, args, params) {
            if (tag.log) {
                switch (name) {
                    case "log_event":
                        te_re.log.logEvent(tag, args);
                        break;
                    case "log_error":
                        args.event = "error";
                        te_re.log.logEvent(tag, args);
                        break;
                }
            }
        },
        register: function (tag, config, params) {
            tag.log = {
            };
            for (var conf in config) { tag.log[conf] = config[conf]; }
        },
        init: function () {
            te_re.features['log'] = { mod: 'log', params: {} };
        }
    };
///#source 1 1 /te_re/modules/te_re.av.js
/// <reference path="te_re.browser.js" />
/// <reference path="te_re.av.js" />
    te_re.av = {
        tags: [],
        evalViewability: function (tag, percentage) {
            if (!tag.av.viewed) {
                var viewable = (percentage > tag.av.visiblePercent);
                //todo: research adding window focus monitoring as well
                if (viewable) {
                    //pass tests
                    if (!tag.av.viewable) {
                        //not currently marked as visible so start counter
                        tag.av.viewable = true;
                        tag.av.timer = setTimeout(function () { te_re.av.handleCounter(tag, percentage); }, 1000);
                    }
                } else {
                    //failed tests
                    if (tag.av.viewable) {
                        //currently marked as visible so stop counter
                        tag.av.viewable = false;
                        clearTimeout(tag.av.timer);
                    }
                }
                if (tag.av.percentage < percentage) { tag.av.percentage = percentage; }
            }
        },
        handleCounter: function (tag, percentage) {
            var ms = (new Date()).getTime() - tag.initTime;
            tag.av.viewed = true;
            te_re.sendNotification(tag, "log_event", { event: "viewed", maxpercent: tag.av.percentage, pttv: ms })
        },
        handleNotification: function (tag, e, args, feature) {
            if (tag.av) {
                switch (e) {
                    case "viewability_changed":
                        te_re.av.evalViewability(tag, args.percentage);
                        break;
                    case "viewability_unknown":
                        te_re.sendNotification(tag, "log_event", { event: "unknownview", maxpercent: 0, pttv: 0 })
                        tag.av.viewed = true;
                        break;
                }
            }
        },
        register: function (tag, config, params) {
            tag.av = {
                visiblePercent: 50,
                visibleSeconds: 1,
                viewable: false,
                viewed: false,
                percentage: 0
            };
            for (var conf in config) { tag.av[conf] = config[conf]; }
            te_re.sendNotification(tag, "request_viewability", {});
        },
        init: function () {
            te_re.features['viewability'] = { mod: 'av', params: {} };
        }
    };
///#source 1 1 /te_re/modules/te_re.tracking.js
/// <reference path="te_re.browser.js" />
/// <reference path="te_re.av.js" />
    te_re.tracking = {
        tags: [],
        trackEvent: function (arr, params) {
            for (var i = 0; i < arr.length; i++) {
                var url = arr[i].replace('@@TIME@@',(new Date()).getTime());
                for (var param in params) { try { url += "&" + param + "=" + params[param].toString().replace(/[\r\t &+=]/g, '_'); } catch (e) { } }
                var img = new Image();
                img.src = url;
            }
        },
        handleNotification: function (tag, name, args, params) {
            if (tag.tracking) {
                switch (name) {
                    case "track_click":
                        te_re.tracking.trackEvent(tag.tracking.click, args);
                        break;
                    case "track_impr":
                        te_re.tracking.trackEvent(tag.tracking.impr, args);
                        break;
                }
            }
        },
        register: function (tag, config, params) {
            tag.tracking = {
                click: [],
                impr: []
            };
            try{
                switch (typeof config.ClickVar) {
                    case "string":
                        if (config.ClickVar !== "") {
                            tag.tracking.click.push(eval(config.ClickVar));
                        }
                        break;
                }
                switch (typeof config.ClickURL) {
                    case "string":
                        if (config.ClickURL !== "") {
                            tag.tracking.click.push(config.ClickURL);
                        }
                        break;
                }
                switch (typeof config.ImprVar) {
                    case "string":
                        if (config.ImprName !== "") {
                            tag.tracking.impr.push(eval(config.ImprVar));
                        }
                        break;
                }
                switch (typeof config.ImprURL) {
                    case "string":
                        if (config.ImprURL !== "") {
                            tag.tracking.impr.push(config.ImprURL);
                        }
                        break;
                }
            } catch (e) { /*nothing*/ }
            for (var conf in config) { tag.tracking[conf] = config[conf]; }
        },
        track: function (txnid) {
            try {
                te_re.sendNotification(te_re.tags[txnid], 'track_click', {});
            } catch (e) { }
            return true;
        },
        init: function () {
            te_re.features['tracking'] = { mod: 'tracking', params: {} };
            te_re.track = te_re.tracking.track;
        }
    };
///#source 1 1 /te_re/modules/te_re.END.js
}

te_re.init();



///#source 1 1 /te_re/modules/te_tags.js
if (te_tags == undefined || te_tags.run == undefined) {
    var te_tags = {
        plid: 0,
        crid: 0,
        cpid: 0,
        domain: '',
        spacedesc: '',
        prefid: '',
        ml_usec: '',
        txn_id: '',
        parsePath: function (link) {
            var parts = link.split('/');
            if (parts.length > 5) {
                te_tags.cpid = Math.abs(parts[5]);
            }
        },
        ReplaceTokens: function (txtTag, extCreativeId) {
            if (txtTag) {
                var returnVal = txtTag;
                var internalSiteId = '';
                var internalSectionId = '';
                var Size = '';
                returnVal = returnVal.replace(/##ECRID##/g, extCreativeId);
                returnVal = returnVal.replace(/@@ML_DOMAIN@@/g, te_tags.domain);
                returnVal = returnVal.replace(/@@PREFID@@/g, te_tags.prefid);
                returnVal = returnVal.replace(/@@TXNID@@/g, te_tags.txn_id);
                returnVal = returnVal.replace(/@@spacedesc@@/g, te_tags.spacedesc);

                returnVal = returnVal.replace(/@@CAID@@/g, te_tags.cpid);
                returnVal = returnVal.replace(/@@PLID@@/g, te_tags.plid);
                returnVal = returnVal.replace(/@@CRID@@/g, te_tags.crid);
                returnVal = returnVal.replace(/@@CR_GRP_ID@@/g, te_tags.cr_grp_id);
                returnVal = returnVal.replace(/@@USEC@@/g, te_tags.ml_usec);

                var arrayOfStrings = te_tags.spacedesc.split('_');

                if (arrayOfStrings != null && arrayOfStrings.length > 3) {
                    internalSiteId = arrayOfStrings[1];
                    internalSectionId = arrayOfStrings[3];
                    size = arrayOfStrings[2];
                    returnVal = returnVal.replace(/@@SIID@@/g, internalSiteId);
                    returnVal = returnVal.replace(/@@SEID@@/g, internalSectionId);
                    returnVal = returnVal.replace(/@@SIZE@@/g, size);

                    arrayOfStrings = size.split('x');
                    var width = arrayOfStrings[0];
                    var height = arrayOfStrings[1];
                    returnVal = returnVal.replace(/@@WIDTH@@/g, width);
                    returnVal = returnVal.replace(/@@HEIGHT@@/g, height);

                }

                return returnVal;
            }
            else {
                return '';
            }
        },

        Run: function () {
            te_tags.RenderTag('script', te_tags.domain + 'xl/PROD/TrackingTags/fetch.cp?cache=no-cache&default=default_pl_cr.js&file=/' + te_tags.cpid + '/PlacementTags/' + te_tags.plid + '.js');
        },

        RenderTag: function (type, tagsrc) {

            var TagToRender;
            var bodytag = document.getElementsByTagName('body')[0] || document.body;

            switch (type) {
                case "iframe":
                    TagToRender = document.createElement('iframe');
                    TagToRender.src = tagsrc;

                    break;
                case "script":
                    TagToRender = document.createElement('script');
                    TagToRender.src = tagsrc;

                    break;
                case "image":
                    TagToRender = document.createElement('img');
                    TagToRender.src = tagsrc;

                    break;
            }

            bodytag.appendChild(TagToRender);
        },
        AddTags: function (scriptTags, nonScriptTags, externCrIds) {
            var creativeId = '##ECRID##';
            var body_tag;
            var ad_tag;
            var nonScriptLenth = nonScriptTags.length;
            var scriptLenth = scriptTags.length;
            var tagToRender;
            var scriptTagToRender;

            if (document.getElementById('tetags_' + te_tags.ml_usec))
                body_tag = document.getElementById('tetags_' + te_tags.ml_usec);
            else
                body_tag = document.getElementsByTagName('body')[0] || document.body;

            ad_tag = document.getElementById('tead_' + te_tags.ml_usec);

            if (externCrIds[te_tags.crid]) {
                creativeId = externCrIds[te_tags.crid];
            }

            for (var i = 0; i < nonScriptLenth; i++) {
                if (window.location.protocol == 'https:') {
                    if (nonScriptTags[i].secureTag && nonScriptTags[i].secureTag != '') {
                        tagToRender = document.createElement('div');
                        tagToRender.innerHTML = te_tags.ReplaceTokens(nonScriptTags[i].secureTag, creativeId);
                    }
                }
                else {
                    tagToRender = document.createElement('div');
                    if (nonScriptTags[i].tag && nonScriptTags[i].tag != '')
                        tagToRender.innerHTML = te_tags.ReplaceTokens(nonScriptTags[i].tag, creativeId);
                    else if (nonScriptTags[i].secureTag && nonScriptTags[i].secureTag != '')
                        tagToRender.innerHTML = te_tags.ReplaceTokens(nonScriptTags[i].secureTag, creativeId);

                }
                if (nonScriptTags[i].isVisible == 'false') {
                    if (tagToRender && tagToRender.childNodes.length > 0) body_tag.appendChild(tagToRender);
                }
                else {
                    if (ad_tag && tagToRender && tagToRender.childNodes.length > 0) ad_tag.appendChild(tagToRender.childNodes[0]);
                }
            }

            //SCRIPTS
            for (var i = 0; i < scriptLenth; i++) {
                if (window.location.protocol == 'https:') {
                    if (scriptTags[i].secureTag && scriptTags[i].secureTag != '') {
                        scriptTagToRender = document.createElement('script');
                        scriptTagToRender.src = te_tags.ReplaceTokens(scriptTags[i].secureTag, creativeId);
                    }
                }
                else {
                    if (scriptTags[i].tag && scriptTags[i].tag != '') {
                        scriptTagToRender = document.createElement('script');
                        scriptTagToRender.src = te_tags.ReplaceTokens(scriptTags[i].tag, creativeId);
                    }
                }

                if (scriptTags[i].isVisible == 'false') {
                    if (scriptTagToRender && scriptTagToRender.src.length > 0) body_tag.appendChild(scriptTagToRender);
                }
                else {
                    if (ad_tag && scriptTagToRender && scriptTagToRender.src.length > 0) ad_tag.appendChild(scriptTagToRender);
                }
            }
        }
    };
}
