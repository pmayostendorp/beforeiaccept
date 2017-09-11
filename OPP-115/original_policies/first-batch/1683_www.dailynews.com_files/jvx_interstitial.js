var jvxNS = {};

jvxNS.loadFile = function(filePath,fileType,nodeId){
	var headID = document.getElementsByTagName("head")[0];
	if(fileType == "js"){
		var fileElem = document.createElement('script');
		fileElem.id = nodeId;
		fileElem.type = 'text/javascript';
		fileElem.src = filePath;
	}else if(fileType == "css"){
		var fileElem = document.createElement('link');
		fileElem.id = nodeId;
		fileElem.type = 'text/css';
		fileElem.rel = 'stylesheet';
		fileElem.href = filePath;
	}
	headID.appendChild(fileElem);
}

jvxNS.getInterstitial = function(jsonObj){

	if(typeof jsonObj === 'undefined') return;

	if(typeof jQuery == 'undefined'){
		jvxNS.loadFile('http://code.jquery.com/jquery-1.8.2.js','js','jvxJquery1.8.2');
		setTimeout(function(){jvxNS.getInterstitial(jsonObj);},1000);
		return;
	}
	
	jvxNS.loadFile('http://code.jquery.com/ui/1.8.23/jquery-ui.min.js','js','jvxJqueryUIMIN');

	if(typeof jQuery.ui == 'undefined'){

		setTimeout(function(){jvxNS.getInterstitial(jsonObj);},1000);
		return;
	}









	jvxNS.loadFile('http://code.jquery.com/ui/1.8.23/themes/base/jquery-ui.css','css','jvxJqueryUICSS');

	var serverName = jsonObj['serverName'] == undefined ? 'http://as.jivox.com' : jsonObj['serverName'];
	var urlParams = jsonObj['urlParams'] == undefined ? '' : jsonObj['urlParams'];
	var interstitialWidth = jsonObj['width'] == undefined ? '810' : jsonObj['width'];
	var interstitialHeight = jsonObj['height'] == undefined ? '550' : jsonObj['height'];
	var interstitialURL = jsonObj['url'] == undefined ? serverName + '/player/expandedUnit.php?' + urlParams : jsonObj['url'];
	var modalCloseText = jsonObj['modalCloseText'] == undefined ? '' : jsonObj['modalCloseText'];
	var modalOpacity = jsonObj['modalOpacity'] == undefined ? 0.7 : (jsonObj['modalOpacity']/10);
	var modalBgColor = jsonObj['modalBgColor'] == undefined ? '#000000' : (jsonObj['modalBgColor']);
	var modalDialogPadding = jsonObj['modalDialogPadding'] == undefined ? '0.2em' : (jsonObj['modalDialogPadding']);


	$("<style type='text/css' id='jvxCustomStyle'>.jvxInterstitial{z-index:6000001 !important;width:"+interstitialWidth+"px !important;}.ui-dialog iframe{width:"+ interstitialWidth +"px !important;}</style>").appendTo("head");

	setTimeout(function(){	


	$('<iframe src="'+interstitialURL+'" width="'+interstitialWidth+'" height="'+interstitialHeight+'" scrolling="no" frameborder="0" marginwidth="0" marginheight="0"></iframe>').dialog({
        title: 'Advertisement',
	  autoOpen : true,
        width: interstitialWidth,
        height: interstitialHeight,
        modal: true,
        resizable: false,
        autoResize: true,
		dialogClass: 'jvxInterstitial',
		closeText: modalCloseText,
		close: function(event, ui) {$(this).dialog('destroy').remove();$('#jvxJqueryUICSS,#jvxCustomStyle').remove();}
    }).width(interstitialWidth).height(interstitialHeight).css("padding","0px");

	if(modalCloseText != ''){
		$closeBtnContainer = $('div.jvxInterstitial a.ui-dialog-titlebar-close').removeClass('ui-dialog-titlebar-close').addClass('custom-ui-dialog-titlebar-close');

		$('div.jvxInterstitial span.ui-icon').removeClass('ui-icon').addClass('custom-ui-icon');
		$('div.jvxInterstitial span.ui-icon-closethick').removeClass('ui-icon-closethick').addClass('custom-ui-icon-closethick');

		$closeBtnContainer.css({'float':'right', 'margin':'0.1em 5px 0.1em 0', 'padding':'2px'});
	}

	$('div.ui-widget-overlay').css({'opacity':modalOpacity,'background':'none #000000', 'background-color':modalBgColor});
	$('.ui-dialog').css({'padding':modalDialogPadding});
	},1000);



}






