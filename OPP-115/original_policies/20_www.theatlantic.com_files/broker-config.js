/*
Copyright (c) 2009, comScore Inc. All rights reserved.
version: 4.5.3
*/
var sr_domain='';
var _regEx = '';
var _mod = false;
var _halt = true;
var SR_url = window.location.toString().toLowerCase();
var SR_url_stripped = SR_url.split("?");
var SR_ref = document.referrer.toString().toLowerCase();
var browser = COMSCORE.SiteRecruit.Utils.getBrowser();
var _inv;
var _kwlookup = [];

if(SR_url_stripped[0].search('theatlantic.com') != -1 ){	
	sr_domain = 'theatlantic.com';
}else if(SR_url_stripped[0].search('theatlanticwire.com') != -1){	
	sr_domain = 'theatlanticwire.com';
}else if(SR_url_stripped[0].search('theatlanticcities.com') != -1){
	sr_domain = 'theatlanticcities.com';
}else{
	_halt=true;
}
// MOD: Respondent Groups
function SR_findGrp(SR_u, SR_ref, browserFlag) 
{
	var mtd;
	// If no Referrer and not IE7, they are Organic non-referred
	//if (SR_ref == '' && !browserFlag) { mtd=4; }
	
	// If Referrer indicates freebie site, they are organic
	var SR_exc = "totallyfreestuff,freestuff,sweepsadvantage,slickdeals,online-sweepstakes,freesamplesite,freebie,ezboard,lilbitofheaven,forum,bigbigsavings,itsfree,proboards,thread,freestufftimes,freesamplesite,fatwallet,slickdeals";
	var SR_excAr = SR_exc.split(',');
	var SR_isExc = false;
	for (var SR_p in SR_excAr) { if (SR_ref.indexOf(SR_excAr[SR_p]) != -1) { SR_isExc = true;	} }
	if (SR_isExc == true) { return 0; }
	_kwlookup[0] = ['src=1'];
	_kwlookup[1] = ['src=2'];


	for (i=0; i < _kwlookup.length; i++) {
	if (SR_url.indexOf(_kwlookup[i]) !== -1 || SR_ref.indexOf(_kwlookup[i]) !==  -1) {
		
		mtd=i + 1;
		return mtd;
	}
	}	
		if(SR_ref == ''){
			//If no referrer at this point, reset to Organic non-Referred, Firefox Flash bug
			mtd = 4;
			
		}
		else{// If there is a referrer, they are Organic/Natural Search
			mtd = 3;
			
		}
		return mtd;
}

var SR_grp = SR_findGrp(SR_url, SR_ref, browser.ie);
var grp = SR_grp;
SR_grp = 'mtd=' + grp + '&type=3&grp=3';

COMSCORE.SiteRecruit.Broker.config = {
	version: "4.5.3",
		testMode: _mod,
	// cookie settings
	cookie:{
		name: 'atresearch',
		path: '/',
		domain:  sr_domain,
		duration: 90,
		rapidDuration: 0,
		expireDate: ''
	},

	eddListenerUrl: '',
	
	// optional prefix for pagemapping's pageconfig file
	prefixUrl: "",

		mapping:[
	// m=regex match, c=page config file (prefixed with configUrl), f=frequency
	{m: '//.*theatlantic\\.com', c: 'inv_c_atlantic-1513.js', f: 0, p: 1, halt: true	}
	,{m: '//.*theatlanticwire\\.com', c: 'inv_c_atlantic-1514.js', f: 0.20, p: 1, halt: _halt	}
	,{m: '//.*theatlanticcities\\.com', c: 'inv_c_atlantic-1515.js', f: 0, p: 1, halt: true	}
]
};
COMSCORE.SiteRecruit.Broker.run();