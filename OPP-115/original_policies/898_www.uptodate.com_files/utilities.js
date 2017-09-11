
// Create UTD jquery plugin object 
(function($) {

	// Declare base UTD namespace
	$.utd = {
		domainRoot:'',
		utilities: {
			makeUrl: function(url, params) {
				var u = $$.domainRoot + url;
				if (params) {
					u = u + '?' + $.param(params);			
				}
				return u;
			} // End of makeUrl
		}
	};

	// Create shortcut ($$ == $.utd)
	window.$$ = $.utd;
	
	$(document).ready(function(){
		$$.domainRoot = location.protocol+'//'+location.hostname+(location.port?':'+location.port:'');
	});
	
})(jQuery);