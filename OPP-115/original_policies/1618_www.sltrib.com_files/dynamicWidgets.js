var _ndnBkmHost = 'pp-serve.newsinc.com';
var _cachedHost = 'http://dme.newsinc.com'.slice(7);

var _ndnBuyerId = 'saltlaketribune_90262';
var distributorId = '90262';
var partnerId = '539';

var _matchers = [];
var placements;
var _excl = [];


var NDNAnalytics = (typeof (NDNAnalytics) == 'undefined') ? {} : NDNAnalytics;

NDNAnalytics.ANALYTICS_USER_TOKEN = "ANALYTICS_USER_TOKEN";
NDNAnalytics.BASE_SERVICE_URL = "http://analytics.newsinc.com/";

NDNAnalytics.hasFlash = navigator.mimeTypes && navigator.mimeTypes.length ? Array.prototype.slice.call(navigator.mimeTypes).some(function(a) { return "application/x-shockwave-flash" == a.type; }) : /MSIE/.test(navigator.userAgent) ? eval("try { new ActiveXObject('ShockwaveFlash.ShockwaveFlash') && !0 } catch(e) { !1 };") : !1;

NDNAnalytics.generateUuid = function () {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [];
    var r;
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
            r = 0 | Math.random() * 16;
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
    }
    var d = new Date();
    return (uuid.join('') + d.getTime());
};

NDNAnalytics.setAnalyticsCookie = function () {
    var cookieCheck = NDNAnalytics.getAnalyticsUserToken();
    if (cookieCheck === null) {
        var token = NDNAnalytics.generateUuid();
        NDNAnalytics.setCookie(NDNAnalytics.ANALYTICS_USER_TOKEN, token, 30);
        return token;
    } else {
        return cookieCheck;
    }
};

NDNAnalytics.getAnalyticsUserToken = function () {
    return NDNAnalytics.getCookie(NDNAnalytics.ANALYTICS_USER_TOKEN);
};

NDNAnalytics.appendScript = function (url) {
    var script = document.createElement("script");
    script.setAttribute("src", url);
    script.setAttribute("type", "text/javascript");
    var head1 = document.getElementsByTagName("head")[0];
    head1.appendChild(script);
};

NDNAnalytics.setCookie = function (sName, sValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = sName + "=" + escape(sValue) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
};

NDNAnalytics.getCookie = function (sName) {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
        var aCrumb = aCookie[i].split("=");
        if (sName == aCrumb[0]) return unescape(aCrumb[1]);
    }
    return null;
};

NDNAnalytics.savePageView = function (WidgetID, FullUrl, ParentUrl, SiteSectionID, AdNetworkID) {
    var token = NDNAnalytics.setAnalyticsCookie();
    var wsUrl = NDNAnalytics.BASE_SERVICE_URL + 'AnalyticsProvider/jsonp/analytics/PageViewJSONP?' +
        'wid=' + WidgetID + '&uut=' + token + '&furl=' + FullUrl +
        '&purl=' + ParentUrl + '&ssid=' + SiteSectionID + '&anid=' + AdNetworkID;
    NDNAnalytics.appendScript(wsUrl);
};





var NDNRender = (typeof(NDNRender) == 'undefined') ? {} : NDNRender;

NDNRender.vh = "javascript:void(null);";

NDNRender.url = document.URL.replace(/'/g,"%27") ; //chrome and safari dont encode single-quotes in the url

NDNRender.title = document.title.substring(0,150);// To customize, scroll to "Start Customization"

getCanonicalURL = function() {

//(Open Graph): <meta property="og:url" content="http://www.detroitnews.com/article/20140219/BIZ/302190145">
   var metas = document.getElementsByTagName('meta'); 
   for (i=0; i<metas.length; i++) { 
      if (metas[i].getAttribute("property") == "og:url") { 
         return metas[i].getAttribute("content"); 
      } 
   } 

//search: <link rel="canonical" href="http://www.detroitnews.com/article/20140219/BIZ/302190145" />
   var links = document.getElementsByTagName('link'); 
   for (i=0; i<links.length; i++) { 
      if (links[i].getAttribute("rel") == "canonical") { 
         return links[i].getAttribute("href"); 
      } 
   } 

};


targetsMap = function(url) {
    var uparts = url.split(/[\?\#]+/); //split at ? or #
    var splits = uparts[0].split('/');      

    // All URL parts
    this.urlparts = new Object();   
    this.urlparts.target = new Array(); 
    // var upt = new Array();
    for (i=3; i < splits.length ; i++) {
      var subsplits = splits.slice(0,i);
      this.urlparts.target[i-3] = subsplits.join('/') + "/";
    }
    //this.urlparts.target = upt.join(',');
    this.urlparts.shortDesc = "All URL parts";
    this.urlparts.longDesc  = "Match all url parts";

    // Canonical url
    this.canonical = new Object();
    this.canonical.target = (typeof canonical_url === 'undefined') ? getCanonicalURL() : canonical_url;
console.log("[Perfect Pixel] OG/canonical url = " + this.canonical.target);
    this.canonical.shortDesc = "Open Graph or Canonical URL";
    this.canonical.longDesc  = "Place selected videos on pages that contain the same Open Graph url tag or canonical URL tag";

    // exact matcher
    this.exactMatch = new Object();
    this.exactMatch.target = url;
    this.exactMatch.shortDesc = "Default";
    this.exactMatch.longDesc  = "Place selected videos on this URL";

    // NYDN/  http://dev.assets.newsinc.com/QA/perfectpixel/qa/20130220/41212/singleboth_00.html*
    // match without query params
    this.dropParams = new Object();
    this.dropParams.target = uparts[0]+'*';
    this.dropParams.shortDesc = "Ignore query parameters";
    this.dropParams.longDesc  = "Place selected videos on this page with your predefined query parameters appended to the end of the URL";
  
    // LEE/  http://dev.assets.newsinc.com/QA/perfectpixel/qa/20130220/*/singleboth_00.html
    // drop slug line before last component
    var newarr = splits.slice(0, (splits.length - 2));
    newarr[newarr.length] = '*';
    newarr[newarr.length] = splits[splits.length - 1];
    this.leeSlug = new Object();
    this.leeSlug.target = newarr.join('/');
    this.leeSlug.shortDesc = "Ignore slug name";
    this.leeSlug.longDesc  = "Place your selected videos on this URL while allowing the slug name to change at any time";
  
    // CHARLOTTE/  http://dev.assets.newsinc.com/QA/perfectpixel/qa/20130220/41212/* 
    // drop last component in URL
    newarr = splits.slice(0, (splits.length - 1));
    newarr[newarr.length] = '*';
    this.charlotte = new Object();
    this.charlotte.target = newarr.join('/');
    this.charlotte.shortDesc = "Ignore everything in the URL past article ID";
    this.charlotte.longDesc  = "Place your selected videos on the current page + ignore any positions in the URL following the article ID";
   
    // COX/  http://www.palmbeachpost.com/*/nWWWx/
    // Ignore positions in the URL path and slug name
    newarr = splits.slice(0, 3);    //get the base url
    newarr[newarr.length] = '*';
    newarr[newarr.length] = splits[splits.length - 2]; //get the last part
    newarr[newarr.length] = '';
    this.cox = new Object();
    this.cox.target = newarr.join('/');
    this.cox.shortDesc = "Ignore positions in the URL path and slug name";
    this.cox.longDesc  = "Place your selected videos on the current page/ URL + ignore all positions between the base URL and the article ID";

    // DENVER/  http://www.denverpost.com/*/ci_22784626/*  
    // ignore second position of the url path and everything past the article ID    
    newarr = splits.slice(0, (splits.length - 1));
    newarr[newarr.length] = '*'; //ignore past the article ID
    newarr[3] = "*"; //ignore second position
    this.denver = new Object();
    this.denver.target = newarr.join('/');
    this.denver.shortDesc = "Ignore the second position of the URL path and everything past the article ID";
    this.denver.longDesc  = "Place selected videos on the current URL and ignore the second position between the base URL and the article ID";  

    // OMAHA  Handle both kinds of urls below
    //     http://omaha.com/article/20130709/AP09/130709671#article-title 
    //     http://omaha.com/article/20130709/AP09/130709671/12#article-title    
    if(splits.length == 8){
        newarr = splits.slice(0, (splits.length - 1));        
    }else{
        var n = splits[splits.length-1].indexOf('#');
        splits[splits.length-1] = splits[splits.length-1].substring(0, n != -1 ? n : splits[splits.length-1].length);        
        newarr = splits.slice(0, (splits.length));
    }
    newarr[newarr.length-1] = newarr[newarr.length-1] + '*';
    this.omaha = new Object();
    this.omaha.target = newarr.join('/');
    this.omaha.shortDesc = "Ignore everything in the URL past article ID";
    this.omaha.longDesc  = "Place your selected videos on the current page + ignore any positions in the URL following the article ID";
  
    // CSM/  http://www.csmonitor.com/USA/Politics/2013/0411/foo-bar-baz*  
    // ignore query params and "-video" at the end of the url    
    newarr = uparts[0];   // get the url without query params    
    if(newarr.slice(newarr.length-6,newarr.length).toUpperCase() === "-video".toUpperCase()){
        newarr = newarr.slice(0,newarr.length-6);
    }
    this.csm = new Object();
    this.csm.target = newarr + '*';
    this.csm.shortDesc = "Ignore query parameters and -video";
    this.csm.longDesc = "Place selected videos on the current URL and ignore query parameters and -video at the end of the url";

    // OMAHA_SECTION/  http://www.omaha.com/article/*/LIVING*  
    // ignore third position of the url path and everything past the section    
    newarr = splits.slice(0, (splits.length - 2));
    newarr[newarr.length] = '';     
    newarr[4] = "*"; //ignore third position    
    this.omahaSection = new Object();
    this.omahaSection.target = newarr.join('/');
    this.omahaSection.shortDesc = "Target a Section";
    this.omahaSection.longDesc  = "Place selected content on the current URL and ignore the third position between the base URL and the article ID";  
    
    // OMAHA-SECTION-2/  http://www.omaha.com/article/*/LIVING*  
    // ignore third position of the url path and everything past the section    
    newarr = splits.slice(0, 6);
    newarr[newarr.length] = '';     
    newarr[4] = "*";    
//    joins[joins.length] = newarr.join('/');
    this.omahaSection2 = new Object();
    this.omahaSection2.target = newarr.join('/');
    this.omahaSection2.shortDesc = "Target a Section2";
    this.omahaSection2.longDesc  = "Place selected content on the current URL and ignore the third position between the base URL and the article ID";  

  return this;
};

function renderTarget(x,isDefault){

  var _id = "t-" + x.shortDesc.replace(/\s+/g, '-').toLowerCase();

  var _label = $("<label class='target_loc_container' />");
  var _input = document.createElement('input');
  _input.setAttribute("type", "radio");
  _input.setAttribute("name", "target_loc");
  _input.setAttribute("class", "target_loc_radio");
  //strip * from end of target if exists
  if(x.target.charAt(x.target.length - 1)=='*'){
    _input.value = x.target.substring(0,x.target.length - 1);
  }else{
    _input.value = x.target;
  }
  //_input.value = x.target;
  if(isDefault==true){
     _input.setAttribute("checked", true);
  }
  _label.append(_input);
  
  var _span =  document.createElement('span'); 
  _span.setAttribute("class", "target_loc_span");
  _span.innerHTML = x.shortDesc;
  _label.append(_span);

  var _detailsLink = document.createElement('span');
  _detailsLink.setAttribute("onClick","$('#" + _id + "').toggle('show');$(this).toggleClass('target_loc_btn_down');");
  //_detailsLink.setAttribute("style","cursor:pointer;padding:4px;border:2px solid #f00;");
  _detailsLink.setAttribute("class","target_loc_btn_up");
  _detailsLink.innerHTML = "";
  _label.append(_detailsLink);
  
  var _detailsDiv = document.createElement('div');
  _detailsDiv.setAttribute("id",_id);
  _detailsDiv.setAttribute("style","display:none;padding:4px;word-wrap:break-word;");
  _detailsDiv.innerHTML = x.longDesc;
  _detailsDiv.innerHTML += "<br/><br/><span style='color:#F58800'>"+x.target+"</span>";
  _label.append(_detailsDiv);
  
  $("#target_loc").append(_label);
}


//
(function() {

var url;
var tm;

if (typeof ndn_target_url === 'undefined'){ //i.e. we are not in the bookmarklet

    url = NDNRender.url;
    tm = targetsMap(url);

}else{ //i.e. we are in the bookmarklet

    url = ndn_target_url;
    tm = targetsMap(url);

    $("#target_loc").empty();  

//Start Customization
//Comment out the renderTarget calls that are not needed
//To set the default checked radio button, use the second param(true/false)

//    renderTarget(tm.exactMatch,true);           
      renderTarget(tm.dropParams,true);
//    renderTarget(tm.leeSlug,false);
//    renderTarget(tm.charlotte,false);
//    renderTarget(tm.cox,false);
//    renderTarget(tm.denver,false);
//    renderTarget(tm.csm,true);

//End Customization
            ndn_target_url =  $("input[name='target_loc']:checked").val();

    $("input[name='target_loc']").change(
      function() { ndn_target_url =  $("input[name='target_loc']:checked").val();        
        $("input[name='target_loc']").next().css('color', 'black');
        $("input[name='target_loc']:checked").next().css('color', '#F58800'); } 
    );

  } //end else

//Start Customization
//Comment out the matchers that are not needed

    _matchers.push.apply(_matchers, tm.urlparts.target);
    _matchers.push(tm.canonical.target);
    _matchers.push(tm.dropParams.target.slice(0,-1));

/*
    _matchers.push(tm.leeSlug.target);
    _matchers.push(tm.charlotte.target);
    _matchers.push(tm.cox.target);
    _matchers.push(tm.denver.target);
    _matchers.push(tm.csm.target);
    _matchers.push(tm.omahaSection.target);
    _matchers.push(tm.omahaSection2.target);
    _matchers.push(tm.omaha.target);
*/

    _matchers.push(tm.exactMatch.target); //keep at the end

})();

NDNRender.setAttribute = function(e, k, v) {
  if (k == "class") {
    e.setAttribute("className", v);   // set both "class" and "className"
  }
  return e.setAttribute(k, v);
};

NDNRender.createElement = function(e, attrs) {
    var el = document.createElement(e);
    for (var k in attrs) {
        if (k == "text") {
            el.appendChild(document.createTextNode(attrs[k]));
        } else {
            NDNRender.setAttribute(el, k, attrs[k]);
        }
    }
    return el;
};

NDNRender.remove = function(e) {
    e.parentNode.removeChild(e);
};

NDNRender.loadScript = function(_src) { 
    var e = document.createElement('script'); 
    e.src = _src;
    e.type = "text/javascript";
    e.async = true;
//    var NDNScript = document.getElementsByTagName('head')[0];
//    NDNScript.appendChild(e);
//    document.body.appendChild(e); 
    document.getElementsByTagName("head")[0].appendChild(e);

};

NDNRender.loadScriptCB = function(url,callback) {
  var script = document.createElement("script")
  script.type = "text/javascript";
  if(script.readyState) {  //IE
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

NDNRender.listen = function(elem, evnt, func) {
  if (elem.addEventListener) // W3C DOM
    elem.addEventListener(evnt,func,false);
  else if (elem.attachEvent) { // IE DOM
    var r = elem.attachEvent("on"+evnt, func);
    return r;
  }
};

NDNRender.getElementsByClassName = function(className, tag, elm){
  if (document.getElementsByClassName) {
    getElementsByClassName = function (className, tag, elm) {
      elm = elm || document;
      var elements = elm.getElementsByClassName(className),
        nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
        returnElements = [],
        current;
      for(var i=0, il=elements.length; i<il; i+=1){
        current = elements[i];
        if(!nodeName || nodeName.test(current.nodeName)) {
          returnElements.push(current);
        }
      }
      return returnElements;
    };
  } else if (document.evaluate) {
    getElementsByClassName = function (className, tag, elm) {
      tag = tag || "*";
      elm = elm || document;
      var classes = className.split(" "),
        classesToCheck = "",
        xhtmlNamespace = "http://www.w3.org/1999/xhtml",
        namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
        returnElements = [],
        elements,
        node;
      for(var j=0, jl=classes.length; j<jl; j+=1){
        classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
      }
      try	{
        elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
      }catch (e) {
        elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
      }
      while ((node = elements.iterateNext())) {
        returnElements.push(node);
      }
      return returnElements;
    };
  } else {
    getElementsByClassName = function (className, tag, elm) {
      tag = tag || "*";
      elm = elm || document;
      var classes = className.split(" "),
        classesToCheck = [],
        elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
        current,
        returnElements = [],
        match;
      for(var k=0, kl=classes.length; k<kl; k+=1){
        classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
      }
      for(var l=0, ll=elements.length; l<ll; l+=1){
        current = elements[l];
        match = false;
        for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
          match = classesToCheck[m].test(current.className);
          if (!match) {
            break;
          }
        }
        if (match) {
          returnElements.push(current);
        }
      }
      return returnElements;
    };
  }
  return getElementsByClassName(className, tag, elm);
};

NDNRender.urlVars = function() {

  var uparts = NDNRender.url.split(/[\?\#]+/); //split at ? or #
  var splits = uparts[0].split('/');
  
  var joins = new Array();
  for (i=3; i < splits.length ; i++) {
     var subsplits = splits.slice(0,i);
     joins[i-3] = subsplits.join('/') + "/";
  }
  
  joins[joins.length] = uparts[0];
  
  var newarr = splits.slice(0, (splits.length - 2));
  newarr[newarr.length] = '*';
  newarr[newarr.length] = splits[splits.length - 1];
  
  joins[joins.length] = newarr.join('/');

  if (uparts.length > 1) {
    joins[joins.length] = uparts.join('?');
  } 
  
    // COX/  http://www.palmbeachpost.com/*/nWWWx/
    // Ignore positions in the URL path and slug name
    newarr = splits.slice(0, 3);    //get the base url
    newarr[newarr.length] = '*';
    newarr[newarr.length] = splits[splits.length - 2]; //get the last part
    newarr[newarr.length] = '';
    joins[joins.length] = newarr.join('/');

    // DENVER/  http://www.denverpost.com/*/ci_22784626/  
    // ignore second position of the url path and everything past the article ID    
    newarr = splits.slice(0, (splits.length - 1));
    newarr[newarr.length] = ''; 
    newarr[3] = "*"; 
    joins[joins.length] = newarr.join('/');

    // OMAHA/ http://omaha.com/article/20130709/AP09/130709671*
    if(splits.length == 8){
        newarr = splits.slice(0, (splits.length - 1));
    }else{
        var n = splits[splits.length-1].indexOf('#');
        splits[splits.length-1] = splits[splits.length-1].substring(0, n != -1 ? n : splits[splits.length-1].length);
        newarr = splits.slice(0, (splits.length));
    }
    joins[joins.length] = newarr.join('/');

    // CSM/  http://www.csmonitor.com/USA/Politics/2013/0411/foo-bar-baz*  
    // ignore query params and "-video" at the end of the url    
    newarr = uparts[0];   // get the url without query params    
    if(newarr.slice(newarr.length-6,newarr.length).toUpperCase() === "-video".toUpperCase()){
        newarr = newarr.slice(0,newarr.length-6);
    }
    joins[joins.length] = newarr;

    // OMAHA-SECTION/  http://www.omaha.com/article/*/LIVING*  
    // ignore third position of the url path and everything past the section    
    newarr = splits.slice(0, 6);
    newarr[newarr.length] = '';     
    newarr[4] = "*";    
    joins[joins.length] = newarr.join('/');

  return "'" + joins.join("','") + "'";
};

function getExclVIDs(){
  var _excllist = [];
  var _ndnDivs = NDNRender.getElementsByClassName("ndn_embed");
  for (i = 0; i < _ndnDivs.length; i++) {
    if(_ndnDivs[i].attributes['data-config-video-id']){
      _excllist.push(_ndnDivs[i].attributes['data-config-video-id'].value);
    }
  }
  return _excllist;
}

NDNRenderUnits = function(unitsdata) {

var jsonPlacements = (typeof(unitsdata.placements) !== 'undefined') ? unitsdata.placements : [];
var jsonRecommendations = (typeof(unitsdata.recData) !== 'undefined' && typeof(unitsdata.recData.videos) !== 'undefined') ? unitsdata.recData.videos : [];

var recIndex = 0;
for(var i=0;i<jsonPlacements.length && recIndex<jsonRecommendations.length;i++){
  if(jsonPlacements[i].render_app=='dynamic' || (jsonPlacements[i].render_app=='wirematch' && jsonRecommendations[recIndex].score>=100)){
    var dynVID = (typeof(jsonRecommendations[recIndex]) !== 'undefined') ? jsonRecommendations[recIndex].vid : "";
    jsonPlacements[i].ndn_vid_id = dynVID;
    jsonPlacements[i].url = jsonPlacements[i].url.split("?")[0]+ '?VID='+dynVID+'&'+jsonPlacements[i].url.split("?")[1];
    if (jsonRecommendations[recIndex].score>=100) {
      jsonPlacements[i].url = jsonPlacements[i].url.split("_dynamic")[0] + '_dynamic_wire_ap' +  jsonPlacements[i].url.split("_dynamic")[1];
    } 
    recIndex++; 
   }
//  console.log(jsonPlacements[i].render_app+"@"+jsonPlacements[i].target+"="+jsonPlacements[i].ndn_vid_id);
}

    for ( var i = 0; jsonPlacements.length > i; ++i ) {
       var pardiv = document.getElementById(jsonPlacements[i].target);
       if (pardiv) {
         if(jsonPlacements[i].render_app=='widget'){
           if (NDNAnalytics.hasFlash){
             //postscribe(pardiv,jsonPlacements[i].embed);
             writeWidget(jsonPlacements[i].target);
             pardiv.style.cssText = 'display: block; margin: 0px;';

             NDNAnalytics.savePageView(23681, encodeURIComponent(NDNRender.url), null, jsonPlacements[i].sitesection, jsonPlacements[i].freewheel);
           }
         }else{
		if(!pardiv.getAttribute('data-pp-type')){
             if(jsonPlacements[i].ndn_vid_id != '0' && jsonPlacements[i].ndn_vid_id != ''){
		    pardiv.setAttribute('data-pp-type', jsonPlacements[i].render_app);
		    var el = NDNRender.createElement("iframe", {"src": jsonPlacements[i].url, "height": jsonPlacements[i].height , 
		           "width": jsonPlacements[i].width, "scrolling": "no", "frameborder": "no", "noresize": "noresize",
		           "marginwidth": "0px", "marginheight": "0px" });
		    pardiv.appendChild(el);
		    pardiv.style.cssText = 'display: block; margin: 0px;';
            }else{
              if(jsonPlacements[i].render_app == 'blank'){
                pardiv.setAttribute('data-pp-type', jsonPlacements[i].render_app);
              }
            }
		}
         } //end else
       } //end if pardiv
    } //end for loop
};

NDNRender.bindReady = function(handler){
	var called = false

	function ready() { 
		if (called) return
		called = true
		handler()
	}

	if ( document.addEventListener ) { // native event
		document.addEventListener( "DOMContentLoaded", ready, false )
	} else if ( document.attachEvent ) {  // IE

		try {
			var isFrame = window.frameElement != null
		} catch(e) {}

		// IE, the document is not inside a frame
		if ( document.documentElement.doScroll && !isFrame ) {
			function tryScroll(){
				if (called) return
				try {
					document.documentElement.doScroll("left")
					ready()
				} catch(e) {
					setTimeout(tryScroll, 10)
				}
			}
			tryScroll()
		}

		// IE, the document is inside a frame
		document.attachEvent("onreadystatechange", function(){
			if ( document.readyState === "complete" ) {
				ready()
			}
		})
	}

	// Old browsers
    if (window.addEventListener)
        window.addEventListener('load', ready, false)
    else if (window.attachEvent)
        window.attachEvent('onload', ready)
    else {
		var fn = window.onload // very old browser, copy old onload
		window.onload = function() { // replace by new onload and call the old one
			fn && fn()
			ready()
		}
    }
}

var writeWidget = function(placementID){
  var orig_document_write = document.write;
  var pardiv = document.getElementById(placements[placementID].target);
  while( pardiv.hasChildNodes()){ pardiv.removeChild(pardiv.lastChild);}
  NDNRender.loadScriptCB(('https:' == document.location.protocol ? 'https://' : 'http://') + _cachedHost + '/js/postscribe-version-1.1.0/htmlParser/htmlParser.js',function(){
    NDNRender.loadScriptCB(('https:' == document.location.protocol ? 'https://' : 'http://') + _cachedHost + '/js/postscribe-version-1.1.0/postscribe.js', function(){
      if (NDNAnalytics.hasFlash){
        postscribe(pardiv,placements[placementID].embed);
 //       pardiv.style.cssText = 'display: block; margin: 0px;';
        NDNAnalytics.savePageView(23681, encodeURIComponent(NDNRender.url), null, placements[placementID].sitesection, placements[placementID].freewheel);
      }
    });
  });
  document.write = orig_document_write;
};

function get_url_params(u){
  var theURL = u;
  var JS_GET = new Object();
  var splitURL = theURL.split('?');
  if(splitURL.length>1){
    var splitVars = splitURL[1].split('&');
    for(i=0; i< splitVars.length; i++){
      splitPair = splitVars[i].split('=');
      JS_GET[splitPair[0]] = splitPair[1];
    }
    return JS_GET;
  }else{
    return false;
  }
}

var NDNDynVideoWidgets = function() {

  var queryParams = get_url_params(window.location.search);
  //console.log(queryParams.ndn_ppEnv);
  if(queryParams.ndn_ppEnv){
    _ndnBkmHost = queryParams.ndn_ppEnv + '-dme.newsinc.com';
    var dyn = ("https:" == document.location.protocol ? "https://" : "http://") 
              + _ndnBkmHost
              + "/repub/" + _ndnBuyerId + "/dynamicWidgets.js";
    NDNRender.loadScript(dyn);
  }

  var dataResource = (typeof ndn_target_url === 'undefined') ? "unitsdata.js" : "getAllPlacements.js";
  _excl = getExclVIDs();

  var theScript = ("https:" == document.location.protocol ? "https://" : "http://") + _ndnBkmHost
    + "/repub/" + _ndnBuyerId + "/" + dataResource 
    + "?pid=" + partnerId + "&dpid=" + distributorId
    + "&excl=" + encodeURIComponent(_excl.join(","))
    + "&title=" + encodeURIComponent(NDNRender.title)
    + "&loc=" + encodeURIComponent(NDNRender.url);

  if(_matchers.length === 0){
    theScript += "&matchers=" + encodeURIComponent(NDNRender.urlVars());
  }else{
    theScript += "&matchers=" + encodeURIComponent("'" + _matchers.join("','") + "'");
    console.log("new matchers");
  }

  NDNRender.bindReady(function(){
        NDNRender.loadScript(theScript);
  });

};
      // start
// alert("10 < 11");
// end

      