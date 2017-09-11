/*global window */
'use strict';
function hasCookieSupport() {
	window.document.cookie = "cookieTester=1; expires=Tue, 01 Mar 2033 17:21:05 GMT; path=/";
	return window.document.cookie.indexOf("cookieTester=1") !== -1;
}

(function () {
	var a = window.navigator.appVersion,
		safari = a.indexOf("Safari/") !== -1,
		chrome = a.indexOf("Chrome") !== -1,
		crios = a.indexOf("CriOS") !== -1,
		ipad = a.indexOf("iPad") !== -1,
		iphone = a.indexOf("iPhone") !== -1,
		ie = window.navigator.appName === 'Microsoft Internet Explorer';

	if (window.location.search.indexOf("nosso=1") === -1) {
		if ((safari && !chrome && !crios && !ipad && !iphone) || ie) {
			if (hasCookieSupport()) {
				if (window.document.cookie.indexOf("KinjaInit=1") === -1) {
					window.document.cookie = "KinjaInit=1; path=/";
					window.location.href = (window.location.port === "9000" ? "http://apilocal.kinja.com:9040" : "https://kinja.com")  + "/api/profile/getsession?redirect=" + window.encodeURIComponent(
						window.location.protocol + "//" + window.location.host + "/setsession?r=" + encodeURIComponent(window.location.href)
					);
				}
			}
		}
	}
	if (safari && a.indexOf('Version/5') !== -1 && !chrome && !crios && !ipad && !iphone) {
		// disable sso for safari 5
		if (window.document.cookie.indexOf("KinjaToken=") === -1) {
			window.KINJA_NO_SSO = true;
		}
	}
})();
