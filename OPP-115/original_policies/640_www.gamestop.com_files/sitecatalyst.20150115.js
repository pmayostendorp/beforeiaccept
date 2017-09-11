/* SiteCatalyst code version: H.22.1
Copyright 1996-2010 Adobe, Inc. All Rights Reserved
More info available at http://www.omniture.com */

/* GameStop Implementation Version 7.2 (2015-01-15) */

/* new object including SiteCatalyst-specific functions */
var _sc = (function ($) {
    function getDomains() {
        var servers = ['ebgames.ca', 'ebgames.com'],
			default_server = 'gamestop.com',
			host = document.location.hostname;
        for (var i = 0; i < servers.length; i++) {
            if (host.indexOf(servers[i]) > -1) {
                return { internal: servers[i], external: servers.splice(i, 1, default_server) };
            }
        }
        return { internal: default_server, external: servers };
    }

    function getEnv() {
        var default_rsid = 'gamestopsafety',
			host = document.location.hostname;

        var envs;
        if ((typeof envIsMobile !== 'undefined') && (envIsMobile == true)) {
            envs = [
                { domains: ['m.qa.ebgames.ca', 'm.qa.gamestop.ca'], rsid: 'gamestopcamobiledev' },
                { domains: ['m.ebgames.ca', 'm.gamestop.ca'], rsid: 'gamestopcamobileprod' },

                { domains: ['m.dev.gamestop.com', 'local.m.gamestop.com', 'local.login.gamestop.com', 'loginlocal.gamestop.com', 'logindev.gamestop.com'], rsid: 'gamestopmobiledev' },
                { domains: ['m.qa.gamestop.com', 'loginqa.gamestop.com'], rsid: 'gamestopmobileqa' },
                { domains: ['m.qa2.gamestop.com', 'loginqa2.gamestop.com'], rsid: 'gamestopmobileqa2' },
                { domains: ['m.qa3.gamestop.com', 'loginqa3.gamestop.com'], rsid: 'gamestopmobileqa3' },
                { domains: ['m.qa4.gamestop.com', 'loginqa4.gamestop.com'], rsid: 'gamestopmobileqa4' },
                { domains: ['m.qa5.gamestop.com', 'loginqa5.gamestop.com'], rsid: 'gamestopmobileqa5' },
                { domains: ['m.gamestop.com', 'login.gamestop.com'], rsid: 'gamestopmobileprod' },

                { domains: ['qa.ebgames.ca', 'qa.gamestop.ca'], rsid: 'gamestopcadev' },
                { domains: ['www.ebgames.ca', 'www.gamestop.ca'], rsid: 'gamestopcaprod' },

                { domains: ['dev.gamestop.com', 'local.gamestop.com', 'me.gamestop.com'], rsid: 'gamestopdev' },
                { domains: ['qa.gamestop.com'], rsid: 'gamestopqa1' },
                { domains: ['qa2.gamestop.com'], rsid: 'gamestopqa2' },
                { domains: ['qa3.gamestop.com'], rsid: 'gamestopqa3' },
                { domains: ['qa4.gamestop.com'], rsid: 'gamestopqa4' },
                { domains: ['qa5.gamestop.com'], rsid: 'gamestopqa5' },
                { domains: ['www.gamestop.com'], rsid: 'gamestopprod' },

                { domains: ['dev.ebgames.com'], rsid: 'gamestopebgdev' },
                { domains: ['qa.ebgames.com'], rsid: 'gamestopebgqa1' },
                { domains: ['qa2.ebgames.com'], rsid: 'gamestopebgqa2' },
                { domains: ['qa3.ebgames.com'], rsid: 'gamestopebgqa3' },
                { domains: ['www.ebgames.com'], rsid: 'gamestopebgprod' },

                { domains: ['impulsedriven.com', 'impulsedriven.net', 'impulsestore.gamestop.com'], rsid: 'gamestoppcdownloadprod' },
                { domains: ['www.gameinformer.com'], rsid: 'gamestopgiprod' }
            ];
        } else {
            envs = [
                { domains: ['m.qa.ebgames.ca', 'm.qa.gamestop.ca'], rsid: 'gamestopcamobiledev' },
                { domains: ['m.ebgames.ca', 'm.gamestop.ca'], rsid: 'gamestopcamobileprod' },

                { domains: ['m.dev.gamestop.com', 'local.m.gamestop.com'], rsid: 'gamestopmobiledev' },
                { domains: ['m.qa.gamestop.com'], rsid: 'gamestopmobileqa' },
                { domains: ['m.qa2.gamestop.com'], rsid: 'gamestopmobileqa2' },
                { domains: ['m.qa3.gamestop.com'], rsid: 'gamestopmobileqa3' },
                { domains: ['m.qa4.gamestop.com'], rsid: 'gamestopmobileqa4' },
                { domains: ['m.qa5.gamestop.com'], rsid: 'gamestopmobileqa5' },
                { domains: ['m.gamestop.com'], rsid: 'gamestopmobileprod' },

                { domains: ['qa.ebgames.ca', 'qa.gamestop.ca'], rsid: 'gamestopcadev' },
                { domains: ['www.ebgames.ca', 'www.gamestop.ca'], rsid: 'gamestopcaprod' },

                { domains: ['dev.gamestop.com', 'local.login.gamestop.com', 'loginlocal.gamestop.com', 'logindev.gamestop.com', 'local.gamestop.com', 'me.gamestop.com'], rsid: 'gamestopdev' },
                { domains: ['qa.gamestop.com', 'loginqa.gamestop.com'], rsid: 'gamestopqa1' },
                { domains: ['qa2.gamestop.com', 'loginqa2.gamestop.com'], rsid: 'gamestopqa2' },
                { domains: ['qa3.gamestop.com', 'loginqa3.gamestop.com'], rsid: 'gamestopqa3' },
                { domains: ['qa4.gamestop.com', 'loginqa4.gamestop.com'], rsid: 'gamestopqa4' },
                { domains: ['qa5.gamestop.com', 'loginqa5.gamestop.com'], rsid: 'gamestopqa5' },
                { domains: ['www.gamestop.com', 'login.gamestop.com'], rsid: 'gamestopprod' },

                { domains: ['dev.ebgames.com'], rsid: 'gamestopebgdev' },
                { domains: ['qa.ebgames.com'], rsid: 'gamestopebgqa1' },
                { domains: ['qa2.ebgames.com'], rsid: 'gamestopebgqa2' },
                { domains: ['qa3.ebgames.com'], rsid: 'gamestopebgqa3' },
                { domains: ['www.ebgames.com'], rsid: 'gamestopebgprod' },

                { domains: ['impulsedriven.com', 'impulsedriven.net', 'impulsestore.gamestop.com'], rsid: 'gamestoppcdownloadprod' },
                { domains: ['www.gameinformer.com'], rsid: 'gamestopgiprod' }
            ];
        }

        for (var i = 0; i < envs.length; i++) {
            for (var j = 0; j < envs[i].domains.length; j++) {
                if (host.indexOf(envs[i].domains[j]) > -1) {
                    return envs[i];
                }
            }
        }

        return { domains: [host], rsid: default_rsid };
    }

    function setupLinkTracking() {
        $(document).ready(function () {
            $(document).delegate('.addToCartTrackable', 'click', function (event) {
                var location = event.currentTarget.attributes["data-add"].value;
                if (location !== undefined) {
                    gs.c_w('v7', location.toLowerCase() + "|" + gs.pageName);
                }
            });

            $('.trackable').delegate('a, input[data-track], div[data-track]', 'click', function (e) {
                var $this = $(this),
					$parent = e.originalEvent ? $(e.originalEvent.currentTarget) : null,
					trackedValue = '',
					eVar = '';

                if ($this.attr('data-track')) {
                    trackedValue = $this.attr('data-track');
                } else if ($this.text() != '') {
                    trackedValue = $this.text();
                    trackedValue = trackedValue.replace(/[^\w\s\d\-]/g, '');
                } else {
                    trackedValue = $this.attr('href').replace(document.location.protocol + '//' + document.location.hostname, '');
                    if (!trackedValue) {
                        trackedValue = '/';
                    }
                }

                if ($parent) {
                    var navEls = ['header', 'search', 'nav', 'mininav', 'footer', 'minifooter', 'subfooter'];
                    trackedValue = $parent.attr('data-track') + '|' + trackedValue;

                    eVar = 'v3';
                    for (var i = 0; i < navEls.length; i++) {
                        if ($parent.attr('data-track').toLowerCase() == navEls[i] || $parent.attr('data-track').toLowerCase().indexOf('|sub-') > -1) {
                            eVar = 'v8';
                        }
                    }
                }

                if (eVar === 'v3') {
                    if (gs.prop1 == 'homepage' || gs.prop1 == 'storefront') {
                        trackedValue = gs.prop1 + '|' + (gs.eVar40 ? gs.eVar40 : gs.prop1) + '|' + trackedValue;
                    } else {
                        trackedValue = '';
                    }
                }

                // cookie
                if (trackedValue) {
                    gs.c_w(eVar, trackedValue.toLowerCase());
                }
            });
        });
    }

    setupLinkTracking();

    return {
        env: getEnv(),
        domains: getDomains()
    };
})(jQuery);

/* Specify the Report Suite ID(s) to track here */
var s_account = _sc.env.rsid;
var gs = s_gi(s_account);


/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Link Tracking Config */
gs.trackDownloadLinks = true;
gs.trackExternalLinks = true;
gs.trackInlineStats = true;
gs.linkDownloadFileTypes = 'exe,zip,wav,mp3,mov,mpg,avi,wmv,pdf,doc,docx,xls,xlsx,ppt,pptx';
gs.linkInternalFilters = 'javascript:,.ebgames.com,.gamestop.com,qa.gamestop.com,.gamestop.ca,.ebgames.ca,kongregate.com,gameinformer.com,testecom.pvt,joltonline.com,ebgames.com.au,gamestop.at,ebgames.ca,ebgames.sk,gamestop.fi,micromania.fr,gamestop.de,gamestop.ie,gamestop.it,ebgames.co.nz,ebgames.no,gamestop.pt,gamestop.es,ebgames.se,trymedia.com,m.gamestop.ca,m.ebgames.ca,m.qa.ebgames.ca,m.ebgames.com,m.qa.ebgames.com,m.gamestop.com,m.qa.gamestop.com,.impulsedriven.com,impulsedriven.net,cardinalcommerce.com,paypal.com,brightcove.com,bcove.me,brightcove.vo.llnwd.net,llnwd.net,edgefcs.net,edgesuite.net,akamaihd.net,analytics.edgekey.net';
gs.linkLeaveQueryString = false;
gs.linkTrackVars = 'None';
gs.linkTrackEvents = 'None';

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
gs.visitorNamespace = 'gamestop';
gs.dc = 122;
gs.trackingServer = "metrics." + _sc.domains.internal;
gs.trackingServerSecure = "s" + gs.trackingServer;

//Channels to be determined
gs._channelDomain = 'Social Media Organic|facebook.com,flickr.com,twitter.com,t.co,youtube.com,myspace.com,disqus.com,pinterest.com,tumblr.com,m.facebook.com,yelp.com,vk.com,m.youtube.com>Email|gamestop-email.com,brierleycrm.com,link.gamestop-email.com,gamestop-rfe.brierleyweb.net,brierleyweb.net>Gamestop Network|kongregate.com,gameinformer.com,testecom.pvt,poweruprewards.com,joltonline.com,ebgames.com.au,gamestop.at,ebgames.ca,ebgames.sk,gamestop.fi,micromania.fr,gamestop.de,gamestop.ie,gamestop.it,ebgames.co.nz,ebgames.no,gamestop.pt,gamestop.es,ebgames.se,trymedia.com,refunyourrefund.com,gamestop.eu,impulsedriven.com,login.ebgames.com,buymytronics.com,gamestop.co.uk,gamestop.se,gamestop.gr,gamestop.no,gamestop.ch>organic search|google.ca,duckduckgo.com,ask.com,home.mywebsearch.com,google.co.jp,search-results.com,bing.com,mysearchresults.com,google.dk,centurylink.net,twcc.com,google.co.ve,search.findwide.com,google.no,google.co.uk,google.co.kr,dogpile.com,maxwebsearch.com,google.se,google.fr,google.ae,google.nl,google.ch,google.fi,windowssearch.com,search-help.net,google.co.in,google.ru,google.ro,google.co.il,google.ch,google.co.th,google.pl,google.co.ve,google.hu,google.az,google.ht,google.mv,google.ge,google.mn,google.gr,search.tb.ask.com,answers.yahoo.com,google.pt,google.be,google.cz,google.hr,google.rs,google.it,www.google.lt,google.sk,google.bg,isearch.avg.com,google.co.za,google.cl,r.duckduckgo.com,google.de,google.si,google.es,plus.url.google.com,google.at,google.lv,google.ee,google.co.id,search.mywebsearch.com,search.genieo.com,google.ba,google.ie,google.iq,google.tt,us.yhs4.search.yahoo.com,storeportal.corp.fcfs.int,k9safesearch.com,local.yahoo.com,m.mgyahoo.com,m.yahoo.com,google.dz,google.jo,google.hn,mysearchresults.com,google.lk,google.bs,dogpile.com,google.co.cr,google.is,voices.yahoo.com,searchresults.verizon.com,google.md,google.by,google.ps,google.am,rss2search.com,acesse.com,about.com,google.tn,google.al,baidu.com,google.by,google.mu,google.as,google.me,google.cm,google.lu,google.gy,google.co.tz,google.co.mz,ask-tb.com,google.co.zm,google.co.zw,google.co.ke,google.sc,google.mg,google.sn,google.vg,google.gp,google.gl,google.cv,google.co.vi,google.bt,google.je';
gs._channelParameter = 'Paid Search|gclid,utm_medium,utm_source';
gs._channelPattern = 'Paid Search|ppc>Email|eml>Affiliate|afl>Feeds|fds>Banner|bnr,banner>Rich Media|rch>Social Media|soc>Re-targeting|rtg>Partner|pnr>GameStop Network|gsn';

/************************** PLUGIN CONFIG  **************************/
gs.usePlugins = true
function s_doPlugins(s) {
    gs.events = gs.events ? gs.events : '';

    // to expire cookies
    gs.expDate = new Date();
    gs.expDate.setDate(gs.expDate.getDate() - 1);

    if (!gs.pageLoaded) {
        gs.events = gs.apl(gs.events, 'event40', ',', 2);
        gs.eVar52 = '+1';
    }

    // Optimizely SiteCatalyst Integration
    window.optimizely = window.optimizely || [];
    window.optimizely.push(['activateSiteCatalyst', { "sVariable": gs }]);

    //Determine bounce rate for all visits
    gs.visitstart = gs.getVisitStart('s_vs');
    if (gs.visitstart && gs.visitstart == 1) {
        gs.prop2 = gs.pageName;
        gs.firstPage = 'firstpage';
    }
    gs.clickPast(gs.firstPage, 'event4', 'event5');

    /* Lowercase browse variables */
    if (gs.eVar4) gs.eVar4 = gs.eVar4.toLowerCase();

    /* Automate Search Keyword Variables and Events*/
    if (gs.prop4) {
        gs.prop4 = gs.cleanUrlData(gs.prop4.toLowerCase());
        var t_search = gs.getValOnce(gs.prop4, 'c4', 0);
        if (t_search) {
            gs.eVar2 = 'D=c4';

            /* Do not fire event1 & event2 if channel is tradecenter. 
              event15 & event16 are the equivalent and are server-side.*/
            if (gs.channel !== "tradecenter") {
                gs.events = gs.apl(gs.events, 'event1', ',', 2);
                if (gs.prop5 && (gs.prop5 == '0' || gs.prop5 == 'zero')) gs.events = gs.apl(gs.events, 'event2', ',', 2);
            }

            if (!gs.products) {
                gs.productNum = gs.getProductNum();
                gs.products = ';productsearch' + gs.productNum;
            }
        }
    }

    //Add prodView to Product Detail Pages if it's not there already
    if (gs.pageName && gs.pageName.indexOf('PDP:') > -1) gs.events = gs.apl(gs.events, 'prodView', ',', 2);

    /* Automate Custom ProdView Event */
    if (gs.events && gs.events.indexOf('prodView') > -1) gs.events = gs.apl(gs.events, 'event3', ',', 2);

    /*  Automate OrderID eVar */
    if (gs.purchaseID) gs.transactionID = gs.eVar17 = 'D=purchaseID';

    if (!gs.transactionID && gs.eVar51) gs.transactionID = 'D=v51';

    /* Search Location, Add-to-Cart Location and Percentage of Page Viewed via previous page name */
    if (gs.events && gs.events.indexOf('scAdd') > -1 && gs.eVar7 === undefined) {
        var previousLocation = gs.c_r('v7');
        if (previousLocation) {
            gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'eVar7', ',', 2);
            gs.eVar7 = previousLocation;
        }
    }

    gs.prop6 = gs.getPreviousValue(gs.pageName, 'gpv', '');
    if (gs.prop6) {
        var ppva = gs.getPercentPreviousPageViewed(gs.pageName);
        if (ppva.length > 2 && ppva[1] != 'undefined' && typeof (ppva[1]) != 'undefined' && ppva[2] != 'undefined' && typeof (ppva[2]) != 'undefined') {
            gs.prop7 = ppva[1] + '|' + ppva[2];
        } else {
            s.prop7 = 'No Data Available';
        }
    }

    /* Channel Manager + campaigns */
    if (!gs.pageLoaded) {
        /* Automate Campaign Tracking Code Extraction based on the cid parameter*/
        if (!gs.campaign) {
            gs.campaign = gs.getQueryParam('cid') || gs.getQueryParam('gclid') || gs.getQueryParam('utm_medium,utm_source', ': ');
        }

        gs._tempFilters = gs.linkInternalFilters;
        gs.linkInternalFilters = _sc.domains.internal;
        gs.channelManager('cid,gclid,utm_medium,utm_source', '', '0', '', 's_dl');
        if (gs._channel && gs._channel != 'n/a' && gs._channel.toLowerCase().replace(/^\s+|\s+$/g, '') != 'direct load') {
            gs._referringDomain = gs._referringDomain.replace('.mail.', '');
            gs._keywords = gs.cleanUrlData(gs._keywords);
            if (gs._channel.toLowerCase() == 'natural search' || (gs._channel == 'non-affiliated referrers' && gs._referringDomain.indexOf('www.google.com') > -1)) {
                gs._channel = 'organic search';
                if (!gs._partner || gs._partner == 'n/a') {
                    gs._partner = 'google';
                }
            }

            if (gs._channel == 'non-affiliated referrers') {
                if (gs._referringDomain.toLowerCase().indexOf('brierleycrm.com') > -1 || gs._referringDomain.toLowerCase().indexOf('gamestop-email.com') > -1) {
                    gs._channel = 'email';
                }
                else if (gs._referringDomain.toLowerCase().indexOf('cardinalcommerce.com') <= -1) {
                    gs._channel = 'external websites';
                }
            }

            if (gs._keywords != 'n/a') {
                gs.eVar43 = gs._keywords.toLowerCase();
            }

            if (!gs.campaign) {
                if (gs._partner != 'n/a') {
                    gs.campaign = gs._partner;
                } else if (gs._referringDomain != 'n/a' && gs._referringDomain.toLowerCase().indexOf('cardinalcommerce.com') <= -1) {
                    gs.campaign = gs._referringDomain;
                }
            }

            if (gs.campaign) {
                gs.eVar41 = gs._channel;
                gs.eVar61 = 'D=v41';
                gs.eVar45 = gs.crossVisitParticipation(gs.eVar41, 'v45', '30', '5', '>');
                gs.eVar46 = gs.crossVisitParticipation(gs.campaign, 'v46', '30', '5', '>', 'purchase', 0);
                gs.campaign = gs._channel + '|' + gs.campaign;
            }
        } else if (gs.campaign && !gs._channel) {
            gs.campaign = 'unknown|' + gs.campaign;
        }

        gs.campaign = gs.getValOnce(gs.campaign, 'v0', 0);
        gs.linkInternalFilters = gs._tempFilters;
    }

    // visit #
    gs.eVar20 = gs.getVisitNum();

    // days since last visit
    gs.eVar38 = gs.getDaysSinceLastVisit('v38');

    // storefront name
    if (gs.prop1 && gs.prop1.toLowerCase() == 'storefront') {
        gs.eVar40 = gs.pageName.replace(/storefront:\s*/gi, '');
        gs.events = gs.apl(gs.events, 'event85', ',', 2);

        if (!gs.products) {
            gs.productNum = gs.getProductNum();
            gs.products = ';storefront' + gs.productNum;
        }
    }

    gs.exitUrl = gs.linkHandler('', 'e');
    if (gs.exitUrl) {
        gs.eVar50 = gs.exitUrl;
        gs.events = gs.apl(gs.events, 'event72', ',', 2);
        gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'events,eVar50', ',', 2);
        gs.linkTrackEvents = gs.apl(gs.linkTrackEvents, 'event72', ',', 2);
    }

    // internal campaigns + navigation tracking
    if (!gs.pageLoaded || gs.linkType == 'e') {
        if (gs.c_r('v8')) {
            gs.eVar8 = gs.c_r('v8');
            gs.events = gs.apl(gs.events, 'event73', ',', 2);
            gs.c_w('v8', '', gs.expDate);

            if (!gs.products) {
                gs.productNum = gs.getProductNum();
                gs.products = ';navigation' + gs.productNum;
            }
        }
        if (gs.c_r('v3')) {
            gs.eVar3 = gs.c_r('v3');
            gs.events = gs.apl(gs.events, 'event57', ',', 2);
            gs.eVar24 = gs.crossVisitParticipation(gs.eVar3, 'v24', '30', '5', '>');
            gs.c_w('v3', '', gs.expDate);

            if (!gs.products) {
                gs.productNum = gs.getProductNum();
                gs.products = ';internalcampaign' + gs.productNum;
            }
        }

        if (gs.linkType == 'e') {
            gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'prop9', ',', 2);
            gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'eVar3', ',', 2);
            gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'eVar8', ',', 2);
            gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'eVar24', ',', 2);
            gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'events', ',', 2);
            gs.linkTrackEvents = gs.apl(gs.linkTrackEvents, 'event57,event73', ',', 2);
        }
    }

    /* Automate Finding Method eVar if not set*/
    if (!gs.eVar1) {
        if (gs.eVar41 && gs.eVar41.toLowerCase().indexOf('direct load') == -1) {
            gs.eVar1 = 'external channel: ' + gs.eVar41;
        } else if (gs.eVar2) {
            gs.eVar1 = 'internal keyword search';
        } else if (gs.eVar3) {
            gs.eVar1 = 'internal campaign';
        } else if (gs.eVar4 || gs.eVar8) {
            gs.eVar1 = 'browse';
        } else if (gs.eVar5) {
            gs.eVar1 = 'cross-sell';
            gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'eVar1,eVar2,eVar3,eVar4,eVar5,eVar6', ',', 2);
        } else if (gs.eVar17) {
            gs.eVar1 = 'unknown at time of purchase';
        } else if (gs.pageName.toLowerCase() == 'wish list') {
            gs.eVar1 = 'wish list';
        }
    }

    if (gs.eVar1) {
        if (!gs.eVar2) gs.eVar2 = gs.eVar33 = gs.eVar35 = gs.eVar36 = 'non-search';
        if (!gs.eVar3) gs.eVar3 = 'non-internal campaign';
        if (!gs.eVar4) gs.eVar4 = 'non-browse';
        if (!gs.eVar5) gs.eVar5 = 'non-cross sell';
    }

    if (gs.prop16 && gs.prop17) gs.prop23 = gs.prop16 + ' > ' + gs.prop17;
    if (gs.prop17 && gs.prop18) gs.prop24 = gs.prop17 + ' > ' + gs.prop18;

    /* Time to Complete Purchase */
    if (gs.firstPage == 'firstpage') gs.eVar31 = 'start';
    if (gs.events.indexOf('purchase') > -1) gs.eVar31 = 'stop';
    gs.eVar31 = gs.getTimeToComplete(gs.eVar31, 'ttcp', 1);

    /* Time to Complete Checkout */
    if (gs.events.indexOf('scCheckout') > -1) gs.eVar32 = 'start';
    if (gs.events.indexOf('purchase') > -1) gs.eVar32 = 'stop';
    gs.eVar32 = gs.getTimeToComplete(gs.eVar32, 'ttcc', 1);

    //time parting
    gs.prop27 = gs.getTimeParting('f', '-6');

    //Blank out products if events isn't set so that we don't inflate prodViews
    if (gs.products && !gs.events) gs.products = '';

    //wipe out cookie that makes merch binding work
    if (gs.c_r('productnum') && gs.events.indexOf('purchase') > -1) gs.c_w('productnum', '0', 0);

    gs.manageVars('lowercaseVars', 'events,prop13', 2);

    //setting version into eVar75
    gs.eVar75 = '20150115';

    //duplicate/set a few variable values
    gs.eVar12 = 'D=c12';
    gs.eVar13 = 'D=c13';
    gs.eVar14 = 'D=c1';
    gs.eVar15 = 'D=c15';
    gs.eVar21 = 'D=pageName';
    gs.eVar22 = 'D=c6';
    gs.eVar39 = 'D=c27';
    gs.prop3 = 'D=v3';
    gs.prop9 = 'D=v8';
    gs.prop75 = 'D=v75';

    //variables to pass on every request
    gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'prop6', ',', 2);
    gs.linkTrackVars = gs.apl(gs.linkTrackVars, 'prop7', ',', 2);

    gs.pageLoaded = true;
}
gs.doPlugins = s_doPlugins

/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
* Clean URL-encoded strings
*/
gs.cleanUrlData = function (val) {
    if (!val) {
        return '';
    }
    val = val.replace(/\+/g, " ");
    val = val.replace(/[',"]/g, "");
    val = val.replace(/\t/g, "");
    val = val.replace(/\n/g, "");
    val = val.toLowerCase();
    return val;
}

/*
* Get the current "fake" product number
*/
gs.getProductNum = function () {
    var gs = this, pn, e = new Date();
    if (!gs.c_r('pn')) pn = 1;
    else pn = parseInt(gs.c_r('pn')) + 1;
    e.setTime(e.getTime() + (30 * 86400000));
    gs.c_w('pn', pn, e);

    return pn;
}

/*
* Utility manageVars v0.2 - clear variable values (requires split 1.5)
*/
gs.manageVars = new Function("c", "l", "f", ""
+ "var s=this,vl,la,vla;l=l?l:'';f=f?f:1 ;if(!s[c])return false;vl='pa"
+ "geName,purchaseID,channel,server,pageType,campaign,state,zip,events"
+ ",products,transactionID';for(var n=1;n<76;n++){vl+=',prop'+n+',eVar"
+ "'+n+',hier'+n;}if(l&&(f==1||f==2)){if(f==1){vl=l;}if(f==2){la=s.spl"
+ "it(l,',');vla=s.split(vl,',');vl='';for(x in la){for(y in vla){if(l"
+ "a[x]==vla[y]){vla[y]='';}}}for(y in vla){vl+=vla[y]?','+vla[y]:'';}"
+ "}s.pt(vl,',',c,0);return true;}else if(l==''&&f==1){s.pt(vl,',',c,0"
+ ");return true;}else{return false;}");
gs.clearVars = new Function("t", "var s=this;s[t]='';");
gs.lowercaseVars = new Function("t", ""
+ "var s=this;if(s[t]){s[t]=s[t].toString();if(!s[t].indexOf('D=')==0)"
+ "{s[t]=s[t].toLowerCase();}}");

/*
* Plugin: getAndPersistValue 0.3 - get a value on every page
*/
gs.getAndPersistValue = new Function("v", "c", "e", ""
+ "var s=this,a=new Date;e=e?e:0;a.setTime(a.getTime()+e*86400000);if("
+ "v)s.c_w(c,v,e?a:0);return s.c_r(c);");

/*
* Plugin: getQueryParam 2.4
*/
gs.getQueryParam = new Function("p", "d", "u", "h", ""
+ "var s=this,v='',i,j,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.loca"
+ "tion);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0"
+ "?p.length:i;t=s.p_gpv(p.substring(0,i),u+'',h);if(t){t=t.indexOf('#"
+ "')>-1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substrin"
+ "g(i==p.length?i:i+1)}return v");
gs.p_gpv = new Function("k", "u", "h", ""
+ "var s=this,v='',q;j=h==1?'#':'?';i=u.indexOf(j);if(k&&i>-1){q=u.sub"
+ "string(i+1);v=s.pt(q,'&','p_gvf',k)}return v");
gs.p_gvf = new Function("t", "k", ""
+ "if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+ "rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+ "epa(v)}return''");

/*
* Plugin: getValOnce_v1.0
*/
gs.getValOnce = new Function("v", "c", "e", ""
+ "var s=this,a=new Date,v=v?v:v='',c=c?c:c='s_gvo',e=e?e:0,k=s.c_r(c"
+ ");if(v){a.setTime(a.getTime()+e*86400000);s.c_w(c,v,e?a:0);}return"
+ " v==k?'':v");

/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
gs.split = new Function("l", "d", ""
+ "var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+ "++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
* Plugin Utility: apl v1.1
*/
gs.apl = new Function("l", "v", "d", "u", ""
+ "var s=this,m=0;if(!l)l='';if(u){var i,n,a=s.split(l,d);for(i=0;i<a."
+ "length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+ "e()));}}if(!m)l=l?l+d+v:v;return l");

/*
* Function - read combined cookies v 0.4
*/
if (!gs.__ccucr) {
    gs.c_rr = gs.c_r;
    gs.__ccucr = true;
    function c_r(k) {
        var s = this, d = new Date, v = s.c_rr(k), c = s.c_rr('s_pers'), i, m, e;
        if (v) return v; k = s.ape(k); i = c.indexOf(' ' + k + '='); c = i < 0 ? s.c_rr('s_sess') : c;
        i = c.indexOf(' ' + k + '='); m = i < 0 ? i : c.indexOf('|', i); e = i < 0 ? i : c.indexOf(';', i);
        m = m > 0 ? m : e; v = i < 0 ? '' : s.epa(c.substring(i + 2 + k.length, m < 0 ? c.length : m));
        if (m > 0 && m != e) if (parseInt(c.substring(m + 1, e < 0 ? c.length : e)) < d.getTime())
        { d.setTime(d.getTime() - 60000); s.c_w(s.epa(k), '', d); v = ''; } return v;
    }
    gs.c_r = c_r;
}
/*
* Function - write combined cookies v 0.4
*/
if (!gs.__ccucw) {
    gs.c_wr = gs.c_w;
    gs.__ccucw = true;
    function c_w(k, v, e) {
        var s = this, d = new Date, ht = 0, pn = 's_pers', sn = 's_sess', pc = 0, sc = 0, pv, sv, c, i, t;
        d.setTime(d.getTime() - 60000); if (s.c_rr(k)) s.c_wr(k, '', d); k = s.ape(k);
        pv = s.c_rr(pn); i = pv.indexOf(' ' + k + '='); if (i > -1)
        { pv = pv.substring(0, i) + pv.substring(pv.indexOf(';', i) + 1); pc = 1; } sv = s.c_rr(sn);
        i = sv.indexOf(' ' + k + '='); if (i > -1) {
            sv = sv.substring(0, i) + sv.substring(sv.indexOf(';', i) + 1);
            sc = 1;
        } d = new Date; if (e) {
            if (e.getTime() > d.getTime()) {
                pv += ' ' + k + '=' + s.ape(v) + '|' + e.getTime() + ';';
                pc = 1;
            }
        } else {
            if (String(v).indexOf('%00') > -1) { v = s.repl(v, '%00', ''); } sv += ' ' + k + '=' + s.ape(v) + ';';
            sc = 1;
        } if (sc) s.c_wr(sn, sv, 0); if (pc) {
            t = pv; while (t && t.indexOf(';') != -1) {
                var t1 = parseInt(t.substring(t.indexOf('|') + 1, t.indexOf(';')));
                t = t.substring(t.indexOf(';') + 1); ht = ht < t1 ? t1 : ht;
            } d.setTime(ht); s.c_wr(pn, pv, d);
        }
        return v == s.c_r(s.epa(k));
    }
    gs.c_w = c_w;
}

/*
* Plugin: Days since last Visit 1.1 - capture time from last visit
*/
gs.getDaysSinceLastVisit = new Function("c", ""
+ "var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+ "ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+ "etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+ "2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+ "5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+ "s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+ "y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+ "){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+ "c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+ "_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+ "+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+ "n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+ "!=f5) return '';else return cval_s;");

/*
* Plugin: Visit Number By Month 2.0 - Return the user visit number 
*/
gs.getVisitNum = new Function(""
+ "var s=this,e=new Date(),cval,cvisit,ct=e.getTime(),c='s_vnum',c2='s"
+ "_invisit';e.setTime(ct+30*24*60*60*1000);cval=s.c_r(c);if(cval){var"
+ " i=cval.indexOf('&vn='),str=cval.substring(i+4,cval.length),k;}cvis"
+ "it=s.c_r(c2);if(cvisit){if(str){e.setTime(ct+30*60*1000);s.c_w(c2,'"
+ "true',e);return str;}else return 'unknown visit number';}else{if(st"
+ "r){str++;k=cval.substring(0,i);e.setTime(k);s.c_w(c,k+'&vn='+str,e)"
+ ";e.setTime(ct+30*60*1000);s.c_w(c2,'true',e);return str;}else{s.c_w"
+ "(c,ct+30*24*60*60*1000+'&vn=1',e);e.setTime(ct+30*60*1000);s.c_w(c2"
+ ",'true',e);return 1;}}"
);

/*
*	Plug-in: crossVisitParticipation v1.7 - stacks values from
*	specified variable in cookie and returns value
*/
gs.crossVisitParticipation = new Function("v", "cn", "ex", "ct", "dl", "ev", "dv", ""
+ "var s=this,ce;if(typeof(dv)==='undefined')dv=0;if(s.events&&ev){var"
+ " ay=s.split(ev,',');var ea=s.split(s.events,',');for(var u=0;u<ay.l"
+ "ength;u++){for(var x=0;x<ea.length;x++){if(ay[u]==ea[x]){ce=1;}}}}i"
+ "f(!v||v==''){if(ce){s.c_w(cn,'');return'';}else return'';}v=escape("
+ "v);var arry=new Array(),a=new Array(),c=s.c_r(cn),g=0,h=new Array()"
+ ";if(c&&c!=''){arry=s.split(c,'],[');for(q=0;q<arry.length;q++){z=ar"
+ "ry[q];z=s.repl(z,'[','');z=s.repl(z,']','');z=s.repl(z,\"'\",'');arry"
+ "[q]=s.split(z,',')}}var e=new Date();e.setFullYear(e.getFullYear()+"
+ "5);if(dv==0&&arry.length>0&&arry[arry.length-1][0]==v)arry[arry.len"
+ "gth-1]=[v,new Date().getTime()];else arry[arry.length]=[v,new Date("
+ ").getTime()];var start=arry.length-ct<0?0:arry.length-ct;var td=new"
+ " Date();for(var x=start;x<arry.length;x++){var diff=Math.round((td."
+ "getTime()-arry[x][1])/86400000);if(diff<ex){h[g]=unescape(arry[x][0"
+ "]);a[g]=[arry[x][0],arry[x][1]];g++;}}var data=s.join(a,{delim:',',"
+ "front:'[',back:']',wrap:\"'\"});s.c_w(cn,data,e);var r=s.join(h,{deli"
+ "m:dl});if(ce)s.c_w(cn,'');return r;");

/*
* s.join: 1.0 - s.join(v,p)
*  v - Array (may also be array of array)
*  p - formatting parameters (front, back, delim, wrap)
*/
gs.join = new Function("v", "p", ""
+ "var s=this;var f,b,d,w;if(p){f=p.front?p.front:'';b=p.back?p.back"
+ ":'';d=p.delim?p.delim:'';w=p.wrap?p.wrap:'';}var str='';for(var x=0"
+ ";x<v.length;x++){if(typeof(v[x])=='object' )str+=s.join( v[x],p);el"
+ "se str+=w+v[x]+w;if(x<v.length-1)str+=d;}return f+str+b;");

/*
* Plugin: linkHandler 0.x - identify and report custom links (modified)
*/
gs.linkHandler = new Function("p", "t", "r", "c", ""
+ "var s=this;var o=s.p_go(),h=o.href;var i,l;var n=p?'':t=='e'?'linkI"
+ "nternalFilters':t=='d'?'linkDownloadFileTypes':'';t=t?t:'o';if(!h||"
+ "(s.linkType&&(h||s.linkName)))return '';i=h.indexOf('?');h=s.linkLe"
+ "aveQueryString||i<0?h:h.substring(0,i);if(n){p=s.rep(s[n],',','|');"
+ "}l=s.pt(p,'|','p_gn',h.toLowerCase());if(l&&n!='linkInternalFilters"
+ "'||(!l&&n=='linkInternalFilters')){s.linkName=l=='[['?'':l;s.linkTy"
+ "pe=t;if(c){s.linkName=s.linkType=s.lnk=s.eo='';}return r?o:h;}retur"
+ "n '';");
gs.p_gn = new Function("t", "h", ""
+ "var i=t?t.indexOf('~'):-1,n,x;if(t&&h){n=i<0?'':t.substring(0,i);x="
+ "t.substring(i+1);if(h.indexOf(x.toLowerCase())>-1)return n?n:'[[';}"
+ "return 0;");
/*
* Utility Function: p_go
*/
gs.p_go = new Function(""
+ "var s=this;if(!s.eo&&!s.lnk)return '';var o=s.eo?s.eo:s.lnk;var y=s"
+ ".ot(o);var n=s.oid(o);var x=o.s_oidt;if(s.eo&&o==s.eo){while(o&&!n&"
+ "&y!='BODY'){o=o.parentElement?o.parentElement:o.parentNode;if(!o)re"
+ "turn '';y=s.ot(o);n=s.oid(o);x=o.s_oidt}}return o?o:'';");

/*
* Plugin: getTimeToComplete 0.4 - return the time from start to stop
*/
gs.getTimeToComplete = new Function("v", "cn", "e", ""
+ "var s=this,d=new Date,x=d,k;if(!s['ttc'+cn]){e=e?e:0;if(v=='start'||v=='"
+ "stop')s['ttc'+cn]=1;x.setTime(x.getTime()+e*86400000);if(v=='start'){s.c"
+ "_w(cn,d.getTime(),e?x:0);return '';}if(v=='stop'){k=s.c_r(cn);if(!s"
+ ".c_w(cn,'',d)||!k)return '';v=(d.getTime()-k)/1000;var td=86400,th="
+ "3600,tm=60,r=5,u,un;if(v>td){u=td;un='days';}else if(v>th){u=th;un="
+ "'hours';}else if(v>tm){r=2;u=tm;un='minutes';}else{r=.2;u=1;un='sec"
+ "onds';}v=v*r/u;return (Math.round(v)/r)+' '+un;}}return '';");

/*
* Plugin Utility: Replace v1.0
*/
gs.repl = new Function("x", "o", "n", ""
+ "var i=x.indexOf(o),l=n.length;while(x&&i>=0){x=x.substring(0,i)+n+x."
+ "substring(i+o.length);i=x.indexOf(o,i+l)}return x");

/*
* Plugin: getPreviousValue_v1.0 - return previous value of designated
*   variable (requires split utility)
*/
gs.getPreviousValue = new Function("v", "c", "el", ""
+ "var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+ "){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+ "){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+ ":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+ "s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");

gs.p_fo = new Function("n", ""
+ "var s=this;if(!s.__fo){s.__fo=new Object;}if(!s.__fo[n]){s.__fo[n]="
+ "new Object;return 1;}else {return 0;}");

/*
* channelManager v2.5 - Tracking External Traffic
*/
gs.channelManager = new Function("a", "b", "c", "d", "e", "f", ""
+ "var s=this,A,B,g,l,m,M,p,q,P,h,k,u,S,i,O,T,j,r,t,D,E,F,G,H,N,U,v=0,"
+ "X,Y,W,n=new Date;n.setTime(n.getTime()+1800000);if(e){v=1;if(s.c_r("
+ "e))v=0;if(!s.c_w(e,1,n))s.c_w(e,1,0);if(!s.c_r(e))v=0;}g=s.referrer"
+ "?s.referrer:document.referrer;g=g.toLowerCase();if(!g)h=1;i=g.index"
+ "Of('?')>-1?g.indexOf('?'):g.length;j=g.substring(0,i);k=s.linkInter"
+ "nalFilters.toLowerCase();k=s.split(k,',');for(m=0;m<k.length;m++){B"
+ "=j.indexOf(k[m])==-1?'':g;if(B)O=B;}if(!O&&!h){p=g;U=g.indexOf('//'"
+ ");q=U>-1?U+2:0;Y=g.indexOf('/',q);r=Y>-1?Y:i;u=t=g.substring(q,r).t"
+ "oLowerCase();P='non-affiliated referrers';S=s.seList+'>'+s._extraSea"
+ "rchEngines;if(d==1){j=s.repl(j,'oogle','%');j=s.repl(j,'ahoo','^');"
+ "g=s.repl(g,'as_q','*')}A=s.split(S,'>');for(i=0;i<A.length;i++){D=A"
+ "[i];D=s.split(D,'|');E=s.split(D[0],',');for(G=0;G<E.length;G++){H="
+ "j.indexOf(E[G]);if(H>-1){i=s.split(D[1],',');for(k=0;k<i.length;k++"
+ "){l=s.getQueryParam(i[k],'',g).toLowerCase();if(l){M=l;if(D[2])N=u="
+ "D[2];else N=t;if(d==1){N=s.repl(N,'#','-');g=s.repl(g,'*','as_q');N"
+ "=s.repl(N,'^','ahoo');N=s.repl(N,'%','oogle');}}}}}}}if(!O||f!='1')"
+ "{O=s.getQueryParam(a,b);if(O){u=O;if(M)P='Paid Search';else P='Unkn"
+ "own Paid Channel';}if(!O&&M){u=N;P='Natural Search';}}if(h==1&&!O&&"
+ "v==1)u=P=t=p='Direct Load';g=s._channelDomain;if(g){k=s.split("
+ "g,'>');;for(m=0;m<k.length;m++){q=s.split(k[m],'|');r=s.split(q[1],"
+ "',');S=r.length;for(T=0;T<S;T++){Y=r[T];Y=Y.toLowerCase();i=j.index"
+ "Of(Y);if(i>-1)P=q[0];}}}g=s._channelParameter;if(g){k=s.split(g,'>'"
+ ");h;for(m=0;m<k.length;m++){q=s.split(k[m],'|');r=s.split(q[1],',')"
+ ";S=r.length;for(T=0;T<S;T++){U=s.getQueryParam(r[T]);if(U)P=q[0];}}"
+ "}g=s._channelPattern;if(g){k=s.split(g,'>');for(m=0;m<k.length;m++)"
+ "{q=s.split(k[m],'|');r=s.split(q[1],',');S=r.length;for(T=0;T<S;T++"
+ "){Y=r[T];Y=Y.toLowerCase();i=O.toLowerCase();H=i.indexOf(Y);if(H==0"
+ ")P=q[0];}}}X=P+M+t;c=c?c:'c_m';if(c!='0')X=s.getValOnce(X,c,0);if(X"
+ "){s._referrer=p?p:'n/a';s._referringDomain=t?t:'n/a';s._partner=N?N"
+ ":'n/a';s._campaignID=O?O:'n/a';s._campaign=u?u:'n/a';s._keywords=M?"
+ "M:'n/a';s._channel=P?P:'n/a';}");
/* Top 130 - Grouped */
gs.seList = "altavista.co,altavista.de|q,r|AltaVista>.aol.,suche.aolsvc"
+ ".de|q,query|AOL>ask.jp,ask.co|q,ask|Ask>www.baidu.com|wd|Baidu>daum"
+ ".net,search.daum.net|q|Daum>google.,googlesyndication.com|q,as_q|Go"
+ "ogle>icqit.com|q|icq>bing.com|q|Microsoft Bing>myway.com|searchfor|"
+ "MyWay.com>naver.com,search.naver.com|query|Naver>netscape.com|query"
+ ",search|Netscape Search>reference.com|q|Reference.com>seznam|w|Sezn"
+ "am.cz>abcsok.no|q|Startsiden>tiscali.it,www.tiscali.co.uk|key,query"
+ "|Tiscali>virgilio.it|qs|Virgilio>yahoo.com,yahoo.co.jp|p,va|Yahoo!>"
+ "yandex|text|Yandex.ru>search.cnn.com|query|CNN Web Search>search.ea"
+ "rthlink.net|q|Earthlink Search>search.comcast.net|q|Comcast Search>"
+ "search.rr.com|qs|RoadRunner Search>optimum.net|q|Optimum Search";

/*
* Plugin: getTimeParting 3.1
*/
gs.getTimeParting = new Function("t", "z", "y", "l", ""
+ "var s=this,d,A,B,C,D,U,W,X,Y,Z;d=new Date();A=d.getFullYear();if(A="
+ "='2011'){B='13';C='06'}if(A=='2012'){B='11';C='04'}if(A=='2013'){B="
+ "'10';C='03'}if(A=='2014'){B='09';C='02'}if(A=='2015'){B='08';C='01'"
+ "}if(A=='2016'){B='13';C='06'}if(A=='2017'){B='12';C='05'}if(!B||!C)"
+ "{B='08';C='01'}B='03/'+B+'/'+A;C='11/'+C+'/'+A;D=new Date('1/1/2000"
+ "');if(D.getDay()!=6||D.getMonth()!=0){return'Data Not Available'}el"
+ "se{z=z?z:'0';z=parseFloat(z);B=new Date(B);C=new Date(C);W=new Date"
+ "();if(W>B&&W<C&&l!='0'){z=z+1}W=W.getTime()+(W.getTimezoneOffset()*"
+ "60000);W=new Date(W+(3600000*z));X=['Sunday','Monday','Tuesday','We"
+ "dnesday','Thursday','Friday','Saturday'];B=W.getHours();C=W.getMinu"
+ "tes();if(C<10){C='0'+C};D=W.getDay();Z=X[D];U='AM';A='Weekday';X='0"
+ "0';if(C>30){X='30'}if(B>=12){U='PM';B=B-12};if(B==0){B=12};if(D==6|"
+ "|D==0){A='Weekend'}W=B+':'+X+U;if(y&&y!=Y){return'Data Not Availabl"
+ "e'}else{if(t){if(t=='h'){return W}if(t=='m'){return B+':'+C+' '+U}i"
+ "f(t=='d'){return Z}if(t=='w'){return A}if(t=='f'){return B+':'+C+' "
+ "'+U+' - '+Z}}else{return Z+', '+W}}}");

/*
* Plugin: getPercentPreviousPageViewed v1.5
*/
gs.handlePPVevents = new Function("", ""
+ "var s=s_c_il[" + gs._in + "];if(!s.getPPVid)return;var dh=Math.max(Math."
+ "max(s.d.body.scrollHeight,s.d.documentElement.scrollHeight),Math.ma"
+ "x(s.d.body.offsetHeight,s.d.documentElement.offsetHeight),Math.max("
+ "s.d.body.clientHeight,s.d.documentElement.clientHeight)),vph=s.wd.i"
+ "nnerHeight||(s.d.documentElement.clientHeight||s.d.body.clientHeigh"
+ "t),st=s.wd.pageYOffset||(s.wd.document.documentElement.scrollTop||s"
+ ".wd.document.body.scrollTop),vh=st+vph,pv=Math.min(Math.round(vh/dh"
+ "*100),100),c=s.c_r('s_ppv'),a=(c.indexOf(',')>-1)?c.split(',',4):[]"
+ ",id=(a.length>0)?(a[0]):escape(s.getPPVid),cv=(a.length>1)?parseInt"
+ "(a[1]):(0),p0=(a.length>2)?parseInt(a[2]):(pv),cy=(a.length>3)?pars"
+ "eInt(a[3]):(0),cn=(pv>0)?(id+','+((pv>cv)?pv:cv)+','+p0+','+((vh>cy"
+ ")?vh:cy)):'';s.c_w('s_ppv',cn);");
gs.getPercentPreviousPageViewed = new Function("pid", ""
+ "pid=pid?pid:'-';var s=this,ist=!s.getPPVid?true:false;if(typeof(s.l"
+ "inkType)!='undefined'&&s.linkType!='e')return'';var v=s.c_r('s_ppv'"
+ "),a=(v.indexOf(',')>-1)?v.split(',',4):[];if(a.length<4){for(var i="
+ "3;i>0;i--){a[i]=(i<a.length)?(a[i-1]):('');}a[0]='';}a[0]=unescape("
+ "a[0]);s.getPPVpid=pid;s.c_w('s_ppv',escape(pid));if(ist){s.getPPVid"
+ "=(pid)?(pid):(s.pageName?s.pageName:document.location.href);s.c_w('"
+ "s_ppv',escape(s.getPPVid));if(s.wd.addEventListener){s.wd.addEventL"
+ "istener('load',s.handlePPVevents,false);s.wd.addEventListener('scro"
+ "ll',s.handlePPVevents,false);s.wd.addEventListener('resize',s.handl"
+ "ePPVevents,false);}else if(s.wd.attachEvent){s.wd.attachEvent('onlo"
+ "ad',s.handlePPVevents);s.wd.attachEvent('onscroll',s.handlePPVevent"
+ "s);s.wd.attachEvent('onresize',s.handlePPVevents);}}return(pid!='-'"
+ ")?(a):(a[1]);");

/*
* Plugin: getVisitStart v2.0 - returns 1 on first page of visit
* otherwise 0
*/
gs.getVisitStart = new Function("c", ""
+ "var s=this,v=1,t=new Date;t.setTime(t.getTime()+1800000);if(s.c_r(c"
+ ")){v=0}if(!s.c_w(c,1,t)){s.c_w(c,1,0)}if(!s.c_r(c)){v=0}return v;");

/*                                                                  
* Plugin: clickPast - version 1.0
*/
gs.clickPast = new Function("scp", "ct_ev", "cp_ev", "cpc", ""
+ "var s=this,scp,ct_ev,cp_ev,cpc,ev,tct;if(s.p_fo(ct_ev)==1){if(!cpc)"
+ "{cpc='s_cpc';}ev=s.events?s.events+',':'';if(scp){s.events=ev+ct_ev"
+ ";s.c_w(cpc,1,0);}else{if(s.c_r(cpc)>=1){s.events=ev+cp_ev;s.c_w(cpc"
+ ",0,0);}}}");

/* Module: Integrate */
gs.m_Integrate_c = "var m=gs.m_i('Integrate');m.add=function(n,o){var m=this,p;if(!o)o='s_Integrate_'+n;if(!gs.wd[o])gs.wd[o]=new Object;m[n]=new Object;p=m[n];p._n=n;p._m=m;p._c=0;p._d=0;p.disable=0;p.get"
+ "=m.get;p.delay=m.delay;p.ready=m.ready;p.beacon=m.beacon;p.script=m.script;m.l[m.l.length]=n};m._g=function(t){var m=this,s=m.s,i,p,f=(t?'use':'set')+'Vars',tcf;for(i=0;i<m.l.length;i++){p=m[m.l[i]"
+ "];if(p&&!p.disable&&p[f]){if(gs.apv>=5&&(!gs.isopera||gs.apv>=7)){tcf=new Function('s','p','f','var e;try{p[f](s,p)}catch(e){}');tcf(s,p,f)}else p[f](s,p)}}};m._t=function(){this._g(1)};m._fu=function"
+ "(p,u){var m=this,s=m.s,x,v,tm=new Date;if(u.toLowerCase().substring(0,4) != 'http')u='http://'+u;if(gs.ssl)u=gs.rep(u,'http:','https:');p.RAND=Math&&Math.random?Math.floor(Math.random()*1000000000000"
+ "0):tm.getTime();p.RAND+=Math.floor(tm.getTime()/10800000)%10;for(x in p)if(x&&x.substring(0,1)!='_'&&(!Object||!Object.prototype||!Object.prototype[x])){v=''+p[x];if(v==p[x]||parseFloat(v)==p[x])u="
+ "gs.rep(u,'['+x+']',gs.rep(escape(v),'+','%2B'))}return u};m.get=function(u,v){var p=this,m=p._m;if(!p.disable){if(!v)v='s_'+m._in+'_Integrate_'+p._n+'_get_'+p._c;p._c++;p.VAR=v;p._d++;m.s.loadModule("
+ "'Integrate:'+v,m._fu(p,u),0,1,p._n)}};m.delay=function(){var p=this;if(p._d<=0)p._d=1};m.ready=function(){var p=this,m=p._m;p._d=0;if(!p.disable)m.s.dlt()};m._d=function(){var m=this,i,p;for(i=0;i<"
+ "m.l.length;i++){p=m[m.l[i]];if(p&&!p.disable&&p._d>0)return 1}return 0};m._x=function(d,n){var p=this[n],x;if(!p.disable){for(x in d)if(x&&(!Object||!Object.prototype||!Object.prototype[x]))p[x]=d["
+ "x];p._d--}};m.beacon=function(u){var p=this,m=p._m,s=m.s,imn='s_i_'+m._in+'_Integrate_'+p._n+'_'+p._c,im;if(!p.disable&&gs.d.images&&gs.apv>=3&&(!gs.isopera||gs.apv>=7)&&(gs.ns6<0||gs.apv>=6.1)){p._c++;i"
+ "m=gs.wd[imn]=new Image;im.src=m._fu(p,u)}};m.script=function(u){var p=this,m=p._m;if(!p.disable)m.s.loadModule(0,m._fu(p,u),0,1)};m.l=new Array;if(m.onLoad)m.onLoad(s,m)";
gs.m_i("Integrate");

/* Configure Modules and Plugins */

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code = '', s_objectID; function s_gi(un, pg, ss) {
    var c = "s.version='H.24.1';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+ "\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+ "n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+ "<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+ "pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+ ".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+ "%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+ "{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+ "ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+ "=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+ " s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+ "fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+ "s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+ "rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+ "pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+ "(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+ "=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+ "_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+ "x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+ "r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+ "oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+ "s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+ "('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+ "ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+ "ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+ "=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+ "(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+ ".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+ "s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+ "(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+ "me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+ "=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+ "=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+ "e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+ "=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+ "bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+ "){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+ "0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+ "dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+ "v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+ "lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+ "!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+ "){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+ "if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+ "e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL"
+ "'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+ "erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+ ".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+ "cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+ "e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+ " if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+ "='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+ "'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+ "b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+ "):'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h."
+ "indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if("
+ "s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';r"
+ "eturn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],"
+ "f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e"
+ "){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&"
+ "&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/"
+ "':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INP"
+ "UT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick"
+ ";if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='IN"
+ "PUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o."
+ "s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q="
+ "'&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=funct"
+ "ion(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=fun"
+ "ction(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object"
+ ".prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}re"
+ "turn s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick"
+ ":\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){i"
+ "f(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s."
+ "visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%1000"
+ "0>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring"
+ "(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)"
+ "m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s"
+ "=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl"
+ ")s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_"
+ "i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l"
+ "[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+"
+ "\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);e"
+ "lse s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i]"
+ ";if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&"
+ "&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o."
+ "e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}i"
+ "f((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\""
+ "'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)"
+ "/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o."
+ "defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o"
+ ".n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;f"
+ "or(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va"
+ "_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!"
+ "s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){va"
+ "r s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk="
+ "1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1"
+ "900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_l"
+ "l();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.s"
+ "etUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){"
+ "}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.in"
+ "nerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.of"
+ "fsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('"
+ "s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if("
+ "p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;"
+ "s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s."
+ "_1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.pa"
+ "rentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if"
+ "(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'"
+ "?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');"
+ "x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){i"
+ "f(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq"
+ "(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code"
+ "};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightInc"
+ "rementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){s.voa(t);if(t.lmq)for(i=0;i<"
+ "t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype"
+ "[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].a"
+ "pply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLowerCase().indexOf('https')>=0);s.d=document;s.b=s.d.b"
+ "ody;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.ind"
+ "exOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf("
+ "'Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));els"
+ "e s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.s"
+ "a(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,pageName,pa"
+ "geURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightProfileID,lightStoreForSeconds,lightIncrementBy';s."
+ "vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contextData,lightProfileID,lightStoreForSeconds,lightInc"
+ "rementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<="
+ "3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,browserWidth,browserHeight,connectionType,homepage"
+ ",plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disableBufferedRequests,mobile,visitorSampling,visitor"
+ "SamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilters,li"
+ "nkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.contextData=new Object;s.retrieveLightData=new Object;"
+ "if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w = window, l = w.s_c_il, n = navigator, u = n.userAgent, v = n.appVersion, e = v.indexOf('MSIE '), m = u.indexOf('Netscape6/'), a, i, j, x, s; if (un) { un = un.toLowerCase(); if (l) for (j = 0; j < 2; j++) for (i = 0; i < l.length; i++) { s = l[i]; x = s._c; if ((!x || x == 's_c' || (j > 0 && x == 's_l')) && (s.oun == un || (s.fs && s.sa && s.fs(s.oun, un)))) { if (s.sa) s.sa(un); if (x == 's_c') return s } else s = 0 } } w.s_an = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    w.s_sp = new Function("x", "d", "var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+ "ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
    w.s_jn = new Function("a", "d", "var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
    w.s_rep = new Function("x", "o", "n", "return s_jn(s_sp(x,o),n)");
    w.s_d = new Function("x", "var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+ "=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+ "x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
    w.s_fe = new Function("c", "return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
    w.s_fa = new Function("f", "var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+ "a");
    w.s_ft = new Function("c", "c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+ "f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+ "'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
    c = s_d(c); if (e > 0) { a = parseInt(i = v.substring(e + 5)); if (a > 3) a = parseFloat(i) } else if (m > 0) a = parseFloat(u.substring(m + 10)); else a = parseFloat(v); if (a < 5 || v.indexOf('Opera') >= 0 || u.indexOf('Opera') >= 0) c = s_ft(c); if (!s) { s = new Object; if (!w.s_c_in) { w.s_c_il = new Array; w.s_c_in = 0 } s._il = w.s_c_il; s._in = w.s_c_in; s._il[s._in] = s; w.s_c_in++; } s._c = 's_c'; (new Function("s", "un", "pg", "ss", c))(s, un, pg, ss); return s
}
function s_giqf() { var w = window, q = w.s_giq, i, t, s; if (q) for (i = 0; i < q.length; i++) { t = q[i]; s = s_gi(t.oun); s.sa(t.un); s.setTagContainer(t.tagContainerName) } w.s_giq = 0 } s_giqf()
