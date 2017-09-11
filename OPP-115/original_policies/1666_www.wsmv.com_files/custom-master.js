/* GLOBAL SCRIPT FILE INCLUDES */
document.write('<script type="text/javascript" src="http://content.worldnow.com/global/interface/httprequest/httprequest.js"></script>');
document.write('<script type="text/javascript" src="http://ftpcontent.worldnow.com/wncustom/js/wxmanager.js"></script>');

//CrazyEgg
document.write('<script type="text/javascript">setTimeout(function(){var a=document.createElement("script");var b=document.getElementsByTagName("script")[0];a.src=document.location.protocol+"//dnn506yrbagrg.cloudfront.net/pages/scripts/0018/6980.js?"+Math.floor(new Date().getTime()/3600000);a.async=true;a.type="text/javascript";b.parentNode.insertBefore(a,b)}, 1);</script>');

CDEV = {};
var v2 = true;
var ht = '';
var hw = '';
var hr = '';
var hq = '';
var bp = '';
ht = '1';
function getInternetExplorerVersion()
{
  var rv = -1;
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  else if (navigator.appName == 'Netscape')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
ht = '2';
var ieTest = getInternetExplorerVersion();
if(ieTest !== -1){
	$wn('html').addClass('ie ie' + ieTest);
}
ht = '3';
/* JS from old custom-master */
function fixDate($el) {
	$el.find("script").remove();
	$el.find("noscript").remove();
	$el.html($el.text());
	return $el.html();
};
ht = '4';
var currentTime = new Date();
ht = '5';
function tsr_timeAgo(fullTime, cT, iD, original, $el) {
	//1D2H45M5S252MS
	var tdays = fullTime.substring(0, fullTime.indexOf("D"));
	if (tdays < 1) {
		var thours = fullTime.substring(fullTime.indexOf("D") + 1, fullTime.indexOf("H"));
		var tmins = fullTime.substring(fullTime.indexOf("H") + 1, fullTime.indexOf("M"));
		tmins = (60 * parseInt(thours) + parseInt(tmins));
		if (tmins < 60) {//if(tmins < 20){
			$el.addClass("markNew");
			//}
			tmins = "Updated: " + tmins + " minutes ago";
			return tmins;
		} else {
			return original;
		}
	} else {
		return original;
	}
};
ht = '6';
/* Include TimeDifference JS */
document.write('<script type="text/javascript" src="http://ftpcontent.worldnow.com/revenue/js/timeDifference.js"></script>');
ht = '7';
/* Ad Variables */
var wnAdSplit = '[{name:\"' + wng_pageInfo.affiliateName + '\",nat:0,loc:1}]';
var wnAd_wncc = wng_pageInfo.contentClassification.toLowerCase();
while (wnAd_wncc.indexOf(" ") != -1) {
	wnAd_wncc = wnAd_wncc.replace(" ", "");
}
ht = '8';
/* More Link Re-position */
function CSsetMoreLink() {
	$wn(".header h3 .more .text").html("More &gt;");
};
ht = '9';
/* Video Clip */
function CSsetVideoClip() {
	$wn(".wnRole-CLIP a").append("<span class='wn-icon wn-icon-clip' title='Play Video'></span>");
};
ht = '10';

ht = '11';
/* Column 3 Additional National Call - category page onlye exclude homepage */
function CScol3addNatAd() {
	var $ad = '<div id="WNAd100" class="wnad wnad100"></div>';
	if ($wn("#DisplaySizeId27").length) {
		$wn("#DisplaySizeId27 .contentGroup:first").after($ad);
	} else {
		$wn("#WNCol3").append($ad);
	}
};
ht = '12';

ht = '13';
function CStaboolaText() {
	if (wng_pageInfo.containerType === 'S') {
		_taboola.push({
			mode : 'autosized-generated-text-links-6r',
			container : 'taboola-below-main-column-mix',
			placement : 'below-main-column',
			target_type : 'text'
		});
		$wn("#WNStoryBody").after("<div id='taboola-below-main-column-mix'></div>");
	};
}
ht = '14';
/* Story Page Related Items */
function CSstory180x150() {
	/* MOVE 180x150 AD TO TOP */
	if ($wn("#WNAd20").length > 0 && $wn("#WNStoryRelatedBox").length > 0) {
		$wn("#WNAd20").prependTo("#WNStoryRelatedBox");
	}
};
ht = '15';
/* Move Text Ad in between story body and comments (has Outbrain) */
function CSstoryTextLink() {
	bp = '1';
	if ($wn("#WNAd54").length > 0) {

		if (!/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {//test for MSIE x.x;
			$wn("#WNAd54").hide();
			$wn("#WNStoryBody").after("<div id='wnTextAd'></div>");
			$wn("#WNAd54").appendTo($wn("#wnTextAd"));
		}
	}
};
ht = '16';
/* Generic RSS block */
function WNGetRSS(blockTitle, ribbonText, numItems, rssURL, containerID, imgPath) {
	function rssInitContent() {
		rssParseXML(this);
	}

	function rssErrorFunction(e) {
	}

	function makeRSSRequest() {
		WNHttpRequestManager.makeRequest(rssURL, {
			onSuccess : rssInitContent,
			onError : rssErrorFunction
		});
	};

	makeRSSRequest();

	function rssParseXML(xml) {
		var fullFeed = xml.response.responseXML;
		var totalItems = ($wn(fullFeed).find("item").length);
		if (totalItems) {
			if (ribbonText == true) {
				var buildCont = "<div id='rss" + containerID + "' class='wnBlock displaySize rss'><ul class='wnGroup' style='clear:both;'><li class='wnItem header'><h3><span class='text' style='display:inline;'>" + blockTitle + "</span></h3></li>";
			} else if (ribbonText == false && imgPath) {
				var buildCont = "<div id='rss" + containerID + "' class='wnBlock displaySize rss'><ul class='wnGroup' style='clear:both;'><li class='wnItem header'><h3 style='width:100%;height:36px;background-image:url(http://KPHO.images.worldnow.com/images/606379_G.gif);background-repeat:no-repeat;background-position:left bottom;'><span class='text' style='display:inline;'>&nbsp;</span></h3></li>";
			} else if (ribbonText == false) {
				var buildCont = "<div id='rss" + containerID + "' class='wnBlock displaySize rss'><ul class='wnGroup' style='clear:both;'>";
			}
			if (totalItems > numItems) {
				totalItems = numItems;
			}
			var $items = $wn(fullFeed).find("item:lt(" + totalItems + ")");
			$items.each(function(xx) {
				var headline = $wn(this).find("title").text();
				var pageURL = $wn(this).find("link").text();

				buildCont += "<li class='wnItem feature priority-" + (xx + 1) + "'><h4 class='wnContent headline'><a href='" + pageURL + "' target='_blank'><span class='text'>" + headline + "</span></a></h4></li>";
			});

			buildCont += "</ul></div>";

			$wn("#wn" + containerID).html(buildCont);
		}
	}

};
ht = '17';
/* Extra Leaderboard above footer */
function CSextraLeaderboard() {

	var $ad = '<div id="WNAd101" class="wnad wnad101"></div>';

	$wn('#WNFooter').before('<div id="csBottomLeaderboard"></div>');
	$wn('#csBottomLeaderboard').append($ad);

};
ht = '18';
/* Date in all footers */
function footerDate() {
	var today = new Date;
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	Date.prototype.getMonthName = function() {
		return months[this.getMonth()];
	};
	var day = today.getDate();
	var month = today.getMonthName();
	var year = today.getFullYear();

	$('#csFooterBottomText br').after(month + ' ' + day + ' ' + year + ' ' + '|' + ' ');
};
ht = '19';
/* Register Functions to Col23Done Event Manager */

PLATFORM.EventMan.registerToEvent(function() {
	if (wng_pageInfo.containerType === "S") {
		if(wng_page_containerId === 26550929){
			hw = 'got here';
			//return;
		}
		if (wng_pageInfo.affiliateName !== 'WFSB' && wng_pageInfo.affiliateName !== 'WGCL' && wng_pageInfo.affiliateName !== 'WSMV' && wng_pageInfo.affiliateName !== 'WNEM' && wng_pageInfo.affiliateName !== 'KVVU') {
			CStaboolaText();
		}
		CSstory180x150();
		CSstoryTextLink();
	}

}, 'WNCol23done');
ht = '20';
/* Register Functions to Col23Done Event Manager */

PLATFORM.EventMan.registerToEvent(function() {
	if (wng_pageInfo.containerType === "C" && wng_pageInfo.contentClassification !== "Homepage" && wng_page_containerId !== 227056) {
		CScol3addNatAd();

	}
}, 'WNCol3done');
ht = '21';
/* Register Functions to Col4Done Event Manager */

Worldnow.EventMan.event('WNCol4done', function() {

	// UPDATED DATASPHERE CODE

	if (wng_pageInfo.containerType === "S" && wng_pageInfo.affiliateName !== 'KVVU') {
		if(wng_pageInfo.affiliateName === 'WGCL' && $wn('html').hasClass('ie')){
			hq = 'dead mice';
			return;
		}
		var affName = wng_pageInfo.affiliateName;
		var affNameLow = affName.toLowerCase();
		var ds_page = affNameLow + '/article';
		var ds_pos = 'Frame2';
		var ds_site = affName;
		var ds_rdm = (Math.random() + '').substr(2);
		var ds_var = 'page=' + ds_page + '|pos=' + ds_pos + '|site=' + ds_site + '|width=300|height=250';
		var ds_spt = '<div id="dsns' + ds_rdm + '" class="dsnsasyncad" rel="' + ds_var + '"><script type="text/javascript" src="http://ftpcontent.worldnow.com/wncustom/custom/meredith/datasphere/asyncadload.js"></script>';

		$wn('#WNCol4').append(ds_spt);
		$wn('#WNCol4').append('<div id="dsnsevents"></div><div id="dsnscommunityevents"></div>');
	}

});
ht = '22';
/* Register Functions to BodyDone Event Manager */

PLATFORM.EventMan.registerToEvent(function() {
	if (wng_page_containerId !== 227056) {
		CSextraLeaderboard();
	}

	CSsetMoreLink();
	CSsetVideoClip();
	footerDate();

	/* IE 10 Workaround */
	if ($wn.browser.msie && parseInt($wn.browser.version, 10) === 10) {
		$wn('#WNCol23').addClass('ie10');
	}
}, 'bodydone');
ht = '23';

 /* Taboola widget insertion */

if (wng_pageInfo.containerType === 'S' /*&& wng_page_containerId !== 26550929*/) {
	window._taboola = window._taboola || [];
	window._taboola.push({
		article : 'auto'
	});
	window._taboola.push({
		mode : 'grid-4x2',
		container : 'taboola-grid-4x2'
	});
	PLATFORM.EventMan.registerToEvent(function() {
		$wn('#WNStoryBody').append('<div id="taboola-grid-4x2"></div>');
	}, 'WNCol23done');
	PLATFORM.EventMan.registerToEvent(function() {
		document.write('<script type="text/javascript" src="http://cdn.taboolasyndication.com/libtrc/meredith-network/loader.js"></script>');
	}, 'bodydone');
};
ht = '24';
$wn(document).ready(function() {
	if(wng_page_containerId === 26550929){
		hr = 'here33';
		//return;
	}
	if ($wn.browser.mozilla && wng_pageInfo.affiliateName === 'KVVU' && wng_pageInfo.contentClassification === "Homepage") {

		$wn('#WNAd52 div:nth-child(1)').remove();
	}

	if (wng_pageInfo.containerType === 'S') {
		if(wng_page_containerId === 26550929){
			hr = 'here1';
			//return;
		}
		if (wng_pageInfo.affiliateName === 'WFSB' || wng_pageInfo.affiliateName === 'WGCL' || wng_pageInfo.affiliateName === 'WSMV' || wng_pageInfo.affiliateName === 'WNEM' || wng_pageInfo.affiliateName === 'KVVU') {
			_taboola.push({
				mode : 'autosized-generated-text-links-6r',
				container : 'taboola-below-main-column-mix',
				placement : 'below-main-column',
				target_type : 'text'
			});
			$wn("#wnSocialToolsSection").before("<div id='taboola-below-main-column-mix'></div>");
		}
	};
});
ht = '25';

ht = '26';

ht = '27';
/* Above Branding */
function csSocialLinks(customConfig) {

	var defaultConfig = {
		facebook : '/',
		twitter : '/',
		google : '/',
		mobile : '/'
	};
	var config = $wn.extend({}, defaultConfig, customConfig);

	$wn('#WNContainerMemberSearch-headertop').append('<div id="csSocial">' + '<span>Connect: </span>' + '<a href="' + config.facebook + '" id="facebook" target="_blank"></a>' + '<a href="' + config.twitter + '" id="twitter" target="_blank"></a>' + '<a href="' + config.google + '" id="google" target="_blank"></a>' + '<a href="' + config.mobile + '" id="mobile"></a>' + '<div class="wnClear></div>' + '</div>');
};
ht = '28';
function csRebuildMember(customConfig) {

	var defaultConfig = {
		email : '/',
		texts : '/'
	};
	var config = $wn.extend({}, defaultConfig, customConfig);

	/* cache selectors */
	var $csMem1 = $wn("#WNHeader .wnMemberCenter li.wnMemberOption-accountCreate a");
	var $csMem2 = $wn("#WNHeader .wnMemberCenter li.wnMemberOption-logIn a");
	$wn("#WNHeader .wnMemberCenter strong").text("Newsletters + Alerts:");

	$wn($csMem1).text("E-mail");
	$wn($csMem1).attr("href", config.email);
	$wn($csMem2).text('Text');
	$wn($csMem2).attr("href", config.texts);
	$wn($csMem2).attr("target", "_blank");

};

ht = '29';
$(document).ready(function() {
	
	/*Bottom Leaderboard*/
	if(wng_pageInfo.affiliateName.toLowerCase() === 'wala'){
		//ad.options.ownerinfo.owner = 'loc';	
		//ad.options.template = "";
		//ad.options.template = ad.options.template.replace('nat-desktop', 'loc-desktop');
		
			var ad = new Worldnow.Ad({
			id : '101',
			ownerinfo : {
				aff : wng_pageInfo.affiliateName,
				share : 100,
				oldformat : 1
			},
			width : '728',
			height : '90',
			wncc : wng_pageInfo.contentClassification,
			type : 'dom',
			application : 'banner',
			parent : 'WNAd101',
		});
		ad.load();
	}else {
		var ad = new Worldnow.Ad({
			id : '101',
			ownerinfo : {
				aff : wng_pageInfo.affiliateName,
				oldformat : 1,
				owner : "nat",
				split : "100"
			},
			width : '728',
			height : '90',
			wncc : wng_pageInfo.contentClassification,
			type : 'dom',
			application : 'banner',
			parent : 'WNAd101',
			template : "/43459271/nat-desktop/[page.affiliate:lowercase]/[page.responsive:gptapplication]/[ad.wncc:dfpformat]",
		});
		ad.load();
	}
	var ad = new Worldnow.Ad({
		id : '100',
		ownerinfo : {
			aff : wng_pageInfo.affiliateName,
			share : 1
		},
		width : '300',
		height : '250',
		wncc : wng_pageInfo.contentClassification,
		type : 'dom',
		application : 'banner',
		parent : 'WNAd100'
	});
	ad.load();

});
ht = '30';
$(window).load(function() {
		if(wng_page_containerId === 26550929){
			hr = 'here2';
			//return;
		}
	$wn("#taboola-below-main-column-mix").insertBefore("#wnTextAd");
})
