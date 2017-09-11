(function(){
  //var etag_cache_buster = 120;
  var brandUid = TOUT.propertyUid || TOUT.property || TOUT.brandUid || TOUT.branduid;
  var js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = 'http://platform.tout.com/sdk/v1/' + brandUid + '.js';
  js.async = true;
  var fjs = document.getElementsByTagName('script')[0];
  fjs.parentNode.insertBefore(js, fjs);
})();
