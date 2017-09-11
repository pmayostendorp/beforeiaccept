if(window.PubMatic && PubMatic.Mobile && typeof PubMatic.Mobile === "object"){
	window.PubMatic_AHT = 2;//defaulting this using new method as we have new mshowad.js
	document.write('<script type="text/javascript" src="' + ( location.protocol === "https:" ?  "https:" : "http:" ) +'//ads.pubmatic.com/AdServer/js/mshowad.js"></scr'+'ipt>');
}else{
	window.PubMatic_AHT = 2;//defaulting this using new method as we have new showad.js
	document.write('<script type="text/javascript" src="' + ( location.protocol === "https:" ?  "https:" : "http:" ) +'//ads.pubmatic.com/AdServer/js/showad.js"></scr'+'ipt>');
}