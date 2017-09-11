/*
Copyright (c) 2012, comScore Inc. All rights reserved.
version: 4.5.3
*/
//page exposure
var i = new Image();
i.src = "http://ar.voicefive.com/b/recruitBeacon.pli?pid=sr_p133596880&prad=5&ar_c=5";

if (typeof(COMSCORE) == "undefined") {
	var COMSCORE = {};
}


if (typeof COMSCORE.SiteRecruit == "undefined") {
	COMSCORE.SiteRecruit = {
		version: "4.5.3",
	
		configUrl: "broker-config.js",	// full url to broker config
	
		builderUrl: "builder.js",		// full url to invitation builder
	
		CONSTANTS: {
			COOKIE_TYPE: { ALREADY_ASKED: 1, DD_IN_PROGRESS: 2, EDD_IN_PROGRESS: 3 }
		}
	};

	COMSCORE.SiteRecruit.Utils = ( function() {
		//private
		var _sr = COMSCORE.SiteRecruit;
		
		// public methods and properties
		return {
			location: document.location.toString(),
				
			loadScript: function(url, loadFresh) {
				if (loadFresh) {
					url = _sr.Utils.appendQueryParams(url, (new Date()).getTime());
				}
				
				var s = document.createElement("script");
				s.src = url;
				document.body.appendChild(s);
			},
			
			getBrowser: function() {
				var b = {};
				
				b.name = navigator.appName;
				b.version = parseInt(navigator.appVersion, 10);
				
				// Check for Internet Explorer based browsers.
				if (b.name == "Microsoft Internet Explorer") {
					if (b.version > 3) {
						var ua = navigator.userAgent.toLowerCase();
						if (ua.indexOf("msie 5.0") == -1) {
							b.ie = true;
							
						}
						
						if (ua.indexOf("msie 7") != -1) {
							b.ie7 = true;
							
						}
					}
				}
				
				// Check for Mozilla based browsers.
				if (b.name == "Netscape" || b.name == "Opera") {
					if (b.version > 4) {
						b.mozilla = true;
						
					}
				}
				
				return b;
				
				/* compact version!!!, does it match sr4 behavior?
				b.xpath = !!(document.evaluate);
				if (window.ActiveXObject) {
					b.ie = b[window.XMLHttpRequest ? "ie7" : "ie6"] = true;
					
					COMSCORE.log("browser is IE, " + b.ie7 ? "7" : "6");
				}
				else if (document.childNodes && !document.all && !navigator.taintEnabled) {
					b.webkit = b[b.xpath ? 'webkit420' : 'webkit419'] = true;	
					
					COMSCORE.log("browser is safari");
				}
				else if (document.getBoxObjectFor != null) {
					b.gecko = true;	// mozilla/firefox
				}
				*/
			},
			
			/**
			 * Used for firing a web beacon, loads an image behind the scenes.
			 * @param {Object} url Url of the image request
			 */
			 fireBeacon: function (url) {
				setTimeout(function() {
					if (url.indexOf('?') == -1) {
						url += (/\?/.test(url) ? '&' : '?') + (new Date()).getTime();
					}
					else
					{
						url += '&' + (new Date()).getTime();
					}
								
				
					var i = new Image();
				
					
					
					i.src = url;			
				}, 1);
			},
			
			appendQueryParams: function(url, params) {
				if (url == null || params == null) {
					
				}
				//params = encodeURIComponent(params);
				if (!url) {
					return params;
				}
				else {
					url = url.replace('?', '') + "?";
				
					if (params) {
						url += params.toString().replace('?', '');
					} 
					
					return url;
				}
			},
			
			getRandom: function(num) {
				// Custom random number generator.
		        var n = 1000000000;
		        
		        function ugen(old, a, q, r, m) {
		            var t = Math.floor(old / q);
		            t = a * (old - (t * q)) - (t * r);
		            return Math.round((t < 0) ? (t + m) : t);
		        }
		        
		        var m1 = 2147483563, m2 = 2147483399, a1 = 40014, a2 = 40692, q1 = 53668, q2 = 52774, r1 = 12211, r2 = 3791, x = 67108862;
		        var g2 = (Math.round(((new Date()).getTime() % 100000)) & 0x7FFFFFFF), g1 = g2;
	 			var shuffle = [32], i = 0;
		        
		        for (; i < 19; i++) {
		            g1 = ugen(g1, a1, q1, r1, m1);
		        }
		        for (i = 0; i < 32; i++) {
		            g1 = ugen(g1, a1, q1, r1, m1);
		            shuffle[31 - i] = g1;
		        }
		        g1 = ugen(g1, a1, q1, r1, m1);
		        g2 = ugen(g2, a2, q2, r2, m2);
		        var s = Math.round((shuffle[Math.floor(shuffle[0] / x)] + g2) % m1);
		    
				var rand = Math.floor(s / (m1 / (n + 1))) / n;
				
				// if passed arg, return number between 0 and num, else return float
				//switched these 2 does it make sense?
				if (typeof(num) == "undefined") {
					
					return rand;
				}
				else {
					
					return Math.floor(rand*(num+1));
				}
			},
			
			getExecutingPath: function(filename) {
				var tags = document.getElementsByTagName("script");
				for (var i = tags.length - 1; i >= 0; i--) {
					var src = tags[i].src;
				
					this.scriptUrl = src;
				
					if (src.indexOf("/" + filename) != -1)	{				
						return src.replace(/(.*)(\/.*)$/, '$1/');
					}
				}
			}	
		};
	} )();


	/*
 Basic Cookie Functionality
 */
 COMSCORE.SiteRecruit.Utils.UserPersistence = {
	set: function(key, value, options) {
		value = escape(value);
		if (options.date) {
			value += ";expires=" + options.date.toGMTString();
		} 
		else if (options.duration) {
			var date = new Date();
			date.setTime(date.getTime() + options.duration * 24 * 60 * 60 * 1000);
			value += "; expires=" + date.toGMTString();
		}
		if (options.path) {
			value += "; path=" + options.path;
		}
						
		else {
			
		}
						
		if (options.domain) {
			value += "; domain=" + options.domain;
		}
						
		if (options.secure) {
			value += "; secure";
		}
						
		document.cookie = key + "=" + value;
						
		// tracing logic only:
		if (!COMSCORE.isDDInProgress()) {
			
		}
		return true;
	},

	get: function(key) {
		var value = document.cookie.match("(?:^|;)\\s*" + key + "=([^;]*)");
		return value ? unescape(value[1]) : false;
	},

	remove: function(name, options) {
		
		options = options || {};
		options.duration = -999;
		this.set(name, "", options);
	}
};
	
	COMSCORE.SiteRecruit.DDKeepAlive = ( function() {
		// private methods and properties
		var _interval = 1000, _pageId = Math.random(), _timeoutId;
	
		// shorthand
		var _sr = COMSCORE.SiteRecruit;
		var _utils = _sr.Utils;
		
		return {
			start: function() {
				var that = this;
				
				_timeoutId = setInterval(function() {
					if (_sr.Broker.isDDInProgress()) {
						that.setDDTrackerCookie();
			        }
					else {
					
						that.stop();
					}
				}, _interval);
			},
			
			stop: function() {
				clearInterval(_timeoutId);
				
			},
			
			setDDTrackerCookie: function() {
				var c = _sr.Broker.config.cookie;
				var val = _sr.CONSTANTS.COOKIE_TYPE.DD_IN_PROGRESS + ":" + 
							escape(_utils.location) + ":" + 
							(new Date()).getTime();
				
				// set session cookie
				_utils.UserPersistence.set(c.name, val, { path: c.path, domain: c.domain });	
			}
		};
	} )();
	
	COMSCORE.SiteRecruit.PagemapFinder = ( function() {
		// private methods and properties
		var _totalFreq;
		// shorthand
		var _sr = COMSCORE.SiteRecruit;
		var _utils = _sr.Utils;
		
		return {
			getTotalFreq: function() {
				return _totalFreq;
			},
			
			find: function(mappings) {
				var currentPriority = 0, currentMatch;
				var m = mappings;
				//cjones 11/1/07
				var matchList = [];
				var halt = false;
				_totalFreq = 0;
				// Iterate over each URL.
				for (var i = 0; m && i < m.length; i++) {
					var matchPrereqs = false;
							
					var pm = m[i];
					 if (pm) {
						// Do the reg exp match.
						var r = new RegExp(pm.m, 'i');			
						if (_utils.location.search(r) != -1) {	// does current url match regex?
							if (pm.halt) {
								
								halt = true;
								break;
							}
							// Now check the prereqs.
							var pr = m[i].prereqs;
							
							matchPrereqs = true;
							if (pr) {	
								
										
								if (!this.isMatchContent(pr.content)) {
									
									matchPrereqs = false;
								}
									
								if (!this.isMatchCookie(pr.cookie)) {
									
									matchPrereqs = false;
								}
								
								if (!this.isMatchLanguage(pr.language)) {
									
									matchPrereqs = false;
								}
								
							}
						}		
						//cjones push match onto array
						if (matchPrereqs) {
							matchList.push(pm);
							
							_totalFreq += pm.f;
						}				
					}
				}
				if (halt == true) {
					matchList = null;
					_totalFreq = 0;
					return null;
				}
				
				
				
				return this.choosePriority(matchList);
			},
			
			//cjones new function to handle auto weight feature.
			choose: function(matchList, totalFreq) {
				var r = _utils.getRandom((totalFreq*100.0));  //get random between 1 nad total freq * 100?
				var sum = 0;
				for (var i = 0; i < matchList.length; i++) {
					sum += (matchList[i].f * 100.0);
					if (r <= sum) {
						
						return matchList[i];
					}
				}
				
				return null;
			},
		
			choosePriority: function(matchList) {
				var prevMatch = null;
				for (var i = 0; i < matchList.length; i++) {
					if (prevMatch == null) {
						prevMatch = matchList[i];		
					}
					else {
						if (prevMatch.p < matchList[i].p) {
							prevMatch = matchList[i];
						}
						
					}
				}
				return prevMatch;
			},
			
			isMatchContent: function(content) {
				var isMatch = true, i = 0;
									
				while (isMatch && i < content.length) {
					
					var matchContent = false;
	                var matchAttribute = false;
	                								
					var c = content[i];
					
					if (c.element) {
	                    var elements = document.getElementsByTagName(c.element);
	                    
						for (var k = 0; k < elements.length; k++) {
							var val = c.elementValue;
	                        
							if (val && val.length) {
	                            if (elements[k].innerHTML.search(val) != -1) {
	                                matchContent = true;
	                            }
	                        }
	                        else {
	                            matchContent = true;
	                        }
	                        
							if (c.attrib && c.attrib.length) {
								var a = elements[k].attributes.getNamedItem(c.attrib);
	                            if (a) {
									if (c.attribValue && c.attribValue.length) {
										if (a.value.search(c.attribValue) != -1) {
											matchAttribute = true;
	                                    }
	                                }
									else {
										matchAttribute = true;
	                                }
	                            }
	                        }
	                        else {
								matchAttribute = true;
							}
						}
					}
	                
	                if (!matchContent || !matchAttribute) {
	                    isMatch = false;
	                }
			i++;
				}
				
				return isMatch;		
			},
			
			isMatchCookie: function(cookies) {
				var isMatch = true, i = 0;
				
				while (isMatch && i < cookies.length) {
					
					var c = cookies[i], val = _utils.UserPersistence.get(c.name);
							
					if (val && val !== null) {
						isMatch = val.indexOf(c.value) != -1 ? true : false;
						i++;
					}
					else {
						return false;
					}
				}
				
				return isMatch;
			},
			
			isMatchLanguage: function(lang) {
				var n = navigator.language || navigator.userLanguage;
				n = n.toLowerCase();
				if  (!lang) {
					return true;
				}
				if (n.indexOf(lang) != -1) {
					
	                return true;
	            }
				
				
				return false;
			}
		};
	} )();
	
	COMSCORE.SiteRecruit.srfl = ( function(_str){
		_str= '3r1com3core1t3t';
		var _sr = _str.replace(/1/gi, '_');
		return _sr.replace(/3/gi, 's')+"=true";
	} )();
	
	COMSCORE.SiteRecruit.Broker = ( function() {
		// private method and properties
		
		// for short hand
		var _sr = COMSCORE.SiteRecruit;
		var _utils = _sr.Utils;
		
		// public methods and properties
		return {
			init: function(cookie) {
				if (cookie && cookie != "") {
					return
				}
				
				_sr.browser = _utils.getBrowser();
				_sr.executingPath = _utils.getExecutingPath("broker.js");
			
				if (_sr.browser.ie || _sr.browser.mozilla) {
					_utils.loadScript(_sr.executingPath + _sr.configUrl, true);
				}
				else {
					
					return;
				}
			},
			
			
			start: function() {
				// CUSTOM CODE - Check for AR Already Asked cookie
				var projectId = "p133596880";
				var cookieName = "ar_s_" + projectId;
				var callback = "COMSCORE.SiteRecruit.Broker.init";
				var readCookieURL = "http://ar.voicefive.com/b/rc.pli?n=" + cookieName + "&func=" + callback + "&" + (new Date()).getTime();
				 _utils.loadScript(readCookieURL, false);
				// END CUSTOM
				//this.init();
			},
			
			run: function() {
				
				
				//initialize IE user data persistence if and only if 
				//this option has been enabled and the browser is ie
				if (this.config.objStoreElemName) {
					if (_sr.browser.ie) {
						COMSCORE.SiteRecruit.Utils.UserPersistence.initialize();
					}
					else {
						
						return;
					}
				}
				
				// verify versions match
				if (_sr.version !== this.config.version) {
					
					return;
				}
				
				if (this.isDDInProgress()) {
					this.processDDInProgress();
				}
				
				if (this.isEDDInProgress()) {
					this.processEDDInProgress();
				}
						
				if (!this.config.testMode || this.isDDInProgress() || this.isEDDInProgress()) {
					// if any site recruit exists, stop executing
					if (_utils.UserPersistence.get(this.config.cookie.name) !== false) {
						
						return;
					}		
				}	
				
				if (this.findPageMapping())
				{
					
					
					// roll the dice
					var r = _utils.getRandom();
						
					if (r <= _sr.PagemapFinder.getTotalFreq()) {
						
						//cjones
						if (this.pagemap) {
							this.loadBuilder();
						}	
					}
					else {
						
						return;
					}
				}
				else {
					
					return;
				}
			},		
			
			isDDInProgress: function() {
				var c = _utils.UserPersistence.get(COMSCORE.SiteRecruit.Broker.config.cookie.name);
				
				return (c && c.indexOf(_sr.CONSTANTS.COOKIE_TYPE.DD_IN_PROGRESS) === 0);
			},
			
			isEDDInProgress: function() {
				var c = _utils.UserPersistence.get(this.config.cookie.name);
				
				return (c && c.indexOf(_sr.CONSTANTS.COOKIE_TYPE.EDD_IN_PROGRESS) === 0);
			},
			
			processDDInProgress: function() {
				// launch dd keep alive
				
				_sr.DDKeepAlive.start();			
			},
			
			processEDDInProgress: function() {
				// fire edds web beacon
				var c = _utils.UserPersistence.get(this.config.cookie.name);
				
				if (c) {
					var m = c.match(new RegExp("\\d*$"));
					
					if (m && m.length) {
						var url = this.config.eddListenerUrl;	
						
						var params = 'action=log' + '&user=' + m[0] + '&location=' + escape(_utils.location);
						url = _utils.appendQueryParams(url, params);
						                
						_utils.fireBeacon(url);
						
					}
					
					else {
						
					}
				}
				
				else {
						
				}
						
			},
			
			findPageMapping: function() {
				this.pagemap = _sr.PagemapFinder.find(this.config.mapping);	
				return this.pagemap;
			},
			
			loadBuilder: function() {
				// prefix pageconfig url if it's supplied
				var url = _sr.executingPath + _sr.builderUrl;
				/*
				var p = this.config.prefixUrl;
						
				if (p) {
					url = p + url;
				}
				*/
				_utils.loadScript(url);
				
			}
		};
	} )();
	
	COMSCORE.chk = COMSCORE.SiteRecruit.srfl;
		
	COMSCORE.isDDInProgress = COMSCORE.SiteRecruit.Broker.isDDInProgress;
	
	COMSCORE.SiteRecruit.OnReady = ( function() {
		// for short hand
		var _sr = COMSCORE.SiteRecruit;
		var _utils = _sr.Utils;
		
		// public methods and properties
		return {
			onload : function() {
				if (_sr.OnReady.done) { return; }
				_sr.OnReady.done = true;
				_sr.Broker.start(); //initialize the broker once the DOM is ready
				//clean up
				//safari
				if(_sr.OnReady.timer){
					
					clearInterval(_sr.OnReady.timer);
				}
				//mozilla opera
				 if(document.addEventListener) {
					 
					document.removeEventListener("DOMContentLoaded", _sr.OnReady.onload, false);
				}
				//ie
				 if(window.ActiveXObject){
					 
					/*
					var defer = document.getElementById("sr__ie_onload");
					if(defer){
						defer.onreadystatechange = null;
						defer.parentNode.removeChild(defer);
					}
					*/
				}
			},
			listen : function() {
				//safari
				if (/WebKit|khtml/i.test(navigator.userAgent)) {
					_sr.OnReady.timer = setInterval(function() {
						if (/loaded|complete/.test(document.readyState)) {
							clearInterval(_sr.OnReady.timer);
							delete _sr.OnReady.timer;
							_sr.OnReady.onload();
						}}, 10);
				}
				//mozilla opera 
				else if (document.addEventListener) {
					document.addEventListener('DOMContentLoaded', _sr.OnReady.onload, false);
				}
				//ie
				else if (window.ActiveXObject) {
					//_sr.OnReady.iew32 = true;
					//document.write('<script id="sr__ie_onload" defer src="' + ((location.protocol == 'https:') ? '//0' : 'javascript:void(0)') + '"><\/script>');
					//document.getElementById('sr__ie_onload').onreadystatechange = function(){if (this.readyState == 'complete') { _sr.OnReady.onload(); }};
					COMSCORE.SiteRecruit.OnReady.waitForLoad = setInterval(function() {
				                try {
				                    // throws errors until after ondocummentready
				                    document.documentElement.doScroll('left');
								} catch (ex) {
									return;
				                }
				                COMSCORE.SiteRecruit.OnReady.waitForLoad = clearInterval(COMSCORE.SiteRecruit.OnReady.waitForLoad);
								COMSCORE.SiteRecruit.OnReady.onload();
				            }, 1000);
				}
				//default ??
				else  {
					if(window.addEventListener) {
						window.addEventListener('load', _sr.OnReady.onload, false);
					} else if (window.attachEvent) {
						return window.attachEvent('onload', _sr.OnReady.onload);
					}
				}
			},
			f:[],done:false,timer:null
		};
	})();

	COMSCORE.SiteRecruit.OnReady.listen();
}// namespace (if statement at the top)