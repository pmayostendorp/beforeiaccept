			
// Copyright 2006-2015 ClickTale Ltd., US Patent Pending
// PID: 72
// Generated on: 6/28/2015 4:51:35 AM (UTC 6/28/2015 9:51:35 AM)

var isIELowerThan11 = false; /*@cc_on var isIELowerThan11=true;@*/
//--ac
jQuery(document).ready(function () {
	window._ctAC = { 'enter' : false, 'opened' : false };
	jQuery('.form-search-query').keydown(function(){ 
		if(typeof ClickTaleExec == 'function') {
			ClickTaleExec('jQuery(".form-search-query").val("'+ this.value + '")');			
			if(!_ctAC.enter) {  
				ClickTaleEvent('Used Search');
				_ctAC.enter = true;
				setTimeout(function() {
					if(jQuery('.form-search-menu:visible').length > 0) {
						if(!_ctAC.opened) {
							_ctAC.opened = true;
							ClickTaleEvent('Search Suggestion Appeared');
							jQuery('.nav-eh-search-login').on("click", ".item-suggestion", function() { 
								ClickTaleEvent("Suggestion Selected");
							});						
						}
					}
				},2000);
			}				
		};
	});
	setTimeout(function() {
		jQuery('.right-arrow').click(function() { if(typeof ClickTaleEvent == "function") ClickTaleEvent('Read Next Arrow'); });
		jQuery('.back-to-top').click(function() { if(typeof ClickTaleEvent == "function") ClickTaleEvent('Back To Top'); });
	}, 2000);	
});
//--ac


if (isIELowerThan11 && !window['ClickTaleFirstPCCGo']) {
    window['ClickTaleFirstPCCGo'] = true;
    window.ClickTaleSettings = window.ClickTaleSettings || {};
    ClickTaleSettings.EventsVars = {};

    ClickTaleSettings.safeClickTaleExec = function (code) {
        if (typeof ClickTaleExec === 'function') {
            ClickTaleExec(code);
        }
    }
    ClickTaleSettings.safeClickTaleEvent = function (eventString) {
        if (typeof ClickTaleEvent === 'function') {
            ClickTaleEvent(eventString);
        }
    }


    function safeClickTaleEvent(eventString) {
        if (typeof ClickTaleEvent == "function" && eventString != "") {
            ClickTaleEvent(eventString);

        }
    }

    function safeClickTaleRegisterElementAction(e) {
        if (typeof ClickTaleRegisterElementAction == 'function') {
            ClickTaleRegisterElementAction('mouseover', e);
            ClickTaleRegisterElementAction('click', e);
        }
    }

    if ($('input#ClickTaleRecord').length > 0 && $('input#ClickTaleRecord').val().toLowerCase() == "true") {
        safeClickTaleEvent("EH2.0");
    }
    if (window['jQuery']) {
        if (typeof jQuery.fn.bind === "function") {
            (function ($) {
                var cto = {
                    safeFn: function (FnName, params) {
                        if (typeof window[FnName] === 'function' &&
                               params !== undefined &&
                               params !== '') {
                            window[FnName](params);
                        }
                    },

                    exec: function (code) {
                        this.safeFn('ClickTaleExec', code);
                    },

                    event: function (str) {
                        this.safeFn('ClickTaleEvent', str);
                    }
                };

                $(document).ready(function () {

					


                    //------------------------------EDH-39,EDH-43 hover for top menus...

                    //Show hover effect for video galery
                    jQuery("#head-content .navbar ul.nav>li").hover(
                      function (e) {
                          //add style to element with hover
                          var index = jQuery(this).index();
                          ClickTaleSettings.safeClickTaleExec('jQuery("#head-content .navbar ul.nav>li").eq(' + index + ').find(".mm-container").css({"top" : "65px", "left" : "0", "opacity" : "1" });');

                      }, function (e) {
                          //remove style from hover element
                          var index = jQuery(this).index();
                          ClickTaleSettings.safeClickTaleExec('jQuery("#head-content .navbar ul.nav>li").eq(' + index + ').find(".mm-container").css({"left" : "-999em", "opacity" : "0" });');

                      }
                    );

                    //==============================END of EDH-39,EDH-43 hover for top menus...... 



                    ////code for EDH-24//////////
                    jQuery('.nav.justified>li').bind('mouseenter', function () {
                        var index = jQuery(this).index();
                        if (jQuery('.mm-container.topics-nav-mm.visible-desktop').length > 0) {

                            var topPlace = jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(index).offset().top;
                            var leftPlace = jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(index).css('left');


                            var opacityElem = jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(index).css('opacity');
                            var positionElem = jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(index).css('position');
                            ClickTaleSettings.safeClickTaleExec("jQuery('.nav.justified>li:eq(" + index + ")>a').css('color','black');");
                            ClickTaleSettings.safeClickTaleExec("jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(" + index + ").css('opacity','1');");
                            ClickTaleSettings.safeClickTaleExec("jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(" + index + ").css('position','" + positionElem + "');");

                            ClickTaleSettings.safeClickTaleExec("jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(" + index + ").css('left','auto');");


                        }

                    });
                    jQuery('.nav.justified>li').bind('mouseleave', function () {
                        var index = jQuery(this).index();
                        if (jQuery('.mm-container.topics-nav-mm.visible-desktop').length > 0) {

                            var topPlace = jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(index).offset().top;
                            var leftPlace = jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(index).css('left');
                            var leftAfter = leftPlace;
                            var opacityElem = jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(index).css('opacity');
                            var positionElem = jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(index).css('position');
                            ClickTaleSettings.safeClickTaleExec("jQuery('.nav.justified>li:eq(" + index + ")>a').css('color','white');");
                            ClickTaleSettings.safeClickTaleExec("jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(" + index + ").css('opacity','0');");
                            ClickTaleSettings.safeClickTaleExec("jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(" + index + ").css('position','" + positionElem + "');");

                            ClickTaleSettings.safeClickTaleExec("jQuery('.mm-container.topics-nav-mm.visible-desktop').eq(" + index + ").css('left','auto');");


                        }

                    });
                    ////end code for EDH-24//////////

                    //EDH-33

                    jQuery("div.row-fluid.clearfix a").click(function () {
                        safeClickTaleEvent("Skybox: Clicks Article");
                    });

                    //end EDH-33
                    //EDH-33
                    jQuery("span.close").click(function () {
                        safeClickTaleEvent("Skybox: Closes");
                        ClickTaleSettings.safeClickTaleExec('jQuery("span.close").click();');

                    });

                    //end EDH-33


                    //EDH-37
                    jQuery(".js-fl-promoted").click(function () {
                        safeClickTaleEvent("click on read next");
                    });
                    //end EDH-37

                    //EDH-35
                    jQuery(".eh-module.eh-module-core.js-core.eh-module-flyout").hover(function () {
                        ClickTaleSettings.safeClickTaleExec('jQuery(".eh-module.eh-module-core.js-core.eh-module-flyout").animate({width:"300px"},100);');
                    },
                        function () {
                            ClickTaleSettings.safeClickTaleExec('jQuery(".eh-module.eh-module-core.js-core.eh-module-flyout").animate({width:"50px"},100);');
                        });
                    //end EDH-35

                    //EDH-31
                    //jQuery(document).scroll(function () {
                    //    if (jQuery(this).scrollTop() == 0) {
                    //        if (jQuery("div.eh-module-skybox.open").length > 0) {
                    //            ClickTaleSettings.safeClickTaleExec('jQuery("div.eh-module-skybox").addClass("open");jQuery("body").css("margin-top","225px");');
                    //        }
                    //    }
                    //});
                    //end EDH-31
                    jQuery(".eh-module.eh-module-core.js-core.eh-module-flyout").hover();
                    if (typeof GetOmnitureObject && typeof GetOmnitureObject("everydayhealth").eVar18 != 'undefined') {
                        var ctVarEvent = GetOmnitureObject("everydayhealth").eVar18;
                        safeClickTaleEvent("eVar: " + ctVarEvent);
                    }

                    var googAds = $('.googlead');

                    if (googAds && googAds[0] && googAds[1]) {

                        var code = "jQuery('.googlead').eq(0).html('" + googAds[0].innerHTML.replace(/\<script(.|\n|\r)*\<\/script>/ig, '').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/[\n\t\r]/g, '') + "');";
                        cto.exec(code);

                        var code = "jQuery('.googlead').eq(1).html('" + googAds[1].innerHTML.replace(/\<script(.|\n|\r)*\<\/script>/ig, '').replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/[\n\t\r]/g, '') + "');";
                        cto.exec(code);


                        jQuery('.ggl-txtdecnone, .yahooadtitle').each(function (i, title) {
                            var $this = $(this);
                            var event;
                            if ($this.hasClass('ggl-txtdecnone')) {
                                event = $this.find('b').html();
                            }
                            else if ($this.hasClass('yahooadtitle')) {
                                event = $this.html();
                            }

                            cto.event('Ads: ' + event);

                        });
                    }

                    // EDH-27 - Fix LA on button More
                    jQuery('#add-recent-stories').on('mousedown', '.btn-more', function (e) {
                        safeClickTaleRegisterElementAction(e);
                    });

					
					
					
                    //EDH-30 - Add an event for clicking on You may like it area
                    if (document.location.href.indexOf("www.everydayhealth.com/news") > -1) {
                        jQuery(document).on('mousedown', function (e) {
                            var target = e.target, jqTarget = jQuery(target);
                            if (jqTarget.closest('[id^="internal_trc"]>div').length > 0) {
                                safeClickTaleEvent("You May Like? (Clicked)");
                            }
                        });
                    }
                }); //doc.rdy
            }(jQuery));
        }
    }



    jQuery('ul#nav > li').bind('mouseenter mouseleave', function (e) {
        if (!window.ClickTaleContext && e) {
            var index = jQuery('ul#nav > li').index(this),
              addrem = (e.type === 'mouseenter' ? 'add' : 'remove');
            ClickTaleSettings.safeClickTaleExec("jQuery('ul#nav > li:eq(" + index + ")')." + addrem + "Class('sfhover');");
        }
    });

    jQuery('ul#nav a.dropdown').bind('mouseenter mouseleave', function (e) {
        if (!window.ClickTaleContext && e) {
            var index = jQuery('ul#nav a.dropdown').index(this),
              addrem = (e.type === 'mouseenter' ? 'add' : 'remove');
            ClickTaleSettings.safeClickTaleExec("jQuery('ul#nav a.dropdown:eq(" + index + ")')." + addrem + "Class('ctahov');");
        }
    });

    jQuery(window).load(function () {

        setTimeout(function () {
            if (window['modVP']) {
                ClickTaleSettings.EventsVars.videoTime = 10;
                ClickTaleSettings.EventsVars.videoStop = false;
                ClickTaleSettings.EventsVars.videoPlay = false;
                ClickTaleSettings.safeClickTaleEvent('Video Page');
                jQuery('.eh-video-container').click(function () {
                    ClickTaleSettings.EventsVars.videoPlay = true;
                });
                modVP.addEventListener('videoStart', function (e) {
                    if (ClickTaleSettings.EventsVars.videoPlay) {
                        ClickTaleSettings.safeClickTaleEvent('Video - Clicked on Play');
                        ClickTaleSettings.EventsVars.videoPlay = false;
                    }
                    else {
                        ClickTaleSettings.safeClickTaleEvent('Video - Autoplay');
                    }
                    setTimeout(function () {
                        ClickTaleSettings.EventsVars.videoStop = false;
                    }, 100);
                });
                modVP.addEventListener('videoStop', function (e) {
                    setTimeout(function () {
                        if (ClickTaleSettings.EventsVars.videoStop === false) {
                            ClickTaleSettings.safeClickTaleEvent('Video - Clicked on Stop');
                        }
                    }, 100);
                });
                modVP.addEventListener('videoComplete', function (e) {
                    ClickTaleSettings.safeClickTaleEvent('Video - Finished Watching');
                    ClickTaleSettings.EventsVars.videoStop = true;
                });
                modVP.addEventListener('ui_mute', function (e) {
                    ClickTaleSettings.safeClickTaleEvent('Video - Clicked on Mute');
                });
                modVP.addEventListener('videoProgress', function (e) {
                    if (e.position && e.position > ClickTaleSettings.EventsVars.videoTime) {
                        var ctEvString = 'Video - Passed ' + ClickTaleSettings.EventsVars.videoTime + ' seconds';
                        ClickTaleSettings.safeClickTaleEvent(ctEvString);
                        ClickTaleSettings.EventsVars.videoTime += 10;
                    }
                });
            }
        }, 2500);
    });
}


