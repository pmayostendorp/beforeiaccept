
var version="js2.1";
var s="www.msgapp.com";
var p=location.protocol.indexOf('https')>-1?'https://':'http://';
var u="/web.gif";
var U=p+s+u;

function Get_Cookie( check_name ) {
	// first we'll split this cookie up into name/value pairs
	// note: document.cookie only returns name=value, not the other components
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; // set boolean t/f default f

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		// now we'll split apart each name=value pair
		a_temp_cookie = a_all_cookies[i].split( '=' );


		// and trim left/right whitespace while we're at it
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		// if the extracted name matches passed check_name
		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			// we need to handle case where cookie has no value but exists (no = sign, that is):
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}
			// note that in cases where cookie is initialized but no value, null is returned
			return cookie_value;
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}
}

function PrefixChar(strValue, strCharPrefix, intLength) {
	var intStrValue_length = String(strValue).length;
	if (intStrValue_length < intLength) {
		for (var intI=0; intI<(intLength-intStrValue_length); ++intI) {
			strValue = strCharPrefix + strValue;
		}
	}
	return strValue;
}

function tzs() {
	var d = new Date();

	var tz=d.getTimezoneOffset();
	var tzs=(tz > 0 ? "-" : "+")
	var tzh=Math.floor(Math.abs(tz) / 60);
	var tzm=Math.abs(tzh - (Math.abs(tz) / 60)) * 60;
	var tzs="UTC" + tzs + PrefixChar(tzh, "0", 2) + PrefixChar(tzm, "0", 2);

	return tzs;
}

function hem() {

	var now = new Date();
	var fynow	= now.getFullYear();
	var tzst = tzs();

	var objOutput = [];
	var intO = 0;

	var om1 = new Date("1 Jan " + fynow + " 00:00:00 " + tzst);
	var om7 = new Date("1 Jul " + fynow + " 00:00:00 " + tzst);


   var m1=om1.getTimezoneOffset();
   var m7=om7.getTimezoneOffset();
   var h	= "E";

   if (m1 != m7) {
      h = m1 > m7 ? "N" : "S";
   }
   return h;
}

function X(Y, Z){
  Z=(typeof(Z)!="undefined"?Z:"");
  U+="&"+Y+"="+escape(Z);
}

function frt(cid){

 var jsv="1.3";
 U=U+"?";

 X("v",version);
 X("cid", cid);
 X("cke", Get_Cookie('civicAllowCookies'));
 X("u",document.URL);
 X("t",document.title);
 X("l",navigator.language);
 X("je", navigator.javaEnabled()); 
 X("re", screen.width + "x" + screen.height); 
 X("cd", screen.colorDepth);
 X("pd", screen.pixelDepth); 
 X("os", navigator.platform); 
 X("ua", navigator.userAgent); 
 X("ref", window.document.referrer);  
 X("h", hem());
 X("tz", tzs()); 
 X("jsv", jsv); 

  if( U.length>2048 && navigator.userAgent.indexOf('MSIE')>=0){
 	U = U.substring( 0, 2043)+"&cut=1";

 }
    var i = document.createElement("img");
    i.src = U;

}     



