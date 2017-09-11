
	function getValue(url, key){
		if (!key) return "";
		var keyIndex = url.indexOf(key + "=");
		if (keyIndex < 0) return "";
		keyIndex += key.length + 1;
		var separatorIndex = url.indexOf("&",keyIndex);
		if (separatorIndex < 0){
			return url.substring(keyIndex);
		}else{
			return url.substring(keyIndex, separatorIndex);
		}
	}
	function isStartsWith(src, prefix){
		return src.indexOf(prefix)==0?true:false;
	}
	function getEmptyForValue(val){
		return val?val:'';
	}
	var referer = document.referrer;
	var qString = location.search;
	var prop39CookieVal;
	var prop41CookieVal;
	if (referer){
		var seID = "";
		var seKeywords = "";
		if (isStartsWith(referer, "http://www.google.")) {
			seID = getDomainName(referer);
			seKeywords = getValue(referer, "q");
		}else if (isStartsWith(referer, "http://search.yahoo.")) {
			seID = getDomainName(referer);
			seKeywords = getValue(referer, "p");
		}else if (isStartsWith(referer, "http://search.msn.com/")) {
			seID = "msn";
			seKeywords = getValue(referer, "q");
		}else if (isStartsWith(referer, "http://search.aol.com/")) {
			seID = "aol";
			seKeywords = getValue(referer, "encquery");
		}else if (isStartsWith(referer, "http://www.ask.com/")) {
			seID = "ask.com";
			seKeywords = getValue(referer, "q");
		}else if (isStartsWith(referer, "http://cnet.search.com/")) {
			seID = "cnet";
			seKeywords = getValue(referer, "q");
		}else if (isStartsWith(referer, "http://search.netscape.com/")) {
			seID = "netscape";
			seKeywords = getValue(referer, "query");
		}else if (isStartsWith(referer, "http://mysearch.myway.com/")) {
			seID = "myway";
			seKeywords = getValue(referer, "type");
		}else if (isStartsWith(referer, "http://www.dogpile.com/info.dogpl/search/")) {
			seID = "dogpile";
			var startPile = "http://www.dogpile.com/info.dogpl/search/web/".length;
			var endPile = referer.indexOf("/", startPile);
			if (endPile > 0){
				seKeywords = referer.substring(startPile, endPile);
			}
		}else if (isStartsWith(referer, "http://www.overture.com/d/search/")) {
			seID = "overture";
			seKeywords = getValue(referer, "Keywords");
		}
		if (seID){
			if (qString.indexOf("CREF") >= 0 || qString.indexOf("cref") >= 0 || qString.indexOf("EADID") >= 0 || qString.indexOf("eadid") >= 0){
				seID += " - PAID";
			}
			prop39CookieVal = "" + seID + " / " + getEmptyForValue(seKeywords);
			prop39CookieVal = prop39CookieVal.toLowerCase();
			s.prop39 =  prop39CookieVal + " / " + getEmptyForValue(s.pageName);
			setCookie("prop39", prop39CookieVal, null, '/', getBaseDomain());
			prop41CookieVal = "" + seID;
			s.prop41 =  prop41CookieVal + " / " + getEmptyForValue(s.pageName);
			setCookie("prop41", prop41CookieVal, null, '/', getBaseDomain());
		}
	}
	if (!prop39CookieVal){
		prop39CookieVal = getCookie("prop39");
		if (prop39CookieVal){
			s.prop39 =  prop39CookieVal + " / " + getEmptyForValue(s.pageName);
		}
	}
	if (!prop41CookieVal){
		prop41CookieVal = getCookie("prop41");
		if (prop41CookieVal){
			s.prop41 =  prop41CookieVal + " / " + getEmptyForValue(s.pageName);
		}
	}