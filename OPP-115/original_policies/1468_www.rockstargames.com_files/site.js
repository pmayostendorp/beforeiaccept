var addthis_config = { services_compact : 'facebook, twitter, stumbleupon, delicious, reddit, myspace, print, email, more'};

(function ($, window, document) {
    
	var setLanguageSelector = function() {
		var $languageSelector = $('#languageSelector').detach().appendTo($('#footer .navigation .segment:last-child')),
			$currentLI = $('ul li', $languageSelector).filter(function(){
				return $(this).data('locale')===$('html').attr('lang');
			})

		$.getJSON($.paths.base + '/locator_dal/geoLocation/getGeoInformation.json', function(data) {
			// If someone confirms their locale, it gets saved. That value comes back here and checked.
        	if (typeof data.geo.locale_preference !== 'undefined' && !$.keepLocale) {
        		if ($('html').attr('lang') === data.geo.locale_preference)
        			return;
        		else
        			var url = $('li', $languageSelector).filter(function(){
						return $(this).data('locale') === data.geo.locale_preference;
					}).find('a').attr('href');
        			return;
        			return window.location = url;
        	}
        	return;
	        	
		   	var countryName = data.geo.countryName,
		   		countryCode = data.geo.countryCode,
		   		locationToLocale = {'US':'en_us',"FR": "fr_fr", "ES": "es_es", "IT": "it_it", "DE": "de_de", "CH": "de_de", "AT": "de_de"};
            if (countryCode in locationToLocale){
            	var locale = locationToLocale[countryCode];

				if ($('html').attr('lang') === locale)
					return false;

				$('li', $languageSelector).filter(function(){
					return $(this).data('locale') === locale;
				}).find('a').trigger('click');
	        }

		})
		$('.current span.text', $languageSelector).html($('a', $currentLI).html())
		$languageSelector.on('click', '.current', function(e){
			e.stopPropagation();
			e.preventDefault();
			$('ul', $languageSelector).toggleClass('active');
		});
		$languageSelector.on('click', 'a', function(e) {
			var url = $(this).attr('href');
			e.preventDefault();
			$.getJSON($.paths.base + '/locator_dal/geoLocation/setLocalePreference/'+$(this).parent().data('locale')+'.json', function(data) {
				window.location = url;
			})
		})
		$(document).on('click', function(e) {
			if ($(e.target).parents('#languageSelector').length === 1) return;
			$('ul', $languageSelector).removeClass('active');
		})
	}

    var _rsg = {};
	

    $.fn.hideOnMouseout = function(time, cb)
    {
        return this.each(function(){
            var $el = $(this);
            $el.on('mouseenter', function(e){
                var mouseTimer = $el.data('mouseTimer');
                if (mouseTimer !== undefined)
                    clearTimeout(mouseTimer);
            });
            $el.on('mouseleave', function(e){
                if ($el.hasClass('active'))
                {
                    $el.data('mouseTimer', setTimeout(function(){
                        $el.removeClass('active').removeData('mouseTimer');
                        if (typeof cb === 'function')
                            cb();
                    }, time));
                }
            });
        })
    }

    $.fn.dropdown = function(method)
    {
        var methods = {
            'init' : function()
            {
                return this.each(function(){
                    var $el = $(this),
                        $handle = $el.find('.handle').css('cursor', 'pointer'),
                        $content = $el.find('.content').css({
                        	'position':'absolute',
                        	'top':'100%',
                        	'left':'0',
							'overflow':'hidden',
							'z-index':'100',
							'width':'100%',
							'transition':'all ease-out .25s',
							'-moz-transition':'all ease-out .25s',
							'-webkit-transition':'all ease-out .25s',
							'-o-transition':'all ease-out .25s'
                        }),
                        updateHeight = function()
                        {
                        	if (typeof $content.data('height') === 'undefined')
                        		$content.data('height', $content.outerHeight(true));

                            $content.css('height', $el.hasClass('active')?$content.data('height'):'0');
                        };
                    if (typeof $el.data('dropdownInit') !== 'undefined')
                    	return;

                    if ($handle.length === 0 || $content.length === 0)
                        return $.error('Your dropdown needs a handle and content.');

                    $handle.on('click', function(e){
                        e.preventDefault();
                        e.stopPropagation();

                        $el.toggleClass('active');
                        updateHeight();
                    });
                    $(document).on('click', function(e){
                        if ($el.hasClass('active'))
                        {
                            $el.toggleClass('active');
                            updateHeight();
                        }
                    });
                    $el.hideOnMouseout(1000, function(){
                        updateHeight();
                    }).css('position', 'relative'),
                    $el.data('dropdownInit', true);
                });
            }
        }
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on $.userPanel' );
        }
    }

	$.fn.resizeFitParent = function()
	{
		$(this).css({'width':'auto','height':'auto'});

		var parentRatio = $(this).parent().width()/$(this).parent().height();
		var imgRatio = $(this).width()/$(this).height();

		var _width = parentRatio > imgRatio ? ($(this).parent().height()/$(this).height()*$(this).width()) : $(this).parent().width();
		if (_width > $(this).width())
			_width = $(this).width();

		var _height = parentRatio > imgRatio ? $(this).parent().height() : ($(this).parent().width()/$(this).width()*$(this).height());
		if (_height > $(this).height())
			_height = $(this).height();

		return $(this).css({'width':_width,'height':_height});
	};

	$.fn.matchChildrenHeight = function()
	{
		var _h = 0;
		$(this).find("> div").each(function(){
			if ($(this).outerHeight(false) > _h)
				_h = $(this).outerHeight(false);
		});
		$(this).find("> div").each(function(){
			$(this).css('height', _h);
		});
	};

    $.fn.rsg = function(method)
    {
        var methods = {
			'addthis' : function()
			{
			    if (typeof addthis === 'undefined')
					return;
				addthis.init();
				addthis.toolbox('.addthis_toolbox');
			},
			'mouthoff' : function(method)
			{
				var methods = {
					init : function()
					{
						return this.each(function(){
							var $el = $('.mouthoff'),
								shutdown = function(message) {
									console.log(message)
									$(".mouthoff .response").html($('<div />').addClass('message').html(message));
									$('.mouthoff form').hide();
								},
								error = function(message) {
									$(".mouthoff .response").html($('<div />').html(message).addClass('errors'));
								},
								clearResponse = function() {
									$(".mouthoff .response").empty();
								}
							$('.mouthoff .submit_button').unbind().bind({
								click : function() {
									if (typeof $el.data('disabled') === 'undefined')
										$($('.mouthoff form')).submit();
									$el.data('disabled', true);
								}
							});
							$('.mouthoff form').ajaxForm({
								dataType : 'json',
								beforeSubmit: function() {
									clearResponse();
								},
								success: function(response) {
									$el.removeData('disabled');
									switch (response.status) {
										case 1 :
										case -1 :
										    shutdown(response.message);
											break;
										case 0 :
											error(response.message);
											break;
									}
								}
							});
						});
					}
				};
				if ( methods[method] ) {
        			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        		} else if ( typeof method === 'object' || ! method ) {
        			return methods.init.apply( this, arguments );
        		} else {
        			$.error( 'Method ' +  method + ' does not exist on $.rsg.mouthoff' );
        		}
			},
			'searchbox' : function()
			{
				return this.each(function(){
					var _bindEvents = function()
						{
							$('header .search .handle').unbind().bind({
								mouseenter : function()
								{
									$('header .search').find('.faux').stop(true);
									_showSearchBox();
								},
								click : function()
								{
									if ($('header .search form #search_label').val() == '')
									{
										window.location = $.paths.base + "/search";
										return;
									}
									$('header .search form').submit();
								}
							});
							$('header .search').unbind().bind({
								mouseleave : function(e)
								{
									$(this).find('.faux').stop(true).animate({"opacity":"1"}, 500, function(){
										_hideSearchBox();
									});
								},
								mouseenter : function(e)
								{
									$('header .search').find('.faux').stop(true);
								}
							});
						},
						_showSearchBox = function ()
						{
							$('header .search').addClass('active');
							$('header .search #search_label').removeAttr("disabled").focus();
						};
						_hideSearchBox = function()
						{
							$('header .search').removeClass('active');
							$('header .search #search_label').attr("disabled", "disabled");
						}
					_bindEvents();
				});
			},
			'header' : function()
			{
				return this.each(function(){
					var $el = $(this),
						cssBackgroundPos = $el.find('.tagline').css('backgroundPosition').split(" "),
						$tagline = $el.find('.tagline'),
						_updateImage = function(y)
						{
							if (y === $tagline.data('current-y'))
								return false;
							$tagline.stop(false, false).fadeOut(200, function(){
								$(this).css('background-position', '0px ' + y).fadeIn(200);
							}).data('current-y', y);
						};
					$el.data('default-y', cssBackgroundPos[1]);
						
					$(document).unbind('mouseleave').bind({
						mouseleave : function()
						{
							_updateImage($el.data('default-y'));
						}
					});
					$('header nav').find('a').each(function(){
						$(this).unbind().bind({
							'mouseenter' : function(e)
							{
								_updateImage('-' + $(this).data('tag-y') + 'px');
							},
							'mouseleave' :function(e)
							{
								_updateImage($el.data('default-y'));
							}
						});
					});
				});
			},
			lightbox : function(method)
			{
				var methods = {
					init : function()
					{
						$.address.change(function(event)
						{
							var lb = $.address.parameter('lb'),
								game = $.address.parameter('gameDetail'),
								sUrl = '/' + lb,
								downloadGame = $.address.parameter('game');
							if (typeof $('#lightbox').data('loaded') !== 'undefined' && typeof lb === 'undefined' && typeof game === 'undefined' && typeof downloadGame === 'undefined')
								return $(document).rsg('lightbox', 'unload');
							if (typeof lb === 'undefined')
								return;
							$(document).rsg('lightbox', 'load', {'url' : sUrl});
						});
						$('a.lightbox').unbind('click').bind({
							click : function(e)
							{
								e.preventDefault();
								e.stopPropagation();
								$.address.parameter('lb', $(this).attr('href_link'));
							}
						});
						$('#lightbox > .bg').css('opacity', '.75').unbind('click').bind({
							'click' : function(e)
							{
								if (typeof $(document).data('loaded') !== 'undefined')
									$(document).rsg('lightbox', 'unload');
							}
						});
						$('#lightbox > .content').unbind('xhr_complete').bind({
							'xhr_complete' : function(e)
							{
								$(this).find('.close_button').bind({
									click : function(e)
									{
										var lb = $.address.parameter('lb');
										if (typeof lb !== 'undefined')
											$.address.parameter('lb', '');
										$(document).rsg('lightbox', 'unload');
									}
								});
								$('html,body').animate({'scrollTop':'0'}, 200);
								$(document).rsg('newPage');
								$('.dropdown').dropdown();
								$(document).unbind('keyup').bind({
									keyup : function(e)
									{
										
									//	if (e.keyCode === 27)
									//	    $(document).rsg('lightbox', 'unload');
									}
								});
							}
						});
					},
					unload : function()
					{
						return this.each(function(){
							$(document).unbind('keyup');
							$('#lightbox').animate({'opacity':'0'}, {duration:200, complete:function(){
								$(this).find('> .content').empty();
								$(this).css('display', 'none');
							}}).removeData('loaded');
						});
					},
					load : function(options)
					{
						return this.each(function(){
							var settings = {url:null, complete:null};
							if (typeof options !== 'undefined')
								$.extend(settings, options);
							if (settings.url === null)
								return;

							if (typeof $('#lightbox').data('loaded') !== 'undefined' && $('#lightbox').data('loaded') === true)
								return $('#lightbox > .content').rsg('loadPage', {url:settings.url, complete:settings.complete});

							$('#lightbox').css({'opacity':'0', 'display':'block'}).stop(false, false).animate({'opacity':'1'}, {duration:200, queue:false, complete:function(e){
								$('#lightbox > .content').rsg('loadPage', {url:settings.url, complete:settings.complete});
							}}).data('loaded', true);
						});
					}
				};
				if ( methods[method] ) {
        			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        		} else if ( typeof method === 'object' || ! method ) {
        			return methods.init.apply( this, arguments );
        		} else {
        			$.error( 'Method ' +  method + ' does not exist on $.rsg.lightbox' );
        		}
			},
			'gamesDetails' :function(method)
			{
				var methods = {
					init : function()
					{
						var $el = $(this),
							_setScreenshot = function(sSrc)
							{
								$('.games_details img.ss_full').stop().animate({opacity:0}, {duration:250, complete:function(){
									$(this).attr('src', sSrc);
								}});
							},
							_setState = function(state)
							{
								switch (state) 
								{
									case 0 :
										$('.games_details .content .right .content_segment.information, .games_details .content .right .content_segment.news, .games_details .content .right .content_segment.videos').show();
										$('.games_details .content .right .content_segment.screenshots .selected').hide();
										$('.games_details .content .right .content_segment.screenshots .thumbs').css({'text-align':'left'});
										break;
									case 1 :
										$('.games_details .content .right .content_segment.information, .games_details .content .right .content_segment.news, .games_details .content .right .content_segment.videos').hide();
										$('.games_details .content .right .content_segment.screenshots .selected').show();
										$('.games_details .content .right .content_segment.screenshots .thumbs').css({'text-align':'center'});
										break;
								}
							},
							_bind = function()
							{
								$('#lightbox').find('.close_button').bind({
									click : function(e)
									{
										$.address.parameter('gameDetail', '');
									}
								});
								$('.games_details .content .right .content_segment.screenshots .thumbs .ss a').unbind().bind({
									click : function(e)
									{
										e.preventDefault();
										e.stopPropagation();
										_setState(1);
										_setScreenshot($(this).data('ss'));
									}
								});
								$('.games_details .content .right .content_segment.screenshots .back_to_details a').unbind().bind({
									click : function(e)
									{
										e.preventDefault();
										e.stopPropagation();
										_setState(0);
									}
								});
								$('.games_details img.ss_full').unbind().bind({
									load : function()
									{
										$(this).animate({opacity:1}, 250);
									}
								});
								$('.games_details.device.ipad, .games_details.device.iphone').find('.content_segment.videos a').unbind().bind({
									click : function(e)
									{
										e.preventDefault();
										e.stopPropagation();
									//	$.videoplayer.launchYoutube($(this).attr('video_id'));
									}
								});
							}
						$.address.change(function(event)
						{
							var game = $.address.parameter('gameDetail');
							if (typeof game === 'undefined')
								return $(document).removeData('game');
							if (game === $(document).data('game'))
								return;
							 $(document).data('game', game);
							if (typeof $(document).data('gameDetail') !== 'undefined' && typeof game === 'undefined')
								return $(document).rsg('lightbox', 'unload').removeData('gameDetail');
							if (typeof game === 'undefined')
								return;
							$(document).rsg('lightbox', 'load', {
								'url' : '/games/details/' + game,
								'complete' : function()
								{
									_bind();
								}
							}).data('gameDetail', true);
						});
						$(document).rsg('addthis');
					}
				};
				if ( methods[method] ) {
        			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        		} else if ( typeof method === 'object' || ! method ) {
        			return methods.init.apply( this, arguments );
        		} else {
        			$.error( 'Method ' +  method + ' does not exist on $.rsg.gamesDetails' );
        		}
			},
            shadow : function(method)
            {
                var methods = {
                    init : function(options)
                    {
                        return this.each(function(){
                            var settings = {
                                    type: $(this).hasClass('innershadow') ? 'inner' : 'outer'
                                },
                                _attach = function($el, type)
                                {
                                    if (typeof $el.data('shadow') !== 'undefined' && $el.data('shadow') === true)
                                        return;
                                        
                                    var s_c = $("<div />").addClass('shadow_img_content'),
                            			elements = $("<div />").addClass('shadow_elements ' + type + 'shadow_elements').prepend($('<div />').addClass('shadow_top').append(s_c.clone())).prepend($('<div />').addClass('shadow_right').append(s_c.clone())).prepend($('<div />').addClass('shadow_bottom').append(s_c.clone())).prepend($('<div />').addClass('shadow_left').append(s_c.clone())).prepend($('<div />').addClass('shadow_topleft').append(s_c.clone())).prepend($('<div />').addClass('shadow_topright').append(s_c.clone())).prepend($('<div />').addClass('shadow_bottomright').append(s_c.clone())).prepend($('<div />').addClass('shadow_bottomleft').append(s_c.clone())),
                            			bg = $('<div />').addClass('shadow_background');
                            		if (typeof ($el.attr('shadow-opacity')) !== 'undefined')
                            			bg.css({opacity: $el.attr('shadow-opacity')});
                            		if ($el.hasClass('opacity'))
                            			bg.css({'opacity': '.95'});
                            		elements.prepend(bg.clone());
                            		$el.css({'background': 'none'}).prepend(elements.clone()).addClass('shadowed_element').data('shadow', true);
                                };
                                
                            $.extend(settings, options);
                            
                            switch (settings.type)
                            {
                                case 'inner' :
                                case 'outer' :
                                    _attach($(this), settings.type);
                                    break;
                            }
                            if ($(this).hasClass('toggleshadow'))
                            {
                                $(this).unbind('mouseenter, mouseleave').bind({
                        			mouseenter: function (e)
                        			{
                        			    e.stopPropagation();
                        			    e.preventDefault();
                        				$(this).children('.shadow_elements').stop().show();
                        			},
                        			mouseleave: function (e)
                        			{
                        			    e.preventDefault();
                        			    e.stopPropagation();
                        				$(this).children('.shadow_elements').stop().hide();
                        			}
                        		}).trigger('mouseleave');
                            }
                        });
                    }
                }
                
                if ( methods[method] ) {
        			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        		} else if ( typeof method === 'object' || ! method ) {
        			return methods.init.apply( this, arguments );
        		} else {
        			$.error( 'Method ' +  method + ' does not exist on $.rsg.shadow' );
        		}
        	  
            },
            inject : function(key, value)
            {
                return this.each(function(){
                    _rsg[key] = value;
                });
            },
            init : function(options)
            {
                return this.each(function(){
                    $(this).rsg('newPage');
					$('header').rsg('header').rsg('searchbox');
					$(document).globalLogin({
						'base':$.paths.base.replace(/^http/, "https") + '/',
						'userPanel':$('#userPanel'),
						fbAppId:$.sc.fbAppId
					});
                });
            },
            newPage : function()
            {
                return this.each(function(){
					
                    $('.innershadow, .outershadow').rsg('shadow');
					$("li.tag").each(function(){
						if ($(this).attr('bound') === "true")
							return;
						var html = $(this).html();
						$(this)
							.empty()
							.append($('<div />').addClass('front inline_block va_top'))
							.append($('<div />').addClass('mid inline_block va_top').html(html))
							.append($('<div />').addClass('back inline_block va_top'))
							.attr('bound', "true");
					});
					$('a.game_detail, a[type="overview"]').unbind('click').bind({
    					click : function(e)
    					{
    						e.preventDefault();
    						$.address.parameter('gameDetail', $(this).attr('game'));
    					//	$.ga.trackEvent('Games', 'Detail', $(this).attr('game') + ": " + $(this).attr('game_title'));
    					}
    				});
					$(this).rsg('gamesDetails');
					$(this).rsg('lightbox');
					$(this).rsg('addthis');
					$('.img-shell').imgShell();
                });
            },
            loadPage : function(options)
            {
                return this.each(function(){
                    var $el = $(this),
                        settings = {
                            'url' : null,
							'complete' : null,
							'loader' : null
                        };
                    
                    if (typeof options !== 'undefined')
                        $.extend(settings, options);
                        
                    if (settings.url === null)
    					return $.error("URL must be defined");
    				if (settings.loader !== null && settings.loader.length !== 0)
						settings.loader.css('visibility', 'visible');
    				$.get($.paths.base + settings.url, function(data) {
    					$el.html(data).trigger('xhr_complete');
    					$(document).rsg('newPage');
						if (typeof settings.complete === 'function')
							settings.complete();
						if (settings.loader !== null && settings.loader.length !== 0)
							settings.loader.css('visibility', 'hidden');
    				});
                })
            }
        };
        
        for (var a in _rsg)
            methods[a] = _rsg[a];
        
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on $.rsg' );
		}
    }

	$(document).ready(function(){
	    $(document).rsg();
	    setLanguageSelector();
	});
    $(window).load(function () {
		$('body > .bgimg').css({"opacity":"0", "visibility":"visible"}).animate({"opacity":"1"}, 1300);
		var mobile = function() {
				var check = false;
				(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
				return check;
			}(),
			isChome = navigator.userAgent.indexOf('Chrome') > -1,
			isSafari = navigator.userAgent.indexOf("Safari") > -1,
			isActuallySafari = isSafari && !isChome;

		if (mobile || isActuallySafari) {
			$('body > .bgimg').hide();
		}
		
		$(document).rsg('addthis');
	});
}(jQuery, window, document));