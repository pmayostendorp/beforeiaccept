/*Config section*/


/* mobile website URI. Script will redirect users to this URI. */
var urlTo = "m.cariboucoffee.com"; //ie m.yourcompany.com


/* referrencing mobile website hostname(-s) or use ref=1 as query paramether in the link from mobile website instead - i.e <a href="http://www.yourcompany.com?ref=1">View full site</a>) */
var referringUrls = new Array("m.cariboucoffee.com");


/*end*/


var isIphone = false;
var isAndroidPhone = false;
var isTierTablet = false;
var isTierIphone = false;
var isTierRichCss = false;
var isTierGenericMobile = false;

var engineWebKit = "webkit";
var deviceIphone = "iphone";
var deviceIpod = "ipod";
var deviceIpad = "ipad";
var deviceMacPpc = "macintosh";

var deviceAndroid = "android";
var deviceGoogleTV = "googletv";
var deviceXoom = "xoom";
var deviceHtcFlyer = "htc_flyer";

var deviceNuvifone = "nuvifone";

var deviceSymbian = "symbian";
var deviceS60 = "series60";
var deviceS70 = "series70";
var deviceS80 = "series80";
var deviceS90 = "series90";

var deviceWinPhone7 = "windows phone os 7";
var deviceWinMob = "windows ce";
var deviceWindows = "windows";
var deviceIeMob = "iemobile";
var devicePpc = "ppc";
var enginePie = "wm5 pie";

var deviceBB = "blackberry";
var vndRIM = "vnd.rim";
var deviceBBStorm = "blackberry95";
var deviceBBBold = "blackberry97";
var deviceBBTour = "blackberry96";
var deviceBBCurve = "blackberry89";
var deviceBBTorch = "blackberry 98";
var deviceBBPlaybook = "playbook";

var devicePalm = "palm";
var deviceWebOS = "webos";
var deviceWebOShp = "hpwos";

var engineBlazer = "blazer";
var engineXiino = "xiino";

var deviceKindle = "kindle";

var vndwap = "vnd.wap";
var wml = "wml";

var deviceTablet = "tablet";
var deviceBrew = "brew";
var deviceDanger = "danger";
var deviceHiptop = "hiptop";
var devicePlaystation = "playstation";
var deviceNintendoDs = "nitro";
var deviceNintendo = "nintendo";
var deviceWii = "wii";
var deviceXbox = "xbox";
var deviceArchos = "archos";

var engineOpera = "opera";
var engineNetfront = "netfront";
var engineUpBrowser = "up.browser";
var engineOpenWeb = "openweb";
var deviceMidp = "midp";
var uplink = "up.link";
var engineTelecaQ = 'teleca q';

var devicePda = "pda";
var mini = "mini";
var mobile = "mobile";
var mobi = "mobi";

var maemo = "maemo";
var linux = "linux";
var qtembedded = "qt embedded";
var mylocom2 = "com2";

var manuSonyEricsson = "sonyericsson";
var manuericsson = "ericsson";
var manuSamsung1 = "sec-sgh";
var manuSony = "sony";
var manuHtc = "htc";

var svcDocomo = "docomo";
var svcKddi = "kddi";
var svcVodafone = "vodafone";

var disUpdate = "update";


var uagent = "";
if (navigator && navigator.userAgent)
    uagent = navigator.userAgent.toLowerCase();


function DetectIphone()
{
   if (uagent.search(deviceIphone) > -1)
   {
      if (DetectIpad() || DetectIpod())
         return false;
      else
         return true;
   }
   else
      return false;
}


function DetectIpod()
{
   if (uagent.search(deviceIpod) > -1)
      return true;
   else
      return false;
}

function DetectIpad()
{
   if (uagent.search(deviceIpad) > -1  && DetectWebkit())
      return true;
   else
      return false;
}

function DetectIphoneOrIpod()
{
   if (uagent.search(deviceIphone) > -1 ||
       uagent.search(deviceIpod) > -1)
       return true;
    else
       return false;
}

function DetectIos()
{
   if (DetectIphoneOrIpod() || DetectIpad())
      return true;
   else
      return false;
}

function DetectAndroid()
{
   if ((uagent.search(deviceAndroid) > -1) || DetectGoogleTV())
      return true;
   if (uagent.search(deviceHtcFlyer) > -1)
      return true;
   else
      return false;
}

function DetectAndroidPhone()
{
   if (DetectAndroid() && (uagent.search(mobile) > -1))
      return true;
   if (DetectOperaAndroidPhone())
      return true;
   if (uagent.search(deviceHtcFlyer) > -1)
      return true;
   else
      return false;
}

function DetectAndroidTablet()
{
   if (!DetectAndroid())
      return false;

   if (DetectOperaMobile())
      return false;

   if (uagent.search(deviceHtcFlyer) > -1)
      return false;

   if (uagent.search(mobile) > -1)
      return false;
   else
      return true;
}

function DetectAndroidWebKit()
{
   if (DetectAndroid() && DetectWebkit())
      return true;
   else
      return false;
}

function DetectGoogleTV()
{
   if (uagent.search(deviceGoogleTV) > -1)
      return true;
   else
      return false;
}

function DetectWebkit()
{
   if (uagent.search(engineWebKit) > -1)
      return true;
   else
      return false;
}

function DetectS60OssBrowser()
{
   if (DetectWebkit())
   {
     if ((uagent.search(deviceS60) > -1 ||
          uagent.search(deviceSymbian) > -1))
        return true;
     else
        return false;
   }
   else
      return false;
}

function DetectSymbianOS()
{
   if (uagent.search(deviceSymbian) > -1 ||
       uagent.search(deviceS60) > -1 ||
       uagent.search(deviceS70) > -1 ||
       uagent.search(deviceS80) > -1 ||
       uagent.search(deviceS90) > -1)
      return true;
   else
      return false;
}

function DetectWindowsPhone7()
{
   if (uagent.search(deviceWinPhone7) > -1)
      return true;
   else
      return false;
}

function DetectWindowsMobile()
{
   if (DetectWindowsPhone7())
      return false;
 
   if (uagent.search(deviceWinMob) > -1 ||
       uagent.search(deviceIeMob) > -1 ||
       uagent.search(enginePie) > -1)
      return true;

   if ((uagent.search(devicePpc) > -1) &&
       !(uagent.search(deviceMacPpc) > -1))
      return true;

   if (uagent.search(manuHtc) > -1 &&
       uagent.search(deviceWindows) > -1)
      return true;
   else
      return false;
}

function DetectBlackBerry()
{
   if (uagent.search(deviceBB) > -1)
      return true;
   if (uagent.search(vndRIM) > -1)
      return true;
   else
      return false;
}

function DetectBlackBerryTablet()
{
   if (uagent.search(deviceBBPlaybook) > -1)
      return true;
   else
      return false;
}

function DetectBlackBerryWebKit()
{
   if (DetectBlackBerry() &&
       uagent.search(engineWebKit) > -1)
      return true;
   else
      return false;
}

function DetectBlackBerryTouch()
{
   if (DetectBlackBerry() &&
        ((uagent.search(deviceBBStorm) > -1) ||
        (uagent.search(deviceBBTorch) > -1)))
      return true;
   else
      return false;
}


function DetectBlackBerryHigh()
{
   if (DetectBlackBerryWebKit())
      return false;
   if (DetectBlackBerry())
   {
     if (DetectBlackBerryTouch() ||
        uagent.search(deviceBBBold) > -1 ||
        uagent.search(deviceBBTour) > -1 ||
        uagent.search(deviceBBCurve) > -1)
        return true;
     else
        return false;
   }
   else
      return false;
}

function DetectBlackBerryLow()
{
   if (DetectBlackBerry())
   {
     if (DetectBlackBerryHigh() || DetectBlackBerryWebKit())
        return false;
     else
        return true;
   }
   else
      return false;
}

function DetectPalmOS()
{
   if (uagent.search(devicePalm) > -1 ||
       uagent.search(engineBlazer) > -1 ||
       uagent.search(engineXiino) > -1)
   {
     if (DetectPalmWebOS())
        return false;
     else
        return true;
   }
   else
      return false;
}

function DetectPalmWebOS()
{
   if (uagent.search(deviceWebOS) > -1)
      return true;
   else
      return false;
}


function DetectWebOSTablet()
{
   if (uagent.search(deviceWebOShp) > -1 &&
       uagent.search(deviceTablet) > -1)
      return true;
   else
      return false;
}

function DetectGarminNuvifone()
{
   if (uagent.search(deviceNuvifone) > -1)
      return true;
   else
      return false;
}

function DetectSmartphone()
{
   if (DetectIphoneOrIpod()
      || DetectAndroidPhone()
      || DetectS60OssBrowser()
      || DetectSymbianOS()
      || DetectWindowsMobile()
      || DetectWindowsPhone7()
      || DetectBlackBerry()
      || DetectPalmWebOS()
      || DetectPalmOS()
      || DetectGarminNuvifone())
      return true;

   return false;
};

function DetectArchos()
{
   if (uagent.search(deviceArchos) > -1)
      return true;
   else
      return false;
}

function DetectBrewDevice()
{
   if (uagent.search(deviceBrew) > -1)
      return true;
   else
      return false;
}

function DetectDangerHiptop()
{
   if (uagent.search(deviceDanger) > -1 ||
       uagent.search(deviceHiptop) > -1)
      return true;
   else
      return false;
}

function DetectMaemoTablet()
{
   if (uagent.search(maemo) > -1)
      return true;
   if ((uagent.search(linux) > -1)
       && (uagent.search(deviceTablet) > -1)
       && !DetectWebOSTablet()
       && !DetectAndroid())
      return true;
   else
      return false;
}

function DetectSonyMylo()
{
   if (uagent.search(manuSony) > -1)
   {
     if (uagent.search(qtembedded) > -1 ||
         uagent.search(mylocom2) > -1)
        return true;
     else
        return false;
   }
   else
      return false;
}

function DetectOperaMobile()
{
   if (uagent.search(engineOpera) > -1)
   {
     if (uagent.search(mini) > -1 ||
         uagent.search(mobi) > -1)
        return true;
     else
        return false;
   }
   else
      return false;
}

function DetectOperaAndroidPhone()
{
   if ((uagent.search(engineOpera) > -1) &&
      (uagent.search(deviceAndroid) > -1) &&
      (uagent.search(mobi) > -1))
      return true;
   else
      return false;
}

function DetectOperaAndroidTablet()
{
   if ((uagent.search(engineOpera) > -1) &&
      (uagent.search(deviceAndroid) > -1) &&
      (uagent.search(deviceTablet) > -1))
      return true;
   else
      return false;
}

function DetectSonyPlaystation()
{
   if (uagent.search(devicePlaystation) > -1)
      return true;
   else
      return false;
};

function DetectNintendo()
{
   if (uagent.search(deviceNintendo) > -1   || uagent.search(deviceWii) > -1 || uagent.search(deviceNintendoDs) > -1)
      return true;
   else
      return false;
};

function DetectXbox()
{
   if (uagent.search(deviceXbox) > -1)
      return true;
   else
      return false;
};


function DetectGameConsole()
{
   if (DetectSonyPlaystation())
      return true;
   if (DetectXbox())
      return true;
   else
      return false;
};

function DetectKindle()
{
   if (uagent.search(deviceKindle) > -1)
      return true;
   else
      return false;
}

function DetectMobileQuick()
{
   if (DetectTierTablet())
      return false;

   if (DetectSmartphone())
      return true;

   if (uagent.search(deviceMidp) > -1 || DetectBrewDevice())
      return true;

   if (DetectOperaMobile())
      return true;

   if (uagent.search(engineNetfront) > -1)
      return true;
   if (uagent.search(engineUpBrowser) > -1)
      return true;
   if (uagent.search(engineOpenWeb) > -1)
      return true;

   if (DetectDangerHiptop())
      return true;
      
   if (DetectMaemoTablet())
      return true;
   if (DetectArchos())
      return true;

   if ((uagent.search(devicePda) > -1) &&
        !(uagent.search(disUpdate) > -1))
      return true;
   if (uagent.search(mobile) > -1)
      return true;

   if (DetectKindle())
      return true;
      
   return false;
};

function DetectMobileLong()
{
   if (DetectMobileQuick())
      return true;
   if (DetectGameConsole())
      return true;
   if (DetectSonyMylo())
      return true;

   if (uagent.search(manuSamsung1) > -1 || uagent.search(manuSonyEricsson) > -1 || uagent.search(manuericsson) > -1)
      return true;

   if (uagent.search(svcDocomo) > -1)
      return true;
   if (uagent.search(svcKddi) > -1)
      return true;
   if (uagent.search(svcVodafone) > -1)
      return true;


   return false;
};

function DetectTierTablet()
{
   if (DetectIpad()
        || DetectAndroidTablet()
        || DetectBlackBerryTablet()
        || DetectWebOSTablet())
      return true;
   else
      return false;
};

function DetectTierIphone()
{
   if (DetectIphoneOrIpod())
      return true;
   if (DetectAndroidPhone())
      return true;
   if (DetectBlackBerryWebKit() && DetectBlackBerryTouch())
      return true;
   if (DetectPalmWebOS())
      return true;
   if (DetectGarminNuvifone())
      return true;
   else
      return false;
};

function DetectTierRichCss()
{
    if (DetectMobileQuick())
    {
       if (DetectTierIphone())
          return false;
          
       if (DetectWebkit())
          return true;
       if (DetectS60OssBrowser())
          return true;

       if (DetectBlackBerryHigh())
          return true;
          
       if (DetectWindowsPhone7())
          return true;
       if (DetectWindowsMobile())
          return true;
          
       if (uagent.search(engineTelecaQ) > -1)
          return true;
          
       else
          return false;
    }
    else
      return false;
};

function DetectTierOtherPhones()
{
    if (DetectMobileLong())
    {
       if (DetectTierIphone() || DetectTierRichCss())
          return false;

       else
          return true;
    }
    else
      return false;
};

function InitDeviceScan(url)
{
var urlto = "http://" + url;
    isIphone = DetectIphoneOrIpod();
    isAndroidPhone = DetectAndroidPhone();
    isTierIphone = DetectTierIphone();
    isTierTablet = DetectTierTablet();

    if(DetectMobileQuick()){
       location.replace(urlto);
    }
};



/*custom*/
function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if ( 
aQueryString[iParam].indexOf(strParamName.toLowerCase() + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return unescape(strReturn);
}
/*end*/


/*cookies manager*/
function createCookie(name,value,days) {
	if (days) {
		/* set time, it's in milliseconds*/
		var today = new Date();
		today.setTime( today.getTime() );

		/*
		x number of days, to make it for hours,
		delete * 24, for minutes, delete * 60 * 24
		*/
		if ( expires )
		{
		expires = expires * 1000 * 60 * 60;/* * 24;*/
		}
		var date = new Date( today.getTime() + (expires) );


		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}
/*end of cookies manager*/


function searchReferrer(arr, obj) {
    for(var i=0; i < arr.length; i++) {
        if (arr[i] == obj || "www." + arr[i] == obj) return true;
    }
}

var referrer = "";
if (document.referrer != '') {
	try {
		referrer = document.referrer.split('/')[2];
	}
	catch(err){	}	
}


/*init mobile detection*/
if(getURLParam("ref").length > 0 || (searchReferrer(referringUrls, referrer) == true)) {
	eraseCookie("mobileDetection");
	createCookie('mobileDetection', '1', 1);
} else {
	if (!readCookie('mobileDetection')) {
		InitDeviceScan(urlTo);
	}
}
/**/