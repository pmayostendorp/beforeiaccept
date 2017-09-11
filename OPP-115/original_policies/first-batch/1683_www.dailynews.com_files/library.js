// JavaScript Document

adkit.onReady(handleSVData);

var divContainer = document.getElementById('container');

var mainImage;
var associateID;
var stateCode;
var agentName;
var digitalDisplayLanguageType;
var adSize = "300x250";

function handleSVData(data){
	agentName = adkit.getSVData('AgentName');
	associateID = adkit.getSVData('AssociateID');
	stateCode = adkit.getSVData('StateRegionalBillingCode');
	digitalDisplayLanguageType = adkit.getSVData('DigitalDisplayLanguageType');	

	if (stateCode.length != 2) {
		stateCode = '0' + stateCode;
	}
	
	if (associateID == 'default'){
		divContainer.style.backgroundImage = "url('img/SF_Default_"+adSize+"-1.jpg')";
	} else {

		if (digitalDisplayLanguageType == 'Hispanic') {
		var flashvars = {},
		params = {wmode:"opaque"},
		attributes = {};
	
		swfobject.embedSWF('https://cdn-akamai.mookie1.com/js/sf/'+associateID+"_"+adSize + '.swf', "swf", adSize.split("x")[0], adSize.split("x")[1], "9.0.0","/swf/expressInstall.swf", flashvars, params, attributes);
		divContainer.innerHTML += '<div class="overlay" id="overlay1" onclick="EB.clickthrough();"></div>';
		} else {
			divContainer.style.backgroundImage = "url('https://cdn-akamai.mookie1.com/js/sf/v3/"+associateID+"_"+adSize+".jpg')";
		}

	}


	divContainer.className += ' fadeIn';
	divContainer.onclick = function(){ EB.clickthrough(); };
}