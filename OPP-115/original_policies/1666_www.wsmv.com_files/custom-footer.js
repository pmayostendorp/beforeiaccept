/* Vibrant Ad Tags */
if(wng_pageInfo.containerType === 'S'){
	var vibSrc = "";
	var vStatus = true;
	if(wng_pageInfo.contentClassification === 'Auto'){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6990";
	} else if((wng_pageInfo.contentClassification === 'Community') || (wng_pageInfo.contentClassification === 'Community - Calendar') || (wng_pageInfo.contentClassification === 'Community - Events') || (wng_pageInfo.contentClassification === 'Education')){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6999";
	} else if((wng_pageInfo.contentClassification === 'Entertainment') || (wng_pageInfo.contentClassification === 'Entertainment - Interview') || (wng_pageInfo.contentClassification === 'Entertainment - Music')){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6991";
	} else if((wng_pageInfo.contentClassification === 'Food Recipe')){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6992";
	} else if((wng_pageInfo.contentClassification === 'Health')){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6994";
	} else if((wng_pageInfo.contentClassification === 'Sales - Home and Garden') || (wng_pageInfo.contentClassification === 'Sales - Home Garden-New Home') || (wng_pageInfo.contentClassification === 'Sales - Home Garden-Plumbing') || (wng_pageInfo.contentClassification === 'Sales - Home Garden-Real Estate') || (wng_pageInfo.contentClassification === 'Sales - Home Garden-Remodeling') || (wng_pageInfo.contentClassification === 'Sales - Home Garden-Roofing') || (wng_pageInfo.contentClassification === 'Sales - Home Garden-Security') || (wng_pageInfo.contentClassification === 'Sales - Home Garden-Windows')){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6995";
	} else if((wng_pageInfo.contentClassification === 'Sales - Finance')){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6993";
	} else if((wng_pageInfo.contentClassification.indexOf('News') != -1) || (wng_pageInfo.contentClassification.indexOf('Political') != -1) || (wng_pageInfo.contentClassification.indexOf('Station') != -1) || (wng_pageInfo.contentClassification.indexOf('Weather') != -1)){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6989";
	} else if((wng_pageInfo.contentClassification.indexOf('Sport') != -1)){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6996";
	} else if((wng_pageInfo.contentClassification === 'Technology')){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6997";
	} else if((wng_pageInfo.contentClassification.indexOf('Traffic') != -1) || (wng_pageInfo.contentClassification.indexOf('Travel') != -1)){
		vibSrc = "http://meredithtv.us.intellitxt.com/intellitxt/front.asp?ipid=6998";
	} else {
		vStatus = false;
	}
	
	if(vStatus === true){
		document.write('<script type="text/javascript" src="'+ vibSrc +'"></script>');
	}
}