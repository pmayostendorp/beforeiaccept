
// Set the currentpage url. Can be overridden in the custom script.
var osCurrentUrl = document.createElement('a');
osCurrentUrl.href = window.location.href;
var osGACookieName='';
// handle when we are inside our own cloudfront iframe
var osourl = osGetParameterByName('osourl');
if(osourl){
    osCurrentUrl.href=osourl;
    // set the cookie name based on the root domain name
    osGACookieName="os_ga_"+osCurrentUrl.hostname;
    osLog("Detected OSIframed tag. Using gaCookieName "+osGACookieName+" and currentUrl "+osCurrentUrl.href);
}else{
    osCurrentUrl.href=window.location.href;
}

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}

if (typeof console === "undefined" || typeof console.log === "undefined") {
	console = {};
	console.log = function() {};
}

function osLog(message){
	if(typeof osDebug != "undefined" && osDebug){
		console.log(message);
	}
}

function osIsValid(foo){
	return typeof foo !== 'undefined' && foo;
}

function isPositiveInteger(x) {
    return /^\d+$/.test(x);
}

// Compares arbirtary version number strings i.e. 1.3.2
function osCvn(v1, v2){
    var v1parts = v1.split('.');
    var v2parts = v2.split('.');
    // First, validate both numbers are true version numbers
    function validateParts(parts) {
        for (var i = 0; i < parts.length; ++i) {
            if (!isPositiveInteger(parts[i])) {
                return false;
            }
        }
        return true;
    }
    if (!validateParts(v1parts) || !validateParts(v2parts)) {
        return NaN;
    }
    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length === i) {
            return 1;
        }
        if (parseInt(v1parts[i]) === parseInt(v2parts[i])) {
            continue;
        }
        if (parseInt(v1parts[i]) > parseInt(v2parts[i])) {
            return 1;
        }
        return -1;
    }
    if (v1parts.length != v2parts.length) {
        return -1;
    }
    return 0;
}

function osLogGaUEEvent(event){
	if(osIsValid(gaId)){
	    ga('onespotTracker.send', 'event', 'Onespot User Engagement', event, '', 0, {'nonInteraction': true, 'location': osCurrentUrl.href.replace(/ost=[_0-9]*&?/g,"").replace(/^\?$/,""),'referrer':''});
	}else{
		osLog("gaId not specified ignoring event "+event);
	}
}

function createGaCustomVariables(){
	if(osIsValid(gaId)){
		osLog("Creating custom dimensions");
		var ostCampaign = ost['campaign'];
		if(!osIsValid(ostCampaign)){
			ostCampaign = osGetParameterByName("ost_campaign");
		}
		if(osIsValid(ostCampaign)){
			osLog("Creating custom dimension campaign : "+ostCampaign);
			ga('onespotTracker.set', 'dimension1', ostCampaign);
	    }
		var ostCreative = ost['creative'];
		if(!osIsValid(ostCreative)){
			ostCreative = osGetParameterByName("ost_creative");
		}
		if(osIsValid(ostCreative)){
			osLog("Creating custom dimension creative : "+ostCreative);
			ga('onespotTracker.set', 'dimension2', ostCreative);
	    }
		var ostSubCampaign = ost['subcpn'];
			if(!osIsValid(ostSubCampaign)){
			ostSubCampaign = osGetParameterByName("ost_subcpn");
		}
		if(osIsValid(ostSubCampaign)){
			osLog("Creating custom dimension sub-campaign : "+ostSubCampaign);
			ga('onespotTracker.set', 'dimension3', ostSubCampaign);
	    }
		var ostSource = ost['source'];
		if(osIsValid(ostSource)){
			osLog("Creating custom dimension source : "+ostSource);
			ga('onespotTracker.set', 'dimension4', ostSource);
	    }
	}else{
		osLog("gaId not specified not setting custom dimensions");
	}
}

var osScrolled=false;
function osRunItWithJq(osJq) {
    osLog("Onespot tracking script v1.1.1");
    processOstParams();
	osOnPageActivity();
	if(osIsValid(gaId)){
        osLog("Loading GA script");
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        if(osIsValid(gaDomain) && osCurrentUrl.hostname.indexOf(gaDomain)>0){
		    ga('create', gaId, 'auto', {'name': 'onespotTracker','cookieDomain': gaDomain});
	    }else{
	        if(osGACookieName){
	            ga('create', gaId, 'auto', {'name': 'onespotTracker','cookieName': osGACookieName});
	        }else{
	            ga('create', gaId, 'auto', {'name': 'onespotTracker'});
	        }
	    }
        createGaCustomVariables();
        if(osCurrentUrl.href==window.location.href){
            ga('onespotTracker.send', 'pageview');
        }else{
            osLog("Sending ga pageview for "+osCurrentUrl.pathname+osCurrentUrl.search.replace(/ost=[_0-9]*&?/g,"").replace(/^\?$/,"")+osCurrentUrl.hash);
            ga('onespotTracker.send', 'pageview', {'location': osCurrentUrl.href.replace(/ost=[_0-9]*&?/g,"").replace(/^\?$/,""),'referrer':''});
           // osCurrentUrl.pathname+osCurrentUrl.search.replace(/ost=[_0-9]*&?/g,"").replace(/^\?$/,"")+osCurrentUrl.hash);
        }
	}
	
	try {
       osRunCustomScript(osJq);
    }catch(err) {
       osLog("Error running osRunCustomScript : "+err);
    }
	osLoadSeg(osANSegCode);	
	osLoadPixel(osANPageViewConvCode);
	osLoadAdxSeg();
	osLoadBidderPixel('page-view');
	osLogGaUEEvent('page view');
	
	setTimeout(function(){
		osLogGaUEEvent('20 second view');	
		fireUETrigger("20s");
	},20000);

	setTimeout(function(){
		osLogGaUEEvent('40 second view');
		fireUETrigger("40s");
		osLoadBidderPixel('page-40s-view');
	},40000);

	setTimeout(function(){
		osLogGaUEEvent('60 second view');
		fireUETrigger("60s");
	},60000);
	
	osJq(window).scroll(function(){
		if(osScrolled==false){
			osScrolled=true;
			osLogGaUEEvent('Scroll');
			fireUETrigger("scroll");
			osLoadBidderPixel('page-scroll');
		}
		osOnPageActivity();
	});
	
	osJq(document).mousemove(function() {
		osOnPageActivity();
	});
	setTimeout(function(){
		osLogGaUEEvent('2 minute view');
	},120000);

	setTimeout(function(){
		osLogGaUEEvent('5 minute view');
	},300000);

	setTimeout(function(){
		osLogGaUEEvent('10 minute view');
	},600000);

	// check for a multipage view cookie
    var lastPage = osGetCookie("os_lastpage_"+osCurrentUrl.hostname);
    if (lastPage) {
		osLog("Last page cookie set");
		if(lastPage!=osCurrentUrl.href){
			osLogGaUEEvent('Multiple page loads');
			fireUETrigger("multiplepageviews");
			osLoadBidderPixel('page-multiple-view');
		}else{
			osLog("Multiple page views on the same page");
		}
    }else{
    	osLog("No last page cookie set");
    }
	osSetCookie("os_lastpage_"+osCurrentUrl.hostname,osCurrentUrl.href,0);
}

function osSetCookie(cname, cvalue, exdays) {    
	var expires="";
	if(exdays>0){
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    	expires = "; expires="+d.toUTCString();
	}
    document.cookie = cname + "=" + cvalue + "; path=/" + expires;
}

function osGetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

var bidderLabels = new Array();

function osLoadBidderPixel(label,data_){
	var data;
	if(typeof data_ == 'undefined'){
		data="";
	}else{
		data=data_;
	}
	data = encodeURIComponent(data);
	if (label instanceof Array) {
		for (i=0;i<label.length;i++){
			if(!arrayContains(bidderLabels,label[i])){
				bidderLabels.push(label[i]);
			}
		}
	} else {
		if(!arrayContains(bidderLabels,label)){
			bidderLabels.push(label);
		}
	}
	var labels = bidderLabels[0];
	if(bidderLabels.length>1){
		for (i=1;i<bidderLabels.length;i++){
			labels=labels+","+bidderLabels[i];
		}
	}
	labels=encodeURIComponent(labels);
	var url=encodeURIComponent(encodeURIComponent(osCurrentUrl.href));
	var aid=('auction' in ost)?ost['auction']:'';
	var uid=('user' in ost)?ost['user']:'';
	var sid=('source' in ost)?ost['source']:'';
	var cid=('campaign' in ost)?ost['campaign']:'';
	var scid=('subcpn' in ost)?ost['subcpn']:'';
	var crid=('creative' in ost)?ost['creative']:'';
	if(osIsValid(osOSCampaignIds) && osOSCampaignIds.length > 0 && osIsValid(labels)){
		if(typeof osDevMode == "undefined" || !osDevMode){
			osLog("Loading bidder pixel "+osOSCampaignIds.join()+" / "+labels+" with data : "+data );
			var pixel = new Image(1,1);
			pixel.src = ('https:' == document.location.protocol ? 'https://secure' : 'http://ib') + '.adnxs.com/px?bidder=157&qsdata=campaign%3D'+encodeURIComponent(osOSCampaignIds.join())+'%26label%3D'+labels+'%26data%3D'+data+"%26url%3D"+url+"%26sid%3D"+sid+"%26aid%3D"+aid+"%26uid%3D"+uid+"%26cid%3D"+cid+"%26crid%3D"+crid+"%26scid%3D"+scid;
		}else{
			osLog("DEV MODE : Loading bidder pixel "+osOSCampaignIds.join()+" / "+labels+" with data : "+data+" sid:"+sid+" aid:"+aid+" uid:"+uid +" cid:"+cid+" crid:"+crid+" scid:"+scid);
			osLog("DEV MODE : Loading "+('https:' == document.location.protocol ? 'https://secure' : 'http://ib') + '.adnxs.com/px?bidder=157&qsdata=campaign%3D'+encodeURIComponent(osOSCampaignIds.join())+'%26label%3D'+labels+'%26data%3D'+data+"%26url%3D"+url+"%26sid%3D"+sid+"%26aid%3D"+aid+"%26uid%3D"+uid+"%26cid%3D"+cid+"%26crid%3D"+crid+"%26scid%3D"+scid)
		}
	}else{
		osLog("Invalid campaignId or label: "+osOSCampaignIds+"/"+labels);
	}
}

function arrayContains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function osLoadPixel(code){
	if(osIsValid(code)){
		if(typeof osDevMode == "undefined" || !osDevMode){
			osLog("Loading pixel "+code);
			var pixel = new Image(1,1);
			pixel.src = ('https:' == document.location.protocol ? 'https://secure' : 'http://ib') + '.adnxs.com/px?member='+memberId+'&code='+code+'&t=2';
		}else{
			osLog("DEV MODE : Loading pixel "+code);
		}
	}else{
		osLog("Invalid pixel code : "+code);
	}
}

function osLoadSeg(code){
	if(osIsValid(code)){
		if(typeof osDevMode == "undefined" || !osDevMode){
			osLog("Loading segment "+code);
			var pixel = new Image(1,1);
			pixel.src = ('https:' == document.location.protocol ? 'https://secure' : 'http://ib') + '.adnxs.com/seg?member='+memberId+'&add_code='+code+'&t=2';
		}else{
			osLog("DEV MODE : Loading segment "+code);
		}
	}else{
		osLog("Invalid pixel code : "+code);
	}
}

function osLoadAdxSeg(){
	if(typeof osDevMode == "undefined" || !osDevMode){
		osLog("Loading Adx segment");
		var pixel = new Image(1,1);
		pixel.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'googleads.g.doubleclick.net/pagead/viewthroughconversion/1012180586/?value=0&label=AG6wCLbgwgQQ6szS4gM&guid=ON&script=0';
	}else{	
		osLog("DEV MODE : Loading Adx segment");
	}
}

function osLoadAdxConv(conversionId,conversionLabel){
	if(typeof osDevMode == "undefined" || !osDevMode){
		osLog("Loading Adx conversion");
		var pixel = new Image(1,1);
		var trackingUrl = ('https:' == document.location.protocol ? 'https://' : 'http://') + "www.googleadservices.com/pagead/conversion/"+conversionId;
		trackingUrl += "/?random="+new Date().getMilliseconds();
		trackingUrl += "&value=0";
		trackingUrl += "&label="+conversionLabel;
		trackingUrl += "&guid=ON&script=0&url="+encodeURIComponent(osCurrentUrl.href);
		pixel.src = trackingUrl;
	}else{
		osLog("DEV MODE : Loading Adx conversion");
	}
}

function osjqcheck() {
   if(window.jQuery && jQuery.fn){
		osLog("Jquery version "+jQuery.fn.jquery+" Detected. Jquery > 1.3 exists "+(window.jQuery && jQuery.fn && (osCvn(jQuery.fn.jquery,'1.3')>=0)));
   }else{
		osLog("Jquery not present");
   }
   return window.jQuery && jQuery.fn && (osCvn(jQuery.fn.jquery,'1.3')>=0);
}

var osEnablePageActivityTimer=false;
var osPageActivityTimer;
var osPageActivityExists=true;
function osOnPageActivity(){
	if(osEnablePageActivityTimer){
		osLog("Page activity detected");
		osPageActivityExists=true;
		if(osPageActivityTimer){
			window.clearTimeout(osPageActivityTimer)
		}
		osPageActivityTimer=setTimeout(function(){
			osLog("No page activity detected for 30 seconds");
			osPageActivityExists=false;	
		},30000);
	}
}

function osInstrumentTOSBeacon(tosGaId,tosDomain){
	if(typeof osDevMode == "undefined" || !osDevMode){
		if(osIsValid(tosDomain)){
            ga('create', tosGaId, 'auto', {'name': 'onespotTosTracker','cookieDomain': tosDomain});
        }else{
            ga('create', tosGaId, 'auto', {'name': 'onespotTosTracker'});
        }
        ga('onespotTosTracker.send', 'pageview');
	}
	setInterval(function(){
		if(osPageActivityExists){		
			if(typeof osDevMode == "undefined" || !osDevMode){
				osLog("10s Periodic Beacon");
				ga('onespotTosTracker.send', 'event', 'Onespot User Engagement', '10s Periodic Beacon', '', 0, {'nonInteraction': false});
			}else{
				osLog("DEV MODE : 10s Periodic Beacon");
			}
		}else{
			osLog("Periodic Beacon Disabled");
		}
	},10000);
}

function toHex(str) {
	var hex = '';
	for(var i=0;i<str.length;i++) {
		hex += ''+str.charCodeAt(i).toString(16);
	}
	return hex;
}

function fireUETrigger(label){	
	osLog("User Engagement "+label);
	switch(label){
		case "scroll":
		  osLoadPixel(osANUeConvPxCode);
		  osLoadSeg(osANUeConvSegCode);
		  break;
		case "multiplepageviews":
		  osLoadPixel(osANUeConvPxCode);
		  osLoadSeg(osANUeConvSegCode);
		  break;
		case "40s":
		  osLoadPixel(osANUeConvPxCode);
		  osLoadSeg(osANUeConvSegCode);
		  break;
		default:
		  break;
	}
}

function osFormSubmitConversion(form){
	try {
		var submitFormCallback = function() {
			form.submit();
		}	
		osLoadPixel(osANConvCode);
		osLogGaUEEvent('Form submit conversion');
		setTimeout(submitFormCallback, 600);
		fireUETrigger("formsubmitconversion");
		osLoadBidderPixel('conversion');
		return false;
	} catch(err) {
        return true;
    }
}

function osConversion(link){
	osLoadPixel(osANConvCode);
	osLogGaUEEvent('Conversion');
	fireUETrigger("conversion");
	osLoadBidderPixel('conversion');
	return true;
}

// We pass in a jquery selector string so that the selector can be custom
// i.e.  #newsletter' or 'form[name="event"]'
function instrumentForm(osJq,jqSelectorStr,requiredInputs, onSubmitLabel, adxConvId, adxConvLabel){
	var jqForm = osJq(jqSelectorStr);
	var jqFormInputs = osJq(jqSelectorStr+" :input");
	// Check the form exists and has elements
	if(jqForm.length > 0 && jqFormInputs.length > 0){
		osLog("Instrumenting form : "+jqForm.attr("name")+" with "+jqFormInputs.size()+" fields");
		jqFormInputs.each(function(){
			var fieldName = osJq(this).attr("name");
			if(fieldName in requiredInputs){
				osLog("Instrumenting "+fieldName);
				osJq(this).focus(function() {
				  osLoadBidderPixel(["form-interaction","form-interaction-"+onSubmitLabel,"form-interaction-"+onSubmitLabel+"-"+requiredInputs[fieldName].toLowerCase()]);
				  osLogGaUEEvent("form interaction");
				});
			}
		});

		jqForm.submit(function(e) {
			var emptyForm=false;
			jqFormInputs.each(function(){
				var fieldName = osJq(this).attr("name");
				if(osJq(this).css('display') != 'none' && fieldName in requiredInputs){
					osLog("Checking required field "+fieldName+" with val "+osJq(this).val());
					if(osJq.trim(osJq(this).val())==""){
						osLog(fieldName+" is empty");
						emptyForm=true;
					}
				}
			});
			if(!emptyForm){
				osLoadBidderPixel(["form-submit","form-submit-"+onSubmitLabel],"form-capture-"+encodeURIComponent(osJq(':input:visible',jqForm).serialize()));
				osLogGaUEEvent("Form submit "+onSubmitLabel+" complete");
				osLog("Form submit "+onSubmitLabel+" complete");
				osLoadAdxConv(adxConvId,adxConvLabel);
			}else{
				osLog("Empty form submit.");
			}
		});
	}else{
		osLog("No form available for selector "+jqSelectorStr);
	}
}

function instrumentConsiderations(osJq,considerations){
	for (var key in considerations) {
		if(osCurrentUrl.href.startsWith(key)){
			osLog("Consideration "+considerations[key]);
			osLogGaUEEvent('Consideration '+considerations[key]);
			osLoadBidderPixel(['consideration','consideration-'+considerations[key]]);
		}
	}
}

var ost = new Array();
function processOstParams(){
	var ostStr = osGetParameterByName("ost");
	if(ostStr.length == 0){
	    osLog("No ost param set. Checking cookie.")
	    // No ost param in url check cookie
	    ostStr = osGetCookie("os_ost");
	}
    osLog("OST = "+ostStr);
    var ostArray = ostStr.split("_");
    if(ostArray[0]==1){
        //v1 token
        ost['source']=ostArray[1];
        ost['campaign']=ostArray[2];
        ost['creative']=ostArray[3];
        ost['auction']=ostArray[4];
        ost['user']=ostArray[5];
        ost['subcpn']=ostArray[6];
        ost['custom2']=ostArray[7];
        osSetCookie("os_ost",ostStr,60);
    }else{
        osLog("Invalid ost version "+ostArray[0]);
    }
}

function osGetParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(osCurrentUrl.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

if ( !osjqcheck() ) {
    var script = document.createElement('script'),
        timer = setInterval(function(){
            if ( osjqcheck() ) {
                clearInterval(timer);
                document.body.removeChild(script);
                osRunItWithJq( jQuery.noConflict(true) );
            }
        }, 30);
    script.src = ('https:' == document.location.protocol ? 'https' : 'http') +'://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js';
    document.body.insertBefore( script, document.body.firstChild );
}else{
	osRunItWithJq(jQuery);
}