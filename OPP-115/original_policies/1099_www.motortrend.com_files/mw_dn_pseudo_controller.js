/**
 * Created with JetBrains PhpStorm.
 * User: duy.nguyen
 * Date: 9/10/13
 * Time: 12:03 PM
 * This object is meant to keep track of data of the site and be accessible to other scripts.
 *
 * Please minify using http://jscompress.com/ and replace mwdn.pseudo.ctrl.min.js
 */

var MWDNT = {

    config: {
        browserName: null,
        browserVersion: null,
        isIE9orLower: false,

        max_micro_width: 450,
        max_mobile_width: 600,
        max_tablet_width: 1024,
        current_mode: '',

        sklr_obj: null,

        mw_debug: false
    },

    /*
     UI Elements
     */
    ui: {
        //frame360: '#silverado_view'
    },

    initialize: function () {

        // Load actual objects
        jQuery.each(MWDNT.ui, function (k, v) {
            MWDNT.ui[k] = jQuery(v);
        });

        if (MWDNT.config.mw_debug == true) {
            // Config for debug case
        }

        MWDNT.tools.detectBrowser();
        MWDNT.init.pre_init();
        MWDNT.init.init_page();
        MWDNT.init.listeners();
//        }
//        else {
//            MWDNT.tools.log("Unable to Initialize browser");
//        }

    },

    init: {
        pre_init: function () {
            if(!MWDNT.config.isIE9orLower){
                jQuery('.backstretch_parallax').each(function(){

                    var windowHeight = jQuery(window).height();
                    var frameHeight = jQuery('#'+jQuery(this).attr('id').replace('backstretch_', 'moei_')).innerHeight();

                    // START
                    jQuery(this).attr( 'data-'+(+windowHeight+200)+'-top-top',  'display:none;' );
                    jQuery(this).attr( 'data-'+(+windowHeight+100)+'-top-top',  jQuery(this).attr('data-parallax-start') );

                    // END
                    jQuery(this).attr( 'data--'+frameHeight+'-top-top',  jQuery(this).attr('data-parallax-end') );
                    jQuery(this).attr( 'data--'+(+frameHeight+100)+'-top-top',  'display:none;' );

                });
            }
        },

        init_page: function () {
            if(jQuery.browser.mobile && MWDNT.config.current_mode == ''){
                MWDNT.do.disable_parallax();
            }

            if(MWDNT.tools.isMicro() && MWDNT.config.current_mode != 'micro'){
                MWDNT.do.disable_parallax();

                jQuery('#moeimk_sticky_download').find('a').html('PDF');

                jQuery.publish('micro_layout', [jQuery(window).width()]);

                MWDNT.config.current_mode = 'micro';
            }
            else if(MWDNT.tools.isMobile() && MWDNT.config.current_mode != 'mobile'){
                MWDNT.do.disable_parallax();

                jQuery('#moeimk_sticky_download').find('a').html('DOWNLOAD PDF');

                jQuery.publish('mobile_layout', [jQuery(window).width()]);

                MWDNT.config.current_mode = 'mobile';
            }
            else if(MWDNT.tools.isTablet() && MWDNT.config.current_mode != 'tablet'){
                MWDNT.do.disable_parallax();

                jQuery.publish('tablet_layout', [jQuery(window).width()]);

                MWDNT.config.current_mode = 'tablet';
            }
            else if(MWDNT.tools.isDesktop() && MWDNT.config.current_mode != 'desktop'){
                if(!MWDNT.config.isIE9orLower && MWDNT.config.sklr_obj == null){
                    setTimeout(MWDNT.do.enable_parallax, 100);
                }

                jQuery.publish('desktop_layout', [jQuery(window).width()]);

                MWDNT.config.current_mode = 'desktop';
            }

            jQuery.publish('window_resized', [jQuery(window).width()]);
        },

        listeners: function () {

            // handle resize handler
            jQuery(window).smartresize(function(){
                MWDNT.init.init_page();
            });

            jQuery('.social_icon_big_email').on('click',function(evt){
                evt.preventDefault();

                var form_box = jQuery('#social_icon_big_email_form');

                if(form_box.hasClass('expanded')){
                    form_box.find('input[type=submit]').css('opacity',0);
                    jQuery('#dnsys_form_msg').html('');
                    form_box.slideUp('normal').removeClass('expanded');
                }
                else{
                    form_box.slideDown('normal', function(){
                        form_box.find('input[type=submit]').css('opacity',1);
                    }).addClass('expanded');
                }
                return false;
            });

                jQuery('.img-container-blog').each(function(){
                    var self = jQuery(this);
                    var img = self.find('img');
                    self.backstretch(img.attr('src'));
                    img.remove();
                });


        }

    },

    do: {
        enable_parallax: function(){

            MWDNT.config.sklr_obj = skrollr.init({
                forceHeight: false
            });


            jQuery(".moei_section").each(function(){
                var target = jQuery(this).attr('data-slug');
                if(jQuery('#backstretch_'+target).length){
                    jQuery('.backstretch_'+target).hide();

                    if(jQuery('#backstretch_'+target).hasClass('show_now')){
                        jQuery('#backstretch_'+target).show();
                    }
                }
            });

            jQuery(".moei_section_inverted").each(function(){
                var target = jQuery(this).attr('data-slug');

                if(jQuery('#backstretch_'+target).length){
                    jQuery('.backstretch_'+target).hide();

                    if(jQuery('#backstretch_'+target).hasClass('show_now')){
                        jQuery('#backstretch_'+target).show();
                    }
                }
            });

        },

        disable_parallax: function(){
            if(MWDNT.config.sklr_obj != null){
                MWDNT.config.sklr_obj.destroy();
            }

            MWDNT.config.sklr_obj = null;


            jQuery(".moei_section").each(function(){
                var target = jQuery(this).attr('data-slug');

                if(jQuery('#backstretch_'+target).length){
                    jQuery('.backstretch_'+target).show();
                }
            });

            jQuery(".moei_section_inverted").each(function(){
                var target = jQuery(this).attr('data-slug');

                if(jQuery('#backstretch_'+target).length){
                    jQuery('.backstretch_'+target).show();
                }
            });

            jQuery('.backstretch_parallax').hide();

        }
    },

    tools: {
        log: function (msg) {
            if (typeof console === "undefined" || typeof console.log === "undefined") {
            } // do nothing
            else {
                console.log(msg);
            }
        },

        detectBrowser: function () {
            var retVal = false;
            if (MWDNT.config.browserVersion == null || MWDNT.config.browserName == null) {

                if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { //test for MSIE x.x;
                    MWDNT.config.browserVersion = new Number(RegExp.$1); // capture x.x portion and store as a number
                    MWDNT.config.browserName = "ie";
                }
                else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) { //test for Firefox/x.x or Firefox x.x (ignoring remaining digits);
                    MWDNT.config.browserVersion = new Number(RegExp.$1); // capture x.x portion and store as a number
                    MWDNT.config.browserName = "firefox";

                    // Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:10.0.1) Gecko/20100101 Firefox/10.0.1
                }
                else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) { //test for Opera/x.x or Opera x.x (ignoring remaining decimal places);
                    MWDNT.config.browserVersion = new Number(RegExp.$1); // capture x.x portion and store as a number
                    MWDNT.config.browserName = "opera";
                }
                else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
                    MWDNT.config.browserVersion = new Number(RegExp.$1); // capture x.x portion and store as a number
                    MWDNT.config.browserName = "chrome";

                    // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36
                }
                else if (/Safari[\/\s]/.test(navigator.userAgent)) {
                    MWDNT.config.browserName = "safari";

                    var temp = /Version[\/\s](\d+\.\d+)/.test(navigator.userAgent);
                    MWDNT.config.browserVersion = new Number(RegExp.$1);

                    // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0.5 Safari/536.30.1
                }

                // NOW CHECK FOR VALID RESPONSE
                if (MWDNT.config.browserVersion != null || MWDNT.config.browserName != null) {
                    if (MWDNT.config.browserName == 'ie' && MWDNT.config.browserVersion <= 9) {
                        MWDNT.config.isIE8orLower = true;
                    }

                    retVal = true;
                }
            }

            return retVal;
        },

        getBrowserInfo: function () {
            if (MWDNT.config.browserVersion == null || MWDNT.config.browserName == null) {
                // If either is not set, call set version.
                MWDNT.tools.detectBrowser();
            }

            return {"name": MWDNT.config.browserName, "version": MWDNT.config.browserVersion.valueOf()};
        },

        isMicro: function(){
            return jQuery(window).width() <= MWDNT.config.max_micro_width;
        },
        isMobile: function(){
            var width = jQuery(window).width();
            return (width > MWDNT.config.max_micro_width && width <= MWDNT.config.max_mobile_width);
        },
        isTablet: function(){
            var width = jQuery(window).width();
            return (width > MWDNT.config.max_mobile_width && width <= MWDNT.config.max_tablet_width);
        },
        isDesktop: function(){
            return jQuery(window).width() > MWDNT.config.max_tablet_width;
        }
    }

};

// PAGE INITIALATION HAPPENS HERE -- ]
//jQuery(document).ready(function() {
//    MWDNT.initialize(); // initialize this component
//});
