var memberId='1134';
var osANSegCode='146_0_user,146_851_user,146_934_user';
var osANConvCode='146_0_click_conversion';
var osANPageViewConvCode='146_0_click_conversion_page_view';
var osANUeConvPxCode='146_0_click_conversion_user_engagement';
var osANUeConvSegCode='146_0_user_engaged_user,146_851_user_engaged_user,146_934_user_engaged_user';
var osOSCampaignIds=['851','934'];
var gaId='UA-35809374-45';
var gaDomain="";
if (typeof osDebug === 'undefined') {
    var osDebug=false;
}

function osRunCustomScript(osJq){
}

if(window.location.href.indexOf("fls.doubleclick.net") > 0 && window.location.href.indexOf("~oref") > 0){
	// grab the oref param from the dfa url
    var regex = new RegExp("[;]~oref=([^;\?#]*)"),results = regex.exec(location.href);
    var oref = decodeURIComponent(results[1].replace(/\+/g, " "));
	(function() {
		var osiframe = document.createElement('iframe');
		osiframe.src = ('https:' == document.location.protocol ? 
				'https://' : 'http://') + 'd3xl0zyjyljwa.cloudfront.net/px/os-iframe.html?accountid=146&campaignid=0&osourl='+encodeURIComponent(oref);
		osiframe.height=0;
		osiframe.width=0;	
		osiframe.style="display: none; visibility: hidden;";	
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(osiframe, s);
	})();
}else{
	(function() {
		var osuelib = document.createElement('script'); osuelib.type = 'text/javascript'; osuelib.async = true;
		osuelib.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'd3xl0zyjyljwa.cloudfront.net/px/os-ue-lib-1.1.1.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(osuelib, s);
	})();
}
