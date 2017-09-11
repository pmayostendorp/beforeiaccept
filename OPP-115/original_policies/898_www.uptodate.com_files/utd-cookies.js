/**
 * UTD session state cookie script
 */

(function ($) {

// redirect user if coming in from app in a lang different than Drupal and exists in that lang 
function determineRedirect(language,cms_lang,enabled_lang_keys,cms_url_aliases,incoming_page_name) {
	var pn = location.pathname;
	var lang_path = "/" + language;
	var home_index = pn.indexOf("/home");

	if (home_index == -1){
		pn = "/";
	} else {
		pn = pn.substr(home_index);
	}

	if (language === 'en' && cms_lang !== 'en' && ($.inArray(language, enabled_lang_keys) !== -1) && (cms_url_aliases.indexOf(incoming_page_name) !== -1)) {
			window.location = pn;
	}

	if (language === 'es' && cms_lang !== 'es' && ($.inArray(language, enabled_lang_keys) !== -1) && (cms_url_aliases.indexOf(incoming_page_name) !== -1)) {
			if (pn ===  "/") {
				pn = "";
			}
			window.location = '/es' + pn;
	}
	
	if (language === 'pt' && cms_lang !== 'pt' && ($.inArray(language, enabled_lang_keys) !== -1) && (cms_url_aliases.indexOf(incoming_page_name) !== -1)) {
			if (pn ===  "/") {
				pn = "";
			}
			window.location = '/pt' + pn;
	}
	
	if (language === 'ja' && cms_lang !== 'ja' && ($.inArray(language, enabled_lang_keys) !== -1) && (cms_url_aliases.indexOf(incoming_page_name) !== -1)) {
			if (pn ===  "/") {
				pn = "";
			}
			window.location = '/ja' + pn;
	}

	if (language === 'de' && cms_lang !== 'de' && ($.inArray(language, enabled_lang_keys) !== -1) && (cms_url_aliases.indexOf(incoming_page_name) !== -1)) {
			if (pn ===  "/") {
				pn = "";
			}
			window.location = '/de' + pn;
	}

}

$(document).ready(function() {

// support for indexOf in IE<9 
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
		"use strict";
		if (this == null) {
				throw new TypeError();
		}
		var t = Object(this);
		var len = t.length >>> 0;
		if (len === 0) {
				return -1;
		}
		var n = 0;
		if (arguments.length > 1) {
				n = Number(arguments[1]);
				if (n != n) { // shortcut for verifying if it's NaN
						n = 0;
				} else if (n != 0 && n != Infinity && n != -Infinity) {
						n = (n > 0 || -1) * Math.floor(Math.abs(n));
				}
		}
		if (n >= len) {
				return -1;
		}
		var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
		for (; k < len; k++) {
				if (k in t && t[k] === searchElement) {
						return k;
				}
		}
		return -1;
	}
}


// take inactive langauges out of lang switcher
var domain_url = document.domain;
var cms_url = ['www.uptodate.com','stage0.utd.com','www.qa.utd.com','qawww.uptodate.com','www.pmt.utd.com','pmtwww.uptodate.com'];
if (cms_url.indexOf(domain_url) !== -1) {
	//$('#edit-lang-dropdown-select > option[value*="de"]').remove();
	//$('#edit-lang-dropdown-select > option[value*="fr"]').remove();
}


// if user changes lang in drupal alert the app
$("#edit-lang-dropdown-select").change(function() {
	var selected_lang = $(this).val();
	$.ajax({    
		type:'Get',
		url:'/services/Localization?requestType=setlocale&language='+selected_lang+'&country=&refreshDrupalStateCookie=true',
		async: false
	});
});


// read userName cookie
function getCookie(w){
	cName = "";
	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++){
		NmeVal  = new Array();
		NmeVal  = pCOOKIES[bb].split('=');
		if(NmeVal[0] == w){
			cName = unescape(NmeVal[1]);
		}
	}
	return cName;
}

loggedInUser = getCookie('userName');


// get current Drupal language
var cms_lang = Drupal.settings.cms_language;


// get all enabled Drupal languages
var cms_lang_all = Drupal.settings.cms_language_all;


// create array of enabled language keys
var enabled_lang_keys = [];
for(key in cms_lang_all) {
	enabled_lang_keys.push(key);
}


// get all language url aliases except und and en
var cms_url_aliases = JSON.stringify(Drupal.settings.localized_url_aliases);


// drupalstate cookie vars
var loginText, localizedLoginText, loginState, supportTag, licensee, licenseOrTermsUrl, countryCode, language, appCookieExists, anchorText,  jpmessage;


// read drupalstate cookie
var drupalstate = $.jCookies({ get : 'DRUPAL_SESSION_STATE'});


// if drupalstate does not exist send web service to force cookie creation 
if (!drupalstate) {
$.ajax({    
	type:'Get',
	url:'/services/Localization?requestType=setlocale&language='+cms_lang+'&country=&refreshDrupalStateCookie=true',
	async: false
	});

// read drupalstate cookie
drupalstate = $.jCookies({ get : 'DRUPAL_SESSION_STATE'});
}


// if cookie doesn't exist or has no value set placeholders in vars
if (!drupalstate || drupalstate.loginText === undefined) {
		if (cms_lang === 'es') {
			loginText = 'Iniciar sesión';
		}
		else if (cms_lang === 'pt') {
			loginText = 'Entrar';
		} 
		else if (cms_lang === 'ja') {
			loginText = 'ログイン';
		}
		else if (cms_lang === 'de') {
			loginText = 'Anmelden';
		} 
		else {
			loginText = 'Log In';
		}
	localizedLoginText = 'Log In';
	loginState = 'LOGIN';
	licensee = 'UpToDate Marketing Professional';
	supportTag = 'CMS';
	licenseOrTermsUrl = '/home/terms-use';
	anchorText = 'Terms of Use';
	language = cms_lang;
} else {
	loginText = drupalstate.loginText;

		/* remove below as each language releases */

		// force english until FR launch ** change to if when it's first in condition
		if (drupalstate.language === 'fr' && loginState !== 'LOGOUT') {
			localizedLoginText = 'Log In';
		}
		else if (drupalstate.language === 'fr' && loginState === 'LOGOUT') {
			localizedLoginText = 'Log Out';	
		}

		else {
			localizedLoginText = decodeURIComponent(escape(drupalstate.localizedLoginText));
		}
	/* after all langs are released uncomment this line */
	//localizedLoginText = decodeURIComponent(escape(drupalstate.localizedLoginText));	

	loginState = drupalstate.loginState;
	licensee = decodeURIComponent(escape(drupalstate.licensee));
	supportTag = drupalstate.supportTag;
	licenseOrTermsUrl = drupalstate.licenseOrTermsUrl;
		if (licenseOrTermsUrl === '/contents/license') {
			anchorText = 'Subscription and License Agreement';
		} else {
			anchorText = 'Terms of Use';
		}
	countryCode = drupalstate.countryCode;
	language = drupalstate.language;
	appCookieExists = true;
	jpmessage = 'Windows XP users running Internet Explorer version 8.0 or earlier must have the appropriate language pack installed in order to display Japanese characters correctly. If this page is not displaying correctly, we recommend using an <a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">alternate browser</a>.';
}


// grab the path from incoming App page request and trim to "pagename". 
var incoming_page_name = location.pathname.split('/').slice(-1)[0];


// append footer information
$(".footer-licensee").append("Licensed to: " + "<strong>" + licensee + "</strong>");
$(".footer-support-tag").append("Support Tag: " + supportTag);
$(".footer-terms-url").append("<a href="+ licenseOrTermsUrl +">" + anchorText + "</a>");


// hide the login block on homepage if logged in
if(loginState === 'LOGOUT'){
	$(".homepage-login-box").hide();
}


// when LRB show dont have credentials
if (loginState === 'LOGIN_OR_REGISTER') {
	if (language === 'es' && cms_lang === 'es') {
		$(".lrbcred").append("<a href='/login-register'>¿No tiene datos de acceso?</a>");
	}

	else if (language === 'pt' && cms_lang === 'pt') {
		$(".lrbcred").append("<a href='/login-register'>Você não tem referências?</a>");
	} 

	else if (language === 'ja' && cms_lang === 'ja') {
		$(".lrbcred").append("<a href='/login-register'>資格を持っていないのですか？</a>");
	}

	else if (language === 'de' && cms_lang === 'de') {
		$(".lrbcred").append("<a href='/login-register'>Sie haben keine Anmeldeinformationen?</a>");
	}

/*
	// hide until FR release
	else if (language === 'fr' && cms_lang === 'fr') {
		$(".lrbcred").append("<a href='/login-register'>some french text goes here</a>");
	}	 
*/

	else {
		$(".lrbcred").append("<a href='/login-register'>Don't have credentials?</a>");
	}
}


// user selected remember password on login form.
if (loggedInUser !== '') {
	var loggedInUser1 = loggedInUser.replace(/"/g,""); //strip quotes
	$(".user-name").attr("value", loggedInUser1);
	$(".remember-name").attr('checked','checked');
}


// hide jp message if user is in Japan and browser is lt ie9
if ($.browser.msie && $.browser.version < 9) {
	if (countryCode === 'JP') {
		$(".jp-message").hide();
			} else {
		$(".jp-message").append(jpmessage).show(); 
	}
}

determineRedirect(language,cms_lang,enabled_lang_keys,cms_url_aliases,incoming_page_name);

// prefix lang prefix to policies page links - fix with node web service parameter in future
if (cms_lang === 'es' && incoming_page_name === 'policies') {
	$('.utdRest a').each(function() {
		$(this).attr("href", function(index, old) {
			return old.replace("home","es/home");
		});
	});
}

if (cms_lang === 'pt' && incoming_page_name === 'policies') {
	$('.utdRest a').each(function() {
		$(this).attr("href", function(index, old) {
			return old.replace("home","pt/home");
		});
	});
}

if (cms_lang === 'ja' && incoming_page_name === 'policies') {
	$('.utdRest a').each(function() {
		$(this).attr("href", function(index, old) {
			return old.replace("home","ja/home");
		});
	});
}

if (cms_lang === 'de' && incoming_page_name === 'policies') {
	$('.utdRest a').each(function() {
		$(this).attr("href", function(index, old) {
			return old.replace("home","de/home");
		});
	});
}

/*
// hide until FR release
if (cms_lang === 'fr' && incoming_page_name === 'policies') {
	$('.utdRest a').each(function() {
		$(this).attr("href", function(index, old) {
			return old.replace("home","fr/home");
		});
	});
}
*/


// append login tab with appropriate login text
if (($.inArray(language, enabled_lang_keys) !== -1) && (cms_url_aliases.indexOf(incoming_page_name) !== -1) && appCookieExists) {
	$("#login-link").append(localizedLoginText);
} else {
	$("#login-link").append(loginText);
}


// override lang prefix - relative links in drupal not inside a node will prefix lang code while in a lang other than 'en'.
$(".lang-store-path").attr("href","/store");


// views don't have a nid can't query from DB they also only exist in EN, so remove JA, ES, PT, DE, FR etc from select
var cms_views = ['uptodate-leadership', 'events', 'patient-stories', 'doctors-prescribe-uptodate'];
if (cms_views.indexOf(incoming_page_name) !== -1) {
	$('#edit-lang-dropdown-select > option[value*="ja"]').remove();
	$('#edit-lang-dropdown-select > option[value*="es"]').remove();
	$('#edit-lang-dropdown-select > option[value*="pt"]').remove();
	$('#edit-lang-dropdown-select > option[value*="de"]').remove();
}


// if 404 overide #login-link with localized login text and hide lang dropdown (cover up bug in drupal lang switcher)
$.ajax({
	statusCode: {
		404: function() {
		if (cms_lang !== 'en' && appCookieExists) {
			$("#login-link").html(localizedLoginText);
			$('#edit-lang-dropdown-select').attr('disabled', 'disabled');
			}
		else if (!appCookieExists) {
			$("#login-link").html(loginText);
			$('#edit-lang-dropdown-select').attr('disabled', 'disabled');
			}
		}
	}
});


});

})(jQuery);
