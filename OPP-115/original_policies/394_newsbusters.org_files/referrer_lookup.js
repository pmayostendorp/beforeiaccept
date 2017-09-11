//Return browser key value

var this_agent = "NA";

function getBrowser(str){
	if(!(str)) { // checks if value exists, if it doesn't it does now
		this_agent = "NA"
	}
	if (str.indexOf("U;")>0) {
		this_agent = "Safari";
		}
	if (str.indexOf("MSIE")>0) {
		this_agent = "IEold";
	}
	if ((str.indexOf("Trident")>0) & (str.indexOf("MSIE")<0)) {
		this_agent = "IEnew";
	}
	if (str.indexOf("Chrome")>0) {
		this_agent = "Chrome";
	}
	if (str.indexOf("Firefox")>0) {
		this_agent = "Firefox";
	}
	if (str.indexOf("BlackBerry")>0) {
		this_agent = "BlackBerry";
	} 
	if (str.indexOf("Android")>0) {
		this_agent = "Android";
	}
	if (str.indexOf("iPad")>0) {
		this_agent = "iPad";
	}
	if (str.indexOf("iPhone")>0) {
		this_agent = "iPhone";
	}
	if (str.indexOf("Opera")>0) {
		this_agent = "Opera";
	}
	return this_agent;
}

function getDomain(str){
var this_referrer=String(document.location);
if(window.parent!=window&&document.referrer)
{this_referrer=String(document.referrer)}
this_referrer = this_referrer.replace(/(\/\/[^\/]+\/).*/,'$1');
this_referrer = this_referrer.replace("http://","");
this_referrer = this_referrer.replace("\/","");
if (this_referrer.length > 35)
{this_referrer = this_referrer.substr(0, 35)}
return this_referrer;
}

function getEscapeURL(str){
var this_referrer=String(document.location);
if(window.parent!=window&&document.referrer)
{this_referrer=String(document.referrer)}
this_referrer = escape(this_referrer);
if (this_referrer.length > 35) 
{this_referrer = this_referrer.substr(0, 35)}
return this_referrer;
}

function getScrWidth(){
var this_width =String(window.innerWidth);
return this_width;
}

function getScrHeight(){
var this_height =String(window.innerHeight);
return this_height;
}
