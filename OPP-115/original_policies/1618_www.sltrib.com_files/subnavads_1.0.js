//LAST UPDATED 2014/05/06 =AMR=
var subNavAds = new Array();
subNavAds["home"] = new Array();
subNavAds["news"] = new Array();
subNavAds["sports"] = new Array();
subNavAds["blogs"] = new Array();
subNavAds["opinion"] = new Array();
subNavAds["money"] = new Array();
subNavAds["lifestyle"] = new Array();
subNavAds["entertainment"] = new Array();
subNavAds["obituaries"] = new Array();
subNavAds["jobs"] = new Array();
subNavAds["homes"] = new Array();
subNavAds["cars"] = new Array();
subNavAds["classifieds"] = new Array();
subNavAds["shopping"] = new Array();
//HOME ADS
subNavAds["home"].push("/csp/mediapool/sites/shared/assets/img/subnavads/kengarffhonda_small.jpg|http://ex.utahdigitalweb.com/admin/ct/track.php?id=764"); //KEN GARFF HONDA DOWNTOWN
//NEWS ADS
/* no ads */
//SPORTS ADS
/* no ads */
//BLOGS ADS
/* no ads */
//OPINION ADS
/* no ads */
//MONEY ADS
/* no ads */
//LIFESTYLE ADS
/* no ads */
//ENTERTAINMENT ADS
subNavAds["entertainment"].push("/csp/mediapool/sites/shared/assets/img/subnavads/holmeshomes.jpg|http://ex.utahdigitalweb.com/admin/ct/track.php?id=105"); //HOLMES HOMES
//OBITUARIES ADS
/* no ads */
//JOBS ADS
subNavAds["jobs"].push("/csp/mediapool/sites/shared/assets/img/subnavads/vivint.jpg|http://ex.utahdigitalweb.com/admin/ct/track.php?id=621"); //VIVINT
//HOMES ADS
subNavAds["homes"].push("/csp/mediapool/sites/shared/assets/img/subnavads/holmeshomes.jpg|http://ex.utahdigitalweb.com/admin/ct/track.php?id=105"); //HOLMES HOMES
//CARS ADS
subNavAds["cars"].push("/csp/mediapool/sites/shared/assets/img/subnavads/natewade.jpg|http://ex.utahdigitalweb.com/admin/ct/track.php?id=763"); //NATE WADE SUBARU
//CLASSIFIEDS ADS
/* no ads */
//SHOPPING ADS
/* no ads */
function writeSubNavAd(which) {
	numberofads = subNavAds[which].length;
	if(numberofads > 0) {
		randomAd = Math.floor(Math.random()*(numberofads-1));
		adstring = subNavAds[which][randomAd];
		ad = adstring.split('|');
		document.write("<a class=\"subNavAd\" href=\"" + ad[1] + "\" target=\"_blank\" class=\"noB\"><img src=\"" + ad[0] + "\"></a>");
	}	
}



