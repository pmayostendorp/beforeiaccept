/**
 * @desc Load AddThis if '.addthis_toolbox' is present.
 * @author eabad
 */
(function(window, document, yepnope, $, undefined) {
    loadAddThis = function(options, callback) {
        var addthisToolbox = document.getElementsByClassName('addthis_toolbox');
        if (typeof(addthisToolbox) != 'undefined' && addthisToolbox !== null) {
            var addthis_config = {
                    ui_click: true,
                    ui_open_windows: true,
                    data_track_clickback: true,
                    data_track_addressbar: false,
                    data_ga_property: options.gaID,
                    data_ga_social: false
                },
                addthis_share = {
                    templates: {
                        twitter: '{{title}} {{url}} via@' + options.twitterID
                    }
                };
            yepnope([
                {
                    test: window.addthis,
                    nope: '//s7.addthis.com/js/300/addthis_widget.js#pubid=' + options.addthisID
                }
            ]);
            
        }
        
        if (callback && typeof(callback) === 'function') { callback(); }
    };
})(window, document, yepnope, jQuery);

/** 
 * @desc For making vertical-sticky-left & vertical-sticky-right work.
 * @author eabad
 */ 
(function(window, document, yepnope, $, undefined) {
    var checkElement = document.getElementsByClassName('addthis_toolbox');
    if (typeof(checkElement) != 'undefined' && checkElement !== null) {
        yepnope([
            {
                load: {
                    'floatingfixed': 'components/core_external_jquery_plugins/resources/scripts/jquery.floatingfixed.js'
                },
                callback: function(url, result, key) {
                    $(function() {
                        var $wW = $(window).width(),
                            $bHC = $('#blox-html-container'),
                            $bSS = $('.blox-social-share'),
                            $bSSF = $('.blox-social-share.vertical-sticky-left, .blox-social-share.vertical-sticky-right');
                                    
                        if($bSS.hasClass('vertical-sticky-left') || $bSS.hasClass('vertical-sticky-right')) {
                            if ($wW > 1100) {
                                if($bHC.hasClass('app-editorial')) {
                                    var titleOffset = $('#blox-asset-title').offset().top;
                                    $bSS.appendTo('#blox-left-col')
                                        .css({'top': titleOffset});
                                    $bSSF.floatingFixed({ padding: 10 });
                                }
                                else if ($bHC.hasClass('app-classifieds')) {
                                    var titleOffset = $('.content .title').offset().top;
                                    $bSS.appendTo('#blox-left-col')
                                        .css({'top': titleOffset});
                                    $bSSF.floatingFixed({ padding: 10 });
                                }
                                else if ($bHC.hasClass('app-staticpages')) {
                                    var titleOffset = $('#blox-asset-title').offset().top;
                                    $bSS.appendTo('#blox-left-col')
                                        .css({'top': titleOffset});
                                    $bSSF.floatingFixed({ padding: 10 });
                                }
                            }
                            else {
                                $bSS.removeClass('vertical-sticky-left').removeClass('vertical-sticky-right');
                            }
                        } 
                    });
                }
            }
        ]);
    }
})(window, document, yepnope, jQuery);

/**
 * @desc Loads Facebook's all.js file.
 * @author eabad
 */
(function(window, document, yepnope, $, undefined) {
    loadFacebook = function(options, callback) {
        var fbLogin = document.getElementById('facebook-login-panel'),
            fbLike = document.getElementsByClassName('fb-like'),
            fbLikeAddThis = document.getElementsByClassName('addthis_button_facebook_like');
            
            yepnope([
                {
                    test: window.FB,
                    nope: '//connect.facebook.net/en_US/all.js',
                    complete: function() {
                        $(function() {
                            function fbReady() {
                                FB.init ({
                                    appId: options.fbID,
                                    status: true,
                                    cookie: true,
                                    xfbml: true
                                });
                                $(document).trigger('onFacebookReady');
                            }
                            if (window.FB) {
                                fbReady();
                            } else {
                                window.fbAsyncInit = fbReady;
                            }
                        });
                    }
                }
            ]);
        if (callback && typeof(callback) === 'function') { callback(); }
    };
})(window, document, yepnope, jQuery);

/**
 * @desc Google Analytics' ga.js file.
 * @author eabad
 */
(function (window, document, yepnope, $, undefined) {
    loadGoogleAnalytics = function(options, callback) {
        var pluginUrl = '//www.google-analytics.com/plugins/ga/inpage_linkid.js';
        
        _gaq.push(['_setAccount', options.trackerID]);
        _gaq.push(['_setDomainName', options.trackerDomain]);
        _gaq.push(['_trackPageview'], options.trackerUrl);
        _gaq.push(['_require', 'inpage_linkid', pluginUrl]);
        
        yepnope([
            {
                load: ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js'
            }
        ]);
        if (callback && typeof(callback) === 'function') { callback(); }
    };
})(window, document, yepnope, jQuery);