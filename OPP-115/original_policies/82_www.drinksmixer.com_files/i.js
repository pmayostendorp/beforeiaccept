//<script>
if (!bouncex) { 	var bouncex = {};
	bouncex.website = {"ei":1,"cookie_name":"bounceClientVisit1390","base_host":"assets.bounceexchange.com","vars":{"ever_submitted_email":{"polling":"all","persist":"permanent","val":"(function(){\n\tif (window.location.href.indexOf('newsletters') > -1 && jQuery('div.email').find('input').val()) {\n\t\treturn true;\n\t} else if (jQuery('.dialog').text().indexOf('Thanks') > -1) {\n\t\treturn true;\n\t}\n})();","default":"false"},"time_on_site":{"polling":"all","persist":"visit","val":"(function(){\n\tif(getBounceCookie('first_visit_time')){ \n\t\tvar first_visit_time = getBounceCookie('first_visit_time'),\n\t\t\tcurrent = new Date().getTime(),\n\t\t\tdifference = (current - first_visit_time) \/ 60000;\n\t\treturn parseFloat(difference.toFixed(1));\n\t} else {\n\t\tbouncex.ibx._cookies.create('first_visit_time', new Date().getTime());\n\t\treturn 0;\n\t}\n})();","default":""},"video_playing":{"polling":"all","persist":"no","val":"(function(){\n\tif (OO) {\n\t\tvar videoLink = jQuery('object[type=\"application\/x-shockwave-flash\"]').attr('data'),\n\t\t\tvideoID = jQuery('.ooyala-video').attr('id'),\n\t\t\tvideoPlayer = OO.Player.create(videoID, videoLink,{\n\t\t\t\theight:'100%',\n\t\t\t\twidth:'100%'\n\t\t\t});\n\t\tif (videoPlayer.state === 'playing') {\n\t\t\treturn true;\n\t\t} else {\n\t\t\treturn false;\n\t\t}\n\t}\n})();","default":"false"},"num_articles_viewed":{"polling":"none","persist":"visit","val":"(function(){\n\tvar currArticle = window.location.href;\n\tif (localStorage.articles && localStorage.articles.indexOf(currArticle) === -1) {\n\t\tif(currArticle.indexOf('articles\/') > -1){\n\t\t\tlocalStorage.articles += currArticle;\n\t\t}\n\t} else if (localStorage.articles && localStorage.articles.indexOf(currArticle) > -1) {\n\t\treturn localStorage.articles.split('http').splice(1).length;\n\t} else {\n\t\tlocalStorage.setItem('articles', '');\n\t\tif (currArticle.indexOf('articles\/') > -1) {\n\t\t\tlocalStorage.articles += currArticle;\n\t\t} else {\n\t\t\treturn 0;\n\t\t}\n\t}\n\treturn localStorage.articles.split('http').splice(1).length;\n})();","default":""},"on_article_page":{"polling":"none","persist":"no","val":"window.location.href.indexOf('articles\/') > -1;","default":""},"category":{"polling":"all","persist":"no","val":"jQuery('.channel').text() || jQuery('span[itemprop=title]:first').text();","default":"false"},"subcategory":{"polling":"all","persist":"no","val":"jQuery('select').find('option:selected').text() || jQuery('span[itemprop=title]:last').text();","default":"false"}},"acts":[],"pi":1000,"ct":"bind_to_domain","tcjs":"","cjs":"","PMI":500,"PDI":1000,"PMR":30,"force_https":false,"waypoints":false,"gai":"","ots":0,"sd":0,"aco":{"first_party_limit":"3500"},"id":1390,"campaign_id":0,"tpc":0,"uwc":1,"domain":"sheknows.com","bau":"api.bounceexchange.com","is_preview":false,"mas":2,"map":1,"burls":[],"ese":false,"ibx":{"cjs":"","miw":"0","mibcx":0,"te":0,"tjs":"","cart_rep":{"get":"","set":""}}};
		window.console || (window.console = {log: function () { return {} }});



	var bcx_init = function(){
		if(bouncex.baddjs){
			return;//only include our tag once
		}

		// jw: polyfill window.atob and window.btoa
		(function(g){"window"in g&&"document"in g&&function(){function h(a){a=String(a);var d=0,e=[],b=0,c=0,f;a=a.replace(/\s/g,"");0===a.length%4&&(a=a.replace(/=+$/,""));if(1===a.length%4)throw Error("InvalidCharacterError");if(/[^+/0-9A-Za-z]/.test(a))throw Error("InvalidCharacterError");for(;d<a.length;)f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(a.charAt(d)),b=b<<6|f,c+=6,24===c&&(e.push(String.fromCharCode(b>>16&255)),e.push(String.fromCharCode(b>>8&255)),e.push(String.fromCharCode(b&255)),b=c=0),d+=1;12===c?e.push(String.fromCharCode(b>>4&255)):18===c&&(b>>=2,e.push(String.fromCharCode(b>>8&255)),e.push(String.fromCharCode(b&255)));return e.join("")}function k(a){a=String(a);var d=0,e=[],b,c,f,g;if(/[^\x00-\xFF]/.test(a))throw Error("InvalidCharacterError");for(;d<a.length;)b=a.charCodeAt(d++),c=a.charCodeAt(d++),f=a.charCodeAt(d++),g=b>>2,b=(b&3)<<4|c>>4,c=(c&15)<<2|f>>6,f&=63,d===a.length+2?f=c=64:d===a.length+1&&(f=64),e.push("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g),"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(b),"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(c),"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(f));return e.join("")}"atob"in g&&"btoa"in g||(g.atob=h,g.btoa=k)}()})(window);

		if(!window['postMessage']){
			return;//only support browsers that support messages
		}
		if(!bouncex.website.tpc && !bouncex.website.is_preview){
			if(document.cookie.length>6000){
				return;
			}
		}
		if(!bouncex.website.ei && window!=window.top){
			return;
		}
		if (bouncex.website.burls.length){
			for(var k in bouncex.website.burls){
				if (bouncex.website.burls.hasOwnProperty(k)){
					var burl = bouncex.website.burls[k];
					if (burl.prop.indexOf('contains')!=-1){
						var c = window.location.href.indexOf(burl.val);
						if ((burl.prop=='contains'&&c!=-1)||(burl.prop=='not_contains'&&c==-1)){
							return;
						}
					} else if (burl.prop.indexOf('regex_match')!=-1){
						var m = (new RegExp(burl.val,'gi')).test(window.location.href);
						if ((burl.prop=='regex_match'&&m)||(burl.prop=='not_regex_match'&&!m)){
							return;
						}
					}
				}
			}
		}
		if(bouncex.website.ct=='multi_cookie'){ 
			window.MultiCookie = function(k){this.disable_first_party=!1;this.first_party_limit=999999;this.domain=window.location.host;this.best=function(a,b){return b.length>a.length?b:a};this.parse_json=function(a){return JSON.parse(a)};this.stringify_json=function(a){return JSON.stringify(a)};this.set_qs=function(a,b,c){return a=-1==a.indexOf("&"+b+"=")?a+("&"+b+"="+c):a.replace(new RegExp("&"+b+"=[^&]*"),"&"+b+"="+c)};for(var l in k)this[l]=k[l];var g=window.localStorage,h=window.globalStorage;this.set=function(a,
			b){"object"==typeof b&&(b=this.stringify_json(b));this.disable_first_party||this.cookie(a,b);this.local_storage(a,b);this.global_storage(a,b);this.window_name(a,b);this.user_data(a,b)};this.get=function(a){for(var b=this.getvs(a),c="",e;e=b.pop();)c=this.best(c,e);this.set(a,c);return c};this.getvs=function(a){function b(a){a&&""!==a&&c.push(a)}var c=[];b(this.cookie(a));b(this.local_storage(a));b(this.global_storage(a));b(this.window_name(a));b(this.user_data(a));return c};this.cookie=function(a,
			b){if(void 0!==b){var c=this.domain;0>window.location.host.indexOf(c)&&(c=window.location.host.split(".").slice(-2).join("."));document.cookie=a+"='; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/; domain="+c;document.cookie.length+b.length<this.first_party_limit&&(document.cookie=a+"="+b+"; expires=Tue, 31 Dec 2030 00:00:00 UTC; path=/; domain="+c)}else return this.get_qs(a,document.cookie)};this.local_storage=function(a,b){try{if(g)if(void 0!==b)g.setItem(a,b);else return g.getItem(a)}catch(c){}};
			this.global_storage=function(a,b){if(h){var c=this.getHost();try{if(void 0!==b)h[c][a]=b;else return h[c][a]}catch(e){}}};this.window_name=function(a,b){try{if(void 0!==b)window.name=this.set_qs(window.name,a,b);else return this.get_qs(a,window.name)}catch(c){}};this.user_data=function(a,b){try{var c=this.createElem("div","userdata_el",1);c.style.behavior="url(#default#userData)";if(void 0!==b)c.setAttribute(a,b),c.save(a);else return c.load(a),c.getAttribute(a)}catch(e){}};this.get_qs=function(a,
			b){if("string"===typeof b){var c=a+"=",e=b.split(/[;&]/),f,d;for(f=0;f<e.length;f++){for(d=e[f];" "===d.charAt(0);)d=d.substring(1,d.length);if(0===d.indexOf(c))return d.substring(c.length,d.length)}}}};

			window.getBounceCookie = function(n){
				if(!bouncex.multicookie){
					bouncex.multicookie=new MultiCookie({
						domain:bouncex.website.domain,
						disable_first_party:bouncex.website.aco.disable_first_party&&bouncex.website.aco.disable_first_party?1:0,
						first_party_limit:bouncex.website.aco.first_party_limit&&bouncex.website.aco.first_party_limit?bouncex.website.aco.first_party_limit:999999,
						parse_json:bouncex.parseJSON,
						stringify_json:bouncex.stringify,
						best:function(b,o){
							if (b==='')b={};
							var obj={};
							try{
								obj=this.parse_json(o);
							}catch(e){
								return b;
							}
							var bfvt=b.fvt?b.fvt:0,
								ofvt=obj.fvt?obj.fvt:0;
							return (ofvt>bfvt)?obj:b;
						}
					});
				}
				if (n!==undefined){
					return bouncex.multicookie.cookie(n);
				} else {
					obj = bouncex.multicookie.get(bouncex.website.cookie_name);
					if (obj==='') obj = {};
					return bouncex.stringify(obj);
				}
			}
		}else{
			window.getBounceCookie = function(name){
				if(!name){
					name = bouncex.website.cookie_name;
				}	
				var i,x,y,ARRcookies=document.cookie.split(";");
				for (i=0;i<ARRcookies.length;i++){
					x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
					y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
					x=x.replace(/^\s+|\s+$/g,"");
					if (x==name){
						return (y);
					}
				}
			}
		}
		window.setBounceVisitCookie = function(){
			var c_name = bouncex.website.cookie_name+'v';
			var cookie = bouncex.visit_cookie;
			var exdate = new Date();
			exdate.setTime(exdate.getTime() + 30*60*1000);
			var c_value=((bouncex.stringify_cookie(bouncex.visit_cookie)) + "; expires=" + exdate.toUTCString());
			if(bouncex.cookie_domain){
				document.cookie =  (c_name + "=" + c_value + ";path=/;domain=."+bouncex.cookie_domain+";");
			}else{
				document.cookie =  (c_name + "=" + c_value + ";path=/;");
			}
		}
		window.getBounceVisitCookie = function(name){
			if(!name){
				name = bouncex.website.cookie_name+'v';
			}	
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++){
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x==name){
					return (y);
				}
			}
		}
		if(bouncex.website.ct=='multi_cookie'){
			window.setBounceCookie = function (){
				var c_name = bouncex.website.cookie_name;
				bouncex.multicookie.set(c_name,bouncex.stringify_cookie(bouncex.cookie));
				jQuery('<img src="'+bouncex.au+'/capture/update_cookie?cookie_name='+c_name+'&cookie='+encodeURIComponent(bouncex.stringify(bouncex.cookie))+'" />');
			}
		}else{ 
			window.setBounceCookie = function (){
				var c_name = bouncex.website.cookie_name;
				
				if(bouncex.website.tpc){
				
					jQuery('<img src="'+bouncex.au+'/capture/update_cookie?cookie_name='+c_name+'&cookie='+encodeURIComponent(bouncex.stringify(bouncex.cookie))+'" />');
				}else{
					var exdate = new Date();
					exdate.setDate(exdate.getDate() + 365);
					var c_value=((bouncex.stringify_cookie(bouncex.cookie)) + "; expires=" + exdate.toUTCString());
					if(bouncex.cookie_domain){
						document.cookie =  (c_name + "=" + c_value + ";path=/;domain=."+bouncex.cookie_domain+";");
					}else{
						document.cookie =  (c_name + "=" + c_value + ";path=/;");
					}
				}
			}
		}
		window.clearBounceCookie = function(){
			var c_name = bouncex.website.cookie_name;
			var c_value2 = '; expires=Thu, 01 Jan 1970 00:00:01 GMT';

			if(bouncex.website.tpc){

				document.cookie =  (c_name + "=" + c_value2 + ";path=/;");//try to erase bctsd cookie
				document.cookie =  (c_name + "=" + c_value2 + ";path=/;domain=."+window.location.hostname+";");//try to erase bctd cookie
			}else{
				if(bouncex.cookie_domain){
					document.cookie =  (c_name + "=" + c_value2 + ";path=/;");//try to erase bctsd cookie
				}else{
					document.cookie =  (c_name + "=" + c_value2 + ";path=/;domain=."+window.location.hostname+";");//try to erase bctd cookie
				}
			}
		}
		bouncex.log = function(msg){
			if(typeof(console)=='object' && console.log){
				console.log(msg+'');
			}
		};

		function getJString(e){var t=typeof e;if(t!="object"||e===null){if(t=="string")e='"'+e+'"';return String(e)}else{var n,r,i=[],s=e&&e.constructor==Array;for(n in e){r=e[n];t=typeof r;if(t=="string")r='"'+r+'"';else if(t=="object"&&r!==null)r=getJString(r);i.push((s?"":'"'+n+'":')+String(r))}return(s?"[":"{")+String(i)+(s?"]":"}")}};

		bouncex.stringify = function(e){
			if(typeof JSON === 'undefined' || typeof JSON.stringify !== 'function'){
				return getJString(e);
			}else{
				return JSON.stringify(e);
			}
		};
		bouncex.parseJSON=function(e){if(window.JSON&&window.JSON.parse){return window.JSON.parse(e)}if(e===null){return e}if(typeof e==="string"&&e){var t=/^[\],:{}\s]*$/,n=/(?:^|:|,)(?:\s*\[)+/g,r=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,i=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g;if(t.test(e.replace(r,"@").replace(i,"]").replace(n,""))){return(new Function("return "+e))()}}};
		bouncex.calling_url = encodeURIComponent(window.location.href);
		bouncex.referrer = document.referrer ? encodeURIComponent(document.referrer.split('/')[2]) : '';
		var proto = (bouncex.website.force_https?'https:':window.location.protocol);
		bouncex.stringify_cookie = function(str){
			return bouncex.stringify(str).replace(/;/g,'\\u003b').replace(/\+/g,'\\u002b').replace(/\=/g,'\\u003d');
		}
		bouncex.au = proto + '//'+bouncex.website.bau;
		bouncex.bu = proto + '//'+bouncex.website.base_host;

		var c = (getBounceVisitCookie());
		if(c){
			bouncex.visit_cookie = bouncex.parseJSON(c);
		}
		
		if(!bouncex.visit_cookie){
			bouncex.visit_cookie = {};
			bouncex.visit_cookie.lp = bouncex.calling_url.substring(0,500).replace(/\+/g,'%2B').replace(/\%[A-F0-9]?[^A-F0-9]/,'');
			bouncex.visit_cookie.r = bouncex.referrer;
			setBounceVisitCookie();
		}else{
		}
		bouncex.cookie_domain = false;
		if(bouncex.website.uwc || bouncex.website.ct == 'multi_cookie'){
			if(bouncex.calling_url.indexOf(bouncex.website.domain)>0){
				bouncex.cookie_domain = bouncex.website.domain;
			}
		}
		
				bouncex.updateQS=function(){var e=arguments.length&1,t=e?arguments[0]:window.top.location.href,n=t.split("#"),r=n[0],i=n.length>1?n[1]:false,s=[];for(var o=e;o<arguments.length;o+=2){var u=arguments[o],a=encodeURIComponent(arguments[o+1]),f=new RegExp("([?&])"+u+"=?.*?(&|$)","gi");if(r.match(f))r=r.replace(f,"$1"+u+"="+a+"$2");else s.push(u+"="+a)}if(s.length)r+=(r.indexOf("?")==-1?"?":r.slice(-1)!="&"?"&":"")+s.join("&");return r+(i?"#"+i:"")};

		var nav = navigator.userAgent.toLowerCase();
		bouncex.browser = {};
		bouncex.browser.webkit = (/webkit/).test(nav);
		bouncex.browser.firefox = (/firefox/).test(nav);
		bouncex.browser.msie = (/trident\/7\.|msie/).test(nav);
		
	    bouncex.browser.iphone = nav.indexOf('iphone') > -1;
	    bouncex.browser.ipad = nav.indexOf('ipad') > -1;
	    bouncex.browser.ios8 = false;
	    if (bouncex.browser.iphone||bouncex.browser.ipad) {
	        bouncex.browser.ios8 = (/version\/8./).test(nav);
	    }

		bouncex.browser.safari = !!(nav.indexOf('safari') != -1 && nav.indexOf('chrome') == -1);
		if(bouncex.browser.safari&&nav.indexOf('version/')>0){
			bouncex.browser.safari = parseInt(nav.split('version/')[1].replace('.',''));
		}

		bouncex.baddjs = function(file){
			var oScript = document.createElement("script");
			oScript.setAttribute("src", file);
			oScript.setAttribute("type", "text/javascript");
			document.getElementsByTagName("head")[0].appendChild(oScript);
	 	};
		bouncex.wndsize = function(){
			var e=0;var t=0;if(!window.innerWidth){if(!(document.documentElement.clientWidth==0)){e=document.documentElement.clientWidth;t=document.documentElement.clientHeight}else{e=document.body.clientWidth;t=document.body.clientHeight}}else{e=window.innerWidth;t=window.innerHeight}return{width:e,height:t};
		};
		
		if(bouncex.website.is_preview){
			var wsize = bouncex.wndsize();
			var resolution = wsize.width+'x'+wsize.height;
			bouncex.baddjs(bouncex.au+'/bounce/initp.js?campaign_id='+bouncex.website.campaign_id+'&resolution='+resolution);

		}else{
			function areCookiesEnabled(){
				var cookieEnabled=(navigator.cookieEnabled)? true : false   
				if (typeof navigator.cookieEnabled=="undefined" && !cookieEnabled){ 
					document.cookie="testcookie";
					cookieEnabled=(document.cookie.indexOf("testcookie")!=-1)? true : false;
				}
				return cookieEnabled;
			}
			if(areCookiesEnabled()){
				var tojQ = typeof jQuery;
				var bcxReady = false;

				bouncex.bcxReady = function(f) {
					if (!bouncex._bcxReady) {
						eval('bouncex._bcxReady=function(){function i(){if(r.isReady){return}try{document.documentElement.doScroll("left")}catch(e){setTimeout(i,1);return}r.ready()}function s(t){r.bindReady();var n=r.type(t);e.done(t)}var e,t,n={};n["[object Boolean]"]="boolean";n["[object Number]"]="number";n["[object String]"]="string";n["[object Function]"]="function";n["[object Array]"]="array";n["[object Date]"]="date";n["[object RegExp]"]="regexp";n["[object Object]"]="object";var r={isReady:false,readyWait:1,holdReady:function(e){if(e){r.readyWait++}else{r.ready(true)}},ready:function(t){if(t===true&&!--r.readyWait||t!==true&&!r.isReady){if(!document.body){return setTimeout(r.ready,1)}r.isReady=true;if(t!==true&&--r.readyWait>0){return}e.resolveWith(document,[r])}},bindReady:function(){if(e){return}e=r._Deferred();if(document.readyState==="complete"){return setTimeout(r.ready,1)}if(document.addEventListener){document.addEventListener("DOMContentLoaded",t,false);window.addEventListener("load",r.ready,false)}else if(document.attachEvent){document.attachEvent("onreadystatechange",t);window.attachEvent("onload",r.ready);var n=false;try{n=window.frameElement==null}catch(s){}if(document.documentElement.doScroll&&n){i()}}},_Deferred:function(){var e=[],t,n,i,s={done:function(){if(!i){var n=arguments,o,u,a,f,l;if(t){l=t;t=0}for(o=0,u=n.length;o<u;o++){a=n[o];f=r.type(a);if(f==="array"){s.done.apply(s,a)}else if(f==="function"){e.push(a)}}if(l){s.resolveWith(l[0],l[1])}}return this},resolveWith:function(r,s){if(!i&&!t&&!n){s=s||[];n=1;try{while(e[0]){e.shift().apply(r,s)}}finally{t=[r,s];n=0}}return this},resolve:function(){s.resolveWith(this,arguments);return this},isResolved:function(){return!!(n||t)},cancel:function(){i=1;e=[];return this}};return s},type:function(e){return e==null?String(e):n[Object.prototype.toString.call(e)]||"object"}};if(document.addEventListener){t=function(){document.removeEventListener("DOMContentLoaded",t,false);r.ready()}}else if(document.attachEvent){t=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",t);r.ready()}}}return s}()');
					}
					bouncex._bcxReady(f);
					
					if(tojQ!='undefined'&&bouncex.website.waypoints&&typeof jQuery().waypoint != 'function'&&typeof jQuery().on== 'function') {
						/* jQuery Waypoints - v2.0.5 */
						(function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;e<n;e++){if(e in this&&this[e]===t)return e}return-1},e=[].slice;(function(t,e){if(typeof define==="function"&&define.amd){return define("waypoints",["jquery"],function(n){return e(n,t)})}else{return e(t.jQuery,t)}})(window,function(n,r){var i,o,l,s,f,u,c,a,h,d,p,y,v,w,g,m;i=n(r);a=t.call(r,"ontouchstart")>=0;s={horizontal:{},vertical:{}};f=1;c={};u="waypoints-context-id";p="resize.waypoints";y="scroll.waypoints";v=1;w="waypoints-waypoint-ids";g="waypoint";m="waypoints";o=function(){function t(t){var e=this;this.$element=t;this.element=t[0];this.didResize=false;this.didScroll=false;this.id="context"+f++;this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()};this.waypoints={horizontal:{},vertical:{}};this.element[u]=this.id;c[this.id]=this;t.bind(y,function(){var t;if(!(e.didScroll||a)){e.didScroll=true;t=function(){e.doScroll();return e.didScroll=false};return r.setTimeout(t,n[m].settings.scrollThrottle)}});t.bind(p,function(){var t;if(!e.didResize){e.didResize=true;t=function(){n[m]("refresh");return e.didResize=false};return r.setTimeout(t,n[m].settings.resizeThrottle)}})}t.prototype.doScroll=function(){var t,e=this;t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};if(a&&(!t.vertical.oldScroll||!t.vertical.newScroll)){n[m]("refresh")}n.each(t,function(t,r){var i,o,l;l=[];o=r.newScroll>r.oldScroll;i=o?r.forward:r.backward;n.each(e.waypoints[t],function(t,e){var n,i;if(r.oldScroll<(n=e.offset)&&n<=r.newScroll){return l.push(e)}else if(r.newScroll<(i=e.offset)&&i<=r.oldScroll){return l.push(e)}});l.sort(function(t,e){return t.offset-e.offset});if(!o){l.reverse()}return n.each(l,function(t,e){if(e.options.continuous||t===l.length-1){return e.trigger([i])}})});return this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}};t.prototype.refresh=function(){var t,e,r,i=this;r=n.isWindow(this.element);e=this.$element.offset();this.doScroll();t={horizontal:{contextOffset:r?0:e.left,contextScroll:r?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:r?0:e.top,contextScroll:r?0:this.oldScroll.y,contextDimension:r?n[m]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};return n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,r){var i,o,l,s,f;i=r.options.offset;l=r.offset;o=n.isWindow(r.element)?0:r.$element.offset()[e.offsetProp];if(n.isFunction(i)){i=i.apply(r.element)}else if(typeof i==="string"){i=parseFloat(i);if(r.options.offset.indexOf("%")>-1){i=Math.ceil(e.contextDimension*i/100)}}r.offset=o-e.contextOffset+e.contextScroll-i;if(r.options.onlyOnScroll&&l!=null||!r.enabled){return}if(l!==null&&l<(s=e.oldScroll)&&s<=r.offset){return r.trigger([e.backward])}else if(l!==null&&l>(f=e.oldScroll)&&f>=r.offset){return r.trigger([e.forward])}else if(l===null&&e.oldScroll>=r.offset){return r.trigger([e.forward])}})})};t.prototype.checkEmpty=function(){if(n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)){this.$element.unbind([p,y].join(" "));return delete c[this.id]}};return t}();l=function(){function t(t,e,r){var i,o;if(r.offset==="bottom-in-view"){r.offset=function(){var t;t=n[m]("viewportHeight");if(!n.isWindow(e.element)){t=e.$element.height()}return t-n(this).outerHeight()}}this.$element=t;this.element=t[0];this.axis=r.horizontal?"horizontal":"vertical";this.callback=r.handler;this.context=e;this.enabled=r.enabled;this.id="waypoints"+v++;this.offset=null;this.options=r;e.waypoints[this.axis][this.id]=this;s[this.axis][this.id]=this;i=(o=this.element[w])!=null?o:[];i.push(this.id);this.element[w]=i}t.prototype.trigger=function(t){if(!this.enabled){return}if(this.callback!=null){this.callback.apply(this.element,t)}if(this.options.triggerOnce){return this.destroy()}};t.prototype.disable=function(){return this.enabled=false};t.prototype.enable=function(){this.context.refresh();return this.enabled=true};t.prototype.destroy=function(){delete s[this.axis][this.id];delete this.context.waypoints[this.axis][this.id];return this.context.checkEmpty()};t.getWaypointsByElement=function(t){var e,r;r=t[w];if(!r){return[]}e=n.extend({},s.horizontal,s.vertical);return n.map(r,function(t){return e[t]})};return t}();d={init:function(t,e){var r;e=n.extend({},n.fn[g].defaults,e);if((r=e.handler)==null){e.handler=t}this.each(function(){var t,r,i,s;t=n(this);i=(s=e.context)!=null?s:n.fn[g].defaults.context;if(!n.isWindow(i)){i=t.closest(i)}i=n(i);r=c[i[0][u]];if(!r){r=new o(i)}return new l(t,r,e)});n[m]("refresh");return this},disable:function(){return d._invoke.call(this,"disable")},enable:function(){return d._invoke.call(this,"enable")},destroy:function(){return d._invoke.call(this,"destroy")},prev:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e>0){return t.push(n[e-1])}})},next:function(t,e){return d._traverse.call(this,t,e,function(t,e,n){if(e<n.length-1){return t.push(n[e+1])}})},_traverse:function(t,e,i){var o,l;if(t==null){t="vertical"}if(e==null){e=r}l=h.aggregate(e);o=[];this.each(function(){var e;e=n.inArray(this,l[t]);return i(o,e,l[t])});return this.pushStack(o)},_invoke:function(t){this.each(function(){var e;e=l.getWaypointsByElement(this);return n.each(e,function(e,n){n[t]();return true})});return this}};n.fn[g]=function(){var t,r;r=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(d[r]){return d[r].apply(this,t)}else if(n.isFunction(r)){return d.init.apply(this,arguments)}else if(n.isPlainObject(r)){return d.init.apply(this,[null,r])}else if(!r){return n.error("jQuery Waypoints needs a callback function or handler option.")}else{return n.error("The "+r+" method does not exist in jQuery Waypoints.")}};n.fn[g].defaults={context:r,continuous:true,enabled:true,horizontal:false,offset:0,triggerOnce:false};h={refresh:function(){return n.each(c,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return(t=r.innerHeight)!=null?t:i.height()},aggregate:function(t){var e,r,i;e=s;if(t){e=(i=c[n(t)[0][u]])!=null?i.waypoints:void 0}if(!e){return[]}r={horizontal:[],vertical:[]};n.each(r,function(t,i){n.each(e[t],function(t,e){return i.push(e)});i.sort(function(t,e){return t.offset-e.offset});r[t]=n.map(i,function(t){return t.element});return r[t]=n.unique(r[t])});return r},above:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){if(t==null){t=r}return h._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){if(t==null){t=r}return h._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return h._invoke("enable")},disable:function(){return h._invoke("disable")},destroy:function(){return h._invoke("destroy")},extendFn:function(t,e){return d[t]=e},_invoke:function(t){var e;e=n.extend({},s.vertical,s.horizontal);return n.each(e,function(e,n){n[t]();return true})},_filter:function(t,e,r){var i,o;i=c[n(t)[0][u]];if(!i){return[]}o=[];n.each(i.waypoints[e],function(t,e){if(r(i,e)){return o.push(e)}});o.sort(function(t,e){return t.offset-e.offset});return n.map(o,function(t){return t.element})}};n[m]=function(){var t,n;n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[];if(h[n]){return h[n].apply(null,t)}else{return h.aggregate.call(null,n)}};n[m].settings={resizeThrottle:100,scrollThrottle:30};return i.on("load.waypoints",function(){return n[m]("refresh")})})}).call(this);
						/* Sticky Elements for Waypoints */
						(function(){(function(t,n){if(typeof define==="function"&&define.amd){return define(["jquery","waypoints"],n)}else{return n(t.jQuery)}})(window,function(t){var n,i;n={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"};i=function(t,n){var i;t.wrap(n.wrapper);i=t.parent();return i.data("isWaypointStickyWrapper",true)};t.waypoints("extendFn","sticky",function(r){var e,a,s;a=t.extend({},t.fn.waypoint.defaults,n,r);e=i(this,a);s=a.handler;a.handler=function(n){var i,r;i=t(this).children(":first");r=a.direction.indexOf(n)!==-1;i.toggleClass(a.stuckClass,r);e.height(r?i.outerHeight():"");if(s!=null){return s.call(this,n)}};e.waypoint(a);return this.data("stuckClass",a.stuckClass)});return t.waypoints("extendFn","unsticky",function(){var t;t=this.parent();if(!t.data("isWaypointStickyWrapper")){return this}t.waypoint("destroy");this.unwrap();return this.removeClass(this.data("stuckClass"))})})}).call(this);
						/* Infinite Scroll for Waypoints */
						(function(){(function(n,e){if(typeof define==="function"&&define.amd){return define(["jquery","waypoints"],e)}else{return e(n.jQuery)}})(window,function(n){var e;e={container:"auto",items:".infinite-item",more:".infinite-more-link",offset:"bottom-in-view",loadingClass:"infinite-loading",onBeforePageLoad:n.noop,onAfterPageLoad:n.noop};return n.waypoints("extendFn","infinite",function(t){var i,o;o=n.extend({},n.fn.waypoint.defaults,e,t);if(n(o.more).length===0){return this}i=o.container==="auto"?this:n(o.container);o.handler=function(e){var t;if(e==="down"||e==="right"){t=n(this);o.onBeforePageLoad();t.waypoint("destroy");i.addClass(o.loadingClass);return n.get(n(o.more).attr("href"),function(e){var r,a,f,s;r=n(n.parseHTML(e));a=n(o.more);f=r.find(o.more);i.append(r.find(o.items));i.removeClass(o.loadingClass);if(f.length){a.replaceWith(f);s=function(){return t.waypoint(o)};setTimeout(s,0)}else{a.remove()}return o.onAfterPageLoad()})}};return this.waypoint(o)})})}).call(this);
					}
					
				};
				if(bouncex.website.sd>-1 && (bouncex.website.vars || bouncex.website.acts)){
					bcxReady=true;	
				}


				function validv(v) {
					return ((typeof(v)=='number'&&!isNaN(v))||typeof(v)=='string'||typeof(v)=='boolean');
				}

				function maked(exp) {
					var v=null;
					try { v=eval(decodeURI(exp)); } catch(e){bouncex.log('bad maked ' + exp);}
					return validv(v)?v:0;
				}

				function makeq(exp) {
					var f=function() {return null;}
					var str = 'f = (function(){return ' + exp + '});';
					try {eval(decodeURI(str));} catch(e){bouncex.log('bad makef ' + exp);}
					return f;
				}

				var evalv = function(n) {
					var r={s:true,c:false,v:bouncex.vard[n].d}; 					var nv=r.v;
					try { nv=bouncex.vard[n].q(); }
					catch(e) { r.s=false; }
					if (!validv(nv)) { r.s=false; }
					if (r.s) { 
						r.v = nv;
						r.c = r.v!=bouncex.vars[n];
					}
					return r;
				}
				var enablePersist = false;
				var enablePolling = false;
				var init_vars = function() {

										var cookie = getBounceCookie();
					if(cookie){
						bouncex.cookie = bouncex.parseJSON(cookie);
					}else{
						bouncex.cookie = {};
					}
					
										bouncex.vard = {};
					bouncex.vars = {};
					bouncex.varp = {max:0,c:0,timer:null,vn:[],suc:{},def:{}};
					
					
					if(bouncex.website.vars){
						
						for(var name in bouncex.website.vars) {
							var def = bouncex.website.vars[name]['default'] ? bouncex.website.vars[name]['default'] : 0;
							var v = bouncex.website.vars[name]['val'] ? bouncex.website.vars[name]['val'] : 0;
							var poll = (bouncex.website.vars[name]['polling']!='none');
							var reload = (bouncex.website.vars[name]['polling']=='all');
							var enablePolling= enablePolling|| poll;
							var persist = bouncex.website.vars[name]['persist'] && (bouncex.website.vars[name]['persist']=='permanent'||bouncex.website.vars[name]['persist']=='visit');
					
							//no persisting yet
							enablePersist = enablePersist||persist;
							var n =  encodeURI(name.toLowerCase());
							bouncex.vard[n] = { d: maked(encodeURI(def)), q: makeq(encodeURI(v.toString().replace("\n",' '))),m:bouncex.website.vars[name]['polling'],p:(persist? true : false) };
							initv(n);	
							if(poll){
								bouncex.varp.vn.push(n);
							}
						}
						if(enablePolling){
							function checkPolling(){
								if (bouncex.varp.c >= bouncex.varp.max) {
									clearInterval(bouncex.varp.timer);
									return;
								}
								var c=false;
								var rl=false;
								for(var i = 0; i < bouncex.varp.vn.length; i++) {
									var n = bouncex.varp.vn[i];
									var r=evalv(n);
									if (r.c && r.s) { 										c = true;
										setv(n, r.v);
										if (bouncex.vard[n].m=="all"){
											rl = true;
										}
									}
								}
								if (rl) {
									bouncex.varp.c++;
									bouncex.unload_campaigns();
									bouncex.baddjs(bouncex.make_include_string('reloadCampaigns'));
								}
							}
					
							var polling_interval = (bouncex.website.pi && bouncex.website.pi>=bouncex.website.PMI) ? parseInt(bouncex.website.pi) : bouncex.website.PDI;
							bouncex.varp.max = bouncex.website.PMR;
							bouncex.varp.timer = setInterval(checkPolling,polling_interval);	
						}
					}
					
				}

				var formatv = bouncex.formatv = function(nv) {
					if (nv==='true'){return true;}
					else if (nv==='false'){return false;}
					else if (typeof nv==='string' && nv.match(/^[0-9]+$/)){return parseInt(nv);}
					else if (typeof nv==='string' && nv.match(/^[0-9]+\.[0-9]+$/)){return parseFloat(nv);}
					return nv;
				}

				var getpv = function(n) { 					return (bouncex.cookie.v && bouncex.cookie.v[n]) 						? formatv(bouncex.cookie.v[n])
						: bouncex.vard[n].d;
				}

				var initv = function(n) {
					if(enablePersist){
						if (bouncex.vard[n].p) {
							var v = bouncex.vars[n] = getpv(n);
							var r = evalv(n);
							if (r.s) { 
								v = r.v; 
								bouncex.varp.suc[n] = true;
							} else {
								bouncex.varp.def[n] = bouncex.vard[n].d;
							}
							setv(n, v);
						} else {
							setv(n, evalv(n).v);
						}
					} else {
						setv(n, evalv(n).v);
					}
				}

				var setv = bouncex.setv = function(n,v) {
					bouncex.vars[n] = v;
					if (enablePersist) {
						if (bouncex.vard[n].p) {
							bouncex.cookie.v = bouncex.cookie.v || {};
							bouncex.cookie.v[n] = v;
						}
					}
				}

				


			
				bouncex.make_include_string = function(type){
					var bcx_persist = '';
					if(!type){
						type = 'init1';

						if (enablePersist && !bouncex.website.tpc) {
							var cookie = bouncex.stringify(bouncex.cookie);
							for(var n in bouncex.varp.suc){
								bcx_persist += '&vsuc['+n+']=true';
							}
							for(var n in bouncex.varp.def){
								bcx_persist += '&vdef['+n+']='+escape(bouncex.varp.def[n]).replace(/\+/g,'%2B');
							}
						}else{
							var cookie = getBounceCookie();
						}
					}else{
						var cookie = bouncex.stringify(bouncex.cookie);
						type = 'reloadCampaigns';
					}
					var visit_cookie = bouncex.stringify(bouncex.visit_cookie);
					clearBounceCookie();
					bcx_vars = '';
					var currval = null;
					for(var n in bouncex.vars) {
						var v = bouncex.vars[n];
						bcx_vars += '&vars['+n+']='+escape(v);
					}
					var tzo = new Date().getTimezoneOffset();
					var wsize = bouncex.wndsize();
					var resolution = wsize.width+'x'+wsize.height;
					
					var bcx_str = bouncex.au+'/bounce/'+type+'.js?tojQ='+tojQ+'&tzo='+tzo+'&is_preview='+(bouncex.website.is_preview?'true':'false')+'&website_id='+bouncex.website.id+'&resolution='+resolution+'&referrer='+bouncex.referrer+'&calling_url='+bouncex.calling_url+'&visit_cookie='+escape(visit_cookie)+'&cookie='+escape(cookie)+bcx_vars.replace(/\+/g,'%2B')+bcx_persist;
					return bcx_str;
				}
			

				var bcx_str;
				if(bcxReady){
					bouncex.bcxReady(function(){
						init_vars();
						bcx_str = bouncex.make_include_string();
						bouncex.baddjs(bcx_str);
					});
				}else{
					init_vars();
					bcx_str = bouncex.make_include_string();
					bouncex.baddjs(bcx_str);
				}
			}else{
				bouncex.log('cookies disabled');
			}
		
		

		}
		
	};


	if(bouncex.website.sd){
		setTimeout(bcx_init, bouncex.website.sd);
	}else{
		bcx_init();
	}

} 




//<script> 
var flash_objects = {};
(function(){
	bouncex.init_lightbox = function(){
		bouncex.css_added=true;
		addStyle(bouncex.bu+'/assets/bounce/bounce.css?v40');
	}

	var validate_coupons_seen_count = 0;
	var bxBind =  function(obj,type,fn){
		
		var obj = jQuery(obj);
		//bouncex.log(obj);
		bouncex.events[type] = obj;
		obj.bind(type,fn);
	}	
	var addEvent = function( obj, type, fn ) {
        if (obj.addEventListener)
                obj.addEventListener(type, fn, false);
        else if (obj.attachEvent) 
                obj.attachEvent('on' + type, function(){ fn.apply(obj, new Array(window.event)); });
	}
	var removeEvent = function( obj, type, fn ) {
        if (obj.removeEventListener)
                obj.removeEventListener(type, fn, false);
        else if (obj.attachEvent) 
                obj.detachEvent('on' + type, function() { return fn.apply(obj, new Array(window.event));});
	}
	var XD = function(){
		return {
			postMessage	:	function(message,tar) {
				var frame = jQuery('iframe',jQuery(tar));
				if(!frame.length)
					return;
				var f = frame.get(0).contentWindow;
				var target_url = frame.attr('src');
				if (!target_url) {
					return;
				}
				window.setTimeout(function() {
					f['postMessage'](message, target_url);
				}, 0);
			},
			receiveMessage : function(callback) {
				if (window['addEventListener']) {
					window['addEventListener']('message', callback, false);
				} else {
					window['attachEvent']('onmessage', callback);
				}
			}
		};
	}();
	
	function init_helpers(ca_id){
		bxBind(window,'keydown.bouncex_keycodes_'+ca_id,function(event) {
		  if (event.ctrlKey && (event.keyCode==87 || event.keyCode == 115)) {
			event.preventDefault();
			event.keyCode=0
				show_ad(ca_id);
			 return false;
		   }else if(event.keyCode==27){
				close_ad(ca_id); 
		   }
		});
	}
	function hide_flash(){
		flash_objects = jQuery('object,embed');
		flash_objects.css('visibility','hidden');
	}
	function calc_delay_cvt(delay_time){
		var delay = (bouncex.cookie.cvt-getTime2()+delay_time)*1000;
		return delay<0?0:delay;
	}
	function init_activation_funcs(){
		if(!bouncex.listening){
			listenMessages();
		}
		for(var ca_id in bouncex.campaigns) {
			if(can_show_ad(ca_id,true)&&!bouncex.campaigns[ca_id].ad_visible){
				(function(ca_id){
					var delay = 0;
					if(bouncex.campaigns[ca_id].activation_delay){
						delay = calc_delay_cvt(bouncex.campaigns[ca_id].activation_delay);
					}
					bouncex.events['timeout_activation_'+ca_id] = setTimeout(function(){
						
						init_activation(ca_id);
					},delay);
				})(ca_id);
			}
		}
	}
	bouncex.fs = function(){
		if(!bouncex.browser.msie){
			return true;
		}
		if(typeof(bouncex.fixed_supported)=='undefined'){
			bouncex.fixed_supported = isFixedSupported();
		}
		
		return bouncex.fixed_supported;
	}
	function isFixedSupported(){var e=document.body;if(document.createElement&&e&&e.appendChild&&e.removeChild){var t=document.createElement("div");if(!t.getBoundingClientRect)return null;t.innerHTML="x";t.style.cssText="position:fixed;top:100px;";e.appendChild(t);var n=e.style.height,r=e.scrollTop;e.style.height="3000px";e.scrollTop=500;var i=t.getBoundingClientRect().top;e.style.height=n;var s=i===100;e.removeChild(t);e.scrollTop=r;return s}return null}

	bouncex.by_parent_id = function(pid){ return by_parent_id(pid); }
	bouncex.show_ad = function(ca_id){
		show_ad('manual',ca_id);
	}
	bouncex.align_callout = function (ca_id) {
		bouncex.campaigns[ca_id].c_button  = jQuery(bouncex.campaigns[ca_id].callout_t+':first');
		var callout = jQuery('#campaign_'+ca_id+'_container_callout');
		align_callout(callout, ca_id);
	}
	bouncex.unload_campaigns = function(){
		
		for(var e in bouncex.events) {
			if(typeof(bouncex.events[e])=='object'){
				jQuery(bouncex.events[e]).unbind(e);
			}else{
				clearTimeout(bouncex.events[e]);
			}
			delete bouncex.events[e];
		}
		
	}	
	bouncex.reload_campaigns = function() {
		if(bouncex.website.tpc==0){
			var bcxc = getBounceCookie();	
			if(bcxc){
				bouncex.cookie = bouncex.parseJSON((bcxc));
			}
		}
		bouncex.baddjs(bouncex.make_include_string('reloadCampaigns'));		
	}
	bouncex.activate_action = function(act){
		bouncex.cookie['a_'+act] = 1;
		setBounceCookie();
		bouncex.unload_campaigns();
		bouncex.baddjs(bouncex.make_include_string('reloadCampaigns'));
	}
	function init_custom_actions(){
		if(bouncex.website.acts && bouncex.website.acts.length==undefined){
			for(var act_name in bouncex.website.acts){
				if(bouncex.website.acts[act_name]['val']){
					var act_el = jQuery(bouncex.website.acts[act_name]['val']);
					if(act_el.length){
						(function(name,el){
							try{
								el.bind(bouncex.website.acts[name]['action']+'.bx_act',function(){
									if (!bouncex.website.acts[name]['js_only']) {
										bouncex.activate_action(name);
									}
									if(!bouncex.website.acts[name]['activations']||bouncex.website.acts[name]['activations']=='once'){
										jQuery(bouncex.website.acts[name]['val']).unbind(bouncex.website.acts[name]['action']+'.bx_act');
									}
									if(bouncex.website.acts[name]['callback']){
										eval(bouncex.website.acts[name]['callback']);
									}
								});
							}catch(err){
								bouncex.log(err);
							}
						})(act_name,act_el);
					}
				}
			}
		}
	}	
	function init_activation(ca_id){
		if(bouncex.campaigns[ca_id].html){
			bouncex.campaigns[ca_id].failed = false;
			bouncex.body.append(bouncex.campaigns[ca_id].html);
		}else{
			bouncex.activate_campaign(ca_id);
		}
		event_js_eval(ca_id,'activation');
	}
	function listenMessages(){
		bouncex.listening=true;
		XD.receiveMessage(function(message){
			var message_str = message.data;
			if(!message_str||((typeof message_str)!=='string')||message_str.indexOf('bcx_message')!==0)
				return false;//not bcx message;
			var messages = message_str.split('&');
			var result = [];
			for (var i = 0; i < messages.length; i++){
				var r = messages[i].split('=');
				result[r[0]] = decodeURIComponent(r[1].replace(/\+/g, ' '));
			}
			var mca_id = result['campaign_id'];
			var message = result['message'];
			if(!parseInt(mca_id) || !bouncex.campaigns[mca_id])
				return;
			if(bouncex.cookie.d!=='d'){
				if(message=='move_step'||message=='had_error'){
					jQuery(window).trigger('scroll');//fix ios hide keyboard issue
				}
			}
			if(message == 'failed'){
				bouncex.campaigns[mca_id].failed = true;
				if(bouncex.campaigns[mca_id].ad_visible){
					bouncex.close_ad(mca_id);
				}
				return false;
			}else if(message == 'loaded'){
				bouncex.activate_campaign(mca_id);
			}else if(message == 'ibx_input') {
				if(bouncex.website.ibx.te && bouncex.website.ibx.te==1 && bouncex.website.ibx.mibcx==1) {
					bouncex.ibx.user(result['check'],{__src:"bouncex overlay",campaign:mca_id});
				}
            }else if (message=='eval'){
                try{
                    eval(result.js);
                }catch(e){bouncex.log(e)}
			}else if(bouncex.campaigns[mca_id].ad_visible){
				if(message == 'report_coupon') {
					if(validate_coupons_seen_count > 0) return;
					validate_coupons_seen_count++;
					var cpn = result['code'];
					if(!cpn) {
						return;
					}
										if(typeof(bouncex.cookie.cpn)=='string' && bouncex.cookie.cpn==cpn) {
						return;
					}
										report(mca_id,'coupon_'+cpn);
				}else if(message == 'cpn_') {
										var cpn = message.substr(5);
					if(cpn != '') {
						// trim string and remove potentially unsafe cookie chars
						bouncex.cookie.cpn = cpn[1].replace(/^\s+|\s+$|[^A-Z0-9\.-_\=\+\*\$\%\@]/ig,'');
						setBounceCookie();
					}
													}else if(message == 'bcx_ca_email'){
					if(typeof(_veroq)=='object' && typeof(result['email'])!='undefined') {
						_veroq.push(['user', {id: result['email'], email: result['email']}]);
						_veroq.push(['track', 'Entered email overlay2']);
						/*console.log('rpt');*/
					}
				}else if(message == 'bcx_close_ad'){
					close_ad(mca_id);
				}else if(message == 'bcx_close_ad_silent'){
					close_ad(mca_id,false,true);
				}else if(message == 'bcx_form_subitted'){
					bouncex.campaigns[mca_id].submitted = true;
					bouncex.cookie.es = true; //email submitted
					bouncex.cookie.campaigns[mca_id].ls = getTime2();//lasdt submitted
					setBounceCookie();
					event_js_eval(mca_id,'submission',result);
					if(typeof(bouncex.onformsubmit)=='function'){
						bouncex.onformsubmit(result['email']);
					}
					post_submit_redirect(mca_id);
				}else if(message == 'report_click'){
					report(mca_id,'clicks');
				}else if(message == 'had_error'){
					if(bouncex.browser.ios8){
						jQuery(window).scrollTop(0)
					}
				}else if(message =='reset_fsa'){
					bouncex.cookie.campaigns[mca_id].fsa = result['fsa'];
					setBounceCookie();
				}else if(message == 'move_step'){
					jQuery('#bcx_onsite_els_'+mca_id+'_s'+result['to_step']).show();
					jQuery('#bcx_onsite_els_'+mca_id+'_s'+result['cur_step']).hide();
					if(bouncex.campaigns[mca_id].show_close_step){
						show_close(mca_id,true);
					}
				}else if(message == 'update_title'){
					var old_title, seconds_left, str;
					seconds_left = result['seconds_left'];
                    var update_time = result['update_time'];
                    if(!update_time){
                        bouncex.old_title = window.document.title;
                    }
					//if (bouncex.timer_exists) return false;
					if (result['remove_timer'] == '1'){
						bouncex.remove_timer = true;
					} else {
						bouncex.remove_timer = false;
					}

					bouncex.timer_exists = true;
                    if (seconds_left <= 0){
                        window.document.title = bouncex.old_title;
                        bouncex.timer_exists = false;
                    }

                    seconds = seconds_left % 60;
                    minutes = Math.floor(seconds_left/60) % 60;
                    hours =  ((result['format'].indexOf('{days}') > -1) || (result['format'].indexOf('{0days}') > -1)) ? (Math.floor(seconds_left/3600) % 24) : Math.floor(seconds_left/3600);
                    days = (result['format'] == '{days}'||result['format']=='{0days}' ? Math.ceil(seconds_left/86400) : Math.floor(seconds_left/86400));

                    if (minutes < 10) { minutes = "0" + minutes };
                    if (seconds < 10) { seconds = "0" + seconds };
                    if (hours < 10) { hours = "0" + hours };
                    if((result['format'].indexOf('{0days}') > -1) && days<10){
                        days = '0'+days;
                    }
                    str = result['format'].replace('{hours}',hours).replace('{minutes}',minutes).replace('{seconds}',seconds).replace('{days}',days).replace('{0days}',days);

                    if (!bouncex.old_title && bouncex.timer_exists) {
                        window.document.title = str;
                    }
                    else if (bouncex.old_title && bouncex.timer_exists) {
                        window.document.title = str + ' | ' + bouncex.old_title;
                    }
				}
			}
		});
	}

	bouncex.activate_campaign=function(c){if(bouncex.campaigns[c].activated)return!1;bouncex.campaigns[c].activated=!0;for(var d in bouncex.campaigns[c].activations)if(bouncex.campaigns[c].activations.hasOwnProperty(d)){var b=bouncex.campaigns[c].activations[d];if(b.activation)bouncex.ca[b.activation](b.prop,b.val,c)}report(c,"views")};
	function activation_funcs(){var c=[];c.manual=function(d,b,a){};c.control=function(d,b,a){show_ad("control",a)};c.inter=function(d,b,a){bouncex.cookie.vpv>=d&&show_ad("inter",a)};c.bounce=function(d,b,a){bxBind("html,body","mouseout.bouncex_show_"+a,function(b){process_mouse_out(b,a)});(bouncex.browser.msie||bouncex.browser.safari&&50>=bouncex.browser.safari)&&bxBind("html,body","mousemove.bouncex_show_"+a,function(b){process_mouse_move(b,a)});init_helpers(a)};c.timer=function(d,b,a){bouncex.events["timeout_timer"+
	a]=setTimeout(function(){show_ad("timer",a)},1E3*parseInt(b))};c.back=function(d,b,a){b=!1;"landing_page"==d?bouncex.state.iol&&(b=!0):b=!0;b&&(history.pushState?(history.state&&history.state.bx_rewind||history.pushState({bx_rewind:"bx_rewind1"},"",""),bouncex.original_hash=window.location.hash,bxBind(jQuery(window),"popstate.bcx_popstate_"+a,function(b,c,f){history.state||"landing_page"==d&&bouncex.browser.safari&&history.state&&history.state.bx_rewind||bouncex.original_hash!==window.location.hash||
	history.state&&history.state.bx_rewind||"popstate"!=b.type||(show_ad("back",a),can_show_ad(a,!0)||jQuery(window).unbind("popstate.bcx_popstate_"+a))})):("."!=window.location.hash.replace("#","")&&(window.location.hash="."),bouncex_events["timeout_rewind_"+a]=setTimeout(function(){bxBind(jQuery(window),"hashchange.hash_"+a,function(b,d,c){show_ad("back",a);can_show_ad(a,!0)||jQuery(window).unbind("hashchange.hash_"+a)})},50)))};c.pers=function(d,b,a){b=!1;bouncex.campaigns[a].is_pers=!0;"landing_page"==
	d&&bouncex.state.iol?b=!0:"landing_page"!=d&&(b=!0);b&&show_ad("pers",a)};c.worm=function(d,b,a){noteCookieAdShown(a,!0);teleport("_self",b)};c.inactivity=function(d,b,a){var c="mousemove.bouncex_inactivity_"+a+" keydown.bouncex_inactivity_"+a+" DOMMouseScroll.bouncex_inactivity_"+a+" mousewheel.bouncex_inactivity_"+a+" mousedown.bouncex_inactivity_"+a+" touchstart.bouncex_inactivity_"+a+" touchmove.bouncex_inactivity_"+a;bxBind(bouncex.body,c,function(){clearTimeout(bouncex.events["inactivity"+a]);
	bouncex.events["inactivity"+a]=setInactivityTimeout(a,b,c)});bouncex.events["inactivity"+a]=setInactivityTimeout(a,b,c)};c.scroll=function(c,b,a){bouncex.oldSy=100;bxBind(window,"scroll.bouncex_"+a,function(){var c=jQuery(this),d=bouncex.wndsize(),c=(c=c.scrollTop())?c:document.body.scrollTop,d=(c+d.height)/jQuery(document).height()*100;100<parseInt(d)+parseInt(b)&&d>bouncex.oldSy&&!bouncex.campaigns[a].ad_shown&&(show_ad("scroll",a),can_show_ad(a,!0)||jQuery(window).unbind("scroll.bouncex_"+a));
	bouncex.oldSy=d})};c.mclick=function(c,b,a){if("left"==c&&"teleport"==bouncex.campaigns[a].overlay&&"_self"!==bouncex.campaigns[a].overlay_teleport_type){var e=function(){show_ad("mclick",a)};addEvent(window.document,"click",e)}else e=function(b){var f=b.keyCode||b.which||b.button;b.button&&2==b.button&&(f=3);("left"==c&&1==f||"any"==c)&&show_ad("mclick",a);("right"==c&&3==f||"any"==c)&&show_ad("mclick",a);can_show_ad(a,!0)||removeEvent(window.document,"mousedown",e)},addEvent(window.document,"mousedown",
	e)};return c};
		bouncex.init = function(){
		bouncex.direction = 'up';
		bouncex.events = {};
		bouncex.body = jQuery('body').eq(0);
		if(!bouncex.body || !bouncex.body.length){
			bouncex.events['timeout_body'] = setTimeout(function(){
				bouncex.init();
			},3000);
			return false;
		}

		bouncex.overlay_visible = false;
		bouncex.server_client_time_diff = bouncex.state.tn - parseInt(new Date().getTime()/1000);
		if (bouncex.cookie.as > 0 && window.document.title.length == 0){
			/* this is a fix for a browser rewind issue, where old timer value remained cached in browser title after timer was no longer active*/
 			window.document.title = window.location.hostname;
		}

		if (bouncex.cookie.v) {
			for(var n in bouncex.cookie.v) {
				if (bouncex.vard && bouncex.vard[n]) {
					if (bouncex.vard[n].p) {
						bouncex.setv(n, bouncex.formatv(bouncex.cookie.v[n]));
					}
				}
			}
		}
		
		bouncex.setBounceCookie = function(){
			setBounceCookie();
		};
		bouncex.initActivationFuncs = function(){
			init_activation_funcs();
		};
		bouncex.contains = jQuery.contains&&(jQuery().jquery.indexOf('1.4.')==-1&&!(jQuery().jquery.indexOf('1.8.')>-1))?jQuery.contains:eval('document.contains||document.compareDocumentPosition?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16))}:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true}}}return false};');

		bouncex.pa = 0;
		bouncex.timespaced = false;
		bouncex.close_ad = function(ca_id){ close_ad(ca_id);};
		bouncex.destroy_ad = function(ca_id){ destroy_ad(ca_id);};
		bouncex.report = function(ca_id,type){return report(ca_id,type)};
		bouncex.report_submit = function(ca_id,obj,complete) {return report_submit(ca_id,obj,complete)};
		bouncex.setBounceCookie();
		bouncex.ca = activation_funcs();
		bouncex.report_ga = function(action,label,bypass){report_ga(action,label,bypass)};
		
		bouncex.body_margin = parseInt(bouncex.body.css('margin-top'))||0;
		bouncex.report_conversion = function(obj){report_conversion(obj);};

						bouncex.ibx={wsid:bouncex.website.id,_event_store:[],_item_store:[],vid:bouncex.cookie.vid,uid:null,bxl:null,crt:null,token:null,mode:1,cvar:{},_init:function(){this.uid=this._get("user"),this.mode=this._get("mode"),this._renew_token(),this.bxl=this._get("bx_lookup"),this.crt=this._get("cart"),this._cart("set"),this._clkthrough(),this._log("initialized"),this._log("mode: "+this.mode+" | token: "+this.token)},user:function(e,t){if(!this._validate(e))return void this._log("invalid email");this.set("user",1);var i=this._cart("get");if(i&&(t=t||{},t.__cart=i),this._push("user",{key:e,val:t}),bouncex.website.ese){var o={};for(var s in t)t.hasOwnProperty(s)&&(o["user:"+s]=t[s]);o["user:email"]=e,event_stream_report("user",o)}},track:function(e,t,i,o){if(!e||!t)return void this._log("type and key must be set");if(this["_"+e+"_store"]&&this["_"+e+"_store"].push({key:JSON.stringify(i)}),o||(o=""),this._push(e,{key:t,val:i,segment:o}),bouncex.website.ese){var s={},r=t;"item"==e&&(r="item",s["item:segment"]=o,s["item:key"]=t,s.stringvalue=t),"cart"==e&&(r="cart");for(var n in i)i.hasOwnProperty(n)&&(s[r+":"+n]=i[n]);i&&i.stringvalue&&(s.stringvalue=i.stringvalue),event_stream_report(r,s)}},conv_params:function(){var e=this._auto_add({ibx_token:this._get("token"),ibx_mode:this._get("mode"),ibx_clicks:this._get("clickstr")});return e.ibx_clicks&&(this._cookies.create("__ibxc0",e.ibx_clicks),this._cookies.destroy("__ibxc")),this._log("conv_params: "+(e.ibx_clicks?e.ibx_clicks:"[none]")),this._qs(e)},set:function(e,t){switch(e){case"token":this.token=t,bouncex.cookie.ibxt=encodeURIComponent(t),setBounceCookie(),this._cookies.destroy("__ibxt");break;case"user":this.uid=t,this._cookies.create("__ibxu",t);break;case"mode":(0==t||1==t)&&(this.mode=t,this._cookies.create("__ibxm",t));break;case"bx_lookup":this.bxl=t,this._cookies.create("__ibxl",t);break;case"cart":this.crt=t,this._cookies.create("__ibxcr",t,.5)}return t},dump:function(e){this._log(e+" = "+this._get(e))},_get:function(e){var t;switch(e){case"events":t=this._event_store;break;case"items":t=this._item_store;break;case"token":t=bouncex.cookie.ibxt?decodeURIComponent(bouncex.cookie.ibxt):this._cookies.read("__ibxt");break;case"user":t=parseInt(this._cookies.read("__ibxu")),isNaN(t)&&(t=0);break;case"mode":t="0"===this._cookies.read("__ibxm")?0:1;break;case"clickstr":t=this._cookies.read("__ibxc");break;case"clicks":t=(t=this._cookies.read("__ibxc"))?t.split(","):[];break;case"bx_lookup":t=parseInt(this._cookies.read("__ibxl")),isNaN(t)&&(t=0);break;case"cart":t=parseInt(this._cookies.read("__ibxcr")),isNaN(t)&&(t=0);break;default:t="invalid"}return t},_push:function(e,t){var i,o="type="+e+"&wsid="+this.wsid+"&gcr="+bouncex.cookie.gcr+"&vid="+this.vid+"&mode="+(isNaN(this.mode)?1:parseInt(this.mode));try{mode=parseInt(this.mode)}catch(s){mode=1}o+="&uid=",this._renew_token(),o+="&token="+encodeURIComponent(this.token),t.val=JSON.stringify(this._auto_add(t.val||{})),o=o+"&"+this._qs(t),i="undefined"!=typeof t.key?": "+t.key:"",this._log(e.toUpperCase()+i+" // "+o),jQuery('<img src="'+bouncex.au+"/ibx/ping?"+o+'"/>')},_auto_add:function(e){return e=e||{},e.hasOwnProperty("__url")||(e.__url=location.href),e.hasOwnProperty("__referrer")||(e.__referrer=document.referrer),e},_renew_token:function(){var e=this._get("token");return e&&""!=e||(e=btoa(this.vid)),this.set("token",e),e},_bx_lookup:function(){if(!this.bxl){if(bouncex.cookie.es&&bouncex.cookie.campaigns&&!bouncex.ibx.uid){var e=bouncex.cookie.campaigns,t=null;for(var i in e)e.hasOwnProperty(i)&&e[i].ls&&e[i].lavid&&(t=e[i].lavid);if(t){var o={vid:t,__src:"bx_lookup"},s=this._cart("get");s&&(o.__cart=s),this._push("bx_lookup",{key:t,val:o})}}this.set("bx_lookup",1)}},_cart:function(action){var cart=!1;switch(action){case"get":try{cart=eval(bouncex.website.ibx.cart_rep.get)}catch(e){cart=!1,this._log(e)}break;case"set":if(this.crt||-1==location.href.indexOf("ibx_cart"))return!1;cart=this._getparam("ibx_cart"),cart&&(eval(bouncex.website.ibx.cart_rep.set),this.set("cart",1)),cart=this.crt}return cart},_clkthrough:function(){var e,t=this._getparam("ibx_source");if(t)try{if(e=this._get("clickstr")){if(-1!=e.indexOf(t))return void this._log("click-through: "+t+" (DUPLICATE)");e+=","+t}else e=t;this._cookies.create("__ibxc",e),this._log("click-through: "+t)}catch(i){this._log(i)}},_log:function(e){0==this.mode&&bouncex.log("ibx: "+e)},_validate:function(e){var t=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)},_quick_validate:function(e){return null==e?!1:e.indexOf(".")>2&&e.indexOf("@")>0},_qs:function(e){var t=[];for(var i in e)e.hasOwnProperty(i)&&t.push(i+"="+encodeURIComponent(e[i]));return t.join("&")},_cookies:{domain:window.bouncex.cookie_domain,create:function(e,t,i){i||(i=365);var o=new Date;o.setTime(o.getTime()+24*i*60*60*1e3);var s="; expires="+o.toGMTString(),r=this.domain?"domain=."+this.domain+";":"";document.cookie=e+"="+t+s+"; path=/;"+r},read:function(e){for(var t=e+"=",i=document.cookie.split(";"),o=0;o<i.length;o++){for(var s=i[o];" "==s.charAt(0);)s=s.substring(1,s.length);if(0==s.indexOf(t))return s.substring(t.length,s.length)}return null},destroy:function(e){this.create(e,"",-1)}},_getparam:function(e){e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var t="[\\?&]"+e+"=([^&#]*)",i=new RegExp(t),o=i.exec(window.location.href);return null==o?"":decodeURIComponent(o[1])}},bouncex.ibx._init();
		init_ibx_tracking();
		
		init_website_custom_js();
		
		if(bouncex.campaigns){
			bouncex.init_lightbox();
			init_activation_funcs();
		}

				bouncex.bcxReady(function(){
			if(typeof(window.bxAsyncInit)==='function'){
				window.bxAsyncInit();
			}else{
				if(bouncex.state.rc){
					bouncex.report_conversion();
				}
			}
		});
		init_custom_actions();
		
				if (bouncex.website.ese){
			event_stream_report('pageview',{'pageview:url':document.location.href});
		}

	}

	
	function addStyle(e){var t=document.createElement("link");t.setAttribute("href",e);t.setAttribute("rel","stylesheet");t.setAttribute("media","all");t.setAttribute("type","text/css");document.getElementsByTagName("head")[0].appendChild(t)}
	function setInactivityTimeout(ca_id,v,inactivity_events){
		return setTimeout(function(){
				show_ad('inactivity',ca_id);
				bouncex.body.unbind(inactivity_events);
			},v*1000);
	}

		function process_mouse_move(b,a){bouncex.direction=18>=(b.layerY?b.layerY:b.pageY)-(document.body.scrollTop||document.documentElement.scrollTop)?"up":!1;if(0<bouncex.campaigns[a].iao||0<bouncex.campaigns[a].rao){var d=b.layerX?b.layerX:b.pageX;bouncex.lastX=0<d?d:1}}
	function process_mouse_out(b,a){var d=b?b:window.event,c=d.toElement,e=d.relatedTarget,d=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;if(!e||e!==this&&!bouncex.contains(this,e))if(!c||"HTML"==c.nodeName)if(bouncex.browser.msie&&"up"==bouncex.direction){if(0<bouncex.campaigns[a].iao&&(c=bouncex.lastX,c<bouncex.campaigns[a].iao)||0<bouncex.campaigns[a].rao&&(c=bouncex.lastX,d-c<bouncex.campaigns[a].rao))return!1;show_ad("bounce",a);can_show_ad(a,!0)||jQuery("html,body").unbind("mouseout.bouncex_show_"+
	a)}else if(!bouncex.browser.msie&&(5>b.clientY&&-50<b.clientY||bouncex.browser.safari&&(-32768==b.clientY||671==b.clientY)&&"up"==bouncex.direction)){if(0<bouncex.campaigns[a].iao&&(c=b.layerX?b.layerX:b.pageX,c<bouncex.campaigns[a].iao)||0<bouncex.campaigns[a].rao&&(c=b.layerX?b.layerX:b.pageX,d-c<bouncex.campaigns[a].rao))return!1;40<bouncex.browser.chrome?(bouncex.events["bouncex_timeout"+a]||(bouncex.events["bouncex_timeout"+a]=setTimeout(function(){show_ad("bounce",a);bouncex.events["bouncex_timeout"+
	a]=!1;jQuery(document).unbind("mouseenter.bx_bouncex_mousenter_"+a);can_show_ad(a,!0)||jQuery("html,body").unbind("mouseout.bouncex_show_"+a)},0)),bxBind(document,"mouseenter.bx_bouncex_mousenter_"+a,function(){jQuery(document).unbind("mouseenter.bx_bouncex_mousenter_"+a);clearTimeout(bouncex.events["bouncex_timeout"+a]);bouncex.events["bouncex_timeout"+a]=!1})):(show_ad("bounce",a),can_show_ad(a,!0)||jQuery("html,body").unbind("mouseout.bouncex_show_"+a))}};
	function getTime2(){
		return parseInt(new Date().getTime()/1000)+bouncex.server_client_time_diff;
	}

		function report_ga(action,label,bypass){
		bypass = typeof(bypass)!='undefined' && !!bypass;
		if(typeof(action)!='string'||typeof(label)!='string') return;
		var interaction = false;
		// enforce case convention
		if(!bypass) {
			action = action.charAt(0).toUpperCase() + action.slice(1).toLowerCase();
			interaction = action=='Impression';
			action = 'BounceX ' + action;
		}
		if(typeof window._gaq == 'object') {
			if(bouncex.website.gai){
				window._gaq.push(['_setAccount', bouncex.website.gai]);
			}
			window._gaq.push(['_trackEvent','BounceX',action,label,,interaction]);
		}
		if(typeof window.ga == 'function') {
			if(bouncex.website.gai){
				window.ga('create', bouncex.website.gai);
			}
			window.ga('send','event','BounceX',action,label,{'nonInteraction':interaction});
		}
	}

	function can_show_ad(ca_id,inthefuture){

		if (!bouncex.campaigns[ca_id]){
			return false;
		}

		if (bouncex.campaigns[ca_id].qbxtest && !bouncex.campaigns[ca_id].ad_visible){
			return true;
		}
		
		var time_now = getTime2();
		if(bouncex.website.tpc==0){
			var bcxc = getBounceCookie();	
			if(bcxc){
				bouncex.cookie = bouncex.parseJSON((bcxc));
				if(!bouncex.cookie)
					return false;
			}else{ 
				//bouncex.log('no cookie');
				return false;
			}
		}

		bouncex.cookie.lvt = bouncex.cookie.campaigns[ca_id].lvt = time_now;

		setBounceCookie();
		if( !inthefuture){
			if(bouncex.campaigns[ca_id].coverlay!='none'&& bouncex.overlay_visible){
				//bouncex.log('FALSE:overlay_visible');
				return false;
			}
		
			if(bouncex.campaigns[ca_id].ad_visible){
				//bouncex.log('FALSE:visible');
				return false;
			}
			if(bouncex.website.ots){
				if(bouncex.campaigns[ca_id].coverlay!='none' && bouncex.timespaced == true){
					//bouncex.log('timespaced!');
					return false;
				}
			}
			if(bouncex.campaigns[ca_id].tvao>0){
				var top = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
				if(bouncex.campaigns[ca_id].tvao>top){
					return false;
				}
			}
		}
		if(bouncex.campaigns[ca_id].failed){
			return false;
		}
		
		if(bouncex.campaigns[ca_id].coverlay!='none'&&!bouncex.campaigns[ca_id].is_man){
			if((bouncex.campaigns[ca_id].map>0&&bouncex.campaigns[ca_id].ap>=bouncex.campaigns[ca_id].map)||bouncex.website.map>0&&bouncex.pa>=bouncex.website.map){
				return false;
			}
		}
		
		if(bouncex.campaigns[ca_id].mas>0){//if max per session
			//website level
			/*if(bouncex.campaigns[ca_id].overlay!='none' && bouncex.website.mas>0 && bouncex.website.mas>=bouncex.campaigns[ca_id].mas && bouncex.website.mas<=bouncex.campaigns[ca_id].as){
				//bouncex.log('FALSE:max_activations_session');
				return false;
			}*/
			//campaign level
			if(bouncex.cookie.campaigns[ca_id].as>=bouncex.campaigns[ca_id].mas){
				//bouncex.log('FALSE:max_actiavtions_session');
				return false;
			}
		}
		if(!bouncex.campaigns[ca_id].is_man && bouncex.website.mas>0 && bouncex.campaigns[ca_id].coverlay!='none' && bouncex.website.mas<=bouncex.cookie.as){
			//bouncex.log('FALSE:max_activations_session');
			return false;
		}
		if(bouncex.campaigns[ca_id].mao>0 && bouncex.cookie.campaigns[ca_id].ao>=bouncex.campaigns[ca_id].mao){
			//bouncex.log('FALSE:overall_activations');
			return false;
		}
		
		if((!bouncex.campaigns[ca_id].is_man&&!bouncex.campaigns[ca_id].ipc)&&(bouncex.cookie.es|| bouncex.cookie.campaigns[ca_id].ls ||  bouncex.cookie.campaigns[ca_id].submitted) && (bouncex.campaigns[ca_id].is_ec)){
			//bouncex.log('FALSE:email:submitted');
			return false;
		}
		if((bouncex.campaigns[ca_id].is_pers || bouncex.campaigns[ca_id].closed_no_show) && bouncex.cookie.campaigns[ca_id].wc){
			//bouncex.log('FALSE:closed');
			return false;
		}
		if(bouncex.campaigns[ca_id].repressed){
			return false;
		}
		
		
		return true;
	}

	function by_parent_id(pid){
		for(var cid in bouncex.campaigns){
			if (bouncex.campaigns[cid].pid == pid){
				return cid;
			}
		}
		return null;
	}

		function destroy_ad(ca_id) {
		/*if(!bouncex.campaigns[ca_id].ad_visible)
			return;//already closed*/
		close_ad(ca_id,true);
		jQuery('#campaign_'+ca_id+'_container_overlay,#campaign_'+ca_id+'_container_callout,#campaign_'+ca_id+'_container_top,#campaign_'+ca_id+'_container_bottom,#campaign_'+ca_id+'_pusher_top,#campaign_'+ca_id+'_pusher_bottom').remove();
		if(bouncex.campaigns[ca_id]){
			delete bouncex.campaigns[ca_id];
		}
	}
	
	function close_ad(ca_id,silent,no_report){
		if(!bouncex.campaigns[ca_id].ad_visible)
			return;//already closed

		var ef = bouncex.campaigns[ca_id].te.substr(0,1);
		var cs = jQuery('#campaign_'+ca_id+'_container_overlay,#campaign_'+ca_id+'_container_top,#campaign_'+ca_id+'_container_bottom,#campaign_'+ca_id+'_container_callout');

		if(bouncex.browser.ios8){
			var bcx_window = jQuery(window);
			bcx_window.unbind('.bcx_campaign_ios8fix_'+ca_id);
			if(bouncex.campaigns[ca_id].lastScroll){
				bcx_window.scrollTop(bouncex.campaigns[ca_id].lastScroll);
			}
		}
		if(bouncex.timer_exists && bouncex.remove_timer){
			clearInterval(bouncex.timer_interval);
			window.document.title = bouncex.old_title;
			bouncex.timer_exists = false;
		}

		if(ef=='r'){
						if(bouncex.campaigns[ca_id].overlay!='none'){
				var lbx = document.getElementById('campaign_'+ca_id+'_lightbox');
				setTimeout(function(){
					setOpacity(lbx,0);
				},150);
			}
			cs.removeClass('bcx_after');
			setTimeout(function(){
				cs.hide().css('display','none');
			},300);
		}else{
			cs.hide().css('display','none');
		}


		bouncex.campaigns[ca_id].ad_visible = false;
		
		if(bouncex.campaigns[ca_id].overlay!='none'){
			bouncex.overlay_visible = false;
			if(bouncex.website.otc){
				bouncex.timespaced = true;
				bouncex.events['timeout_timespace_'+ca_id] = setTimeout(function(){
					bouncex.timespaced = false;
				},bouncex.website.otc*1000);
			}
		}
		if(bouncex.campaigns[ca_id].callout!='none'){
			jQuery(window).unbind('bcx_callout_'+ca_id);
		}
		
		if(!silent){
			bouncex.cookie.campaigns[ca_id].wc = getTime2();
			setBounceCookie();
			if(!no_report){
				report(ca_id,'closes');
			}
			if(bouncex.campaigns[ca_id].onclose_fn){
				bouncex.campaigns[ca_id].onclose_fn();
			}
		
			if(bouncex.campaigns[ca_id].close_redirect_url){
				bouncex.events['timeout_close_redirect_'+ca_id] = setTimeout(function(){
					teleport(bouncex.campaigns[ca_id].close_redirect_type,bouncex.campaigns[ca_id].close_redirect_url);
				},300);
			};
		}
		
		if(bouncex.campaigns[ca_id].top!='none'){
			var push = document.getElementById('campaign_'+ca_id+'_pusher_top');
			if(push){
				bSlideUp(push);
				jQuery(window).trigger('bx_ad_hide', [parseInt(getStyle(push, 'height'))]);
			}
		}
		if(bouncex.campaigns[ca_id].bottom!='none'){
			jQuery('#campaign_'+ca_id+'_pusher_bottom').appendTo('body').slideUp('slow');
		}
		if(bouncex.campaigns[ca_id].overlay=='code' || bouncex.campaigns[ca_id].overlay=='email' || bouncex.campaigns[ca_id].overlay=='genie'){
			flash_objects.css('visibility','visible');
		}
		event_js_eval(ca_id,'close');
	}
	function zoomDisable(w){
		/*var agent = navigator.userAgent.toLowerCase();
		var supported =   agent.indexOf('chrome')>0||agent.indexOf('firefox')>0;*/
		//jQuery('head').prepend('<meta name="viewport" content="user-scalable=no"/>');
	}
	function zoomEnable(){
		//jQuery('head meta[name=viewport]').remove();
		//jQuery('head').prepend('<meta name="viewport" content="user-scalable=yes"/>');
	}
	function center_campaign(ca_id,el){
		if(!bouncex.state.mobile){
			if(!bouncex.fs()){
				var valign = el.getAttribute("data-valign");
				var height = parseInt(getStyle(el,'height'));
				var type = el.getAttribute('data-type');
				var wsize = bouncex.wndsize();
				var wheight = wsize.height;
				el.style.position = 'absolute';						
				scroll_campaign(valign,type,el,wheight,height);
				jQuery(window).bind('scroll',function(k,v){
					scroll_campaign(valign,type,el,wheight,height);
				});
			}
		}
	}
	function scroll_campaign(valign,type,el,wheight,height){
		var top = get_top();
		if(valign=='middle'){
			if(type=='overlay'){
				el.style.top = top+'px';
			}else{
				el.style.top = (top+wheight/2-height/2)+'px';
			}
		}else if(valign=='bottom'){	
			
			el.style.top = (top+wheight-height)+'px';
		}else if(valign=='top'){
			el.style.top = (top)+'px';
		}
	}
	function get_top(){
		return ((document.documentElement && document.documentElement.scrollTop)?(document.documentElement.scrollTop):document.body.scrollTop);
	}
	function align_callout(callout, ca_id,anim,anim_h){
		anim = typeof anim !== 'undefined' ? anim : false;
		var button = bouncex.campaigns[ca_id].c_button,
			ca = bouncex.campaigns[ca_id];
		var bcx_offset = button.offset();
		var bcx_top = parseInt(bcx_offset.top);
		var bcx_left = parseInt(bcx_offset.left);
		var cheight = parseInt(callout.height());
		var cwidth = parseInt( callout.width());
		var awidth = parseInt(button.outerWidth(false));
		var aheight = parseInt(button.outerHeight(false));
		var callout_h = ca.callout_pos.substr(0,1);
		var callout_v = ca.callout_pos.substr(1,2);
		var anchor_h = ca.callout_anchor_pos.substr(0,1);
		var anchor_v = ca.callout_anchor_pos.substr(1,2);
		
		if(callout_h == 'l'){
			bcx_left += 0;
		}else if(callout_h == 'c'){
			bcx_left -= parseInt(cwidth/2);
		}else if(callout_h == 'r'){
			bcx_left -= (cwidth);
		}
		if(anchor_h == 'r'){
			bcx_left += awidth;
		}else if(anchor_h == 'c'){
			bcx_left += parseInt(awidth/2);
		}else if(anchor_h == 'l'){
			bcx_left += 0;
		}
		
		if(callout_v == 't'){
			bcx_top += 0;
		}else if(callout_v == 'm'){
			bcx_top -= parseInt(cheight/2);
		}else if(callout_v == 'b'){
			bcx_top -= cheight;
		}
		if(anchor_v == 'b'){
			bcx_top += aheight;
		}else if(anchor_v == 'm'){
			bcx_top += parseInt(aheight/2);
		}else if(anchor_v == 't'){
			bcx_top += 0;
		}
		bcx_top += parseInt(ca.callout_voffset);
		bcx_left += parseInt(ca.callout_hoffset);
		if (anim == 'down' && typeof anim_h !== 'undefined') {
			callout.animate({'top':(bcx_top+anim_h)+'px'},400);
		} else if (anim == 'up') {
			callout.animate({'top':(bcx_top-anim_h)},400);
		} else {
			callout.css({'top':bcx_top+'px','left':bcx_left+'px'});
		}
	}
	function show_ad(type,ca_id){
		if(!can_show_ad(ca_id)){
			return;
		}	
		bouncex.campaigns[ca_id].ad_visible = true;
		bouncex.campaigns[ca_id].impression_click_reported = false;
		bouncex.campaigns[ca_id].submitted = false;
		var zx = 2147483646;
		var msg = 'bcx_pop&cookie='+encodeURIComponent(getBounceCookie());
		if(bouncex.campaigns[ca_id].top!='none'){
			var top = document.getElementById('campaign_'+ca_id+'_container_top');
			if(top){
				show_ca_el(ca_id,top);
				if(bouncex.campaigns[ca_id].header_top_nano){
					var h = document.getElementById('campaign_'+ca_id+'_pusher_top');
					document.body.insertBefore(h,document.body.firstChild);
					if(bouncex.campaigns[ca_id].htna=='anypage' || (bouncex.campaigns[ca_id].htna=='landing'&&bouncex.state.iol)){
						bSlideDown(h,'height');
						jQuery(window).trigger('bx_ad_show', [parseInt(getStyle(top, 'height'))]);
					}else{
						h.style.display = 'block';
						jQuery(window).trigger('bx_ad_show');
					}
				}
				center_campaign(ca_id,top);
				XD.postMessage(msg,top);
			}
		}
		if(bouncex.campaigns[ca_id].bottom!='none'){
			var bottom = document.getElementById('campaign_'+ca_id+'_container_bottom');
			if(bottom){
				show_ca_el(ca_id,bottom);
				
				if(bouncex.campaigns[ca_id].header_bottom_nano){
					var h = document.getElementById('campaign_'+ca_id+'_pusher_bottom');
					
					jQuery(document.body).append(h);
					
					if(bouncex.campaigns[ca_id].hbna=='anypage' || (bouncex.campaigns[ca_id].hbna=='landing'&&bouncex.state.iol)){
						bSlideDown(h,'height');
					}else{
						h.style.display = 'block';
					}
				}
				center_campaign(ca_id,bottom);
				XD.postMessage(msg,bottom);
			}
		}
			
		noteCookieAdShown(ca_id,true);
		event_js_eval(ca_id,'impression');
		if(bouncex.campaigns[ca_id].overlay!='teleport'){	
			show_close(ca_id);
			if(bouncex.campaigns[ca_id].ad_auto_close){
				var delay = bouncex.campaigns[ca_id].is_pers?calc_delay_cvt(bouncex.campaigns[ca_id].ad_auto_close):bouncex.campaigns[ca_id].ad_auto_close*1000;
				bouncex.events['timeout_auto_close_'+ca_id] = setTimeout(function(){
					close_ad(ca_id);
				},delay);
			}
		}
		if(bouncex.campaigns[ca_id].callout!='none'){
			var callout = jQuery('#campaign_'+ca_id+'_container_callout');
			bouncex.campaigns[ca_id].c_button = jQuery(bouncex.campaigns[ca_id].callout_t).eq(0);
			if(callout.length&&bouncex.campaigns[ca_id].c_button.length){
				var callout_obj = callout.get(0);
				show_ca_el(ca_id,callout_obj);
				XD.postMessage(msg,callout_obj);

				align_callout(callout, ca_id);
				bxBind(window,'resize.bcx_callout_'+ca_id+' bx_ad_show.bcx_callout_'+ca_id+' bx_ad_hide.bcx_callout_'+ca_id+' scroll.bcx_callout_'+ca_id,function(e, anim_h){
					var anim = false;
					if (e.type === 'bx_ad_show') anim = 'down';
					if (e.type === 'bx_ad_hide') anim = 'up';
					align_callout(callout, ca_id, anim, anim_h);
				});	
				
			}
		}
		if(bouncex.campaigns[ca_id].overlay!='none'){
			if(bouncex.campaigns[ca_id].overlay=='email' || bouncex.campaigns[ca_id].overlay=='genie' || bouncex.campaigns[ca_id].overlay=='code'){
				var middle = document.getElementById('campaign_'+ca_id+'_container_overlay');
				if(middle){
					
					bouncex.overlay_visible = true;
					
					
					var mid = document.getElementById('campaign_'+ca_id+'_middle');
					if(!bouncex.fs()){
						middle.style.top = middle.style.left =0;
						mid.style.position = 'absolute';
					}
					
                	if(bouncex.browser.ios8 && !bouncex.campaigns[ca_id].ngs){
                		var overlay_h = parseInt(getStyle(mid,'height'));
                        mid.style.position = 'static';
                        mid.style.marginLeft = 'auto';
                        mid.style.marginRight = 'auto';
                        var window_size = bouncex.wndsize();
                        mid.style.marginTop = (window_size.height/2 - overlay_h/2)+'px';
                        middle.style.height = window_size.height+'px';

                        jQuery(window).bind('orientationchange.bcx_campaign_ios8fix_'+ca_id, function(){
                        	var window_size = bouncex.wndsize();
                        	mid.style.marginTop = (window_size.height/2 - overlay_h/2)+'px';
                        	middle.style.height = window_size.height+'px';
                        });
                        var bcx_window = jQuery(window);
                        bouncex.campaigns[ca_id].lastScroll = bcx_window.scrollTop();
                        bcx_window.scrollTop(0);
                        bcx_window.bind('touchsmove.bcx_campaign_ios8fix_'+ca_id,function(){
                			bcx_window.scrollTop(0);
                		});
                    }
                    show_ca_el(ca_id,middle);
					show_lightbox(ca_id);
					center_campaign(ca_id,middle);
					if(top){
						top.style.zIndex = zx;
					}
					if(bottom){
						bottom.style.zIndex = zx;
					}
					
					if(bouncex.state.mobile){
						//zoomDisable(w);
						jQuery(window).resize(function(){
							center_campaign(ca_id,middle);
						});
					}
					hide_flash();
				}
				XD.postMessage(msg,middle);
			}else if(bouncex.campaigns[ca_id].overlay==='teleport'){
				setTimeout(function(){
					teleport(bouncex.campaigns[ca_id].overlay_teleport_type,bouncex.campaigns[ca_id].overlay_teleport_html);
				},300);
			}
		}
		
		if(bouncex.campaigns[ca_id].supress_overlay || bouncex.campaigns[ca_id].supress_top || bouncex.campaigns[ca_id].supress_bottom){
			for(var nca_id in bouncex.campaigns) {
				if(nca_id!=ca_id &&(bouncex.campaigns[ca_id].supress_overlay && bouncex.campaigns[nca_id].overlay!='none'
				||
				bouncex.campaigns[ca_id].supress_top && bouncex.campaigns[nca_id].top!='none'
				||
				bouncex.campaigns[ca_id].supress_bottom && bouncex.campaigns[nca_id].bottom!='none'
				)){
					close_ad(nca_id,true);
				}
			}	
		}
		if(bouncex.campaigns[ca_id].repress_overlay || bouncex.campaigns[ca_id].repress_top || bouncex.campaigns[ca_id].repress_bottom){
			
			for(var nca_id in bouncex.campaigns) {
				if(nca_id!=ca_id &&(bouncex.campaigns[ca_id].repress_overlay && bouncex.campaigns[nca_id].overlay!='none'
				||
				bouncex.campaigns[ca_id].repress_top && bouncex.campaigns[nca_id].top!='none'
				||
				bouncex.campaigns[ca_id].repress_bottom && bouncex.campaigns[nca_id].bottom!='none'
				)){ 
					bouncex.campaigns[nca_id].repressed = true;
				}
			}	
		}
		
		
		if(bouncex.campaigns[ca_id].osfn_website){
			try{
				eval(bouncex.campaigns[ca_id].osfn_website);
			}catch(err){
				bouncex.log(err);
			}
		}	
	}
	function event_js_eval(ca_id,type,data){
		if(bouncex.campaigns[ca_id].event_js){
			var campaign_id = ca_id;
			if(typeof(bouncex.campaigns[ca_id].event_js)=='string'){
				bouncex.campaigns[ca_id].event_js = bouncex.parseJSON(bouncex.campaigns[ca_id].event_js);
			}
			if(bouncex.campaigns[ca_id].event_js[type]){
				try{
					eval(bouncex.campaigns[ca_id].event_js[type]);
				}catch(err){
					bouncex.log(err);
				}
			}
		}
	}
	
	function post_submit_redirect(mca_id){
		var is_api = bouncex.campaigns[mca_id].is_api;
		var redirect = bouncex.campaigns[mca_id].submission_redirect;
		var delay = bouncex.campaigns[mca_id].submission_redirect_delay;
	
		//force minimums
		if ( is_api && delay < 0.3 ){ delay = 0.3; }
		else if (!is_api){return false;}
		if(redirect){
			setTimeout(function(){
				window.top.location.href = redirect;
			},delay?delay*1000:0);
		}
	}

	function teleport(type,url){
		if(type=='underlay' || type=='_blank'){
			if(type=='_blank'){
				window.open(url,'_blank');
			}else{
				var d = bouncex.wndsize();
				var teleport_args = 'toolbar=0,scrollbars=1,location=1,statusbar=1,menubar=0,resizable=1,width=' + d.width + ',height=' + d.height;
				var popunder = self.window.open(url, 'bouncex', teleport_args);
				popunder.blur();
				popunder.opener.window.focus();
				window.self.window.focus();
				window.focus();
				try {
					if (bouncex.browser.firefox){
						var ghost = window.open('about:blank');
						ghost.focus();
						ghost.close();
					}else if (bouncex.browser.webkit) {
						var nothing = '';
						var ghost = document.createElement("a");
						ghost.href   = "data:text/html,<scr"+nothing+"ipt>window.close();</scr"+nothing+"ipt>";
						document.getElementsByTagName("body")[0].appendChild(ghost);
						var clk = document.createEvent("MouseEvents");
						clk.initMouseEvent("click", false, true, window, 0, 0, 0, 0, 0, true, false, false, true, 0, null);
						ghost.dispatchEvent(clk);
						ghost.parentNode.removeChild(ghost);
					}else if (bouncex.browser.msie) {
						setTimeout(function() {
							popunder.blur();
							popunder.opener.window.focus();
							window.self.window.focus();
							window.focus();
						}, 100);
					}
				} catch (e) {
					bouncex.log(e);
				}
			}				
		}else{
			window.open(url,type);
		}
	}
	function noteCookieAdShown(ca_id,increment){
		bouncex.campaigns[ca_id].ad_shown = true;
		bouncex.cookie.campaigns[ca_id].lavid = bouncex.cookie.vid;
		bouncex.cookie.campaigns[ca_id].la = getTime2();
		if(!bouncex.cookie.campaigns[ca_id].fsa){
			bouncex.cookie.campaigns[ca_id].fsa = bouncex.cookie.campaigns[ca_id].la;//first session activation time
		}
		if(increment){
			bouncex.cookie.campaigns[ca_id].av = bouncex.cookie.campaigns[ca_id].av? (bouncex.cookie.campaigns[ca_id].av + 1) : 1;
			bouncex.cookie.campaigns[ca_id].as = bouncex.cookie.campaigns[ca_id].as? (bouncex.cookie.campaigns[ca_id].as + 1) : 1;
			bouncex.cookie.campaigns[ca_id].ao = bouncex.cookie.campaigns[ca_id].ao? (bouncex.cookie.campaigns[ca_id].ao + 1) : 1;
			if(bouncex.campaigns[ca_id].coverlay !== 'none' && !bouncex.campaigns[ca_id].is_man ){
				bouncex.cookie.ao++;
				bouncex.pa++;
				bouncex.cookie.as++;
				bouncex.campaigns[ca_id].ap = bouncex.campaigns[ca_id].ap?bouncex.campaigns[ca_id].ap+1:1;
			}
		}
		setBounceCookie();
		report(ca_id,'pops');
	}
	function show_close(ca_id,force){
		if(bouncex.campaigns[ca_id].close_button_delay || !bouncex.campaigns[ca_id].show_close){
			var closes;
			
			var poses = ['_top','_bottom','_overlay','_callout'];
			if(!force){
				for (var index = 0; index < poses.length; index++) {
					closes = document.getElementById('bcx_close_'+ca_id+poses[index]);
					if(closes){
						closes.style.display = 'none';
					}
				};
			}
			if(bouncex.campaigns[ca_id].show_close){
				setTimeout(function(){
					for (var index = 0; index < poses.length; index++) {
						closes = document.getElementById('bcx_close_'+ca_id+poses[index]);
						if(closes){
							closes.style.display = 'block';
						}
					};
				
				},force?0:(bouncex.campaigns[ca_id].close_button_delay*1000));
			}
		}
	}
	function next_sequence_id(){
		if (!bouncex.cookie.hasOwnProperty('sid')) {
			bouncex.cookie.sid = 0;
		}
		bouncex.cookie.sid++;
		setBounceCookie();
		return bouncex.cookie.sid;
	}
	function event_stream_report(eventname, params){

		var baseurl = document.location.protocol + '//events.bounceexchange.com/track.gif/' + encodeURIComponent(eventname) + '?';
		var deviceid;
		try {
			deviceid = atob(bouncex.ibx._renew_token());
		}catch(e){}

		try {
			if (deviceid.substr(0,4)=='utk_'){
				var ts = parseInt(deviceid.substr(4,8),16);
				var ms = parseInt(deviceid.substr(13,5),16);
				deviceid = ts * 1000000 + ms;
			}
		}catch (e){}

		params.mode = bouncex.cookie.m;
		params.websiteid = bouncex.website.id;
		params.visitid = bouncex.cookie.vid;
		params.deviceid = deviceid;
		params.pageviewid = bouncex.cookie.vpv;
		params.sequenceid = next_sequence_id();
		params.clienttimestamp = (new Date()).getTime()/1000;
		var url = baseurl + qs(params);
		jQuery('<img />').attr('src',url);
	}
	function report(ca_id,type,onsuccess_fn){

		var uq=0;
		if(type=='clicks'){
			if(bouncex.campaigns[ca_id].impression_click_reported){
				return false;
			}else{
				bouncex.campaigns[ca_id].impression_click_reported =true;
			}
			bouncex.cookie.campaigns[ca_id].lclk = getTime2();
			
			setBounceCookie();
		}else if(type=='closes'){

			if(bouncex.campaigns[ca_id].impression_click_reported || bouncex.campaigns[ca_id].submitted){
				return false;
			}
		}else if(type.substr(0,6)=='coupon'){
						try {
				bouncex.cookie.cpn = parseInt(type.substr(7));
				setBounceCookie();
			}catch(e){}
		}else if(type=='views'){
			bouncex.cookie.campaigns[ca_id].vv = bouncex.cookie.campaigns[ca_id].vv? (bouncex.cookie.campaigns[ca_id].vv + 1 ) : 1;
			if(bouncex.cookie.campaigns[ca_id].vv==1){
				uq = 1;
			}
			setBounceCookie();
		}else if(type=='pops'){
			if(bouncex.cookie.campaigns[ca_id].av==1){
				uq = 1;
			}
		}


		if(!bouncex.website.is_preview){
			jQuery('<img />').attr('src',bouncex.au+'/capture/report.gif?uq='+uq+'&m='+bouncex.cookie.m+'&website_id='+bouncex.website.id+'&d='+bouncex.cookie.d+'&type='+type+'&cv_id='+bouncex.cookie.campaigns[ca_id].cv_id+'&c_id='+ca_id+'&v_id='+bouncex.cookie.vid+'&opt_rand='+(Math.random()));

			if (bouncex.website.ese){
				event_stream_report( (type.substr(0,6)=='coupon' ? 'coupon' : type), {campaignid:ca_id});
			}
		}

		if(type=='clicks'){
			//DH: js event should adhere to first-click-only rule
			event_js_eval(ca_id,'click');
		}
		if(onsuccess_fn)
			onsuccess_fn();
	}
	function qs(o) {
		var a=[],s='';
		for(var k in o){
			if(!o.hasOwnProperty(k)) continue;
			a.push(k+'='+encodeURIComponent(o[k]));
		}
		return a.join('&');
	}
	function report_submit(ca_id, obj, complete) {
		obj.m = bouncex.cookie.m;
		obj.d = bouncex.cookie.d;
		obj.visit_id = bouncex.cookie.vid;
		obj.campaign_id = ca_id;
		obj.website_id = bouncex.website.id;
		try {obj.cv_id = bouncex.cookie.campaigns[ca_id].cv_id;}catch(e){}
		if (!obj.hasOwnProperty('step')){obj.step=1;}
		if (complete){obj.last_step=1;}
		jQuery('<img src="'+bouncex.au+'/capture/submit.gif?'+qs(obj)+'"/>');

	}

	function report_conversion(obj){
		bouncex.bcxReady(function(){
			var bamount,border_id = 0;
			var bemail,bscape = '';
			var bgoal = '';

			if(obj){
				bamount = obj.amount;
				border_id = obj.order_id;
				bemail = obj.email;
				if (obj.goal) {
					bgoal = obj.goal;
				}
			}
			if(bouncex.state.oijs){
				if(!border_id) {
					try{ border_id = (eval(bouncex.state.oijs)); }catch(e){}
				}
			}
			if(bouncex.state.ovjs){
				if(!bamount) {
					try{ bamount = (eval(bouncex.state.ovjs)); }catch(e){}
				}
			}
			if(bouncex.state.oejs){
				if(!bemail) {
					try{ bemail = (eval(bouncex.state.oejs)); }catch(e){}
				}
			}
			if(bouncex.state.goal){
				if(!bgoal) {
					try{ bgoal = bouncex.state.goal; }catch(e){}
				}
			}

			bouncex.cookie.lc = getTime2();
			setBounceCookie();
			jQuery('<img src="'+bouncex.au+'/capture/convert.gif?m='+bouncex.cookie.m+'&d='+bouncex.cookie.d+'&goal='+encodeURIComponent(bgoal)+'&email='+encodeURIComponent(bemail)+'&order_id='+encodeURIComponent(border_id)+'&amount='+encodeURIComponent(bamount)+'&website_id='+bouncex.website.id+'&visit_id='+bouncex.cookie.vid+'&cookie='+escape(bouncex.stringify(bouncex.cookie))+'&'+bouncex.ibx.conv_params()+'"/>');

			if (bouncex.website.ese){
				event_stream_report('conversion',{'conversion.email':bemail,'conversion.amount':bamount,'conversion.orderid':border_id,'conversion.goal':bgoal});
			}

						if(bouncex.website.ibx.te && bouncex.website.ibx.te==1){
				if(bemail) {
					bouncex.ibx.user(bemail, {__src:'bouncex conversion'});
				}
			}

			if(bouncex.website.tcjs){
				try {
					eval(bouncex.website.tcjs);
				} catch(err) {
					bouncex.log(err);
				}
			}
			if(bouncex.website.ibx.te && bouncex.website.ibx.te==1){
				try {
					eval(bouncex.website.ibx.cjs);
				} catch(err) {
					bouncex.log(err);
				}
			}
		});
	}

	function getStyle(e,t){if(e.currentStyle)var n=e.currentStyle[t];else if(window.getComputedStyle)var n=document.defaultView.getComputedStyle(e,null).getPropertyValue(t);return n}
	function show_lightbox(ca_id){
		if(!bouncex.campaigns[ca_id].ngs){
			var ef = bouncex.campaigns[ca_id].te.substr(0,1);
			var lbx = document.getElementById('campaign_'+ca_id+'_lightbox');
			lbx.style.backgroundColor = bouncex.campaigns[ca_id].color;
			lbx.style.display='block';
	        if(bouncex.browser.ios8){
	            lbx.style.position = 'absolute';
	        }
			if(ef=='r'){
				setTimeout(function(){
					setOpacity(lbx,bouncex.campaigns[ca_id].opacity);
				},0);
			}else{
				setOpacity(lbx,bouncex.campaigns[ca_id].opacity);
			}
		}
	}
	function show_ca_el(ca_id,element){
		var te = bouncex.campaigns[ca_id].te;
		var ef = te.substr(0,1);
		if(te=='fade'){
			fade(element,bouncex.campaigns[ca_id].tes);
		}else if(te=='slide'){
			slide(element,bouncex.campaigns[ca_id].tes,ca_id);
		}else if(ef=='r'){
			element.style.display='block';
			setTimeout(function(){
				jQuery(element).addClass('bcx_after');
			},123);
		}else{
			element.style.display='block';
		}
	}
	function slide(what,duration,ca_id){
		var mid = document.getElementById('campaign_'+ca_id+'_middle');
		if(mid){
			mid.style.display = 'none';
			bSlideDown(mid,'top');
		}
		what.style.display='block';
		
	}
	function fade(what, duration) {
		jQuery(what).fadeIn(duration*10+500);
	}
	function setOpacity(el,val){
		el.style.opacity = val;
		el.style.filter = 'alpha(opacity='+val*100+')';
	}
	function bSlideDown(el,prop,onsuccess){
		var props = {};
		props[prop] = (getStyle(el,prop));
		el.style[prop] = 0;
		el.style.display = 'block';
		jQuery(el).animate(props, {duration: 400, complete: function() {
			jQuery(window).trigger('scroll');
			if (typeof onsuccess !== 'undefined') onsuccess();
		}});
	}
	function bSlideUp(el,onsuccess){
		jQuery(el).animate({'height': 0}, {duration: 400, complete: function() {
			el.style.display = 'none';
			jQuery(window).trigger('scroll');
			if (typeof onsuccess !== 'undefined') onsuccess();
		}});
	}

		function init_website_custom_js() {
		if(bouncex.website.cjs){
			try {
				eval(bouncex.website.cjs);
			} catch(err) {
				bouncex.log(err);
			}
		}
	}

		function init_ibx_tracking() {
		if(bouncex.website.ibx.te&&bouncex.website.ibx.te==1){
			// auto-monitor client inputs for valid users
			if(bouncex.website.ibx.miw==1) { 
				try {
					// monitor all inputs (except exclusions) ex. input type="email"
					jQuery('input').not(':input[type=button], :input[type=submit], :input[type=reset], :input[type=hidden], :input[type=radio], :input[type=checkbox], :input[type=image]').blur(function(){
						var source = jQuery(this).attr("id");
						bouncex.ibx.user( jQuery(this).val(), {__src: source } );
					});
				} catch(err) { bouncex.log(err); }
			}
			try {
				eval(bouncex.website.ibx.tjs);
			} catch(err) { bouncex.log(err); }
			bouncex.ibx._bx_lookup();
		} 

	}

})();
function close_bouncex_ad(ca_id){
	bouncex.close_ad(ca_id);
}
