
console = window.console || {};
console.log = window.console.log || function() {};

_gdomain = function() {
	var domain = document.domain;
	if(domain == null || domain == undefined || domain == "") {
		domain = "military.com";
		console.log("Can't determine domain - using 'military.com");
	} else {
		var split = domain.split(".");
		if(split.length > 1) {
			domain = split[split.length - 2] + "." + split[split.length - 1];
		} else {
			console.log("Can't determine domain - String split has a length less than 2");
			domain = "military.com";
		}
	}
	console.log("Setting domain to " + domain);
	return domain;
};

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-45553901-1']);
_gaq.push(['_setDomainName', _gdomain()]);
_gaq.push(['_setAllowLinker', true]);
_gaq.push(['_trackPageview']);

jQuery(document).ready(function() {
	try {
		var ga = document.createElement('script'); 
		ga.type = 'text/javascript'; 
		ga.async = true; 
		ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js'; 		
		var s = document.getElementsByTagName('script')[0]; 
		s.parentNode.insertBefore(ga, s);
	} catch(e) {
		console.log("Can't load google analytics", e);
	}
});