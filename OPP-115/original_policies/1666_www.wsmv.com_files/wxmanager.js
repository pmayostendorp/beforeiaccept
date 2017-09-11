/*
 * WorldNow CSWxManager 1.0.0-beta (2012-10-01)
 */
(function() {"use strict";
	var a = window.wng_includesTracker || {};
	if (!a["/global/interface/httprequest/httprequest.js"]) {
		var b = document;
		b.write('<script type="text/javascript" src="http://content.worldnow.com/global/interface/httprequest/httprequest.js"></script>')
	}
})();
var CSWxManager = CSWxManager || function(a) {"use strict";
	var b = {};
	var c = "";
	var d = function(a) {
		if ( typeof window.console === "object") {
			if ( typeof a === "string") {
				window.console.log("[CSWxManager] " + a)
			} else {
				window.console.log("[CSWxManager] " + a.toString(), a)
			}
		}
	};
	var e = function(a) {
		for (var b = 0; b < a.responseCache.length; b++) {
			if (a.responseCache[b].isWaiting()) {
				return
			}
		}
		while (a.callbackQueue.length > 0) {
			var c = a.callbackQueue.shift();
			var e = new f(a);
			try {
				c.call(null, e)
			} catch(g) {
				d(g)
			}
		}
	};
	var f = function(a) {
		this.manager = a;
		this.curIndex = 0;
		this.cache = [];
		for (var b = 0; b < a.responseCache.length; b++) {
			if (!!a.getOption("includeFailures", false)) {
				this.cache.push(a.responseCache[b])
			} else if (a.responseCache[b].isLoaded()) {
				this.cache.push(a.responseCache[b])
			}
		}
		this.length = this.cache.length
	};
	f.prototype.hasData = function() {
		return this.cache.length > 0
	};
	f.prototype.listNames = function() {
		var a = [];
		for (var b = 0; b < this.cache.length; b++) {
			a[b] = this.cache[b].name
		}
		return a
	};
	f.prototype.next = function() {
		if (!this.hasData()) {
			d("Ignoring call to ResultSet.next(); no data is loaded.");
			return
		}
		this.curIndex++;
		if (this.curIndex >= this.cache.length) {
			this.curIndex = 0
		}
	};
	f.prototype.previous = function() {
		if (!this.hasData()) {
			d("Ignoring call to ResultSet.previous(); no data is loaded.");
			return
		}
		this.curIndex--;
		if (this.curIndex < 0) {
			this.curIndex = this.cache.length - 1
		}
	};
	f.prototype.index = function(b) {
		if (!this.hasData()) {
			d("Ignoring call to ResultSet.index(); no data is loaded.");
			return
		}
		if (b !== a) {
			b = Math.min(b, this.cache.length - 1);
			b = Math.max(b, 0);
			this.curIndex = b
		}
		return this.curIndex
	};
	f.prototype.fetch = function(c) {
		if (!this.hasData()) {
			d("Ignoring call to ResultSet.fetch(); no data is loaded.");
			return a
		}
		var e = this.cache[this.curIndex];
		var f = b[e.source].fetch;
		return f.call(this.manager, e, c)
	};
	var g = function() {
		this.responseCache = [];
		this.callbackQueue = [];
		this.options = {}
	};
	g.prototype.registerHandler = function(a, e) {
		a = a.toString();
		if (!a) {
			d("registerHandler(): Missing or invalid handler name.");
			return
		} else if ( typeof e.request !== "function") {
			d("registerHandler(" + a + "): Missing request function.");
			return
		} else if ( typeof e.fetch !== "function") {
			d("registerHandler(" + a + "): Missing fetch function.");
			return
		}
		b[a] = {
			request : e.request,
			fetch : e.fetch
		};
		if (!c) {
			c = a
		}
	};
	g.prototype.setOption = function(a, b) {
		a = a.toString();
		this.options[a] = b
	};
	g.prototype.setOptionsMap = function(a) {
		if ( typeof a !== "object") {
			d("Ignoring call to Manager.setOptionsMap(); map is not an object.");
			return
		}
		for (var b in a) {
			if (a.hasOwnProperty(b)) {
				b = b.toString();
				this.options[b] = a[b]
			}
		}
	};
	g.prototype.getOption = function(a, b) {
		a = a.toString();
		if (this.options.hasOwnProperty(a)) {
			return this.options[a]
		} else {
			return b
		}
	};
	g.prototype.ready = function(a) {
		this.callbackQueue.push(a);
		e(this)
	};
	g.prototype.loadConfig = function(a, customizedURL) {
		if ( typeof a !== "object") {
			d("Ignoring call to Manager.loadConfig(); bad config argument.");
			return
		}
		if (!( a instanceof Array)) {
			a = [a]
		}
		if (a.length < 1) {
			d("Ignoring call to Manager.loadConfig(); config is empty.");
			return
		}
		this.responseCache = [];
		var f = {};
		var g = {
			WAITING : 0,
			LOADED : 1,
			FAILED : 2
		};
		a:
		for (var h = 0; h < a.length; h++) {
			var i = a[h];
			var j = (i.source || "").toString();
			if ( typeof b[j] !== "object") {
				j = this.getOption("defaultHandler")
			}
			if ( typeof b[j] !== "object") {
				j = c;
				d('loadConfig(): Warning: "defaultHandler" option is unset and "source" property is missing.')
			}
			var k = (i.station || "").toString();
			if (!k) {
				d('loadConfig(): Warning: Missing "station" property at index ' + h + "; skipping.");
				break a
			}
			for (var l = 0; l < this.responseCache.length; l++) {
				if (this.responseCache[l].station === k) {
					d('loadConfig(): Warning: Duplicate station "' + k + '" at index ' + h + "; skipping.");
					break a
				}
			}
			var m = this;
			var n = {
				name : (i.name || "").toString(),
				source : j,
				station : k,
				xmlData : {},
				status : g.WAITING,
				setLoaded : function() {
					this.status = g.LOADED;
					e(m)
				},
				setFailed : function() {
					this.status = g.FAILED;
					e(m)
				},
				isWaiting : function() {
					return this.status === g.WAITING
				},
				isLoaded : function() {
					return this.status === g.LOADED
				}
			};
			f[j] = f[j] || [];
			f[j].push(n);
			this.responseCache.push(n)
		}
		for (var o in f) {
			if (f.hasOwnProperty(o)) {
				b[o].request.call(this, f[o])
			}
		}
	};
	var h = new g;
	h.newInstance = function() {
		return new g
	};
	return h
}();
(function (a, b, c) {"use strict";
	var d = function(a, b) {
		b = parseInt(b, 10);
		var c = Infinity;
		var d = 0;
		for (var e = 0; e < a.length; e++) {
			var f = Math.abs(a[e] - b);
			if (f < c) {
				c = f;
				d = a[e]
			}
		}
		return d
	};
	var API_URL = window.customizedURL || "http://data-services.wsi.com/2004-01/576347879/Weather/Report/{STATION}";
	a.registerHandler("wsi", {
		request : function(a) {
		//	var c = "http://data-services.wsi.com/2004-01/576347879/Weather/Report/{STATION}";
			var d = API_URL.replace("{KEY}", this.getOption("wsiID", 0));
			for (var e = 0; e < a.length; e++) {
				(function() {
					var c = a[e];
					var f = d.replace("{STATION}", c.station);
					WNHttpRequestManager.makeRequest(f, {
						onError : c.setFailed,
						onSuccess : function() {
							var a = b(this.response.responseXML).find("City").first();
							if (a.length > 0) {
								c.xmlData = a;
								c.setLoaded()
							} else {
								c.setFailed()
							}
						}
					})
				})()
			}
		},
		fetch : function(a, b) {
			var e = "http://ftpcontent.worldnow.com/wncustom/wx_icons/wsi{SIZE}/{CODE}.png";
			var f = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
			var g = function() {
				var b = d(f, this.getOption("iconSize", 0));
				var c = e.replace("{SIZE}", b);
				c = c.replace("{CODE}", a.xmlData.find("CurrentObservation").attr("IconCode"));
				return c
			};
			try {
				switch(b) {
					case"name":
						return a.name;
					case"source":
						return a.source;
					case"loaded":
						return a.isLoaded();
					case"id":
						return a.xmlData.attr("Id");
					case"station":
						return a.xmlData.attr("StnIcao");
					case"city":
						return a.xmlData.attr("Name");
					case"state":
						return a.xmlData.attr("StateAbbr");
					case"zipcode":
						return a.xmlData.attr("PreferredZipCode");
					case"country":
						return a.xmlData.attr("CountryName");
					case"timezone":
						return a.xmlData.attr("TimeZone");
					case"temperature":
						return a.xmlData.find("CurrentObservation").attr("TempF");
					case"feelslike":
						return a.xmlData.find("CurrentObservation").attr("FeelsLikeF");
					case"dewpoint":
						return a.xmlData.find("CurrentObservation").attr("DewPtF");
					case"humidity":
						return a.xmlData.find("CurrentObservation").attr("RelHumidity");
					case"pressure":
						return a.xmlData.find("CurrentObservation").attr("Pressure");
					case"windspeed":
						return a.xmlData.find("CurrentObservation").attr("WndSpdMph");
					case"windgusts":
						return a.xmlData.find("CurrentObservation").attr("WndGustMph");
					case"windangle":
						return a.xmlData.find("CurrentObservation").attr("WndDirDegr");
					case"winddirection":
						return a.xmlData.find("CurrentObservation").attr("WndDirCardinal");
					case"visibility":
						return a.xmlData.find("CurrentObservation").attr("Visibility");
					case"ceiling":
						return a.xmlData.find("CurrentObservation").attr("Ceiling");
					case"sky":
						return a.xmlData.find("CurrentObservation").attr("Sky");
					case"iconcode":
						return a.xmlData.find("CurrentObservation").attr("IconCode");
					case"iconurl":
						return g.apply(this);
					case"iconcss":
						return "url('" + g.apply(this) + "')";
					case"forecastdays":
						return a.xmlData.find("DailyForecast").children();
					case"forecasthours":
						return a.xmlData.find("HourlyForecast").children();
					case"high":
						return a.xmlData.find("DailyForecast:first").find("Day:first").attr('HiTempF');
					case "low":
						return a.xmlData.find("DailyForecast:first").find("Day:first").attr('LoTempF');
					default:
						return c
				}
			} catch(h) {
				return c
			}
		}
	
	});
	a.registerHandler("mywxdata", {
		request : function(a) {
			var c = "http://wp.myweather.net/wxdata/current.asp?pub={KEY}&s={STATION}";
			var d = "http://wp.myweather.net/wxdata/fiveday.asp?pub={KEY}&s={STATION}";
			var e = !!this.getOption("mywxdataForecasts", false);
			var f = c.replace("{KEY}", this.getOption("mywxdataID", 0));
			var g = d.replace("{KEY}", this.getOption("mywxdataID", 0));
			for (var h = 0; h < a.length; h++) {
				(function() {
					var c = a[h];
					var d = f.replace("{STATION}", c.station);
					WNHttpRequestManager.makeRequest(d, {
						onError : c.setFailed,
						onSuccess : function() {
							var a = b(this.response.responseXML).find("reporting-station").first();
							if (a.length > 0) {
								c.xmlData.currents = a;
								if (!e || c.xmlData.forecast) {
									c.setLoaded()
								}
							} else {
								c.setFailed()
							}
						}
					});
					if (e) {
						var j = g.replace("{STATION}", c.station);
						WNHttpRequestManager.makeRequest(j, {
							onError : c.setFailed,
							onSuccess : function() {
								var a = b(this.response.responseXML).find("reporting-station").first();
								if (a.length > 0) {
									c.xmlData.forecast = a;
									if (c.xmlData.currents) {
										c.setLoaded()
									}
								} else {
									c.setFailed()
								}
							}
						})
					}
				})()
			}
		},
		fetch : function(a, b) {
			var e = "http://ftpcontent.worldnow.com/wncustom/wx_icons/mywxdata{SIZE}/{CODE}.png";
			var f = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
			var g = function() {
				var b = d(f, this.getOption("iconSize", 0));
				var c = e.replace("{SIZE}", b);
				c = c.replace("{CODE}", a.xmlData.currents.find("icon-select").text());
				return c
			};
			try {
				switch(b) {
					case"name":
						return a.name;
					case"source":
						return a.source;
					case"loaded":
						return a.isLoaded();
					case"id":
						return a.xmlData.currents.attr("code");
					case"station":
						return a.xmlData.currents.attr("code");
					case"city":
						return a.xmlData.currents.find("city").text();
					case"state":
						return a.xmlData.currents.find("state-abbr").text();
					case"zipcode":
						return c;
					case"country":
						return c;
					case"timezone":
						return c;
					case"temperature":
						return a.xmlData.currents.find("temperature").text();
					case"feelslike":
						return a.xmlData.currents.find("wind-chill").text();
					case"dewpoint":
						return a.xmlData.currents.find("dew-point").text();
					case"humidity":
						return a.xmlData.currents.find("relative-humidity").text();
					case"pressure":
						return a.xmlData.currents.find("altimeter").text();
					case"windspeed":
						return a.xmlData.currents.find("wind-speed").text();
					case"windgusts":
						return a.xmlData.currents.find("wind-gusts").text();
					case"windangle":
						return a.xmlData.currents.find("wind-direction-degrees").text();
					case"winddirection":
						return a.xmlData.currents.find("wind-direction").text();
					case"visibility":
						return a.xmlData.currents.find("visibility").text();
					case"ceiling":
						return a.xmlData.currents.find("ceiling").text();
					case"sky":
						return a.xmlData.currents.find("sky-conditions").text();
					case"iconcode":
						return a.xmlData.currents.find("icon-select").text();
					case"iconurl":
						return g.apply(this);
					case"iconcss":
						return "url('" + g.apply(this) + "')";
					case"forecastdays":
						return a.xmlData.forecast.children("forecast-day");
					case"forecasthours":
						return c;
					default:
						return c
				}
			} catch(h) {
				return c
			}
		}
	});
	a.registerHandler("myweather", {
		request : function(a) {
			var c = "http://services.intellicast.com/2004-01/576347879/Weather/Report/{STATION}";
			var d = c.replace("{KEY}", this.getOption("wsiID", 0));
			for (var e = 0; e < a.length; e++) {
				(function() {
					var c = a[e];
					var f = d.replace("{STATION}", c.station);
					WNHttpRequestManager.makeRequest(f, {
						onError : c.setFailed,
						onSuccess : function() {
							var a = b(this.response.responseXML).find("City").first();
							if (a.length > 0) {
								c.xmlData = a;
								c.setLoaded()
							} else {
								c.setFailed()
							}
						}
					})
				})()
			}
		},
		fetch : function(a, b) {
			var e = "http://ftpcontent.worldnow.com/wncustom/wx_icons/wsi{SIZE}/{CODE}.png";
			var f = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];
			var g = function() {
				var b = d(f, this.getOption("iconSize", 0));
				var c = e.replace("{SIZE}", b);
				c = c.replace("{CODE}", a.xmlData.find("CurrentObservation").attr("IconCode"));
				return c
			};
			try {
				switch(b) {
					case"name":
						return a.name;
					case"source":
						return a.source;
					case"loaded":
						return a.isLoaded();
					case"id":
						return a.xmlData.attr("Id");
					case"station":
						return a.xmlData.attr("StnIcao");
					case"city":
						return a.xmlData.attr("Name");
					case"state":
						return a.xmlData.attr("StateAbbr");
					case"zipcode":
						return a.xmlData.attr("PreferredZipCode");
					case"country":
						return a.xmlData.attr("CountryName");
					case"timezone":
						return a.xmlData.attr("TimeZone");
					case"temperature":
						return a.xmlData.find("CurrentObservation").attr("TempF");
					case"feelslike":
						return a.xmlData.find("CurrentObservation").attr("FeelsLikeF");
					case"dewpoint":
						return a.xmlData.find("CurrentObservation").attr("DewPtF");
					case"humidity":
						return a.xmlData.find("CurrentObservation").attr("RelHumidity");
					case"pressure":
						return a.xmlData.find("CurrentObservation").attr("Pressure");
					case"windspeed":
						return a.xmlData.find("CurrentObservation").attr("WndSpdMph");
					case"windgusts":
						return a.xmlData.find("CurrentObservation").attr("WndGustMph");
					case"windangle":
						return a.xmlData.find("CurrentObservation").attr("WndDirDegr");
					case"winddirection":
						return a.xmlData.find("CurrentObservation").attr("WndDirCardinal");
					case"visibility":
						return a.xmlData.find("CurrentObservation").attr("Visibility");
					case"ceiling":
						return a.xmlData.find("CurrentObservation").attr("Ceiling");
					case"sky":
						return a.xmlData.find("CurrentObservation").attr("Sky");
					case"iconcode":
						return a.xmlData.find("CurrentObservation").attr("IconCode");
					case"iconurl":
						return g.apply(this);
					case"iconcss":
						return "url('" + g.apply(this) + "')";
					case"forecastdays":
						return a.xmlData.find("DailyForecast").children();
					case"forecasthours":
						return a.xmlData.find("HourlyForecast").children();
					default:
						return c
				}
			} catch(h) {
				return c
			}
		}
	})
})(CSWxManager, $wn, window.customizedURL || "")