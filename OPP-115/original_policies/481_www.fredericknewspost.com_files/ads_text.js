/*! TEXT AD PLUGIN | https://github.com/rodoabad/text-ads */
(function(window, document, $, undefined) {
    var pluginName = 'textAd',
        defaults = {};

    function Plugin(element, options) {
        this.element = element;
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }
    
    Plugin.prototype = {
        
        init: function() {
            var sTarget = this.options.ad.target ? this.options.ad.target : '_blank';
           
            if (this.options.ad.clickuri) {
                $(this.element).append('<span class="text-ad-title"><a href="' + this.options.ad.clickuri +'" target="' + sTarget + '" rel="nofollow">' + this.options.ad.title +'</a></span><br/><span class="text-ad-description">' + this.options.ad.text + '</span><span id="' + this.options.ad.textAdInfoId.replace('#','') + '" class="text-ad-info">Advertisement</span><div class="clear"></div>');
            } else {
                $(this.element).append('<span class="text-ad-title">' + this.options.ad.title + '</span><br/><span class="text-ad-description">' + this.options.ad.text + '</span><span id="' + this.options.ad.textAdInfoId.replace('#','') + '" class="text-ad-info">Advertisement</span><div class="clear"></div>');
            }
        }
        
    };

    $.fn[pluginName] = function(options) {
        return this.each(function() {
            // ENABLE SINGLE INSTANCE ON SINGLE ELEMENT
            /*if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            }*/
            // ENABLE MULTIPLE INSTANCES ON SINGLE ELEMENT
            new Plugin(this, options);
        });
    }
})(window, document, jQuery);

(function(window, document, $, undefined) {
    tncms_ad_text = function(ad, callback) {
        
        if (ad.adid) {
        
            ad['textId'] = '#text-ad-wrapper-' + ad.adid;
            ad['textAdInfoId'] = '#text-ad-info-' + ad.adid;
        
            var $divContainer = document.getElementById('tncms-region-ads-' + ad.position.replace(/[0-9]/g, '')),
                textWrapper = '<div id="' + ad.textId.replace('#','') + '" class="text-ad-wrapper" style="text-align: left"></div>';
                
            $divContainer.innerHTML += textWrapper;
                
                $(window).load(function() {
                    $(ad.textId).textAd({'ad': ad});
                });

        }
        if (callback && typeof(callback) === 'function') { callback(); }
    }
    
})(window, document, jQuery);