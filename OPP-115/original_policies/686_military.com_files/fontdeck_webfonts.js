/*
 * This JS file is for use of the fontdeck's DINMittelschriftStd web font. 
 */


WebFontConfig = { fontdeck: { id: '35500' } };
 
(function() {
    var wf = document.createElement('script');
	wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
	'://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
	wf.type = 'text/javascript';
	wf.async = 'true';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(wf, s);
})();
