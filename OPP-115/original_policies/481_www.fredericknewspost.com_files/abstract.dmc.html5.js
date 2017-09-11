//////////////////////////
//UTILITIES
//////////////////////////
//IE browser detection
// if ($.browser.msie && parseInt($.browser.version, 10) >= 8) {
// alert('IE8 browser');
// }

function trimStr(str) {
    str = str.replace(/^\s+/, '');
    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return str;
}

//////////////////////////
//OMNITURE
//////////////////////////
//function trackLink(url, description) {
//// ex: 82060417 | Safeway | 300x415 | visit website
//    try {
//        var pageName = browser_detection + ' | ' + adnumber + ' | ' + advertiserName + ' | ' + dimension + ' | ';
//        pageName += description;
//        s.pageName = pageName;
//        s.trackLink(url, 'e', pageName);
//        window.console.log('trackLink: ' + pageName);
//    } catch (e) {
//        window.console.log('error with omniture tracking - trackLink: ' + e);
//    }
//}

//function trackSocialPost(socialSite, url) {
////ex: 5946 | Sonic | 300x415 | post to twitter
//    var pageName = browser_detection + ' | ' + adnumber + ' | ' + advertiserName + ' | ' + dimension + ' | post to';
//    pageName += socialSite;
//    window.console.log('hello foo: ' + pageName);
//    //    break foo;
//    try {
//        var pageName = adnumber + ' | ' + advertiserName + ' | ' + dimension + ' | post to ';
//        pageName += socialSite;
//        s.pageName = pageName;
//        s.trackLink(url, 'e', pageName);
//        //s.trackLink(pageName);
//        window.console.log('trackSocialPost: ' + pageName);
//    } catch (e) {
//        window.console.log('error with omniture tracking - trackSocialPost: ' + e);
//    }
//}

function viewAllVideos(url) {
//ex: DMC: HTML5 Demo Widget | 737 | 300x415 | view all videos
    try {
        var pageName = publicationName + ' | view all videos';
//        _paq.push(['setCustomVariable', 1, "Social", 'View All', "page"]);
//        _paq.push(['trackPageView']);
//        s.pageName = pageName;
//        s.trackLink(url, 'e', pageName);
        window.console.log('viewAllVideos: ' + pageName);
        xul_analytics_index('view_all');
    } catch (e) {
        window.console.log('error with omniture tracking - viewAllVideos: ' + e);
    }
}

//////////////////////////
//XUL ANALYTICS
//////////////////////////

function xul_analytics(site_click, browser) {
    try {
        var browserURL = (window.location != window.parent.location)
            ? document.referrer
            : document.location;
        document.domain = "digitalmediacommunications.com";
        window.console.log('listing: ' + listingID);
        var my_arr = new Array(listingID, site_click, browser_detection, dimension, publicationID);
        var AjaxURL = 'http://widgets.digitalmediacommunications.com/analytics/clicks';
        var jsonString = JSON.stringify(my_arr);
        $.ajaxSetup({
            url:"AjaxURL",
            data:{ci_csrf_token: cookie},
            success:function(result){
                window.console.log('boom');
            }
        });
        $.ajax({
            type: "POST",
            url: AjaxURL,
            data: {data: jsonString},
            success: function (result) {
                window.console.log('Xul Normal Analytics Successful : ' + site_click + " : " + browser);
            }
        });
    } catch (e) {
        window.console.log('No Dice: ' + e);
    }
}


function xul_analytics_index(site_click, browser) {

    document.domain = "digitalmediacommunications.com";
    window.console.log('Publication ID: ' + publicationID);
    var my_arr = new Array(publicationID, site_click, browser);
    var AjaxURL = 'http://widgets.digitalmediacommunications.com/analytics/index_clicks';
    var jsonString = JSON.stringify(my_arr);
    $.ajaxSetup({
            url:"AjaxURL",
            data:{ci_csrf_token: cookie},
            success:function(result){
                window.console.log('boom');
            }
        });
    $.ajax({
        type: "POST",
        url: AjaxURL,
        data: {data: jsonString},
        success: function (result) {
            window.console.log('Xul Index Analytics Successful : ' + site_click + " : " + browser);
        }
    });
}

//////////////////////////
//SOCIAL
//////////////////////////

var svpShortenedURL; //populated via ajax call (create-svp-url)

$('a.social').click(function (e) {
    e.preventDefault();
    //if channel (widget) is being shared (no listing has been clicked on - share widget instead of SVP)
    if ($(this).parent().hasClass('channel-share')) {
        window.console.log('share channel/widget');
        svpShortURL = widgetURLshort;
        svpLongURL = widgetURL;
        slpShortURL = widgetURLshort;
        slpLongURL = widgetURL;
//        svpFacebookURL = widgetURL;
    }

    var shareURL;
    switch ($(this).attr('href')) {
        case "facebook":
            //no longer shares SWF to wall. Must used graph API below to do so
            //redirect_uri must be from domain - widgets.digitalmediacommunications.com (only works on production)
//            shareURL = "https://www.facebook.com/dialog/feed?app_id=484257678295938&display=popup&redirect_uri=" + encodeURIComponent(widgetURL) + "&link=" + encodeURIComponent(svpFacebookURL);
            shareURL = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(slpFacebookURL);
//            shareURL = "https://www.facebook.com/dialog/feed?app_id=145634995501895&display=popup&caption=An%20example%20caption&link=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2F&redirect_uri=https://developers.facebook.com/tools/explorer";
            
            window.console.log(shareURL);
            xul_analytics('facebook');
            break;
        case "facebook_index":
            //no longer shares SWF to wall. Must used graph API below to do so
            //redirect_uri must be from domain - widgets.digitalmediacommunications.com (only works on production)
            shareURL = "http://www.facebook.com/dialog/feed?app_id=484257678295938&display=popup&redirect_uri=" + encodeURIComponent(widgetURL) + "&link=" + encodeURIComponent(widgetURL) + "&caption=View Our Jobs Videos!";
            break;
        case "twitter_index":
            shareURL = 'http://twitter.com/?status=Check out this video, ' + encodeURIComponent(widgetURLshort_new);
            xul_analytics_index('twitter_index');
            break;
        case "twitter":
            shareURL = 'http://twitter.com/?status=' + encodeURIComponent(advertiserName) + ' has an opening for ' + encodeURIComponent(advertiserTagline) + '! Check out this video, ' + encodeURIComponent(slpShortURL);
            xul_analytics('twitter');
            break;
        case "email":
            shareURL = "mailto:?subject=Shared Video&body=" + encodeURIComponent(advertiserName) + ' has a job video that you might be interested in, ' + encodeURIComponent(slpShortURL);
            xul_analytics('email');
            break;
        case "email_index":
            shareURL = "mailto:?subject=View Our Jobs Videos!&body=View Our Jobs Videos!  " + encodeURIComponent(slpShortURL);
            xul_analytics_index('email_index');
            break;
        case "google-plus":
            shareURL = 'https://plus.google.com/share?url=' + encodeURIComponent(slpFacebookURL);
            xul_analytics('google_plus');
            break;
        case "google-plus_index":
            shareURL = 'https://plus.google.com/share?url=' + encodeURIComponent(slpFacebookURL);
            xul_analytics_index('google_plus_index');
            break;
        case "tumblr":
            shareURL = "http://tumblr.com/share?s=&v=3&u=" + encodeURIComponent(slpShortURL);
            break;
        case "pinterest":
            shareURL = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(widgetURL) + "&media=" + encodeURIComponent(facebook_image) + "&description=" + encodeURIComponent(advertiserName);
            xul_analytics('pinterest');
            break;
        case "pinterest_index":
            shareURL = "http://pinterest.com/pin/create/button/?url=" + encodeURIComponent(widgetURL) + "&media=" + encodeURIComponent(facebook_image) + "&description=" + encodeURIComponent(advertiserName);
            xul_analytics_index('pinterest_index');
            break;
        case "linkedin":
            shareURL = "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(slpShortURL) + "&title=Check out this Job Video by " + encodeURIComponent(advertiserName) + "&summary=" + encodeURIComponent(advertiserTagline);
            xul_analytics('linkedin');
            break;
        case "linkedin_index":
            shareURL = "http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(slpShortURL) + "&title=View Our Jobs Videos!";
            xul_analytics_index('linkedin_index');
            break;
        default:
            break;
    }
    window.open(shareURL);
});
$('button.copyVideoLink').click(function (e) {
    e.preventDefault();
    copyToClipboard($('.dmcWidget .share textarea.videoLink').text());
});
$('button.copyEmbedCode').click(function (e) {
    e.preventDefault();
    copyToClipboard($('.dmcWidget .share textarea.embedCode').text());
});
function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}

//////////////////////////
//THEME
//////////////////////////
var bgColor = $('.dmcWidget .ivb').css('background-color');
var backgroundImage = $('.dmcWidget .ivb').css('background-image');
//////////////////////////
//VIDEO PLAYER
//////////////////////////
var videoPlayer = _V_("dmcVideoPlayer");
var $videoPlayerContainer = $('.videoPlayerContainer');
_V_("dmcVideoPlayer").ready(function () {
    window.console.log('videoPlayer ready');
});
var videoPageName = browser_detection + ' | ' + adnumber + ' | ' + advertiserName + ': ' + advertiserTagline + ' | ' + dimension;
var playInitialized = false;
var videoPlaying = function () {
    $('.dmcWidget .ivb').css('background-image', '');
    $('.dmcWidget .extra').hide();
    $('.dmcWidget .chzn-container').hide();
    $('.dmcWidget .poweredBy').hide();
    $('.dmcWidget .footerActions').fadeIn();
    //$('#vertical-ticker').totemticker({stop: '#stop'});
    $(".vertical-ticker").stop();
    try {
        if (!playInitialized) {
            // window.console.log('track new video');
//            s.Media.open(videoPageName, videoPlayer.duration(), publicationName);
//            s.Media.play(videoPageName, 0);
        } else {
            // window.console.log('track resume video');
//            s.Media.play(videoPageName, videoPlayer.currentTime());
        }
    } catch (e) {
        window.console.log('error tracking video on play: ' + e);
    }

    playInitialized = true;
    //fade-out video control bar
    $('.dmcWidget .vjs-controls').addClass('vjs-fade-out');
    try {
        videoPlayingOverride();
    } catch (e) {
        window.console.log('no videoPlayingOverride method avail: ' + e);
    }
};
var videoPaused = function () {
    // window.console.log('videoPaused');
    try {
//        s.Media.stop(videoPageName, videoPlayer.currentTime());
    } catch (e) {
//        window.console.log('error tracking video on pause: ' + e);
    }
};
var videoEnded = function () {
    playInitialized = false;
    $('.dmcWidget .extra').hide();
    $('.dmcWidget .endSlate').show();
    window.console.log('Video ended naturally');
    try {
        //s.Media.stop(videoPageName, videoPlayer.currentTime());
        //s.Media.close(videoPageName);
    } catch (e) {
        window.console.log('error tracking video on end: ' + e);
    }
};
videoPlayer.addEvent("play", videoPlaying);
videoPlayer.addEvent("pause", videoPaused);
videoPlayer.addEvent("ended", videoEnded);
function playVideo(listing_id, pauseAtPoster) {
    //Most Variables are defined in dynamic_script.php
    //window.console.log('playVideo: ' + listing_id);
    listingID = listing_id;
    var dimension = "index";
    videoPageName = adnumber + ' | ' + advertiserName + ': ' + advertiserTagline;
    //window.console.log('videoPageName: ' + videoPageName);
    //window.console.log('xul++= ' + browser_detection);
    //window.console.log('after function' + videoPageName);
    //window.console.log('playVideo again: ' + listing_id);
    listingID = listing_id;
    videoPageName = browser_detection + ' | ' + adnumber + ' | ' + advertiserName + ': ' + advertiserTagline + ' | ' + dimension;
    //window.console.log('videoPageName: ' + videoPageName);
    playInitialized = false;
    //make AJAX call to get video information
    var callURL = trimStr(videoDetailAJAXurl + publicationID + '/' + listing_id);
    //window.console.log('VIDEO URL: ' + callURL);
    $.ajax({
        url: callURL,
        dataType: 'json'
    }).done(function (data) {
        if (data.missing_video == "missing_video") {
            //var missing_image = 'http://dmc2k.digitalmediacommunications.com/html5_logos/missing/no_video_index.jpg';
            //$('.dmcWidget #dmcVideoPlayer').attr('poster', missing_image);
            window.console.log('missing video');
            videoPlayer.src([
                {
                    type: "video/mp4",
                    src: "https://s3.amazonaws.com/dmc2k.digitalmediacommunications.com/dmc/Expired/expiredVideo.mp4"
                },
                {
                    type: "video/webm",
                    src: "https://s3.amazonaws.com/dmc2k.digitalmediacommunications.com/dmc/Expired/expiredVideo.webm"
                },
                {
                    type: "video/ogg",
                    src: "https://s3.amazonaws.com/dmc2k.digitalmediacommunications.com/dmc/Expired/expiredVideo.ogg"
                }
            ]);
            videoPlayer.load();
            $('.dmcWidget #dmcVideoPlayer .vjs-poster').hide();
            videoPlayer.play();
            $videoPlayerContainer.fadeIn();
        } else {
//             window.console.log('ajax retrieval successful: ' + data);
            //$('.dmcWidget #dmcVideoPlayer .vjs-poster').hide();
            //window.console.log('mp4: ' + data.mp4);
            //window.console.log('ogg: ' + data.ogg);
            //window.console.log('webm: ' + data.webm);
            //set video src and show video player
            videoPlayer.src([
                {
                    type: "video/mp4",
                    src: data.mp4
                },
                {
                    type: "video/webm",
                    src: data.webm
                },
                {
                    type: "video/ogg",
                    src: data.ogg
                }
            ]);
            $('.dmcWidget #dmcVideoPlayer video-js vjs-default-skin vjs-paused img').hide();
            window.console.log('Hello from here!1 ');
            setEndSlate();
            setSocial();
            if (pauseAtPoster) {
                window.console.log('pauseAtPoster');
                //set poster
                $("#dmcVideoPlayer").attr("poster", 'http://dmc2k.digitalmediacommunications.com/dmc/demo/employment/slate_320x240.jpg');
                window.console.log('reaallly');
            } else {
                //load and play new video
                videoPlayer.load();
                $('.dmcWidget #dmcVideoPlayer .vjs-poster').hide();
                videoPlayer.play();
                xul_analytics('video_play', browser_detection);
            }
            $videoPlayerContainer.fadeIn();
        }
    });
}

function stopVideo() {
    videoPlayer.pause();
    //reset end slate
    $('.dmcWidget .endSlate p.website').hide();
    $('button.applyHere').hide();
    $('.dmcWidget #dmcVideoPlayer .vjs-poster').hide();
    try {
        tickerStartScroll();
    } catch (e) {
        window.console.log('tickerStartScrolfl error: ' + e);
    }

//hide video player
    $('.dmcWidget #dmcVideoPlayer .vjs-poster').show();
    $('.dmcWidget #dmcVideoPlayer .vjs-big-play-button').show();
    $('.dmcWidget #dmcVideoPlayer .vjs-loading-spinner').css('display', 'none');
    $videoPlayerContainer.hide();
    $('.dmcWidget .ivb').css('background-image', backgroundImage);
    $('.dmcWidget .chzn-container').show();
    $('.dmcWidget .extra').hide();
    $('.dmcWidget .footerActions').hide();
    $('.dmcWidget .poweredBy').show();
    try {
        stopVideoOverride();
    } catch (e) {
        window.console.log('no stopVideoOverride method avail: ' + e);
    }
}

//////////////////////////
//END SLATE
//////////////////////////
function setEndSlate() {
    $('.dmcWidget .endSlate p.headline').text(advertiserName);
    $('.dmcWidget .endSlate p.tagline').text(advertiserTagline);
    $('.dmcWidget .endSlate img:first').attr('src', advertiserLogo);
    if (advertiserWebsite) {
        $('button.applyHere').show();
        $('button.applyHere').attr('data-website', advertiserWebsite);
        $('.dmcWidget .endSlate p.website').html('<a href="' + advertiserWebsite + '" target="_blank" onclick="xul_analytics(\'apply_here\');" title="Visit Our Website">Visit Our Website</a>');
        $('.dmcWidget .endSlate p.website').show();
//        if (!ad_email===undefined) {
//            $('.dmcWidget .endSlate p.second_line').html('<p><a href="mailto:' + ad_email + '">Email Us</a></p>');
//            $('.dmcWidget .endSlate p.second_line').show();
//        } else {
//            $('.dmcWidget .endSlate p.second_line').hide();
//        }

//        $('.dmcWidget .endSlate p.third_line').html('<p><a href="' + ad_couponlink + '"target="_blank">' + ad_coupontext + '</a></p>');
//        if (ad_maplink) {
//            $('.dmcWidget .endSlate p.fourth_line').html('<p><a href="' + ad_maplink + '" target="_blank">Map</a></p>');
//            $('.dmcWidget .endSlate p.fourth_line').show();
//            window.console.log('positvie: ' + ad_maplink);
//        }
//        else {
//            $('.dmcWidget .endSlate p.fourth_line').hide();
//            window.console.log('fail why' + ad_maplink);
//        }

//        window.console.log('website: ' + ad_maplink);
    }
    else {
        $('button.applyHere').hide();
    }
}

function setSocial() {
    if (!listingID) {
//need a value to pass to controller
        listingID = 0;
        //set widget share URL ("channel") and exit function
        //retrieving share info on widget load for index dimension - not necessary to create shortURL (resource intensive)
        var url = "http://widgets.digitalmediacommunications.com/widget/embed/" + dimension + "/?p=" + publicationID + "&k=" + key;
        widgetURLshort = url;
        window.console.log('widgetURLshort: ' + widgetURLshort);
        return;
    }
    var socialURL = trimStr(shortenAJAXurl + publicationID + '/' + key + '/' + listingID + '/' + dimension);
    $.ajax({
        url: socialURL,
        dataType: 'json'
    }).done(function (links) {
        window.console.log('- - - -  ajax setSocial() retrieval successful - - - -');
        window.console.log('slpShortURL: ' + links.short_urlSLP);
        /*
        window.console.log('widgetURLshort: ' + links.widget_short_url);
        window.console.log('svpLongURL: ' + links.long_url);
        window.console.log('svpShortURL: ' + links.short_url);
        
        window.console.log('slpLongURL: ' + links.long_urlSLP);
        window.console.log('svpFacebookURL: ' + links.fb_url);
        window.console.log('slpFacebookURL: ' + links.fb_urlSLP);
        window.console.log('qr_image: ' + links.qrCode);
        window.console.log('- - - - - - - - - - - - - - - - - - - - - -');
        */
        if (dimension == 'svp') {
            $('.dmcWidget #dmcVideoPlayer .vjs-poster').show();
            if (dimension == 'svp' && autoPlay == true) {
                window.console.log('hello autoplaypaerrt2 True');
                $('.vjs-poster').hide();
            }
            if (dimension == 'svp' && autoPlay == false) {
                window.console.log('hello autoplaypaerrt2 False');
                //$('.vjs-poster').hide();
            }
        } else {
            $('.dmcWidget #dmcVideoPlayer .vjs-poster').fadeOut();
        }
        widgetURLshort = links.widget_short_url;
        svpShortURL = links.short_url;
        slpShortURL = links.short_urlSLP;
        slpLongURL = links.long_urlSLP;
        svpLongURL = links.long_url;
        svpFacebookURL = links.fb_url;
        slpFacebookURL = links.fb_urlSLP;
        qr_code_image = links.qrCode;
        var embedCode = '<iframe width="300" height="250" src="' + widgetURL + '" frameborder="0" allowfullscreen</iframe>';
        if(slpShortURL != 'false'){
            $('.dmcWidget .share textarea.videoLink').text(slpShortURL);
        }else{
            $('.dmcWidget .share textarea.videoLink').text(svpShortURL);
        }
        $('.dmcWidget .share textarea.embedCode').text(embedCode);
        var svp_fb_URL;
    });
}

$('.dmcWidget .endSlate p.return-to-videos').click(function (e) {
    e.preventDefault();
    stopVideo();
});
//////////////////////////
//FOOTER FUNCTIONALITY
//////////////////////////
if (!indexPlayerURL) {
    $('.dmcWidget button.viewAllVideos').hide();
}

//view all videos click handler
$('.dmcWidget button.viewAllVideos').click(function (e) {
    e.preventDefault();
    exitWidget();
    $videoPlayerContainer.find('source.mp4').attr('src', '');
    $videoPlayerContainer.find('source.ogg').attr('src', '');
    viewAllVideos(indexPlayerURL);
    
    if(listingID == ""){
        window.open(indexPlayerURL);
    }else{
        window.console.log('opening url with listing id');
        window.open(indexPlayerURL + "&lt=" + listingID);
    }
});
$('.dmcWidget button.applyHere').click(function (e) {
    e.preventDefault();
    exitWidget();
    var url = $(this).attr('data-website');
//    _paq.push(['setCustomVariable', 1, "Social", 'visit website', "page"]);
//    _paq.push(['trackPageView']);
//    trackLink(url, 'visit website');
    xul_analytics('apply_here');
    window.open(url);
});
$('.dmcWidget .footer .returnToVideoList').click(function () {
    stopVideo();
    $('button.viewAllVideos').show();
    $('.dmcWidget .previous').show();
    $('.dmcWidget .next').show();
//    $(function() {
//        $('#vertical-ticker').totemticker({
//            row_height: '73px',
//            next: '#ticker-next',
//            previous: '#ticker-previous',
//            stop: '.stop',
//            start: '#start',
//            mousestop: false
//        });
//    });
});
$('.dmcWidget .footer .videoIcon').click(function () {
    videoPlayer.play();
    $('.dmcWidget .extra').hide();
});
$('.dmcWidget .footer .qrIcon').click(function () {
    videoPlayer.pause();
    $('.dmcWidget .extra').hide();
    $('.dmcWidget .qr').html('<img src="' + qr_code_image + '">')
    $('.dmcWidget .qr').show();
});
$('.dmcWidget .footer .shareIcon').click(function () {
    videoPlayer.pause();
    $('.dmcWidget .extra').hide();
    $('.dmcWidget .share').show();
});
$('.dmcWidget .footer .infoIcon').click(function () {
    videoPlayer.pause();
    $('.dmcWidget .extra').hide();
    $('.dmcWidget .endSlate').show();
});
//if no listing specified, get share information just in case a user share's prior to watching a video
if (!listingID && dimension == 'index') {
    window.console.log('get social information for widget');
    setSocial();
}
