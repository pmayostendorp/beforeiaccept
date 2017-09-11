//IMK, by SS for SS 04192012
window.ybPlacements = "";
window.winBids = "";
document.write("<script type=\"text\/javascript\" src=\"http:\/\/ox-d.intermarkets.net\/w\/1.0\/jstag\"><\/script>");
document.write('<scr' + 'ipt type="text/javascript" src="http://cdn.intermarkets.net/u/Intermarkets/Newsbusters/oxbidAsyncNB.js"></script>');
document.write('<scr' + 'ipt type="text/javascript" src="http://cdn.intermarkets.net/u/Intermarkets/referrer_lookup.js"></script>');

    (function() {
        function async_load(script_url){
            var protocol = ('https:' == document.location.protocol ? 'https://' : 'http://');
            var s = document.createElement('script'); s.src = protocol + script_url;
            var x = document.getElementsByTagName('script')[0]; x.parentNode.insertBefore(s, x);
        }
        bm_website_code = 'E72F01630DCA4C14';
        jQuery(document).ready(function(){async_load('asset.pagefair.com/measure.min.js')});
        jQuery(document).ready(function(){async_load('asset.pagefair.net/ads.min.js')});
    })();


var oo_cookie = String(get_cookie ("ooIMK"));

if  (oo_cookie == "yes")
{
	set_at_cookie ("ooIMK", "yes", "expiresDays=365");
}
else 
{
	var pv_cookie = String(get_cookie ("pageviews"));
	if  (pv_cookie == "null")
	{
		set_cookie ("pageviews", "1");	
		set_at_cookie ("pageviews", "1","expiresSession=1");
	}
	else
	{
		var this_pageview = parseInt(get_cookie ( "pageviews" )) + 1;
		set_cookie ("pageviews", String(this_pageview),"expiresSession=1");
		set_at_cookie ("pageviews", String(this_pageview),"expiresSession=1");
	}
	
	//Amazon
	var aax_src='3028';
    var url = encodeURIComponent(document.location);
    try { url = encodeURIComponent("" + window.top.location); } catch(e) {}
    document.write("<scr"+"ipt src='//aax-us-east.amazon-adsystem.com/e/dtb/bid?src=" + aax_src + "&u="+url+"&cb=" + Math.round(Math.random()*10000000) + "'></scr"+"ipt>");
    document.close();
	
	//Sonobi
	var associations = {};
		associations['1131672'] = '298d862d55b64c833495'; //Newsbusters_ROS_Middle_Right_160x600
		associations['1131656'] = '0094fc216451e23fcbf1'; //Newsbusters_ROS_Top_Right_300x250
		associations['3351331'] = 'ab1331782b8603ddd97d'; //Newsbusters_ROS_Middle_Right_300x250
		associations['3351332'] = '3b9d0f7ad1c676301d8c'; //Newsbusters_ROS_In-Article_Middle_300x250
		associations['1131674'] = '5fca53260b878642ab37'; //Newsbusters_ROS_Top_728x90
		associations['1131674970'] = '1658bbf339ce247b1ab4'; //Newsbusters_ROS_Top_728x90 970
		
	document.write('<scr' + 'ipt type="text/javascript" src=\'http://apex.go.sonobi.com/trinity.js?key_maker=' + JSON.stringify(associations) + '&s=' + Math.floor(Math.random() * 1000) + '\'></scr' + 'ipt>');
	
	//Casale
	document.write('<scr'+'ipt src="http://js.indexww.com/ht/intpg.js"></scr'+'ipt>');
	
	//Criteo
	var crtg_nid = '3290';
	var crtg_cookiename = 'crtg_intermark';
	var crtg_varname = 'crtg_content';
	function crtg_getCookie(c_name){ var i,x,y,ARRCookies=document.cookie.split(";");for(i=0;i<ARRCookies.length;i++){x=ARRCookies[i].substr(0,ARRCookies[i].indexOf("="));y=ARRCookies[i].substr(ARRCookies[i].indexOf("=")+1);x=x.replace(/^\s+|\s+$/g,"");if(x==c_name){return unescape(y);} }return'';}
	var crtg_content = crtg_getCookie(crtg_cookiename);
	var crtg_rnd=Math.floor(Math.random()*99999999999);
	(function(){
	var crtg_url=location.protocol+'//rtax.criteo.com/delivery/rta/rta.js?netId='+escape(crtg_nid);
	crtg_url +='&cookieName='+escape(crtg_cookiename);
	crtg_url +='&rnd='+crtg_rnd;
	crtg_url +='&varName=' + escape(crtg_varname);
	var crtg_script=document.createElement('script');crtg_script.type='text/javascript';crtg_script.src=crtg_url;crtg_script.async=true;
	if(document.getElementsByTagName("head").length>0)document.getElementsByTagName("head")[0].appendChild(crtg_script);
	else if(document.getElementsByTagName("body").length>0)document.getElementsByTagName("body")[0].appendChild(crtg_script);
	})();
	
	/*
	//Krux
	<!--  interchange code -->
	    window.Krux || ((Krux = function() {
      Krux.q.push(arguments);
    }).q = []);
    (function() {
      function retrieve(n) {
        var m, k = 'kx' + n;
        if (window.localStorage) {
          return window.localStorage[k] || "";
        } else if (navigator.cookieEnabled) {
          m = document.cookie.match(k + '=([^;]*)');
          return (m && unescape(m[1])) || "";
        } else {
          return '';
        }
      }
      
	var kvs = [];
	Krux.user = retrieve('user');
	Krux.segments = retrieve('segs') && retrieve('segs').split(',') || [];
	
	if (Krux.user) { 
			kvs.push('kvkuid=' + Krux.user); 
		}
		
	if (Krux.segments) { 
			kvs.push('kvksg=' + Krux.segments.join(':'))
	  }
		Krux.adTechKeyValues = kvs.length ? kvs.join(';') + ';' : '';
	})();
	
	<!-- BEGIN Krux Control Tag for "Newsbusters" -->
	<!-- Source: /snippet/controltag?confid=JSp0qck2&site=Newsbusters&edit=1 -->
	  window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);
	  (function(){
		var k=document.createElement('script');k.type='text/javascript';k.async=true;
		var m,src=(m=location.href.match(/\bkxsrc=([^&]+)/))&&decodeURIComponent(m[1]);
		k.src = /^https?:\/\/([a-z0-9_\-\.]+\.)?krxd\.net(:\d{1,5})?\//i.test(src) ? src : src === "disable" ? "" :
		  (location.protocol==="https:"?"https:":"http:")+"//cdn.krxd.net/controltag?confid=JSp0qck2"
	  ;
		var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);
	  }());
	<!-- END Krux Controltag -->
	*/

	// Comscore, by SS for NY/IW/SS 04192012
	document.write("<script>var _comscore = _comscore || [];_comscore.push({ c1: \"2\", c2: \"8075606\" });(function() {var s = document.createElement(\"script\"), el = document.getElementsByTagName(\"script\")[0]; s.async = true;s.src = (document.location.protocol == \"https:\" ? \"https:\/\/sb\" : \"http:\/\/b\") + \".scorecardresearch.com\/beacon.js\";el.parentNode.insertBefore(s, el);})();<\/script>");
	// Quantcast, by SS for NY/IW/SS 04192012
	document.write("<script type=\"text\/javascript\">var _qevents=_qevents||[];(function(){var elem=document.createElement('script');elem.src=(document.location.protocol==\"https:\"?\"https:\/\/secure\":\"http:\/\/edge\")+\".quantserve.com\/quant.js\";elem.async=true;elem.type=\"text\/javascript\";var scpt=document.getElementsByTagName('script')[0];scpt.parentNode.insertBefore(elem,scpt)})();_qevents.push({qacct:\"p-31q9Yl_0VT7xs\",labels:\"Newsbusters, News, Commentary, Conservative\"});<\/script>");
	
	
	}

function set_cookie ( name, value ) {
	var cookie_string = name + "=" +  escape ( value );
	document.cookie = cookie_string;
	} 

function set_at_cookie ( ATname, ATvalue, ATExpires) {
	var cookie_string = ATname + "=" +  escape ( ATvalue );
	document.write('<scr'+'ipt language="javascript1.1" src="http://adserver.adtechus.com/bind?ckey1=' + ATname + ';cvalue1=' + ATvalue + ';' + ATExpires + ';adct=text/html;misc=123"></scri'+'pt>');
	} 

function get_cookie ( cookie_name ) {
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
	if ( results ) 
	return ( unescape ( results[2] ) ); 
	else 
	return null; 
	} 
	