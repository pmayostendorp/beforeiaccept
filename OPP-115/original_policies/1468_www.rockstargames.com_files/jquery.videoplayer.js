(function(window, $, document){

	// jQuery SWFObject v1.1.1 MIT/GPL @jon_neal:: http://jquery.thewikies.com/swfobject
	(function(f,h,i){function k(a,c){var b=(a[0]||0)-(c[0]||0);return b>0||!b&&a.length>0&&k(a.slice(1),c.slice(1))}function l(a){if(typeof a!=g)return a;var c=[],b="";for(var d in a){b=typeof a[d]==g?l(a[d]):[d,m?encodeURI(a[d]):a[d]].join("=");c.push(b)}return c.join("&")}function n(a){var c=[];for(var b in a)a[b]&&c.push([b,'="',a[b],'"'].join(""));return c.join(" ")}function o(a){var c=[];for(var b in a)c.push(['<param name="',b,'" value="',l(a[b]),'" />'].join(""));return c.join("")}var g="object",m=true;try{var j=i.description||function(){return(new i("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}()}catch(p){j="Unavailable"}var e=j.match(/\d+/g)||[0];f[h]={available:e[0]>0,activeX:i&&!i.name,version:{original:j,array:e,string:e.join("."),major:parseInt(e[0],10)||0,minor:parseInt(e[1],10)||0,release:parseInt(e[2],10)||0},hasVersion:function(a){a=/string|number/.test(typeof a)?a.toString().split("."):/object/.test(typeof a)?[a.major,a.minor]:a||[0,0];return k(e,a)},encodeParams:true,expressInstall:"expressInstall.swf",expressInstallIsActive:false,create:function(a){if(!a.swf||this.expressInstallIsActive||!this.available&&!a.hasVersionFail)return false;if(!this.hasVersion(a.hasVersion||1)){this.expressInstallIsActive=true;if(typeof a.hasVersionFail=="function")if(!a.hasVersionFail.apply(a))return false;a={swf:a.expressInstall||this.expressInstall,height:137,width:214,flashvars:{MMredirectURL:location.href,MMplayerType:this.activeX?"ActiveX":"PlugIn",MMdoctitle:document.title.slice(0,47)+" - Flash Player Installation"}}}attrs={data:a.swf,type:"application/x-shockwave-flash",id:a.id||"flash_"+Math.floor(Math.random()*999999999),width:a.width||320,height:a.height||180,style:a.style||""};m=typeof a.useEncode!=="undefined"?a.useEncode:this.encodeParams;a.movie=a.swf;a.wmode=a.wmode||"opaque";delete a.fallback;delete a.hasVersion;delete a.hasVersionFail;delete a.height;delete a.id;delete a.swf;delete a.useEncode;delete a.width;var c=document.createElement("div");c.innerHTML=["<object ",n(attrs),">",o(a),"</object>"].join("");return c.firstChild}};f.fn[h]=function(a){var c=this.find(g).andSelf().filter(g);/string|object/.test(typeof a)&&this.each(function(){var b=f(this),d;a=typeof a==g?a:{swf:a};a.fallback=this;if(d=f[h].create(a)){b.children().remove();b.html(d)}});typeof a=="function"&&c.each(function(){var b=this;b.jsInteractionTimeoutMs=b.jsInteractionTimeoutMs||0;if(b.jsInteractionTimeoutMs<660)b.clientWidth||b.clientHeight?a.call(b):setTimeout(function(){f(b)[h](a)},b.jsInteractionTimeoutMs+66)});return c}})(jQuery,"flash",navigator.plugins["Shockwave Flash"]||window.ActiveXObject);

	// sprintf
	(function($){var formats={'b':function(val){return parseInt(val,10).toString(2);},'c':function(val){return String.fromCharCode(parseInt(val,10));},'d':function(val){return parseInt(val,10);},'u':function(val){return Math.abs(val);},'f':function(val,p){p=parseInt(p,10);val=parseFloat(val);if(isNaN(p&&val)){return NaN;}return p&&val.toFixed(p)||val;},'o':function(val){return parseInt(val,10).toString(8);},'s':function(val){return val;},'x':function(val){return(''+parseInt(val,10).toString(16)).toLowerCase();},'X':function(val){return(''+parseInt(val,10).toString(16)).toUpperCase();}};var re=/%(?:(\d+)?(?:\.(\d+))?|\(([^)]+)\))([%bcdufosxX])/g;var dispatch=function(data){if(data.length==1&&typeof data[0]=='object'){data=data[0];return function(match,w,p,lbl,fmt,off,str){return formats[fmt](data[lbl]);};}else{var idx=0;return function(match,w,p,lbl,fmt,off,str){if(fmt=='%'){return'%';}return formats[fmt](data[idx++],p);};}};$.extend({sprintf:function(format){var argv=Array.apply(null,arguments).slice(1);return format.replace(re,dispatch(argv));},vsprintf:function(format,data){return format.replace(re,dispatch(data));}});})(jQuery);

	$.fn.videoplayer = function(method)
	{
		var _flashVersionNeeded = 10,
			sVideoPlayerStaticClass = "rockstar-games-video-player-rendered",
			_flash = function(){
			return {
				init:function($container)
				{
					var settings = $container.data('settings');
					$container.addClass(sVideoPlayerStaticClass).css('position', 'relative').flash({
						swf:settings.swf,
						width:'100%',
						height:'100%',
						allowfullscreen:'true',
						allowscriptaccess:'always',
						bgcolor: settings.bgcolor,
						wmode:settings.wmode,
                        flashvars:{
						    etcontrols: settings.etcontrols,
							vidID: settings.videoid,
							serviceroot: settings.serviceroot,
							resolution: settings.resolution,
							agegate: settings.agegate,
							secret: settings.secret,
							autoplay: settings.autoplay,
							containerID : settings.containerID,
							showmorescreen : settings.showMoreScreen,
							protocol : settings.protocol
						}
					});
				},
				update:function($container)
				{
					var settings = $container.data('settings');
					$($container.children()).get(0).video(settings.videoid);
				}
			}
		}(),
		_html5 = function() {
			var _load = function($container) {
				var settings = $container.data('settings');
				$container.empty().html($.sprintf('<iframe src="//%s.rockstargames.com/videoplayer/?id=%d&context=%s&locale=%s" allowfullscreen style="width:640px; height:360px; display:block; margin:0 auto; border:none;"></iframe>', settings.serviceroot, Number(settings.videoid), settings.html5context, settings.locale));
			}
			return {
				init : function($container)
				{
					_load($container);
				},
				update:function($container)
				{
					_load($container);
				}
			}
		}(),
		_youtube = function()
		{
			var _load = function($container)
			{
				var settings = $container.data('settings');
				$.getJSON("/videos_dal/videoplayer/getVideoInformation/" + settings.videoid + ".json", function(data){
					var sYoutubeID = data.Video.youtube;
					if (sYoutubeID === null) {
						return $.error('There is no associated youtube embed for video id ' + settings.videoid);
					}
					if (data.Video.agegated) {
						$container.html($.sprintf('<iframe width="100%" height="100%" src="//www.rockstargames.com/livestream/?ytId=%s" frameborder="0" allowfullscreen></iframe>', sYoutubeID));
					} else {
						$container.html($.sprintf('<iframe width="100%" height="100%" src="//www.youtube.com/embed/%s" frameborder="0" allowfullscreen></iframe>', sYoutubeID));
					}
				});
			};
			return {
				init : function($container)
				{
					_load($container);
				},
				update:function($container)
				{
					_load($container);
				}
			}
		}(),
		methods = {
			'lights' : function(method)
			{
				var methods = {
					'init' : function()
					{
						var $el = $(document),
						sName = 'videoplayer-lights',
						bLights = $el.data(sName),
						$players = $('.' + sVideoPlayerStaticClass),
						off = function()
						{
							if ($el.data(sName))
								$(document).videoplayer('lights');
						};
						$el.data(sName, typeof bLights === 'undefined' || bLights === false ? true : false);
						if ($el.data(sName) === true)
						{
							var underlay = $('<div />', {'id' : sName}).css({
								"opacity":".9",
								"z-index":"1000",
								"position":"fixed",
								"top":"0",
								"left":"0",
								"width":"100%",
								"height":"100%",
								"background-color":"#000"
							}).bind({
								click : function(e)
								{
									e.preventDefault();
									off();
								}
							});
							$('body').prepend(underlay);

							$players.css('z-index', '1001');
						}
						else
						{
							$('#' + sName).remove();
							$players.css('z-index', 'auto');
						}
					}
				};
				if ( methods[method] ) {
					return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
				} else if ( typeof method === 'object' || ! method ) {
					return methods.init.apply( this, arguments );
				} else {
					$.error( 'Method ' +  method + ' does not exist on $.videoplayer.lights' );
				}
			},
			setVideo : function(options)
			{
				return this.each(function()
				{
					var $container = $(this);
					if ($.flash.hasVersion(_flashVersionNeeded) === true) {
						_flash.update($container);
					} else {
						_youtube.update($container);
					}
				});
			},
			'pause' : function(options)
			{
				$('.' + sVideoPlayerStaticClass).each(function(){
					$(this).children(0).get(0).pause();
				});
			},
			init : function(options)
			{
				return this.each(function()
				{
					var $container = $(this),
						settings = {
							'agegate':true,
							'autoplay':false,
							'onComplete' : null,
							'serviceroot' : null,
							'containerID' : '.videoplayer',
							'showMoreScreen' :true,
							'etcontrols' : false,
							'wmode' : 'transparent',
							'bgcolor' : '#000000',
							'protocol' : 'http:',
							'html5context' : 'site',
							'locale': 'en_us',
							'swf' : "/videos_dal/swf/RockstarVideoPlayer.swf"
						};
					if (typeof options !== 'undefined') {
						$.extend(settings, options);
					}

					if (settings.serviceroot === null) {
						settings.serviceroot =  window.location.hostname.split('.')[0];
					}
					$container.data('settings', settings);

					if (typeof settings.videoid === 'undefined') {
						return $.error("You need to give this method a video id.");
					}

					$.getJSON("/videos_dal/videoplayer/getVideoInformation/" + settings.videoid + ".json", function(data) {
						if ($.type(data.Video.atw) !== 'undefined' && data.Video.atw === '1') {
							_html5.init($container);
						} else if (typeof $container.data('initialized') === 'undefined' && $.flash.hasVersion(_flashVersionNeeded) === true) {
							_flash.init($container);
						} else if (typeof $container.data('initialized') === 'undefined' && $.flash.hasVersion(_flashVersionNeeded) === false) {
							_youtube.init($container);
						} else if ($container.data('initialized') === true) {
							$container.videoplayer('setVideo');
						}
						// $container.data('initialized', true);
					});
				});
			}
		};

		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on $.videoplayer' );
		}
	};

	$.videoplayerCallbacks = (function(){
        return {
            onComplete : function(containerID)
            {
                $(containerID).data('settings').onComplete();
            }
        }
	})();

})(window, window.jQuery, document);