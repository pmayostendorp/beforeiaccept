function gup( name ){  
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
	var regexS = "[\\?&]"+name+"=([^&#]*)";  
	var regex = new RegExp( regexS );  
	var results = regex.exec( window.location.href );  
	if( results == null )    
		return "";  
	else    
		return results[1];
}

var OAS_fulltext_searchterm = gup( 'fulltext' );
var OAS_url = 'http://oascentral.sciencemag.org/RealMedia/ads/';
//var OAS_url = 'http://www.sciencemag.org:4040/RealMedia/ads/';
//var OAS_listpos = 'Top,Right1,Right2';
var OAS_listpos = (typeof(OAS_listpos) != 'undefined') ? (OAS_listpos) : 'Top,Right1,Right2';
var OAS_cc_var = (typeof(OAS_country_code) != 'undefined') ? ('tw_country_code=' + OAS_country_code + '&amp;') : '';
var OAS_usr_var = (typeof(OAS_usertype) != 'undefined') ? ('hw_user_type=' + OAS_usertype + '&amp;') : '';
var OAS_tax_var = (typeof(OAS_taxonomy) != 'undefined') ? (OAS_taxonomy + '&amp;') : '';
var OAS_display_ad_var = (typeof(OAS_display_ad) != 'undefined') ? (OAS_display_ad + '&amp;') : '';
var OAS_pagetype_var = (typeof(OAS_pagetype) != 'undefined') ? (OAS_pagetype + '&amp;') : '';
var OAS_demo_var = (typeof(OAS_demo_val) != 'undefined') ? (cleanupDemoVal(OAS_demo_val)) : '';
var OAS_query = OAS_cc_var + OAS_usr_var + OAS_tax_var + OAS_display_ad_var + 'XE&amp;' + OAS_tax_var + OAS_display_ad_var + OAS_pagetype_var + OAS_rdl + OAS_demo_var + '&amp;if_nt_CookieAccept=' + OAS_CA + '&amp;fulltext=' + OAS_fulltext_searchterm + '&amp;XE' + '&amp;fulltext=' + OAS_fulltext_searchterm;
var OAS_target = '_top';
var OAS_version = 10;
var OAS_rn = '001234567890'; OAS_rns = '1234567890';
var OAS_rn = new String (Math.random()); 
var OAS_rns = OAS_rn.substring (2, 11);

var href = document.location.href;
var path = (href.indexOf('?') > 0)?href.substring(href.indexOf('/',7)+1, href.indexOf('?')):href.substring(href.indexOf('/',7)+1, href.length);
/* trim the ending '/' */
path = (path.charAt(path.length-1) == '/')?path.substring(0, path.length-1):path;
var has_param = (href.indexOf('?') > 0)?'true':'false';

function OAS_NORMAL(pos) {
    document.write('<a href="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" target=' + OAS_target + '><img src="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + '?' + OAS_query + '" border="0" \/><\/a>');
}
			
OAS_version = 11;

if ((navigator.userAgent.indexOf('Mozilla/3') != -1) || (navigator.userAgent.indexOf('Mozilla/4.0 WebTV') != -1))
	OAS_version = 10;

if (OAS_version >= 11)
	document.write('<scr' + 'ipt type="text/javascript" language="JavaScript1.1" src="' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '?' + OAS_query + '"><\/script>');

document.write('');

function OAS_AD(pos) {
	if (OAS_version >= 11)
		OAS_RICH(pos);
	else
		OAS_NORMAL(pos);
	//alert (OAS_query);
	var debug_var = 'src=' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '?' + OAS_query;
	//alert (debug_var);
}

function cleanupDemoVal(demoCkVal) {
	var retVal = '';
	if ((demoCkVal != null) && (demoCkVal.length > 0)) {
		var allVals = demoCkVal.replace(/|(.*)|/,'$1');
		if (allVals.length > 0) {
			var valArr = allVals.split('|');
			for (var i = 0; i < allVals.length; i++) {
				if (/.+=.+/.test(valArr[i])) {
					retVal += ('&amp;' + valArr[i]);
				}
			}
		}
	}
	return retVal;
}
