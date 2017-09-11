(function(window, $){

	$.fn.globalLogin = function(method) {
    	jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});

        var sprintf=function(){function e(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()}function t(e,t){for(var n=[];t>0;n[--t]=e){}return n.join("")}var n=function(){if(!n.cache.hasOwnProperty(arguments[0])){n.cache[arguments[0]]=n.parse(arguments[0])}return n.format.call(null,n.cache[arguments[0]],arguments)};n.format=function(n,r){var i=1,s=n.length,o="",u,a=[],f,l,c,h,p,d;for(f=0;f<s;f++){o=e(n[f]);if(o==="string"){a.push(n[f])}else if(o==="array"){c=n[f];if(c[2]){u=r[i];for(l=0;l<c[2].length;l++){if(!u.hasOwnProperty(c[2][l])){throw sprintf('[sprintf] property "%s" does not exist',c[2][l])}u=u[c[2][l]]}}else if(c[1]){u=r[c[1]]}else{u=r[i++]}if(/[^s]/.test(c[8])&&e(u)!="number"){throw sprintf("[sprintf] expecting number but found %s",e(u))}switch(c[8]){case"b":u=u.toString(2);break;case"c":u=String.fromCharCode(u);break;case"d":u=parseInt(u,10);break;case"e":u=c[7]?u.toExponential(c[7]):u.toExponential();break;case"f":u=c[7]?parseFloat(u).toFixed(c[7]):parseFloat(u);break;case"o":u=u.toString(8);break;case"s":u=(u=String(u))&&c[7]?u.substring(0,c[7]):u;break;case"u":u=Math.abs(u);break;case"x":u=u.toString(16);break;case"X":u=u.toString(16).toUpperCase();break}u=/[def]/.test(c[8])&&c[3]&&u>=0?"+"+u:u;p=c[4]?c[4]=="0"?"0":c[4].charAt(1):" ";d=c[6]-String(u).length;h=c[6]?t(p,d):"";a.push(c[5]?u+h:h+u)}}return a.join("")};n.cache={};n.parse=function(e){var t=e,n=[],r=[],i=0;while(t){if((n=/^[^\x25]+/.exec(t))!==null){r.push(n[0])}else if((n=/^\x25{2}/.exec(t))!==null){r.push("%")}else if((n=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(t))!==null){if(n[2]){i|=1;var s=[],o=n[2],u=[];if((u=/^([a-z_][a-z_\d]*)/i.exec(o))!==null){s.push(u[1]);while((o=o.substring(u[0].length))!==""){if((u=/^\.([a-z_][a-z_\d]*)/i.exec(o))!==null){s.push(u[1])}else if((u=/^\[(\d+)\]/.exec(o))!==null){s.push(u[1])}else{throw"[sprintf] huh?"}}}else{throw"[sprintf] huh?"}n[2]=s}else{i|=2}if(i===3){throw"[sprintf] mixing positional and named placeholders is not (yet) supported"}r.push(n)}else{throw"[sprintf] huh?"}t=t.substring(n[0].length)}return r};return n}();var vsprintf=function(e,t){t.unshift(e);return sprintf.apply(null,t)}

        var BrowserDetect={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(e){for(var t=0;t<e.length;t++){var n=e[t].string;var r=e[t].prop;this.versionSearchString=e[t].versionSearch||e[t].identity;if(n){if(n.indexOf(e[t].subString)!=-1)return e[t].identity}else if(r)return e[t].identity}},searchVersion:function(e){var t=e.indexOf(this.versionSearchString);if(t==-1)return;return parseFloat(e.substring(t+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone/iPod"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};BrowserDetect.init()

    	var methods = {
            'loginResponse' : function(response) {
            
                return this.each(function(e){
                    
                    var $page = $(this),
                        $loginPanel = $('#globalLoginPanel'),
                        $spinner = $('.spinner', $loginPanel),
                        $errorContainer = $('p.errors', $loginPanel),
                        $form = $('form', $loginPanel);

                    $spinner.css('visibility', 'hidden');

                    switch (response.status) {
                        case 0 :
                            $errorContainer.html(response.message).css('visibility', 'visible');
                            $page.trigger('resize');
                            break;
                        case 1 :
                            if (BrowserDetect.OS === 'iPhone/iPod')
                                return window.location.reload();

                            $('body').removeClass('globalLoginPanelActive');
                            $page.trigger('globalLoginSet');
                            $page.globalLogin('getSettings');
                            break;
                    }
                    $(window).focus();
                })
            }, 

    		'loginPanel' : function() {
    			return this.each(function(){
    				var $page = $(this),
                        $loginPanel = $('#globalLoginPanel'),
                        $spinner = $('.spinner', $loginPanel),
                        $errorContainer = $('p.errors', $loginPanel),
                        $form = $('form', $loginPanel);

                    // If browser doesn't support cors (IE9), add callback param. This makes it a jsonp call automatically in jquery
                    if (!$.support.cors && typeof $form.data('cors-check') === 'undefined')
                        $form.attr('action', $form.attr('action') + '?callback=?').data('cors-check', true);
					$form.ajaxForm({
						dataType : 'json',
                        async : true,
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        'beforeSubmit' : function() {
                            $form.attr('action')
                            $errorContainer.html('').css('visibility', 'hidden');
                            $spinner.css('visibility', 'visible');
                        },
						success: function(response) {
                            if (response.status === 1)
                                $form[0].reset();
                            $page.globalLogin('loginResponse', response);
						}
					});
					
    			})
    		},

    		'getSettings' : function() {
    			return this.each(function(){
    				var $page = $(this),
    					settings = $page.data('globalLoginSettings');
    				$.getJSON(settings.base + 'comments_dal/users/getGlobalLoginSettings.json?callback=?', function(response){
        				if (typeof response.user === 'undefined' || response.user === false) {
                            if (typeof $('body').data('hasLoginPanel') === 'undefined')
            					$('body').prepend(response.loginPanelMarkup).data('hasLoginPanel', true);
                            $page.globalLogin('loginPanel');
        					settings.userPanel.html(response.userPanelLoggedOutMarkup);
                            $page.trigger('globalLoginHasNoUser');
                        } else {
                            
                            // This actually injects the markup, listeners must follow
                            settings.userPanel.html(response.userPanelLoggedInMarkup);

                            if (response.user.admin == 1) {
                                settings.userPanel.addClass('admin');
                            } else {
                                $.getJSON(sprintf('http://%s.rockstargames.com/message/totalactivitycount?callback=?', response.scHost), function(response){
                                    if (parseInt(response) > 0) {
                                        $('#globalLoginActivityPanel').hideOnMouseout(1000);
                                    } else {
                                        $('#globalLoginActivityPanel').hideOnMouseout = function(){};
                                        $('#globalLoginActivityPanel .handle').addClass('disabled');
                                    }
                                        
                                    $('span#activityCountTotal').data('count', response).html(response);
                                    $('#globalLoginActivityPanel .handle').css('visibility', 'visible');
                                });
                                $('.avatar a', settings.userPanel).attr(
                                    'href',
                                    sprintf(settings.userPanel.find('.avatar a').data('hreftemplate'), response.user.nickname, response.user.id)
                                );
                            }
                            
                            $('.avatar img', settings.userPanel).attr('src', response.user.avatarUrl);
        					$('.nickname', settings.userPanel).html(response.user.nickname);
                            $('.dropdown').dropdown();
                            
                            
                            $page.trigger('globalLoginHasUser', [response.user]);
        				}
                        settings.userPanel.addClass('initialized');
        			});
    			});
    		},

    		'init' : function(settings) {
    			return this.each(function(){
    				var $page = $(this),
    					defaults = {'userPanel':false, 'base':'', fbAppId:0};

                    settings = $.extend(defaults, settings);
                    if (settings.fbAppId === 0)
                        return $.error('Please provide a FB app id.');
    				if (settings.userPanel.length !== 1)
    					return $.error('Your global login does not have a #userPanel div.');

    				$page.data('globalLoginSettings', settings);

    				$(document).on('click', '.globalLoginSigninButton', function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        $('body').toggleClass('globalLoginPanelActive');
                    });

                    settings.userPanel.on('click', '#globalLoginSignoutButton', function(e){
                        e.preventDefault();
                        e.stopPropagation();

                        
                        var url = settings.userPanel.hasClass('admin')
                            ? settings.base + 'comments_dal/users/logout.json?callback=?'
                            : $(this).data('sclogout');
                        
                        $.getJSON(url, function(response){
                            switch (parseInt(response['Status']))  {
                                case 1 :
                                    if (!settings.userPanel.hasClass('admin')) {
                                        $.getJSON(settings.base + 'comments_dal/users/logout.json?callback=?', function(response){
                                            switch (parseInt(response['Status'])) {
                                                case 1 : 
                                                     $page.globalLogin('getSettings');
                                                    break;
                                            }
                                        });
                                    } else {
                                        $page.globalLogin('getSettings');
                                    }
                                    
                                    break;
                            }
                        });
                        settings.userPanel.removeClass('admin');
                    });

                    if (typeof FB !== 'undefined') {
                        FB.init({
                            appId  : settings.fbAppId,//$.facebook.appId,
                            status : true, // check login status
                            cookie : true, // enable cookies to allow the server to access the session
                            xfbml  : true,  // parse XFBML
                            oauth : true
                        });
                    }

                    $page.on('click', 'a.facebookLoginLink', function(e){
                        e.preventDefault();
                        e.stopPropagation();

                        FB.login(function(response) {
                            if (response && response['status'] === 'connected') {
                                $.getJSON(settings.base + 'comments_dal/users/authFacebook.json?callback=?&access_token=' + response.authResponse.accessToken, function(response){
                                    $page.globalLogin('loginResponse', response);
                                });
                            }
                            
                        }, {scope: 'email,offline_access,user_birthday,publish_stream'});

                    });

                    $page.on('click', 'a.twitterLoginLink', function(e) {
                        e.preventDefault();
                        e.stopPropagation();

                        var popUp = window.open(settings.base + 'comments_dal/users/authTwitter','name','height=840,width=700');
                        if (window.focus) {popUp.focus()}
                    });

                    $page.keyup(function(e) {

                        if (e.keyCode == 27)
                            $('body').removeClass('globalLoginPanelActive');
                    });
                    $page.on('click', function(e){
                        var bInLoginPanel = $(e.target).parents('#globalLoginPanel').length>0 || $(e.target).attr('id')==='globalLoginPanel'?true:false;
                        
                        if (bInLoginPanel)
                            return;

                        $('body').removeClass('globalLoginPanelActive');
                    })

    				$page.globalLogin('getSettings');

                    $page.on('iNeedGlobalLoginData', function(e){
                        $page.globalLogin('getSettings');
                    });

                    settings.userPanel.on('click', '#globalLoginActivityPanel .handle', function(e){
                        e.preventDefault();
                        e.stopPropagation();

                        if ($(this).hasClass('disabled')) return false;

                        $('#globalLoginActivityPanel').toggleClass('active');

                        if (typeof settings.userPanel.data('userActivityFetched') !== 'undefined' || (typeof $('span#activityCountTotal').data('count') !== 'undefined' && $('span#activityCountTotal').data('count') === 0))
                            return;
                        var host = $(this).data('schost');
                        settings.userPanel.data('userActivityFetched', true);

                        var activityNumbers = {unreadNotifications:0,friendInviteCount:0,unreadMessageCount:0,crewInviteCount:0},
                            cb = function() {
                                $('#userPanel .spinner').hide();
                                if (activityNumbers.unreadNotifications > 0){
                                    var singularMessage = $('#globalLoginActivityPanel ul li.unreadNotifications').data('notification'),
                                        pluralMessage = $('#globalLoginActivityPanel ul li.unreadNotifications').data('notifications');
                                    $('#globalLoginActivityPanel ul li.unreadNotifications').show().find('a').html(sprintf($('#globalLoginActivityPanel ul li.unreadNotifications a').html(), parseInt(activityNumbers.unreadNotifications), activityNumbers.unreadNotifications===1?singularMessage : pluralMessage));//);
                                }
                                if (activityNumbers.friendInviteCount > 0){
                                    var singularMessage = $('#globalLoginActivityPanel ul li.friendInvites').data('friend'),
                                        pluralMessage = $('#globalLoginActivityPanel ul li.friendInvites').data('friends');
                                    $('#globalLoginActivityPanel ul li.friendInvites').show().find('a').html(sprintf($('#globalLoginActivityPanel ul li.friendInvites a').html(), activityNumbers.friendInviteCount, activityNumbers.friendInviteCount===1?singularMessage : pluralMessage));//);
                                }
                                if (activityNumbers.unreadMessageCount > 0){
                                    var singularMessage = $('#globalLoginActivityPanel ul li.unreadMessages').data('message'),
                                        pluralMessage = $('#globalLoginActivityPanel ul li.unreadMessages').data('messages');
                                    $('#globalLoginActivityPanel ul li.unreadMessages').show().find('a').html(sprintf($('#globalLoginActivityPanel ul li.unreadMessages a').html(), activityNumbers.unreadMessageCount, activityNumbers.unreadMessageCount===1? singularMessage : pluralMessage));
                                }
                                if (activityNumbers.crewInviteCount > 0){
                                    var singularMessage = $('#globalLoginActivityPanel ul li.crewInvites').data('crew'),
                                        pluralMessage = $('#globalLoginActivityPanel ul li.crewInvites').data('crews');
                                    $('#globalLoginActivityPanel ul li.crewInvites').show().find('a').html(sprintf($('#globalLoginActivityPanel ul li.crewInvites a').html(), activityNumbers.crewInviteCount, activityNumbers.crewInviteCount===1?singularMessage : pluralMessage));//);
                                }
                            }

                        $.getJSON(sprintf('http://%s.rockstargames.com/reference/unreadcount?callback=?', host), function (data) {
                            if (data && data.unreadCount >= 0)
                                activityNumbers.unreadNotifications = data.unreadCount;
                            $.getJSON(sprintf('http://%s.rockstargames.com/friends/receivedinvites?callback=?', host), function (data) {
                                if (data && data.TotalCount >= 0)
                                    activityNumbers.friendInviteCount = data.TotalCount;
                                $.getJSON(sprintf('http://%s.rockstargames.com/message/unreadmessagecount?callback=?', host), function (data) {
                                    if (data && data.Unread >= 0)
                                        activityNumbers.unreadMessageCount = data.Unread;
                                    $.getJSON(sprintf('http://%s.rockstargames.com/crews/receivedcrewinvitescount?callback=?', host), function (data) {
                                        if (data && data.Total >= 0)
                                            activityNumbers.crewInviteCount = data.Total;
                                        cb();
                                    });
                                });
                                
                            });
                            
                        });
                    });
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

})(window, window.jQuery);