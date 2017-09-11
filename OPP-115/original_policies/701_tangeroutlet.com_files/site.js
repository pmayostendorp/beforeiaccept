
    
Site = {
    BASE_URL: '/',

    Url: {
        base: '/'
    },

    formBeTheFirstToknow: '#frm-be-the-first-to-know-footer',

    submitBeTheFirstToKnow: function (options) {
        
        $(this.formBeTheFirstToknow).ajaxSubmit({            
            success: function () {
                // Show Message
                //   Site.Alerts.setMessage('Thank you for your submission');
                //   Site.Alerts.showMessage();
                $.colorbox({
                    href: "/promotions/firsttoknow/thankyou.aspx",
                    iframe: true,
                    innerWidth: function () {
                        var $element = $.colorbox.element();
                        var $width = $element.attr('data-cboxWidth');
                        if (!$width) {
                            $width = '320';
                        }
                        return $width + 'px';
                    },
                    innerHeight: function () {
                        var $element = $.colorbox.element();
                        var $height = $element.attr('data-cboxHeight');
                        if (!$height || ($height == 'auto') ) {
                            $height = '240';
                        }
                        return $height + 'px';
                    },
                    opacity: 0,
                    fixed: true
                });

                //Reset form
                document.getElementById("frm-be-the-first-to-know-footer").reset();
                $("#frm-be-the-first-to-know-footer input[type=image]").removeAttr("disabled");
                $("#frm-be-the-first-to-know-footer input[type=image]").attr("src", "/images/common/nav/be-the-first-to-know-button-27x22.png");
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                Site.Alerts.setError('An error occurred.');
                Site.Alerts.showError();
                //Enable form submit
                $("#frm-be-the-first-to-know-footer input[type=image]").removeAttr("disabled");
                $("#frm-be-the-first-to-know-footer input[type=image]").attr("src", "/images/common/nav/be-the-first-to-know-button-27x22.png");
            }
        });
    },

    initialize: function () {
        $(Site.formBeTheFirstToknow).submit(function (event) {
            event.preventDefault();
            //Change submit to processing state
            $("#frm-be-the-first-to-know-footer input[type=image]").attr("disabled", "disabled");
            $("#frm-be-the-first-to-know-footer input[type=image]").attr("src", "/images/js-support/colorbox/loading.gif");
            Site.submitBeTheFirstToKnow();
        });

        /* $(Site.formBeTheFirstToknow).validate(); */
    
        // wire up colorbox popups
        $('a.colorbox-popup').colorbox({
            iframe: true,
            innerWidth: function () {
                var $element = $.colorbox.element();
                var $width = $element.attr('data-cboxWidth');
                if (!$width)
                {
                    $width = '400';
                }
                return $width + 'px';
            },
            innerHeight: function () {
                var $element = $.colorbox.element();
                var $height = $element.attr('data-cboxHeight');
                if (!$height || ($height == 'auto') ) {
                    return '85%';
                }
                else
                 {
                    return $height;
                }
            },
            opacity: 0,
            fixed: true,
            left: function () {
                var $element = $.colorbox.element();
                var $left = $element.attr('data-cboxLeft');
                if ($left) {
                    return ($(window).width() / 2) - ($('#wrapper').width() / 2) + 10;
                } else {
                    return false;
                }
                
            },
            transition: "none",
            maxWidth: '95%',
            maxHeight: '95%'
            /*
            onComplete: function () {
                isMobile = $(window).width() < 700;
                if (isMobile)
                {
                    $(this).colorbox.resize(
                        {
                            innerHeight:$('body').height
                        }
                    );
                }                
            }    
            */
        });
    }
};


Site.Functions = {

    switchFocus: function (id) {
        document.getElementById(id).focus();
    },

    openWin: function (page, windowName, windowFeatures) {
        return window.open(page, "", windowFeatures);
    },

    /***********
    * Dropdown change location
    * selector  select element
    * path    a path string representing the url path to take the user to
    *         the path should contain the string '<VALUE>' which will
    *         be replaced by the selected value retrieved from the
    *         selector element
    * target  target window or frame to have its location changed
    *
    *   Example:
    *
    *   A call to:
    *   changeLocation(this, '/center/<VALUE>/coupons', window)
    *
    *   where selector.options[selector.selectedIndex].value equals 'HIL'
    *   will change window.document.location to
    *   '/center/HIL/coupons'
    ************************************/
    changeLocation: function (selector, path, target) {
        if (selector !== "void") {
            var ident = selector.options[selector.selectedIndex].value;

            if (ident === "choose") {
                return;
            }

            if (selector.options[selector.selectedIndex].disabled) return;

            path = path.replace(/\<VALUE\>/, ident);
            var page = Site.BASE_URL + path;
            selector.selectedIndex = 0;
            target.document.location = page;
        }
    },

    /***********
    * Dropdown change brand
    * selector  select element
    * path    a path string representing the url path to take the user to
    *         the path should contain the string '<VALUE>' which will
    *         be replaced by the selected value retrieved from the
    *         selector element
    * target  target window or frame to have its location changed
    *
    *   Example:
    *
    *   A call to:
    *   changeLocation(this, '/center/<VALUE>/coupons', window)
    *
    *   where selector.options[selector.selectedIndex].value equals 'HIL'
    *   will change window.document.location to
    *   '/center/HIL/coupons'
    ************************************/
    changeBrand: function (selector, path, target) {
        if (selector !== "void") {
            var ident = selector.options[selector.selectedIndex].value;

            path = path.replace(/\<VALUE\>/, ident);
            var page = Site.BASE_URL + path;
            selector.selectedIndex = 0;
            target.document.location = page;
        }
    }
};

Site.Security = {
    loginDialog: null,

    submitLoginForm: function (options) {        
        return false;
    }
};

// Alerts on top of page
// Access like Site.Alerts.showMessage()
Site.Alerts = {

    initialize: function ()
    {
        // Wire up error box close
        $('#errorbox a').live('click', function () {
            $('#errorbox').hide();
            return false;
        });
        // Wire up message box close
        $('#messagebox a').live('click', function () {
            $('#messagebox').hide();
            return false;
        });
        // if body has class then show message box
        if ($('body').is('.have-messages')) {
            Site.Alerts.showMessage();
        }
        // if body has class then show error box
        if ($('body').is('.have-errors')) {
            Site.Alerts.showError();
        }
    },
    // Display message and fade out
    showMessage: function()
    {
        $("#messagebox").show();
        setTimeout(function () {
            $('#messagebox').fadeOut('fast');
        }, 5000);
    },
    // Display error
    showError: function () {
        $("#errorbox").show();        
    },
    // set message html/text
    setMessage: function (html) {
        $("#messagebox span").html(html);
    },
    // set error html/text
    setError: function (html) {
        $("#errorbox span").html(html);
    }
};

Site.UpdateCart = {

    initialize: function () {
        //Verify the contents of the cart by checking if the customer is TC mem
        var isMem = Site.Cookie.get("IsTangerClubMember");
        return isMem;
    },
    removeCoupon: function () {
        var fcDetails = new foxyCartDetails();
        var storedomain = fcDetails.UScartURL;
        //console.log("storedomain " + storedomain);
        var coupon_code_id = fcDetails.usWaiveCoup;
        jQuery.getJSON(storedomain + '?' + fcc.session_get() + '&cart=remove_coupon&coupon_code_id=' + coupon_code_id + '&output=json&callback=?', function (cart) {
            
        });	
    }
};

Site.Cookie = {
    set: function (name, value, expdays) {
        var exdate = new Date();
        exdate.setDate(exdate.getDate() + expdays);
        var c_value = escape(value) + ((expdays == null) ? "" : "; expires=" + exdate.toUTCString());
        document.cookie = name + "=" + c_value;
    },
    get: function (name) {
        var i, x, y, ARRcookies = document.cookie.split(";");
        for (i = 0; i < ARRcookies.length; i++) {
            x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
            y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
            x = x.replace(/^\s+|\s+$/g, "");
            if (x == name) {
                return unescape(y);
            }
        }
    }
}


$(document).ready(function () {
    Site.Alerts.initialize();
    var url = CheckIfUsingStylestopTemplate();
    if ((Site.UpdateCart.initialize()) && (url == true)) { Site.UpdateCart.removeCoupon(); };
    Site.initialize();
});

function CheckIfUsingStylestopTemplate() {
    var IsNotStylestop = true;
    var url = window.location.pathname;
    var params = url.split("/");
    if ((params[1] == "stylestop") || (params[2] == "pinksales")) {
        IsNotStylestop = false;
    }
    else {
        IsNotStylestop = true;
    }
    return IsNotStylestop;
}