var queryly = {};
(function(j) {
    queryly = {
        jquery: j,
        QUERYLYID: '.queryly',
        QUERYLYSCOLLBARID: '#queryly_scrollbar',
        QUERYLYRESULTID: '#queryly_result',
        QUERYLYSUGGESTID: '.queryly_suggest',
        QUERYLYTEMPLATE: '#queryly_template',
        QUERYLYHEADER: '#queryly_header',
        QUERYLYFOOTER: '#queryly_footer',
        QUERYLYHISTORY: '#queryly_history',
        QUERYLYSEARCHINBOUND: '.queryly_searchinbound',
        customContainer: null,
        QuerylyKey: '',
        browserVersion: (navigator.appVersion.indexOf("MSIE") != -1) ? queryly.browserVersion = parseFloat(navigator.appVersion.split("MSIE")[1]) : 999,
        timer: null,
        visitorID: 0,
        guess: '',
        currentSuggest: '',
        category: 'N/A',
        categoryID: 0,
        currentQuery: '',
        previousQuery: '',
        waitForReturn: false,
        isDraft: false,
        templateID: 0,
        hasLoaded: 0,
        initialized: 0,
        endIndex: 0,
        url: document.location.href,
        left: 0,
        top: 0,
        height: 0,
        width: 0,
        totalWidth: 0,
        total: 0,
        hasGoogleAnalytics: false,
        ieTop: 0,
        ieLeft: 0,
        isIPad: (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/Android/i) != null || navigator.userAgent.match(/iPhone/i) != null),
        isAndroid : (navigator.userAgent.match(/Android/i) != null),
        welcomeMessage: '',
        ads: {},
        related: {},
        relatedContainer: null,
        relateddata: null,
        lastItemIndex: 0,
        mouseOnAd: false,
        lastScrollTop: 0,
        extendedDataFields: '',
        currentItemIndex: 0,
        enableScrolling: true,
        enableHistory: false,
        enableInbound: true,
        abTest: 0,
        batchSize: 10,
        relatedBatchSize: 4,
        isPhone: false,
        feedNames: '',
        searchReferrer: '',
        placeholders: [],
        unseenads: [],

        initalize: function() {

        },

        doSearch: function(searchterm) {
            queryly.util.resetState();
            j(queryly.QUERYLYID).val(searchterm);
            queryly.timer = setTimeout("queryly.search(0);", 300);
        },

        search: function(scrollSearch, history_endIndex, history_off, history_scrollbartop) {

            if (queryly.isIPad) {
                try {
                    j(queryly.QUERYLYRESULTID).swipe({ swipeStatus: queryly.iPad.resultSwipe });

                }
                catch (e) { }
            }

            if (queryly.enableInbound) {
                j(queryly.QUERYLYSEARCHINBOUND).hide();
            }

            queryly.util.setPositionInfo();
            this.currentQuery = j(queryly.QUERYLYID).val();
            if (scrollSearch == 0) {
                this.endIndex = 0;
            }
            if (j('#queryly_inner', queryly.QUERYLYRESULTID).length != 0) {
                j('#queryly_inner', queryly.QUERYLYRESULTID).css('top', '0px');
            }
            var lastchar = this.currentQuery.charAt(this.currentQuery.length - 1);
            if (lastchar == ' ') {
                if (j(queryly.QUERYLYSUGGESTID).length > 0) {
                    j(queryly.QUERYLYSUGGESTID).val('');
                }
            }

            //            var batchsize = '';
            //            if (history_endIndex != undefined) {
            //                batchsize = '&batchsize=' + history_endIndex;
            //            }
            //            else {
            //                batchsize = '&batchsize=' + queryly.batchSize;
            //            }

            var apiurl = 'http://api.queryly.com/search.aspx?query=' + encodeURIComponent(this.currentQuery) + '&queryly_key=' + this.QuerylyKey + '&initialized=' + this.initialized + '&hasLoaded=' + this.hasLoaded + '&scrollsearch=' + scrollSearch + '&isphone=' + queryly.isPhone + '&queryly_abtest=' + queryly.abTest + '&batchsize=' + queryly.batchSize + '&endindex=' + this.endIndex + '&width=' + this.width + '&totalwidth=' + this.totalWidth + '&left=' + this.left + '&top=' + this.top + '&height=' + this.height + '&isdraft=' + this.isDraft + '&templateid=' + this.templateID + '&url=' + encodeURIComponent(queryly.url.replace(/&amp;/g, "&")) + '&extendeddatafields=' + this.extendedDataFields + '&feednames=' + queryly.feedNames + '&random=' + Math.random();
            j.getScript(apiurl, function(data, textStatus, jqxhr) {
                queryly.waitForReturn = false;
                if (history_endIndex != undefined && history_off != null && history_scrollbartop != null) {
                    j('#queryly_inner', queryly.QUERYLYRESULTID).css('top', history_off + 'px');
                    queryly.scrollbar.updateScrollbar(history_scrollbartop);
                    j(queryly.QUERYLYHISTORY).hide();
                }
            });


        },

        handlePageScroll: function(e) {

            if (queryly.mouseOnAd) {
                var st = j(document).scrollTop();
                if (st > 0) {
                    queryly.scrollPage(1);
                }
                else if (st < 0) {
                    queryly.scrollPage(-1);
                }
                queryly.lastScrollTop = st;
            }
        },

        //        handleKeyScroll: function(event) {
        //            if (queryly.enableScrolling) {
        //                switch (event.keyCode) {
        //                    case 38: event.preventDefault(); queryly.scrollPage(1); break;
        //                    case 40: event.preventDefault(); queryly.scrollPage(-1); break;
        //                }
        //            }
        //        },


        handleSearchScroll: function(e) {
            var delta = 0;
            if (!e.originalEvent) /* For IE. */
                event = window.event;
            if (e.originalEvent.wheelDelta) { /* IE/Opera. */
                delta = e.originalEvent.wheelDelta / 120;

            } else if (e.originalEvent.detail) { /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                * Also, delta is multiple of 3.
                */
                delta = -e.originalEvent.detail / 3;
            }

            if (delta > 0) {
                delta = 0.6;
            }
            else if (delta < 0) {
                delta = -0.6;
            }

            if (navigator.platform == 'MacIntel' && navigator.appVersion.indexOf('AppleWebKit') >= 0) {
                delta = delta / 3;
            }

            if (e.originalEvent.preventDefault) {
                e.originalEvent.preventDefault();
            }

            e.originalEvent.returnValue = false;
            if (delta != 0) {
                queryly.scrollPage(delta);
            }
        },

        scrollPage: function(delta) {

            var outheight = j(queryly.QUERYLYRESULTID).height();
            var top = j('#queryly_inner', queryly.QUERYLYRESULTID).position().top;
            var off = j('#queryly_inner', queryly.QUERYLYRESULTID).position().top + (delta * 100);
            //var totalheight = j('.inner').height();
            var totalheight = queryly.render.table[1][0];
            if (off > 0) {
                off = 0;
            }
            else if (totalheight + off < outheight) {
                if (this.endIndex >= this.total) {
                    //off = outheight - totalheight;
                    //off = 0;
                    //return;
                    if (queryly.render.min <= -(top - outheight)) {

                        try {
                            j('#queryly_logo', queryly.QUERYLYRESULTID).show();
                        }
                        catch (e) { }
                        //return;
                    }

                }
                else {
                    if (!this.waitForReturn) {
                        this.waitForReturn = true;
                        try {

                            queryly.search(1);
                        }
                        catch (ex) { this.waitForReturn = false; }
                    }
                }
            }
            else {
                j('#queryly_logo', queryly.QUERYLYRESULTID).hide();
            }
            j('#queryly_inner').css('top', off + 'px');

            var scrollbaroffset = off * outheight / totalheight;
            var scrollbartop = -scrollbaroffset + queryly.layout.headerHeight + queryly.layout.padding;
            queryly.scrollbar.updateScrollbar(scrollbartop);
            queryly.history.addHistory(queryly.endIndex, off, scrollbartop);

            if (queryly.browserVersion < 9) {
                j(queryly.QUERYLYRESULTID).blur();
                j(queryly.QUERYLYRESULTID).focus();
            }

            queryly.trackad(off, outheight);

        },

        trackad: function(off, outheight) {
            try {
                for (var i = 0; i < queryly.unseenads.length; i++) {
                    if (!queryly.unseenads[i].isseen) {
                        var range = queryly.unseenads[i].top + off;
                        if (range > -20 && range < outheight) {
                            queryly.unseenads[i].isseen = true;                            
                            //new Image().src = "http://ad.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&allocationid=" + queryly.unseenads[i].id + "&pageurl=" + encodeURIComponent(queryly.unseenads[i].url.replace(/&amp;/g, "&"));
                            new Image().src = "http://ad.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&allocationid=" + queryly.unseenads[i].id + "&pageurl=";
                        }
                    }
                }
            }
            catch (e) { }
        },

        track: function() {
            if (this.currentQueryly == '') {
                return;
            }
            if ((this.guess != '' && this.guess != this.currentSuggest) || this.total == 0) {
                try {
                    var trackurl = "http://www.queryly.com/track.aspx?queryly_key=" + this.QuerylyKey + "&visitorid=" + this.visitorID + "&query=" + escape(this.currentQuery) + "&suggest=" + escape(this.guess) + "&category=" + this.categoryID + "&total=" + this.total + "&target=&source=" + encodeURIComponent(this.url.replace(/&amp;/g, "&"));
                    new Image().src = trackurl;

                    if (queryly.hasGoogleAnalytics && _gaq) {
                        _gaq.push(['_trackEvent', queryly.category, queryly.util.getFullSuggestion(), '', 0]);
                    }

                }
                catch (e) { }
                queryly.currentSuggest = queryly.guess;
            }
        },

        QuerylyBind: function(classid) {
            if (classid != undefined && classid != '' && classid != null){
                queryly.QUERYLYID = classid;
            }
            queryly.searchReferrer = document.referrer;
            queryly.visitorID = queryly.util.getVisitorID();
            var pageurl = document.URL;
            try {
                if (queryly.newsalert.docurl != '') {
                    pageurl = queryly.newsalert.docurl;
                }
            }
            catch (e) { }
        
       
            var apiurl = 'http://api.queryly.com/search.aspx?queryly_key=' + this.QuerylyKey + '&initialized=0&visitorid=' + queryly.visitorID + '&isdraft=' + queryly.isDraft + '&isphone=' + queryly.isPhone + '&templateid=' + queryly.templateID + '&relatedbatchsize=' + queryly.relatedBatchSize + '&random=' + Math.random() + '&visitoremail=' + encodeURIComponent(queryly.util.getVisitorEmail()) + '&pageurl=' + encodeURIComponent(pageurl);
            var querylydemo = queryly.util.getUrlParameter('querylydemo');
            if (querylydemo != null && querylydemo != ''){
                apiurl = apiurl + '&querylydemo=' + querylydemo;
            }
            j.getScript(apiurl, function(data, textStatus, jqxhr) {
            });
            //queryly.util.resetState();

             if (j(queryly.QUERYLYID).length == 0){
                return;
            }

            j(document).ready(function() {
                queryly.render.showWelcome();
            });

            var isab = queryly.util.getUrlParameter('queryly');
            if (isab == "1") {
                queryly.util.setCookie('queryly_abtest', '1', 7);
                queryly.abTest = 1;
            }
            else {
                if (queryly.util.getCookie('queryly_abtest') == '1') {
                    queryly.abTest = 1;
                }
            }

            j(queryly.QUERYLYID).attr('autocomplete', 'off');

            j(queryly.QUERYLYID).keyup(function(event) {
                switch (event.keyCode) {
                    case 37: return;
                    case 38: return;
                    case 39: return;
                    case 40: return;
                }

                clearTimeout(queryly.timer);
                queryly.waitForReturn = false;

                queryly.currentQuery = j(queryly.QUERYLYID).val();
                j(queryly.QUERYLYHISTORY).hide();
                if (queryly.currentQuery == '') {
                    queryly.util.resetState();

                }
                else {
                    var fsuggest = queryly.util.getFullSuggestion().toLowerCase();
                    if (fsuggest == '' || fsuggest.indexOf(queryly.currentQuery.toLowerCase()) != 0) {
                        queryly.currentItemIndex = 0;
                        queryly.timer = setTimeout("queryly.search(0);", 300);
                        queryly.render.hideWelcome();
                    }

                }
                //queryly.visitorID = queryly.util.getVisitorID();
            });

            j(queryly.QUERYLYID).keydown(function(e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode == 9) {
                    e.preventDefault();
                    queryly.util.autoFillSuggestion();
                }
                else if (keyCode == 32) {
                    queryly.guess = "";
                }
            });

            j(queryly.QUERYLYID).keydown(function(event) {
                if (queryly.enableScrolling) {
                    switch (event.keyCode) {
                        case 38: queryly.scrollPage(1); break;
                        case 40: queryly.scrollPage(-1); break;
                    }
                }
            });



            j(window).scroll(function() { queryly.render.reposition() });
            j(window).resize(function() { queryly.render.reposition() });

            if (queryly.isPhone) {
                j(window).bind('orientationchange', queryly.render.reposition());
            }

            if (this.isIPad) {
                queryly.util.iPadSupport();
            }



            //handle ie 8 differently
            if (queryly.browserVersion > 7) {
                j(queryly.QUERYLYID).click(function(event) {
                    if (queryly.enableHistory) {
                        if (j(queryly.QUERYLYID).val() == '') {
                            queryly.history.showHistoryControl();
                        }
                        else {
                            j(queryly.QUERYLYHISTORY).hide();
                        }
                    }
                });
            }
        }
    };

    queryly.layout = {
        padding: 8,
        itemspacing: 8,
        width: 300,
        height: 500,
        topMargin: 0,
        rightMargin: 0,
        leftMargin: 0,
        headerHeight: 0
    };


    queryly.native ={
        docurl: ''
    };
    
    queryly.inline = {
        visibleID : 0,
        docurl: '',
        renderLink : function(entity,contentdiv,url){
            try{
            var rgx = new RegExp('\\b(' + entity.word.replace('"','') + ')\\b', 'i');
//            if (entity.id == 0)
//            {
//                entity.id = entity.word.replace(/\W/g, '');
//            }
            $(contentdiv).contents().filter(function () {
                return this.nodeType === 3;
            }).each(function () {
                if ($('#queryly_entity_' + entity.id).length == 0) {
                    if ($(this).text().match(rgx) != null){
                        var newhtml = $(this).text().replace(rgx, '<span class="queryly_entity_link" id="queryly_entity_' + entity.id + '"  onclick="queryly.inline.toggle(\'' + entity.id + '\');return false;" >$1</span><span id="queryly_entity_end_' + entity.id + '" ></span>');
                        $(this).replaceWith(newhtml);
                    }
                }
            });

            if ($('#queryly_entity_' + entity.id).length == 0) {
                return;
            }

            var height = $('#queryly_entity_end_' + entity.id).position().top;
            rgx = new RegExp('(\\s)', 'gm');
            var count = 0;
            var matchcount = -1;
            var lastspan = null;

            $('#queryly_entity_' + entity.id).parent().contents().filter(function () {
                return this.nodeType === 3;
            }).each(function () {

                $(this).replaceWith($(this).text().replace(rgx, '<span class="queryly_linebreak_' + entity.id + '">$1</span>'));

            });
            $('#queryly_entity_' + entity.id).parent().append('<span class="queryly_linebreak_' + entity.id + '"> </span>');

            $('.queryly_linebreak_' + entity.id).each(function (index, value) {
                var h = $(this).position().top;
                if (h == height) {
                    lastspan = $(this);
                }
            });

            if (lastspan != null) {
                $(lastspan).css("display", "none");
                //$(lastspan).css("height", "50px");
                //$(lastspan).css("background", "gray");
                $(lastspan).html(' ');
                $(lastspan).attr('id', 'queryly_entity_panel_' + entity.id);
                $(lastspan).after(' ');
            }

            $('.queryly_linebreak_' + entity.id).each(function () {
                if ($(this).attr("id") != 'queryly_entity_panel_' + entity.id) {
                    $(this).replaceWith(' ');
                }

            });
            }
            catch (e) { }
        },

        toggle : function(id){
            if (queryly.inline.visibleID != 0 && queryly.inline.visibleID != id){
                $('#queryly_entity_panel_' + queryly.inline.visibleID).hide();
            }
             var lastspan = $('#queryly_entity_panel_' + id);
             $(lastspan).slideToggle(function () {
            });

            if ($(lastspan).is(":visible")) {
                $(lastspan).css("display", "block");
                queryly.inline.visibleID = id;
                
            }

            if ($('.queryly_entity_results',lastspan).length == 0){
                queryly.inline.search(id);
            }

        },

        search: function(id){
            var query = $('#queryly_entity_' + id).text();
            var url = "http://api.queryly.com/json.aspx?queryly_key=" + queryly.QuerylyKey + "&query=" + encodeURIComponent(query) + "&endindex=0&batchsize=4&isphrase=0&callback=queryly.QuerylyInlineCallback";

            //making the search call to Queryly server
            $.getScript(url, function(data, textStatus, jqxhr) {
            });
        }
    };

    queryly.related = {
        decay:1,
        fromTop:100,
        batchSize: 6,
        container:null,
        processing: false,
        feedscope: false,
        feednames:'',
        docurl:'',

        hookRelatedEvent: function(link) {
            link.mousedown(function() {
                try {
                    if (queryly.related.docurl == ''){
                        queryly.related.docurl = document.URL;
                    }
                    new Image().src = "http://www.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&related=1&pageurl=" + encodeURIComponent(queryly.related.docurl.replace(/&amp;/g, "&")) + "&relatedurl=" + encodeURIComponent(this.href.replace(/&amp;/g, "&"));
                }
                catch (e) { }
            });
        },

        loadAPI : function(){

            if (!queryly.related.processing){
                queryly.related.processing = true;
                if (queryly.related.docurl == ''){
                    queryly.related.docurl = document.URL;
                }
                var relatedurl = 'http://related.queryly.com/json.aspx?queryly_key=' + queryly.QuerylyKey + '&callback=queryly.QuerylyRelatedCallback' + '&pageurl=' + encodeURIComponent(queryly.related.docurl) + '&batchsize=' + queryly.related.batchSize + '&decay=' + queryly.related.decay;
                if (queryly.related.feedscope){
                    relatedurl = relatedurl + "&feedscope=1";
                }
                if (queryly.related.feednames != ''){
                    relatedurl = relatedurl + '&feednames=' + encodeURIComponent(queryly.related.feednames)
                }

                j.getScript(relatedurl, function (data, textStatus, jqxhr) {
                });
            }                        
            
        }
    };

    queryly.newsalert = {
        connectstatus: '',
        topics: [],
        docurl: '',

        subscribeSend: function (email,isfacebook,firstname,lastname,facebookid) {       
           
            var topicvalues = queryly.newsalert.topics.join('|');
            var subscribeurl = 'http://api.queryly.com/control.aspx?call=subscribenewsalert&queryly_key=' + queryly.QuerylyKey + '&email=' + encodeURIComponent(email) + '&facebook=' + isfacebook + '&topics=' + encodeURIComponent(topicvalues) + '&link=' + encodeURIComponent(queryly.newsalert.docurl) + '&firstname=' + encodeURIComponent(firstname) + '&lastname=' + encodeURIComponent(lastname) + '&facebookid=' + facebookid;
            j.getScript(subscribeurl, function (data, textStatus, jqxhr) {
                queryly.util.setCookie('queryly_newsalert_email', email);
                queryly.newsalert.subscribeComplete();
            });
        },

        subscribeComplete: function(){
            queryly.jquery('#queryly_alert_panel').html('<a href="http://www.onegazette.com/setting" target="_blank" style="margin-right:16px;float:right;color:#d85932;">Edit Alerts</a><div style="display:inline-block">Successfully subscribed.</div>');
        },

        askForEmail: function (showFBLogin) {
            queryly.newsalert.topics = [];
            queryly.jquery('input[type="checkbox"]', '#queryly_alert_panel').each(function (index, value) {
                if (queryly.jquery(value).is(':checked')) {
                    var eid = 0;
                    var topic = queryly.jquery(value).parent().text();
                    if (queryly.jquery(value).attr('eid') !== undefined){
                        eid = queryly.jquery(value).attr('eid');
                    }
                    queryly.newsalert.topics.push (eid + "," + topic);                    
                }

            });

            if (queryly.newsalert.topics.length == 0) {
                alert("Please subscribe at least one topic");
                return;
            }

            var existingemail = '';
            if (queryly.util.getCookie('queryly_newsalert_email') != null) {
                existingemail = queryly.util.getCookie('queryly_newsalert_email');
            }

            if (typeof FB != 'undefined' && (typeof showFBLogin == 'undefined' || showFBLogin ==true )) {
                FB.getLoginStatus(function (response) {
                    queryly.newsalert.connectstatus = response.status;
                    if (queryly.newsalert.connectstatus == 'connected') {
                        queryly.jquery('#querylynewsalertbutton').html('<div>Please wait...</div>');
                        queryly.newsalert.getFacebookEmail();
                    }
                    else {
                        queryly.jquery('#queryly_alert_panel').html('<table style="width:100%"><tr><td style="width:50%;" align=right><input id="queryly_newsalert_email" style="font-size:15px;padding:5px;padding-top:3px;width:95%;max-width:200px" type="text" value="' + existingemail + '" placeholder="Enter email address"></td><td style="width:0px;"><a onclick="queryly.newsalert.getEmailAddress();return false;" href="#" style="margin-left:10px;margin-right:0px;float:none;" class="button">Save</a></td><td width="0px"><span style="margin:8px;">OR</span></td><td style="width:40%" align=left><a href="#" onclick="queryly.newsalert.getFacebookEmail();return false" style="margin-left:0px;margin-right:0px;" class="button" >Via Facebook Login</a></div></td></tr><table>');
                    }
                });
            }
            else {
                
                queryly.jquery('#queryly_alert_panel').html('<table style="width:100%"><tr><td style="width:50%;" align=right><input id="queryly_newsalert_email" style="font-size:15px;padding:5px;padding-top:3px;width:95%;max-width:200px" type="text" value="' + existingemail + '" placeholder="Enter email address"></td><td style="width:0px;"><a onclick="queryly.newsalert.getEmailAddress();return false;" href="#" style="margin-left:10px;margin-right:0px;float:none;" class="button">Save</a></td></tr><table>');
            }

            
        },

        clickTopic: function (link){
            if (j(link).hasClass('querylyalertselected')){
                j(link).attr('class','querylyalertunselected');
//                if (queryly.newsalert.topics.indexOf(j(link).text()) >= 0){
//                    queryly.newsalert.topics.splice(queryly.newsalert.topics.indexOf(j(link).text()),1);
//                }
            }
            else if (j(link).hasClass('querylyalertunselected')){
                j(link).attr('class','querylyalertselected');
//                if (queryly.newsalert.topics.indexOf(j(link).text()) < 0){
//                    queryly.newsalert.topics.push(j(link).text());
//                }

            }
        },

        getFacebookEmail: function () {
            if (queryly.newsalert.connectstatus == 'connected') {
                FB.api('/me', { fields: 'email,last_name,first_name' }, function (response) {
                    if (response.email != undefined){
                        queryly.newsalert.subscribeSend(response.email, 1, response.first_name, response.last_name, response.id);
                    }
                });
            }
            else {

                FB.login(function (response) {
                    FB.api('/me', { fields: 'email,last_name,first_name' }, function (response) {
                        if (response.email != undefined){
                            queryly.newsalert.subscribeSend(response.email, 1, response.first_name, response.last_name, response.id);
                        }
                    });
                }, { scope: 'email' });
            }
        },

        getEmailAddress: function () {
            if (!queryly.util.checkEmail(queryly.jquery('#queryly_newsalert_email'), 'Please enter a valid email.')) {
                return;
            }
            var email = queryly.jquery('#queryly_newsalert_email').val();
            queryly.newsalert.subscribeSend(email,0)
        }
    };
       

    queryly.storyline = {
        container:null,
        loaded: false,
        processing: false,
        docurl:'',

        hookStorylineEvent: function(link) {
            link.mousedown(function() {
                try {
                    if (queryly.storyline.docurl == ''){
                        queryly.storyline.docurl = document.URL;
                    }
                    new Image().src = "http://www.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&storyline=1&visitorid=" + queryly.util.getVisitorID() + "&storyline=1&pageurl=" + encodeURIComponent(queryly.storyline.docurl.replace(/&amp;/g, "&")) + "&storylineurl=" + encodeURIComponent(this.href.replace(/&amp;/g, "&"));
                }
                catch (e) { }
            });
        },

        loadAPI : function(){

            if (!queryly.storyline.processing){
                queryly.storyline.processing = true;
                if (queryly.storyline.docurl == ''){
                    queryly.storyline.docurl = document.URL;
                }
                var storylineurl = 'http://related.queryly.com/json.aspx?queryly_key=' + queryly.QuerylyKey + '&storyline=1&callback=queryly.QuerylyStorylineCallback' + '&batchsize=8&pageurl=' + encodeURIComponent(queryly.storyline.docurl);
                j.getScript(storylineurl, function (data, textStatus, jqxhr) {
                    queryly.storyline.loaded = true;
                });
            }                        
            
        }
    };

    queryly.campaign ={
        hookCampaignEvent: function(link,allocationid,adtype,adid) {
            link.mousedown(function() {
                try {
                    new Image().src = "http://ad.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&ad=1&clicked=1&allocationid=" + allocationid + "&adtype=" + adtype + "&adid=" + adid + "&pageurl=" + encodeURIComponent(document.URL.replace(/&amp;/g, "&"));
                }
                catch (e) { }
            });
        }
    };

    queryly.ui = {};
    queryly.data = {};

    queryly.storage = {
        enabled: true,

        addData: function(key, value) {
            localStorage.setItem(key, value);
        },
        getData: function(key) {
            return localStorage.getItem(key);
        },

        clearData: function() {
            localStorage.clear();
        }
    };

    queryly.inbound = {
        showSearchInboundControl: function(text) {
            if (!queryly.enableInbound || text == '') {
                return;
            }
            if (j(queryly.QUERYLYSEARCHINBOUND).length == 0) {
                var qly = j(queryly.QUERYLYID);
                var inboundhtml = '<div class="queryly_searchinbound" style="display:none;position:fixed;top:' + (qly.outerHeight() + qly.offset().top) + 'px;left: ' + (qly.offset().left - 6) + 'px;" ><div class="queryly_searchinbound_panel">' + text + '</div></div>';
                j(queryly.QUERYLYID).after(inboundhtml);
            }
            j(queryly.QUERYLYSEARCHINBOUND).show('slow');

        }
    };
    queryly.history = {
        addHistory: function(endIndex, off, scrollbartop) {
            if (!queryly.enableHistory || queryly.total == 0) {
                return;
            }

            var q = queryly.util.getFullSuggestion();
            if (q == '' && j(queryly.QUERYLYID).val() != '') {
                q = j.trim(j(queryly.QUERYLYID).val());
            }
            if (q == '') {
                return;
            }
            var historydata = queryly.storage.getData("queryly_history");
            if (historydata == null || historydata == '') {
                historylist = new Array();
            }
            else {
                historylist = JSON.parse(historydata);

                var found = false;
                for (var i = 0; i < historylist.length; i++) {
                    var history = historylist[i];
                    if (history.query == q) {
                        history.endIndex = endIndex;
                        history.off = off;
                        history.scrollbartop = scrollbartop
                        if (i != 0) {
                            historylist.splice(i, 1);
                            historylist.unshift(history);
                        }
                        found = true;
                        break;
                    }

                }

                if (!found) {
                    var history = new Object();
                    history.query = q;
                    history.endIndex = endIndex;
                    history.off = off;
                    history.scrollbartop = scrollbartop;
                    historylist.unshift(history);
                }

            }
            queryly.storage.addData("queryly_history", JSON.stringify(historylist));
        },



        showHistoryControl: function() {
            if (!queryly.enableHistory) {
                return;
            }
            if (j(queryly.QUERYLYHISTORY).length == 0) {
                var qly = j(queryly.QUERYLYID);
                //var controlstyle = '<style>.queryly_history_arrow_box {	position: relative;	background: #ddd;} .queryly_history_arrow_box:after {	bottom: 100%;	border: solid transparent;	content: " ";	height: 0;	width: 0;	position: absolute;	pointer-events: none;} .queryly_history_arrow_box:after {	border-color: rgba(136, 183, 213, 0);	border-bottom-color: #ddd;	border-width: 4px;	left: 5%;	margin-left: -5px;}</style>';
                //var historyhtml = controlstyle + '<div id="queryly_history" style="display:none;font-size:12px;box-shadow:0px 3px 6px #aaa;position:fixed;top:' + (qly.outerHeight() + qly.offset().top) + 'px;width:260px;padding: 6px;color:black;left: ' + (qly.offset().left - 6) + 'px;text-align: left;" class="queryly_history_arrow_box"><div id="queryly_history_panel" style="overflow:hidden;height:20px;white-space:normal;"><div class="queryly_history_setting" style="float:right;height:20px;width:20px;text-align:center;vertical-align:middel;background:#999;color:white;font-size:16px;"><a href="#" style="text-decoration:none;" onclick="queryly.history.showHistorySetting();return false;"><b>...</b></a></div><div id="queryly_history_query" style="overflow:hidden;position:relative;line-height:18px"></div><div style="border-top:1px solid #eee;padding:4px;margin-top:6px;"><input type="button" value="Clear History" onclick="queryly.storage.clearData();queryly.jquery(queryly.QUERYLYHISTORY).hide();" style="float:right;"></div></div></div>';
                var historyhtml = '<div class="queryly_history" id="queryly_history" style="display:none;position:fixed;top:' + (qly.outerHeight() + qly.offset().top) + 'px;left: ' + (qly.offset().left - 6) + 'px;text-align: left;"><div class="queryly_history_panel" id="queryly_history_panel" style="overflow:hidden"><div class="queryly_history_setting"><a href="#" style="text-decoration:none;" onclick="queryly.history.showHistorySetting();return false;"><b>...</b></a></div><div class="queryly_history_query" id="queryly_history_query" style="overflow:hidden;position:relative;"></div><div style="border-top:1px solid #eee;padding:4px;margin-top:6px;"><input type="button" value="Clear History" onclick="queryly.storage.clearData();queryly.jquery(queryly.QUERYLYHISTORY).hide();" style="float:right;"></div></div></div>';
                j(queryly.QUERYLYID).after(historyhtml);
            }

            var historydata = queryly.storage.getData("queryly_history");
            if (historydata != null && historydata != '') {
                var historyhtml = 'continue with: ';
                var historylist = JSON.parse(historydata);
                if (historylist != null && historylist.length > 0) {
                    for (var i = 0; i < historylist.length; i++) {
                        try {
                            var comma = ', ';
                            if (i == historylist.length - 1) {
                                comma = '';
                            }
                            historyhtml = historyhtml + '<a onclick="queryly.history.showHistory(\'' + historylist[i].query + '\');return false;" href="#" style="display:inline;margin-left:3px;">' + historylist[i].query + comma + '</a>';
                        }
                        catch (e) { alert(e) }
                    }
                    j('#queryly_history_query', queryly.QUERYLYHISTORY).html(historyhtml);
                    if (queryly.enableInbound && j(queryly.QUERYLYSEARCHINBOUND).length > 0) {
                        j(queryly.QUERYLYSEARCHINBOUND).hide();
                    }
                }
                //j('#queryly_history_panel').css('height', '20px');
                j('.queryly_history_panel').css('overflow', 'hidden');
                j(queryly.QUERYLYHISTORY).show();
            }
        },

        showHistorySetting: function() {


            if (j('.queryly_history_panel').css('overflow') == 'hidden') {
                j('.queryly_history_panel').css('overflow', '');
            }
            else {
                j('.queryly_history_panel').css('overflow', 'hidden');
            }
        },

        showHistory: function(q) {
            if (!queryly.enableHistory) {
                return;
            }
            var historydata = queryly.storage.getData("queryly_history");
            if (historydata != null && historydata != '') {
                var historylist = JSON.parse(historydata);
                var history = null;
                for (var i = 0; i < historylist.length; i++) {
                    if (historylist[i].query == q) {
                        history = historylist[i];
                        break;
                    }
                }
                if (history != null) {
                    j(queryly.QUERYLYID).val(history.query);
                    queryly.search(0, history.endIndex, history.off, history.scrollbartop);
                }
            }

        }
    };


    queryly.scrollbar = {
        html: '<div style="background-color: rgb(0, 0, 0); width: 10px; position: absolute; top: 0px; opacity: 0.4; z-index: 100000; right: 0px; height: 60px; display: none;" id="queryly_scrollbar"></div>',
        show: false,
        startX: 0,
        startY: 0,
        offsetX: 0,
        offsetY: 0,
        oldZIndex: 5,
        oldX: 0,
        dragElement: null,



        initDragDrop: function() {
            document.onmousedown = queryly.scrollbar.onMouseDown;
            document.onmouseup = queryly.scrollbar.onMouseUp;

        },

        initPosition: function() {
            j(queryly.QUERYLYSCOLLBARID).css('top', queryly.layout.headerHeight + queryly.layout.padding + 'px');
            j(queryly.QUERYLYSCOLLBARID).show('slow');
            queryly.scrollbar.oldX = queryly.layout.headerHeight + queryly.layout.padding;

        },

        updateScrollbar: function(scrollbartop) {
            j(queryly.QUERYLYSCOLLBARID).css('top', scrollbartop + 'px');
            queryly.scrollbar.oldX = scrollbartop;
        },

        onMouseDown: function(e) {
            // IE is retarded and doesn't pass the event object
            if (e == null)
                e = window.event;

            // IE uses srcElement, others use target
            var target = e.target != null ? e.target : e.srcElement;



            // for IE, left click == 1
            // for Firefox, left click == 0
            if ((e.button == 1 && window.event != null ||
            e.button == 0) &&
            target.id == 'queryly_scrollbar') {
                // grab the mouse position
                queryly.scrollbar.startX = e.clientX;
                queryly.scrollbar.startY = e.clientY;

                // grab the clicked element's position
                //offsetX = queryly.scrollbar.extractNumber(target.style.left);
                queryly.scrollbar.offsetY = queryly.scrollbar.extractNumber(target.style.top);

                // bring the clicked element to the front while it is being dragged
                queryly.scrollbar.oldZIndex = target.style.zIndex;
                target.style.zIndex = 10000;

                // we need to access the element in OnMouseMove
                queryly.scrollbar.dragElement = target;

                // tell our code to start moving the element with the mouse
                document.onmousemove = queryly.scrollbar.onMouseMove;

                // cancel out any text selections
                document.body.focus();

                // prevent text selection in IE
                document.onselectstart = function() { return false; };
                // prevent IE from trying to drag an image
                target.ondragstart = function() { return false; };

                // prevent text selection (except IE)
                return false;
            }
        },

        onMouseMove: function(e) {
            if (e == null)
                var e = window.event;

            // this is the actual "drag code"
            //dragElement.style.left = (_offsetX + e.clientX - _startX) + 'px';
            var newtop = queryly.scrollbar.offsetY + e.clientY - queryly.scrollbar.startY;
            var maxtop = j(queryly.QUERYLYRESULTID).height() - j(queryly.QUERYLYSCOLLBARID).height();

            if (newtop >= maxtop) {

                j(queryly.QUERYLYSCOLLBARID).css('top', maxtop + 'px');
            }
            else {
                j(queryly.QUERYLYSCOLLBARID).css('top', newtop + 'px');
            }

        },

        onMouseUp: function(e) {
            if (queryly.scrollbar.dragElement != null) {
                queryly.scrollbar.dragElement.style.zIndex = queryly.scrollbar.oldZIndex;

                // we're done with these events until the next OnMouseDown
                document.onmousemove = null;
                document.onselectstart = null;
                queryly.scrollbar.dragElement.ondragstart = null;

                var newtop = j(queryly.QUERYLYSCOLLBARID).position().top;
                var delta = ((newtop - queryly.scrollbar.oldX) / j(queryly.QUERYLYRESULTID).height()) * queryly.render.table[1][0];

                // this is how we know we're not dragging
                queryly.scrollbar.dragElement = null;
                queryly.scrollbar.oldX = newtop;

                queryly.scrollPage(-delta / 100)
            }
        },

        extractNumber: function(value) {
            var n = parseInt(value);
            return n == null || isNaN(n) ? 0 : n;
        }

    };


    queryly.render = {
        cache: {},
        table: new Array(2),
        min: 0,
        index: 0,
        remainderWidth: 0,
        inner: null,

        initialize: function() {
            this.table = new Array(2);
            this.table[0] = new Array();
            this.table[1] = new Array();
            this.min = queryly.layout.headerHeight;
            this.index = 0;
            this.remainderWidth = queryly.layout.width - queryly.layout.padding * 2;
            for (var i = 0; i < this.remainderWidth; i++) {
                this.table[0][i] = 0;
                this.table[1][i] = queryly.layout.padding + this.min;
            }
            this.inner = j('#queryly_inner', queryly.QUERYLYRESULTID);
        },

        hide: function() {
            //j(queryly.QUERYLYRESULTID).hide();
            queryly.util.resetState();
        },

        hideWelcome: function() {
            if (queryly.welcomeMessage != '') {
                queryly.util.setCookie('newtoqueryly', '0');
                j('#queryly_welcome').remove();
            }
        },

        showWelcome: function() {
            if (queryly.welcomeMessage != '') {
                var isnew = queryly.util.getCookie('newtoqueryly');
                if (isnew == null || isnew == '') {
                    j(queryly.QUERYLYID).after('<div class="queryly_welcome" id="queryly_welcome" style=\'position:fixed;z-index:99998;display:none\'></div>');
                    var welcomePanel = j('#queryly_welcome');
                    welcomePanel.html(queryly.welcomeMessage);

                    queryly.util.setPositionInfo();
                    var scrolltop = j(window).scrollTop();
                    var scrollleft = j(window).scrollLeft();


                    if ((queryly.totalWidth / 2) < queryly.left) {
                        welcomePanel.css('right', (queryly.totalWidth - queryly.left - queryly.width - 20 + queryly.layout.rightMargin + scrollleft) + 'px')

                    }
                    else {
                        welcomePanel.css('left', queryly.left - scrollleft + queryly.layout.leftMargin + 'px');
                    }

                    welcomePanel.css('top', queryly.top + queryly.height - scrolltop + 10 + queryly.layout.topMargin + 'px');
                    welcomePanel.toggle('slow');
                }
            }
        },

        reposition: function() {
            if (queryly.customContainer != null && j('#' + queryly.customContainer).length == 1 && j('#' + queryly.customContainer).attr('reposition') != '1') {
                return;
            }
            queryly.util.setPositionInfo();
            var scrolltop = j(window).scrollTop();
            var scrollleft = j(window).scrollLeft();
            j(queryly.QUERYLYSUGGESTID).css('left', j(queryly.QUERYLYID).position().left + queryly.ieLeft + 'px');
            j(queryly.QUERYLYSUGGESTID).css('top', j(queryly.QUERYLYID).position().top + queryly.ieTop + 'px');


            if (!queryly.isPhone) {
                if (j(queryly.QUERYLYRESULTID).length > 0) {
                    if ((queryly.totalWidth / 2) < queryly.left || queryly.left == 0) {
                        j(queryly.QUERYLYRESULTID).css('right', (queryly.totalWidth - queryly.left - queryly.width - 20 + queryly.layout.rightMargin + scrollleft) + 'px')

                    }
                    else {
                        j(queryly.QUERYLYRESULTID).css('left', queryly.left - scrollleft + queryly.layout.leftMargin + 'px');
                    }
                    j(queryly.QUERYLYRESULTID).css('top', queryly.top + queryly.height - scrolltop + 10 + queryly.layout.topMargin + 'px');
                }
            }
            else {

                j(queryly.QUERYLYRESULTID).css('top', queryly.top + queryly.height - scrolltop + 10 + queryly.layout.topMargin + 'px');
                j(queryly.QUERYLYRESULTID).css('left', queryly.left - scrollleft + queryly.layout.leftMargin + 'px');
            }


//            if (queryly.enableHistory && j(queryly.QUERYLYHISTORY).length > 0) {
//                var qly = j(queryly.QUERYLYID);
//                j(queryly.QUERYLYHISTORY).css('left', (queryly.left - scrollleft - 6) + 'px');
//                j(queryly.QUERYLYHISTORY).css('top', (queryly.top + qly.outerHeight() - scrolltop) + 'px');
//            }

//            if (queryly.enableInbound && j(queryly.QUERYLYSEARCHINBOUND).length > 0) {
//                var qly = j(queryly.QUERYLYID);
//                j(queryly.QUERYLYSEARCHINBOUND).css('left', (queryly.left - scrollleft - 6) + 'px');
//                j(queryly.QUERYLYSEARCHINBOUND).css('top', (queryly.top + qly.outerHeight() - scrolltop) + 'px');
//            }




//            if (queryly.welcomeMessage != '') {
//                var welcomePanel = j('#queryly_welcome');
//                if (welcomePanel.length > 0) {
//                    if ((queryly.totalWidth / 2) < queryly.left) {
//                        welcomePanel.css('right', (queryly.totalWidth - queryly.left - queryly.width - 20 + queryly.layout.rightMargin + scrollleft) + 'px')
//                    }
//                    else {
//                        welcomePanel.css('left', queryly.left - scrollleft + queryly.layout.leftMargin + 'px');
//                    }
//                    welcomePanel.css('top', queryly.top + queryly.height - scrolltop + 10 + queryly.layout.topMargin + 'px');
//                }

//            }
        },


        cloneStyle: function(from, to) {
            if (j(queryly.QUERYLYSUGGESTID).length == 0) {
                return;
            }

            var queryStyle = null;
            if (window.getComputedStyle) {
                queryStyle = window.getComputedStyle(from[0]);
                for (var i = 0; i < queryStyle.length; i++) {
                    var name = queryStyle[i];

                    if (name != 'position' && name != 'top' && name != 'left' && name != 'opacity') {
                        if (queryly.browserVersion < 10 && name == 'font-family') {
                            continue;
                        }
                        var val = queryStyle.getPropertyValue(name);
                        if (val != null && name != '-webkit-border-horizontal-spacing') {
                            try {
                                to.css(name, val);
                            }
                            catch (e) { }
                        }
                    }
                }
                try {
                    to.css('border-color', 'transparent');
                }
                catch (ee) { }
            }
            else {
                try {
                    queryStyle = from.get(0).currentStyle;

                    for (var name in queryStyle) {
                        try {
                            if (name != 'position' && name != 'top' && name != 'left' && name != 'opacity' && name != 'font-family') {

                                to.css(name, queryStyle[name]);
                            }
                        }
                        catch (e) { }
                    }
                    j('.queryly_suggest').css('z-index', '1');
                    j('.queryly_suggest').css('border-color', 'transparent');
                    j('.queryly').css('z-index', '2');
                    j('.queryly_suggest').css('opacity', '0.3')
                    j('.queryly_suggest').css('color', '#555');
                    j('.queryly').css('font-family', j('.queryly_suggest').css('font-family'));
                }
                catch (ee) { }
            }
        },

        hookEvent: function(link, isad,id) {
            link.mousedown(function() {
                try {
                    if (queryly.enableHistory) {
                        try {
                            var outheight = j(queryly.QUERYLYRESULTID).height();
                            var totalheight = queryly.render.table[1][0];
                            var off = j('#queryly_inner', queryly.QUERYLYRESULTID).position().top;
                            var scrollbaroffset = off * outheight / totalheight;
                            var scrollbartop = -scrollbaroffset + queryly.layout.headerHeight + queryly.layout.padding;
                            queryly.history.addHistory(queryly.endIndex, off, scrollbartop);
                        }
                        catch (e) { }
                    }

                    //var adparam = "";
                    if (isad == 1) {
                        new Image().src = "http://ad.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&clicked=1&allocationid=" + id + "&pageurl=";
                    }
                    else{
                        new Image().src = "http://www.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&query=" + escape(queryly.currentQuery) + "&suggest=" + escape(queryly.guess) + "&category=" + queryly.categoryID + "&total=" + queryly.total + "&source=&target=" + encodeURIComponent(this.href.replace(/&amp;/g, "&"));
                    }
                    if (queryly.hasGoogleAnalytics && _gaq) {
                        _gaq.push(['_trackEvent', queryly.category, queryly.util.getFullSuggestion(), this.href, 1]);
                    }
                }
                catch (e) { }

            });
        },

        

        showSuggestion: function(guess) {
            if (j(queryly.QUERYLYSUGGESTID).length > 0) {
                if (queryly.currentQuery.length > 0) {
                    var lastchar = queryly.currentQuery.charAt(queryly.currentQuery.length - 1);
                    var lastword = queryly.util.getLastWord(queryly.currentQuery);
                    var partialword = guess.substring(lastword.length);
                    if (lastchar != ' ' && queryly.guess.substring(0, lastword.length) == lastword.toLowerCase()) {
                        j(queryly.QUERYLYSUGGESTID).val(queryly.currentQuery + partialword)
                    }
                    else {
                        j(queryly.QUERYLYSUGGESTID).val(queryly.currentQuery);
                    }
                }
            }
        },


        addAd: function(ad) {
            if (ad.adhtml != '') {
                queryly.render.addBlock(ad.adhtml, 1);
            }
            else {
                var zoom = queryly.ui.itemwidth / ad.width;
                var iframestyle = '-moz-transform:scale(' + zoom + ');-moz-transform-origin: top left;-webkit-transform: scale(' + zoom + ');-webkit-transform-origin: top left;transform:scale(' + zoom + ');transform-origin: top left;height:' + ad.height + 'px;width:' + ad.width + 'px;-ms-transform:scale(' + zoom + ');-ms-transform-origin: top left;';
                var adhtml = "<div  style='width:" + (queryly.ui.itemwidth) + "px;height:" + (queryly.ui.itemheight) + "px;overflow:hidden;padding:0px;'><iframe src='http://api.queryly.com/adpage.aspx?queryly_key=" + queryly.QuerylyKey + "&adid=" + ad.adid + "' frameborder=0 scrolling='no' style='" + iframestyle + "' /></div>";
                queryly.render.addBlock(adhtml, 1);
            }
            //queryly.render.addBlock("<div style='width:100px'>x</div><script>alert(1);</script>");
            //queryly.render.addBlock("<script>function test(){return 'abc';}</script><div id='xx' onclick='alert(1);' style='width:140px;height:140px;'>test</div><script>alert(queryly.jquery('#xx'));queryly.jquery('#xx').append(test());queryly.jquery('#xx').append('<img src=\"http://www.ruawebdesign.com/wp-content/uploads/2010/12/preview-150x148.jpg\">')</script>");

        },



        addBlock: function(itemhtml, isad,id) {
            var found = false;
            this.inner.append('<div class="queryly_item" style="overflow:hidden;position:absolute;top:0px;left:0px;">' + itemhtml + '</div>');
            //this.inner.append('<div class="queryly_item" style="display:inline;overflow:hidden;position:relative;top:0px;left:0px;">' + itemhtml + '</div>');
            queryly.currentItemIndex = queryly.currentItemIndex + 1;
            var lastChild = null;
            if (j.isFunction(this.inner.children().last)) {
                lastChild = this.inner.children().last();
            }
            else {
                lastChild = j(":last-child", this.inner);
            }
            var lastChildWidth = lastChild.width();
            var lastChildHeight = lastChild.height();

            for (var k = 0; k < this.remainderWidth; k++) {
                if (this.table[1][k] < this.min && (k + lastChildWidth < this.remainderWidth)) {
                    this.min = this.table[1][k];
                    this.index = k;
                    found = true;
                }
            }

            if (!found) {
                if (this.table[1][0] <= this.min) {
                    this.index = 0;
                }
            }

            var itemleft = queryly.layout.padding;
            if (this.index != 0) {
                itemleft = this.table[0][this.index - 1];
            }
            var itemtop = this.table[1][this.index];



            var blockcount = Math.ceil(lastChildWidth);
            for (var x = 0; x < blockcount; x++) {
                if (this.index + x < this.remainderWidth) {
                    this.table[1][this.index + x] = this.table[1][this.index + x] + lastChildHeight + queryly.layout.itemspacing;
                    this.table[0][this.index + x] = itemleft + (x + 1);
                    if (x == blockcount - 1) {
                        this.table[0][this.index + x] = this.table[0][this.index + x] + queryly.layout.itemspacing;
                    }
                }
            }

            lastChild.css('top', itemtop + 'px');
            lastChild.css('left', itemleft + 'px');
            this.min = this.min + lastChildHeight + queryly.layout.itemspacing;
            this.hookEvent(j('a', lastChild), isad,id);
            try {
                if (isad == 1) {
                    var unseenad = new Object();
                    unseenad.url = j('a', lastChild).attr("href");
                    unseenad.id = id;
                    unseenad.top = itemtop;
                    unseenad.isseen = false;
                    queryly.unseenads.push(unseenad);
                }
            }
            catch (e) { }
            return lastChild;
        },

        tmpl: function(str, data) {
            var fn = !/\W/.test(str) ?
          this.cache[str] = this.cache[str] ||
            this.tmpl(document.getElementById(str).innerHTML) :

            // Generate a reusable function that will serve as a template
            // generator (and which will be cached).
          new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +

            // Introduce the data as local variables using with(){}
            "with(obj){p.push('" +
            str.replace(/[\r\t\n]/g, " ")
               .replace(/'(?=[^%]*%>)/g, "\t")
               .split("'").join("\\'")
               .split("\t").join("'")
               .replace(/<%=(.+?)%>/g, "',$1,'")
               .split("<%").join("');")
               .split("%>").join("p.push('")
               + "');}return p.join('');");

            // Provide some basic currying to the user
            return data ? fn(data) : fn;
        }


    };



    queryly.iPad = {
        resultSwipe: function(event, phase, direction, distance) {
            var move = 0.2;
            if (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null) {
                move = 0.15;
            }
            if (distance > 10) {
                if (direction == 'down') {
                    queryly.scrollPage(move);
                }
                else {
                    queryly.scrollPage(-move);
                }
            }
        },

        suggestSwipe: function(event, phase, direction, distance) {
            queryly.util.autoFillSuggestion();
        }
    };


    queryly.util = {
        imageShift: function(img) {
            if (img.naturalHeight > img.naturalWidth * 1.2) {
                var shift = -(img.naturalHeight - img.naturalWidth)/2;
                j(img).css('margin-top', shift + 'px');
            }           
        },

        checkEmail: function(elem, message) {
            if (j.trim(elem.val()).length == 0) {
                elem.css('background', '#FEDFDF');
                alert(message);
                return false;
            }
            else if (!/(\S)+[@]{1}(\S)+[.]{1}(\w)+/.test(elem.val())) {
                elem.css('background', '#FEDFDF');
                alert(message);
                return false;
            }
            else {
                elem.css('background', '#FFFFFF');
                return true;
            }


        },

        imageLoad: function(img, w, h) {
            if (img.width < 20) {
                queryly.util.removeNode(img.parentNode);
            }
            if (w >= h && img.width < img.height) {
                img.width = w;
                if (img.height > h) {
                    var shift = -(img.height - h) / 3
                    //j(img).css('margin-top',shift);
                }
            }
            else if (w <= h && img.width > img.height) {
                img.height = h;
                if (img.width > w) {
                    var shift = -(img.width - w) / 2
                    j(img).css('margin-left', shift);
                }
            }
            else {
                img.width = w * (1.1);
            }

            if (img.height < h) {
                img.height = h;
            }
        },

        imageError: function(img) {
            img.src = 'http://www.queryly.com/images/blank.png';
        },

        removeNode: function(node) {
            if (node != null && node.parentNode != null) {
                try {
                    if (queryly.browserVersion > 8) {
                        node.parentNode.removeChild(node);
                    }
                    else {
                        j(node).hide();
                    }
                }
                catch (e) { }
            }
        },

        resetState: function() {
            queryly.currentItemIndex = 0;
            if (j(queryly.QUERYLYRESULTID).length != 0) {
                j('#queryly_inner', queryly.QUERYLYRESULTID).html('');
                j(queryly.QUERYLYRESULTID).hide();
            }
            if (j(queryly.QUERYLYSUGGESTID).length != 0) {
                j(queryly.QUERYLYSUGGESTID).val('');
            }

            if (j(queryly.QUERYLYID).length != 0) {
                j(queryly.QUERYLYID).val('');
            }

            queryly.guess = '';
            queryly.currentSuggest = '';
            queryly.currentQuery = '';
            queryly.previousQuery = '';
            //j(queryly.QUERYLYID).attr('value', '');
            j(queryly.QUERYLYID).focus();


            try {
                if (typeof (queryly.QuerylyResetCallback) != 'undefined' && queryly.QuerylyResetCallback) {
                    queryly.QuerylyResetCallback();
                }
            }
            catch (e) { }




        },

        getUrlParameter: function(name) {
            return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]);
        },

        getCookie: function(name) {
            try {
                name = name + "=";
                var carray = document.cookie.split(';');

                for (var i = 0; i < carray.length; i++) {
                    var c = carray[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
                }
            }
            catch (ex) {
                return null;
            }
            return null;
        },

        setCookie: function(name, value, days) {
            if (days == undefined) {
                days = 90;
            }
            if (value == 0) {
                document.cookie = name + '=' + value + '; path=/';
            }
            else {
                document.cookie = name + '=' + value + ';expires=' + new Date((new Date().getTime() + 1000 * 24 * 3600 * days)) + '; path=/';
            }
        },

        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        getVisitorID: function() {
            var id = this.getCookie("querylyvid");
            if (id == null) {
                id = this.getRandomInt(1, 2147483647);
                this.setCookie("querylyvid", id);
            }
            return id;
        },

        getVisitorEmail: function () {
            var email = queryly.util.getCookie("queryly_newsalert_email");
            if (email == null) {
                return "";
            }
            return email;
        },

        iPadSupport: function() {
            j(queryly.QUERYLYID).attr('autocorrect', 'off');
            j(queryly.QUERYLYID).attr('autocapitalize', 'off');

            try {
                j(queryly.QUERYLYID).click(function() {
                    queryly.iPad.suggestSwipe(null, null, null, null);
                });
            }
            catch (e) { }
        },

        setPositionInfo: function() {
            var qly = j(queryly.QUERYLYID);
            if (qly != null) {
                queryly.left = qly.offset().left; //  - j(window).scrollLeft();
                queryly.top = qly.offset().top; //  - j(window).scrollTop();
                queryly.height = qly.height();
                queryly.width = qly.width();
                queryly.totalWidth = j(window).width();
            }
        },

        getLastWord: function(o) {
            return ("" + o).replace(/[\s]+$/, '').split(/[\s]/).pop();
        },


        getFullSuggestion: function() {
            var result = '';
            if (j(queryly.QUERYLYSUGGESTID).length > 0 && queryly.guess != '') {
                var q = j(queryly.QUERYLYID).val();
                if (q.length > 0) {
                    var lastchar = q.charAt(q.length - 1);
                    var lastword = this.getLastWord(q);
                    var partialword = queryly.guess.substring(lastword.length);
                    if (lastchar != ' ' && queryly.guess.substring(0, lastword.length) == lastword.toLowerCase()) {
                        result = q + partialword;
                    }
                }
            }
            return result;
        },

        autoFillSuggestion: function() {
            var result = queryly.util.getFullSuggestion();
            if (result != '') {
                j(queryly.QUERYLYID).val(result);
            }
        },

        trackClick: function(url, q) {
            new Image().src = "http://www.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&query=" + q + "&suggest=" + q + "&category=0&total=10&source=&target=" + encodeURIComponent(url);
        },

        trackAdClick: function(id) {
            new Image().src = "http://ad.queryly.com/track.aspx?queryly_key=" + queryly.QuerylyKey + "&visitorid=" + queryly.util.getVisitorID() + "&clicked=1&allocationid=" + id + "&pageurl=";
        }

    };



})(jQuery);

if (queryly.isAndroid){
    jQuery.getScript( "http://www.queryly.com/js/touchswipe-1.5.js", function( data, textStatus, jqxhr ) {
    });
}
else if (queryly.isIPad){
    jQuery.getScript( "http://www.queryly.com/js/touchswipe-1.5.js", function( data, textStatus, jqxhr ) {
    });
}
