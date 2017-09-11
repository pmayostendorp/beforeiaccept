/*
 * University of Houston
 * Main Website Scripts
 *
 * Table of Contents:
 * ------------------
 * Console handling
 * Clean URLs
 * IE Fixes
 * HTML5 Placeholder Text
 * Responsive Magic
 *
 */

/*
 * Console handling
 * Avoid console errors in browsers that lack a console.
 */

if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}


/*
 * Clean URLs (removes the index.php from URLs), fixes red flash
 */

jQuery(document).ready(function($) {
    $("a[href$='/index.php'], a[href='index.php']").each(function() {
        this.href = this.href.replace("/index.php", "/");
    });
    $('html').css( "background", "#c8102e" );
});


/*!
 * jQuery Browser Plugin 0.0.7
 * https://github.com/gabceb/jquery-browser-plugin
 *
 * Original jquery-browser code Copyright 2005, 2015 jQuery Foundation, Inc. and other contributors
 * http://jquery.org/license
 *
 * Modifications Copyright 2015 Gabriel Cebrian
 * https://github.com/gabceb
 *
 * Released under the MIT license
 *
 * Date: 19-04-2015
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],function(b){a(b)}):"object"==typeof module&&"object"==typeof module.exports?module.exports=a(require("jquery")):a(window.jQuery)}(function(a){"use strict";function b(a){void 0===a&&(a=window.navigator.userAgent),a=a.toLowerCase();var b=/(edge)\/([\w.]+)/.exec(a)||/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(ipod)/.exec(a)||/(iphone)/.exec(a)||/(kindle)/.exec(a)||/(silk)/.exec(a)||/(android)/.exec(a)||/(windows phone)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||/(cros)/.exec(a)||/(playbook)/.exec(a)||/(bb)/.exec(a)||/(blackberry)/.exec(a)||[],d={},e={browser:b[5]||b[3]||b[1]||"",version:b[2]||b[4]||"0",versionNumber:b[4]||b[2]||"0",platform:c[0]||""};if(e.browser&&(d[e.browser]=!0,d.version=e.version,d.versionNumber=parseInt(e.versionNumber,10)),e.platform&&(d[e.platform]=!0),(d.android||d.bb||d.blackberry||d.ipad||d.iphone||d.ipod||d.kindle||d.playbook||d.silk||d["windows phone"])&&(d.mobile=!0),(d.cros||d.mac||d.linux||d.win)&&(d.desktop=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv||d.edge){var f="msie";e.browser=f,d[f]=!0}if(d.safari&&d.blackberry){var g="blackberry";e.browser=g,d[g]=!0}if(d.safari&&d.playbook){var h="playbook";e.browser=h,d[h]=!0}if(d.bb){var i="blackberry";e.browser=i,d[i]=!0}if(d.opr){var j="opera";e.browser=j,d[j]=!0}if(d.safari&&d.android){var k="android";e.browser=k,d[k]=!0}if(d.safari&&d.kindle){var l="kindle";e.browser=l,d[l]=!0}if(d.safari&&d.silk){var m="silk";e.browser=m,d[m]=!0}return d.name=e.browser,d.platform=e.platform,d}return window.jQBrowser=b(window.navigator.userAgent),window.jQBrowser.uaMatch=b,a&&(a.browser=window.jQBrowser),window.jQBrowser});


/*
 * IE Fixes
 * Author: Rainer Schuhsler
 */

// detects the version of IE and added an appropriate class to the HTML element


$(function() {
    try{
    if($.browser.msie && $.browser.version=='10.0') {
        $('html').addClass('ie10');
    };
    if($.browser.msie && $.browser.version=='9.0') {
        $('html').addClass('lt-ie10 ie9');
    };
    if($.browser.msie && $.browser.version=='8.0') {
        $('html').addClass('lt-ie10 lt-ie9 ie8');
        // adds a class in place of selectors not supported by IE
        $('*:last-child').addClass('last-child');
        $('*:first-child').addClass('first-child');
    };
    if($.browser.msie && $.browser.version=='7.0') {
        $('html').addClass('lt-ie10 lt-ie9 lt-ie8 ie7');
        // adds a class in place of selectors not supported by IE
        $('*:last-child').addClass('last-child');
        $('*:first-child').addClass('first-child');
        // fixes annoying postition:fixed margin bug
        $('.table-of-contents').wrap('<div />');
    };
    }catch(e){
    try{console.log(e);}catch(e){}
    }
});


/*
 * HTML5 Placeholder Text jQuery Fallback with Modernizr
 * Adds placeholder text to input fields in browsers that don't support it (i.e. the 'Search' text in the UH header)
 * @url     http://uniquemethod.com/
 * @author  Unique Method
 */

$(function() {
    // check placeholder browser support
    if (!Modernizr.input.placeholder) {
        // set placeholder values
        $(this).find('[placeholder]').each(function() {
            // Fix a bug that doesn't set the correct line-height for placeholder text.
            if($.browser.msie && $.browser.version<='8.0') {
                $(this).css('line-height', '24px');
                $('.top-bar .search input[type="text"]').css('line-height', '30px');
            };
            // if field is empty
            if ($(this).val() == '') {
                $(this).val( $(this).attr('placeholder') );
            }
        });
        // focus and blur of placeholders
        $('[placeholder]').focus(function() {
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val('');
                $(this).removeClass('placeholder');
            }
        }).blur(function() {
            if ($(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
                $(this).val($(this).attr('placeholder'));
                $(this).addClass('placeholder');
            }
        });
        // remove placeholders on submit
        $('[placeholder]').closest('form').submit(function() {
            $(this).find('[placeholder]').each(function() {
                if ($(this).val() == $(this).attr('placeholder')) {
                    $(this).val('');
                }
            })
        });
    }
});


/*
 * Responsive Magic
 */

jQuery(document).ready(function($) {

    // Toggle for nav menu
    $('.menu-button').click(function(e) {
        e.preventDefault();
        $('body').toggleClass("active-nav");
        // $('html').toggleClass("overflowhidden");
        $('.menu-button').toggleClass("active-button");
    });

    // Toggle for nav carets
    $('.caret').click(function(e) {
        e.preventDefault();
        $(this).parent().toggleClass('opened');
    });
    $('.footer-links dt').click(function(e) {
        $(this).parent().toggleClass('opened');
    });

});

$(window).bind("load resize", function(){
    if(Modernizr.mq("(max-width: 486px)")){
        $(".table-of-contents").prependTo("#content-well");
        $('.table-of-contents a').bind('click',function(event){
            var $anchor = $(this);
            $('#page').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top-72
            }, 400);
            event.preventDefault();
        });
    } else {
        $(".table-of-contents").prependTo("#sidebar");
        $('.table-of-contents a').bind('click',function(event){
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top-24
            }, 400);
            event.preventDefault();
        });
    };
});

// fixes an overflow bug that happens in WebKit version 535.19, the version of Chrome that comes pre-installed on Nexus 4 and Nexus 7 devices
jQuery(document).ready(function($) {
try{
    if ($.browser.version=="535.19") {
        $("#banner li, #banner li .children a, #content-info .footer-links dd").css('position', 'static');
        $("#banner li .children .caret").css('display', 'none');
    }
}catch(e){
    try{console.log(e);}catch(e){}
}
});
