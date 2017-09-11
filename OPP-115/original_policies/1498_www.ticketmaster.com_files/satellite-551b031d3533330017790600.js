_satellite.pushAsyncScript(function(event, target, $variables){
  if(typeof window.digitalData != 'undefined'){
		_satellite.notify('window loaded', 1);
  if(window.localStorage.confirmationSpoof === 'true'){
    _satellite.notify('spoofing confirmation page', 1);
 		 window.digitalData.page.pageInfo.pageName = " Checkout: Confirmation";
  }
}
});
