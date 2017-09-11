/*! EXPANDABLE AD PLUGIN | https://github.com/rodoabad/expandable-ads */
(function(window, document, $, undefined) {

    var pluginName = 'expandableAd',
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
        
            switch(this.options.ad.transition_direction) {
                case 'left':
                    this.slideLeft(this.element, this.options);
                    break;
                case 'right':
                    this.slideRight(this.element, this.options);
                    break;
                case 'up':
                    this.slideUp(this.element, this.options);
                    break;
                default:
                    this.slideDown(this.element, this.options);
                    break;
            }
        },
        
        slideLeft: function(element, options) {                
            $(options.ad.smallWrapperId).parent().parent().parent().css({'overflow': 'visible'});
            $(options.ad.smallId).toggleClass('active');
            $(options.ad.largeId).css({'position': 'absolute', 'right': parseInt(options.ad.width)}).animate({width: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
            if ($(options.ad.largeFlashCover).length > 0) {
                $(options.ad.largeFlashCover).css({'position': 'absolute', 'right': parseInt(options.ad.width)}).animate({width: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
            }
        },
        
        slideRight: function(element, options) {
            $(options.ad.smallWrapperId).parent().parent().parent().css({'overflow': 'visible'});
            $(options.ad.smallId).toggleClass('active');
            $(options.ad.largeId).css({'position': 'absolute', 'top': 0, 'left': parseInt(options.ad.width)}).animate({width: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
            if ($(options.ad.largeFlashCover).length > 0) {
                $(options.ad.largeFlashCover).css({'position': 'absolute', 'top': 0, 'left': parseInt(options.ad.width)}).animate({width: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
            }
        },
        
        slideUp: function(element, options) {
            $(options.ad.largeId).parent().parent().parent().css({'overflow': 'visible'});
            $(options.ad.largeWrapperId).css({'position': 'relative'});
            $(options.ad.smallId).toggleClass('active');
            $(options.ad.largeId).css({'position': 'absolute', 'left': 0, 'bottom': 0}).animate({height: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
            if ($(options.ad.largeFlashCover).length > 0) {
                $(options.ad.largeFlashCover).css({'position': 'absolute', 'left': 0, 'bottom': 0}).animate({height: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
            }
        },
        
        slideDown: function(element, options) {
            if (options.ad.overlay_content === '0') {
                $(options.ad.smallWrapperId).height('auto');
                $(options.ad.smallId).toggleClass('active');
                $(options.ad.largeId).animate({height: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
                if ($(options.ad.largeFlashCover).length > 0) {
                    $(options.ad.largeFlashCover).animate({height: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
                }
            } else {
                $(options.ad.smallWrapperId).parent().parent().parent().css({'overflow': 'visible'});             
                $(options.ad.smallId).toggleClass('active');
                $(options.ad.largeId).css({'top': parseInt(options.ad.height),'position': 'absolute', 'z-index': '998'}).animate({height: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
                if ($(options.ad.largeFlashCover).length > 0) {
                    $(options.ad.largeFlashCover).css({'top': parseInt(options.ad.height),'position': 'absolute', 'z-index': '999'}).animate({height: ['toggle', 'easeInOutExpo']}, getSpeed(options.ad.transition_speed));
                }
            }
        }
    };

    /* PRIVATE METHODS */
    var getSpeed = function(speed) {
            switch(speed) {
                case 'slow':
                    return 5000;
                case 'medium':
                    return 2500;
                case 'fast':
                    return 500;
                default:
                    return 0;
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
    };
})(window, document, jQuery);

/* IMAGE EXPANDABLE */
(function(window, document, $, undefined) {
    tncms_ad_expandable = function(ad, callback) {
            if(ad.adid) {
                // init
                
                ad['smallId'] = '#expandable-small-' + ad.adid;
                ad['largeId'] = '#expandable-large-' + ad.adid;
                    
                ad['smallWrapperId'] = '#expandable-small-wrapper-' + ad.adid;
                ad['largeWrapperId'] = '#expandable-large-wrapper-' + ad.adid;
                    
                ad['smallImageId'] = '#expandable-small-img-' + ad.adid;
                ad['largeImageId'] = '#expandable-large-img-' + ad.adid;
                
                ad['smallWrapperClass'] = 'expandable-small-wrapper-' + ad.position.replace(/[0-9]/g, '');
                ad['largeWrapperClass'] = 'expandable-large-wrapper-' + ad.position.replace(/[0-9]/g, '');
                
                var autoLimit = ((ad.auto_limit ? ad.auto_limit :'0') * 1000),
                    smallWidth = ad.width + 'px',
                    smallHeight = ad.height + 'px',
                    aTarget = (ad.target ? ad.target : '_blank');

                var smallImage = '<div id="' + ad.smallId.replace('#','') + '" style="margin: 0; padding: 0; position: relative; z-index: 200; cursor: pointer;"><img id="' + ad.smallImageId.replace('#','') + '" style="margin: 0; padding: 0; display: block; vertical-align: bottom;" src="' + ad.smallImage + '" alt="" border="0" /></div>';
                if(ad.clickuri) {
                    var largeImage = '<div id="' + ad.largeId.replace('#','') + '" style="margin: 0; padding: 0; display: none; z-index: 199; cursor: pointer; position: relative"><a rel="nofollow" href="' + ad.clickuri + '" target="' + aTarget + '"><img id="' + ad.largeImageId.replace('#','') + '" style="margin: 0; padding: 0; display: block; vertical-align: bottom;" src="' + ad.largeImage + '" alt="" border="0" /></a></div>';
                }
                else {
                    var largeImage = '<div id="' + ad.largeId.replace('#','') + '" style="margin: 0; padding: 0; display: none; z-index: 199; position: relative"><img id="' + ad.largeImageId.replace('#','') + '" style="margin: 0; padding: 0; display: block; vertical-align: bottom;" src="' + ad.largeImage + '" alt="" border="0" /></div>';
                }
                var smallWrapper = '<div id="' + ad.smallWrapperId.replace('#','') + '" class="expandable-small-wrapper ' + ad.smallWrapperClass + '" style="position: relative; width:' + smallWidth + '; height: ' + smallHeight + ';"></div>';
                var largeWrapper = '<div id="' + ad.largeWrapperId.replace('#','') + '" class="expandable-large-wrapper ' + ad.largeWrapperClass + '" style="margin: 0; padding: 0;"></div>';
                
                var $divContainer = $('#tncms-region-ads-' + ad.position.replace(/[0-9]/g, ''));
                $divContainer.append(smallWrapper).expandableAd({'ad': ad});
                
                $(window).load(function() {
                    $divContainer.parent().css({
                        'overflow': 'visible'
                    });
                    
                    switch(ad.transition_direction) {
                        case 'left':
                            $(ad.smallWrapperId).append(largeImage).append(smallImage);
                            break;
                        case 'up':
                            $(ad.smallWrapperId).append(largeWrapper).append(smallImage);
                            $(ad.largeWrapperId).append(largeImage);
                            break;
                        default:
                            $(ad.smallWrapperId).append(smallImage).append(largeImage);
                            break;
                    }

                    if (ad.start_open === '1') {
                        $(ad.largeId).delay(2500).expandableAd({'ad': ad});
                        if (autoLimit != 0) {
                            $(ad.largeId).delay(autoLimit).expandableAd({'ad': ad});
                        }
                        $(ad.smallId).click(function(){
                            $(ad.largeId).expandableAd({'ad': ad});
                        });
                    } else if (ad.start_open === '2') {
                        $divContainer
                        .on('mouseenter', function(e) {
                            $(ad.largeId).expandableAd({'ad': ad});
                        })
                        .on('mouseleave', function(e) {
                            $(ad.largeId).delay(1000).expandableAd({'ad': ad});
                        });
                    } else if (ad.start_open === '3') {
                        $(ad.largeId).delay(2500).expandableAd({'ad': ad});
                        $divContainer
                        .on('mouseenter', function(e) {
                            $(ad.largeId).expandableAd({'ad': ad});
                        })
                        .on('mouseleave', function(e) {
                            $(ad.largeId).delay(1000).expandableAd({'ad': ad});
                        });
                    } else {
                        $(ad.smallId).click(function(){
                            $(ad.largeId).expandableAd({'ad': ad});
                        });
                    }
                    
                });
            }
        if (callback && typeof(callback) === 'function') { callback(); }
    };
})(window, document, jQuery);

/* FLASH EXPANDABLE */
(function(window, document, $, undefined) {
    tncms_ad_flashexpandable = function(ad, callback) {

            if(ad.adid) {
                // init
                
                ad['smallId'] = '#expandable-small-' + ad.adid;
                ad['largeId'] = '#expandable-large-' + ad.adid;
                    
                ad['smallWrapperId'] = '#expandable-small-wrapper-' + ad.adid;
                ad['largeWrapperId'] = '#expandable-large-wrapper-' + ad.adid;
                    
                ad['smallFlashId'] = '#expandable-small-flash-' + ad.adid;
                ad['largeFlashId'] = '#expandable-large-flash-' + ad.adid;
                
                ad['smallFlashCover'] = '#expandable-small-flash-cover-' + ad.adid;
                ad['largeFlashCover'] = '#expandable-large-flash-cover-' + ad.adid;
                
                ad['smallWrapperClass'] = 'expandable-small-wrapper-' + ad.position.replace(/[0-9]/g, '');
                ad['largeWrapperClass'] = 'expandable-large-wrapper-' + ad.position.replace(/[0-9]/g, '');
                
                var autoLimit = ((ad.auto_limit ? ad.auto_limit :'0') * 1000),
                    
                    smallWidth = ad.width + 'px',
                    smallHeight = ad.height + 'px',
                    largeWidth = ad.largewidth + 'px',
                    largeHeight = ad.largeheight + 'px',
                
                    smallImage = ['<div id="', ad.smallFlashCover.replace('#',''), '" class="expandable-flash-cover" style="margin: 0; padding: 0; position: absolute; cursor: pointer; top: 0; left: 0; z-index: 300; height:', smallHeight, '; width:', smallWidth, '"></div><div id="', ad.smallId.replace('#',''), '" style="margin: 0; padding: 0; position: relative; z-index: 200;"><div id="', ad.smallFlashId.replace('#',''), '"></div></div>'].join('');
                    
                if (ad.transition_direction === 'left' || ad.transition_direction === 'right') {
                    var largeImage = ['<div id="', ad.largeFlashCover.replace('#',''), '" class="expandable-flash-cover" style="margin: 0; padding: 0;display: none; position: absolute; cursor: pointer; top: 0; z-index: 300; height:', largeHeight, '; width:', largeWidth, '"></div><div id="', ad.largeId.replace('#',''), '" style="margin: 0; padding: 0; display: none; z-index: 199;"><div id="', ad.largeFlashId.replace('#',''), '"></div></div>'].join('');
                } else if (ad.transition_direction === 'up') {
                    var largeImage = ['<div id="', ad.largeFlashCover.replace('#',''), '" class="expandable-flash-cover" style="margin: 0; padding: 0;display: none; position: absolute; cursor: pointer; left: 0; z-index: 300; height:', largeHeight, '; width:', largeWidth, '"></div><div id="', ad.largeId.replace('#',''), '" style="margin: 0; padding: 0; display: none; z-index: 199;"><div id="', ad.largeFlashId.replace('#',''), '"></div></div>'].join('');
                }  else {
                    var largeImage = ['<div id="', ad.largeFlashCover.replace('#',''), '" class="expandable-flash-cover" style="margin: 0; padding: 0;display: none; position: absolute; cursor: pointer; top: ', smallHeight,'; left: 0; z-index: 300; height:', largeHeight, '; width:', largeWidth, '"></div><div id="', ad.largeId.replace('#',''), '" style="margin: 0; padding: 0; display: none; z-index: 199;"><div id="', ad.largeFlashId.replace('#',''), '"></div></div>'].join('');
                }
                    
                var smallWrapper = ['<div id="', ad.smallWrapperId.replace('#',''), '" class="expandable-small-wrapper ' + ad.smallWrapperClass + '" style="position: relative; width:', smallWidth, ';"></div>'].join(''),
                    largeWrapper = ['<div id="', ad.largeWrapperId.replace('#',''), '" class="expandable-large-wrapper ' + ad.largeWrapperClass + '" style="margin: 0; padding: 0;"></div>'].join(''),

                    smallFlashvars = {},
                    smallParams = {wmode: 'opaque'},
                    smallAttributes = {styleclass: 'expandable-flash-ad-objects', style: 'margin: 0; padding: 0; vertical-align: bottom;'},
                    largeFlashvars = {},
                    largeParams = {wmode: 'opaque'},
                    largeAttributes = {styleclass: 'expandable-flash-ad-objects', style: 'margin: 0; padding: 0; vertical-align: bottom;'};

                var $divContainer = $('#tncms-region-ads-' + ad.position.replace(/[0-9]/g, ''));
                $divContainer.append(smallWrapper).expandableAd({'ad': ad});
                
                $(window).load(function() {
                    $divContainer.parent().css({ 'overflow': 'visible' });
                    if (ad.transition_direction === 'left') {
                        $(ad.smallWrapperId).append(largeImage).append(smallImage);
                    } else if (ad.transition_direction === 'up') {
                        $(ad.smallWrapperId).append(largeWrapper).append(smallImage);
                        $(ad.largeWrapperId).append(largeImage);
                    } else {
                        $(ad.smallWrapperId).append(smallImage).append(largeImage);
                    }

                    swfobject.embedSWF(encodeURI(ad.smallFlash.replace('#','')), ad.smallFlashId.replace('#',''), ad.width, ad.height, '11.0.0', false, smallFlashvars, smallParams, smallAttributes);
                    swfobject.embedSWF(encodeURI(ad.largeFlash.replace('#','')), ad.largeFlashId.replace('#',''), ad.largewidth, ad.largeheight, '11.0.0', false, largeFlashvars, largeParams, largeAttributes);
                    
                    if (ad.start_open === '1') {
                        $(ad.largeId).delay(2500).expandableAd({'ad': ad});
                        if (autoLimit != 0) { $(ad.largeId).delay(autoLimit).expandableAd({'ad': ad}); }
                        $(ad.smallFlashCover).click(function(){ $(ad.largeId).expandableAd({'ad': ad}); });
                        $(ad.largeFlashCover).click(function(){ window.open(ad.clickuri); });
                    } else if (ad.start_open === '2') {
                        $divContainer
                        .on('mouseenter', function(e) {
                            $(ad.largeId).expandableAd({'ad': ad});
                        })
                        .on('mouseleave', function(e) {
                            $(ad.largeId).delay(1000).expandableAd({'ad': ad});
                        });
                        $(ad.largeFlashCover).click(function(){ window.open(ad.clickuri); });
                    } else if (ad.start_open === '3') {
                        $(ad.largeId).delay(2500).expandableAd({'ad': ad});
                        $divContainer
                        .on('mouseenter', function(e) {
                            $(ad.largeId).expandableAd({'ad': ad});
                        })
                        .on('mouseleave', function(e) {
                            $(ad.largeId).delay(1000).expandableAd({'ad': ad});
                        });
                        $(ad.largeFlashCover).click(function(){ window.open(ad.clickuri); });
                    } else {
                        $(ad.smallFlashCover).click(function(){ $(ad.largeId).expandableAd({'ad': ad}); });
                        $(ad.largeFlashCover).click(function(){ window.open(ad.clickuri); });
                    }
                });
            }
        if (callback && typeof(callback) === 'function') { callback(); }
    };
})(window, document, jQuery);