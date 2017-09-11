//MAKE THESE GLOBALLY AVAILABLE
if (typeof browser_pre_version === 'undefined') {
    var browser_pre_version = false;
}
var sniffer = new Object({
	info_b:false,
	info_v:browser_pre_version,
	info_p:false,
});
$(function () {
    // LAZY LOAD
    $('.blox-img-loader')
        .show()
        .lazyload({
            'effect': 'fadeIn',
            'failure_limit': 100,
            'effectspeed': 1000,
            'skip_invisible': false,
            'threshold': 1
        });

    // BROWSER CLASSES
    (function(window, document, $, undefined) {
        if ($.browser.mozilla) {
            sniffer.info_b = 'mozilla';
        } else if ($.browser.webkit) {
            sniffer.info_b = 'webkit';
        } else if ($.browser.msie) {
            sniffer.info_b = 'msie';
        }

        sniffer.info_v = (sniffer.info_b == 'msie' && sniffer.info_v == 'vundefined_undefined') ? 'v7_0' : 'v' + $.browser.version.replace(/\./g,'_'),
        sniffer.info_p = (navigator.platform == 'MacIntel' || navigator.platform == 'MacPPC') ? 'mac' : 'pc';

        $('body').addClass(sniffer.info_v).addClass(sniffer.info_b).addClass(sniffer.info_v).addClass(sniffer.info_p).trigger('defined');
    })(window, document, jQuery);

    // AD REGIONS
    (function(window, document, $, undefined) {
        var urlMode = $.getUrlVar('mode'),
            $TNCMSRegionAds = $('.tncms-region-ads');

        if (urlMode != 'print') {
            $TNCMSRegionAds.each(function(){
                if($(this).find('img,iframe,script,embed,object').length > 0) $(this).addClass('blox-filled');
            });
        }
    })(window, document, jQuery);

    // NAVIGATION
    (function(window, document, $, undefined) {
        $('ul.dropdown-linear .active-horizontal').addClass("current-section");
        $('ul.dropdown-linear li.inactive').hover(function() {
                $('ul.dropdown-linear .current-section').removeClass('active-horizontal').addClass('inactive');
                $(this).addClass('active-horizontal').removeClass('inactive');
            },
            function(){
                $(this).removeClass('active-horizontal').addClass('inactive');
                $('ul.dropdown-linear .current-section').addClass('active-horizontal').removeClass('inactive');
            }
        );
    })(window, document, jQuery);

    // EXTERNAL LINKS
    (function (window, document, $, undefined) {
	$('a[rel="external"], a[rel="nofollow external"]').off('click').click(function(e){
          window.open($(this).attr('href'));
          e.preventDefault();
        });
    })(window, document, jQuery);

    //////////////////// EVERYTHING BELOW THIS LINE IS NOT OPTIMIZED ////////////////////

    // OLD TABS
    (function (window, document, $, undefined) {
        var sets = document.getElementsByTagName("div");
        for (var i = 0; i < sets.length; i++) {
            if (sets[i].className.indexOf("tabset") != -1) {
                var tabs = [];
                var links = sets[i].getElementsByTagName("a");
                for (var j = 0; j < links.length; j++) {
                    if (links[j].className.indexOf("tab") != -1) {
                        tabs.push(links[j]);
                        links[j].tabs = tabs;
                        var c = document.getElementById(links[j].href.substr(links[j].href.indexOf("#") + 1));

                        //reset all tabs on start
                        if (c) if (links[j].className.indexOf("active") != -1) c.style.display = "block";
                        else c.style.display = "none";

                        links[j].onclick = function () {
                            var c = document.getElementById(this.href.substr(this.href.indexOf("#") + 1));
                            if (c) {
                                //reset all tabs before change
                                for (var i = 0; i < this.tabs.length; i++) {
                                    var tab = document.getElementById(this.tabs[i].href.substr(this.tabs[i].href.indexOf("#") + 1));
                                    if (tab) {
                                        tab.style.display = "none";
                                    }
                                    this.tabs[i].className = this.tabs[i].className.replace("active", "");
                                }
                                this.className += " active";
                                c.style.display = "block";
                                return false;
                            }
                        };
                    }
                }
            }
        }
    })(window, document, jQuery);
});