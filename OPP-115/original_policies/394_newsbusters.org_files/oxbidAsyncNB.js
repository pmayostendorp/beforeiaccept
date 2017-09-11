// 728x90 ATF (537654336)
// 728x90 BTF (537654342)
// 160x600 BTF (537654339)
// 160x600 ATF (537654340)
// 300x250 BTF (537654337)
// 300x250 ATF (537654338)
// 300x600 (537654341)

if(typeof OX !== "undefined")
	{
    var OX_b6f68720b0 = OX();
    OX_b6f68720b0.addPage("537065612");
    OX_b6f68720b0.addHook(function(adResponse){ 
		console.log("response received");
		var units = [537654336,537654337,537654338,537654339,537654340,537654341,537654342];
		var ox_value = "";
		for (i = 0; i < units.length; i++){
			adunit = adResponse.getOrCreateAdUnit(units[i]);
			var thisUnit = units[i];
			if (adunit.get("pub_rev") > 0) {
			var thisBid = adunit.get("pub_rev");
			ox_value = ox_value + "kvox_" + thisUnit + "=" + thisBid + ";";
			}
		} 
		window.oxbidAll = ox_value;
    }, OX.Hooks.ON_AD_RESPONSE); 
    //OX_b6f68720b0.fetchAds();
	OX_b6f68720b0.load(); //For Async
}

//Yieldbot

window.ybPlacements = "";
