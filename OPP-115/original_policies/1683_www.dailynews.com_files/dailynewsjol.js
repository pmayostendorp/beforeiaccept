var ppHref = document.location.href;
var splitThePathName = document.location.pathname.split('/');
var ppFullUrl = splitThePathName[1] + '/' + splitThePathName[2];
var ppHomepage = "http://www.dailynews.com/";
var paywallEnabled = true;
var patt = new Array();
// words you want to exclude from JOL

patt.push(/alerts/i);
patt.push(/allaccess/i);
patt.push(/archivesearch/i);
patt.push(/autos/i);
patt.push(/contactus/i);
patt.push(/breaking/i);
patt.push(/classifieds/i);
patt.push(/jobs/i);
patt.push(/latest/i);
patt.push(/marketplace/i);
patt.push(/obits/i);
patt.push(/portlet/i);
patt.push(/real-estate/i);
patt.push(/realestate/i);
patt.push(/rss/i);
patt.push(/sitemap/i);
patt.push(/specialsections/i);
patt.push(/traffic/i);
patt.push(/latestnews/i);
patt.push(/latest-news/i);
patt.push(/breakingnews/i);
patt.push(/breaking-news/i);
patt.push(/faq/i);
patt.push(/sponsor/i);
patt.push(/sponsor-content/i);
patt.push(/sponsored/i);
patt.push(/sponsored-content/i);
patt.push(/m-sponsor/i);


for (var i=0; i<patt.length; i++) {
	var ppResult = patt[i].exec(ppFullUrl);
		if ((ppResult != null) || (ppHref == ppHomepage)) {break;}
	 	if (ppResult == null && i == patt.length-1 && paywallEnabled){
			 document.write("<scr"+"ipt src='http://s.ppjol.net/pp.js'>{'zone':'bAn2hDG67qPDoY9qmt4nRh','mode':'meter','debug':0}<"+"/script>");
			 break;
			 }
	}
