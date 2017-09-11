(function(){
	try {

		var bkMLBID        = (typeof s.prop22!="undefined"?s.prop22:"");
		var bkPageName     = (typeof s.pageName!="undefined"?s.pageName:"");
		var bkCurrencyCode = (typeof s.currencyCode!="undefined"?s.currencyCode:"");
		var bkChannel      = (typeof s.channel!="undefined"?s.channel:"");
		var bkPageID       = (typeof page_id!="undefined"?page_id:"");
		var bkLang         = (typeof dc_lang!="undefined"?dc_lang:"");

		if(dc_keyVal && section === "gameday"){
			var bkKeyValArr = dc_keyVal.split(";");
			var bkKeyVal0   = bkKeyValArr[0];
			var bkKeyVal1   = bkKeyValArr[1];
			bkKeyVal0       = bkKeyVal0.replace("team=","");
			bkKeyVal1       = bkKeyVal1.replace("team=","");
			bk_addPageCtx("team1", bkKeyVal0);
			bk_addPageCtx("team2", bkKeyVal1);
		}

		bk_addPageCtx("mlbid", bkMLBID);
		bk_addPageCtx("pagename", bkPageName);
		bk_addPageCtx("cur", bkCurrencyCode);
		bk_addPageCtx("chan", bkChannel);
		bk_addPageCtx("pageid", bkPageID);
		bk_addPageCtx("lang", bkLang);
	
	} catch(e) {
		//console.log(e);
	}

	bk_doJSTag(14633, 10);

})();