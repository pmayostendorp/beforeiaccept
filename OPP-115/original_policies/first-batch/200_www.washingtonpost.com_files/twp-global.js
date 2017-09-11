(function() {	
	var isSSL = (window.location.protocol.indexOf('https')) < 0?false:true;
	var wpostServerSsl = 'https://js.washingtonpost.com/wpost';
	TWP = window.TWP || {};
	TWP.base = TWP.base || 'https://js.washingtonpost.com';
	TWP.wpostCssBase = TWP.wpostCssBase || 'https://css.washingtonpost.com';
	TWP.wpostJsBase = TWP.wpostJsBase || 'https://js.washingtonpost.com';
	TWP.wpostJsBaseSsl = TWP.wpostJsBaseSsl || 'https://js.washingtonpost.com';	
	TWP.jsCacheBuster = TWP.jsCacheBuster || '20150520163000';
	TWP.cssCacheBuster = TWP.cssCacheBuster || '20150701150800';
	TWP.ScriptLoader = TWP.ScriptLoader || {};
	TWP.ScriptLoader.completeEvents = TWP.ScriptLoader.completeEvents || [];
	var hscriptArray = [];
	window.head_conf  = {head: "TWPHead"};
	 
		
	var startEvent = '';
	var completeEvent = 'GlobalComplete';	
	
	var jsList = '';
	
				jsList = jsList + '|<script type="text/javascript" src="https://js.washingtonpost.com/wpost/js/combo?token=20150520163000&c=true&m=true&context=eidos&r=/conf.js&r=/actmgmt/acctmgmt_common.js&r=/plugin/plugin.jquery.cookie-1.0.0.js"></script>';			
	
				jsList = jsList + '|<script type="text/cjs" data-cjssrc="https://js.washingtonpost.com/wpost/js/combo?token=20150520163000&c=true&m=true&context=eidos&r=/static-methods-1.0.0.js"></script>';			
	
				jsList = jsList + '|<script type="text/javascript" src="https://js.washingtonpost.com/wpost/js/combo?token=20150520163000&c=true&m=true&context=eidos&r=/plugin/plugin.jquery.tools.overlay.1.2.7mod.js&r=/plugin/plugin.jquery.tools.overlay.apple.js&r=/plugin/plugin.jquery.tools.toolbox.expose.js"></script>';			
	
				jsList = jsList + '|<script type="text/javascript" src="https://js.washingtonpost.com/wpost/js/combo?token=20150520163000&c=true&m=true&context=eidos&r=/util/util-user-2.0.0.js&r=/util/util.identity-management-1.1.0.js"></script>';			
	
				jsList = jsList + '|<script type="text/cjs" data-cjssrc="//js.washingtonpost.com/wp-stat/analytics/main.js"></script>';			
	
				jsList = jsList + '|<script type="text/cjs" data-cjssrc="https://js.washingtonpost.com/wpost/js/combo?token=20150520163000&c=true&m=true&context=eidos&r=/marketing/identity-retargeting.js"></script>';			
	
				jsList = jsList + '|<script type="text/javascript" src="https://js.washingtonpost.com/wpost/js/combo?token=20150520163000&c=true&m=true&context=eidos&r=/wapo/wapo_sites.js&r=/wapo/wapolabs.nojq.full.js&r=/wapo/prod/wapo_identity_full.js"></script>';			
			
	
	var cssList = '';
	
				cssList = cssList + '|<link rel="stylesheet" type="text/css" href="https://css.washingtonpost.com/wpost/css/combo?token=20150701150800&inttoken=201510130600&c=true&m=true&context=eidos&r=/2.0.0/modal.css" />';
	
	if (typeof jQuery == 'undefined'){
		
		var jsJQuery = '|<script type="text/cjs" data-cjssrc="https://js.washingtonpost.com/wpost/js/combo?token=20150520163000&c=true&m=true&context=eidos&r=/jquery-1.7.1.js"></script>';				
		hscriptArray.push(jsJQuery.substring(jsJQuery.indexOf('src="')+5,jsJQuery.indexOf('"></script>')));
	}
			
	
	var tmpArray = cssList.split('|');
	for (i=0;i<tmpArray.length;i++){
		var tmpFile = tmpArray[i].substring(tmpArray[i].indexOf('href="')+6,tmpArray[i].lastIndexOf('/>')).replace(/[" >]/g,'');
		if (tmpFile != ''){
			hscriptArray.push(tmpFile);
		};
	}	

	
	tmpArray = jsList.split('|');
	for (i=0;i<tmpArray.length;i++){
		var scriptSrc = tmpArray[i].substring(tmpArray[i].indexOf('src="')+5,tmpArray[i].indexOf('"></script>'));
		if (scriptSrc != ''){
			hscriptArray.push(scriptSrc);
		};	
	}

	

	var _load = function (hscriptArray,startEvent,completeEvent){
		if (typeof startEvent != 'undefined' && startEvent != ''){
			if (jQuery.inArray( 'onTwp' + startEvent, TWP.ScriptLoader.completeEvents ) >= 0) {
				TWPHead.load(hscriptArray,function(){
					if (typeof completeEvent !== 'undefined'){TWP.ScriptLoader.completeEvents.push('onTwp' + completeEvent)};	
				});
			};
		} else {
			TWPHead.load(hscriptArray,function(){
				if (typeof completeEvent !== 'undefined'){TWP.ScriptLoader.completeEvents.push('onTwp' + completeEvent)};	
			});
		}	
	}
	
	if (typeof window.TWPHead == 'undefined') {
		  		
		jsHeadJs = '|<script type="text/cjs" data-cjssrc="//js.washingtonpost.com/pb/resources/js/head.min.js"></script>';		
		var jsscript = document.createElement('script');
		jsscript.onload = jsscript.onreadystatechange = 
			function(){
				if ( this.readyState && this.readyState != "complete" && this.readyState != "loaded" ) {
					return; 
				}			
				_load(hscriptArray,startEvent,completeEvent);
			}
		jsscript.src = jsHeadJs.substring(jsHeadJs.indexOf('src="')+5,jsHeadJs.indexOf('"></script>'));
		if (isSSL) {
			jsscript.src = jsscript.src.replace(TWP.wpostJsBase,TWP.wpostJsBaseSsl);
		}
		var jssib = document.getElementsByTagName('script')[0];
		jssib.parentNode.insertBefore(jsscript, jssib);
	} else {
		_load(hscriptArray,startEvent,completeEvent);
	}	
})();


