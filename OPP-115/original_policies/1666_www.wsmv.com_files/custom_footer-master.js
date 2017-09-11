/* ADDITIONAL CUSTOM AD CALLS */
/* Vibrant Ad Tags */
if(wng_pageInfo.containerType === 'S'){
	document.write('<scr' + 'ipt type="text/javascript" src="'+ vibSrc +'"><\/scr' + 'ipt>');
}
/* Footer Pencil Ad Call */
/*
document.write('<script type="text/javascript" src="http://ad.doubleclick.net/adj/wn.loc.'+ affName +'/' + ad_wncc + ';sz=100x120;ord=' + ord + '?"><\/script>');
*/
/* Floating Ad Call */
/*
document.write('<script type="text/javascript" src="http://ad.doubleclick.net/adj/wn.loc.'+ affName +'/' + ad_wncc + ';sz=310x190;ord=' + ord + '?"><\/script>');
*/
/* Story Page beneath story body */
/*
if(wng_pageInfo.containerType === 'S'){
	document.write('<iframe id="ad_below_story" src="" width="600" height="30" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"></iframe>');
	$wn(document).ready(function(){
		if($wn("#WNStoryBody").find("#vaRecWidget").length){
			$wn("#WNStoryBody").find("#vaRecWidget").before($wn("#ad_below_story"));
		}
		else {
			$wn("#WNStoryBody").append($wn("#ad_below_story"));
		}
		var ord=Math.random()*10000000000000000;
		var adcallMaster = "http://ad.doubleclick.net/adi/wn.loc."+ affName +"/" + ad_wncc + ";sz=180x150;wnsz=20;tile=1;wnpc=story;ord="+ ord +"?";
		var adcallCompanion = "http://ad.doubleclick.net/adi/wn.loc."+ affName +"/" + ad_wncc + ";sz=88x31;wnsz=20;tile=2;ord="+ ord +"?";
		document.getElementById("WNAd20").innerHTML = "<iframe id='ad_beside_story' width='180' height='150' frameborder='0' scrolling='no' marginwidth='0' marginheight='0' src=''></iframe>";
		document.getElementById("ad_beside_story").onload = function(){
			document.getElementById("ad_below_story").src = adcallCompanion;
			document.getElementById("ad_beside_story").style.display = "block";
		};
		document.getElementById("ad_beside_story").src = adcallMaster;
	});
}
*/