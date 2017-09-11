// JavaScript Document
//JQuery Plugin for Overlay
$(document).ready(function() {
	$("a.overlay").fancybox({
		overlayOpacity: 0.8,
		overlayColor: '#333'
	});	
	
	$("a.rules").fancybox({
	  overlayOpacity:	0.8,
	  overlayColor: '#333',
	  width : '75%',
	  height : '75%',
	  autoScale : false,
	  type : 'iframe'
	});	
	
	$(".contestrules").fancybox({
	  overlayOpacity:	0.8,
	  overlayColor: '#333',
	  width : '75%',
	  height : '75%',
	  autoScale : false,
	  type : 'iframe'
	});	
	
	  $("a.mapoverlay").fancybox({
	  maxWidth 		: 799,
	  maxHeight		: 629,
	  minWidth 		: 799,
	  minHeight		: 629,
	  overlayOpacity: 0.8,
	  overlayColor	: '#333',
	  width			: '940',
	  height 		: '735',
	  type 			: 'iframe'
	});	
	
	$(".youtubeoverlay").fancybox({
		maxWidth	: 610,
		maxHeight	: 385,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none',
		type : 'iframe'
	});
	
	$("a.iframeOverlay").fancybox({
		hideOnContentClick	: true,
		overlayOpacity		: 0.8,
		overlayColor		: '#333',
		width				: 520,
        autoScale			: true,
        transitionIn		: 'none',
		transitionOut		: 'none',
		type				: 'iframe'
	});
});