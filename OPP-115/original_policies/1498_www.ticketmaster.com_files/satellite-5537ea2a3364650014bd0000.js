_satellite.pushAsyncScript(function(event, target, $variables){
  if(typeof window.digitalData != 'undefined'){
		_satellite.notify('window loaded', 1);
  if(window.localStorage.edpSpoof === 'true'){
    _satellite.notify('spoofing edp page', 1);
 		 window.digitalData.page.pageInfo.pageName = " EDP:";
  }
}
});
