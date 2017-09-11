// JQuery Setup
var cartlinks, resize;
$(document).ready(function () {
    //Foxycart Size
    // This class foxyCartDetails is defined in the Main template 
    var fcDim = new foxyCartDetails();
    var currentURLHost = window.location.host;
    if ((currentURLHost.indexOf('tangeroutlet.com') > 0) || (currentURLHost.indexOf('tangeroutletcanada.com') > 0)) {
       // Temp Disable
      //  emailPopup.show();
    }

    // automatically find setup foxycart links
    $($.fn.multicart.defaults.defaultSelector).hide();
    $($.fn.multicart.defaults.autoSelector).hide();
    cartlinks = $($.fn.multicart.defaults.autoSelector).multicart();

    
    /*
     * 
     HANDLES PROMOS WITH LONGER HEIGHT
     *
     */
    //var tabclickCount = 0;


    /******For when super long promo is in position one******/
    //jQuery('body').removeClass('resize');
 
    //   jQuery(".tab-area .tab-content").removeAttr('style');
    //   jQuery(".tab-area .tab-content div.stylemaker-container, .tab-area .tab-content div.savannah-go").removeAttr('style');
 
    //   if (jQuery(window).width() > 1224) {
    //           $(".tab-area ul.tabset li a").css("padding", "18px 10px 19px 10px");
    //      }
    //   if ((jQuery(window).width() <= 1200) && (jQuery(window).width() >= 1000)) {
    //           $(".tab-area ul.tabset li a").css("padding", "18px 10px 19px 10px");
          
    //       }



    //$(".tab-area ul.tabset li a.stylemaker-containerLink").bind("click", function () {
 
    //    jQuery('body').removeClass('resize');
       
    //    jQuery(".tab-area .tab-content").removeAttr('style');
    //    jQuery(".tab-area .tab-content div.stylemaker-container").removeAttr('style');

          
    //        tabclickCount = 0;
    //});

    //$(".tab-area ul.tabset li a.FoxwoodsGOLink").bind("click", function () {

    //   setTimeout(function () {
    //       $(window).resize();

    //   }, 400);

    //    tabclickCount = 0;

    //});


    //$(".tab-area ul.tabset li a").not(".FoxwoodsGOLink").bind("click", function () {
      
    //    $('body').addClass('resize');

    //    if (tabclickCount == 0) {
    //        setTimeout(function () {
    //            $(window).resize();

    //        }, 400);
    //    }
    //    tabclickCount++;
    //});


    /**
     * END OF LONG PROMO JS ASSIST
     **/


    
});

function getOffset(div) {
    var offsetTop = parseInt(jQuery(div).css('top').replace(/[^-\d\.]/g, ''));
    var offsetPaddingTop = parseInt(jQuery(div).css('padding-top').replace(/[^-\d\.]/g, ''));
    var offsetPaddingBottom = parseInt(jQuery(div).css('padding-bottom').replace(/[^-\d\.]/g, ''));
    var offset = offsetTop + offsetPaddingTop + offsetPaddingBottom;
    return offset;
}

//Set the height of the containing Div to the height of the insidediv plus top padding
//Useful to get absolute position insideDiv but still push the height of the containing div
//If bothways is true, set the inside div height when smaller than the containing div
function initContainDivHeight(containingDiv, insideDiv, bothWays) {
    bothWays = typeof bothWays !== 'undefined' ? bothWays : false;
    var offset = getOffset(insideDiv);
    var insideDivHeight = jQuery(insideDiv).height();
    var insideDivTotalHeight = insideDivHeight + offset;
    var containingDivHeight = jQuery(containingDiv).height();

    if ((containingDivHeight > insideDivTotalHeight) && bothWays) {
        jQuery(insideDiv).height(containingDivHeight - offset);
    } else if (containingDivHeight < insideDivTotalHeight) {
        jQuery(containingDiv).height(insideDivTotalHeight);
    }

}




// page init
jQuery(function () {

    initOpenClose();
    initTabs();
    jQuery('input, textarea').placeholder();
    initLayout();
    initSlideDrop();
    initChildClasses();
});

// add classes to support css3 selectors in old browsers
function initChildClasses() {
    jQuery('.brand-list ul').children(':nth-child(even)').addClass('even');
}

jQuery(window).load(function () {

})

// content tabs init
function initTabs() {


    jQuery('ul.tabset').contentTabs({
        addToParent: true,
        animSpeed: 400,
        effect: 'fade',
        tabLinks: 'a'





    });
}

// open-close init
function initOpenClose() {
    jQuery('.nav-holder').openClose({
        activeClass: 'active',
        opener: '.opener',
        slider: '.popup',
        animSpeed: 400,
        effect: 'slide'
    });
}

// align blocks height
function initSameHeight() {
    jQuery('section.tab-area').sameHeight({
        elements: 'ul.tabset, .bg, div.tab-content > div, .tab-content',
        flexible: true
    });
}

// responsive layout handling
function initLayout() {
    var holder = jQuery('.nav-holder'),
		popup = holder.find('.popup');

    // handle layout resize
    ResponsiveHelper.addRange({
        '748..': {
            on: function () {
                jQuery('body').addClass('resize');
                setTimeout(function () {

                    /*HANDLES PROMOS WITH LONGER HEIGHT when in position one*/
                    //if (jQuery(".tab-area ul.tabset li#stylemaker-containerLink").hasClass("active")) {
                    //    jQuery('body').removeClass('resize');
                  
                    //}
               
                        initSameHeight();
                        initItemsHeight();
                 
                }, 400);

                popup.removeAttr('style').hide();
                popup.find('ul > li').removeClass('open-this');
                holder.removeClass('active');
                popup.find('.sub-nav').removeAttr('style');
            },
            off: function () {
                jQuery('body').removeClass('resize');
                jQuery('.tab-area .tabset > li').removeAttr('style');
            }
        }
    });
}

//init items tabset height
function initItemsHeight() {
    jQuery('.tab-area').each(function () {
        var area = jQuery(this),
			tabset = area.find('.tabset'),
			items = tabset.find('>li');


        function resize() {
          //  alert("test");
            if (jQuery('body').hasClass('resize')) {
                items.each(function () {
                    var item = jQuery(this);
                    item.removeAttr('style')
                    item.css({
                        height: Math.ceil(area.height() / items.length)
                    });
                });
            }
        }
   

        resize();
        jQuery(window).resize(function () {
            items.removeAttr('style');
            setTimeout(function () {
                resize();
            }, 100)
        });
    });
}



//init slide drop
function initSlideDrop() {
    var openClass = 'open-this';
    jQuery('.nav-holder').each(function () {
        var holder = jQuery(this),
			popup = holder.find('.popup');

        popup.find(' > ul').each(function () {
            var list = jQuery(this),
				items = list.find('>li'),
				opener = jQuery('.nav-holder .opener');

            items.each(function () {
                var item = jQuery(this);

                if (item.find('.sub-nav').length) {
                    var link = item.find('>a');
                    var drop = item.find('.sub-nav');
                    var close = drop.find('.back');

                    link.click(function (e) {
                        if (jQuery(window).width() < 768) {
                            drop.show();
                            jQuery('body').css({
                                overflowX: 'hidden'
                            });
                            popup.stop().animate({ marginLeft: -popup.width() }, { duration: 500 });
                            item.addClass(openClass);
                            e.preventDefault();
                        }
                    });

                    close.click(function (e) {
                        popup.stop().animate({ marginLeft: 0 }, {
                            duration: 500, complete: function () {
                                drop.hide();
                                jQuery('body').css({
                                    overflowX: 'auto'
                                });
                                item.removeClass(openClass);
                            }
                        })
                        e.preventDefault();
                    });

                    opener.click(function () {
                        items.removeClass(openClass);
                        drop.hide();
                        popup.css({ marginLeft: 0 })
                    });

                    jQuery(window).resize(function () {
                        if (item.hasClass(openClass)) {
                            popup.css({
                                marginLeft: -jQuery('.popup').width()
                            })
                        }
                    });
                }
            });
        });
    });
}

/*
 * Responsive Layout helper
 */
ResponsiveHelper = (function($){
	// init variables
	var handlers = [];
	var win = $(window), prevWinWidth;

	// prepare resize handler
	function resizeHandler() {
		var winWidth = win.width();
		if(winWidth !== prevWinWidth) {
			prevWinWidth = winWidth;

			// loop through range groups
			$.each(handlers, function(index, rangeObject){
				// disable current active area if needed
				$.each(rangeObject.data, function(property, item) {
					if((winWidth < item.range[0] || winWidth > item.range[1]) && item.currentActive) {
						item.currentActive = false;
						if(typeof item.disableCallback === 'function') {
							item.disableCallback();
						}
					}
				});

				// enable areas that match current width
				$.each(rangeObject.data, function(property, item) {
					if(winWidth >= item.range[0] && winWidth <= item.range[1] && !item.currentActive) {
						// make callback
						item.currentActive = true;
						if(typeof item.enableCallback === 'function') {
							item.enableCallback();
						}
						return false;
					}
				});
			});
		}
	}
	win.bind('load', function(){
		win.bind('resize orientationchange', resizeHandler);
	});

	// range parser
	function parseRange(rangeStr) {
		var rangeData = rangeStr.split('..');
		var x1 = parseInt(rangeData[0], 10) || -Infinity;
		var x2 = parseInt(rangeData[1], 10) || Infinity;
		return [x1, x2].sort(function(a, b){
			return a - b;
		});
	}

	// export public functions
	return {
		addRange: function(ranges) {
			// parse data and add items to collection
			var result = {data:{}};
			$.each(ranges, function(property, data){
				result.data[property] = {
					range: parseRange(property),
					enableCallback: data.on,
					disableCallback: data.off
				};
			});
			handlers.push(result);

			// call resizeHandler to recalculate all events
			resizeHandler();
		}
	};
}(jQuery));

/*
 * jQuery Tabs plugin
 */
;(function($){
	$.fn.contentTabs = function(o){
		// default options
		var options = $.extend({
			activeClass:'active',
			addToParent:false,
			autoHeight:false,
			autoRotate:false,
			animSpeed:400,
			switchTime:3000,
			effect: 'fade', // "fade", "slide"
			tabLinks:'a',
			attrib:'href',
			event: 'click',
			activate: function () { }
		},o);

		return this.each(function(){
			var tabset = $(this);
			var tabLinks = tabset.find(options.tabLinks);
			var tabLinksParents = tabLinks.parent();
			var prevActiveLink = tabLinks.eq(0), currentTab, animating;
			var tabHolder;
			
			// init tabLinks
			tabLinks.each(function(){
				var link = $(this);
				var href = link.attr(options.attrib);
				var parent = link.parent();
				href = href.substr(href.lastIndexOf('#'));
				
				// get elements
				var tab = $(href);
				link.data('cparent', parent);
				link.data('ctab', tab);
				
				// find tab holder
				if(!tabHolder && tab.length) {
					tabHolder = tab.parent();
				}
				
				// show only active tab
				if((options.addToParent ? parent : link).hasClass(options.activeClass)) {
					prevActiveLink = link; currentTab = tab;
					tab.removeClass(tabHiddenClass).width('');
					contentTabsEffect[options.effect].show({tab:tab, fast:true});
				} else {
					contentTabsEffect[options.effect].hide({tab:tab, fast:true});
					tab.width(tab.width()).addClass(tabHiddenClass);
				}
				
				// event handler
				link.bind(options.event, function(e){
					if(link != prevActiveLink && !animating) {
						switchTab(prevActiveLink, link);
						prevActiveLink = link;
					}
				});
				if(options.attrib === 'href') {
					link.bind('click', function(e){
						e.preventDefault();
					});
				}
			});
			
			// tab switch function
			function switchTab(oldLink, newLink) {
				animating = true;
				var oldTab = oldLink.data('ctab');
				var newTab = newLink.data('ctab');
				prevActiveLink = newLink;
				currentTab = newTab;

				
				// refresh pagination links
				(options.addToParent ? tabLinksParents : tabLinks).removeClass(options.activeClass);
				(options.addToParent ? newLink.data('cparent') : newLink).addClass(options.activeClass);
				
				// hide old tab
				resizeHolder(oldTab, true);
				contentTabsEffect[options.effect].hide({
					speed: options.animSpeed,
					tab:oldTab,
					complete: function() {
						// show current tab
						resizeHolder(newTab.removeClass(tabHiddenClass).width(''));
						contentTabsEffect[options.effect].show({
							speed: options.animSpeed,
							tab:newTab,
							complete: function() {
								if(!oldTab.is(newTab)) {
									oldTab.width(oldTab.width()).addClass(tabHiddenClass);
								}
								animating = false;
								resizeHolder(newTab, false);
								autoRotate();
								options.activate();
							}
						});
					}
				});
			}
			
			// holder auto height
			function resizeHolder(block, state) {
				var curBlock = block && block.length ? block : currentTab;
				if(options.autoHeight && curBlock) {
					tabHolder.stop();
					if(state === false) {
						tabHolder.css({height:''});
					} else {
						var origStyles = curBlock.attr('style');
						curBlock.show().css({width:curBlock.width()});
						var tabHeight = curBlock.outerHeight(true);
						if(!origStyles) curBlock.removeAttr('style'); else curBlock.attr('style', origStyles);
						if(state === true) {
							tabHolder.css({height: tabHeight});
						} else {
							tabHolder.animate({height: tabHeight}, {duration: options.animSpeed});
						}
					}
				}
			}
			if(options.autoHeight) {
				$(window).bind('resize orientationchange', function(){
					resizeHolder(currentTab, false);
				});
			}
			
			// autorotation handling
			var rotationTimer;
			function nextTab() {
				var activeItem = (options.addToParent ? tabLinksParents : tabLinks).filter('.' + options.activeClass);
				var activeIndex = (options.addToParent ? tabLinksParents : tabLinks).index(activeItem);
				var newLink = tabLinks.eq(activeIndex < tabLinks.length - 1 ? activeIndex + 1 : 0);
				prevActiveLink = tabLinks.eq(activeIndex);
				switchTab(prevActiveLink, newLink);
			}
			function autoRotate() {
				if(options.autoRotate && tabLinks.length > 1) {
					clearTimeout(rotationTimer);
					rotationTimer = setTimeout(function() {
						if(!animating) {
							nextTab();
						} else {
							autoRotate();
						}
					}, options.switchTime);
				}
			}
			autoRotate();
		});
	};
	
	// add stylesheet for tabs on DOMReady
	var tabHiddenClass = 'js-tab-hidden';
	$(function() {
		var tabStyleSheet = $('<style type="text/css">')[0];
		var tabStyleRule = '.'+tabHiddenClass;
		tabStyleRule += '{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';
		if (tabStyleSheet.styleSheet) {
			tabStyleSheet.styleSheet.cssText = tabStyleRule;
		} else {
			tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));
		}
		$('head').append(tabStyleSheet);
	});
	
	// tab switch effects
	var contentTabsEffect = {
		none: {
			show: function(o) {
				o.tab.css({display:'block'});
				if(o.complete) o.complete();
			},
			hide: function(o) {
				o.tab.css({display:'none'});
				if(o.complete) o.complete();
			}
		},
		fade: {
			show: function(o) {
				if(o.fast) o.speed = 1;
				o.tab.fadeIn(o.speed);
				if(o.complete) setTimeout(o.complete, o.speed);
			},
			hide: function(o) {
				if(o.fast) o.speed = 1;
				o.tab.fadeOut(o.speed);
				if(o.complete) setTimeout(o.complete, o.speed);
			}
		},
		slide: {
			show: function(o) {
				var tabHeight = o.tab.show().css({width:o.tab.width()}).outerHeight(true);
				var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
				tmpWrap.css({width:'100%', overflow:'hidden', position:'relative'}); o.tab.css({marginTop:-tabHeight,display:'block'});
				if(o.fast) o.speed = 1;
				o.tab.animate({marginTop: 0}, {duration: o.speed, complete: function(){
					o.tab.css({marginTop: '', width: ''}).insertBefore(tmpWrap);
					tmpWrap.remove();
					if(o.complete) o.complete();
				}});
			},
			hide: function(o) {
				var tabHeight = o.tab.show().css({width:o.tab.width()}).outerHeight(true);
				var tmpWrap = $('<div class="effect-div">').insertBefore(o.tab).append(o.tab);
				tmpWrap.css({width:'100%', overflow:'hidden', position:'relative'});
				
				if(o.fast) o.speed = 1;
				o.tab.animate({marginTop: -tabHeight}, {duration: o.speed, complete: function(){
					o.tab.css({display:'none', marginTop:'', width:''}).insertBefore(tmpWrap);
					tmpWrap.remove();
					if(o.complete) o.complete();
				}});
			}
		}
	};
}(jQuery));

/*
 * jQuery Open/Close plugin
 */
;(function($){
	$.fn.openClose = function(o){
		// default options
		var options = $.extend({
			addClassBeforeAnimation: true,
			activeClass:'active',
			opener:'.opener',
			slider:'.slide',
			animSpeed: 400,
			animStart:false,
			animEnd:false,
			effect:'fade',
			event: 'click'
		},o);

		return this.each(function(){
			// options
			var holder = $(this), animating;
			var opener = $(options.opener, holder);
			var slider = $(options.slider, holder);

			if(slider.length) {
				slider[holder.hasClass(options.activeClass) ? 'show' : 'hide']();
			} else {
				return;
			}

			opener.bind(options.event, function(e) {
				var shouldCollapse = holder.hasClass(options.activeClass);
				if(!animating) {
					animating = true;
					if(typeof options.animStart === 'function') {
						options.animStart();
					}
					if(options.addClassBeforeAnimation) {
						holder[shouldCollapse ? 'removeClass' : 'addClass'](options.activeClass);
					}
					toggleEffects[options.effect][shouldCollapse ? 'hide' : 'show']({
						box: slider,
						speed: options.animSpeed,
						complete: function() {
							animating = false;
							if(!options.addClassBeforeAnimation) {
								holder[shouldCollapse ? 'removeClass' : 'addClass'](options.activeClass);
							}
							if(typeof options.animEnd === 'function') {
								options.animEnd();
							}
						}
					});
				}
				e.preventDefault();
			});

			if(options.event === 'over') {
				opener.bind('mouseenter', function() {
					holder.removeClass(options.activeClass);
					opener.trigger(options.event);
				});
				holder.bind('mouseleave', function() {
					holder.addClass(options.activeClass);
					opener.trigger(options.event);
				});
			}
		});
	};
	
	// animation effects
	var toggleEffects = {
		slide: {
			show: function(o) {
				o.box.slideDown(o.speed, o.complete);
			},
			hide: function(o) {
				o.box.slideUp(o.speed, o.complete);
			}
		},
		fade: {
			show: function(o) {
				o.box.fadeIn(o.speed, o.complete);
			},
			hide: function(o) {
				o.box.fadeOut(o.speed, o.complete);
			}
		},
		none: {
			show: function(o) {
				o.box.show(0, o.complete);
			},
			hide: function(o) {
				o.box.hide(0, o.complete);
			}
		}
	};
}(jQuery));

/*
 * jQuery SameHeight plugin
 */
;(function($){
	$.fn.sameHeight = function(opt) {
		var options = $.extend({
			skipClass: 'same-height-ignore',
			leftEdgeClass: 'same-height-left',
			rightEdgeClass: 'same-height-right',
			elements: '>*',
			flexible: false,
			multiLine: false,
			useMinHeight: false
		},opt);
		return this.each(function(){
			var holder = $(this), postResizeTimer, ignoreResize;
			var elements = holder.find(options.elements).not('.' + options.skipClass);
			if(!elements.length) return;
			
			// resize handler
			function doResize() {
				elements.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', '');
				if(options.multiLine) {
					// resize elements row by row
					resizeElementsByRows(elements, options);
				} else {
					// resize elements by holder
					resizeElements(elements, holder, options);
				}
			}
			doResize();
			
			// handle flexible layout / font resize
			var delayedResizeHandler = function() {
				if(!ignoreResize) {
					ignoreResize = true;
					doResize();
					clearTimeout(postResizeTimer);
					postResizeTimer = setTimeout(function() {
						doResize();
						setTimeout(function(){
							ignoreResize = false;
						}, 10);
					}, 100);
				}
			};

			// handle flexible/responsive layout
			if(options.flexible) {
				$(window).bind('resize orientationchange fontresize', delayedResizeHandler);
			}

			// handle complete page load including images and fonts
			$(window).bind('load', delayedResizeHandler);
		});
	};
	
	// detect css min-height support
	var supportMinHeight = typeof document.documentElement.style.maxHeight !== 'undefined';
	
	// get elements by rows
	function resizeElementsByRows(boxes, options) {
		var currentRow = $(), maxHeight, firstOffset = boxes.eq(0).offset().top;
		boxes.each(function(ind){
			var curItem = $(this);
			if(curItem.offset().top === firstOffset) {
				currentRow = currentRow.add(this);
			} else {
				maxHeight = getMaxHeight(currentRow);
				resizeElements(currentRow, maxHeight, options);
				currentRow = curItem;
				firstOffset = curItem.offset().top;
			}
		});
		if(currentRow.length) {
			maxHeight = getMaxHeight(currentRow);
			resizeElements(currentRow, maxHeight, options);
		}
	}
	
	// calculate max element height
	function getMaxHeight(boxes) {
		var maxHeight = 0;
		boxes.each(function(){
			maxHeight = Math.max(maxHeight, $(this).outerHeight());
		});
		return maxHeight;
	}
	
	// resize helper function
	function resizeElements(boxes, parent, options) {
		if(jQuery('body').hasClass('resize')){
			var parentHeight = typeof parent === 'number' ? parent : parent.height();
			boxes.removeClass(options.leftEdgeClass).removeClass(options.rightEdgeClass).each(function(i){
				var element = $(this);
				var depthDiffHeight = 0;
				
				if(typeof parent !== 'number') {
					element.parents().each(function(){
						var tmpParent = $(this);
						if(this === parent[0]) {
							return false;
						} else {
							depthDiffHeight += tmpParent.outerHeight() - tmpParent.height();
						}
					});
				}
				var calcHeight = parentHeight - depthDiffHeight - (element.outerHeight() - element.height());
				if(calcHeight > 0) {
					element.css(options.useMinHeight && supportMinHeight ? 'minHeight' : 'height', calcHeight);
				}
			});
			boxes.filter(':first').addClass(options.leftEdgeClass);
			boxes.filter(':last').addClass(options.rightEdgeClass);
		}

	}
}(jQuery));

/*
 * jQuery FontResize Event
 */
jQuery.onFontResize = (function($) {
	$(function() {
		var randomID = 'font-resize-frame-' + Math.floor(Math.random() * 1000);
		var resizeFrame = $('<iframe>').attr('id', randomID).addClass('font-resize-helper');
		
		// required styles
		resizeFrame.css({
			width: '100em',
			height: '10px',
			position: 'absolute',
			borderWidth: 0,
			top: '-9999px',
			left: '-9999px'
		}).appendTo('body');
		
		// use native IE resize event if possible
		if (document.documentMode && document.documentMode < 9) {
			resizeFrame.bind('resize', function () {
				$.onFontResize.trigger(resizeFrame[0].offsetWidth / 100);
			});
		}
		// use script inside the iframe to detect resize for other browsers
		else {
			var doc = resizeFrame[0].contentWindow.document;
			doc.open();
			doc.write('<scri' + 'pt>window.onload = function(){var em = parent.jQuery("#' + randomID + '")[0];window.onresize = function(){if(parent.jQuery.onFontResize){parent.jQuery.onFontResize.trigger(em.offsetWidth / 100);}}};</scri' + 'pt>');
			doc.close();
		}
		jQuery.onFontResize.initialSize = resizeFrame[0].offsetWidth / 100;
	});
	return {
		// public method, so it can be called from within the iframe
		trigger: function (em) {
			$(window).trigger("fontresize", [em]);
		}
	};
}(jQuery));

/*! http://mths.be/placeholder v2.0.6 by @mathias */
;(function(window, document, $) {

	var isInputSupported = 'placeholder' in document.createElement('input'),
	    isTextareaSupported = 'placeholder' in document.createElement('textarea'),
	    prototype = $.fn,
	    valHooks = $.valHooks,
	    hooks,
	    placeholder;
	if(navigator.userAgent.indexOf('Opera/') != -1) {
		isInputSupported = isTextareaSupported = false;
	}
	if (isInputSupported && isTextareaSupported) {

		placeholder = prototype.placeholder = function() {
			return this;
		};

		placeholder.input = placeholder.textarea = true;

	} else {

		placeholder = prototype.placeholder = function() {
			var $this = this;
			$this
				.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]')
				.not('.placeholder')
				.bind({
					'focus.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				})
				.data('placeholder-enabled', true)
				.trigger('blur.placeholder');
			return $this;
		};

		placeholder.input = isInputSupported;
		placeholder.textarea = isTextareaSupported;

		hooks = {
			'get': function(element) {
				var $element = $(element);
				return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
			},
			'set': function(element, value) {
				var $element = $(element);
				if (!$element.data('placeholder-enabled')) {
					return element.value = value;
				}
				if (value == '') {
					element.value = value;
					// Issue #56: Setting the placeholder causes problems if the element continues to have focus.
					if (element != document.activeElement) {
						// We can’t use `triggerHandler` here because of dummy text/password inputs :(
						setPlaceholder.call(element);
					}
				} else if ($element.hasClass('placeholder')) {
					clearPlaceholder.call(element, true, value) || (element.value = value);
				} else {
					element.value = value;
				}
				// `set` can not return `undefined`; see http://jsapi.info/jquery/1.7.1/val#L2363
				return $element;
			}
		};

		isInputSupported || (valHooks.input = hooks);
		isTextareaSupported || (valHooks.textarea = hooks);

		$(function() {
			// Look for forms
			$(document).delegate('form', 'submit.placeholder', function() {
				// Clear the placeholder values so they don’t get submitted
				var $inputs = $('.placeholder', this).each(clearPlaceholder);
				setTimeout(function() {
					$inputs.each(setPlaceholder);
				}, 10);
			});
		});

		// Clear placeholder values upon page reload
		$(window).bind('beforeunload.placeholder', function() {
			$('.placeholder').each(function() {
				this.value = '';
			});
		});

	}

	function args(elem) {
		// Return an object of element attributes
		var newAttrs = {},
		    rinlinejQuery = /^jQuery\d+$/;
		$.each(elem.attributes, function(i, attr) {
			if (attr.specified && !rinlinejQuery.test(attr.name)) {
				newAttrs[attr.name] = attr.value;
			}
		});
		return newAttrs;
	}

	function clearPlaceholder(event, value) {
		var input = this,
		    $input = $(input),
		    hadFocus;
		if (input.value == $input.attr('placeholder') && $input.hasClass('placeholder')) {
			hadFocus = input == document.activeElement;
			if ($input.data('placeholder-password')) {
				$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
				// If `clearPlaceholder` was called from `$.valHooks.input.set`
				if (event === true) {
					return $input[0].value = value;
				}
				$input.focus();
			} else {
				input.value = '';
				$input.removeClass('placeholder');
			}
			hadFocus && input.select();
		}
	}

	function setPlaceholder() {
		var $replacement,
		    input = this,
		    $input = $(input),
		    $origInput = $input,
		    id = this.id;
		if (input.value == '') {
			if (input.type == 'password') {
				if (!$input.data('placeholder-textinput')) {
					try {
						$replacement = $input.clone().attr({ 'type': 'text' });
					} catch(e) {
						$replacement = $('<input>').attr($.extend(args(this), { 'type': 'text' }));
					}
					$replacement
						.removeAttr('name')
						.data({
							'placeholder-password': true,
							'placeholder-id': id
						})
						.bind('focus.placeholder', clearPlaceholder);
					$input
						.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						})
						.before($replacement);
				}
				$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				// Note: `$input[0] != input` now!
			}
			$input.addClass('placeholder');
			$input[0].value = $input.attr('placeholder');
		} else {
			$input.removeClass('placeholder');
		}
	}

}(this, document, jQuery));



// css overflow:auto fix using iScroll
var overflowFix = {
	options: {
		forceMobile: false,
		fixedClass: 'iscroll-added',
		iScrollOptions: {onBeforeScrollStart: function(e){e.preventDefault()}},
		mobileReg: /(ipad|iphone|ipod|android|blackberry|opera mobi)/gi
	},
	init: function() {
		this.domReady(function(){
			this.getElements();
			this.addEvents();
		});
		return this;
	},
	getElements: function() {
		this.isMobile = this.options.mobileReg.test(navigator.userAgent) || this.options.forceMobile;
		if(this.isMobile || this.options.forceMobile) {
			this.scrollBlocks = document.getElementsByTagName('div');
			for(var i = 0; i < this.scrollBlocks.length; i++) {
				var overflowStyle = this.getStyle(this.scrollBlocks[i], 'overflow');
				if(overflowStyle === 'scroll' || overflowStyle === 'auto') {
					this.initScroll(this.scrollBlocks[i]);
				}
			}
		}
	},
	initScroll: function(block) {
		if(block.iScrollInst) {
			block.iScrollInst.refresh();
		} else {
			var createBlock = document.createElement('div');
			while(block.childNodes.length) createBlock.appendChild(block.childNodes[0]);
			createBlock.className = 'iscroll-wrapper';
			block.className += ' '+this.options.fixedClass;
			block.style.position = 'relative';
			block.appendChild(createBlock);
			block.iScrollInst = new iScroll(block, this.options.iScrollOptions);
		}
	},
	addEvents: function() {
		if (window.addEventListener) {
			window.addEventListener('resize', this.bind(this.refreshAll), false);
			window.addEventListener('orientationchange', this.bind(this.refreshAll), false);
		}
	},
	refreshAll: function() {
		if(this.scrollBlocks) {
			for(var i = 0; i < this.scrollBlocks.length; i++) {
				if(this.scrollBlocks[i].iScrollInst) {
					this.scrollBlocks[i].iScrollInst.refresh();
				}
			}
		}
	},
	domReady: function(fn) {
		var scope = this, calledFlag;
		(function(){
			if (document.addEventListener) {
				document.addEventListener('DOMContentLoaded', function(){
					if(!calledFlag) { calledFlag = true; fn.call(scope); }
				}, false)
			}
			if (!document.readyState || document.readyState.indexOf('in') != -1) {
				setTimeout(arguments.callee, 9);
			} else {
				if(!calledFlag) { calledFlag = true; fn.call(scope); }
			}
		}());
	},
	getStyle: function(el, prop) {
		if (document.defaultView && document.defaultView.getComputedStyle) {
			return document.defaultView.getComputedStyle(el, null)[prop];
		} else if (el.currentStyle) {
			return el.currentStyle[prop];
		} else {
			return el.style[prop];
		}
	},
	bind: function(fn, scope, args){
		var newScope = scope || this;
		return function() {
			return fn.apply(newScope, args || arguments);
		}
	}
}.init();


function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}



var emailPopup = {
    show: function () {
        var qs = (function (a) {
            if (a == "") return {};
            var b = {};
            for (var i = 0; i < a.length; ++i) {
                var p = a[i].split('=');
                if (p.length != 2) continue;
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
            return b;
        })(window.location.search.substr(1).split('&'));
        if ( (readCookie("emailPopup") == null) && (readCookie("banners") !== "off") && (qs["banners"] !== "off") ){
            if (readCookie("emailPopupSession") == null) {
                createCookie("emailPopupSession", "insession", 1);  // cookie will persist for 24 hours
                setTimeout(function () {
                    $.colorbox({
                        //innerheight: 410,
                        //innerwidth: 500,
                        width: (($(window).width() < 768) ? "90%" : 500),
                        height: 400,
                        opacity: .65,
                        iframe: true,
                        href: "/sign_up.aspx"
                    });
                }, 2000); 
            }
        }
        if (qs["banners"] !== "off") {
            createCookie("banners", "off", 0.0138); // set for about 20 minutes
        } else if (qs["banners"] !== "on") {
            createCookie("banners", "", -1);  // erase the cookie
        }
    },
    resize: function () {
        $.colorbox.resize({

        });
    },
    close: function () {
        $.colorbox.close();
    },
    submit: function () {
       // All logic is dobe in signup page itself - setting cookie
    },
    reset: function () {
        createCookie("emailPopup", "", -1);  // erase the cookie
        createCookie("emailPopupSession", "", -1);  // erase the cookie
        emailPopup.show();
    }

};


/*
 * iScroll v4.2.4 ~ Copyright (c) 2012 Matteo Spinelli, http://cubiq.org
 * Released under MIT license, http://cubiq.org/license
 */
; (function (e, t) { function A(e) { return i === "" ? e : (e = e.charAt(0).toUpperCase() + e.substr(1), i + e) } var n = Math, r = t.createElement("div").style, i = function () { var e = "t,webkitT,MozT,msT,OT".split(","), t, n = 0, i = e.length; for (; n < i; n++) { t = e[n] + "ransform"; if (t in r) return e[n].substr(0, e[n].length - 1) } return !1 }(), s = i ? "-" + i.toLowerCase() + "-" : "", o = A("transform"), u = A("transitionProperty"), a = A("transitionDuration"), f = A("transformOrigin"), l = A("transitionTimingFunction"), c = A("transitionDelay"), h = /android/gi.test(navigator.appVersion), p = /iphone|ipad/gi.test(navigator.appVersion), d = /hp-tablet/gi.test(navigator.appVersion), v = A("perspective") in r, m = "ontouchstart" in e && !d, g = i !== !1, y = A("transition") in r, b = "onorientationchange" in e ? "orientationchange" : "resize", w = m ? "touchstart" : "mousedown", E = m ? "touchmove" : "mousemove", S = m ? "touchend" : "mouseup", x = m ? "touchcancel" : "mouseup", T = function () { if (i === !1) return !1; var e = { "": "transitionend", webkit: "webkitTransitionEnd", Moz: "transitionend", O: "otransitionend", ms: "MSTransitionEnd" }; return e[i] }(), N = function () { return e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function (e) { return setTimeout(e, 1) } }(), C = function () { return e.cancelRequestAnimationFrame || e.webkitCancelAnimationFrame || e.webkitCancelRequestAnimationFrame || e.mozCancelRequestAnimationFrame || e.oCancelRequestAnimationFrame || e.msCancelRequestAnimationFrame || clearTimeout }(), k = v ? " translateZ(0)" : "", L = function (n, r) { var i = this, c; i.wrapper = typeof n == "object" ? n : t.getElementById(n), i.wrapper.style.overflow = "hidden", i.scroller = i.wrapper.children[0], i.options = { hScroll: !0, vScroll: !0, x: 0, y: 0, bounce: !0, bounceLock: !1, momentum: !0, lockDirection: !0, useTransform: !0, useTransition: !1, topOffset: 0, checkDOMChanges: !1, handleClick: !0, hScrollbar: !0, vScrollbar: !0, fixedScrollbar: h, hideScrollbar: p, fadeScrollbar: p && v, scrollbarClass: "", zoom: !1, zoomMin: 1, zoomMax: 4, doubleTapZoom: 2, wheelAction: "scroll", snap: !1, snapThreshold: 1, onRefresh: null, onBeforeScrollStart: function (e) { e.preventDefault() }, onScrollStart: null, onBeforeScrollMove: null, onScrollMove: null, onBeforeScrollEnd: null, onScrollEnd: null, onTouchEnd: null, onDestroy: null, onZoomStart: null, onZoom: null, onZoomEnd: null }; for (c in r) i.options[c] = r[c]; i.x = i.options.x, i.y = i.options.y, i.options.useTransform = g && i.options.useTransform, i.options.hScrollbar = i.options.hScroll && i.options.hScrollbar, i.options.vScrollbar = i.options.vScroll && i.options.vScrollbar, i.options.zoom = i.options.useTransform && i.options.zoom, i.options.useTransition = y && i.options.useTransition, i.options.zoom && h && (k = ""), i.scroller.style[u] = i.options.useTransform ? s + "transform" : "top left", i.scroller.style[a] = "0", i.scroller.style[f] = "0 0", i.options.useTransition && (i.scroller.style[l] = "cubic-bezier(0.33,0.66,0.66,1)"), i.options.useTransform ? i.scroller.style[o] = "translate(" + i.x + "px," + i.y + "px)" + k : i.scroller.style.cssText += ";position:absolute;top:" + i.y + "px;left:" + i.x + "px", i.options.useTransition && (i.options.fixedScrollbar = !0), i.refresh(), i._bind(b, e), i._bind(w), m || i.options.wheelAction != "none" && (i._bind("DOMMouseScroll"), i._bind("mousewheel")), i.options.checkDOMChanges && (i.checkDOMTime = setInterval(function () { i._checkDOMChanges() }, 500)) }; L.prototype = { enabled: !0, x: 0, y: 0, steps: [], scale: 1, currPageX: 0, currPageY: 0, pagesX: [], pagesY: [], aniTime: null, wheelZoomCount: 0, handleEvent: function (e) { var t = this; switch (e.type) { case w: if (!m && e.button !== 0) return; t._start(e); break; case E: t._move(e); break; case S: case x: t._end(e); break; case b: t._resize(); break; case "DOMMouseScroll": case "mousewheel": t._wheel(e); break; case T: t._transitionEnd(e) } }, _checkDOMChanges: function () { if (this.moved || this.zoomed || this.animating || this.scrollerW == this.scroller.offsetWidth * this.scale && this.scrollerH == this.scroller.offsetHeight * this.scale) return; this.refresh() }, _scrollbar: function (e) { var r = this, i; if (!r[e + "Scrollbar"]) { r[e + "ScrollbarWrapper"] && (g && (r[e + "ScrollbarIndicator"].style[o] = ""), r[e + "ScrollbarWrapper"].parentNode.removeChild(r[e + "ScrollbarWrapper"]), r[e + "ScrollbarWrapper"] = null, r[e + "ScrollbarIndicator"] = null); return } r[e + "ScrollbarWrapper"] || (i = t.createElement("div"), r.options.scrollbarClass ? i.className = r.options.scrollbarClass + e.toUpperCase() : i.style.cssText = "position:absolute;z-index:100;" + (e == "h" ? "height:7px;bottom:1px;left:2px;right:" + (r.vScrollbar ? "7" : "2") + "px" : "width:7px;bottom:" + (r.hScrollbar ? "7" : "2") + "px;top:2px;right:1px"), i.style.cssText += ";pointer-events:none;" + s + "transition-property:opacity;" + s + "transition-duration:" + (r.options.fadeScrollbar ? "350ms" : "0") + ";overflow:hidden;opacity:" + (r.options.hideScrollbar ? "0" : "1"), r.wrapper.appendChild(i), r[e + "ScrollbarWrapper"] = i, i = t.createElement("div"), r.options.scrollbarClass || (i.style.cssText = "position:absolute;z-index:100;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);" + s + "background-clip:padding-box;" + s + "box-sizing:border-box;" + (e == "h" ? "height:100%" : "width:100%") + ";" + s + "border-radius:3px;border-radius:3px"), i.style.cssText += ";pointer-events:none;" + s + "transition-property:" + s + "transform;" + s + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1);" + s + "transition-duration:0;" + s + "transform: translate(0,0)" + k, r.options.useTransition && (i.style.cssText += ";" + s + "transition-timing-function:cubic-bezier(0.33,0.66,0.66,1)"), r[e + "ScrollbarWrapper"].appendChild(i), r[e + "ScrollbarIndicator"] = i), e == "h" ? (r.hScrollbarSize = r.hScrollbarWrapper.clientWidth, r.hScrollbarIndicatorSize = n.max(n.round(r.hScrollbarSize * r.hScrollbarSize / r.scrollerW), 8), r.hScrollbarIndicator.style.width = r.hScrollbarIndicatorSize + "px", r.hScrollbarMaxScroll = r.hScrollbarSize - r.hScrollbarIndicatorSize, r.hScrollbarProp = r.hScrollbarMaxScroll / r.maxScrollX) : (r.vScrollbarSize = r.vScrollbarWrapper.clientHeight, r.vScrollbarIndicatorSize = n.max(n.round(r.vScrollbarSize * r.vScrollbarSize / r.scrollerH), 8), r.vScrollbarIndicator.style.height = r.vScrollbarIndicatorSize + "px", r.vScrollbarMaxScroll = r.vScrollbarSize - r.vScrollbarIndicatorSize, r.vScrollbarProp = r.vScrollbarMaxScroll / r.maxScrollY), r._scrollbarPos(e, !0) }, _resize: function () { var e = this; setTimeout(function () { e.refresh() }, h ? 200 : 0) }, _pos: function (e, t) { if (this.zoomed) return; e = this.hScroll ? e : 0, t = this.vScroll ? t : 0, this.options.useTransform ? this.scroller.style[o] = "translate(" + e + "px," + t + "px) scale(" + this.scale + ")" + k : (e = n.round(e), t = n.round(t), this.scroller.style.left = e + "px", this.scroller.style.top = t + "px"), this.x = e, this.y = t, this._scrollbarPos("h"), this._scrollbarPos("v") }, _scrollbarPos: function (e, t) { var r = this, i = e == "h" ? r.x : r.y, s; if (!r[e + "Scrollbar"]) return; i = r[e + "ScrollbarProp"] * i, i < 0 ? (r.options.fixedScrollbar || (s = r[e + "ScrollbarIndicatorSize"] + n.round(i * 3), s < 8 && (s = 8), r[e + "ScrollbarIndicator"].style[e == "h" ? "width" : "height"] = s + "px"), i = 0) : i > r[e + "ScrollbarMaxScroll"] && (r.options.fixedScrollbar ? i = r[e + "ScrollbarMaxScroll"] : (s = r[e + "ScrollbarIndicatorSize"] - n.round((i - r[e + "ScrollbarMaxScroll"]) * 3), s < 8 && (s = 8), r[e + "ScrollbarIndicator"].style[e == "h" ? "width" : "height"] = s + "px", i = r[e + "ScrollbarMaxScroll"] + (r[e + "ScrollbarIndicatorSize"] - s))), r[e + "ScrollbarWrapper"].style[c] = "0", r[e + "ScrollbarWrapper"].style.opacity = t && r.options.hideScrollbar ? "0" : "1", r[e + "ScrollbarIndicator"].style[o] = "translate(" + (e == "h" ? i + "px,0)" : "0," + i + "px)") + k }, _start: function (t) { var r = this, i = m ? t.touches[0] : t, s, u, a, f, l; if (!r.enabled) return; r.options.onBeforeScrollStart && r.options.onBeforeScrollStart.call(r, t), (r.options.useTransition || r.options.zoom) && r._transitionTime(0), r.moved = !1, r.animating = !1, r.zoomed = !1, r.distX = 0, r.distY = 0, r.absDistX = 0, r.absDistY = 0, r.dirX = 0, r.dirY = 0, r.options.zoom && m && t.touches.length > 1 && (f = n.abs(t.touches[0].pageX - t.touches[1].pageX), l = n.abs(t.touches[0].pageY - t.touches[1].pageY), r.touchesDistStart = n.sqrt(f * f + l * l), r.originX = n.abs(t.touches[0].pageX + t.touches[1].pageX - r.wrapperOffsetLeft * 2) / 2 - r.x, r.originY = n.abs(t.touches[0].pageY + t.touches[1].pageY - r.wrapperOffsetTop * 2) / 2 - r.y, r.options.onZoomStart && r.options.onZoomStart.call(r, t)); if (r.options.momentum) { r.options.useTransform ? (s = getComputedStyle(r.scroller, null)[o].replace(/[^0-9\-.,]/g, "").split(","), u = +s[4], a = +s[5]) : (u = +getComputedStyle(r.scroller, null).left.replace(/[^0-9-]/g, ""), a = +getComputedStyle(r.scroller, null).top.replace(/[^0-9-]/g, "")); if (u != r.x || a != r.y) r.options.useTransition ? r._unbind(T) : C(r.aniTime), r.steps = [], r._pos(u, a), r.options.onScrollEnd && r.options.onScrollEnd.call(r) } r.absStartX = r.x, r.absStartY = r.y, r.startX = r.x, r.startY = r.y, r.pointX = i.pageX, r.pointY = i.pageY, r.startTime = t.timeStamp || Date.now(), r.options.onScrollStart && r.options.onScrollStart.call(r, t), r._bind(E, e), r._bind(S, e), r._bind(x, e) }, _move: function (e) { var t = this, r = m ? e.touches[0] : e, i = r.pageX - t.pointX, s = r.pageY - t.pointY, u = t.x + i, a = t.y + s, f, l, c, h = e.timeStamp || Date.now(); t.options.onBeforeScrollMove && t.options.onBeforeScrollMove.call(t, e); if (t.options.zoom && m && e.touches.length > 1) { f = n.abs(e.touches[0].pageX - e.touches[1].pageX), l = n.abs(e.touches[0].pageY - e.touches[1].pageY), t.touchesDist = n.sqrt(f * f + l * l), t.zoomed = !0, c = 1 / t.touchesDistStart * t.touchesDist * this.scale, c < t.options.zoomMin ? c = .5 * t.options.zoomMin * Math.pow(2, c / t.options.zoomMin) : c > t.options.zoomMax && (c = 2 * t.options.zoomMax * Math.pow(.5, t.options.zoomMax / c)), t.lastScale = c / this.scale, u = this.originX - this.originX * t.lastScale + this.x, a = this.originY - this.originY * t.lastScale + this.y, this.scroller.style[o] = "translate(" + u + "px," + a + "px) scale(" + c + ")" + k, t.options.onZoom && t.options.onZoom.call(t, e); return } t.pointX = r.pageX, t.pointY = r.pageY; if (u > 0 || u < t.maxScrollX) u = t.options.bounce ? t.x + i / 2 : u >= 0 || t.maxScrollX >= 0 ? 0 : t.maxScrollX; if (a > t.minScrollY || a < t.maxScrollY) a = t.options.bounce ? t.y + s / 2 : a >= t.minScrollY || t.maxScrollY >= 0 ? t.minScrollY : t.maxScrollY; t.distX += i, t.distY += s, t.absDistX = n.abs(t.distX), t.absDistY = n.abs(t.distY); if (t.absDistX < 6 && t.absDistY < 6) return; t.options.lockDirection && (t.absDistX > t.absDistY + 5 ? (a = t.y, s = 0) : t.absDistY > t.absDistX + 5 && (u = t.x, i = 0)), t.moved = !0, t._pos(u, a), t.dirX = i > 0 ? -1 : i < 0 ? 1 : 0, t.dirY = s > 0 ? -1 : s < 0 ? 1 : 0, h - t.startTime > 300 && (t.startTime = h, t.startX = t.x, t.startY = t.y), t.options.onScrollMove && t.options.onScrollMove.call(t, e) }, _end: function (r) { if (m && r.touches.length !== 0) return; var i = this, s = m ? r.changedTouches[0] : r, u, f, l = { dist: 0, time: 0 }, c = { dist: 0, time: 0 }, h = (r.timeStamp || Date.now()) - i.startTime, p = i.x, d = i.y, v, g, y, b, w; i._unbind(E, e), i._unbind(S, e), i._unbind(x, e), i.options.onBeforeScrollEnd && i.options.onBeforeScrollEnd.call(i, r); if (i.zoomed) { w = i.scale * i.lastScale, w = Math.max(i.options.zoomMin, w), w = Math.min(i.options.zoomMax, w), i.lastScale = w / i.scale, i.scale = w, i.x = i.originX - i.originX * i.lastScale + i.x, i.y = i.originY - i.originY * i.lastScale + i.y, i.scroller.style[a] = "200ms", i.scroller.style[o] = "translate(" + i.x + "px," + i.y + "px) scale(" + i.scale + ")" + k, i.zoomed = !1, i.refresh(), i.options.onZoomEnd && i.options.onZoomEnd.call(i, r); return } if (!i.moved) { m && (i.doubleTapTimer && i.options.zoom ? (clearTimeout(i.doubleTapTimer), i.doubleTapTimer = null, i.options.onZoomStart && i.options.onZoomStart.call(i, r), i.zoom(i.pointX, i.pointY, i.scale == 1 ? i.options.doubleTapZoom : 1), i.options.onZoomEnd && setTimeout(function () { i.options.onZoomEnd.call(i, r) }, 200)) : this.options.handleClick && (i.doubleTapTimer = setTimeout(function () { i.doubleTapTimer = null, u = s.target; while (u.nodeType != 1) u = u.parentNode; u.tagName != "SELECT" && u.tagName != "INPUT" && u.tagName != "TEXTAREA" && (f = t.createEvent("MouseEvents"), f.initMouseEvent("click", !0, !0, r.view, 1, s.screenX, s.screenY, s.clientX, s.clientY, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, 0, null), f._fake = !0, u.dispatchEvent(f)) }, i.options.zoom ? 250 : 0))), i._resetPos(400), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r); return } if (h < 300 && i.options.momentum) { l = p ? i._momentum(p - i.startX, h, -i.x, i.scrollerW - i.wrapperW + i.x, i.options.bounce ? i.wrapperW : 0) : l, c = d ? i._momentum(d - i.startY, h, -i.y, i.maxScrollY < 0 ? i.scrollerH - i.wrapperH + i.y - i.minScrollY : 0, i.options.bounce ? i.wrapperH : 0) : c, p = i.x + l.dist, d = i.y + c.dist; if (i.x > 0 && p > 0 || i.x < i.maxScrollX && p < i.maxScrollX) l = { dist: 0, time: 0 }; if (i.y > i.minScrollY && d > i.minScrollY || i.y < i.maxScrollY && d < i.maxScrollY) c = { dist: 0, time: 0 } } if (l.dist || c.dist) { y = n.max(n.max(l.time, c.time), 10), i.options.snap && (v = p - i.absStartX, g = d - i.absStartY, n.abs(v) < i.options.snapThreshold && n.abs(g) < i.options.snapThreshold ? i.scrollTo(i.absStartX, i.absStartY, 200) : (b = i._snap(p, d), p = b.x, d = b.y, y = n.max(b.time, y))), i.scrollTo(n.round(p), n.round(d), y), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r); return } if (i.options.snap) { v = p - i.absStartX, g = d - i.absStartY, n.abs(v) < i.options.snapThreshold && n.abs(g) < i.options.snapThreshold ? i.scrollTo(i.absStartX, i.absStartY, 200) : (b = i._snap(i.x, i.y), (b.x != i.x || b.y != i.y) && i.scrollTo(b.x, b.y, b.time)), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r); return } i._resetPos(200), i.options.onTouchEnd && i.options.onTouchEnd.call(i, r) }, _resetPos: function (e) { var t = this, n = t.x >= 0 ? 0 : t.x < t.maxScrollX ? t.maxScrollX : t.x, r = t.y >= t.minScrollY || t.maxScrollY > 0 ? t.minScrollY : t.y < t.maxScrollY ? t.maxScrollY : t.y; if (n == t.x && r == t.y) { t.moved && (t.moved = !1, t.options.onScrollEnd && t.options.onScrollEnd.call(t)), t.hScrollbar && t.options.hideScrollbar && (i == "webkit" && (t.hScrollbarWrapper.style[c] = "300ms"), t.hScrollbarWrapper.style.opacity = "0"), t.vScrollbar && t.options.hideScrollbar && (i == "webkit" && (t.vScrollbarWrapper.style[c] = "300ms"), t.vScrollbarWrapper.style.opacity = "0"); return } t.scrollTo(n, r, e || 0) }, _wheel: function (e) { var t = this, n, r, i, s, o; if ("wheelDeltaX" in e) n = e.wheelDeltaX / 12, r = e.wheelDeltaY / 12; else if ("wheelDelta" in e) n = r = e.wheelDelta / 12; else { if (!("detail" in e)) return; n = r = -e.detail * 3 } if (t.options.wheelAction == "zoom") { o = t.scale * Math.pow(2, 1 / 3 * (r ? r / Math.abs(r) : 0)), o < t.options.zoomMin && (o = t.options.zoomMin), o > t.options.zoomMax && (o = t.options.zoomMax), o != t.scale && (!t.wheelZoomCount && t.options.onZoomStart && t.options.onZoomStart.call(t, e), t.wheelZoomCount++, t.zoom(e.pageX, e.pageY, o, 400), setTimeout(function () { t.wheelZoomCount--, !t.wheelZoomCount && t.options.onZoomEnd && t.options.onZoomEnd.call(t, e) }, 400)); return } i = t.x + n, s = t.y + r, i > 0 ? i = 0 : i < t.maxScrollX && (i = t.maxScrollX), s > t.minScrollY ? s = t.minScrollY : s < t.maxScrollY && (s = t.maxScrollY), t.maxScrollY < 0 && t.scrollTo(i, s, 0) }, _transitionEnd: function (e) { var t = this; if (e.target != t.scroller) return; t._unbind(T), t._startAni() }, _startAni: function () { var e = this, t = e.x, r = e.y, i = Date.now(), s, o, u; if (e.animating) return; if (!e.steps.length) { e._resetPos(400); return } s = e.steps.shift(), s.x == t && s.y == r && (s.time = 0), e.animating = !0, e.moved = !0; if (e.options.useTransition) { e._transitionTime(s.time), e._pos(s.x, s.y), e.animating = !1, s.time ? e._bind(T) : e._resetPos(0); return } u = function () { var a = Date.now(), f, l; if (a >= i + s.time) { e._pos(s.x, s.y), e.animating = !1, e.options.onAnimationEnd && e.options.onAnimationEnd.call(e), e._startAni(); return } a = (a - i) / s.time - 1, o = n.sqrt(1 - a * a), f = (s.x - t) * o + t, l = (s.y - r) * o + r, e._pos(f, l), e.animating && (e.aniTime = N(u)) }, u() }, _transitionTime: function (e) { e += "ms", this.scroller.style[a] = e, this.hScrollbar && (this.hScrollbarIndicator.style[a] = e), this.vScrollbar && (this.vScrollbarIndicator.style[a] = e) }, _momentum: function (e, t, r, i, s) { var o = 6e-4, u = n.abs(e) / t, a = u * u / (2 * o), f = 0, l = 0; return e > 0 && a > r ? (l = s / (6 / (a / u * o)), r += l, u = u * r / a, a = r) : e < 0 && a > i && (l = s / (6 / (a / u * o)), i += l, u = u * i / a, a = i), a *= e < 0 ? -1 : 1, f = u / o, { dist: a, time: n.round(f) } }, _offset: function (e) { var t = -e.offsetLeft, n = -e.offsetTop; while (e = e.offsetParent) t -= e.offsetLeft, n -= e.offsetTop; return e != this.wrapper && (t *= this.scale, n *= this.scale), { left: t, top: n } }, _snap: function (e, t) { var r = this, i, s, o, u, a, f; o = r.pagesX.length - 1; for (i = 0, s = r.pagesX.length; i < s; i++) if (e >= r.pagesX[i]) { o = i; break } o == r.currPageX && o > 0 && r.dirX < 0 && o--, e = r.pagesX[o], a = n.abs(e - r.pagesX[r.currPageX]), a = a ? n.abs(r.x - e) / a * 500 : 0, r.currPageX = o, o = r.pagesY.length - 1; for (i = 0; i < o; i++) if (t >= r.pagesY[i]) { o = i; break } return o == r.currPageY && o > 0 && r.dirY < 0 && o--, t = r.pagesY[o], f = n.abs(t - r.pagesY[r.currPageY]), f = f ? n.abs(r.y - t) / f * 500 : 0, r.currPageY = o, u = n.round(n.max(a, f)) || 200, { x: e, y: t, time: u } }, _bind: function (e, t, n) { (t || this.scroller).addEventListener(e, this, !!n) }, _unbind: function (e, t, n) { (t || this.scroller).removeEventListener(e, this, !!n) }, destroy: function () { var t = this; t.scroller.style[o] = "", t.hScrollbar = !1, t.vScrollbar = !1, t._scrollbar("h"), t._scrollbar("v"), t._unbind(b, e), t._unbind(w), t._unbind(E, e), t._unbind(S, e), t._unbind(x, e), t.options.hasTouch || (t._unbind("DOMMouseScroll"), t._unbind("mousewheel")), t.options.useTransition && t._unbind(T), t.options.checkDOMChanges && clearInterval(t.checkDOMTime), t.options.onDestroy && t.options.onDestroy.call(t) }, refresh: function () { var e = this, t, r, i, s, o = 0, u = 0; e.scale < e.options.zoomMin && (e.scale = e.options.zoomMin), e.wrapperW = e.wrapper.clientWidth || 1, e.wrapperH = e.wrapper.clientHeight || 1, e.minScrollY = -e.options.topOffset || 0, e.scrollerW = n.round(e.scroller.offsetWidth * e.scale), e.scrollerH = n.round((e.scroller.offsetHeight + e.minScrollY) * e.scale), e.maxScrollX = e.wrapperW - e.scrollerW, e.maxScrollY = e.wrapperH - e.scrollerH + e.minScrollY, e.dirX = 0, e.dirY = 0, e.options.onRefresh && e.options.onRefresh.call(e), e.hScroll = e.options.hScroll && e.maxScrollX < 0, e.vScroll = e.options.vScroll && (!e.options.bounceLock && !e.hScroll || e.scrollerH > e.wrapperH), e.hScrollbar = e.hScroll && e.options.hScrollbar, e.vScrollbar = e.vScroll && e.options.vScrollbar && e.scrollerH > e.wrapperH, t = e._offset(e.wrapper), e.wrapperOffsetLeft = -t.left, e.wrapperOffsetTop = -t.top; if (typeof e.options.snap == "string") { e.pagesX = [], e.pagesY = [], s = e.scroller.querySelectorAll(e.options.snap); for (r = 0, i = s.length; r < i; r++) o = e._offset(s[r]), o.left += e.wrapperOffsetLeft, o.top += e.wrapperOffsetTop, e.pagesX[r] = o.left < e.maxScrollX ? e.maxScrollX : o.left * e.scale, e.pagesY[r] = o.top < e.maxScrollY ? e.maxScrollY : o.top * e.scale } else if (e.options.snap) { e.pagesX = []; while (o >= e.maxScrollX) e.pagesX[u] = o, o -= e.wrapperW, u++; e.maxScrollX % e.wrapperW && (e.pagesX[e.pagesX.length] = e.maxScrollX - e.pagesX[e.pagesX.length - 1] + e.pagesX[e.pagesX.length - 1]), o = 0, u = 0, e.pagesY = []; while (o >= e.maxScrollY) e.pagesY[u] = o, o -= e.wrapperH, u++; e.maxScrollY % e.wrapperH && (e.pagesY[e.pagesY.length] = e.maxScrollY - e.pagesY[e.pagesY.length - 1] + e.pagesY[e.pagesY.length - 1]) } e._scrollbar("h"), e._scrollbar("v"), e.zoomed || (e.scroller.style[a] = "0", e._resetPos(400)) }, scrollTo: function (e, t, n, r) { var i = this, s = e, o, u; i.stop(), s.length || (s = [{ x: e, y: t, time: n, relative: r }]); for (o = 0, u = s.length; o < u; o++) s[o].relative && (s[o].x = i.x - s[o].x, s[o].y = i.y - s[o].y), i.steps.push({ x: s[o].x, y: s[o].y, time: s[o].time || 0 }); i._startAni() }, scrollToElement: function (e, t) { var r = this, i; e = e.nodeType ? e : r.scroller.querySelector(e); if (!e) return; i = r._offset(e), i.left += r.wrapperOffsetLeft, i.top += r.wrapperOffsetTop, i.left = i.left > 0 ? 0 : i.left < r.maxScrollX ? r.maxScrollX : i.left, i.top = i.top > r.minScrollY ? r.minScrollY : i.top < r.maxScrollY ? r.maxScrollY : i.top, t = t === undefined ? n.max(n.abs(i.left) * 2, n.abs(i.top) * 2) : t, r.scrollTo(i.left, i.top, t) }, scrollToPage: function (e, t, n) { var r = this, i, s; n = n === undefined ? 400 : n, r.options.onScrollStart && r.options.onScrollStart.call(r), r.options.snap ? (e = e == "next" ? r.currPageX + 1 : e == "prev" ? r.currPageX - 1 : e, t = t == "next" ? r.currPageY + 1 : t == "prev" ? r.currPageY - 1 : t, e = e < 0 ? 0 : e > r.pagesX.length - 1 ? r.pagesX.length - 1 : e, t = t < 0 ? 0 : t > r.pagesY.length - 1 ? r.pagesY.length - 1 : t, r.currPageX = e, r.currPageY = t, i = r.pagesX[e], s = r.pagesY[t]) : (i = -r.wrapperW * e, s = -r.wrapperH * t, i < r.maxScrollX && (i = r.maxScrollX), s < r.maxScrollY && (s = r.maxScrollY)), r.scrollTo(i, s, n) }, disable: function () { this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(E, e), this._unbind(S, e), this._unbind(x, e) }, enable: function () { this.enabled = !0 }, stop: function () { this.options.useTransition ? this._unbind(T) : C(this.aniTime), this.steps = [], this.moved = !1, this.animating = !1 }, zoom: function (e, t, n, r) { var i = this, s = n / i.scale; if (!i.options.useTransform) return; i.zoomed = !0, r = r === undefined ? 200 : r, e = e - i.wrapperOffsetLeft - i.x, t = t - i.wrapperOffsetTop - i.y, i.x = e - e * s + i.x, i.y = t - t * s + i.y, i.scale = n, i.refresh(), i.x = i.x > 0 ? 0 : i.x < i.maxScrollX ? i.maxScrollX : i.x, i.y = i.y > i.minScrollY ? i.minScrollY : i.y < i.maxScrollY ? i.maxScrollY : i.y, i.scroller.style[a] = r + "ms", i.scroller.style[o] = "translate(" + i.x + "px," + i.y + "px) scale(" + n + ")" + k, i.zoomed = !1 }, isReady: function () { return !this.moved && !this.zoomed && !this.animating } }, r = null, typeof exports != "undefined" ? exports.iScroll = L : e.iScroll = L })(window, document);
