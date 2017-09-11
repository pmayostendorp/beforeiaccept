/**
 * UTD login panel
 */

(function ($) {

$(document).ready(function(){  
	$(".ssl-url").attr("action","https://" + location.host + "/login");
	$(".ssl-url-athens").attr("href","https://" + location.host + "/athens.jsp");

	// override lang prefix - relative links in drupal that are not inside a node (ie. interface, blocks) will 
	// automatically prefix with lang code while in a language other than 'en' and breaks relative path links.
	$(".lang-reset-pw").attr("href","/account/reset-password");

	// fix IE password placeholder showing dots
	$("input[placeholder]").placeholder();

// get cookie value for loginState
var drupalstate = $.jCookies({ get : 'DRUPAL_SESSION_STATE'});
if (!drupalstate || drupalstate.loginText === undefined) {
	loginState = 'LOGIN';
} else {
	loginState = drupalstate.loginState;
}

if (loginState !== 'LOGOUT') {
	$("#login-link").click(function(e){  
		if ($(".login-panel").hasClass("closed")) {
			$(".login-panel").slideToggle(400, function() { $(this).show() }).removeClass("closed");
			e.stopPropagation();
		}
	});
} else {
	$("a[href='#']").attr('href', '/logout');
}  

});

$(document).keydown(function(e) {  
	if (e.keyCode == 27) {  
		$(".login-panel").hide(0);
	}  
});  

$(document).click(function(e){	
	if (!$(e.target).is(".login-panel *")) {    
		if (!$(".login-panel").hasClass("closed")) { 
			$(".login-panel").hide(0).addClass("closed");
		}
	}  
});

})(jQuery);
