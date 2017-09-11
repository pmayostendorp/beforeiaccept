
var args = getQueryStringArgs();
function getQueryStringArgs(){
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for (var i=0; i<pairs.length; i++){
		var pos = pairs[i].indexOf('=');
		if (pos==-1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}
function getUserType(assignment){
	var UserType = getCookie("UserType");
	var loc = "";
	if (UserType==''){
		UserType = "Browser";
	}else{
		loc = UserType.indexOf('Seeker');
			if ((getQueryString("query") != "" || location.href.indexOf('sca_template.jsp') != -1) && loc == -1){
				UserType = UserType + ": Seeker";
			}
			if(typeof(assignment)!="undefined"){
				loc = UserType.indexOf(assignment);
				if (loc == -1){
					UserType = UserType + ": " + assignment;
				}
			}
	}
	setCookie('UserType',UserType,10*365,'/',getBaseDomain(),null);
	return(UserType);
}
function getUserID(){
	var UserIDCookieValue = getCookie("UserID");
	var MNGidCookieValue = "";
	if(typeof(MNGiIDCookieName)!="undefined"){
		MNGidCookieValue = getCookie(MNGiIDCookieName);
	}
	var jSessoinIDCookieValue = getCookie("JSESSIONID");
	if (MNGidCookieValue != ''){
		setCookie('UserID',"R:"+MNGidCookieValue,10*365,'/',getBaseDomain(),null);
		return ("R:"+MNGidCookieValue);
	}else{
		if (UserIDCookieValue != ''){
			setCookie('UserID',UserIDCookieValue,10*365,'/',getBaseDomain(),null);
			return UserIDCookieValue;
		}else{
			setCookie('UserID',jSessoinIDCookieValue,10*365,'/',getBaseDomain(),null);
			return jSessoinIDCookieValue;
		}
	}
}
function getCampaignValue(campaign){
	var result="";
	if (args[campaign]){
		result = args[campaign];
		setCookie(campaign, result, null, '/');
	}else if(args[campaign.toLowerCase()]){
		result = args[campaign.toLowerCase()];
		setCookie(campaign, result, null, '/');
	}else{
		result = getCookie(campaign);
	}
	return result;
}
function isCampaign(campaign, s_account, pagename, article){
	if (campaign == null || campaign == ""){
		return("");
	}else{
		if (article=="null"){
			return('D="'+campaign+' / "+c40+" / "+c43');
		} else {
			return('D="'+campaign+' / "+c40+" / "+c50');
		}
	}
}
function getCookie(name){
		if(name == '') return('');
		thisCookie = document.cookie;
		var start = thisCookie.indexOf(name + '=');
		if(start == -1) return('');
		var end = thisCookie.indexOf(';', start);
		if (end == -1) end = thisCookie.length;
		var cookieval = thisCookie.substring(start, end);
		var pair = cookieval.split("=");
		var value = unescape(pair[1]);
         return(value);
}
function setCookie( name, value, expireDays, path, domain, secure ) {
	if (typeof(expireDays)=="number") {
		var date = new Date();
		date.setTime(date.getTime()+(expireDays*24*60*60*1000));
	}
	document.cookie = name+'='+escape( value ) +
		( ( expireDays )  ? ';expires=' + date  : '' ) +
		( ( path )        ? ';path=' + path     : '' ) +
		( ( domain )      ? ';domain=' + domain : '' ) +
		( ( secure )      ? ';secure'           : '' );
}
function getQueryString(name){
	if (args[name]){
		return args[name];
	}else{
		return('');
	}
}
function getCiQueryString(name){
	if (getQueryString(name.toUpperCase())==''){
		return(getQueryString(name.toLowerCase()));
	}else{
		return(getQueryString(name.toUpperCase()));
	}
}
function getBrand(account,urlLocation){
	var myregex = /\.com\/(.*)/g;
	var match = myregex.exec(urlLocation);
	if (match != null) {
		var paperBrand = ""
		if (match[1].indexOf('/') == -1){
			paperBrand = match[1];
		}else{
			paperBrand = match[1].substring(0,match[1].indexOf('/'));
		}
		switch(paperBrand){
			case 'trivalleyherald':
			case 'oaklandtribune':
			case 'sanmateocountytimes':
			case 'argus':
			case 'review':
			case 'timesstar':
				return account + " " + paperBrand + "Old getBrand";
				break;
			default:
				return account + "Old getBrand";
				break;
		}
	}else{
		return account + "Old getBrand";
	}
}
function getEvents(ArticleTitle){
	var offset = getQueryString("offset");
	var thisEvent = "event1";
	if ((getQueryString("query")!="" && (offset=="" || offset=="0") && (getQueryString("breadcrumbs")=="" && getQueryString("category")=="")) || this.firstQuery){
		thisEvent = "event10" + ", " + thisEvent;
	}
	if (getQueryString("breadcrumbs")!="" || getQueryString("category")!="" || getQueryString("navMod")!=""){
		thisEvent = "event13" + ", " + thisEvent;
	}
	if ((document.referrer.indexOf("query=")!=-1 || document.referrer.indexOf("sca_template.jsp")!=-1) && (ArticleTitle!="null" && ArticleTitle!="")){
		thisEvent = "event14" + ", " + thisEvent;
	}
	if (location.href.indexOf("rPage=thankyou")!=-1){
		thisEvent = "scOpen: " + getUserID()  + ", " + thisEvent;
	}
	if (location.href.indexOf("rPage=activated")!=-1){
		thisEvent = "event9: " + getUserID()  + ", " + thisEvent;
	}
	if (thisEvent.indexOf('event10') >= 0 || thisEvent.indexOf('event13') >= 0){
		thisEvent = "event11" + ", " + thisEvent;
		thisEvent = "prodView" + ", " + thisEvent;
	}
	return(thisEvent);
}
function getArticleHelperPage(domainName, articleId, urlLocation, articleTitle){
	var result = "";
	if (urlLocation.indexOf('link_to_article.jsp') >= 0){
		result = domainName + " / Link to Article / " + articleTitle + " / " + articleId;
	}
	if (urlLocation.indexOf('print_article.jsp') >= 0){
		result = domainName + " / Print Article / " + articleTitle + " / " + articleId;
	}
	return result;
}
function getWithSlash(s){
	if (s==""){
		return("");
	}else{
		return(" / " + s);
	}
}
function getDomainName(ref){
	if (!ref) ref=document.domain;
	var PROTOCOL_SEP = "://";
	var ind = ref.indexOf(PROTOCOL_SEP);
	if (ind >= 0){
		var ref = ref.substring(ind+PROTOCOL_SEP.length);
	}
	var slashIndex = ref.indexOf("/");
	if (slashIndex >= 0){
		ref = ref.substring(0, slashIndex);
	}
	var queryIndex = ref.indexOf("?");
	if (queryIndex >= 0){
		ref = ref.substring(0, queryIndex);
	}
	var a = ref.split('.');
	return (a.length > 1)?a[a.length-2] + "." +  a[a.length-1]:ref;
}
function getBaseDomain(){
	var d = document.domain;
	var a = d.split('.');
	return (a.length > 2)?a[a.length-3] + "." + a[a.length-2] + "." +  a[a.length-1]:d;
}
function getBrand2(s_account){
	if (getDomainName() != 'insidebayarea'){
		return s_account;
	}
	var currHREF = window.location.href;
	var currSEARCH = window.location.search;
	var currBrand = '';
	if(currSEARCH.length > 0)
	   var currURL = currHREF.substring(0, currHREF.indexOf(currSEARCH));
	else
	   var currURL = currHREF;
	if(currURL.charAt(currURL.length-1) != "/")
	   currURL += "/";
	if(getCookie("BrandCookie")==null || onLanding(currURL)){
	   if(currURL.indexOf("insidebayarea.com/oaklandtribune")!= -1)
	      setCookie("BrandCookie", "oak", null, "insidebayarea.com");
	   else if(currURL.indexOf("insidebayarea.com/trivalleyherald")!=-1)
	      setCookie("BrandCookie", "tri", null, "insidebayarea.com");
	   else if(currURL.indexOf("insidebayarea.com/sanmateocountytimes")!=-1)
	      setCookie("BrandCookie", "san", null, "insidebayarea.com");
	   else if(currURL.indexOf("insidebayarea.com/argus")!=-1)
	      setCookie("BrandCookie", "arg", null, "insidebayarea.com");
	   else if(currURL.indexOf("insidebayarea.com/dailyreview")!=-1)
	      setCookie("BrandCookie", "rev", null, "insidebayarea.com");
	   else if(currURL.indexOf("insidebayarea.com/timesstar")!=-1)
	      setCookie("BrandCookie", "tim", null, "insidebayarea.com");
	   else
	      setCookie("BrandCookie", "def", null, "insidebayarea.com");
	}
	switch(getCookie("BrandCookie")){
	   case "oak":
			currBrand = s_account + ' oaklandtribune';
			break;
	   case "tri":
			currBrand = s_account + ' trivalleyherald';
			break;
	   case "san":
			currBrand = s_account + ' sanmateocountytimes';
			break;
	    case "arg":
			currBrand = s_account + ' argus';
			break;
	    case "rev":
			currBrand = s_account + ' review';
			break;
	    case "tim":
			currBrand = s_account + ' timesstar';
			break;
	    default:
			currBrand = s_account;
	}
	return currBrand;
}
function onLanding(currURL){
   var urls = new Array(7);
   var urls2 = new Array(7);
   var urls3 = new Array(7);
   var urls4 = new Array(7);
   urls   = ["http://insidebayarea.com/","http://insidebayarea.com/oaklandtribune/","http://insidebayarea.com/trivalleyherald/","http://insidebayarea.com/sanmateocountytimes/","http://insidebayarea.com/argus/","http://insidebayarea.com/dailyreview/","http://insidebayarea.com/timesstar/"];
   urls2 = ["http://www.insidebayarea.com/", "http://www.insidebayarea.com/oaklandtribune/","http://www.insidebayarea.com/trivalleyherald/","http://www.insidebayarea.com/sanmateocountytimes/","http://www.insidebayarea.com/argus/","http://www.insidebayarea.com/dailyreview/","http://www.insidebayarea.com/timesstar/"];
   urls3 = ["http://betalive.insidebayarea.com/", "http://betalive.insidebayarea.com/", "http://betalive.insidebayarea.com/oaklandtribune/","http://betalive.insidebayarea.com/trivalleyherald/","http://betalive.insidebayarea.com/sanmateocountytimes/","http://betalive.insidebayarea.com/argus/","http://betalive.insidebayarea.com/dailyreview/","http://betalive.insidebayarea.com/timesstar/"];
   urls4 = ["http://devlive.insidebayarea.com/", "http://devlive.insidebayarea.com/", "http://devlive.insidebayarea.com/oaklandtribune/","http://devlive.insidebayarea.com/trivalleyherald/","http://devlive.insidebayarea.com/sanmateocountytimes/","http://devlive.insidebayarea.com/argus/","http://devlive.insidebayarea.com/dailyreview/","http://devlive.insidebayarea.com/timesstar/"];
   urls=urls.concat(urls2, urls3, urls4);
   for(count=0; count<urls.length; count++)
   {
      if(currURL == urls[count])
      {
         return true;
      }
   }
   return false;
}
function getBrandOnChange(brand){
	var currBrandCookieVal = getCookie('currBrandCheck');
	var newBrandCookieVal = brand;
	if (currBrandCookieVal == newBrandCookieVal){
		return '';
	}else{
		setCookie('currBrandCheck', newBrandCookieVal, null, '/');
		return newBrandCookieVal;
	}
}
function tagSearchIADID(t){
		try{
			var sep = t.search?'&':'?';
			t.search = t.search+sep+'IADID=Search-'+t.hostname+'-'+location.hostname;
		}catch(e){}
}