var oo = String(get_cookie ("ooIMK"));
var ATFplacements = "3208287, 3101938, 3281727, 3101936, 3101937, 3205788, 1131634, 1131636, 1131633, 2408599, 2408601, 3390620, 3102475, 3390618, 3102476, 3199391, 1131656, 3195489, 1131674, 3361096, 3361091, 3361092, 2798684, 2798670, 2799621, 1133013, 1891400, 3347457, 3139053, 3361089, 3102473, 1131607, 3503626, 1290630, 1290628, 1131569, 1131571, 1131572, 1131566, 1131624, 3554566, 3556486, 3556506, 3557874";
var valuation = "";
var this_view = "";
var is_ar = "";
var imk_category = "";
var imk_tags = "";
var this_browser = "";
var this_scrwidth = "";
var this_scrheight = "";
var this_domain = "";
var amzn_targs = "";
var criteo_sizes = "";
var kruxaud = "";
var adtech_code = "";
var this_size = "";
var thisOX = "";

if ( oo != "yes" ) {
	
	//Rubicon
	try {
		var rp = new RubiconInsight();
		var rp_estimate = { tier : rp_valuation.estimate.tier, cpm: rp_valuation.estimate.cpm};
		valuation = rp.getAsAdTechKeyValues(rp_estimate);
	} catch (e) { }
	
	//Krux
	if (typeof window.Krux != 'undefined') {
	var kruxaud = window.Krux.adTechKeyValues;
	}

	var this_view = String(get_cookie ("pageviews"));
	var is_ar = String(get_cookie ("imkar"));
	var imk_category = String(get_cookie ("IMKcategory"));
	var this_browser = getBrowser(navigator.userAgent);
	var this_domain = getDomain();
	var this_scrwidth = getScrWidth();
	var this_scrheight = getScrHeight();
		
}

function get_cookie ( cookie_name ) {
	var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
	if ( results ) 
	return ( unescape ( results[2] ) ); 
	else 
	return null; 
	}
	
function set_cookie_expDays ( name, value , expireDays ) {
	var date = new Date();
	date.setTime(date.getTime()+(expireDays*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	var cookie_string = name + "=" +  escape ( value ) + expires;
	document.cookie = cookie_string;
	} 
	
function cleanUp(str){
	if(!(str)) { // checks if value exists, if it doesn't it does now
		str = "none"
	};
	str = String(str) //converts numbers to strings
	str = str.replace(".js","") //removes .js from the end of the value to make it all numbers
	str = escape(str) //character escapes value in case it's malicious
	str = str.replace("%20"," ")
	return str;
}
	
function loadIMK(loadSite,loadID,loadUnit,FrecCap,FrecHours,loadTags){
	
		
	var loadSize = "0" ;
		if  (loadUnit == "300x250")	{ loadSize = "170"; this_size = "300";}
		else if  (loadUnit == "728x90")	{ loadSize = "225"; this_size = "728"; }
		else if  (loadUnit == "160x600")	{ loadSize = "154"; this_size = "160"; }
		else if  (loadUnit == "1x1")	{ loadSize = "16"; }
		
	var thisPlacement = loadID;
	var placementSizes = loadUnit;
	var domain = window.location.href;
	if (ATFplacements.indexOf(thisPlacement)>=0 ) {var placementPos = "top";} else {var placementPos = "bottom";}
	
	if ((domain.indexOf('newsbusters.org')>=0) || (domain.indexOf('mrc.org')>=0)  || (domain.indexOf('cnsnews.com')>=0) || (domain.indexOf('mrctv.org')>=0)) {
		var oxAvail = [];
		if (placementSizes.indexOf("300x600")>=0 ) {oxAvail.push("537654341");}
		if ((placementSizes.indexOf("160x600")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654340");}
		if ((placementSizes.indexOf("160x600")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654339");}
		if ((placementSizes.indexOf("300x250")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654338");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654337");}
		if ((placementSizes.indexOf("728x90")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654336");}
		if ((placementSizes.indexOf("728x90")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654342");}
		}
		
		else if (domain.indexOf('refdesk.com')>=0) {
			if (placementSizes.indexOf("300x250")>=0 ) {var oxAvail = ["537980516"];}
			if (placementSizes.indexOf("728x90")>=0 ) {var oxAvail = ["537980503"];}
			if (placementSizes.indexOf("160x600")>=0 ) {var oxAvail = ["537980515"];}
		}
		
		else {
	
		var oxAvail = [];
		if (placementSizes.indexOf("300x600")>=0 ) {oxAvail.push("537245128");}
		if ((placementSizes.indexOf("160x600")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205651");}
		if ((placementSizes.indexOf("160x600")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205652");}
		if ((placementSizes.indexOf("300x250")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205646");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205647");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537215358");}
		if ((placementSizes.indexOf("728x90")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205649");}
		if ((placementSizes.indexOf("728x90")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205650");}
		}
		
		//Criteo
	//crtg_content = 'intmark728=1;intmark600=1;intmark250=1'; //For Testing only
	var critPric = 0; var crit_targs = "";
	if ((crtg_content != undefined) & (crtg_content != "")) {
		if ((crtg_content.indexOf("160") >= 0) && (placementSizes.indexOf("160x600")>=0)) {critPric = 200; crit_targs = "kvcriteo=200;"}		
		if ((crtg_content.indexOf("728") >= 0) && (placementSizes.indexOf("728x90")>=0)) {critPric = 250; crit_targs = "kvcriteo=728;"}
		if ((crtg_content.indexOf("250") >= 0) && (placementSizes.indexOf("300x250")>=0)) {critPric = 250; crit_targs = "kvcriteo=250;"}
		if ((crtg_content.indexOf("600") >= 0) && (placementSizes.indexOf("300x600")>=0)) {critPric = 250; crit_targs = "kvcriteo=600;"}
		if ((crtg_content.indexOf("720") >= 0) && (placementSizes.indexOf("720x300")>=0)) {critPric = 500; crit_targs = "kvcriteo=720t;kvcriteo=720;"}
		if ((crtg_content.indexOf("970") >= 0) && (placementSizes.indexOf("970x250")>=0)) {critPric = 650; crit_targs = "kvcriteo=970t;kvcriteo=970;"}
	}
	
	//Amazon
	//document.amzn_slots = ['a300x250p10','a300x250p8','a728x90p5'] //For Testing only
	var amzn_bid = 0;
	var amazPric = 0; var amzn_targs320 = 0;
	var amzn_targs = '';

	if (window.winBids.indexOf("kvamazon") < 0 ) {
		if (typeof document.amzn_slots != 'undefined') { 
				for (var i = 0; i < document.amzn_slots.length; i++) {
					var thisAmz = document.amzn_slots[i];
					 var thisP = thisAmz.indexOf("p");
					 var amazSize = thisAmz.substring(1, thisP);
					 var amazPval = thisAmz.substring(thisP+1);
						switch(amazPval) {
							case "1":amazPric = 600;break;
							case "2":amazPric = 550;break;
							case "3":amazPric = 500;break;
							case "4":amazPric = 450;break;
							case "5":amazPric = 400;break;
							case "6":amazPric = 350;break;
							case "7":amazPric = 300;break;
							case "8":amazPric = 250;break;
							case "9":amazPric = 200;break;
							case "10":amazPric = 150;break;
							case "11":amazPric = 100;break;
							default:amazPric = 000;
						}
						if ((amazPric > amzn_bid) && (placementSizes.indexOf(amazSize)>=0)) {
							amzn_bid = amazPric;
							amzn_targs = "kvamazon=a" + amazSize + "p" + amazPval + ";"; 
							}
						if (amazSize == "320x50") {
							amzn_targs320 = "kvamazon=a" + amazSize + "p" + amazPval + ";"; 
							}
							
				}
		}
	}
		
	//Casale
	var csbid = 0;var cssize = "";var csvalue = "";var csvalue320 = "";
	//index_slots = ['0_drudge_320x50_100','0_drudge_300x250b_500','0_drudge_728x90_300']; //For Testing only
     if (typeof index_slots !== 'undefined'){
		for ( var i=0; i < index_slots.length; i++ ) {
			//console.log(index_slots[i]);
			cssize = index_slots[i].split("_")[2];
			if (window.winBids.indexOf(cssize + "=") < 0 ) {
				if (cssize == "300x250b" || cssize == "300x250c") {cssize = "300x250"};
				csbidNew = index_slots[i].split("_")[3];
				if((placementSizes.indexOf(cssize)>=0) && (csbidNew > csbid)) {
					csbid = csbidNew;
					 csvalue = "kvcs" + index_slots[i].split("_")[2] + "=" + csbid + ";";	
				}
				if(cssize == "320x50"){
					 csvalue320 = "kvcs" + index_slots[i].split("_")[2] + "=" + csbid + ";";	
				}
			} // if window
        } //for
     }	
		
	//OpenX
	if (typeof window.oxbidAll != 'undefined') { 
	var thisOX = window.oxbidAll;
	var oxPric = 0;
	//thisOX = "kvox_537205649=2000;kvox_537205646=3000"; //For Testing only
	for (var i = 0; i < oxAvail.length; i++) {
		var oxStart = thisOX.indexOf(oxAvail[i]);
		if (oxStart >= 0) {
			if (window.winBids.indexOf(oxAvail[i]) < 0 ) {
				oxBid = thisOX.substring(oxStart+10,thisOX.indexOf(";",oxStart));
				if (oxBid > oxPric) {
				oxPric = oxBid/10;
				thisOX = "kvox_" + oxAvail[i] + "=" + oxBid + ";"
				}
			} // if window
		} 
	}
	}
	
	//Sonobi
	var sbi_bid = 0;
	var sbi_size = "";
	var sbi_all = "";
	
	if (typeof sbi_trinity != "undefined") {
		
		for (var key in sbi_trinity) {
		  if (sbi_trinity.hasOwnProperty(key)) {
			  if (key.indexOf(thisPlacement,0)>=0) { // If the key is for this placement
				if(sbi_trinity[key].sbi_mouse*100 > sbi_bid) { //If the bid is greater than existing bid, use new bid
					sbi_bid = Math.round(sbi_trinity[key].sbi_mouse*100);
					sbi_apoc = sbi_trinity[key].sbi_apoc;
					sbi_aid = sbi_trinity[key].sbi_aid;
					sbi_size = sbi_trinity[key].sbi_size;
					sbi_all = "kvsbi_bid="+sbi_bid+";kvsbi_apoc="+sbi_apoc+";kvsbi_aid="+sbi_aid+";kvsbi_size="+sbi_size+";kvsbi_dc="+sbi_dc+";";
				} //If the bid is greater than existing bid, use new bid
			  } // If the key is for this placement
		  } //If hasOwnProperty
		} //for
	}
	if (sbi_bid >= 1000) {sbi_bid = sbi_bid * 10}
	
	var FrecDay = parseInt(FrecHours) / 24;
	imk_tags = loadTags;
	var plcmtCookie = String(get_cookie (loadID));
		
	 if  (plcmtCookie == "null")
		{
			plcmtCount = 1;
			set_cookie_expDays (loadID, plcmtCount, FrecDay);
			
		}
	else 
		{		
			plcmtCount = parseInt(plcmtCookie) + 1;
			set_cookie (loadID, plcmtCount);
		}
		
	var maxBid = 0;
	var passKVs = "";
	
	if (amzn_bid > maxBid) {
	maxBid = amzn_bid;
	passKVs = amzn_targs;
	}
	if (critPric > maxBid){
	maxBid = critPric;
	passKVs = crit_targs;
	} 
	if (sbi_bid > maxBid){
	maxBid = sbi_bid;
	passKVs = sbi_all;
	} 
	if (csbid > maxBid){
	maxBid = csbid;
	passKVs = csvalue;
	} 
	if (oxPric > maxBid){
	maxBid = oxPric;
	passKVs = thisOX;
	} 	
	window.winBids = window.winBids + passKVs;
	console.log(window.winBids);

	if (FrecCap =="0" | plcmtCount <= parseInt(FrecCap)) {
	document.write('<scr'+'ipt language="javascript1.1" src="http://adserver.adtechus.com/addyn/3.0/5235.1/' + loadID + '/0/' + loadSize + '/ADTECH;cookie=info;alias=' + loadSite + ';loc=100;target=_blank;kvpageview='+this_view+';kvimkar='+is_ar+';kvcategory='+imk_category+';kvtags='+imk_tags+';kvbrowser='+this_browser+';kvreferrer='+this_domain+';kvwidth='+this_scrwidth+';kvheight='+this_scrheight+';kvportfolio=IMK'+valuation+';'+passKVs+csvalue320+amzn_targs320+kruxaud+'grp=49792;sub2='+loadID+';misc='+new Date().getTime()+'"></scri'+'pt>');
	}
}
	
function loadAsyncIMK(loadSite,loadID,loadUnit,FrecCap,FrecHours,loadTags){
		
	
	var loadSize = "0" ;
		if  (loadUnit == "300x250")	{ loadSize = "170"; this_size = "300";}
		else if  (loadUnit == "728x90")	{ loadSize = "225"; this_size = "728"; }
		else if  (loadUnit == "160x600")	{ loadSize = "154"; this_size = "160"; }
		else if  (loadUnit == "1x1")	{ loadSize = "16"; }
		
		var thisPlacement = loadID;
	var placementSizes = loadUnit;
	var domain = window.location.href;

	if (ATFplacements.indexOf(thisPlacement)>=0 ) {var placementPos = "top";} else {var placementPos = "bottom";}
	
	if ((domain.indexOf('newsbusters.org')>=0) || (domain.indexOf('mrc.org')>=0)  || (domain.indexOf('cnsnews.com')>=0) || (domain.indexOf('mrctv.org')>=0)) {
		var oxAvail = [];
		if (placementSizes.indexOf("300x600")>=0 ) {oxAvail.push("537654341");}
		if ((placementSizes.indexOf("160x600")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654340");}
		if ((placementSizes.indexOf("160x600")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654339");}
		if ((placementSizes.indexOf("300x250")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654338");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654337");}
		if ((placementSizes.indexOf("728x90")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654336");}
		if ((placementSizes.indexOf("728x90")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654342");}
		}
				
		else if (domain.indexOf('refdesk.com')>=0) {
			if (placementSizes.indexOf("300x250")>=0 ) {var oxAvail = ["537980516"];}
			if (placementSizes.indexOf("728x90")>=0 ) {var oxAvail = ["537980503"];}
			if (placementSizes.indexOf("160x600")>=0 ) {var oxAvail = ["537980515"];}
		}
		
		else {
	
		var oxAvail = [];
		if (placementSizes.indexOf("300x600")>=0 ) {oxAvail.push("537245128");}
		if ((placementSizes.indexOf("160x600")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205651");}
		if ((placementSizes.indexOf("160x600")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205652");}
		if ((placementSizes.indexOf("300x250")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205646");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205647");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537215358");}
		if ((placementSizes.indexOf("728x90")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205649");}
		if ((placementSizes.indexOf("728x90")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205650");}
		}
		
		//Criteo
	//crtg_content = 'intmark728=1;intmark600=1;intmark250=1'; //For Testing only
	var critPric = 0; var crit_targs = "";
	if ((crtg_content != undefined) & (crtg_content != "")) {
		if ((crtg_content.indexOf("160") >= 0) && (placementSizes.indexOf("160x600")>=0)) {critPric = 200; crit_targs = "kvcriteo=200;"}		
		if ((crtg_content.indexOf("728") >= 0) && (placementSizes.indexOf("728x90")>=0)) {critPric = 250; crit_targs = "kvcriteo=728;"}
		if ((crtg_content.indexOf("250") >= 0) && (placementSizes.indexOf("300x250")>=0)) {critPric = 250; crit_targs = "kvcriteo=250;"}
		if ((crtg_content.indexOf("600") >= 0) && (placementSizes.indexOf("300x600")>=0)) {critPric = 250; crit_targs = "kvcriteo=600;"}
		if ((crtg_content.indexOf("720") >= 0) && (placementSizes.indexOf("720x300")>=0)) {critPric = 500; crit_targs = "kvcriteo=720t;kvcriteo=720;"}
		if ((crtg_content.indexOf("970") >= 0) && (placementSizes.indexOf("970x250")>=0)) {critPric = 650; crit_targs = "kvcriteo=970t;kvcriteo=970;"}
	}
	
	//Amazon
	//document.amzn_slots = ['a300x250p10','a300x250p8','a728x90p5'] //For Testing only
	var amzn_bid = 0;
	var amazPric = 0; var amzn_targs320 = 0;
	var amzn_targs = '';

	if (window.winBids.indexOf("kvamazon") < 0 ) {
		if (typeof document.amzn_slots != 'undefined') { 
				for (var i = 0; i < document.amzn_slots.length; i++) {
					var thisAmz = document.amzn_slots[i];
					 var thisP = thisAmz.indexOf("p");
					 var amazSize = thisAmz.substring(1, thisP);
					 var amazPval = thisAmz.substring(thisP+1);
						switch(amazPval) {
							case "1":amazPric = 600;break;
							case "2":amazPric = 550;break;
							case "3":amazPric = 500;break;
							case "4":amazPric = 450;break;
							case "5":amazPric = 400;break;
							case "6":amazPric = 350;break;
							case "7":amazPric = 300;break;
							case "8":amazPric = 250;break;
							case "9":amazPric = 200;break;
							case "10":amazPric = 150;break;
							case "11":amazPric = 100;break;
							default:amazPric = 000;
						}
						if ((amazPric > amzn_bid) && (placementSizes.indexOf(amazSize)>=0)) {
							amzn_bid = amazPric;
							amzn_targs = "kvamazon=a" + amazSize + "p" + amazPval + ";"; 
							}

						if (amazSize == "320x50") {
							amzn_targs320 = "kvamazon=a" + amazSize + "p" + amazPval + ";"; 
							}

							
				}
		}
	}
		
	//Casale
	var csbid = 0;var cssize = "";var csvalue = "";var csvalue320 = "";
	//index_slots = ['0_drudge_320x50_100','0_drudge_300x250b_500','0_drudge_728x90_300']; //For Testing only
     if (typeof index_slots !== 'undefined'){
		for ( var i=0; i < index_slots.length; i++ ) {
			//console.log(index_slots[i]);
			cssize = index_slots[i].split("_")[2];
			if (window.winBids.indexOf(cssize + "=") < 0 ) {
				if (cssize == "300x250b" || cssize == "300x250c") {cssize = "300x250"};
				csbidNew = index_slots[i].split("_")[3];
				if((placementSizes.indexOf(cssize)>=0) && (csbidNew > csbid)) {
					csbid = csbidNew;
					 csvalue = "kvcs" + index_slots[i].split("_")[2] + "=" + csbid + ";";	
				}
				if(cssize=="320x50"){
					 csvalue320 = "kvcs" + index_slots[i].split("_")[2] + "=" + csbid + ";";	
				}
			} // if window
        } //for
     }	
	 
	//OpenX
	if (typeof window.oxbidAll != 'undefined') { 
	var thisOX = window.oxbidAll;
	var oxPric = 0;
	//thisOX = "kvox_537205649=2000;kvox_537205646=3000"; //For Testing only
	for (var i = 0; i < oxAvail.length; i++) {
		var oxStart = thisOX.indexOf(oxAvail[i]);
		if (oxStart >= 0) {
			if (window.winBids.indexOf(oxAvail[i]) < 0 ) {
				oxBid = thisOX.substring(oxStart+10,thisOX.indexOf(";",oxStart));
				if (oxBid > oxPric) {
				oxPric = oxBid/10;
				thisOX = "kvox_" + oxAvail[i] + "=" + oxBid + ";"
				}
			} // if window
		} 
	}
	}
	
	//Sonobi
	var sbi_bid = 0;
	var sbi_size = "";
	var sbi_all = "";
	
	if (typeof sbi_trinity != "undefined") {
		
		for (var key in sbi_trinity) {
		  if (sbi_trinity.hasOwnProperty(key)) {
			  if (key.indexOf(thisPlacement,0)>=0) { // If the key is for this placement
				if(sbi_trinity[key].sbi_mouse*100 > sbi_bid) { //If the bid is greater than existing bid, use new bid
					sbi_bid = Math.round(sbi_trinity[key].sbi_mouse*100);
					sbi_apoc = sbi_trinity[key].sbi_apoc;
					sbi_aid = sbi_trinity[key].sbi_aid;
					sbi_size = sbi_trinity[key].sbi_size;
					sbi_all = "kvsbi_bid="+sbi_bid+";kvsbi_apoc="+sbi_apoc+";kvsbi_aid="+sbi_aid+";kvsbi_size="+sbi_size+";kvsbi_dc="+sbi_dc+";";
				} //If the bid is greater than existing bid, use new bid
			  } // If the key is for this placement
		  } //If hasOwnProperty
		} //for
	}
	if (sbi_bid >= 1000) {sbi_bid = sbi_bid * 10}

	var FrecDay = parseInt(FrecHours) / 24;
	imk_tags = loadTags;
	var plcmtCookie = String(get_cookie (loadID));
		
	 if  (plcmtCookie == "null")
		{
			plcmtCount = 1;
			set_cookie_expDays (loadID, plcmtCount, FrecDay);
			
		}
	else 
		{		
			plcmtCount = parseInt(plcmtCookie) + 1;
			set_cookie (loadID, plcmtCount);
		}
		
	var maxBid = 0;
	var passKVs = "";
	
	if (amzn_bid > maxBid) {
	maxBid = amzn_bid;
	passKVs = amzn_targs;
	}
	if (critPric > maxBid){
	maxBid = critPric;
	passKVs = crit_targs;
	} 
	if (sbi_bid > maxBid){
	maxBid = sbi_bid;
	passKVs = sbi_all;
	} 
	if (csbid > maxBid){
	maxBid = csbid;
	passKVs = csvalue;
	} 
	if (oxPric > maxBid){
	maxBid = oxPric;
	passKVs = thisOX;
	} 	
	window.winBids = window.winBids + passKVs;
	//alert(window.winBids);
		console.log(window.winBids);

	if (FrecCap =="0" | plcmtCount <= parseInt(FrecCap)) {
	adtech_code = 'http://adserver.adtechus.com/addyn/3.0/5235.1/' + loadID + '/0/' + loadSize + '/ADTECH;cookie=info;alias=' + loadSite + ';loc=100;target=_blank;kvpageview='+this_view+';kvimkar='+is_ar+';kvcategory='+imk_category+';kvtags='+imk_tags+';kvbrowser='+this_browser+';kvreferrer='+this_domain+';kvwidth='+this_scrwidth+';kvheight='+this_scrheight+';kvportfolio=IMK'+valuation+';'+passKVs+csvalue320+amzn_targs320+kruxaud+'grp=49792;sub2='+loadID+';misc='+new Date().getTime();
	}
	return adtech_code;
}

function loadAsyncResp(loadSite,loadID,loadUnit,FrecCap,FrecHours,loadTags){
		
		var info = getTagInfo();
		var alias = loadSite;		
		alias = alias !== '' ? 'alias=' + ( alias.split("_") ? alias.split("_")[ 0 ] : alias ) + '_' + info.alias : '';
		
		var loadSize = "0" ;
		if  (loadUnit == "300x250")	{ loadSize = "170"; this_size = "300";}
		else if  (loadUnit == "728x90")	{ loadSize = "225"; this_size = "728"; }
		else if  (loadUnit == "160x600")	{ loadSize = "154"; this_size = "160"; }
		else if  (loadUnit == "1x1")	{ loadSize = "16"; }
		
		var thisPlacement = loadID;
		var scrWidth  = info.viewPort.width;
		if ((loadUnit = "728x90") && (scrWidth >= 728)) {placementSizes = "728x90,970x250"} else {
		var placementSizes = loadUnit;
		}
if (ATFplacements.indexOf(thisPlacement)>=0 ) {var placementPos = "top";} else {var placementPos = "bottom";}
	var domain = window.location.href;

	if ((domain.indexOf('newsbusters.org')>=0) || (domain.indexOf('mrc.org')>=0)  || (domain.indexOf('cnsnews.com')>=0) || (domain.indexOf('mrctv.org')>=0)) {
		var oxAvail = [];
		if (placementSizes.indexOf("300x600")>=0 ) {oxAvail.push("537654341");}
		if ((placementSizes.indexOf("160x600")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654340");}
		if ((placementSizes.indexOf("160x600")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654339");}
		if ((placementSizes.indexOf("300x250")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654338");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654337");}
		if ((placementSizes.indexOf("728x90")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654336");}
		if ((placementSizes.indexOf("728x90")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654342");}
		}
		
		else if (domain.indexOf('refdesk.com')>=0) {
			if (placementSizes.indexOf("300x250")>=0 ) {var oxAvail = ["537980516"];}
			if (placementSizes.indexOf("728x90")>=0 ) {var oxAvail = ["537980503"];}
			if (placementSizes.indexOf("160x600")>=0 ) {var oxAvail = ["537980515"];}
		}
		
		else {
	
		var oxAvail = [];
		if (placementSizes.indexOf("300x600")>=0 ) {oxAvail.push("537245128");}
		if ((placementSizes.indexOf("160x600")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205651");}
		if ((placementSizes.indexOf("160x600")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205652");}
		if ((placementSizes.indexOf("300x250")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205646");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205647");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537215358");}
		if ((placementSizes.indexOf("728x90")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205649");}
		if ((placementSizes.indexOf("728x90")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205650");}
		}
		
		//Criteo
	//crtg_content = 'intmark728=1;intmark600=1;intmark250=1'; //For Testing only
	var critPric = 0; var crit_targs = "";
	if ((crtg_content != undefined) & (crtg_content != "")) {
		if ((crtg_content.indexOf("160") >= 0) && (placementSizes.indexOf("160x600")>=0)) {critPric = 200; crit_targs = "kvcriteo=200;"}		
		if ((crtg_content.indexOf("728") >= 0) && (placementSizes.indexOf("728x90")>=0)) {critPric = 250; crit_targs = "kvcriteo=728;"}
		if ((crtg_content.indexOf("250") >= 0) && (placementSizes.indexOf("300x250")>=0)) {critPric = 250; crit_targs = "kvcriteo=250;"}
		if ((crtg_content.indexOf("600") >= 0) && (placementSizes.indexOf("300x600")>=0)) {critPric = 250; crit_targs = "kvcriteo=600;"}
		if ((crtg_content.indexOf("720") >= 0) && (placementSizes.indexOf("720x300")>=0)) {critPric = 500; crit_targs = "kvcriteo=720t;kvcriteo=720;"}
		if ((crtg_content.indexOf("970") >= 0) && (placementSizes.indexOf("970x250")>=0)) {critPric = 650; crit_targs = "kvcriteo=970t;kvcriteo=970;"}
	}
	
	//Amazon
	//document.amzn_slots = ['a300x250p10','a300x250p8','a728x90p5'] //For Testing only
	var amzn_bid = 0;
	var amazPric = 0; var amzn_targs320 = 0;
	var amzn_targs = '';

	if (window.winBids.indexOf("kvamazon") < 0 ) {
		if (typeof document.amzn_slots != 'undefined') { 
				for (var i = 0; i < document.amzn_slots.length; i++) {
					var thisAmz = document.amzn_slots[i];
					 var thisP = thisAmz.indexOf("p");
					 var amazSize = thisAmz.substring(1, thisP);
					 var amazPval = thisAmz.substring(thisP+1);
						switch(amazPval) {
							case "1":amazPric = 600;break;
							case "2":amazPric = 550;break;
							case "3":amazPric = 500;break;
							case "4":amazPric = 450;break;
							case "5":amazPric = 400;break;
							case "6":amazPric = 350;break;
							case "7":amazPric = 300;break;
							case "8":amazPric = 250;break;
							case "9":amazPric = 200;break;
							case "10":amazPric = 150;break;
							case "11":amazPric = 100;break;
							default:amazPric = 000;
						}
						if ((amazPric > amzn_bid) && (placementSizes.indexOf(amazSize)>=0)) {
							amzn_bid = amazPric;
							amzn_targs = "kvamazon=a" + amazSize + "p" + amazPval + ";"; 
							}
						if (amazSize == "320x50") {
							amzn_targs320 = "kvamazon=a" + amazSize + "p" + amazPval + ";"; 
							}
							
				}
		}
	}
		
	//Casale
	var csbid = 0;var cssize = "";var csvalue = "";var csvalue320 = "";
	//index_slots = ['0_drudge_320x50_100','0_drudge_300x250b_500','0_drudge_728x90_300']; //For Testing only
     if (typeof index_slots !== 'undefined'){
		for ( var i=0; i < index_slots.length; i++ ) {
			//console.log(index_slots[i]);
			cssize = index_slots[i].split("_")[2];
			if (window.winBids.indexOf(cssize + "=") < 0 ) {
				if (cssize == "300x250b" || cssize == "300x250c") {cssize = "300x250"};
				csbidNew = index_slots[i].split("_")[3];
				if((placementSizes.indexOf(cssize)>=0) && (csbidNew > csbid)) {
					csbid = csbidNew;
					 csvalue = "kvcs" + index_slots[i].split("_")[2] + "=" + csbid + ";";	
				}
				if(cssize=="320x50"){
					 csvalue320 = "kvcs" + index_slots[i].split("_")[2] + "=" + csbid + ";";	
				}
			} // if window
        } //for
     }	
		
	//OpenX
	if (typeof window.oxbidAll != 'undefined') { 
	var thisOX = window.oxbidAll;
	var oxPric = 0;
	//thisOX = "kvox_537205649=2000;kvox_537205650=3000"; //For Testing only
	for (var i = 0; i < oxAvail.length; i++) {
		var oxStart = thisOX.indexOf(oxAvail[i]);
		if (oxStart >= 0) {
			if (window.winBids.indexOf(oxAvail[i]) < 0 ) {
				oxBid = thisOX.substring(oxStart+10,thisOX.indexOf(";",oxStart));
				if (oxBid > oxPric) {
				oxPric = oxBid/10;
				thisOX = "kvox_" + oxAvail[i] + "=" + oxBid + ";"
				}
			} // if window
		} 
	}
	}
	
	//Sonobi
	var sbi_bid = 0;
	var sbi_size = "";
	var sbi_all = "";
	
	if (typeof sbi_trinity != "undefined") {
		
		for (var key in sbi_trinity) {
		  if (sbi_trinity.hasOwnProperty(key)) {
			  if (key.indexOf(thisPlacement,0)>=0) { // If the key is for this placement
				if(sbi_trinity[key].sbi_mouse*100 > sbi_bid) { //If the bid is greater than existing bid, use new bid
					sbi_bid = Math.round(sbi_trinity[key].sbi_mouse*100);
					sbi_apoc = sbi_trinity[key].sbi_apoc;
					sbi_aid = sbi_trinity[key].sbi_aid;
					sbi_size = sbi_trinity[key].sbi_size;
					sbi_all = "kvsbi_bid="+sbi_bid+";kvsbi_apoc="+sbi_apoc+";kvsbi_aid="+sbi_aid+";kvsbi_size="+sbi_size+";kvsbi_dc="+sbi_dc+";";
				} //If the bid is greater than existing bid, use new bid
			  } // If the key is for this placement
		  } //If hasOwnProperty
		} //for
	}
	if (sbi_bid >= 1000) {sbi_bid = sbi_bid * 10}
	
		var FrecDay = parseInt(FrecHours) / 24;
		imk_tags = loadTags;
		var plcmtCookie = String(get_cookie (loadID));
		
	 if  (plcmtCookie == "null")
		{
			plcmtCount = 1;
			set_cookie_expDays (loadID, plcmtCount, FrecDay);
			
		}
	else 
		{		
			plcmtCount = parseInt(plcmtCookie) + 1;
			set_cookie (loadID, plcmtCount);
		}
		
		var maxBid = 0;
	var passKVs = "";
	
	if (amzn_bid > maxBid) {
	maxBid = amzn_bid;
	passKVs = amzn_targs;
	}
	if (critPric > maxBid){
	maxBid = critPric;
	passKVs = crit_targs;
	} 
	if (sbi_bid > maxBid){
	maxBid = sbi_bid;
	passKVs = sbi_all;
	} 
	if (csbid > maxBid){
	maxBid = csbid;
	passKVs = csvalue;
	} 
	if (oxPric > maxBid){
	maxBid = oxPric;
	passKVs = thisOX;
	} 	
	window.winBids = window.winBids + passKVs;
	//alert(window.winBids);
		console.log(window.winBids);

	if (FrecCap =="0" | plcmtCount <= parseInt(FrecCap)) {
		adtech_code ='http://' + info.domain + '.adtechus.com/addyn/3.0/5235.1/' + loadID + '/0/-1/ADTECH;cookie=info;' + alias + ';loc=100;target=_blank;kvpageview='+this_view+';kvimkar='+is_ar+';kvcategory='+imk_category+';kvtags='+imk_tags+';kvbrowser='+this_browser+';kvreferrer='+this_domain+';kvwidth='+this_scrwidth+';kvheight='+this_scrheight+';kvportfolio=IMK'+valuation+';'+passKVs+csvalue320+amzn_targs320+kruxaud+'grp=' + info.groupId + ';sub2='+loadID+';misc=' + new Date().getTime();
	}
	return adtech_code;
}
	
function loadAsyncResp2(loadSite,loadID,loadUnit,FrecCap,FrecHours,loadTags){
		
		var info = getTagInfo2();
		var alias = loadSite;
		alias = alias !== '' ? 'alias=' + ( alias.split("_") ? alias.split("_")[ 0 ] : alias ) + '_' + info.alias : '';
		
		var loadSize = "0" ;
		if  (loadUnit == "300x250")	{ loadSize = "170"; this_size = "300";}
		else if  (loadUnit == "728x90")	{ loadSize = "225"; this_size = "728"; }
		else if  (loadUnit == "160x600")	{ loadSize = "154"; this_size = "160"; }
		else if  (loadUnit == "1x1")	{ loadSize = "16"; }
		
		var thisPlacement = loadID;
	var placementSizes = loadUnit;
if (ATFplacements.indexOf(thisPlacement)>=0 ) {var placementPos = "top";} else {var placementPos = "bottom";}
	var domain = window.location.href;

	if ((domain.indexOf('newsbusters.org')>=0) || (domain.indexOf('mrc.org')>=0)  || (domain.indexOf('cnsnews.com')>=0) || (domain.indexOf('mrctv.org')>=0)) {
		var oxAvail = [];
		if (placementSizes.indexOf("300x600")>=0 ) {oxAvail.push("537654341");}
		if ((placementSizes.indexOf("160x600")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654340");}
		if ((placementSizes.indexOf("160x600")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654339");}
		if ((placementSizes.indexOf("300x250")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654338");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654337");}
		if ((placementSizes.indexOf("728x90")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537654336");}
		if ((placementSizes.indexOf("728x90")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537654342");}
		}
		
		else if (domain.indexOf('refdesk.com')>=0) {
			if (placementSizes.indexOf("300x250")>=0 ) {var oxAvail = ["537980516"];}
			if (placementSizes.indexOf("728x90")>=0 ) {var oxAvail = ["537980503"];}
			if (placementSizes.indexOf("160x600")>=0 ) {var oxAvail = ["537980515"];}
		}
		
		else {
	
		var oxAvail = [];
		if (placementSizes.indexOf("300x600")>=0 ) {oxAvail.push("537245128");}
		if ((placementSizes.indexOf("160x600")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205651");}
		if ((placementSizes.indexOf("160x600")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205652");}
		if ((placementSizes.indexOf("300x250")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205646");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205647");}
		if ((placementSizes.indexOf("300x250")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537215358");}
		if ((placementSizes.indexOf("728x90")>=0 ) && (placementPos.indexOf("top")>=0)) {oxAvail.push("537205649");}
		if ((placementSizes.indexOf("728x90")>=0 ) && ((placementPos.indexOf("middle")>=0) || (placementPos.indexOf("bottom")>=0))) {oxAvail.push("537205650");}
		}
		
		//Criteo
	//crtg_content = 'intmark728=1;intmark600=1;intmark250=1'; //For Testing only
	var critPric = 0; var crit_targs = "";
	if ((crtg_content != undefined) & (crtg_content != "")) {
		if ((crtg_content.indexOf("160") >= 0) && (placementSizes.indexOf("160x600")>=0)) {critPric = 200; crit_targs = "kvcriteo=200;"}		
		if ((crtg_content.indexOf("728") >= 0) && (placementSizes.indexOf("728x90")>=0)) {critPric = 250; crit_targs = "kvcriteo=728;"}
		if ((crtg_content.indexOf("250") >= 0) && (placementSizes.indexOf("300x250")>=0)) {critPric = 250; crit_targs = "kvcriteo=250;"}
		if ((crtg_content.indexOf("600") >= 0) && (placementSizes.indexOf("300x600")>=0)) {critPric = 250; crit_targs = "kvcriteo=600;"}
		if ((crtg_content.indexOf("720") >= 0) && (placementSizes.indexOf("720x300")>=0)) {critPric = 500; crit_targs = "kvcriteo=720t;kvcriteo=720;"}
		if ((crtg_content.indexOf("970") >= 0) && (placementSizes.indexOf("970x250")>=0)) {critPric = 650; crit_targs = "kvcriteo=970t;kvcriteo=970;"}
	}
	
	//Amazon
	//document.amzn_slots = ['a300x250p10','a300x250p8','a728x90p5'] //For Testing only
	var amzn_bid = 0;
	var amazPric = 0; var amzn_targs320 = 0;
	var amzn_targs = '';

	if (window.winBids.indexOf("kvamazon") < 0 ) {
		if (typeof document.amzn_slots != 'undefined') { 
				for (var i = 0; i < document.amzn_slots.length; i++) {
					var thisAmz = document.amzn_slots[i];
					 var thisP = thisAmz.indexOf("p");
					 var amazSize = thisAmz.substring(1, thisP);
					 var amazPval = thisAmz.substring(thisP+1);
						switch(amazPval) {
							case "1":amazPric = 600;break;
							case "2":amazPric = 550;break;
							case "3":amazPric = 500;break;
							case "4":amazPric = 450;break;
							case "5":amazPric = 400;break;
							case "6":amazPric = 350;break;
							case "7":amazPric = 300;break;
							case "8":amazPric = 250;break;
							case "9":amazPric = 200;break;
							case "10":amazPric = 150;break;
							case "11":amazPric = 100;break;
							default:amazPric = 000;
						}
						if ((amazPric > amzn_bid) && (placementSizes.indexOf(amazSize)>=0)) {
							amzn_bid = amazPric;
							amzn_targs = "kvamazon=a" + amazSize + "p" + amazPval + ";"; 
							}
						if (amazSize == "320x50") {
							amzn_targs320 = "kvamazon=a" + amazSize + "p" + amazPval + ";"; 
							}
							
				}
		}
	}
		
	//Casale
	var csbid = 0;var cssize = "";var csvalue = "";var csvalue320 = "";
	//index_slots = ['0_drudge_320x50_100','0_drudge_300x250b_500','0_drudge_728x90_300']; //For Testing only
     if (typeof index_slots !== 'undefined'){
		for ( var i=0; i < index_slots.length; i++ ) {
			//console.log(index_slots[i]);
			cssize = index_slots[i].split("_")[2];
			if (window.winBids.indexOf(cssize + "=") < 0 ) {
				if (cssize == "300x250b" || cssize == "300x250c") {cssize = "300x250"};
				csbidNew = index_slots[i].split("_")[3];
				if((placementSizes.indexOf(cssize)>=0) && (csbidNew > csbid)) {
					csbid = csbidNew;
					 csvalue = "kvcs" + index_slots[i].split("_")[2] + "=" + csbid + ";";	
				}
				if(cssize="320x50"){
					 csvalue320 = "kvcs" + index_slots[i].split("_")[2] + "=" + csbid + ";";	
				}
			} // if window
        } //for
     }	
		
	//OpenX
	if (typeof window.oxbidAll != 'undefined') { 
	var thisOX = window.oxbidAll;
	var oxPric = 0;
	//thisOX = "kvox_537205649=2000;kvox_537205646=3000"; //For Testing only
	for (var i = 0; i < oxAvail.length; i++) {
		var oxStart = thisOX.indexOf(oxAvail[i]);
		if (oxStart >= 0) {
			if (window.winBids.indexOf(oxAvail[i]) < 0 ) {
				oxBid = thisOX.substring(oxStart+10,thisOX.indexOf(";",oxStart));
				if (oxBid > oxPric) {
				oxPric = oxBid/10;
				thisOX = "kvox_" + oxAvail[i] + "=" + oxBid + ";"
				}
			} // if window
		} 
	}
	}
	
	//Sonobi
	var sbi_bid = 0;
	var sbi_size = "";
	var sbi_all = "";
	
	if (typeof sbi_trinity != "undefined") {
		
		for (var key in sbi_trinity) {
		  if (sbi_trinity.hasOwnProperty(key)) {
			  if (key.indexOf(thisPlacement,0)>=0) { // If the key is for this placement
				if(sbi_trinity[key].sbi_mouse*100 > sbi_bid) { //If the bid is greater than existing bid, use new bid
					sbi_bid = Math.round(sbi_trinity[key].sbi_mouse*100);
					sbi_apoc = sbi_trinity[key].sbi_apoc;
					sbi_aid = sbi_trinity[key].sbi_aid;
					sbi_size = sbi_trinity[key].sbi_size;
					sbi_all = "kvsbi_bid="+sbi_bid+";kvsbi_apoc="+sbi_apoc+";kvsbi_aid="+sbi_aid+";kvsbi_size="+sbi_size+";kvsbi_dc="+sbi_dc+";";
				} //If the bid is greater than existing bid, use new bid
			  } // If the key is for this placement
		  } //If hasOwnProperty
		} //for
	}
	if (sbi_bid >= 1000) {sbi_bid = sbi_bid * 10}
		
		var FrecDay = parseInt(FrecHours) / 24;
		imk_tags = loadTags;
		var plcmtCookie = String(get_cookie (loadID));
		
	 if  (plcmtCookie == "null")
		{
			plcmtCount = 1;
			set_cookie_expDays (loadID, plcmtCount, FrecDay);
			
		}
	else 
		{		
			plcmtCount = parseInt(plcmtCookie) + 1;
			set_cookie (loadID, plcmtCount);
		}
		
	var maxBid = 0;
	var passKVs = "";
	
	if (amzn_bid > maxBid) {
	maxBid = amzn_bid;
	passKVs = amzn_targs;
	}
	if (critPric > maxBid){
	maxBid = critPric;
	passKVs = crit_targs;
	} 
	if (sbi_bid > maxBid){
	maxBid = sbi_bid;
	passKVs = sbi_all;
	} 
	if (csbid > maxBid){
	maxBid = csbid;
	passKVs = csvalue;
	} 
	if (oxPric > maxBid){
	maxBid = oxPric;
	passKVs = thisOX;
	} 	
	window.winBids = window.winBids + passKVs;
	//alert(window.winBids);
		console.log(window.winBids);
		
	if (FrecCap =="0" | plcmtCount <= parseInt(FrecCap)) {
		adtech_code ='http://' + info.domain + '.adtechus.com/addyn/3.0/5235.1/' + loadID + '/0/-1/ADTECH;cookie=info;' + alias + ';loc=100;target=_blank;kvpageview='+this_view+';kvimkar='+is_ar+';kvcategory='+imk_category+';kvtags='+imk_tags+';kvbrowser='+this_browser+';kvreferrer='+this_domain+';kvwidth='+this_scrwidth+';kvheight='+this_scrheight+';kvportfolio=IMK'+valuation+';'+passKVs+csvalue320+amzn_targs320+kruxaud+'grp=' + info.groupId + ';sub2='+loadID+';misc=' + new Date().getTime();
	}
	return adtech_code;
}
