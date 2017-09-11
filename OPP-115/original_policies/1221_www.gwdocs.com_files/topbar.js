/*
 * 	Easy Notification - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com
 *
 *	Copyright (c) 2011 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

jQuery.easyNotification = function (options) {

    var defaults = {	
		id: 'easyNotification',
		text: 'Notification!',		
		parent: 'body',
		prepend: true,		
		sibling: '',
		before: true,
		closeClassName: 'close',
		closeText: '<b>CLOSE</b> X',
		cookieEnable: false,
		cookieName: 'notification',
		cookieValue: 'alert',
		cookieDays: 30,		
		delay: 0,
		autoClose: false,
		duration: 5000,
		callback: function(){}
	}; 
	if(typeof options == 'string') defaults.text = options;
	var options = jQuery.extend(defaults, options); 
	
	var obj, timeout;
	
	function setCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	};
	
	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	};
	
	function deleteCookie(name) {
		setCookie(name,"",-1);
	};	
	
	function checkCookie(){
		var cookieExist = false;
		if(options.cookieEnable){
			var cookie = getCookie(options.cookieName);
			if (cookie == options.cookieValue) cookieExist = true;
		};
		return cookieExist;
	};
	
	function hide(){
		$(obj).slideUp('fast');
		if(options.cookieEnable) setCookie(options.cookieName,options.cookieValue,options.cookieDays);
		options.callback();	
		clearTimeout(timeout);
	}
	
	function show(){
		
		$('#'+ options.id).remove();
		clearTimeout(timeout);
		obj = $('<div id="'+ options.id +'">'+ options.text +'</div>');
		$('<span class="'+ options.closeClassName +'">'+ options.closeText +'</span>')
			.click(function(){hide();})
			.appendTo(obj);
		if(options.sibling != ''){
			if(options.before) {
				$(obj).hide().insertBefore(options.sibling).fadeIn('fast');
			} else {
				$(obj).hide().insertAfter(options.sibling).fadeIn('fast');
			};	
		} else {
			if(options.prepend) {
				$(obj).hide().prependTo(options.parent).fadeIn('fast');
			} else {
				$(obj).hide().appendTo(options.parent).fadeIn('fast');
			};				
		}
		if (options.autoClose) timeout = setTimeout(hide,options.duration);
	};
	
	if (!checkCookie()) timeout = setTimeout(show,options.delay);
	
};